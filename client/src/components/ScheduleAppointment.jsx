// CRUD/client/src/components/ScheduleAppointment.jsx
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

const ScheduleAppointment = () => {
  const [barber, setBarber] = useState('');
  const [time, setTime] = useState('');
  const [date, setDate] = useState(new Date());
  const [comment, setComment] = useState('');

  const handleBarberChange = (event) => {
    setBarber(event.target.value);
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  const handleDateChange = (date) => {
    setDate(date);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const appointmentData = {
      barber,
      time,
      date,
      comment,
    };
    try {
      const response = await axios.post('http://localhost:4000/api/appointments', appointmentData);
      console.log('Appointment scheduled successfully:', response.data);
      // Reset form
      setBarber('');
      setTime('');
      setDate(new Date());
      setComment('');
    } catch (error) {
      console.error('Error scheduling appointment:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Barbero:</label>
        <select value={barber} onChange={handleBarberChange} required>
          <option value="">Seleccione un barbero</option>
          <option value="Andree">Andree</option>
          <option value="Jorge">Jorge</option>
          <option value="Efrain">Efrain</option>
        </select>
      </div>
      <div>
        <label>Hora:</label>
        <input type="time" value={time} onChange={handleTimeChange} min="10:00" max="18:00" required />
      </div>
      <div>
        <label>Fecha:</label>
        <DatePicker selected={date} onChange={handleDateChange} required />
      </div>
      <div>
        <label>Comentario:</label>
        <textarea value={comment} onChange={handleCommentChange}></textarea>
      </div>
      <button type="submit">Enviar</button>
    </form>
  );
};

export default ScheduleAppointment;
