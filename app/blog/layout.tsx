import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";
import { trackCotizacion } from "@/lib/utils"; // Ajusta la ruta si es necesario

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-stone-950">
      {/* BARRA DE NAVEGACIÓN DEL BLOG */}
      <nav className="fixed top-0 z-50 w-full border-b border-stone-800 bg-stone-950/90 backdrop-blur-md">
        <div className="container mx-auto flex h-20 items-center justify-between px-4">
          
          {/* Lado Izquierdo: Logo y Volver */}
          <div className="flex items-center gap-6">
            <Link href="/" className="group flex items-center gap-2">
              <div className="relative h-10 w-10 overflow-hidden rounded-full border border-orange-600/20 group-hover:border-orange-600 transition-colors">
                <Image
                  src="/logo.webp"
                  alt="Logo Socios del Fuego"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="hidden md:block font-oswald text-xl font-bold tracking-wide text-white uppercase group-hover:text-orange-500 transition-colors">
                Socios del Fuego
              </span>
            </Link>
            
            {/* Separador vertical */}
            <div className="h-6 w-px bg-stone-800 hidden md:block"></div>

            <Link 
              href="/" 
              className="flex items-center text-sm font-medium text-stone-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="mr-1 h-4 w-4" /> Volver al Inicio
            </Link>
          </div>

          {/* Lado Derecho: Botones */}
          <div className="flex items-center gap-4">
             <Button asChild variant="ghost" className="hidden md:inline-flex text-stone-300 hover:text-orange-500 hover:bg-stone-900/50">
                <Link href="/blog">
                   Todos los Artículos
                </Link>
             </Button>
             <Button asChild className="bg-orange-600 hover:bg-orange-700 text-white font-oswald uppercase tracking-wider">
                <a href="https://socios-del-fuego.web.app/?v=cotizar" target="_blank" rel="noopener noreferrer" >
                   Cotizar
                </a>
             </Button>
          </div>
        </div>
      </nav>

      {/* Aquí se renderiza el contenido de tu blog (lista o post) */}
      <div className="pt-20"> 
        {children}
      </div>
    </div>
  );
}