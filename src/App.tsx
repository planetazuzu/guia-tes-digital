import { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import Footer from "@/components/layout/Footer";
import SearchModal from "@/components/layout/SearchModal";
import MenuSheet from "@/components/layout/MenuSheet";
import UpdateNotification from "@/components/layout/UpdateNotification";
import InstallBanner from "@/components/layout/InstallBanner";
import Home from "./pages/Index";
import SoporteVital from "./pages/SoporteVital";
import Patologias from "./pages/Patologias";
import Escena from "./pages/Escena";
import Farmacos from "./pages/Farmacos";
import Herramientas from "./pages/Herramientas";
import Material from "./pages/Material";
import Telefono from "./pages/Telefono";
import Comunicacion from "./pages/Comunicacion";
import ManualIndex from "./pages/ManualIndex";
import ManualViewer from "./pages/ManualViewer";
import NotFound from "./pages/NotFound";
import RCP from "./pages/RCP";
import Ictus from "./pages/Ictus";
import Shock from "./pages/Shock";
import ViaAerea from "./pages/ViaAerea";
import Favoritos from "./pages/Favoritos";
import Historial from "./pages/Historial";
import Ajustes from "./pages/Ajustes";
import Acerca from "./pages/Acerca";
import GaleriaImagenes from "./pages/GaleriaImagenes";
import ErrorBoundary from "@/components/ErrorBoundary";

const queryClient = new QueryClient();

const App = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <ErrorBoundary>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <div className="min-h-screen bg-background flex flex-col">
                <Header
                  onSearchClick={() => setIsSearchOpen(true)}
                  onMenuClick={() => setIsMenuOpen(true)}
                />

                <main className="pt-14 pb-safe flex-1">
                  <div className="container max-w-2xl py-4">
                    <Routes>
                      <Route
                        path="/"
                        element={<Home onSearchClick={() => setIsSearchOpen(true)} />}
                      />
                      <Route path="/soporte-vital" element={<SoporteVital />} />
                      <Route path="/patologias" element={<Patologias />} />
                      <Route path="/escena" element={<Escena />} />
                      <Route path="/farmacos" element={<Farmacos />} />
                      <Route path="/herramientas" element={<Herramientas />} />
                      <Route path="/material" element={<Material />} />
                      <Route path="/telefono" element={<Telefono />} />
                      <Route path="/comunicacion" element={<Comunicacion />} />
                      <Route path="/manual" element={<ManualIndex />} />
                      <Route path="/manual/:parte/:bloque/:capitulo" element={<ManualViewer />} />
                      <Route path="/rcp" element={<RCP />} />
                      <Route path="/ictus" element={<Ictus />} />
                      <Route path="/shock" element={<Shock />} />
                      <Route path="/via-aerea" element={<ViaAerea />} />
                      <Route path="/favoritos" element={<Favoritos />} />
                      <Route path="/historial" element={<Historial />} />
                      <Route path="/ajustes" element={<Ajustes />} />
                      <Route path="/acerca" element={<Acerca />} />
                      <Route path="/galeria" element={<GaleriaImagenes />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </div>
                </main>

                <BottomNav />

                <Footer />

                <UpdateNotification />
                <InstallBanner />

                <SearchModal
                  isOpen={isSearchOpen}
                  onClose={() => setIsSearchOpen(false)}
                />

                <MenuSheet
                  isOpen={isMenuOpen}
                  onClose={() => setIsMenuOpen(false)}
                />
              </div>
            </BrowserRouter>
          </TooltipProvider>
        </ErrorBoundary>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
