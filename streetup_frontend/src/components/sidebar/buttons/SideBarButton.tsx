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
        className={`md:flex md:gap-2 md:w-full py-3 px-3 hover:bg-purple-800/50 ${
          active ? "bg-purple-800/60" : ""
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
