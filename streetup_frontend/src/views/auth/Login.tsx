import { Link } from "react-router-dom";
import LoginForm from "../../components/auth/LoginForm";

export default function Login() {
  return (
    <>
      <div className="bg-gray-300 rounded-3xl mt-10 bg-linear-to-br w-11/12 md:w-2/4 flex flex-col justify-between shadow-[0px_0px_15px_11px_rgba(147,51,234,0.5)]">
        <h2 className="text-white text-4xl font-bold text-center p-2 bg-linear-to-r from-fuchsia-600 via-violet-800 to-fuchsia-600 border border-fuchsia-300 rounded-tl-2xl rounded-tr-2xl">
          StreetUp
        </h2>
        <div className="mt-10">
          <LoginForm />
          <div className="flex justify-center mt-5">
            <p className="text-sm text-purple-800 my-2">
              ¿Aún no tienes cuenta?{" "}
              <span className="font-bold">
                <Link to="/auth/register">Registrate</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
