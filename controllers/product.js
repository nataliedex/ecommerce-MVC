const Product = require("../models/Product");
const Business = require("../models/Business");
const Customer = require("../models/Customer");
const Order = require("../models/Order");

module.exports = {

    getItem: async(req, res) => {
        try{
            const product = await Product.findById(req.params.id);

            let user = null;
            if(req.user){
                user = req.user.type === "business" 
                ? await Business.findById(req.user._id)
                : await Customer.findById(req.user._id);
            }


            res.render("item.ejs", {
                product,
                currentUser: req.user || null,
                user,
            });
        } catch(err){
            console.log(err);
            res.status(500).send("Error retrieving item");
        }
    },

    deleteItem: async(req, res) => {
        try {
          // Delete post from db
          await Product.findByIdAndDelete({ _id: req.params.id });
          console.log("Deleted Listing");
          res.redirect("/product");
        } catch (err) {
          console.error("item not deleted", err);
          res.redirect("/product");
        }
      },

      getEditItem: async(req, res) => {
        try {
            const product = await Product.findById(req.params.id);
            const user = await Business.findOne({  user: product.user });
            res.render("edititem.ejs", {
                product,
                user,
            });
        } catch(err) {
            console.log("can not get edit form", err);
            res.statu(500).send("Error getting edit form for item");
        }
      },

      updateItem: async(req, res) => {
        try {
            const item = await Product.findById(req.params.id);

            item.product = req.body.product || item.product;
            item.description = req.body.description || item.description;
            item.quantity = req.body.quantity || item.quantity;
            item.price = req.body.price || item.price;
            item.image = req.body.image || item.image;

            await item.save();
            console.log("Item updated");

            res.redirect("/product");
        } catch(err) {
            console.log("can not update item", err);
            res.status(500).send("Error updating item");
        }
      },

      addItemToCart: async(req, res) => {
        console.log("Adding item to cart");
        try{
            
            const item = await Product.findById(req.params.id);
            console.log(item);
            if(!item || item.quantity < 1){
                return res.status(400).send("Item not available");
            }

            const quantity = 1;

            await Order.create({
                company: item.company,
                customer: req.user._id,
                product: item.product,
                quantity: quantity,
                price: item.price * quantity,
            });

            item.quantity -= quantity;
            await item.save();

        } catch(err){
            console.log("Can not add item to cart", err);
            res.status(500).send("Error adding item to cart")
        }
        res.redirect("/shop");
      },
    

};