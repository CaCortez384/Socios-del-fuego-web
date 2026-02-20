import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export const trackCotizacion = (ubicacion: string) => {
  // Guardia de seguridad para Next.js SSR
  if (typeof window === "undefined") return;

  // 1. Enviar a Google Analytics 4
  if (typeof window.gtag === "function") {
    // GA4 usa parámetros planos en lugar de Categoría/Etiqueta
    window.gtag("event", "iniciar_cotizacion", {
      ubicacion_boton: ubicacion, // De dónde hizo clic (navbar, hero, etc.)
    });
  } else {
    console.warn("GA4 no está cargado o fue bloqueado.");
  }

  // 2. Enviar a Meta Pixel (Instagram)
  if (typeof window.fbq === "function") {
    // CAMBIO CLAVE: Usamos "InitiateCheckout" en vez de "Lead"
    // Esto entrena a Instagram para buscar gente que INICIA el proceso,
    // reservando el evento "Lead" o "Purchase" para cuando terminen el cotizador.
    window.fbq("track", "InitiateCheckout", {
      content_name: "Inicia Cotizador",
      content_category: ubicacion,
    });
  } else {
    console.warn("Meta Pixel no está cargado o fue bloqueado.");
  }
  
  // Opcional para desarrollo
  console.log(`🔥 Intención de cotización registrada desde: ${ubicacion}`);
};