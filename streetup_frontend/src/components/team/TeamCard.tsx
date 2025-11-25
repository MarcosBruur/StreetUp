import { HandThumbUpIcon } from "@heroicons/react/24/solid";
import type { Team } from "../../types";
import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../../api/UserApi";
import AnimatedButton from "../global/AnimatedButton";

type TeamCardProps = {
  team: Team;
};

export default function TeamCard({ team }: TeamCardProps) {
  const { data } = useQuery({
    queryKey: ["user", team.leader],
    queryFn: ({ queryKey }) => getUserById(queryKey[1]),
  });

  if (data)
    return (
      <>
        <div
          className="shadow-[0px_0px_53px_17px_rgba(147,51,234,0.5)] w-full md:w-1/2 h-11/12 
                    border-10 border-double border-violet-700 rounded-xl 
                    bg-linear-to-b from-purple-900 via-purple-950 to-purple-900"
        >
          <div className="flex flex-col gap-2">
            <p className=" bg-black/60  text-xl font-bold capitalize text-white px-2 py-5 text-center ">
              {team.name}
            </p>

            <div
              className="relative h-64 md:h-80 rounded-xl bg-cover bg-center"
              style={{ backgroundImage: "url('/static/team.jpg')" }}
            >
              <div className="absolute inset-0 flex items-center justify-end p-4">
                <div className="flex flex-col bg-black/50 px-5 py-8">
                  <p className="font-medium text-lg text-yellow-400">
                    50 Partidos
                  </p>
                  <p className="font-medium text-lg text-green-400">
                    34 Victorias
                  </p>
                  <p className="font-medium text-lg text-white">
                    Lider:{" "}
                    <span className="font-bold capitalize">
                      {data.userName}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Me gusta */}
            <div className="flex justify-start items-center">
              <div className="bg-blue-600/50 px-4 py-2 ml-2 rounded-xl">
                <div className="flex gap-2 items-center justify-center">
                  <HandThumbUpIcon className="w-8 h-8 text-fuchsia-600" />
                  <p className="font-medium text-lg text-white">
                    <span className="font-bold text-xl">80</span> Me Gusta
                  </p>
                </div>
              </div>
            </div>

            <div className="grid shadow-[0px_5px_53px_-4px_rgba(147,51,234,0.5)]">
              <div className="border-b-2 border-white inline-block w-fit ml-2 ">
                <p className="font-bold text-lg ">
                  Miembros{" "}
                  <span className="font-normal">{team.members.length}</span>
                </p>
              </div>

              <div className="border-b-2 border-white inline-block w-fit ml-2">
                <p className="font-bold text-lg  capitalize">
                  Ubicación:
                  <span className="font-normal"> {team.location}</span>
                </p>
              </div>
            </div>

            {/* Descripción */}
            <div className="bg-black/40 px-4 py-2 m-2 rounded-xl">
              <div className="flex gap-2 items-center justify-center">
                <h2 className="font-medium text-lg text-white">
                  {team.description}
                </h2>
              </div>
            </div>
          </div>
        </div>

        <AnimatedButton>Editar</AnimatedButton>
      </>
    );
}
