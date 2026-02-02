/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Genera HTML/CSS/JS estático en la carpeta 'out'
  images: {
    unoptimized: true, // Necesario para 'export' si no usamos Cloudinary/Imgix
  },
};

export default nextConfig;