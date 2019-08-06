const db = require('../../../../../config/database');
const sequelize = db.sequelize;

const create = async (sectionalID, blockID, body) => {
    const query = `INSERT INTO Room (id, blockID, sectionalID, capacity, type) VALUES
        ('${body.id}', '${blockID}','${sectionalID}', '${body.capacity}', '${body.type}')`;

    await sequelize.query(query);
}

const createMany = async (sectionalID, blockID, body) => {
    let rooms = body.rooms;
    
    for (let i = 0; i < rooms.length; i++) {
        await create(sectionalID, blockID, rooms[i]);
    }
}

const get = async (sectional, block, id) => {
    const query = `SELECT * FROM Room WHERE sectionalID = '${sectional}' AND blockID = '${block}' AND id = '${id}'`;

    let data = await sequelize.query(query);
    data = JSON.parse(JSON.stringify(data[0]));

    return data[0];
}

const getByBlock = async (sectional, block) => {
    const query = `SELECT * FROM Room WHERE sectionalID = '${sectional}' AND blockID = '${block}'`;

    let data = await sequelize.query(query);
    data = JSON.parse(JSON.stringify(data[0]));

    return data;
}

const getAll = async () => {
    const query = `SELECT * FROM Room`;

    let data = await sequelize.query(query);
    data = JSON.parse(JSON.stringify(data[0]));

    return data;
}

const update = async (sectional, block, id, body) => {
    !body.sectionalID ? sectional : body.sectional;
    if (!body.sectionalID) {
        body.sectionalID = sectional
    } 

    const query = `UPDATE Room SET id = '${body.id}',
        sectionalID = '${body.sectionalID}', capacity = '${body.capacity}', type = '${body.type}'
        WHERE sectionalID = '${sectional}'  AND blockID = '${block}' AND id = '${id}'`;

    let res = await sequelize.query(query);
    return res[0].info;
}

const remove = async (sectional, block, id) => {
    const query = `DELETE FROM Room WHERE sectionalID = '${sectional}'  AND blockID = '${block}' AND id = '${id}'`;

    let res = await sequelize.query(query);
    return res[0].affectedRows;
}

module.exports = {
    create,
    createMany,
    get,
    getByBlock,
    getAll,
    update,
    remove,
}