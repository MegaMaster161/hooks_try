// подключаем конфиг и драйвер базы
//const sequelize = "./mysqlHandler";

const Sequelize = require('sequelize');

const sequelize = new Sequelize("hooks_try", "root", "",
    {dialect: "mysql",
        host: "localhost"
    });


const User = sequelize.define("users", {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    mail: {
        type: Sequelize.STRING,
        allowNull: false
    },
    hash_pass: {
        type: Sequelize.STRING,
        allowNull: false
    },
    active: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    role: {
        type: Sequelize.STRING,
        allowNull: false
    },
});



/*
sequelize.sync().then(result=>{
    console.log(result);
})
    .catch(err=> console.log(err));
*/
/*
const mysql = require('mysql2');
//
const connection = mysql.createConnectionPromise(
    {host: "localhost",
        user: "root",
        password: "",
        database: "hooks_try"});
    const User = {};

        User.findUser = (email) =>{
        const sql = `SELECT mail FROM users WHERE mail = ? `;
        connection
            .query(sql, email)
            .then((rows, field) =>{
                console.log('результат', field)})
            .catch((err) => console.log('Ошибка:', err));
    };

*/

module.exports = User;