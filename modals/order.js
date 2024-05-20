const { mongoose } = require("../connection/database");


const productSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.ObjectId, ref: 'product' },
    quantity: Number
});

const OrderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    products: [productSchema],
    date: {
        type: String,
        default: new Date().toString()
    }
});

const Order = mongoose.model('order', OrderSchema);

module.exports = Order;