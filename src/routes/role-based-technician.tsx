import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/auth/auth-slice";
import { NotFound } from "../pages/not-found";
import { Outlet } from "react-router";

const RoleBasedTechnicians = () => {
  console.log("hello");
  const user = useSelector(selectCurrentUser);

  if (!user || user.role !== "ADMIN") {
    return <NotFound />;
  }

  return <Outlet />;
};

export default RoleBasedTechnicians;
