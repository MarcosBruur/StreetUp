// components/teams/TeamCard.tsx - Tarjeta de equipo con paleta azul/verde
import { 
  UserGroupIcon,
  MapPinIcon,
  HandThumbUpIcon
} from "@heroicons/react/24/outline";
import type { Profile, Team } from "../../types";
import { useQuery } from "@tanstack/react-query";
import EditTeamModal from "./EditTeamModal";
import { getProfileById } from "../../api/ProfileApi";
import { sendLike } from "../../api/TeamsApi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

type TeamCardProps = {
  team: Team;
  isMyTeam?: boolean;
};

export default function TeamCardMini({ team }: TeamCardProps) {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(team.likes);
  const {data:teamLeader} = useQuery<Profile>({
    queryKey: ['teamLeader',team.leader],
    queryFn: ()=> getProfileById(team.leader),
    enabled: !!team.leader
  })

  return (
    <div className="group relative">
      {/* Efectos de fondo */}
      <div className="absolute -inset-0.5 bg-linear-to-r from-blue-500 to-emerald-500 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
      
      <div className="relative bg-linear-to-br from-gray-800 via-gray-900 to-black rounded-2xl overflow-hidden border border-white/10 shadow-xl hover:shadow-2xl hover:border-blue-500/30 transition-all duration-300">
        {/* Header con gradiente específico del deporte */}
        <div className="relative h-40 bg-cover bg-center" style={{
    backgroundImage: `url(/static/static/teams/${team.photo}.jpg?v=${Date.now()})`,
  }}>
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-linear-to-t from-gray-900 to-transparent"></div>
          
          
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
                Lider: <span className="border-b-2 border-fuchsia-700">{teamLeader?.name}</span>
              </h4>
              <div className="flex items-center gap-2 mt-1">
                <MapPinIcon className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400 text-sm">{team.location}</span>
              </div>
            </div>
            
            
          </div>
          {/*Deporte*/}
          <p className="text-gray-300 text-sm mb-b line-clamp-2">
          <span className="font-bold">Deporte:</span> {team.sport}
          </p>

          {/* Descripción */}
          <p className="text-gray-300 text-sm mb-6 line-clamp-2">
            {team.description}
          </p>

          {/* Estadísticas */}
          
            <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
              <div className="flex justify-center items-center gap-2">
                <UserGroupIcon className="w-5 h-5 text-blue-400" />
                <span className="text-gray-400 text-sm ">{team.members.length} Miembros</span>
              </div>
            </div>
          
          <div className="flex flex-col gap-4 mt-5">
            
            <div className="flex flex-col justify-center items-center gap-2">
              <div className="flex justify-center items-center gap-2">
                <button
                                    onClick={async () => {
                                      await sendLike(team.id);
                                      setLiked(true);
                                      setLikes((prev) => prev + 1);
                
                                      setTimeout(() => setLiked(false), 2000);
                                    }}
                                    className="px-2 py-1 rounded-full bg-purple-800 border-white 
                                    hover:bg-purple-700 hover:scale-110 transition-all 
                                    text-gray-300 hover:text-white duration-300"
                                  >
                                    <HandThumbUpIcon className="size-5"/>
                                  </button>
                                  <p>Me Gusta</p>
                
                                  {liked && (
                                    <p className="text-green-600 font-bold animate-fade-up">
                                      +1 Like
                                    </p>
                                  )}
                
              </div>
                                  <p className="text-fuchsia-700 font-bold">{likes}</p>
              
              <button
                    onClick={()=> navigate(`/teams/${team.id}`)}
                    className="bg-linear-to-r from-gray-800 
                    to-gray-900 hover:from-gray-700 
                    hover:to-gray-800 text-white px-8 py-3 
                    font-bold transition-all duration-300 
                    hover:scale-105 
                    border border-fuchsia-500/30"
                  >
                  Ver Más
              </button>
            </div>
          </div>
          
            
          </div>
        </div>
        <EditTeamModal/>
      </div>
    
  );
}