const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('mydb', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql', // or 'postgres', 'sqlite', 'mssql'
});

module.exports = sequelize;
