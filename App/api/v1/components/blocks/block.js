const db = require('../../../../../config/database');
let Block = require('../../models/block');
Block = Block(db.sequelize, db.Sequelize);

const create = async (sectionalID, body) => {
    let { number } = body;

    Block.create({
        number,
        sectionalID
    });
}

const createMany = async (sectionalID, body) => {
    let blocks = body.numbers;

    for (let i = 0; i < blocks.length; i++) {
        await create(sectionalID, blocks[i]);
    }
}

const get = async (sectionalID, number) => {
    let data = await Block.findAll({
        where: {
            sectionalID,
            number
        }
    });
    return data[0];
}

const getBySectional = async (sectionalID) => {
    return Block.findAll({
        where: { sectionalID }
    });
}

const getAll = async () => {
    return Block.findAll();
}

const update = async (query_sectional, query_block, body) => {
    let { number, sectionalID } = body;

    Block.update(
        { number, sectionalID },
        { where: {
            sectionalID: query_sectional,
            number: query_block
        }}
    );
}

const remove = async (sectionalID, number) => {
    Block.destroy({
        where: { sectionalID, number }
    });
}

const getRooms = async (sectionalID, blockID) => {
    let Room = require('../../models/room');
    Room = Room(db.sequelize, db.Sequelize);

    Room.findAll({
        where: {
            sectionalID,
            blockID
        }
    });
}

module.exports = {
    create,
    createMany,
    get,
    getAll,
    update,
    remove,
    getBySectional,
    getRooms
}