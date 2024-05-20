const ProductRouter = require("../routes/ProductRouter");
const UserRouter = require("../routes/UserRouter");

module.exports.configure = (app)=>{
    app.use(ProductRouter);
    app.use(UserRouter);
}