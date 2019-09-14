const db = require('../../../../../config/database');
let RequestRecord = require('../../models/request_record');

RequestRecord = RequestRecord(db.sequelize, db.Sequelize);

const onUpdate = async (requestID, observation, uptatedBy, stateID) => {
  const updatedAt = new Date();

  RequestRecord.create({
    requestID,
    observation,
    updatedAt,
    uptatedBy,
    stateID,
  });
};

module.exports = {
  onUpdate,
};
