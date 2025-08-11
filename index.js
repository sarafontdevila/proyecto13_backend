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

app.use (cors())
app.use(express.json())

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
})

app.use("/api/v1/usuarios", usersRouter)
app.use("/api/v1/productos", productosRouter)
app.use("/api/v1/ventas", ventasRouter)

app.use((req, res) => {
  return res.status(404).json({ error: "Route Not Found" });
});

app.listen(3000, () => {
  console.log('Escuchando en http://localhost:3000');
});
