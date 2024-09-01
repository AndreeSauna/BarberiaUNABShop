// CRUD/client/src/pages/AppointmentsPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const barbers = ['Andree', 'Jorge', 'Efrain'];

function AppointmentsPage() {
  const [barber, setBarber] = useState('');
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [comment, setComment] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [showAppointments, setShowAppointments] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingAppointment) {
        // Actualizar una cita existente
        await axios.put(`http://localhost:4000/api/appointments/${editingAppointment._id}`, {
          barber,
          time,
          date,
          description,
        });
        setEditingAppointment(null);
      } else {
        // Crear una nueva cita
        await axios.post('http://localhost:4000/api/appointments', {
          barber,
          time,
          date,
          comment,
        });
      }
      // Limpiar formulario
      setBarber('');
      setTime('');
      setDate('');
      setComment('');
      // Fetch updated appointments
      fetchAppointments();
    } catch (error) {
      console.error('Error agendando la cita', error.response || error.message);
    }
  };

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/appointments');
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments', error.response || error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/appointments/${id}`);
      fetchAppointments();
    } catch (error) {
      console.error('Error eliminando la cita', error.response || error.message);
    }
  };

  const handleEdit = (appointment) => {
    setEditingAppointment(appointment);
    setBarber(appointment.barber);
    setTime(appointment.time);
    setDate(appointment.date);
    setComment(appointment.comment);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-center text-2xl font-bold mb-4">{editingAppointment ? 'Editar Cita' : 'Agendar Cita'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Barbero:</label>
          <select
            value={barber}
            onChange={(e) => setBarber(e.target.value)}
            className="border bg-zinc-700 p-2 rounded w-full"
          >
            <option value="">Seleccione un barbero</option>
            {barbers.map((barber) => (
              <option key={barber} value={barber}>{barber}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Hora:</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            min="10:00"
            max="18:00"
            className="border bg-zinc-700 p-2 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Fecha:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border bg-zinc-700 p-2 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Comentario:</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="border bg-zinc-700 p-2 rounded w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300"
        >
          {editingAppointment ? 'Guardar Cambios' : 'Enviar'}
        </button>
        {editingAppointment && (
          <button
            type="button"
            onClick={() => {
              setEditingAppointment(null);
              setBarber('');
              setTime('');
              setDate('');
              setComment('');
            }}
            className="bg-gray-500 text-white px-4 py-2 rounded-full hover:bg-gray-600 transition duration-300 ml-2"
          >
            Cancelar
          </button>
        )}
      </form>
      <button
        onClick={() => setShowAppointments(!showAppointments)}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition duration-300"
      >
        {showAppointments ? 'Ocultar Citas Agendadas' : 'Mostrar Citas Agendadas'}
      </button>
      {showAppointments && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-4">Citas Agendadas</h2>
          <ul>
            {appointments.map((appointment) => (
              <li key={appointment._id} className="mb-2 p-2 border border-gray-300 rounded">
                <p><strong>Barbero:</strong> {appointment.barber}</p>
                <p><strong>Hora:</strong> {appointment.time}</p>
                <p><strong>Fecha:</strong> {appointment.date}</p>
                <p><strong>Comentario:</strong> {appointment.comment}</p>
                <button
                  onClick={() => handleEdit(appointment)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-full hover:bg-yellow-600 transition duration-300 mr-2"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(appointment._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition duration-300"
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default AppointmentsPage;
