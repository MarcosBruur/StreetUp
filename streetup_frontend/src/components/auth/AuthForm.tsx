import { useForm } from "react-hook-form";
import Error from "./Error";
import type { DraftUser } from "../../types";

export default function AuthForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DraftUser>();

  const loginUser = (data: DraftUser) => {
    console.log(data);
  };
  return (
    <>
      <form noValidate onSubmit={handleSubmit(loginUser)}>
        <div className="grid gap-2">
          <div className="grid md:flex md:items-center gap-2">
            <label
              htmlFor="username"
              className="text-center md:text-start text-sm font-bold ml-5 min-w-20"
            >
              Usuario
            </label>

            <div className="flex justify-center md:w-full">
              <input
                type="text"
                placeholder="Nombre de usuario o correo electrónico"
                id="username"
                className="bg-gray-300 p-2 w-11/12 mb-2"
                {...register("userName", {
                  required: "Nombre de usuario obligatorio",
                })}
              />
            </div>
          </div>
          {errors.userName && <Error>{errors.userName.message}</Error>}
        </div>

        <div className="grid gap-2">
          <div className="grid md:flex md:items-center gap-2">
            <label
              htmlFor="password"
              className="text-center md:text-start text-sm font-bold mt-2 ml-5 min-w-20"
            >
              Contraseña
            </label>
            <div className="flex justify-center md:w-full">
              <input
                type="text"
                id="password"
                placeholder="Contraseña"
                className="bg-gray-300 p-2 w-11/12"
                {...register("password", {
                  required: "Contraseña obligatoria",
                  minLength: {
                    value: 8,
                    message: "Minimo 8 caracteres",
                  },
                })}
              />
            </div>
          </div>
          {errors.password && <Error>{errors.password.message}</Error>}
        </div>

        <div className="flex justify-center">
          <input
            type="submit"
            value="Iniciar sesión"
            className="bg-gray-700 hover:bg-gray-600 cursor-pointer py-2 px-4 w-11/12 mt-5 text-white text-lg rounded-sm"
          />
        </div>
      </form>
    </>
  );
}
