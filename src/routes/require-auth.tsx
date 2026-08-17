import { useSelector } from "react-redux";
import { useLocation, Navigate, Outlet } from "react-router";
import { selectCurrentUser } from "../features/auth/auth-slice";

const RequireAuth = () => {
  const user = useSelector(selectCurrentUser);
  const location = useLocation();

  return user ? (
    <Outlet />
  ) : (
    <Navigate
      to="/signin"
      state={{
        from: location,
      }}
      replace
    />
  );
};

export default RequireAuth;
