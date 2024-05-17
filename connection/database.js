const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const url = "mongodb+srv://stanleymetray:21d2zKu9bY7vqW2h@test.1gtjjmf.mongodb.net/?retryWrites=true&w=majority&appName=test";

let _db;

module.exports.connect = (startServer)=>{
    MongoClient.connect(url)
    .then((client)=>{
        _db=client.db();
        startServer();
    })
    .catch((err)=>{
        console.log(err);
    });
}

module.exports.getDb = ()=>{
    if(_db)
        return _db;
    throw "No database found!";
}

