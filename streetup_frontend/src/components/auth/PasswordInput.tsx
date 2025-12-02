import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

interface Props {
  register: any;
  isConfirmField: boolean;
}

export default function PasswordInput({ register, isConfirmField }: Props) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative w-11/12">
      <input
        type={showPassword ? "text" : "password"}
        placeholder={`${isConfirmField ? "Repetir Contraseña" : "Contraseña"}`}
        className="bg-white p-2 w-full text-black pr-10"
        {...register(`${isConfirmField ? "repeatPassword" : "password"}`, {
          required: "Contraseña obligatoria",
          minLength: {
            value: 8,
            message: "Minimo 8 caracteres",
          },
        })}
      />

      {/* Ícono del ojo */}
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-2 top-1/2 -translate-y-1/2 text-black"
      >
        {showPassword ? (
          <EyeSlashIcon className="h-5 w-5" />
        ) : (
          <EyeIcon className="h-5 w-5" />
        )}
      </button>
    </div>
  );
}
