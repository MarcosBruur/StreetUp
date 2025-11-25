import { Link } from "react-router-dom";
import CreateTeamModal from "../../components/team/CreateTeamModal";
import { useQuery } from "@tanstack/react-query";
import { getTeamByUser } from "../../api/TeamsApi";

import { HandThumbUpIcon } from "@heroicons/react/24/solid";

export default function Team() {
  const { data } = useQuery({
    queryKey: ["team"],
    queryFn: getTeamByUser,
    retry: 1,
  });

  if (data)
    return (
      <>
        <h1 className="text-2xl font-bold">Mi Equipo</h1>

        {data?.length > 0 ? (
          data.map((team) => (
            <>
              <div className="md:hidden flex justify-center">
                <button
                  className="bg-gray-700 hover:bg-gray-600 hover:scale-110 transition-colors text-white px-15 py-2 
      rounded uppercase font-bold text-lg"
                  onClick={() => {}}
                >
                  Editar
                </button>
              </div>

              <div
                className="shadow-[0px_0px_53px_17px_rgba(147,51,234,0.5)] w-full md:w-1/2 h-11/12 
                    border-10 border-double border-violet-700 grid grid-rows-5 grid-cols-6 rounded-xl 
                    bg-linear-to-b from-purple-900 via-purple-950 to-purple-900"

                // style={{
                //bg-[url('/static/font_graffiti_cel.jpg')] md:bg-[url('/static/font_graffiti.jpg')]
                //   backgroundImage:
                //     "url('/static/font_graffiti_cel.jpg') md:url('/static/font_graffiti.jpg')",
                //   backgroundSize: "cover",
                //   backgroundPosition: "center",
                // }}
              >
                <div className="col-start-1 col-end-7">
                  <h2 className=" bg-black/60  text-xl font-bold capitalize text-white px-2 py-5 text-center ">
                    {team.name}
                  </h2>
                </div>

                <div className="col-start-1 col-end-7 row-start-2 row-end-4 grid md:grid-cols-5 p-2 overflow-hidden gap-2">
                  <div className="flex justify-center md:col-start-1 md:col-end-3">
                    <img
                      src={`/media/profiles/.jpeg`}
                      alt="imagen perfil"
                      className="h-full rounded-xl "
                    />
                  </div>

                  <div className="md:col-start-4 md:col-end-7 bg-black/40 p-2 rounded-xl shadow-[0px_5px_71px_1px_rgba(0,0,0,0.35)]">
                    <p className="font-bold text-white text-xl border-b-2">
                      50 Partidos
                    </p>
                    <p className="font-bold text-white text-xl border-b-2">
                      Ubicacion
                    </p>
                  </div>
                </div>

                <div className="py-3 col-start-1 col-end-7 row-start-4 row-end-6 grid gap-2  mt-2 bg-black/40">
                  {/* Me gusta */}
                  <div className="flex justify-start items-center">
                    <div className="bg-blue-600/50 px-4 py-2 ml-2 rounded-xl">
                      <div className="flex gap-2 items-center justify-center">
                        <HandThumbUpIcon className="w-8 h-8 text-fuchsia-600" />
                        <h2 className="font-medium text-lg text-white">
                          <span className="font-bold text-xl">80</span> Me Gusta
                        </h2>
                      </div>
                    </div>
                  </div>

                  <div className="grid shadow-[0px_5px_53px_-4px_rgba(147,51,234,0.5)]">
                    <div className="border-b-2 border-white inline-block w-fit ml-2 ">
                      <p className="font-bold text-lg ">
                        Miembros{" "}
                        <span className="font-normal">
                          {team.members.length}
                        </span>
                      </p>
                    </div>

                    <div className="border-b-2 border-white inline-block w-fit ml-2">
                      <p className="font-bold text-lg  capitalize">
                        Ubicación:
                        <span className="font-normal">
                          {"por ahí jijijaja"}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Descripción */}
                  <div className="bg-black/40 px-4 py-2 m-2 rounded-xl shadow-[0px_5px_53px_-4px_rgba(34,197,94,0.5)]">
                    <div className="flex gap-2 items-center justify-center">
                      <h2 className="font-medium text-lg text-white">
                        {team.description}
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ))
        ) : (
          <div className="min-h-10/12 flex flex-col justify-center items-center text-2xl">
            <p>
              Aún no tienes un equipo propio, deseas{" "}
              <Link to={location.pathname + `?edit=true`} className="font-bold">
                Crear un nuevo equipo
              </Link>
            </p>
            <p>
              O si lo prefieres puedes{" "}
              <Link to="/teams" className="font-bold">
                Solicitar unirme a un equipo
              </Link>
            </p>
          </div>
        )}

        <CreateTeamModal />
      </>
    );
}
