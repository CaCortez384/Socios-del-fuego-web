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

// 1. DEFINIMOS LA ESTRUCTURA EXACTA DEL EVENTO (Adiós al 'any')
export interface AnalyticsEventPayload {
  value?: number;
  currency?: string;
  items?: Array<{
    item_id: string;
    item_name: string;
    price: number;
  }>;
  lead_source?: string;
  checkout_origin?: string;
  // Comodín seguro: Permite otras propiedades de GA4 pero exige verificación antes de usarlas
  [key: string]: unknown; 
}

/**
 * Motor de Analítica Unificado (GA4 + Meta Pixel)
 */
export const trackCotizacion = (eventName: string, payload: AnalyticsEventPayload = {}) => {
  if (typeof window === "undefined") return;

  // 1. GA4
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, payload);
  } else {
    console.warn("GA4 no está cargado o fue bloqueado por el navegador.");
  }

  // 2. Meta Pixel
  if (typeof window.fbq === "function") {
    let fbEvent = "Lead";
    let fbPayload: Record<string, unknown> = {};

    if (eventName === "begin_checkout") {
      fbEvent = "InitiateCheckout";
      fbPayload = {
        content_name: payload.items?.[0]?.item_name || "Plan de Asado",
        // TypeScript ahora sabe que 'item' tiene la propiedad 'item_id' gracias a la interfaz
        content_ids: payload.items?.map((item) => item.item_id) || [],
        content_type: "product",
        value: payload.value,
        currency: payload.currency || "CLP",
      };
    } 
    else if (eventName === "generate_lead") {
      fbEvent = "Lead";
      fbPayload = {
        content_name: "Intención de Cotización",
        content_category: payload.lead_source || "general",
      };
    }

    window.fbq("track", fbEvent, fbPayload);
  } else {
    console.warn("Meta Pixel no está cargado o fue bloqueado por el navegador.");
  }
  
  if (process.env.NODE_ENV !== "production") {
    console.log(`🔥 Evento disparado: [${eventName}]`, payload);
  }
};