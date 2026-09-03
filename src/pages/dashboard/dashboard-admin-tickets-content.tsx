import {
  CheckCircle2Icon,
  CircleQuestionMark,
  ClockIcon,
  PenLineIcon,
} from "lucide-react";
import {
  useListTicketsQuery,
  type TicketStatus,
} from "../../features/ticket/api-slice";
import { useState, type ReactNode } from "react";
import { Pagination } from "./pagination";

export const DashboardAdminTicketsContent = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const { data: pageData, isLoading } = useListTicketsQuery(currentPage);
  if (isLoading) {
    return null;
  }

  const tickets = pageData?.content ?? [];
  const totalPages = pageData?.totalPages ?? 0;

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

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${month}/${day}/${year} ${hours}:${minutes}`;
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  const statusConfig: Record<
    TicketStatus,
    { label: string; className: string; icon: ReactNode }
  > = {
    OPEN: {
      label: "Open",
      className: "text-feedback-open bg-feedback-open/20",
      icon: <CircleQuestionMark size={16} />,
    },
    IN_PROGRESS: {
      label: "In progress",
      className: "text-feedback-progress bg-feedback-progress/20",
      icon: <ClockIcon size={16} />,
    },
    CLOSED: {
      label: "Closed",
      className: "text-feedback-done bg-feedback-done/20",
      icon: <CheckCircle2Icon size={16} />,
    },
  };

  return (
    <main className="flex-1 overflow-y-auto rounded-tl-3xl bg-white p-4 text-gray-200 min-[381px]:p-6 md:mt-3 md:p-12 md:pt-13 md:pr-12 md:pb-12">
      <h1 className="text-brand-blue-dark text-3xl font-bold">Tickets</h1>
      <div className="mt-6 overflow-hidden rounded-lg border border-gray-500 text-sm md:text-base">
        <table className="w-full">
          <thead className="border-b border-gray-500 text-gray-400">
            <tr>
              <th className="hidden w-px text-left font-medium whitespace-nowrap md:table-cell md:px-6 md:py-4">
                Atualizado em
              </th>
              <th className="w-px px-1.5 py-1 text-left font-medium whitespace-nowrap min-[381px]:px-3 min-[381px]:py-2 md:hidden">
                Atualiz...
              </th>
              <th className="hidden w-px text-left font-medium whitespace-nowrap lg:table-cell lg:px-6 lg:py-4">
                Id
              </th>
              <th className="w-full px-1.5 py-1 text-left font-medium min-[381px]:px-3 min-[381px]:py-2 md:px-6 md:py-4">
                Título e Serviço
              </th>
              <th className="hidden w-px text-left font-medium whitespace-nowrap 2xl:table-cell 2xl:px-6 2xl:py-4">
                Valor total
              </th>
              <th className="hidden w-px text-left font-medium whitespace-nowrap 2xl:table-cell 2xl:px-6 2xl:py-4">
                Cliente
              </th>
              <th className="hidden w-px text-left font-medium whitespace-nowrap 2xl:table-cell 2xl:px-6 2xl:py-4">
                Técnico
              </th>
              <th className="w-px px-1.5 py-1 text-left font-medium whitespace-nowrap min-[381px]:px-3 min-[381px]:py-2 md:px-6 md:py-4">
                Status
              </th>
              <th className="w-px px-1.5 py-1 text-left font-medium whitespace-nowrap min-[381px]:px-3 min-[381px]:py-2 md:px-6 md:py-4"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-500">
            {tickets?.map((ticket) => {
              const currentStatus = statusConfig[ticket.status];
              const customerInitials = getInitialsName(ticket.customerName);
              const technicianInitials = getInitialsName(ticket.technicianName);

              const formattedDate = formatDate(ticket.updatedAt);
              const [datePart, timePart] = formattedDate.split(" ");

              return (
                <tr
                  key={ticket.id}
                  className="transition-colors hover:bg-gray-50"
                >
                  <td className="px-1.5 py-1 align-middle whitespace-nowrap min-[381px]:px-3 min-[381px]:py-2 md:px-6 md:py-4">
                    <div className="flex flex-col md:block">
                      <div className="flex flex-col md:hidden">
                        <span>{datePart}</span>
                        <span>{timePart}</span>
                      </div>
                      <span className="hidden md:inline">
                        {formatDate(ticket.updatedAt)}
                      </span>
                    </div>
                  </td>
                  <td className="hidden align-middle font-bold whitespace-nowrap text-gray-900 lg:table-cell lg:px-6 lg:py-4">
                    {String(ticket.code).padStart(5, "0")}
                  </td>
                  <td className="px-1.5 py-1 align-middle min-[381px]:px-3 min-[381px]:py-2 md:px-6 md:py-4">
                    <p className="font-bold text-gray-900">{ticket.title}</p>
                    <span className="text-sm">{ticket.serviceName}</span>
                  </td>
                  <td className="hidden align-middle whitespace-nowrap text-gray-700 2xl:table-cell 2xl:px-6 2xl:py-4">
                    {formatCurrency(ticket.totalPrice)}
                  </td>
                  <td className="hidden align-middle whitespace-nowrap 2xl:table-cell 2xl:px-6 2xl:py-4">
                    <div className="flex items-center gap-2">
                      <div className="bg-brand-blue-dark flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-white">
                        {customerInitials.firstLetter}
                        {customerInitials.lastLetter}
                      </div>
                      <span className="font-medium text-gray-900">
                        {ticket.customerName}
                      </span>
                    </div>
                  </td>
                  <td className="hidden align-middle whitespace-nowrap 2xl:table-cell 2xl:px-6 2xl:py-4">
                    <div className="flex items-center gap-2">
                      <div className="bg-brand-blue-dark flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-white">
                        {technicianInitials.firstLetter}
                        {technicianInitials.lastLetter}
                      </div>
                      <span className="font-medium text-gray-900">
                        {ticket.technicianName}
                      </span>
                    </div>
                  </td>
                  <td className="px-1.5 py-1 align-middle whitespace-nowrap min-[381px]:px-3 min-[381px]:py-2 md:px-6 md:py-4">
                    <div
                      className={`${currentStatus.className} mx-auto flex w-min items-center gap-1.5 rounded-full px-1 py-1 text-sm font-medium md:px-3`}
                    >
                      {currentStatus.icon}
                      <span className="hidden md:inline">
                        {currentStatus.label}
                      </span>
                    </div>
                  </td>
                  <td className="px-1.5 py-1 align-middle whitespace-nowrap min-[381px]:px-3 min-[381px]:py-2 md:px-6 md:py-4">
                    <button className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-500 transition-colors">
                      <PenLineIcon size={16} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(newPage) => setCurrentPage(newPage)}
      />
    </main>
  );
};
