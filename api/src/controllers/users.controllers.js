const { getConnection, mssql } = require("../database/conection");
const querys = require("../database/querys");
const bcrypt = require("bcrypt");

module.exports.getUsers = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(querys.getAllUsers);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

module.exports.createUsers = async (req, res) => {
  const { nombre, apellido, email, telefono, usuario, contraseña } = req.body;
  if (!nombre || !apellido || !email || !telefono || !usuario || !contraseña) {
    return res.status(400).json({ msg: "Por favor llene todos los campos" });
  }
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(contraseña, saltRounds);

    const pool = await getConnection();
    await pool
      .request()
      .input("nombre", mssql.VarChar, nombre)
      .input("apellido", mssql.VarChar, apellido)
      .input("email", mssql.VarChar, email)
      .input("telefono", mssql.Int, telefono)
      .input("usuario", mssql.VarChar, usuario)
      .input("contraseña", mssql.VarChar, hashedPassword)
      .query(querys.createNewUser);
    res.json({ nombre, apellido, email, telefono, usuario });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

module.exports.getUserById = async (req, res) => {
  const { id } = req.params;

  const pool = await getConnection();
  const result = await pool.request().input("id", id).query(querys.getUserById);

  res.send(result.recordset[0]);
};

module.exports.deleteUserById = async (req, res) => {
  const { id } = req.params;

  const pool = await getConnection();
  const result = await pool
    .request()
    .input("id", id)
    .query(querys.deleteUserById);

  res.sendStatus(204);
};

module.exports.updateUserById = async (req, res) => {
  const { nombre, apellido, email, telefono, usuario, contraseña } = req.body;
  const { id } = req.params;
  if (!nombre || !apellido || !email || !telefono || !usuario || !contraseña) {
    return res.status(400).json({ msg: "Por favor llene todos los campos" });
  }
  try {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(contraseña, saltRounds);

  const pool = await getConnection();
  await pool.request()
    .input("nombre", mssql.VarChar, nombre)
    .input("apellido", mssql.VarChar, apellido)
    .input("email", mssql.VarChar, email)
    .input("telefono", mssql.Int, telefono)
    .input("usuario", mssql.VarChar, usuario)
    .input("contraseña", mssql.VarChar, hashedPassword)
    .input('id', mssql.Int, id)
    .query(querys.updateUserById)

    res.json({nombre, apellido, email, telefono, usuario})
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
