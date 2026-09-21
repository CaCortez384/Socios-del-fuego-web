"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Flame,
  CheckCircle2,
  MapPin,
  Instagram,
  Phone,
  ChefHat,
  Sparkles,
  Star,
  Users,
  Clock,
  ChevronDown,
  ArrowRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { trackCotizacion } from "@/lib/utils";
import LogoLink from "@/components/cotizador/LogoLink";
import { usePlans } from "@/hooks/usePlans";
import { PLANS as STATIC_PLANS, ADDONS_DATA } from "@/lib/plans";

const minPrice = Math.min(...STATIC_PLANS.filter((p) => p.active !== false).map((p) => p.pricePerPerson));
const formattedMinPrice = new Intl.NumberFormat("es-CL").format(minPrice);
const COTIZAR_URL = "/cotizar";

const GALLERY_IMAGES = [
  { src: "/galeria/parrilla1.jpeg", title: "Cortes Angus a Punto", desc: "Sellado perfecto y temperatura controlada" },
  { src: "/galeria/parrilla4.jpeg", title: "Tablas de Picoteo", desc: "Longanizas artesanales y malaya crujiente" },
  { src: "/galeria/parrilla3.jpeg", title: "Servicio en Vivo", desc: "Maestros parrilleros atendiendo en tu parcela" },
  { src: "/galeria/parrilla2.jpeg", title: "Parrillada al Fuego", desc: "Carbón de espino y leña seleccionada" },
  { src: "/galeria/preview.jpg", title: "Experiencia Completa", desc: "Montaje rústico para eventos de alta gama" },
];

const TESTIMONIALS = [
  {
    name: "Catalina & Tomás",
    event: "Matrimonio Campestre en Talagante",
    guests: "90 invitados",
    comment:
      "El cordero al palo fue el centro de atención absoluto de nuestra boda. La carne se deshacía sola y los maestros parrilleros fueron impecables en la atención. Cero preocupaciones durante la fiesta.",
    rating: 5,
  },
  {
    name: "Rodrigo Morales",
    event: "Kickoff Corporativo en Las Condes",
    guests: "65 colaboradores",
    comment:
      "Necesitábamos factura al día, puntualidad estricta y comida de nivel para nuestra gerencia. Socios del Fuego cumplió en todo con creces. El Lomo Vetado Angus estuvo memorable.",
    rating: 5,
  },
  {
    name: "Matías Vial",
    event: "Celebración 40 Años en Chicureo",
    guests: "45 invitados",
    comment:
      "La mejor decisión que tomé. Pude estar con mis amigos tomando un trago sin tocar las tenazas ni preocuparme del humo. Llegaron con todo su equipo y dejaron el quincho impecable.",
    rating: 5,
  },
];

const FAQS = [
  {
    q: "¿Qué incluye exactamente el servicio de Socios del Fuego?",
    a: "Llevamos todo lo necesario para el asado: maestros parrilleros dedicados, carbón vegetal de espino, carnes premium seleccionadas, guarniciones y ensaladas según tu plan. Si no tienes quincho o parrilla, nosotros llevamos nuestras parrillas móviles sin costo adicional.",
  },
  {
    q: "¿Con cuánta anticipación debo reservar mi fecha?",
    a: "Para fines de semana de temporada alta (septiembre a marzo), recomendamos reservar con 2 a 4 semanas de anticipación transfiriendo el 50% para congelar la fecha en agenda. Para días de semana o eventos corporativos, con 7 a 10 días suele ser suficiente.",
  },
  {
    q: "¿Emiten factura para eventos de empresa?",
    a: "Sí, emitimos Factura Electrónica exenta/afecta según requerimiento contable para empresas e instituciones en toda la Región Metropolitana, V y VI Región.",
  },
  {
    q: "¿Qué pasa si las condiciones climáticas o el lugar son complicados?",
    a: "Nos adaptamos tanto a jardines abiertos como a terrazas de departamentos amplios o parcelas rurales. Contamos con carpas parrilleras ignífugas si hubiera llovizna o viento moderado.",
  },
  {
    q: "¿Qué pasa si sobran carnes al terminar el evento?",
    a: "Toda la comida preparada o insumos sobrantes te quedan a ti debidamente porcionados y empacados antes de que nuestro equipo se retire.",
  },
];

