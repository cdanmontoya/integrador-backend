const db = require('../../../../../config/database');
const sequelize = db.sequelize;

const create = async (body) => {
    const query = `INSERT INTO User (username, email, logistic_unit, user_type) VALUES
    ('${body.username}', '${body.email}', '${body.logistic_unit}', '${body.user_type}')`;

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
        email = '${body.email}', logistic_unit = '${body.logistic_unit}', user_type = '${body.user_type}'
        WHERE username = '${username}'`;

    let res = await sequelize.query(query);
    return res[0].info;
}

const remove = async (id) => {
    const query = `DELETE FROM User WHERE username = '${id}'`;

    let res = await sequelize.query(query);
    return res[0].affecterRows;
}

const isAdmin = async (id) => {
    let user = await get(id);
    if (!user) {
        return false;
    }
    return user.user_type == 1;
}

const isAux = async (id) => {
    let user = await get(id);
    if (!user) {
        return false;
    }
    return user.user_type == 2;
}

module.exports = {
    create,
    get,
    getAll,
    update,
    remove,
    isAdmin,
    isAux
}