const User = require('./user');
const db = require('../../../../../config/database');

describe('Basic tests', () => {
  it('Should get carlos.montoyah data', async (done) => {
    const data = await User.get('carlos.montoyah');
    expect(data).toHaveProperty('username');
    expect(data.username).toEqual('carlos.montoyah');
    done();
  });

  afterAll(async (done) => {
    db.sequelize.close();
    done();
  });
});
