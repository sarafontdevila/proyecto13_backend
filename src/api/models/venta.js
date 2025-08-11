const mongoose = require ("mongoose");

const ventaSchema = new mongoose.Schema({
  Venta: { type: Number, unique: true, required: true },
  Producto: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Producto',
    required: true 
  },
  Cliente: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Usuario',
    required: true 
  },
  FechaVenta: { 
    type: Date, 
    required: true, 
    default: Date.now 
  },
  MetodoPago: { type: String, required: true},
  FechaEntrega: {
    type: Date,
    required:false
  },
},{
    timestamps: true,
    collection: "venta",
}
);

module.exports = mongoose.model("Venta", ventaSchema);

