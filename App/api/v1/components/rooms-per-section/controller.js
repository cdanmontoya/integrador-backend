const httpStatus = require('http-status');
const util = require('./roomsPerSection');
const authorization = require('../../../../services/authorization/authorization');

const create = async (req, res) => {
  const idToken = req.get('idToken');
  const auth = await authorization.requiresAdmin(idToken);
  if (!auth) return res.status(httpStatus.UNAUTHORIZED).send({ error: 'You are not allowed to see this content' });

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
  return true;
};

const get = async (req, res) => {
  const idToken = req.get('idToken');
  const auth = await authorization.requiresLogin(idToken);
  if (!auth) return res.status(httpStatus.UNAUTHORIZED).send({ error: 'You are not allowed to see this content' });

  const { rpluID } = req.params;

  await util.get(rpluID).then(
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
  return true;
};

const getBySection = async (req, res) => {
  const idToken = req.get('idToken');
  const auth = await authorization.requiresLogin(idToken);
  if (!auth) return res.status(httpStatus.UNAUTHORIZED).send({ error: 'You are not allowed to see this content' });

  const { sectionID } = req.params;

  await util.getBySection(sectionID).then(
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
  return true;
};

const getAll = async (req, res) => {
  const idToken = req.get('idToken');
  const auth = await authorization.requiresLogin(idToken);
  if (!auth) return res.status(httpStatus.UNAUTHORIZED).send({ error: 'You are not allowed to see this content' });

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
  return true;
};

const remove = async (req, res) => {
  const idToken = req.get('idToken');
  const auth = await authorization.requiresAdmin(idToken);
  if (!auth) return res.status(httpStatus.UNAUTHORIZED).send({ error: 'You are not allowed to see this content' });

  const { rpluID } = req.params;

  const rplu = await util.get(rpluID);
  if (!rplu) {
    return res
      .status(httpStatus.NOT_FOUND)
      .send({ message: 'Not found' });
  }

  await util
    .remove(rpluID)
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
  get,
  getBySection,
  getAll,
  remove,
};
