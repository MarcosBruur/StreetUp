import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

import { createUser } from "../../api/UserApi";
import { toast } from "react-toastify";

export default function RegisterForm() {
  const { mutate } = useMutation({
    mutationFn: createUser,
    onError: (error) => {
      console.log(error);
      const message = error.message;

      setError("email", { type: "manual", message });
    },
    onSuccess: (data) => {
      console.log(data);
      toast.success("Usuario creado correctamente");
    },
  });

  const {
    register,
    handleSubmit,

    setError,
    watch,
  } = useForm();

  const handleRegister = (data: any) => {
    mutate(data);
  };

  const passwordValue = watch("password");
  return (
    <>
      <form noValidate onSubmit={handleSubmit(handleRegister)}>
        <div className="grid gap-2">
          <div className="grid md:flex md:items-center gap-2">
            <label
              htmlFor="username"
              className="md:text-start text-sm font-bold ml-5 min-w-25 text-black"
            >
              Usuario
            </label>

            <div className="flex justify-center md:w-full">
              <input
                type="text"
                placeholder="Nombre de usuario"
                id="username"
                className="bg-white p-2 w-11/12 mb-2 text-black"
                {...register("userName", {
                  required: "Nombre de usuario obligatorio",
                })}
              />
            </div>
          </div>
          {/* {errors.userName && <Error>{errors.userName.message}</Error>} */}
        </div>

        <div className="grid gap-2">
          <div className="grid md:flex md:items-center gap-2">
            <label
              htmlFor="email"
              className="md:text-start text-sm font-bold ml-5 min-w-25 text-black"
            >
              Email
            </label>

            <div className="flex justify-center md:w-full">
              <input
                type="text"
                placeholder="Correo electrónico"
                id="email"
                className="bg-white p-2 w-11/12 mb-2 text-black"
                {...register("email", {
                  required: "Email obligatorio",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "El email ingresado no es válido",
                  },
                })}
              />
            </div>
          </div>
          {/* {errors.email && <Error>{errors.email.message}</Error>} */}
        </div>

        <div className="grid gap-2">
          <div className="grid md:flex md:items-center gap-2">
            <label
              htmlFor="password"
              className="md:text-start text-sm font-bold mt-2 ml-5 min-w-25 text-black"
            >
              Contraseña
            </label>
            <div className="flex justify-center md:w-full">
              <input
                type="password"
                id="password"
                placeholder="Contraseña"
                className="bg-white p-2 w-11/12 text-black"
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
          {/* {errors.password && <Error>{errors.password.message}</Error>} */}
        </div>

        <div className="grid gap-2 mt-2">
          <div className="grid md:flex md:items-center gap-2">
            <label
              htmlFor="repeatPassword"
              className="md:text-start text-sm font-bold mt-2 ml-5 min-w-25 text-black"
            >
              Repetir
            </label>
            <div className="flex justify-center md:w-full">
              <input
                type="password"
                id="repeatPassword"
                placeholder="Repetir"
                className="bg-white p-2 w-11/12 text-black"
                {...register("repeatPassword", {
                  required: "Contraseña obligatoria",
                  minLength: {
                    value: 8,
                    message: "Minimo 8 caracteres",
                  },
                  validate: (value) => {
                    return (
                      value === passwordValue || "Las contraseñas no coinciden"
                    );
                  },
                })}
              />
            </div>
          </div>
          {/* {errors.repeatPassword && (
            // <Error>{errors.repeatPassword.message}</Error>
          )} */}
        </div>

        <div className="flex justify-center">
          <input
            type="submit"
            value="Registrarse"
            className="bg-linear-to-r from-cyan-800 to-fuchsia-800 hover:bg-gray-600 cursor-pointer py-2 px-4 w-11/12 mt-5 text-white text-lg rounded-sm"
          />
        </div>
      </form>
    </>
  );
}
