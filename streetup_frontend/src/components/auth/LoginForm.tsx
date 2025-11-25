import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import Error from "./Error";
import { loginUser } from "../../api/UserApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import type { LoginForm as LoginFormType, LoginForm } from "../../types";
import PasswordInput from "./PasswordInput";

export default function LoginForm() {
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: loginUser,
    onError: (error) => {
      const message = error.message;
      setError("email", { type: "manual", message });
    },
    onSuccess: (data) => {
      toast.success(data?.message);

      if (data?.user.profile === null) {
        navigate("/new_profile");
      } else {
        navigate("/");
      }
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormType>();

  const handleLogin = (data: LoginFormType) => {
    mutate(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleLogin)}>
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
          {errors.email && <Error>{errors.email.message}</Error>}
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
              <PasswordInput
                register={register}
                error={errors.password?.message}
              />
            </div>
          </div>
          {errors.password && <Error>{errors.password.message}</Error>}
        </div>

        <div className="flex justify-center">
          <input
            type="submit"
            value="Iniciar Sesión"
            className="bg-linear-to-r from-cyan-800 to-fuchsia-800 hover:bg-gray-600 cursor-pointer py-2 px-4 w-11/12 mt-5 text-white text-lg rounded-sm"
          />
        </div>
      </form>
    </>
  );
}
