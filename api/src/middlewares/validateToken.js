const jwt = require("jsonwebtoken");
const secret = process.env.secret;

module.exports.validateToken = (req, res, next) => {
    console.log("validateToken")
  const token = req.headers.authorization;
  if (!token || token == "") {
    return res.status(401).json({
        message: "No Token"
    });
  }
  try {
    const payload = jwt.verify(token, secret);
    console.log(payload);
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
        message: "invalidate token"
    });
  }
};
