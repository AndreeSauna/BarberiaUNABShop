// CRUD/src/routes/admin.routes.js
import { Router } from "express";
import {
  getAllUsers,
  updateUser,
  deleteUser,
  getAllAgendamientos,
  updateAgendamiento,
  deleteAgendamiento
} from "../controllers/admin.controller.js";
import { authRequired } from "../middlewares/valideToken.js";
import { isAdmin } from "../middlewares/admin.middleware.js"; // Middleware para verificar si es administrador

const router = Router();

router.use(authRequired); // Protege todas las rutas con autenticación
router.use(isAdmin); // Protege con el middleware de administrador

// Rutas para usuarios
router.get('/users', getAllUsers);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

// Rutas para agendamientos
router.get('/agendamientos', getAllAgendamientos);
router.put('/agendamientos/:id', updateAgendamiento);
router.delete('/agendamientos/:id', deleteAgendamiento);

export default router;
