import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import Error from "../auth/Error";
import type { TeamForm } from "../../types";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { createTeam } from "../../api/TeamsApi";

export default function CreateTeamForm() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: createTeam,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success("Equipo creado correctamente", data);
      queryClient.invalidateQueries({ queryKey: ["team"] });
      navigate(location.pathname, { replace: true });
    },
  });
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<TeamForm>();

  const handleEditProfile = (data: TeamForm) => {
    mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(handleEditProfile)}
      noValidate
      className="mt-2"
    >
      <div className="flex flex-col gap-y-2">
        <div className="flex gap-2 justify-between">
          <label htmlFor="age" className="hidden">
            Nombre:
          </label>
          <input
            type="text"
            id="name"
            className="bg-white px-2 w-full text-black"
            placeholder="Nombre de tu equipo"
            {...register("name", {
              required: "Nombre de equipo obligatorio",
            })}
          />
        </div>

        {errors.name && <Error>{errors.name.message}</Error>}

        <div className="flex gap-2 items-center">
          <label htmlFor="location" className="hidden">
            Deporte:
          </label>
          <input
            type="text"
            id="sport"
            className="bg-white px-2 w-full text-black"
            placeholder="Deporte de tu equipo"
            {...register("sport", {
              required: "Deporte obligatorio",
            })}
          />
        </div>

        <div className="flex gap-2 items-center">
          <label htmlFor="location" className="hidden">
            Ubicación:
          </label>
          <input
            type="text"
            id="location"
            className="bg-white px-2 w-full text-black"
            placeholder="País,Provincia,Barrio"
            {...register("location", {
              required: "Ubicación obligatoria",
            })}
          />
        </div>

        <div className="flex gap-2 items-center">
          <label htmlFor="description" className="hidden">
            Descripción:
          </label>
          <textarea
            id="description"
            className="bg-white px-2 w-full text-black"
            placeholder="Descripción"
            {...register("description", {
              required: "Descripcion obligatoria",
            })}
          />
        </div>
        <div className="">
          <label htmlFor="description" className="">
            Fondo:
          </label>
          <div className="mt-2 py-2 px-4 md:px-0 grid grid-cols-2 md:flex  overflow-hidden justify-around items-center gap-5 md:gap-0">
            <div className="border-2 border-white 
              hover:shadow-[0px_0px_11px_3px_#4f90ff] 
              transition-all hover:scale-105">
            <img 
              src="/static/static/teams/team.jpg" 
              alt="team_logo_1" 
              className="size-30"
              />
            </div>
            <div className="border-2 border-white 
              hover:shadow-[0px_0px_11px_3px_#4f90ff] 
              transition-all hover:scale-105">
            <img 
              src="/static/static/teams/font_color.jpg" 
              alt="team_logo_2" 
              className="size-30"
              />
            </div>
            <div className="border-2 border-white 
            hover:shadow-[0px_0px_11px_3px_#4f90ff] 
            transition-all hover:scale-105">
            <img 
              src="/static/static/teams/font_graffiti.jpg" 
              alt="team_logo_3" 
              className="size-30"
              />
            </div>
            <div className="border-2 border-white 
            hover:shadow-[0px_0px_11px_3px_#4f90ff] 
            transition-all hover:scale-105">
            <img 
              src="/static/static/teams/font_graffiti_cel.jpg" 
              alt="team_logo_4" 
              className="size-30"
              />
            </div>
            <div className="border-2 border-white 
            hover:shadow-[0px_0px_11px_3px_#4f90ff] 
            transition-all hover:scale-105">
            <img 
              src="/static/static/teams/font_home.jpg" 
              alt="team_logo_5" 
              className="size-30"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 flex flex-col justify-between gap-2">
        <button
          type="submit"
          className="w-full rounded bg-emerald-500 hover:bg-emerald-600 p-3 font-bold uppercase text-white shadow"
        >
          Guardar
        </button>
      </div>
    </form>
  );
}
