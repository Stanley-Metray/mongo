const User = require("../modals/user");

module.exports.postCreateUser = async (req, res) => {
    try {
        const result = await User.create(req.body);
        if (result)
            res.json({ done: true });
        else
            res.json({ done: false, message: "Something went wrong" });
    } catch (error) {
        res.json({ done: false, message: "Something went wrong" });
        console.log(error);
    }
}

module.exports.getUserById = async (req, res)=>{
    try {
        const result = await User.findById(req.query.id)
        .select('name email -_id');
        if (result)
            res.json({ done: true, user : result });
        else
            res.json({ done: false, message: "Something went wrong" });
    } catch (error) {
        res.json({ done: false, message: "Something went wrong" });
        console.log(error);
    }
}

module.exports.postAddToCart = async (req, res)=>{
    try {
        const userId = req.body.id;
        delete req.body.id;
        const result = await User.updateOne({_id : userId}, {$push : {cart : req.body}});
        if (result)
            res.json({ done: true });
        else
            res.json({ done: false, message: "Something went wrong" });
    } catch (error) {
        res.json({ done: false, message: "Something went wrong" });
        console.log(error);
    }
}

module.exports.getCart = async (req, res)=>{
    try {
        const result = await User.findById({_id : req.query.id})
        .select('cart')
        .populate('cart.productId');
        if (result)
            res.json({ done: true, cart : result.cart });
        else
            res.json({ done: false, message: "Something went wrong" });
    } catch (error) {
        res.json({ done: false, message: "Something went wrong" });
        console.log(error);
    }
}