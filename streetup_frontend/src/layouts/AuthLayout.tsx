import { Outlet, useLocation } from "react-router-dom";

export default function AuthLayout() {
  const location = useLocation();
  const url = location.pathname;
  return (
    <>
      <div
        className="bg-cover bg-center min-h-screen"
        style={{ backgroundImage: `url(/static/font_login.jpg)` }}
      >
        {/* <div
        className="bg-cover bg-center min-h-screen flex flex-col justify-between bg-auth"
        style={{ backgroundImage: `url(${bgImage})` }}
      > */}
        <div className="flex flex-col justify-between items h-screen">
          <div className="flex flex-col gap-y-2 mt-4">
            <h1 className="text-4xl font-bold text-center">Bienvenido</h1>
            <p className="text-center text-lg">
              Llena el formulario para{" "}
              {url === "/auth/login" ? (
                <span className="font-bold text-xl">iniciar Sesión</span>
              ) : (
                <span className="font-bold text-xl">Crear una cuenta</span>
              )}
            </p>
          </div>

          <div className="flex flex-col justify-center items-center grow">
            <Outlet />
          </div>
          <footer className="py-5">
            <p className="text-center m-2 text-white md:text-lg">
              Todos los derechos reservados {new Date().getFullYear()}
            </p>
          </footer>
        </div>
      </div>
    </>
  );
}
