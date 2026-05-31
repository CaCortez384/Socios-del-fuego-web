"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const FAQ_DATA = [
  {
    q: "¿En qué consiste el servicio de Socios del Fuego?",
    a: "Somos un servicio parrillero premium a domicilio. Entregamos servicio de buffet, carne al plato o formato de solo picoteo en tablas. Nosotros ponemos 2 parrilleros expertos, las carnes, las verduras, el equipamiento (parrillas/espiedos) y el servicio directo a tu mesa."
  },
  {
    q: "¿Llegan a todas las ciudades?",
    a: "Llegamos a la mayoría de las comunas dentro de la Región Metropolitana, V y VI Región. Si tu evento es en otro lugar que no está listado en nuestro cotizador web, puedes consultarnos por WhatsApp sin problemas para evaluar factibilidad."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="mt-12 mb-8 bg-stone-900/30 rounded-2xl border border-stone-800/50 p-6">
      <div className="flex items-center gap-2 mb-6">
        <HelpCircle className="text-stone-500" size={20} />
        <h3 className="text-lg font-bold text-stone-200">Preguntas Frecuentes</h3>
      </div>
      
      <div className="space-y-3">
        {FAQ_DATA.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={index} className="border border-stone-800/60 rounded-xl overflow-hidden bg-stone-950/50 transition-colors hover:border-stone-700">
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full flex items-center justify-between p-4 text-left"
              >
                <span className={`text-sm font-medium ${isOpen ? 'text-orange-400' : 'text-stone-300'}`}>
                  {faq.q}
                </span>
                <ChevronDown 
                  size={16} 
                  className={`text-stone-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
                />
              </button>
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <p className="p-4 pt-0 text-xs text-stone-400 leading-relaxed border-t border-stone-800/30">
                  {faq.a}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
