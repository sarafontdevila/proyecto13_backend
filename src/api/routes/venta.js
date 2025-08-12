const { isAuth, isAdmin } = require("../../middlewares/auth");
const {
  getVentas,
  getVentaById,
  getVentasByProducto,
  getVentasByCliente,
  createVenta
} = require("../controllers/venta")

const ventasRouter = require("express").Router()

ventasRouter.get("/producto/:productoId", isAuth, isAdmin, getVentasByProducto)
ventasRouter.get("/cliente/:clienteId", isAuth, isAdmin, getVentasByCliente)
ventasRouter.get("/", isAuth, getVentas)
ventasRouter.get("/:id", isAuth, isAdmin,getVentaById) 
ventasRouter.post("/", isAuth, createVenta)

module.exports = ventasRouter