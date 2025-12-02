import { type ReactNode } from "react";

export default function SideBarButton({
  children,
  name,
  active,
}: {
  children: ReactNode;
  name: string;
  active: boolean;
}) {
  return (
    <>
      <div
        className={`md:flex md:gap-2 md:w-full transition-colors py-3 px-3 hover:bg-purple-800/50 ${
          active
            ? "bg-linear-to-r from-fuchsia-600 via-violet-800 to-fuchsia-600 border border-fuchsia-300 font-bold"
            : ""
        }`}
      >
        <label htmlFor="search">{children}</label>
        <p id="search" className="md:w-full md:cursor-pointer hidden md:block">
          {name}
        </p>
      </div>
    </>
  );
}
