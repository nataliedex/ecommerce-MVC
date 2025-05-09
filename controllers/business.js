const Product = require("../models/Product");
const Business = require("../models/Business");

module.exports = {


    getProduct: async(req, res) => {
        try{
            const product = await Product.find({  company: req.user.id });
            res.render("product.ejs", { user: req.user, product: product });
        } catch(err){
            console.log(err);
            res.status(500).send("Server Error");
        }
    },

    createProduct: async(req, res) => {

        console.log(req.body);
        try{
            await Product.create({
                company: req.user.id,
                product: req.body.product,
                description: req.body.description,
                price: req.body.price,
                quantity: req.body.quantity,
                image: req.body.image,
            });
            // res.status(201).json(newProduct);
            console.log("Product has been added");
            res.redirect("/product");

        }catch(err){
            console.log(err);
            res.send(500).send("error creating a product");
        }
    },
};