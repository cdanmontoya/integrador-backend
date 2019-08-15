const Router = require('express').Router;
let router = new Router();

/**
 * References to each resource routers
 */
let user = require('./components/users/route');
let sectional = require('./components/sectionals/route');
let items = require('./components/items/route');

router.use('/users', user);
router.use('/sectionals', sectional);
router.use('/items', items);

module.exports = router;