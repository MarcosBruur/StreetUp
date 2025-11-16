import { Outlet } from "react-router-dom";

export default function AuthLayout() {
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
        <div className="flex flex-col justify-center items-center grow">
          <Outlet />
        </div>
        <footer className="py-5">
          <p className="text-center m-2 text-white md:text-lg">
            Todos los derechos reservados {new Date().getFullYear()}
          </p>
        </footer>
      </div>
    </>
  );
}
