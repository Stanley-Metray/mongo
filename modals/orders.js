const { getDb } = require('../connection/database');

class Order
{
    constructor(userId, products)
    {
        this.userId=userId;
        this.products=products;
        this.date = new Date().toLocaleDateString();
    }

    async save()
    {
        const db = getDb();
        return await db.collection('orders').insertOne(this);
    }

    static async getOrders(userId)
    {
        const db = getDb();
    }
}

module.exports = Order;