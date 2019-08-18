const httpStatus = require('http-status');
const util = require('./itemsPerRoom');

const create = async (req, res) => {
  const { body } = req;

  await util.create(req.params, body).then(
    () => res
      .status(httpStatus.CREATED)
      .send({ message: 'Created' }),
    (err) => {
      console.error(err);
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ message: 'Error' });
    },
  );
};

const createMany = async (req, res) => {
  const sectional = req.params.sectionalID;
  const block = req.params.blockID;

  const { body } = req;

  await util.createMany(sectional, block, body).then(
    () => res
      .status(httpStatus.CREATED)
      .send({ message: 'Created' }),
    (err) => {
      console.error(err);
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ message: 'Error' });
    },
  );
};

const get = async (req, res) => {
  const id = req.params.itemPerRoomID;

  await util.get(id).then(
    (data) => {
      if (!data || data.length === 0) {
        return res
          .status(httpStatus.NOT_FOUND)
          .send({ message: 'Not found' });
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

const getByRoom = async (req, res) => {
  const { params } = req;

  await util.getByRoom(params).then(
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

const update = async (req, res) => {
  const { body } = req;
  const id = req.params.itemPerRoomID;

  const ipr = await util.get(id);
  if (!ipr) {
    return res
      .status(httpStatus.NOT_FOUND)
      .send({ message: 'Not found' });
  }

  await util
    .update(id, body)
    .then(() => res.status(httpStatus.OK).send({ message: 'Updated' }))
    .catch((err) => {
      console.error(err);
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: 'Error' });
    });

  return true;
};

const remove = async (req, res) => {
  const id = req.params.itemPerRoomID;

  const ipr = await util.get(id);
  if (!ipr) {
    return res
      .status(httpStatus.NOT_FOUND)
      .send({ message: 'Not found' });
  }

  await util
    .remove(id)
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
  createMany,
  getByRoom,
  get,
  getAll,
  update,
  remove,
};
