import { Trash } from "lucide-react";
import { useState } from "react";
import { useDeleteCustomerMutation } from "../../features/customer/customer-api-slice";
import { toast } from "sonner";
import { Modal } from "../../components/modal";
import { IconButton } from "../../components/icon-button";

type DeleteCustomerModalProps = {
  customer: {
    id: string;
    name: string;
  };
};

export const DeleteCustomerModal = ({ customer }: DeleteCustomerModalProps) => {
  const [modal, setModal] = useState(false);
  const [deleteServiceApi] = useDeleteCustomerMutation();

  const toggleModal = () => {
    setModal(!modal);
  };

  async function deleteUser() {
    try {
      const { message } = await deleteServiceApi({
        id: customer.id,
      }).unwrap();

      toast.success(message, {
        classNames: {
          icon: "text-green-500",
        },
      });
      toggleModal();
    } catch (error) {
      const errorMessage = error?.data?.message || "Internal server error";
      toast.error(errorMessage, {
        classNames: {
          icon: "text-red-500",
        },
      });
    }
  }

  return (
    <>
      <IconButton
        icon={<Trash size={16} />}
        variant="danger"
        onClick={toggleModal}
      />
      <Modal isOpen={modal} onClose={toggleModal} title="Delete customer">
        <div className="flex flex-col gap-5 border-y border-gray-500 p-7 pb-8">
          <p className="wrap-break-word">
            Are you sure you want to delete {customer.name}?
          </p>
          <p>
            Deleting this customer will remove all of their tickets. This action
            cannot be undone.
          </p>
        </div>
        <div className="flex gap-4 p-7 pt-0">
          <button
            onClick={toggleModal}
            className="h-10 w-1/2 cursor-pointer rounded-md bg-gray-500 text-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={deleteUser}
            className="h-10 w-1/2 cursor-pointer rounded-md bg-black text-white disabled:opacity-50"
          >
            Yes, delete
          </button>
        </div>
      </Modal>
    </>
  );
};
