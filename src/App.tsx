import { useState, Suspense, lazy } from 'react';
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
import ErrorBoundary from "@/components/ErrorBoundary";
import PageLoader from "@/components/ui/PageLoader";

// Página principal - cargar inmediatamente (crítica)
import Home from "./pages/Index";
import NotFound from "./pages/NotFound";

// Lazy loading de páginas de contenido (cargar bajo demanda)
const SoporteVital = lazy(() => import("./pages/SoporteVital"));
const Patologias = lazy(() => import("./pages/Patologias"));
const Escena = lazy(() => import("./pages/Escena"));
const Farmacos = lazy(() => import("./pages/Farmacos"));
const Herramientas = lazy(() => import("./pages/Herramientas"));
const Material = lazy(() => import("./pages/Material"));
const Telefono = lazy(() => import("./pages/Telefono"));
const Comunicacion = lazy(() => import("./pages/Comunicacion"));
const ManualIndex = lazy(() => import("./pages/ManualIndex"));
const ManualViewer = lazy(() => import("./pages/ManualViewer"));
const RCP = lazy(() => import("./pages/RCP"));
const Ictus = lazy(() => import("./pages/Ictus"));
const Shock = lazy(() => import("./pages/Shock"));
const ViaAerea = lazy(() => import("./pages/ViaAerea"));

// Lazy loading de páginas de utilidades
const Favoritos = lazy(() => import("./pages/Favoritos"));
const Historial = lazy(() => import("./pages/Historial"));
const Ajustes = lazy(() => import("./pages/Ajustes"));
const Acerca = lazy(() => import("./pages/Acerca"));
const GaleriaImagenes = lazy(() => import("./pages/GaleriaImagenes"));
const Privacidad = lazy(() => import("./pages/Privacidad"));
const DescargoResponsabilidad = lazy(() => import("./pages/DescargoResponsabilidad"));
const AvisoLegal = lazy(() => import("./pages/AvisoLegal"));

// Lazy loading de Guías de Refuerzo (Modo Formativo)
const GuideIndex = lazy(() => import("./views/formativo/GuideIndex"));
const GuideViewer = lazy(() => import("./views/formativo/GuideViewer"));
const GuideSectionViewer = lazy(() => import("./views/formativo/GuideSectionViewer"));
import { GuideLayout } from "./layouts/GuideLayout";

const queryClient = new QueryClient();

const App = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <ErrorBoundary>
              <div className="min-h-screen bg-background flex flex-col">
                <Header
                  onSearchClick={() => setIsSearchOpen(true)}
                  onMenuClick={() => setIsMenuOpen(true)}
                />

                <main className="pt-14 pb-safe flex-1">
                  <div className="container max-w-2xl py-4">
                    <Suspense fallback={<PageLoader />}>
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
                        <Route path="/privacidad" element={<Privacidad />} />
                        <Route path="/descargo-responsabilidad" element={<DescargoResponsabilidad />} />
                        <Route path="/aviso-legal" element={<AvisoLegal />} />
                        
                        {/* Rutas de Guías de Refuerzo (Modo Formativo) */}
                        <Route
                          path="/guia-refuerzo"
                          element={
                            <GuideLayout
                              onSearchClick={() => setIsSearchOpen(true)}
                              onMenuClick={() => setIsMenuOpen(true)}
                            >
                              <GuideIndex />
                            </GuideLayout>
                          }
                        />
                        <Route
                          path="/guia-refuerzo/:guia"
                          element={
                            <GuideLayout
                              onSearchClick={() => setIsSearchOpen(true)}
                              onMenuClick={() => setIsMenuOpen(true)}
                            >
                              <GuideViewer />
                            </GuideLayout>
                          }
                        />
                        <Route
                          path="/guia-refuerzo/:guia/seccion/:numero"
                          element={
                            <GuideLayout
                              onSearchClick={() => setIsSearchOpen(true)}
                              onMenuClick={() => setIsMenuOpen(true)}
                            >
                              <GuideSectionViewer />
                            </GuideLayout>
                          }
                        />
                        
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </Suspense>
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
            </ErrorBoundary>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
