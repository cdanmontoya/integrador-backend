const admin = require('firebase-admin');

const serviceAccount = require('./integrador-jsd-firebase-adminsdk-1lzav-e3c9c8a385.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://integrador-jsd.firebaseio.com',
});

module.exports = admin;
