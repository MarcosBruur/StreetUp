import { Link } from "react-router-dom";
import RegisterForm from "../../components/auth/RegisterForm";

export default function Register() {
  return (
    <>
      <div className="flex flex-col gap-y-2">
        <h1 className="text-4xl font-bold text-center">Bienvenido</h1>
        <p className="text-center text-lg">
          Llena el formulario para{" "}
          <span className="font-bold text-xl">Registrarte</span>
        </p>
      </div>
      <div className="bg-gray-300 rounded-3xl mt-10 bg-linear-to-br w-11/12 md:w-2/4 flex flex-col justify-between shadow-[0px_0px_15px_11px_rgba(147,51,234,0.5)]">
        <h1 className="text-white text-4xl font-bold text-center p-2 bg-linear-to-r from-cyan-800 to-fuchsia-800 rounded-tl-2xl rounded-tr-2xl">
          StreetUp
        </h1>
        <div className="mt-10">
          <RegisterForm />
          <div className="flex justify-center mt-5">
            <p className="text-sm text-purple-800 my-2">
              ¿Ya tienes cuenta?{" "}
              <span className="font-bold">
                <Link to="/auth/login">Inicia Sesión</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
