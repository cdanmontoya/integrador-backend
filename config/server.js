/**
 * NPM required packages
 */
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

/**
 * Routes to the different resources
 */
const routes = require('../App/routes');

/**
 * Importing configuration variables
 */
const {
  port,
  morganMode,
} = require('./config');

/**
 * Sets up the server configuration to an Express app
 * @param {*} app Basic Express app
 */
const server = async (app) => {
  app.disable('x-powered-by');
  app.set('port', port);
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(morgan(morganMode));
  app.use(cors());
  app.use('/', routes);
};

module.exports = server;
