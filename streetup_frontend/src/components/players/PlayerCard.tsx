import { getProfile } from "../../api/ProfileApi";
import type { User } from "../../types";
import { useQuery } from "@tanstack/react-query";

export default function PlayerCard({ player }: { player: User }) {
  const { data } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getProfile(),
  });

  if (data)
    return (
      <>
        <div className="bg-white h-36 py-2 w-full border-cyan-700 border-2 shadow-[0px_0px_29px_-5px_rgba(59,130,246,0.5)]">
          <div className="flex gap-5">
            <div className="flex justify-center flex-1 ">
              <img
                src="/static/player.jpg"
                alt="imagen player"
                className="w-32 h-32 object-cover rounded-xl ml-2"
              />
            </div>
            <div className="flex-2 text-center">
              <h2 className="font-bold text-green-800">{player.userName}</h2>
              <div className="mt-3 text-start grid gap-3">
                <p>
                  Deportes <span className="font-bold">{data.sports}</span>
                </p>
                <p>
                  Estilo <span className="font-bold">Atacante</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}
