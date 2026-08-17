import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/auth/auth-slice";

export const Welcome = () => {
  const user = useSelector(selectCurrentUser);

  return (
    <div className="flex h-screen items-center justify-center">
      <h1 className="text-3xl font-bold">Hello {user.name}</h1>
    </div>
  );
};
