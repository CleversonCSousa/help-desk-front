import { PenLineIcon } from "lucide-react";
import { useListTicketsQuery } from "../../features/ticket/api-slice";
import { useState } from "react";
import { Pagination } from "./pagination";
import { Link } from "react-router";
import { formatDate } from "../../utils/format-date";
import { formatCurrency } from "../../utils/format-currency";
import { TICKET_STATUS_CONFIG } from "../../utils/status-config";
import { Avatar } from "../../components/avatar";
import { Table, Td, Th } from "../../components/table";

export const DashboardAdminTicketsContent = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const { data: pageData, isLoading } = useListTicketsQuery(currentPage);
  if (isLoading) {
    return null;
  }

  const tickets = pageData?.content ?? [];
  const totalPages = pageData?.totalPages ?? 0;

  return (
    <main className="flex-1 overflow-y-auto rounded-tl-3xl bg-white p-4 text-gray-200 min-[381px]:p-6 md:mt-3 md:p-12 md:pt-13 md:pr-12 md:pb-12">
      <h1 className="text-brand-blue-dark text-3xl font-bold">Tickets</h1>
      <Table>
        <thead className="border-b border-gray-500 text-gray-400">
          <tr>
            <Th className="hidden w-px whitespace-nowrap md:table-cell">
              Atualizado em
            </Th>
            <Th className="w-px whitespace-nowrap md:hidden">Atualiz...</Th>
            <Th className="hidden w-px whitespace-nowrap lg:table-cell">Id</Th>
            <Th className="w-full">Título e Serviço</Th>
            <Th className="hidden w-px whitespace-nowrap 2xl:table-cell">
              Valor total
            </Th>
            <Th className="hidden w-px whitespace-nowrap 2xl:table-cell">
              Cliente
            </Th>
            <Th className="hidden w-px whitespace-nowrap 2xl:table-cell">
              Técnico
            </Th>
            <Th className="w-px whitespace-nowrap">Status</Th>
            <Th className="w-px whitespace-nowrap"></Th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-500">
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
                <Td className="hidden font-bold whitespace-nowrap text-gray-900 lg:table-cell">
                  {String(ticket.code).padStart(5, "0")}
                </Td>
                <Td>
                  <p className="font-bold text-gray-900">{ticket.title}</p>
                  <span className="text-sm">{ticket.serviceName}</span>
                </Td>
                <Td className="hidden whitespace-nowrap text-gray-700 2xl:table-cell">
                  {formatCurrency(ticket.totalPrice)}
                </Td>
                <Td className="hidden whitespace-nowrap 2xl:table-cell">
                  <div className="flex items-center gap-2">
                    <Avatar
                      name={ticket.customerName}
                      className="h-7 w-7 text-xs text-white"
                    />
                    <span className="font-medium text-gray-900">
                      {ticket.customerName}
                    </span>
                  </div>
                </Td>
                <Td className="hidden whitespace-nowrap 2xl:table-cell">
                  <div className="flex items-center gap-2">
                    <Avatar
                      name={ticket.technicianName}
                      className="h-7 w-7 text-xs text-white"
                    />
                    <span className="font-medium text-gray-900">
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
                    <button className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md bg-gray-500 transition-colors">
                      <PenLineIcon size={16} />
                    </button>
                  </Link>
                </Td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(newPage) => setCurrentPage(newPage)}
      />
    </main>
  );
};
