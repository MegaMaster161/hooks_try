'use strict';
//

const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS'){
        return next()
    }


    try {
        // определяем токен
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({message: 'Авторизируйтесь! Token'});
        }
        // если токен присутствует, его надо верифицировать.
        const result = jwt.verify(token,
                                   'jwtSecret');

    req.user = result;
    next();

    } catch (e) {
       res.status(401).json({message: 'Авторизируйтесь! В catch'});
   }
};