const { isAuth, isAdmin } = require("../../middlewares/auth");
const upload = require("../../middlewares/file");
const {
  getProductos,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto
} = require("../controllers/producto");

const productoRouter = require("express").Router();

productoRouter.get("/", getProductos);
productoRouter.get("/:id", getProductoById);
productoRouter.post("/", isAuth, isAdmin,upload.single("imagen"),createProducto);
productoRouter.put("/:id", isAuth, isAdmin, upload.single("imagen"),updateProducto);
productoRouter.delete("/:id", isAuth, isAdmin, deleteProducto);

module.exports = productoRouter;
