// ============================================================
// ASTROCARTOGRAPHY & ANNUAL PREDICTIONS
// ============================================================

import {
  normalize360,
  getSignForLongitude,
  getSignDegree,
  ZODIAC_SIGNS,
  type PlanetData,
  type AspectData,
} from "./astro-calculations.js";
import { getTranslations, type Language } from "./i18n.js";

// ============================================================
// TIPOS
// ============================================================

export interface AstrocartographyLine {
  planet: string;
  lineType: "AC" | "DC" | "MC" | "IC";
  longitude: number;
  latitude: number;
  sign: string;
  degree: number;
  description: string;
  influence: string;
}

export interface AstrocartographyMap {
  input: {
    date: string;
    timeUtc: string;
    latitude: number;
    longitude: number;
    houseSystem: string;
  };
  lines: AstrocartographyLine[];
  angularPositions: {
    planet: string;
    acOffset: number;
    dcOffset: number;
    mcOffset: number;
    icOffset: number;
    closestLine: string;
    closestDistance: number;
  }[];
  hotspots: {
    latitude: number;
    longitude: number;
    lines: string[];
    intensity: "alta" | "média" | "baixa";
  }[];
  interpretation: {
    summary: string;
    bestLocations: string[];
    challenges: string[];
    opportunities: string[];
  };
}

export interface AnnualPredictionMonth {
  month: number;
  monthName: string;
  transits: {
    planet: string;
    sign: string;
    aspect: string;
    natalPlanet: string;
    description: string;
  }[];
  themes: {
    love: string;
    career: string;
    finance: string;
    health: string;
    spiritual: string;
  };
  opportunities: string[];
  challenges: string[];
  advice: string;
  energy: number; // 1-10
}

export interface AnnualPrediction {
  year: number;
  input: {
    date: string;
    timeUtc: string;
    latitude: number;
    longitude: number;
  };
  overview: {
    theme: string;
    rulingPlanet: string;
    keyTransits: string[];
    summary: string;
  };
  months: AnnualPredictionMonth[];
  solarReturnHighlight: string;
  eclipsesImpact: string;
  retrogradePeriods: {
    planet: string;
    start: string;
    end: string;
    sign: string;
    advice: string;
  }[];
  yearlyAdvice: string;
}

// ============================================================
// CONSTANTES
// ============================================================

const PLANET_INFLUENCES: Record<string, { ac: string; dc: string; mc: string; ic: string }> = {
  Sun: {
    ac: "vitalidade e presença marcante, você brilha onde chega",
    dc: "parcerias com pessoas carismáticas e influentes",
    mc: "reconhecimento profissional e visibilidade na carreira",
    ic: "lar aquecido e família como fonte de orgulho",
  },
  Moon: {
    ac: "sensibilidade e intuição afloradas, empatia natural",
    dc: "parcerias emocionais profundas e nutritivas",
    mc: "carreira ligada ao cuidado, alimentação ou público",
    ic: "forte conexão com o lar e as raízes familiares",
  },
  Mercury: {
    ac: "comunicação ágil, mente curiosa e versátil",
    dc: "parcerias intelectuais e diálogos estimulantes",
    mc: "sucesso em comunicação, escrita ou ensino",
    ic: "ambiente doméstico como centro de aprendizado",
  },
  Venus: {
    ac: "charme, beleza e harmonia na sua presença",
    dc: "parcerias amorosas e harmoniosas, atração magnética",
    mc: "carreira em arte, beleza, diplomacia ou luxo",
    ic: "lar bonito e acolhedor, paz doméstica",
  },
  Mars: {
    ac: "energia, assertividade e coragem na sua abordagem",
    dc: "parcerias dinâmicas, possível competitividade",
    mc: "carreira ativa, liderança e iniciativa",
    ic: "lar energético, possível agitação doméstica",
  },
  Jupiter: {
    ac: "expansão, otimismo e sorte na sua jornada",
    dc: "parcerias generosas e crescimento mútuo",
    mc: "expansão profissional, oportunidades abundantes",
    ic: "lar espaçoso, abundância e generosidade familiar",
  },
  Saturn: {
    ac: "seriedade, responsabilidade e maturidade",
    dc: "parcerias comprometidas, lições de responsabilidade",
    mc: "carreira construída com disciplina e estrutura",
    ic: "lar como base sólida, responsabilidades familiares",
  },
  Uranus: {
    ac: "originalidade, rebeldia e inovação na sua imagem",
    dc: "parcerias não-convencionais, liberdade no relacionamento",
    mc: "carreira em tecnologia, ciência ou áreas inovadoras",
    ic: "lar não-tradicional, mudanças frequentes de residência",
  },
  Neptune: {
    ac: "magnetismo, sonho e inspiração na sua presença",
    dc: "parcerias idealizadas, possível confusão ou devoção",
    mc: "carreira artística, espiritual ou de serviço",
    ic: "lar como refúgio espiritual, possível confusão doméstica",
  },
  Pluto: {
    ac: "intensidade, poder e transformação na sua imagem",
    dc: "parcerias intensas, transformações através do outro",
    mc: "carreira ligada ao poder, transformação ou investigação",
    ic: "lar como local de transformação profunda, segredos familiares",
  },
  Chiron: {
    ac: "ferida de identidade que se transforma em cura para outros",
    dc: "parcerias que curam feridas antigas",
    mc: "carreira como curador, terapeuta ou mentor",
    ic: "cura de feridas familiares e ancestrais",
  },
  NorthNode: {
    ac: "direção de vida alinhada com o propósito da alma",
    dc: "parcerias que apontam para o crescimento evolutivo",
    mc: "carreira como expressão do destino e propósito",
    ic: "raízes e lar como base para a jornada evolutiva",
  },
};

