const util = require('./room');
const httpStatus = require('http-status');

const create = async (req, res) => {
    let sectional = req.params.sectionalID;
    let block = req.params.blockID;
    let body = req.body;

    await util.create(sectional, block, body).then(
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
    let sectional = req.params.sectionalID;
    let number = req.params.blockID;
    let id = req.params.roomID;

    await util.get(sectional, number, id).then(
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

const getByBlock = async (req, res) => {
    let sectional = req.params.sectionalID;
    let block = req.params.blockID;

    await util.getByBlock(sectional, block).then(
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
            return res
                .status(httpStatus.INTERNAL_SERVER_ERROR)
                .send({ message: 'Internal server error' });
        }
    );
};

const getAvailableRooms = async (req, res) => {
    let startTime = req.body.startTime;
    let endTime = req.body.endTime;

    await util.getAvailableRooms(startTime, endTime).then(
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
}

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
    let sectional = req.params.sectionalID;
    let number = req.params.blockID;
    let id = req.params.roomID;

    await util
        .update(sectional, number, id, body)
        .then(() => {
            return res.status(httpStatus.OK).send({ message: 'Updated' });
        })
        .catch((err) => {
            return res
                .status(httpStatus.INTERNAL_SERVER_ERROR)
                .send({ message: 'Error' });
        });
};

const remove = async (req, res) => {
    let sectional = req.params.sectionalID;
    let number = req.params.blockID;
    let id = req.params.roomID;

    await util
        .remove(sectional, number, id)
        .then((removeResponse) => {
            if (removeResponse == 0) {
                return res
                    .status(httpStatus.NOT_FOUND)
                    .send({ message: 'Not found' });
            }

            return res
                .status(httpStatus.OK)
                .send({ message: 'Removed successfully' });
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
    get,
    getByBlock,
    getAvailableRooms,
    getAll,
    update,
    remove
}