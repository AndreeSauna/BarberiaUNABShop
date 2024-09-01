// CRUD/client/src/components/TaskCard.jsx
import { useTasks } from "../context/TasksContext";
import { Link } from "react-router-dom";
import { FaTrash, FaEdit } from "react-icons/fa";

function TaskCard({ task }) {
  const { deleteTask } = useTasks();

  return (
    <div className="bg-zinc-800 w-full p-6 rounded-md shadow-md flex flex-col justify-between">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-white">{task.title}</h1>
        <div className="flex gap-2 items-center">
          <button
          //este boton es para eliminar una tarea y el siguiente es para eliminar una tarea
            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full"
            onClick={() => deleteTask(task._id)}
          >
            <FaTrash />
          </button>
          <Link to={`/tasks/${task._id}`} className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full">
            <FaEdit />
          </Link>
        </div>
      </header>
      <p className="text-slate-300 mb-4">{task.comment}</p>
      <p className="text-gray-400 text-sm">{new Date(task.date).toLocaleString()}</p>
    </div>
  );
}

export default TaskCard;
