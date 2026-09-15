import { CreateServiceModal } from "./create-service-modal";
import { useListServicesQuery } from "../../features/service/api-slice";
import { ToggleIsActive } from "./toggle-is-active";
import { UpdateServiceModal } from "./update-service-modal";
import { Td, Th, Table } from "../../components/table";
import { Ban, CircleCheck } from "lucide-react";

export const DashboardAdminServicesContent = () => {
  const { data: services, isLoading } = useListServicesQuery();
  console.log("Serviços retornados da API:", services);
  if (isLoading) {
    return null;
  }

  return (
    <main className="flex-1 overflow-y-auto rounded-tl-3xl bg-white p-4 text-gray-200 min-[381px]:p-6 md:mt-3 md:p-12 md:pt-13 md:pr-12 md:pb-12">
      <div className="flex items-center justify-between">
        <h1 className="text-brand-blue-dark text-3xl font-bold">Services</h1>
        <CreateServiceModal />
      </div>
      <Table>
        <thead className="border-b border-gray-500 text-gray-400">
          <tr>
            <Th className="w-1/2">Title</Th>
            <Th className="whitespace-nowrap">Price</Th>
            <Th className="w-px whitespace-nowrap">Status</Th>
            <Th className="w-px whitespace-nowrap"></Th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-500">
          {services && services.length > 0 ? (
            services.map((service) => (
              <tr
                key={service.id}
                className="transition-colors hover:bg-gray-50"
              >
                <Td
                  className="w-1 max-w-20.5 truncate font-bold text-gray-950 min-[381px]:max-w-26 min-[430px]:max-w-36 sm:max-w-62.5 md:max-w-87.5"
                  title={service.title}
                >
                  {service.title}
                </Td>
                <Td className="whitespace-nowrap text-gray-700">
                  R$ {service.price.toFixed(2)}
                </Td>
                <Td className="whitespace-nowrap">
                  <div
                    className={`${service.isActive ? "text-feedback-done bg-feedback-done/20" : "text-feedback-danger bg-feedback-danger/20"} mx-auto flex w-min items-center gap-1.5 rounded-full text-sm font-medium max-lg:p-1.5 lg:px-3 lg:py-1`}
                  >
                    <span className="hidden lg:inline">
                      {service.isActive ? "Active" : "Inactive"}
                    </span>
                    <span className="inline lg:hidden">
                      {service.isActive ? (
                        <CircleCheck size={16} />
                      ) : (
                        <Ban size={16} />
                      )}
                    </span>
                  </div>
                </Td>
                <Td className="whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <ToggleIsActive
                      id={service.id}
                      value={service.isActive ? true : false}
                    />
                    <UpdateServiceModal service={service} />
                  </div>
                </Td>
              </tr>
            ))
          ) : (
            <tr>
              <Td colSpan={4} className="py-8 text-center text-gray-400">
                No services
              </Td>
            </tr>
          )}
        </tbody>
      </Table>
    </main>
  );
};
