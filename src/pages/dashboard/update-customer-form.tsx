import { useForm } from "react-hook-form";
import { FormGroup } from "../../components/form-group";
import { toast } from "sonner";
import { useUpdateCustomerMutation } from "../../features/customer/customer-api-slice";

type UpdateServiceData = {
  name: string;
  email: string;
};

type UpdateCustomerFormProps = {
  customer: {
    id: string;
    name: string;
    email: string;
  };
  onSuccess: () => void;
};

export const UpdateCustomerForm = ({
  customer,
  onSuccess,
}: UpdateCustomerFormProps) => {
  const {
    handleSubmit,
    register,
    reset,
    setError,
    formState: { errors },
  } = useForm<UpdateServiceData>({
    defaultValues: {
      email: customer.email,
      name: customer.name,
    },
  });

  const [updateCustomerApi, { isLoading }] = useUpdateCustomerMutation();

  async function onSubmit({ email, name }: UpdateServiceData) {
    try {
      const { message } = await updateCustomerApi({
        id: customer.id,
        name,
        email,
      }).unwrap();

      toast.success(message, {
        classNames: {
          icon: "text-green-500",
        },
      });

      reset();

      onSuccess();
    } catch (error: any) {
      if (error?.status === 409) {
        setError("email", {
          type: "server",
          message: "Email already in use",
        });
      } else {
        const errorMessage = error?.data?.message || "Internal server error";
        toast.error(errorMessage, {
          classNames: {
            icon: "text-red-500",
          },
        });
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="modal-form">
      <div className="flex flex-col gap-4 border-y border-gray-500 p-7 pb-8">
        <FormGroup
          error={errors.name}
          label="NAME"
          registration={register("name", { required: "Name is required" })}
          type="text"
        />
        <FormGroup
          label="E-MAIL"
          registration={register("email", {
            required: "Email is required",
          })}
          type="email"
          error={errors.email}
        />
      </div>
      <div className="px-7 py-6">
        <button
          disabled={isLoading}
          className="h-10 w-full cursor-pointer rounded-md bg-black font-bold text-white disabled:opacity-50"
        >
          {isLoading ? "Updating..." : "Save"}
        </button>
      </div>
    </form>
  );
};
