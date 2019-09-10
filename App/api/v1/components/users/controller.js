const httpStatus = require('http-status');
const util = require('./user');
const authorization = require('../../../../services/authorization/authorization');

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
  return true;
};

const get = async (req, res) => {
  const { username } = req.params;
  const idToken = req.get('idToken');
  const auth = await authorization.requiresLogin(idToken);
  if (!auth) return res.status(httpStatus.UNAUTHORIZED).send({ error: 'You are not allowed to see this content' });

  await util.get(username).then(
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

const update = async (req, res) => {
  const { body } = req;
  const { username } = req.params;

  const idToken = req.get('idToken');
  const auth = await authorization.requiresAdmin(idToken);
  if (!auth) return res.status(httpStatus.UNAUTHORIZED).send({ error: 'You are not allowed to see this content' });

  const user = await util.get(username);
  if (!user) {
    return res
      .status(httpStatus.NOT_FOUND)
      .send({ message: 'Not found' });
  }

  await util
    .update(username, body)
    .then(() => res
      .status(httpStatus.OK)
      .send({ message: 'Updated' }))
    .catch((err) => {
      console.error(err);
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: 'Error' });
    });
  return true;
};

const remove = async (req, res) => {
  const { username } = req.params;

  const idToken = req.get('idToken');
  const auth = await authorization.requiresAdmin(idToken);
  if (!auth) return res.status(httpStatus.UNAUTHORIZED).send({ error: 'You are not allowed to see this content' });

  const user = await util.get(username);
  if (!user) {
    return res
      .status(httpStatus.NOT_FOUND)
      .send({ message: 'Not found' });
  }

  await util
    .remove(username)
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
const getAssistants = async (req, res) => {
  const idToken = req.get('idToken');
  const auth = await authorization.requiresAdmin(idToken);
  if (!auth) return res.status(httpStatus.UNAUTHORIZED).send({ error: 'You are not allowed to see this content' });

  // Unsafe line, must be taken from token
  const logisticUnit = req.params.username;

  await util.getAssistants(logisticUnit).then(
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

module.exports = {
  create,
  get,
  getAll,
  update,
  remove,
  getAssistants,
};
