//vamos a importar express para crear un enrutador
// CRUD/src/routes/auth.routes.js
import { Router } from "express";
import { 
    login, 
    register, 
    logout, 
    profile,
    verifyToken,
    updateUser,  // Importa la función para actualizar un usuario
    deleteUser   // Importa la función para eliminar un usuario
    //getAllUsers  // Importa la función para obtener todos los usuarios
} from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/valideToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";
import { getAllUsers } from "../controllers/auth.controller.js";

//import { verifyTokenRequest } from "../../client/src/api/auth.js";
//import { verityTokenRequet } from "../../client/src/api/auth.js";

//vamos a crear un enrutador
const router = Router();

//vamos a crear las rutas
router.post('/register',validateSchema(registerSchema), register);
router.post('/login',validateSchema(loginSchema), login);
router.post('/logout', logout);
router.get('/verify', verifyToken);
router.get('/profile',authRequired ,profile);

router.get('/users', getAllUsers);
router.put('/users/:id', authRequired, updateUser);  // Ruta para actualizar usuarios
router.delete('/users/:id', authRequired, deleteUser); // Ruta para eliminar usuarios


//vamos a exportar el enrutador
export default router;