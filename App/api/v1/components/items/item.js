const db = require('../../../../../config/database');
const sequelize = db.sequelize;

const config = require('./config');

const create = async (body) => {
    const query = `INSERT INTO Item (name, typeID, statusID) VALUES
    ('${body.name}', '${body.typeID}', '${body.statusID}')`;

    await sequelize.query(query);
}

const get = async (id) => {
    const query = `SELECT * FROM Item WHERE Item.id = '${id}'`;

    let data = await sequelize.query(query);
    data = JSON.parse(JSON.stringify(data[0]));

    return data[0];
}

const getAll = async () => {
    const query = `SELECT * FROM Item`;

    let data = await sequelize.query(query);
    data = JSON.parse(JSON.stringify(data[0]));

    return data;
}

const update = async (id, body) => {
    const query = `UPDATE Item SET name = '${body.name}', typeID = '${body.typeID}', statusID = '${body.statusID}',
    WHERE id = '${id}'`;

    let res = await sequelize.query(query);
    return res[0].info;
}

const remove = async (id) => {
    const query = `DELETE FROM Item WHERE id = '${id}'`;

    let res = await sequelize.query(query);
    return res[0].affectedRows;
}

const changeState = async (params, body) => {
    let event = await get(params.eventID);
    let actualState = event.stateID;
    let newState = body.stateID;

    const query = `UPDATE Item SET stateID = ${body.stateID} 
        WHERE id = '${params.eventID}'`;

    try {
        checkState(actualState, newState);

        let res = await sequelize.query(query);
        return res[0].info;

    } catch (error) {
        throw error;
    }
}

const checkState = (actualState, newState) => {
    if (actualState == newState) {
        throw "Error: the states must be different"
    }

    if (actualState == config.IN_LOAN) {
        if (newState == config.AVAILABLE || newState == config.NOT_AVAILABLE) {
            throw "Error: Can't change status";
        }
    }

    if (actualState == config.IN_LOAN || actualState == config.NOT_AVAILABLE) {
        if (newState != config.AVAILABLE) {
            throw "Error: Can not change status";
        }
    }
}

module.exports = {
    create,
    get,
    getAll,
    update,
    remove,
    changeState
}