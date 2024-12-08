import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/auth/AuthContext";
import { TranslationsProvider } from "./contexts/TranslationsContext";
import Routes from "./Routes";
import Head from "./components/Head";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <TranslationsProvider>
        <BrowserRouter>
          <AuthProvider>
            <Toaster />
            <Sonner />
            <Head />
            <Routes />
          </AuthProvider>
        </BrowserRouter>
      </TranslationsProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;