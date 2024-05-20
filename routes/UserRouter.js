const express = require("express");
const UserController = require("../controllers/UserController");

const UserRouter = express.Router();

UserRouter.post('/create-user', UserController.postCreateUser);

UserRouter.get('/get-user', UserController.getUserById);

UserRouter.post('/add-to-cart', UserController.postAddToCart);

UserRouter.get('/get-cart', UserController.getCart);

module.exports = UserRouter;