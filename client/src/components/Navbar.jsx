import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import image from "../assets/image";
import { FaShoppingCart } from "react-icons/fa";

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation(); // Hook para obtener la ubicación actual

  // Función para verificar si el enlace está activo
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-zinc-700 my-3 flex flex-col lg:flex-row lg:items-center lg:justify-between py-5 px-10 rounded-lg shadow-lg">
      <div className="flex justify-between items-center w-full lg:w-auto">
        <Link to="/">
          <img
            src={image.logo}
            className="object-cover h-24 w-24 rounded-full border-4 border-white shadow-lg"
            alt="Logo"
          />
        </Link>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-white focus:outline-none lg:hidden"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
      <ul
        className={`${
          menuOpen ? "block" : "hidden"
        } lg:flex flex-col lg:flex-row gap-4 items-center w-full lg:w-auto mt-4 lg:mt-0 space-y-4 lg:space-y-0`}
      >
        {isAuthenticated ? (
          <>
            <li className="text-white">
              Bienvenido, <span className="font-bold">{user.username}</span>
            </li>
            <li>
              <Link
                to="/nosotros"
                className={`${
                  isActive("/nosotros") ? "bg-indigo-500" : "bg-zinc-700"
                } text-white px-4 py-2 rounded-full border-2 border-indigo-500 hover:bg-indigo-600 transition duration-300`}
              >
                Nosotros
              </Link>
            </li>
            {/* 
            <li>
              <Link
                to="/tasks"
                className="bg-indigo-500 text-white px-4 py-2 rounded-full hover:bg-indigo-600 transition duration-300"
              >
                Tareas
              </Link>
            </li>
            
            <li>
              <Link
                to="/add-task"
                className="bg-indigo-500 text-white px-4 py-2 rounded-full hover:bg-indigo-600 transition duration-300"
              >
                Nueva Tarea
              </Link>
            </li>
            */}

            <li>
              <Link
                //to="/appointments"
                to="/agendamientos"
                className={`${
                  isActive("/agendamientos") ? "bg-indigo-500" : "bg-zinc-700"
                } text-white px-4 py-2 rounded-full border-2 border-indigo-500 hover:bg-indigo-600 transition duration-300`}
              >
                Agendamientos
              </Link>
            </li>

            {/* 
            <li>
              <Link
                to="/add-agendamiento"
                className="bg-indigo-500 text-white px-4 py-2 rounded-full hover:bg-indigo-600 transition duration-300"
              >
                Agendar Cita
              </Link>
            </li>



            */}

            {user?.email !== "admin@gmail.com" && (
              <li>
                <Link
                  to="/add-agendamiento"
                  //className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition duration-300"
                  className={`${
                    isActive("/add-agendamiento")
                      ? "bg-green-500"
                      : "bg-zinc-700"
                  } text-white px-4 py-2 rounded-full border-2 border-green-600 hover:bg-green-600 transition duration-300`}
                >
                  Agendar Cita
                </Link>
              </li>
            )}

            {user?.email === "admin@gmail.com" && (
              <li>
                <Link
                  to="/users"
                  className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300"
                >
                  Usuarios
                </Link>
              </li>
            )}

            <li>
              <Link
                to="/"
                onClick={() => {
                  logout();
                }}
                className="text-white px-4 py-2 rounded-full hover:bg-red-500 transition duration-300"
              >
                Cerrar Sesión
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
                to="/nosotros"
                className={`${
                  isActive("/nosotros") ? "bg-indigo-500" : "bg-zinc-700"
                } text-white px-4 py-2 rounded-full border-2 border-indigo-500 hover:bg-indigo-600 transition duration-300`}
              >
                Nosotros
              </Link>
            </li>

            <li>
              <Link
                to="/login"
                className={`${
                  isActive("/login") ? "bg-indigo-500" : "bg-zinc-700"
                } text-white px-4 py-2 rounded-full border-2 border-indigo-500 hover:bg-indigo-600 transition duration-300`}
              >
                Acceso Clientes
              </Link>
            </li>

            <li>
              <Link
                to="/register"
                className={`${
                  isActive("/register") ? "bg-green-500" : "bg-zinc-700"
                } text-white px-4 py-2 rounded-full border-2 border-green-500 hover:bg-green-600 transition duration-300`}
              >
                Registrarse
              </Link>
            </li>
          </>
        )}

        <li>
          <Link
            to="/product"
            className={`${
              isActive("/product") ? "bg-indigo-500" : "bg-zinc-700"
            } text-white px-4 py-2 rounded-full border-2 border-indigo-500 hover:bg-indigo-600 transition duration-300`}
          >
            Productos
          </Link>
        </li>
        {/* 
        <li>
          <Link
            to="/cart"
            className="text-white px-4 py-2 rounded-full hover:bg-gray-600 transition duration-300 flex items-center"
          >
            <FaShoppingCart className="mr-2" />
            Carrito
          </Link>
        </li>
        */}
      </ul>
    </nav>
  );
}

export default Navbar;
