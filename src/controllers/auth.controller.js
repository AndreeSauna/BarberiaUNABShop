//estara relacionado con auth.routes
//con token encriptamos
// CRUD/src/controllers/auth.controller.js
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs'
import {createAccessToken} from '../libs/jwt.js';
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";


export const register = async (req, res) => {
    const { email, password, username } = req.body;

    try {

        const userFound = await User.findOne({email});
        if (userFound)
            return res.status(400).json(['El correo ya esta en uso']);

        const paswordHash = await bcrypt.hash(password, 10); //#string aleatorio para encriptar contraseña
        const newUser = new User({
            username,
            email,
            password: paswordHash,
        });

        const userSaved = await newUser.save();
        const token = await createAccessToken({id: userSaved._id});

        res.cookie("token", token);
        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            createAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt,
            })
    } catch (error){
        res.status(500).json({ message: error.message });
    }   
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {

        const userFound = await User.findOne({email})
        if (!userFound) return res.status(400).json({ message: "User not found"})

        const isMatch = await bcrypt.compare(password, userFound.password);
        if(!isMatch) return res.status(400).json({ message: "Contraseña incorrecta"});

        const token = await createAccessToken({id: userFound._id});

        res.cookie("token", token);
        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
            })
    } catch (error){
        res.status(500).json({ message: error.message });
    }   
};

export const logout = (req, res) =>{
    res.cookie('token', "", {
        expires: new Date(0)
    })
    return res.sendStatus(200);
};

export const profile = async(req, res) => {
    const userFound = await User.findById(req.user.id)
    if(!userFound)
        return res.status(400).json({ message: "User not found"});
    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        //role: userFound.role, // Incluir el rol en la respuesta
        createAt: userFound.createdAt,
        updatedAt: userFound.updatedAt,
    });
};


export const verifyToken = async(req, res) => {
    const {token} = req.cookies;

    if (!token) return res.status(401).json({ message: "No autorizado"});

    jwt.verify(token, TOKEN_SECRET, async(err, user) => {
        if (err) return res.status(401).json({ message: "No autorizado"});

        const userFound = await User.findById(user.id)
        if(!userFound) return res.status(401).json({ message: "No autorizado"})

            return res.json({
                id: userFound._id,
                username: userFound.username,
                email: userFound.email,
            });
    });
};






export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Función para actualizar un usuario
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, email, password } = req.body;

    console.log('Update User Controller: ID:', id);  // Log del ID del usuario
    console.log('Update User Controller: Body:', req.body);  // Log del cuerpo de la solicitud

    try {
        const updatedUser = await User.findByIdAndUpdate(id, { username, email, password }, { new: true });
        if (!updatedUser) return res.status(404).json({ message: "Usuario no encontrado" });
        console.log('Update User Controller: User not found');  // Log si el usuario no se encuentra
        res.json(updatedUser);
    } catch (error) {
        console.log('Update User Controller: Error:', error);  // Log del error
        res.status(500).json({ message: error.message });
    }
};


// Función para eliminar un usuario
export const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) return res.status(404).json({ message: "Usuario no encontrado" });
        res.json({ message: "Usuario eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};