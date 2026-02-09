import { getProfile, sendLike } from "../../api/ProfileApi";
import type { Profile } from "../../types";
import { useQuery } from "@tanstack/react-query";
import {HandThumbUpIcon} from "@heroicons/react/24/outline";
import {MapPinIcon,} from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


export default function PlayerCard({ player }: { player: Profile }) {
  const navigate = useNavigate();

  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(player.likes);


  const { data } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getProfile(),
  });



  if (data)
    return (
      <>
        <div className="bg-white py-2 border-cyan-700 border-2"
          style={{ backgroundImage: `url(/static/static/font_white.jpeg)`}}
        >
          <div className="flex gap-2 justify-between">
            <img
              src={`media/${player.photo}`}
              alt="imagen player"
              className="size-35 object-cover rounded-xl ml-2 border border-cyan-700"
            />
            <div className="text-center text-black w-full">
              <div className="flex justify-between px-2 items-center">
                <h2 className="font-bold text-orange-600 text-lg">{player.name}</h2>
                <div className="flex gap-2 bg-purple-700 px-3 py-2 text-white">
                  <HandThumbUpIcon className="size-5"/>
                  <p className="font-bold">{likes}</p>
                </div>
              </div>
              <div className="mt-3 text-start grid gap-3">
                <p className="flex gap-2">
                  <MapPinIcon className="size-5 text-red-600"/>
                   <span className="font-bold">{player.location}</span>
                </p>
                <p>
                  Deportes <span className="font-bold">{
                  player.sports.map((sport) => sport).join(", ")
                  }</span>
                </p>
              </div>   
              </div>
            </div>
            <div className="flex gap-5 justify-end mt-2 mr-3">
                <button 
                    onClick={()=> navigate(`/error`)}
                    className="px-3 py-2 bg-orange-600 
                    hover:bg-orange-500 hover:scale-110 transition-all"
                  >
                  Reclutar
                </button>
                <button 
                  onClick={()=> navigate(`/players/${player.id}`)}
                  className="px-3 py-2 bg-cyan-700 
                  hover:bg-cyan-600 hover:scale-110 transition-all"
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
                        setTimeout(() => setLiked(false), 1200);
                      }}
                      className="relative px-2 py-1 bg-purple-800 border-white 
                      hover:bg-purple-700 hover:scale-110 transition-all 
                      text-gray-300 hover:text-white duration-300 overflow-hidden"
                    >
                      <div className="flex flex-col justify-center items-center">
                        <HandThumbUpIcon className="size-5" />
                        <p>Me Gusta</p>
                      </div>

                      {liked && (
                        <span className="absolute right-0 top-0  
                        text-green-400 font-bold pointer-events-none
                        animate-fade-up animate-ease-in-out">
                          +1
                        </span>
                      )}
                    </button>
                  
                  </div>
                  
                  

                </div>
          </div>
        </div>
      </>
    );
}
