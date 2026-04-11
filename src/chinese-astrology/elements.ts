import { LocalizedText, LocalizedList } from '../i18n.js';

export interface ChineseElement {
  name: string;
  displayName: LocalizedText;
  years: number[];
  personality: LocalizedText;
  characteristics: LocalizedList;
  compatibleElements: string[];
  incompatibleElements: string[];
  associatedSeason: LocalizedText;
  associatedDirection: LocalizedText;
  associatedColor: LocalizedText;
  associatedPlanet: LocalizedText;
  healthAspects: LocalizedList;
}

export const CHINESE_ELEMENTS: ChineseElement[] = [
  {
    name: 'wood',
    displayName: { pt: 'Madeira', en: 'Wood', es: 'Madera', hi: 'लकड़ी' },
    years: [], // Will follow the logic below
    personality: {
      pt: "Crescimento, expansão e criatividade. A Madeira representa a energia da primavera e do renascimento.",
      en: "Growth, expansion and creativity. Wood represents the energy of spring and rebirth.",
      es: "Crecimiento, expansión y creatividad. La Madera representa la energía de la primavera y el renacimiento.",
      hi: "विकास, विस्तार और रचनात्मकता। लकड़ी वसंत और पुनर्जन्म की ऊर्जा का प्रतिनिधित्व करती है।"
    },
    characteristics: {
      pt: ['Criativo', 'Expansivo', 'Cooperativo', 'Idealista', 'Generoso'],
      en: ['Creative', 'Expansive', 'Cooperative', 'Idealistic', 'Generous'],
      es: ['Creativo', 'Expansivo', 'Cooperativo', 'Idealista', 'Generoso'],
      hi: ['रचनात्मक', 'विस्तृत', 'सहकारी', 'आदर्शवादी', 'उदार'],
    },
    healthAspects: {
      pt: ['Fígado', 'Vesícula biliar', 'Olhos', 'Tendões'],
      en: ['Liver', 'Gallbladder', 'Eyes', 'Tendons'],
      es: ['Hígado', 'Vesícula biliar', 'Ojos', 'Tendones'],
      hi: ['लीवर', 'पित्ताशय', 'आंखें', 'टेंडन'],
    },
    compatibleElements: ['water', 'fire'],
    incompatibleElements: ['metal'],
    associatedSeason: {
      pt: 'Primavera', en: 'Spring', es: 'Primavera', hi: 'वसंत'
    },
    associatedDirection: {
      pt: 'Leste', en: 'East', es: 'Este', hi: 'पूर्व'
    },
    associatedColor: {
      pt: 'Verde', en: 'Green', es: 'Verde', hi: 'हरा'
    },
    associatedPlanet: {
      pt: 'Júpiter', en: 'Jupiter', es: 'Júpiter', hi: 'बृहस्पति'
    },
  },
  {
    name: 'fire',
    displayName: { pt: 'Fogo', en: 'Fire', es: 'Fuego', hi: 'आग' },
    years: [], // Will follow the logic below
    personality: {
      pt: "Paixão, dinamismo e liderança. O Fogo representa a energia do verão e da máxima expressão.",
      en: "Passion, dynamism and leadership. Fire represents the energy of summer and maximum expression.",
      es: "Pasión, dinamismo y liderazgo. El Fuego representa la energía del verano y la máxima expresión.",
      hi: "जुनून, गतिशीलता और नेतृत्व। अग्नि ग्रीष्म और अधिकतम अभिव्यक्ति की ऊर्जा का प्रतिनिधित्व करती है।"
    },
    characteristics: {
      pt: ['Passional', 'Dinâmico', 'Líder', 'Entusiasta', 'Corajoso'],
      en: ['Passionate', 'Dynamic', 'Leader', 'Enthusiastic', 'Brave'],
      es: ['Pasional', 'Dinámico', 'Líder', 'Entusiasta', 'Valiente'],
      hi: ['भावुक', 'गतिशील', 'नेता', 'उत्साही', 'साहसी'],
    },
    healthAspects: {
      pt: ['Coração', 'Intestino delgado', 'Língua', 'Vasos sanguíneos'],
      en: ['Heart', 'Small intestine', 'Tongue', 'Blood vessels'],
      es: ['Corazón', 'Intestino delgado', 'Lengua', 'Vasos sanguíneos'],
      hi: ['हृदय', 'छोटी आंत', 'जीभ', 'रक्त वाहिकाएं'],
    },
    compatibleElements: ['wood', 'earth'],
    incompatibleElements: ['water'],
    associatedSeason: {
      pt: 'Verão', en: 'Summer', es: 'Verano', hi: 'गर्मी'
    },
    associatedDirection: {
      pt: 'Sul', en: 'South', es: 'Sur', hi: 'दक्षिण'
    },
    associatedColor: {
      pt: 'Vermelho', en: 'Red', es: 'Rojo', hi: 'लाल'
    },
    associatedPlanet: {
      pt: 'Marte', en: 'Mars', es: 'Marte', hi: 'मंगल'
    },
  },
  {
    name: 'earth',
    displayName: { pt: 'Terra', en: 'Earth', es: 'Tierra', hi: 'पृथ्वी' },
    years: [], // Will follow the logic below
    personality: {
      pt: "Estabilidade, nutrição e confiabilidade. A Terra representa o centro e a harmonia.",
      en: "Stability, nourishment and reliability. Earth represents the center and harmony.",
      es: "Estabilidad, nutrición y confiabilidad. La Tierra representa el centro y la armonía.",
      hi: "स्थिरता, पोषण और विश्वसनीयता। पृथ्वी केंद्र और सद्भाव का प्रतिनिधित्व करती है।"
    },
    characteristics: {
      pt: ['Estável', 'Confiável', 'Nutritivo', 'Prático', 'Paciente'],
      en: ['Stable', 'Reliable', 'Nourishing', 'Practical', 'Patient'],
      es: ['Estable', 'Confiable', 'Nutritivo', 'Práctico', 'Paciente'],
      hi: ['स्थिर', 'विश्वसनीय', 'पोषक', 'व्यावहारिक', 'धैर्यवान'],
    },
    healthAspects: {
      pt: ['Baço', 'Estômago', 'Boca', 'Músculos'],
      en: ['Spleen', 'Stomach', 'Mouth', 'Muscles'],
      es: ['Bazo', 'Estómago', 'Boca', 'Músculos'],
      hi: ['प्लीहा', 'पेट', 'मुंह', 'मांसपेशियों'],
    },
    compatibleElements: ['fire', 'metal'],
    incompatibleElements: ['wood'],
    associatedSeason: {
      pt: 'Transição entre estações', en: 'Transition between seasons', es: 'Transición entre estaciones', hi: 'ऋतुओं के बीच संक्रमण'
    },
    associatedDirection: {
      pt: 'Centro', en: 'Center', es: 'Centro', hi: 'केंद्र'
    },
    associatedColor: {
      pt: 'Amarelo', en: 'Yellow', es: 'Amarillo', hi: 'पीला'
    },
    associatedPlanet: {
      pt: 'Saturno', en: 'Saturn', es: 'Saturno', hi: 'शनि'
    },
  },
  {
    name: 'metal',
    displayName: { pt: 'Metal', en: 'Metal', es: 'Metal', hi: 'धातु' },
    years: [], // Will follow the logic below
    personality: {
      pt: "Determinação, justiça e organização. O Metal representa a energia do outono e da colheita.",
      en: "Determination, justice and organization. Metal represents the energy of autumn and harvest.",
      es: "Determinación, justicia y organización. El Metal representa la energía del otoño y la cosecha.",
      hi: "दृढ़ संकल्प, न्याय और संगठन। धातु शरद ऋतु और फसल की ऊर्जा का प्रतिनिधित्व करती है।"
    },
    characteristics: {
      pt: ['Determinado', 'Justo', 'Organizado', 'Preciso', 'Disciplinado'],
      en: ['Determined', 'Just', 'Organized', 'Precise', 'Disciplined'],
      es: ['Determinado', 'Justo', 'Organizado', 'Preciso', 'Disciplinado'],
      hi: ['दृढ़ संकल्पित', 'न्यायप्रिय', 'व्यवस्थित', 'सटीक', 'अनुशासित'],
    },
    healthAspects: {
      pt: ['Pulmões', 'Intestino grosso', 'Nariz', 'Pele'],
      en: ['Lungs', 'Large intestine', 'Nose', 'Skin'],
      es: ['Pulmones', 'Intestino grueso', 'Nariz', 'Piel'],
      hi: ['फेफड़े', 'बड़ी आंत', 'नाक', 'त्वचा'],
    },
    compatibleElements: ['earth', 'water'],
    incompatibleElements: ['fire'],
    associatedSeason: {
      pt: 'Outono', en: 'Autumn', es: 'Otoño', hi: 'शरद ऋतु'
    },
    associatedDirection: {
      pt: 'Oeste', en: 'West', es: 'Oeste', hi: 'पश्चिम'
    },
    associatedColor: {
      pt: 'Branco', en: 'White', es: 'Blanco', hi: 'सफेद'
    },
    associatedPlanet: {
      pt: 'Vênus', en: 'Venus', es: 'Venus', hi: 'शुक्र'
    },
  },
  {
    name: 'water',
    displayName: { pt: 'Água', en: 'Water', es: 'Agua', hi: 'पानी' },
    years: [], // Will follow the logic below
    personality: {
      pt: "Sabedoria, adaptabilidade e comunicação. A Água representa o inverno e o armazenamento de energia.",
      en: "Wisdom, adaptability and communication. Water represents winter and energy storage.",
      es: "Sabiduría, adaptabilidad y comunicación. El Agua representa el invierno y el almacenamiento de energía.",
      hi: "बुद्धि, अनुकूलन क्षमता और संचार। जल सर्दियों और ऊर्जा भंडारण का प्रतिनिधित्व करता है।"
    },
    characteristics: {
      pt: ['Sábio', 'Adaptável', 'Comunicativo', 'Intuitivo', 'Flexível'],
      en: ['Wise', 'Adaptable', 'Communicative', 'Intuitive', 'Flexible'],
      es: ['Sabio', 'Adaptable', 'Comunicativo', 'Intuitivo', 'Flexible'],
      hi: ['बुद्धिमान', 'अनुकूलनशील', 'संचारी', 'सहज', 'लचीला'],
    },
    healthAspects: {
      pt: ['Rins', 'Bexiga', 'Ouvidos', 'Ossos'],
      en: ['Kidneys', 'Bladder', 'Ears', 'Bones'],
      es: ['Riñones', 'Vejiga', 'Oídos', 'Huesos'],
      hi: ['गुर्दे', 'मूत्राशय', 'कान', 'हड्डियां'],
    },
    compatibleElements: ['metal', 'wood'],
    incompatibleElements: ['earth'],
    associatedSeason: {
      pt: 'Inverno', en: 'Winter', es: 'Invierno', hi: 'सर्दी'
    },
    associatedDirection: {
      pt: 'Norte', en: 'North', es: 'Norte', hi: 'उत्तर'
    },
    associatedColor: {
      pt: 'Preto', en: 'Black', es: 'Negro', hi: 'काला'
    },
    associatedPlanet: {
      pt: 'Mercúrio', en: 'Mercury', es: 'Mercurio', hi: 'बुध'
    },
  },
];

export function getElementByName(name: string): ChineseElement | undefined {
  return CHINESE_ELEMENTS.find(
    (e) =>
      e.name.toLowerCase() === name.toLowerCase() ||
      e.displayName.pt.toLowerCase() === name.toLowerCase() ||
      e.displayName.en.toLowerCase() === name.toLowerCase() ||
      e.displayName.es.toLowerCase() === name.toLowerCase()
  );
}

export function getElementByYear(year: number): ChineseElement | undefined {
  const lastDigit = year % 10;
  const elementMap: Record<number, string> = {
    0: 'metal', 1: 'metal', 2: 'water', 3: 'water', 4: 'wood', 5: 'wood', 6: 'fire', 7: 'fire', 8: 'earth', 9: 'earth'
  };
  const elementName = elementMap[lastDigit];
  return CHINESE_ELEMENTS.find((e) => e.name === elementName);
}

export function getElementNameLocalized(element: ChineseElement, lang: string): string {
  switch (lang) {
    case 'en': return element.displayName.en;
    case 'es': return element.displayName.es;
    case 'hi': return element.displayName.hi;
    default: return element.displayName.pt;
  }
}
