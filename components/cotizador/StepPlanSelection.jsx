"use client";

import { useState, useEffect } from "react";
import { CORDERO_DATA, ADDONS_DATA } from "@/lib/plans";
import { usePlans } from "@/hooks/usePlans";
import { trackCotizacion } from "@/lib/utils";
import FAQ from "./FAQ";
import {
  Check,
  ChevronRight,
  Star,
  Flame,
  Utensils,
  Beer,
  Info,
  ShoppingCart,
  ArrowRight,
  ListFilter,
  Plus,
  Armchair,
  Cake,
  UtensilsCrossed,
  Sparkles,
} from "lucide-react";
import TrustBar from "./TrustBar";

const PLAN_IMAGES = {
  premium: "/galeria/parrilla4.jpeg",
  criollo: "/galeria/parrilla2.jpeg",
  extra_premium: "/galeria/parrilla1.jpeg",
  total: "/galeria/parrilla5.jpeg",
  premium_picar: "/galeria/parrilla4.jpeg",
  extra_premium_picar: "/galeria/parrilla1.jpeg",
  carne_al_plato: "/galeria/parrilla2.jpeg",
};

export default function StepPlanSelection({
  selectedPlan,
  setSelectedPlan,
  wantsCordero,
  setWantsCordero,
  wantsMobiliario,
  setWantsMobiliario,
  wantsPostres,
  setWantsPostres,
  postreOption = "pina",
  setPostreOption,
  onNext,
}) {
  const [activeTab, setActiveTab] = useState("full");
  const [showFullMenuId, setShowFullMenuId] = useState(null);
  const [hasReviewedExtras, setHasReviewedExtras] = useState(false);
  const [highlightExtras, setHighlightExtras] = useState(false);
  const { plans: PLANS, loadingPlans } = usePlans();

  const scrollToExtras = () => {
    setHasReviewedExtras(true);
    setHighlightExtras(true);
    setTimeout(() => {
      const element = document.getElementById("seccion-adicionales");
      if (element) {
        const y = element.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }, 50);
    setTimeout(() => {
      setHighlightExtras(false);
    }, 3000);
  };

  // --- MOTOR DE AUTO-SELECCIÓN Y AUTO-SCROLL ---
  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const planIdFromUrl = params.get("plan");

    if (!planIdFromUrl || selectedPlan || loadingPlans || PLANS.length === 0) return;

    const foundPlan = PLANS.find((p) => p.id === planIdFromUrl);
    if (!foundPlan) return;

    window.history.replaceState({}, document.title, window.location.pathname);

    setTimeout(() => {
      setSelectedPlan(foundPlan);
      setActiveTab(foundPlan.category);

      setTimeout(() => {
        const cardElement = document.getElementById(
          `plan-card-${foundPlan.id}`,
        );
        if (cardElement) {
          const y =
            cardElement.getBoundingClientRect().top + window.scrollY - 120;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }, 150);
    }, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingPlans, PLANS]);

  const handleTabChange = (tab) => {
    if (tab === "adicionales") {
      scrollToExtras();
      return;
    }
    setActiveTab(tab);
    setTimeout(() => {
      const tabsElement = document.getElementById("menu-tabs");
      if (tabsElement) {
        const y = tabsElement.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }, 50);
  };

  const filteredPlans = PLANS.filter((plan) => plan.category === activeTab && plan.active !== false);

  // --- EVENTO GA4: SELECCIÓN DE ITEM ---
  const handlePlanClick = (plan) => {
    if (selectedPlan?.id === plan.id) return;
    setSelectedPlan(plan);

    trackCotizacion("select_item", {
      item_list_id: activeTab,
      item_list_name: activeTab === "full" ? "Al Plato" : "Solo Picoteo",
      items: [
        {
          item_id: plan.id,
          item_name: plan.name,
          price: plan.pricePerPerson,
        },
      ],
    });
  };

  // --- EVENTO GA4: UPSELL (AÑADIR/QUITAR CORDERO DEL CARRITO) ---
  const handleToggleCordero = () => {
    const newValue = !wantsCordero;
    setWantsCordero(newValue);
    setHasReviewedExtras(true);

    trackCotizacion(newValue ? "add_to_cart" : "remove_from_cart", {
      currency: "CLP",
      value: CORDERO_DATA.price,
      items: [
        {
          item_id: "cordero-extra",
          item_name: CORDERO_DATA.label,
          price: CORDERO_DATA.price,
          quantity: 1,
        },
      ],
    });
  };

  // --- EVENTO GA4: CONFIRMACIÓN DE CARRITO Y AVANCE ---
  const handleNext = (forceAdvance = false) => {
    if (!selectedPlan) return;

    const hasAnyExtra = wantsCordero || wantsMobiliario || wantsPostres;

    // Si el usuario aún no ve ni selecciona los extras y no presiona forzar avance:
    if (!forceAdvance && !hasReviewedExtras && !hasAnyExtra) {
      scrollToExtras();
      return;
    }

    trackCotizacion("add_to_cart", {
      currency: "CLP",
      value: selectedPlan.pricePerPerson,
      items: [
        {
          item_id: selectedPlan.id,
          item_name: selectedPlan.name,
          price: selectedPlan.pricePerPerson,
          quantity: 1,
        },
      ],
    });
    onNext();
  };

  const toggleMenuDetails = (e, planId) => {
    e.stopPropagation();
    setShowFullMenuId(showFullMenuId === planId ? null : planId);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-4">
      {/* HEADER */}
      <div className="mb-6 px-1">
        <h2 className="text-3xl md:text-4xl font-bold text-stone-100 leading-tight">
          Elige tu{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
            Experiencia
          </span>
        </h2>
        <p className="text-stone-400 text-sm mt-2 max-w-xl leading-relaxed">
          Define el estilo de tu evento. Los precios son por persona y se
          ajustan al final.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start relative">
        {/* COLUMNA IZQUIERDA: CATÁLOGO */}
        <div className="w-full lg:w-2/3 space-y-6">
          {/* TABS SUPERIORES OPTIMIZADAS */}
          <div
            id="menu-tabs"
            className="sticky top-20 z-40 py-2 bg-stone-950/95 backdrop-blur-xl border-b border-stone-800/50 -mx-4 px-4 md:mx-0 md:px-0 md:bg-transparent md:border-none md:static md:block shadow-2xl shadow-stone-950/50"
          >
            <div className="flex p-1 bg-stone-900 rounded-xl border border-stone-800 shadow-xl overflow-x-auto custom-scrollbar">
              <button
                onClick={() => handleTabChange("full")}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs md:text-sm font-bold transition-all duration-300 whitespace-nowrap ${
                  activeTab === "full"
                    ? "bg-gradient-to-b from-stone-800 to-stone-900 text-orange-500 shadow-inner ring-1 ring-stone-700/50"
                    : "text-stone-500 hover:text-stone-300 hover:bg-stone-900/30"
                }`}
              >
                <Utensils
                  size={16}
                  className={
                    activeTab === "full" ? "text-orange-500" : "text-stone-600"
                  }
                />
                Servicio Buffet
              </button>
              <button
                onClick={() => handleTabChange("al_plato")}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs md:text-sm font-bold transition-all duration-300 whitespace-nowrap ${
                  activeTab === "al_plato"
                    ? "bg-gradient-to-b from-stone-800 to-stone-900 text-orange-500 shadow-inner ring-1 ring-stone-700/50"
                    : "text-stone-500 hover:text-stone-300 hover:bg-stone-900/30"
                }`}
              >
                <UtensilsCrossed
                  size={16}
                  className={
                    activeTab === "al_plato" ? "text-orange-500" : "text-stone-600"
                  }
                />
                Carne al Plato
              </button>
              <button
                onClick={() => handleTabChange("picar")}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs md:text-sm font-bold transition-all duration-300 whitespace-nowrap ${
                  activeTab === "picar"
                    ? "bg-gradient-to-b from-stone-800 to-stone-900 text-orange-500 shadow-inner ring-1 ring-stone-700/50"
                    : "text-stone-500 hover:text-stone-300 hover:bg-stone-900/30"
                }`}
              >
                <Beer
                  size={16}
                  className={
                    activeTab === "picar" ? "text-orange-500" : "text-stone-600"
                  }
                />
                Solo Picoteo
              </button>
              <button
                onClick={() => handleTabChange("adicionales")}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-xs md:text-sm font-bold transition-all duration-300 whitespace-nowrap text-orange-400 hover:text-orange-300 hover:bg-stone-900/40 border border-orange-500/20"
              >
                <Sparkles size={16} className="text-orange-400 animate-pulse" />
                Adicionales
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {loadingPlans ? (
              <div className="col-span-1 md:col-span-2 py-20 flex justify-center flex-col items-center animate-pulse text-stone-500">
                <Utensils size={32} className="mb-4 text-stone-700" />
                <p className="text-xs font-bold uppercase tracking-widest">Cargando catálogo...</p>
              </div>
            ) : filteredPlans.map((plan) => {
              const isSelected = selectedPlan?.id === plan.id;
              const isMenuOpen = showFullMenuId === plan.id;
              const theme = plan.colorTheme;
              const highlightItems =
                plan.fullMenu?.carnes || plan.fullMenu?.picoteo || [];

              return (
                <div
                  key={plan.id}
                  id={`plan-card-${plan.id}`}
                  onClick={() => handlePlanClick(plan)}
                  className={`
                    relative rounded-2xl border-2 transition-all duration-300 cursor-pointer overflow-hidden group select-none flex flex-col
                    ${
                      isSelected
                        ? `${theme.border} bg-stone-900/80 shadow-[0_0_30px_rgba(0,0,0,0.3)] scale-[1.02] z-10`
                        : "border-stone-800/50 bg-stone-950/50 hover:border-stone-700 hover:bg-stone-900/80 opacity-95 hover:opacity-100"
                    }
                  `}
                >
                  <div className="h-36 w-full relative overflow-hidden shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent z-10" />
                    <img
                      src={PLAN_IMAGES[plan.id]}
                      alt={plan.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />

                    <div className="absolute bottom-3 left-4 z-20 flex flex-col items-start drop-shadow-lg">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-sm md:text-base font-black text-white bg-orange-600/95 px-2.5 py-1 rounded-lg backdrop-blur-md border border-orange-400/40 shadow-lg flex items-center gap-1">
                          ${plan.pricePerPerson?.toLocaleString("es-CL")}{" "}
                          <span className="text-[10px] font-medium opacity-90">p/p</span>
                        </span>
                      </div>
                      {plan.totalWeight && (
                        <span className="text-[10px] font-bold text-orange-200 bg-black/60 px-2 py-0.5 rounded border border-orange-500/30 backdrop-blur-sm mt-1 flex items-center gap-1">
                          🥩 {plan.totalWeight}
                        </span>
                      )}
                    </div>

                    {plan.recommended && (
                      <div className="absolute top-3 right-3 z-20 bg-gradient-to-r from-orange-600 to-red-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1 uppercase tracking-wider">
                        <Star size={10} fill="currentColor" /> Top
                      </div>
                    )}
                  </div>

                  <div className="p-5 pt-4 flex flex-col flex-grow relative">
                    <div className="flex justify-between items-start mb-3">
                      <h3
                        className={`text-xl font-bold leading-tight ${isSelected ? "text-white" : "text-stone-200"}`}
                      >
                        {plan.name}
                      </h3>
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all ${isSelected ? `bg-gradient-to-r ${theme.gradient} text-white shadow-lg scale-110` : "bg-stone-800 text-stone-600 border border-stone-700"}`}
                      >
                        {isSelected && <Check size={16} strokeWidth={3} />}
                      </div>
                    </div>

                    {highlightItems.length > 0 && (
                      <div className="mb-4 bg-stone-900/40 p-2.5 rounded-lg border border-stone-800/50">
                        <p
                          className={`text-[10px] font-bold uppercase tracking-wider mb-0.5 ${isSelected ? "text-orange-400" : "text-stone-500"}`}
                        >
                          {activeTab === "full"
                            ? "Cortes Estrella:"
                            : "Incluye:"}
                        </p>
                        <p className="text-stone-300 text-xs leading-snug line-clamp-2">
                          {highlightItems.slice(0, 4).join(" • ")}
                          {highlightItems.length > 4 ? "..." : ""}
                        </p>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2 mb-4">
                      {plan.features.map((feat, i) => (
                        <span
                          key={i}
                          className={`inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-lg border ${isSelected ? `${theme.bg} ${theme.border} ${theme.text}` : "bg-stone-900 border-stone-800 text-stone-400"}`}
                        >
                          <Flame
                            size={10}
                            fill="currentColor"
                            className="opacity-70"
                          />{" "}
                          {feat}
                        </span>
                      ))}
                    </div>

                    <div className="flex-grow"></div>

                    <button
                      onClick={(e) => toggleMenuDetails(e, plan.id)}
                      className={`w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all mt-2 ${isMenuOpen ? `bg-stone-800 text-white border border-stone-700` : `bg-stone-950/50 text-stone-400 border border-stone-800/50 hover:bg-stone-900 hover:text-stone-300`}`}
                    >
                      <ListFilter size={14} />{" "}
                      {isMenuOpen
                        ? "Ocultar Menú Técnico"
                        : "Ver Menú Completo"}
                    </button>

                    <div
                      className={`overflow-hidden transition-[max-height, opacity] duration-300 ease-in-out ${isMenuOpen ? "max-h-[800px] opacity-100 mt-3" : "max-h-0 opacity-0"}`}
                    >
                      <div className="bg-stone-950/80 rounded-xl p-3 text-xs border border-stone-800/80 space-y-3 shadow-inner">
                        {plan.fullMenu.carnes && (
                          <div>
                            <span className="block text-stone-500 font-bold uppercase text-[9px] mb-0.5">
                              Carnes
                            </span>
                            <span className="text-stone-300 leading-relaxed">
                              {plan.fullMenu.carnes.join(", ")}.
                            </span>
                          </div>
                        )}
                        {plan.fullMenu.picoteo && (
                          <div>
                            <span className="block text-stone-500 font-bold uppercase text-[9px] mb-0.5">
                              Picoteo Inicial
                            </span>
                            <span className="text-stone-300 leading-relaxed">
                              {plan.fullMenu.picoteo.join(", ")}.
                            </span>
                          </div>
                        )}
                        {plan.fullMenu.ensaladas && (
                          <div>
                            <span className="block text-stone-500 font-bold uppercase text-[9px] mb-0.5">
                              Acompañamientos
                            </span>
                            <span className="text-stone-300 leading-relaxed">
                              {plan.fullMenu.ensaladas.join(", ")}.
                            </span>
                          </div>
                        )}
                        {plan.fullMenu.cocktail && (
                          <div>
                            <span className="block text-stone-500 font-bold uppercase text-[9px] mb-0.5">
                              Bebestibles
                            </span>
                            <span className="text-stone-300 leading-relaxed">
                              {plan.fullMenu.cocktail}.
                            </span>
                          </div>
                        )}
                        {!plan.fullMenu.ensaladas && activeTab === "picar" && (
                          <div className="text-stone-500 italic bg-stone-900/50 p-2 rounded border border-stone-800/50 flex gap-2 items-center">
                            <Info size={12} /> Formato solo carnes, sin
                            ensaladas ni verduras.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* BANNER DE ACCESO DIRECTO A ADICIONALES */}
          <div
            onClick={scrollToExtras}
            className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-orange-950/40 via-stone-900/80 to-amber-950/40 border border-orange-500/30 hover:border-orange-500/60 cursor-pointer transition-all flex items-center justify-between group shadow-lg"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-orange-600/20 text-orange-400 group-hover:scale-110 transition-transform">
                <Sparkles size={20} />
              </div>
              <div>
                <p className="text-stone-200 font-bold text-sm">
                  ¿Quieres agregar Mobiliario, Postres o Cordero al Palo?
                </p>
                <p className="text-stone-400 text-xs mt-0.5">
                  Personaliza tu evento antes de continuar con la cotización.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-orange-400 font-bold text-xs group-hover:translate-x-1 transition-transform shrink-0">
              Ver Adicionales <ChevronRight size={16} />
            </div>
          </div>

          {/* SECCIÓN DE ADICIONALES (MOBILE FIRST) */}
          <div
            id="seccion-adicionales"
            className={`mt-8 mb-6 space-y-4 rounded-3xl p-4 transition-all duration-500 ${
              highlightExtras
                ? "bg-orange-950/20 ring-2 ring-orange-500 shadow-[0_0_35px_rgba(249,115,22,0.3)]"
                : "bg-transparent"
            }`}
          >
            {highlightExtras && (
              <div className="bg-gradient-to-r from-orange-600 to-amber-600 text-white p-3 rounded-xl flex items-center justify-between gap-3 text-xs font-bold shadow-lg animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center gap-2">
                  <Sparkles size={18} className="animate-spin" />
                  <span>Personaliza tu experiencia con nuestros opcionales antes de continuar</span>
                </div>
              </div>
            )}

            <div className="flex items-center gap-2 border-b border-stone-800 pb-3">
              <Plus className="w-5 h-5 text-orange-500" />
              <h3 className="font-bold text-lg text-white uppercase tracking-wider">
                Personaliza tu Evento (Adicionales)
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {/* MOBILIARIO */}
              <div
                onClick={() => setWantsMobiliario(!wantsMobiliario)}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer group flex flex-col md:flex-row items-center justify-between gap-4 ${
                  wantsMobiliario
                    ? "border-orange-500 bg-orange-900/10 shadow-[0_0_20px_rgba(249,115,22,0.15)]"
                    : "border-stone-800 bg-stone-950/60 hover:border-stone-700"
                }`}
              >
                <div className="flex items-center gap-3.5 flex-1">
                  <div
                    className={`p-3 rounded-xl shrink-0 transition-colors ${
                      wantsMobiliario
                        ? "bg-orange-600 text-white shadow-lg"
                        : "bg-stone-800 text-stone-400"
                    }`}
                  >
                    <Armchair size={22} />
                  </div>
                  <div>
                    <h4 className="font-bold text-base text-white flex items-center gap-2">
                      {ADDONS_DATA.mobiliario.label}
                      {wantsMobiliario && (
                        <span className="text-[9px] bg-orange-600 px-2 py-0.5 rounded-full text-white">
                          AGREGADO
                        </span>
                      )}
                    </h4>
                    <p className="text-stone-400 text-xs mt-0.5 leading-relaxed">
                      {ADDONS_DATA.mobiliario.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto shrink-0 border-t border-stone-900 md:border-none pt-3 md:pt-0">
                  <span className="font-bold text-orange-400 text-sm">
                    +$10.000 p/p
                  </span>
                  <button
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                      wantsMobiliario
                        ? "bg-orange-600 text-white hover:bg-red-600"
                        : "bg-stone-800 text-stone-200 hover:bg-stone-700"
                    }`}
                  >
                    {wantsMobiliario ? (
                      <>
                        <Check size={14} /> Quitar
                      </>
                    ) : (
                      <>
                        <Plus size={14} /> Agregar
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* POSTRES */}
              <div
                onClick={() => setWantsPostres(!wantsPostres)}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer group flex flex-col gap-3 ${
                  wantsPostres
                    ? "border-orange-500 bg-orange-900/10 shadow-[0_0_20px_rgba(249,115,22,0.15)]"
                    : "border-stone-800 bg-stone-950/60 hover:border-stone-700"
                }`}
              >
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 w-full">
                  <div className="flex items-center gap-3.5 flex-1">
                    <div
                      className={`p-3 rounded-xl shrink-0 transition-colors ${
                        wantsPostres
                          ? "bg-orange-600 text-white shadow-lg"
                          : "bg-stone-800 text-stone-400"
                      }`}
                    >
                      <Cake size={22} />
                    </div>
                    <div>
                      <h4 className="font-bold text-base text-white flex items-center gap-2">
                        {ADDONS_DATA.postres.label}
                        {wantsPostres && (
                          <span className="text-[9px] bg-orange-600 px-2 py-0.5 rounded-full text-white font-semibold">
                            AGREGADO ({postreOption === "pina" ? "Piña" : "Frutillas"})
                          </span>
                        )}
                      </h4>
                      <p className="text-stone-400 text-xs mt-0.5 leading-relaxed">
                        {ADDONS_DATA.postres.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto shrink-0 border-t border-stone-900 md:border-none pt-3 md:pt-0">
                    <span className="font-bold text-orange-400 text-sm">
                      +$3.500 p/p
                    </span>
                    <button
                      className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                        wantsPostres
                          ? "bg-orange-600 text-white hover:bg-red-600"
                          : "bg-stone-800 text-stone-200 hover:bg-stone-700"
                      }`}
                    >
                      {wantsPostres ? (
                        <>
                          <Check size={14} /> Quitar
                        </>
                      ) : (
                        <>
                          <Plus size={14} /> Agregar
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {wantsPostres && (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="pt-3 border-t border-stone-800/80 w-full animate-in fade-in slide-in-from-top-1"
                  >
                    <p className="text-xs font-bold text-orange-400 mb-2 flex items-center gap-1.5">
                      <Cake size={14} /> Elige la variedad de tu postre:
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setPostreOption("pina");
                        }}
                        className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border flex items-center justify-center gap-1.5 ${
                          postreOption === "pina"
                            ? "bg-orange-600 text-white border-orange-400 shadow-md shadow-orange-900/30"
                            : "bg-stone-900/90 text-stone-300 border-stone-800 hover:border-stone-700"
                        }`}
                      >
                        🍍 Piña a la Parrilla
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setPostreOption("frutilla");
                        }}
                        className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border flex items-center justify-center gap-1.5 ${
                          postreOption === "frutilla"
                            ? "bg-orange-600 text-white border-orange-400 shadow-md shadow-orange-900/30"
                            : "bg-stone-900/90 text-stone-300 border-stone-800 hover:border-stone-700"
                        }`}
                      >
                        🍓 Frutillas c/ Crema
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* CORDERO AL PALO */}
              <div
                onClick={handleToggleCordero}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer group flex flex-col md:flex-row items-center justify-between gap-4 ${
                  wantsCordero
                    ? "border-orange-500 bg-orange-900/10 shadow-[0_0_20px_rgba(249,115,22,0.15)]"
                    : "border-stone-800 bg-stone-950/60 hover:border-stone-700"
                }`}
              >
                <div className="flex items-center gap-3.5 flex-1">
                  <div
                    className={`p-3 rounded-xl shrink-0 transition-colors ${
                      wantsCordero
                        ? "bg-orange-600 text-white shadow-lg"
                        : "bg-stone-800 text-stone-400"
                    }`}
                  >
                    <Flame size={22} fill={wantsCordero ? "currentColor" : "none"} />
                  </div>
                  <div>
                    <h4 className="font-bold text-base text-white flex items-center gap-2">
                      {CORDERO_DATA.label}
                      {wantsCordero && (
                        <span className="text-[9px] bg-orange-600 px-2 py-0.5 rounded-full text-white">
                          AGREGADO
                        </span>
                      )}
                    </h4>
                    <p className="text-stone-400 text-xs mt-0.5 leading-relaxed">
                      {CORDERO_DATA.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto shrink-0 border-t border-stone-900 md:border-none pt-3 md:pt-0">
                  <span className="font-bold text-orange-400 text-sm">
                    +$200.000 Fijo
                  </span>
                  <button
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                      wantsCordero
                        ? "bg-orange-600 text-white hover:bg-red-600"
                        : "bg-stone-800 text-stone-200 hover:bg-stone-700"
                    }`}
                  >
                    {wantsCordero ? (
                      <>
                        <Check size={14} /> Quitar
                      </>
                    ) : (
                      <>
                        <Plus size={14} /> Agregar
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* BOTÓN DE CONFIRMACIÓN AL FINAL DE ADICIONALES */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 bg-stone-900/60 p-4 rounded-2xl border border-stone-800">
              <div className="text-stone-400 text-xs flex items-center gap-2">
                <Check size={16} className="text-green-500 shrink-0" />
                <span>¿Listo con tus adicionales? Avancemos a la fecha y lugar del evento.</span>
              </div>
              <button
                onClick={() => handleNext(true)}
                className="w-full sm:w-auto bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-orange-900/30 active:scale-[0.98] transition-all text-sm shrink-0"
              >
                Continuar a Fecha y Ubicación <ArrowRight size={18} />
              </button>
            </div>
          </div>

          <TrustBar />
          <FAQ />
        </div>

        {/* COLUMNA DERECHA: RESUMEN (DESKTOP) */}
        <div className="hidden lg:block w-1/3 relative min-h-[600px]">
          <div className="sticky top-24 space-y-4">
            <div className="bg-stone-900/80 backdrop-blur-xl rounded-2xl border border-stone-800 p-6 shadow-2xl relative overflow-hidden">
              <div className="flex items-center gap-2 mb-6 border-b border-stone-800/60 pb-4 relative z-10">
                <ShoppingCart size={18} className="text-orange-500" />
                <h3 className="text-stone-300 text-sm font-bold uppercase tracking-widest">
                  Resumen de tu Evento
                </h3>
              </div>

              {selectedPlan ? (
                <div className="space-y-4 animate-in slide-in-from-right-2 relative z-10">
                  <div className="bg-stone-950/50 p-4 rounded-xl border border-stone-800/50 flex justify-between items-start">
                    <div>
                      <p className="text-white font-bold text-xl leading-tight">
                        {selectedPlan.name}
                      </p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded font-medium border ${selectedPlan.colorTheme.bg} ${selectedPlan.colorTheme.border} ${selectedPlan.colorTheme.text}`}
                        >
                          Nivel {selectedPlan.priceLabel}
                        </span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-orange-400 font-extrabold text-base leading-none">
                        ${selectedPlan.pricePerPerson?.toLocaleString("es-CL")}
                      </p>
                      <p className="text-stone-400 text-[10px] font-medium mt-0.5">
                        por persona
                      </p>
                    </div>
                  </div>

                  <div
                    className={`p-3 rounded-xl border transition-all ${wantsCordero ? "bg-orange-900/20 border-orange-500/50" : "bg-stone-950/50 border-stone-800 border-dashed"}`}
                  >
                    <div className="flex justify-between items-center gap-2">
                      <div className="flex gap-3 items-center">
                        <div
                          className={`p-1.5 rounded-full ${wantsCordero ? "bg-orange-600 text-white" : "bg-stone-800 text-stone-500"}`}
                        >
                          <Flame
                            size={16}
                            fill={wantsCordero ? "currentColor" : "none"}
                          />
                        </div>
                        <div>
                          <p
                            className={`text-sm font-bold ${wantsCordero ? "text-orange-300" : "text-stone-300"}`}
                          >
                            {CORDERO_DATA.label}
                          </p>
                          <p className="text-[10px] text-stone-400 font-mono">
                            +${CORDERO_DATA.price.toLocaleString("es-CL")}{" "}
                            (Único)
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={handleToggleCordero}
                        className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all flex items-center gap-1 ${wantsCordero ? "bg-red-500/20 text-red-400 hover:bg-red-500/30" : "bg-stone-800 text-stone-300 hover:bg-stone-700"}`}
                      >
                        {wantsCordero ? (
                          <>
                            <Check size={12} /> Quitar
                          </>
                        ) : (
                          <>
                            <Plus size={12} /> Agregar
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start px-2 py-1 opacity-80 pt-2">
                    <Info className="w-4 h-4 text-stone-500 mt-0.5 shrink-0" />
                    <p className="text-xs text-stone-400 leading-snug">
                      Este es el precio base. El total final se calculará en el
                      siguiente paso.
                    </p>
                  </div>

                  {/* EVENTO GA4: CONFIRMACIÓN Y AVANCE */}
                  <button
                    onClick={() => handleNext(false)}
                    className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-between group transition-all shadow-lg shadow-orange-900/30 hover:shadow-orange-900/50 active:scale-[0.99] relative overflow-hidden"
                  >
                    <span className="relative z-10 flex flex-col items-start">
                      <span>
                        {!hasReviewedExtras && !wantsCordero && !wantsMobiliario && !wantsPostres
                          ? "Ver Extras y Continuar"
                          : "Continuar"}
                      </span>
                      <span className="text-[10px] font-normal opacity-80">
                        {!hasReviewedExtras && !wantsCordero && !wantsMobiliario && !wantsPostres
                          ? "Revisar adicionales opcionales"
                          : "Siguiente paso"}
                      </span>
                    </span>
                    <div className="bg-white/20 p-2 rounded-full group-hover:translate-x-1 transition-transform relative z-10">
                      {!hasReviewedExtras && !wantsCordero && !wantsMobiliario && !wantsPostres ? (
                        <Sparkles size={20} className="text-white animate-pulse" />
                      ) : (
                        <ArrowRight size={20} className="text-white" />
                      )}
                    </div>
                  </button>
                </div>
              ) : (
                <div className="text-center py-16 opacity-50 flex flex-col items-center justify-center border-2 border-dashed border-stone-800 rounded-xl">
                  <div className="w-16 h-16 bg-stone-800/50 rounded-full flex items-center justify-center mb-4 shadow-inner">
                    <Utensils className="w-8 h-8 text-stone-600" />
                  </div>
                  <p className="text-stone-300 font-bold">
                    Tu carrito está vacío
                  </p>
                  <p className="text-stone-500 text-sm mt-1 max-w-[180px]">
                    Selecciona una experiencia a la izquierda para comenzar.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-stone-950/95 backdrop-blur-xl border-t border-stone-900/80 z-50 shadow-[0_-10px_30px_rgba(0,0,0,0.8)] safe-area-pb p-3 flex flex-col animate-in slide-in-from-bottom-full">
        {selectedPlan ? (
          <div className="flex items-center justify-between gap-3">
            <div className="flex flex-col pl-1 overflow-hidden">
              <p className="text-stone-400 text-[9px] font-bold uppercase tracking-wider mb-0.5">
                Seleccionado:
              </p>
              <p className="text-white font-bold text-sm truncate">
                {selectedPlan.name}
              </p>
              <p className="text-orange-400 font-extrabold text-xs leading-tight mt-0.5">
                ${selectedPlan.pricePerPerson?.toLocaleString("es-CL")} <span className="text-[9px] font-normal text-stone-400">p/p</span>
              </p>
            </div>

            <button
              onClick={() => handleNext(false)}
              className="bg-gradient-to-r from-orange-600 to-orange-500 text-white px-5 py-3 rounded-xl font-bold flex items-center justify-center gap-1.5 shadow-lg shadow-orange-900/30 active:scale-[0.97] transition-transform shrink-0 text-sm"
            >
              {!hasReviewedExtras && !wantsCordero && !wantsMobiliario && !wantsPostres ? (
                <>
                  Ver Extras <Sparkles size={16} className="animate-pulse" />
                </>
              ) : (
                <>
                  Siguiente <ChevronRight size={16} />
                </>
              )}
            </button>
          </div>
        ) : (
          <div className="bg-stone-900/50 border border-stone-800/50 rounded-xl p-3 text-center text-stone-500 text-sm flex items-center justify-center gap-2 opacity-80">
            <ArrowRight size={16} className="animate-pulse" />
            Selecciona un plan arriba para continuar
          </div>
        )}
      </div>
    </div>
  );
}
