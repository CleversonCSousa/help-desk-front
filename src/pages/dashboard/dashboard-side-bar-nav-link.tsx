import type { ReactNode } from "react";
import { NavLink } from "react-router";

type DashboardSidebarNavLinkProps = {
  title: string;
  to: string;
  icon: ReactNode;
  end?: boolean;
};

export const DashboardSidebarNavLink = ({
  title,
  to,
  icon,
  end,
}: DashboardSidebarNavLinkProps) => {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `${isActive ? "bg-brand-blue-dark" : "text-gray-400"} flex gap-4 rounded-md p-3 max-xl:w-min xl:w-full`
      }
    >
      {icon}
      <p className="hidden xl:block">{title}</p>
    </NavLink>
  );
};
