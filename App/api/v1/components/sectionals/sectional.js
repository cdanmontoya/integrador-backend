const db = require('../../../../../config/database');
const sequelize = db.sequelize;

let Sectional = require('../../models/sectional');
Sectional = Sectional(db.sequelize, db.Sequelize);

const create = async (body) => {
    let { id, name, address, phoneNumber } = body;

    Sectional.create({
        id,
        name,
        address,
        phoneNumber
    });
}

const get = async (id) => {
    let data = await Sectional.findAll({
        where: { id }
    });
    return data[0];
}

const getAll = async () => {
    return Sectional.findAll();
}

const update = async (query_id, body) => {
    let { id, name, address, phoneNumber } = body;

    Sectional.update(
        { id, name, address, phoneNumber },
        { where: { id: query_id } }
    );
}

const remove = async (id) => {
    Sectional.destroy({
        where: id
    });
}

const getBlocks = async (id) => {
    let Blocks = require('../../models/block');
    Blocks = Blocks(db.sequelize, db.Sequelize);

    return Blocks.getAll({
        where: {sectionalID: id}
    });
}



module.exports = {
    create,
    get,
    getAll,
    update,
    remove,
    getBlocks
}