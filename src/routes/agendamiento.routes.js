// CRUD/src/routes/agendamiento.routes.js
import { Router } from "express";
import { authRequired } from "../middlewares/valideToken.js";
import {
  getAgendamientos,
  getAgendamiento,
  createAgendamiento,
  updateAgendamiento,
  deleteAgendamiento,
  getAvailableTimes
} from "../controllers/agendamientos.controllers.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createAgendamientoSchema } from "../schemas/agendamiento.schema.js";

const router = Router();

router.get("/agendamientos", authRequired, getAgendamientos);
router.get("/agendamientos/:id", authRequired, getAgendamiento);
router.post(
  "/agendamientos",
  authRequired,
  validateSchema(createAgendamientoSchema),
  createAgendamiento
);
router.delete("/agendamientos/:id", authRequired, deleteAgendamiento);
router.put("/agendamientos/:id", authRequired, updateAgendamiento);

// Nueva ruta para obtener las horas disponibles en una fecha y barbero específicos
router.get('/agendamientos/available-times', authRequired, getAvailableTimes);

export default router;
