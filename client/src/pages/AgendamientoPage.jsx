// CRUD/client/src/pages/AgendamientoPage.jsx
import { useEffect } from "react";
import { useAgendamientos } from "../context/AgendamientosContext";
import AgendamientoCard from "../components/AgendamientoCard";

function AgendamientosPage() {
  const { getAgendamientos, agendamientos } = useAgendamientos();

  useEffect(() => {
    getAgendamientos();
  }, []);

  if (agendamientos.length === 0) return <h1>No tiene agendamientos</h1>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {agendamientos.map((agendamiento) => (
        <AgendamientoCard agendamiento={agendamiento} key={agendamiento._id} />
      ))}
    </div>
  );
}

export default AgendamientosPage;
