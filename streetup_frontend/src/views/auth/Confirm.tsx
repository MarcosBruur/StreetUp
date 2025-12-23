import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { 
  CheckCircleIcon, 
  ArrowPathIcon,
  ExclamationTriangleIcon,
  ArrowLeftIcon,
  InformationCircleIcon 
} from "@heroicons/react/24/outline";
import { confirmAccount, resendEmail } from '../../api/AuthApi';
import { toast } from 'react-toastify';

// Importa tu función confirmAccount desde el módulo de API
// import { confirmAccount } from '../lib/api';

// Definición de tipos
interface ConfirmFormInputs {
  token: string;
}

interface ConfirmAccountResponse {
  success: boolean;
  message: string;
  // Agrega más propiedades según la respuesta de tu API
}

interface ApiError {
  message: string;
  details?: Record<string, string[]>;
}


interface ConfirmAccountProps {
  email?: string;
  onResendCode?: () => void;
}

export default function ConfirmAccount(){ 
 
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState<number>(0);
  const [manualCode, setManualCode] = useState<string[]>(Array(6).fill(''));

  // Configuración de React Hook Form
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
    reset
  } = useForm<ConfirmFormInputs>({
    defaultValues: {
      token: ''
    }
  });

  // Configuración de React Query Mutation
  
  const {mutate,isPending} = useMutation({
    mutationFn: confirmAccount,
    onError: (error)=>{
      toast.error("error al confirmar cuenta :c")
    },
    onSuccess: (data) =>{
      toast.success(data?.message)
      localStorage.setItem("pending_email", data.email);
      navigate("/auth/login")
    }
  })


  const resendMutation = useMutation({
  mutationFn: resendEmail,
  onSuccess: () => {
    toast.success("Código reenviado correctamente");
    setCountdown(30); // por ejemplo
  },
  onError: (error: Error) => {
    toast.error(error.message);
  }
  });
  

  // Manejar cambio en inputs manuales
  const handleManualChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return;

    const newCode = [...manualCode];
    newCode[index] = value.slice(-1);
    setManualCode(newCode);

    // Actualizar el valor del formulario
    const fullCode = newCode.join('');
    setValue('token', fullCode, { shouldValidate: true });

    // Limpiar errores al escribir
    if (errors.token || errors.root) {
      clearErrors();
    }
  };

  // Manejar pegado de código
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    const digits = pastedData.replace(/\D/g, '').slice(0, 6);

    if (digits.length === 6) {
      const newCode = digits.split('');
      setManualCode(newCode);
      setValue('token', digits, { shouldValidate: true });
    }
  };

  // Manejar teclas especiales
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !manualCode[index] && index > 0) {
      const input = document.querySelector(`input[data-index="${index - 1}"]`) as HTMLInputElement;
      input?.focus();
    }
  };

  // Handler para el submit del formulario
  const onSubmit=(data:number)=>{
    mutate(data)
  };

  // Manejar reenvío de código
  const handleResend = () => {
    console.log("reenviando codigo....")
  };

  // Determinar si el botón debe estar deshabilitado
  //const isSubmitDisabled = manualCode.join('').length !== 6 || isSubmitting || confirmMutation.isPending;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Card del formulario */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-6 sm:p-8">
            {/* Icono de verificación */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full flex items-center justify-center">
                <CheckCircleIcon className='text-fuchsia-800 w-12 h-12'/>
              </div>
            </div>

            {/* Título y descripción */}
            <div className="text-center mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">
                Verifica tu cuenta
              </h1>
              <p className="text-gray-600 mb-2">
                Ingresa el código de 6 dígitos enviado a tu correo
              </p>
              
              <p className="text-gray-500 text-sm mt-2">
                El código expira en 30 minutos
              </p>
            </div>

            {/* Formulario con React Hook Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Campo oculto para React Hook Form */}
              <input
                type="hidden"
                {...register("token", {
                  required: "El código es requerido",
                  minLength: {
                    value: 6,
                    message: "El código debe tener 6 dígitos"
                  },
                  maxLength: {
                    value: 6,
                    message: "El código debe tener 6 dígitos"
                  },
                  pattern: {
                    value: /^\d{6}$/,
                    message: "Solo se permiten números"
                  }
                })}
              />

              {/* Inputs visuales del código */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700 text-center">
                  Código de verificación
                </label>
                
                <div className="flex justify-center space-x-2 sm:space-x-3">
                  {manualCode.map((digit, index) => (
                    <input
                      key={index}
                      data-index={index}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleManualChange(e.target.value, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      onPaste={handlePaste}
                      className="w-12 h-12 sm:w-14 sm:h-14 text-center text-2xl font-bold text-black bg-white border-2 border-gray-300 rounded-lg focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-200 focus:outline-none transition-all duration-200"
                      //disabled={isSubmitting || confirmMutation.isPending}
                      autoFocus={index === 0}
                    />
                  ))}
                </div>

                {/* Mostrar errores de validación */}
                {errors.token && (
                  <div className="text-center">
                    <p className="text-sm text-red-600 flex items-center justify-center gap-1">
                      <ExclamationTriangleIcon className="w-4 h-4" />
                      {errors.token.message}
                    </p>
                  </div>
                )}

                {/* Indicador de progreso */}
                <div className="text-center">
                  <p className={`text-sm font-medium ${manualCode.join('').length === 6 ? 'text-green-600' : 'text-gray-500'}`}>
                    {manualCode.join('').length === 6 ? '✓ Código completo' : ``}
                  </p>
                </div>
              </div>

              {/* Botón de verificar */}
              <button
                type="submit"
                className="w-full py-3.5 px-4 bg-linear-to-r
                from-cyan-800 to-fuchsia-800
                hover:from-cyan-900 hover:to-fuchsia-900 
                text-white font-semibold rounded-lg shadow-md 
                hover:shadow-lg focus:outline-none focus:ring-2 
                focus:ring-fuchsia-500 focus:ring-offset-2 
                disabled:opacity-50 disabled:cursor-not-allowed 
                transition-all duration-200 transform 
                hover:-translate-y-0.5"
                disabled={isPending}
              >
                {isPending? (
                  <div className="flex items-center justify-center">
                    <ArrowPathIcon className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" /> 
                    Verificando...
                  </div>
                ): (
                  <div className="flex items-center justify-center">
                    Verificar
                  </div>
                )}
                  
              </button>
            </form>

            {/* Sección de reenvío */}
            <div className="mt-8 text-center">
              <p className="text-gray-600 text-sm mb-3">
                ¿No recibiste el código?
              </p>
              <button
                type="button"
                onClick={handleResend}
                disabled={false}
                className="inline-flex items-center text-fuchsia-700 hover:text-fuchsia-800 font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ArrowPathIcon className='text-fuchsia-800 size-5 mx-2'/>
                {countdown > 0 ? `Reenviar en ${countdown}s` : 'Reenviar código'}
              </button>
            </div>

            {/* Información adicional */}
            <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
              <div className="flex items-start">
                <InformationCircleIcon className="w-5 h-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <p className="text-sm text-blue-800 font-medium mb-1">Advertencia:</p>
                  <ul className="text-xs text-blue-700 space-y-1">
                    <li>El código es válido por hasta 30 minutos</li>
                    <li>Revisa tu carpeta de spam si no encuentras el correo que te fue enviado</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Enlaces de navegación */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
                <Link
                  to="/auth/login"
                  className="text-gray-600 hover:text-gray-800 text-sm font-medium transition-colors inline-flex items-center"
                >
                  <ArrowLeftIcon className="w-4 h-4 mr-1" />
                  Volver al login
                </Link>
                
                <Link
                  to="/auth/register"
                  className="text-gray-600 hover:text-gray-800 text-sm font-medium transition-colors"
                >
                  ¿No tienes cuenta? Regístrate
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Mensaje para móviles */}
        <div className="mt-6 text-center sm:hidden">
          <p className="text-sm text-gray-500">
            Desliza horizontalmente si no ves todos los campos
          </p>
        </div>
      </div>
    </div>
  );
};

