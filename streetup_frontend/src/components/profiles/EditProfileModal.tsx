import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useLocation, useNavigate } from "react-router-dom";

import EditProfileForm from "./EditProfileForm";

export default function EditProfileModal() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const show = !!queryParams.get("new");
  const navigate = useNavigate();

  return (
    <>
      <Transition appear show={show} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10 "
          onClose={() => navigate(location.pathname, { replace: true })}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/20" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto ">
            <div className="flex min-h-full items-center justify-center p-4 text-center ">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="transform overflow-hidden rounded-lg bg-linear-to-br from-gray-800 via-fuchsia-950 to-gray-800  px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Personalizar Perfil</h2>
                    <button
                      type="button"
                      onClick={() =>
                        navigate(location.pathname, { replace: true })
                      }
                      className="bg-red-700 text-white  rounded-full hover:bg-red-600 hover:scale-110 transition-all border-2 border-black shadow-2xl shadow-red-900"
                    >
                      <XMarkIcon className="size-10 text-black" />
                    </button>
                  </div>

                  <EditProfileForm />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
