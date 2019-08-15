const config = require('./config');
const db = require('../../../../../config/database');

let Event = require('../../models/event');
Event = Event(db.sequelize, db.Sequelize);


const create = async (params, body) => {
    let { name, startTime, endTime, eventType, stateID, description, userID } = body;
    let { sectionalID, blockID, roomID } = params;

    startTime = new Date(startTime);
    endTime = new Date(endTime);

    Event.create({
        name, startTime, endTime, eventType, stateID, description, userID, sectionalID, blockID, roomID
    });
}

const get = async (id) => {
    let data = await Event.findAll({
        where: { id }
    });
    return data[0];
}

const getByRoom = async (params) => {
    let { sectionalID, blockID, roomID } = params;

    return Event.findAll({
        where: { sectionalID, blockID, roomID }
    });
}

const getAll = async () => {
    return Event.findAll();
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
    Event.destroy({
        where: { id }
    });
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