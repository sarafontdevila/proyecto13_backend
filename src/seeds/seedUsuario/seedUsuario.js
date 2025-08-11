require('dotenv').config();
const mongoose = require('mongoose');
const csv = require('csvtojson');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const Usuario = require('../../api/models/usuario');

const csvPath = path.join(__dirname, '../../data/usuarios.csv');
const jsonPath = path.join(__dirname, './usuarios.json');

const renameKeys = (obj) => {
  return {
    usuario: parseInt(obj.Usuario),
    nombre: obj.Nombre,
    email: obj.Email,
    password: obj.Password,
    preferencias: obj.Preferencias,
  };
};

const seedUsuario = async () => {
  try {
    const csvData = await csv().fromFile(csvPath);
    let usuarios = csvData.map(renameKeys);

    usuarios = await Promise.all(
      usuarios.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return { ...user, password: hashedPassword };
      })
    );

    fs.writeFileSync(jsonPath, JSON.stringify(usuarios, null, 2), 'utf8');
    console.log('📄 Archivo usuarios.json generado correctamente');

    await mongoose.connect(process.env.DB_URL);
    await Usuario.collection.drop();
    console.log('📦 Colección "usuarios" borrada');

    await Usuario.insertMany(usuarios);
    console.log('✅ Usuarios insertados correctamente');

   /* await mongoose.disconnect();
    console.log('🔌 Desconectado de la base de datos');*/
  } catch (err) {
    console.error('❌ Error en el proceso de seed:', err);
    await mongoose.disconnect();
  }
};

seedUsuario();
