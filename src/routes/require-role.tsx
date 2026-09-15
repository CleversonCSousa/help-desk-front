import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/auth/auth-slice";
import { Outlet } from "react-router";
import { NotFoundDashboard } from "../pages/not-found-dashboard";

type RequireRoleProps = {
  allowedRoles: Array<"ADMIN" | "TECHNICIAN" | "CUSTOMER">;
};

const RequireRole = ({ allowedRoles }: RequireRoleProps) => {
  const user = useSelector(selectCurrentUser);

  if (!user || !user.role || !allowedRoles.includes(user.role)) {
    return <NotFoundDashboard />;
  }

  return <Outlet />;
};

export default RequireRole;
