import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import Error from "../auth/Error";
import type { ProfileForm } from "../../types";
import { useRef, useState, useEffect } from "react";
import { editProfile, getProfile } from "../../api/ProfileApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function EditProfileForm() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // ---------- QUERY ----------
  const { data, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    retry: 2,
  });

  // ---------- FORM ----------
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<ProfileForm>();

  // Cuando llega el profile -> cargar valores
  useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [data, reset]);

  // ---------- MUTATION ----------
  const { mutate } = useMutation({
    mutationFn: editProfile,
    onError: (error: Error) => {
      toast.error(error.message);
    },
    onSuccess: (msg) => {
      toast.success(msg);
      navigate(location.pathname,{replace:true});
    },
  });


  // ---------- SUBMIT ----------
  const handleEditProfile = (formData: ProfileForm) => {
    mutate(formData);
  };

  if (isLoading) return <p>Cargando...</p>;

  // nombre del archivo seleccionado
  const selectedFileName =
    watch("photo")?.[0]?.name ?? data?.photo ?? "Ningún archivo seleccionado";

  return (
    <form
      onSubmit={handleSubmit(handleEditProfile)}
      noValidate
      className="mt-2"
    >
      <div className="flex flex-col">
        {/* ---------- IMAGE ---------- */}
        <div className="flex justify-center">
          <div className="w-[200px] h-[300px] overflow-hidden relative rounded-xl border-2 shadow-[0px_0px_27px_16px_rgba(147,51,234,0.5)]">
            <img
              src={previewImage ?? `media/${data?.photo}`}
              alt="imagen de perfil"
              className="w-full h-full object-cover"
            />

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
              onChange={(e) => {
                register("photo").onChange(e); // <-- ESTO FALTABA

                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setPreviewImage(reader.result as string);
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />


            <p className="text-center mt-2">{selectedFileName}</p>
          </div>
        </div>

        {/* ---------- FORM FIELDS ---------- */}
        <div className="flex flex-col gap-y-2 mt-5">
          {/* AGE */}
          <input
            type="number"
            className="bg-white p-2 w-full text-black rounded-sm"
            placeholder="Ingresa tu edad"
            {...register("age", {
              min: { value: 18, message: "Debes ser mayor de 18 años" },
              max: { value: 120, message: "Edad inválida" },
            })}
          />
          {errors.age && <Error>{errors.age.message}</Error>}

          {/* LOCATION */}
          <input
            type="text"
            className="bg-white p-2 w-full text-black"
            placeholder="Ubicación"
            {...register("location")}
          />

          {/* DESCRIPTION */}
          <textarea
            className="bg-white p-2 w-full text-black"
            placeholder="Descripción"
            {...register("description")}
          />

          {/* SPORTS */}
          <div className="flex flex-wrap gap-3 mt-3">
            <span className="font-bold">Deportes:</span>

            {[
              "futbol",
              "basquet",
              "tenis",
              "voley",
              "paddel",
              "ciclismo",
            ].map((sport) => (
              <label key={sport} className="flex items-center gap-1">
                <input
                  type="checkbox"
                  value={sport}
                  className="size-5"
                  {...register("sports")}
                />
                {sport}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* ---------- SUBMIT ---------- */}
      <button
        type="submit"
        className="mt-5 w-full rounded bg-emerald-500 hover:bg-emerald-600 p-3 font-bold uppercase text-white shadow"
      >
        Guardar
      </button>
    </form>
  );
}
