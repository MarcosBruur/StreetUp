// components/teams/TeamCard.tsx - Tarjeta de equipo con paleta azul/verde
import { 
  UserGroupIcon,
  MapPinIcon,
  TrophyIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";
import { 
  StarIcon as StarIconSolid,
} from "@heroicons/react/24/solid";
import type { Team } from "../../types";
import { useNavigate } from "react-router-dom";

type TeamCardProps = {
  team: Team;
  isMyTeam?: boolean;
};

export default function TeamCard({ team }: TeamCardProps) {
  const navigate = useNavigate();

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
            <div className="flex items-center gap-2 px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-full">
              <span className="text-xl">{getSportIcon(team.sport)}</span>
              <span className="text-white font-medium capitalize">{team.sport}</span>
            </div>
          </div>

        </div>

        {/* Contenido */}
        <div className="pt-12 pb-6 px-6">
          {/* Nombre y rating */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300">
                {team.name}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <MapPinIcon className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400 text-sm">{team.location}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-1">
              <StarIconSolid className="w-5 h-5 text-yellow-500" />
              {/* <span className="text-white font-bold">{team.rating}</span> */}
              <span className="text-gray-500 text-sm">/5</span>
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
                <span className="text-gray-400 text-sm">Miembros</span>
              </div>
              <div className="flex items-center">
                <span className="text-white font-bold">{team.members}</span>
                {/* <span className="text-gray-500 text-sm ml-1">/{team.maxMembers}</span> */}
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
              <div className="flex items-center gap-2">
                <TrophyIcon className="w-5 h-5 text-emerald-400" />
                <span className="text-gray-400 text-sm">Victorias</span>
              </div>
              {/* <span className="text-white font-bold">{team.wins}</span> */}
            </div>
          </div>

          {/* Frecuencia de partidos */}
          <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg mb-6">
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-blue-400" />
              <span className="text-gray-400 text-sm">Próximo partido</span>
            </div>
            {/* <span className="text-emerald-400 text-sm font-medium">
              {team.nextMatch ? new Date(team.nextMatch).toLocaleDateString() : 'Por definir'}
            </span> */}
          </div>

          {/* Botones de acción */}
          {/* <div className="flex gap-3">
            {isMyTeam ? (
              <button
                onClick={() => navigate(`/teams/${team.id}`)}
                className="flex-1 bg-linear-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 text-center"
              >
                Ver Equipo
              </button>
            ) : team.members >= team.maxMembers ? (
              <button
                disabled
                className="flex-1 bg-gray-700 text-gray-400 font-semibold py-3 rounded-lg cursor-not-allowed text-center"
              >
                Equipo Completo
              </button>
            ) : (
              <button
                onClick={() => navigate(`/teams/${team.id}/join`)}
                className="flex-1 bg-linear-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 text-center flex items-center justify-center gap-2"
              >
                <UserPlusIcon className="w-5 h-5" />
                Unirse
              </button>
            )} */}
            
            <button
              onClick={() => navigate(`/teams/${team.id}`)}
              className="px-4 py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-lg transition-colors duration-300"
            >
              Ver
            </button>
          </div>
        </div>
      </div>
    
  );
}