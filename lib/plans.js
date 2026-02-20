// src/constants/plans.js

export const PLANS = [
  // --- AL PLATO (FULL) ---
  {
    id: "criollo",
    category: "full",
    name: "Fuego Criollo",
    pricePerPerson: 20000,
    priceLevel: 1,
    priceLabel: "$",
    totalWeight: "600g Carnes",
    colorTheme: {
      border: "border-orange-700",
      bg: "bg-orange-900/20",
      text: "text-orange-200",
      shadow: "shadow-orange-900/20",
      gradient: "from-orange-800 to-stone-900",
    },
    features: [
      "Lomo Liso / Vetado (200g)",
      "Costillar de Cerdo (200g)",
      "Muslos de Pollo (200g)",
      "Pimientos y Zapallitos asados",
    ],
    fullMenu: {
      carnes: [
        "Lomo Liso o Vetado (200g)",
        "Costillar marinado (200g)",
        "Truto de Pollo al limón (200g)"
      ],
      cocktail: null,
      picoteo: null, // CORREGIDO: Aquí no hay picoteo
      ensaladas: [
        // CORREGIDO: Zapallitos y Pimientos son acompañamiento aquí
        "Pimientos rellenos con huevo/queso", 
        "Zapallitos italianos asados"
      ],
      servicio: "Servicio completo con 2 parrilleros, insumos y parrillas.",
    },
  },
  {
    id: "total",
    category: "full",
    name: "Fuego Total",
    pricePerPerson: 25000,
    priceLevel: 2,
    priceLabel: "$$",
    totalWeight: "800g Carnes",
    colorTheme: {
      border: "border-red-600",
      bg: "bg-red-900/20",
      text: "text-red-200",
      shadow: "shadow-red-900/30",
      gradient: "from-red-700 to-stone-900",
    },
    features: [
      "Todo lo anterior + Punta de Ganso",
      "800g de carne al plato p/p",
      "Tabla: Malaya y Zapallitos",
      "Costillar salsa de la casa",
    ],
    fullMenu: {
      carnes: [
        "Lomo Liso/Vetado (200g)",
        "Punta de Ganso (200g)",
        "Costillar salsa casera (200g)",
        "Truto de Pollo marinado (200g)",
      ],
      picoteo: [
        "Malaya de Cerdo",
        "Zapallitos Asados" // Aquí sí son picoteo
      ],
      ensaladas: [
        "Pimientos con huevo/queso",
        "Champiñones con queso fundido"
      ],
      servicio:
        "2 Maestros Parrilleros, insumos, parrillas y tabla de bienvenida.",
    },
  },
  {
    id: "premium",
    category: "full",
    name: "Fuego Premium",
    pricePerPerson: 30000,
    priceLevel: 3,
    priceLabel: "$$$",
    recommended: true,
    totalWeight: "800g + Entradas",
    colorTheme: {
      border: "border-sky-700",
      bg: "bg-sky-900/20",
      text: "text-sky-200",
      shadow: "shadow-sky-900/20",
      gradient: "from-sky-800 to-stone-900",
    },
    features: [
      "4 Cortes de Fondo (200g c/u)",
      "Entrada: Malaya y Longanizas",
      "Buffet de Ensaladas Completo",
      "Pebre Cuchareado",
    ],
    fullMenu: {
      carnes: [
        "Lomo Vetado/Liso (200g)",
        "Punta de Ganso/Picana (200g)",
        "Costillar salsa casera (200g)",
        "Pollo (200g)",
      ],
      cocktail: null, 
      picoteo: [
        "Malaya de Cerdo",
        "Longanizas artesanales",
        "Zapallitos asados" // Aquí son picoteo
      ],
      ensaladas: [
        "Pimientos rellenos",
        "Champiñones (queso crema/tocino)",
        "Choclo Mayo",
        "Ensalada Mixta",
        "Papas Mayo Caseras",
        "Fuentes de Pebre",
      ],
      servicio: "Servicio completo de 2 parrilleros e insumos.",
    },
  },
  {
    id: "extra_premium",
    category: "full",
    name: "Fuego Extra Premium",
    pricePerPerson: 40000,
    priceLevel: 5,
    priceLabel: "$$$$",
    totalWeight: "800g + Entradas",
    colorTheme: {
      border: "border-yellow-600",
      bg: "bg-yellow-900/20",
      text: "text-yellow-200",
      shadow: "shadow-yellow-900/30",
      gradient: "from-yellow-700 to-stone-900",
    },
    features: [
      "FILETE PREMIUM (200g)",
      "4 Cortes de Lujo + Entradas",
      "Buffet Completo + Verduras",
      "Experiencia Definitiva",
    ],
    fullMenu: {
      carnes: [
        "Filete Premium (200g)",
        "Lomo Vetado (200g)",
        "Punta de Ganso (200g)",
        "Punta Picana (200g)",
      ],
      cocktail: null,
      picoteo: [
        "Malaya de Cerdo",
        "Longanizas artesanales",
        "Zapallitos finas hierbas" // Aquí son picoteo
      ],
      ensaladas: [
        "Pimientos rellenos",
        "Champiñones Full",
        "Choclo Mayo",
        "Ensalada Mixta",
        "Papas Mayo Caseras",
        "Fuentes de Pebre",
      ],
      servicio:
        "Equilibrio perfecto entre calidad y lujo. 2 parrilleros profesionales y montaje.",
    },
  },

  // --- SOLO PICOTEO (PICAR) ---
  {
    id: "premium_picar",
    category: "picar",
    name: "Premium (Solo Picoteo)",
    pricePerPerson: 26000,
    priceLevel: 2,
    priceLabel: "$$+",
    totalWeight: "800g + Entradas",
    colorTheme: {
      border: "border-sky-700",
      bg: "bg-sky-900/10",
      text: "text-sky-200",
      shadow: "shadow-sky-900/10",
      gradient: "from-sky-900/50 to-stone-900",
    },
    features: [
      "FORMATO SOLO CARNES",
      "4 Cortes Premium (200g c/u)",
      "Incluye Malaya y Longanizas",
      "Sin Ensaladas ni Verduras",
    ],
    fullMenu: {
      carnes: [
        "Lomo Vetado/Liso (200g)",
        "Punta de Ganso/Picana (200g)",
        "Costillar salsa casera (200g)",
        "Trutos de Ala (200g)",
      ],
      cocktail: null,
      picoteo: [
        "Aperitivo: Malaya de Cerdo",
        "Aperitivo: Longanizas artesanales"
      ],
      ensaladas: null,
      servicio: "Formato ideal para picar de pie. Solo carne.",
    },
  },
  {
    id: "extra_premium_picar",
    category: "picar",
    name: "Extra Premium (Solo Picoteo)",
    pricePerPerson: 36000,
    priceLevel: 4,
    priceLabel: "$$$+",
    totalWeight: "800g + Entradas",
    colorTheme: {
      border: "border-yellow-600",
      bg: "bg-yellow-900/10",
      text: "text-yellow-200",
      shadow: "shadow-yellow-900/10",
      gradient: "from-yellow-900/50 to-stone-900",
    },
    features: [
      "FORMATO LUJO SOLO CARNES",
      "Incluye Filete Premium (200g)",
      "5 Cortes + Embutidos",
      "Sin Ensaladas ni Verduras",
    ],
    fullMenu: {
      carnes: [
        "Filete Premium (200g)",
        "Lomo Vetado (200g)",
        "Punta de Ganso (200g)",
        "Punta Picana (200g)",
      ],
      cocktail: null,
      picoteo: [
        "Aperitivo: Malaya de Cerdo",
        "Aperitivo: Longanizas artesanales"
      ],
      ensaladas: null,
      servicio: "Experiencia de carnes de lujo en formato picoteo.",
    },
  },
];

