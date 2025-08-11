
require('dotenv').config();
const mongoose = require('mongoose');
const csv = require('csvtojson');
const fs = require('fs');
const path = require('path');
const Producto = require('../../api/models/producto');

const csvPath = path.join(__dirname, '../../data/productos.csv');
const jsonPath = path.join(__dirname, './productos.json');

const renameKeys = (item) => ({
  vehiculo: item.Vehiculo,
  marca: item.Marca,
  modelo: item.Modelo,
  tipo: item.Tipo,
  anyoFabricacion: parseInt(item["AnyoFabricación"]),
  kilometraje: parseInt(item.Kilometraje),
  estado: item.Estado,
  precioVenta: parseFloat(item.PrecioVenta),
  fechaAdquisicion: new Date(item["FechaAdquisición"]),
  imagen: item.Imagen,
});

const seedProducto = async () => {
  try {
    const csvData = await csv().fromFile(csvPath);
    const productos = csvData.map(renameKeys);

    fs.writeFileSync(jsonPath, JSON.stringify(productos, null, 2), 'utf8');
    console.log('📄 Archivo productos.json generado correctamente');

    await mongoose.connect(process.env.DB_URL);
    await Producto.collection.drop();
    console.log('📦 Colección "productos" borrada');

    await Producto.insertMany(productos);
    console.log('✅ Productos insertados correctamente');

    /*await mongoose.disconnect();
    console.log('🔌 Desconectado de la base de datos');*/
  } catch (err) {
    console.error('❌ Error en el proceso de seed:', err);
    await mongoose.disconnect();
  }
};

seedProducto();
