import { useForm } from "react-hook-form";
import { DashboardContainer } from "../../components/dashboard-container";
import { FormGroup } from "../../components/form-group";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { useListServicesQuery } from "../../features/service/api-slice";
import { formatCurrency } from "../../utils/format-currency";
import { useCreateTicketMutation } from "../../features/ticket/api-slice";
import { toast } from "sonner";

type CreateTicketData = {
  title: string;
  description: string;
  serviceId: string;
};

export const CustomerCreateTicket = () => {
  const { data: services, isLoading: isLoadingServices } =
    useListServicesQuery();
  const [createTicketApi, { isLoading }] = useCreateTicketMutation();

  const { register, handleSubmit, watch, setValue, reset } =
    useForm<CreateTicketData>({
      defaultValues: {
        title: "",
        description: "",
        serviceId: "",
      },
    });

  const [openService, setOpenService] = useState(false);

  if (isLoadingServices) {
    return null;
  }

  const selectedServiceId = watch("serviceId");

  const selectedService = services?.find((s) => s.id === selectedServiceId);

  const onSubmit = async ({
    title,
    description,
    serviceId,
  }: CreateTicketData) => {
    try {
      await createTicketApi({
        title,
        description,
        serviceId,
      }).unwrap();

      toast.success("Ticket created successfully", {
        classNames: {
          icon: "text-green-500",
        },
      });

      reset();
    } catch (error) {
      const errorMessage = error?.data?.message || "Internal server error";
      toast.error(errorMessage, {
        classNames: {
          icon: "text-red-500",
        },
      });
    }
  };

  const handleSelectService = (id: string) => {
    setValue("serviceId", id);
    setOpenService(false);
  };

  return (
    <DashboardContainer className="flex flex-1 overflow-y-auto rounded-tl-3xl bg-white p-4 text-gray-200 min-[381px]:p-6 md:mt-3 md:p-12 md:pt-13 md:pr-12 md:pb-12">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto flex w-full max-w-6xl flex-col gap-6"
      >
        <h1 className="text-brand-blue-dark text-3xl font-bold">New ticket</h1>
        <div className="flex w-full items-start gap-6 max-md:flex-col">
          <div className="flex w-full flex-1 flex-col gap-6 rounded-lg border border-gray-500 bg-white p-6">
            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-bold text-gray-200">Information</h2>
              <p className="text-gray-300">Fill in the ticket details</p>
            </div>
            <div className="flex flex-col gap-4">
              <FormGroup
                label="TITLE"
                type="text"
                placeholder="Enter the ticket title"
                registration={register("title")}
              />
              <FormGroup
                label="DESCRIPTION"
                placeholder="Enter the ticket description"
                type="text"
                registration={register("description")}
              />
              <div
                id="service-select"
                className="relative flex flex-col text-gray-400"
              >
                <label className="text-xs font-bold tracking-[0.0225rem]">
                  SERVICE CATEGORY
                </label>
                <div
                  id="select-button"
                  onClick={() => setOpenService(!openService)}
                  className="mt-2 flex cursor-pointer items-center justify-between border-b border-gray-500 py-2"
                >
                  <div id="selected-value">
                    {selectedService?.title || "Select the service category"}
                  </div>
                  <div id="chevrons" className="flex">
                    {!openService && <ChevronDown size={20} />}
                    {openService && (
                      <ChevronUp size={20} className="text-brand-blue-light" />
                    )}
                  </div>
                </div>
                {openService && (
                  <ul id="options" className="mt-1 text-sm">
                    {services?.map((service) => {
                      const isSelected = selectedServiceId === service.id;
                      return (
                        <li
                          key={service.id}
                          className={`hover:text-brand-blue-light flex w-full cursor-pointer items-center gap-2 py-1 ${isSelected ? "text-brand-blue-light font-bold" : ""}`}
                          onClick={() => handleSelectService(service.id)}
                        >
                          <span>{service.title}</span>
                          {isSelected && (
                            <Check size={18} className="ml-auto" />
                          )}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col gap-6 rounded-lg border border-gray-500 bg-white p-6 md:w-60 lg:w-90 xl:w-100 2xl:w-md">
            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-bold text-gray-200">Summary</h2>
              <p className="text-gray-300">Price and details</p>
            </div>
            <div className="flex flex-col gap-4">
              {selectedService && (
                <div className="flex flex-col gap-0.5">
                  <h3 className="text-sm font-bold text-gray-400">
                    Service category
                  </h3>
                  <p className="text-gray-200">{selectedService.title}</p>
                </div>
              )}
              <div className="flex flex-col gap-0.5">
                <h3 className="text-sm font-bold text-gray-400">
                  Initial cost
                </h3>
                <p className="text-2xl font-bold text-gray-200">
                  {formatCurrency(selectedService?.price ?? 0)}
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-300">
              The ticket will be automatically assigned to an available
              technician
            </p>
            <button
              disabled={isLoading}
              className="h-10 w-full cursor-pointer rounded-md bg-black font-bold text-white disabled:opacity-50"
            >
              Create ticket
            </button>
          </div>
        </div>
      </form>
    </DashboardContainer>
  );
};
