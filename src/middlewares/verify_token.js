const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  const token = req.header("token");
  if (!token) return res.status(401).send({ message: "No token provided" });
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (e) {
    res.status(400).send({ message: "Invalid token" });
  }
};

module.exports = verifyToken;
