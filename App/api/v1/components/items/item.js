const config = require('./config');
const db = require('../../../../../config/database');

let Item = require('../../models/item');

Item = Item(db.sequelize, db.Sequelize);

const create = async (body) => {
  const { name, typeID, statusID } = body;

  Item.create({
    name,
    typeID,
    statusID,
  });
};

const get = async (id) => {
  const data = await Item.findAll({
    where: { id },
  });
  return data[0];
};

const getAll = async () => Item.findAll();

const update = async (queryID, body) => {
  const { name, typeID, statusID } = body;

  // If there is a new status, we neet to check if is a valid one
  // statusID has the new state from the request body
  if (statusID) {
    const item = await get(queryID);
    const actualState = item.statusID;

    try {
      checkState(actualState, statusID);
      Item.update(
        { name, typeID, statusID },
        { where: { id: queryID } },
      );
      return;
    } catch (err) {
      throw err;
    }
  }

  // Otherwise, just update the item
  Item.update(
    { name, typeID },
    { where: { id: queryID } },
  );
};

const remove = async (id) => {
  Item.destroy({
    where: { id },
  });
};

const checkState = (actualState, newState) => {
  if (actualState === config.RESERVED) {
    if (newState === config.NOT_AVAILABLE) {
      throw new Error("Error: Can't change status");
    }
  }

  if (actualState === config.IN_LOAN || actualState === config.NOT_AVAILABLE) {
    if (newState !== config.AVAILABLE) {
      throw new Error('Error: Can not change status');
    }
  }
};

module.exports = {
  create,
  get,
  getAll,
  update,
  remove,
};
