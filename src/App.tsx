import React, { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Capacitor } from "@capacitor/core";
import { NotesProvider } from "@/context/NotesContext";
import { NotebooksProvider } from "@/context/NotebooksContext";
import { ThemesProvider } from "@/context/ThemesContext";
import { BiometricAuth } from "@/components/BiometricAuth";
import Index from "./pages/Index";
import Notes from "./pages/Notes";
import Themes from "./pages/Themes";
import Draw from "./pages/Draw";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!Capacitor.isNativePlatform());

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemesProvider>
          <NotesProvider>
            <NotebooksProvider>
              <Toaster />
              <Sonner />
              <AnimatePresence mode="wait">
                {!isAuthenticated ? (
                  <BiometricAuth onAuthenticated={() => setIsAuthenticated(true)} key="biometric-guard" />
                ) : (
                  <BrowserRouter key="app-router">
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/notes" element={<Notes />} />
                      <Route path="/themes" element={<Themes />} />
                      <Route path="/draw" element={<Draw />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </BrowserRouter>
                )}
              </AnimatePresence>
            </NotebooksProvider>
          </NotesProvider>
        </ThemesProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
