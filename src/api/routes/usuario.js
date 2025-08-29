const { isAuth } = require("../../middlewares/auth")
const {getUsers, getUserById, register, login, me } = require("../controllers/usuario")

const usersRouter = require("express").Router()

usersRouter.get("/", getUsers)
usersRouter.get("/:id", getUserById)
usersRouter.post("/register", register)
usersRouter.post("/login", login)
usersRouter.get("/me", isAuth, me)


module.exports = usersRouter