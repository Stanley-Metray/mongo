const mongoose = require('mongoose');

const url = "mongodb+srv://stanleymetray:21d2zKu9bY7vqW2h@test.1gtjjmf.mongodb.net/?retryWrites=true&w=majority&appName=test";

const connect = async (startServer)=>{
    try {
        await mongoose.connect(url);
        startServer();
    } catch (error) {
        console.log(error);
    }
}

module.exports = {mongoose,connect};
