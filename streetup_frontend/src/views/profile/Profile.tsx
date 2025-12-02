import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../../api/ProfileApi";
import { useAuth } from "../../hooks/useAuth";
import EditProfileModal from "../../components/profiles/EditProfileModal";
import ProfileCard from "../../components/profiles/ProfileCard";
import type { Profile } from "../../types";

export default function Profile() {
  const { data: user } = useAuth();
  const navigate = useNavigate();

  const { data: profile, isLoading } = useQuery<Profile>({
    queryKey: ["profile"],
    queryFn: getProfile,
    retry: 2,
  });

  if (isLoading || !user || !profile) {
    return <p>Cargando...</p>;
  }

  console.log(profile);
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

      <ProfileCard user={user} profile={profile} />

      <div className="hidden md:flex justify-center mt-4">
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
