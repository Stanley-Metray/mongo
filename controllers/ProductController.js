const Product = require("../modals/product");

module.exports.createProduct = async (product)=>{
    try {
        return new Product(product).save();
    } catch (error) {
        console.log(error);
    }
}

module.exports.products = async ()=>{
    try {
        return await Product.find();
    } catch (error) {
        console.log(error);
    }
}

module.exports.findById = async (productId)=>{
    try {
        return await Product.findById(productId);
    } catch (error) {
        console.log(error);
    }
}

module.exports.updateProduct = async(productId, data)=>{
    try {
        return await Product.findByIdAndUpdate(productId, data, {new : true});
    } catch (error) {
        console.log(error);
    }
}

module.exports.deleteProduct = async(productId)=>{
    try {
        return await Product.findByIdAndDelete(productId);
    } catch (error) {
        console.log(error);
    }
}