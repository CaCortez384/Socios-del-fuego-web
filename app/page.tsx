"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Flame,
  Check,
  MapPin,
  Instagram,
  Phone,
  Star,
  CalendarDays,
  Users,
  ChefHat,
  Beef,
  Salad,
  Utensils,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";

import { trackCotizacion } from "@/lib/utils";
import { PLANS } from "@/lib/plans";

// Este es el componente principal que contiene toda la lógica y la UI de la landing
function LandingContent() {
  const searchParams = useSearchParams();
  const queryString = searchParams.toString();

  // MAGIA DEL CROSS-DOMAIN: Mantiene vivo el fbclid de Meta o UTMs de Analytics
  const COTIZAR_URL = queryString
    ? `https://socios-del-fuego.web.app/?v=cotizar&${queryString}`
    : `https://socios-del-fuego.web.app/?v=cotizar`;

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen bg-stone-950 font-sans selection:bg-orange-600/30">
      {/* A. NAVBAR */}
      <nav className="sticky top-0 z-50 w-full border-b border-stone-800 bg-stone-950/90 backdrop-blur-md">
        <div className="container mx-auto flex h-20 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="relative h-10 w-10 overflow-hidden rounded-full border border-orange-600/20">
              <Image
                src="/logo.webp"
                alt="Logo Socios del Fuego"
                fill
                className="object-cover"
              />
            </div>
            <span className="font-oswald text-xl font-bold tracking-wide text-white uppercase">
              Socios del Fuego
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-400">
            <Link href="#experiencias" className="hover:text-orange-500 transition-colors">Planes</Link>
            <Link href="#cordero" className="hover:text-orange-500 transition-colors text-orange-400">Cordero al Palo</Link>
            <Link href="#zonas" className="hover:text-orange-500 transition-colors">Zonas</Link>
            <Link href="/blog" className="hover:text-orange-500 transition-colors font-bold text-stone-200">Blog Parrillero</Link>
          </div>

          <Button asChild className="bg-orange-600 hover:bg-orange-700 text-white font-bold tracking-wider">
            <a href={COTIZAR_URL} onClick={() => trackCotizacion("generate_lead", { lead_source: "navbar" })}>COTIZAR</a>
          </Button>
        </div>
      </nav>

      <main>
        {/* B. HERO SECTION */}
        <section className="relative min-h-[85vh] w-full flex items-center justify-center overflow-hidden border-b border-stone-800">
          <div className="absolute inset-0 bg-stone-900 z-0">
            <Image
              src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2000&auto=format&fit=crop"
              alt="Asados Premium a Domicilio"
              fill
              priority
              className="object-cover opacity-40"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-transparent" />
          </div>

          <div className="relative z-10 container px-4 text-center">
            <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="flex flex-col items-center">
              <div className="flex flex-col md:flex-row gap-3 items-center justify-center mb-6">
                <Badge variant="outline" className="border-orange-600/50 text-orange-500 px-4 py-1 tracking-widest uppercase bg-stone-950/50 backdrop-blur-sm">
                  Melipilla • Santiago • V y VI Región
                </Badge>
                <Badge className="bg-orange-600 hover:bg-orange-500 text-white px-4 py-1 tracking-widest uppercase font-bold animate-pulse shadow-[0_0_15px_rgba(234,88,12,0.3)]">
                  🔥 Temporada Alta: Últimas fechas
                </Badge>
              </div>

              <h1 className="font-oswald text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-tight uppercase max-w-5xl">
                ASADOS PREMIUM A DOMICILIO <br className="hidden md:block" />
                <span className="text-orange-600">EN SANTIAGO, V Y VI REGIÓN</span>
              </h1>

              <p className="text-lg md:text-2xl text-stone-300 mb-10 max-w-3xl mx-auto font-light border-l-4 border-orange-600 pl-4 md:pl-0 md:border-l-0">
                Especialistas en Matrimonios Campestres, Eventos de Empresa y Celebraciones Privadas.
              </p>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button asChild size="lg" className="bg-orange-600 hover:bg-orange-700 text-white text-lg px-10 py-8 h-auto font-oswald uppercase tracking-wider shadow-[0_0_30px_rgba(234,88,12,0.4)] animate-pulse">
                  <a href={COTIZAR_URL} onClick={() => trackCotizacion("generate_lead", { lead_source: "hero" })}>
                    Cotizar Disponibilidad
                  </a>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* CÓMO FUNCIONA */}
        <section className="py-16 bg-stone-900 border-b border-stone-800">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="font-oswald text-3xl md:text-4xl font-bold text-white text-center mb-12 uppercase">COTIZA EN 3 SIMPLES PASOS</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 relative">
              <div className="hidden md:block absolute top-[2rem] left-[20%] right-[20%] h-px bg-stone-800 z-0" />

              <div className="flex flex-col items-center text-center relative z-10">
                <div className="w-16 h-16 rounded-full bg-stone-950 border border-orange-600/50 flex items-center justify-center text-orange-500 mb-6 shadow-[0_0_20px_rgba(234,88,12,0.15)] flex-shrink-0">
                  <span className="font-oswald text-2xl font-bold">1</span>
                </div>
                <h3 className="text-white font-oswald text-xl uppercase mb-3">Tu Evento a Medida</h3>
                <p className="text-stone-400 text-sm px-2">Selecciona tu plan favorito en nuestro cotizador y añade extras opcionales como el Cordero al Palo.</p>
              </div>

              <div className="flex flex-col items-center text-center relative z-10 mt-4 md:mt-0">
                <div className="w-16 h-16 rounded-full bg-stone-950 border border-orange-600/50 flex items-center justify-center text-orange-500 mb-6 shadow-[0_0_20px_rgba(234,88,12,0.15)] flex-shrink-0">
                  <span className="font-oswald text-2xl font-bold">2</span>
                </div>
                <h3 className="text-white font-oswald text-xl uppercase mb-3">Detalles del Lugar</h3>
                <p className="text-stone-400 text-sm px-2">Indícanos la fecha de tu asado, la cantidad exacta de invitados y lugar o comuna donde realizaremos el servicio.</p>
              </div>

              <div className="flex flex-col items-center text-center relative z-10 mt-4 md:mt-0">
                <div className="w-16 h-16 rounded-full bg-stone-950 border border-orange-600/50 flex items-center justify-center text-orange-500 mb-6 shadow-[0_0_20px_rgba(234,88,12,0.15)] flex-shrink-0">
                  <span className="font-oswald text-2xl font-bold">3</span>
                </div>
                <h3 className="text-white font-oswald text-xl uppercase mb-3">Presupuesto al Instante</h3>
                <p className="text-stone-400 text-sm px-2">Obtén el precio y envíanos tu presupuesto directamente a WhatsApp con un solo clic para afinar detalles y reservar.</p>
              </div>
            </div>
          </div>
        </section>

        {/* C. PLANES (CON EVENTOS ECOMMERCE) */}
        <section id="experiencias" className="py-24 bg-stone-950 container mx-auto px-4 scroll-mt-24">
          <div className="text-center mb-16">
            <h2 className="font-oswald text-4xl font-bold text-white mb-4 uppercase">Nuestros Planes</h2>
            <Separator className="w-20 bg-orange-600 h-1 mx-auto rounded-full" />
            <p className="mt-4 text-stone-400">Haz clic en cualquier plan para ver el menú detallado.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
            {PLANS.filter(plan => plan.category === "full").map((plan) => (
              <Dialog key={plan.id}>
                <Card className={`bg-stone-900 border-stone-800 flex flex-col relative transition-all duration-300 hover:border-stone-600 ${plan.recommended ? 'shadow-[0_0_20px_rgba(2,132,199,0.15)] border-sky-600/50 hover:border-sky-500' : ''}`}>

                  {plan.recommended && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                      <Badge className="bg-sky-600 text-white font-bold border-none px-4 uppercase tracking-widest">Recomendado</Badge>
                    </div>
                  )}
                  {plan.id === "extra_premium" && (
                    <div className="absolute top-0 right-0 bg-yellow-600 text-white text-[10px] font-bold px-2 py-1 uppercase z-10">Lujo</div>
                  )}

                  <DialogTrigger asChild>
                    <div className="cursor-pointer group flex-1 flex flex-col p-6 pb-0 outline-none">
                      <div className="pb-4">
                        <h3 className="font-oswald text-2xl text-white font-semibold leading-none tracking-tight group-hover:text-orange-400 transition-colors">{plan.name}</h3>
                        <p className="text-stone-400 mt-1 text-sm">{plan.totalWeight}</p>
                        <div className="mt-4 flex items-baseline gap-1">
                          <span className="text-3xl font-bold text-white">${plan.pricePerPerson.toLocaleString("es-CL")}</span>
                          <span className="text-stone-500 text-sm font-medium">/ p/p</span>
                        </div>
                      </div>

                      <ul className="space-y-3 text-sm text-stone-300 mb-4 flex-1">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Check className={`h-4 w-4 shrink-0 mt-0.5 ${plan.id === 'criollo' ? 'text-orange-600' : plan.id === 'total' ? 'text-red-600' : plan.id === 'premium' ? 'text-sky-500' : 'text-yellow-500'}`} />
                            <span dangerouslySetInnerHTML={{ __html: feature.replace("FILETE PREMIUM", "<strong>FILETE PREMIUM</strong>").replace("Punta de Ganso", "<strong>Punta de Ganso</strong>").replace("Buffet Americano (Ensaladas)", "<strong>Buffet Americano (Ensaladas)</strong>") }} />
                          </li>
                        ))}
                      </ul>

                      <div className="mt-auto pt-4 flex items-center justify-center gap-2 text-xs font-bold text-stone-500 uppercase tracking-widest mb-4 group-hover:text-orange-500 transition-colors">
                        <span className="border-b border-dashed border-stone-600 group-hover:border-orange-500 pb-0.5">Ver menú y detalles</span>
                      </div>
                    </div>
                  </DialogTrigger>

                  <div className="p-6 pt-0 mt-auto">
                    <Button asChild className={`w-full font-bold uppercase tracking-wider relative z-20 ${plan.id === 'extra_premium' ? 'bg-yellow-600 hover:bg-yellow-700 text-white border-none' : plan.id === 'premium' ? 'bg-sky-600 hover:bg-sky-700 text-white border-none' : 'bg-stone-800/80 border border-stone-700 hover:border-orange-600 hover:bg-orange-600 text-white transition-all shadow-sm'}`}>
                      <a
                        href={`${COTIZAR_URL}&plan=${plan.id}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          trackCotizacion("begin_checkout", {
                            value: plan.pricePerPerson,
                            currency: "CLP",
                            items: [{ item_id: plan.id, item_name: plan.name, price: plan.pricePerPerson }],
                            checkout_origin: "card_button"
                          });
                        }}
                      >
                        Cotizar {plan.name}
                      </a>
                    </Button>
                  </div>

                  <DialogContent className="bg-stone-950 border-stone-800 text-stone-200 max-w-md w-[95vw] rounded-xl overflow-hidden p-0 flex flex-col max-h-[90vh]">
                    <div className={`h-2 w-full shrink-0 ${plan.id === 'criollo' ? 'bg-orange-600' : plan.id === 'total' ? 'bg-red-600' : plan.id === 'premium' ? 'bg-sky-500' : 'bg-yellow-500'}`} />
                    <div className="p-6 pb-2 shrink-0">
                      <DialogHeader className="text-left">
                        <DialogTitle className="font-oswald text-3xl text-white uppercase">{plan.name}</DialogTitle>
                        <DialogDescription className="text-stone-400 text-base">
                          Detalle completo del servicio (${plan.pricePerPerson.toLocaleString("es-CL")} por persona)
                        </DialogDescription>
                      </DialogHeader>
                    </div>

                    <div className="px-6 py-2 overflow-y-auto custom-scrollbar flex-1">
                      <div className="space-y-6">
                        <div>
                          <h4 className="flex items-center gap-2 font-oswald text-lg text-white mb-3 uppercase tracking-wider border-b border-stone-800 pb-2">
                            <Beef className="w-5 h-5 text-orange-500" /> Carnes al Fuego
                          </h4>
                          <ul className="space-y-2 text-sm text-stone-300">
                            {plan.fullMenu.carnes.map((item, i) => (
                              <li key={i} className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-500/50" /> {item}</li>
                            ))}
                          </ul>
                        </div>

                        {plan.fullMenu.picoteo && (
                          <div>
                            <h4 className="flex items-center gap-2 font-oswald text-lg text-white mb-3 uppercase tracking-wider border-b border-stone-800 pb-2">
                              <Flame className="w-5 h-5 text-orange-500" /> Para Picar
                            </h4>
                            <ul className="space-y-2 text-sm text-stone-300">
                              {plan.fullMenu.picoteo.map((item, i) => (
                                <li key={i} className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-500/50" /> {item}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {plan.fullMenu.ensaladas && (
                          <div>
                            <h4 className="flex items-center gap-2 font-oswald text-lg text-white mb-3 uppercase tracking-wider border-b border-stone-800 pb-2">
                              <Salad className="w-5 h-5 text-orange-500" /> Acompañamientos
                            </h4>
                            <ul className="space-y-2 text-sm text-stone-300">
                              {plan.fullMenu.ensaladas.map((item, i) => (
                                <li key={i} className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-500/50" /> {item}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <div>
                          <h4 className="flex items-center gap-2 font-oswald text-lg text-white mb-3 uppercase tracking-wider border-b border-stone-800 pb-2">
                            <Utensils className="w-5 h-5 text-orange-500" /> Servicio Incluido
                          </h4>
                          <p className="text-sm text-stone-300 bg-stone-900 p-3 rounded-lg border border-stone-800/50 leading-relaxed">
                            {plan.fullMenu.servicio}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 pt-5 mt-auto border-t border-stone-800 bg-stone-950/95 backdrop-blur-sm shrink-0 shadow-[0_-10px_20px_rgba(0,0,0,0.5)] z-20">
                      <Button asChild className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold h-12 uppercase tracking-wider shadow-lg">
                        <a
                          href={`${COTIZAR_URL}&plan=${plan.id}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            trackCotizacion("begin_checkout", {
                              value: plan.pricePerPerson,
                              currency: "CLP",
                              items: [{ item_id: plan.id, item_name: plan.name, price: plan.pricePerPerson }],
                              checkout_origin: "modal_button"
                            });
                          }}
                        >
                          Cotizar este plan
                        </a>
                      </Button>
                    </div>
                  </DialogContent>
                </Card>
              </Dialog>
            ))}
          </div>
        </section>

        {/* D. SECCIÓN ESPECIAL: CORDERO AL PALO */}
        <section id="cordero" className="py-20 bg-stone-900 border-y border-stone-800 scroll-mt-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-10 bg-stone-950 p-8 rounded-2xl border border-stone-800">
              <div className="md:w-1/2">
                <div className="inline-block bg-orange-900/30 text-orange-500 px-3 py-1 rounded-full text-xs font-bold uppercase mb-4 tracking-wider">
                  Especialidad de la Casa
                </div>
                <h2 className="font-oswald text-4xl md:text-5xl font-bold text-white mb-6 uppercase">
                  Cordero <span className="text-orange-600">Al Palo</span>
                </h2>
                <p className="text-stone-300 text-lg mb-8">
                  La preparación tradicional magallánica al asador vertical. Un espectáculo visual y gastronómico para tu evento. Cocción lenta de 4 a 6 horas para lograr una carne que se deshace.
                </p>
                <Button asChild size="lg" className="bg-orange-600 hover:bg-orange-700 text-white font-oswald uppercase tracking-wider">
                  <a href={COTIZAR_URL} onClick={() => trackCotizacion("generate_lead", { lead_source: "cordero_banner" })}>
                    AÑADIR A MI COTIZACIÓN
                  </a>
                </Button>
              </div>

              <div className="md:w-1/2 h-64 md:h-80 w-full bg-stone-800 rounded-xl flex items-center justify-center border border-stone-700 relative overflow-hidden group">
                <Image src="/cordero.webp" alt="Cordero al Palo" fill className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" />
                <span className="relative z-10 text-stone-200 font-oswald text-xl uppercase tracking-widest bg-black/50 px-4 py-2 rounded backdrop-blur-sm border border-white/10">
                  Cocción Lenta Vertical
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* E. ZONAS Y TRANSPORTE */}
        <section id="zonas" className="py-20 bg-stone-950 container mx-auto px-4 scroll-mt-24">
          <div className="text-center mb-12">
            <h2 className="font-oswald text-3xl font-bold text-white mb-4 uppercase">Cobertura y Traslados</h2>
            <p className="text-stone-400">Llegamos donde tú estés. Costo de transporte según zona.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            <Card className="bg-stone-900 border-stone-800">
              <CardHeader className="pb-2"><CardTitle className="font-oswald text-white flex items-center gap-2"><MapPin className="text-orange-600 h-5 w-5" /> Melipilla</CardTitle></CardHeader>
              <CardContent><p className="text-sm text-stone-400">Melipilla, Pomaire, Talagante, Isla de Maipo, Peñaflor, El Monte, y más.</p></CardContent>
            </Card>

            <Card className="bg-stone-900 border-stone-800">
              <CardHeader className="pb-2"><CardTitle className="font-oswald text-white flex items-center gap-2"><MapPin className="text-orange-600 h-5 w-5" /> Gran Santiago</CardTitle></CardHeader>
              <CardContent><p className="text-sm text-stone-400">Maipú, Las Condes, Vitacura, Providencia, La Florida, Colina, Chicureo, y más.</p></CardContent>
            </Card>

            <Card className="bg-stone-900 border-stone-800">
              <CardHeader className="pb-2"><CardTitle className="font-oswald text-white flex items-center gap-2"><MapPin className="text-orange-600 h-5 w-5" /> V Región / Litoral</CardTitle></CardHeader>
              <CardContent><p className="text-sm text-stone-400">San Antonio, Algarrobo, Santo Domingo, Viña del Mar, Valparaíso, Concón, y más.</p></CardContent>
            </Card>

            <Card className="bg-stone-900 border-stone-800">
              <CardHeader className="pb-2"><CardTitle className="font-oswald text-white flex items-center gap-2"><MapPin className="text-orange-600 h-5 w-5" /> VI Región</CardTitle></CardHeader>
              <CardContent><p className="text-sm text-stone-400">Rancagua, Machalí, Graneros, San Francisco de Mostazal, y más.</p></CardContent>
            </Card>
          </div>
        </section>

        {/* F. DISCLAIMER */}
        <section className="container mx-auto px-4 mb-24">
          <Alert className="bg-stone-900 border-orange-900/50 text-stone-300">
            <ChefHat className="h-5 w-5 text-orange-600" />
            <AlertTitle className="text-orange-500 font-oswald uppercase tracking-wide ml-2">Servicio 100% Gastronómico</AlertTitle>
            <AlertDescription className="ml-2 text-stone-400">
              Nos enfocamos exclusivamente en la calidad de la carne y el fuego.<span className="text-stone-200 font-medium"> (El servicio no incluye vajilla ni mobiliario).</span>
            </AlertDescription>
          </Alert>
        </section>

        {/* G. FAQ COMPACTA */}
        <section id="faq" className="py-16 bg-stone-950 max-w-2xl mx-auto px-4 border-t border-stone-800 scroll-mt-24">
          <h2 className="text-3xl font-oswald font-bold text-white text-center mb-8">DUDAS FRECUENTES</h2>
          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem value="item-1" className="border-stone-800 bg-stone-900/50 px-4 rounded-lg">
              <AccordionTrigger className="text-stone-200 hover:text-orange-500 hover:no-underline">¿Qué incluye el servicio?</AccordionTrigger>
              <AccordionContent className="text-stone-400">Maestros parrilleros, carbón, parrillas (si es necesario) y todos los insumos de comida detallados en tu plan.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border-stone-800 bg-stone-900/50 px-4 rounded-lg">
              <AccordionTrigger className="text-stone-200 hover:text-orange-500 hover:no-underline">¿Cómo reservo?</AccordionTrigger>
              <AccordionContent className="text-stone-400">Transferencia del 50% para bloquear la fecha. El saldo restante se paga el día del evento al llegar el equipo.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </main>

      {/* H. BANNER BLOG */}
      <section className="py-16 bg-stone-900 border-t border-stone-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-oswald text-3xl font-bold text-white mb-4 uppercase">Escuela de Fuego</h2>
          <p className="text-stone-400 max-w-2xl mx-auto mb-8">
            ¿No sabes calcular la carne? ¿Dudas entre Lomo y Punta de Ganso? Visita nuestro blog y aprende los secretos de nuestros maestros parrilleros.
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild variant="outline" className="border-stone-600 text-stone-300 hover:text-white hover:bg-stone-800">
              <Link href="/blog/como-calcular-carne-asado">Calculadora de Asado</Link>
            </Button>
            <Button asChild className="bg-stone-800 hover:bg-stone-700 text-white">
              <Link href="/blog">Ver todos los artículos</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-stone-950 border-t border-stone-800 py-12 text-center md:text-left">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <span className="font-oswald text-xl font-bold text-white uppercase">Socios del Fuego</span>
            <p className="text-stone-500 text-sm mt-1">El mejor aliado para tu parrilla.</p>
          </div>

          <div className="flex flex-col md:flex-row gap-6 text-sm text-stone-400">
            <Link href="/blog" className="hover:text-orange-500 flex items-center gap-2 justify-center md:justify-start">Blog & Tips</Link>
            <a href="https://instagram.com/sociosdelfuego" target="_blank" className="hover:text-orange-500 flex items-center gap-2 justify-center md:justify-start">
              <Instagram className="h-4 w-4" /> @sociosdelfuego
            </a>
            <a href="https://wa.me/56981641528" target="_blank" className="hover:text-orange-500 flex items-center gap-2 justify-center md:justify-start">
              <Phone className="h-4 w-4" /> +56 9 8164 1528
            </a>
          </div>

          <p className="text-stone-600 text-xs">© {new Date().getFullYear()} Socios del Fuego.</p>
        </div>
      </footer>
    </div>
  );
}

// Este es el export default que Next.js espera, envuelto en Suspense
export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-stone-950" />}>
      <LandingContent />
    </Suspense>
  );
}