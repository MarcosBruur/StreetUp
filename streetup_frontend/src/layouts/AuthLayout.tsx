// AuthLayout.tsx
import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

export default function AuthLayout() {
  const location = useLocation();
  const [text, setText] = useState('');

  useEffect(() => {
    if(location.pathname === "/auth/login"){
      setText("Inicia sesión para acceder a tu cuenta")
    } else if(location.pathname === "/auth/register"){
      setText("Únete a nuestra comunidad creando una cuenta")
    }
  }, [location.pathname]) 

  return (
   
  <div className="relative flex flex-col min-h-dvh">

    {/* Fondo */}
    <div
      className="fixed inset-0 z-0"
      style={{
        backgroundImage: `url(/static/static/font_login.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black/40 md:bg-black/50" />
    </div>

    {/* CONTENIDO */}
    <div className="relative z-10 flex flex-col min-h-dvh">

      {/* Header */}
          <div className="hidden md:block mt-10">
            <div className="text-center max-w-2xl mx-auto">
              <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-md">
                Bienvenido a StreetUp
              </h1>
              <p className="text-white/90 text-lg drop-shadow-sm">
                {text}
              </p>
            </div>
          </div>

      {/* MAIN */}
      <div className="flex-1 md:flex md:items-center md:justify-center md:py-6">
        <div className="w-full md:max-w-xl border-y-4 border-b-fuchsia-800 md:border-none">
          <Outlet />
        </div>
      </div>

        <footer className="w-full">
          <div className="max-w-6xl mx-auto">
            <p className="text-center text-white/80 text-lg md:text-sm">
              © {new Date().getFullYear()} - Todos los derechos reservados
            </p>
          </div>
        </footer>
    </div>
  </div>
);

}

