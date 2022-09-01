const router = require("express").Router();
const teacherController = require("../controller/teacherController");

router
  .route("/")
  .get(teacherController.getAllTeacher)
  .post(teacherController.createTeacher);

router
  .route("/:id")
  .get(teacherController.getOneTeacher)
  .put(teacherController.updateTeacher)
  .delete(teacherController.deleteTeacher);
module.exports = router;
