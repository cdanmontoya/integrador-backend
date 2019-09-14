const db = require('../../../../../config/database');
let ItemsPerRequest = require('../../models/items_per_request');

ItemsPerRequest = ItemsPerRequest(db.sequelize, db.Sequelize);

const create = async (requestID, body) => {
  const { itemType, quantity } = body;

  ItemsPerRequest.create({
    requestID,
    itemType,
    quantity,
  });
};

const createMany = async (requestID, items) => {
  items.forEach(async (item) => {
    await create(requestID, item);
  });
};

const get = async (params) => {
  const { requestID, itemType } = params;
  return ItemsPerRequest.findAll({
    where: { requestID, itemType },
  });
};

const getByRequest = async (params) => {
  const { requestID } = params;
  return ItemsPerRequest.findAll({
    where: { requestID },
  });
};

const getAll = async () => ItemsPerRequest.findAll();

const remove = async (params) => {
  const { requestID, itemType } = params;

  ItemsPerRequest.destroy({
    where: {
      requestID,
      itemType,
    },
  });
};

module.exports = {
  create,
  createMany,
  get,
  getByRequest,
  getAll,
  remove,
};
