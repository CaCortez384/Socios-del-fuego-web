import type { Metadata, Viewport } from "next";
import { Inter, Oswald } from "next/font/google";
// 1. IMPORTAR ANALYTICS AQUÍ
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });

export const viewport: Viewport = {
  themeColor: "#0c0a09",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://sociosdelfuego.cl"),
  title: {
    default: "Socios del Fuego | Asados Premium a Domicilio",
    template: "%s | Socios del Fuego",
  },
  description: "Servicio de asado a domicilio en Melipilla, Santiago, Litoral Central y V Región. Planes desde $20.000 p/p. Especialistas en Cordero al Palo.",
  keywords: ["asado a domicilio melipilla", "parrillero santiago", "cordero al palo a domicilio", "asado litoral central", "catering asado rancagua"],
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: "https://sociosdelfuego.cl",
    title: "Socios del Fuego | Tu Parrillero Privado",
    description: "Llevamos la parrilla y los insumos. Tú solo disfruta. Cobertura en Zona Central.",
    siteName: "Socios del Fuego",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Socios del Fuego Asados",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Definición de Datos Estructurados (Schema.org)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FoodEstablishment",
    "name": "Socios del Fuego",
    "image": [
      "https://sociosdelfuego.cl/logo.png",
      "https://sociosdelfuego.cl/cordero.jpg"
    ],
    "@id": "https://sociosdelfuego.cl",
    "url": "https://sociosdelfuego.cl",
    "telephone": "+56997093569",
    "priceRange": "$$$",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Melipilla",
      "addressRegion": "Región Metropolitana",
      "addressCountry": "CL"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -33.6888,
      "longitude": -71.2163
    },
    "areaServed": [
      { "@type": "City", "name": "Melipilla" },
      { "@type": "City", "name": "Las Condes" },
      { "@type": "City", "name": "Vitacura" },
      { "@type": "City", "name": "Chicureo" },
      { "@type": "AdministrativeArea", "name": "Valparaíso" },
      { "@type": "AdministrativeArea", "name": "O'Higgins" }
    ],
    "servesCuisine": "Asado Chileno, BBQ Premium",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
      ],
      "opens": "09:00",
      "closes": "22:00"
    },
    "menu": "https://socios-del-fuego.web.app/?v=cotizar",
    "acceptsReservations": "True"
  };

  return (
    <html lang="es" className="dark scroll-smooth">
      <body className={`${inter.variable} ${oswald.variable} antialiased bg-stone-950 text-stone-50`}>
        {/* Inyección del JSON-LD para Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
        {children}

        {/* 2. COMPONENTE ANALYTICS AL FINAL */}
        <Analytics />
      </body>
    </html>
  );
}