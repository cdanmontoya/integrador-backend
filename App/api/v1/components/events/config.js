const CONFIRMED = 1;
const CANCELED = 2;
const IN_COURSE = 3;
const DONE = 4;

const status = {
  CONFIRMED,
  CANCELED,
  IN_COURSE,
  DONE,
};

const checkState = (actualState, newState) => {
  // If the actual state is 'confirmed', it just can change to 'canceled' or 'in course'
  if (actualState === CONFIRMED) {
    if (newState === 4) {
      return false;
    }
  }

  if (actualState === CANCELED || actualState === DONE) {
    return false;
  }

  if (actualState === IN_COURSE) {
    if (newState !== DONE) {
      return false;
    }
  }
  return true;
};

module.exports = {
  status,
  checkState,
};
