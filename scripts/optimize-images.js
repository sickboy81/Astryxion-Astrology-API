/**
 * Script Node.js para otimizar imagens
 * Requer: npm install sharp
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const ASSETS_DIR = path.join(__dirname, '..', 'landing', 'assets');

async function optimizeImages() {
  try {
    // Criar WebP com diferentes tamanhos
    const sizes = [
      { width: 1920, suffix: '', quality: 85 },
      { width: 1200, suffix: '-1200', quality: 80 },
      { width: 800, suffix: '-800', quality: 75 },
      { width: 600, suffix: '-mobile', quality: 70 }
    ];

    const inputFile = path.join(ASSETS_DIR, 'hero-bg.png');

    for (const size of sizes) {
      const outputFile = path.join(ASSETS_DIR, `hero-bg${size.suffix}.webp`);

      await sharp(inputFile)
        .resize(size.width, null, { withoutEnlargement: true })
        .webp({ quality: size.quality, effort: 6 })
        .toFile(outputFile);

      const stats = fs.statSync(outputFile);
      console.log(`✓ ${path.basename(outputFile)}: ${(stats.size / 1024).toFixed(1)}KB`);
    }

    // Versão PNG otimizada para fallback
    const outputPng = path.join(ASSETS_DIR, 'hero-bg-optimized.png');
    await sharp(inputFile)
      .resize(1920, null, { withoutEnlargement: true })
      .png({ quality: 85, compressionLevel: 9 })
      .toFile(outputPng);

    console.log(`\n✓ Otimização concluída!`);

    const original = fs.statSync(inputFile);
    const webp = fs.statSync(path.join(ASSETS_DIR, 'hero-bg.webp'));
    console.log(`Original: ${(original.size / 1024).toFixed(1)}KB`);
    console.log(`WebP: ${(webp.size / 1024).toFixed(1)}KB (${(100 - (webp.size/original.size)*100).toFixed(0)}% menor)`);

  } catch (err) {
    console.error('Erro:', err.message);
    console.log('\nInstale o sharp: npm install sharp');
  }
}

optimizeImages();
