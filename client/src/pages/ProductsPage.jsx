// CRUD/client/src/pages/ProductsPage.jsx
import React, { useContext, useState, useEffect, useCallback } from 'react';
import { CartContext } from '../context/CartContext';
import axios from 'axios';
import image from "../assets/image";

const products = [
  { id: 1, name: 'Corte Cabello', price: 10000, image: image.CorteCabello, description: 'Descripción del Corte Cabello' },
  { id: 2, name: 'Corte Barba', price: 5000, image: image.CorteBarba, description: 'Descripción del Corte Barba' },
  { id: 3, name: 'Corte Cabello + Corte Barba', price: 13000, image: image.CorteCabelloBarba, description: 'Descripción del Corte Cabello + Corte Barba' },
  { id: 4, name: 'Gel de Cabello', price: 7000, image: image.GelCabello, description: 'Descripción del Gel de Cabello' },
  { id: 5, name: 'Pintado de Cabello', price: 35000, image: image.PintadoCabello, description: 'Descripción del Pintado de Cabello' },
  { id: 6, name: 'Peines', price: 2000, image: image.PeineCabello, description: 'Descripción de los Peines' },
];

function ProductsPage() {
  const { addToCart, removeFromCart, cart, setCart } = useContext(CartContext);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const loadCart = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/cart', { withCredentials: true });
        const loadedCart = response.data;
        if (!Array.isArray(loadedCart)) {
          throw new Error('La respuesta no es un array');
        }
        setCart(loadedCart);

        const initialQuantities = {};
        loadedCart.forEach(item => {
          initialQuantities[item.product.id] = item.quantity;
        });
        setQuantities(initialQuantities);
      } catch (error) {
        console.error('Error cargando el carrito', error);
      }
    };

    loadCart();
  }, [setCart]);

  useEffect(() => {
    const saveCart = async () => {
      try {
        await axios.post('http://localhost:4000/api/cart', { cart }, { withCredentials: true });
      } catch (error) {
        console.error('Error guardando el carrito', error);
      }
    };

    if (cart.length > 0) {
      saveCart();
    }
  }, [cart]);

  const updateQuantitiesAndCart = useCallback((productId, change) => {
    setQuantities(prevQuantities => {
      const newQuantities = {
        ...prevQuantities,
        [productId]: (prevQuantities[productId] || 0) + change,
      };

      if (newQuantities[productId] <= 0) {
        delete newQuantities[productId];
      }

      return newQuantities;
    });

    const product = products.find(p => p.id === productId);

    if (change > 0) {
      addToCart(product, 1);
    } else {
      removeFromCart(productId);
    }
  }, [addToCart, removeFromCart]);

  const increment = (productId) => {
    updateQuantitiesAndCart(productId, 1);
  };

  const decrement = (productId) => {
    updateQuantitiesAndCart(productId, -1);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Nuestros Productos</h1>
      <div className="grid grid-cols-2 gap-4">
        {products.map(product => (
          <div key={product.id} className="border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="relative group">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-40 object-cover rounded-t-lg transition-opacity duration-300 group-hover:opacity-90" 
              />
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-gray-600">${product.price}</p>
              <p className="text-gray-500 mt-2">{product.description}</p>
              <div className="flex items-center space-x-2 mt-2">
                <button
                  onClick={() => decrement(product.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600 transition duration-300"
                >
                  -
                </button>
                <span className="text-lg">{quantities[product.id] || 0}</span>
                <button
                  onClick={() => increment(product.id)}
                  className="bg-green-500 text-white px-3 py-1 rounded-full hover:bg-green-600 transition duration-300"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;
