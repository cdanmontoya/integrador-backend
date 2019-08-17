const util = require('./request');
const httpStatus = require('http-status');

const create = async (req, res) => {
    let body = req.body;

    await util.create(body).then(
        (request) => {
            console.log(request)
            return res
                .status(httpStatus.CREATED)
                .send({ message: 'Created', request });
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
    let requestID = req.params.requestID;

    await util.get(requestID).then(
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
    let requestID = req.params.requestID;

    let request = await util.get(requestID);
    if (!request) return res.status(httpStatus.NOT_FOUND).send({ message: 'Not found'});

    await util
        .update(requestID, body)
        .then(() => {
            return res.status(httpStatus.OK).send({ message: 'Updated'});
        })
        .catch((err) => {
            return res
                .status(httpStatus.INTERNAL_SERVER_ERROR)
                .send({ message: 'Error', err });
        });
};

const remove = async (req, res) => {
    let requestID = req.params.requestID;

    let request = await util.get(requestID);
    if (!request) return res.status(httpStatus.NOT_FOUND).send({ message: 'Not found'});

    await util
        .remove(requestID)
        .then((removeResponse) => {
            if (removeResponse == 0) {
                return res
                    .status(httpStatus.NOT_FOUND)
                    .send({ message: 'Not found' });
            }

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
    get,
    getAll,
    update,
    remove
}