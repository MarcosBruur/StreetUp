import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

export default function Error404View() {
  return (
    <>
      <div className="h-full w-auto flex items-center justify-center">

      <div className="shadow-[0px_0px_32px_7px_#cfab0a] p-4 flex gap-4 bg-linear-to-br from-gray-800 to-gray-900 pt-8 md:mx-5">
      <ExclamationTriangleIcon className="size-10 text-yellow-600 mx-auto mb-4" />
      <h1 className="text-3xl text-yellow-600 text-center font-bold">
        PROXIMAMENTE...
      </h1>
      <ExclamationTriangleIcon className="size-10 text-yellow-600 mx-auto mb-4" />
      </div>
      </div>
      
    </>
  );
}
