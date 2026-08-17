import { useForm } from "react-hook-form";
import { selectCurrentUser, setCredentials } from "./auth-slice";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { FormGroup } from "../../components/form-group";
import { useLoginMutation } from "./auth-api-slice";

type SignInData = {
  email: string;
  password: string;
};

export const SignIn = () => {
  const user = useSelector(selectCurrentUser);
  const [loginApi, { isLoading }] = useLoginMutation();
  const [apiError, setApiError] = useState<{
    status: number;
    message: string;
  } | null>(null);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignInData>();

  useEffect(() => {
    if (user) {
      navigate("/welcome", {
        replace: true,
      });
    }
  }, [user, navigate]);

  async function onSubmit({ email, password }: SignInData) {
    try {
      setApiError(null);
      const { user, accessToken } = await loginApi({
        email,
        password,
      }).unwrap();
      dispatch(
        setCredentials({
          user,
          accessToken,
        }),
      );

      navigate("/welcome");
    } catch (error) {
      setApiError({
        message: error?.data?.message || "Internal server error",
        status: error?.status || 500,
      });
    }
  }

  return (
    <div className="flex h-screen bg-[url('https://i.imgur.com/hvZPyg7.png')] bg-[length:100%_100%] max-xl:justify-center xl:justify-end">
      <div className="form-container mt-auto flex w-full flex-col items-center justify-start rounded-tl-4xl bg-white px-4 max-xl:rounded-tr-4xl max-sm:h-[calc(100%-2rem)] sm:h-[calc(100%-1rem)] sm:w-[90%] md:w-3/4 md:justify-center lg:w-3/5 xl:w-1/2">
        <div className="my-8 flex items-center gap-4">
          <img src="/logo.svg" alt="logo" />
          <p className="text-brand-blue-dark text-3xl font-bold">HelpDesk</p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          onChange={() => setApiError(null)}
          className="flex w-full max-w-lg flex-col gap-4 rounded-xl border border-gray-500 p-8"
        >
          <header className="form-header mb-6">
            <p className="text-2xl font-bold">Access the portal</p>
            <p className="mt-1 text-sm text-gray-300">
              Sign in with your registered email and password
            </p>
          </header>
          <FormGroup
            label="E-MAIL"
            type="email"
            placeholder="example@mail.com"
            registration={register("email", {
              required: "Email is mandatory",
            })}
            error={errors.email}
          />
          <FormGroup
            label="PASSWORD"
            type="password"
            placeholder="Enter your password"
            registration={register("password", {
              required: "Password is mandatory",
            })}
            error={errors.password}
          />
          {apiError && (
            <span className="text-sm text-red-500">{apiError.message}</span>
          )}
          <button
            disabled={isLoading}
            className="mt-6 h-10 cursor-pointer rounded-md bg-black font-bold text-white disabled:opacity-50"
          >
            Sign in
          </button>
        </form>
        <div className="mt-4 flex w-full max-w-lg flex-col gap-6 rounded-xl border border-gray-500 p-8">
          <div>
            <p className="font-bold text-gray-200">Don't have an account?</p>
            <p className="text-sm text-gray-300">Create your account now</p>
          </div>
          <NavLink
            to="/signup"
            className="flex h-10 w-full cursor-pointer items-center justify-center rounded-md bg-gray-500 font-bold text-gray-200"
          >
            Create account
          </NavLink>
        </div>
      </div>
    </div>
  );
};
