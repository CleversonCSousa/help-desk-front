import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/auth/auth-slice";
import { NotFound } from "../pages/not-found";
import { DashboardAdminTechniciansContent } from "../pages/dashboard/dashboard-admin-technicians-content";

const RoleBasedTechnicians = () => {
  console.log("hello");
  const user = useSelector(selectCurrentUser);

  if (!user || user.role !== "ADMIN") {
    return <NotFound />;
  }

  return <DashboardAdminTechniciansContent />;
};

export default RoleBasedTechnicians;
