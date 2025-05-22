const express = require("express");
const router = express.Router();

const productController = require("../controllers/product");


router.get("/:id", productController.getItem);
router.delete("/removeItem/:id", productController.deleteItem);

router.get("/editItem/:id", productController.getEditItem);
router.put("/updateItem/:id", productController.updateItem);

router.post("/:id/addToCart", productController.addItemToCart);






module.exports = router;