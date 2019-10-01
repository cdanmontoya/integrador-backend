const admin = require('../../../config/login/login');
const User = require('../../api/v1/components/users/user');

const login = async (idToken) => {
  const decodedToken = await admin.auth().verifyIdToken(idToken);

  const { email } = decodedToken;
  const username = email.split('@')[0];

  const user = await User.get(username);

  // Register user if doesn't exist in our database
  if (!user) {
    const newUser = {
      username,
      email,
      userType: 1,
    };
    User.create(newUser).then((response) => response);
  }
  return user.dataValues;
};

module.exports = {
  login,
};
