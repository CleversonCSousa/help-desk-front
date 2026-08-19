import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/auth/auth-slice";
import { DashboardAdminTicketsContent } from "../pages/dashboard/dashboard-admin-tickets-content";

const RoleBasedTickets = () => {
  const user = useSelector(selectCurrentUser);

  if (!user || !user.role) {
    return <h1>Acesso negado</h1>;
  }

  switch (user.role) {
    case "ADMIN":
      return <DashboardAdminTicketsContent />;
  }

  return <h1>RoleBasedDashboard</h1>;
};

export default RoleBasedTickets;
