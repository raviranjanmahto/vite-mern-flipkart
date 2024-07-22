const router = require("express").Router();
const productController = require("../controllers/productController");
const authController = require("../controllers/authController");

router.get("/all-products", productController.getAllProducts);
router.get("/:id", productController.getProductById);

// Below are protected routes login required
router.use(authController.protect);

// Below routes are only accessible for admin
router.use(authController.protectRoles("admin"));

router.delete("/:id", productController.deleteProductById);
router.patch("/:id", productController.updateProductById);
router.post("/add-product", productController.addProduct);

module.exports = router;
