const express = require("express");
const config = require("./config");
const usersRoutes = require("./routes/users.routes");
const cors = require('cors');

const app = express();

app.set("port", config.port || 4000);

app.use(express.json())
app.use(express.urlencoded({extended: false}));
app.use(cors());

app.use(usersRoutes);

module.exports = app;
