// CRUD/client/src/pages/CartPage.jsx
import React, { useContext, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import axios from 'axios';

const CartPage = () => {
  const { cart, removeFromCart, setCart } = useContext(CartContext);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const response = await axios.get('/api/cart');
        const loadedCart = response.data;
        console.log('Loaded cart:', loadedCart); // Añadir registro de consola

        if (Array.isArray(loadedCart)) {
          setCart(loadedCart);
        } else {
          console.error('Error cargando el carrito: La respuesta no es un array');
        }
      } catch (error) {
        console.error('Error cargando el carrito', error.response || error.message);
      }
    };

    loadCart();
  }, [setCart]);

  const handleRemoveFromCart = async (productId) => {
    try {
      await axios.delete(`/api/cart/${productId}`);
      removeFromCart(productId);
    } catch (error) {
      console.error('Error eliminando producto del carrito', error.response || error.message);
    }
  };

  return (
    <div>
      <h1>Carrito de Compras</h1>
      <ul>
        {cart.map(product => (
          <li key={product.id}>
            {product.name} - ${product.price}
            <button onClick={() => handleRemoveFromCart(product.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
      <div>Total: ${cart.reduce((sum, product) => sum + product.price, 0)}</div>
    </div>
  );
};

export default CartPage;
