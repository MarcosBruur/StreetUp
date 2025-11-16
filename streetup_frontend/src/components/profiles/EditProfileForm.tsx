import { PencilSquareIcon } from "@heroicons/react/24/solid";

export default function EditProfileForm() {
  return (
    <form action="" className="mt-2">
      <div className="flex justify-center mt-2">
        <div className="relative">
          <img src="/static/player.jpg" alt="imagen de perfil" />

          <button className="absolute top-0 right-0 hover:scale-110 transition-transform">
            <PencilSquareIcon className="h-10 w-10" />
          </button>

          <input type="file" accept="image/*" className="hidden" />
        </div>
      </div>
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
          />
        </div>

        <div className="flex gap-2 items-center">
          <label htmlFor="age" className="hidden">
            Ubicación:
          </label>
          <input
            type="text"
            id="ubication"
            className="bg-white px-2 w-full text-black"
            placeholder="Ingresa tu ubicación"
          />
        </div>

        <div className="flex gap-2 items-center">
          <label htmlFor="description" className="hidden">
            Descripción:
          </label>
          <textarea
            name="description"
            id="description"
            className="bg-white px-2 w-full text-black"
            placeholder="Descripción"
          />
        </div>
        <div className="flex gap-2 items-center">
          <label htmlFor="sport" className="font-bold">
            Deportes:
          </label>
          <label htmlFor="futbol">Futbol</label>
          <input
            type="checkbox"
            id="futbol"
            value="futbol"
            className="size-6"
          />
          <label htmlFor="basquet">Basquet</label>
          <input
            type="checkbox"
            id="basquet"
            value="basquet"
            className="size-6"
          />
        </div>
      </div>
    </form>
  );
}
