import { Routes as RouterRoutes, Route } from "react-router-dom";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import LandingPage from "./pages/LandingPage";
import Overview from "./pages/Overview";
import Pricing from "./pages/Pricing";
import AuthScreen from "./pages/AuthScreen";
import AIAdvisor from "./pages/AIAdvisor";
import Reports from "./pages/Reports";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Analytics from "./pages/Analytics";
import ProfileManagement from "./pages/profile/ProfileManagement";
import CVCreator from "./components/cv/CVCreator";
import ServiceSetup from "./components/profile/ServiceSetup";

const Routes = () => (
  <RouterRoutes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/overview" element={<Overview />} />
    <Route path="/pricing" element={<Pricing />} />
    <Route path="/auth" element={<AuthScreen />} />
    <Route
      path="/dashboard"
      element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      }
    />
    <Route
      path="/ai-advisor"
      element={
        <ProtectedRoute>
          <AIAdvisor />
        </ProtectedRoute>
      }
    />
    <Route
      path="/reports"
      element={
        <ProtectedRoute>
          <Reports />
        </ProtectedRoute>
      }
    />
    <Route
      path="/profile"
      element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      }
    />
    <Route
      path="/profile/management"
      element={
        <ProtectedRoute>
          <ProfileManagement />
        </ProtectedRoute>
      }
    />
    <Route
      path="/profile/cv"
      element={
        <ProtectedRoute>
          <CVCreator />
        </ProtectedRoute>
      }
    />
    <Route
      path="/profile/services"
      element={
        <ProtectedRoute>
          <ServiceSetup />
        </ProtectedRoute>
      }
    />
    <Route
      path="/settings"
      element={
        <ProtectedRoute>
          <Settings />
        </ProtectedRoute>
      }
    />
    <Route
      path="/analytics"
      element={
        <ProtectedRoute>
          <Analytics />
        </ProtectedRoute>
      }
    />
  </RouterRoutes>
);

export default Routes;