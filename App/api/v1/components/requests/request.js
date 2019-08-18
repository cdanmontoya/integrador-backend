const config = require('./config');
const db = require('../../../../../config/database');

let Request = require('../../models/request');

Request = Request(db.sequelize, db.Sequelize);
// let ItemsPerRequest = require('../../models/items_per_request');

const itemsPerRequest = require('../items-per-request/itemsPerRequest');


const create = async (body) => {
  let {
    startTime, endTime,
  } = body;

  const {
    requestType, description, stateID, createdBy, sectionalID, blockID, roomID, items,
  } = body;

  const createdAt = new Date();
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
    endTime,
  }).then((request) => {
    const requestID = request.dataValues.id;
    itemsPerRequest.createMany(requestID, items);
  });
};

const get = async (id) => {
  const data = await Request.findAll({ where: { id } });
  return data[0];
};

const getAll = async () => Request.findAll();

const update = async (id, body) => {
  const {
    requestType,
    description,
    stateID,
    createdBy,
    sectionalID,
    blockID,
    roomID,
    eventID,
    startTime,
    endTime,
  } = body;

  const updateArgs = {
    requestType, description, createdBy, sectionalID, blockID, roomID, eventID, startTime, endTime,
  };

  if (stateID) {
    const request = await get(id);
    const actualState = request.stateID;

    try {
      checkState(requestType, actualState, stateID);
      updateArgs.stateID = stateID;
    } catch (error) {
      throw error;
    }
  }

  Request.update(
    updateArgs,
    { where: { id } },
  );
};

const remove = async (id) => {
  Request.destroy({ where: { id } });
};

const checkState = (requestType, actualState, newState) => {
  if (actualState === config.states.CANCELED || actualState === config.states.REJECTED
    || actualState === config.states.DONE) {
    throw new Error('Error: cannot update state');
  }

  switch (requestType) {
    case config.types.RESERVE:
      if (actualState === config.states.PENDING) {
        if (newState !== config.types.APPROVED && newState !== config.types.REJECTED
          && newState !== config.types.CANCELED) {
          return;
        }
        throw new Error("Error: Can't update state");
      }

      if (actualState === config.states.APPROVED) {
        if (newState !== config.states.CANCELED) {
          throw new Error("Error: Can't update state");
        }
      }
      break;

    case config.types.ASSISTANCE:
      if (actualState === config.states.PENDING) {
        if (newState !== config.types.IN_COURSE && newState !== config.types.REJECTED
          && newState !== config.types.CANCELED) {
          throw new Error("Error: Can't update state");
        }
      }

      if (actualState === config.states.IN_COURSE) {
        if (newState !== config.states.DONE) {
          throw new Error("Error: Can't update state");
        }
      }
      break;

    case config.types.LOAN:
      if (actualState === config.states.PENDING) {
        if (newState !== config.types.APPROVED && newState !== config.types.REJECTED
          && newState !== config.types.CANCELED) {
          throw new Error("Error: Can't update state");
        }
      }

      if (actualState === config.states.APPROVED) {
        if (newState !== config.states.IN_COURSE) {
          throw new Error("Error: Can't update state");
        }
      }

      if (actualState === config.types.IN_COURSE) {
        if (newState !== config.types.DONE) {
          throw new Error("Error: Can't update state");
        }
      }
      break;

    default:
      throw new Error('Error: Case not supported');
  }
};

module.exports = {
  create,
  get,
  getAll,
  update,
  remove,
};
