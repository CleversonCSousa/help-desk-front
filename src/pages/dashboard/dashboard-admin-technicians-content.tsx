import { useEffect, useState } from "react";
import { useListTechniciansQuery } from "../../features/technician/api-slice";
import { WorkingHoursModal } from "./working-hours-modal";
import { PenLineIcon, Plus } from "lucide-react";
import { Link } from "react-router";
import { Avatar } from "../../components/avatar";
import { IconButton } from "../../components/icon-button";
import { Td, Th, Table } from "../../components/table";

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

  return (
    <main className="flex-1 overflow-y-auto rounded-tl-3xl bg-white p-4 text-gray-200 min-[381px]:p-6 md:mt-3 md:p-12 md:pt-13 md:pr-12 md:pb-12">
      <div className="flex items-center justify-between">
        <h1 className="text-brand-blue-dark text-3xl font-bold">Technicians</h1>
        <Link to="/dashboard/technicians/create">
          <button className="flex h-10 cursor-pointer items-center gap-2 rounded-lg bg-gray-200 px-4 text-sm font-medium text-white transition-colors hover:opacity-90">
            <Plus size={18} />
            <span className="font-bold text-gray-600">New</span>
          </button>
        </Link>
      </div>
      <Table fixed={true}>
        <thead className="border-b border-gray-500 text-gray-400">
          <tr>
            <Th className="w-[45%] md:w-[40%]">Name</Th>
            <Th className="max-[870px]:hidden">Email</Th>
            <Th>Avaliability</Th>
            <Th className="w-14 whitespace-nowrap md:w-22"></Th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-500">
          {technicians?.map((technician) => {
            // sorts the times in ascending order
            const sortedWorkingHours = [...technician.workingHours].sort(
              (a, b) => a.timeSlot.localeCompare(b.timeSlot),
            );

            const visibleWorkingHours = sortedWorkingHours.slice(
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
                <Td className="font-bold text-gray-900">
                  <div
                    className="flex items-center max-md:gap-2 md:gap-4"
                    title={technician.name}
                  >
                    <Avatar
                      name={technician.name}
                      className="h-7 w-7 text-xs min-[381px]:h-8 min-[381px]:w-8 md:h-10 md:w-10 md:text-base"
                    />
                    <div className="min-w-0 truncate" title={technician.name}>
                      {technician.name}
                    </div>
                  </div>
                </Td>
                <Td className="text-gray-700 max-[870px]:hidden max-md:hidden">
                  <div className="truncate" title={technician.email}>
                    {technician.email}
                  </div>
                </Td>
                <Td>
                  <div className="flex scrollbar-none gap-1.5 [-ms-overflow-style:none] max-[330px]:flex-col max-[330px]:items-start max-md:flex-nowrap max-md:overflow-x-auto md:flex-wrap md:gap-2 [&::-webkit-scrollbar]:hidden">
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
                </Td>
                <Td>
                  <div className="flex items-center justify-end">
                    <Link
                      to={`/dashboard/technicians/${technician.id}/edit`}
                      state={{ technician }}
                    >
                      <IconButton icon={<PenLineIcon size={16} />} />
                    </Link>
                  </div>
                </Td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </main>
  );
};
