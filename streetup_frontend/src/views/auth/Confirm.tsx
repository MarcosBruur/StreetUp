import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { Link, useNavigate } from 'react-router-dom';
import { 
  CheckCircleIcon, 
  ArrowPathIcon,
  ArrowLeftIcon,
  InformationCircleIcon 
} from "@heroicons/react/24/outline";
import { confirmAccount, resendEmail } from '../../api/AuthApi';
import { toast } from 'react-toastify';
import type { ConfirmAccountApi, ConfirmToken, LoginForm } from '../../types';


export default function ConfirmAccountView(){ 
 
  const navigate = useNavigate();
  const [token,setToken] = useState<ConfirmToken['token']>("");
  const pendingEmail : LoginForm['email'] = localStorage.getItem("pending_email")!;
  
  const { mutate } = useMutation<ConfirmAccountApi, Error, string>({
  mutationFn: confirmAccount,
  onSuccess: (data) => {
    toast.success(data.message);
    navigate("/auth/login");
  },
  onError: () => toast.error("error al confirmar cuenta, revisa que el codigo ingresado sea el correcto"),
});

  const handleChange = (token: ConfirmToken['token']) =>{
    setToken(token);
  }
 const handleComplete = (token: ConfirmToken["token"]) => {
    mutate( token );
  };


  const resendMutation = useMutation({
    mutationFn: resendEmail,
    onError: () => toast.error("Error al reenviar código :c"),
    onSuccess: (data) =>{
      toast.success(data.message);
    }
  })
 
  const handleResend = () => {
    if (!pendingEmail) return toast.error("No hay una dirección de correo pendiente encontrada, vuelve a intentar");
    resendMutation.mutate(pendingEmail);
  };
 
  return (
        <div className="min-h-screen flex flex-col items-center justify-center ">
          <div className="w-full">
            {/* Card del formulario */}
            <div className="bg-white md:rounded-2xl shadow-xl overflow-hidden">
              <div className="p-6 sm:p-8">
                {/* Icono de verificación */}
                <div className="flex justify-center mb-6">
                  <div className="size-16 rounded-full flex items-center justify-center">
                    <CheckCircleIcon className='text-fuchsia-800 size-12'/>
                  </div>
                </div>

                {/* Título y descripción */}
                <div className="text-center mb-8">
                  <h1 className="text-2xl font-bold text-gray-800 mb-3">
                    Verifica tu cuenta
                  </h1>
                  <p className="text-lg md:text-sm text-gray-600 mb-2">
                    Ingresa el código de 6 dígitos enviado a tu correo
                  </p>
                  
                  <p className="text-lg md:text-sm text-gray-500 mt-2">
                    El código expira en 30 minutos
                  </p>
                </div>

                
                <form className="space-y-6">
                  
                  
                  <div className="space-y-4">
                    <label className="text-lg md:text-sm block font-medium text-gray-700 text-center">
                      Código de verificación
                    </label>
                    
                    <div className="flex justify-center space-x-2 sm:space-x-3">
                      <PinInput
                        value={token}
                        onChange={handleChange}
                        onComplete={handleComplete}
                        >
                        <PinInputField className="size-10 p-3 text-black text-xl text-center rounded-lg border border-gray-300 focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500"/>
                        <PinInputField className="size-10 p-3 text-black text-xl text-center rounded-lg border border-gray-300 focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500"/>
                        <PinInputField className="size-10 p-3 text-black text-xl text-center rounded-lg border border-gray-300 focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500"/>
                        <PinInputField className="size-10 p-3 text-black text-xl text-center rounded-lg border border-gray-300 focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500"/>
                        <PinInputField className="size-10 p-3 text-black text-xl text-center rounded-lg border border-gray-300 focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500"/>
                        <PinInputField className="size-10 p-3 text-black text-xl text-center rounded-lg border border-gray-300 focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500"/>
                      </PinInput>
                    </div>

                
                  </div>
                </form>

                {/* Sección de reenvío */}
                <div className="mt-8 text-center">
                  <p className="text-gray-600 text-lg md:text-sm mb-3">
                    ¿No recibiste el código?
                  </p>
                  <button
                    type="button"
                    onClick={handleResend}
                    disabled={resendMutation.isPending}
                    className="inline-flex items-center text-fuchsia-700 
                    hover:text-fuchsia-800 font-medium disabled:opacity-50 
                    disabled:cursor-not-allowed transition-colors"
                  >
                    
                    <ArrowPathIcon className={`${resendMutation.isPending? 'animate-spin': ''} text-fuchsia-800 size-8 md:size-5 mx-2`}/>
                    
                    {resendMutation.isPending ? (
                      
                      <p className='text-lg md:text-sm'>Reenviando...</p>
                    ): (
                      <p className='text-lg md:text-sm'>Reenviar</p>
                    )}

                  </button>
                </div>

                <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <div className="flex items-start">
                    <InformationCircleIcon className="size-5 text-blue-500 mt-0.5 mr-2 shrink-0" />
                    <div>
                      <p className="text-lg md:text-sm text-blue-800 font-medium mb-1">Advertencia:</p>
                      <ul className="text-lg md:text-sm text-blue-700 space-y-1">
                        <li>El código es válido por hasta 30 minutos</li>
                        <li>Revisa tu carpeta de spam si no encuentras el correo que te fue enviado</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
                    <Link
                      to="/auth/login"
                      className="text-gray-600 hover:text-gray-800 text-lg md:text-sm font-medium transition-colors inline-flex items-center"
                    >
                      <ArrowLeftIcon className="size-6 md:size-4 mr-1" />
                      Volver al login
                    </Link>
                    
                    <Link
                      to="/auth/register"
                      className="text-gray-600 hover:text-gray-800 text-lg md:text-sm font-medium transition-colors"
                    >
                      ¿No tienes cuenta? Regístrate
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  );
};

