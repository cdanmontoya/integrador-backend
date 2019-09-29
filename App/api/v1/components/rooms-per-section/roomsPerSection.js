const db = require('../../../../../config/database');
let RoomsPerSection = require('../../models/rooms_per_section');

RoomsPerSection = RoomsPerSection(db.sequelize, db.Sequelize);

const create = async (params, body) => {
  const { sectionID } = params;
  const { sectionalID, blockID, roomID } = body;

  RoomsPerSection.create({
    sectionID, sectionalID, blockID, roomID,
  });
};

const get = async (id) => {
  const data = await RoomsPerSection.findAll({
    where: { id },
  });
  return data[0];
};

const getBySection = async (sectionID) => RoomsPerSection.findAll({
  where: { sectionID },
});

const getAll = async () => RoomsPerSection.findAll();

const remove = async (id) => {
  RoomsPerSection.destroy({
    where: { id },
  });
};

module.exports = {
  create,
  get,
  getBySection,
  getAll,
  remove,
};
