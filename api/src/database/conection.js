const mssql = require("mssql");
const config = require('../config')

// Configuración de la base de datos obtenida desde el archivo de configuración (config.js)
const dbSetting = {
  user: config.dbUser,
  password: config.dbPassword,
  server: config.dbServer,
  database: config.dbDatabase,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

// Función para hacer una conexión a la base de datos
 async function getConnection() {
  try {
        // Crea una pool de conexiones a la base de datos utilizando la configuración
    const pool = await mssql.connect(dbSetting);
    return pool;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { getConnection, mssql };
