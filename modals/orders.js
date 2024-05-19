// class Order
// {
//     constructor(userId, products)
//     {
//         this.userId=userId;
//         this.products=products;
//         this.date = new Date().toLocaleDateString();
//     }

//     async save()
//     {
//         return await db.collection('orders').insertOne(this);
//     }

//     static getOrders = async(userId)=>
//     {
//         return await db.collection('orders').find({userId : new ObjectId(userId)}).toArray();
//     }

// }

// module.exports = Order;