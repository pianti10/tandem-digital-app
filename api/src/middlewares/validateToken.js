const jwt = require("jsonwebtoken");
const secret = process.env.secret;

// Middleware para validar tokens de autenticación en las solicitudes entrantes
module.exports.validateToken = (req, res, next) => {
  // Verifica si se proporciona un token en la cabecera de la solicitud
  const token = req.headers.authorization;
  if (!token || token == "") {
    // Si no se proporciona un token o el token es una string vacio, devuelve un error 401
    return res.status(401).json({
      message: "No Token",
    });
  }
  try {
    // Intenta verificar el token utilizando la clave secreta
    const payload = jwt.verify(token, secret);
    // Si la verificación tiene éxito, el token es válido y permite que la solicitud continúe procesándose
    next();
  } catch (error) {
    // Si la verificación del token falla, se captura una excepción y se devuelve un error 401
    return res.status(401).json({
      message: "invalidate token",
    });
  }
};
