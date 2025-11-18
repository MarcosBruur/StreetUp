export default function Home() {
  // // 🔹 Cargar equipos con paginación
  // useEffect(() => {
  //   const fetchTeams = async () => {
  //     setLoading(true);
  //     const paginator = {
  //       page: teamsCurrentPage,
  //       page_size: pageSize,
  //     };

  //     try {
  //       const data = await getTeams(paginator);

  //       // Si es la primera página, reemplaza; si no, agrega (para mobile scroll)
  //       if (teamsCurrentPage === 1 || window.innerWidth >= 768) {
  //         setTeams(data?.results ?? []);
  //       } else {
  //         setTeams((prev) => [...prev, ...(data?.results ?? [])]);
  //       }

  //       setTotalTeams(data?.count ?? 0);
  //     } catch (error) {
  //       console.log(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchTeams();
  // }, [teamsCurrentPage]);

  // const totalPages = Math.ceil(totalTeams / pageSize);

  // // 🔹 Scroll lateral para pantallas pequeñas
  // useEffect(() => {
  //   if (window.innerWidth >= 768) return;

  //   const container = containerRef.current;
  //   if (!container) return;

  //   const handleScroll = () => {
  //     const { scrollLeft, scrollWidth, clientWidth } = container;
  //     const nearEnd = scrollLeft + clientWidth >= scrollWidth - 50;
  //     if (nearEnd && !loading && teamsCurrentPage < totalPages) {
  //       setTeamsCurrentPage((prev) => prev + 1);
  //     }
  //   };

  //   container.addEventListener("scroll", handleScroll);
  //   return () => container.removeEventListener("scroll", handleScroll);
  // }, [loading, teamsCurrentPage, totalPages]);

  return (
    <>
      <h1 className="text-6xl font-bold shadow-2xl">Home ¡¡¡Actualizado!!!</h1>
      {/* <section>
          <h2 className="text-xl mt-5">Equipos</h2>

          <div
            ref={containerRef}
            className="
              flex gap-4 mt-5 overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide
              md:grid md:grid-cols-2 md:grid-rows-1 md:overflow-visible
            "
          >
            {teams.map((team) => (
              <div
                key={team.id}
                className="shrink-0 w-[85%] snap-start md:w-auto"
              >
                <TeamCard team={team} />
              </div>
            ))}
          </div>

          <div className="hidden md:flex justify-center gap-4 mt-6">
            <button
              disabled={teamsCurrentPage === 1}
              onClick={() => setTeamsCurrentPage((prev) => prev - 1)}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                teamsCurrentPage === 1
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-gray-800 text-white hover:bg-gray-700"
              }`}
            >
              Anterior
            </button>

            <span className="self-center font-bold text-lg">
              Página {teamsCurrentPage} / {totalPages || 1}
            </span>

            <button
              disabled={teamsCurrentPage === totalPages}
              onClick={() => setTeamsCurrentPage((prev) => prev + 1)}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                teamsCurrentPage === totalPages
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-gray-800 text-white hover:bg-gray-700"
              }`}
            >
              Siguiente
            </button>
          </div>

          {loading && (
            <p className="text-center text-gray-500 mt-3">
              Cargando equipos...
            </p>
          )}
        </section> */}

      {/*         
        <section>
          <h2 className="text-xl mt-8">Jugadores Cerca</h2>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            {data
              .filter((user) => user.profile !== null)

              .map((user) => (
                <PlayerCard key={user.id} player={user} />
              ))}
          </div>
        </section> */}
    </>
  );
}
