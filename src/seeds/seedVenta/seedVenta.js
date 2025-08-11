require('dotenv').config();
const mongoose = require('mongoose');
const csv = require('csvtojson');
const fs = require('fs');
const path = require('path');

const Venta = require('../../api/models/venta');
const Producto = require('../../api/models/producto');
const Usuario = require('../../api/models/usuario');

const csvPath = path.join(__dirname, '../../data/ventas.csv');
const jsonPath = path.join(__dirname, './ventas.json');


const seedVenta = async () => {
  try {
    const csvData = await csv().fromFile(csvPath);
    await mongoose.connect(process.env.DB_URL);

    const productosDB = await Producto.find();
    const usuariosDB = await Usuario.find();

    const ventas = csvData.map(item => {
      const productoRef = productosDB.find(p => p.vehiculo === item.Producto);
      const clienteRef = usuariosDB.find(u => u.usuario === parseInt(item.Cliente));

      if (!productoRef || !clienteRef) {
        console.warn("⚠️ Producto o cliente no encontrado:", item);
        return null;
      }
      return {
        venta: parseInt(item.Venta),
        producto: productoRef._id,
        cliente: clienteRef._id,
        fechaVenta: new Date(item.FechaVenta),
        metodoPago: item["MétodoPago"],
        fechaEntrega: item.FechaEntrega ? new Date(item.FechaEntrega) : undefined,
      };
    }).filter(Boolean); 

    fs.writeFileSync(jsonPath, JSON.stringify(ventas, null, 2), 'utf8');
    console.log('📄 Archivo ventas.json generado correctamente');

    await mongoose.connect(process.env.DB_URL);
    await Venta.collection.drop();
    console.log('📦 Colección "ventas" borrada');

    await Venta.insertMany(ventas);
    console.log('✅ Ventas insertadas correctamente');

    /*await mongoose.disconnect();
    console.log('🔌 Desconectado de la base de datos');*/
  } catch (err) {
    console.error('❌ Error en el proceso de seed:', err);
    await mongoose.disconnect();
  }
};

seedVenta();
