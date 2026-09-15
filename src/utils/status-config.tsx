import { CheckCircle2Icon, CircleQuestionMark, ClockIcon } from "lucide-react";
import type { TicketStatus } from "../features/ticket/api-slice";
import type { ReactNode } from "react";

export const TICKET_STATUS_CONFIG: Record<
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
