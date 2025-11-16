import { Outlet } from "react-router-dom";
import SideBarButton from "../components/sidebar/buttons/SideBarButton";
import {
  HomeIcon,
  PlusCircleIcon,
  StarIcon,
  UserGroupIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/sidebar/SearchBar";
import SideBar from "../components/sidebar/SideBar";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

export default function AppLayout() {
  const { data, isError, isLoading } = useAuth();

  const [active, setActive] = useState("");
  const navigate = useNavigate();

  if (isLoading) return "Cargando...";
  if (isError) {
    return <Navigate to="/auth/login" />;
  }
  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    value: string
  ) => {
    e.preventDefault();
    setActive(value);
    navigate(`/${value}`);
  };

  if (data)
    return (
      <>
        <div
          className="bg-cover bg-center min-h-screen flex flex-col justify-between"
          style={{ backgroundImage: "url('/static/font_login.jpg')" }}
        >
          <div className="overflow-hidden">
            <div className="flex flex-col md:flex-row md:h-screen mt-2 overflow-hidden">
              <aside className="w-full md:w-[20%] border-r border-stone-300 p-4 flex flex-col justify-between shadow-[0px_0px_53px_17px_rgba(147,51,234,0.5)]">
                <div>
                  <h2 className="text-2xl text-center mt-5">
                    Bienvenido <br />
                    <span className="text-3xl font-bold capitalize">
                      {data.userName}
                    </span>
                  </h2>

                  <div className="mt-6">
                    <SearchBar />
                    <div className="hidden md:block mt-4">
                      <SideBar />
                    </div>
                  </div>
                </div>
                <footer className="py-5">
                  <div className="flex justify-center items-center fixed bottom-4 left-0 w-full md:static z-50">
                    <div className="bg-gray-700/95 h-10 w-11/12 rounded-xl md:hidden flex justify-around items-center">
                      <button onClick={(e) => handleClick(e, "")}>
                        <SideBarButton name="" active={active === ""}>
                          {<HomeIcon className="w-5 h-auto mx-2" />}
                        </SideBarButton>
                      </button>

                      <button onClick={(e) => handleClick(e, "teams")}>
                        <SideBarButton name="" active={active === "teams"}>
                          {<UserGroupIcon className="w-5 h-auto mx-2" />}
                        </SideBarButton>
                      </button>

                      <button onClick={(e) => handleClick(e, "players")}>
                        <SideBarButton name="" active={active === "players"}>
                          {<UserIcon className="w-5 h-auto mx-2" />}
                        </SideBarButton>
                      </button>

                      <button onClick={(e) => handleClick(e, "profile")}>
                        <SideBarButton name="" active={active === "profile"}>
                          {<PlusCircleIcon className="w-5 h-auto mx-2" />}
                        </SideBarButton>
                      </button>

                      <button onClick={(e) => handleClick(e, "team")}>
                        <SideBarButton name="" active={active === "team"}>
                          {<StarIcon className="w-5 h-auto mx-2" />}
                        </SideBarButton>
                      </button>
                    </div>
                  </div>

                  <p className="text-center m-2">
                    Todos los derechos reservados {new Date().getFullYear()}
                  </p>
                </footer>
              </aside>

              <main className="w-full md:w-[80%] p-5 overflow-y-auto">
                <div className="flex justify-center">
                  <div className="bg-linear-to-r from-cyan-800 to-fuchsia-800 w-1/4 rounded-xl">
                    <h1 className="hidden md:block text-4xl font-bold text-center py-2 px-5">
                      StreetUp
                    </h1>
                  </div>
                </div>

                <Outlet />
              </main>
            </div>
          </div>
        </div>
      </>
    );
}
