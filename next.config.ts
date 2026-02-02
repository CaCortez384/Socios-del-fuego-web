/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Obligatorio para generar HTML estático
  images: {
    unoptimized: true, // Obligatorio si no usas un servicio externo (Cloudinary/Vercel Pro)
  },
};

export default nextConfig;