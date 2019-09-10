const db = require('../../../../../config/database');
let Block = require('../../models/block');

Block = Block(db.sequelize, db.Sequelize);

const create = async (sectionalID, body) => {
  const { number } = body;

  Block.create({
    number,
    sectionalID,
  });
};

const createMany = async (sectionalID, body) => {
  const blocks = body.numbers;

  blocks.forEach(async (block) => {
    await create(sectionalID, block);
  });
};

const get = async (sectionalID, number) => {
  const data = await Block.findAll({
    where: {
      sectionalID,
      number,
    },
  });
  return data[0];
};

const getBySectional = async (sectionalID) => Block.findAll({
  where: { sectionalID },
});

const getAll = async () => Block.findAll();

const update = async (querySectional, queryBlock, body) => {
  const { number, sectionalID } = body;

  Block.update(
    { number, sectionalID },
    {
      where: {
        sectionalID: querySectional,
        number: queryBlock,
      },
    },
  );
};

const remove = async (sectionalID, number) => {
  Block.destroy({
    where: { sectionalID, number },
  });
};

module.exports = {
  create,
  createMany,
  get,
  getAll,
  update,
  remove,
  getBySectional,
};
