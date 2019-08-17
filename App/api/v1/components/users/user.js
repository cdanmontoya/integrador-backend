const db = require('../../../../../config/database');
const config = require('./config');

let User = require('../../models/user');
User = User(db.sequelize, db.Sequelize);

const create = async (body) => {
    let { username, email, logisticUnit, userType } = body;

    User.create({
        username,
        email,
        logisticUnit,
        userType
    });
}

const get = async (username) => {
    let data = await User.findAll({
        where: { username }
    });
    return data[0];
}

const getAll = async () => {
    return User.findAll();
}

const update = async (query_username, body) => {
    let { username, email, logisticUnit, userType } = body;

    User.update(
        { username, email, logisticUnit, userType },
        { where: { username: query_username } }
    );
}

const remove = async (username) => {
    User.destroy({
        where: { username }
    });
}

const isAdmin = async (username) => {
    let user = await get(username);
    if (!user) {
        return false;
    }
    return user.userType == config.ADMIN;
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