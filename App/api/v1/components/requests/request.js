const config = require('./config');
const db = require('../../../../../config/database');

let Request = require('../../models/request');
Request = Request(db.sequelize, db.Sequelize);
// let ItemsPerRequest = require('../../models/items_per_request');

const itemsPerRequest = require('../items-per-request/itemsPerRequest')


const create = async (body) => {
    let { requestType, description, stateID, createdBy, sectionalID, blockID, roomID, startTime, endTime, items } = body;
    let createdAt = new Date();
    startTime = new Date(startTime);
    endTime = new Date(endTime);

    Request.create({
        requestType,
        description,
        stateID,
        createdBy,
        createdAt,
        sectionalID,
        blockID,
        roomID,
        startTime,
        endTime
    }).then(request => {
        let requestID = request.dataValues.id;
        itemsPerRequest.createMany(requestID, items);
    });
}

const get = async (id) => {
    let data = await Request.findAll({ where: { id } });
    return data[0];
}

const getAll = async () => {
    return Request.findAll();
}

const update = async (id, body) => {
    let { requestType, description, stateID, createdBy, sectionalID, blockID, roomID, eventID, startTime, endTime } = body;

    let updateArgs = {
        requestType, description, createdBy, sectionalID, blockID, roomID, eventID, startTime, endTime
    };

    if (stateID) {
        let request = await get(id);
        let actualState = request.stateID;

        try {
            checkState(requestType, actualState, stateID);
            updateArgs.stateID = stateID;
        } catch (error) {
            throw error;
        }
    }

    Request.update(
        updateArgs,
        { where: { id } }
    );
}

const remove = async (id) => {

    Request.destroy({ where: { id } })
    // const query = `DELETE FROM Request WHERE id = '${id}'`;

    // let res = await sequelize.query(query);
    // return res[0].affectedRows;
}

const checkState = (requestType, actualState, newState) => {
    if (actualState == config.states.CANCELED || actualState == config.states.REJECTED || actualState == config.states.DONE) {
        throw "Error: cannot update state"
    }

    switch (requestType) {
        case config.types.RESERVE:
            if (actualState == config.states.PENDING) {
                if (newState != config.types.APPROVED && newState != config.types.REJECTED && newState != config.types.CANCELED) {
                    return;
                } else {
                    throw "Error: Can't update state"
                }
            }

            if (actualState == config.states.APPROVED) {
                if (newState != config.states.CANCELED) {
                    throw "Error: Can't update state"
                }
            }
            break;

        case config.types.ASSISTANCE:
            if (actualState == config.states.PENDING) {
                if (newState != config.types.IN_COURSE && newState != config.types.REJECTED && newState != config.types.CANCELED) {
                    throw "Error: Can't update state"
                }
            }

            if (actualState == config.states.IN_COURSE) {
                if (newState != config.states.DONE) {
                    throw "Error: Can't update state"
                }
            }
            break;

        case config.types.LOAN:
            if (actualState == config.states.PENDING) {
                if (newState != config.types.APPROVED && newState != config.types.REJECTED && newState != config.types.CANCELED) {
                    throw "Error: Can't update state";
                }
            }

            if (actualState == config.states.APPROVED) {
                if (newState != config.states.IN_COURSE) {
                    throw "Error: Can't update state";
                }
            }

            if (actualState == config.types.IN_COURSE) {
                if (newState != config.types.DONE) {
                    throw "Error: Can't update state";
                }
            }
            break;
    }
}

module.exports = {
    create,
    get,
    getAll,
    update,
    remove
}