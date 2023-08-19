const Connection = require("mssql").Connection;

const config = {
  server: "TANDEM-DIGITAL-TEST",
  authentication: {
    type: "default",
    options: {
      userName: "",
      password: "",
    },
  },
};

const connection = new Connection(config);

connection.connect();
