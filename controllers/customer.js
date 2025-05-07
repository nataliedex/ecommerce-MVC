module.exports = {
    getCustomer: async(req, res) => {
        try{
            
            res.render("forcustomer.ejs");

        } catch(err){
            console.log(err);
            res.status(500).send("Server Error");
        }
    },
};