//configurar el codigo de express bakend
// CRUD/src/app.js
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from './routes/auth.routes.js';
import tasksRoutes from './routes/tasks.routes.js';
import agendamientosRoutes from './routes/agendamiento.routes.js';
import cartRoutes from './routes/cart.routes.js'; // Importar las rutas del carrito
import appointmentsRoutes from './routes/appointments.routes.js'; // Importar las rutas de agendamiento
import agendamientoRoutes from './routes/agendamiento.routes.js'; // Importar las rutas de agendamiento
//import adminRoutes from './routes/admin.routes.js'; // Añadir rutas de administración

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api", tasksRoutes);
app.use("/api", agendamientosRoutes);
app.use("/api", cartRoutes); // Usar las rutas del carrito
app.use("/api", agendamientoRoutes);
app.use("/api/appointments", appointmentsRoutes); // Usar las rutas de agendamiento
//app.use("/api", adminRoutes); // Usar rutas de administración

export default app;
