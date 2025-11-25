import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import type { ProfileForm } from "../../types";
import { createProfile } from "../../api/ProfileApi";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function NewProfileForm() {
  const { data } = useAuth();

  if (data?.profile !== null) {
    return <Navigate to="/profile" />;
  }

  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: (data: FormData) => createProfile(data),
    onError: (error: any) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Perfil creado exitosamente");
      navigate("/");
    },
  });

  const { register, handleSubmit } = useForm<ProfileForm>();
  const handleCreateProfile = (formData: ProfileForm) => {
    const fd = new FormData();

    if (formData.photo && formData.photo[0]) {
      fd.append("photo", formData.photo[0]);
    }

    fd.append("age", formData.age.toString());
    fd.append("description", formData.description);

    formData.sports?.forEach((sport) => {
      fd.append("sports", sport);
    });

    mutate(fd);
  };

  return (
    <form
      noValidate
      className="text-black"
      onSubmit={handleSubmit(handleCreateProfile)}
      encType="multipart/form-data"
    >
      <div className="grid gap-2">
        <div className="grid md:flex md:items-center gap-2">
          <label
            htmlFor="photo"
            className="md:text-start text-sm font-bold ml-5 min-w-25 text-black"
          >
            Foto de usuario
          </label>

          <div className="flex justify-center md:w-full">
            <input
              type="file"
              accept="image/*"
              id="photo"
              className="bg-white p-2 w-11/12 mb-2 text-black"
              {...register("photo")}
            />
          </div>
        </div>
      </div>

      <div className="grid gap-2">
        <div className="grid md:flex md:items-center gap-2">
          <label
            htmlFor="age"
            className="md:text-start text-sm font-bold ml-5 min-w-25 text-black"
          >
            Edad
          </label>

          <div className="flex justify-center md:w-full">
            <input
              type="number"
              placeholder="Tu edad"
              id="age"
              className="bg-white p-2 w-11/12 mb-2 text-black"
              {...register("age")}
            />
          </div>
        </div>
      </div>

      <div className="grid gap-2">
        <div className="grid md:flex md:items-center gap-2">
          <p>Deportes: </p>
          <label
            htmlFor="futbol"
            className="md:text-start text-sm font-bold mt-2 ml-5 min-w-25 text-black"
          >
            Futbol
          </label>
          <div className="flex justify-center md:w-full">
            <input
              type="checkbox"
              id="futbol"
              value="futbol"
              className="bg-white p-2 w-11/12 text-black"
              {...register("sports")}
            />
          </div>
          <label
            htmlFor="basquet"
            className="md:text-start text-sm font-bold mt-2 ml-5 min-w-25 text-black"
          >
            Basquet
          </label>
          <div className="flex justify-center md:w-full">
            <input
              type="checkbox"
              id="basquet"
              value="basquet"
              className="bg-white p-2 w-11/12 text-black"
              {...register("sports")}
            />
          </div>
        </div>
      </div>

      <div className="grid gap-2 mt-2">
        <div className="grid md:flex md:items-center gap-2">
          <label
            htmlFor="description"
            className="md:text-start text-sm font-bold mt-2 ml-5 min-w-25 text-black"
          >
            Descripción
          </label>
          <div className="flex justify-center md:w-full">
            <textarea
              id="description"
              placeholder="Agrega una descripción"
              className="bg-white p-2 w-11/12 text-black"
              {...register("description")}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <input
          type="submit"
          value="Crear Perfil"
          className="bg-linear-to-r from-cyan-800 to-fuchsia-800 hover:bg-gray-600 cursor-pointer py-2 px-4 w-11/12 mt-5 text-white text-lg rounded-sm"
        />
      </div>
    </form>
  );
}
