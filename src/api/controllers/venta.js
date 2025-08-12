const Venta = require("../models/venta");
const Producto = require("../models/producto");
const Usuario = require("../models/usuario");

const createVenta = async (req, res) => {
  try {
    const { producto, metodoPago, fechaEntrega } = req.body;

    const productoExistente = await Producto.findById(producto);
    if (!productoExistente) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    const ultimaVenta = await Venta.findOne().sort({ venta: -1 }).limit(1);
    const numeroDeVenta = ultimaVenta ? ultimaVenta.venta + 1 : 1;

    const nuevaVenta = new Venta({
      venta: numeroDeVenta,
      producto,
      cliente: req.usuario._id, 
      metodoPago,
      fechaEntrega: fechaEntrega || null
    });

    const ventaGuardada = await nuevaVenta.save();
    
    const ventaCompleta = await Venta.findById(ventaGuardada._id)
      .populate("producto")
      .populate("cliente");

    res.status(201).json({
      message: "Venta creada exitosamente",
      venta: ventaCompleta
    });
  }  catch (error) {
    console.error(error);
    if (error.code === 11000) {
      return res.status(400).json({ error: "El número de venta ya existe. Intente de nuevo." });
    }
    if (error.name === 'ValidationError') {
      const errores = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ error: "Error de validación", detalles: errores });
    }
    res.status(500).json({ error: "Error al crear la venta" });
  }
};

const getVentas = async (req, res) => {
  try {
    let ventas;
    
    if (req.usuario.rol === 'admin') {
      console.log("Buscando todas las ventas...");
      ventas = await Venta.find().populate("producto").populate("cliente");
      
    } else {
      console.log("Buscando ventas para el cliente:", req.usuario._id);
      ventas = await Venta.find({ cliente: req.usuario._id })
        .populate("producto")
        .populate("cliente");
    }
    console.log("Ventas encontradas:", ventas);
    res.json(ventas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener las ventas" });
  }
};
const getVentaById = async (req, res) => {
  try {
    let venta;
    
    if (req.usuario.rol === 'admin') {
      venta = await Venta.findById(req.params.id).populate("producto").populate("cliente");
    } else {
      venta = await Venta.findOne({ 
        _id: req.params.id, 
        cliente: req.usuario._id 
      }).populate("producto").populate("cliente");
    }
    
    if (!venta) {
      return res.status(404).json({ error: "Venta no encontrada o no autorizada" });
    }
    
    res.json(venta);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener la venta" });
  }
};


const getVentasByProducto = async (req, res) => {
  try {
    const { productoId } = req.params;
    
    const producto = await Producto.findById(productoId);
    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    const ventas = await Venta.find({ producto: productoId })
      .populate("producto")
      .populate("cliente")
      .sort({ createdAt: -1 });

    res.json({
      producto: `${producto.marca}`,
      totalVentas: ventas.length,
      ventas: ventas
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener las ventas del producto" });
  }
};
const getVentasByCliente = async (req, res) => {
  try {
    const { clienteId } = req.params;
    
    const cliente = await Usuario.findById(clienteId);
    if (!cliente) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }

    const ventas = await Venta.find({ cliente: clienteId })
      .populate("producto")
      .populate("cliente")
      .sort({ createdAt: -1 }); 

    res.json({
      cliente: cliente.nombre,
      totalVentas: ventas.length,
      ventas: ventas
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener las ventas del cliente" });
  }
};
module.exports = {
  createVenta,
  getVentas,
  getVentaById,
  getVentasByProducto,
  getVentasByCliente
};

