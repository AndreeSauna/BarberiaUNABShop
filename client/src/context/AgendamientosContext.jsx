// CRUD/client/src/context/AgendamientosContext.jsx
import { createContext, useContext, useState } from "react";
import {
  createAgendamientoRequest,
  getAgendamientosRequest,
  deleteAgendamientosRequest,
  getAgendamientoRequest,
  updateAgendamientosRequest,
} from "../api/agendamientos";

const AgendamientoContext = createContext();

export const useAgendamientos = () => {
  const context = useContext(AgendamientoContext);
  if (!context) {
    throw new Error("useAgendamientos must be used within a AgendamientoProvider");
  }
  return context;
};

export function AgendamientoProvider({ children }) {
  const [agendamientos, setAgendamientos] = useState([]);

  //llamar Agendamiento
  const getAgendamientos = async () => {
    try {
      const res = await getAgendamientosRequest();
      setAgendamientos(res.data);
    } catch (error) {
      console.error(error);
    }
  };
 //crear Agendamiento
 const createAgendamiento = async (agendamiento) => {
  try {
    const res = await createAgendamientoRequest(agendamiento);
    console.log(res);
  } catch (error) {
    console.error('Error al crear agendamiento:', error.response?.data || error.message);
    // Si el error tiene detalles específicos, imprímelos aquí
    if (error.response) {
      console.error('Detalles del error:', error.response.data);
    }
  }
};

 /*
 const createAgendamiento = async (agendamiento) => {
  const res = await createAgendamientoRequest(agendamiento);
  console.log(res);
};
*/
 //eliminar Agendamiento
  const deleteAgendamiento = async (id) => {
    try {
      const res = await deleteAgendamientosRequest(id);
      if (res.status == 204) setAgendamientos(agendamientos.filter((agendamiento) => agendamiento._id != id));
    } catch (error) {
      console.log(error);
    }
  };
  //llamar Agendamiento
  const getAgendamiento = async (id) => {
    try {
      const res = await getAgendamientoRequest(id);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };
  //actualizar Agendamiento
  const updateAgendamiento = async (id, agendamiento) => {
    try {
      await updateAgendamientosRequest(id, agendamiento);
    } catch (error) {
      console.log(error);
    }
  };
  //retorna las funciones creadas
  return (
    <AgendamientoContext.Provider
      value={{
        agendamientos,
        createAgendamiento,
        getAgendamientos,
        deleteAgendamiento,
        getAgendamiento,
        updateAgendamiento
      }}
    >
      {children}
    </AgendamientoContext.Provider>
  );
}
