const db = require('../../../../../config/database');
const sequelize = db.sequelize;

const create = async (sectionalID, body) => {
    const query = `INSERT INTO Block (number, sectionalID) VALUES
    ('${body.number}','${sectionalID}')`;

    await sequelize.query(query);
}

const createMany = async (sectionalID, body) => {
    let numbers = body.numbers;
    
    for (let i = 0; i < numbers.length; i++) {
        await create(sectionalID, numbers[i]);
    }
}

const get = async (sectional, number) => {
    const query = `SELECT * FROM Block WHERE sectionalID = '${sectional}' AND number = '${number}'`;

    let data = await sequelize.query(query);
    data = JSON.parse(JSON.stringify(data[0]));

    return data[0];
}

const getBySectional = async (sectional) => {
    const query = `SELECT * FROM Block WHERE sectionalID = '${sectional}'`;

    let data = await sequelize.query(query);
    data = JSON.parse(JSON.stringify(data[0]));

    return data;
}

const getAll = async () => {
    const query = `SELECT * FROM Block`;

    let data = await sequelize.query(query);
    data = JSON.parse(JSON.stringify(data[0]));

    return data;
}

const update = async (sectional, number, body) => {
    const query = `UPDATE Block SET number = '${body.number}',
        sectionalID = '${body.sectionalID}' WHERE sectionalID = '${sectional}' AND number = '${number}'`;

    let res = await sequelize.query(query);
    return res[0].info;
}

const remove = async (sectional, number) => {
    const query = `DELETE FROM Block WHERE sectionalID = '${sectional}' AND number = '${number}'`;

    let res = await sequelize.query(query);
    return res[0].affectedRows;
}

const getRooms = async (sectional, number) => {
    const query = `SELECT * FROM Room WHERE WHERE sectionalID = '${sectional}' AND blockID = '${number}'`;

    let data = await sequelize.query(query);
    data = JSON.parse(JSON.stringify(data[0]));

    return data;
}



module.exports = {
    create,
    createMany,
    get,
    getAll,
    update,
    remove,
    getBySectional,
    getRooms
}