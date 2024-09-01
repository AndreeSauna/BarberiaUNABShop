// CRUD/src/db.js
import mongoose from "mongoose";

export const connectDB = async () => {
    try{
        await mongoose.connect('mongodb://localhost/mern-db');
        console.log(">>> BD is connected")        
    } catch (error){
        console.log(error);
    }
}