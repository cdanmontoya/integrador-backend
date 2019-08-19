const states = {
  ASSIGNED: 1,
  IN_PROGRESS: 2,
  DONE: 3,
  UNREALIZED: 4,
  CANCELED: 5,
};

async function extract(data) {
  const groups = {};

  data.forEach(async (val) => {
    const date = val.startTime.split('T')[0];
    const start = val.startTime.split('T')[1].slice(0, 5);
    const end = val.endTime.split('T')[1].slice(0, 5);
    const assistant = val.auxiliarID;
    // eslint-disable-next-line prefer-destructuring
    const section = val.section;

    const turnDetails = {
      assistant, start, end, section,
    };

    if (date in groups) {
      groups[date].push(turnDetails);
    } else {
      groups[date] = new Array(turnDetails);
    }
  });
  return groups;
}

module.exports = {
  states,
  extract,
};
