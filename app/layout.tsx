import type { Metadata, Viewport } from "next";
import { Inter, Oswald } from "next/font/google";
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
  description: "Llevamos la experiencia del asado premium a tu casa. Especialistas en cumpleaños, juntas de amigos y matrimonios civiles. Tú pones la casa, nosotros el fuego.",
  keywords: ["asado a domicilio", "parrillero casa", "cumpleaños asado", "matrimonio civil casa", "asado premium santiago", "evento particular"],
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: "https://sociosdelfuego.cl",
    title: "Socios del Fuego | Tu Parrillero Privado",
    description: "Olvídate de la parrilla y disfruta a tus invitados. Asados premium a domicilio.",
    siteName: "Socios del Fuego",
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
  return (
    <html lang="es" className="dark scroll-smooth">
      <body className={`${inter.variable} ${oswald.variable} antialiased bg-stone-950 text-stone-50`}>
        {children}
      </body>
    </html>
  );
}