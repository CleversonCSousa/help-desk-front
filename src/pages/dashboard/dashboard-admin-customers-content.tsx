import { PenLineIcon } from "lucide-react";
import { useListCustomersQuery } from "../../features/customer/customer-api-slice";
import { CreateServiceModal } from "./create-service-modal";
import { DeleteCustomerModal } from "./delete-customer-modal";

export const DashboardAdminCustomersContent = () => {
  const { data: customers, isLoading } = useListCustomersQuery();
  console.log(customers);
  if (isLoading) {
    return null;
  }

  function getInitialsName(name: string) {
    const splitName = name.trim().split(/\s+/);

    const firstLetter = splitName[0][0];

    if (splitName.length === 1) {
      return {
        firstLetter,
        lastLetter: "",
      };
    }

    return {
      firstLetter,
      lastLetter: splitName[splitName.length - 1][0],
    };
  }

  return (
    <main className="flex-1 overflow-y-auto rounded-tl-3xl bg-white p-4 text-gray-200 min-[381px]:p-6 md:mt-3 md:p-12 md:pt-13 md:pr-12 md:pb-12">
      <div className="flex items-center justify-between">
        <h1 className="text-brand-blue-dark text-3xl font-bold">Customers</h1>
        <CreateServiceModal />
      </div>
      <div className="mt-6 overflow-hidden rounded-lg border border-gray-500 text-sm md:text-base">
        <table className="w-full table-fixed">
          <thead className="border-b border-gray-500 text-gray-400">
            <tr>
              <th className="w-[40%] px-1.5 py-1 text-left font-medium min-[381px]:px-3 min-[381px]:py-2 md:px-6 md:py-4">
                Name
              </th>
              <th className="px-1.5 py-1 text-left font-medium min-[381px]:px-3 min-[381px]:py-2 md:px-6 md:py-4">
                Email
              </th>
              <th className="w-[88px] px-1.5 py-1 text-left font-medium whitespace-nowrap min-[381px]:px-3 min-[381px]:py-2 md:px-6 md:py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-500">
            {customers?.map((customer) => {
              const initialsName = getInitialsName(customer.name);
              return (
                <tr
                  key={customer.id}
                  className="transition-colors hover:bg-gray-50"
                >
                  <td className="min-w-0 px-3 py-2 align-middle font-bold text-gray-900 md:px-6 md:py-4">
                    <div
                      className="flex items-center max-md:gap-2 md:gap-4"
                      title={customer.name}
                    >
                      <div className="bg-brand-blue-dark flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-gray-600">
                        {initialsName.firstLetter}
                        {initialsName.lastLetter}
                      </div>
                      <div className="min-w-0 truncate" title={customer.name}>
                        {customer.name}
                      </div>
                    </div>
                  </td>
                  <td className="min-w-0 px-3 py-2 align-middle text-gray-700 md:px-6 md:py-4">
                    <div className="truncate" title={customer.email}>
                      {customer.email}
                    </div>
                  </td>
                  <td className="w-[88px] px-2 py-1 align-middle md:px-3 md:py-4">
                    <div className="flex shrink-0 items-center justify-end gap-1.5">
                      <button className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-md bg-gray-500">
                        <PenLineIcon size={16} />
                      </button>
                      <DeleteCustomerModal customer={customer} />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
};
