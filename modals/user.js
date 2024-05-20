const { mongoose } = require("../connection/database");


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },

    cart: [
        {
            productId: { type: mongoose.Schema.ObjectId, ref: "product", required: true },
            quantity: { type: Number, required: true, default: 1 }
        }
    ]
});

const User = mongoose.model("user", UserSchema);

module.exports = User;