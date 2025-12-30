// components/profiles/ProfileCard.tsx - Versión mejorada
import { 
  HandThumbUpIcon, 
  MapPinIcon, 
  CalendarDaysIcon,
  TrophyIcon,
  UserGroupIcon,
  ChatBubbleLeftRightIcon
} from "@heroicons/react/24/solid";
import { 
  HandThumbUpIcon as HandThumbUpOutline,
  MapPinIcon as MapPinOutline,
} from "@heroicons/react/24/outline";
import type { ActiveUser, Profile } from "../../types";

type ProfileCardProps = {
  user: ActiveUser | undefined;
  profile: Profile | undefined;
};

export default function ProfileCard({ user, profile }: ProfileCardProps) {
  if (!user || !profile) return null;

  return (
    <div className="relative">
      {/* Efectos de fondo decorativos */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-fuchsia-500/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl"></div>
      
      <div className="relative bg-linear-to-br from-gray-800 via-gray-900 to-black rounded-2xl overflow-hidden border border-white/10 shadow-2xl backdrop-blur-sm">
        {/* Header con gradiente */}
        <div className="relative h-48 sm:h-56 bg-linear-to-r from-fuchsia-700 via-purple-700 to-violet-800">
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-linear-to-t from-gray-900 to-transparent"></div>
          
          {/* Badge de nombre de usuario */}
          <div className="absolute -bottom-10 left-8">
            <div className="flex items-end gap-4">
              {/* Foto de perfil */}
              <div className="relative group">
                <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-gray-900 overflow-hidden shadow-2xl">
                  <img
                    src={`${profile.photo_view}`}
                    alt={user.userName}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 rounded-full border-2 border-fuchsia-500/30 group-hover:border-fuchsia-500 transition-all duration-300"></div>
                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-linear-to-r from-fuchsia-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold">★</span>
                </div>
              </div>

              {/* Información del usuario */}
              <div className="mb-4 ml-4">
                <h2 className="text-3xl sm:text-4xl font-bold text-white capitalize mb-2">
                  {user.userName}
                  <span className="ml-3 text-sm font-normal bg-fuchsia-500/20 text-fuchsia-300 px-3 py-1 rounded-full">
                    Nivel 15
                  </span>
                </h2>
                <p className="text-gray-300 flex items-center gap-2">
                  <MapPinOutline className="w-5 h-5" />
                  {profile.location}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="pt-20 sm:pt-24 pb-8 px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Columna izquierda - Estadísticas */}
            <div className="lg:col-span-2 space-y-8">
              {/* Card de estadísticas */}
              <div className="bg-linear-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-6 border border-white/10">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <TrophyIcon className="w-6 h-6 text-yellow-500" />
                    Estadísticas
                  </h3>
                  <div className="text-sm text-gray-400">Esta temporada</div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="bg-gray-800/50 rounded-lg p-4 text-center hover:bg-gray-800 transition-all duration-300">
                    <div className="text-3xl font-bold text-white mb-1">50</div>
                    <div className="text-gray-400 text-sm">Partidos</div>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-4 text-center hover:bg-gray-800 transition-all duration-300">
                    <div className="text-3xl font-bold text-white mb-1">80</div>
                    <div className="text-gray-400 text-sm flex items-center justify-center gap-1">
                      <HandThumbUpOutline className="w-4 h-4" />
                      Me Gusta
                    </div>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-4 text-center hover:bg-gray-800 transition-all duration-300">
                    <div className="text-3xl font-bold text-white mb-1">3</div>
                    <div className="text-gray-400 text-sm">Equipos</div>
                  </div>
                </div>
              </div>

              {/* Card de descripción */}
              <div className="bg-linear-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-4">
                  <ChatBubbleLeftRightIcon className="w-6 h-6 text-fuchsia-500" />
                  Sobre Mí
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  {profile.description || "¡Apasionado por los deportes y siempre listo para un nuevo desafío!"}
                </p>
              </div>
            </div>

            {/* Columna derecha - Información personal */}
            <div className="space-y-8">
              {/* Card de información */}
              <div className="bg-linear-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-6">Información Personal</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <CalendarDaysIcon className="w-5 h-5 text-fuchsia-500" />
                      <span className="text-gray-300">Edad</span>
                    </div>
                    <span className="text-white font-semibold">{profile.age} años</span>
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <MapPinIcon className="w-5 h-5 text-fuchsia-500" />
                      <span className="text-gray-300">Ubicación</span>
                    </div>
                    <span className="text-white font-semibold">{profile.location}</span>
                  </div>

                  <div className="py-3">
                    <div className="flex items-center gap-3 mb-3">
                      <TrophyIcon className="w-5 h-5 text-fuchsia-500" />
                      <span className="text-gray-300">Deportes</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {profile.sports.map((sport, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1.5 bg-linear-to-r from-fuchsia-500/20 to-purple-600/20 text-fuchsia-300 rounded-full text-sm border border-fuchsia-500/30"
                        >
                          {sport}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card de equipos */}
              <div className="bg-linear-to-r from-gray-800/50 to-gray-900/50 rounded-xl p-6 border border-white/10">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <UserGroupIcon className="w-6 h-6 text-blue-500" />
                    Mis Equipos
                  </h3>
                  <span className="text-sm text-fuchsia-400">Activo</span>
                </div>

                <div className="space-y-3">
                  {["Los Tigres FC", "Dragones Unidos", "Águilas Reales"].map((team, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-all duration-300"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-linear-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                          <span className="text-white font-bold">{team.charAt(0)}</span>
                        </div>
                        <div>
                          <div className="text-white font-medium">{team}</div>
                          <div className="text-gray-400 text-sm">5 miembros</div>
                        </div>
                      </div>
                      <div className="text-xs px-2 py-1 bg-green-500/20 text-green-300 rounded-full">
                        Activo
                      </div>
                    </div>
                  ))}
                </div>

                <button className="w-full mt-4 py-2.5 text-center text-fuchsia-400 hover:text-fuchsia-300 border border-fuchsia-500/30 rounded-lg hover:border-fuchsia-500/50 transition-all duration-300">
                  Ver todos los equipos
                </button>
              </div>
            </div>
          </div>

          {/* Badge de likes */}
          <div className="mt-8 flex justify-center">
            <div className="inline-flex items-center gap-4 bg-linear-to-r from-fuchsia-600/20 to-purple-600/20 px-8 py-4 rounded-2xl border border-fuchsia-500/30">
              <HandThumbUpIcon className="w-8 h-8 text-fuchsia-400" />
              <div className="text-center">
                <div className="text-3xl font-bold text-white">80</div>
                <div className="text-gray-300">Me Gusta Recibidos</div>
              </div>
              <div className="w-12 h-12 rounded-full bg-linear-to-r from-fuchsia-600 to-purple-600 flex items-center justify-center shadow-lg">
                <span className="text-white text-lg">🔥</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}