require('dotenv').config();
const mongoose = require ("mongoose")
const Producto = require ( "../api/models/producto")
/*const producto = require ("../../data/productos")*/
const productos = require('./productos.json');

const seedProducto = async () => {
  try {
    await mongoose.connect(process.env.DB_URL)
    await Producto.collection.drop()
    console.log ("se ha borrado la coleccion productos")

    await Producto.insertMany (productos)
    console.log("se han insertado los cursos")

    await mongoose.disconnect()
    console.log("se ha desconectado bbdd")
    
  } catch (error) {
    console.log ("error en la seeed")
    console.error (error)
    
  }
}

seedProducto()