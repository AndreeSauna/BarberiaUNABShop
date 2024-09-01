// CRUD/client/src/context/CartContext.js
import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);

  const addToCart = async (product, quantity) => {
    try {
      if (!user || !user.name) {
        console.error('El usuario no tiene el campo requerido "name"');
        return;
      }

      const response = await axios.post('http://localhost:4000/api/cart', { productId: product.id, quantity }, { withCredentials: true });
      setCart(response.data);
    } catch (error) {
      console.error('Error añadiendo al carrito', error.response || error.message);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const response = await axios.delete(`http://localhost:4000/api/cart/${productId}`, { withCredentials: true });
      setCart(response.data);
    } catch (error) {
      console.error('Error eliminando del carrito', error.response || error.message);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

