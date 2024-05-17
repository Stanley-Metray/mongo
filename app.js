const mongoConnect = require('./connection/database');
const express = require('express');
const Product = require('./modals/product');
const User = require('./modals/user');
console.clear();
const app = express();

app.get("/", (req, res)=>{
    // new Product("My Choice", 400, "Good choice and bad choice", "https://me.jpj.com")
    // .save()
    // .then((result)=>{
    //     res.json({response : result})
    // })
    // .catch((err)=>{
    //     res.send("Something went wrong");
    //     console.log(err);
    // });
    res.send("Server is running...");
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
    const result = await Product.deleteProduct("6647802396b7c1dfa680a6ea");
    res.json(result);
})


app.get('/add-user', async (req, res)=>{
    const result = await User.addUser({name:"Stanley Metray", email:"stanleymetray@gmail.com", password:"a9591303870A"});
    res.send(result);
})

app.get('/get-user', async (req, res)=>{
    const result = await User.findByUserId("6647a016c9c4c4691eb213be");
    res.send(result);
})

mongoConnect.connect(()=>{
    app.listen(3000, (err)=>{
        if(err)
            console.log(err);
        console.log("Server started");
    });

});