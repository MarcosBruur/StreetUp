// NewProfile.tsx
import NewProfileForm from "../../components/profiles/NewProfileForm";
import { useAuth } from "../../hooks/useAuth";
import { UserPlusIcon,} from "@heroicons/react/24/solid";

export default function NewProfile() {
  const { data } = useAuth();

  return (
    <div className="mt-10 min-h-screen sm:px-8 sm:pb-8 lg:px-10 lg:pb-10">
      <div className="w-full md:max-w-4xl">
        {/* Header animado */}
        <div className="text-center mb-10">
          <div className="inline-block mb-6 relative">
            
            <div className="size-20 bg-orange-500 rounded-full flex items-center justify-center shadow-2xl">
              <UserPlusIcon className="w-10 h-10 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Crear tu <span className="bg-linear-to-r from-fuchsia-400 to-purple-400 bg-clip-text text-transparent">Perfil</span>
          </h1>
          
          <div className="max-w-2xl mx-auto">
            <p className="text-lg sm:text-xl leading-relaxed">
              ¡Bienvenido a <span className="font-bold">StreetUp</span>{" "}
              <span className="capitalize font-bold bg-linear-to-r from-fuchsia-400 to-purple-400 bg-clip-text text-transparent">{data?.userName}</span>
              <br />
              <span className="text-orange-600 font-bold bg-neutral-900 p-1">Completa tu perfil para empezar a conectar con otros jugadores.</span>
            </p>
          </div>

           
        </div>
        </div>

        {/* Formulario */}
        <div className="relative">
          <div className="relative">
            <NewProfileForm />
          </div>
        </div>


      </div>
    
  );
}