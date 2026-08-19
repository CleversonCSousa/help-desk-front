import { BriefcaseBusiness, ClipboardList, Menu, Users } from "lucide-react";
import { DashboardSidebarNavLink } from "./dashboard-side-bar-nav-link";

export const DashboardSidebar = () => {
  return (
    <div className="border-gray-200 text-white max-md:flex max-md:w-full max-md:items-center max-md:justify-between md:h-screen md:w-20 md:max-w-[17.5rem] xl:w-[17.5rem]">
      <div className="items-center max-md:hidden md:flex">
        <header className="flex gap-4 border-gray-200 px-5 py-6 md:border-b-2">
          <img className="w-14" src="/logo.svg" alt="logo" />
          <div className="font-bold max-md:block md:hidden xl:block">
            <p className="text-xl leading-none md:text-2xl">HelpDesk</p>
            <span className="text-brand-blue-light leading-none max-md:text-xs">
              ADMIN
            </span>
          </div>
        </header>
      </div>
      <nav className="p-2 max-md:hidden xl:px-4 xl:py-5">
        <ul className="flex flex-col gap-1">
          <li className="flex justify-center">
            <DashboardSidebarNavLink
              icon={<ClipboardList />}
              title="Tickets"
              to="/dashboard"
            />
          </li>
          <li className="flex justify-center">
            <DashboardSidebarNavLink
              icon={<Users />}
              title="Technicians"
              to="/welcome"
            />
          </li>
          <li className="flex justify-center">
            <DashboardSidebarNavLink
              icon={<BriefcaseBusiness />}
              title="Customers"
              to="/welcome"
            />
          </li>
        </ul>
      </nav>
      {/* Navbar mobile */}
      <nav className="flex w-full items-center justify-between p-6 md:hidden">
        <div className="flex gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-md bg-gray-200">
            <Menu />
          </div>
          <div className="flex items-center gap-2">
            <img className="max-md:w-12 md:w-14" src="/logo.svg" alt="logo" />
            <div className="font-bold max-md:block md:hidden xl:block">
              <p className="text-xl leading-none md:text-2xl">HelpDesk</p>
              <span className="text-brand-blue-light leading-none max-md:text-xs">
                ADMIN
              </span>
            </div>
          </div>
        </div>
        <div className="bg-brand-blue-dark flex h-12 w-12 items-center justify-center rounded-full text-xl">
          UA
        </div>
      </nav>
    </div>
  );
};
