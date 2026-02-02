import { MetadataRoute } from 'next'

// CAMBIA ESTO POR TU DOMINIO REAL
const BASE_URL = 'https://sociosdelfuego.cl' 

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    // Si tuvieras más páginas, irían aquí
  ]
}