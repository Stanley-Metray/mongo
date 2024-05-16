const {mongoConnect} = require('./connection/database');
const express = require('express');
const Product = require('./modals/product');

const app = express();

app.get("/", (req, res)=>{
    new Product("New Life", 200, "The hidden secrets of the successful life")
    .save()
    .then((result)=>{
        res.json({response : result})
    })
    .catch((err)=>{
        res.send("Something went wrong");
        console.log(err);
    });
});

mongoConnect(()=>{
    app.listen(3000, (err)=>{
        if(err)
            return err;
        console.log("Server started");
    });
});