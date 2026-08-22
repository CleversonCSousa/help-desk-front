import { Trash, X } from "lucide-react";
import { useState } from "react";
import { useDeleteCustomerMutation } from "../../features/customer/customer-api-slice";
import { toast } from "sonner";

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
    } catch (error: any) {
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
      <button
        onClick={toggleModal}
        className="text-feedback-danger flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-md bg-gray-500"
      >
        <Trash size={16} />
      </button>
      {modal && (
        <div className="fixed inset-0 z-1 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md rounded-lg border-gray-500 bg-white">
            <header className="flex items-center justify-between px-7 py-5">
              <h2 className="text-xl font-bold text-gray-200">
                Delete customer
              </h2>
              <button onClick={toggleModal} className="text-gray-300">
                <X size={24} />
              </button>
            </header>
            <div className="flex flex-col gap-5 border-y border-gray-500 p-7 pb-8">
              <p className="wrap-break-word">
                Are you sure you want to delete {customer.name}
              </p>
              <p>
                Deleting this customer will remove all of their tickets. This
                action cannot be undone.
              </p>
            </div>
            <div className="flex gap-4 border-gray-500 p-7 pb-8">
              <button
                onClick={toggleModal}
                className="mt-6 h-10 w-1/2 cursor-pointer rounded-md bg-gray-500 text-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={deleteUser}
                className="mt-6 h-10 w-1/2 cursor-pointer rounded-md bg-black text-white disabled:opacity-50"
              >
                Yes, delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
