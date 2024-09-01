// CRUD/src/schemas/task.schema.js
import { z } from 'zod';

export const createTaskSchema = z.object({
    title: z.string({
        required_error: 'El titulo es requerido'
    }),
    description: z.string({
        required_error: 'La descripcion debe ser string'
    }),
    date: z.string().datetime().optional(),
})