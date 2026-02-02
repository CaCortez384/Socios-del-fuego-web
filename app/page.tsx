"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Flame, Check, MapPin, AlertCircle, Instagram, ChefHat, GlassWater, Users, PartyPopper, Home } from "lucide-react";

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
            <Link href="#experiencias" className="hover:text-orange-500 transition-colors">Experiencias</Link>
            <Link href="#zonas" className="hover:text-orange-500 transition-colors">Zonas</Link>
            <Link href="#faq" className="hover:text-orange-500 transition-colors">Dudas</Link>
          </div>

          <Button asChild className="bg-orange-600 hover:bg-orange-700 text-white font-bold tracking-wider">
            <a href={COTIZAR_URL} target="_blank" rel="noopener noreferrer">
              COTIZAR MI ASADO
            </a>
          </Button>
        </div>
      </nav>

      <main>
        {/* B. HERO SECTION (Enfoque Social) */}
        <section className="relative min-h-[85vh] w-full flex items-center justify-center overflow-hidden border-b border-stone-800">
          <div className="absolute inset-0 bg-stone-900 z-0">
             <div className="absolute inset-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2069&auto=format&fit=crop')] bg-cover bg-center" />
             <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-transparent" />
          </div>

          <div className="relative z-10 container px-4 text-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="flex flex-col items-center"
            >
              <Badge variant="outline" className="mb-6 border-orange-600/50 text-orange-500 px-4 py-1 tracking-widest uppercase">
                Parrilleros a Domicilio
              </Badge>
              
              <h1 className="font-oswald text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight leading-none uppercase">
                EL FUEGO <br className="md:hidden" /> <span className="text-orange-600">NOS REÚNE</span>
              </h1>
              
              <p className="text-lg md:text-xl text-stone-300 mb-10 max-w-2xl mx-auto font-light">
                Disfruta a tus invitados, nosotros nos encargamos de la parrilla.
                Ideal para cumpleaños, juntas y celebraciones en casa.
              </p>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  asChild 
                  size="lg" 
                  className="bg-orange-600 hover:bg-orange-700 text-white text-lg px-10 py-8 h-auto font-oswald uppercase tracking-wider shadow-[0_0_30px_rgba(234,88,12,0.4)] animate-pulse"
                >
                  <a href={COTIZAR_URL} target="_blank" rel="noopener noreferrer">
                    Ver Disponibilidad
                  </a>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* C. THE EXPERIENCES */}
        <section id="experiencias" className="py-24 bg-stone-950 container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-oswald text-4xl font-bold text-white mb-4 uppercase">Nuestros Planes</h2>
            <Separator className="w-20 bg-orange-600 h-1 mx-auto rounded-full" />
            <p className="mt-4 text-stone-400">Desde una junta relajada hasta una celebración inolvidable.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {/* TIER 1 */}
            <Card className="bg-stone-900 border-stone-800 flex flex-col">
              <CardHeader>
                <CardTitle className="font-oswald text-2xl text-white">Fuego Criollo</CardTitle>
                <CardDescription className="text-stone-400">Ideal para juntas casuales.</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3 text-sm text-stone-300">
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" /> Punta de Ganso</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" /> Costillar de Cerdo</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" /> Chorizos & Prietas</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-stone-600 shrink-0 mt-0.5" /> Picoteo Básico</li>
                </ul>
              </CardContent>
            </Card>

            {/* TIER 2 */}
            <Card className="bg-stone-900 border-orange-600/30 relative flex flex-col shadow-[0_0_20px_rgba(0,0,0,0.4)]">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge className="bg-orange-600 hover:bg-orange-700 text-white font-bold border-none">EL FAVORITO</Badge>
              </div>
              <CardHeader>
                <CardTitle className="font-oswald text-2xl text-white">Fuego Total</CardTitle>
                <CardDescription className="text-stone-400">El rey de los cumpleaños.</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3 text-sm text-stone-300">
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" /> <strong>Lomo Vetado Angus</strong></li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" /> Entraña Americana</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" /> Papas al Plomo / Ensaladas</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" /> Maestro Asador Exclusivo</li>
                </ul>
              </CardContent>
            </Card>

            {/* TIER 3 */}
            <Card className="bg-stone-900 border-stone-800 flex flex-col">
              <CardHeader>
                <CardTitle className="font-oswald text-2xl text-white">Fuego Premium</CardTitle>
                <CardDescription className="text-stone-400">Para sorprender a todos.</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3 text-sm text-stone-300">
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" /> Cortes Fuego Total</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" /> <strong>Buffet de Ensaladas</strong></li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" /> Salsas Caseras</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" /> Postres al rescoldo</li>
                </ul>
              </CardContent>
            </Card>

            {/* TIER 4 */}
            <Card className="bg-gradient-to-br from-stone-900 to-stone-800 border-orange-500/60 flex flex-col relative overflow-hidden">
               <div className="absolute top-0 right-0 bg-orange-600 text-white text-[10px] font-bold px-2 py-1 uppercase">Lujo</div>
              <CardHeader>
                <div className="flex items-center gap-2 mb-1">
                   <Flame className="text-orange-500 h-5 w-5 fill-orange-500 animate-pulse" />
                </div>
                <CardTitle className="font-oswald text-2xl text-white">Extra Premium</CardTitle>
                <CardDescription className="text-stone-400">La experiencia definitiva.</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3 text-sm text-stone-200 font-medium">
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-orange-500 shrink-0 mt-0.5" /> <strong>Cordero al Palo</strong> (En vivo)</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-orange-500 shrink-0 mt-0.5" /> Buffet Italiano Completo</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-orange-500 shrink-0 mt-0.5" /> Cortes Tomahawk</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-orange-500 shrink-0 mt-0.5" /> Servicio VIP</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* E. DISCLAIMER (Igual de importante) */}
        <section className="container mx-auto px-4 mb-24">
          <Alert className="bg-stone-900 border-orange-900/50 text-stone-300">
            <AlertCircle className="h-5 w-5 text-orange-600" />
            <AlertTitle className="text-orange-500 font-oswald uppercase tracking-wide ml-2">Antes de reservar</AlertTitle>
            <AlertDescription className="ml-2 text-stone-400">
              Nos enfocamos 100% en la gastronomía. 
              <span className="text-stone-200 font-medium"> No incluimos vajilla, cubiertos ni mesas.</span> Solo llevamos el sabor y el fuego.
            </AlertDescription>
          </Alert>
        </section>

        {/* D. ZONES */}
        <section id="zonas" className="py-20 bg-stone-900/50 border-y border-stone-800">
            <div className="container mx-auto px-4 text-center">
                <h2 className="font-oswald text-3xl font-bold text-white mb-8 uppercase">Vamos a tu casa</h2>
                <div className="flex flex-wrap justify-center gap-4 md:gap-12 text-stone-300">
                    <div className="flex items-center gap-2">
                        <MapPin className="text-orange-600 h-5 w-5" /> Santiago Oriente
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPin className="text-orange-600 h-5 w-5" /> Chicureo / Colina
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPin className="text-orange-600 h-5 w-5" /> Melipilla / Talagante
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPin className="text-orange-600 h-5 w-5" /> Viña / Valpo
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPin className="text-orange-600 h-5 w-5" /> Rancagua
                    </div>
                </div>
            </div>
        </section>

        {/* F. CUMPLEAÑOS & MATRIMONIOS (REEMPLAZO DE CORPORATIVO) */}
        <section className="py-24 container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Lado Izquierdo: Cumpleaños/Juntas */}
                <div className="bg-stone-900 border border-stone-800 p-8 rounded-xl hover:border-orange-600/30 transition-colors">
                    <Home className="h-10 w-10 text-orange-600 mb-4" />
                    <h3 className="text-2xl font-oswald font-bold text-white mb-2">Cumpleaños & Juntas</h3>
                    <p className="text-stone-400 mb-4">¿Te toca ser anfitrión? Olvídate de estar pegado a la parrilla y disfruta con tus amigos.</p>
                    <ul className="text-sm text-stone-500 space-y-2 mb-6">
                        <li className="flex items-center gap-2"><Check className="h-3 w-3 text-orange-600" /> Desde 15 personas</li>
                        <li className="flex items-center gap-2"><Check className="h-3 w-3 text-orange-600" /> Parrilleros buena onda y pro</li>
                    </ul>
                    <Button variant="link" className="text-orange-500 p-0 h-auto font-bold" asChild>
                        <a href={COTIZAR_URL}>Cotizar mi Cumpleaños &rarr;</a>
                    </Button>
                </div>

                {/* Lado Derecho: Eventos Especiales */}
                <div className="bg-stone-900 border border-stone-800 p-8 rounded-xl hover:border-orange-600/30 transition-colors">
                    <GlassWater className="h-10 w-10 text-orange-600 mb-4" />
                    <h3 className="text-2xl font-oswald font-bold text-white mb-2">Matrimonios Civiles</h3>
                    <p className="text-stone-400 mb-4">Celebraciones íntimas en el patio de casa o parcelas. Un toque rústico y elegante.</p>
                    <ul className="text-sm text-stone-500 space-y-2 mb-6">
                        <li className="flex items-center gap-2"><Check className="h-3 w-3 text-orange-600" /> Show de Cordero al Palo</li>
                        <li className="flex items-center gap-2"><Check className="h-3 w-3 text-orange-600" /> Montaje rústico del buffet</li>
                    </ul>
                    <Button variant="link" className="text-orange-500 p-0 h-auto font-bold" asChild>
                        <a href={COTIZAR_URL}>Cotizar Matrimonio Civil &rarr;</a>
                    </Button>
                </div>
            </div>
        </section>

        {/* G. FAQ (Sin Factura) */}
        <section id="faq" className="py-16 bg-stone-950 max-w-2xl mx-auto px-4">
            <h2 className="text-3xl font-oswald font-bold text-white text-center mb-8">PREGUNTAS FRECUENTES</h2>
            <Accordion type="single" collapsible className="w-full space-y-4">
                <AccordionItem value="item-1" className="border-stone-800 bg-stone-900/50 px-4 rounded-lg">
                    <AccordionTrigger className="text-stone-200 hover:text-orange-500 hover:no-underline">¿Tienen un mínimo de personas?</AccordionTrigger>
                    <AccordionContent className="text-stone-400">
                        Sí, para poder movilizar a nuestro equipo y asegurar la calidad, trabajamos con un mínimo base de **15 personas** (o el equivalente en consumo).
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2" className="border-stone-800 bg-stone-900/50 px-4 rounded-lg">
                    <AccordionTrigger className="text-stone-200 hover:text-orange-500 hover:no-underline">¿Qué necesitan en mi casa?</AccordionTrigger>
                    <AccordionContent className="text-stone-400">
                        Solo necesitamos acceso a la zona de parrilla (o un espacio para montar las nuestras) y una mesa de apoyo. Nosotros llevamos el carbón y los insumos.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3" className="border-stone-800 bg-stone-900/50 px-4 rounded-lg">
                    <AccordionTrigger className="text-stone-200 hover:text-orange-500 hover:no-underline">¿Cómo funciona el pago?</AccordionTrigger>
                    <AccordionContent className="text-stone-400">
                        Se reserva la fecha con el 50% de transferencia y el saldo se paga el día del evento antes de iniciar el servicio.
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
              
              <div className="flex gap-6">
                  <a href="https://instagram.com" className="text-stone-500 hover:text-orange-600 transition-colors"><Instagram className="h-5 w-5" /></a>
                  <a href={COTIZAR_URL} className="text-stone-500 hover:text-orange-600 transition-colors"><ChefHat className="h-5 w-5" /></a>
              </div>

              <p className="text-stone-600 text-xs">
                  © {new Date().getFullYear()} Socios del Fuego. Todos los derechos reservados.
              </p>
          </div>
      </footer>
    </div>
  );
}