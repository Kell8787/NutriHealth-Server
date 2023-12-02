require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { connect } = require('./config/database.config');

// Importar routers y configuraciones necesarias
const apiRouter = require('./routes/index.router');

// Conectar a la base de datos
connect();


// Inicializar la aplicación Express
const app = express();

// Configuraciones de middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Configuración de rutas estáticas
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

// Configuración de rutas API
app.use('/api', apiRouter);

// Manejo de errores (puedes personalizarlo según tus necesidades)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal!');
});

module.exports = app;
