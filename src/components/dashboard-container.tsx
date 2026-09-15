import type { ReactNode } from "react";

type DashboardContainerProps = {
  children: ReactNode;
  className?: string;
};

export const DashboardContainer = ({
  children,
  className = "",
}: DashboardContainerProps) => {
  return (
    <main
      className={`flex flex-1 flex-col overflow-y-auto rounded-tl-3xl bg-white p-4 text-gray-200 min-[381px]:p-6 md:mt-3 md:p-12 md:pt-13 md:pr-12 md:pb-12 ${className}`}
    >
      {children}
    </main>
  );
};
