import { Avatar } from "../../components/avatar";
import { useListCustomersQuery } from "../../features/customer/customer-api-slice";
import { DeleteCustomerModal } from "./delete-customer-modal";
import { UpdateCustomerModal } from "./update-customer-modal";
import { Td, Th, Table } from "../../components/table";

export const DashboardAdminCustomersContent = () => {
  const { data: customers, isLoading } = useListCustomersQuery();
  console.log(customers);
  if (isLoading) {
    return null;
  }

  return (
    <main className="flex-1 overflow-y-auto rounded-tl-3xl bg-white p-4 text-gray-200 min-[381px]:p-6 md:mt-3 md:p-12 md:pt-13 md:pr-12 md:pb-12">
      <div className="flex items-center justify-between">
        <h1 className="text-brand-blue-dark text-3xl font-bold">Customers</h1>
      </div>
      <Table fixed={true}>
        <thead className="border-b border-gray-500 text-gray-400">
          <tr>
            <Th className="w-[40%]">Name</Th>
            <Th>Email</Th>
            <Th className="w-[88px]"></Th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-500">
          {customers?.map((customer) => {
            return (
              <tr
                key={customer.id}
                className="transition-colors hover:bg-gray-50"
              >
                <Td className="font-bold text-gray-900">
                  <div
                    className="flex items-center max-md:gap-2 md:gap-4"
                    title={customer.name}
                  >
                    <Avatar name={customer.name} className="h-10 w-10" />
                    <div className="min-w-0 truncate" title={customer.name}>
                      {customer.name}
                    </div>
                  </div>
                </Td>
                <Td className="text-gray-700">
                  <div className="truncate" title={customer.email}>
                    {customer.email}
                  </div>
                </Td>
                <Td>
                  <div className="flex shrink-0 items-center justify-end gap-1.5">
                    <UpdateCustomerModal customer={customer} />
                    <DeleteCustomerModal customer={customer} />
                  </div>
                </Td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </main>
  );
};
