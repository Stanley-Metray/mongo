const ProductController = require('../controllers/ProductController');
const express = require('express');

const ProductRouter = express.Router();

ProductRouter.post("/add-product", async (req, res) => {
    try {
        const result = await ProductController.createProduct(req.body);
        if (result)
            res.json({ done: true });
        else
            res.json({ done: false, message: "Something went wrong" });
    } catch (error) {
        res.json({ done: false, message: "Something went wrong" });
        console.log(error);
    }
});


ProductRouter.get('/products', async (req, res) => {
    try {
        const result = await ProductController.products();
        if (result)
            res.json({ done: true, products: result });
        else
            res.json({ done: false, message: "No Products" });
    } catch (error) {
        res.json({ done: false, message: "Something went wrong" });
        console.log(error);
    }
});

ProductRouter.get('/product', async (req, res) => {
    try {
        const result = await ProductController.findById(req.query.id);
        if (result)
            res.json({ done: true, product: result });
        else
            res.json({ done: false, message: "Product not found" });
    } catch (error) {
        res.json({ done: false, message: "Something went wrong" });
        console.log(error);
    }
});

ProductRouter.put('/update-product', async (req, res) => {
    try {
        const productId = req.body.id;
        delete req.body.id;
        const result = await ProductController.updateProduct(productId, req.body);
        if (result)
            res.json({ done: true, product: result });
        else
            res.json({ done: false, message: "Product not found" });
    } catch (error) {
        res.json({ done: false, message: "Something went wrong" });
        console.log(error);
    }
});

ProductRouter.delete('/delete-product', async (req, res) => {
    try {
        const result = await ProductController.deleteProduct(req.query.id);
        if (result)
            res.json({ done: true, product: result });
        else
            res.json({ done: false, message: "Product not found" });
    } catch (error) {
        res.json({ done: false, message: "Something went wrong" });
        console.log(error);
    }
});

module.exports = ProductRouter;