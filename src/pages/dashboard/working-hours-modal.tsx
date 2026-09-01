import { X } from "lucide-react";
import { useState } from "react";

type WorkingHoursModalProps = {
  technician: {
    id: string;
    name: string;
    workingHours: Array<{
      id?: string;
      timeSlot: string;
    }>;
  };
  remainingHours: number;
};

export const WorkingHoursModal = ({
  technician,
  remainingHours,
}: WorkingHoursModalProps) => {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <>
      <button
        onClick={toggleModal}
        className="shrink-0 cursor-pointer rounded-full border border-gray-500 px-2 py-1 text-sm font-bold text-gray-400"
      >
        +{remainingHours}
      </button>
      {modal && (
        <div className="fixed inset-0 z-1 flex items-center justify-center bg-black/50">
          <div className="mx-4 w-full max-w-md rounded-lg border-gray-500 bg-white">
            <header className="flex items-center justify-between px-7 py-5">
              <div>
                <h2 className="text-xl font-bold text-gray-200">
                  Avaliability
                </h2>
                <p className="text-gray-300">{technician.name}</p>
              </div>
              <button onClick={toggleModal} className="text-gray-300">
                <X size={24} />
              </button>
            </header>
            <div className="grid gap-2 overflow-y-auto border-t border-gray-500 p-7 pb-8 max-md:grid-cols-2 md:grid-cols-4">
              {technician.workingHours.map((wh) => (
                <div
                  key={wh.id}
                  className="rounded-full border border-gray-500 px-3 py-1.5 text-center text-sm font-bold text-gray-400"
                >
                  {wh.timeSlot.slice(0, 5)}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
