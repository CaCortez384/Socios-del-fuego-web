import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
import fs from 'fs';

// 1. Re-declare PLANS directly here to avoid module import issues in raw node
const PLANS = [
  {
    id: "criollo",
    category: "full",
    name: "Fuego Criollo",
    pricePerPerson: 23000,
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
      picoteo: null,
      ensaladas: [
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
    pricePerPerson: 28000,
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
        "Zapallitos Asados"
      ],
      ensaladas: [
        "Pimientos con huevo/queso",
        "Champiñones rellenos"
      ],
      servicio:
        "2 Maestros Parrilleros, insumos, parrillas y tabla de bienvenida.",
    },
  },
  {
    id: "premium",
    category: "full",
    name: "Fuego Premium",
    pricePerPerson: 33000,
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
      "FILETE PREMIUM (200g)",
      "Buffet Americano (Ensaladas)",
    ],
    fullMenu: {
      carnes: [
        "Lomo Liso/Vetado (200g)",
        "Punta de Ganso (200g)",
        "FILETE PREMIUM (200g)",
        "Costillar salsa BBQ o Casera (200g)",
      ],
      picoteo: [
        "Malaya de Cerdo crujiente",
        "Longanizas y Chorizos Parrilleros",
        "Zapallitos Asados"
      ],
      ensaladas: [
        "Pimientos Asados con Muzzarella",
        "Champiñones rellenos de Queso crema",
        "Papas Fritas rústicas o Papas al Romero"
      ],
      servicio: "Equipo Premium: Chef Parrillero + Ayudante. Insumos premium, tablas de picoteo.",
    },
  },
  {
    id: "extra_premium",
    category: "full",
    name: "Extra Premium",
    pricePerPerson: 38000,
    priceLevel: 4,
    priceLabel: "$$$$",
    totalWeight: "Full Experience",
    colorTheme: {
      border: "border-yellow-600",
      bg: "bg-yellow-900/20",
      text: "text-yellow-200",
      shadow: "shadow-yellow-900/20",
      gradient: "from-yellow-700 to-stone-900",
    },
    features: [
      "5 Cortes de Fondo",
      "Entraña, Filete, Punta de Ganso",
      "Mariscos al pil-pil o Provos",
      "Servicio VIP y Montaje Lujo",
    ],
    fullMenu: {
      carnes: [
        "Entraña Premium",
        "Filete de Vacuno",
        "Punta de Ganso",
        "Lomo Vetado Angus",
        "Costillar de Cerdo"
      ],
      picoteo: [
        "Camarones al Pil-Pil en greda",
        "Provoletas con orégano y oliva",
        "Longanizas artesanales",
        "Malaya de Cerdo"
      ],
      ensaladas: [
        "Buffet Completo de Ensaladas a elección",
        "Papas Asadas al Plomo con crema ácida",
        "Verduras Asadas Premium"
      ],
      servicio: "Servicio Experiencia VIP. Todo incluido, parrillas de lujo, garzones disponibles.",
    },
  },
  // --- TIPO COCKTAIL ---
  {
    id: "cocktail_1",
    category: "cocktail",
    name: "Cóctel Parrillero",
    pricePerPerson: 25000,
    priceLevel: 1,
    priceLabel: "$",
    totalWeight: "Servicio Bandejeo",
    colorTheme: {
      border: "border-stone-500",
      bg: "bg-stone-800",
      text: "text-stone-200",
      shadow: "shadow-stone-900/50",
      gradient: "from-stone-700 to-stone-900",
    },
    features: [
      "Mini Empanadas de Queso/Pino",
      "Brochetas de Lomo y Pollo",
      "Mini Choripanes Gourmet",
      "Tablas de Quesos y Fiambres",
    ],
    fullMenu: {
      carnes: [
        "Brochetas de Lomo Liso con pimientos",
        "Brochetas de Pollo al Limón",
        "Mini Choripanes en pan artesanal"
      ],
      picoteo: [
        "Mini Empanadas fritas",
        "Tablas de Quesos variados",
        "Sopaipillas con Pebre casero"
      ],
      ensaladas: null,
      servicio: "Estilo Bandejeo. Garzones circulan sirviendo a los invitados.",
    },
  },
  {
    id: "cocktail_2",
    category: "cocktail",
    name: "Cóctel Premium",
    pricePerPerson: 35000,
    priceLevel: 2,
    priceLabel: "$$",
    recommended: true,
    totalWeight: "Experiencia Gourmet",
    colorTheme: {
      border: "border-stone-500",
      bg: "bg-stone-800",
      text: "text-stone-200",
      shadow: "shadow-stone-900/50",
      gradient: "from-stone-700 to-stone-900",
    },
    features: [
      "Brochetas de Entraña y Filete",
      "Camarones apanados / Ceviche",
      "Mini Hamburguesas Wagyu",
      "Barra de Tragos Nacionales (Pisco/Ron)",
    ],
    fullMenu: {
      carnes: [
        "Brochetas de Entraña",
        "Brochetas de Filete",
        "Mini Hamburguesas estilo Wagyu"
      ],
      picoteo: [
        "Ceviche en vasitos",
        "Camarones apanados en Panko",
        "Provoletas mini"
      ],
      ensaladas: null,
      cocktail: "Barra Abierta Básica: Pisco, Ron, Bebidas y Jugos (3 horas).",
      servicio: "Bandejeo Premium + Bartender + Garzones.",
    },
  },
];


const firebaseConfig = {
  apiKey: "AIzaSyC0r1-i6ixsMM5CKNZePP3_5tdWvIN08mA",
  authDomain: "socios-del-fuego.firebaseapp.com",
  projectId: "socios-del-fuego",
  storageBucket: "socios-del-fuego.firebasestorage.app",
  messagingSenderId: "944971952910",
  appId: "1:944971952910:web:037d5af070c86168595d5f"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function migratePlans() {
  console.log("Iniciando migracion de planes...");
  const plansCollection = collection(db, "plans");
  
  for (const plan of PLANS) {
    const docRef = doc(plansCollection, plan.id);
    await setDoc(docRef, plan);
    console.log(`Plan ${plan.id} migrado correctamente.`);
  }
  
  console.log("¡Todos los planes fueron migrados a Firestore!");
  process.exit(0);
}

migratePlans().catch(console.error);
