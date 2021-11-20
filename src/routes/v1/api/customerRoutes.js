const express = require('express');
const router = express.Router();
const customerController = require('../../../controllors/customerControllor');

router.get('/customer', customerController.index);
router.post('/customer', customerController.store);
router.delete('/customer', customerController.destroy);
router.put('/customer', customerController.update);
router.get('/customer/:id', customerController.show);
module.exports = router;
