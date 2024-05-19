const { getDb } = require('../connection/database');
const { ObjectId } = require('mongodb');

class User {
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.cart = new Array();
    }

    static addUser = async (user) => {
        const db = getDb();
        try {
            return await db.collection('users').insertOne(user);
        } catch (error) {
            console.log(error);
        }
    }

    static findByUserId = async (id) => {
        const db = getDb();
        try {
            return await db.collection('users').find({ _id: new ObjectId(id) }).next();
        } catch (error) {
            console.log(error);
        }
    }

    static addToCart = async (userId, productId, quantity) => {
        try {
            const db = getDb();
            userId = new ObjectId(userId);
            productId = new ObjectId(productId);

            return await db.collection('users').updateOne({ _id: userId }, { $push: { cart: { productId: productId, quantity: quantity } } });
        } catch (error) {
            console.log(error);
        }
    }

    static getCart = async (userId) => {
        try {
            const db = getDb();
            userId = new ObjectId(userId);
            const user = await db.collection('users').find({ _id: userId }).next();
            const products = user.cart.map((cp) => cp.productId);
            const cartItems = await db.collection("products").find({ _id: { $in: products } }).toArray();
            const cart = cartItems.map(product => {
                const cartItem = user.cart.find(item => item.productId.equals(product._id));
                return { ...product, quantity: cartItem.quantity };
            });

            return cart;
        } catch (error) {
            console.log(error);
        }
    }

    static removeFromCart = async (userId, productId) => {
        try {
            const db = getDb();
            userId = new ObjectId(userId);
            productId = new ObjectId(productId);

            const result = await db.collection('users').updateOne(
                { _id: userId },
                { $pull: { cart: { productId: productId } } }
            );

            return result;
        } catch (error) {
            console.log(error);
        }
    }

    static emptyCart = async (userId)=>{
        try {
            userId = new ObjectId(userId);
            const db = getDb();
            return await db.collection('users').updateOne({_id:userId}, {$set :{cart:[]}});
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = User;