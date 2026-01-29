import { Outlet } from "react-router-dom";
import SideBarButton from "../components/sidebar/buttons/SideBarButton";
import {
  HomeIcon,
  PlusCircleIcon,
  StarIcon,
  UserGroupIcon,
  UserIcon,
  PowerIcon,
  ArrowLeftStartOnRectangleIcon
} from "@heroicons/react/24/solid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/sidebar/SearchBar";
import SideBar from "../components/sidebar/SideBar";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import Logo from "../components/global/Logo";


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

  const handleLogout = () => {
    localStorage.setItem("access_token", "");
    localStorage.setItem("refresh_token", "");
    navigate("/auth/login");
  };

  if (data)
    return (
      <>
        <div
          className="bg-cover bg-center min-h-screen flex flex-col justify-between overflow-hidden"
          style={{ backgroundImage: "url('/static/static/font_login.jpg')" }}
        >
          <div className="overflow-hidden">
            <div className="animate-fade-right flex flex-col md:flex-row md:h-screen overflow-hidden">
              <aside className="w-full md:w-[20%] border-r border-stone-300 p-4 md:flex flex-col justify-between ">
                <div className="">
                  <h2 className="hidden md:block text-2xl text-center mt-5">
                    Bienvenido <br />
                    <span className="text-3xl font-bold capitalize">
                      {data.userName}
                    </span>
                  </h2>

                  <div className="hidden md:block mt-6">
                    
                    <div className="md:block mt-4 ">
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
                      <button onClick={handleLogout}>
                          <div className="md:flex md:gap-2 md:w-full 
                          transition-colors py-3 px-3 
                          hover:bg-red-800/50">
                          <PowerIcon className="w-5 h-auto mx-2" />
                          </div>
                      </button>
                    </div>
                  </div>

                  <div className="hidden md:flex flex-col items-center ">
                    <button
                      className="bg-red-100 text-red-600 
                      p-2 hover:bg-red-300 cursor-pointer transition-all"
                      onClick={handleLogout}
                    >
                      <div className="flex gap-2 justify-center items-center">
                        <ArrowLeftStartOnRectangleIcon className="size-5 "/>
                        <p className="text-sm font-bold">
                          Cerrar sesión
                        </p>

                      </div>
                    </button>
                    <p className=" text-center mb-2 mt-10">
                      Todos los derechos reservados {new Date().getFullYear()}
                    </p>
                  </div>
                </footer>
              </aside>

              <main className="w-full md:w-[80%] overflow-y-auto animate-fade-left overflow-x-hidden">
                <div className="animate-fade-down mt-5 flex justify-center">
                  <Logo />
                </div>
                <Outlet />
              </main>
            </div>
          </div>
        </div>
      </>
    );
}
