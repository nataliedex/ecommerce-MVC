module.exports = {

        getIndex: async(req, res) => {
            try {
                res.render("index.ejs");

            } catch(err) {
                console.log(err);
                res.status(500).send("Server Error");
            }
        },

        getSignUpCustomer: async(req, res) => {
            try {
                res.render("signup-customer.ejs");

            } catch(err) {
                console.log(err);
                res.status(500).send("Server Error");
            }
        },

        getSignUpBusiness: async(req, res) => {
            try {
                res.render("signup-business.ejs");

            } catch(err) {
                console.log(err);
                res.status(500).send("Server Error");
            }
        },


};