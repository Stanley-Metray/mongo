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

    static addToCart = async (userId, productId) => {
        try {
            const db = getDb();
            userId = new ObjectId(userId);
            productId = new ObjectId(productId);

            return await db.collection('users').updateOne({ _id: userId }, { $push: { cart: { productId: productId, quantity: 1 } } });
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = User;