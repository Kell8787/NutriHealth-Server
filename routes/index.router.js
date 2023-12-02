const express = require("express");
const router = express.Router();

const authRouter = require("./auth.router");
const recetaRouter = require('./recipeRoutes');
const configRouter = require('./config.router');
// /api/...
router.use("/auth", authRouter); // /auth/register || login || whoami
router.use('/recetas', recetaRouter);
router.use('/config', configRouter);


module.exports = router;
