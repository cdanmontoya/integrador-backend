const httpStatus = require('http-status');
const util = require('./item');
const authorization = require('../../../../services/authorization/authorization');

const create = async (req, res) => {
  const idToken = req.get('idToken');
  const auth = await authorization.requiresAdmin(idToken);
  if (!auth) return res.status(httpStatus.UNAUTHORIZED).send({ error: 'You are not allowed to see this content' });

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
  const idToken = req.get('idToken');
  const auth = await authorization.requiresLogin(idToken);
  if (!auth) return res.status(httpStatus.UNAUTHORIZED).send({ error: 'You are not allowed to see this content' });

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

const getTypes = async (req, res) => {
  const idToken = req.get('idToken');
  const auth = await authorization.requiresLogin(idToken);
  if (!auth) return res.status(httpStatus.UNAUTHORIZED).send({ error: 'You are not allowed to see this content' });

  await util.getTypes().then(
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

const getFormatedTypes = async (req, res) => {
  const idToken = req.get('idToken');
  const auth = await authorization.requiresLogin(idToken);
  if (!auth) return res.status(httpStatus.UNAUTHORIZED).send({ error: 'You are not allowed to see this content' });

  await util.getFormatedTypes().then(
    (data) => {
      if (data) {
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

const getTypesSwitcher = async (req, res) => {
  const { format } = req.query;

  if (format === 'true') {
    await getFormatedTypes(req, res);
  } else {
    await getTypes(req, res);
  }
};

const update = async (req, res) => {
  const idToken = req.get('idToken');
  const authAssistant = await authorization.requiresAssistant(idToken);
  const authAdmin = await authorization.requiresAdmin(idToken);

  // If the event is not created by admin nor an assistant, the request must be rejected
  if (!authAssistant && !authAdmin) return res.status(httpStatus.UNAUTHORIZED).send({ error: 'You are not allowed to see this content' });

  const { body } = req;
  const { itemID } = req.params;

  await util
    .update(itemID, body)
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
  const idToken = req.get('idToken');
  const auth = await authorization.requiresAdmin(idToken);
  if (!auth) return res.status(httpStatus.UNAUTHORIZED).send({ error: 'You are not allowed to see this content' });

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
  return true;
};

module.exports = {
  create,
  get,
  getTypesSwitcher,
  getAll,
  update,
  remove,
};
