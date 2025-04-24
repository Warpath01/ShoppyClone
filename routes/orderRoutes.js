const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.get('/', orderController.showOrders);
router.post('/:id', orderController.createOrder);
router.post('/:id/delete', orderController.deleteOrder);

module.exports = router;