const {mongoose} = require('../connection/database');

const ProductSchema = new mongoose.Schema({
    title : {
        type : String,
        required:true
    },
    price : {
        type : Number,
        required : true
    },
    description : {
        type : String,
        required : true
    }
});

const Product = mongoose.model('product', ProductSchema);

module.exports = Product;