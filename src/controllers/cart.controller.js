// CRUD/src/controllers/cart.controller.js
import mongoose from 'mongoose';
import User from '../models/user.model.js';

const { ObjectId } = mongoose.Types;

export const getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    
    // Asegurar que user.cart siempre sea un array
    if (!Array.isArray(user.cart)) {
      user.cart = [];
      await user.save(); // Guardar la corrección en caso de que no sea un array
    }
    
    res.json(user.cart);
  } catch (error) {
    console.error('Error en getCart:', error);
    return res.status(500).json({ message: "Error al obtener el carrito del usuario" });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    if (!productId || !quantity || isNaN(quantity)) {
      return res.status(400).json({ message: "Faltan datos o son incorrectos: productId y quantity son requeridos" });
    }

    console.log('Req Body:', req.body);
    console.log('ProductId:', productId);

    // Buscar el usuario por ID
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Verificar si el usuario tiene todos los campos requeridos según el esquema
    if (!user.name || !user.email || !user.password) {
      return res.status(400).json({ message: "El usuario encontrado no tiene todos los campos requeridos" });
    }

    const productObjectId = new ObjectId(productId);
    const productInCart = user.cart.find(item => item.productId.equals(productObjectId));
    if (productInCart) {
      productInCart.quantity += parseInt(quantity);
    } else {
      user.cart.push({ productId: productObjectId, quantity: parseInt(quantity) });
    }

    await user.save();
    res.json(user.cart);
  } catch (error) {
    console.error('Error en addToCart:', error);
    return res.status(500).json({ message: "Error al agregar el producto al carrito" });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const productObjectId = ObjectId(req.params.productId);
    user.cart = user.cart.filter(item => !item.productId.equals(productObjectId));
    await user.save();
    res.json(user.cart);
  } catch (error) {
    console.error('Error en removeFromCart:', error);
    return res.status(500).json({ message: "Error al eliminar el producto del carrito" });
  }
};