export const CORDERO_DATA = {
  price: 200000,
  label: "Cordero al Palo",
  description: "Preparación tradicional magallánica al asador vertical.",
};

export const CONTACT_INFO = {
  instagram: "@sociosdelfuego",
  phone: "+56 9 8164 1528",
  email: "sociosdelfuego@gmail.com",
};

export const TRANSPORT_ZONES = [
  {
    name: "Melipilla y Alrededores (Provincia)",
    price: 40000,
    communes: ["Melipilla Centro", "Pomaire", "Bollenar", "Codigua", "María Pinto", "Peñaflor", "Talagante", "El Monte", "Isla de Maipo", "Padre Hurtado", "Otro sector en esta zona"],
  },
  {
    name: "Gran Santiago (Desde Maipú/Cerrillos)",
    price: 50000,
    communes: ["Maipú", "Cerrillos", "Estación Central", "Pudahuel", "Lo Prado", "Santiago Centro", "Providencia", "Las Condes", "Vitacura", "Lo Barnechea", "Ñuñoa", "La Reina", "Peñalolén", "La Florida", "Macul", "San Joaquín", "San Miguel", "La Cisterna", "Puente Alto", "San Bernardo", "Quilicura", "Huechuraba", "Conchalí", "Recoleta", "Independencia", "Otro sector en esta zona"],
  },
  {
    name: "Litoral Central / San Antonio",
    price: 50000,
    communes: ["San Antonio", "Santo Domingo", "Cartagena", "El Tabo", "El Quisco", "Algarrobo", "El Totoral", "Otro sector en esta zona"],
  },
  {
    name: "V Región (Valparaíso/Viña)",
    price: 60000,
    communes: ["Viña del Mar", "Valparaíso", "Concón", "Reñaca", "Quilpué", "Villa Alemana", "Casablanca", "Otro sector en esta zona"],
  },
  {
    name: "VI Región (Rancagua)",
    price: 60000,
    communes: ["Rancagua", "Machalí", "Graneros", "San Francisco de Mostazal", "Otro sector en esta zona"],
  },
];