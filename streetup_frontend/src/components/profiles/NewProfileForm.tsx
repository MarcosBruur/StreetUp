// NewProfileForm.tsx
import { 
  PencilSquareIcon, 
  CameraIcon,
  MapPinIcon,
  CalendarIcon,
  ChatBubbleLeftRightIcon,
  TrophyIcon,
  ArrowPathIcon,
  CheckCircleIcon
} from "@heroicons/react/24/solid";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import { createProfile } from "../../api/ProfileApi";
import { useNavigate } from "react-router-dom";
import type { ProfileForm } from "../../types";
import { toast } from "react-toastify";

const sportsOptions = [
  { id: "futbol", label: "Fútbol", emoji: "⚽" },
  { id: "basquet", label: "Básquet", emoji: "🏀" },
  { id: "tenis", label: "Tenis", emoji: "🎾" },
  { id: "voley", label: "Vóley", emoji: "🏐" },
  { id: "padel", label: "Pádel", emoji: "🎾" },
  { id: "ciclismo", label: "Ciclismo", emoji: "🚴" },
];

export default function NewProfileForm() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedSports, setSelectedSports] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    setValue,
    trigger
  } = useForm<ProfileForm>({
    defaultValues: {
      sports: [],
      age: 0,
      location: '',
      description: ''
    }
  });

  // Mutación con React Query
  const { mutate, isPending } = useMutation({
    mutationFn: createProfile,
    onSuccess: (data) => {
      toast.success(data?.message || '¡Perfil creado exitosamente! 🎉');
      setTimeout(() => {
        navigate('/profile');
      }, 1500);
    },
    onError: (error: any) => {
      toast.error(error.message || 'Error al crear el perfil');
      console.error('Error creating profile:', error);
    }
  });

  const handleEditProfile = (data: ProfileForm) => {
    if (selectedSports.length === 0) {
      toast.error('Selecciona al menos un deporte');
      return;
    }
    
    // Agregar deportes seleccionados al formulario
    const formData = {
      ...data,
      sports: selectedSports
    };

    console.log(formData);
    mutate(formData);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Actualizar el valor del formulario
      const event = { target: { value: file, name: 'photo' } } as any;
      register('photo').onChange(event);
      
      // Crear preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleSport = (sportId: string) => {
    setSelectedSports(prev => {
      const newSports = prev.includes(sportId)
        ? prev.filter(id => id !== sportId)
        : [...prev, sportId];
      
      // Actualizar el campo del formulario
      setValue('sports', newSports);
      trigger('sports');
      return newSports;
    });
  };

  return (
    <div className="relative">
      <form
        onSubmit={handleSubmit(handleEditProfile)}
        noValidate
        className="relative bg-linear-to-br from-gray-900/80 via-gray-800/80 to-gray-900/80 backdrop-blur-xl  p-6 sm:p-8 border border-white/10 shadow-2xl"
      >
        {/* Sección de foto de perfil */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <CameraIcon className="w-6 h-6 text-fuchsia-400" />
              Foto de Perfil
            </h2>
          </div>

          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
            {/* Preview de imagen */}
            <div className="relative group">
              <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden border-2 border-fuchsia-500/30 bg-neutral-800 shadow-xl">
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Preview del perfil"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center">
                    <div className="w-20 h-20 bg-linear-to-r from-fuchsia-500/20 to-purple-600/20 rounded-full flex items-center justify-center mb-4">
                      <CameraIcon className="w-10 h-10 text-fuchsia-400" />
                    </div>
                    <p className="text-gray-400 text-center text-sm px-4">
                      Haz clic para subir tu foto
                    </p>
                  </div>
                )}
              </div>
              
              {/* Botón para cambiar foto */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-3 -right-3 w-12 h-12 bg-linear-to-r from-fuchsia-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform group-hover:shadow-[0_0_30px_rgba(224,46,250,0.5)]"
              >
                <PencilSquareIcon className="w-5 h-5 text-white" />
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
                onChange={handleImageChange}
              />
            </div>

            {/* Información de la foto */}
            <div className="flex-1">
              <div className="space-y-4">
                <div className="bg-neutral-800 rounded-xl p-4 border-2 border-fuchsia-500/30">
                  <h3 className="text-lg font-semibold text-white mb-2">Recomendaciones:</h3>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircleIcon className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                      <span>Usa una foto clara donde se vea tu rostro</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircleIcon className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                      <span>Formato JPG o PNG, máximo 5MB</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircleIcon className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                      <span>Puedes cambiarla después si lo deseas</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <p className="text-sm text-gray-400 mb-2">
                    {watch("photo")?.[0]?.name || "Ningún archivo seleccionado"}
                  </p>
                  {errors.photo && (
                    <p className="text-sm text-red-400">error</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Información personal */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2 mb-6">
              <CalendarIcon className="w-6 h-6 text-fuchsia-400" />
              Información Personal
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Edad */}
              <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-300 mb-2">
                  Edad <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    id="age"
                    min="18"
                    max="120"
                    className={`w-full bg-neutral-800 border ${
                      errors.age ? 'border-red-500/50' : 'border-gray-700'
                    } rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50 focus:border-transparent transition-all`}
                    placeholder="Ej: 25"
                    {...register("age", {
                      required: "La edad es requerida",
                      min: { value: 18, message: "Debes ser mayor de 18 años" },
                      max: { value: 120, message: "Edad no válida" },
                      valueAsNumber: true
                    })}
                  />
                  {errors.age && (
                    <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                      <span>⚠</span> {errors.age.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Ubicación */}
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-300 mb-2">
                  Ubicación <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 size-5" />
                  <input
                    type="text"
                    id="location"
                    className={`w-full bg-neutral-800 border ${
                      errors.location ? 'border-red-500/50' : 'border-gray-700'
                    } rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50 focus:border-transparent transition-all`}
                    placeholder="Ciudad, País"
                    {...register("location", {
                      required: "La ubicación es requerida",
                      minLength: { value: 3, message: "Ubicación muy corta" }
                    })}
                  />
                  {errors.location && (
                    <p className="mt-2 text-sm text-red-400">{errors.location.message}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Descripción */}
          <div>
            <label htmlFor="description" className="text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
              <ChatBubbleLeftRightIcon className="w-5 h-5 text-fuchsia-400" />
              Descripción
            </label>
            <div className="relative">
              <textarea
                id="description"
                rows={4}
                className="w-full bg-neutral-800 border border-gray-700 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50 focus:border-transparent transition-all resize-none"
                placeholder="Cuéntanos sobre ti, tu experiencia deportiva, habilidades, o lo que buscas en StreetUp..."
                {...register("description", {
                  maxLength: { value: 500, message: "Máximo 500 caracteres" }
                })}
              />
              <div className="mt-2 text-right">
                <span className="text-xs text-gray-500">
                  {watch('description')?.length || 0}/500 caracteres
                </span>
              </div>
              {errors.description && (
                <p className="mt-2 text-sm text-red-400">{errors.description.message}</p>
              )}
            </div>
          </div>

          {/* Deportes */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <TrophyIcon className="w-6 h-6 text-fuchsia-400" />
                Deportes que Practicas
              </h2>
              <span className="text-sm text-gray-400">
                {selectedSports.length} seleccionados
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {sportsOptions.map((sport) => {
                const isSelected = selectedSports.includes(sport.id);
                return (
                  <button
                    key={sport.id}
                    type="button"
                    onClick={() => toggleSport(sport.id)}
                    className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center gap-2 transition-all duration-300 ${
                      isSelected
                        ? 'bg-linear-to-br from-fuchsia-500/20 to-purple-600/20 border-fuchsia-500 text-fuchsia-300'
                        : 'bg-neutral-800 border-gray-700 text-gray-400 hover:border-fuchsia-500/50 hover:text-gray-300'
                    }`}
                  >
                    <span className="text-2xl">{sport.emoji}</span>
                    <span className="font-medium text-sm">{sport.label}</span>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      isSelected 
                        ? 'border-fuchsia-400 bg-fuchsia-400' 
                        : 'border-gray-600'
                    }`}>
                      {isSelected && (
                        <CheckCircleIcon className="w-4 h-4 text-white" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
            
            {errors.sports && (
              <p className="mt-4 text-sm text-red-400">{errors.sports.message}</p>
            )}
            
            <input
              type="hidden"
              {...register("sports", {
                validate: (value) => value.length > 0 || "Selecciona al menos un deporte"
              })}
            />
          </div>
        </div>

        {/* Botones de acción */}
        <div className="mt-12 pt-6 border-t border-white/10">
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white font-bold transition-all duration-300 hover:scale-105 flex-1"
            >
              Cancelar
            </button>
            
            <button
              type="submit"
              disabled={isPending || isSubmitting}
              className="px-8 py-4 bg-linear-to-r from-orange-600 to-neutral-950 hover:from-orange-700 hover:to-neutral-950 text-white font-bold transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 flex-1"
            >
              {isPending ? (
                <>
                  <ArrowPathIcon className="w-5 h-5 animate-spin" />
                  Creando Perfil...
                </>
              ) : (
                <>
                  <CheckCircleIcon className="w-5 h-5" />
                  Crear Mi Perfil
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}