import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/', // Ejemplo de ruta bloqueada
    },
    sitemap: 'https://sociosdelfuego.cl/sitemap.xml', // CAMBIA POR TU DOMINIO
  }
}