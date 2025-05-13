const Product = require("../models/Product");
const Business = require("../models/Business");

module.exports = {

    getItem: async(req, res) => {
        try{
            const product = await Product.findById(req.params.id);
            const user = await Business.findOne({  user: product.user });

            res.render("item.ejs", {
                product,
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
    

};