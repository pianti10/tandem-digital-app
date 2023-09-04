const { getConnection, mssql } = require("../database/conection");
const querys = require("../database/querys");

// Middleware para verificar si un usuario ya existe en la base de datos
module.exports.userExist = async (req, res , next) => {
    const pool = await getConnection();
    const {usuario} = req.body;
    const userExist = await pool  // Consulta si ya existe un usuario con el mismo nombre
      .request()
      .input("usuario", mssql.VarChar, usuario)
      .query(querys.loginUser);
    if (userExist.recordset.length > 0) {
      return res.status(400).json("Ya existe un usuario con este nombre");
    }
next();  // Continúa con la siguiente función de middleware si el usuario no existe
}

// Middleware para verificar si un usuario ya existe al actualizarlo
module.exports.userUpdate = async (req, res , next) => {
    const pool = await getConnection();
    const {id} = req.params;
    const {usuario} = req.body;

    // Consulta el usuario actual por ID
    const userUpdate = await pool  
      .request()
      .input("id", mssql.VarChar, id)
      .query(querys.getUserById);
      const newUser = userUpdate.recordset[0].usuario

      // Verifica si el nombre de usuario se ha modificado al actualizar
    if (newUser !== usuario) {
       // Consulta si ya existe un usuario con el nuevo nombre
        const userExist = await pool
        .request()
        .input("usuario", mssql.VarChar, usuario)
        .query(querys.loginUser);
        const actualUser = userExist.recordset[0]
      if (actualUser !== undefined) {
        return res.status(400).json("Ya existe un usuario con este nombre");
      }
    }
next();  // Continúa si el usuario no existe
}
