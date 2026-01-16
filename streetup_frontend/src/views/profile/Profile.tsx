// components/profiles/Profile.tsx - Versión mejorada
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../../api/ProfileApi";
import { useAuth } from "../../hooks/useAuth";
import EditProfileModal from "../../components/profiles/EditProfileModal";
import ProfileCard from "../../components/profiles/ProfileCard";
import type { Profile } from "../../types";
import { PencilSquareIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { PencilSquareIcon as PencilSquareIconSolid } from "@heroicons/react/24/solid";

export default function Profile() {
  const { data: user } = useAuth();
  const navigate = useNavigate();

  const { data: profile, isLoading } = useQuery<Profile>({
    queryKey: ["profile"],
    queryFn: getProfile,
    retry: 2,
  });

  // Estado de carga mejorado
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 via-purple-900 to-violet-900">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-fuchsia-500 mb-4"></div>
          <p className="text-white text-xl font-semibold">Cargando tu perfil...</p>
        </div>
      </div>
    );
  }

  if (!user || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 via-purple-900 to-violet-900">
        <div className="text-center p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
          <UserCircleIcon className="w-24 h-24 text-white/50 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Perfil no encontrado</h2>
          <p className="text-gray-300 mb-6">Inicia sesión para ver tu perfil</p>
          <button
            onClick={() => navigate("/auth/login")}
            className="bg-linear-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-700 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 hover:scale-105"
          >
            Iniciar Sesión
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full md:w-auto mt-10 min-h-screen rounded-2xl bg-linear-to-br from-gray-800 via-gray-900 to-black pt-8 md:mx-5">
      <div className="max-w-7xl mx-auto">
        {/* Header con título y botón de editar */}
        <div className="px-4 flex flex-col sm:flex-row justify-between items-center mb-8 sm:mb-12 gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-linear-to-r from-fuchsia-500 to-purple-600 flex items-center justify-center shadow-xl">
                <UserCircleIcon className="w-10 h-10 text-white" />
              </div>
              <div className="animate-pulse animate-duration-2000 absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-gray-900"></div>
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white">Mi Perfil</h1>
            </div>
          </div>

          {/* Botón de editar - Responsive */}
          <div className="flex gap-3">
            <button
              className="sm:hidden flex items-center gap-2 bg-linear-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
              onClick={() => navigate(location.pathname + `?edit=true`)}
            >
              <PencilSquareIcon className="w-5 h-5" />
              Editar
            </button>

            <button
              className="hidden sm:flex items-center gap-2 bg-linear-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white px-8 py-3 rounded-xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(224,46,250,0.5)] border border-fuchsia-500/30"
              onClick={() => navigate(location.pathname + `?edit=true`)}
            >
              <PencilSquareIconSolid className="w-5 h-5" />
              Editar Perfil
            </button>
          </div>
        </div>

        {/* Tarjeta de perfil */}
        <ProfileCard user={user} profile={profile} />

        

        {/* Modal de edición */}
        <EditProfileModal />
      </div>
    </div>
  );
}