const MONTHLY_THEMES: Record<string, { love: string[]; career: string[]; finance: string[]; health: string[]; spiritual: string[] }> = {
  aries: {
    love: [
      "paixão renovada e iniciativa no amor",
      "coragem para se declarar ou dar o primeiro passo",
      "energia magnética que atrai olhares",
      "relacionamentos com mais fogo e aventura",
    ],
    career: [
      "liderança natural e projetos ousados",
      "início de novos ciclos profissionais",
      "reconhecimento pela sua proatividade",
      "oportunidades que exigem ação rápida",
    ],
    finance: [
      "investimentos com mais risco e retorno",
      "gastos impulsivos que pedem controle",
      "oportunidades de renda extra",
      "negociações com assertividade",
    ],
    health: [
      "energia física em alta, canalize com exercício",
      "cuidado com inflamações e dores de cabeça",
      "atividade física intensa como aliada",
      "descanso ativo e meditação em movimento",
    ],
    spiritual: [
      "coragem para enfrentar sombras internas",
      "início de práticas espirituais com fogo",
      "meditação ativa e visualização criativa",
      "conexão com a força interior do guerreiro",
    ],
  },
  taurus: {
    love: [
      "estabilidade e segurança emocional no amor",
      "prazer sensorial e conexões profundas",
      "construção lenta e sólida de laços",
      "romance com toque de sensualidade",
    ],
    career: [
      "consolidação de projetos de longo prazo",
      "reconhecimento financeiro pelo trabalho",
      "persistência que gera resultados",
      "oportunidades ligadas à beleza e conforto",
    ],
    finance: [
      "crescimento patrimonial consistente",
      "investimentos seguros e de longo prazo",
      "valorização de bens e propriedades",
      "economia que vira liberdade",
    ],
    health: [
      "corpo pede alimentação nutritiva e saborosa",
      "cuidado com garganta e tireoide",
      "massagem e terapias corporais favorecidas",
      "contato com a natureza como remédio",
    ],
    spiritual: [
      "espiritualidade ligada à terra e natureza",
      "práticas de grounding e enraizamento",
      "meditação com cristais e elementos naturais",
      "conexão com a abundância do universo",
    ],
  },
  gemini: {
    love: [
      "comunicação como chave do coração",
      "versatilidade e leveza nos encontros",
      "intelecto que desperta atração",
      "diálogos que aprofundam a conexão",
    ],
    career: [
      "multi-tarefas que geram resultados",
      "comunicação e networking em alta",
      "projetos que exigem adaptabilidade",
      "oportunidades em mídia e tecnologia",
    ],
    finance: [
      "múltiplas fontes de renda",
      "negócios ligados à comunicação",
      "investimentos diversificados",
      "gastos com livros e cursos",
    ],
    health: [
      "mente ativa que precisa de pausa",
      "cuidado com sistema nervoso e pulmões",
      "exercícios que estimulam coordenação",
      "respiração consciente como prática",
    ],
    spiritual: [
      "estudo de filosofias e sabedorias diversas",
      "meditação com mantras e afirmações",
      "jornada do autoconhecimento através do saber",
      "conexão com a mente universal",
    ],
  },
  cancer: {
    love: [
      "emoções profundas e cuidado no amor",
      "intuição que guia o coração",
      "lar como refúgio do casal",
      "conexão emocional que transcende palavras",
    ],
    career: [
      "carreira ligada ao cuidado e nutrição",
      "intuição como guia profissional",
      "projetos que tocam o emocional",
      "reconhecimento pela empatia no trabalho",
    ],
    finance: [
      "investimentos no lar e família",
      "economia emocional que precisa de atenção",
      "oportunidades ligadas à alimentação e imóveis",
      "segurança financeira como prioridade",
    ],
    health: [
      "corpo sensível que pede acolhimento",
      "cuidado com estômago e digestão",
      "alimentação emocional consciente",
      "terapias aquáticas e banhos de mar",
    ],
    spiritual: [
      "conexão com ancestrais e memória celular",
      "meditação com água e elementos lunares",
      "cura de feridas emocionais profundas",
      "espiritualidade do lar e do sagrado feminino",
    ],
  },
  leo: {
    love: [
      "paixão dramática e romance grandioso",
      "criatividade que seduz e encanta",
      "orgulho e generosidade no amor",
      "relacionamentos que celebram a vida",
    ],
    career: [
      "liderança criativa e inspiradora",
      "reconhecimento público e aplausos",
      "projetos que brilham e encantam",
      "carreira ligada à arte e entretenimento",
    ],
    finance: [
      "gastos com luxo e prazer",
      "investimentos em criatividade",
      "generosidade que retorna multiplicada",
      "oportunidades ligadas ao entretenimento",
    ],
    health: [
      "coração forte e vitalidade radiante",
      "cuidado com coluna e postura",
      "exercícios que expressam criatividade",
      "alegria como melhor remédio",
    ],
    spiritual: [
      "conexão com o sol interior e a criança divina",
      "práticas que celebram a luz e a vida",
      "meditação com visualização dourada",
      "espiritualidade do coração aberto",
    ],
  },
  virgo: {
    love: [
      "amor que se expressa em atos de serviço",
      "atenção aos detalhes que encantam",
      "construção paciente do relacionamento",
      "pureza e sinceridade no amor",
    ],
    career: [
      "precisão e excelência no trabalho",
      "organização que gera eficiência",
      "reconhecimento pela competência",
      "oportunidades em saúde e bem-estar",
    ],
    finance: [
      "planejamento financeiro meticuloso",
      "investimentos analisados com cuidado",
      "economia que vira patrimônio",
      "gastos com saúde e qualidade de vida",
    ],
    health: [
      "rotina saudável como base do bem-estar",
      "cuidado com intestino e digestão",
      "alimentação limpa e nutritiva",
      "práticas de desintoxicação natural",
    ],
    spiritual: [
      "espiritualidade do serviço e da humildade",
      "meditação com foco na respiração",
      "cura através da ordem e limpeza interior",
      "conexão com a sabedoria do corpo",
    ],
  },
  libra: {
    love: [
      "harmonia e equilíbrio no relacionamento",
      "parceria como espelho da alma",
      "romance com toque de arte e beleza",
      "diplomacia que resolve conflitos amorosos",
    ],
    career: [
      "diplomacia e negociação como trunfos",
      "carreira ligada à justiça e beleza",
      "parcerias profissionais que florescem",
      "reconhecimento pela elegância no trabalho",
    ],
    finance: [
      "investimentos em parcerias e joint ventures",
      "gastos com estética e decoração",
      "equilíbrio entre ganhar e gastar",
      "oportunidades ligadas à arte e design",
    ],
    health: [
      "equilíbrio entre trabalho e descanso",
      "cuidado com rins e sistema urinário",
      "terapias de relaxamento e harmonização",
      "beleza e autocuidado como saúde",
    ],
    spiritual: [
      "espiritualidade da beleza e harmonia",
      "meditação com foco no equilíbrio interior",
      "conexão com o sagrado através da arte",
      "práticas que unem corpo e espírito",
    ],
  },
  scorpio: {
    love: [
      "paixão intensa e transformação no amor",
      "profundidade emocional que magnetiza",
      "relacionamentos que curam e transformam",
      "sexualidade como caminho de autoconhecimento",
    ],
    career: [
      "poder de investigação e análise profunda",
      "carreira ligada à transformação e cura",
      "liderança que inspira confiança",
      "oportunidades em psicologia e pesquisa",
    ],
    finance: [
      "investimentos que exigem intuição",
      "heranças e recursos compartilhados",
      "transformação financeira profunda",
      "oportunidades ligadas ao poder e recursos",
    ],
    health: [
      "cura profunda e regeneração celular",
      "cuidado com sistema reprodutor",
      "terapias de desintoxicação profunda",
      "meditação que enfrenta as sombras",
    ],
    spiritual: [
      "jornada de morte e renascimento interior",
      "meditação tântrica e energética",
      "conexão com o poder da transformação",
      "espiritualidade das profundezas da alma",
    ],
  },
  sagittarius: {
    love: [
      "aventura e expansão no amor",
      "relacionamentos que ampliam horizontes",
      "liberdade e compromisso em equilíbrio",
      "romance com toque de filosofia",
    ],
    career: [
      "expansão profissional e oportunidades distantes",
      "carreira ligada ao ensino e viagens",
      "visão ampla que gera inovação",
      "reconhecimento pela sabedoria compartilhada",
    ],
    finance: [
      "investimentos em educação e viagens",
      "oportunidades internacionais",
      "generosidade que retorna multiplicada",
      "crescimento financeiro através do conhecimento",
    ],
    health: [
      "corpo que pede movimento e aventura",
      "cuidado com fígado e quadris",
      "exercícios ao ar livre e natureza",
      "otimismo como aliado da saúde",
    ],
    spiritual: [
      "busca por significado e propósito",
      "meditação com visualização de horizontes",
      "estudo de filosofias e religiões",
      "conexão com a sabedoria universal",
    ],
  },
  capricorn: {
    love: [
      "compromisso sério e construção de futuro",
      "amor que se fortalece com o tempo",
      "lealdade e dedicação no relacionamento",
      "romance com toque de tradição",
    ],
    career: [
      "ascensão profissional através da disciplina",
      "liderança construída com mérito",
      "reconhecimento tardio mas duradouro",
      "oportunidades ligadas à estrutura e governo",
    ],
    finance: [
      "investimentos de longo prazo e seguros",
      "construção patrimonial sólida",
      "economia que vira legado",
      "oportunidades ligadas a imóveis e terra",
    ],
    health: [
      "corpo que responde à disciplina",
      "cuidado com ossos e articulações",
      "rotina saudável como base",
      "terapias estruturadas e consistentes",
    ],
    spiritual: [
      "espiritualidade da disciplina e devoção",
      "meditação com foco na estrutura interior",
      "conexão com a sabedoria dos ancestrais",
      "práticas que fortalecem a coluna energética",
    ],
  },
  aquarius: {
    love: [
      "amor livre e conexões intelectuais",
      "relacionamentos não-convencionais",
      "amizade como base do amor",
      "romance com toque de inovação",
    ],
    career: [
      "inovação e tecnologia no trabalho",
      "carreira ligada ao coletivo e humanidade",
      "projetos que revolucionam o status quo",
      "reconhecimento pela originalidade",
    ],
    finance: [
      "investimentos em tecnologia e inovação",
      "oportunidades ligadas ao coletivo",
      "finanças que beneficiam a comunidade",
      "crescimento através de redes e conexões",
    ],
    health: [
      "corpo que pede liberdade e variedade",
      "cuidado com tornozelos e circulação",
      "exercícios inovadores e diferentes",
      "terapias alternativas e experimentais",
    ],
    spiritual: [
      "espiritualidade do coletivo e da humanidade",
      "meditação com foco na unidade",
      "conexão com a consciência universal",
      "práticas que unem ciência e espiritualidade",
    ],
  },
  pisces: {
    love: [
      "amor incondicional e compaixão",
      "conexão espiritual que transcende o físico",
      "romance com toque de sonho e magia",
      "entrega total ao sentimento",
    ],
    career: [
      "carreira ligada à arte e espiritualidade",
      "intuição como guia profissional",
      "trabalho que cura e inspira",
      "reconhecimento pela sensibilidade",
    ],
    finance: [
      "investimentos que exigem intuição",
      "gastos com arte e espiritualidade",
      "oportunidades ligadas ao mar e líquidos",
      "generosidade que precisa de limites",
    ],
    health: [
      "corpo sensível que pede acolhimento",
      "cuidado com pés e sistema linfático",
      "terapias aquáticas e de relaxamento",
      "meditação como remédio principal",
    ],
    spiritual: [
      "conexão com o divino e o transcendente",
      "meditação profunda e contemplativa",
      "cura através da compaixão e perdão",
      "espiritualidade do oceano cósmico",
    ],
  },
};