export default function NuevaLandingPage() {
  const { plans: PLANS } = usePlans();
  const [activeCategory, setActiveCategory] = useState("full");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Estimador interactivo rápido
  const [guestCount, setGuestCount] = useState<number>(30);
  const estimatedTotal = guestCount * minPrice;

  return (
    <div className="min-h-screen bg-stone-950 font-sans text-stone-100 selection:bg-orange-500 selection:text-white">
      {/* 0. BANNER DE COMPARACIÓN DE DISEÑO */}
      <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 py-2 px-4 text-center text-xs md:text-sm font-semibold text-white shadow-md flex items-center justify-center gap-3">
        <span className="flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-yellow-300 animate-spin" style={{ animationDuration: "4s" }} />
          <span>Propuesta de Rediseño 2026</span>
        </span>
        <span className="hidden md:inline text-orange-200">|</span>
        <Link href="/" className="underline hover:text-stone-950 transition-colors bg-black/20 px-2.5 py-0.5 rounded-full">
          Ver diseño anterior
        </Link>
      </div>

      {/* 1. NAVBAR ELEGANTE */}
      <nav className="sticky top-0 z-50 w-full border-b border-stone-800/80 bg-stone-950/85 backdrop-blur-xl transition-all">
        <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-8">
          <LogoLink />

          <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-stone-300">
            <a href="#experiencias" className="hover:text-orange-400 transition-colors">Menús & Planes</a>
            <a href="#cordero" className="hover:text-orange-400 transition-colors flex items-center gap-1.5 text-orange-400 font-semibold">
              <Flame className="w-4 h-4" /> Cordero al Palo
            </a>
            <a href="#galeria" className="hover:text-orange-400 transition-colors">Galería</a>
            <a href="#testimonios" className="hover:text-orange-400 transition-colors">Opiniones</a>
            <a href="#zonas" className="hover:text-orange-400 transition-colors">Cobertura</a>
            <Link href="/blog" className="hover:text-orange-400 transition-colors">Blog Parrillero</Link>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`https://wa.me/56981641528?text=Hola%20Socios%20del%20Fuego,%20me%20gustar%C3%ADa%20hacer%20una%20consulta%20para%20un%20evento`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 text-xs font-semibold text-stone-300 hover:text-white px-3 py-2 rounded-lg border border-stone-800 bg-stone-900/50 hover:border-orange-500/50 transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-orange-500" /> WhatsApp Directo
            </a>
            <Button asChild className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-oswald uppercase tracking-wider font-bold shadow-[0_0_20px_rgba(234,88,12,0.4)] text-sm px-5">
              <Link href={COTIZAR_URL} onClick={() => trackCotizacion("generate_lead", { lead_source: "navbar_redesign" })}>
                Cotizar Online
              </Link>
            </Button>
          </div>
        </div>
      </nav>

      <main>
        {/* 2. HERO DE IMPACTO VISUAL */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden border-b border-stone-800">
          {/* Fondo con gradiente oscuro estilizado */}
          <div className="absolute inset-0 z-0 bg-stone-950">
            <Image
              src="/hero-bg.webp"
              alt="Asados Premium a Domicilio"
              fill
              priority
              className="object-cover opacity-35 filter contrast-125"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/70 to-stone-950/40" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,88,12,0.12)_0,transparent_70%)]" />
          </div>

          <div className="relative z-10 container mx-auto px-4 py-16 md:py-24 text-center max-w-5xl">
            {/* Tag de prueba social y credenciales */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex flex-wrap items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-stone-900/90 border border-orange-500/40 text-xs font-semibold text-stone-200 mb-8 backdrop-blur-md shadow-[0_0_25px_rgba(234,88,12,0.2)]"
            >
              <span className="flex items-center text-yellow-400">
                <Star className="w-3.5 h-3.5 fill-yellow-400" />
                <Star className="w-3.5 h-3.5 fill-yellow-400" />
                <Star className="w-3.5 h-3.5 fill-yellow-400" />
                <Star className="w-3.5 h-3.5 fill-yellow-400" />
                <Star className="w-3.5 h-3.5 fill-yellow-400" />
              </span>
              <span className="text-white font-bold">4.9/5</span>
              <span className="text-stone-500">·</span>
              <span className="text-orange-400 font-bold uppercase tracking-wider">Más de 150 eventos exitosos</span>
            </motion.div>

            {/* Titular Principal */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-oswald text-4xl sm:text-6xl md:text-7xl font-bold uppercase tracking-tight leading-[1.08] mb-6 text-white"
            >
              El Asado Premium que tu evento merece,{" "}
              <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-400 bg-clip-text text-transparent">
                sin mover un solo dedo.
              </span>
            </motion.h1>

            {/* Subtítulo de propuesta de valor */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-2xl text-stone-300 font-light max-w-3xl mx-auto mb-10 leading-relaxed"
            >
              Llevamos maestros parrilleros, carbón de espino, cortes Angus seleccionados y el tradicional <span className="text-orange-400 font-medium">Cordero al Palo</span> directamente a tu parcela o terraza.
            </motion.p>

            {/* CTAs Principales */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
            >
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white text-lg px-8 py-7 h-auto font-oswald uppercase tracking-wider font-bold shadow-[0_0_35px_rgba(234,88,12,0.45)] transition-all hover:scale-105"
              >
                <Link href={COTIZAR_URL} onClick={() => trackCotizacion("generate_lead", { lead_source: "hero_redesign_main" })}>
                  Cotizar mi Evento Online
                  <ArrowRight className="w-5 h-5 ml-2 inline-block" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-stone-700 bg-stone-900/60 hover:bg-stone-800 text-stone-200 text-base px-6 py-7 h-auto font-oswald uppercase tracking-wider"
              >
                <a href="#experiencias">Ver Menús desde ${formattedMinPrice} p/p</a>
              </Button>
            </motion.div>

            {/* Microgarantías bajo el botón */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs md:text-sm text-stone-400 max-w-4xl mx-auto pt-6 border-t border-stone-800/60">
              <div className="flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0" />
                <span>Parrillas e insumos incluidos</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0" />
                <span>Solo cortes Angus & Corderos libres</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0" />
                <span>Factura para empresas</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0" />
                <span>Santiago, V y VI Región</span>
              </div>
            </div>
          </div>
        </section>

        {/* 3. ESTIMADOR RÁPIDO / CALCULADORA EXPRESS */}
        <section className="py-12 bg-gradient-to-b from-stone-900 to-stone-950 border-b border-stone-800">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="bg-stone-900/90 border border-orange-500/20 rounded-2xl p-6 md:p-8 shadow-2xl backdrop-blur-sm">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                  <span className="text-xs uppercase font-oswald tracking-widest text-orange-400 font-bold">
                    Calculadora Estimada
                  </span>
                  <h3 className="font-oswald text-2xl md:text-3xl font-bold text-white mt-1">
                    ¿Cuántas personas asistirán a tu asado?
                  </h3>
                  <p className="text-stone-400 text-sm mt-1">
                    Ajusta el número de invitados para tener una referencia inmediata de inversión.
                  </p>
                </div>

                <div className="w-full md:w-auto flex flex-col sm:flex-row items-center gap-4">
                  <div className="flex items-center gap-3 bg-stone-950 border border-stone-800 px-4 py-2.5 rounded-xl">
                    <Users className="w-5 h-5 text-orange-500" />
                    <input
                      type="range"
                      min="15"
                      max="150"
                      step="5"
                      value={guestCount}
                      onChange={(e) => setGuestCount(Number(e.target.value))}
                      className="accent-orange-500 cursor-pointer w-32"
                    />
                    <span className="font-oswald text-xl font-bold text-white min-w-[3ch] text-center">
                      {guestCount}
                    </span>
                    <span className="text-xs text-stone-500">invitados</span>
                  </div>

                  <div className="text-center sm:text-right min-w-[150px]">
                    <div className="text-xs text-stone-400 uppercase tracking-wide">Inversión referencial</div>
                    <div className="font-oswald text-2xl font-bold text-orange-400">
                      ${new Intl.NumberFormat("es-CL").format(estimatedTotal)}
                    </div>
                  </div>

                  <Button asChild className="bg-orange-600 hover:bg-orange-500 text-white font-oswald uppercase tracking-wider px-6 py-5">
                    <Link href={`/cotizar`}>
                      Personalizar
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. TRES PASOS SENCILLOS */}
        <section className="py-20 bg-stone-950 border-b border-stone-800">
          <div className="container mx-auto px-4 max-w-5xl text-center">
            <Badge className="bg-stone-900 text-orange-400 border-stone-800 px-4 py-1 uppercase tracking-widest text-xs font-bold mb-4">
              Cero Complicaciones
            </Badge>
            <h2 className="font-oswald text-3xl md:text-5xl font-bold text-white uppercase mb-4">
              Tu evento listo en 3 simples pasos
            </h2>
            <p className="text-stone-400 max-w-2xl mx-auto mb-16 text-sm md:text-base">
              Diseñamos una plataforma en línea para que armes tu presupuesto transparente al instante.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              <div className="hidden md:block absolute top-12 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-orange-600/50 via-stone-800 to-orange-600/50 z-0" />

              <div className="relative z-10 bg-stone-900/60 border border-stone-800 p-8 rounded-2xl hover:border-orange-500/40 transition-all">
                <div className="w-14 h-14 rounded-2xl bg-orange-600/20 border border-orange-500/40 flex items-center justify-center text-orange-500 font-oswald text-2xl font-bold mx-auto mb-6">
                  1
                </div>
                <h3 className="font-oswald text-xl uppercase text-white mb-2">Selecciona tu Plan</h3>
                <p className="text-stone-400 text-sm leading-relaxed">
                  Elige entre formato buffet libre, carne al plato servida por garzones o picoteo en tablas. Suma adicionales como Cordero al Palo.
                </p>
              </div>

              <div className="relative z-10 bg-stone-900/60 border border-stone-800 p-8 rounded-2xl hover:border-orange-500/40 transition-all">
                <div className="w-14 h-14 rounded-2xl bg-orange-600/20 border border-orange-500/40 flex items-center justify-center text-orange-500 font-oswald text-2xl font-bold mx-auto mb-6">
                  2
                </div>
                <h3 className="font-oswald text-xl uppercase text-white mb-2">Fecha y Ubicación</h3>
                <p className="text-stone-400 text-sm leading-relaxed">
                  Indica tu comuna y la fecha de tu asado. Nuestro sistema verifica disponibilidad al instante en Santiago, V o VI Región.
                </p>
              </div>

              <div className="relative z-10 bg-stone-900/60 border border-stone-800 p-8 rounded-2xl hover:border-orange-500/40 transition-all">
                <div className="w-14 h-14 rounded-2xl bg-orange-600/20 border border-orange-500/40 flex items-center justify-center text-orange-500 font-oswald text-2xl font-bold mx-auto mb-6">
                  3
                </div>
                <h3 className="font-oswald text-xl uppercase text-white mb-2">Presupuesto al Instante</h3>
                <p className="text-stone-400 text-sm leading-relaxed">
                  Recibes tu cotización con precio final transparente y nos la envías directo a WhatsApp con un solo clic para reservar.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. NUESTROS PLANES & EXPERIENCIAS */}
        <section id="experiencias" className="py-24 bg-stone-950 container mx-auto px-4 scroll-mt-24">
          <div className="text-center mb-12">
            <span className="text-xs uppercase font-oswald tracking-widest text-orange-400 font-bold">
              Experiencias Gastronómicas
            </span>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold text-white mb-4 uppercase mt-2">
              Nuestros Menús Parrilleros
            </h2>
            <Separator className="w-20 bg-orange-600 h-1 mx-auto rounded-full mb-4" />
            <p className="text-stone-400 max-w-xl mx-auto text-sm md:text-base">
              Todos los planes incluyen maestros parrilleros, carbón, vegetales y vajilla según formato.
            </p>
          </div>

          {/* Filtros de Categoría */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {[
              { id: "full", label: "Asado Buffet Libre" },
              { id: "al_plato", label: "Menú al Plato c/ Garzones" },
              { id: "picar", label: "Solo Picoteo en Tablas" },
              { id: "extras", label: "Adicionales & Postres" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-6 py-2.5 rounded-full font-oswald uppercase tracking-wider text-sm transition-all duration-300 ${
                  activeCategory === cat.id
                    ? "bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-[0_0_20px_rgba(234,88,12,0.4)] scale-105 font-bold"
                    : "bg-stone-900/80 text-stone-400 border border-stone-800 hover:border-orange-500/50 hover:text-orange-400"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Grid de Planes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {activeCategory === "extras" ? (
              Object.values(ADDONS_DATA).map((addon) => {
                const item = addon as { id: string; label: string; description: string; pricePerPerson?: number; price?: number };
                const priceVal = item.pricePerPerson ?? item.price ?? 0;
                const priceSuffix = item.pricePerPerson ? "p/p" : "total";

                return (
                  <Card key={item.id} className="bg-stone-900/70 border-stone-800 flex flex-col p-6 rounded-2xl hover:border-orange-500/50 transition-all">
                    <h3 className="font-oswald text-2xl text-white font-semibold mb-2">{item.label}</h3>
                    <p className="text-stone-400 text-sm mb-6 flex-1">{item.description}</p>
                    <div className="mt-auto pt-4 border-t border-stone-800 flex items-baseline justify-between">
                      <span className="text-2xl font-bold text-orange-400">
                        ${new Intl.NumberFormat("es-CL").format(priceVal)}
                      </span>
                      <span className="text-xs text-stone-500 uppercase">{priceSuffix}</span>
                    </div>
                  </Card>
                );
              })
            ) : (
              PLANS.filter((p) => p.category === activeCategory && p.active !== false).map((plan) => (
                <Card
                  key={plan.id}
                  className={`bg-stone-900/80 border-stone-800 flex flex-col relative rounded-2xl overflow-hidden transition-all duration-300 hover:border-stone-600 hover:shadow-2xl ${
                    plan.recommended
                      ? "border-orange-500/70 shadow-[0_0_30px_rgba(234,88,12,0.2)] bg-gradient-to-b from-stone-900 to-stone-950"
                      : ""
                  }`}
                >
                  {plan.recommended && (
                    <div className="bg-gradient-to-r from-orange-600 to-amber-600 text-white text-xs font-oswald uppercase tracking-widest font-bold py-1.5 text-center shadow-md">
                      🔥 El Más Solicitado
                    </div>
                  )}

                  <div className="p-6 md:p-8 flex-1 flex flex-col">
                    <h3 className="font-oswald text-2xl md:text-3xl text-white font-bold mb-1">{plan.name}</h3>
                    <p className="text-stone-400 text-xs uppercase tracking-wider mb-4">{plan.totalWeight}</p>

                    <div className="flex items-baseline gap-1.5 mb-6">
                      <span className="text-4xl font-bold font-oswald text-white">
                        ${new Intl.NumberFormat("es-CL").format(plan.pricePerPerson)}
                      </span>
                      <span className="text-stone-400 text-sm font-medium">p/p</span>
                    </div>

                    <div className="space-y-3 mb-8 flex-1 text-sm text-stone-300">
                      {plan.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                          <span className="leading-snug text-stone-300">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-stone-800/80 flex flex-col gap-2">
                      <Button asChild className="w-full bg-orange-600 hover:bg-orange-500 text-white font-oswald uppercase tracking-wider font-semibold py-5">
                        <Link href={COTIZAR_URL}>Cotizar este Plan</Link>
                      </Button>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" className="w-full text-stone-400 hover:text-white text-xs">
                            Ver menú detallado
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-stone-900 text-stone-100 border-stone-800 max-w-lg">
                          <DialogHeader>
                            <DialogTitle className="font-oswald text-2xl text-orange-500 uppercase">
                              {plan.name} — Menú Completo
                            </DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 text-sm mt-4 max-h-[60vh] overflow-y-auto pr-2">
                            <div>
                              <h4 className="font-oswald text-base text-white uppercase mb-2">Carnes & Fuego</h4>
                              <ul className="list-disc pl-5 text-stone-300 space-y-1">
                                {plan.fullMenu?.carnes?.map((c: string, i: number) => <li key={i}>{c}</li>)}
                              </ul>
                            </div>
                            {plan.fullMenu?.ensaladas && (
                              <div>
                                <h4 className="font-oswald text-base text-white uppercase mb-2">Acompañamientos & Ensaladas</h4>
                                <ul className="list-disc pl-5 text-stone-300 space-y-1">
                                  {plan.fullMenu.ensaladas.map((e: string, i: number) => <li key={i}>{e}</li>)}
                                </ul>
                              </div>
                            )}
                            <div className="p-3 bg-stone-950 rounded-lg border border-stone-800 text-xs text-stone-400">
                              {plan.fullMenu?.servicio}
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </section>

        {/* 6. BLOQUE ESPECIAL: CORDERO AL PALO */}
        <section id="cordero" className="py-24 bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950 border-y border-stone-800 scroll-mt-24">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-stone-950/80 border border-stone-800/80 p-8 md:p-12 rounded-3xl relative overflow-hidden shadow-2xl">
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 bg-orange-950/60 border border-orange-600/40 text-orange-400 px-4 py-1 rounded-full text-xs font-oswald uppercase tracking-widest font-bold">
                  <Flame className="w-3.5 h-3.5 text-orange-500" /> Especialidad Magallánica
                </div>

                <h2 className="font-oswald text-4xl md:text-6xl font-bold text-white uppercase leading-tight">
                  Cordero <span className="text-orange-500">al Palo</span> en tu Parcela
                </h2>

                <p className="text-stone-300 text-base md:text-lg leading-relaxed">
                  El asado vertical tradicional de la Patagonia. Una estructura de fuego vivo que se cocina lentamente durante <strong className="text-white">4 a 6 horas</strong>. Un espectáculo visual y gastronómico que deja una carne tierna y crocante por fuera.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="flex items-center gap-3 bg-stone-900/70 p-3.5 rounded-xl border border-stone-800">
                    <Clock className="w-5 h-5 text-orange-500 shrink-0" />
                    <span className="text-sm text-stone-200">Cocción lenta 4-6 horas</span>
                  </div>
                  <div className="flex items-center gap-3 bg-stone-900/70 p-3.5 rounded-xl border border-stone-800">
                    <ChefHat className="w-5 h-5 text-orange-500 shrink-0" />
                    <span className="text-sm text-stone-200">Maestro asador dedicado</span>
                  </div>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="bg-orange-600 hover:bg-orange-500 text-white font-oswald uppercase tracking-wider font-bold px-8">
                    <Link href={COTIZAR_URL}>Añadir Cordero a mi Cotización</Link>
                  </Button>
                </div>
              </div>

              <div className="lg:col-span-5 relative h-80 md:h-96 rounded-2xl overflow-hidden border border-stone-700 shadow-2xl group">
                <Image
                  src="/cordero.webp"
                  alt="Cordero al Palo Magallánico"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md p-3 rounded-xl border border-white/10 text-xs text-stone-200">
                  🔥 Preparación artesanal en asador vertical in-situ
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. GALERÍA VISUAL */}
        <section id="galeria" className="py-24 bg-stone-950 border-b border-stone-800 scroll-mt-24">
          <div className="container mx-auto px-4 max-w-6xl text-center">
            <span className="text-xs uppercase font-oswald tracking-widest text-orange-400 font-bold">
              Evidencia Real
            </span>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold text-white mb-4 uppercase mt-2">
              El Fuego en Acción
            </h2>
            <p className="text-stone-400 max-w-xl mx-auto mb-12 text-sm md:text-base">
              Fotografías reales de nuestros eventos en Melipilla, Talagante, Chicureo y Litoral Central.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {GALLERY_IMAGES.map((img, i) => (
                <div
                  key={i}
                  className={`group relative rounded-2xl overflow-hidden border border-stone-800 bg-stone-900 shadow-xl ${
                    i === 0 ? "md:col-span-2 md:row-span-2 h-72 md:h-full min-h-[300px]" : "h-56 md:h-64"
                  }`}
                >
                  <Image
                    src={img.src}
                    alt={img.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent opacity-90 group-hover:opacity-60 transition-opacity" />
                  <div className="absolute bottom-4 left-4 right-4 text-left">
                    <h4 className="font-oswald text-lg font-bold text-white uppercase">{img.title}</h4>
                    <p className="text-stone-400 text-xs">{img.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. TESTIMONIOS Y RESEÑAS */}
        <section id="testimonios" className="py-24 bg-stone-900/70 border-b border-stone-800 scroll-mt-24">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <span className="text-xs uppercase font-oswald tracking-widest text-orange-400 font-bold">
                Testimonios Reales
              </span>
              <h2 className="font-oswald text-4xl md:text-5xl font-bold text-white mb-4 uppercase mt-2">
                Lo que dicen quienes ya nos contrataron
              </h2>
              <p className="text-stone-400 max-w-xl mx-auto text-sm md:text-base">
                La tranquilidad de nuestros clientes es nuestro mayor sello de calidad.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {TESTIMONIALS.map((t, idx) => (
                <div key={idx} className="bg-stone-950 border border-stone-800/80 p-8 rounded-2xl flex flex-col justify-between shadow-xl">
                  <div>
                    <div className="flex items-center gap-1 text-yellow-400 mb-4">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400" />
                      ))}
                    </div>
                    <p className="text-stone-300 text-sm italic leading-relaxed mb-6">
                      &ldquo;{t.comment}&rdquo;
                    </p>
                  </div>
                  <div className="pt-4 border-t border-stone-800">
                    <div className="font-oswald text-white font-bold uppercase">{t.name}</div>
                    <div className="text-xs text-orange-400 font-medium">{t.event}</div>
                    <div className="text-xs text-stone-500 mt-0.5">{t.guests}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 9. COBERTURA Y LOGÍSTICA */}
        <section id="zonas" className="py-20 bg-stone-950 container mx-auto px-4 scroll-mt-24">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <span className="text-xs uppercase font-oswald tracking-widest text-orange-400 font-bold">
              Cobertura
            </span>
            <h2 className="font-oswald text-3xl md:text-4xl font-bold text-white mb-3 uppercase mt-1">
              Llegamos donde tú estés
            </h2>
            <p className="text-stone-400 text-sm">
              Llevamos el equipo hasta tu ubicación. El costo de traslado se calcula de forma exacta en el cotizador según tu comuna.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                region: "Melipilla & Alrededores",
                detail: "Melipilla, Pomaire, Talagante, Isla de Maipo, Peñaflor, El Monte.",
              },
              {
                region: "Gran Santiago",
                detail: "Las Condes, Vitacura, Providencia, Lo Barnechea, Chicureo, Maipú, La Florida.",
              },
              {
                region: "V Región & Litoral",
                detail: "Viña del Mar, Valparaíso, Concón, Algarrobo, San Antonio, Santo Domingo.",
              },
              {
                region: "VI Región",
                detail: "Rancagua, Machalí, Graneros, San Francisco de Mostazal, San Fernando.",
              },
            ].map((z, idx) => (
              <div key={idx} className="bg-stone-900/60 border border-stone-800 p-6 rounded-2xl">
                <div className="flex items-center gap-2 font-oswald text-lg text-white font-bold uppercase mb-2">
                  <MapPin className="w-5 h-5 text-orange-500 shrink-0" />
                  {z.region}
                </div>
                <p className="text-stone-400 text-xs leading-relaxed">{z.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 10. DUDAS FRECUENTES (FAQ) */}
        <section id="faq" className="py-20 bg-stone-900/50 border-t border-stone-800 scroll-mt-24">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="text-center mb-12">
              <span className="text-xs uppercase font-oswald tracking-widest text-orange-400 font-bold">
                Preguntas Frecuentes
              </span>
              <h2 className="font-oswald text-3xl md:text-4xl font-bold text-white mb-2 uppercase mt-1">
                ¿Dudas antes de reservar?
              </h2>
              <p className="text-stone-400 text-sm">Respuestas claras a las consultas más habituales de nuestros clientes.</p>
            </div>

            <div className="space-y-3">
              {FAQS.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={idx} className="bg-stone-950 border border-stone-800 rounded-xl overflow-hidden transition-all">
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between p-5 text-left font-medium text-stone-200 hover:text-orange-400 transition-colors"
                    >
                      <span className="text-sm md:text-base font-semibold">{faq.q}</span>
                      <ChevronDown className={`w-5 h-5 text-stone-500 transition-transform duration-300 shrink-0 ml-2 ${isOpen ? "rotate-180 text-orange-500" : ""}`} />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 text-sm text-stone-400 leading-relaxed border-t border-stone-800/50 pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 11. BANNER FINAL DE LLAMADA A LA ACCIÓN */}
        <section className="py-20 bg-gradient-to-r from-orange-950/70 via-stone-900 to-orange-950/70 border-t border-stone-800 text-center">
          <div className="container mx-auto px-4 max-w-4xl space-y-6">
            <h2 className="font-oswald text-4xl md:text-6xl font-bold text-white uppercase tracking-tight">
              ¿Listo para disfrutar sin tocar la parrilla?
            </h2>
            <p className="text-stone-300 text-lg max-w-2xl mx-auto">
              Obtén tu presupuesto exacto en menos de 2 minutos y asegura tu fecha en nuestra agenda.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="bg-orange-600 hover:bg-orange-500 text-white font-oswald uppercase tracking-wider font-bold text-lg px-10 py-7 h-auto shadow-[0_0_30px_rgba(234,88,12,0.4)]">
                <Link href={COTIZAR_URL}>Cotizar mi Asado Ahora</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* 12. FOOTER ELEGANTE */}
      <footer className="bg-stone-950 border-t border-stone-800 py-12 text-center md:text-left">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <span className="font-oswald text-xl font-bold text-white uppercase tracking-wider">
              Socios del Fuego
            </span>
            <p className="text-stone-500 text-xs mt-1">Servicio de Asados Premium & Cordero al Palo a Domicilio.</p>
          </div>

          <div className="flex flex-col md:flex-row gap-6 text-sm text-stone-400">
            <Link href="/blog" className="hover:text-orange-400 transition-colors">Blog & Tips</Link>
            <a href="https://instagram.com/sociosdelfuego" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 flex items-center gap-1.5 justify-center md:justify-start">
              <Instagram className="w-4 h-4" /> @sociosdelfuego
            </a>
            <a href="https://wa.me/56981641528" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 flex items-center gap-1.5 justify-center md:justify-start">
              <Phone className="w-4 h-4" /> +56 9 8164 1528
            </a>
          </div>

          <p className="text-stone-600 text-xs">© {new Date().getFullYear()} Socios del Fuego.</p>
        </div>
      </footer>
    </div>
  );
}
