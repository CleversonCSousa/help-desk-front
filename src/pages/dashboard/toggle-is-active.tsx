import { Ban, Check } from "lucide-react";
import { useToggleIsActiveMutation } from "../../features/service/api-slice";
import { toast } from "sonner";

type ToggleIsActiveProps = {
  id: string;
  value: boolean;
};

export const ToggleIsActive = ({ id, value }: ToggleIsActiveProps) => {
  const [toggleIsActiveApi] = useToggleIsActiveMutation();

  const handleToggleIsActiveApi = async () => {
    try {
      await toggleIsActiveApi({ id }).unwrap();
    } catch (err) {
      toast.error(err?.data?.message || "Internal server error", {
        classNames: {
          icon: "text-red-500",
        },
      });
    }
  };

  return (
    <button
      onClick={handleToggleIsActiveApi}
      className="flex cursor-pointer items-center gap-1 text-sm text-gray-300 hover:text-gray-700"
    >
      {value ? <Ban size={16} /> : <Check size={16} />}
      <span className="hidden md:inline">
        {value ? "Deactivate" : "Reactivate"}
      </span>
    </button>
  );
};