const PT_SIGN_TO_KEY: Record<string, keyof ReturnType<typeof getTranslations>["signs"]> = {
  Áries: "aries", Touro: "taurus", Gêmeos: "gemini", Câncer: "cancer", Leão: "leo",
  Virgem: "virgo", Libra: "libra", Escorpião: "scorpio", Sagitário: "sagittarius",
  Capricórnio: "capricorn", Aquário: "aquarius", Peixes: "pisces",
};

const PT_PLANET_TO_I18N: Record<string, keyof ReturnType<typeof getTranslations>["planets"]> = {
  Sol: "sun", Lua: "moon", Mercúrio: "mercury", Vênus: "venus", Marte: "mars",
  Júpiter: "jupiter", Saturno: "saturn", Urano: "uranus", Netuno: "neptune", Plutão: "pluto",
};

function trSign(pt: string, lang: Language): string {
  const k = PT_SIGN_TO_KEY[pt];
  return k ? getTranslations(lang).signs[k] : pt;
}

function trPlanet(pt: string, lang: Language): string {
  const k = PT_PLANET_TO_I18N[pt];
  return k ? getTranslations(lang).planets[k] : pt;
}

function aspWord(lang: Language, t: "trine" | "square" | "conjunction" | "sextile"): string {
  const T: Record<Language, Record<string, string>> = {
    pt: { trine: "trígono", square: "quadratura", conjunction: "conjunção", sextile: "sextil" },
    en: { trine: "trine", square: "square", conjunction: "conjunction", sextile: "sextile" },
    es: { trine: "trígono", square: "cuadratura", conjunction: "conjunción", sextile: "sextil" },
    hi: { trine: "त्रिकोण", square: "वर्ग", conjunction: "युति", sextile: "षष्ठक" },
  };
  return T[lang][t] || t;
}

