
// components/teams/Teams.tsx - Vista de equipos con paleta azul/verde
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import CreateTeamModal from "../../components/team/CreateTeamModal";

import { 
  UserGroupIcon,  
  MagnifyingGlassIcon,
  TrophyIcon,
  
} from "@heroicons/react/24/outline";
import { 
  UserGroupIcon as UserGroupIconSolid,
  FireIcon as FireIconSolid
} from "@heroicons/react/24/solid";
import { useQuery } from "@tanstack/react-query";
import { getTeams } from "../../api/TeamsApi";
import type { Team } from "../../types";
import TeamCardMini from "../../components/team/TeamCardMini";

export default function Teams() {
  const { data: user } = useAuth();
  const navigate = useNavigate();

  const {data: teams} = useQuery<Team[]>({
    queryKey: ['all_teams'],
    queryFn:  () => getTeams({ page: 1, page_size: 10 }),
    retry: 2,
  })
  console.log(teams);
    
  return (
    <div className="w-full md:w-auto pb-2 my-10 min-h-screen rounded-2xl bg-linear-to-br from-gray-800 via-gray-900 to-black pt-8 md:mx-5">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="px-4 flex flex-col sm:flex-row justify-between items-center mb-8 sm:mb-12 gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-linear-to-r from-blue-500 to-emerald-600 flex items-center justify-center shadow-xl">
                <UserGroupIconSolid className="w-10 h-10 text-white" />
              </div>
              
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white">Equipos</h1>
              <p className="text-gray-400">Encuentra y únete a equipos deportivos</p>
            </div>
          </div>

          
        </div>

        {/* Barra de búsqueda y filtros */}
        <div className="px-4 mb-8">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-white/10">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar equipos por nombre, deporte o ubicación..."
                  className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex gap-2">
                <select className="px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Todos los deportes</option>
                  <option value="futbol">Fútbol</option>
                  <option value="baloncesto">Baloncesto</option>
                  <option value="tenis">Tenis</option>
                  <option value="natacion">Natación</option>
                </select>
                <button className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors duration-300">
                  Filtrar
                </button>
              </div>
            </div>
          </div>
        </div>
   
        {/* Equipos Recomendados */}
        <div className="px-4 mb-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-linear-to-r from-emerald-500/20 to-blue-500/20">
                <FireIconSolid className="w-6 h-6 text-emerald-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Equipos Recomendados</h2>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <TrophyIcon className="w-5 h-5" />
              <span>Basado en tus deportes favoritos</span>
            </div>
          </div>
          
          {
            teams && teams.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {teams.map((team: Team) => (
                  <TeamCardMini key={team.id} team={team} />
                ) )}
              </div>
            )
          }

        

        {/* Modal de creación de equipo */}
        <CreateTeamModal />
      </div>
    </div>
    </div>
  );
}