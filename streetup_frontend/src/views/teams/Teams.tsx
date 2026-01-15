
// components/teams/Teams.tsx - Vista de equipos con paleta azul/verde
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import CreateTeamModal from "../../components/team/CreateTeamModal";

import { 
  UserGroupIcon, 
  PlusIcon, 
  MagnifyingGlassIcon,
  
  TrophyIcon,
  
} from "@heroicons/react/24/outline";
import { 
  UserGroupIcon as UserGroupIconSolid,
  FireIcon as FireIconSolid
} from "@heroicons/react/24/solid";

export default function Teams() {
  const { data: user } = useAuth();
  const navigate = useNavigate();

  
  // // Consulta para obtener mis equipos
  // const { data: myTeams, isLoading: isLoadingMyTeams } = useQuery<Team[]>({
  //   queryKey: ["my-teams", user?.id],
  //   queryFn: () => getTeamByUser(user?.id || ""),
  //   enabled: !!user?.id,
  //   retry: 2,
  // });

  // Estado de carga
  // const isLoading = isLoadingAll || isLoadingMyTeams;

  // if (isLoading) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 via-blue-900 to-emerald-900">
  //       <div className="text-center">
  //         <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-emerald-500 mb-4"></div>
  //         <p className="text-white text-xl font-semibold">Cargando equipos...</p>
  //       </div>
  //     </div>
  //   );
  // }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 via-blue-900 to-emerald-900">
        <div className="text-center p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
          <UserGroupIcon className="w-24 h-24 text-white/50 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Acceso restringido</h2>
          <p className="text-gray-300 mb-6">Inicia sesión para ver los equipos</p>
          <button
            onClick={() => navigate("/auth/login")}
            className="bg-linear-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 hover:scale-105"
          >
            Iniciar Sesión
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-10 min-h-screen rounded-2xl bg-linear-to-br from-gray-800 via-gray-900 to-black pt-8 mx-5">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="px-4 flex flex-col sm:flex-row justify-between items-center mb-8 sm:mb-12 gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-linear-to-r from-blue-500 to-emerald-600 flex items-center justify-center shadow-xl">
                <UserGroupIconSolid className="w-10 h-10 text-white" />
              </div>
              
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white">Equipos</h1>
              <p className="text-gray-400">Encuentra y únete a equipos deportivos</p>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex flex-wrap gap-3">
            <button
              className="flex items-center gap-2 bg-linear-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
              onClick={() => navigate(location.pathname + `?create=true`)}
            >
              <PlusIcon className="w-5 h-5" />
              Crear Equipo
            </button>
          </div>
        </div>

        {/* Barra de búsqueda y filtros */}
        <div className="px-4 mb-8">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-white/10">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar equipos por nombre, deporte o ubicación..."
                  className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex gap-2">
                <select className="px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Todos los deportes</option>
                  <option value="futbol">Fútbol</option>
                  <option value="baloncesto">Baloncesto</option>
                  <option value="tenis">Tenis</option>
                  <option value="natacion">Natación</option>
                </select>
                <button className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors duration-300">
                  Filtrar
                </button>
              </div>
            </div>
          </div>
        </div>
 

        {/* Mis Equipos
        {myTeams && myTeams.length > 0 && (
          <div className="px-4 mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-linear-to-r from-blue-500/20 to-emerald-500/20">
                <UserGroupIconSolid className="w-6 h-6 text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Mis Equipos</h2>
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-sm">
                {myTeams.length} equipo{myTeams.length !== 1 ? 's' : ''}
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myTeams.slice(0, 3).map((team) => (
                <TeamCard key={team.id} team={team} isMyTeam={true} />
              ))}
            </div>
            
            {myTeams.length > 3 && (
              <div className="text-center mt-6">
                <button 
                  onClick={() => navigate("/teams/my-teams")}
                  className="text-blue-400 hover:text-blue-300 font-medium"
                >
                  Ver todos mis equipos ({myTeams.length})
                </button>
              </div>
            )}
          </div>
        )} */}

        {/* Equipos Recomendados */}
        <div className="px-4 mb-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-linear-to-r from-emerald-500/20 to-blue-500/20">
                <FireIconSolid className="w-6 h-6 text-emerald-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Equipos Recomendados</h2>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <TrophyIcon className="w-5 h-5" />
              <span>Basado en tus deportes favoritos</span>
            </div>
          </div>
          
          {/* {allTeams && allTeams.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {allTeams.slice(0, 8).map((team) => (
                <TeamCard key={team.id} team={team} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-800/30 rounded-2xl border border-dashed border-gray-700">
              <UserGroupIcon className="w-16 h-16 text-gray-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">No hay equipos disponibles</h3>
              <p className="text-gray-500 mb-6">Sé el primero en crear un equipo</p>
              <button
                onClick={() => navigate(location.pathname + `?create=true`)}
                className="bg-linear-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300"
              >
                Crear Equipo
              </button>
            </div>
          )}
        </div> */}

        {/* Estadísticas */}
        <div className="px-4 mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Estadísticas de la Comunidad</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-linear-to-br from-blue-900/30 to-emerald-900/30 backdrop-blur-sm rounded-xl p-6 border border-blue-500/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Equipos Activos</p>
                  <p className="text-3xl font-bold text-white">142</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <UserGroupIcon className="w-6 h-6 text-blue-400" />
                </div>
              </div>
              <div className="mt-4">
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-linear-to-r from-blue-500 to-emerald-500 h-2 rounded-full w-4/5"></div>
                </div>
                <p className="text-gray-400 text-xs mt-2">+12% desde el mes pasado</p>
              </div>
            </div>

            <div className="bg-linear-to-br from-blue-900/30 to-emerald-900/30 backdrop-blur-sm rounded-xl p-6 border border-emerald-500/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Miembros Totales</p>
                  <p className="text-3xl font-bold text-white">1,248</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <span className="text-emerald-400 text-2xl">👥</span>
                </div>
              </div>
              <div className="mt-4">
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-linear-to-r from-emerald-500 to-blue-500 h-2 rounded-full w-3/4"></div>
                </div>
                <p className="text-gray-400 text-xs mt-2">+8% desde el mes pasado</p>
              </div>
            </div>

            <div className="bg-linear-to-br from-blue-900/30 to-emerald-900/30 backdrop-blur-sm rounded-xl p-6 border border-blue-500/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Partidos esta semana</p>
                  <p className="text-3xl font-bold text-white">28</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <span className="text-blue-400 text-2xl">⚽</span>
                </div>
              </div>
              <div className="mt-4">
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-linear-to-r from-blue-500 to-emerald-500 h-2 rounded-full w-2/3"></div>
                </div>
                <p className="text-gray-400 text-xs mt-2">+5 desde la semana pasada</p>
              </div>
            </div>

            <div className="bg-linear-to-br from-blue-900/30 to-emerald-900/30 backdrop-blur-sm rounded-xl p-6 border border-emerald-500/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Deportes diferentes</p>
                  <p className="text-3xl font-bold text-white">12</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <TrophyIcon className="w-6 h-6 text-emerald-400" />
                </div>
              </div>
              <div className="mt-4">
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-linear-to-r from-emerald-500 to-blue-500 h-2 rounded-full w-1/2"></div>
                </div>
                <p className="text-gray-400 text-xs mt-2">Fútbol, Baloncesto, Tenis, etc.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal de creación de equipo */}
        <CreateTeamModal />
      </div>
    </div>
    </div>
  );
}