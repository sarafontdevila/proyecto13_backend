const Producto = require('../../api/models/producto');
const deleteFile = require('../../utils/deleteFile');


const createProducto = async (req, res) => { 
  try {
    const nuevoProducto = new Producto ({...req.body, imagen:req.file?.path || null})
    const productoGuardado = await nuevoProducto.save()
    res.status(200).json(productoGuardado)
  } catch (error) {
    res.status(400).json({
      message: 'Error al crear el producto',
      error: error.message})
  }
  }

const getProductos = async (req, res) => {
  try {
    const productos = await Producto.find()
    return res.status(200).json(productos)
  } catch (error) {
    return res.status(400).json({ message: 'Error al obtener productos' })
  }
}

const getProductoById = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.json(producto);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el producto", error: error.message });
  }
};


const updateProducto =  async (req, res) => { 
  try {
    if (req.file) {
      const productoActual = await Producto.findById(req.params.id);
      if (!productoActual) {
        return res.status(404).json({ message: "Producto no encontrado" });
      }
      if (productoActual.imagen) {
        deleteFile(productoActual.imagen);
      }
      req.body.imagen = req.file.path;
    }
    const productoActualizado = await Producto.findByIdAndUpdate(
      req.params.id,
      req.body,
       { new: true})
    if (!productoActualizado) {
      return res.status(404).json({ message: "Producto no encontado"})
    }
    res.json(productoActualizado)
  } catch (error) {
    res.status(400).json({ message: "Error al obtener el producto", error: error.message })
    
  }
}
const deleteProducto = async (req, res) => { 
  try {
    const productoEliminado = await Producto.findByIdAndDelete(req.params.id)
    if (!productoEliminado) {
      return res.status(404).json({ message: "Producto no encontrado" })
    }
    if (productoEliminado.imagen) {
      deleteFile(productoEliminado.imagen)
    }
    res.json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el producto", error: error.message });
  }
};

module.exports = {
  getProductos,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto
}
