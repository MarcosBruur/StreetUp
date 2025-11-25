import { HandThumbUpIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../../api/ProfileApi";
import { useAuth } from "../../hooks/useAuth";
import EditProfileModal from "../../components/profiles/EditProfileModal";

export default function Profile() {
  const { data: user } = useAuth();
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    retry: 2,
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
              {user?.userName}
            </h2>
          </div>

          <div className="col-start-1 col-end-7 row-start-2 row-end-4 grid md:grid-cols-5 p-2 overflow-hidden gap-2">
            <div className="flex justify-center md:col-start-1 md:col-end-3">
              <img
                src={`${data?.photo_view}`}
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
              {/* Edad */}
              <div className="border-b-2 border-white inline-block w-fit ml-2 ">
                <p className="font-bold text-lg ">
                  Edad: <span className="font-normal">{data?.age}</span>
                </p>
              </div>

              {/* Deportes */}
              <div className="border-b-2 border-white inline-block w-fit ml-2">
                <p className="font-bold text-lg  capitalize">
                  Deportes:
                  {data?.sports.map((sport: string) => (
                    <span className="font-normal" key={sport}>
                      {" "}
                      {sport}{" "}
                    </span>
                  ))}
                </p>
              </div>

              <div className="border-b-2 border-white inline-block w-fit ml-2">
                <p className="font-bold text-lg  capitalize">
                  Ubicación:
                  <span className="font-normal"> {data?.location}</span>
                </p>
              </div>
            </div>

            {/* Descripción */}
            <div className="bg-black/40 px-4 py-2 m-2 rounded-xl shadow-[0px_5px_53px_-4px_rgba(34,197,94,0.5)]">
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
          className="bg-gray-200 w-1/6 border rounded-br-2xl rounded-tl-2xl
          hover:rounded-br-none hover:rounded-tl-none hover:rounded-bl-2xl hover:rounded-tr-2xl 
          hover:bg-gray-300 transition-all duration-500 
          border-fuchsia-300 shadow-[0px_3px_19px_11px_#ea73ff] 
          py-2  hover:shadow-[0px_3px_19px_11px_#ac0de0] "
          onClick={() => navigate(location.pathname + `?new=false`)}
        >
          <p className="text-xl text-black font-bold hover:text-2xl transition-all">
            Editar
          </p>
        </button>
      </div>

      <EditProfileModal />
    </>
  );
}
