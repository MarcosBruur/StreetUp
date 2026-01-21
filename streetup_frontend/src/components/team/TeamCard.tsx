// components/teams/TeamCard.tsx - Tarjeta de equipo con paleta azul/verde
import { 
  UserGroupIcon,
  MapPinIcon,
  HandThumbUpIcon
} from "@heroicons/react/24/outline";
import { 
  StarIcon as StarIconSolid,
} from "@heroicons/react/24/solid";
import type { Team } from "../../types";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../../api/UserApi";

type TeamCardProps = {
  team: Team;
  isMyTeam?: boolean;
};

export default function TeamCard({ team }: TeamCardProps) {
  const navigate = useNavigate();

  const {data:teamLeader} = useQuery({
    queryKey: ['teamLeader',team.leader],
    queryFn: ()=> getUserById(team.leader),
    enabled: !!team.leader
  })

  const getSportIcon = (sport: string) => {
    const icons: Record<string, string> = {
      'futbol': '⚽',
      'baloncesto': '🏀',
      'tenis': '🎾',
      'natacion': '🏊',
      'voley': '🏐',
      'rugby': '🏉',
      'default': '🏆'
    };
    return icons[sport.toLowerCase()] || icons.default;
  };

  return (
    <div className="group relative">
      {/* Efectos de fondo */}
      <div className="absolute -inset-0.5 bg-linear-to-r from-blue-500 to-emerald-500 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
      
      <div className="relative bg-linear-to-br from-gray-800 via-gray-900 to-black rounded-2xl overflow-hidden border border-white/10 shadow-xl hover:shadow-2xl hover:border-blue-500/30 transition-all duration-300">
        {/* Header con gradiente específico del deporte */}
        <div className="relative h-40 bg-cover bg-center" style={{
          backgroundImage: `url(/static/static/teams/${team.photo}.jpg)`,
        }}>
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-linear-to-t from-gray-900 to-transparent"></div>
          
          {/* Badge del deporte */}
          <div className="absolute top-4 left-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-black/50 backdrop-blur-sm">
              <span className="text-xl">{getSportIcon(team.sport)}</span>
              <span className="text-white font-medium capitalize">{team.sport}</span>
            </div>
          </div>
          <div className="absolute bottom-4 left-20 right-20">
            <div className="flex items-center justify-center gap-2 px-3 py-1.5 bg-black/50 backdrop-blur-sm">
              <p className="text-white font-medium capitalize">Equipo: <span className="font-bold text-lg text-orange-600">{team.name}</span></p>
            </div>
          </div>

        </div>

        {/* Contenido */}
        <div className="pt-12 pb-6 px-6">
          {/* Nombre y rating */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <h4 className="text-xl font-bold text-white ">
                Lider: <span className="border-b-2 border-fuchsia-700">{teamLeader?.userName}</span>
              </h4>
              <div className="flex items-center gap-2 mt-1">
                <MapPinIcon className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400 text-sm">{team.location}</span>
              </div>
            </div>
            
            
          </div>

          {/* Descripción */}
          <p className="text-gray-300 text-sm mb-6 line-clamp-2">
            {team.description || "Equipo apasionado por el deporte y la competencia sana."}
          </p>

          {/* Estadísticas */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
              <div className="flex items-center gap-2">
                <UserGroupIcon className="w-5 h-5 text-blue-400" />
                <span className="text-gray-400 text-sm">{team.members.length} Miembros</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
              <div className="flex items-center gap-2">
                <HandThumbUpIcon className="w-5 h-5 text-blue-400" />
                <span className="text-gray-400 text-sm">100 Me Gusta</span>
              </div>
            </div>
          </div>
          <div className="flex justify-around items-center">
            <button
                  onClick={() => navigate(`/teams/${team.id}`)}
                  className="px-4 py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors duration-300"
                >
                  Ver
            </button>
            <button
                  onClick={() => navigate(`/teams/${team.id}`)}
                  className="px-4 py-3 bg-green-800 hover:bg-green-700 hover:shadow-[0px_0px_13px_1px_#25cf64] transition-all text-gray-300 hover:text-white  duration-300"
                >
                  Editar
            </button>
          </div>
            
          </div>
        </div>
      </div>
    
  );
}