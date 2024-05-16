const getDb = require('../connection/database').getDb;

class Product 
{
    constructor(title, price, description)
    {
        this.title=title;
        this.price=price;
        this.description=description;
    }

    save(){
        const db = getDb();
        return db.collection('products').insertOne(this)
        .then((result)=>{
            console.log(result);
        })
        .catch((err)=>{
            console.log(err);
        });
    }
}

module.exports = Product;
