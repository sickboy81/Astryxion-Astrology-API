export const ZODIAC_SIGNS = [
  "Áries", "Touro", "Gêmeos", "Câncer", "Leão", "Virgem",
  "Libra", "Escorpião", "Sagitário", "Capricórnio", "Aquário", "Peixes",
] as const;

export const PLANET_NAMES_PT: Record<string, string> = {
  Sun: "Sol", Moon: "Lua", Mercury: "Mercúrio", Venus: "Vênus", Mars: "Marte",
  Jupiter: "Júpiter", Saturn: "Saturno", Uranus: "Urano", Neptune: "Netuno", Pluto: "Plutão",
  Chiron: "Quíron", Lilith: "Lilith", Ceres: "Ceres", Pallas: "Palas", Juno: "Juno", Vesta: "Vesta",
  NorthNode: "Nodo Norte", SouthNode: "Nodo Sul", PartOfFortune: "Parte da Fortuna",
};

export const SIGN_RULERS: Record<string, string> = {
  "Áries": "Marte", "Touro": "Vênus", "Gêmeos": "Mercúrio", "Câncer": "Lua",
  "Leão": "Sol", "Virgem": "Mercúrio", "Libra": "Vênus", "Escorpião": "Plutão",
  "Sagitário": "Júpiter", "Capricórnio": "Saturno", "Aquário": "Urano", "Peixes": "Netuno",
};

export const PLANETARY_DIGNITIES: Record<string, { domicile: string; exaltation: string; fall: string; detriment: string }> = {
  "Sol": { domicile: "Leão", exaltation: "Áries", fall: "Libra", detriment: "Aquário" },
  "Lua": { domicile: "Câncer", exaltation: "Touro", fall: "Escorpião", detriment: "Capricórnio" },
  "Mercúrio": { domicile: "Gêmeos", exaltation: "Aquário", fall: "Sagitário", detriment: "Sagitário" },
  "Vênus": { domicile: "Libra", exaltation: "Peixes", fall: "Virgem", detriment: "Áries" },
  "Marte": { domicile: "Áries", exaltation: "Capricórnio", fall: "Câncer", detriment: "Libra" },
  "Júpiter": { domicile: "Sagitário", exaltation: "Câncer", fall: "Capricórnio", detriment: "Gêmeos" },
  "Saturno": { domicile: "Capricórnio", exaltation: "Libra", fall: "Áries", detriment: "Câncer" },
  "Urano": { domicile: "Aquário", exaltation: "Escorpião", fall: "Leão", detriment: "Leão" },
  "Netuno": { domicile: "Peixes", exaltation: "Leão", fall: "Aquário", detriment: "Virgem" },
  "Plutão": { domicile: "Escorpião", exaltation: "Áries", fall: "Touro", detriment: "Touro" },
};

export const FIXED_STARS = [
  { name: "Regulus", longitude: 149.83, magnitude: 1.35, nature: "Júpiter/Marte" },
  { name: "Spica", longitude: 203.93, magnitude: 0.98, nature: "Vênus/Mercúrio" },
  { name: "Antares", longitude: 239.58, magnitude: 0.96, nature: "Marte/Júpiter" },
  { name: "Algol", longitude: 25.97, magnitude: 2.12, nature: "Saturno/Júpiter" },
  { name: "Aldebaran", longitude: 69.67, magnitude: 0.85, nature: "Marte/Mercúrio" },
  { name: "Sirius", longitude: 103.98, magnitude: -1.46, nature: "Júpiter/Marte" },
  { name: "Vega", longitude: 285.33, magnitude: 0.03, nature: "Vênus/Mercúrio" },
  { name: "Arcturus", longitude: 203.08, magnitude: -0.05, nature: "Vênus/Marte" },
  { name: "Capella", longitude: 81.67, magnitude: 0.08, nature: "Mercúrio/Marte" },
  { name: "Rigel", longitude: 76.67, magnitude: 0.12, nature: "Júpiter/Saturno" },
  { name: "Betelgeuse", longitude: 88.58, magnitude: 0.42, nature: "Marte/Júpiter" },
  { name: "Pollux", longitude: 113.17, magnitude: 1.14, nature: "Saturno/Marte" },
  { name: "Procyon", longitude: 125.75, magnitude: 0.34, nature: "Mercúrio/Marte" },
  { name: "Fomalhaut", longitude: 331.67, magnitude: 1.16, nature: "Mercúrio/Vênus" },
  { name: "Deneb", longitude: 329.58, magnitude: 1.25, nature: "Saturno/Mercúrio" },
  { name: "Achernar", longitude: 15.17, magnitude: 0.46, nature: "Júpiter/Mercúrio" },
  { name: "Canopus", longitude: 95.08, magnitude: -0.74, nature: "Vênus/Mercúrio" },
  { name: "Castor", longitude: 110.17, magnitude: 1.58, nature: "Mercúrio/Saturno" },
  { name: "Alcyone", longitude: 60.08, magnitude: 1.62, nature: "Lua/Marte" },
  { name: "Polaris", longitude: 63.58, magnitude: 1.98, nature: "Mercúrio/Saturno" },
];

const SEPTILE = 360 / 7;

export const ASPECT_TYPES = [
  { name: "conjunction", angle: 0, orb: 8, symbol: "☌" },
  { name: "sextile", angle: 60, orb: 6, symbol: "⚹" },
  { name: "square", angle: 90, orb: 7, symbol: "□" },
  { name: "trine", angle: 120, orb: 8, symbol: "△" },
  { name: "opposition", angle: 180, orb: 8, symbol: "☍" },
  { name: "quincunx", angle: 150, orb: 3, symbol: "⚻" },
  { name: "semisextile", angle: 30, orb: 2, symbol: "⚺" },
  { name: "semisquare", angle: 45, orb: 2, symbol: "∠" },
  { name: "sesquiquadrate", angle: 135, orb: 3, symbol: "∟" },
  { name: "quintile", angle: 72, orb: 2, symbol: "Q" },
  { name: "biquintile", angle: 144, orb: 2, symbol: "bQ" },
  { name: "septile", angle: SEPTILE, orb: 1.5, symbol: "S7" },
] as const;
