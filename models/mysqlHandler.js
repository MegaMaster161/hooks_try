const Sequelize = require('sequelize');

const sequelize = new Sequelize("hooks_try", "root", "",
    {dialect: "mysql",
        host: "localhost"
    });


module.exports = sequelize;
