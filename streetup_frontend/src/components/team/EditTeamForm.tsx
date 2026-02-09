import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import Error from "../auth/Error";
import { sportsOptions, type TeamForm } from "../../types";
import {  editTeam, getTeamById } from "../../api/TeamsApi";

export default function EditTeamForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  const queryParams = new URLSearchParams(location.search);
  const {team_id} = useParams();
  if(team_id) queryParams.set("team_id", team_id);
  const teamId = queryParams.get("team_id");

  const { data: team } = useQuery({
    queryKey: ["team", teamId],
    queryFn: () => getTeamById(teamId!),
    enabled: !!teamId,
  });

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<TeamForm>();

  useEffect(() => {
    if (team) {
      reset({
        name: team.name,
        sport: team.sport,
        location: team.location,
        description: team.description,
        photo: team.photo,
      });
    }
  }, [team, reset]);

  const { mutate } = useMutation({
    mutationFn: editTeam,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data?.message);
      queryClient.invalidateQueries({
      queryKey: ["team", teamId],
      });
      queryClient.invalidateQueries({
      queryKey: ["teams"],
      });
      navigate(location.pathname, { replace: true });
  }});


  const handleEditProfile = (formData: TeamForm) => {
    mutate({ teamId: teamId!, formdata: formData });
  };

  const backgrounds = [
    { id: "team", src: "/static/static/teams/team.jpg" },
    { id: "font_color", src: "/static/static/teams/font_color.jpg" },
    { id: "font_graffiti", src: "/static/static/teams/font_graffiti.jpg" },
    { id: "font_graffiti_cel", src: "/static/static/teams/font_graffiti_cel.jpg" },
    { id: "font_home", src: "/static/static/teams/font_home.jpg" },
    { id: "1", src: "/static/static/teams/1.jpg" },
    { id: "2", src: "/static/static/teams/2.jpg" },
    { id: "3", src: "/static/static/teams/3.jpg" },
  ];

  const selectedBg = watch("photo");

  return (
    <form
      onSubmit={handleSubmit(handleEditProfile)}
      noValidate
      className="mt-2"
    >
      <div className="flex flex-col gap-y-2">
        <label htmlFor="name">Nombe</label>
        <input
          type="text"
          className="bg-white px-2 w-full text-black"
          placeholder="Nombre de tu equipo"
          {...register("name", { required: "Nombre de equipo obligatorio" })}
        />
        {errors.name && <Error>{errors.name.message}</Error>}

        <label htmlFor="sport">deporte</label>
        <select
          className="bg-gray-200 p-2 text-black w-full"
          {...register("sport", { required: "Seleccioná un deporte" })}
        >
          <option value="">Selecciona un deporte</option>
          {sportsOptions.map((sport) => (
            <option key={sport} value={sport} className="capitalize">
              {sport}
            </option>
          ))}
        </select>
        {errors.sport && <Error>{errors.sport.message}</Error>}

        <label htmlFor="location">Ubicación</label>
        <input
          type="text"
          className="bg-white px-2 w-full text-black"
          placeholder="País, Provincia, Barrio"
          {...register("location", { required: "Ubicación obligatoria" })}
        />

        <label htmlFor="description">Descripción</label>
        <textarea
          className="bg-white px-2 w-full text-black"
          placeholder="Descripción"
          {...register("description", {
            required: "Descripcion obligatoria",
          })}
        />

        <div>
          <label className="block mb-2">Fondo:</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {backgrounds.map((bg) => (
              <label key={bg.id} className="cursor-pointer">
                <input
                  type="radio"
                  value={bg.id}
                  {...register("photo", { required: true })}
                  className="hidden"
                />
                <div
                  className={`border-2 rounded-lg transition-all ${
                    selectedBg === bg.id
                      ? "border-blue-500 shadow-[0px_0px_11px_3px_#4f90ff]"
                      : "border-white"
                  }`}
                >
                  <img src={bg.src} alt={bg.id} className="size-40" />
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="mt-5 w-full rounded bg-emerald-500 hover:bg-emerald-600 p-3 font-bold uppercase text-white shadow"
      >
        Guardar
      </button>
    </form>
  );
}
