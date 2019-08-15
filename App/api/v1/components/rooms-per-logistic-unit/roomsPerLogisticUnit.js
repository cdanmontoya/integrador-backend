const db = require('../../../../../config/database');
let RoomsPerLogisticUnit = require('../../models/rooms_per_logistic_unit');
RoomsPerLogisticUnit = RoomsPerLogisticUnit(db.sequelize, db.Sequelize);

const create = async (params, body) => {
    let unsupervisedRooms = await getUnsupervisedRooms();

    let isAvailable = unsupervisedRooms.find(element => {
        if (element.sectionalID == body.sectionalID && element.blockID == body.blockID && element.roomID == body.roomID) {
            return element;
        }
    })

    if (!isAvailable) {
        throw "Error: room is already supervised or does not exist";
    }

    let logisticUnit = params.username;
    let { sectionalID, blockID, roomID } = body;

    RoomsPerLogisticUnit.create({
        logisticUnit, sectionalID, blockID, roomID
    });
}

const get = async (id) => {
    let data = await RoomsPerLogisticUnit.findAll({
        where: { id }
    });
    return data[0];
}

const getUnsupervisedRooms = async () => {
    const query = `SELECT room.id AS roomID, room.blockID, room.sectionalID, room.capacity, room.type 
        FROM room LEFT JOIN rooms_per_logistic_unit AS rplu ON room.sectionalID = rplu.sectionalID AND room.blockID = rplu.blockID AND room.id = rplu.roomID 
        WHERE rplu.id IS NULL;`;

    let data = await db.sequelize.query(query);
    data = JSON.parse(JSON.stringify(data[0]));

    return data;
}

const getByLogisticUnit = async (logisticUnit) => {
    return RoomsPerLogisticUnit.findAll({
        where: { logisticUnit }
    });
}

const getAll = async () => {
    return RoomsPerLogisticUnit.findAll();
}

const remove = async (id) => {
    RoomsPerLogisticUnit.destroy({
        where: { id }
    });
}


module.exports = {
    create,
    get,
    getUnsupervisedRooms,
    getByLogisticUnit,
    getAll,
    remove
}