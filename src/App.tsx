import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import Index from "./pages/Index";
import Learn from "./pages/Learn";
import Practice from "./pages/Practice";
import Tests from "./pages/Tests";
import Revision from "./pages/Revision";
import Analysis from "./pages/Analysis";
import DoubtSolver from "./pages/DoubtSolver";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/learn/:subject" element={<Learn />} />
            <Route path="/practice" element={<Practice />} />
            <Route path="/tests" element={<Tests />} />
            <Route path="/revision" element={<Revision />} />
            <Route path="/analysis" element={<Analysis />} />
            <Route path="/doubt-solver" element={<DoubtSolver />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
