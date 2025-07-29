const mongoose = require ("mongoose");

const productoSchema = new mongoose.Schema({
  vehiculo: { type: String, required: true },
  marca: { type: String, required: true },
  modelo: { type: String, required: true },
  tipo: { type: String, required: true },
  anyoFabricacion: { type: Number, required: true },
  kilometraje: { type: Number, required: true },
  estado: { type: String, required: true },
  precioVenta: { type: Number, required: true },
  fechaAdquisicion: { type: Date, required: true },
  imagen: { type: String }, 
},
{
  timestamps: true,
  collection: "producto",
}
);

module.exports = mongoose.model("Producto", productoSchema);