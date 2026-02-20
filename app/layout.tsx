import type { Metadata, Viewport } from "next";
import { Inter, Oswald } from "next/font/google";
// 1. IMPORTAR ANALYTICS DE VERCEL
import { Analytics } from "@vercel/analytics/react";
// 2. IMPORTAR COMPONENTE SCRIPT
import Script from "next/script";
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
  description:
    "Servicio de asado a domicilio en Melipilla, Santiago, Litoral Central y V Región. Planes desde $20.000 p/p. Especialistas en Cordero al Palo.",
  keywords: [
    "asado a domicilio melipilla",
    "parrillero santiago",
    "cordero al palo a domicilio",
    "asado litoral central",
    "catering asado rancagua",
  ],
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: "https://sociosdelfuego.cl",
    title: "Socios del Fuego | Tu Parrillero Privado",
    description:
      "Llevamos la parrilla y los insumos. Tú solo disfruta. Cobertura en Zona Central.",
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
  verification: {
    google: "NiSX12KwWb_hi1hTK-vk99i2PGqEw7CZs8cVyaFrtc8",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 1. SCHEMA DE NEGOCIO (FoodEstablishment) - Mantiene tu SEO local
  const jsonLdBusiness = {
    "@context": "https://schema.org",
    "@type": "FoodEstablishment",
    name: "Socios del Fuego",
    image: [
      "https://sociosdelfuego.cl/logo.png",
      "https://sociosdelfuego.cl/cordero.jpg",
    ],
    "@id": "https://sociosdelfuego.cl",
    url: "https://sociosdelfuego.cl",
    telephone: "+56997093569",
    priceRange: "$$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Melipilla",
      addressRegion: "Región Metropolitana",
      addressCountry: "CL",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -33.6888,
      longitude: -71.2163,
    },
    areaServed: [
      { "@type": "City", name: "Melipilla" },
      { "@type": "City", name: "Las Condes" },
      { "@type": "City", name: "Vitacura" },
      { "@type": "City", name: "Chicureo" },
      { "@type": "AdministrativeArea", name: "Valparaíso" },
      { "@type": "AdministrativeArea", name: "O'Higgins" },
    ],
    servesCuisine: "Asado Chileno, BBQ Premium",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "09:00",
      closes: "22:00",
    },
    menu: "https://socios-del-fuego.web.app/?v=cotizar",
    acceptsReservations: "True",
  };

  // 2. SCHEMA DE SITIO WEB (WebSite) - ESTE ES EL PARCHE PARA GOOGLE
  const jsonLdWebsite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Socios del Fuego",
    alternateName: ["Asados Socios del Fuego", "SociosDelFuego"],
    url: "https://sociosdelfuego.cl",
  };

  return (
    <html lang="es" className="dark scroll-smooth">
      <body
        className={`${inter.variable} ${oswald.variable} antialiased bg-stone-950 text-stone-50`}
      >
        {/* --- GOOGLE ANALYTICS (GA4) --- */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-B5PB45XGP9"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            // CONFIGURACIÓN MEJORADA: 
            // - Mantiene el rastreo de página estándar.
            // - Asegura que los enlaces al cotizador no rompan la sesión.
            gtag('config', 'G-B5PB45XGP9', {
              page_path: window.location.pathname,
              send_page_view: true,
              cookie_flags: 'SameSite=None;Secure' // Crucial para que GA4 reconozca al usuario cuando pase de .cl a .web.app
            });
          `}
        </Script>


        {/* --- META PIXEL (NUEVO ID) --- */}
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
    !function(f,b,e,v,n,t,s){
      if(f.fbq) return;
      n = f.fbq = function(){
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if(!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e); t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s);
    }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '1290748873104371');
    fbq('track', 'PageView');
  `}
        </Script>
        <noscript
          dangerouslySetInnerHTML={{
            __html: '<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=1290748873104371&ev=PageView&noscript=1" />'
          }}
        />

        {/* --- MICROSOFT CLARITY --- */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "vbccy2dm24");
          `}
        </Script>

        {/* INYECCIÓN 1: DATOS DEL NEGOCIO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBusiness) }}
        />

        {/* INYECCIÓN 2: DATOS DEL SITIO WEB (NOMBRE CORRECTO) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }}
        />

        {children}

        {/* VERCEL ANALYTICS */}
        <Analytics />
      </body>
    </html>
  );
}
