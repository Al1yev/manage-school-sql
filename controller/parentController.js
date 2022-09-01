const handlerController = require("./handlerController");

class ParentController {
  getAllParent(req, res, next) {
    return handlerController.getAllData(req, res, next, "parent");
  }

  getOneParent(req, res, next) {
    return handlerController.getOneData(req, res, next, "parent");
  }

  createParent(req, res, next) {
    return handlerController.createData(req, res, next, "parent");
  }

  updateParent(req, res, next) {
    return handlerController.updateData(req, res, next, "parent");
  }

  deleteParent(req, res, next) {
    return handlerController.deleteData(req, res, next, "parent");
  }
}

module.exports = new ParentController();