// ============================================================
// FUNÇÕES DE ASTROCARTOGRAFIA
// ============================================================

function calculatePlanetLinePosition(
  planetLon: number,
  ascendant: number,
  midheaven: number,
  latitude: number,
  longitude: number
): { ac: number; dc: number; mc: number; ic: number } {
  // Simplified astrocartography calculation
  // In reality, this requires complex spherical trigonometry
  // This approximation uses the natal positions as base
  
  const acOffset = normalize360(planetLon - ascendant);
  const mcOffset = normalize360(planetLon - midheaven);
  
  // Calculate where each line would cross on Earth
  const acLon = normalize360(longitude + (planetLon - ascendant) / 2);
  const dcLon = normalize360(acLon + 180);
  const mcLon = normalize360(longitude + (planetLon - midheaven) / 2);
  const icLon = normalize360(mcLon + 180);
  
  return {
    ac: acLon,
    dc: dcLon,
    mc: mcLon,
    ic: icLon,
  };
}

function getLineDescription(planet: string, lineType: string): string {
  const influences = PLANET_INFLUENCES[planet];
  if (!influences) return "";
  
  switch (lineType) {
    case "AC": return influences.ac;
    case "DC": return influences.dc;
    case "MC": return influences.mc;
    case "IC": return influences.ic;
    default: return "";
  }
}

