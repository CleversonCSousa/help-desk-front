import { ArrowLeft, X } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { FormGroup } from "../../components/form-group";
import { useForm } from "react-hook-form";
import { useCreateTechnicianMutation } from "../../features/technician/api-slice";
import { toast } from "sonner";

type WorkingHourData = {
  timeSlot: string;
};

type CreateTechnicianData = {
  name: string;
  email: string;
  password: string;
  workingHours: Array<WorkingHourData>;
};

export const CreateTechnician = () => {
  const {
    register,
    watch,
    setValue,
    formState: { errors, isDirty },
    setError,
    handleSubmit,
  } = useForm<CreateTechnicianData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      workingHours: [],
    },
  });

  const [createTechnicianApi, { isLoading }] = useCreateTechnicianMutation();
  const navigate = useNavigate();

  async function onSubmit(data: CreateTechnicianData) {
    try {
      const { message } = await createTechnicianApi(data).unwrap();

      toast.success(message, {
        classNames: {
          icon: "text-green-500",
        },
      });

      // updates the route state
      navigate("/dashboard/technicians");
    } catch (error) {
      if (error?.status === 409) {
        setError("email", {
          type: "server",
          message: "Email already in use",
        });
      } else {
        const errorMessage = error?.data?.message || "Internal server error";
        toast.error(errorMessage, {
          classNames: {
            icon: "text-red-500",
          },
        });
      }
    }
  }

  const currentWorkingHours = watch("workingHours") || [];
  const currentName = watch("name") || "";

  function getInitialsName(name: string) {
    if (!name.trim()) {
      return { firstLetter: "", lastLetter: "" };
    }

    const splitName = name.trim().split(/\s+/);

    const firstLetter = splitName[0][0];

    if (splitName.length === 1) {
      return {
        firstLetter,
        lastLetter: "",
      };
    }

    return {
      firstLetter,
      lastLetter: splitName[splitName.length - 1][0],
    };
  }

  const initialsName = getInitialsName(currentName);

  function handleToggleWorkingHour(time: string) {
    // checks if the index already exists
    const existsIndex = currentWorkingHours.findIndex((wh) =>
      wh.timeSlot.startsWith(time),
    );

    let updated: WorkingHourData[];

    if (existsIndex >= 0) {
      updated = currentWorkingHours.filter((_, index) => index !== existsIndex);
    } else {
      // otherwise, create a new working hour time and add it to the working hours
      updated = [...currentWorkingHours, { timeSlot: `${time}:00` }];
    }

    // shouldDirty: true, this serves to notify React Hook Form that something has changed
    setValue("workingHours", updated, { shouldDirty: true });
  }

  const MORNING_HOURS = ["07:00", "08:00", "09:00", "10:00", "11:00", "12:00"];
  const AFTERNOON_HOURS = [
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
  ];
  const EVENING_HOURS = ["19:00", "20:00", "21:00", "22:00", "23:00"];

  return (
    <main className="flex flex-1 justify-center overflow-y-auto rounded-tl-3xl bg-white p-4 text-gray-200 min-[381px]:p-6 md:mt-3 md:p-12 md:pt-13 md:pr-12 md:pb-12">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full max-w-6xl flex-col gap-4 md:gap-6"
      >
        <div>
          <Link to="/dashboard/technicians">
            <button
              type="button"
              className="flex cursor-pointer gap-2 font-bold text-gray-300"
            >
              <ArrowLeft />
              <span>Back</span>
            </button>
          </Link>
          <div className="mt-1 flex justify-between gap-3 max-md:flex-col md:items-center">
            <h1 className="text-brand-blue-dark text-3xl font-bold">
              Technician profile
            </h1>
            <div className="btns flex gap-2 font-bold max-md:grid max-md:grid-cols-2">
              <button
                type="button"
                onClick={() => navigate("/dashboard/technicians")}
                className="flex h-10 cursor-pointer items-center justify-center gap-2 rounded-lg bg-gray-500 px-4 text-sm text-gray-200 transition-colors hover:opacity-90"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!isDirty}
                className={`flex h-10 items-center justify-center gap-2 rounded-lg px-4 text-sm font-bold transition-colors ${
                  !isDirty || isLoading
                    ? "cursor-not-allowed bg-gray-300 text-black opacity-60"
                    : "cursor-pointer bg-gray-200 text-gray-600 hover:opacity-90"
                }`}
              >
                {isLoading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
        <div className="flex w-full gap-4 max-md:flex-col md:gap-6">
          <div className="flex w-full flex-col gap-6 rounded-lg border border-gray-500 bg-white p-6 md:max-w-md">
            <header className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-200">
                  Personal information
                </h2>
                <p className="text-sm text-gray-300">
                  Set the technician profile information
                </p>
              </div>
            </header>
            <div className="profile-avatar bg-brand-blue-dark flex h-12 w-12 items-center justify-center rounded-full text-xl text-gray-600 md:h-16 md:w-16 md:text-2xl">
              {initialsName.firstLetter} {initialsName.lastLetter}
            </div>
            <div className="flex flex-col gap-4">
              <FormGroup
                label="NAME"
                type="text"
                placeholder="Full name"
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
                placeholder="Set the access password"
                registration={register("password", {
                  required: "Password is required",
                  validate: {
                    minLength: (value) =>
                      value.trim().length >= 12 ||
                      "Password must have at least 12 characters",
                  },
                })}
                error={errors.password}
                helperText="Minimum of 12 characters"
              />
            </div>
          </div>
          <div className="flex w-full flex-col gap-6 rounded-lg border border-gray-500 bg-white p-6">
            <header className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-200">
                  Working hours
                </h2>
                <p className="text-sm text-gray-300">
                  Select the technician's availability hours for service calls
                </p>
              </div>
            </header>
            <div className="working-hours flex flex-col gap-5">
              <div>
                <p className="text-xs font-bold text-gray-300">MORNING</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {MORNING_HOURS.map((time) => {
                    const isSelected = currentWorkingHours.some((wh) =>
                      wh.timeSlot.startsWith(time),
                    );

                    return (
                      <button
                        key={time}
                        type="button"
                        onClick={() => handleToggleWorkingHour(time)}
                        className={`working-hour flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full border px-2.5 py-1 text-sm font-bold transition-colors ${
                          isSelected
                            ? "bg-brand-blue-base text-gray-600"
                            : "border-gray-400 text-gray-200"
                        }`}
                      >
                        <span>{time}</span>
                        {isSelected && (
                          <span>
                            <X size={14} />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-300">AFTERNOON</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {AFTERNOON_HOURS.map((time) => {
                    const isSelected = currentWorkingHours.some((wh) =>
                      wh.timeSlot.startsWith(time),
                    );

                    return (
                      <button
                        key={time}
                        type="button"
                        onClick={() => handleToggleWorkingHour(time)}
                        className={`working-hour flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full border px-2.5 py-1 text-sm font-bold transition-colors ${
                          isSelected
                            ? "bg-brand-blue-base text-gray-600"
                            : "border-gray-400 text-gray-200"
                        }`}
                      >
                        <span>{time}</span>
                        {isSelected && (
                          <span>
                            <X size={14} />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-300">EVENING</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {EVENING_HOURS.map((time) => {
                    const isSelected = currentWorkingHours.some((wh) =>
                      wh.timeSlot.startsWith(time),
                    );

                    return (
                      <button
                        key={time}
                        type="button"
                        onClick={() => handleToggleWorkingHour(time)}
                        className={`working-hour flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full border px-2.5 py-1 text-sm font-bold transition-colors ${
                          isSelected
                            ? "bg-brand-blue-base text-gray-600"
                            : "border-gray-400 text-gray-200"
                        }`}
                      >
                        <span>{time}</span>
                        {isSelected && (
                          <span>
                            <X size={14} />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </main>
  );
};
