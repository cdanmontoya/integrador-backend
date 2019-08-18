const config = require('./config');
const db = require('../../../../../config/database');

let Event = require('../../models/event');

Event = Event(db.sequelize, db.Sequelize);

const create = async (params, body) => {
  let {
    startTime, endTime,
  } = body;

  const {
    name, eventType, stateID, description, userID,
  } = body;

  const { sectionalID, blockID, roomID } = params;

  startTime = new Date(startTime);
  endTime = new Date(endTime);

  Event.create({
    name, startTime, endTime, eventType, stateID, description, userID, sectionalID, blockID, roomID,
  });
};

const get = async (id) => {
  const data = await Event.findAll({
    where: { id },
  });
  return data[0];
};

const getByRoom = async (params) => {
  const { sectionalID, blockID, roomID } = params;

  return Event.findAll({
    where: { sectionalID, blockID, roomID },
  });
};

const getAll = async () => Event.findAll();

const checkState = (actualState, newState) => {
  // If the actual state is 'confirmed', it just can change to 'canceled' or 'in course'
  if (actualState === config.CONFIRMED) {
    if (newState === 4) {
      return false;
    }
  }

  if (actualState === config.CANCELED || actualState === config.DONE) {
    return false;
  }

  if (actualState === config.IN_COURSE) {
    if (newState !== config.DONE) {
      return false;
    }
  }
  return true;
};

const update = async (params, body) => {
  const {
    name, eventType, stateID, description, userID,
  } = body;

  let {
    startTime, endTime,
  } = body;

  const {
    blockID, roomID, sectionalID, eventID,
  } = params;

  startTime = new Date(startTime);
  endTime = new Date(endTime);

  const updateArgs = {
    name,
    startTime,
    endTime,
    eventType,
    stateID,
    description,
    userID,
    sectionalID,
    blockID,
    roomID,
  };

  if (stateID) {
    const event = await get(eventID);
    const actualState = event.stateID;

    if (checkState(actualState, stateID)) {
      updateArgs.stateID = stateID;
    }
  }

  Event.update(
    updateArgs,
    { where: { id: eventID } },
  );
};


const remove = async (id) => {
  Event.destroy({
    where: { id },
  });
};

module.exports = {
  create,
  get,
  getByRoom,
  getAll,
  update,
  remove,
};
