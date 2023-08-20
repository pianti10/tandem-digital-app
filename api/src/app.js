const express = require("express");
const config = require("./config");
const usersRoutes = require("./routes/users.routes");

const app = express();

app.set("port", config.port || 4000);

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}));

app.use(usersRoutes);

module.exports = app;
