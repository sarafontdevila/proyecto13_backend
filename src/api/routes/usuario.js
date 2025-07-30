const { isAuth } = require("../../middlewares/auth")
const {getUsers, getUserById, register, login} = require("../controllers/usuario")

const usersRouter = require("express").Router()

usersRouter.get("/", getUsers)
usersRouter.get("/:id", getUserById)
usersRouter.post("/register", register)
usersRouter.post("/login", login)


module.exports = usersRouter