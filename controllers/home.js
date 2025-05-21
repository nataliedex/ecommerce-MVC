const Product = require("../models/Product");
const Business = require("../models/Business");
const Customer = require("../models/Customer");

module.exports = {

        getIndex: async(req, res) => {
            try {

                let user = null;

                if(req.user){
                    user = req.user.type === "business"
                     ? await Business.find(req.user._id) 
                     : await Customer.find(req.user._id);
                }
                

                const product = await Product.aggregate([{ $sample: { size: 3 } }]);
                res.render("index.ejs", {
                    product: product,
                    user: user,
                });

            } catch(err) {
                console.log(err);
                res.status(500).send("Server Error");
            }
        },

        

        


};