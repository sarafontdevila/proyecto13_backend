require("dotenv").config()
const cloudinary = require("cloudinary").v2
const express = require("express");
const cors = require("cors");
const fs = require ('fs')
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

app.use(express.json())

app.use ('/ping', (req, res, next) => {
  console.log(req)
  return res.status(200).json("pong");})

app.listen(3000, () => {
  console.log('http://localhost:3000');
});
