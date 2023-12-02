// middleware/validationMiddleware.js
// Puedes agregar aquí la lógica de validación si es necesario
const validateRecipe = async (req, res, next) => {

  if (!req.body.title || !req.body.instructions) {
    return res.status(400).json({ error: 'Title and instructions are required' });
  }
  next();

}

module.exports = { validateRecipe };
