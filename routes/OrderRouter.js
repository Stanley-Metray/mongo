const express = require("express");
const OrderController = require('../controllers/OrderController');

const OrderRouter = express.Router();

OrderRouter.get('/place-order', OrderController.getPlaceOrder);

OrderRouter.get('/get-orders', OrderController.getOrders);

module.exports = OrderRouter;