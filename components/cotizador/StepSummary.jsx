"use client";

import { useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

import {
  MessageCircle,
  CheckCircle,
  ChevronLeft,
  MapPin,
  Calendar,
  Flame,
  Truck,
  Plus,
  FileText,
  UtensilsCrossed,
  HelpCircle,
  Send,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { CONTACT_INFO, CORDERO_DATA } from "@/lib/plans";
import { trackCotizacion } from "@/lib/utils";

export default function StepSummary({
  date,
  guests,
  selectedLocation,
  selectedPlan,
  wantsCordero,
  wantsMobiliario,
  wantsPostres,
  postreOption = "pina",
  wantsCoffeeBreak = false,
  coffeeBreakOption = "kuchen",
  onBack,
}) {
  const [userDoubt, setUserDoubt] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const numGuests = parseInt(guests, 10) || 0;
  const planTotal = numGuests * (selectedPlan?.pricePerPerson || 0);
  const corderoTotal = wantsCordero ? CORDERO_DATA.price : 0;
  const mobiliarioTotal = wantsMobiliario ? numGuests * 10000 : 0;
  const postresTotal = wantsPostres ? numGuests * 3500 : 0;
  const coffeeBreakTotal = wantsCoffeeBreak ? numGuests * 7500 : 0;
  const transportTotal = selectedLocation?.price || 0;
  const grandTotal = planTotal + corderoTotal + mobiliarioTotal + postresTotal + coffeeBreakTotal + transportTotal;

  const formattedDate = date ? format(date, "EEEE d 'de' MMMM", { locale: es }) : "";
  const locationName = selectedLocation?.commune || "Ubicación por definir";
  const zoneName = selectedLocation?.zoneName || "Zona por definir";
  const isCustomTransport = selectedLocation?.price === 0;
  const transportText = "Traslado: A cotizar según ubicación";
  const totalLabel = isCustomTransport ? "TOTAL (Sin traslado)" : "TOTAL WEB";
  const cleanPhone = CONTACT_INFO.phone.replace(/[^0-9]/g, "");


  const printStyles = `
    @page { size: auto; margin: 0mm; }
    @media print {
      html, body { height: auto !important; min-height: 0 !important; margin: 0 !important; padding: 0 !important; overflow: hidden !important; background-color: white !important; }
      nav, footer, .fixed, button, .no-print, .safe-area-bottom { display: none !important; }
      body * { visibility: hidden; }
      #printable-area { visibility: visible !important; position: absolute !important; left: 0 !important; top: 0 !important; width: 100% !important; margin: 0 !important; padding: 40px !important; background: white !important; border: none !important; box-shadow: none !important; z-index: 9999; }
      #printable-area * { visibility: visible !important; }
      .text-stone-100, .text-stone-200, .text-stone-300, .text-white { color: black !important; }
      .text-stone-400, .text-stone-500, .text-stone-600 { color: #333 !important; }
      .text-orange-400, .text-orange-500 { color: black !important; font-weight: 800 !important; }
      .bg-stone-900, .bg-stone-800, .bg-stone-950, .bg-stone-900\\/50 { background-color: transparent !important; border: none !important; }
      .border-stone-800, .border-stone-700 { border: 1px solid #ddd !important; }
    }
  `;

  const generateWhatsAppLink = () => {
    if (!date || !selectedPlan) return "#";
    const extrasList = [];
    if (wantsCoffeeBreak) {
      const sweetLabel = coffeeBreakOption === "kuchen" ? "Kuchen Nuez" : "Pie Limón";
      extrasList.push(`☕ Coffee Break / Desayuno (${sweetLabel}): $${coffeeBreakTotal.toLocaleString("es-CL")} ($7.500 p/p)`);
    }
    if (wantsMobiliario) {
      extrasList.push(`🪑 Mobiliario Completo: $${mobiliarioTotal.toLocaleString("es-CL")} ($10.000 p/p)`);
    }
    if (wantsPostres) {
      const dessertFlavor = postreOption === "pina" ? "Piña a la Parrilla c/ Helado" : "Frutillas c/ Crema";
      extrasList.push(`🍰 Postres (${dessertFlavor}): $${postresTotal.toLocaleString("es-CL")} ($3.500 p/p)`);
    }
    if (wantsCordero) {
      extrasList.push(`🐑 ${CORDERO_DATA.label}: $${corderoTotal.toLocaleString("es-CL")}`);
    }

    const extrasText = extrasList.length > 0 ? `\n✨ Adicionales:\n${extrasList.map(e => `- ${e}`).join("\n")}` : "";
    const transportLine = transportTotal > 0
      ? `🚚 Traslado (${locationName}): $${transportTotal.toLocaleString("es-CL")}`
      : `🚚 Traslado: A cotizar según dirección exacta`;

    const message = `Hola Socios del Fuego 🔥. Me gustaría cotizar un evento con ustedes. Aquí dejo los detalles:\n\n` +
      `📅 Fecha: ${formattedDate}\n` +
      `👥 Invitados: ${numGuests} personas\n` +
      `📍 Lugar: ${locationName} (${zoneName})\n` +
      `🍖 Plan Seleccionado: ${selectedPlan.name} ($${planTotal.toLocaleString("es-CL")})\n` +
      `${extrasText}\n` +
      `${transportLine}\n\n` +
      `💰 TOTAL ESTIMADO: $${grandTotal.toLocaleString("es-CL")}\n\n` +
      `Quedo atento a su confirmación. ¡Gracias!`;
    return `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(message)}`;
  };

  const generateDoubtLink = () => {
    if (!userDoubt.trim()) return "#";
    const message = `Hola Socios del Fuego. Estoy viendo la experiencia *${selectedPlan.name}* y tengo una duda:\n\n"${userDoubt}"\n\n--- Contexto ---\n📅 ${formattedDate}\n👥 ${numGuests} personas\n📍 ${locationName}`;
    return `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-8 duration-500 pb-40 md:pb-10 relative">
      <style>{printStyles}</style>

      {/* HEADER WEB */}
      <div className="flex flex-col items-center gap-3 mb-8 text-center no-print">
        <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/30">
          <CheckCircle className="w-8 h-8 text-green-500" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-stone-100">
            Presupuesto Final
          </h2>
          <p className="text-stone-400 text-sm">Tu parrilla está casi lista.</p>
        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* === COLUMNA TOTALES === */}
        <div className="space-y-4 no-print order-1 md:order-2">
          <div className="bg-stone-900/50 rounded-2xl border border-stone-800 p-8 text-center space-y-4 shadow-xl">
            <p className="text-xs text-stone-500 font-bold uppercase tracking-widest">
              Total Estimado Servicio
            </p>
            <div className="flex flex-col items-center justify-center text-white">
              <span className="text-4xl font-extrabold text-orange-400">
                ${grandTotal.toLocaleString("es-CL")}
              </span>
              <span className="text-xs text-stone-400 mt-1.5 font-medium">
                {numGuests} invitados • Incluye insumos y servicio completo
              </span>
            </div>
            {selectedLocation?.price === 0 && (
              <p className="text-[10px] text-stone-500 mt-[-10px]">
                * Traslado por confirmar según ubicación exacta.
              </p>
            )}

            {/* === PROPUESTA DE VALOR / REFUERZO CRO === */}
            <div className="bg-stone-950/60 p-4 rounded-xl border border-stone-800/60 mt-4 text-left space-y-2 animate-in fade-in slide-in-from-bottom-2">
              <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest mb-3 text-center">Nos encargamos de todo:</p>
              <div className="flex items-start gap-2">
                <CheckCircle size={14} className="text-green-500 shrink-0 mt-0.5" />
                <p className="text-xs text-stone-300"><strong>100% Liberación de estrés</strong> (servimos y limpiamos)</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle size={14} className="text-green-500 shrink-0 mt-0.5" />
                <p className="text-xs text-stone-300"><strong>Cortes Premium garantizados</strong> en su punto perfecto</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle size={14} className="text-green-500 shrink-0 mt-0.5" />
                <p className="text-xs text-stone-300">Atención personalizada y exclusiva a tus invitados</p>
              </div>
            </div>

            <div className="bg-stone-800/30 border border-stone-700/50 p-3 rounded-lg flex items-center justify-center gap-2 text-center mt-4">
              <p className="text-xs text-stone-400 leading-tight">
                El abono se coordina una vez confirmados los detalles por WhatsApp.
              </p>
            </div>
          </div>

          {/* EVENTO GA4: DUDA POR WHATSAPP (LEAD) */}
          <div className="bg-stone-900/30 border border-stone-800 p-4 rounded-xl space-y-3">
            <div className="flex items-center gap-2 text-stone-400">
              <HelpCircle size={16} />
              <span className="text-sm font-medium">
                ¿Tienes alguna pregunta?
              </span>
            </div>
            <textarea
              value={userDoubt}
              onChange={(e) => setUserDoubt(e.target.value)}
              placeholder="Ej: ¿Se puede cambiar el tipo de ensalada?"
              className="w-full bg-stone-950 border border-stone-800 rounded-lg p-3 text-sm text-white placeholder:text-stone-600 focus:outline-none focus:border-stone-600 resize-none"
              rows={2}
            />
            <a
              href={generateDoubtLink()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                if (!userDoubt.trim()) {
                  e.preventDefault();
                  return;
                }
                trackCotizacion("generate_lead", {
                  lead_source: "whatsapp_doubt",
                  value: grandTotal,
                  currency: "CLP",
                });
              }}
              className={`w-full py-3 rounded-lg flex items-center justify-center gap-2 text-sm font-bold transition-all ${userDoubt.trim()
                  ? "bg-stone-100 text-stone-900 hover:bg-white"
                  : "bg-stone-800 text-stone-500"
                }`}
            >
              <Send size={16} /> Resolver duda por WhatsApp
            </a>
          </div>
          <p className="hidden md:block text-[10px] text-center text-stone-600">
            Soporte: {CONTACT_INFO.email}
          </p>
        </div>

        {/* === TICKET === */}
        <div
          id="printable-area"
          className="bg-stone-900 rounded-2xl border border-stone-800 overflow-hidden relative text-left shadow-2xl order-2 md:order-1"
        >
          <div className="p-6 space-y-5">
            <div className="hidden print:block text-center mb-8 border-b border-gray-300 pb-4">
              <h1 className="text-3xl font-bold text-black uppercase tracking-wider">
                Socios del Fuego
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Experiencias Parrilleras de Alta Gama
              </p>
              <p className="text-xs text-gray-500 mt-2">
                {CONTACT_INFO.email} | {CONTACT_INFO.phone}
              </p>
            </div>
            <h3 className="text-xs font-bold text-stone-500 uppercase tracking-widest border-b border-stone-800 pb-2 mb-4">
              Resumen del Evento
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-stone-500" />
                <div>
                  <p className="text-[10px] text-stone-500 font-bold uppercase">
                    Fecha
                  </p>
                  <p className="text-sm text-white capitalize">
                    {date
                      ? format(date, "EEE d 'de' MMM, yyyy", { locale: es })
                      : "---"}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-stone-500 font-bold uppercase">
                  Invitados
                </p>
                <p className="text-lg text-white font-bold">{numGuests}</p>
              </div>
              <div className="flex items-center gap-3 col-span-2">
                <MapPin className="w-5 h-5 text-stone-500" />
                <div>
                  <p className="text-[10px] text-stone-500 font-bold uppercase">
                    Ubicación
                  </p>
                  <p className="text-sm text-white font-medium">
                    {selectedLocation?.commune || "---"}{" "}
                    <span className="text-stone-500 font-normal">
                      ({selectedLocation?.zoneName})
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-800/50 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <Flame className="w-4 h-4 text-orange-500 mt-1" />
                  <div>
                    <p className="text-sm text-stone-300 font-medium">
                      {selectedPlan?.name} (${selectedPlan?.pricePerPerson?.toLocaleString("es-CL")} p/p)
                    </p>
                    <p className="text-[10px] text-stone-500 mt-0.5">
                      {numGuests} pers. x ${selectedPlan?.pricePerPerson?.toLocaleString("es-CL")}
                    </p>
                  </div>
                </div>
                <span className="text-sm text-stone-200 font-mono font-bold">
                  ${planTotal.toLocaleString("es-CL")}
                </span>
              </div>
              {wantsCoffeeBreak && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Plus className="w-4 h-4 text-amber-500" />
                    <span className="text-sm text-stone-300">
                      Coffee Break / Desayuno ({coffeeBreakOption === "kuchen" ? "Kuchen Nuez" : "Pie Limón"}) ($7.500 p/p)
                    </span>
                  </div>
                  <span className="text-sm text-stone-400 font-mono">
                    ${coffeeBreakTotal.toLocaleString("es-CL")}
                  </span>
                </div>
              )}
              {wantsMobiliario && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Plus className="w-4 h-4 text-orange-500" />
                    <span className="text-sm text-stone-300">
                      Mobiliario Completo ($10.000 p/p)
                    </span>
                  </div>
                  <span className="text-sm text-stone-400 font-mono">
                    ${mobiliarioTotal.toLocaleString("es-CL")}
                  </span>
                </div>
              )}
              {wantsPostres && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Plus className="w-4 h-4 text-orange-500" />
                    <span className="text-sm text-stone-300">
                      Postres ({postreOption === "pina" ? "Piña a la Parrilla" : "Frutillas c/ Crema"}) ($3.500 p/p)
                    </span>
                  </div>
                  <span className="text-sm text-stone-400 font-mono">
                    ${postresTotal.toLocaleString("es-CL")}
                  </span>
                </div>
              )}
              {wantsCordero && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Plus className="w-4 h-4 text-orange-500" />
                    <span className="text-sm text-stone-300">
                      {CORDERO_DATA.label}
                    </span>
                  </div>
                  <span className="text-sm text-stone-400 font-mono">
                    ${corderoTotal.toLocaleString("es-CL")}
                  </span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Truck className="w-4 h-4 text-stone-500" />
                  <span className="text-sm text-stone-300">
                    Traslado ({selectedLocation?.commune || "Ubicación"})
                  </span>
                </div>
                <span className="text-sm text-stone-200 font-mono font-bold">
                  {transportTotal > 0 ? `$${transportTotal.toLocaleString("es-CL")}` : "A cotizar"}
                </span>
              </div>
            </div>

            {selectedPlan?.fullMenu && (
              <div className="mt-6 pt-6 border-t border-stone-800/50 print:border-gray-300">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="w-full flex items-center justify-between gap-2 mb-2 p-2 -ml-2 rounded-lg hover:bg-stone-800/50 transition-colors no-print group"
                >
                  <div className="flex items-center gap-2">
                    <UtensilsCrossed
                      size={16}
                      className="text-stone-500 group-hover:text-orange-500 transition-colors"
                    />
                    <h4 className="text-xs font-bold text-stone-500 group-hover:text-stone-300 uppercase tracking-widest transition-colors">
                      Menú Incluido ({selectedPlan.name})
                    </h4>
                  </div>
                  {isMenuOpen ? (
                    <ChevronUp size={16} className="text-stone-500" />
                  ) : (
                    <ChevronDown size={16} className="text-stone-500" />
                  )}
                </button>

                <div className="hidden print:flex items-center gap-2 mb-3">
                  <UtensilsCrossed size={16} className="text-stone-500" />
                  <h4 className="text-xs font-bold text-stone-500 uppercase tracking-widest">
                    Menú Incluido ({selectedPlan.name})
                  </h4>
                </div>

                <div
                  className={`space-y-4 pl-1 overflow-hidden transition-all duration-300 print:block ${isMenuOpen ? "block animate-in fade-in slide-in-from-top-2" : "hidden"}`}
                >
                  {selectedPlan.fullMenu.carnes && (
                    <div>
                      <p className="text-orange-400 font-bold text-[10px] uppercase mb-1">
                        Parrilla & Carnes
                      </p>
                      <p className="text-stone-300 text-sm leading-relaxed text-balance">
                        {selectedPlan.fullMenu.carnes.join(" • ")}
                      </p>
                    </div>
                  )}
                  {selectedPlan.fullMenu.picoteo && (
                    <div>
                      <p className="text-orange-400 font-bold text-[10px] uppercase mb-1">
                        Aperitivo & Picoteo
                      </p>
                      <p className="text-stone-300 text-sm leading-relaxed text-balance">
                        {selectedPlan.fullMenu.picoteo.join(" • ")}
                      </p>
                    </div>
                  )}
                  {selectedPlan.fullMenu.ensaladas && (
                    <div>
                      <p className="text-orange-400 font-bold text-[10px] uppercase mb-1">
                        Acompañamientos
                      </p>
                      <p className="text-stone-300 text-sm leading-relaxed text-balance">
                        {selectedPlan.fullMenu.ensaladas.join(" • ")}
                      </p>
                    </div>
                  )}
                  {selectedPlan.fullMenu.cocktail && (
                    <div>
                      <p className="text-orange-400 font-bold text-[10px] uppercase mb-1">
                        Barra / Líquidos
                      </p>
                      <p className="text-stone-300 text-sm leading-relaxed">
                        {selectedPlan.fullMenu.cocktail}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="hidden print:block pt-6 border-t border-black mt-6">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-black text-xl">
                  VALOR TOTAL
                </span>
                <span className="font-bold text-black text-2xl">
                  ${grandTotal.toLocaleString("es-CL")}
                </span>
              </div>
              {selectedLocation?.price === 0 && (
                <p className="text-xs text-gray-500 text-right">
                  * Traslado por convenir según dirección exacta.
                </p>
              )}
              <div className="mt-8 pt-4 border-t border-dashed border-gray-400 text-center">
                <p className="text-xs text-gray-500">
                  Cotización válida por 5 días hábiles.
                </p>
              </div>
            </div>
          </div>
        </div>
        <p className="md:hidden text-[10px] text-center text-stone-600 order-3 w-full pb-4">
          Soporte: {CONTACT_INFO.email}
        </p>
      </div>

      {/* === STICKY FOOTER BOTÓN FINAL === */}
      <div className="fixed bottom-0 left-0 w-full bg-stone-900/90 backdrop-blur-md border-t border-stone-800 p-4 z-50 no-print safe-area-bottom">
        <div className="max-w-5xl mx-auto flex items-center gap-3">
          <button
            onClick={onBack}
            className="h-14 w-14 flex items-center justify-center rounded-2xl bg-stone-800 text-stone-400 hover:text-white hover:bg-stone-700 transition-all border border-stone-700"
          >
            <ChevronLeft size={24} />
          </button>

          <a
            href={generateWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              // 1. GA4 y Meta Pixel unificado: EVENTO PURCHASE
              const uniqueTransactionId = `COT-${new Date().getTime()}`;
              const purchaseItems = [
                {
                  item_id: selectedPlan?.id,
                  item_name: selectedPlan?.name,
                  item_category: selectedPlan?.category === "al_plato" ? "Carne al Plato" : selectedPlan?.category === "picar" ? "Solo Picoteo" : "Servicio Buffet",
                  price: selectedPlan?.pricePerPerson,
                  quantity: numGuests,
                },
                wantsCoffeeBreak && {
                  item_id: "coffeebreak-extra",
                  item_name: `Coffee Break / Desayuno (${coffeeBreakOption === "kuchen" ? "Kuchen Nuez" : "Pie Limón"})`,
                  item_category: "Adicionales",
                  price: 7500,
                  quantity: numGuests,
                },
                wantsMobiliario && {
                  item_id: "mobiliario-extra",
                  item_name: "Mobiliario Completo",
                  item_category: "Adicionales",
                  price: 10000,
                  quantity: numGuests,
                },
                wantsPostres && {
                  item_id: "postres-extra",
                  item_name: `Postres (${postreOption === "pina" ? "Piña a la Parrilla" : "Frutillas c/ Crema"})`,
                  item_category: "Adicionales",
                  price: 3500,
                  quantity: numGuests,
                },
                wantsCordero && {
                  item_id: "cordero-extra",
                  item_name: CORDERO_DATA.label,
                  item_category: "Adicionales",
                  price: CORDERO_DATA.price,
                  quantity: 1,
                },
              ].filter(Boolean);

              trackCotizacion("purchase", {
                transaction_id: uniqueTransactionId,
                value: grandTotal,
                currency: "CLP",
                tax: 0,
                shipping: transportTotal,
                items: purchaseItems,
              });
            }}
            className="flex-1 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold h-14 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg active:scale-[0.98] animate-in slide-in-from-bottom-5"
          >
            <MessageCircle className="w-6 h-6" />
            <span className="text-lg">Solicitar por WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
