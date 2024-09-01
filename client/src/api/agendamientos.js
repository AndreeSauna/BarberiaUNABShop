// CRUD/client/src/api/agendamientos.js
import axios from "./axios";

export const getAgendamientosRequest = () => axios.get("/agendamientos");

export const getAgendamientoRequest = (id) => axios.get(`/agendamientos/${id}`);

export const createAgendamientoRequest = (agendamiento) => axios.post("/agendamientos", agendamiento);

export const updateAgendamientosRequest = (id, agendamiento) => axios.put(`/agendamientos/${id}`, agendamiento);

export const deleteAgendamientosRequest = (id) => axios.delete(`/agendamientos/${id}`);
