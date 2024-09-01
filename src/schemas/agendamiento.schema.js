// CRUD/src/schemas/agendamiento.schema.js
import { z } from "zod";

export const createAgendamientoSchema = z.object({
  barber: z.string({
    required_error: "La seleccion de un Barbero es requerido",
  }),
  date: z.string({
    required_error: "La fecha es requerida",
  }),
  time: z.string({
    required_error: "El horario es requerido",
  }),
  comment: z.string().optional(),
  //date: z.string().datetime(),
});