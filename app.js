const mongoConnect = require('./connection/database');
const express = require('express');
const Product = require('./modals/product');
const User = require('./modals/user');
const Order = require("./modals/orders");
console.clear();
const app = express();

app.get("/", async (req, res) => {
    try {
        const userId = "6648d3483796011f840dcf79";

        const user = await User.findByUserId(userId);
        
        const product = new Product("Mobile", 25000, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus nulla aliquid quas molestiae nisi quasi neque dolore alias nostrum explicabo", "https://laptop-stanley-500gg.com", user._id);
        const createdProduct = await product.save();
        res.json(createdProduct);

    } catch (error) {
        console.log(error);
        res.send("Something went wrong");
    }
});

app.get('/get-products', async (req, res) => {
    const products = await Product.fetchAll();
    res.json(products);
});

app.get('/get-product', async (req, res) => {
    const product = await Product.getProduct("My Choice");
    res.json(product);
});

app.get('/update-product', async (req, res) => {
    const result = await Product.updateProduct("My Choice", { imageurl: 'this is updated' });
    res.json(result);
});

app.get('/delete-product', async (req, res) => {
    const result = await Product.deleteProduct("6647802396b7c1dfa680a6ea");
    res.json(result);
})


app.get('/add-user', async (req, res) => {
    const result = await User.addUser({ name: "Stanley Metray", email: "stanleymetray@gmail.com", password: "a9591303870A" });
    res.json(result);
})

app.get('/get-user', async (req, res) => {
    const result = await User.findByUserId("6647a016c9c4c4691eb213be");
    res.send(result);
})

app.get('/add-to-cart', async(req, res)=>{
    try {
        const result = await User.addToCart("6648d3483796011f840dcf79", "6648d37140a95d4b7ef7a835", 8);
        res.json(result);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
})

app.get('/get-cart', async (req, res)=>{
    try {
        const cart = await User.getCart("6648d3483796011f840dcf79");
        res.json(cart);
        
    } catch (error) {
        console.log(error);
    }
})

app.get('/remove-from-cart', async (req, res)=>{
    try {
        const cart = await User.removeFromCart("6648d3483796011f840dcf79", "6649a00cd33c637daa9eb0bf");
        res.json(cart);
        
    } catch (error) {
        console.log(error);
    }
});

app.get('/place-order', async(req, res)=>{
    try {
        const user = await User.findByUserId("6648d3483796011f840dcf79");
        if(user && user.cart.length>0)
        {
            const order = await new Order(user._id, user.cart).save();
            if(order.acknowledged)
            {
                await User.emptyCart(user._id);
                res.json({orderPlaced:true});
            }
            else
                res.json({orderPlaced:false});
        }
        else
            res.json({orderPlaced:false});
    } catch (error) {
        console.log(error);
    }
});

mongoConnect.connect(() => {
    app.listen(3000, (err) => {
        if (err)
            console.log(err);
        console.log("Server started");
    });

});