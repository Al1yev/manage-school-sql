const AppError = require("../utility/AppError");
const catchErrorAsync = require("../utility/catchAsync");
const db = require("../config/db");

const dollarMake = (array) => {
  let s = "";
  for (let i = 1; i <= array.length; i++) s += `$${i}, `;
  return s.slice(0, -2);
};

const setMake = (array) => {
  let s = "";
  for (let i = 1; i <= array.length; i++) s += `${array[i - 1]}=$${i}, `;
  return s.slice(0, -2);
};

class HandlerController {
  getAllData = catchErrorAsync(async (req, res, next, table) => {
    const data = await db.query(`SELECT * FROM ${table}`);

    if (data.length) return next(new AppError(`${table}s is not found!`, 404));

    res.status(200).json({
      status: "Success",
      results: data.rows.length,
      data: data.rows,
    });
  });

  getOneData = catchErrorAsync(async (req, res, next, table) => {
    const data = await db.query(
      `SELECT * FROM ${table} WHERE id='${req.params.id}';`
    );

    if (!data.length) return next(new AppError(`${table} is not found!`, 404));

    res.status(200).json({
      status: "Success",
      results: data.rows.length,
      data: data.rows,
    });
  });

  createData = catchErrorAsync(async (req, res, next, table) => {
    const data = await db.query(
      `INSERT INTO ${table} (${req.fields.join(", ")})
        VALUES (${dollarMake(req.data)}) RETURNING *`,
      req.data
    );

    if (!data) return next(new AppError(`${table} is not created!`, 404));

    res.status(201).json({
      status: "Success",
      results: data.rows.length,
      data: data.rows,
    });
  });

  updateData = catchErrorAsync(async (req, res, next, table) => {
    const data = await db.query(
      `UPDATE ${table} SET ${setMake(Object.keys(req.body))} WHERE id = '${
        req.params.id
      }' RETURNING *`,
      Object.values(req.body)
    );

    if (!data) return next(new AppError(`${table} is not found!`, 404));

    res.status(201).json({
      status: "Success",
      results: data.rows.length,
      data: data.rows,
    });
  });

  deleteData = catchErrorAsync(async (req, res, next, table) => {
    const data = await db.query(
      `DELETE FROM ${table} WHERE id = '${req.params.id}' RETURNING *;`
    );

    if (!data) return next(new AppError(`${table} is not found!`, 404));

    res.status(204).json({ status: "Success" });
  });
}

module.exports = new HandlerController();
