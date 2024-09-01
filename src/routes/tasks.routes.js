// CRUD/src/routes/tasks.routes.js
// Importa el módulo Router de Express para definir las rutas.
import { Router } from "express";
// Importa el middleware que verifica la autenticación del usuario.
import { authRequired } from "../middlewares/valideToken.js";
// Importa las funciones que manejarán las solicitudes HTTP.
import { getTask, getTasks, createTask, updateTask, deleteTask } from "../controllers/tasks.controller.js";
// Importa el middleware para la validación de datos basado en esquemas.
import { validateSchema } from "../middlewares/validator.middleware.js";
// Importa el esquema de validación para la creación de tareas.
import { createTaskSchema } from "../schemas/task.schema.js";

// Crea una instancia del enrutador de Express.
const router = Router();

// Define una ruta para obtener todas las tareas. La función getTasks maneja esta solicitud.
router.get('/tasks', authRequired, getTasks);
// Define una ruta para obtener una tarea específica por ID. La función getTask maneja esta solicitud.
router.get('/tasks/:id', authRequired, getTask);

// Define una ruta para crear una nueva tarea. La función createTask maneja esta solicitud.
// Antes de llamar a createTask, se valida la solicitud usando el esquema createTaskSchema.
router.post(
    '/tasks',
    authRequired, // Verifica que el usuario esté autenticado.
    validateSchema(createTaskSchema), // Valida el cuerpo de la solicitud contra el esquema definido.
    createTask // Maneja la creación de la tarea.
);
// Define una ruta para eliminar una tarea específica por ID. La función deleteTask maneja esta solicitud.
router.delete('/tasks/:id', authRequired, deleteTask);
// Define una ruta para actualizar una tarea específica por ID. La función updateTask maneja esta solicitud.
router.put('/tasks/:id', authRequired, updateTask);
// Exporta el enrutador para que pueda ser utilizado en otras partes de la aplicación.
export default router; 