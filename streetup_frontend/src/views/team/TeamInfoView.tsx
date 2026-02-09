// components/profiles/Profile.tsx - Versión mejorada
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../hooks/useAuth";
import type {  Team } from "../../types";
import {  UserCircleIcon } from "@heroicons/react/24/outline";
import { ArrowUturnLeftIcon  } from "@heroicons/react/24/solid";
import { getTeamById } from "../../api/TeamsApi";
import TeamInfo from "../../components/team/TeamInfo";
import { useParams } from "react-router-dom";
import EditTeamModal from "../../components/team/EditTeamModal";


export default function TeamInfoView() {
  const { data: user } = useAuth();
  const navigate = useNavigate();

  const { team_id } = useParams();


  const { data: team, isLoading } = useQuery<Team>({
    queryKey: ["team",team_id],
    queryFn: ()=>getTeamById(team_id!),
    retry: 2,
  });

  // Estado de carga mejorado
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 via-purple-900 to-violet-900">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-fuchsia-500 mb-4"></div>
          <p className="text-white text-xl font-semibold">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!user ) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 via-purple-900 to-violet-900">
        <div className="text-center p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
          <UserCircleIcon className="w-24 h-24 text-white/50 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Perfil no encontrado</h2>
          <p className="text-gray-300 mb-6">Inicia sesión para ver tu perfil</p>
          <button
            onClick={() => navigate("/auth/login")}
            className="bg-linear-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-700 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 hover:scale-105"
          >
            Iniciar Sesión
          </button>
        </div>
      </div>
    );
  }

  return (
    
    <div>
            <div className="flex justify-end mr-10">
            <button
          onClick={()=> 
            { const path = location.pathname.split("/");
                          path.pop(); 
              navigate(path.join("/"));
            }} 
          className="hidden sm:flex items-center gap-2 
          bg-linear-to-r from-gray-800 to-gray-900 
          hover:from-gray-700 hover:to-gray-800 
          text-white px-8 py-3 rounded-xl font-bold 
          transition-all duration-300 hover:scale-105 
          hover:shadow-[0_0_30px_rgba(224,46,250,0.5)] border 
          border-fuchsia-500/30"
          >
            <div className="flex gap-2 items-center justify-center">
              <ArrowUturnLeftIcon className="size-5" />
              <p>Volver</p>
            </div>
            
        </button>
            </div>
            
    <div className="w-full md:w-auto mt-10 min-h-screen rounded-2xl bg-linear-to-br from-gray-800 via-gray-900 to-black md:mx-5">
      
      <div className="max-w-7xl mx-auto">
        
        {/* Tarjeta de perfil */}
        
        <TeamInfo team={team}/>

            

        {/* Modal de edición */}
        <EditTeamModal />
      </div>
    </div>
    </div>
  );
}