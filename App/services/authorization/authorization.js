const admin = require('../../../config/login/login');
const User = require('../../api/v1/components/users/user');

const requiresLogin = async (idToken) => {
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { email } = decodedToken;
    const username = email.split('@')[0];
    const user = await User.get(username);

    if (!user) {
      throw new Error('The user doesn\'t exists');
    }
  } catch (error) {
    return false;
  }
  return true;
};

const requiresAdmin = async (idToken) => {
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { email } = decodedToken;
    const username = email.split('@')[0];

    return User.isAdmin(username);
  } catch (error) {
    return false;
  }
};

const requiresAssistant = async (idToken) => {
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { email } = decodedToken;
    const username = email.split('@')[0];

    return User.isAssistant(username);
  } catch (error) {
    return false;
  }
};

const requiresSystemAdmin = async (idToken) => {
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { email } = decodedToken;
    const username = email.split('@')[0];

    return User.isSystemAdmin(username);
  } catch (error) {
    return false;
  }
};

const requiresSameUser = async (idToken) => {
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { email } = decodedToken;
    const username = email.split('@')[0];
    const user = await User.get(username);

    return username === user.username;
  } catch (error) {
    return false;
  }
};

module.exports = {
  requiresLogin,
  requiresAdmin,
  requiresAssistant,
  requiresSameUser,
  requiresSystemAdmin,
};
