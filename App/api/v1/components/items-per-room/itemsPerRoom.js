const db = require('../../../../../config/database');
let ItemsPerRoom = require('../../models/items_per_room');

ItemsPerRoom = ItemsPerRoom(db.sequelize, db.Sequelize);

const create = async (params, body) => {
  const { itemID } = body;
  const { sectionalID, blockID, roomID } = params;

  ItemsPerRoom.create({
    itemID,
    sectionalID,
    blockID,
    roomID,
  });
};

const createMany = async (sectionalID, blockID, body) => {
  const { rooms } = body;

  rooms.forEach(async (room) => {
    await create(sectionalID, blockID, room);
  });
};

const get = async (id) => {
  const data = await ItemsPerRoom.findAll({
    where: { id },
  });
  return data[0];
};

const getByRoom = async (params) => {
  const query = `SELECT items_per_room.id as iprID, item.id as itemID, sectionalID, blockID, roomID, item.name, item_status.description as status
        FROM items_per_room JOIN item JOIN item_status
        WHERE item.id = items_per_room.itemID and item.statusID = item_status.id
        AND sectionalID = '${params.sectionalID}' AND blockID = '${params.blockID}' AND roomID = '${params.roomID}'`;

  let data = await db.sequelize.query(query);
  data = JSON.parse(JSON.stringify(data[0]));

  return data;
};

const getAll = async () => ItemsPerRoom.findAll();

const update = async (id, body) => {
  const {
    itemID, sectionalID, blockID, roomID,
  } = body;

  ItemsPerRoom.update(
    {
      itemID, sectionalID, blockID, roomID,
    },
    { where: { id } },
  );
};

const remove = async (id) => {
  ItemsPerRoom.destroy({
    where: { id },
  });
};

module.exports = {
  create,
  createMany,
  update,
  get,
  getByRoom,
  getAll,
  remove,
};
