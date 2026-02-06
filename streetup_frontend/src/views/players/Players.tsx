import { useState } from "react";

import {   
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { 
  UserIcon,
} from "@heroicons/react/24/solid";
import { useQuery } from "@tanstack/react-query";
import type { Profile } from "../../types";
import PlayerCard from "../../components/players/PlayerCard";
import { getProfiles } from "../../api/ProfileApi";

export default function Players() {
  const [search, setSearch] = useState("");
  
  const {data: profiles} = useQuery<Profile[]>({
    queryKey: ['all_profiles',search],
    queryFn: ()=> getProfiles({search}),
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
                <UserIcon className="w-10 h-10 text-white" />
              </div>
              
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white">Jugadores</h1>
              <p className="text-gray-400">Mira perfiles de otros jugadores</p>
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
                    placeholder="Buscar jugadores por nombre"
                    className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

              </div>
            </div>
          </div>
        </form>
        
        <div className="px-4 mb-12">
          {
            profiles && profiles.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {profiles.map((profile) => (
                  <PlayerCard key={profile.id} player={profile}/>
                ) )}
              </div>
            )
          }

        

      </div>
    </div>
    </div>
  );
}