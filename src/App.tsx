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
import RoleBasedTickets from "./routes/role-based-tickets.tsx";
import RoleBasedServices from "./routes/role-based-services.tsx";
import RoleBasedCustomers from "./routes/role-based-customer.tsx";
import { NotFoundDashboard } from "./pages/not-found-dashboard.tsx";
import RoleBasedTechnicians from "./routes/role-based-technician.tsx";
import { DashboardAdminTechniciansContent } from "./pages/dashboard/dashboard-admin-technicians-content.tsx";
import { EditTechnician } from "./pages/dashboard/edit-technician.tsx";

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
              <Route path="tickets" element={<RoleBasedTickets />} />
              <Route path="services" element={<RoleBasedServices />} />
              <Route path="customers" element={<RoleBasedCustomers />} />
              <Route path="technicians" element={<RoleBasedTechnicians />}>
                <Route index element={<DashboardAdminTechniciansContent />} />
                <Route path=":userId/edit" element={<EditTechnician />} />
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
