import {
  UserGroupIcon,
  UserIcon,
  PlusCircleIcon,
  StarIcon,
  HomeIcon,
} from "@heroicons/react/24/solid";
import SideBarButton from "./buttons/SideBarButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SideBar() {
  const [active, setActive] = useState("");
  const navigate = useNavigate();

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    value: string
  ) => {
    e.preventDefault();
    setActive(value);
    navigate(`/${value}`);
  };

  return (
    <>
      <div className="w-full mt-5 grid gap-y-2">
        <button onClick={(e) => handleClick(e, "")}>
          <SideBarButton name="Inicio" active={active === ""}>
            {<HomeIcon className="w-5 h-auto mx-2" />}
          </SideBarButton>
        </button>
        <button onClick={(e) => handleClick(e, "teams")}>
          <SideBarButton name="Equipos" active={active === "teams"}>
            {<UserGroupIcon className="w-5 h-auto mx-2" />}
          </SideBarButton>
        </button>

        <button onClick={(e) => handleClick(e, "players")}>
          <SideBarButton name="Jugadores" active={active === "players"}>
            {<UserIcon className="w-5 h-auto mx-2" />}
          </SideBarButton>
        </button>

        <button onClick={(e) => handleClick(e, "profile")}>
          <SideBarButton name="Mi Perfil" active={active === "profile"}>
            {<PlusCircleIcon className="w-5 h-auto mx-2" />}
          </SideBarButton>
        </button>

        <button onClick={(e) => handleClick(e, "team")}>
          <SideBarButton name="Mi Equipo" active={active === "team"}>
            {<StarIcon className="w-5 h-auto mx-2" />}
          </SideBarButton>
        </button>
      </div>
    </>
  );
}
