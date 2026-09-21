import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router";
import { useGetTicketQuery } from "../../features/ticket/api-slice";
import { formatDate } from "../../utils/format-date";
import { formatCurrency } from "../../utils/format-currency";
import { TICKET_STATUS_CONFIG } from "../../utils/status-config";
import { Avatar } from "../../components/avatar";

export const TicketDetailsCustomer = () => {
  const { id } = useParams();
  const {
    data: ticket,
    isLoading,
    error,
  } = useGetTicketQuery(id ?? "", {
    // avoid search if the ID does not exist
    skip: !id,
  });

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
          <div className="mt-1 flex gap-3 max-md:flex-col md:items-center">
            <h1 className="text-brand-blue-dark text-3xl font-bold">
              Ticket details
            </h1>
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
              </div>
              <div
                className={`text-sm ${ticket.additionalServices.length > 0 ? "" : "hidden"}`}
              >
                <div className="font-bold text-gray-400">Additionals</div>
                <div className="mt-2 text-gray-200">
                  {ticket.additionalServices.map((additionalService) => (
                    <div
                      key={additionalService.id}
                      className="flex justify-between gap-4"
                    >
                      <div className="wrap-break-word">
                        {additionalService.description}
                      </div>
                      <div className="shrink-0">
                        {formatCurrency(additionalService.price)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-between border-t border-gray-500 pt-3 font-bold text-gray-200">
                <span>Total</span>
                {formatCurrency(ticket.totalPrice)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
