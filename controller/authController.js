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

    if (JSON.parse(process.env.ROLES).includes(role)) {
      // checking email
      if (
        (await db.query(`SELECT * FROM ${role} WHERE email = '${email}'`)).rows
          .length
      )
        return next(new AppError("Email is already registered!", 404));

      await db.query(`INSERT INTO email (email, role) VALUES ($1, $2)`, [
        email,
        role,
      ]);
      return handlerController.createData(req, res, next, role);
    } else return next(new AppError("Doesn't exist such role!", 401));
  };

  signIn = async (req, res, next) => {
    const { email, password } = req.body;
    const user = (
      await db.query(
        `SELECT * FROM ${JSON.parse(process.env.ROLES).join(
          ", "
        )} WHERE email = '${email}'`
      )
    ).rows[0];
    if (!Object.keys(user).length)
      return next(new AppError("User hasn't been created!", 404));
    if (!user.password === password)
      return next(new AppError("Incorrect password!", 404));
    console.log(user);
  };
}

module.exports = new Authorization();
