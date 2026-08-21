import { PenLineIcon, X } from "lucide-react";
import { useState } from "react";
import { UpdateServiceForm } from "./update-service-form";

type UpdateServiceModalProps = {
  service: {
    id: string;
    title: string;
    description?: string;
    price: number;
  };
};

export const UpdateServiceModal = ({ service }: UpdateServiceModalProps) => {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <>
      <button
        onClick={toggleModal}
        className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-500 transition-colors"
      >
        <PenLineIcon size={16} />
      </button>
      {modal && (
        <div className="fixed inset-0 z-1 flex items-center justify-center bg-black/50">
          <div className="mx-4 w-full max-w-md rounded-lg border-gray-500 bg-white">
            <header className="flex items-center justify-between px-7 py-5">
              <h2 className="text-xl font-bold text-gray-200">Service</h2>
              <button onClick={toggleModal} className="text-gray-300">
                <X size={24} />
              </button>
            </header>
            <UpdateServiceForm service={service} onSuccess={toggleModal} />
          </div>
        </div>
      )}
    </>
  );
};
