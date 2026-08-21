import { CreateServiceModal } from "./create-service-modal";
import { useListServicesQuery } from "../../features/service/api-slice";
import { ToggleIsActive } from "./toggle-is-active";
import { UpdateServiceModal } from "./update-service-modal";

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
      <div className="mt-6 overflow-hidden rounded-lg border border-gray-500 text-sm md:text-base">
        <table className="w-full">
          <thead className="border-b border-gray-500 text-gray-400">
            <tr>
              <th className="w-1/2 px-1.5 py-1 text-left font-medium min-[381px]:px-3 min-[381px]:py-2 md:px-6 md:py-4">
                Title
              </th>
              <th className="px-1.5 py-1 text-left font-medium whitespace-nowrap min-[381px]:px-3 min-[381px]:py-2 md:px-6 md:py-4">
                Price
              </th>
              <th className="w-px px-1.5 py-1 text-left font-medium whitespace-nowrap min-[381px]:px-3 min-[381px]:py-2 md:px-6 md:py-4">
                Status
              </th>
              <th className="w-px px-1.5 py-1 text-left font-medium whitespace-nowrap min-[381px]:px-3 min-[381px]:py-2 md:px-6 md:py-4"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-500">
            {services && services.length > 0 ? (
              services.map((service) => (
                <tr
                  key={service.id}
                  className="transition-colors hover:bg-gray-50"
                >
                  <td className="px-1.5 py-1 align-middle font-bold text-gray-900 min-[381px]:px-3 min-[381px]:py-2 md:px-6 md:py-4">
                    <span className="min-[381px]:hidden">Instalaç...</span>
                    <span className="hidden min-[381px]:inline">
                      {service.title}
                    </span>
                  </td>
                  <td className="px-1.5 py-1 align-middle whitespace-nowrap text-gray-700 min-[381px]:px-3 min-[381px]:py-2 md:px-6 md:py-4">
                    R$ {service.price.toFixed(2)}
                  </td>
                  <td className="px-1.5 py-1 align-middle whitespace-nowrap min-[381px]:px-3 min-[381px]:py-2 md:px-6 md:py-4">
                    <div
                      className={`${service.isActive ? "text-feedback-done bg-feedback-done/20" : "text-feedback-danger bg-feedback-danger/20"} mx-auto flex w-min items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium`}
                    >
                      <span>{service.isActive ? "Active" : "Inactive"}</span>
                    </div>
                  </td>
                  <td className="px-1.5 py-1 align-middle whitespace-nowrap min-[381px]:px-3 min-[381px]:py-2 md:px-6 md:py-4">
                    <div className="flex items-center gap-3">
                      <ToggleIsActive
                        id={service.id}
                        value={service.isActive ? true : false}
                      />
                      <UpdateServiceModal service={service} />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-8 text-center text-gray-400">
                  No services
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
};
