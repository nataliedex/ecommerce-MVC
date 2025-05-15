const Product = require("../models/Product");
const Business = require("../models/Business");

module.exports = {

        getIndex: async(req, res) => {
            try {
                const product = await Product.aggregate([{ $sample: { size: 3 } }]);
                res.render("index.ejs", {
                    product: product,
                });

            } catch(err) {
                console.log(err);
                res.status(500).send("Server Error");
            }
        },

        

        


};