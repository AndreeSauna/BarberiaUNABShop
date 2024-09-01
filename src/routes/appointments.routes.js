// CRUD/src/routes/appointments.routes.js
import { Router } from "express";
import { authRequired } from "../middlewares/valideToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createAppointment, getAppointments, updateAppointment, deleteAppointment } from "../controllers/appointments.controller.js";

const router = Router();

// Definir las rutas para las operaciones CRUD
router.get("/", getAppointments);
router.post("/", createAppointment);
router.put("/:id", updateAppointment);
router.delete("/:id", deleteAppointment);

export default router;
