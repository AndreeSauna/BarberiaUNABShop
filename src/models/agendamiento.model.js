// CRUD/src/models/agendamiento.model.js
import mongoose from "mongoose";

// Definir el esquema para Agendamiento
const agendamientoSchema = new mongoose.Schema(
  {
    barber: {
      type: String,
      enum: ["Barbero1", "Barbero2", "Barbero3", "Barbero4"], // Lista de nombres de barberos
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
      required: true,
    },
    /*date: {
      type: String,
      required: true,
    },
    */
    time: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: false,
    },
    user:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    }
  },
  {
    timestamps: true, // Añade createdAt y updatedAt automáticamente
  }
);

const Agendamiento = mongoose.model("Agendamiento", agendamientoSchema);
export default Agendamiento;