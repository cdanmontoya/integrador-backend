const config = require('./config');
const db = require('../../../../../config/database');

let Item = require('../../models/item');
Item = Item(db.sequelize, db.Sequelize);

const create = async (body) => {
    let { name, typeID, statusID } = body;

    Item.create({
        name,
        typeID,
        statusID
    });
}

const get = async (id) => {
    let data = await Item.findAll({
        where: { id }
    });
    return data[0];
}

const getAll = async () => {
    return Item.findAll();
}

const update = async (query_id, body) => {
    let { name, typeID, statusID } = body;

    // If there is a new status, we neet to check if is a valid one
    // statusID has the new state from the request body
    if (statusID) {
        let item = await get(query_id);
        let actualState = item.statusID

        try {
            checkState(actualState, statusID);
            Item.update(
                { name, typeID, statusID },
                { where: { id: query_id } }
            );
            return;
        } catch (err) {
            throw err;
        }
    }

    // Otherwise, just update the item
    Item.update(
        { name, typeID },
        { where: { id: query_id } }
    );
}

const remove = async (id) => {
    Item.destroy({
        where: { id }
    });
}

const checkState = (actualState, newState) => {
    if (actualState == config.RESERVED) {
        if (newState == config.NOT_AVAILABLE) {
            throw "Error: Can't change status";
        }
    }

    if (actualState == config.IN_LOAN || actualState == config.NOT_AVAILABLE) {
        if (newState != config.AVAILABLE) {
            throw "Error: Can not change status";
        }
    }
}

module.exports = {
    create,
    get,
    getAll,
    update,
    remove
}