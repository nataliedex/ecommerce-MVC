const mongoose = require("mongoose");
const { isFloat } = require("validator");

const orderSchema = new mongoose.Schema({
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
    item: [
        {
            company: { type: mongoose.Schema.Types.ObjectId, ref: "Business" },
            product: { type: mongoose.Schema.Types.ObjectId, ref: "Product"},
            quantity: {  
                type: Number, 
                validate: {
                    validator: Number.isInteger,
                    message: "Quantity must be an integer",
                },
            },
            price: { 
                type: Number,
                validate: {
                    validator: (value) => isFloat(value.toString()),
                    message: "Price must be a float value",
                  },
            },
        }
    ],
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
