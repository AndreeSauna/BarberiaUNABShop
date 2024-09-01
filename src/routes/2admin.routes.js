// CRUD/src/routes/admin.routes.js
import { Router } from 'express';
import { authRequired } from '../middlewares/valideToken.js';
import { isAdmin } from '../middlewares/isAdmin.js'; // Middleware para verificar rol de admin
import {
  getAllUsers,
  updateUser,
  deleteUser
} from '../controllers/admin.controller.js';

const router = Router();

// Obtener todos los usuarios
router.get('/users', authRequired, isAdmin, getAllUsers);

// Actualizar usuario por ID
router.put('/users/:id', authRequired, isAdmin, updateUser);

// Eliminar usuario por ID
router.delete('/users/:id', authRequired, isAdmin, deleteUser);

export default router;
