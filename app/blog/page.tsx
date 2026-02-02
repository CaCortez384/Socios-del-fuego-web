import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, ArrowRight } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog Parrillero | Tips y Secretos de Socios del Fuego",
  description: "Aprende los secretos del asado perfecto, cálculos de carne y recetas con nuestros expertos parrilleros.",
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-stone-950 font-sans pt-20 pb-24">
      <div className="container mx-auto px-4">
        
        {/* Header del Blog */}
        <div className="text-center mb-16">
          <h1 className="font-oswald text-4xl md:text-6xl font-bold text-white mb-4 uppercase">
            Cultura <span className="text-orange-600">Parrillera</span>
          </h1>
          <p className="text-stone-400 max-w-2xl mx-auto">
            Guías, consejos y secretos para que te conviertas en un experto del fuego.
          </p>
        </div>

        {/* Grid de Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
              <Card className="bg-stone-900 border-stone-800 hover:border-orange-600/50 transition-all h-full flex flex-col overflow-hidden group-hover:shadow-lg group-hover:shadow-orange-900/20">
                {/* Imagen Placeholder (Si no tienes imagen real en el post, usa un fallback) */}
                <div className="h-48 bg-stone-800 relative overflow-hidden">
                   <div className="absolute inset-0 bg-stone-700 group-hover:scale-105 transition-transform duration-500" /> 
                   {/* Aquí iría <Image src={post.image} ... /> */}
                </div>
                
                <CardHeader>
                  <div className="flex justify-between items-center mb-2">
                     <Badge variant="outline" className="text-orange-500 border-orange-900/50 text-xs">
                        {post.tags?.[0] || "Blog"}
                     </Badge>
                     <div className="flex items-center text-stone-500 text-xs">
                        <CalendarDays className="h-3 w-3 mr-1" />
                        {post.date}
                     </div>
                  </div>
                  <CardTitle className="font-oswald text-xl text-white group-hover:text-orange-500 transition-colors line-clamp-2">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-stone-400 text-sm line-clamp-3">
                    {post.excerpt}
                  </p>
                </CardContent>
                <CardFooter>
                  <span className="text-orange-500 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                    Leer artículo <ArrowRight className="h-4 w-4" />
                  </span>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}