const db = require('../../../../../config/database');
const sequelize = db.sequelize;

const create = async (requestID, body) => {
    
    const query = `INSERT INTO Items_per_request (requestID, itemType, quantity) VALUES
        ('${requestID}', '${body.itemType}','${body.quantity}')`;

    await sequelize.query(query);
}

const createMany = async (requestID, items) => {
    for (let i = 0; i < items.length; i++) {
        await create(requestID, items[i]);
    }
}

const get = async (params) => {
    const query = `SELECT * FROM Items_per_request WHERE requestID = '${params.requestID}' AND itemType = '${params.itemType}'`;

    let data = await sequelize.query(query);
    data = JSON.parse(JSON.stringify(data[0]));

    return data[0];
}

const getByRequest = async (params) => {
    const query = `SELECT * FROM Items_per_request WHERE requestID = '${params.requestID}'`;

    let data = await sequelize.query(query);
    data = JSON.parse(JSON.stringify(data[0]));

    return data;
}

const getAll = async () => {
    const query = `SELECT * FROM Items_per_room`;

    let data = await sequelize.query(query);
    data = JSON.parse(JSON.stringify(data[0]));

    return data;
}

const remove = async (params) => {
    const query = `DELETE FROM Items_per_room WHERE requestID = '${params.requestID}' AND itemType = '${paras.itemType}'`;

    let res = await sequelize.query(query);
    return res[0].affectedRows;
}

module.exports = {
    create,
    createMany,
    get,
    getByRequest,
    getAll,
    remove,
}