const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const url = "mongodb+srv://stanleymetray:21d2zKu9bY7vqW2h@test.1gtjjmf.mongodb.net/?retryWrites=true&w=majority&appName=test";

let _db;

const mongoConnect = (callback)=>{
    MongoClient.connect(url)
    .then((client)=>{
        _db=client.db();
        callback();
    })
    .catch((err)=>{
        console.log(err);
    });
}

const getDb = ()=>{
    if(_db){
        return _db;
    }
    throw "No database found!";
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;