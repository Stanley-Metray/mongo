const Order = require('../modals/order');
const User = require('../modals/user');

module.exports.getPlaceOrder = async (req, res) => {
    try {
        const result = await User.findById(req.query.id).select('cart');

        if (result && result.cart.length > 0) {
            const order = await Order.create({ userId: result._id, products: result.cart });

            if (order) {
                await User.findByIdAndUpdate({ _id: result._id }, { $set: { cart: [] } });
                res.json({ done: true });
            }
            else
                res.json({ done: false, message: "Something went wrong" });
        }
        else
            res.json({ done: false, message: "Something went wrong" });
    } catch (error) {
        res.json({ done: false, message: "Something went wrong" });
        console.log(error);
    }
}

module.exports.getOrders = async (req, res) => {
    try {
        const result = await Order.find({userId:req.query.id}).select('products')
        .populate('products.productId', 'title price description');
        if (result)
            res.json({ done: true, order : result });
        else
            res.json({ done: false, message: "Something went wrong" });
    } catch (error) {
        res.json({ done: false, message: "Something went wrong" });
        console.log(error);
    }
}