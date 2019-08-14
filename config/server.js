/**
 * NPM required packages
 */
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

/**
 * Routes to the different resources
 */
const routes = require('../App/routes');
const swaggerV1 = YAML.load(__dirname + '/swagger/v1.yaml');

/**
 * Importing configuration variables
 */
const {
    port,
    morganMode
} = require('./config');

/**
 * Sets up the server configuration to an Express app
 * @param {*} app Basic Express app
 */
const server = async (app) => {
    app.set('port', port);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(morgan(morganMode));
    app.use(cors());
    app.use('/', routes);
    app.use('/api-docs/v1', swaggerUi.serve, swaggerUi.setup(swaggerV1));
}

module.exports = server;