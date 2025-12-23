import {ArrowRightIcon, EnvelopeIcon} from "@heroicons/react/24/solid"
import LoginForm from "../../components/auth/LoginForm";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../../components/auth/RegisterForm";


export default function Register(){
  const navigate = useNavigate()
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
          
          <div className="px-6 py-8 sm:px-8 sm:py-10">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center size-16 bg-linear-to-br from-cyan-800 to-fuchsia-800 rounded-full mb-4 shadow-lg">
                <EnvelopeIcon className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                Bienvenido 
              </h1>
              <p className="text-gray-600 text-sm sm:text-base">
                Ingresa tus credenciales para continuar
              </p>
            </div>
            <RegisterForm/> 

            {/* Enlace a registro */}
              <div className="text-center pt-4">
                <p className="text-sm text-gray-600">
                  ¿Ya tienes una cuenta?{' '}
                  <button
                    type="button"
                    onClick={()=> navigate("/auth/login")}
                    className="font-medium text-blue-600 hover:text-blue-500 transition-colors inline-flex items-center"
                  >
                    Inicia sesión aquí
                    <ArrowRightIcon className="ml-1 h-4 w-4" />
                  </button>
                </p>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

