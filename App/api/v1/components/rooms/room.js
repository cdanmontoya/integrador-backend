const db = require('../../../../../config/database');
let Room = require('../../models/room');
let Sectional = require('../../models/sectional');

Sectional = Sectional(db.sequelize, db.Sequelize);
Room = Room(db.sequelize, db.Sequelize);

Sectional.hasMany(Room, { foreignKey: 'sectionalID' });
Room.belongsTo(Sectional, { foreignKey: 'sectionalID' });

const create = async (sectionalID, blockID, body) => {
  const { id, capacity, type } = body;

  Room.create({
    sectionalID,
    blockID,
    id,
    capacity,
    type,
  });
};

const createMany = async (sectionalID, blockID, body) => {
  const { rooms } = body;

  rooms.forEach(async (room) => {
    await create(sectionalID, blockID, room);
  });
};

const get = async (sectionalID, blockID, id) => {
  const data = await Room.findAll({
    where: { sectionalID, blockID, id },
    include: [
      { model: Sectional }
    ],
  });

  return data[0];
};

const getByBlock = async (sectionalID, blockID) => Room.findAll({
  where: { sectionalID, blockID },
  include: [
    { model: Sectional }
  ],
});

const getAll = async () => Room.findAll({
  include: [
    { model: Sectional }
  ],
});

const getAvailableRooms = async (startTime, endTime) => {
  const newStartTime = new Date(startTime);
  const newEndTime = new Date(endTime);

  const query = `select jeje.id as roomID, jeje.blockID, jeje.sectionalID, jeje.capacity, jeje.type  
        from Room as jeje left join 
        (select r.id, r.blockID, r.sectionalID from Event as e inner join Room as r on r.id = e.roomID and r.blockID = e.blockID and r.sectionalID = e.sectionalID where (e.startTime between '${newStartTime}' and '${newEndTime}')  or (e.endTime between '${newStartTime}' and '${newEndTime}')) as result
        on jeje.id = result.id and jeje.blockID = result.blockID and result.sectionalID = jeje.sectionalID where result.id is null;`;

  let data = await db.sequelize.query(query);
  data = JSON.parse(JSON.stringify(data[0]));

  return data;
};

const update = async (querySectionalID, queryBlock, queryID, body) => {
  const {
    sectionalID, blockID, id, capacity, type,
  } = body;

  Room.update(
    {
      sectionalID, blockID, id, capacity, type,
    },
    {
      where: {
        sectionalID: querySectionalID,
        blockID: queryBlock,
        id: queryID,
      },
    },
  );
};

const remove = async (sectionalID, blockID, id) => {
  Room.destroy({
    where: { sectionalID, blockID, id },
  });
};

module.exports = {
  create,
  createMany,
  get,
  getByBlock,
  getAvailableRooms,
  getAll,
  update,
  remove,
};
