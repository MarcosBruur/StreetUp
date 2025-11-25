import { Link } from "react-router-dom";
import CreateTeamModal from "../../components/team/CreateTeamModal";
import { useQuery } from "@tanstack/react-query";
import { getTeamByUser } from "../../api/TeamsApi";
import TeamCard from "../../components/team/TeamCard";

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
        <div className="mt-5 flex flex-col gap-8  items-center">
          {data?.length > 0 ? (
            data.map((team) => (
              <>
                <TeamCard team={team} key={team.id} />
              </>
            ))
          ) : (
            <div className="min-h-10/12 flex flex-col justify-center items-center text-2xl">
              <p>
                Aún no tienes un equipo propio, deseas{" "}
                <Link
                  to={location.pathname + `?edit=true`}
                  className="font-bold"
                >
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
        </div>

        <CreateTeamModal />
      </>
    );
}
