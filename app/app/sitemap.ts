import { MetadataRoute } from 'next'

// ESTA LÍNEA ES LA SOLUCIÓN:
export const dynamic = 'force-static'

const BASE_URL = 'https://sociosdelfuego.cl' 

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    // Aquí puedes agregar tus rutas del blog si quieres, pero con esto basta para que compile
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]
}