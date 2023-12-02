const Dieta = require('../models/dieta');
const Receta = require('../models/recipe');

const createDieta = async (req, res) => {
  const { recetasIds, nombreDieta } = req.body;

  try {
    // Buscar las recetas en la colección
    const recetas = await Receta.find({ id: { $in: recetasIds }, user: req.user._id });

    if (recetas.length !== recetasIds.length) {
      // No todas las recetas solicitadas fueron encontradas
      return res.status(400).json({ error: 'Al menos una receta no existe en la colección.' });
    }

    // Crear la nueva dieta con las recetas encontradas
    const nuevaDieta = new Dieta({
      nombre: nombreDieta,
      recetas: recetas.map((receta) => receta._id),
      user: req.user._id,
    });

    const dietaGuardada = await nuevaDieta.save();

    res.status(201).json(dietaGuardada);
  } catch (error) {
    console.error('Error al crear la dieta:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};



const getDietas = async (req, res) => {
  try {
    const dietas = await Dieta.find({ user: req.user._id });
    res.json(dietas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las dietas' });
  }
};

const getDietaByNombreAndRecipes = async (req, res) => {
  const { nombreDieta } = req.params;

  try {
    const dieta = await Dieta.findOne({ nombre: nombreDieta, user: req.user._id }).populate('recetas');

    if (!dieta) {
      return res.status(404).json({ error: 'Dieta no encontrada' });
    }

    res.json(dieta);
  } catch (error) {
    console.error('Error al obtener la dieta:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const getDietasNombres = async (req, res) => {
  try {
    const nombres = await Dieta.find({ user: req.user._id }, 'nombre');
    res.json(nombres.map((dieta) => dieta.nombre));
  } catch (error) {
    console.error('Error al obtener nombres de dietas:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const getDietCount = async (req, res) => {
  try {
    const count = await Dieta.countDocuments({ user: req.user._id });
    res.json({ count });
  } catch (error) {
    console.error('Error al obtener la cantidad de dietas:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const deleteDieta = async (req, res) => {
  const { dietaNombre } = req.params;
  
  try {
    
    // Buscar y eliminar la dieta por su nombre y usuario
    const deletedDieta = await Dieta.findOneAndDelete({ dietaNombre: dietaNombre, user: req.user._id });

    if (!deletedDieta) {
      return res.status(404).json({ error: 'Dieta no encontrada' });
    }

    res.json({ message: 'Dieta eliminada exitosamente', deletedDieta });
  } catch (error) {
    console.error('Error al eliminar la dieta:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = {
  createDieta,
  getDietas,
  getDietaByNombreAndRecipes,
  getDietCount,
  getDietasNombres,
  deleteDieta,
};
