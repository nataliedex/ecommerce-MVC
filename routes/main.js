const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home");
const authController = require("../controllers/auth");
const businessController = require("../controllers/business");
const customerController = require("../controllers/customer");


router.get("/", homeController.getIndex);
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);

// Customer controllers
router.get("/signup-customer", authController.getSignUpCustomer);
router.post("/signup-customer", authController.postSignUpCustomer);
router.get("/forcustomer", customerController.getCustomer);

// Business Controllers
router.post("/signup-business", authController.postSignUpBusiness);
router.get("/signup-business", authController.getSignUpBusiness);
router.get("/forbusiness", businessController.getBusiness);


module.exports = router;