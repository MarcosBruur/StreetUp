import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../api/UserApi";
import { toast } from "react-toastify";
import type { LoginForm as LoginFormFields } from "../../types";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowPathIcon, ArrowRightIcon, CheckCircleIcon, EnvelopeIcon, ExclamationCircleIcon, EyeIcon, EyeSlashIcon, LockClosedIcon } from "@heroicons/react/24/solid";


export default function LoginForm() {

  // Estado para mostrar/ocultar contraseña
  const [showPassword, setShowPassword] = useState(false);
  
  const navigate = useNavigate()
  
  // Configuración de React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    clearErrors,
    reset,
  } = useForm<LoginFormFields>({
    defaultValues: {
      email: '',
      password: ''
    },
    mode: 'onChange'
  });


  const {mutate,isPending,isSuccess} = useMutation({
    mutationFn: loginUser,
    onError: (error) =>{
      toast.error(error.message)
      reset()
    },
    onSuccess: (data)=>{
            if (data?.user.profile === null) {
              navigate("/new_profile");
            } else {
              navigate("/profile");
            }
          },
  })

  // Handler para el envío del formulario
  const onSubmit: SubmitHandler<LoginFormFields> = (data) => {
    clearErrors();
    mutate(data);
  };

  // Handler para limpiar errores
  const handleInputFocus = (field: keyof LoginFormFields) => {
    if (errors[field]) {
      clearErrors(field);
    }
    if (errors.root?.server || errors.root?.network) {
      clearErrors('root');
    }
  };

  // Función para alternar visibilidad de contraseña
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} 
        className="space-y-6 text-black md:text-gray-700 
        text-lg md:text-sm">
        
              {/* Campo Email */}
              <div className="space-y-2">
                <label htmlFor="email" className="font-medium">
                  Correo Electrónico
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <EnvelopeIcon className={`size-8 md:size-5 ${
                      errors.email ? 'text-red-400' : 
                      touchedFields.email ? 'text-cyan-800' : 'text-gray-400'
                    }`} />
                  </div>
                  <input
                    id="email"
                    type="email"
                    {...register("email", {
                      required: "El correo electrónico es requerido",
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Ingresa un correo electrónico válido"
                      },
                      onBlur: () => handleInputFocus('email')
                    })}
                    className={`flex-row w-full pl-15 md:pl-10 pr-3 py-5 md:py-3 border rounded-lg transition-all duration-200 ${
                      errors.email 
                        ? 'border-red-300 bg-red-50 focus:ring-2 focus:ring-red-500 focus:border-red-500' 
                        : 'border-gray-300 focus:ring-2 focus:ring-fuchsia-800 focus:border-fuchsia-800'
                    } focus:outline-none`}
                    placeholder="usuario@ejemplo.com"
                    onFocus={() => handleInputFocus('email')}
                  />
                </div>
                {errors.email && (
                  <div className="flex items-center gap-1 text-red-600 mt-1">
                    <ExclamationCircleIcon className="h-4 w-4 shrink-0" />
                    <span>{errors.email.message}</span>
                  </div>
                )}
              </div>

              {/* Campo Contraseña */}
              <div className="space-y-2">
                
                  <label htmlFor="password" className="block font-medium">
                    Contraseña
                  </label>
               
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LockClosedIcon className={`size-8 md:size-5 ${
                      errors.password ? 'text-red-400' : 
                      touchedFields.password ? 'text-cyan-800' : 'text-gray-400'
                    }`} />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    {...register("password", {
                      required: "La contraseña es requerida",
                      minLength: {
                        value: 6,
                        message: "La contraseña debe tener al menos 6 caracteres"
                      },
                      onBlur: () => handleInputFocus('password')
                    })}
                    className={`w-full pl-15 md:pl-10 pr-10 py-5 md:py-3 border rounded-lg transition-all duration-200 ${
                      errors.password 
                        ? 'border-red-300 bg-red-50 focus:ring-2 focus:ring-red-500 focus:border-red-500' 
                        : 'border-gray-300 focus:ring-2 focus:ring-fuchsia-800 focus:border-fuchsia-800'
                    } focus:outline-none`}
                    placeholder="Tu contraseña"
                    onFocus={() => handleInputFocus('password')}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      
                        <EyeSlashIcon className="size-8 md:size-5 text-gray-400 hover:text-gray-600" />
                      
                    ) : (
                      
                      <EyeIcon className="size-8 md:size-5 text-gray-400 hover:text-gray-600" />
  
                    )}
                  </button>
                </div>
                {errors.password && (
                  <div className="flex items-center gap-1 text-red-600 mt-1">
                    <ExclamationCircleIcon className="size-4 shrink-0" />
                    <span>{errors.password.message}</span>
                  </div>
                )}
              </div>


              {/* Errores del servidor/red */}
              {(errors.root?.server || errors.root?.network) && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center">
                    <ExclamationCircleIcon className="size-5 text-red-400 mr-2" />
                    <p className="text-red-600">
                      {errors.root.server?.message || errors.root.network?.message}
                    </p>
                  </div>
                </div>
              )}

              

              {/* Botón de envío */}
              <button
                type="submit"
                disabled={isPending || isSuccess}
                className="group w-full flex items-center justify-center 
                py-5 md:py-3.5 px-4 text-xl md:text-lg md:rounded-lg 
                shadow-sm sm:text-base font-medium text-white 
                bg-linear-to-r from-cyan-800 to-fuchsia-800 
                hover:from-cyan-900 hover:to-fuchsia-900 
                focus:outline-none focus:ring-2 focus:ring-offset-2 
                disabled:opacity-70 
                disabled:cursor-not-allowed transition-all duration-200 
                transform hover:-translate-y-0.5"
              >
                {isPending ? (
                  <>
                    <ArrowPathIcon className="animate-spin size-8 md:size-5 mr-2" />
                    Iniciando sesión...
                  </>
                ) : isSuccess ? (
                  <>
                    <CheckCircleIcon className="size-8 md:size-5 mr-2" />
                    ¡Acceso concedido!
                  </>
                ) : (
                  <>
                    Continuar
                    <ArrowRightIcon className="ml-2 size-8 md:size-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
    </>
  );
}
