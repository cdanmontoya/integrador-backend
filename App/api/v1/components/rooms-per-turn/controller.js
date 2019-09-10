const httpStatus = require('http-status');
const util = require('./roomsPerTurn');

const create = async (req, res) => {
  const { body } = req;
  const { params } = req;

  await util.create(params, body).then(
    () => res
      .status(httpStatus.CREATED)
      .send({ message: 'Created' }),
    (err) => {
      console.error(err);
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ message: err });
    },
  );
};

const getByTurn = async (req, res) => {
  const { turnID } = req.params;

  await util.getByTurn(turnID).then(
    (data) => {
      if (!data || data.length === 0) {
        return res
          .status(httpStatus.NO_CONTENT)
          .send({ message: 'No content' });
      }
      return res
        .status(httpStatus.OK)
        .send(data);
    },
    (err) => {
      console.error(err);
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: 'Internal server error' });
    },
  );
};

const getAll = async (req, res) => {
  await util.getAll().then(
    (data) => {
      if (data.length > 0) {
        return res
          .status(httpStatus.OK)
          .send(data);
      }
      return res
        .status(httpStatus.NO_CONTENT)
        .send({ message: 'No data found' });
    },
    (err) => {
      console.error(err);
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: 'Error' });
    },
  );
};

const remove = async (req, res) => {
  const { turnID } = req.query;
  const { sectionalID } = req.query;
  const { blockID } = req.query;
  const { roomID } = req.query;

  if (!turnID || !sectionalID || !blockID || !roomID) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .send({ message: 'Query parameters missing' });
  }

  const rplu = await util.get(turnID, sectionalID, blockID, roomID);
  if (!rplu) {
    return res
      .status(httpStatus.NOT_FOUND)
      .send({ message: 'Not found' });
  }

  await util
    .remove(turnID, sectionalID, blockID, roomID)
    .then(() => res
      .status(httpStatus.OK)
      .send({ message: 'Removed successfully' }))
    .catch((err) => {
      console.error(err);
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: 'Error' });
    });

  return true;
};

module.exports = {
  create,
  getByTurn,
  getAll,
  remove,
};
