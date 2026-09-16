import { CircleCheckBig, Clock2, PenLine } from "lucide-react";
import { DashboardContainer } from "../../components/dashboard-container";
import { IconButton } from "../../components/icon-button";
import { TICKET_STATUS_CONFIG } from "../../utils/status-config";
import { Avatar } from "../../components/avatar";
import {
  useListTicketsQuery,
  type TicketSummary,
} from "../../features/ticket/api-slice";
import { formatDate } from "../../utils/format-date";
import { formatCurrency } from "../../utils/format-currency";

type CardProps = {
  ticket: TicketSummary;
};

const Card = ({ ticket }: CardProps) => {
  const currentStatus = TICKET_STATUS_CONFIG[ticket.status];
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-gray-500 p-5">
      <div className="flex justify-between">
        <div>
          <span className="text-md font-bold text-gray-400">
            {String(ticket.code).padStart(5, "0")}
          </span>
          <p className="font-bold text-gray-100">{ticket.title}</p>
          <p className="text-md text-gray-200">{ticket.serviceName}</p>
        </div>
        <div className="flex gap-1">
          <IconButton icon={<PenLine size={16} />} />
          {ticket.status === "IN_PROGRESS" && (
            <IconButton
              className="text-md flex w-auto items-center gap-1 px-2 font-bold"
              icon={<CircleCheckBig size={16} />}
              variant="primary"
            >
              Close
            </IconButton>
          )}
          {ticket.status === "OPEN" && (
            <IconButton
              className="text-md flex w-auto items-center gap-1 px-2 font-bold"
              icon={<Clock2 size={16} />}
              variant="primary"
            >
              Start
            </IconButton>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span>{formatDate(ticket.updatedAt)}</span>
        <div>
          <span className="ml-0.5 text-sm">
            {formatCurrency(ticket.totalPrice)}
          </span>
        </div>
      </div>
      <div className="h-px w-full bg-gray-500"></div>
      <div className="flex justify-between">
        <div className="mr-auto flex items-center gap-1.5">
          <Avatar name={ticket.customerName} className="h-6 w-6 text-[10px]" />
          <span className="text-sm font-bold text-gray-200">
            {ticket.customerName}
          </span>
        </div>
        <div
          className={`${currentStatus.className} flex h-8 w-8 items-center justify-center gap-1.5 rounded-full font-medium [&>svg]:h-5 [&>svg]:w-5`}
        >
          {currentStatus.icon}
        </div>
      </div>
    </div>
  );
};

export const DashboardTechnicianTicketsContent = () => {
  const { data: openData } = useListTicketsQuery({ status: "OPEN" });
  const { data: inProgressData } = useListTicketsQuery({
    status: "IN_PROGRESS",
  });
  const { data: closedData } = useListTicketsQuery({ status: "CLOSED" });

  const openTickets = openData?.content ?? [];

  const inProgressTickets = inProgressData?.content ?? [];

  const closedTickets = closedData?.content ?? [];

  return (
    <DashboardContainer className="gap-6">
      <h1 className="text-brand-blue-dark text-3xl font-bold">Tickets</h1>
      <div className="flex flex-col gap-6">
        {openTickets.length > 0 && (
          <div className="flex flex-col gap-4">
            <div
              className={`${TICKET_STATUS_CONFIG.OPEN.className} flex w-fit items-center gap-2 rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap`}
            >
              <span className="flex items-center justify-center">
                {TICKET_STATUS_CONFIG.OPEN.icon}
              </span>
              <span className="leading-none">
                {TICKET_STATUS_CONFIG.OPEN.label}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-4 max-lg:grid-cols-2 max-sm:grid-cols-1">
              {openTickets.map((ticket) => (
                <Card key={ticket.id} ticket={ticket} />
              ))}
            </div>
          </div>
        )}
        {inProgressTickets.length > 0 && (
          <div className="flex flex-col gap-4">
            <div
              className={`${TICKET_STATUS_CONFIG.IN_PROGRESS.className} flex w-fit items-center gap-2 rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap`}
            >
              <span className="flex items-center justify-center">
                {TICKET_STATUS_CONFIG.IN_PROGRESS.icon}
              </span>
              <span className="leading-none">
                {TICKET_STATUS_CONFIG.IN_PROGRESS.label}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-4 max-lg:grid-cols-2 max-sm:grid-cols-1">
              {inProgressTickets.map((ticket) => (
                <Card key={ticket.id} ticket={ticket} />
              ))}
            </div>
          </div>
        )}
        {closedTickets.length > 0 && (
          <div className="flex flex-col gap-4">
            <div
              className={`${TICKET_STATUS_CONFIG.CLOSED.className} flex w-fit items-center gap-2 rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap`}
            >
              <span className="flex items-center justify-center">
                {TICKET_STATUS_CONFIG.CLOSED.icon}
              </span>
              <span className="leading-none">
                {TICKET_STATUS_CONFIG.CLOSED.label}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-4 max-lg:grid-cols-2 max-sm:grid-cols-1">
              {closedTickets.map((ticket) => (
                <Card key={ticket.id} ticket={ticket} />
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardContainer>
  );
};
