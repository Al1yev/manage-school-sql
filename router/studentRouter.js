const router = require("express").Router();
const studentController = require("../controller/studentController");

router
  .route("/")
  .get(studentController.getAllStudent)
  .post(studentController.createStudent);

router.route("/:id").get(studentController.getOneStudent);
module.exports = router;
