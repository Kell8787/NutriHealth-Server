// routes/config.js
const express = require('express');
const router = express.Router();
const configController = require('../controllers/configController');

// Ruta para obtener la configuración
router.get('/config', configController.getConfig);

module.exports = router;
    