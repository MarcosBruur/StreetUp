import { HandThumbUpIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/profiles/EditProfileModal";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../../api/ProfileApi";
import { useAuth } from "../../hooks/useAuth";

export default function Profile() {
  const { data: user } = useAuth();
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  return (
    <>
      <div className="flex gap-2 justify-between items-center md:justify-start mb-2">
        <h1 className="text-2xl font-bold">Mi Perfil</h1>
        <div className="md:hidden flex justify-center">
          <button
            className="bg-gray-700 hover:bg-gray-600 hover:scale-110 transition-colors text-white px-15 py-2 
      rounded uppercase font-bold text-lg"
            onClick={() => navigate(location.pathname + `?edit=true`)}
          >
            Editar
          </button>
        </div>
      </div>

      <div className="flex justify-center items-center h-full w-auto">
        <div
          className="shadow-[0px_0px_53px_17px_rgba(147,51,234,0.5)] w-full md:w-1/2 h-11/12 border border-stone-300 grid grid-rows-5 grid-cols-6 rounded-xl bg-[url('/static/font_graffiti_cel.jpg')]
    md:bg-[url('/static/font_graffiti.jpg')]"
          style={{
            backgroundImage:
              "url('/static/font_graffiti_cel.jpg') md:url('/static/font_graffiti.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="col-start-1 col-end-7">
            <h2 className=" bg-black/60 text-xl font-bold capitalize text-white px-2 py-5 text-center md:text-start ">
              {user?.userName}
            </h2>
          </div>

          <div className="col-start-1 col-end-7 row-start-2 row-end-4 grid md:grid-cols-5 p-2 overflow-hidden gap-2">
            <div className="flex justify-center md:col-start-1 md:col-end-3">
              <img
                src="/static/player.jpg"
                alt=""
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
              <p className="font-bold text-white text-xl ">Equipos:</p>
              <ul>
                <li className="font-bold text-white text-xl"> - Equipo 1</li>
              </ul>
              <ul>
                <li className="font-bold text-white text-xl"> - Equipo 2</li>
              </ul>
              <ul className="border-b-2 border-white">
                <li className="font-bold text-white text-xl"> - Equipo 3</li>
              </ul>
            </div>
          </div>

          <div className="col-start-1 col-end-7 row-start-4 row-end-6 grid gap-2  mt-2 bg-black/40">
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
              {/* Edad */}
              <div className="border-b-2 border-white inline-block w-fit ml-2 ">
                <h2 className="font-medium text-lg text-fuchsia-600 ">
                  {data?.age}
                </h2>
              </div>

              {/* Deportes */}
              <div className="border-b-2 border-white inline-block w-fit ml-2">
                <h2 className="font-medium text-lg text-fuchsia-600 capitalize">
                  {data?.sports}
                </h2>
              </div>

              {/* Nombre */}
              <div className="border-b-2 border-white inline-block w-fit ml-2">
                <h2 className="font-medium text-lg text-fuchsia-600">
                  Martín García
                </h2>
              </div>
            </div>

            {/* Descripción */}
            <div className="bg-green-600/50 px-4 py-2 m-2 rounded-xl shadow-[0px_5px_53px_-4px_rgba(34,197,94,0.5)]">
              <div className="flex gap-2 items-center justify-center">
                <h2 className="font-medium text-lg text-white">
                  {data?.description}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden md:flex justify-center">
        <button
          className="bg-linear-to-r from-cyan-800 via-emerald-800 to-cyan-800 hover:scale-110 transition-transform  text-white px-15 py-2 
      rounded uppercase font-bold text-lg"
          onClick={() => navigate(location.pathname + `?new=false`)}
        >
          Editar
        </button>
      </div>

      <Modal />
    </>
  );
}
