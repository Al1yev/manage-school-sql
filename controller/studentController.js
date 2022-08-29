const handlerController = require("./handlerController");

class StudentController {
  getAllStudent(req, res, next) {
    return handlerController.getAllData(req, res, next, "student");
  }

  getOneStudent(req, res, next) {
    return handlerController.getOneData(req, res, next, "student");
  }

  createStudent(req, res, next) {
    // req.fields = [
    //   "name_first",
    //   "name_last",
    //   "course",
    //   "course_letter",
    //   "class_id",
    //   "role",
    //   "teacher_id",
    //   "parents_id",
    //   "login",
    //   "password",
    // ];
    // req.data = [
    //   req.body.name_first,
    //   req.body.name_last,
    //   req.body.course,
    //   req.body.course_letter,
    //   req.body.class_id,
    //   req.body.role,
    //   req.body.teacher_id,
    //   req.body.parents_id,
    //   req.body.login,
    //   req.body.password,
    // ];
    return handlerController.createData(req, res, next, "student");
  }

  updateStudent(req, res, next) {
    return handlerController.updateData(req, res, next, "student");
  }

  deleteStudent(req, res, next) {
    return handlerController.deleteData(req, res, next, "student");
  }
}

module.exports = new StudentController();
