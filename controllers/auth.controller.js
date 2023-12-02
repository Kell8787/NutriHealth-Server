
const User = require("../models/User.model");
const ROLES = require("../data/roles.constants.json");

const { createToken, verifyToken } = require("../utils/jwt.tools");

const controller = {};

controller.register = async (req, res, next) => {
    try {
        // Objeter la informacion
        const { username, email, password } = req.body;
        
        // Verificar la existencia del correo y el usuario
        const user = await User.findOne({ $or: [{username: username}, {email: email}] });

        if(user){
            return res.status(409).json({ error:"User already exists" });
        }
        // Si no existe, lo creamos.
        const newUser = new User({
            username: username,
            email: email,
            password: password,
            roles: [ROLES.USER]
        })

        await newUser.save();

        return res.status(201).json({ message:"User register" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

controller.login = async (req, res, next) => {
    try {
      // Obtener la info -> identificador ya sea usuario o email y la password.
      const { username, password } = req.body;
  
      // Verificar si el Usuario existe.
      const user = await User.findOne({username: username});

  
      // Si no existe, retornar 404.
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      // Si existe, verificar la password.
      // Si la password no coincide -> 401.
      if (!user.comparePassword(password)) {
        return res.status(401).json({ error: "Incorrect Password" });
      }
  
      // Si la password coincide -> Loggeamos (TODO).
      // Crear un Token
      const token = await createToken(user._id);
  
      // Almacenar Token
      // Verificar la integridad de los token actuales. -> Max 5 sesiones por Usuario
      let _tokens = [...user.tokens];
      const _verifyPromises = _tokens.map(async (_t) => {
        const status = await verifyToken(_t);
        return status ? _t : null;
      });
  
      _tokens = (await Promise.all(_verifyPromises))
        .filter((_t) => _t)
        .slice(0, 4);
  
      _tokens = [token, ..._tokens];
      user.tokens = _tokens;
  
      await user.save();
      // Devolver Token
      return res.status(200).json({ token });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
  

controller.whoami = async (req, res, next) => {
    try {
        const { _id, username, email, roles } = req.user;

        return res.status(200).json({
            _id, username, email, roles
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    } 
}

module.exports = controller;