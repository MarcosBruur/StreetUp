// components/profiles/ProfileCard.tsx - Versión mejorada
import { 
  HandThumbUpIcon, 
  MapPinIcon, 
  TrophyIcon,
  UserGroupIcon,
  ChatBubbleLeftRightIcon,
  StarIcon,
} from "@heroicons/react/24/solid";
import { 
  MapPinIcon as MapPinOutline,
} from "@heroicons/react/24/outline";
import type { Profile, Team } from "../../types";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProfileById } from "../../api/ProfileApi";

type TeamInfoProps = {
  team: Team | undefined;
};

export default function TeamInfo({ team }: TeamInfoProps) {
  
  const navigate = useNavigate()

  const {data: leader} = useQuery<Profile>({
    queryKey: ['teamLeader',team?.leader],
    queryFn: ()=> getProfileById(team?.leader!),
    retry:2
  })


  if(team) return (
    <div className="relative">
      {/* Efectos de fondo decorativos */}
      <div className="absolute -top-20 -left-20 w-64 h-64 
      bg-fuchsia-500/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -right-20 w-64 h-64 
      bg-purple-600/10 rounded-full blur-3xl"></div>
      
      <div className="relative bg-linear-to-br from-gray-800 via-gray-900 to-black overflow-hidden border border-white/10 shadow-2xl backdrop-blur-sm">
        {/*Imagen de equipo*/}
        <div className="relative h-48 sm:h-80 bg-cover bg-center border border-white/30 border-b-0"
            style={{backgroundImage: `url(/static/static/teams/${team.photo}.jpg)`,
          }}
        >
          
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-linear-to-t from-gray-900 to-transparent"></div>
          
          {/* Badge de nombre de usuario */}
          <div className="absolute -bottom-10 left-8">
            <div className="flex items-end gap-4">
              

              {/* Información del usuario */}
              <div className="mb-4 ml-4">
                <h2 className="text-3xl sm:text-4xl font-bold text-white capitalize mb-2">
                  {team.name}
                  
                </h2>
                <p className="text-gray-300 flex items-center gap-2">
                  <MapPinOutline className="w-5 h-5" />
                  {team.location}
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
              

              {/* Card de descripción */}
              <div className="bg-linear-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-4">
                  <ChatBubbleLeftRightIcon className="w-6 h-6 text-fuchsia-500" />
                  Descripción
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  {team.description}
                </p>
              </div>
            </div>

            {/* Columna derecha - Información personal */}
            <div className="space-y-8">
              {/* Card de información */}
              <div className="bg-linear-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-6">Información de equipo</h3>
                
                <div className="space-y-6">
                  

                  <div className="flex items-center justify-between py-3 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <StarIcon className="w-5 h-5 text-fuchsia-500" />
                      <span className="text-gray-300">Lider</span>
                    </div>
                    <span className="font-semibold text-orange-600">{leader?.name}</span>
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <MapPinIcon className="w-5 h-5 text-fuchsia-500" />
                      <span className="text-gray-300">Ubicación</span>
                    </div>
                    <span className="text-white font-semibold text-end">{team.location}</span>
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <TrophyIcon className="w-5 h-5 text-fuchsia-500" />
                      <span className="text-gray-300">Deporte</span>
                    </div>
                    <span className="text-white font-semibold text-end">{team.sport}</span>
                  </div>
                </div>
              </div>

              {/* Card de equipos */}
              <div className="bg-linear-to-r from-gray-800/50 to-gray-900/50 rounded-xl p-6 border border-white/10">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <UserGroupIcon className="w-6 h-6 text-blue-500" />
                    Miembros
                  </h3>
                  <span className="text-sm text-fuchsia-400">Activo</span>
                </div>
              
              {/* {teams && teams.length === 0 ? (
                <p>No hay equipos creados aún</p>
              ): (
                  <div className="space-y-3">
                  {teams?.map((team, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-all duration-300"
                    >
                      <div className="flex items-center gap-3">
                        <div>
                          <div className="text-orange-600 font-medium">{team.name}</div>
                          <div className="text-gray-400 text-sm">{team.members.length === 0 ? 'Sin Miembros': `${team.members.length} Miembros`}</div>
                        </div>
                      </div>
                      <div className="text-xs px-2 py-1 bg-green-500/20 text-green-300 rounded-full">
                        Activo
                      </div>
                    </div>
                  ))}
                </div>
              )} */}
              
                <button
                onClick={()=>navigate("/error")}  
                className="w-full mt-4 py-2.5 text-center 
                text-fuchsia-400 hover:text-fuchsia-300 
                border border-fuchsia-500/30 rounded-lg 
                hover:border-fuchsia-500/50 transition-all 
                duration-300">
                  {team.members.length > 0 ? 'Ver miembros' : 'Buscar miembros'}
                </button>
              </div>
            </div>
          </div>

          

          {/* Estadísticas rápidas */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-fuchsia-500/30 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Partidos Jugados</p>
                <p className="text-3xl font-bold text-white">50</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-linear-to-r from-fuchsia-500/20 to-purple-600/20 flex items-center justify-center">
                <span className="text-fuchsia-400 text-xl">⚽</span>
              </div>
            </div>
            
          </div>

          

          

          <div className="bg-linear-to-r from-fuchsia-600/20 to-purple-600/20 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-fuchsia-500/30 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Me gusta recibidos</p>
                <p className="text-3xl font-bold text-white">{team.likes}</p>
              </div>
              <div className="animate-bounce size-12 rounded-full bg-linear-to-r from-fuchsia-500/20 to-purple-600/20 flex items-center justify-center">
                <span className="text-fuchsia-400 text-xl">
                  <HandThumbUpIcon className="size-8 text-fuchsia-400" />
                </span>
              </div>
            </div>
          </div>

          
        </div>
        </div>
      </div>
    </div>
  );
}