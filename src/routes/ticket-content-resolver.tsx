import { useSelector } from "react-redux";
import { DashboardAdminTicketsContent } from "../pages/dashboard/dashboard-admin-tickets-content";
import { selectCurrentUser } from "../features/auth/auth-slice";
import { DashboardTechnicianTicketsContent } from "../pages/dashboard/dashboard-technician-tickets-content";

export const TicketContentResolver = () => {
  const user = useSelector(selectCurrentUser);

  switch (user?.role) {
    case "ADMIN":
      return <DashboardAdminTicketsContent />;
    case "TECHNICIAN":
      return <DashboardTechnicianTicketsContent />;
    case "CUSTOMER":
      return <h1 className="text-white">/tickets [CUSTOMER]</h1>;
    default:
      return null;
  }
};
