const httpStatus = require('http-status');
const util = require('./login');

const login = async (req, res) => {
  const idToken = req.get('idToken');

  await util.login(idToken).then(
    (data) => res
      .status(httpStatus.OK)
      .send({ message: 'OK', data }),
    (err) => {
      console.error(err);
      return res
        .status(httpStatus.FORBIDDEN)
        .send({ message: err.message });
    },
  );
};

module.exports = {
  login,
};
