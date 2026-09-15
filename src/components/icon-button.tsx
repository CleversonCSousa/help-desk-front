import type { ButtonHTMLAttributes, ReactNode } from "react";

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: ReactNode;
  variant?: "default" | "danger";
};

export const IconButton = ({
  icon,
  variant = "default",
  className = "",
  ...props
}: IconButtonProps) => {
  const baseClass =
    "flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-md";

  const variantClass =
    variant === "danger"
      ? "bg-gray-500 text-feedback-danger hover:opacity-80"
      : "bg-gray-500 hover:opacity-80 text-gray-200";

  return (
    <button className={`${baseClass} ${variantClass} ${className}`} {...props}>
      {icon}
    </button>
  );
};
