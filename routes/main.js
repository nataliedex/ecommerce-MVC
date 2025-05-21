const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home");
const authController = require("../controllers/auth");
const businessController = require("../controllers/business");


router.get("/", homeController.getIndex);
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignUp);
router.post("/signup", authController.postSignUp);

router.get("/product", businessController.getProduct);
router.post("/createProduct", businessController.createProduct);

router.get("/shop", businessController.getShop);
router.get("/shop/:name", businessController.getCompanyProducts);






module.exports = router;