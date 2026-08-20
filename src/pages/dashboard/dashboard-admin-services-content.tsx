import { Ban, PenLineIcon } from "lucide-react";
import { CreateServiceModal } from "./create-service-modal";

export const DashboardAdminServicesContent = () => {
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
            <tr className="transition-colors hover:bg-gray-50">
              <td className="px-1.5 py-1 align-middle font-bold text-gray-900 min-[381px]:px-3 min-[381px]:py-2 md:px-6 md:py-4">
                <span className="min-[381px]:hidden">Instalaç...</span>
                <span className="hidden min-[381px]:inline">
                  Network installation
                </span>
              </td>
              <td className="px-1.5 py-1 align-middle whitespace-nowrap text-gray-700 min-[381px]:px-3 min-[381px]:py-2 md:px-6 md:py-4">
                R$ 180,00
              </td>
              <td className="px-1.5 py-1 align-middle whitespace-nowrap min-[381px]:px-3 min-[381px]:py-2 md:px-6 md:py-4">
                <div className="text-feedback-done bg-feedback-done/20 mx-auto flex w-min items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium">
                  <span>Active</span>
                </div>
              </td>
              <td className="px-1.5 py-1 align-middle whitespace-nowrap min-[381px]:px-3 min-[381px]:py-2 md:px-6 md:py-4">
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-1 text-sm text-gray-300 hover:text-gray-700">
                    <Ban size={16} />
                    <span className="hidden md:inline">Deactivate</span>
                  </button>
                  <button className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-500 transition-colors">
                    <PenLineIcon size={16} />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
};
