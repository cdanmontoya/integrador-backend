const Router = require('express').Router;
let router = new Router();

/**
 * References to each resource routers
 */
let usuario = require('./components/users/route');

router.use('/users', usuario);

module.exports = router;