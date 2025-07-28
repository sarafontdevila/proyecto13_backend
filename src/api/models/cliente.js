const mongoose = require ("mongoose");

const clienteSchema = new mongoose.Schema({
  cliente: { type: Number, required: true },
  nombre: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  preferencias: { type: String, required: true }, 
});

module.exports = mongoose.model("Cliente", clienteSchema);