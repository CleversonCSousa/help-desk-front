import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/auth/auth-slice";
import { DashboardAdminCustomersContent } from "../pages/dashboard/dashboard-admin-customers-content";
import { NotFound } from "../pages/not-found";

const RoleBasedCustomers = () => {
  console.log("hello");
  const user = useSelector(selectCurrentUser);

  if (!user || user.role !== "ADMIN") {
    return <NotFound />;
  }

  return <DashboardAdminCustomersContent />;
};

export default RoleBasedCustomers;
