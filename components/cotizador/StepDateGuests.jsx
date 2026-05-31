"use client";

import { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import { format } from "date-fns";
import {
  Users,
  MapPin,
  ChevronRight,
  Lock,
  ChevronLeft,
  AlertCircle,
  X,
  ZoomIn,
  ZoomOut,
  Flame,
} from "lucide-react";
import { TRANSPORT_ZONES } from "@/lib/plans";
import { trackCotizacion } from "@/lib/utils";
import "react-datepicker/dist/react-datepicker.css";

registerLocale("es", es);

export default function StepDateGuests({
  date,
  setDate,
  guests,
  setGuests,
  selectedLocation,
  setSelectedLocation,
  bookedDates,
  toggleDateLock,
  isAdmin,
  onNext,
  onBack,
}) {
  const [activeZoneIndex, setActiveZoneIndex] = useState(() => {
    if (selectedLocation?.zoneName) {
      const idx = TRANSPORT_ZONES.findIndex(
        (z) => z.name === selectedLocation.zoneName,
      );
      return idx >= 0 ? idx : "";
    }
    return "";
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  const guestsNum = parseInt(guests, 10) || 0;
  const isGuestsValid = guestsNum >= 5;

  const handleDateChange = (selectedDate) => {
    if (isAdmin) {
      const dateStr = format(selectedDate, "yyyy-MM-dd");
      toggleDateLock(dateStr);
      return;
    }
    setDate(selectedDate);
  };

  const isDateSelectable = (date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    if (isAdmin) return true;
    return !bookedDates.includes(dateStr);
  };

  const getDayClass = (date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    if (bookedDates.includes(dateStr)) {
      return isAdmin
        ? "bg-red-900 text-red-200 hover:bg-red-800 cursor-pointer font-bold"
        : "bg-stone-800 text-stone-600 cursor-not-allowed line-through";
    }
    return "hover:bg-orange-600 hover:text-white transition-colors rounded-full font-medium";
  };

  const handleZoneChange = (e) => {
    const idx = e.target.value;
    setActiveZoneIndex(idx);
    setSelectedLocation(null);
  };

  const handleCommuneChange = (e) => {
    const communeName = e.target.value;
    if (activeZoneIndex === "") return;
    const zone = TRANSPORT_ZONES[activeZoneIndex];
    setSelectedLocation({
      zoneName: zone.name,
      commune: communeName,
      price: zone.price,
    });
  };

  const handleGuestsBlur = () => {
    if (guests !== "" && guestsNum < 5) {
      setGuests(5);
    }
  };

  const handleZoom = (increment, e) => {
    e.stopPropagation();
    setZoomLevel((prev) => {
      const newZoom = prev + increment;
      return Math.min(Math.max(newZoom, 1), 3);
    });
  };

  const closeLightbox = (e) => {
    if (e) e.stopPropagation();
    setSelectedImage(null);
    setTimeout(() => setZoomLevel(1), 300);
  };

  const galleryImages = [
    "/galeria/parrilla1.jpeg",
    "/galeria/parrilla2.jpeg",
    "/galeria/parrilla3.jpeg",
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-32 md:pb-0 w-full">
      {/* HEADER */}
      <div className="mb-6 md:mb-8 text-center md:text-left px-2">
        <h2 className="text-3xl font-bold text-stone-100 leading-tight">
          ¿Cuándo encendemos <span className="text-orange-500">el fuego</span>?
        </h2>
        <p className="text-stone-400 mt-2 text-sm">
          Selecciona fecha y ubicación para ver disponibilidad.
        </p>

        {isAdmin && (
          <div className="mt-2 inline-flex text-xs bg-red-900/30 text-red-400 border border-red-900 p-2 rounded items-center gap-2">
            <Lock size={12} /> MODO ADMIN ACTIVO
          </div>
        )}
      </div>

      {/* GRID LAYOUT */}
      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* COLUMNA IZQUIERDA: CALENDARIO */}
        <div className="space-y-2 w-full flex flex-col items-center md:block">
          <div className="p-1 md:p-6 bg-stone-900/50 rounded-2xl border border-stone-800 flex justify-center shadow-lg w-full mx-auto overflow-hidden">
            <style>{`
                  .react-datepicker { font-family: inherit; background-color: transparent; border: none; display: flex; justify-content: center; }
                  .react-datepicker__month-container { float: none; width: 100%; }
                  .react-datepicker__header { background-color: transparent; border-bottom: none; padding-top: 0; }
                  .react-datepicker__current-month { color: #f5f5f4; font-weight: 700; margin-bottom: 10px; font-size: 1rem; }
                  .react-datepicker__day-name { color: #78716c; width: 1.7rem; margin: 0.1rem; font-size: 0.8rem; }
                  .react-datepicker__day { color: #d6d3d1; width: 1.7rem; line-height: 1.7rem; margin: 0.1rem; font-size: 0.9rem; }
                  .react-datepicker__day--selected { background-color: #ea580c !important; color: white !important; border-radius: 50%; }
                  .react-datepicker__day--keyboard-selected { background-color: transparent; }
                  .react-datepicker__navigation-icon::before { border-color: #78716c; }
                  .react-datepicker__day--disabled { color: #44403c; }
                  @media (min-width: 768px) {
                    .react-datepicker__day-name, .react-datepicker__day { width: 2.5rem; line-height: 2.5rem; margin: 0.1rem; font-size: 1rem; }
                    .react-datepicker__current-month { font-size: 1.1rem; }
                  }
               `}</style>

            <DatePicker
              key={bookedDates.join("-")}
              selected={date}
              onChange={handleDateChange}
              inline
              locale="es"
              minDate={new Date()}
              filterDate={isDateSelectable}
              dayClassName={getDayClass}
              calendarClassName="text-stone-200"
            />
          </div>
          <p className="text-center text-xs text-stone-500 mt-2">
            * Fechas tachadas no disponibles.
          </p>
        </div>

        {/* COLUMNA DERECHA: FORMULARIO */}
        <div className="space-y-6 bg-stone-900/30 p-3 md:p-6 rounded-2xl border border-stone-800/50 w-full relative overflow-hidden">
          <div className="space-y-2">
            <label className="text-stone-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
              <Users className="w-4 h-4 text-orange-500" /> N° de Comensales
            </label>
            <div className="flex items-center gap-2 group w-full">
              <button
                type="button"
                onClick={() => {
                  const currentParams = parseInt(guests, 10) || 0;
                  if (currentParams > 5) setGuests((currentParams - 1).toString());
                }}
                disabled={guestsNum <= 5}
                className="h-12 w-12 md:h-14 md:w-14 shrink-0 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 flex items-center justify-center hover:bg-stone-800 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <span className="text-xl md:text-2xl font-bold leading-none">-</span>
              </button>
              <input
                type="number"
                min="5"
                placeholder="Min. 5"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                onBlur={handleGuestsBlur}
                className={`flex-1 min-w-0 h-12 md:h-14 bg-stone-950 border rounded-xl px-2 md:px-4 text-xl md:text-2xl font-bold text-center text-white focus:outline-none focus:ring-2 placeholder:text-stone-700 transition-all 
                    ${!isGuestsValid && guests !== "" ? "border-red-900 focus:ring-red-500" : "border-stone-800 focus:ring-orange-500 group-hover:border-stone-700"}
                `}
              />
              <button
                type="button"
                onClick={() => {
                  const currentParams = parseInt(guests, 10) || 5;
                  setGuests((currentParams + 1).toString());
                }}
                className="h-12 w-12 md:h-14 md:w-14 shrink-0 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 flex items-center justify-center hover:bg-stone-800 hover:text-white transition-colors"
              >
                <span className="text-xl md:text-2xl font-bold leading-none">+</span>
              </button>
            </div>
            {!isGuestsValid && guests !== "" && (
              <p className="text-red-400 text-xs text-center font-bold flex items-center justify-center gap-1 animate-in slide-in-from-top-1">
                <AlertCircle size={12} /> El mínimo es de 5 personas
              </p>
            )}
          </div>

          <div className="space-y-3">
            <label className="text-stone-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
              <MapPin className="w-4 h-4 text-orange-500" /> Ubicación del Evento
            </label>

            <div className="relative w-full">
              <select
                value={selectedLocation ? JSON.stringify(selectedLocation) : ""}
                onChange={(e) => {
                  if (e.target.value === "") {
                    setSelectedLocation(null);
                  } else {
                    setSelectedLocation(JSON.parse(e.target.value));
                  }
                }}
                className="w-full bg-stone-950 border border-stone-800 rounded-xl p-3 md:p-4 text-sm md:text-base text-white appearance-none focus:outline-none focus:border-orange-500 transition-colors cursor-pointer"
              >
                <option value="">Selecciona tu Sector/Comuna...</option>
                {TRANSPORT_ZONES.map((zone, idx) => (
                  <optgroup key={idx} label={`${zone.name} ($${zone.price.toLocaleString("es-CL")})`}>
                    {zone.communes.map((com, i) => (
                      <option
                        key={`${idx}-${i}`}
                        value={JSON.stringify({
                          zoneName: zone.name,
                          commune: com,
                          price: zone.price,
                        })}
                      >
                        {com}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-stone-500">
                <ChevronRight className="rotate-90 w-4 h-4" />
              </div>
            </div>
            {/* --- URGENCY BANNER --- */}
            {date && (() => {
              const dayDiff = Math.ceil((date.getTime() - new Date().getTime()) / (1000 * 3600 * 24));
              if (dayDiff > 0 && dayDiff <= 14) {
                return (
                  <div className="mt-3 bg-red-900/20 border border-red-900/50 p-3 rounded-lg flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                    <Flame size={18} className="text-red-500 shrink-0 animate-pulse" />
                    <p className="text-xs text-red-200">
                      <strong>🔥 Alta demanda:</strong> Esta fecha está cerca. ¡Reserva pronto para asegurar tu experiencia!
                    </p>
                  </div>
                );
              }
              return null;
            })()}
          </div>

          {/* GALERÍA */}
          <div className="py-2 border-t border-stone-800/50 pt-4">
            <div className="grid grid-cols-3 gap-2">
              {galleryImages.map((src, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-xl overflow-hidden border border-stone-800 relative group shadow-lg cursor-pointer hover:border-orange-500/50 transition-colors"
                  onClick={() => setSelectedImage(src)}
                >
                  <img
                    src={src}
                    alt={`Experiencia ${i}`}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-6 h-6" />
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center text-[10px] text-stone-500 mt-2 uppercase tracking-widest font-bold">
              Vive la experiencia real (Toca para ampliar)
            </p>
          </div>

          {/* BARRA DE NAVEGACIÓN */}
          <div
            className="
            fixed bottom-0 left-0 right-0 p-4 bg-stone-950/90 backdrop-blur-md border-t border-stone-900 z-40 flex gap-3 
            md:relative md:bg-transparent md:border-none md:p-0 md:mt-4 md:z-0
          "
          >
            <button
              onClick={onBack}
              className="px-6 py-3 rounded-xl font-bold text-stone-400 bg-stone-900 border border-stone-800 hover:text-white transition-all hover:bg-stone-800"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              disabled={!date || !isGuestsValid || !selectedLocation?.commune}
              onClick={() => {
                // EVENTO GA4: Registro de datos logísticos antes de pasar al resumen
                trackCotizacion("add_shipping_info", {
                  shipping_tier: selectedLocation?.zoneName,
                  value: selectedLocation?.price,
                  currency: "CLP",
                  event_date: format(date, "yyyy-MM-dd"),
                  guest_count: guestsNum,
                  commune: selectedLocation?.commune,
                });

                // Continuar al siguiente paso
                onNext();
              }}
              className="flex-1 bg-stone-100 hover:bg-white disabled:bg-stone-800 disabled:text-stone-600 text-stone-950 font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg active:scale-[0.98] group"
            >
              Ver Resumen Final
              <ChevronRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>
        </div>
      </div>

      {/* MODAL / LIGHTBOX DE IMAGEN (CON ZOOM) */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-2 md:p-4 animate-in fade-in duration-200"
          onClick={closeLightbox}
        >
          <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden">
            {/* Panel de Controles Flotante */}
            <div
              className="absolute top-4 right-4 md:top-8 md:right-8 z-50 flex items-center gap-1 bg-stone-900/80 p-2 rounded-2xl border border-stone-700 backdrop-blur-md shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={(e) => handleZoom(-0.5, e)}
                disabled={zoomLevel <= 1}
                className="p-2 text-stone-300 hover:text-white hover:bg-stone-800 rounded-xl disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                title="Alejar"
              >
                <ZoomOut size={22} />
              </button>

              <div className="px-2 text-stone-400 text-xs font-bold w-12 text-center">
                {Math.round(zoomLevel * 100)}%
              </div>

              <button
                onClick={(e) => handleZoom(0.5, e)}
                disabled={zoomLevel >= 3}
                className="p-2 text-stone-300 hover:text-white hover:bg-stone-800 rounded-xl disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                title="Acercar"
              >
                <ZoomIn size={22} />
              </button>

              <div className="w-px h-6 bg-stone-700 mx-1"></div>

              <button
                onClick={closeLightbox}
                className="p-2 text-red-400 hover:text-red-300 hover:bg-red-950 rounded-xl transition-all"
                title="Cerrar"
              >
                <X size={22} />
              </button>
            </div>

            {/* Imagen Ampliada */}
            <div
              className={`w-full h-full flex items-center justify-center transition-all ${zoomLevel > 1 ? "overflow-auto" : "overflow-hidden"}`}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage}
                alt="Detalle de la experiencia"
                style={{ transform: `scale(${zoomLevel})` }}
                className="rounded-xl max-w-[90vw] max-h-[85vh] object-contain transition-transform duration-300 origin-center shadow-2xl"
                onDoubleClick={(e) => handleZoom(zoomLevel === 1 ? 1 : -1, e)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
