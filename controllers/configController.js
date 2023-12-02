// controllers/ConfigController.js
const Config = require('../models/config');

exports.getConfig = async (req, res) => {
  try {
    const config = await Config.findOne({});
    res.json({
      apiKey: process.env.API_KEY,
      apiHost: process.env.API_HOST,
    });
  } catch (error) {
    console.error('Error al obtener la configuración:', error);
    res.status(500).json({ error: 'Error al obtener la configuración' });
  }
};
