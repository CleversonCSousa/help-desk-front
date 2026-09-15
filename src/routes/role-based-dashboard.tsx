import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/auth/auth-slice";
import { NotFound } from "../pages/not-found";
import DashboardLayout from "../pages/dashboard/dashboard-layout";

const RoleBasedDashboard = () => {
  const user = useSelector(selectCurrentUser);

  if (!user || !user.role) {
    return <NotFound />;
  }

  return <DashboardLayout />;
};

export default RoleBasedDashboard;
