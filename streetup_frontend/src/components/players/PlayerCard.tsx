import { getProfile, sendLike } from "../../api/ProfileApi";
import type { Profile } from "../../types";
import { useQuery } from "@tanstack/react-query";
import {MapPinIcon,HandThumbUpIcon} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


export default function PlayerCard({ player }: { player: Profile }) {
  const { data } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getProfile(),
  });

  const navigate = useNavigate();

  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(player.likes);


  if (data)
    return (
      <>
        <div className="bg-white py-2 border-cyan-700 border-2"
          style={{ backgroundImage: `url(/static/static/font_white.jpeg)`}}
        >
          <div className="flex gap-5">
              <img
                src={`media/${player.photo}`}
                alt="imagen player"
                className="size-35 object-cover rounded-xl ml-2 border border-cyan-700"
              />
            <div className="text-center text-black">
              <h2 className="font-bold text-orange-600 text-lg">{player.name}</h2>
              <div className="mt-3 text-start grid gap-3">
                <p className="flex gap-2">
                  <MapPinIcon className="size-5"/>
                   <span className="font-bold">{player.location}</span>
                </p>
                <p>
                  Deportes <span className="font-bold">{
                  player.sports.map((sport) => sport).join(", ")
                  }</span>
                </p>
              </div>
              <div className="flex gap-5 justify-around mt-3">
                <button 
                  onClick={()=> navigate(`/players/${player.id}`)}
                  className="px-3 py-2 bg-cyan-700 
                  hover:bg-cyan-600"
                >
                  Ver Más
                </button>
                <div className="flex flex-col gap-1 justify-center items-center">
                  <div className="flex justify-center items-center gap-2">
                    <button
                      onClick={async () => {
                        await sendLike(player.id);
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
                  </div>
                  
                  {liked && (
                    <p className="text-green-600 font-bold animate-fade-up">
                      +1 Like
                    </p>
                  )}

                <p className="text-fuchsia-700 font-bold">{likes}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}
