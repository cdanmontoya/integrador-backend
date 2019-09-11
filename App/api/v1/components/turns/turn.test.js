const Turn = require('./turn');
const db = require('../../../../../config/database');

it('Retrieve more than 0 turns', async (done) => {
  const data = await Turn.getAll();
  expect(data.length).toBeGreaterThan(0);
  done();
});

afterAll(async (done) => {
  db.sequelize.close();
  done();
});
