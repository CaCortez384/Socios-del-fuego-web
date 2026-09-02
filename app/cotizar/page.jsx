"use client";

import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ShieldAlert } from "lucide-react";
import { doc, getDoc } from "firebase/firestore";
import { db, app as firebaseApp } from "@/lib/firebase";
import Link from "next/link";
import Image from "next/image";
import { trackCotizacion } from "@/lib/utils";

// COMPONENTES
import StepDateGuests from "@/components/cotizador/StepDateGuests";
import StepPlanSelection from "@/components/cotizador/StepPlanSelection";
import StepSummary from "@/components/cotizador/StepSummary";
import AdminDashboard from "@/components/cotizador/AdminDashboard";

// HOOKS
import { useAvailability } from "@/hooks/useAvailability";
import { useAdminDoubleTap } from "@/hooks/useAdminDoubleTap";
import { usePlans } from "@/hooks/usePlans";

const STEP_LABELS = {
  1: "Selección de Plan",
  2: "Fecha y Ubicación",
  3: "Resumen Final",
};

export default function CotizadorPage() {
  // STATE PRINCIPAL
  const [step, setStep] = useState(1);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  // DATOS FORMULARIO
  const [date, setDate] = useState(null);
  const [guests, setGuests] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [wantsCordero, setWantsCordero] = useState(false);
  const [wantsMobiliario, setWantsMobiliario] = useState(false);
  const [wantsPostres, setWantsPostres] = useState(false);
  const [postreOption, setPostreOption] = useState("pina");
  const [wantsCoffeeBreak, setWantsCoffeeBreak] = useState(false);
  const [coffeeBreakOption, setCoffeeBreakOption] = useState("kuchen");

  // FIREBASE & HOOKS
  const { bookedDates, bookedDetails, loading, error, toggleDateLock } = useAvailability();
  const handleDoubleTap = useAdminDoubleTap();
  const { plans, loadingPlans } = usePlans();

  useEffect(() => {
    const auth = getAuth(firebaseApp);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAdmin(!!user);
      setIsAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // --- INTERCEPTOR DE COTIZACIONES COMPARTIDAS ---
  useEffect(() => {
    const fetchSharedQuote = async () => {
      const params = new URLSearchParams(window.location.search);
      const quoteId = params.get("quote");

      if (!quoteId || loadingPlans || plans.length === 0) return;

      try {
        setIsAuthLoading(true);
        const docRef = doc(db, "shared_quotes", quoteId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();

          if (data.date) setDate(new Date(data.date));
          setGuests(data.guests.toString());
          setSelectedLocation(data.location);
          setWantsCordero(data.wantsCordero);

          const foundPlan = plans.find((p) => p.id === data.planId);
          if (foundPlan) setSelectedPlan(foundPlan);

          setStep(3);

          window.history.replaceState(
            {},
            document.title,
            window.location.pathname,
          );
        } else {
          console.error("La cotización no existe.");
          alert("Este enlace de cotización ha expirado o no existe.");
        }
      } catch (error) {
        console.error("Error recuperando cotización:", error);
      } finally {
        setIsAuthLoading(false);
      }
    };

    fetchSharedQuote();
  }, [loadingPlans, plans]);

  // --- GA4 TRACKING POR PASO ---
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.scrollTo(0, 0);

    trackCotizacion("page_view", {
      page_path: `/cotizar#paso-${step}`,
      page_title: `Cotizador - Paso ${step}: ${STEP_LABELS[step]}`,
    });
  }, [step]);

  // --- NAVEGACIÓN CON EL BOTÓN ATRÁS DEL NAVEGADOR ---
  useEffect(() => {
    if (typeof window === "undefined") return;

    const desiredHash = `#paso-${step}`;
    if (window.location.hash !== desiredHash && !window.location.search.includes('quote=')) {
      window.history.replaceState(null, "", desiredHash);
    }

    const handlePopState = () => {
      const hash = window.location.hash;
      if (hash === "#paso-3") setStep(3);
      else if (hash === "#paso-2") setStep(2);
      else setStep(1);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const desiredHash = `#paso-${step}`;
    if (window.location.hash !== desiredHash) {
      window.history.pushState(null, "", desiredHash);
    }
  }, [step]);

  // --- RENDER ---
  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans selection:bg-orange-500 selection:text-white pb-20 overflow-x-hidden">
      {/* NAVBAR */}
      <nav className="px-4 py-3 sm:p-6 flex justify-between items-center bg-stone-950/80 backdrop-blur-md sticky top-0 z-50 border-b border-stone-900 gap-2 overflow-hidden">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 shrink-0">
          <Link
            href="/"
            onClick={handleDoubleTap}
            className="flex items-center gap-2 sm:gap-3 cursor-pointer select-none active:scale-95 transition-transform"
          >
            <div className="relative h-9 w-9 sm:h-10 sm:w-10 overflow-hidden rounded-full border border-orange-600/20 shrink-0">
              <Image
                src="/logo.webp"
                alt="Logo Socios del Fuego"
                fill
                className="object-cover"
              />
            </div>
            <span className="font-bold text-lg sm:text-xl tracking-tight text-stone-200 whitespace-nowrap">
              Socios del <span className="text-orange-500">Fuego</span>
            </span>
          </Link>
        </div>

        {isAdmin && !loading && (
          <span className="flex items-center gap-1.5 text-[9px] sm:text-[10px] bg-red-500/10 text-red-400 px-2 sm:px-3 py-1 rounded-full border border-red-500/20 font-bold font-mono animate-pulse whitespace-nowrap shrink-0">
            <ShieldAlert size={10} /> MODO ADMIN
          </span>
        )}
      </nav>

      {/* MAIN CONTENT */}
      <main className="mx-auto p-4 md:p-6 mt-4 max-w-5xl transition-all duration-500 overflow-x-hidden">
        {error && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-900/50 rounded-xl text-red-200 text-sm text-center">
            {error}
          </div>
        )}

        {loading || isAuthLoading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4 animate-pulse">
            <div className="w-12 h-12 border-4 border-stone-800 border-t-orange-500 rounded-full animate-spin"></div>
            <p className="text-stone-500 text-sm">Cargando...</p>
          </div>
        ) : (
          <>
            {isAdmin ? (
              <AdminDashboard
                bookedDates={bookedDates}
                bookedDetails={bookedDetails}
                toggleDateLock={toggleDateLock}
              />
            ) : (
              <>
                {/* BARRA DE PROGRESO */}
                <div className="flex gap-2 mb-8 md:mb-10 px-1">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                        step >= i
                          ? "bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]"
                          : "bg-stone-800"
                      }`}
                    />
                  ))}
                </div>

                {/* --- PASOS --- */}
                {step === 1 && (
                  <StepPlanSelection
                    selectedPlan={selectedPlan}
                    setSelectedPlan={setSelectedPlan}
                    wantsCordero={wantsCordero}
                    setWantsCordero={setWantsCordero}
                    wantsMobiliario={wantsMobiliario}
                    setWantsMobiliario={setWantsMobiliario}
                    wantsPostres={wantsPostres}
                    setWantsPostres={setWantsPostres}
                    postreOption={postreOption}
                    setPostreOption={setPostreOption}
                    wantsCoffeeBreak={wantsCoffeeBreak}
                    setWantsCoffeeBreak={setWantsCoffeeBreak}
                    coffeeBreakOption={coffeeBreakOption}
                    setCoffeeBreakOption={setCoffeeBreakOption}
                    onNext={() => setStep(2)}
                    onBack={() => {}}
                  />
                )}

                {step === 2 && (
                  <StepDateGuests
                    date={date}
                    setDate={setDate}
                    guests={guests}
                    setGuests={setGuests}
                    selectedLocation={selectedLocation}
                    setSelectedLocation={setSelectedLocation}
                    bookedDates={bookedDates}
                    toggleDateLock={toggleDateLock}
                    isAdmin={isAdmin}
                    onNext={() => setStep(3)}
                    onBack={() => setStep(1)}
                  />
                )}

                {step === 3 && (
                  <StepSummary
                    date={date}
                    guests={guests}
                    selectedLocation={selectedLocation}
                    selectedPlan={selectedPlan}
                    wantsCordero={wantsCordero}
                    wantsMobiliario={wantsMobiliario}
                    wantsPostres={wantsPostres}
                    postreOption={postreOption}
                    wantsCoffeeBreak={wantsCoffeeBreak}
                    coffeeBreakOption={coffeeBreakOption}
                    onBack={() => setStep(2)}
                  />
                )}
              </>
            )}
          </>
        )}
        {/* FOOTER GLOBAL */}
        <footer className="mt-12 pt-8 pb-22 border-t border-stone-900 text-center space-y-2 opacity-60 hover:opacity-100 transition-opacity">
          {" "}
          <p className="text-[10px] text-stone-600 uppercase tracking-widest font-bold">
            © 2026 Socios del Fuego
          </p>
          <p className="text-[10px] text-stone-700 font-mono">
            Desarrollado con 🔥 por{" "}
            <a
              href="https://www.linkedin.com/in/carlos-cortez-casta%C3%B1eda-266546324/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-600 hover:text-orange-400 underline decoration-dotted underline-offset-4 transition-colors"
            >
              Carlos Cortez
            </a>
          </p>
        </footer>
      </main>
    </div>
  );
}
