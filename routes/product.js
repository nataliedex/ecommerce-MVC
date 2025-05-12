const express = require("express");
const router = express.Router();

const productController = require("../controllers/product");


router.get("/:id", productController.getItem);
router.delete("/removeItem/:id", productController.deleteItem);






module.exports = router;