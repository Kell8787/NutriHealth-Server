const Receta = require('../models/recipe');
const User = require('../models/User.model');

// Definir controladores para operaciones CRUD en recetas
const getRecetas = async (req, res) => {

  try {  
    const recetas = await Receta.find({ user: req.user._id });
    res.json(recetas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las recetas' });
  }
};

const getRecetaById = async (req, res) => {
  const { id } = req.params;
  try {
    const receta = await Receta.findOne({ _id: id, user: req.user._id });

    if (!receta) {
      return res.status(404).json({ error: 'Receta no encontrada' });
    }

    res.json(receta);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la receta' });
  }
};

const createReceta = async (req, res) => {
  try {
    const { id, title, image, calories } = req.body;
    const user = req.user;
    
    // Verificar si el usuario existe
    if (!user) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const existingRecipe = await Receta.findOne({
      user: user._id,
      id: id,
    });

    if (existingRecipe) {
      return res.status(400).json({ error: "Recipe already exists in collection" });
    }

    // Crea la receta asociada al usuario
    const newRecipe = new Receta({
      user: user._id, // Asociamos la receta al usuario
      id: id,
      title: title,
      image: image,
      calories: calories,
    });

    await newRecipe.save();

    return res.status(201).json({ message: "Recipe added to collection" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateReceta = async (req, res) => {
  const { id } = req.params;
  const { title, image, calories } = req.body;
  try {
    const recetaActualizada = await Receta.findOneAndUpdate(
      { _id: id, user: req.user._id },
      { title, image, calories },
      { new: true }
    );

    if (!recetaActualizada) {
      return res.status(404).json({ error: 'Receta no encontrada' });
    }

    res.json(recetaActualizada);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la receta' });
  }
};

const deleteReceta = async (req, res) => {
  const { id } = req.params;

  try {
    // Buscar la receta por su ID y el ID del usuario
    const recetaEliminada = await Receta.findOneAndDelete({ id: id, user: req.user._id });


    if (!recetaEliminada) {
      return res.status(404).json({ error: 'Receta no encontrada o no tienes permisos para eliminarla' });
    }

    res.json(recetaEliminada);
  } catch (error) {
    console.error('Error al eliminar la receta:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = {
  getRecetas,
  getRecetaById,
  createReceta,
  updateReceta,
  deleteReceta,
};
