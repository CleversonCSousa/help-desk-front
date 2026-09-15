import { Route, Routes } from "react-router";
import "./App.css";
import { Welcome } from "./pages/welcome.tsx";
import { SignUp } from "./features/customer/sign-up.tsx";
import RequireAuth from "./routes/require-auth.tsx";
import AuthWrapper from "./routes/auth-wrapper.tsx";
import RedirectIfAuthenticated from "./routes/redirect-if-authenticated.tsx";
import { NotFound } from "./pages/not-found.tsx";
import { SignIn } from "./features/auth/sign-in.tsx";
import { Home } from "./pages/home.tsx";
import RoleBasedDashboard from "./routes/role-based-dashboard.tsx";
import { NotFoundDashboard } from "./pages/not-found-dashboard.tsx";
import { DashboardAdminTechniciansContent } from "./pages/dashboard/dashboard-admin-technicians-content.tsx";
import { EditTechnician } from "./pages/dashboard/edit-technician.tsx";
import { CreateTechnician } from "./pages/dashboard/create-technician.tsx";
import RequireRole from "./routes/require-role.tsx";
import { TicketContentResolver } from "./routes/ticket-content-resolver.tsx";
import { TicketDetailsContentResolver } from "./routes/ticket-details-resolver.tsx";
import { DashboardAdminServicesContent } from "./pages/dashboard/dashboard-admin-services-content.tsx";
import { DashboardAdminCustomersContent } from "./pages/dashboard/dashboard-admin-customers-content.tsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<AuthWrapper />}>
          <Route element={<RedirectIfAuthenticated />}>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
          </Route>
          <Route element={<RequireAuth />}>
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/dashboard" element={<RoleBasedDashboard />}>
              <Route index element={<NotFoundDashboard />} />
              <Route
                path="tickets"
                element={
                  <RequireRole
                    allowedRoles={["ADMIN", "TECHNICIAN", "CUSTOMER"]}
                  />
                }
              >
                <Route index element={<TicketContentResolver />} />
                <Route
                  path="create"
                  element={<RequireRole allowedRoles={["CUSTOMER"]} />}
                >
                  <Route
                    index
                    element={<h1 className="text-white">CREATE_TICKET_PAGE</h1>}
                  />
                </Route>
                <Route path=":id" element={<TicketDetailsContentResolver />} />
              </Route>
              <Route element={<RequireRole allowedRoles={["ADMIN"]} />}>
                <Route
                  path="services"
                  element={<DashboardAdminServicesContent />}
                />
                <Route
                  path="customers"
                  element={<DashboardAdminCustomersContent />}
                />
                <Route path="technicians">
                  <Route index element={<DashboardAdminTechniciansContent />} />
                  <Route path=":userId/edit" element={<EditTechnician />} />
                  <Route path="create" element={<CreateTechnician />} />
                </Route>
              </Route>

              <Route path="*" element={<NotFoundDashboard />} />
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
