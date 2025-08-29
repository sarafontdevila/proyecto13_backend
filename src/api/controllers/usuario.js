const { generateToken } = require('../../utils/jwt')
const Usuario = require('../models/usuario') 
const bcrypt = require('bcrypt')

const getUsers = async (req, res) => {
  try {
    const users = await Usuario.find()
    return res.status(200).json(users)
  } catch (error) {
    return res.status(400).json({ message: 'Error al obtener usuarios' })
  }
}

const getUserById = async (req, res) => {
  try {
    const { id } = req.params
    const user = await Usuario.findById(id)
    return res.status(200).json(user)
  } catch (error) {
    return res.status(400).json({ message: 'Error al obtener usuario' })
  }
}

const register = async (req, res) => {
  try {
    const { nombre, email, password, preferencias } = req.body

    const usuarioDuplicado = await Usuario.findOne({ email })
    if (usuarioDuplicado) {
      return res.status(400).json({ message: 'El usuario ya existe' })
    }

    const lastUser = await Usuario.findOne().sort({ usuario: -1 });
    const nextUsuarioNumber = lastUser ? lastUser.usuario + 1 : 1;

    const hashedPassword = await bcrypt.hash(password, 10)

    const nuevoUsuario = new Usuario({
      usuario: nextUsuarioNumber,
      nombre,
      email,
      password: hashedPassword,
      preferencias,
      rol: 'cliente'
    })

    const user = await nuevoUsuario.save()
    const token = generateToken(user._id)

    return res.status(200).json({ user, token })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Error en el registro' })
  }
}

const login = async (req, res) => {
  try {
    const { email, password} = req.body
    const user = await Usuario.findOne({ email })

    if (!user) {
      return res.status(400).json({ message: 'Usuario o contraseña incorrecta' })
    }
    
    if (bcrypt.compareSync(password, user.password)){
      const token = generateToken(user._id)
      return res.status(200).json({ token, user })
    }
      return res.status(400).json({message:'Contraseña o usuario incorrecta'})
  } catch (error) {
    console.error(error)
    return res.status(400).json({ message: 'Error en login' })
  }
}

const me = async (req, res) => {
  try {
    if (!req.usuario) {
      return res.status(401).json({ message: "No autorizado" });
    
  } const { _id, usuario, nombre, email, rol, preferencias, createdAt, updatedAt } = req.usuario;

  return res.status(200).json({
    id: _id,
    usuario,
    nombre,
    email,
    rol,
    preferencias,
    createdAt,
    updatedAt,
  });
} catch (error) {
  console.error(error);
  return res.status(400).json({ message: "Error obteniendo el usuario actual" });
}

}

module.exports = {
  getUsers,
  getUserById,
  register,
  login,
  me,
}
