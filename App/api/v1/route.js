const { Router } = require('express');

const router = new Router();

/*
 * References to each resource routers
 */
const users = require('./components/users/route');
const sectionals = require('./components/sectionals/route');
const items = require('./components/items/route');
const events = require('./components/events/route');
const requests = require('./components/requests/route');

router.use('/users', users);
router.use('/sectionals', sectionals);
router.use('/items', items);
router.use('/events', events);
router.use('/requests', requests);

const roomsController = require('./components/rooms/controller');

router.route('/rooms').post((req, res) => {
  roomsController.getAvailableRooms(req, res);
});

module.exports = router;
