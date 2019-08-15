const util = require('./block');
const httpStatus = require('http-status');

const create = async (req, res) => {
    let sectional = req.params.sectionalID;
    let body = req.body;

    await util.create(sectional, body).then(
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
    let body = req.body;

    await util.createMany(sectional, body).then(
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

    await util.get(sectional, number).then(
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
            console.error(err)
            return res
                .status(httpStatus.INTERNAL_SERVER_ERROR)
                .send({ message: 'Internal server error' });
        }
    );
};

const getBySectional = async (req, res) => {
    let sectional = req.params.sectionalID;

    await util.getBySectional(sectional).then(
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

const getRooms = async (req, res) => {
    let sectional = req.params.sectionalID;
    let number = req.params.blockID;

    await util.getRooms(sectional, number).then(
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

    await util
        .update(sectional, number, body)
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

    await util
        .remove(sectional, number)
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
    getBySectional,
    getAll,
    update,
    remove
}