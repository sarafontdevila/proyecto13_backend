const jwt = require("jsonwebtoken")

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_KEY,{ expiresIn: "1y"})}

  const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_KEY);
}

  module.exports = { generateToken, verifyToken }