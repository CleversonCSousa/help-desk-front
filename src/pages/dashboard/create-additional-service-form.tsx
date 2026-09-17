import { useForm } from "react-hook-form";
import { useCreateAdditionalServiceMutation } from "../../features/ticket/api-slice";
import { toast } from "sonner";
import { FormGroup } from "../../components/form-group";

type CreateAdditionalServiceFormProps = {
  ticketId: string;
  onSuccess: () => void;
};

type TicketAdditionalsServiceData = {
  description: string;
  price: number;
};

export const CreateAdditionalServiceForm = ({
  ticketId,
  onSuccess,
}: CreateAdditionalServiceFormProps) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<TicketAdditionalsServiceData>();

  const [createAdditionalServiceApi, { isLoading }] =
    useCreateAdditionalServiceMutation();

  async function onSubmit({
    description,
    price,
  }: TicketAdditionalsServiceData) {
    try {
      await createAdditionalServiceApi({
        ticketId,
        description,
        price,
      }).unwrap();

      toast.success("Additional service added successfully", {
        classNames: {
          icon: "text-green-500",
        },
      });

      reset();
      onSuccess();
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
    <form onSubmit={handleSubmit(onSubmit)} className="modal-form">
      <div className="flex flex-col gap-4 border-y border-gray-500 p-7 pb-8">
        <FormGroup
          label="DESCRIPTION"
          placeholder="Service description"
          type="text"
          registration={register("description", {
            required: "Description is required",
          })}
          error={errors.description}
        />
        <FormGroup
          label="PRICE"
          placeholder="$ 0.00"
          step="0.01"
          type="number"
          registration={register("price", {
            required: "Price is required",
            valueAsNumber: true,
          })}
          error={errors.price}
        />
      </div>
      <div className="px-7 py-6">
        <button
          disabled={isLoading}
          className="h-10 w-full cursor-pointer rounded-md bg-black font-bold text-white disabled:opacity-50"
        >
          Save
        </button>
      </div>
    </form>
  );
};
