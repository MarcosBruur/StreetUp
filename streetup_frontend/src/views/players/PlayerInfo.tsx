import { useParams } from "react-router-dom";
import PlayerCardInfo from "../../components/players/PlayerCardInfo";

export default function PlayerInfo() {
  const { player_id } = useParams();
    
  if(player_id) return (
      <div className="w-full md:w-auto mt-10 min-h-screen rounded-2xl bg-linear-to-br from-gray-800 via-gray-900 to-black pt-8 md:mx-5">
        <div className="max-w-7xl mx-auto">
          
          <PlayerCardInfo player_id={player_id}/>
        </div>
      </div>
    );
}