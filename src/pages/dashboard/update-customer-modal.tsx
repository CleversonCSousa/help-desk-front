import { PenLineIcon } from "lucide-react";
import { useState } from "react";
import { UpdateCustomerForm } from "./update-customer-form";
import { Modal } from "../../components/modal";
import { IconButton } from "../../components/icon-button";

type UpdateCustomModalProps = {
  customer: {
    id: string;
    name: string;
    email: string;
  };
};

export const UpdateCustomerModal = ({ customer }: UpdateCustomModalProps) => {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <>
      <IconButton icon={<PenLineIcon size={16} />} onClick={toggleModal} />
      <Modal isOpen={modal} onClose={toggleModal} title="Customer">
        <UpdateCustomerForm customer={customer} onSuccess={toggleModal} />
      </Modal>
    </>
  );
};
