const db = require('../../../../../config/database');
const sequelize = db.sequelize;

const config = require('./config');

const create = async (params, body) => {
    const query = `INSERT INTO Event (name, startTime, endTime, eventType, sectionalID, blockID, roomID, stateID, description, userID)
    VALUES ('${body.name}', '${body.startTime}', '${body.endTime}', '${body.eventType}', '${params.sectionalID}',
     '${params.blockID}', '${params.roomID}', '${body.stateID}', '${body.description}', '${body.userID}')`;

    await sequelize.query(query);
}

const get = async (id) => {
    const query = `SELECT * FROM Event WHERE Event.id = '${id}'`;

    let data = await sequelize.query(query);
    data = JSON.parse(JSON.stringify(data[0]));

    return data[0];
}

const getByRoom = async (params) => {
    const query = `SELECT * FROM Event WHERE sectionalID = ${params.sectionalID} AND blockID = ${params.blockID} AND roomID = ${params.roomID}`;

    let data = await sequelize.query(query);
    data = JSON.parse(JSON.stringify(data[0]));

    return data;
}

const getAll = async () => {
    const query = `SELECT * FROM Event`;

    let data = await sequelize.query(query);
    data = JSON.parse(JSON.stringify(data[0]));

    return data;
}

const update = async (params, body) => {
    const query = `UPDATE Event SET name = '${body.name}',
        startTime = '${body.startTime}', endTime = '${body.endTime}', eventType = '${body.eventType}', 
        stateID = '${body.stateID}', description = '${body.description}', userID = '${body.userID}',
        blockID = '${params.blockID}', roomID = '${params.roomID}', sectionalID = '${params.sectionalID}'
        WHERE id = '${params.eventID}'`;

    let res = await sequelize.query(query);
    return res[0].info;
}

const changeState = async (params, body) => {
    let event = await get(params.eventID);
    let actualState = event.stateID;
    let newState = body.stateID;

    const query = `UPDATE Event SET stateID = ${body.stateID} 
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

    // If the actual state is 'confirmed', it just can change to 'canceled' or 'in course'
    if (actualState == config.CONFIRMED) {
        if (newState == 4) {
            throw "Error: Can't change status from 'confirmed to 'done'";
        }
    }

    if (actualState == config.CANCELED || actualState == config.DONE) {
        throw "Error: Can not change status from 'canceled' or 'done'";
    }

    if (actualState == config.IN_COURSE) {
        if (newState != config.DONE) {
            throw "Error: Can not change status from 'in course' to another state";
        }
    }
}

const remove = async (id) => {
    const query = `DELETE FROM Event WHERE id = '${id}'`;

    let res = await sequelize.query(query);
    return res[0].affectedRows;
}

module.exports = {
    create,
    get,
    getByRoom,
    getAll,
    update,
    remove,
    changeState
}