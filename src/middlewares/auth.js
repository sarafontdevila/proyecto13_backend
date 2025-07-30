const Usuario = require("../api/models/usuario")
const { verifyToken } = require("../utils/jwt")
const isAuth = async (req, res, next) => {
  try {

    const token = req.headers.authorization
    const parsedToken = token.replace("Bearer ", "")
    
    const { id } = verifyToken(parsedToken)
    const usuario = await Usuario.findById(id)


    usuario.password = null
    req.usuario = usuario
    next()

  } catch (error) {
    return res.status (400).json("No autenticado")
    
  }
}
const isAdmin = (req, res, next) => {
  if (req.usuario?.rol !== "admin") {
    return res.status(403).json({ message: "Acceso denegado: solo administradores" })
  }
  next()
}

module.exports = { isAuth, isAdmin }