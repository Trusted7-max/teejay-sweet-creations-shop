
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Order from "./pages/Order";
import About from "./pages/About";
import Store from "./pages/Store";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/gallery" element={<Layout><Gallery /></Layout>} />
          <Route path="/gallery/:category" element={<Layout><Gallery /></Layout>} />
          <Route path="/order" element={<Layout><Order /></Layout>} />
          <Route path="/order/custom" element={<Layout><Order /></Layout>} />
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="/store" element={<Layout><Store /></Layout>} />
          <Route path="/store/:category" element={<Layout><Store /></Layout>} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
