// CRUD/client/src/context/UsersContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import {
  getUsersRequest,
  deleteUsersRequest,
  getUserRequest,
  updateUsersRequest,
} from "../api/users";

const UserContext = createContext();

export const useUsers = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUsers must be used within a UserProvider");
  }
  return context;
};

export function UserProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null); // Nuevo estado para el usuario actual

  // Obtener el usuario actual (aquí deberías implementar la lógica real)
  const fetchCurrentUser = async () => {
    try {
      const res = await axios.get("/current-user"); // Suponiendo que tienes un endpoint para obtener el usuario actual
      setCurrentUser(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);


  // Obtener Usuarios
  const getUsers = async () => {
    try {
      const res = await getUsersRequest();
      setUsers(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Eliminar Usuario
  const deleteUser = async (id) => {
    try {
      const res = await deleteUsersRequest(id);
      if (res.status === 204) setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  // Obtener Usuario
  const getUser = async (id) => {
    try {
      const res = await getUserRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  // Actualizar Usuario
  const updateUser = async (id, user) => {
    try {
      await updateUsersRequest(id, user);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        users,
        getUsers,
        deleteUser,
        getUser,
        updateUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
