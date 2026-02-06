// components/profiles/Profile.tsx - Versión mejorada
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../../api/ProfileApi";
import { useAuth } from "../../hooks/useAuth";
import type { Profile, Team } from "../../types";
import { getTeamsByUser } from "../../api/TeamsApi";
import { useParams } from "react-router-dom";
import PlayerCardInfo from "../../components/players/PlayerCardInfo";

export default function PlayerInfo() {
  const { data: user } = useAuth();
  const navigate = useNavigate();
  const { player_id } = useParams();
    
  const { data: profile, isLoading } = useQuery<Profile>({
    queryKey: ["profile"],
    queryFn: getProfile,
    retry: 2,
  });

  
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 via-purple-900 to-violet-900">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-fuchsia-500 mb-4"></div>
          <p className="text-white text-xl font-semibold">Cargando tu perfil...</p>
        </div>
      </div>
    );
  }


 if(player_id) return (
    <div className="w-full md:w-auto mt-10 min-h-screen rounded-2xl bg-linear-to-br from-gray-800 via-gray-900 to-black pt-8 md:mx-5">
      <div className="max-w-7xl mx-auto">
        
        <PlayerCardInfo player_id={player_id}/>
      </div>
    </div>
  );
}