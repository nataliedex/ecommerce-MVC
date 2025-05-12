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
    

};