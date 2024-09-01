// CRUD/src/models/Appointment.js

import { Schema, model } from "mongoose";
const appointmentSchema = new Schema({
    title: String,
    date: Date,
    description: String
});
export default model('Appointment', appointmentSchema);
