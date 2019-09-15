const db = require('../../../../../config/database');
const config = require('./config');

let User = require('../../models/user');

User = User(db.sequelize, db.Sequelize);

const create = async (body) => {
  const {
    username, email, logisticUnit, userType,
  } = body;

  User.create({
    username,
    email,
    logisticUnit,
    userType,
  });
};

const get = async (username) => {
  const data = await User.findAll({
    where: { username },
  });
  return data[0];
};

const getAll = async () => User.findAll();

const update = async (queryUsername, body) => {
  const {
    username, email, logisticUnit, userType,
  } = body;

  User.update(
    {
      username, email, logisticUnit, userType,
    },
    { where: { username: queryUsername } },
  );
};

const remove = async (username) => {
  User.destroy({
    where: { username },
  });
};

const isAdmin = async (username) => {
  const user = await get(username);
  if (!user) {
    return false;
  }
  return user.userType === config.ADMIN;
};

const isAssistant = async (username) => {
  const user = await get(username);
  if (!user) {
    return false;
  }
  return user.userType === config.ASSISTANT;
};

module.exports = {
  create,
  get,
  getAll,
  update,
  remove,
  isAdmin,
  isAssistant,
};
