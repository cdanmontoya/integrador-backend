const db = require('../../../../../config/database');

let Sectional = require('../../models/sectional');

Sectional = Sectional(db.sequelize, db.Sequelize);

const create = async (body) => {
  const {
    id, name, address, phoneNumber,
  } = body;

  Sectional.create({
    id,
    name,
    address,
    phoneNumber,
  });
};

const get = async (id) => {
  const data = await Sectional.findAll({
    where: { id },
  });
  return data[0];
};

const getAll = async () => Sectional.findAll();

const update = async (queryID, body) => {
  const {
    id, name, address, phoneNumber,
  } = body;

  Sectional.update(
    {
      id, name, address, phoneNumber,
    },
    { where: { id: queryID } },
  );
};

const remove = async (id) => {
  Sectional.destroy({
    where: { id },
  });
};

module.exports = {
  create,
  get,
  getAll,
  update,
  remove,
};
