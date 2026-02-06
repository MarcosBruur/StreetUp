
// components/teams/Teams.tsx - Vista de equipos con paleta azul/verde
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getTeamsByLeader } from "../../api/TeamsApi"
import { useAuth } from "../../hooks/useAuth";
import TeamCard from "../../components/team/TeamCard";
import CreateTeamModal from "../../components/team/CreateTeamModal";
import type { Profile, Team } from "../../types";
import { 
  UserGroupIcon, 
  PlusIcon, 
} from "@heroicons/react/24/outline";
import { 
  UserGroupIcon as UserGroupIconSolid,
} from "@heroicons/react/24/solid";
import { getProfile } from "../../api/ProfileApi";

export default function Team() {
  const { data: user } = useAuth();
  const navigate = useNavigate();


  const {data: profile} = useQuery<Profile>({
    queryKey: ["profile"],
    queryFn: getProfile,
    retry: 2,
  })
  
  // Consulta para obtener mis equipos
  const { data:teams } = useQuery<Team[]>({
    queryKey: ["teams", profile?.id],
    queryFn: ()=> getTeamsByLeader(profile?.id!),
    enabled: !!user?.id,
    retry: 2,
  });

 

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 via-blue-900 to-emerald-900">
        <div className="text-center p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
          <UserGroupIcon className="w-24 h-24 text-white/50 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Acceso restringido</h2>
          <p className="text-gray-300 mb-6">Inicia sesión para ver los equipos</p>
          <button
            onClick={() => navigate("/auth/login")}
            className="bg-linear-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 hover:scale-105"
          >
            Iniciar Sesión
          </button>
        </div>
      </div>
    );
  }

 
 if(teams) return (
    <div className="w-full md:w-auto my-10 min-h-screen rounded-2xl bg-linear-to-br from-gray-800 via-gray-900 to-black py-8 md:mx-5">
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
              <h1 className="text-3xl sm:text-4xl font-bold text-white">Mis Equipos</h1>
              <p className="text-gray-400">Crea y gestiona tu propio equipo deportivo</p>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex flex-wrap gap-3">
            <button
              className="flex items-center gap-2 bg-linear-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
              onClick={() => navigate(location.pathname + `?create=true`)}
            >
              <PlusIcon className="w-5 h-5" />
              Crear Equipos
            </button>
          </div>
        </div>


        {teams && teams.length > 0 ? (
          <div className="px-4 mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-linear-to-r from-blue-500/20 to-emerald-500/20">
                <UserGroupIconSolid className="w-6 h-6 text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Mis Equipos</h2>
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-sm">
                {teams.length} equipo{teams.length !== 1 ? 's' : ''}
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              { 
              
                teams.map((team) => (
                <TeamCard key={team.id} team={team} isMyTeam={true} />
              )) 
              }
              
            </div> 
          </div>
        ) : (
                <p className="text-gray-400 text-2xl text-center">
                  Aún no has creado ningun 
                  <span className="font-bold text-orange-600"> equipo propio</span>
                  , presiona en "crear 
                  equipos" para comenzar a crear y gestionar tus propios 
                  equipos deportivos.
                </p>
              )}

        {/* Modal de creación de equipo */}
        <CreateTeamModal />
      </div>
    </div>
  );
}