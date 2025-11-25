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
    console.log(data);
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
