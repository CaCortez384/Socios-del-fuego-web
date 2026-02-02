import { MetadataRoute } from 'next'

// ESTA LÍNEA ES LA SOLUCIÓN:
export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: 'https://socios-del-fuego.vercel.app/sitemap.xml',
  }
}