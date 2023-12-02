// backend/routes/receta.router.js
const express = require('express');
const router = express.Router();
const recetaController = require('../controllers/recipeController');
const dietaController = require('../controllers/dietaControllers');
const authMiddleware = require('../middlewares/auth.middlewares');

// Definir rutas para operaciones CRUD en recetas
router.get('/user', authMiddleware.authentication, recetaController.getRecetas);
router.get('/:id', authMiddleware.authentication, recetaController.getRecetaById);
router.post('/createReceta', authMiddleware.authentication, recetaController.createReceta);
router.put('/:id', recetaController.updateReceta);
router.delete('/:id', authMiddleware.authentication, recetaController.deleteReceta);

//Definir rutas para dietas
router.post('/collection', authMiddleware.authentication, dietaController.createDieta);
router.get('/collection', authMiddleware.authentication, dietaController.getDietas);
router.get('/collection/count', authMiddleware.authentication, dietaController.getDietCount);
router.get('/collection/:nombreDieta', authMiddleware.authentication, dietaController.getDietaByNombreAndRecipes);
router.get('/dietas/nombres', authMiddleware.authentication, dietaController.getDietasNombres);
router.delete('/dietas/:nombreDieta', authMiddleware.authentication, dietaController.deleteDieta);

module.exports = router;
