const mongoose = require ("mongoose");

const usuarioSchema = new mongoose.Schema({
  usuario: { type: Number, required: true },
  nombre: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  preferencias: { type: String, required: false }, 
  rol: { 
    type: String, 
    required: true, 
    enum: ['cliente', 'administrador'],
    default: 'cliente'
  },
},{
  timestamps: true,
  collection: "usuario",
}
);


module.exports = mongoose.model("Usuario", usuarioSchema);