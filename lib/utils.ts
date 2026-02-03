import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// --- AGREGA ESTA FUNCIÓN NUEVA ---
// Add a typed declaration for window.gtag to avoid using `any`
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

export const trackCotizacion = (ubicacion: string) => {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    // Envia evento a Google Analytics 4
    window.gtag("event", "click_cotizar", {
      event_category: "conversion",
      event_label: ubicacion, // Ej: "hero", "navbar", "footer"
      value: 1, // Le damos valor 1 a cada intención de cotizar
    });
    
    // Opcional: También lo mandamos a la consola para que tú lo veas al probar
    console.log(`Evento enviado: Cotización desde ${ubicacion}`);
  }
};