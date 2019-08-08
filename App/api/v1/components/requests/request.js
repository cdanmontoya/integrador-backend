const db = require('../../../../../config/database');
const sequelize = db.sequelize;

const itemsPerRequest = require('../items-per-request/itemsPerRequest')

const config = require('./config');

const create = async (body) => {
    const query = `INSERT INTO Request (requestType, description, stateID, createdBy, createdAt, sectionalID, blockID, roomID, startTime, endTime) VALUES
    ('${body.requestType}', '${body.description}', '${body.stateID}', '${body.createdBy}', '${body.createdAt}', '${body.sectionalID}', '${body.blockID}', '${body.roomID}', '${body.startTime}', '${body.endTime}')`;

    let res = await sequelize.query(query);

    itemsPerRequest.createMany(res[0], body.items);
}

const get = async (id) => {
    const query = `SELECT * FROM Request WHERE id = '${id}'`;

    let data = await sequelize.query(query);

    data = JSON.parse(JSON.stringify(data[0]));

    return data[0];
}

const getAll = async () => {
    const query = `SELECT * FROM Request`;

    let data = await sequelize.query(query);
    data = JSON.parse(JSON.stringify(data[0]));
    
    return data;
}

const update = async (id, body) => {
    const query = `UPDATE Request SET
        requestType = '${body.requestType}', description = '${body.description}', statusID ='${body.statusID}', createdBy = '${body.createdBy}', createdAt = '${body.createdAt}', attendedBy = '${body.attendedBy}', sectionalID = '${body.sectionalID}', blockID = '${body.blockID}', roomID = '${body.roomID}', eventID = '${body.eventID}', startTime = '${body.startTime}', endTime = '${body.endTime}'
        WHERE id = '${id}'`;

    let res = await sequelize.query(query);
    return res[0].info;
}

const remove = async (id) => {
    const query = `DELETE FROM Request WHERE id = '${id}'`;

    let res = await sequelize.query(query);
    return res[0].affectedRows;
}

const changeState = async (params, body) => {
    let request = await get(params.requestID);
    let requestType = request.requestType;
    let actualState = request.stateID;
    let newState = body.stateID;

    const query = `UPDATE Request SET stateID = ${body.stateID} 
        WHERE id = '${params.requestID}'`;

    try {
        checkState(requestType, actualState, newState);

        let res = await sequelize.query(query);
        return res[0].info;

    } catch (error) {
        throw error;
    }
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
    remove,
    changeState
}