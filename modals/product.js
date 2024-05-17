const getDb = require("../connection/database").getDb;
const {ObjectId} = require('mongodb');

class Product
{
    constructor(title, price, description, imageurl)
    {
        this.title=title;
        this.price=price;
        this.description=description;
        this.imageurl=imageurl;
    }

    save()
    {
        const db = getDb();
        return db.collection('products').insertOne(this)
        .then((result)=>{
            console.log(result);
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    static fetchAll()
    {
        const db = getDb();
        return db.collection('products').find().toArray()
        .then((products)=>{
            return products;
        })
        .catch((err)=> console.log(err));
    }

    static getProduct(title)
    {
        const db = getDb();
        return db.collection('products').find({title:title}).toArray()
        .then((product)=>{
            return product;
        })
        .catch((err)=>{
            console.log(err);
        });
    }

    static updateProduct(title, update)
    {
        const db = getDb();
        return db.collection('products').updateOne({title : title}, {$set: update})
        .then((result)=>{
            return result;
        })
        .catch((err)=>{
            console.log(err);
        });
    }

    static deleteProduct(id)
    {
        const db = getDb();
        return db.collection('products').deleteOne({_id: new ObjectId(id)})
        .then((result)=>{
            return result;
        })
        .catch((err)=>{
            if(err)
                console.log(err);
        });
    }
}

module.exports = Product;
