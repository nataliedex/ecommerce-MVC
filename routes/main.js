const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home");

router.get("/", homeController.getIndex);
router.get("/signup-customer", homeController.getSignUpCustomer);
router.get("/signup-business", homeController.getSignUpBusiness);



module.exports = router;