const { checkState } = require('./config');
const db = require('../../../../../config/database');
const itemsPerRequest = require('../items-per-request/itemsPerRequest');
const RequestRecord = require('./request-record');

const { Op } = db.Sequelize;

let Request = require('../../models/request');
let RequestType = require('../../models/request_type');
let ItemsPerRequest = require('../../models/items_per_request');

Request = Request(db.sequelize, db.Sequelize);
RequestType = RequestType(db.sequelize, db.Sequelize);
ItemsPerRequest = ItemsPerRequest(db.sequelize, db.Sequelize);


RequestType.hasMany(Request, { foreignKey: 'requestType' });
Request.belongsTo(RequestType, { foreignKey: 'requestType' });
Request.hasMany(ItemsPerRequest, { foreignKey: 'requestID' });
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
  ],
  order: [['startTime', 'DESC']],
});

const getAll = async () => Request.findAll({
  include: [
    { model: RequestType },
    { model: ItemsPerRequest },
  ],
  order: [['startTime', 'DESC']],
});

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

    if (checkState(requestType, actualState, stateID)) {
      updateArgs.stateID = stateID;
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
  update,
  remove,
  getByUser,
};
