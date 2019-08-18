const db = require('../../../../../config/database');
let RoomsPerTurn = require('../../models/rooms_per_turn');

RoomsPerTurn = RoomsPerTurn(db.sequelize, db.Sequelize);

const create = async (params, body) => {
  const { turnID } = params;
  const { sectionalID, blockID, roomID } = body;

  RoomsPerTurn.create({
    turnID, sectionalID, blockID, roomID,
  })
    .catch((err) => console.log(err));
};

const get = async (turnID, sectionalID, blockID, roomID) => {
  const data = await RoomsPerTurn.findAll({
    where: {
      turnID, sectionalID, blockID, roomID,
    },
  });
  return data[0];
};

const getByTurn = async (turnID) => RoomsPerTurn.findAll({
  where: { turnID },
});

const getAll = async () => RoomsPerTurn.findAll();

const remove = async (turnID, sectionalID, blockID, roomID) => {
  RoomsPerTurn.destroy({
    where: {
      turnID, sectionalID, blockID, roomID,
    },
  });
};

module.exports = {
  create,
  get,
  getByTurn,
  getAll,
  remove,
};
