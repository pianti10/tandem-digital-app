const app = require("./app");

app.listen(app.get("port")); // Inicia el servidor y lo hace escuchar en el puerto especificado

console.log("server on port", app.get("port")); // Muestra un mensaje en la consola indicando en qué puerto está escuchando el servidor
