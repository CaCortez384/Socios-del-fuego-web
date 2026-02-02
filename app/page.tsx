"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Flame, Check, MapPin, AlertCircle, Instagram, Phone, Star, CalendarDays, Users, ChefHat } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";

const COTIZAR_URL = "https://socios-del-fuego.web.app/?v=cotizar";

export default function LandingPage() {
  
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="min-h-screen bg-stone-950 font-sans selection:bg-orange-600/30">
      
      {/* A. NAVBAR */}
      <nav className="sticky top-0 z-50 w-full border-b border-stone-800 bg-stone-950/90 backdrop-blur-md">
        <div className="container mx-auto flex h-20 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="bg-orange-600 p-1.5 rounded-full">
              <Flame className="h-5 w-5 text-stone-950 fill-stone-950" />
            </div>
            <span className="font-oswald text-xl font-bold tracking-wide text-white uppercase">
              Socios del Fuego
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-400">
            <Link href="#experiencias" className="hover:text-orange-500 transition-colors">Planes</Link>
            <Link href="#cordero" className="hover:text-orange-500 transition-colors text-orange-400">Cordero al Palo</Link>
            <Link href="#zonas" className="hover:text-orange-500 transition-colors">Zonas</Link>
          </div>

          <Button asChild className="bg-orange-600 hover:bg-orange-700 text-white font-bold tracking-wider">
            <a href={COTIZAR_URL} target="_blank" rel="noopener noreferrer">
              COTIZAR
            </a>
          </Button>
        </div>
      </nav>

      <main>
        {/* B. HERO SECTION (SEO OPTIMIZADO) */}
        <section className="relative min-h-[85vh] w-full flex items-center justify-center overflow-hidden border-b border-stone-800">
          <div className="absolute inset-0 bg-stone-900 z-0">
             <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center" />
             <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-transparent" />
          </div>

          <div className="relative z-10 container px-4 text-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="flex flex-col items-center"
            >
              <Badge variant="outline" className="mb-6 border-orange-600/50 text-orange-500 px-4 py-1 tracking-widest uppercase bg-stone-950/50 backdrop-blur-sm">
                Melipilla • Santiago • V y VI Región
              </Badge>
              
              {/* CAMBIO H1 SEO */}
              <h1 className="font-oswald text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-tight uppercase max-w-5xl">
                ASADOS PREMIUM A DOMICILIO <br className="hidden md:block"/> 
                <span className="text-orange-600">EN SANTIAGO, V Y VI REGIÓN</span>
              </h1>
              
              {/* BAJADA CON KEYWORDS DE CLIENTE */}
              <p className="text-lg md:text-2xl text-stone-300 mb-10 max-w-3xl mx-auto font-light border-l-4 border-orange-600 pl-4 md:pl-0 md:border-l-0">
                Especialistas en Matrimonios Campestres, Eventos de Empresa y Celebraciones Privadas.
              </p>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  asChild 
                  size="lg" 
                  className="bg-orange-600 hover:bg-orange-700 text-white text-lg px-10 py-8 h-auto font-oswald uppercase tracking-wider shadow-[0_0_30px_rgba(234,88,12,0.4)] animate-pulse"
                >
                  <a href={COTIZAR_URL} target="_blank" rel="noopener noreferrer">
                    Cotizar Disponibilidad
                  </a>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* NUEVA SECCIÓN: PRUEBA SOCIAL (TRUST BAR) */}
        <section className="bg-stone-900 border-b border-stone-800 py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-x divide-stone-800/0 md:divide-stone-800">
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-1 text-orange-500 mb-1">
                   <Star className="h-5 w-5 fill-current" /><Star className="h-5 w-5 fill-current" /><Star className="h-5 w-5 fill-current" /><Star className="h-5 w-5 fill-current" /><Star className="h-5 w-5 fill-current" />
                </div>
                <p className="text-white font-oswald text-xl font-bold">4.9/5 Estrellas</p>
                <p className="text-stone-500 text-xs uppercase tracking-wider">Calidad Garantizada</p>
              </div>
              <div className="flex flex-col items-center">
                <CalendarDays className="h-6 w-6 text-orange-600 mb-2" />
                <p className="text-white font-oswald text-xl font-bold">+200 Eventos</p>
                <p className="text-stone-500 text-xs uppercase tracking-wider">Realizados con Éxito</p>
              </div>
              <div className="flex flex-col items-center">
                <Users className="h-6 w-6 text-orange-600 mb-2" />
                <p className="text-white font-oswald text-xl font-bold">+3.000 Comensales</p>
                <p className="text-stone-500 text-xs uppercase tracking-wider">Atendidos</p>
              </div>
              <div className="flex flex-col items-center">
                <MapPin className="h-6 w-6 text-orange-600 mb-2" />
                <p className="text-white font-oswald text-xl font-bold">3 Regiones</p>
                <p className="text-stone-500 text-xs uppercase tracking-wider">Cobertura Zona Central</p>
              </div>
            </div>
          </div>
        </section>

        {/* C. PLANES (LIMPIEZA DE METALES) */}
        <section id="experiencias" className="py-24 bg-stone-950 container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-oswald text-4xl font-bold text-white mb-4 uppercase">Nuestros Planes</h2>
            <Separator className="w-20 bg-orange-600 h-1 mx-auto rounded-full" />
            <p className="mt-4 text-stone-400">Todo incluido: Parrilleros, insumos y equipamiento.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
            
            {/* 1. FUEGO CRIOLLO */}
            <Card className="bg-stone-900 border-stone-800 hover:border-orange-700/50 transition-colors flex flex-col">
              <CardHeader>
                {/* ELIMINADO: Bronce */}
                <CardTitle className="font-oswald text-2xl text-white">Fuego Criollo</CardTitle>
                <CardDescription className="text-stone-400 mt-2">La base perfecta.</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3 text-sm text-stone-300">
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-orange-700 shrink-0 mt-0.5" /> Lomo Liso o Vetado</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-orange-700 shrink-0 mt-0.5" /> Costillar de Cerdo (Marinado)</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-orange-700 shrink-0 mt-0.5" /> Pollo al Limón</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-stone-600 shrink-0 mt-0.5" /> Pimientos y Zapallitos</li>
                </ul>
              </CardContent>
            </Card>

            {/* 2. FUEGO TOTAL */}
            <Card className="bg-stone-900 border-stone-800 hover:border-red-600/50 transition-colors flex flex-col">
              <CardHeader>
                 {/* ELIMINADO: Rojo Intenso */}
                <CardTitle className="font-oswald text-2xl text-white">Fuego Total</CardTitle>
                <CardDescription className="text-stone-400 mt-2">El favorito de todos.</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3 text-sm text-stone-300">
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-red-600 shrink-0 mt-0.5" /> Todo lo anterior +</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-red-600 shrink-0 mt-0.5" /> <strong>Punta de Ganso</strong></li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-red-600 shrink-0 mt-0.5" /> Tabla de Bienvenida</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-stone-600 shrink-0 mt-0.5" /> Champiñones Queso</li>
                </ul>
              </CardContent>
            </Card>

            {/* 3. FUEGO PREMIUM */}
            <Card className="bg-stone-900 border-sky-600/50 relative flex flex-col shadow-[0_0_20px_rgba(2,132,199,0.15)]">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge className="bg-sky-600 hover:bg-sky-700 text-white font-bold border-none px-4">RECOMENDADO</Badge>
              </div>
              <CardHeader>
                 {/* ELIMINADO: Plata Sofisticado */}
                <CardTitle className="font-oswald text-2xl text-white">Fuego Premium</CardTitle>
                <CardDescription className="text-stone-400 mt-2">Variedad y abundancia.</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3 text-sm text-stone-300">
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-sky-500 shrink-0 mt-0.5" /> Cortes Premium + Malaya</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-sky-500 shrink-0 mt-0.5" /> <strong>Buffet Americano (Ensaladas)</strong></li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-sky-500 shrink-0 mt-0.5" /> Longanizas Artesanales</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-sky-500 shrink-0 mt-0.5" /> Papas Mayo & Pebre</li>
                </ul>
              </CardContent>
            </Card>

            {/* 4. EXTRA PREMIUM */}
            <Card className="bg-gradient-to-br from-stone-900 to-stone-800 border-yellow-500/40 flex flex-col relative overflow-hidden">
               <div className="absolute top-0 right-0 bg-yellow-600 text-white text-[10px] font-bold px-2 py-1 uppercase">Lujo</div>
              <CardHeader>
                 {/* ELIMINADO: Oro */}
                <CardTitle className="font-oswald text-2xl text-white">Extra Premium</CardTitle>
                <CardDescription className="text-stone-400 mt-2">La experiencia definitiva.</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3 text-sm text-stone-200 font-medium">
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-yellow-500 shrink-0 mt-0.5" /> <strong>Filete Premium</strong> a la parrilla</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-yellow-500 shrink-0 mt-0.5" /> Selección de Lomo y Puntas</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-yellow-500 shrink-0 mt-0.5" /> Buffet Americano Completo</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-yellow-500 shrink-0 mt-0.5" /> Servicio de Lujo</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button asChild size="lg" className="bg-orange-600 hover:bg-orange-700 text-white font-oswald uppercase text-xl px-12 py-8 h-auto tracking-wider shadow-lg shadow-orange-900/20 hover:scale-105 transition-transform">
                <a href={COTIZAR_URL} target="_blank" rel="noopener noreferrer">
                    Cotizar mi Asado
                </a>
            </Button>
            <p className="text-stone-500 text-sm mt-4">Recibe tu presupuesto detallado en minutos.</p>
          </div>
        </section>

        {/* D. SECCIÓN ESPECIAL: CORDERO AL PALO */}
        <section id="cordero" className="py-20 bg-stone-900 border-y border-stone-800">
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
                       La preparación tradicional magallánica al asador vertical. Un espectáculo visual y gastronómico para tu evento.
                       Cocción lenta de 4 a 6 horas para lograr una carne que se deshace.
                    </p>
                    {/* CAMBIO CTA CORDERO */}
                    <Button asChild size="lg" variant="outline" className="border-orange-600 text-orange-500 hover:bg-orange-600 hover:text-white font-oswald uppercase">
                       <a href={COTIZAR_URL}>AGREGAR A MI EVENTO</a>
                    </Button>
                 </div>
                 <div className="md:w-1/2 h-64 md:h-80 w-full bg-stone-800 rounded-xl flex items-center justify-center border border-stone-700 relative overflow-hidden group">
                     <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1599321955726-90481287504e?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-60 group-hover:scale-105 transition-transform duration-700"></div>
                     <span className="relative z-10 text-stone-200 font-oswald text-xl uppercase tracking-widest bg-black/50 px-4 py-2 rounded">
                        Cocción Lenta Vertical
                     </span>
                 </div>
              </div>
           </div>
        </section>

        {/* E. ZONAS Y TRANSPORTE */}
        <section id="zonas" className="py-20 bg-stone-950 container mx-auto px-4">
           <div className="text-center mb-12">
               <h2 className="font-oswald text-3xl font-bold text-white mb-4 uppercase">Cobertura y Traslados</h2>
               <p className="text-stone-400">Llegamos donde tú estés. Costo de transporte según zona.</p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
               <Card className="bg-stone-900 border-stone-800">
                  <CardHeader className="pb-2">
                     <CardTitle className="font-oswald text-white flex items-center gap-2">
                        <MapPin className="text-orange-600 h-5 w-5" /> Melipilla (Provincia)
                     </CardTitle>
                  </CardHeader>
                  <CardContent>
                     <p className="text-sm text-stone-400">Melipilla, Pomaire, Talagante, Isla de Maipo, Peñaflor, El Monte.</p>
                  </CardContent>
               </Card>

               <Card className="bg-stone-900 border-stone-800">
                  <CardHeader className="pb-2">
                     <CardTitle className="font-oswald text-white flex items-center gap-2">
                        <MapPin className="text-orange-600 h-5 w-5" /> Gran Santiago
                     </CardTitle>
                  </CardHeader>
                  <CardContent>
                     <p className="text-sm text-stone-400">Maipú, Las Condes, Vitacura, Providencia, La Florida, Colina, Chicureo.</p>
                  </CardContent>
               </Card>

               <Card className="bg-stone-900 border-stone-800">
                  <CardHeader className="pb-2">
                     <CardTitle className="font-oswald text-white flex items-center gap-2">
                        <MapPin className="text-orange-600 h-5 w-5" /> V Región / Litoral
                     </CardTitle>
                  </CardHeader>
                  <CardContent>
                     <p className="text-sm text-stone-400">San Antonio, Algarrobo, Santo Domingo, Viña del Mar, Valparaíso, Concón.</p>
                  </CardContent>
               </Card>

               <Card className="bg-stone-900 border-stone-800">
                  <CardHeader className="pb-2">
                     <CardTitle className="font-oswald text-white flex items-center gap-2">
                        <MapPin className="text-orange-600 h-5 w-5" /> VI Región
                     </CardTitle>
                  </CardHeader>
                  <CardContent>
                     <p className="text-sm text-stone-400">Rancagua, Machalí, Graneros, San Francisco de Mostazal.</p>
                  </CardContent>
               </Card>
           </div>
        </section>

        {/* F. DISCLAIMER (REENFOQUE DE AUTORIDAD) */}
        <section className="container mx-auto px-4 mb-24">
          <Alert className="bg-stone-900 border-orange-900/50 text-stone-300">
            <ChefHat className="h-5 w-5 text-orange-600" />
            <AlertTitle className="text-orange-500 font-oswald uppercase tracking-wide ml-2">Servicio 100% Gastronómico</AlertTitle>
            <AlertDescription className="ml-2 text-stone-400">
              Nos enfocamos exclusivamente en la calidad de la carne y el fuego. 
              <span className="text-stone-200 font-medium"> (El servicio no incluye vajilla ni mobiliario).</span>
            </AlertDescription>
          </Alert>
        </section>

        {/* G. FAQ COMPACTA */}
        <section id="faq" className="py-16 bg-stone-950 max-w-2xl mx-auto px-4 border-t border-stone-800">
            <h2 className="text-3xl font-oswald font-bold text-white text-center mb-8">DUDAS FRECUENTES</h2>
            <Accordion type="single" collapsible className="w-full space-y-4">
                <AccordionItem value="item-1" className="border-stone-800 bg-stone-900/50 px-4 rounded-lg">
                    <AccordionTrigger className="text-stone-200 hover:text-orange-500 hover:no-underline">¿Qué incluye el servicio?</AccordionTrigger>
                    <AccordionContent className="text-stone-400">
                        Maestros parrilleros, carbón, parrillas (si es necesario) y todos los insumos de comida detallados en tu plan.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2" className="border-stone-800 bg-stone-900/50 px-4 rounded-lg">
                    <AccordionTrigger className="text-stone-200 hover:text-orange-500 hover:no-underline">¿Cómo reservo?</AccordionTrigger>
                    <AccordionContent className="text-stone-400">
                        Transferencia del 50% para bloquear la fecha. El saldo restante se paga el día del evento al llegar el equipo.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </section>
      </main>

      {/* H. FOOTER */}
      <footer className="bg-stone-950 border-t border-stone-800 py-12 text-center md:text-left">
          <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                  <span className="font-oswald text-xl font-bold text-white uppercase">Socios del Fuego</span>
                  <p className="text-stone-500 text-sm mt-1">El mejor aliado para tu parrilla.</p>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6 text-sm text-stone-400">
                  <a href="https://instagram.com/sociosdelfuego" target="_blank" className="hover:text-orange-500 flex items-center gap-2 justify-center md:justify-start">
                     <Instagram className="h-4 w-4" /> @sociosdelfuego
                  </a>
                  <a href="https://wa.me/56981641528" target="_blank" className="hover:text-orange-500 flex items-center gap-2 justify-center md:justify-start">
                     <Phone className="h-4 w-4" /> +56 9 8164 1528
                  </a>
              </div>

              <p className="text-stone-600 text-xs">
                  © {new Date().getFullYear()} Socios del Fuego.
              </p>
          </div>
      </footer>
    </div>
  );
}