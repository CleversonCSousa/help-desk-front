import { Outlet } from "react-router";
import { DashboardSidebar } from "./dashboard-side-bar";

const DashboardLayout = () => {
  return (
    <div className="flex bg-gray-100 max-md:flex-col">
      <DashboardSidebar />
      <Outlet />
    </div>
  );
};

export default DashboardLayout;
