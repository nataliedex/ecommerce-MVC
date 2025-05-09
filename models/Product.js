const mongoose = require("mongoose");
const { isFloat } = require("validator");

const productSchema = new mongoose.Schema({
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Business" },
    product: { type: String,  },
    description: { type: String,  },
    price: { 
        type: Number, 
         
        validate: {
            validator: (value) => isFloat(value.toString()),
            message: "Price must be a float value",
        },
    },
    quantity: {  
        type: Number, 
        
        validate: {
            validator: Number.isInteger,
            message: "Quantity must be an integer",
        },
    },
    image: { type: String },
});

module.exports = mongoose.model("Product", productSchema);
