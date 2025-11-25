import type { Team } from "../../types";
import { MapPinIcon } from "@heroicons/react/24/solid";

export default function TeamCard({ team }: { team: Team }) {
  return (
    <>
      <div
        className="grid grid-rows-3 border-2 h-50 md:h-90 rounded-2xl py-2 w-full md:w-11/12 shadow-[0px_0px_42px_5px_rgba(147,_51,_234,_0.5)] bg-center bg-cover"
        style={{ backgroundImage: "url('/static/team.jpg')" }}
      >
        <div className="flex justify-center items-center">
          <h2 className="uppercase font-bold text-2xl text-green-500">
            {team.name}
          </h2>
        </div>

        <div className="text-start ml-5 mt-2 inline-grid gap-2 auto-cols-max">
          <div className="bg-gray-200/40 py-1 px-2 w-full">
            <p className="md:text-lg text-cyan-800 font-bold">
              Lider: <span className="font-black text-black"></span>
            </p>
          </div>
          <div className="bg-gray-200/40 py-1 px-2 w-full">
            <p className="md:text-lg text-cyan-800 font-bold">
              Miembros:{" "}
              <span className="font-black text-black">
                {team.members.length}
              </span>{" "}
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="bg-gray-200/40 py-1 px-2 w-full md:w-1/2 mt-5 flex gap-2 justify-center">
            <MapPinIcon className="w-5 h-auto" />
            <p className="md:text-lg font-bold ">Plaza Rafael Nuñez</p>
          </div>
        </div>
      </div>
    </>
  );
}
