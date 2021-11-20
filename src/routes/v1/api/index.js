const express = require('express');
const router = new express.Router();

const usersController = require('../../../controllors/users');
const customerController = require('../../../controllors/customerControllor');

router.get('/users', usersController.index);
router.post('/users', usersController.store);
router.delete('/users', usersController.destroy);
router.put('/users', usersController.update);
router.get('/users/:id', usersController.show);

router.get('/customer', customerController.index);
router.post('/customer', customerController.store);
router.delete('/customer', customerController.destroy);
router.put('/customer', customerController.update);
router.get('/customer/:id', customerController.show);

module.exports = router;
