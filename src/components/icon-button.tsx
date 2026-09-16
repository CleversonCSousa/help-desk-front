import type { ButtonHTMLAttributes, ReactNode } from "react";

type IconButtonVariant = "default" | "danger" | "primary"; // Adicione quantas variantes quiser aqui

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: ReactNode;
  variant?: IconButtonVariant;
  children?: ReactNode;
};

export const IconButton = ({
  icon,
  variant = "default",
  className = "",
  children,
  ...props
}: IconButtonProps) => {
  const baseClass =
    "flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-md";

  const getVariantClass = (variant: IconButtonVariant): string => {
    switch (variant) {
      case "danger":
        return "bg-gray-500 text-feedback-danger hover:opacity-80";
      case "primary":
        return "bg-gray-200 text-gray-600 hover:opacity-80";
      case "default":
      default:
        return "bg-gray-500 text-gray-200 hover:opacity-80";
    }
  };

  return (
    <button
      className={`${baseClass} ${getVariantClass(variant)} ${className}`}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
};
