import { useState } from "react";
import { Modal } from "../../components/modal";

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
      <Modal
        isOpen={modal}
        onClose={toggleModal}
        title="Avaliability"
        subtitle={technician.name}
      >
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
      </Modal>
    </>
  );
};
