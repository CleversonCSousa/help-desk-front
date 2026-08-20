import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/auth/auth-slice";
import { DashboardAdminServicesContent } from "../pages/dashboard/dashboard-admin-services-content";

const RoleBasedServices = () => {
  const user = useSelector(selectCurrentUser);

  if (!user || !user.role) {
    return <h1>Acesso negado</h1>;
  }

  switch (user.role) {
    case "ADMIN":
      return <DashboardAdminServicesContent />;
  }

  return <h1>RoleBasedDashboard</h1>;
};

export default RoleBasedServices;
