"use client";

import { ShieldCheck, Users, Clock } from "lucide-react";

export default function TrustBar() {
  const features = [
    {
      icon: <Users className="w-6 h-6 text-orange-500" />,
      title: "Parrilleros Expertos",
      desc: "La experiencia habla por sí misma. Sabemos manejar el fuego."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-orange-500" />,
      title: "Calidad Premium",
      desc: "Solo cortes seleccionados. Nada de sorpresas."
    },
    {
      icon: <Clock className="w-6 h-6 text-orange-500" />,
      title: "Servicio Todo Incluido",
      desc: "Llevamos parrilla, carbón y la experiencia. Tú solo disfruta."
    }
  ];

  return (
    <div className="py-10 mt-4 border-t border-stone-800/50">
      <div className="text-center mb-8">
        <p className="text-stone-500 text-xs font-bold uppercase tracking-widest">
          La Diferencia Socios del Fuego
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {features.map((feature, idx) => (
          <div 
            key={idx} 
            className="bg-stone-900/40 border border-stone-800 p-5 rounded-xl flex flex-col items-center text-center gap-3 hover:bg-stone-900/60 transition-colors"
          >
            <div className="p-3 bg-orange-500/10 rounded-full mb-1">
                {feature.icon}
            </div>
            <div>
                <h4 className="text-stone-200 font-bold text-sm">{feature.title}</h4>
                <p className="text-stone-500 text-xs mt-1 leading-relaxed text-balance">
                    {feature.desc}
                </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
