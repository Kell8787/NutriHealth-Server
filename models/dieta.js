const mongoose = require('mongoose');

const dietaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  recetas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Receta' }],
  user: {
    type: mongoose.Schema.Types.ObjectId, // Tipo de dato que representa de Mongo o Id del tipo de M.
    ref: "User",
    required: true
  },
}, { timestamps: true });

const Dieta = mongoose.model('Dieta', dietaSchema);

module.exports = Dieta;