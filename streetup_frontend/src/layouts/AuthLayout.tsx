import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

export default function AuthLayout() {
  const location = useLocation();
  const url = location.pathname;
  
  const [text, setText] = useState('')

  useEffect(() => {
    
    if(url === "/auth/login"){
      setText("Inicia sesión para acceder a tu cuenta")
    }else if(url === "/auth/register"){
      setText("Únete a nuestra comunidad creando una cuenta")
    }
  }, [])
  

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Imagen de fondo con comportamiento diferente por breakpoint */}
      <div 
        className="fixed md:absolute inset-0"
        style={{
          backgroundImage: `url(/static/font_login.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          // En móvil: scroll con la página, en desktop: fixed (parallax)
          backgroundAttachment: 'scroll'
        }}
      ></div>
      
      {/* Overlay */}
      <div className="fixed md:absolute inset-0 bg-black/40 md:bg-black/50"></div>
      
      {/* Contenido principal */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <div className="pt-6 pb-4 px-4 sm:pt-8 sm:pb-6 md:pt-12 md:pb-8">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
              Bienvenido a StreetUp
            </h1>
            <p className="text-white/90 text-sm sm:text-base md:text-lg lg:text-xl">
            
              {text}
            </p>
          </div>
        </div>
        
        {/* Área del formulario */}
        <div className="flex-1 flex items-center justify-center px-4 py-2 sm:py-4 md:py-8">
          <div className="w-full max-w-md sm:max-w-lg md:max-w-xl">
            {/* Tarjeta del formulario */}
            <div className="rounded-xl md:rounded-2xl 
                          p-4 sm:p-6 md:p-8 lg:p-10 shadow-2xl 
                        ">
              <Outlet />
            </div>
            
            
          </div>
        </div>
        
        {/* Footer */}
        <footer className="py-4 px-4 mt-auto">
          <div className="max-w-6xl mx-auto">
            <p className="text-center text-white/80 text-xs sm:text-sm md:text-base mb-2">
              © {new Date().getFullYear()} - Todos los derechos reservados
            </p>
            
          </div>
        </footer>
      </div>
    </div>
  );
}