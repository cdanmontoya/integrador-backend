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

const getAvailableRooms = async (startTime, endTime) => {
    console.log(startTime);

    startTime = new Date(startTime);
    endTime = new Date(endTime);
    
    const query = `select jeje.id as roomID, jeje.blockID, jeje.sectionalID, jeje.capacity, jeje.type  
        from room as jeje left join 
        (select r.id, r.blockID, r.sectionalID from event as e inner join room as r on r.id = e.roomID and r.blockID = e.blockID and r.sectionalID = e.sectionalID where (e.startTime between '${startTime}' and '${endTime}')  or (e.endTime between '${startTime}' and '${endTime}')) as result
        on jeje.id = result.id and jeje.blockID = result.blockID and result.sectionalID = jeje.sectionalID where result.id is null;`

    let data = await db.sequelize.query(query);
    data = JSON.parse(JSON.stringify(data[0]));

    return data;
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
    getAvailableRooms,
    getAll,
    update,
    remove,
}