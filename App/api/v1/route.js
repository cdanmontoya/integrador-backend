const Router = require('express').Router;
let router = new Router();

/**
 * References to each resource routers
 */
let user = require('./components/users/route');
let sectional = require('./components/sectionals/route');
let items = require('./components/items/route');
let events = require('./components/events/route.js');

router.use('/users', user);
router.use('/sectionals', sectional);
router.use('/items', items);
router.use('/events', events);

let roomsController = require('./components/rooms/controller')

router.route('/rooms').post((req, res) => {
    roomsController.getAvailableRooms(req, res)
})

module.exports = router;