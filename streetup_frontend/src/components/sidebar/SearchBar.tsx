import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
export default function SearchBar() {
  return (
    <>
      <div className="w-full bg-white mt-5 p-2 flex">
        <form action="" className="w-full">
          <div className="flex gap-2">
            <label htmlFor="search" className="text-black">
              <MagnifyingGlassIcon className="w-5 h-auto mr-2" />
            </label>
            <input
              id="search"
              type="text"
              placeholder="Buscar"
              className="w-full focus:outline-none text-black"
            />
          </div>
        </form>
      </div>
    </>
  );
}