function getLineInfluence(planet: string, lineType: string): string {
  const planetNature: Record<string, string> = {
    Sun: "positiva", Moon: "positiva", Mercury: "neutra", Venus: "positiva",
    Mars: "desafiadora", Jupiter: "positiva", Saturn: "desafiadora",
    Uranus: "imprevisível", Neptune: "inspiradora", Pluto: "transformadora",
    Chiron: "curadora", NorthNode: "evolutiva",
  };
  
  const lineNature: Record<string, string> = {
    AC: "pessoal", DC: "relacional", MC: "profissional", IC: "familiar",
  };
  
  return `Energia ${planetNature[planet] || "neutra"} na linha ${lineNature[lineType] || ""}`;
}

export function calculateAstrocartography(
  planets: PlanetData[],
  ascendant: number,
  midheaven: number,
  input: {
    date: string;
    timeUtc: string;
    latitude: number;
    longitude: number;
    houseSystem: string;
  }
): AstrocartographyMap {
  const lines: AstrocartographyLine[] = [];
  const angularPositions: AstrocartographyMap["angularPositions"] = [];
  
  // Calculate lines for each planet
  for (const planet of planets) {
    const positions = calculatePlanetLinePosition(
      planet.longitude,
      ascendant,
      midheaven,
      input.latitude,
      input.longitude
    );
    
    const lineTypes: Array<"AC" | "DC" | "MC" | "IC"> = ["AC", "DC", "MC", "IC"];
    
    for (const lineType of lineTypes) {
      const lon = positions[lineType.toLowerCase() as keyof typeof positions];
      const sign = getSignForLongitude(lon);
      const degree = getSignDegree(lon);
      
      lines.push({
        planet: planet.name,
        lineType,
        longitude: Math.round(lon * 100) / 100,
        latitude: Math.round(input.latitude * 100) / 100,
        sign,
        degree: Math.round(degree * 100) / 100,
        description: getLineDescription(planet.name, lineType),
        influence: getLineInfluence(planet.name, lineType),
      });
    }
    
    // Calculate angular positions
    const acDist = Math.min(
      Math.abs(normalize360(planet.longitude - ascendant)),
      360 - Math.abs(normalize360(planet.longitude - ascendant))
    );
    const mcDist = Math.min(
      Math.abs(normalize360(planet.longitude - midheaven)),
      360 - Math.abs(normalize360(planet.longitude - midheaven))
    );
    
    const closestDist = Math.min(acDist, mcDist, Math.abs(180 - acDist), Math.abs(180 - mcDist));
    let closestLine = "AC";
    if (mcDist === closestDist) closestLine = "MC";
    else if (Math.abs(180 - acDist) === closestDist) closestLine = "DC";
    else if (Math.abs(180 - mcDist) === closestDist) closestLine = "IC";
    
    angularPositions.push({
      planet: planet.name,
      acOffset: Math.round(acDist * 100) / 100,
      dcOffset: Math.round(Math.abs(180 - acDist) * 100) / 100,
      mcOffset: Math.round(mcDist * 100) / 100,
      icOffset: Math.round(Math.abs(180 - mcDist) * 100) / 100,
      closestLine,
      closestDistance: Math.round(closestDist * 100) / 100,
    });
  }
  
  // Calculate hotspots (locations where multiple lines cross)
  const hotspots: AstrocartographyMap["hotspots"] = [];
  const lineCrossings: Record<string, string[]> = {};
  
  for (const line of lines) {
    const key = `${Math.round(line.longitude / 10) * 10},${Math.round(line.latitude / 10) * 10}`;
    if (!lineCrossings[key]) lineCrossings[key] = [];
    lineCrossings[key].push(`${line.planet}-${line.lineType}`);
  }
  
  for (const [key, crossingLines] of Object.entries(lineCrossings)) {
    if (crossingLines.length >= 3) {
      const [lon, lat] = key.split(",").map(Number);
      hotspots.push({
        latitude: lat,
        longitude: lon,
        lines: crossingLines,
        intensity: crossingLines.length >= 5 ? "alta" : crossingLines.length >= 4 ? "média" : "baixa",
      });
    }
  }
  
  // Generate interpretation
  const angularPlanets = angularPositions.filter(p => p.closestDistance < 5);
  const bestLocations = hotspots.filter(h => h.intensity === "alta").map(h => 
    `Lat ${h.latitude}°, Lon ${h.longitude}° (${h.lines.join(", ")})`
  );
  
  const challenges: string[] = [];
  const opportunities: string[] = [];
  
  for (const pos of angularPositions) {
    if (pos.closestDistance < 3) {
      if (["Saturn", "Mars", "Pluto", "Uranus"].includes(pos.planet)) {
        challenges.push(`Linha ${pos.planet}-${pos.closestLine} pode trazer desafios na área correspondente`);
      } else {
        opportunities.push(`Linha ${pos.planet}-${pos.closestLine} favorece a área correspondente`);
      }
    }
  }
  
  const summary = angularPlanets.length > 0
    ? `Mapa com ${angularPlanets.length} planetas angulares, indicando forte influência astrocártica. ${opportunities.length > 0 ? "Oportunidades em: " + opportunities.slice(0, 2).join(", ") + "." : ""}`
    : "Mapa com influências astrocárticas distribuídas, sem concentrações extremas.";
  
  return {
    input,
    lines,
    angularPositions,
    hotspots,
    interpretation: {
      summary,
      bestLocations: bestLocations.length > 0 ? bestLocations : ["Nenhuma concentração extrema identificada"],
      challenges: challenges.length > 0 ? challenges : ["Sem desafios astrocárticos significativos"],
      opportunities: opportunities.length > 0 ? opportunities : ["Oportunidades distribuídas globalmente"],
    },
  };
}

