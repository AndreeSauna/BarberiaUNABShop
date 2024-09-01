// CRUD/src/controllers/appointments.controller.js
import Appointment from '../models/Appointment.js';

// Obtener todas las citas
export const getAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find();
        console.log('Appointments:', appointments);
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear una nueva cita
export const createAppointment = async (req, res) => {
    const { title, date, description } = req.body;
    try {
        const newAppointment = new Appointment({ title, date, description });
        await newAppointment.save();
        res.status(201).json(newAppointment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar una cita existente
export const updateAppointment = async (req, res) => {
    const { id } = req.params;
    const { title, date, description } = req.body;
    try {
        const updatedAppointment = await Appointment.findByIdAndUpdate(id, { title, date, description }, { new: true });
        if (!updatedAppointment) return res.status(404).json({ message: "Cita no encontrada" });
        res.json(updatedAppointment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Eliminar una cita
export const deleteAppointment = async (req, res) => {
    const { id } = req.params;
    try {
        await Appointment.findByIdAndDelete(id);
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
