/**
 * Gera favicons, ícones PWA e screenshots do manifest a partir da cor de tema
 * e do hero existente. Executar na raiz: node scripts/generate-landing-icons.mjs
 */
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const assets = path.join(__dirname, "..", "landing", "assets");

/** Alinhado com theme_color em site.webmanifest */
const THEME = { r: 99, g: 102, b: 241, alpha: 1 };

const iconSizes = [72, 96, 128, 144, 152, 192, 384, 512];

async function main() {
  const buf512 = await sharp({
    create: { width: 512, height: 512, channels: 4, background: THEME },
  })
    .png()
    .toBuffer();

  for (const s of iconSizes) {
    await sharp(buf512).resize(s, s).png().toFile(path.join(assets, `icon-${s}x${s}.png`));
  }

  await sharp(buf512).resize(16, 16).png().toFile(path.join(assets, "favicon-16x16.png"));
  await sharp(buf512).resize(32, 32).png().toFile(path.join(assets, "favicon-32x32.png"));
  await sharp(buf512).resize(180, 180).png().toFile(path.join(assets, "apple-touch-icon.png"));
  await sharp(buf512).resize(256, 256).png().toFile(path.join(assets, "logo.png"));

  const hero = path.join(assets, "hero-bg-optimized.png");
  await sharp(hero)
    .resize(1280, 720, { fit: "cover", position: "centre" })
    .png()
    .toFile(path.join(assets, "screenshot-dashboard.png"));
  await sharp(hero)
    .resize(750, 1334, { fit: "cover", position: "centre" })
    .png()
    .toFile(path.join(assets, "screenshot-mobile.png"));

  console.log("OK: landing/assets — favicons, ícones PWA, logo e screenshots gerados.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
