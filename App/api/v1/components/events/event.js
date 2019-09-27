const { checkState } = require('./config');
const db = require('../../../../../config/database');

let Event = require('../../models/event');
let EventState = require('../../models/event_state');
let EventType = require('../../models/event_type');

Event = Event(db.sequelize, db.Sequelize);
EventState = EventState(db.sequelize, db.Sequelize);
EventType = EventType(db.sequelize, db.Sequelize);

EventState.hasMany(Event, { foreignKey: 'stateID' });
Event.belongsTo(EventState, { foreignKey: 'stateID' });

EventType.hasMany(Event, { foreignKey: 'eventType' });
Event.belongsTo(EventType, { foreignKey: 'eventType' });

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
    include: [
      { model: EventState },
      { model: EventType },
    ],
    order: [['startTime', 'ASC']],
  });
  return data[0];
};

const getByRoom = async (params) => {
  const { sectionalID, blockID, roomID } = params;

  return Event.findAll({
    where: { sectionalID, blockID, roomID },
    include: [
      { model: EventState },
      { model: EventType },
    ],
    order: [['startTime', 'ASC']],
  });
};

const getAll = async () => Event.findAll({
  include: [
    { model: EventState },
    { model: EventType },
  ],
  order: [['startTime', 'ASC']],
});

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
