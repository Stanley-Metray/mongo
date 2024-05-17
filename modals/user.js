const {getDb} = require('../connection/database');
const {ObjectId} = require('mongodb');

class User 
{
    constructor(name, email, password)
    {
        this.name=name;
        this.email=email;
        this.password=password;
    }

    static addUser = async (user)=>{
        const db = getDb();
        try {
            return await db.collection('users').insertOne(user);
        } catch (error) {
            console.log(error);
        }
    }

    static findByUserId = async (id)=>{
        const db = getDb();
        try {
            return await db.collection('users').find({_id : new ObjectId(id)}).next();
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = User;