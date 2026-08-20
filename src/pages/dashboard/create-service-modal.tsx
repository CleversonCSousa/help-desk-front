import { Plus, X } from "lucide-react";
import { useState } from "react";
import { CreateServiceForm } from "./create-service-form";

export const CreateServiceModal = () => {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <>
      <button
        onClick={toggleModal}
        className="flex h-10 cursor-pointer items-center gap-2 rounded-lg bg-gray-200 px-4 text-sm font-medium text-white transition-colors hover:opacity-90"
      >
        <Plus size={18} />
        <span className="font-bold text-gray-600">New</span>
      </button>
      {modal && (
        <div className="fixed inset-0 z-1 flex items-center justify-center bg-black/50">
          <div className="mx-4 w-full max-w-md rounded-lg border-gray-500 bg-white">
            <header className="flex items-center justify-between px-7 py-5">
              <h2 className="text-xl font-bold text-gray-200">
                Create service
              </h2>
              <button onClick={toggleModal} className="text-gray-300">
                <X size={24} />
              </button>
            </header>
            <CreateServiceForm onSuccess={toggleModal} />
          </div>
        </div>
      )}
    </>
  );
};
