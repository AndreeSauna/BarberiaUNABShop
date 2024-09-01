// CRUD/client/src/components/UserCard.jsx
import { useUsers } from "../context/UsersContext";
import { Link } from "react-router-dom";
import { FaTrash, FaEdit } from "react-icons/fa";

function UserCard({ user }) {
  const { deleteUser } = useUsers();

  return (
    <div className="bg-zinc-800 w-full p-6 rounded-md shadow-md flex relative">
      <div className="flex-1 pr-24">
        <div className="mb-4">
          <h1 className="text-2xl font-bold">Usuario:</h1>
          <p className="text-xl font-bold text-white mb-4">{user.username}</p>
          <h1 className="text-2xl font-bold">Correo:</h1>
          <p className="text-slate-300 mb-4">{user.email}</p>
        </div>
      </div>
      {isAdmin && (
        <div className="absolute top-2 right-2 flex gap-2">
          <button
            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full"
            onClick={() => deleteUser(user._id)}
          >
            <FaTrash />
          </button>
          <Link to={`/users/${user._id}`} className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full">
            <FaEdit />
          </Link>
        </div>
      )}
    </div>
  );
}

export default UserCard;
