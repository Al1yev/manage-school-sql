const handlerController = require("./handlerController");

class TeacherController {
  getAllTeacher(req, res, next) {
    return handlerController.getAllData(req, res, next, "teacher");
  }

  getOneTeacher(req, res, next) {
    return handlerController.getOneData(req, res, next, "teacher");
  }

  createTeacher(req, res, next) {
    return handlerController.createData(req, res, next, "teacher");
  }

  updateTeacher(req, res, next) {
    return handlerController.updateData(req, res, next, "teacher");
  }

  deleteTeacher(req, res, next) {
    return handlerController.deleteData(req, res, next, "teacher");
  }
}

module.exports = new TeacherController();
