import { selectCurrentUser, setCredentials } from "../auth/auth-slice";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { FormGroup } from "../../components/form-group";
import { useForm } from "react-hook-form";
import { useRegisterCustomerMutation } from "./customer-api-slice";

type SignUpData = {
  name: string;
  email: string;
  password: string;
};

export const SignUp = () => {
  const user = useSelector(selectCurrentUser);
  const [registerCustomerApi, { isLoading }] = useRegisterCustomerMutation();
  const [apiError, setApiError] = useState<{
    status: number;
    message: string;
  } | null>(null);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
    watch,
  } = useForm<SignUpData>();

  useEffect(() => {
    if (user) {
      navigate("/welcome", {
        replace: true,
      });
    }
  }, [user, navigate]);

  async function onSubmit({ name, email, password }: SignUpData) {
    try {
      setApiError(null);
      const { user, accessToken } = await registerCustomerApi({
        name,
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
      if (error?.status === 409) {
        setError("email", {
          type: "server",
          message: "Email already in use",
        });
      } else {
        setApiError({
          message: error?.data?.message || "Internal server error",
          status: error?.status || 500,
        });
      }
    }
  }

  const password = watch("password", "");

  const passwordRules = [
    {
      label: "At least 12 characters",
      valid: password.trim().length >= 12,
    },
  ];

  return (
    <div>
      <div className="flex h-screen bg-[url('https://i.imgur.com/hvZPyg7.png')] bg-[length:100%_100%] max-xl:justify-center xl:justify-end">
        <div className="form-container mt-auto flex w-full flex-col items-center justify-start rounded-tl-4xl bg-white px-4 max-xl:rounded-tr-4xl max-sm:h-[calc(100%-2rem)] sm:h-[calc(100%-1rem)] sm:w-[90%] md:w-3/4 md:justify-center lg:w-3/5 xl:w-1/2">
          <div className="my-8 flex items-center gap-4">
            <img src="/logo.svg" alt="logo" />
            <p className="text-brand-blue-dark text-3xl font-bold">HelpDesk</p>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-full max-w-lg flex-col gap-4 rounded-xl border border-gray-500 p-8"
          >
            <header className="form-header mb-6">
              <p className="text-2xl font-bold">Create your account</p>
              <p className="mt-1 text-sm text-gray-300">
                Enter your name, email, and password.
              </p>
            </header>
            {apiError && (
              <span className="text-sm text-red-500">{apiError.message}</span>
            )}
            <FormGroup
              label="NAME"
              type="text"
              placeholder="Enter your full name"
              registration={register("name", {
                required: "Name is required",
              })}
              error={errors.name}
            />
            <FormGroup
              label="E-MAIL"
              type="email"
              placeholder="example@mail.com"
              registration={register("email", {
                required: "Email is required",
              })}
              error={errors.email}
            />
            <FormGroup
              label="PASSWORD"
              type="password"
              placeholder="Enter your password"
              registration={register("password", {
                required: "Password is required",
                validate: {
                  minLength: (value) =>
                    value.trim().length >= 12 ||
                    "Password must have at least 12 characters",
                },
              })}
              error={errors.password}
              checklist={passwordRules}
            />
            <button
              disabled={isLoading}
              className="mt-2 h-10 cursor-pointer rounded-md bg-black font-bold text-white disabled:opacity-50"
            >
              Sign up
            </button>
          </form>
          <div className="mt-4 flex w-full max-w-lg flex-col gap-6 rounded-xl border border-gray-500 p-8">
            <div>
              <p className="font-bold text-gray-200">
                Already have an account?
              </p>
              <p className="text-sm text-gray-300">Sign in now</p>
            </div>
            <NavLink
              to="/signin"
              className="flex h-10 w-full cursor-pointer items-center justify-center rounded-md bg-gray-500 font-bold text-gray-200"
            >
              Sign in
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};
