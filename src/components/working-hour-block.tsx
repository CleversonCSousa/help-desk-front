import { X } from "lucide-react";

type WorkingHourBlockProps = {
  title: string;
  hours: string[];
  currentWorkingHours: { timeSlot: string }[];
  onToggle: (time: string) => void;
};

export const WorkingHourBlock = ({
  title,
  hours,
  currentWorkingHours,
  onToggle,
}: WorkingHourBlockProps) => {
  return (
    <div>
      <p className="text-xs font-bold text-gray-300 uppercase">{title}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {hours.map((time) => {
          const isSelected = currentWorkingHours.some((wh) =>
            wh.timeSlot.startsWith(time),
          );

          return (
            <button
              key={time}
              type="button"
              onClick={() => onToggle(time)}
              className={`working-hour flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full border px-2.5 py-1 text-sm font-bold transition-colors ${
                isSelected
                  ? "bg-brand-blue-base border-brand-blue-base text-gray-600"
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
  );
};
