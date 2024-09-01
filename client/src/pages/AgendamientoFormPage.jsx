// CRUD/client/src/pages/AgendamientoFormPage.jsx
import { useForm } from "react-hook-form";
import { useAgendamientos } from "../context/AgendamientosContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import image from "../assets/image";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

function AgendamientoFormPage() {
  const { register, handleSubmit, setValue } = useForm();
  const { createAgendamiento, getAgendamiento, updateAgendamiento } =
    useAgendamientos();
  const navigate = useNavigate();
  const params = useParams();

  // Estado para la imagen seleccionada
  const [selectedImage, setSelectedImage] = useState(image.logo); // Imagen predeterminada

  useEffect(() => {
    async function loadAgendamiento() {
      if (params.id) {
        const Agendamiento = await getAgendamiento(params.id);
        setValue("barber", Agendamiento.barber);
        setValue("time", Agendamiento.time);
        setValue("date", Agendamiento.date);
        setValue("comment", Agendamiento.comment);
        setSelectedImage(image[Agendamiento.barber] || image.logo); // Establecer la imagen según el barbero
      }
    }
    loadAgendamiento();
  }, [params.id, getAgendamiento, setValue]);

  const onSubmit = handleSubmit((data) => {
    if (params.id) {
      updateAgendamiento(params.id, {
        ...data,
        date: dayjs.utc(data.date).format(),
      });
    } else {
      createAgendamiento({
        ...data,
        date: dayjs.utc(data.date).format(),
      });
    }
    navigate("/agendamientos");
  });

  // Función para manejar el cambio de selección de barbero
  const handleBarberChange = (event) => {
    const selectedBarber = event.target.value;
    setSelectedImage(image[selectedBarber] || image.logo); // Cambiar la imagen según la selección
  };

  // Obtener la fecha actual en el formato adecuado para el atributo min
  const todayDate = dayjs().format("YYYY-MM-DD");

  // Generar opciones de tiempo para el select
  const timeOptions = [];
  for (let hour = 10; hour <= 18; hour++) {
    const timeString = `${hour.toString().padStart(2, '0')}:00`;
    timeOptions.push(timeString);
  }

  return (
    <div className="flex justify-center items-start min-h-screen bg-zinc-900 py-10">
      <div className="bg-zinc-800 max-w-3xl w-full p-4 sm:p-6 md:p-8 lg:p-10 rounded-md flex flex-col lg:flex-row">
        <div className="w-full lg:w-2/3 mb-4 lg:mb-0">
          <form onSubmit={onSubmit}>
            <label htmlFor="barber">Barbero:</label>
            <select
              {...register("barber")}
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
              onChange={handleBarberChange} // Actualiza la imagen al cambiar la selección
            >
              <option value="">Seleccione un barbero</option>
              <option value="Barbero1">Barbero1</option>
              <option value="Barbero2">Barbero2</option>
              <option value="Barbero3">Barbero3</option>
              <option value="Barbero4">Barbero4</option>
            </select>
            <label htmlFor="time">Hora</label>

            <select
              {...register("time")}
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            >
              {timeOptions.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
      

            {/* 
            <input
              type="time"
              {...register("time")}
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
              min="10:00"
              max="18:00"

            />
            */}
            <label htmlFor="date">Fecha</label>
            <input
              type="date"
              {...register("date")}
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
              min={todayDate} // Establece el valor mínimo para la fecha actual
            />

            <label htmlFor="comment">Comentario</label>
            <textarea
              rows="3"
              placeholder="Ingrese alguna observación"
              {...register("comment")}
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            ></textarea>

            <button className="w-full bg-blue-500 text-white px-4 py-2 rounded-md mt-4">
              Agendar
            </button>
          </form>
        </div>
        <div className="w-full lg:w-1/3 p-4 flex justify-center items-center">
          <img
            src={selectedImage}
            alt="Barbero"
            className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-auto rounded-md"
          />
        </div>
      </div>
    </div>
  );
}

export default AgendamientoFormPage;
