const router = require("express").Router();
const authController = require("../controllers/authController");

// Public methods
router.post("/signup", authController.signup);
router.patch("/verify/:token", authController.verifyEmail);
router.post("/login", authController.login);
router.post("/forgot-password", authController.forgotPassword);

// Below are protected routes login required
router.use(authController.protect);

router.post("/logout", authController.logout);
router.delete("/delete", authController.delete);
router.patch("/update-me", authController.updateMe);
router.get("/me", authController.getMe);
router.patch("/reset-password/:token", authController.resetPassword);
router.patch("/update-password", authController.updatePassword);

// Below routes only accessible by admin
router.use(authController.protectRoles("admin"));

router.get("/all-users", authController.getAllUsers);

module.exports = router;
