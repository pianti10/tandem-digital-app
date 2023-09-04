const dotenv = require('dotenv');

// Carga las variables de entorno desde un archivo .env
dotenv.config();

// Exporta el objeto con las variables de configuración
module.exports = {
    port: process.env.PORT || 4000,
    dbUser: process.env.DB_USER || '',
    dbPassword: process.env.DB_PASSWORD || '',
    dbServer: process.env.DB_SERVER || '',
    dbDatabase: process.env.DB_DATABASE || '',
}