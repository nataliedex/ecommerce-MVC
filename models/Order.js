const mongoose = require("mongoose");
const { isFloat } = require("validator");

const orderSchema = new mongoose.Schema({
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Business" },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    quantity: {  
        type: Number, 
        validate: {
            validator: Number.isInteger,
            message: "Quantity must be an integer",
        },
    },
    price: { type: Number},
});

module.exports = mongoose.model("Order", orderSchema);
