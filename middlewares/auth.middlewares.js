const debug = require("debug")("app:auth-middleware")
const { verifyToken } = require("../utils/jwt.tools");
const User = require("../models/User.model");
const ROLES =require("../data/roles.constants.json");

const middlewares = {};

const PREFIX = "Bearer";


middlewares.authentication = async (req, res, next) => {
    try {
        //debug("User authentication");
        // Verificar el authorization
        const { authorization } = req.headers;

        if(!authorization){
            return res.status(401).json({ error:"User not authenticated" })
        }


        // Verificar la validez del token
        // Toke -> Bearer djghdsgdsklklklsj.dkngdjghdsj.dvhskjghdskgs
        const [prefix, token] = authorization.split(" ");

        if(prefix !== PREFIX){
            return res.status(401).json({ error: "User not authenticated" });
        }

        if(!token){
            return res.status(400).json({ error:"User not authenticated" }); 
        }

        const payload = await verifyToken(token);
        if(!payload){
            return res.status(401).json({ error:"User not authenticated" });
        }
        
        const userId = payload["sub"];
        // Verificar el usuario
        const user = await User.findById(userId);

        if(!user){
            return res.status(401).json({ error:"User not authenticated" });
        }

        // Comparar el token con los tokens registrados
        const isTokenValid = user.tokens.includes( token );

        if(!isTokenValid){
            return res.status(401).json({ error:"User not authenticated" });
        }

        // Modificar la peticion (req), para anadir la informacion del usuario.
        req.user = user;
        req.token = token;
        
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error:"Interval Server Error" });
    }
}

middlewares.authorization = (roleRequired = ROLES.SYSADMIN ) => {
    return (req, res, next) => {
        // Premisa: Antes de middleware debe de haber pasado por la authentication.
        try {
            const { roles = [] } = req.user;

            // Verificar si el rol requerido esta en la coleccion.
            const isAuth = roles.includes(roleRequired);
            const isSysAdmin = roles.includes(ROLES.SYSADMIN);

            // Si no esta, devolver -> 403, porque no esta autorizado para poder hacer lo que quiere.
            if(!isAuth && !isSysAdmin){
                return res.status(403).json({ error:"Forbidden" });
            }
 
            // Si esta, hacer next().
            next(); 
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error:"Internal Server Error" });
        }

    }
}

module.exports = middlewares; 