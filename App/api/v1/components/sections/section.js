const db = require('../../../../../config/database');
const userUtil = require('../users/user');

let Section = require('../../models/section');

Section = Section(db.sequelize, db.Sequelize);

const create = async (params, body) => {
  const { username } = params;
  const { name } = body;

  if (userUtil.isAdmin(username)) {
    Section.create({ logisticUnit: username, name });
  }
};

const get = async (id) => {
  const data = await Section.findAll({
    where: { id },
  });
  return data[0];
};

const getByLogisticUnit = async (params) => {
  const { username } = params;

  return Section.findAll({
    where: { logisticUnit: username },
  });
};

const getAll = async () => Section.findAll();

const update = async (params, body) => {
  const { sectionID } = params;
  const { name, newLogisticUnit } = body;

  Section.update(
    { logisticUnit: newLogisticUnit, name },
    { where: { id: sectionID } },
  );
};

const remove = async (id) => {
  Section.destroy({
    where: { id },
  });
};

module.exports = {
  create,
  get,
  getByLogisticUnit,
  getAll,
  update,
  remove,
};
