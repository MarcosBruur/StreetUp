import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { useMutation } from "@tanstack/react-query"; // TODO: Implementar la mutación
import { useForm } from "react-hook-form";
import Error from "../auth/Error";
import type { ProfileForm } from "../../types";
import { useRef } from "react";
import { editProfile } from "../../api/ProfileApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function EditProfileForm() {
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: editProfile,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      navigate(location.pathname, { replace: true });
    },
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ProfileForm>();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleEditProfile = (data: ProfileForm) => {
    console.log(data);
    mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(handleEditProfile)}
      noValidate
      className="mt-2"
    >
      <div className="flex justify-center mt-2">
        <div className="relative">
          <img src="/static/player.jpg" alt="imagen de perfil" />

          <button
            type="button"
            className="absolute top-0 right-0 hover:scale-110 transition-transform"
            onClick={() => fileInputRef.current?.click()}
          >
            <PencilSquareIcon className="h-10 w-10" />
          </button>

          <input
            type="file"
            accept="image/*"
            className="hidden"
            {...register("photo")}
            ref={(e) => {
              register("photo").ref(e);
              fileInputRef.current = e;
            }}
          />
        </div>
      </div>

      <p className="text-center mt-2">
        {watch("photo")?.[0]?.name ?? "Ningún archivo seleccionado"}
      </p>
      <div className="flex flex-col gap-y-2">
        <div className="flex gap-2 justify-between">
          <label htmlFor="age" className="hidden">
            Edad:
          </label>
          <input
            type="text"
            id="age"
            className="bg-white px-2 w-full text-black"
            placeholder="Ingresa tu edad"
            {...register("age", {
              required: "La edad es obligatoria",
              min: { value: 18, message: "Debes ser mayor de 18 años" },
              max: { value: 120, message: "Error, Edad imposible" },
            })}
          />
        </div>
        {errors.age && <Error>{errors.age.message}</Error>}

        <div className="flex gap-2 items-center">
          <label htmlFor="location" className="hidden">
            Ubicación:
          </label>
          <input
            type="text"
            id="location"
            className="bg-white px-2 w-full text-black"
            placeholder="Ingresa tu ubicación"
            {...register("location")}
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
            {...register("description")}
          />
        </div>
        <div className="flex gap-2 items-center">
          <label htmlFor="sports" className="font-bold">
            Deportes:
          </label>
          <label htmlFor="futbol">Futbol</label>
          <input
            type="checkbox"
            id="futbol"
            value="futbol"
            className="size-6"
            {...register("sports")}
          />
          <label htmlFor="basquet">Basquet</label>
          <input
            type="checkbox"
            id="basquet"
            value="basquet"
            className="size-6"
            {...register("sports")}
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
