const AppError = require("./AppError");

const catchErrorAsync = (func) => {
  const catchFunc = (req, res, next, table) => {
    func(req, res, next, table).catch((err) =>
      next(new AppError(err.message, 404))
    );
  };
  return catchFunc;
};

module.exports = catchErrorAsync;
