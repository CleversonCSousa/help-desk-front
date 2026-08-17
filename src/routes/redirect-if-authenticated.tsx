import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/auth/auth-slice";
import { Navigate, Outlet } from "react-router";

const RedirectIfAuthenticated = () => {
  const user = useSelector(selectCurrentUser);
  return user ? <Navigate to="/welcome" replace /> : <Outlet />;
};

export default RedirectIfAuthenticated;
