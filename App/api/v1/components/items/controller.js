const httpStatus = require('http-status');
const util = require('./item');

const create = async (req, res) => {
  const { body } = req;

  await util.create(body).then(
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
  const { itemID } = req.params;

  await util.get(itemID).then(
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
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Internal server error' });
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
  const { itemID } = req.params;

  await util
    .update(itemID, body)
    .then(() => res.status(httpStatus.OK).send({ message: 'Updated' }))
    .catch((err) => {
      console.error(err);
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: 'Error' });
    });
};

const remove = async (req, res) => {
  const { itemID } = req.params;

  await util
    .remove(itemID)
    .then((removeResponse) => {
      if (removeResponse === 0) {
        return res
          .status(httpStatus.NOT_FOUND)
          .send({ message: 'Not found' });
      }

      return res
        .status(httpStatus.OK)
        .send({ message: 'Removed successfully' });
    })
    .catch((err) => {
      console.error(err);
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: 'Error' });
    });
};

const changeState = async (req, res) => {
  const { params } = req;
  const { body } = req;

  await util
    .changeState(params, body)
    .then(() => res.status(httpStatus.OK).send({ message: 'Updated' }))
    .catch((err) => {
      console.log(err);
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: 'Error', err });
    });
};

module.exports = {
  create,
  get,
  getAll,
  update,
  remove,
  changeState,
};
