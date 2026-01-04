import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.tsx";
import NotFound from "./pages/NotFound";
import Building from "./pages/Building";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import UserDashboard from "./pages/UserDashboard";
import UserDashboard2 from "./pages/UserDashboard2.tsx";
import IndexRouter from "./pages/IndexRouter.tsx";
import Status from "./pages/Status.tsx";
import { AuthProvider } from "./contexts/AuthContext";
// Initialize analytics
import "./lib/analytics";

const queryClient = new QueryClient();

const hasParamInSearch = () => {
  return !!window.location.search && window.location.search !== '?';
};

const App = () => {
  console.log('🔥 App component rendering...')
  console.log('Current URL:', window.location.href)
  console.log('Pathname:', window.location.pathname)
  console.log('Hash:', window.location.hash)

  console.log('🔥 Using HashRouter routing with Home as callback handler')
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <HashRouter>
            {hasParamInSearch() ? (
              <IndexRouter />
            ) : (
              <Routes>
                <Route path="/" element={<IndexRouter />} />
                <Route path="/home" element={<Home />} />
                <Route path="/building" element={<Building />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
                <Route path="/dashboard" element={<UserDashboard />} />
                <Route path="/dashboard2" element={<UserDashboard2 />} />
                <Route path="/status" element={<Status />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            )}
          </HashRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
