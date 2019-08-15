const Sequelize = require('sequelize');

const database = 'integrador';
const username = 'root';
const password = 'root';

const sequelize = new Sequelize(database, username, password, {
    host: 'localhost',
    dialect: 'mysql'
});

let db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;