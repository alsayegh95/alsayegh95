import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ActivityFeed from "./pages/ActivityFeed";
import AgentsPage from "./pages/AgentsPage";
import CalendarPage from "./pages/CalendarPage";
import PipelinePage from "./pages/PipelinePage";
import MemoryPage from "./pages/MemoryPage";
import SearchPage from "./pages/SearchPage";
import NotFound from "./pages/NotFound";
import AgentDetail from "./pages/AgentDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/agents" element={<AgentsPage />} />
          <Route path="/feed" element={<ActivityFeed />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/pipeline" element={<PipelinePage />} />
          <Route path="/memory" element={<MemoryPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/agent/:agentId" element={<AgentDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
