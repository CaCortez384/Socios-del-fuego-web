import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import axios from 'axios';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_DIR = path.join(__dirname, '..', 'public');

async function downloadImage(url, outputPath) {
  const writer = fs.createWriteStream(outputPath);
  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream'
  });

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
}

async function run() {
  console.log('--- Iniciando optimización de imágenes ---');
  
  // 1. Hero Image (Already downloaded/processed on first run, but we can do it again or skip)
  const heroFinalPath = path.join(PUBLIC_DIR, 'hero-bg.webp');
  if (!fs.existsSync(heroFinalPath)) {
    const heroUrl = 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2000&auto=format&fit=crop';
    const heroTempPath = path.join(PUBLIC_DIR, 'hero-temp.jpg');
    
    console.log('Descargando imagen Hero...');
    await downloadImage(heroUrl, heroTempPath);
    
    console.log('Procesando imagen Hero...');
    await sharp(heroTempPath)
      .resize(1920, null, { withoutEnlargement: true }) // Max width 1920
      .webp({ quality: 80, effort: 6 })
      .toFile(heroFinalPath);
    
    fs.unlinkSync(heroTempPath);
    console.log('✅ Hero image optimized');
  } else {
    console.log('✅ Hero image already optimized');
  }

  // 2. Cordero Image
  const corderoPath = path.join(PUBLIC_DIR, 'cordero.webp');
  const corderoTempPath = path.join(PUBLIC_DIR, 'cordero-temp.webp'); // The one we failed to unlink
  const corderoOutPath = path.join(PUBLIC_DIR, 'cordero-out.webp');
  
  const corderoSource = fs.existsSync(corderoTempPath) ? corderoTempPath : corderoPath;

  if (fs.existsSync(corderoSource)) {
    console.log('Procesando imagen Cordero...');
    await sharp(corderoSource)
      .resize(800, null, { withoutEnlargement: true })
      .webp({ quality: 80, effort: 6 })
      .toFile(corderoOutPath);
      
    // Force garbage collection if needed or wait a bit? sharp usually closes file after toFile resolves.
    fs.copyFileSync(corderoOutPath, corderoPath);
    fs.unlinkSync(corderoOutPath);
    
    try {
      if (fs.existsSync(corderoTempPath)) fs.unlinkSync(corderoTempPath);
    } catch(e) {}
    console.log('✅ Cordero image optimized');
  } else {
    console.log('⚠️ cordero.webp no encontrada');
  }

  // 3. Logo Image
  const logoPath = path.join(PUBLIC_DIR, 'logo.webp');
  const logoOutPath = path.join(PUBLIC_DIR, 'logo-out.webp');
  if (fs.existsSync(logoPath)) {
    console.log('Procesando imagen Logo...');
    await sharp(logoPath)
      .resize(150, null, { withoutEnlargement: true })
      .webp({ quality: 90, effort: 6 })
      .toFile(logoOutPath);
      
    fs.copyFileSync(logoOutPath, logoPath);
    fs.unlinkSync(logoOutPath);
    console.log('✅ Logo image optimized');
  } else {
    console.log('⚠️ logo.webp no encontrada');
  }

  console.log('--- Optimización completada ---');
}

run().catch(console.error);
