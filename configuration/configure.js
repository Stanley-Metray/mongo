const ProductRouter = require("../routes/ProductRouter");
const UserRouter = require("../routes/UserRouter");
const OrderRouter = require('../routes/OrderRouter');

module.exports.configure = (app)=>{
    app.use(ProductRouter);
    app.use(UserRouter);
    app.use(OrderRouter);
}