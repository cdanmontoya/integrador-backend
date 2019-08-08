const db = require('../../../../../config/database');
const sequelize = db.sequelize;

const create = async (params, body) => {
    let logisticUnit = params.username;

    const query = `INSERT INTO Rooms_per_Logistic_unit (logisticUnit, sectionalID, blockID, roomID) VALUES
    ('${logisticUnit}', '${body.sectionalID}', '${body.blockID}', '${body.roomID}')`;

    await sequelize.query(query);
}

const get = async (id) => {
    const query = `SELECT * FROM Rooms_per_Logistic_unit WHERE id = '${id}'`;

    let data = await sequelize.query(query);
    data = JSON.parse(JSON.stringify(data[0]));

    return data[0];
}

const getUnsupervisedRooms = async () => {
    const query = `select room.id as roomID, room.blockID, room.sectionalID, room.capacity, room.type from room left join rooms_per_logistic_unit as rplu on room.sectionalID = rplu.sectionalID and room.blockID = rplu.blockID and room.id = rplu.roomID where rplu.id IS NULL;`;

    let data = await sequelize.query(query);
    data = JSON.parse(JSON.stringify(data[0]));

    return data;
}

const getByLogisticUnit = async (logisticUnit) => {
    const query = `SELECT * FROM Rooms_per_Logistic_Unit WHERE logisticUnit = '${logisticUnit}'`;

    let data = await sequelize.query(query);
    data = JSON.parse(JSON.stringify(data[0]));

    return data;
}

const getAll = async () => {
    const query = `SELECT * FROM Rooms_per_Logistic_unit`;

    let data = await sequelize.query(query);
    data = JSON.parse(JSON.stringify(data[0]));
    
    return data;
}

const remove = async (id) => {
    const query = `DELETE FROM Rooms_per_Logistic_unit WHERE id = '${id}'`;

    let res = await sequelize.query(query);
    return res[0].affectedRows;
}


module.exports = {
    create,
    get,
    getUnsupervisedRooms,
    getByLogisticUnit,
    getAll,
    remove
}