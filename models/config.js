// models/Config.js
const mongoose = require('mongoose');
require('dotenv').config();
const configSchema = new mongoose.Schema({
  apiKey: String,
  apiHost: String,
});

const Config = mongoose.model('Config', configSchema);

module.exports = Config;