// ============================================================
// FUNÇÕES DE PREVISÕES ANUAIS
// ============================================================

function getSignForMonth(month: number, year: number): string {
  // Simplified: Sun enters each sign around the 20th of each month
  const signDates = [
    { month: 1, sign: "Capricórnio" }, // Jan 20
    { month: 2, sign: "Aquário" },     // Feb 19
    { month: 3, sign: "Peixes" },      // Mar 21
    { month: 4, sign: "Áries" },       // Apr 20
    { month: 5, sign: "Touro" },       // May 21
    { month: 6, sign: "Gêmeos" },      // Jun 21
    { month: 7, sign: "Câncer" },      // Jul 23
    { month: 8, sign: "Leão" },        // Aug 23
    { month: 9, sign: "Virgem" },      // Sep 23
    { month: 10, sign: "Libra" },      // Oct 23
    { month: 11, sign: "Escorpião" },  // Nov 22
    { month: 12, sign: "Sagitário" },  // Dec 22
  ];
  
  const entry = signDates.find(s => s.month === month);
  return entry?.sign || "Áries";
}

function getMonthlyTransits(month: number, year: number, lang: Language): AnnualPredictionMonth["transits"] {
  const transits: AnnualPredictionMonth["transits"] = [];
  const t = getTranslations(lang);
  const desc = t.annual.transitSymbolic;

  const majorTransits = [
    { planetPt: "Júpiter", asp: "trine" as const, natalPt: "Sol" },
    { planetPt: "Saturno", asp: "square" as const, natalPt: "Lua" },
    { planetPt: "Urano", asp: "conjunction" as const, natalPt: "Mercúrio" },
    { planetPt: "Netuno", asp: "sextile" as const, natalPt: "Vênus" },
    { planetPt: "Plutão", asp: "trine" as const, natalPt: "Marte" },
  ];

  const numTransits = 2 + (month % 2);
  for (let i = 0; i < numTransits; i++) {
    const transit = majorTransits[(month + i) % majorTransits.length];
    if (transit) {
      transits.push({
        planet: trPlanet(transit.planetPt, lang),
        aspect: aspWord(lang, transit.asp),
        natalPlanet: trPlanet(transit.natalPt, lang),
        description: lang === "pt"
          ? (
              {
                Júpiter: "expansão e oportunidades na identidade",
                Saturno: "lições de maturidade emocional",
                Urano: "mudanças repentinas na comunicação",
                Netuno: "inspiração e romantismo no amor",
                Plutão: "transformação profunda da energia vital",
              } as Record<string, string>
            )[transit.planetPt] || desc
          : desc,
        sign: trSign(getSignForMonth(month, year), lang),
      });
    }
  }

  return transits;
}

