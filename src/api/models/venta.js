const mongoose = require ("mongoose");

const ventaSchema = new mongoose.Schema({
  venta: { type: Number, unique: true, required: true },
  producto: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Producto',
    required: true 
  },
  cliente: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Usuario',
    required: true 
  },
  fechaVenta: { 
    type: Date, 
    required: true, 
    default: Date.now 
  },
  metodoPago: { type: String, required: true},
  fechaEntrega: {
    type: Date,
    required:false
  },
},{
    timestamps: true,
    collection: "venta",
}
);

module.exports = mongoose.model("Venta", ventaSchema);

