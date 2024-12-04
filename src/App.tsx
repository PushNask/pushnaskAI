import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AIAdvisor from "./pages/AIAdvisor";
import Reports from "./pages/Reports";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Analytics from "./pages/Analytics";
import ProfileManagement from "./pages/profile/ProfileManagement";
import CVCreator from "./components/profile/CVCreator";
import ServiceSetup from "./components/profile/ServiceSetup";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AIAdvisor />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/ai-advisor" element={<AIAdvisor />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/management" element={<ProfileManagement />} />
          <Route path="/profile/cv" element={<CVCreator />} />
          <Route path="/profile/services" element={<ServiceSetup />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;