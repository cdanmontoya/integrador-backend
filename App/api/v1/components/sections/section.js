const db = require('../../../../../config/database');
const userUtil = require('../users/user');

let Section = require('../../models/section');
let RoomsPerSection = require('../../models/rooms_per_section');

Section = Section(db.sequelize, db.Sequelize);
RoomsPerSection = RoomsPerSection(db.sequelize, db.Sequelize);

Section.hasMany(RoomsPerSection, { foreignKey: 'sectionID' });
RoomsPerSection.belongsTo(Section, { foreignKey: 'sectionID' });

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
    include: [
      { model: RoomsPerSection },
    ],
  });
};

const getRoomsWithoutSection = async (params) => {
  const { username } = params;
  const query = `SELECT rplu.logisticUnit as logisticUnit, Room.id AS roomID, Room.blockID, Room.sectionalID, Room.capacity, Room.type 
  FROM Room LEFT JOIN Rooms_per_section AS rps ON Room.sectionalID = rps.sectionalID AND Room.blockID = rps.blockID AND Room.id = rps.roomID 
  join Rooms_per_Logistic_Unit as rplu ON Room.sectionalID = rplu.sectionalID AND Room.blockID = rplu.blockID AND Room.id = rplu.roomID 
  WHERE rps.id IS NULL;`;

  let data = await db.sequelize.query(query);
  data = JSON.parse(JSON.stringify(data[0]));

  return data.filter((room) => room.logisticUnit === username);
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
  getRoomsWithoutSection,
  getByLogisticUnit,
  getAll,
  update,
  remove,
};
