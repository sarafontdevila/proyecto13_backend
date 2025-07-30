require("dotenv").config()
const cloudinary = require("cloudinary").v2
const express = require("express");
const cors = require("cors");
const fs = require ('fs')
const usersRouter = require("./src/api/routes/usuario")
const mongoose = require("mongoose")
const { connectDB } = require("./src/config/db");

const app = express();
connectDB()

app.use (cors())

cloudinary.config({
  Cloud_name: process.env.CLOUD_NAME,
  Api_key: process.env.API_KEY,
  Api_secret: process.env.API_SECRET
})

app.use("/api/v1/usuarios", usersRouter)

app.use((req, res) => {
  return res.status(404).json({ error: "Route Not Found" });
});

app.listen(3000, () => {
  console.log('Escuchando en http://localhost:3000');
});
