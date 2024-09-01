// CRUD/client/src/pages/agendamietoPage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const AgendamientoPage = () => {
  const [barber, setBarber] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [agendamientos, setAgendamientos] = useState([]);
  const [showAgendamientos, setShowAgendamientos] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Convertir la fecha al formato correcto
    const formattedDate = moment(date, 'YYYY-MM-DD').format('YYYY-MM-DD');

    try {
      const token = localStorage.getItem('token'); // Obtener el token del almacenamiento local
      const response = await axios.post(
        'http://localhost:4000/api/agendamientos',
        { barber, date: formattedDate, time, comment },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Incluir el token en el encabezado de la solicitud
          },
          withCredentials: true,
        }
      );
      setSuccess('¡Agendamiento creado exitosamente!');
      setBarber('');
      setDate('');
      setTime('');
      setComment('');
      if (showAgendamientos) {
        fetchAgendamientos(); // Actualizar lista de citas si ya se están mostrando
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'Hubo un error al crear el agendamiento.');
      } else {
        setError('Hubo un error al crear el agendamiento.');
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAgendamientos = async () => {
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token'); // Obtener el token del almacenamiento local
      const response = await axios.get('http://localhost:4000/api/agendamientos', {
        headers: {
          Authorization: `Bearer ${token}`, // Incluir el token en el encabezado de la solicitud
        },
        withCredentials: true,
      });
      if (response.data) {
        setAgendamientos(response.data);
      } else {
        setError('No se encontraron citas.');
      }
    } catch (err) {
      setError('Hubo un error al cargar las citas.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleShowAgendamientos = () => {
    setShowAgendamientos(!showAgendamientos);
    if (!showAgendamientos) {
      fetchAgendamientos(); // Cargar citas si aún no se han cargado
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">Agendar Cita</h1>
      {success && <div className="mb-4 p-4 bg-green-100 text-green-700 rounded">{success}</div>}
      {error && <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="barber">
            Barbero
          </label>
          <select
            id="barber"
            name="barber"
            value={barber}
            onChange={(e) => setBarber(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <option value="">Seleccione un barbero</option>
            <option value="Barbero1">Barbero1</option>
            <option value="Barbero2">Barbero2</option>
            <option value="Barbero3">Barbero3</option>
            <option value="Barbero4">Barbero4</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
            Fecha
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="time">
            Hora
          </label>
          <input
            type="time"
            id="time"
            name="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="comment">
            Comentario (opcional)
          </label>
          <textarea
            id="comment"
            name="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${loading && 'opacity-50 cursor-not-allowed'}`}
            disabled={loading}
          >
            {loading ? 'Cargando...' : 'Agendar'}
          </button>
          <button
            type="button"
            onClick={handleShowAgendamientos}
            className={`ml-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${loading && 'opacity-50 cursor-not-allowed'}`}
            disabled={loading}
          >
            {showAgendamientos ? 'Ocultar Citas' : 'Mostrar Citas'}
          </button>
        </div>
      </form>
      {showAgendamientos && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4 text-center">Citas Agendadas</h2>
          {agendamientos.length === 0 ? (
            <p className="text-center">No tienes citas agendadas.</p>
          ) : (
            <ul className="list-disc pl-5">
              {agendamientos.map((agendamiento) => (
                <li key={agendamiento._id} className="mb-2">
                  <p><strong>Barbero:</strong> {agendamiento.barber}</p>
                  <p><strong>Fecha:</strong> {new Date(agendamiento.date).toLocaleDateString()}</p>
                  <p><strong>Hora:</strong> {agendamiento.time}</p>
                  <p><strong>Comentario:</strong> {agendamiento.comment}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default AgendamientoPage;
