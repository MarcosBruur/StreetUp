import { useNavigate } from "react-router-dom";

export default function AnimatedButton({ children }: { children: string }) {
  const navigate = useNavigate();
  return (
    <button
      className="bg-gray-200 border rounded-br-2xl rounded-tl-2xl w-1/4
          hover:rounded-br-none hover:rounded-tl-none hover:rounded-bl-2xl hover:rounded-tr-2xl 
          hover:bg-gray-300 transition-all duration-500 
          border-fuchsia-300 shadow-[0px_3px_19px_11px_#ea73ff] 
          py-2  hover:shadow-[0px_3px_19px_11px_#ac0de0] "
      onClick={() => navigate(location.pathname + `?edit=true`)}
    >
      <p className="text-xl text-black font-bold hover:text-2xl transition-all">
        {children}
      </p>
    </button>
  );
}
