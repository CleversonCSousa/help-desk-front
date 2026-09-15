import { useSelector } from "react-redux";
import { DashboardAdminTicketsContent } from "../pages/dashboard/dashboard-admin-tickets-content";
import { selectCurrentUser } from "../features/auth/auth-slice";

export const TicketContentResolver = () => {
  const user = useSelector(selectCurrentUser);

  switch (user?.role) {
    case "ADMIN":
      return <DashboardAdminTicketsContent />;
    case "TECHNICIAN":
      return <h1 className="text-white">/tickets [TECHNICIAN]</h1>;
    case "CUSTOMER":
      return <h1 className="text-white">/tickets [CUSTOMER]</h1>;
    default:
      return null;
  }
};
