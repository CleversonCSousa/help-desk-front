import {
  ArrowLeft,
  CheckCircle2Icon,
  CircleCheckBig,
  CircleQuestionMark,
  Clock2,
  ClockIcon,
} from "lucide-react";
import { Link, useParams } from "react-router";
import {
  useGetTicketQuery,
  type TicketStatus,
} from "../../features/ticket/api-slice";
import type { ReactNode } from "react";

export const TicketDetails = () => {
  const { id } = useParams();

  const {
    data: ticket,
    isLoading,
    error,
  } = useGetTicketQuery(id ?? "", {
    // avoid search if the ID does not exist
    skip: !id,
  });
  const forceLoading = false;
  if (isLoading || forceLoading) {
    return (
      <main className="flex flex-1 items-center justify-center rounded-tl-3xl bg-white p-4 text-gray-200 min-[381px]:p-6 md:mt-3 md:p-12 md:pt-13 md:pr-12 md:pb-12">
        <p className="text-2xl font-bold">Loading ticket details...</p>
      </main>
    );
  }

  const forceError = false;

  if (error || !ticket || forceError) {
    return (
      <main className="flex flex-1 items-center justify-center rounded-tl-3xl bg-white p-4 text-gray-200 min-[381px]:p-6 md:mt-3 md:p-12 md:pt-13 md:pr-12 md:pb-12">
        <p className="text-2xl font-bold text-red-400">Error loading ticket.</p>
      </main>
    );
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

  const currentStatus = statusConfig[ticket.status];
  const customerInitials = getInitialsName(ticket.customer.name);
  const technicianInitials = getInitialsName(ticket.technician.name);

  return (
    <main className="flex flex-1 justify-center overflow-y-auto rounded-tl-3xl bg-white p-4 text-gray-200 min-[381px]:p-6 md:mt-3 md:p-12 md:pt-13 md:pr-12 md:pb-12">
      <div className="flex w-full max-w-6xl flex-col gap-6">
        <div>
          <Link to="/dashboard/tickets">
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
              <button className="flex h-10 cursor-pointer items-center justify-center gap-2 rounded-lg bg-gray-500 px-4 text-gray-200 transition-colors hover:opacity-90">
                <Clock2 size={18} className="text-gray-300" />
                In progress
              </button>
              <button className="flex h-10 cursor-pointer items-center justify-center gap-2 rounded-lg bg-gray-500 px-4 text-gray-200 transition-colors hover:opacity-90">
                <CircleCheckBig size={18} className="text-gray-300" />
                Closed
              </button>
            </div>
          </div>
        </div>
        <div className="flex w-full items-start gap-6 max-md:flex-col">
          <div className="flex w-full flex-1 flex-col gap-5 rounded-lg border border-gray-500 bg-white p-6">
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
              <span className="text-sm font-bold text-gray-400">Category</span>
              <p className="text-gray-200">{ticket.service.title}</p>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <span className="text-sm font-bold text-gray-400">
                  Created at
                </span>
                <p className="text-gray-200">{formatDate(ticket.createdAt)}</p>
              </div>
              <div>
                <span className="text-sm font-bold text-gray-400">
                  Updated at
                </span>
                <p className="text-gray-200">{formatDate(ticket.updatedAt)}</p>
              </div>
            </div>
            <div>
              <span className="text-sm font-bold text-gray-400">Customer</span>
              <div className="mt-2 flex items-center gap-2 font-medium text-gray-200">
                <div className="bg-brand-blue-dark flex h-7 w-7 items-center justify-center rounded-full text-xs text-gray-600">
                  {customerInitials.firstLetter}
                  {customerInitials.lastLetter}
                </div>
                {ticket.customer.name}
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col gap-6 rounded-lg border border-gray-500 bg-white p-6 md:w-60 lg:w-90 xl:w-100 2xl:w-md">
            <div>
              <span className="text-sm font-bold text-gray-400">
                Responsible technician
              </span>
              <div className="mt-2 flex gap-2">
                <div className="bg-brand-blue-dark flex h-12 w-12 items-center justify-center rounded-full text-xl text-gray-600">
                  {technicianInitials.firstLetter}
                  {technicianInitials.lastLetter}
                </div>
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
