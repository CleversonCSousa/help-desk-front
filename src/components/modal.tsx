import { X } from "lucide-react";
import type { ReactNode } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: ReactNode;
};

export const Modal = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-md rounded-lg border-gray-500 bg-white">
        <header className="flex items-center justify-between px-7 py-5">
          <div>
            {title && (
              <h2 className="text-xl font-bold text-gray-200">{title}</h2>
            )}
            {subtitle && <p className="text-gray-300">{subtitle}</p>}
          </div>
          <button onClick={onClose} className="cursor-pointer text-gray-300">
            <X size={24} />
          </button>
        </header>
        {children}
      </div>
    </div>
  );
};
