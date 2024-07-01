const router = require("express").Router();
const productController = require("../controllers/productController");

router.get("/products", productController.getProducts);
router.get("/product/:id", productController.getProductById);

module.exports = router;
