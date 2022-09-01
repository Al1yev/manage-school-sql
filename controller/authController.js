const catchErrorAsync = require("../utility/catchAsync");
const AppError = require("../utility/AppError");
const db = require("../config/db");
const handlerController = require("./handlerController");

const checkEmail = (req, email, next, role) => {
  if (handlerController.getAllData((req.query.email = email), res, next, role))
    return next(new AppError("Email is already registered!", 404));
};

class Authorization {
  signUp = async (req, res, next) => {
    const { email, password, password_confirm, role } = req.body;

    if (!password === password_confirm)
      return next(new AppError("Passwords are incorrect!", 401));
    delete req.body.password_confirm;

    if (["student", "teacher", "parent"].includes(role)) {
      // checking email
      if (
        (await db.query(`SELECT * FROM ${role} WHERE email = '${email}'`)).rows
          .length
      )
        return next(new AppError("Email is already registered!", 404));

      return handlerController.createData(req, res, next, role);
    } else return next(new AppError("Doesn't exist such role!", 401));
  };
}

module.exports = new Authorization();
