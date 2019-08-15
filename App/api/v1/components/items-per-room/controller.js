const util = require('./itemsPerRoom');
const httpStatus = require('http-status');

const create = async (req, res) => {
    let body = req.body;

    await util.create(req.params, body).then(
        () => {
            return res
                .status(httpStatus.CREATED)
                .send({ message: 'Created' });
        },
        (err) => {
            console.error(err);
            return res
                .status(httpStatus.BAD_REQUEST)
                .send({ message: 'Error' })
        }
    );
};

const createMany = async (req, res) => {
    let sectional = req.params.sectionalID; 
    let block = req.params.blockID;

    let body = req.body;

    await util.createMany(sectional, block, body).then(
        () => {
            return res
                .status(httpStatus.CREATED)
                .send({ message: 'Created' });
        },
        (err) => {
            console.error(err);
            return res
                .status(httpStatus.BAD_REQUEST)
                .send({ message: 'Error' })
        }
    );
};

const get = async (req, res) => {
    let id = req.params.itemPerRoomID;

    await util.get(id).then(
        (data) => {
            if (!data || data.length == 0) {
                return res
                    .status(httpStatus.NOT_FOUND)
                    .send({ message: 'Not found' });
            } else {
                return res
                    .status(httpStatus.OK)
                    .send(data);
            }
        },
        (err) => {
            return res
                .status(httpStatus.INTERNAL_SERVER_ERROR)
                .send({ message: 'Internal server error' });
        }
    );
};

const getByRoom = async (req, res) => {
    let params = req.params;

    await util.getByRoom(params).then(
        (data) => {
            if (!data || data.length == 0) {
                return res
                    .status(httpStatus.NO_CONTENT)
                    .send({ message: 'No content' });
            } else {
                return res
                    .status(httpStatus.OK)
                    .send(data);
            }
        },
        (err) => {
            console.error(err)
            return res
                .status(httpStatus.INTERNAL_SERVER_ERROR)
                .send({ message: 'Internal server error' });
        }
    );
};

const getAll = async (req, res) => {
    await util.getAll().then(
        (data) => {
            if (data.length > 0) {
                return res
                    .status(httpStatus.OK)
                    .send(data);
            } else {
                return res
                    .status(httpStatus.NO_CONTENT)
                    .send({ message: 'No data found' });
            }
        },
        (err) => {
            console.error(err);
            return res
                .status(httpStatus.INTERNAL_SERVER_ERROR)
                .send({ message: 'Error' });
        }
    );
};

const update = async (req, res) => {
    let body = req.body;
    let id = req.params.itemPerRoomID;

    let ipr = await util.get(id);
    if (!ipr) {
        return res
        .status(httpStatus.NOT_FOUND)
        .send({ message: 'Not found' });
    }

    await util
        .update(id, body)
        .then(() => {
            return res.status(httpStatus.OK).send({ message: 'Updated'});
        })
        .catch((err) => {
            return res
                .status(httpStatus.INTERNAL_SERVER_ERROR)
                .send({ message: 'Error' });
        });
};

const remove = async (req, res) => {
    let id = req.params.itemPerRoomID;

    let ipr = await util.get(id);
    if (!ipr) {
        return res
        .status(httpStatus.NOT_FOUND)
        .send({ message: 'Not found' });
    }


    await util
        .remove(id)
        .then(() => {
            return res
                .status(httpStatus.OK)
                .send({ message: 'Removed successfully'});
        })
        .catch((err) => {
            console.error(err)
            return res
                .status(httpStatus.INTERNAL_SERVER_ERROR)
                .send({ message: 'Error' });
        });
};

module.exports = {
    create,
    createMany,
    getByRoom,
    get,
    getAll,
    update,
    remove
}