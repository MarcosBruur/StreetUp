import { HandThumbUpIcon } from "@heroicons/react/24/solid";
import type { ActiveUser, Profile } from "../../types";

type ProfileCardProps = {
  user: ActiveUser | undefined;
  profile: Profile | undefined;
};

export default function ProfileCard({ user, profile }: ProfileCardProps) {
  if (user && profile)
    return (
      <div className="flex justify-center items-center ">
        <div className="w-3/5">
          <div
            className="shadow-[0px_0px_53px_17px_rgba(147,51,234,0.5)]  
          border-2  border-violet-700 rounded-xl 
          bg-custom-purple 
          flex flex-col
          "

            // style={{
            //bg-[url('/static/font_graffiti_cel.jpg')] md:bg-[url('/static/font_graffiti.jpg')]
            //   backgroundImage:
            //     "url('/static/font_graffiti_cel.jpg') md:url('/static/font_graffiti.jpg')",
            //   backgroundSize: "cover",
            //   backgroundPosition: "center",
            // }}
          >
            <div className="flex">
              <h2 className="w-full bg-custom-gray text-black text-center text-xl font-bold capitalize  px-2 py-5 ">
                {user?.userName}
              </h2>
            </div>

            <div className="flex justify-around p-4">
              <div
                className="w-[300px] h-[400px] overflow-hidden rounded-xl 
              border border-fuchsia-300 shadow-[0px_3px_19px_11px_#ea73ff]"
              >
                <img
                  src={`${profile.photo_view}`}
                  alt="imagen perfil"
                  className="w-full h-full object-center object-cover "
                />
              </div>

              <div className="w-1/2 p-2 rounded-xl bg-custom-gray text-custom-purple text-3xl">
                <p className="font-bold border-b-2 ">
                  <span className="font-black text-custom-orange">50</span>{" "}
                  Partidos
                </p>

                <p className="font-bold">Equipos:</p>
                <ul>
                  <li className="font-bold text-2xl"> - Equipo blablablalba</li>
                </ul>
                <ul>
                  <li className="font-bold text-2xl"> - Equipo blablablalba</li>
                </ul>
                <ul className="border-b-2 ">
                  <li className="font-bold  text-2xl">
                    {" "}
                    - Equipo blablablalba
                  </li>
                </ul>
              </div>
            </div>

            <div
              className="py-3 col-start-1 col-end-7 row-start-4 row-end-6 grid 
            gap-2  mt-2"
            >
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

              <div className="grid">
                {/* Edad */}
                <div className="border-b-2 border-white inline-block w-fit ml-2 ">
                  <p className="font-bold text-lg ">
                    Edad: <span className="font-normal">{profile.age}</span>
                  </p>
                </div>

                {/* Deportes */}
                <div className="border-b-2 border-white inline-block w-fit ml-2">
                  <p className="font-bold text-lg  capitalize">
                    Deportes:
                    {profile.sports.map((sport: string) => (
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
                    <span className="font-normal"> {profile.location}</span>
                  </p>
                </div>
              </div>

              {/* Descripción */}
              <div className="bg-custom-gray px-4 py-2 m-2">
                <div className="flex gap-2 items-center justify-center">
                  <h2 className="font-medium text-xl text-black">
                    {profile.description}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
