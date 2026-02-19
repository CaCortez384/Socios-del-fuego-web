import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Declaración global para evitar que TypeScript llore con los objetos de tracking
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export const trackCotizacion = (ubicacion: string) => {
  // Guardia de seguridad: si no estamos en el navegador, no hacemos nada.
  if (typeof window === "undefined") return;

  // 1. Enviar a Google Analytics 4 (Para tu análisis)
  if (typeof window.gtag === "function") {
    window.gtag("event", "click_cotizar", {
      event_category: "conversion",
      event_label: ubicacion,
      value: 1, 
    });
  } else {
    console.warn("GA4 no está cargado o fue bloqueado.");
  }

  // 2. Enviar a Meta Pixel (El motor para optimizar tus anuncios de asados)
  if (typeof window.fbq === "function") {
    // Usamos el evento estándar 'Lead' para entrenar al algoritmo
    window.fbq("track", "Lead", {
      content_name: "Clic en Cotizar",
      content_category: ubicacion,
    });
  } else {
    console.warn("Meta Pixel no está cargado o fue bloqueado.");
  }
  
  // Opcional para desarrollo
  console.log(`🔥 Intención de cotización registrada desde: ${ubicacion}`);
};