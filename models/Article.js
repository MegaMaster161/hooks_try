// подключаем ORM
const Sequelize = require('sequelize');

const sequelize = new Sequelize("hooks_try", "root", "",
    {dialect: "mysql",
        host: "localhost"
    });


const Article = sequelize.define("articles", {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    meta: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    categories: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    owner: {
        type: Sequelize.INTEGER,
        allowNull: false
    }

});

//sequelize.sync().then(result=>{
//    console.log(result);
//})
//    .catch(err=> console.log(err));


module.exports = Article;