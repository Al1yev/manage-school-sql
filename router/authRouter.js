const router = require("express").Router();
const authController = require("../controller/authController");

router.route("/signup").post((req, res, next) => {
  console.log("keldi");
  next();
}, authController.signUp);

module.exports = router;
