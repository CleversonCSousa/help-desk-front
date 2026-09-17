import { ArrowLeft, CircleCheckBig, Clock2, Trash } from "lucide-react";
import { Link, useParams } from "react-router";
import {
  useGetTicketQuery,
  useUpdateTicketStatusMutation,
} from "../../features/ticket/api-slice";
import { formatDate } from "../../utils/format-date";
import { formatCurrency } from "../../utils/format-currency";
import { TICKET_STATUS_CONFIG } from "../../utils/status-config";
import { Avatar } from "../../components/avatar";
import { IconButton } from "../../components/icon-button";
import { toast } from "sonner";
import { CreateAdditionalServiceModal } from "./create-additional-service-modal";

export const TicketDetailsTechnician = () => {
  const { id } = useParams();
  const {
    data: ticket,
    isLoading,
    error,
  } = useGetTicketQuery(id ?? "", {
    // avoid search if the ID does not exist
    skip: !id,
  });

  const [updateStatus, { isLoading: isUpdatingStatus }] =
    useUpdateTicketStatusMutation();

  const handleStartTicket = async () => {
    try {
      const ticketSummary = {
        id: ticket.id,
        code: ticket.code,
        title: ticket.title,
        serviceName: ticket.service.title,
        totalPrice: ticket.totalPrice,
        customerName: ticket.customer.name,
        technicianName: ticket.technician.name,
        status: ticket.status,
        updatedAt: ticket.updatedAt,
      };

      await updateStatus({
        ticket: ticketSummary,
        newStatus: "IN_PROGRESS",
      }).unwrap();
      toast.success("Ticket started successfully", {
        classNames: {
          icon: "text-green-500",
        },
      });
    } catch (error) {
      const errorMessage = error?.data?.message || "Internal server error";
      toast.error(errorMessage, {
        classNames: {
          icon: "text-red-500",
        },
      });
    }
  };

  const handleReopenTicket = async () => {
    try {
      const ticketSummary = {
        id: ticket.id,
        code: ticket.code,
        title: ticket.title,
        serviceName: ticket.service.title,
        totalPrice: ticket.totalPrice,
        customerName: ticket.customer.name,
        technicianName: ticket.technician.name,
        status: ticket.status,
        updatedAt: ticket.updatedAt,
      };

      await updateStatus({
        ticket: ticketSummary,
        newStatus: "OPEN",
      }).unwrap();
      toast.success("Ticket reopened successfully", {
        classNames: {
          icon: "text-green-500",
        },
      });
    } catch (error) {
      const errorMessage = error?.data?.message || "Internal server error";
      toast.error(errorMessage, {
        classNames: {
          icon: "text-red-500",
        },
      });
    }
  };

  const handleCloseTicket = async () => {
    try {
      const ticketSummary = {
        id: ticket.id,
        code: ticket.code,
        title: ticket.title,
        serviceName: ticket.service.title,
        totalPrice: ticket.totalPrice,
        customerName: ticket.customer.name,
        technicianName: ticket.technician.name,
        status: ticket.status,
        updatedAt: ticket.updatedAt,
      };

      await updateStatus({
        ticket: ticketSummary,
        newStatus: "CLOSED",
      }).unwrap();
      toast.success("Ticket closed successfully", {
        classNames: {
          icon: "text-green-500",
        },
      });
    } catch (error) {
      const errorMessage = error?.data?.message || "Internal server error";
      toast.error(errorMessage, {
        classNames: {
          icon: "text-red-500",
        },
      });
    }
  };

  if (isLoading) {
    return (
      <main className="flex flex-1 items-center justify-center rounded-tl-3xl bg-white p-4 text-gray-200 min-[381px]:p-6 md:mt-3 md:p-12 md:pt-13 md:pr-12 md:pb-12">
        <p className="text-2xl font-bold">Loading ticket details...</p>
      </main>
    );
  }

  if (error || !ticket) {
    return (
      <main className="flex flex-1 items-center justify-center rounded-tl-3xl bg-white p-4 text-gray-200 min-[381px]:p-6 md:mt-3 md:p-12 md:pt-13 md:pr-12 md:pb-12">
        <p className="text-2xl font-bold text-red-400">Error loading ticket.</p>
      </main>
    );
  }

  const currentStatus = TICKET_STATUS_CONFIG[ticket.status];

  const totalAdditionals = ticket.additionalServices.reduce(
    (acc, ticketAdditional) => acc + ticketAdditional.price,
    0,
  );

  return (
    <main className="flex flex-1 justify-center overflow-y-auto rounded-tl-3xl bg-white p-4 text-gray-200 min-[381px]:p-6 md:mt-3 md:p-12 md:pt-13 md:pr-12 md:pb-12">
      <div className="flex w-full max-w-6xl flex-col gap-6">
        <div>
          <Link to="/dashboard/tickets" className="inline-block">
            <button
              type="button"
              className="flex cursor-pointer gap-2 font-bold text-gray-300"
            >
              <ArrowLeft />
              <span>Back</span>
            </button>
          </Link>
          <div className="mt-1 flex justify-between gap-3 max-md:flex-col md:items-center">
            <h1 className="text-brand-blue-dark text-3xl font-bold">
              Ticket details
            </h1>
            <div className="btns flex gap-2 font-bold max-md:grid max-md:grid-cols-2">
              {ticket.status === "OPEN" && (
                <>
                  <button
                    onClick={handleCloseTicket}
                    disabled={isUpdatingStatus}
                    className="flex h-10 cursor-pointer items-center justify-center gap-2 rounded-lg bg-gray-500 px-4 text-gray-200 transition-colors hover:opacity-90 disabled:opacity-50"
                  >
                    <CircleCheckBig size={18} className="text-gray-300" />
                    Closed
                  </button>
                  <button
                    onClick={handleStartTicket}
                    disabled={isUpdatingStatus}
                    className="flex h-10 cursor-pointer items-center justify-center gap-2 rounded-lg bg-gray-200 px-4 text-gray-600 transition-colors hover:opacity-90 disabled:opacity-50"
                  >
                    <Clock2 size={18} />
                    Start ticket
                  </button>
                </>
              )}
              {ticket.status === "IN_PROGRESS" && (
                <button
                  onClick={handleCloseTicket}
                  disabled={isUpdatingStatus}
                  className="flex h-10 cursor-pointer items-center justify-center gap-2 rounded-lg bg-gray-200 px-4 text-gray-600 transition-colors hover:opacity-90 disabled:opacity-50"
                >
                  <CircleCheckBig size={18} />
                  Closed
                </button>
              )}

              {ticket.status === "CLOSED" && (
                <button
                  onClick={handleReopenTicket}
                  disabled={isUpdatingStatus}
                  className="flex h-10 cursor-pointer items-center justify-center gap-2 rounded-lg bg-gray-200 px-4 text-gray-600 transition-colors hover:opacity-90 disabled:opacity-50"
                >
                  <Clock2 size={18} />
                  Reopen
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="flex w-full items-start gap-6 max-md:flex-col">
          <div className="flex w-full flex-1 flex-col gap-3">
            <div className="flex flex-col gap-5 rounded-lg border border-gray-500 bg-white p-6">
              <div>
                <div className="flex items-center justify-between">
                  <div className="font-bold text-gray-300">
                    {String(ticket.code).padStart(5, "0")}
                  </div>
                  <div
                    className={`${currentStatus.className} flex items-center justify-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium`}
                  >
                    {currentStatus.icon}
                    <span>{currentStatus.label}</span>
                  </div>
                </div>
                <h2 className="text-xl font-bold text-gray-200">
                  {ticket.title}
                </h2>
              </div>
              <div>
                <span className="text-sm font-bold text-gray-400">
                  Description
                </span>
                <p className="wrap-break-word text-gray-200">
                  {ticket.description}
                </p>
              </div>
              <div>
                <span className="text-sm font-bold text-gray-400">
                  Category
                </span>
                <p className="text-gray-200">{ticket.service.title}</p>
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <span className="text-sm font-bold text-gray-400">
                    Created at
                  </span>
                  <p className="text-gray-200">
                    {formatDate(ticket.createdAt)}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-bold text-gray-400">
                    Updated at
                  </span>
                  <p className="text-gray-200">
                    {formatDate(ticket.updatedAt)}
                  </p>
                </div>
              </div>
              <div>
                <span className="text-sm font-bold text-gray-400">
                  Customer
                </span>
                <div className="mt-2 flex items-center gap-2 font-medium text-gray-200">
                  <Avatar
                    name={ticket.customer.name}
                    className="h-7 w-7 text-xs"
                  />
                  {ticket.customer.name}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 rounded-lg border border-gray-500 bg-white p-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-gray-400">
                  Additional services
                </p>
                <CreateAdditionalServiceModal ticketId={ticket.id} />
              </div>
              <div
                className={`text-sm ${ticket.additionalServices.length > 0 ? "" : "hidden"}`}
              >
                <div className="flex flex-col gap-2 text-gray-200">
                  {ticket.additionalServices.map((additionalService, index) => (
                    <div
                      key={additionalService.id}
                      className="flex flex-col gap-3"
                    >
                      {index > 0 && <div className="h-px w-full bg-gray-500" />}
                      <div className="flex items-center gap-6">
                        <div className="flex-1 wrap-break-word">
                          {additionalService.description}
                        </div>
                        <div className="font-medium">
                          {formatCurrency(additionalService.price)}
                        </div>
                        <IconButton
                          icon={
                            <Trash size={16} className="text-feedback-danger" />
                          }
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col gap-6 rounded-lg border border-gray-500 bg-white p-6 md:w-60 lg:w-90 xl:w-100 2xl:w-md">
            <div>
              <span className="text-sm font-bold text-gray-400">
                Responsible technician
              </span>
              <div className="mt-2 flex gap-2">
                <Avatar
                  name={ticket.technician.name}
                  className="h-12 w-12 text-xl"
                />
                <div className="flex flex-col">
                  {ticket.technician.name}
                  <span className="text-sm text-gray-300">
                    {ticket.technician.email}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-8 flex flex-col gap-4">
              <div className="text-sm">
                <div className="font-bold text-gray-400">Prices</div>
                <div className="mt-2 flex justify-between text-gray-200">
                  <div>Base price</div>
                  <div>{formatCurrency(ticket.basePrice)}</div>
                </div>
                <div className="mt-2 flex justify-between text-gray-200">
                  <div>Additionals</div>
                  <div>{formatCurrency(totalAdditionals)}</div>
                </div>
              </div>
              <div className="flex justify-between border-t border-gray-500 pt-3 font-bold text-gray-200">
                <span>Total</span>
                {formatCurrency(ticket.totalPrice + totalAdditionals)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
