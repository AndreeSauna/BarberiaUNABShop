import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserActions = ({ userId }) => {
    const navigate = useNavigate();


    
    const handleEdit = () => {
        
        //navigate(`/EditUserPage/${userId}`);
        navigate(`/edit-user/${userId}`);  // Redirige a una página de edición
    };
    




    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:4000/api/users/${userId}`, { withCredentials: true });
            window.location.reload(); // Recarga la página para reflejar los cambios
        } catch (error) {
            console.error("Error deleting user", error);
        }
    };
    


    return (
        <div className="mt-4 flex space-x-4">
            <button 
                onClick={handleEdit}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Editar
            </button>
            <button 
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
                Eliminar
            </button>
        </div>
    );
};

export default UserActions;
