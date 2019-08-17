const Router = require('express').Router;
let router = new Router();

/**
 * References to each resource routers
 */
let users = require('./components/users/route');
let sectionals = require('./components/sectionals/route');
let items = require('./components/items/route');
let events = require('./components/events/route');
let requests = require('./components/requests/route');

router.use('/users', users);
router.use('/sectionals', sectionals);
router.use('/items', items);
router.use('/events', events);
router.use('/requests', requests);

let roomsController = require('./components/rooms/controller')

router.route('/rooms').post((req, res) => {
    roomsController.getAvailableRooms(req, res)
})

module.exports = router;