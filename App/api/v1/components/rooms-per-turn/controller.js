const util = require('./roomsPerTurn');
const httpStatus = require('http-status');

const create = async (req, res) => {
    let body = req.body;
    let params = req.params;

    await util.create(params, body).then(
        () => {
            return res
                .status(httpStatus.CREATED)
                .send({ message: 'Created' });
        },
        (err) => {
            console.error(err);
            return res
                .status(httpStatus.BAD_REQUEST)
                .send({ message: err })
        }
    );
};

const getByTurn = async (req, res) => {
    const turnID = req.params.turnID;

    await util.getByTurn(turnID).then(
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

const remove = async (req, res) => {
    let turnID = req.query.turnID;
    let sectionalID = req.query.sectionalID;
    let blockID = req.query.blockID;
    let roomID = req.query.roomID;

    if (!turnID || !sectionalID || !blockID || ! roomID) {
        return res.status(httpStatus.BAD_REQUEST).send({message: 'Query parameters missing'});
    }

    let rplu = await util.get(turnID, sectionalID, blockID, roomID);
    if (!rplu) {
        return res
            .status(httpStatus.NOT_FOUND)
            .send({ message: 'Not found' });
    }

    await util
        .remove(turnID, sectionalID, blockID, roomID)
        .then(() => {
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
    getByTurn,
    getAll,
    remove
}