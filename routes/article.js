
const {Router} = require('express');
const Article = require('../models/Article');
const auth = require('../midlware/auth.middleware');
const pagination = require('../midlware/pagination.middleware');
const roles = require('user-groups-roles');

const router = Router();

// api/v1/article/:id
// method GET for getting one article
router.get(
    '/:id',
    async (req, res) => {
        try {
            const articleId = req.params.id;
            const article = await Article.findOne({where: {id: `${articleId}`}})
                                    .then(article=>{
                                        let result = (article === null) ?
                                            false : article;
                                        return result;
                                    }).catch(err=>console.log(err));

            if (!article){

                res.status(500).json({ message: 'Данной статьи не существует' })

            } else {
                const {title, meta, categories,
                    description, body, owner,
                    createdAt } = article;

                res.status(201).json({ db: {
                title, meta, categories,
                    description, body, owner,
                    createdAt
                }
                })
            }

       } catch (e) {
           res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
       }

    }
);

// api/v1/article/:page/:article
// method GET for getting one article
router.get(
    '/:page/:articles',
    async (req, res) => {
        try {
            const page = +(req.params.page);
            const articlesOnPage = +(req.params.articles);
            const initFn = await pagination(Article, articlesOnPage, page);

           res.status(202).json(await JSON.parse(initFn));


        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
        }

    }
);



// api/v1/article/
// method POST for create article
router.post(
    '/', auth,
    async (req, res) => {

        try {
            const {user_role, userId} = req.user;
            const owner = userId;
            console.log(user_role);

            const value = roles.getRoleRoutePrivilegeValue(user_role, "/article", "POST");
                console.log(value);
            if (value){


                const {title, meta, categories,
                    description, body} = req.body.article;
                console.log(req.body.article);
                // всё отлично шоу мастгоу он.
                const createdAt = new Date().toISOString();
                const article = await Article.create({
                                             title, meta, categories,
                                             description, body, owner,
                                             createdAt
                                                    }).then(res => {
                                                        const article = {
                                                            id: res.id
                                                        }
                                                        console.log(JSON.stringify(article));
                                                    }).catch(err=>console.log(err));

                res.status(202).json({message: "Доступ получен."});

            } else {

                res.status(403).json({message: "Access is denied"});

            }


      } catch (e) {
          res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
        }

    }
);

module.exports = router;