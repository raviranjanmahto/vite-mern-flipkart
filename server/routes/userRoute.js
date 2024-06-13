const router = require("express").Router();
const authController = require("../controllers/authController");

// health check
router.get("/ping", authController.ping);

router.post("/signup", authController.signup);
router.post("/login", authController.login);

module.exports = router;
