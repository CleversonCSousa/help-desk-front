import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/auth/auth-slice";
import DashboardAdmin from "../pages/dashboard/dashboard-admin";

const RoleBasedDashboard = () => {
  const user = useSelector(selectCurrentUser);

  if (!user || !user.role) {
    return <h1>RoleBasedDashboard</h1>;
  }

  switch (user.role) {
    case "ADMIN":
      return <DashboardAdmin />;
  }

  return <h1>RoleBasedDashboard</h1>;
};

export default RoleBasedDashboard;