function getMonthlyThemes(month: number, sign: string, lang: Language): AnnualPredictionMonth["themes"] {
  if (lang === "pt") {
    const signKey = sign.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const themes = MONTHLY_THEMES[signKey] || MONTHLY_THEMES["aries"];
    const loveIdx = month % themes.love.length;
    const careerIdx = month % themes.career.length;
    const financeIdx = month % themes.finance.length;
    const healthIdx = month % themes.health.length;
    const spiritualIdx = month % themes.spiritual.length;
    return {
      love: themes.love[loveIdx] || themes.love[0] || "",
      career: themes.career[careerIdx] || themes.career[0] || "",
      finance: themes.finance[financeIdx] || themes.finance[0] || "",
      health: themes.health[healthIdx] || themes.health[0] || "",
      spiritual: themes.spiritual[spiritualIdx] || themes.spiritual[0] || "",
    };
  }
  const g = getTranslations(lang).annual.genericMonthly;
  const nudge = ["", " · II", " · III", " · IV"][month % 4] ?? "";
  return {
    love: g.love + nudge,
    career: g.career + nudge,
    finance: g.finance + nudge,
    health: g.health + nudge,
    spiritual: g.spiritual + nudge,
  };
}

function getRetrogradePeriods(year: number, lang: Language): AnnualPrediction["retrogradePeriods"] {
  const t = getTranslations(lang);
  const adv = t.annual.retrogradeAdvice;
  const join = (a: string, b: string) => `${trSign(a, lang)}/${trSign(b, lang)}`;
  return [
    {
      planet: trPlanet("Mercúrio", lang),
      start: `${year}-01-14`,
      end: `${year}-02-03`,
      sign: join("Capricórnio", "Aquário"),
      advice: adv.mercury,
    },
    {
      planet: trPlanet("Mercúrio", lang),
      start: `${year}-05-10`,
      end: `${year}-06-02`,
      sign: join("Gêmeos", "Touro"),
      advice: adv.mercury,
    },
    {
      planet: trPlanet("Mercúrio", lang),
      start: `${year}-09-09`,
      end: `${year}-10-02`,
      sign: join("Libra", "Virgem"),
      advice: adv.mercury,
    },
    {
      planet: trPlanet("Mercúrio", lang),
      start: `${year}-12-25`,
      end: `${year + 1}-01-15`,
      sign: trSign("Capricórnio", lang),
      advice: adv.mercury,
    },
    {
      planet: trPlanet("Vênus", lang),
      start: `${year}-07-22`,
      end: `${year}-09-03`,
      sign: trSign("Leão", lang),
      advice: adv.venus,
    },
    {
      planet: trPlanet("Marte", lang),
      start: `${year}-12-06`,
      end: `${year + 1}-02-23`,
      sign: trSign("Gêmeos", lang),
      advice: adv.mars,
    },
  ];
}

