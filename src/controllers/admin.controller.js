// CRUD/src/controllers/admin.controller.js
import User from '../models/user.model.js';
import Agendamiento from '../models/agendamiento.model.js'; // Asegúrate de tener un modelo para las citas

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedUser) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json({ message: "Usuario eliminado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllAgendamientos = async (req, res) => {
  try {
    const agendamientos = await Agendamiento.find();
    res.json(agendamientos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateAgendamiento = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updateAgendamiento = await Agendamiento.findByIdAndUpdate(id, updateData, { new: true });
    if (!updateAgendamiento) return res.status(404).json({ message: "Cita no encontrada" });
    res.json(updateAgendamiento);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteAgendamiento = async (req, res) => {
  const { id } = req.params;

  try {
    const deleteAgendamiento = await Agendamiento.findByIdAndDelete(id);
    if (!deleteAgendamiento) return res.status(404).json({ message: "Cita no encontrada" });
    res.json({ message: "Cita eliminada" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
