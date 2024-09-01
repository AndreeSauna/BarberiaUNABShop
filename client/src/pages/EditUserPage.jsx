//CRUD/client/src/pages/EditUserPage.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditUserPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: "", email: "", password: "" });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/users/${id}`,
          { withCredentials: true }
        );
        setUser(response.data);
      } catch (error) {
        //console.error("Error fetching user", error.response || error.message || error);
        if (error.response) {
            // La solicitud se realizó y el servidor respondió con un código de estado
            // que está fuera del rango de 2xx
            console.error("Error fetching user", error.response.data);
          } else if (error.request) {
            // La solicitud se realizó pero no se recibió respuesta
            console.error("Error fetching user", error.request);
          } else {
            // Algo ocurrió al configurar la solicitud que lanzó un error
            console.error("Error fetching user", error.message);
          }
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:4000/api/users/${id}`, user, {
        withCredentials: true,
      });
      navigate("/users");
    } catch (error) {
      console.error("Error updating user", error);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold text-center mb-6 text-gray-700">
        Editar Usuario
      </h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700">
            Nombre de Usuario
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={user.username}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border text-gray-700 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border text-gray-700 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border text-gray-700 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Actualizar Usuario
        </button>
      </form>
    </div>
  );
};

export default EditUserPage;
