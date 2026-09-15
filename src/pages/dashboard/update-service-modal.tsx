import { PenLineIcon } from "lucide-react";
import { useState } from "react";
import { UpdateServiceForm } from "./update-service-form";
import { Modal } from "../../components/modal";
import { IconButton } from "../../components/icon-button";

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
      <IconButton icon={<PenLineIcon size={16} />} onClick={toggleModal} />
      <Modal isOpen={modal} onClose={toggleModal} title="Service">
        <UpdateServiceForm service={service} onSuccess={toggleModal} />
      </Modal>
    </>
  );
};
