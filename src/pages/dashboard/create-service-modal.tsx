import { Plus } from "lucide-react";
import { useState } from "react";
import { CreateServiceForm } from "./create-service-form";
import { Modal } from "../../components/modal";

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
      <Modal isOpen={modal} onClose={toggleModal} title="Create service">
        <CreateServiceForm onSuccess={toggleModal} />
      </Modal>
    </>
  );
};
