// CRUD/client/src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import image from "../assets/image";

function HomePage() {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [image.salon, image.barber, image.salon];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 3000); // Cambia la imagen cada 3 segundos
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="min-h-[calc(100vh-100px)] flex flex-col items-center justify-center bg-gray-100">
      <div className="text-center p-4 max-w-lg w-full mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 tracking-wide shadow-lg p-4 bg-white rounded-lg">
          UNAB BARBER SHOP
        </h1>
        <div className="relative w-full h-64 sm:h-80 md:h-96 overflow-hidden mb-4">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
                currentImage === index ? 'opacity-100' : 'opacity-0'
              }`}
              alt={`Slide ${index}`}
            />
          ))}
        </div>
        <p className="px-4 text-gray-700 mb-8">
          En un mundo donde la apariencia y el estilo son más importantes que nunca, las peluquerías y barberías se convierten en lugares sagrados donde la estética se mezcla con el arte. En estos santuarios de la moda, la habilidad de los barberos y estilistas se une para transformar simples cortes de cabello en obras maestras de la autoexpresión.
        </p>
      </div>
      <div className="w-full max-w-4xl mx-auto mb-8">
      <h2 className="text-4xl text-center font-bold text-gray-800 mb-8 tracking-wide shadow-lg p-4 bg-white rounded-lg">
      UNAB Barber Shop Location
        </h2>
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1176.9452006739152!2d-70.66811108234951!3d-33.451814591480186!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c59ad1710b4d%3A0x688a354c7cfa17c9!2sFacultad%20de%20Ingenier%C3%ADa%20UNAB%20-%20R4!5e0!3m2!1ses-419!2scl!4v1719789472673!5m2!1ses-419!2scl" 
          width="100%" 
          height="450" 
          style={{ border: 0 }} 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          className="rounded-lg shadow-lg"
          title="UNAB Barber Shop Location"
        ></iframe>
      </div>
      {/* Nueva Sección de Barberos */}
      {/* Nueva Sección de Barberos */}
      <div className="w-full max-w-4xl mx-auto mb-8 px-4">
        <h2 className="text-4xl text-center font-bold text-gray-800 mb-8 tracking-wide shadow-lg p-4 bg-white rounded-lg">
          Nuestros Barberos
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { src: image.Barbero1, name: "Barbero 1", description: "Habilidades en cortes clásicos y modernos, arreglo de barbas cortas y largas, asesoría." },
            { src: image.Barbero2, name: "Barbero 2", description: "Habilidades en cortes clásicos y modernos, arreglo de barbas cortas y largas, asesoría." },
            { src: image.Barbero3, name: "Barbero 3", description: "Habilidades en cortes clásicos y modernos, arreglo de barbas cortas y largas, asesoría." },
            { src: image.Barbero4, name: "Barbero 4", description: "Habilidades en cortes clásicos y modernos, arreglo de barbas cortas y largas, asesoría." }
          ].map((barbero, index) => (
            <div key={index} className="relative bg-white p-4 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl">
              <img src={barbero.src} alt={barbero.name} className="w-full h-48 object-cover rounded-lg mb-4 transition-transform transform hover:scale-110" />
              <h3 className="text-xl font-semibold mb-2 text-gray-700">{barbero.name}</h3>
              <p className="text-gray-600">{barbero.description}</p>
              <div className="absolute inset-0 bg-gray-900 opacity-0 hover:opacity-30 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
      </div>


    </div>
  );
}

export default HomePage;

