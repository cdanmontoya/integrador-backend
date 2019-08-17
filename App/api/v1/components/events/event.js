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
    let { name, startTime, endTime, eventType, stateID, description, userID, statusID } = body;
    let { blockID, roomID, sectionalID, eventID } = params;

    let updateArgs = {
        name,
        startTime,
        endTime,
        eventType,
        stateID,
        description,
        userID,
        sectionalID,
        blockID,
        roomID
    };

    if (stateID) {
        let event = await get(eventID);
        let actualState = event.stateID;

        try {
            checkState(actualState, stateID);
            updateArgs.stateID = stateID;
        } catch (error) {
            throw error;
        }
    }

    Event.update(
        updateArgs,
        { where: { id: eventID } }
    );
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
    remove
}