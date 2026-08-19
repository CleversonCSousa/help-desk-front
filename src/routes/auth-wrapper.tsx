import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser, setCredentials } from "../features/auth/auth-slice";
import { useEffect } from "react";
import { useGetMeQuery } from "../features/auth/auth-api-slice";
import { Outlet } from "react-router";

const AuthWrapper = () => {
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  const { data, isSuccess, isFetching, isLoading } = useGetMeQuery(undefined, {
    skip: user !== null,
  });

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(
        setCredentials({
          user: data,
        }),
      );
    }
  }, [isSuccess, data, dispatch]);

  // This rule (isSuccess && user === null) prevents rendering until the user is loaded.
  if (isLoading || isFetching || (isSuccess && user === null)) {
    return null;
  }

  return <Outlet />;
};

export default AuthWrapper;
