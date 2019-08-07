const db = require('../../../../../config/database');
const sequelize = db.sequelize;

const create = async (params, body) => {
    
    const query = `INSERT INTO Items_per_room (itemID, sectionalID, blockID, roomID) VALUES
        ('${body.itemID}', '${params.sectionalID}','${params.blockID}', '${params.roomID}')`;

    await sequelize.query(query);
}

const createMany = async (sectionalID, blockID, body) => {
    let rooms = body.rooms;
    
    for (let i = 0; i < numbers.length; i++) {
        await create(sectionalID, blockID, rooms[i]);
    }
}

const get = async (params) => {
    const query = `SELECT * FROM Room WHERE sectionalID = '${sectional}' AND blockID = '${block}' AND id = '${id}'`;

    let data = await sequelize.query(query);
    data = JSON.parse(JSON.stringify(data[0]));

    return data[0];
}

// const getByBlock = async (sectional, block) => {
//     const query = `SELECT * FROM Room WHERE sectionalID = '${sectional}' AND blockID = '${block}'`;

//     let data = await sequelize.query(query);
//     data = JSON.parse(JSON.stringify(data[0]));

//     return data;
// }

const getByRoom = async (params) => {
    const query = `SELECT item.id as itemID, sectionalID, blockID, roomID, item.name, item_status.description as status
        FROM items_per_room JOIN item JOIN item_status
        WHERE item.id = items_per_room.itemID and item.statusID = item_status.id
        AND sectionalID = '${params.sectionalID}' AND blockID = '${params.blockID}' AND roomID = '${params.roomID}'`;

    let data = await sequelize.query(query);
    data = JSON.parse(JSON.stringify(data[0]));

    return data;
}

const getAll = async () => {
    const query = `SELECT * FROM Items_per_room`;

    let data = await sequelize.query(query);
    data = JSON.parse(JSON.stringify(data[0]));

    return data;
}

// const update = async (sectional, block, id, body) => {
//     !body.sectionalID ? sectional : body.sectional;
//     if (!body.sectionalID) {
//         body.sectionalID = sectional
//     } 

//     const query = `UPDATE Room SET id = '${body.id}',
//         sectionalID = '${body.sectionalID}', capacity = '${body.capacity}', type = '${body.type}'
//         WHERE sectionalID = '${sectional}'  AND blockID = '${block}' AND id = '${id}'`;

//     let res = await sequelize.query(query);
//     return res[0].info;
// }

const remove = async (id) => {
    const query = `DELETE FROM Items_per_room WHERE id = '${id}'`;

    let res = await sequelize.query(query);
    return res[0].affectedRows;
}

module.exports = {
    create,
    createMany,
    get,
    getByRoom,
    getAll,
    remove,
}