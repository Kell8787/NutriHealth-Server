// backend/config/database.config.js
const mongoose = require('mongoose');
require('dotenv').config();

const dbUri = process.env.DB_URI;

const connect = async () => {
  try {
    await mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Conexión a la base de datos establecida.');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error.message);
    process.exit(1);
  }
};

const disconnect = async () => {
  try {
    await mongoose.disconnect();
    console.log('Conexión a la base de datos cerrada.');
  } catch (error) {
    console.error('Error al cerrar la conexión a la base de datos:', error.message);
    process.exit(1);
  }
};

module.exports = { connect, disconnect };
