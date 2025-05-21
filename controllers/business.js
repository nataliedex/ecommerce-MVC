const Product = require("../models/Product");
const Business = require("../models/Business");
const Customer = require("../models/Customer");

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

    getCompanyProducts: async(req, res) => {
        try{
            const companyName = req.params.name;


            const business = await Business.findOne({  companyName: companyName  });


            if(!business){
                return res.status(404).send("Business not found");
            }

            const product = await Product.find({ company: business._id }).populate("company", "companyName");

            const allProducts = await Product.find().populate("company", "companyName");
            const companyNames = [
                ...new Set(allProducts.map(p => p.company?.companyName).filter(Boolean))
            ];
            res.render("shop.ejs", { 
                user: req.user, 
                product: product,
                companyNames: companyNames,
                selectedCompany: companyName,
             });

        } catch(err){
            console.log(err);
            res.status(500).send("Server Error, Can not get company products");
        }
    },

    getShop: async(req, res) => {
        try{
        
            const product = await Product.find().populate("company", "companyName");
            const companyNames = [
                ...new Set(product.map(p => p.company?.companyName).filter(Boolean))
            ];
            res.render("shop.ejs", { 
                user: req.user, 
                product: product,
                companyNames: companyNames,
                selectedCompany: "All",
             });

        } catch(err){
            console.log(err);
            res.status(500).send("Server Error");
        }
    },

    createProduct: async(req, res) => {
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