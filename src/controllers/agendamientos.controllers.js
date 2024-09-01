// CRUD/src/controllers/agendamientos.controllers.js
// CRUD/src/controllers/agendamientos.controllers.js
import Agendamiento from "../models/agendamiento.model.js";

// Obtener todos los agendamientos
export const getAgendamientos = async (req, res) => {
  try {
    const agendamientos = await Agendamiento.find({ user: req.user.id }).populate('user');
    res.json(agendamientos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener agendamientos." });
  }
};

// Crear un nuevo agendamiento
export const createAgendamiento = async (req, res) => {
  const { barber, date, time, comment } = req.body;

  // Verificar si ya existe un agendamiento para la misma fecha, hora y barbero
  try {
    const existingAgendamiento = await Agendamiento.findOne({ barber, date, time });

    if (existingAgendamiento) {
      return res.status(400).json({ message: 'Esta fecha y hora ya están ocupadas.' });
    }

    const newAgendamiento = new Agendamiento({
      barber,
      date,
      time,
      comment,
      user: req.user.id,
    });

    const savedAgendamiento = await newAgendamiento.save();
    res.status(201).json(savedAgendamiento);
  } catch (error) {
    res.status(500).json({ message: 'Error al guardar el agendamiento.' });
  }
};

// Obtener un agendamiento por ID
export const getAgendamiento = async (req, res) => {
  try {
    const agendamiento = await Agendamiento.findById(req.params.id).populate('user');
    if (!agendamiento) {
      return res.status(404).json({ message: "No se encontró el agendamiento" });
    }
    res.json(agendamiento);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el agendamiento.' });
  }
};

// Eliminar un agendamiento por ID
export const deleteAgendamiento = async (req, res) => {
  try {
    const agendamiento = await Agendamiento.findByIdAndDelete(req.params.id);
    if (!agendamiento) {
      return res.status(404).json({ message: "No se encontró el agendamiento" });
    }
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el agendamiento.' });
  }
};

// Actualizar un agendamiento por ID
export const updateAgendamiento = async (req, res) => {
  try {
    const agendamiento = await Agendamiento.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!agendamiento) {
      return res.status(404).json({ message: "No se encontró el agendamiento" });
    }
    res.json(agendamiento);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el agendamiento.' });
  }
};

// Obtener las horas disponibles para una fecha específica y barbero
export const getAvailableTimes = async (req, res) => {
  const { date, barber } = req.query;

  // Definir las horas posibles
  const allPossibleTimes = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];

  if (!date || !barber) {
    return res.status(400).json({ message: 'Fecha y barbero son requeridos.' });
  }

  try {
    // Convertir la fecha a formato ISO para la consulta
    console.log('Fecha recibida:', date); // Añade esto para debug
    const dateObj = new Date(date);
    console.log('Objeto de fecha:', dateObj); // Añade esto para debug
    const startOfDay = new Date(dateObj.setHours(0, 0, 0, 0));
    const endOfDay = new Date(dateObj.setHours(23, 59, 59, 999));

    // Obtener los agendamientos para la fecha y el barbero específicos
    const appointments = await Agendamiento.find({
      barber,
      date: {
        $gte: startOfDay,
        $lt: endOfDay
      }
    });

    const bookedTimes = appointments.map(app => app.time);
    const availableTimes = allPossibleTimes.filter(time => !bookedTimes.includes(time));

    res.json(availableTimes);
  } catch (error) {
    console.error('Error al obtener horas disponibles:', error); // Mejora el log de errores
    res.status(500).json({ message: 'Error al obtener horas disponibles.', error: error.message });
  }
};