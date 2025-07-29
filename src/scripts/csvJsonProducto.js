const fs = require('fs');
const path = require('path');
const csv = require('csvtojson');

const inputPath = path.join(__dirname, '../data/productos.csv');
const outputPath = path.join(__dirname, '../seeds/productos.json');

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

csv()
  .fromFile(inputPath)
  .then((jsonArray) => {
    const normalizado = jsonArray.map(renameKeys);
    
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}
    
    fs.writeFileSync(outputPath, JSON.stringify(normalizado, null, 2), 'utf8');
    console.log('✅ Conversión completa. Archivo guardado en seeds/productos.json');
  })
  .catch((err) => {
    console.error('❌ Error al convertir el CSV:', err);
  });
