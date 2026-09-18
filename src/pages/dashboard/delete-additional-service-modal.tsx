import { Trash } from "lucide-react";
import { useState } from "react";
import { Modal } from "../../components/modal";
import { IconButton } from "../../components/icon-button";
import { toast } from "sonner";
import { useDeleteAdditionalServiceMutation } from "../../features/ticket/api-slice";
import { useParams } from "react-router";

type DeleteAdditionalServiceModalProps = {
  additionalService: {
    id: string;
    description: string;
  };
};

export const DeleteAdditionalServiceModal = ({
  additionalService,
}: DeleteAdditionalServiceModalProps) => {
  const { id: ticketId } = useParams();
  const [modal, setModal] = useState(false);
  const [deleteAdditionalServiceApi, { isLoading }] =
    useDeleteAdditionalServiceMutation();

  const toggleModal = () => {
    setModal(!modal);
  };

  async function handleDelete() {
    try {
      await deleteAdditionalServiceApi({
        ticketId,
        additionalServiceId: additionalService.id,
      }).unwrap();

      toast.success("Additional service deleted successfully", {
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
      <Modal
        isOpen={modal}
        onClose={toggleModal}
        title="Delete additional service"
      >
        <div className="flex flex-col gap-5 border-y border-gray-500 p-7 pb-8">
          <p className="wrap-break-word">
            Are you sure you want to delete
            <span className="font-bold"> {additionalService.description} </span>
            additional service?
          </p>
          <p>This action cannot be undone.</p>
        </div>
        <div className="flex gap-4 px-7 py-6">
          <button
            onClick={toggleModal}
            className="h-10 w-1/2 cursor-pointer rounded-md bg-gray-500 text-gray-200"
          >
            Cancel
          </button>
          <button
            disabled={isLoading}
            onClick={() => handleDelete()}
            className="h-10 w-1/2 cursor-pointer rounded-md bg-black text-white disabled:opacity-50"
          >
            {isLoading ? "Deleting..." : "Yes, delete"}
          </button>
        </div>
      </Modal>
    </>
  );
};
