import NewProfileForm from "../../components/profiles/NewProfileForm";
import { useAuth } from "../../hooks/useAuth";

export default function NewProfile() {
  const { data } = useAuth();

  return (
    <>
      <h1 className="mt-10 text-center text-4xl font-bold shadow-xl">
        Crear perfil
      </h1>
      <p className="mt-2 text-center text-xl">
        Bienvenido{" "}
        <span className="font-bold text-2xl border-b-2 capitalize shadow-[0px_7px_0px_-1px_rgba(147,51,234,0.5)]">
          {data?.userName}
        </span>{" "}
        a StreetUp. <br />
        Casi todo está listo, para continuar creá tu perfil
      </p>

      <div className="flex justify-center mt-10">
        <div className="md:w-1/2 w-11/12 bg-gray-200 rounded-xl py-5">
          <NewProfileForm />
        </div>
      </div>
    </>
  );
}
