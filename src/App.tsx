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
              <Route path="tickets" element={<RoleBasedTickets />} />
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
