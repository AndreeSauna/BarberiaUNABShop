// CRUD/client/src/pages/UsersPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserActions from '../components/UserActions';

const UsersPage = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/users', { withCredentials: true });
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching users", error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
            
            <h1 className="text-3xl font-semibold text-center mb-6 text-gray-700">Usuarios</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {users.map(user => (
                    <div key={user._id} className="bg-white p-4 rounded-lg shadow-md">
                        <h2 className="text-xl font-bold mb-2 text-gray-700">Usuario: {user.username}</h2>
                        <p className="text-gray-700 mb-1">Email: {user.email}</p>
                        <p className="text-gray-700">Contraseña: ******</p>
                        <UserActions userId={user._id} />  {/* Agregar el componente UserActions */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UsersPage;
