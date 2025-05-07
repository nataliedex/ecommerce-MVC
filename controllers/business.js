module.exports = {
    getBusiness: async(req, res) => {
        try{
            console.log("going to business page");
            res.render("forbusiness.ejs");

        } catch(err){
            console.log(err);
            res.status(500).send("Server Error");
        }
    },
};