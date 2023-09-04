const express = require("express");
const config = require("./config");
const usersRoutes = require("./routes/users.routes");
const cors = require("cors");

const app = express();

// Configura el puerto del servidor a partir de la configuración o usa el puerto 4000 como valor predeterminado
app.set("port", config.port || 4000);

// Configura middlewares
app.use(express.json()); // Parsea las solicitudes entrantes como objetos JSON
app.use(express.urlencoded({ extended: false })); // Permite el análisis de datos enviados a través de formularios
app.use(cors()); // Configura el middleware CORS para permitir solicitudes desde otros dominios

// Usa las rutas definidas en usersRoutes
app.use(usersRoutes);

module.exports = app;
