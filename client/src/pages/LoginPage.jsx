//Para realizar un Login se necesita un email segun Backend src/controllers/auth.controllers.js en login se puede modificar const { email. password} y tambien cambiar en try userFound{email}
//import { data } from "autoprefixer";
// CRUD/client/src/pages/LoginPage.jsx
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signin, errors: signinErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    signin(data);
  });

  //si esta autenticado direccionamos a la pagina de tareas
  useEffect(() => {
    //if (isAuthenticated) navigate("/tasks")
    //Despues de logger redirecciona a home
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated]);

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        {signinErrors.map((error, i) => (
          <div className="bg-red-500 p-2 text-white text-center my-2" key={i}>
            {error}
          </div>
        ))}
        <h1 className="text-2xl font-bold text-center">Bienvenido</h1>
        <h2 className="text-xl font-bold text-center">Ingresa a tu cuenta</h2>
        <form onSubmit={onSubmit} className="mt-4">
          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Correo"
          />
          {errors.email && (
            <p className="text-red-500">El correo es requerido</p>
          )}

          <input
            type="password"
            {...register("password", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Contraseña"
          />
          {errors.password && (
            <p className="text-red-500">La contraseña es requerida</p>
          )}

          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Iniciar Sesión
            </button>
          </div>
        </form>

        <p className="text-center mt-4">
          No tienes cuenta?{" "}
          <Link to="/register" className="text-blue-400 hover:underline">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
