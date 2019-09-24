const types = {
  RESERVE: 1,
  ASSISTANCE: 2,
  LOAN: 3,
};

const states = {
  PENDING: 1,
  CANCELED: 2,
  REJECTED: 3,
  APPROVED: 4,
  IN_COURSE: 5,
  DONE: 6,
};

const checkState = (requestType, actualState, newState) => {
  if (actualState === states.CANCELED || actualState === states.REJECTED
    || actualState === states.DONE) {
    return false;
  }

  switch (requestType) {
    case types.RESERVE:
      if (actualState === states.PENDING) {
        if (newState !== types.APPROVED && newState !== types.REJECTED
          && newState !== types.CANCELED) {
          return true;
        }
        return false;
      }

      if (actualState === states.APPROVED) {
        if (newState !== states.CANCELED) {
          return false;
        }
      }
      break;

    case types.ASSISTANCE:
      if (actualState === states.PENDING) {
        if (newState !== types.IN_COURSE && newState !== types.REJECTED
          && newState !== types.CANCELED) {
          return false;
        }
      }

      if (actualState === states.IN_COURSE) {
        if (newState !== states.DONE) {
          return false;
        }
      }
      break;

    case types.LOAN:
      if (actualState === states.PENDING) {
        if (newState !== types.APPROVED && newState !== types.REJECTED
          && newState !== types.CANCELED) {
          return false;
        }
      }

      if (actualState === states.APPROVED) {
        if (newState !== states.IN_COURSE) {
          return false;
        }
      }

      if (actualState === types.IN_COURSE) {
        if (newState !== types.DONE) {
          return false;
        }
      }
      break;

    default:
      return false;
  }
  return true;
};

module.exports = {
  types,
  states,
  checkState,
};
