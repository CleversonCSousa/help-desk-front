import { Eye } from "lucide-react";
import { useListTicketsQuery } from "../../features/ticket/api-slice";
import { useState } from "react";
import { Pagination } from "./pagination";
import { Link } from "react-router";
import { formatDate } from "../../utils/format-date";
import { formatCurrency } from "../../utils/format-currency";
import { TICKET_STATUS_CONFIG } from "../../utils/status-config";
import { Avatar } from "../../components/avatar";
import { Table, Td, Th } from "../../components/table";
import { DashboardContainer } from "../../components/dashboard-container";
import { IconButton } from "../../components/icon-button";

export const DashboardCustomerTicketsContent = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const { data: pageData, isLoading } = useListTicketsQuery({
    page: currentPage,
  });
  if (isLoading) {
    return null;
  }

  const tickets = pageData?.content ?? [];
  const totalPages = pageData?.totalPages ?? 0;

  return (
    <DashboardContainer>
      <h1 className="text-brand-blue-dark text-3xl font-bold">Tickets</h1>
      {tickets.length > 0 ? (
        <Table>
          <thead className="border-b border-gray-500 text-gray-200">
            <tr>
              <Th className="hidden w-px whitespace-nowrap md:table-cell">
                Updated at
              </Th>
              <Th className="w-px whitespace-nowrap md:hidden">Update...</Th>
              <Th className="hidden w-px whitespace-nowrap lg:table-cell">
                Id
              </Th>
              <Th className="w-full lg:w-auto">Title</Th>
              <Th className="hidden whitespace-nowrap lg:table-cell">
                Service
              </Th>
              <Th className="hidden w-px whitespace-nowrap 2xl:table-cell">
                Total price
              </Th>
              <Th className="hidden w-px whitespace-nowrap 2xl:table-cell">
                Technician
              </Th>
              <Th className="w-px whitespace-nowrap">Status</Th>
              <Th className="w-px whitespace-nowrap"></Th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-400">
            {tickets?.map((ticket) => {
              const currentStatus = TICKET_STATUS_CONFIG[ticket.status];

              const formattedDate = formatDate(ticket.updatedAt);
              const [datePart, timePart] = formattedDate.split(" ");

              return (
                <tr
                  key={ticket.id}
                  className="transition-colors hover:bg-gray-50"
                >
                  <Td className="whitespace-nowrap">
                    <div className="flex flex-col md:block">
                      <div className="flex flex-col md:hidden">
                        <span>{datePart}</span>
                        <span>{timePart}</span>
                      </div>
                      <span className="hidden md:inline">
                        {formatDate(ticket.updatedAt)}
                      </span>
                    </div>
                  </Td>
                  <Td className="hidden font-bold whitespace-nowrap text-gray-200 lg:table-cell">
                    {String(ticket.code).padStart(5, "0")}
                  </Td>
                  <Td>
                    <p className="font-bold text-gray-200">{ticket.title}</p>
                  </Td>
                  <Td className="hidden whitespace-nowrap text-gray-200 lg:table-cell">
                    {ticket.serviceName}
                  </Td>
                  <Td className="hidden whitespace-nowrap text-gray-200 2xl:table-cell">
                    {formatCurrency(ticket.totalPrice)}
                  </Td>
                  <Td className="hidden whitespace-nowrap 2xl:table-cell">
                    <div className="flex items-center gap-2">
                      <Avatar
                        name={ticket.technicianName}
                        className="h-7 w-7 text-xs text-white"
                      />
                      <span className="font-medium text-gray-200">
                        {ticket.technicianName}
                      </span>
                    </div>
                  </Td>
                  <Td className="whitespace-nowrap">
                    <div
                      className={`${currentStatus.className} mx-auto flex w-min items-center gap-1.5 rounded-full px-1 py-1 text-sm font-medium md:px-3`}
                    >
                      {currentStatus.icon}
                      <span className="hidden md:inline">
                        {currentStatus.label}
                      </span>
                    </div>
                  </Td>
                  <Td className="whitespace-nowrap">
                    <Link to={`/dashboard/tickets/${ticket.id}`}>
                      <IconButton icon={<Eye size={16} />} />
                    </Link>
                  </Td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      ) : (
        <p className="mt-6 text-gray-400">There are no tickets</p>
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(newPage) => setCurrentPage(newPage)}
      />
    </DashboardContainer>
  );
};
