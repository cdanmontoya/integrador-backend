const db = require('../../../../../config/database');
const sequelize = db.sequelize;

const create = async (body) => {
    const query = `INSERT INTO Sectional (id, name, address, phoneNumber) VALUES
    ('${body.id}','${body.name}', '${body.address}', '${body.phoneNumber}')`;

    await sequelize.query(query);
}

const get = async (id) => {
    const query = `SELECT * FROM Sectional WHERE Sectional.id = '${id}'`;

    let data = await sequelize.query(query);
    data = JSON.parse(JSON.stringify(data[0]));

    return data[0];
}

const getAll = async () => {
    const query = `SELECT * FROM Sectional`;

    let data = await sequelize.query(query);
    data = JSON.parse(JSON.stringify(data[0]));

    return data;
}

const update = async (id, body) => {
    const query = `UPDATE Sectional SET name = '${body.name}', address = '${body.address}', phoneNumber = '${body.phoneNumber}'
        WHERE id = '${id}'`;

    let res = await sequelize.query(query);
    return res[0].info;
}

const remove = async (id) => {
    const query = `DELETE FROM Sectional WHERE id = '${id}'`;

    let res = await sequelize.query(query);
    return res[0].affectedRows;
}

const getBlocks = async (id) => {
    const query = `SELECT * FROM Block WHERE sectionalID = '${id}'`;

    let data = await sequelize.query(query);
    data = JSON.parse(JSON.stringify(data[0]));

    return data;
}



module.exports = {
    create,
    get,
    getAll,
    update,
    remove,
    getBlocks
}