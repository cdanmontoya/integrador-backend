const config = require('./config');
const db = require('../../../../../config/database');
const itemsPerRequest = require('../items-per-request/itemsPerRequest');
const RequestRecord = require('./request-record');

let Request = require('../../models/request');
let RequestType = require('../../models/request_type');

Request = Request(db.sequelize, db.Sequelize);
RequestType = RequestType(db.sequelize, db.Sequelize);

RequestType.hasMany(Request, { foreignKey: 'requestType' });
Request.belongsTo(RequestType, { foreignKey: 'requestType' });


// Section.hasMany(Turn, { foreignKey: 'sectionID' });
// Turn.belongsTo(Section, { foreignKey: 'sectionID' });

// User.belongsTo(UsersContactsLists, {targetKey:'mobileNumber',foreignKey: 'mobileNumber'});
// then you can use this :

// User.findAll({
// include: [{
//     model: UsersContactsLists,
//     where: {
//         userId: 1
//     }
// }]

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
  const data = await Request.findAll({ where: { id } });
  return data[0];
};

const getByUser = async (username) => Request.findAll({
  where: { createdBy: username },
  include: [{ model: RequestType }],
  order: [['startTime', 'ASC']],
});

const getAll = async () => Request.findAll({ order: [['startTime', 'ASC']] });

const checkState = (requestType, actualState, newState) => {
  if (actualState === config.states.CANCELED || actualState === config.states.REJECTED
    || actualState === config.states.DONE) {
    return false;
  }

  switch (requestType) {
    case config.types.RESERVE:
      if (actualState === config.states.PENDING) {
        if (newState !== config.types.APPROVED && newState !== config.types.REJECTED
          && newState !== config.types.CANCELED) {
          return true;
        }
        return false;
      }

      if (actualState === config.states.APPROVED) {
        if (newState !== config.states.CANCELED) {
          return false;
        }
      }
      break;

    case config.types.ASSISTANCE:
      if (actualState === config.states.PENDING) {
        if (newState !== config.types.IN_COURSE && newState !== config.types.REJECTED
          && newState !== config.types.CANCELED) {
          return false;
        }
      }

      if (actualState === config.states.IN_COURSE) {
        if (newState !== config.states.DONE) {
          return false;
        }
      }
      break;

    case config.types.LOAN:
      if (actualState === config.states.PENDING) {
        if (newState !== config.types.APPROVED && newState !== config.types.REJECTED
          && newState !== config.types.CANCELED) {
          return false;
        }
      }

      if (actualState === config.states.APPROVED) {
        if (newState !== config.states.IN_COURSE) {
          return false;
        }
      }

      if (actualState === config.types.IN_COURSE) {
        if (newState !== config.types.DONE) {
          return false;
        }
      }
      break;

    default:
      return false;
  }
  return true;
};

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
  update,
  remove,
  getByUser,
};
