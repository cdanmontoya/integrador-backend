const { checkState } = require('./config');
const db = require('../../../../../config/database');
const itemsPerRequest = require('../items-per-request/itemsPerRequest');
const RequestRecord = require('./request-record');
const Event = require('../events/event');

const { Op } = db.Sequelize;

let Request = require('../../models/request');
let RequestType = require('../../models/request_type');
let ItemsPerRequest = require('../../models/items_per_request');
let RequestState = require('../../models/request_state');

Request = Request(db.sequelize, db.Sequelize);
RequestType = RequestType(db.sequelize, db.Sequelize);
ItemsPerRequest = ItemsPerRequest(db.sequelize, db.Sequelize);
RequestState = RequestState(db.sequelize, db.Sequelize);
RequestType.hasMany(Request, { foreignKey: 'requestType' });
RequestState.hasMany(Request, { foreignKey: 'stateID' });
Request.belongsTo(RequestState, { foreignKey: 'stateID' });
Request.belongsTo(RequestType, { foreignKey: 'requestType' });
Request.hasMany(ItemsPerRequest, { foreignKey: 'requestID' });

// Request.hasOne(Room, { foreignKey: 'roomID' });
ItemsPerRequest.belongsTo(Request, { foreignKey: 'requestID' });

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
  }).then(async (request) => {
    const requestID = request.dataValues.id;
    await itemsPerRequest.createMany(requestID, items);
    await RequestRecord.onUpdate(requestID, 'Created', createdBy, 1);
  });
};

const get = async (id) => {
  const data = await Request.findAll({
    where: { id },
    include: [
      { model: RequestType },
      { model: ItemsPerRequest },
      { model: RequestState },
    ],
    order: [['startTime', 'DESC']],
  });
  return data[0];
};

const getByUser = async (username) => Request.findAll({
  where: { createdBy: username },
  include: [
    { model: RequestType },
    { model: ItemsPerRequest },
    { model: RequestState },
  ],
  order: [['startTime', 'DESC']],
});

const getActiveRequestByUser = async (username) => Request.findAll({
  where: {
    createdBy: username,
    stateID: {
      [Op.or]: [1, 4, 5],
    },
  },
  include: [
    { model: RequestType },
    { model: ItemsPerRequest },
    { model: RequestState },
  ],
  order: [['startTime', 'DESC']],
});

const getRequestRecordByUser = async (username) => Request.findAll({
  where: {
    createdBy: username,
    stateID: {
      [Op.or]: [2, 3, 6],
    },
  },
  include: [
    { model: RequestType },
    { model: ItemsPerRequest },
    { model: RequestState },
  ],
  order: [['startTime', 'DESC']],
});

const getRoomsActiveRequests = async (username) => {
  const query = `SELECT r.id as requestID, r.requestType, r.description, r.stateID, r.createdBy, r.createdAt, r.sectionalID, r.blockID, r.roomID, r.eventID, r.startTime, r.endTime, rpl.logisticUnit FROM integrador.Request r INNER JOIN integrador.Rooms_per_Logistic_Unit rpl
  ON r.roomID=rpl.roomID AND r.blockID=rpl.blockID AND r.sectionalID=rpl.sectionalID 
  AND rpl.logisticUnit='${username}' AND r.requestType=r.stateID AND r.requestType=1;`;

  let data = await db.sequelize.query(query);
  data = JSON.parse(JSON.stringify(data[0]));

  return data;
};


const getAll = async () => Request.findAll({
  include: [
    { model: RequestType },
    { model: ItemsPerRequest },
    { model: RequestState },
  ],
  order: [['startTime', 'DESC']],
});

const update = async (id, body) => {
  const {
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
    description, createdBy, sectionalID, blockID, roomID, eventID, startTime, endTime,
  };

  if (stateID) {
    const request = await get(id);
    const { actualState, requestType } = request;

    if (checkState(requestType, actualState, stateID)) {
      updateArgs.stateID = stateID;
    }

    if (requestType === 1 && stateID === 4) {
      const eventParams = {
        sectionalID: request.sectionalID,
        blockID: request.blockID,
        roomID: request.roomID,
      };

      const eventBody = {
        name: request.description,
        eventType: 1,
        stateID: 1,
        description: request.description,
        userID: request.createdBy,
        startTime: request.startTime,
        endTime: request.endTime,
      };

      Event.create(eventParams, eventBody);
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

module.exports = {
  create,
  get,
  getAll,
  getActiveRequestByUser,
  getRequestRecordByUser,
  getRoomsActiveRequests,
  update,
  remove,
  getByUser,
};