export function calculateAnnualPredictions(
  natalPlanets: PlanetData[],
  _natalAspects: AspectData[],
  input: {
    date: string;
    timeUtc: string;
    latitude: number;
    longitude: number;
  },
  year: number,
  lang: Language = "en"
): AnnualPrediction {
  const t = getTranslations(lang);
  const sunPlanet = natalPlanets.find((p) => p.name === "Sol" || p.name === "Sun");
  const sunSignPt = sunPlanet?.sign || "Áries";

  const jupiterPlanet = natalPlanets.find((p) => p.name === "Júpiter" || p.name === "Jupiter");
  const jupiterSignPt = jupiterPlanet?.sign || "Sagitário";

  const jIdx = Math.max(0, ZODIAC_SIGNS.indexOf(jupiterSignPt as (typeof ZODIAC_SIGNS)[number]));
  const theme = t.annual.jupiterYearThemes[jIdx] || t.annual.jupiterYearThemes[0] || "";
  const influence = t.annual.jupiterInfluences[jIdx] || "";

  const months: AnnualPredictionMonth[] = [];
  for (let month = 1; month <= 12; month++) {
    const monthSignPt = getSignForMonth(month, year);
    const transits = getMonthlyTransits(month, year, lang);
    const themes = getMonthlyThemes(month, monthSignPt, lang);
    const energy = 5 + Math.floor(month % 5);
    const mName = t.months[month - 1] || String(month);

    months.push({
      month,
      monthName: mName,
      transits,
      themes,
      opportunities: [
        t.annual.monthOpp1.replace("{topic}", themes.career.toLowerCase()),
        t.annual.monthOpp2.replace("{topic}", themes.love.toLowerCase()),
      ],
      challenges: [
        t.annual.monthCh1.replace("{topic}", themes.finance.toLowerCase()),
        t.annual.monthCh2.replace("{topic}", themes.health.toLowerCase()),
      ],
      advice: t.annual.monthAdvice
        .replace("{month}", mName.toLowerCase())
        .replace("{spiritual}", themes.spiritual.toLowerCase())
        .replace("{energy}", String(energy)),
      energy,
    });
  }

  const oppPt = getOppositeSign(sunSignPt);
  const keyTransits = [
    t.annual.keyTransitJupiter.replace("{sign}", trSign(jupiterSignPt, lang)),
    t.annual.keyTransitSaturn,
    t.annual.keyTransitEclipses
      .replace("{sign}", trSign(sunSignPt, lang))
      .replace("{opposite}", trSign(oppPt, lang)),
  ];

  const retrogradePeriods = getRetrogradePeriods(year, lang);
  const jupiterLabel = jupiterPlanet ? trPlanet(jupiterPlanet.name, lang) : trPlanet("Júpiter", lang);
  const sIdx = Math.max(0, ZODIAC_SIGNS.indexOf(sunSignPt as (typeof ZODIAC_SIGNS)[number]));
  const solarHouse = t.annual.solarReturnHouses[sIdx] || t.annual.solarReturnHouses[0] || "";

  return {
    year,
    input,
    overview: {
      theme,
      rulingPlanet: jupiterLabel,
      keyTransits,
      summary: t.annual.overviewSummary
        .replace("{theme}", theme)
        .replace("{jupiterSign}", trSign(jupiterSignPt, lang))
        .replace("{influence}", influence)
        .replace("{n}", String(retrogradePeriods.length)),
    },
    months,
    solarReturnHighlight: t.annual.solarReturnHighlight
      .replace("{year}", String(year))
      .replace("{house}", solarHouse),
    eclipsesImpact: t.annual.eclipsesImpact
      .replace("{sign}", trSign(sunSignPt, lang))
      .replace("{opposite}", trSign(oppPt, lang)),
    retrogradePeriods,
    yearlyAdvice: t.annual.yearlyAdvice
      .replace("{theme}", theme.toLowerCase())
      .replace("{sun}", trSign(sunSignPt, lang)),
  };
}

function getOppositeSign(sign: string): string {
  const opposites: Record<string, string> = {
    "Áries": "Libra", "Touro": "Escorpião", "Gêmeos": "Sagitário",
    "Câncer": "Capricórnio", "Leão": "Aquário", "Virgem": "Peixes",
    "Libra": "Áries", "Escorpião": "Touro", "Sagitário": "Gêmeos",
    "Capricórnio": "Câncer", "Aquário": "Leão", "Peixes": "Virgem",
  };
  return opposites[sign] || "Áries";
}

