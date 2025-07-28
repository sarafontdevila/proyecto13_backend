const mongoose = require ("mongoose");

const clienteSchema = new mongoose.Schema({
  ventaID: { type: Number, required: true },
  vehiculo: { type: String, required: true },
  cliente: { type: String, required: true },
  fechaVenta: { type: Date, required: true },
  pago: { type: String, required: true },
  fechaEntrega: { type: Date, required: true }, 
});

module.exports = mongoose.model("Venta", ventaSchema);
