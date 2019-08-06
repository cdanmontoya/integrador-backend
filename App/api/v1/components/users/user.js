const db = require('../../../../../config/database');
const sequelize = db.sequelize;

const config = require('./config');

const create = async (body) => {
    const query = `INSERT INTO User (username, email, logisticUnit, userType) VALUES
    ('${body.username}', '${body.email}', '${body.logisticUnit}', '${body.userType}')`;

    await sequelize.query(query);
}

const get = async (username) => {
    const query = `SELECT * FROM User WHERE User.username = '${username}'`;

    let data = await sequelize.query(query);
    data = JSON.parse(JSON.stringify(data[0]));

    return data;
}

const getAll = async () => {
    const query = `SELECT * FROM User`;

    let data = await sequelize.query(query);
    data = JSON.parse(JSON.stringify(data[0]));

    return data;
}

const update = async (username, body) => {
    const query = `UPDATE User SET username = '${body.username}',
        email = '${body.email}', logisticUnit = '${body.logisticUnit}', userType = '${body.userType}'
        WHERE username = '${username}'`;

    let res = await sequelize.query(query);
    return res[0].info;
}

const remove = async (username) => {
    const query = `DELETE FROM User WHERE username = '${username}'`;

    let res = await sequelize.query(query);
    return res[0].affectedRows;
}

const isAdmin = async (username) => {
    let user = await get(username);
    if (!user) {
        return false;
    }
    return user.user_type == config.ADMIN;
}

const isAssistant = async (username) => {
    let user = await get(username);
    if (!user) {
        return false;
    }
    return user.userType == config.ASSISTANT;
}

module.exports = {
    create,
    get,
    getAll,
    update,
    remove,
    isAdmin,
    isAssistant
}