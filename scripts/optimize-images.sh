#!/bin/bash
# Script para otimizar imagens da landing page
# Requer: cwebp, ImageMagick (convert)

echo "Otimizando imagens para WebP..."

# Verificar ferramentas
if ! command -v cwebp &> /dev/null; then
    echo "Erro: cwebp não instalado. Instale: https://developers.google.com/speed/webp/download"
    exit 1
fi

if ! command -v convert &> /dev/null; then
    echo "Erro: ImageMagick não instalado."
    exit 1
fi

ASSETS_DIR="landing/assets"

# Hero background - múltiplas versões
echo "Convertendo hero-bg.png..."
cwebp -q 85 -resize 1920 0 "$ASSETS_DIR/hero-bg.png" -o "$ASSETS_DIR/hero-bg.webp"
cwebp -q 80 -resize 1200 0 "$ASSETS_DIR/hero-bg.png" -o "$ASSETS_DIR/hero-bg-1200.webp"
cwebp -q 75 -resize 800 0 "$ASSETS_DIR/hero-bg.png" -o "$ASSETS_DIR/hero-bg-800.webp"
cwebp -q 70 -resize 600 0 "$ASSETS_DIR/hero-bg.png" -o "$ASSETS_DIR/hero-bg-mobile.webp"

# Criar versões otimizadas PNG para fallback
convert "$ASSETS_DIR/hero-bg.png" -quality 85 -resize 1920x1080\> "$ASSETS_DIR/hero-bg-optimized.png"

echo "Otimização concluída!"
echo ""
echo "Antes: $(du -h $ASSETS_DIR/hero-bg.png | cut -f1)"
echo "Depois (WebP): $(du -h $ASSETS_DIR/hero-bg.webp | cut -f1)"
