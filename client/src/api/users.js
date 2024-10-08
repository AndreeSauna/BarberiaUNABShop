// CRUD/client/src/api/users.js
import axios from "./axios";

export const getUsersRequest = () => axios.get("/users");
export const getUserRequest = (id) => axios.get(`/users/${id}`);
export const updateUsersRequest = (id, user) => axios.put(`/users/${id}`, user);
export const deleteUsersRequest = (id) => axios.delete(`/users/${id}`);
