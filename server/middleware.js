import jwt from "jsonwebtoken";

const validateToken = function (req, res, next) {
  try {
    let token = req.headers.authorization;
    if (!token) {
      return res.status(404).send("Token not found");
    }
    let decode = jwt.verify(token, "jwtSecretkey");
    req.user = decode.user;
    req.token = token;
    next();
  } catch (error) {
    return res.status(500).send("Invalid token");
  }
};

export { validateToken };
