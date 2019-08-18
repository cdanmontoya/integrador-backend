const config = require('./config');
const db = require('../../../../../config/database');

let Turn = require('../../models/turn');

Turn = Turn(db.sequelize, db.Sequelize);

const create = async (params, body) => {
  let { startTime, endTime } = body;
  const { stateID } = body;
  const { username } = params;

  startTime = new Date(startTime);
  endTime = new Date(endTime);

  Turn.create({
    startTime, endTime, stateID, auxiliarID: username,
  });
};

const get = async (id) => {
  const data = await Turn.findAll({
    where: { id },
  });
  return data[0];
};

const getByAux = async (params) => {
  const { username } = params;

  return Turn.findAll({
    where: { auxiliarID: username },
  });
};

const getAll = async () => Turn.findAll();

const update = async (params, body) => {
  let { startTime, endTime } = body;

  const { stateID, auxiliarID } = body;
  const { turnID } = params;

  startTime = new Date(startTime);
  endTime = new Date(endTime);

  const updateArgs = {
    startTime, endTime, auxiliarID,
  };

  if (stateID) {
    const request = await get(turnID);
    const actualState = request.stateID;

    try {
      checkState(actualState, stateID);
      updateArgs.stateID = stateID;
    } catch (error) {
      throw error;
    }
  }

  Turn.update(
    updateArgs,
    { where: { id: turnID } },
  );
};

const remove = async (id) => {
  Turn.destroy({
    where: { id },
  });
};

const checkState = (actualState, newState) => {
  if (actualState === config.states.ASSIGNED) {
    if (newState === config.states.DONE) {
      throw new Error('Error: cannot update state from Assigned to Done');
    }
  }

  if (actualState === config.states.IN_PROGRESS) {
    if (newState !== config.states.DONE) {
      throw new Error('Error: cannot update state');
    }
  }
};

module.exports = {
  create,
  get,
  getByAux,
  getAll,
  update,
  remove,
};
