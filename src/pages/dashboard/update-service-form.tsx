import { useForm } from "react-hook-form";
import { FormGroup } from "../../components/form-group";
import { useState } from "react";
import { toast } from "sonner";
import { useUpdateServiceMutation } from "../../features/service/api-slice";

type UpdateServiceData = {
  title: string;
  description?: string;
  price: number;
};

type UpdateServiceFormProps = {
  service: {
    id: string;
    title: string;
    description?: string;
    price: number;
  };
  onSuccess: () => void;
};

export const UpdateServiceForm = ({
  service,
  onSuccess,
}: UpdateServiceFormProps) => {
  const {
    handleSubmit,
    register,
    setError,
    reset,
    formState: { errors },
  } = useForm<UpdateServiceData>({
    defaultValues: {
      title: service.title,
      description: service.description,
      price: service.price,
    },
  });

  const [createServiceApi, { isLoading }] = useUpdateServiceMutation();
  const [apiError, setApiError] = useState<{
    status: number;
    message: string;
  } | null>(null);
  async function onSubmit({ title, description, price }: UpdateServiceData) {
    try {
      setApiError(null);
      const { message } = await createServiceApi({
        id: service.id,
        title,
        description,
        price,
      }).unwrap();

      toast.success(message, {
        classNames: {
          icon: "text-green-500",
        },
      });

      reset();

      onSuccess();
    } catch (error) {
      if (error?.status === 409) {
        setError("title", {
          type: "server",
          message: "Service already exists",
        });
      } else {
        setApiError({
          message: error?.data?.message || "Internal server error",
          status: error?.status || 500,
        });
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="modal-form">
      <div className="flex flex-col gap-4 border-y border-gray-500 p-7 pb-8">
        {apiError && (
          <span className="text-sm text-red-500">{apiError.message}</span>
        )}
        <FormGroup
          label="TITLE"
          placeholder="Service name"
          type="text"
          registration={register("title")}
          error={errors.title}
        />
        <FormGroup
          label="DESCRIPTION"
          placeholder="Service description"
          type="text"
          registration={register("description")}
          error={errors.description}
        />
        <FormGroup
          label="PRICE"
          placeholder="R$ 0,00"
          step="0.01"
          type="number"
          registration={register("price", {
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
