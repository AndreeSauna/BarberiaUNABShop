// CRUD/client/src/components/AgendamientoCard.jsx
import { useAgendamientos } from "../context/AgendamientosContext";
import { Link } from "react-router-dom";
import { FaTrash, FaEdit } from "react-icons/fa";

import { useEffect, useState } from "react";
import image from "../assets/image";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

function AgendamientoCard({ agendamiento }) {
  const { deleteAgendamiento } = useAgendamientos();
  const [selectedImage, setSelectedImage] = useState(image.logo);

  useEffect(() => {
    if (agendamiento) {
      setSelectedImage(image[agendamiento.barber] || image.logo);
    }
  }, [agendamiento]);


  

  return (
    <div className="bg-zinc-800 w-full p-6 rounded-md shadow-md flex relative">
      {/* Contenedor de información */}
      <div className="flex-1 pr-24">
        <div className="mb-4">
          {/* Información del agendamiento */}
          <h1 className="text-2xl font-bold">Barbero:</h1>
          <p className="text-xl font-bold text-white mb-4">{agendamiento.barber}</p>
          <h1 className="text-2xl font-bold">Hora:</h1>
          <p className="text-slate-300 mb-4">{agendamiento.time}</p>
          <h1 className="text-2xl font-bold">Fecha:</h1>
          <p>{dayjs(agendamiento.date).utc().format("DD/MM/YYYY")}</p>
          <h1 className="text-2xl font-bold">Comentario:</h1>
          <p className="text-slate-300">{agendamiento.comment}</p>
        </div>
      </div>

      {/* Botones de editar y eliminar */}
      <div className="absolute top-2 right-2 flex gap-2">
        <button
          className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full"
          onClick={() => deleteAgendamiento(agendamiento._id)}
        >
          <FaTrash />
        </button>
        <Link to={`/agendamientos/${agendamiento._id}`} className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full">
          <FaEdit />
        </Link>
      </div>

      {/* Contenedor de la imagen */}
      <div className="absolute bottom-4 right-4 flex items-center justify-center w-24 h-48">
        <img
          src={selectedImage}
          alt="Barbero"
          className="w-full h-full object-cover rounded-md"
        />
      </div>
    </div>
  );
}

export default AgendamientoCard;
