const mongoose = require('mongoose');

const recetaSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  image: { type: String, required: true },
  calories: { type: Number, required: true  },
});

const Receta = mongoose.model('Receta', recetaSchema);

module.exports = Receta;