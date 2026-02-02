// app/blog/[slug]/page.tsx
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown"; // Asegúrate de haber instalado: npm install react-markdown
import { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft, CalendarDays, User } from "lucide-react";
import { Separator } from "@/components/ui/separator";

// IMPORTANTE: Esto permite que 'output: export' funcione con rutas dinámicas.
// Next.js necesita saber de antemano qué slugs existen (ej: 'calculo-asado', 'tipos-carbon')
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Generar SEO dinámico para cada artículo
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  // En Next.js 15 params es una promesa, pero en versiones previas es objeto directo.
  // Si te da error de tipo, usa: const { slug } = await params;
  const { slug } = await params; 
  const post = getPostBySlug(slug);
  
  if (!post) return {};

  return {
    title: `${post.title} | Blog Socios del Fuego`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: ["Socios del Fuego"],
    },
  };
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Schema.org para Google (SEO Técnico)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "image": "https://sociosdelfuego.cl/og-image.jpg",
    "author": {
      "@type": "Organization",
      "name": "Socios del Fuego"
    },
    "datePublished": post.date,
    "description": post.excerpt
  };

  return (
    <article className="min-h-screen bg-stone-950 font-sans pt-24 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container mx-auto px-4 max-w-3xl">
        {/* Botón Volver */}
        <Link href="/blog" className="inline-flex items-center text-orange-500 hover:text-orange-400 mb-8 transition-colors">
          <ChevronLeft className="h-4 w-4 mr-1" /> Volver al Blog
        </Link>

        {/* Encabezado del Artículo */}
        <header className="mb-10 text-center">
          <div className="flex justify-center gap-4 text-stone-500 text-sm mb-4">
             <span className="flex items-center gap-1"><CalendarDays className="h-4 w-4" /> {post.date}</span>
             <span className="flex items-center gap-1"><User className="h-4 w-4" /> Socios del Fuego</span>
          </div>
          <h1 className="font-oswald text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {post.title}
          </h1>
          <p className="text-xl text-stone-400 italic">
            {post.excerpt}
          </p>
        </header>

        <Separator className="bg-stone-800 mb-10" />

        {/* Contenido Markdown Renderizado */}
        <div className="prose prose-invert prose-orange max-w-none 
          prose-headings:font-oswald prose-headings:uppercase prose-h2:text-orange-500 prose-h2:mt-10
          prose-p:text-stone-300 prose-p:leading-relaxed prose-strong:text-white
          prose-li:text-stone-300 prose-blockquote:border-orange-600 prose-blockquote:bg-stone-900 prose-blockquote:py-2 prose-blockquote:px-4">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>

        {/* CTA Final para convertir lectores en clientes */}
        <div className="mt-16 p-8 bg-stone-900 border border-stone-800 rounded-xl text-center">
            <h3 className="font-oswald text-2xl text-white mb-2">¿Te dio hambre leer esto?</h3>
            <p className="text-stone-400 mb-6">Deja que nosotros nos encarguemos del fuego en tu próximo evento.</p>
            <Link href="/" className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-lg inline-block transition-colors">
                Cotizar un Asado
            </Link>
        </div>
      </div>
    </article>
  );
}