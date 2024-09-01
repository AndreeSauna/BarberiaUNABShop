// CRUD/src/schemas/appointment.schema.js
import { z } from 'zod';

export const createAppointmentSchema = z.object({
  title: z.string({
    required_error: 'El título es requerido',
  }),
  description: z.string({
    required_error: 'La descripción es requerida',
  }),
  date: z.string().datetime({
    required_error: 'La fecha es requerida',
  }),
});
