const router = require("express").Router();
const authController = require("../controller/authController");

router.route("/signup").post(authController.signUp);
router.route("/signin").post(authController.signIn);

module.exports = router;
