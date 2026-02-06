import CreateTeamModal from "../../components/team/CreateTeamModal";
import { useState } from "react";

import {   
  MagnifyingGlassIcon,
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
  
  const [search, setSearch] = useState("");
  const [sport, setSport] = useState("");

  const {data: teams} = useQuery<Team[]>({
    queryKey: ['all_teams',search,sport],
    queryFn:  () => getTeams({ page: 1, page_size: 10,search,sport}),
    retry: 2,
  })

    
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
        <form onSubmit={(e) => {
          e.preventDefault();
        }}>
          <div className="px-4 mb-8">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Buscar equipos por nombre"
                    className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="flex gap-2">
                  <select
                    value={sport} 
                    onChange={(e) => setSport(e.target.value)}
                    className="px-4 py-3 bg-gray-900/50 border 
                    border-gray-700 rounded-lg 
                    text-white focus:outline-none focus:ring-2 
                    focus:ring-blue-500"
                    >
                    <option value="">Todos los deportes</option>
                    <option value="futbol">Fútbol</option>
                    <option value="basquet">Basquet</option>
                    <option value="tenis">Tenis</option>
                    <option value="padel">Pádel</option>
                    <option value="ciclismo">Ciclismo</option>
                  </select>
                 
                </div>
              </div>
            </div>
          </div>
        </form>
        
   
        {/* Equipos Recomendados */}
        <div className="px-4 mb-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-linear-to-r from-emerald-500/20 to-blue-500/20">
                <FireIconSolid className="w-6 h-6 text-emerald-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Equipos Recomendados</h2>
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