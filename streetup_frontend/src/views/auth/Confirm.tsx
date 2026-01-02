import React, { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
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
import type { ConfirmAccountApi } from '../../types';


// Definición de tipos
interface ConfirmFormInputs {
  token: string;
}





export default function ConfirmAccountView(){ 
 
  const navigate = useNavigate();
  const [manualCode, setManualCode] = useState<string[]>(Array(6).fill(''));
  const pendingEmail = localStorage.getItem('pending_email')

  
 
  // Configuración de React Hook Form
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors  },
  } = useForm<ConfirmFormInputs>({
    defaultValues: {
      token: ''
    }
  });

  // Configuración de React Query Mutation
  
  const { mutate, isPending } = useMutation<ConfirmAccountApi, Error, string>({
  mutationFn: confirmAccount,
  onSuccess: (data) => {
    toast.success(data.message);
    navigate("/auth/login");
  },
  onError: () => toast.error("error al confirmar cuenta, revisa que el codigo ingresado sea el correcto"),
});


  const resendMutation = useMutation({
    mutationFn: resendEmail,
    onError: () => toast.error("Error al reenviar código :c"),
    onSuccess: (data) =>{
      toast.success(data.message);
    }
  })
 
  // Manejar reenvío de código
  const handleResend = () => {
    if (!pendingEmail) return toast.error("No hay email pendiente");
    resendMutation.mutate(pendingEmail);
  };
 
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
  const onSubmit: SubmitHandler<ConfirmFormInputs> = ({ token }) => {
  mutate(token)   // <- importante convertir a number
  };

 

  // Determinar si el botón debe estar deshabilitado
  //const isSubmitDisabled = manualCode.join('').length !== 6 || isSubmitting || confirmMutation.isPending;

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
                    <label className="text-lg md:text-sm block font-medium text-gray-700 text-center">
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
                          className="size-12 text-center text-lg md:text-sm font-bold text-black bg-white border-2 border-gray-300 rounded-lg focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-200 focus:outline-none transition-all duration-200"
                          //disabled={isSubmitting || confirmMutation.isPending}
                          autoFocus={index === 0}
                        />
                      ))}
                    </div>

                    {/* Mostrar errores de validación */}
                    {errors.token && (
                      <div className="text-center">
                        <p className="text-lg md:text-sm text-red-600 flex items-center justify-center gap-1">
                          <ExclamationTriangleIcon className="size-8 md:size-4" />
                          {errors.token.message}
                        </p>
                      </div>
                    )}

                    {/* Indicador de progreso */}
                    <div className="text-center">
                      <p className={`text-lg md:text-sm font-medium ${manualCode.join('').length === 6 ? 'text-green-600' : 'text-gray-500'}`}>
                        {manualCode.join('').length === 6 ? '✓ Código completo' : ``}
                      </p>
                    </div>
                  </div>

                  {/* Botón de verificar */}
                  <button
                    type="submit"
                    className="group w-full flex items-center justify-center 
                    py-5 md:py-3.5 px-4 text-xl md:text-lg md:rounded-lg 
                    shadow-sm sm:text-base font-medium text-white 
                    bg-linear-to-r from-cyan-800 to-fuchsia-800 
                    hover:from-cyan-900 hover:to-fuchsia-900 
                    focus:outline-none focus:ring-2 focus:ring-offset-2 
                    disabled:opacity-70 
                    disabled:cursor-not-allowed transition-all duration-200 
                    transform hover:-translate-y-0.5"
                    disabled={isPending}
                  >
                    {isPending? (
                      <div className="text-lg md:text-sm flex items-center justify-center">
                        <ArrowPathIcon className="animate-spin -ml-1 mr-3 size-5 
                        text-white text-lg md:text-sm"/> 
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

                {/* Información adicional */}
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

                {/* Enlaces de navegación */}
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

