require("dotenv").config()
const cloudinary = require("cloudinary").v2
const express = require("express");
const cors = require("cors");
const fs = require ('fs')
const usersRouter = require("./src/api/routes/usuario")
const productosRouter = require("./src/api/routes/producto")
const ventasRouter = require("./src/api/routes/venta")
const mongoose = require("mongoose")
const { connectDB } = require("./src/config/db");

const app = express();
connectDB()

app.use(express.json())


app.use (cors())

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
})

app.use("/api/v1/usuarios", usersRouter)
app.use("/api/v1/productos", productosRouter)
app.use("/api/v1/ventas", ventasRouter)

app.get('/', (req, res) => {
  res.json({ 
    message: 'API funcionando correctamente',
    timestamp: new Date().toISOString()
  });
});

app.get('/api', (req, res) => {
  res.json({ 
    message: 'API v1 - Productos, Ventas y Usuarios',
    endpoints: ['/api/v1/usuarios', '/api/v1/productos', '/api/v1/ventas'],
  });
});

app.use((req, res) => {
  return res.status(404).json({ error: "Route Not Found" });
});

/*app.listen(3000, () => {
  console.log('Escuchando en http://localhost:3000');
});*/
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log('Escuchando en http://localhost:' + PORT);
  });
}

module.exports = (req, res) => app(req, res)