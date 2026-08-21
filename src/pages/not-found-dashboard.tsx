import { useNavigate } from "react-router";

export const NotFoundDashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-1 flex-col items-center justify-center rounded-tl-3xl bg-white p-4 text-gray-800 min-[381px]:p-6 md:mt-3 md:p-12">
      <h1 className="text-3xl font-bold">Not Found 404</h1>
      <button
        onClick={() => navigate(-1)}
        className="cursor-pointer italic underline"
      >
        Back
      </button>
    </div>
  );
};
