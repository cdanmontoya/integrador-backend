const db = require('../../../../../config/database');
const config = require('./config');

let User = require('../../models/user');
let UserType = require('../../models/user_type');

User = User(db.sequelize, db.Sequelize);
UserType = UserType(db.sequelize, db.Sequelize);

UserType.hasMany(User, { foreignKey: 'userType' });
User.belongsTo(UserType, { foreignKey: 'userType' });

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
    include: [
      { model: UserType },
    ],
  });
  return data[0];
};

const getAll = async () => User.findAll({
  include: [
    { model: UserType },
  ],
});

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

const getAssistants = async (logisticUnit) => User.findAll({ where: { logisticUnit } });

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

const isSystemAdmin = async (username) => {
  const user = await get(username);
  if (!user) {
    return false;
  }
  return user.userType === config.SYSTEM_ADMIN;
};


module.exports = {
  create,
  get,
  getAll,
  getAssistants,
  update,
  remove,
  isAdmin,
  isAssistant,
  isSystemAdmin,
};
