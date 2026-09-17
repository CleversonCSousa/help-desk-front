import { useState } from "react";
import { IconButton } from "../../components/icon-button";
import { Plus } from "lucide-react";
import { Modal } from "../../components/modal";
import { CreateAdditionalServiceForm } from "./create-additional-service-form";

type CreateAdditionalServiceModalProps = {
  ticketId: string;
};

export const CreateAdditionalServiceModal = ({
  ticketId,
}: CreateAdditionalServiceModalProps) => {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };
  return (
    <>
      <IconButton
        onClick={toggleModal}
        icon={<Plus size={16} />}
        variant="primary"
      />
      <Modal isOpen={modal} onClose={toggleModal} title="Additional service">
        <CreateAdditionalServiceForm
          onSuccess={toggleModal}
          ticketId={ticketId}
        />
      </Modal>
    </>
  );
};
