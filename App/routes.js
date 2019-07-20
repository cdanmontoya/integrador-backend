const Router = require('express').Router;
let router = new Router();

/**
 * References to each resource routers
 */
let usuario = require('./components/usuario/route');

router.use('/components/usuarios', usuario);

module.exports = router;