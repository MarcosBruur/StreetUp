import type { ReactNode } from "react";

export default function Button({ children, onClick }: { children: string }) {
  return (
    <button className="bg-gray-200 w-1/4 border border-fuchsia-300 shadow-[0px_3px_19px_11px_#ea73ff]">
      <h1 className="hidden md:block text-5xl font-bold text-center py-2 px-5">
        {children}
      </h1>
    </button>
  );
}
