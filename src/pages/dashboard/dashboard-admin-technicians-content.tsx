import { useEffect, useState } from "react";
import { useListTechniciansQuery } from "../../features/technician/api-slice";
import { WorkingHoursModal } from "./working-hours-modal";
import { PenLineIcon } from "lucide-react";
import { Link } from "react-router";

export const DashboardAdminTechniciansContent = () => {
  const [visibleLimit, setVisibleLimit] = useState(4);

  const { data: technicians, isLoading } = useListTechniciansQuery();

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width <= 640) {
        setVisibleLimit(1);
      } else if (width <= 768) {
        setVisibleLimit(3);
      } else {
        setVisibleLimit(4);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isLoading) {
    return null;
  }

  function getInitialsName(name: string) {
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

  return (
    <main className="flex-1 overflow-y-auto rounded-tl-3xl bg-white p-4 text-gray-200 min-[381px]:p-6 md:mt-3 md:p-12 md:pt-13 md:pr-12 md:pb-12">
      <div className="flex items-center justify-between">
        <h1 className="text-brand-blue-dark text-3xl font-bold">Technicians</h1>
      </div>
      <div className="mt-6 overflow-hidden rounded-lg border border-gray-500 text-sm md:text-base">
        <table className="w-full table-fixed">
          <thead className="border-b border-gray-500 text-gray-400">
            <tr>
              <th className="w-[45%] px-1.5 py-1 text-left font-medium min-[381px]:px-3 min-[381px]:py-2 md:w-[40%] md:px-6 md:py-4">
                Name
              </th>
              <th className="px-1.5 py-1 text-left font-medium max-[870px]:hidden min-[381px]:px-3 min-[381px]:py-2 md:px-6 md:py-4">
                Email
              </th>
              <th className="px-1.5 py-1 text-left font-medium min-[381px]:px-3 min-[381px]:py-2 md:px-6 md:py-4">
                Avaliability
              </th>
              <th className="w-[56px] px-1.5 py-1 text-left font-medium whitespace-nowrap min-[381px]:px-3 min-[381px]:py-2 md:w-[88px] md:px-6 md:py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-500">
            {technicians?.map((technician) => {
              const initialsName = getInitialsName(technician.name);

              const visibleWorkingHours = technician.workingHours.slice(
                0,
                visibleLimit,
              );
              const remainingHours =
                technician.workingHours.length - visibleLimit;

              return (
                <tr
                  key={technician.id}
                  className="transition-colors hover:bg-gray-50"
                >
                  <td className="min-w-0 px-1.5 py-1 align-middle font-bold text-gray-900 min-[381px]:px-3 min-[381px]:py-2 md:px-6 md:py-4">
                    <div
                      className="flex items-center max-md:gap-2 md:gap-4"
                      title={technician.name}
                    >
                      <div className="bg-brand-blue-dark flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-gray-600 min-[381px]:h-8 min-[381px]:w-8 md:h-10 md:w-10">
                        {initialsName.firstLetter}
                        {initialsName.lastLetter}
                      </div>
                      <div className="min-w-0 truncate" title={technician.name}>
                        {technician.name}
                      </div>
                    </div>
                  </td>
                  <td className="min-w-0 px-1.5 py-1 align-middle text-gray-700 max-[870px]:hidden max-md:hidden min-[381px]:px-3 min-[381px]:py-2 md:px-6 md:py-4">
                    <div className="truncate" title={technician.email}>
                      {technician.email}
                    </div>
                  </td>
                  <td className="min-w-0 px-1.5 py-1 align-middle min-[381px]:px-3 min-[381px]:py-2 md:px-6 md:py-4">
                    <div className="flex [scrollbar-width:none] gap-1.5 [-ms-overflow-style:none] max-[330px]:flex-col max-[330px]:items-start max-md:flex-nowrap max-md:overflow-x-auto md:flex-wrap md:gap-2 [&::-webkit-scrollbar]:hidden">
                      {visibleWorkingHours.map((wh) => (
                        <div
                          key={wh.id}
                          className="working-hour shrink-0 rounded-full border border-gray-500 px-2 py-1 text-sm font-bold text-gray-400"
                        >
                          {wh.timeSlot.slice(0, 5)}
                        </div>
                      ))}
                      {remainingHours > 0 && (
                        <WorkingHoursModal
                          technician={technician}
                          remainingHours={remainingHours}
                        />
                      )}
                    </div>
                  </td>
                  <td className="w-[56px] px-1.5 py-1 min-[381px]:px-3 min-[381px]:py-2 md:w-[88px] md:px-6 md:py-4">
                    <div className="flex items-center justify-end">
                      <Link
                        to={`/dashboard/technicians/${technician.id}/edit`}
                        state={{ technician }}
                      >
                        <button className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-md bg-gray-500">
                          <PenLineIcon size={16} />
                        </button>
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
};
