import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { Layout } from "@/components/layout/Layout";
import Index from "./pages/Index";
import Learn from "./pages/Learn";
import Practice from "./pages/Practice";
import PracticeSession from "./pages/PracticeSession";
import Tests from "./pages/Tests";
import Revision from "./pages/Revision";
import Analysis from "./pages/Analysis";
import DoubtSolver from "./pages/DoubtSolver";
import Auth from "./pages/Auth";
import GenerateMockTest from "./pages/GenerateMockTest";
import ChapterNotes from "./pages/ChapterNotes";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route element={<Layout />}>
              <Route path="/" element={<Index />} />
              <Route path="/learn" element={<Learn />} />
              <Route path="/learn/:subject" element={<Learn />} />
              <Route path="/practice" element={<Practice />} />
              <Route path="/practice/session" element={<PracticeSession />} />
              <Route path="/tests" element={<Tests />} />
              <Route path="/tests/generate" element={<GenerateMockTest />} />
              <Route path="/learn/notes" element={<ChapterNotes />} />
              <Route path="/revision" element={<Revision />} />
              <Route path="/analysis" element={<Analysis />} />
              <Route path="/doubt-solver" element={<DoubtSolver />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
