import type { ReactNode } from "react";

export default function Error({ children }: { children: ReactNode }) {
  return (
    <p className="text-sm bg-gray-700 text-white py-2 mx-5 font-medium text-center mb-2">
      {children}
    </p>
  );
}
