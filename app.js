const mongoConnect = require('./connection/database');
const express = require('express');
const Product = require('./modals/product');
console.clear();
const app = express();

app.get("/", (req, res)=>{
    new Product("My Choice", 400, "Good choice and bad choice", "https://me.jpj.com")
    .save()
    .then((result)=>{
        res.json({response : result})
    })
    .catch((err)=>{
        res.send("Something went wrong");
        console.log(err);
    });
});

app.get('/get-products', async (req,res)=>{
    const products = await Product.fetchAll();
    res.json(products);
});

app.get('/get-product', async(req, res)=>{
    const product = await Product.getProduct("My Choice");
    res.json(product);
});

app.get('/update-product', async(req, res)=>{
    const result = await Product.updateProduct("My Choice", {imageurl:'this is updated'});
    res.json(result);
});

app.get('/delete-product', async(req, res)=>{
    const result = await Product.deleteProduct("My Choice");
    res.json(result);
})

mongoConnect.connect(()=>{
    app.listen(3000, (err)=>{
        if(err)
            console.log(err);
        console.log("Server started");
    });

});