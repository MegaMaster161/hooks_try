
//подключаем модули

const {Router} = require('express');
const bcrypt = require('bcryptjs');
const auth = require('../midlware/auth.middleware');
const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator');
const User = require('../models/User');



const router = Router();

// api/v1/auth/reg
router.post(
  '/reg',
    [
        check('email').isEmail(),
        check('password').isLength({min: 6})
    ],
    async (req, res) => {
       try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                   errors: errors.array(),
                   body: req.body,
                   message: 'Некорректные данные при регистрации'
                });
            }

            const {email, password} = req.body.data;
            console.log(req);
            const candidate = await User.findOne({where: {mail: `${email}`}})
                                        .then(user=>{
                                            let result = (user === null) ? false : true;
                                            return result;
                                        }).catch(err=>console.log(err));
                                            console.log(candidate);

            if (candidate) {
                return res.status(400).json({ message: 'Такой пользователь уже существует' })
            } else {

               const hashedPassword = await bcrypt.hash(password, 12)
               const dateNow = new Date().toISOString();


               await User.create({
                   mail: email,
                   name: 'имечко',
                   hash_pass: hashedPassword,
                   active: 0,
                   role: 0,
                   createdAt: dateNow,
                   updatedAt: dateNow
               }).then(res => {
                            const user = {
                                id: res.id,
                                name: res.name,
                                mail: res.mail,
                                active: res.active,
                                role: res.role,
                            }
                            console.log(user);
                   }).catch(err=>console.log(err));



               res.status(201).json({ message: 'Пользователь создан' })
            }



       } catch (e) {

        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })

     }
    });


// api/v1/auth/login

router.post(
    '/login',
    [
        check('user.email', 'Введите корректный email').normalizeEmail().isEmail(),
        check('user.password', 'Введите пароль').exists()
    ],
    async (req, res) => {
        try {



            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректный данные при входе в систему'
                })
            }

            const {email, password} = req.body.user;
            console.log(req.body.user);
            console.log(req.body);
            const user = await User.findOne({where: {mail: `${email}`}})
                                    .then(user=>{
                                        let result = (user === null) ?
                                            false : user;
                                        return result;
                                    }).catch(err=>console.log(err));



            if (!user) {
                return res.status(400).json({ message: 'Пользователь не найден' });
            } else {

                const isMatch = await bcrypt.compare(password, user.hash_pass);

                if (!isMatch) {

                    return res.status(400).json({ message: 'Неверный пароль, попробуйте снова' });
                }

                const token = jwt.sign(
                    {
                        userId: user.id,
                        user_role: user.role
                    },

                    'jwtSecret',
                    { expiresIn: '1h' }
                );

                res.json({ token, userId: user.id })

            }



        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
        }
    });
// Метод для валидации токена у уже авторизированного пользователя.
// В этом ответе отдаём роль.
router.get('/user', auth, async (req, res) =>{
    try {

        if (req.user){
            const {user_role, userId} = req.user
            return res.status(200).json({user_role, userId})
        } else {
            return res.status(401).json({ message: 'Not authorized' })
        }

    } catch (e) {
        return res.status(401).json({ message: 'Что-то явно пошло через ****!' })
    }

})


module.exports = router;

