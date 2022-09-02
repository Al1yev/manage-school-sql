const catchErrorAsync = require("../utility/catchAsync");
const AppError = require("../utility/AppError");
const db = require("../config/db");
const handlerController = require("./handlerController");

class Authorization {
  signUp = async (req, res, next) => {
    const { email, password, password_confirm, role } = req.body;

    if (!password === password_confirm)
      return next(new AppError("Passwords are incorrect!", 401));
    delete req.body.password_confirm;

    if (!JSON.parse(process.env.ROLES).includes(role))
      return next(new AppError("Doesn't exist such role!", 401));
    // checking email
    if (
      (await db.query(`SELECT * FROM email WHERE email = '${email}'`)).rows
        .length
    )
      return next(new AppError("Email is already registered!", 404));
    console.log("keldi");
    return handlerController.createData(req, res, next, role);
  };

  signIn = async (req, res, next) => {
    const { email, password } = req.body;
    const role = (
      await db.query(`SELECT role FROM email WHERE email = $1;`, [email])
    ).rows[0].role;
    if (!role) return next(new AppError("User hasn't been created!", 404));
    const user = (
      await db.query(`SELECT * FROM ${role} WHERE email = '${email}'`)
    ).rows[0];
    if (!user.password === password)
      return next(new AppError("Incorrect password!", 404));
    res.status(200).json({
      status: "Success",
      message: "Logged in",
      data: user,
    });
  };
}

module.exports = new Authorization();
