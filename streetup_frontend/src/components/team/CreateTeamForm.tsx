import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import Error from "../auth/Error";
import { sportsOptions, type TeamForm } from "../../types";
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
      toast.success(data?.message);
      queryClient.invalidateQueries({ queryKey: ["team"] });
      navigate(location.pathname, { replace: true });
    },
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TeamForm>();

  const handleCreateProfile = (data: TeamForm) => {
    mutate(data);
  };

  const backgrounds = [
  { id: "team", src: "/static/static/teams/team.jpg" },
  { id: "font_color", src: "/static/static/teams/font_color.jpg" },
  { id: "font_graffiti", src: "/static/static/teams/font_graffiti.jpg" },
  { id: "font_graffiti_cel", src: "/static/static/teams/font_graffiti_cel.jpg" },
  { id: "font_home", src: "/static/static/teams/font_home.jpg" },
];

  const selectedBg = watch("photo");

  return (
    <form
      onSubmit={handleSubmit(handleCreateProfile)}
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
  <label htmlFor="sport" className="hidden">
    Deporte:
  </label>

  <select
    id="sport"
    className="bg-gray-200 p-2 text-black w-full"
    {...register("sport", {
      required: "Seleccioná un deporte",
    })}
  >
    <option value="">Selecciona un deporte</option>

    {sportsOptions.map((sport) => (
      <option
        key={sport}
        value={sport}
        className="capitalize"
      >
        {sport}
      </option>
    ))}
  </select>
</div>

{errors.sport && <Error>{errors.sport.message}</Error>}


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
        <div>
  <label className="block mb-2">Fondo:</label>

  <div className="mt-2 py-2 px-4 md:px-0 grid grid-cols-2 md:flex gap-5">
    {backgrounds.map((bg) => (
      <label key={bg.id} className="cursor-pointer">
        <input
          type="radio"
          value={bg.id}
          {...register("photo", { required: true })}
          className="hidden peer"
        />

        <div
          className={`
            border-2 rounded-lg transition-all
            ${
              selectedBg === bg.id
                ? "border-blue-500 shadow-[0px_0px_11px_3px_#4f90ff]"
                : "border-white"
            }
            hover:scale-105
          `}
        >
          <img
            src={bg.src}
            alt={bg.id}
            className="size-30 object-cover"
          />
        </div>
      </label>
    ))}
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
