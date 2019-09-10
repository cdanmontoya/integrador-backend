const httpStatus = require('http-status');
const util = require('./turn');
const authorization = require('../../../../services/authorization/authorization');

const create = async (req, res) => {
  const idToken = req.get('idToken');
  const auth = await authorization.requiresAdmin(idToken);
  if (!auth) return res.status(httpStatus.UNAUTHORIZED).send({ error: 'You are not allowed to see this content' });

  const { params } = req;
  const { body } = req;

  await util.create(params, body).then(
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
  const authAssistant = await authorization.requiresAssistant(idToken);
  const authAdmin = await authorization.requiresAdmin(idToken);

  // If the event is not created by admin nor an assistant, the request must be rejected
  if (!authAssistant && !authAdmin) return res.status(httpStatus.UNAUTHORIZED).send({ error: 'You are not allowed to see this content' });

  const id = req.params.turnID;

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
  return true;
};

const getByAux = async (req, res) => {
  const idToken = req.get('idToken');
  const authAssistant = await authorization.requiresAssistant(idToken);
  const authAdmin = await authorization.requiresAdmin(idToken);

  // If the event is not created by admin nor an assistant, the request must be rejected
  if (!authAssistant && !authAdmin) return res.status(httpStatus.UNAUTHORIZED).send({ error: 'You are not allowed to see this content' });

  const { params } = req;

  await util.getByAux(params).then(
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
  return true;
};

const getByAuxForCalendar = async (req, res) => {
  const idToken = req.get('idToken');
  const authAssistant = await authorization.requiresAssistant(idToken);
  const authAdmin = await authorization.requiresAdmin(idToken);

  // If the event is not created by admin nor an assistant, the request must be rejected
  if (!authAssistant && !authAdmin) return res.status(httpStatus.UNAUTHORIZED).send({ error: 'You are not allowed to see this content' });

  const { params } = req;

  await util.getByAuxForCalendar(params).then(
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
  return true;
};

const getByAuxSwitcher = async (req, res) => {
  const { format } = req.query;

  switch (format) {
    case 'calendar':
      await getByAuxForCalendar(req, res);
      break;

    default:
      await getByAux(req, res);
      break;
  }
};

const getAll = async (req, res) => {
  const idToken = req.get('idToken');
  const authAssistant = await authorization.requiresAssistant(idToken);
  const authAdmin = await authorization.requiresAdmin(idToken);

  // If the event is not created by admin nor an assistant, the request must be rejected
  if (!authAssistant && !authAdmin) return res.status(httpStatus.UNAUTHORIZED).send({ error: 'You are not allowed to see this content' });

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
  const idToken = req.get('idToken');
  const auth = await authorization.requiresAdmin(idToken);
  if (!auth) return res.status(httpStatus.UNAUTHORIZED).send({ error: 'You are not allowed to see this content' });

  const { body } = req;
  const { params } = req;

  const { turnID } = params;
  const turn = util.get(turnID);

  if (!turn) {
    return res
      .status(httpStatus.NOT_FOUND)
      .send({ message: 'Not found' });
  }

  await util
    .update(params, body)
    .then(() => res
      .status(httpStatus.OK)
      .send({ message: 'Updated' }))
    .catch((err) => {
      console.error(err);

      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: 'Error', err });
    });
  return true;
};


const remove = async (req, res) => {
  const idToken = req.get('idToken');
  const auth = await authorization.requiresAdmin(idToken);
  if (!auth) return res.status(httpStatus.UNAUTHORIZED).send({ error: 'You are not allowed to see this content' });

  const id = req.params.turnID;
  const event = util.get(id);

  if (!event) {
    return res
      .status(httpStatus.NOT_FOUND)
      .send({ message: 'Not found' });
  }

  await util
    .remove(id)
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
  getByAux,
  getByAuxForCalendar,
  getByAuxSwitcher,
  getAll,
  update,
  remove,
};
