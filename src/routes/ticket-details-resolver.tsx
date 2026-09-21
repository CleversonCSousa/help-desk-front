import { useSelector } from "react-redux";
import { TicketDetailsAdmin } from "../pages/dashboard/ticket-details";
import { selectCurrentUser } from "../features/auth/auth-slice";
import { useParams } from "react-router";
import { NotFoundDashboard } from "../pages/not-found-dashboard";
import { TicketDetailsTechnician } from "../pages/dashboard/technician-ticket-details";
import { TicketDetailsCustomer } from "../pages/dashboard/customer-ticket-details";

export const TicketDetailsContentResolver = () => {
  const user = useSelector(selectCurrentUser);
  const { id } = useParams();
  const isValidId = id && (/^\d+$/.test(id) || /^[0-9a-fA-F-]{36}$/.test(id));

  if (!isValidId) {
    return <NotFoundDashboard />;
  }

  switch (user?.role) {
    case "ADMIN":
      return <TicketDetailsAdmin />;
    case "TECHNICIAN":
      return <TicketDetailsTechnician />;
    case "CUSTOMER":
      return <TicketDetailsCustomer />;
    default:
      return null;
  }
};
