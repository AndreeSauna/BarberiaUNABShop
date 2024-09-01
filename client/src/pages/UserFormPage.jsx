// CRUD/client/src/pages/UserFormPage.jsx
import { useForm } from "react-hook-form";
import { useUsers } from "../context/UsersContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

function UserFormPage() {
  const { register, handleSubmit, setValue } = useForm();
  const { getUser, updateUser } = useUsers();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function loadUser() {
      if (params.id) {
        const user = await getUser(params.id);
        setValue("username", user.username);
        setValue("email", user.email);
      }
    }
    loadUser();
  }, [params.id, getUser, setValue]);

  const onSubmit = handleSubmit((data) => {
    updateUser(params.id, data);
    navigate("/users");
  });

  return (
    <div className="flex justify-center items-start min-h-screen bg-zinc-900 py-10">
      <div className="bg-zinc-800 max-w-3xl w-full p-4 sm:p-6 md:p-8 lg:p-10 rounded-md">
        <form onSubmit={onSubmit}>
          <label htmlFor="username">Usuario:</label>
          <input
            type="text"
            {...register("username")}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          />
          <label htmlFor="email">Correo:</label>
          <input
            type="email"
            {...register("email")}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          />
          <button className="w-full bg-blue-500 text-white px-4 py-2 rounded-md mt-4">Actualizar</button>
        </form>
      </div>
    </div>
  );
}

export default UserFormPage;
