const express = require("express");


const app = express();

app.use ('/ping', (req, res, next) => {
  console.log(req)
  return res.status(200).json("pong");})

app.listen(3000, () => {
  console.log('http://localhost:3000');
});
