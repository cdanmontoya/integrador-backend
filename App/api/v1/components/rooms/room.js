const db = require('../../../../../config/database');
let Room = require('../../models/room');
Room = Room(db.sequelize, db.Sequelize);

const create = async (sectionalID, blockID, body) => {
    let { id, capacity, type } = body;

    Room.create({
        sectionalID,
        blockID,
        id,
        capacity,
        type
    });
}

const createMany = async (sectionalID, blockID, body) => {
    let rooms = body.rooms;

    for (let i = 0; i < rooms.length; i++) {
        await create(sectionalID, blockID, rooms[i]);
    }
}

const get = async (sectionalID, blockID, id) => {
    let data = await Room.findAll({
        where: { sectionalID, blockID, id }
    });

    return data[0];
}

const getByBlock = async (sectionalID, blockID) => {
    return Room.findAll({
        where: { sectionalID, blockID }
    });
}

const getAll = async () => {
    return Room.findAll();
}

const update = async (query_sectionalID, query_block, query_id, body) => {
    let { sectionalID, blockID, id, capacity, type } = body;

    Room.update(
        { sectionalID, blockID, id, capacity, type },
        {
            where: {
                sectionalID: query_sectionalID,
                blockID: query_block,
                id: query_id
            }
        }
    );
}

const remove = async (sectionalID, blockID, id) => {
    Room.destroy({
        where: { sectionalID, blockID, id }
    });
}

module.exports = {
    create,
    createMany,
    get,
    getByBlock,
    getAll,
    update,
    remove,
}