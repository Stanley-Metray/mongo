const ProductRouter = require("../routes/ProductRouter");

module.exports.configure = (app)=>{
    app.use(ProductRouter);
}