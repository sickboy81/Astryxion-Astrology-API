// Sistema de Internacionalização (i18n) para API Astro
// Idiomas: Português (pt), Inglês (en), Espanhol (es), Hindi (hi)
// Traduções escritas com linguagem natural, como astrólogos profissionais falam em cada cultura

export interface LocalizedText {
  pt: string;
  en: string;
  es: string;
  hi: string;
  [key: string]: string | undefined;
}

export interface LocalizedList {
  pt: string[];
  en: string[];
  es: string[];
  hi: string[];
  [key: string]: string[] | undefined;
}

export type Language = 'pt' | 'en' | 'es' | 'hi';

export interface Translations {
  horoscope: {
    daily: string; weekly: string; monthly: string;
    love: string; career: string; health: string; finances: string; spirituality: string;
    compatibility: string; luckyColor: string; luckyStone: string; luckyNumbers: string;
    favorableHour: string; moonPhase: string; moonInfluence: string; energyLevel: string;
    advice: string; summary: string; guidance: string;
    luckyColors: string[];
    luckyStones: string[];
    intensity: { daily: string; weekly: string; monthly: string; };
    connectors: {
      key: string;
      favors: string;
      asks: string;
    };
    vedicActions: string[];
    vedicWatchouts: string[];
    moonInfluences: {
      full: string; new: string; crescent: string; waning: string;
    };
  };
  signs: Record<string, string>;
  planets: Record<string, string>;
  houses: Record<string, string>;
    aspects: Record<string, string>;
    aspectPatterns: {
      grandTrine: string;
      tSquare: string;
      yod: string;
      grandCross: string;
      stellium: string;
      mysticRectangle: string;
    };
    dashboard: {
    title: string; subtitle: string; natalChart: string; horoscope: string;
    astrocartography: string; annualPredictions: string; vedicChart: string; rectification: string;
    submit: string; loading: string; result: string; form: string;
    date: string; time: string; latitude: string; longitude: string;
    houseSystem: string; sign: string; period: string; language: string;
  };
  vedic: {
    nakshatra: string; pada: string; dasha: string; ayanamsa: string;
    divisionalChart: string; lord: string; deity: string; symbol: string;
  };
  rectification: {
    title: string; event: string; events: string; bestTime: string;
    confidence: string; ascendantMatch: string; midheavenMatch: string;
  };
  astrocartography: {
    title: string; lines: string; hotspots: string; interpretation: string;
    bestLocations: string; challenges: string; opportunities: string;
  };
  annual: {
    title: string; overview: string; theme: string; rulingPlanet: string;
    month: string; retrograde: string; energy: string;
    keyTransitJupiter: string;
    keyTransitSaturn: string;
    keyTransitEclipses: string;
    solarReturnHighlight: string;
    eclipsesImpact: string;
    yearlyAdvice: string;
    overviewSummary: string;
    monthOpp1: string;
    monthOpp2: string;
    monthCh1: string;
    monthCh2: string;
    monthAdvice: string;
    jupiterYearThemes: string[];
    jupiterInfluences: string[];
    solarReturnHouses: string[];
    retrogradeAdvice: { mercury: string; venus: string; mars: string };
    genericMonthly: { love: string; career: string; finance: string; health: string; spiritual: string };
    transitSymbolic: string;
  };
  months: string[];
  weekdays: string[];
  elements: Record<string, string>;
  modalities: Record<string, string>;
  errors: {
    invalidDate: string; invalidSign: string; invalidApiKey: string;
    rateLimit: string; serverError: string; notFound: string;
  };
}

const translations: Record<Language, Translations> = {
  pt: {
    horoscope: {
      daily: 'Horóscopo do Dia', weekly: 'Previsão da Semana', monthly: 'Panorama do Mês',
      love: 'Amor e Relacionamentos', career: 'Trabalho e Carreira',
      health: 'Saúde e Bem-estar', finances: 'Dinheiro e Finanças',
      spirituality: 'Espiritualidade e Crescimento', compatibility: 'Compatibilidade Amorosa',
      luckyColor: 'Cor que Traz Sorte', luckyStone: 'Pedra Protetora',
      luckyNumbers: 'Números da Sorte', favorableHour: 'Melhor Horário do Dia',
      moonPhase: 'Fase da Lua', moonInfluence: 'Como a Lua Te Influencia',
      energyLevel: 'Nível de Energia', advice: 'Conselho do Astrólogo',
      summary: 'Resumo do Dia', guidance: 'Orientação Especial',
      luckyColors: ["vermelho", "azul", "verde", "dourado", "roxo", "branco", "laranja", "rosa", "turquesa", "prata", "marrom", "amarelo"],
      luckyStones: ["ametista", "quartzo rosa", "olho de tigre", "citrino", "jade", "granada", "topázio", "água-marinha", "obsidiana", "turmalina negra", "cristal", "lápis-lazúli"],
      intensity: { daily: 'agora', weekly: 'nesta semana', monthly: 'neste mês' },
      connectors: {
        key: 'a chave é',
        favors: 'favorece',
        asks: 'pede',
      },
      vedicActions: [
        "recite o mantra do regente do seu nakshatra", "faça doações ao regente planetário",
        "medite sobre a deidade do seu nakshatra", "use a cor favorável do nakshatra",
        "evite iniciar atividades importantes sem consultar o panchanga", "pratique gratidão aos ancestrais",
        "ofereça água ao Sol nascente", "jejue no dia do regente planetário",
        "use a gema do planeta regente", "visite um templo ou local sagrado",
        "faça puja à deidade do nakshatra", "recite o Gayatri Mantra 108 vezes",
        "ofereça flores à divindade regente", "faça caridade aos necessitados",
        "medite na direção favorável do nakshatra", "evite conflitos e discussões",
        "inicie práticas espirituais novas", "honre seus professores e mentores",
        "faça oferendas aos elementos naturais", "pratique ahimsa (não-violência)",
      ],
      vedicWatchouts: [
        "evite iniciar viagens longas sem muhurta favorável", "não tome decisões importantes sob pressão",
        "cuidado com excessos emocionais", "evite discussões com autoridades",
        "não ignore sinais do corpo e da mente", "evite gastos impulsivos",
        "cuidado com promessas feitas sob emoção", "não inicie relacionamentos sob nakshatra desfavorável",
        "evite alimentos pesados e tãmicos", "cuidado com a inveja e ciúmes",
        "não negligencie práticas espirituais diárias", "evite fofocas e julgamentos",
        "cuidado com decisões financeiras por impulso", "não ignore intuições persistentes",
        "evite conflitos familiares", "cuidado com o orgulho e arrogância",
      ],
      moonInfluences: {
        full: 'alta intensidade emocional',
        new: 'momento de plantar intenções',
        crescent: 'energia de expansão e ação',
        waning: 'energia de reflexão e encerramento',
      },
    },
    signs: {
      aries: 'Áries', taurus: 'Touro', gemini: 'Gêmeos', cancer: 'Câncer',
      leo: 'Leão', virgo: 'Virgem', libra: 'Libra', scorpio: 'Escorpião',
      sagittarius: 'Sagitário', capricorn: 'Capricórnio', aquarius: 'Aquário', pisces: 'Peixes',
    },
    planets: {
      sun: 'Sol', moon: 'Lua', mercury: 'Mercúrio', venus: 'Vênus', mars: 'Marte',
      jupiter: 'Júpiter', saturn: 'Saturno', uranus: 'Urano', neptune: 'Netuno',
      pluto: 'Plutão', chiron: 'Quíron', lilith: 'Lilith',
      ceres: 'Ceres', pallas: 'Palas', juno: 'Juno', vesta: 'Vesta',
      rahu: 'Rahu', ketu: 'Ketu',
      northNode: 'Nodo Norte', southNode: 'Nodo Sul', fortune: 'Parte da Fortuna',
    },
    houses: {
      1: 'Casa 1 — Quem Você É', 2: 'Casa 2 — Seus Valores e Dinheiro',
      3: 'Casa 3 — Comunicação e Aprendizado', 4: 'Casa 4 — Lar e Família',
      5: 'Casa 5 — Criatividade e Romance', 6: 'Casa 6 — Rotina e Saúde',
      7: 'Casa 7 — Parcerias e Casamento', 8: 'Casa 8 — Transformação e Renascimento',
      9: 'Casa 9 — Viagens e Filosofia', 10: 'Casa 10 — Carreira e Reconhecimento',
      11: 'Casa 11 — Amigos e Projetos', 12: 'Casa 12 — Espiritualidade e Intuição',
    },
    aspects: {
      conjunction: 'Conjunção (energia fundida)', sextile: 'Sextil (oportunidade fluindo)',
      square: 'Quadratura (tensão que desafia)', trine: 'Trígono (harmonia natural)',
      opposition: 'Oposição (polaridade a equilibrar)', quincunx: 'Quincúncio (ajuste necessário)',
      semisextile: 'Semi-sextil (pequena oportunidade)', semisquare: 'Semi-quadrado (leve tensão)',
      sesquiquadrate: 'Sesqui-quadrado (fricção persistente)',
      quintile: 'Quintil (talento criativo)', biquintile: 'Bi-quintil (criatividade reforçada)',
      septile: 'Séptil (ritmo espiritual sutil)',
    },
    aspectPatterns: {
      grandTrine: 'Grande Trígono — fluxo harmonioso entre três pontos do mapa.',
      tSquare: 'T-Quadrado — tensão dinâmica com foco de ação no vértice.',
      yod: 'Dedo de Deus (Yod) — destino que pede ajuste e foco no vértice.',
      grandCross: 'Grande Cruz — quatro tensões em cruz; necessidade de equilíbrio e maturidade.',
      stellium: 'Estélio — concentração de energia num signo ou casa.',
      mysticRectangle: 'Retângulo místico — tensões equilibradas por trígonos e sextis.',
    },
    dashboard: {
      title: 'Seu Painel Astrológico',
      subtitle: 'A API de Astrologia mais completa da internet — mapas, horóscopos e previsões',
      natalChart: 'Mapa Astral Completo', horoscope: 'Horóscopo Personalizado',
      astrocartography: 'Astrocartografia — Melhores Lugares', annualPredictions: 'Previsões para o Ano',
      vedicChart: 'Mapa Védico (Jyotish)', rectification: 'Retificação de Horário',
      submit: 'Calcular Meu Mapa', loading: 'Calculando as posições planetárias...',
      result: 'Seu Resultado', form: 'Preencha Seus Dados',
      date: 'Data de Nascimento', time: 'Hora de Nascimento',
      latitude: 'Latitude', longitude: 'Longitude',
      houseSystem: 'Sistema de Casas', sign: 'Seu Signo',
      period: 'Período Desejado', language: 'Idioma',
    },
    vedic: {
      nakshatra: 'Nakshatra (Constelação Lunar)', pada: 'Pada (Quarto do Nakshatra)',
      dasha: 'Dasha (Período Planetário)', ayanamsa: 'Ayanamsa (Diferença Sideral)',
      divisionalChart: 'Carta Divisional (Varga)', lord: 'Regente',
      deity: 'Deidade Protetora', symbol: 'Símbolo Sagrado',
    },
    rectification: {
      title: 'Retificação do Horário de Nascimento', event: 'Evento de Vida',
      events: 'Eventos Conhecidos da Sua Vida', bestTime: 'Horário Mais Provável',
      confidence: 'Nível de Confiança', ascendantMatch: 'Conferência do Ascendente',
      midheavenMatch: 'Conferência do Meio do Céu',
    },
    astrocartography: {
      title: 'Astrocartografia — Mapa de Linhas Planetárias',
      lines: 'Linhas Planetárias pelo Mundo', hotspots: 'Regiões de Maior Intensidade',
      interpretation: 'O Que Isso Significa pra Você',
      bestLocations: 'Melhores Lugares pra Morar ou Viajar',
      challenges: 'Lugares pra Ter Cuidado', opportunities: 'Oportunidades em Cada Região',
    },
    annual: {
      title: 'Previsões para o Ano Inteiro', overview: 'Visão Geral do Ano',
      theme: 'Tema Principal do Ano', rulingPlanet: 'Planeta Regente do Ano',
      month: 'Mês', retrograde: 'Período Retrógrado', energy: 'Energia do Mês',
      keyTransitJupiter: 'Júpiter em {sign} traz expansão',
      keyTransitSaturn: 'Saturno estrutura sua jornada',
      keyTransitEclipses: 'Eclipses no eixo {sign}-{opposite} ativam seu eixo solar',
      solarReturnHighlight: 'Seu retorno solar em {year} ativa a casa do {house}',
      eclipsesImpact: 'Eclipses no eixo {sign}-{opposite} trazem mudanças significativas na área solar do seu mapa',
      yearlyAdvice: 'Foque em {theme}. Use os períodos retrógrados para revisão e os diretos para ação. Mantenha-se alinhado com seu propósito solar em {sun}.',
      overviewSummary: '{theme}. Júpiter em {jupiterSign} favorece {influence}. Ano com {n} períodos retrógrados importantes.',
      monthOpp1: 'Foco em {topic}',
      monthOpp2: 'Aproveite {topic}',
      monthCh1: 'Atenção com {topic}',
      monthCh2: 'Cuide de {topic}',
      monthAdvice: 'Mês de {month} pede {spiritual}. Energia {energy}/10.',
      jupiterYearThemes: [
        'Ano de ação e novos começos', 'Ano de construção e estabilidade', 'Ano de comunicação e aprendizado',
        'Ano de emoções e família', 'Ano de criatividade e expressão', 'Ano de organização e saúde',
        'Ano de parcerias e equilíbrio', 'Ano de transformação e poder', 'Ano de expansão e aventura',
        'Ano de estrutura e conquistas', 'Ano de inovação e comunidade', 'Ano de espiritualidade e compaixão',
      ],
      jupiterInfluences: [
        'ação e iniciativa', 'prosperidade material', 'aprendizado e comunicação', 'crescimento emocional',
        'criatividade e expressão', 'saúde e organização', 'parcerias e harmonia', 'transformação e poder',
        'expansão e aventura', 'estrutura e conquistas', 'inovação e comunidade', 'espiritualidade e compaixão',
      ],
      solarReturnHouses: [
        'autoconhecimento', 'valores e finanças', 'comunicação e aprendizado', 'lar e família',
        'criatividade e romance', 'saúde e trabalho', 'parcerias e relacionamentos', 'transformação e recursos compartilhados',
        'viagens e filosofia', 'carreira e reputação', 'amigos e projetos coletivos', 'espiritualidade e isolamento',
      ],
      retrogradeAdvice: {
        mercury: 'revise comunicações, contratos e viagens. Evite iniciar novos projetos de comunicação.',
        venus: 'reavalie relacionamentos e finanças. Não faça grandes compras ou mudanças de visual.',
        mars: 'controle a impulsividade e a raiva. Revise planos de ação e estratégia.',
      },
      genericMonthly: {
        love: 'amor e conexão emocional', career: 'trabalho e propósito profissional', finance: 'finanças e recursos',
        health: 'saúde e vitalidade', spiritual: 'espiritualidade e ritmo interior',
      },
      transitSymbolic: 'Trânsitos simbólicos do mês em relação ao mapa natal.',
    },
    months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    weekdays: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'],
    elements: { fire: 'Fogo 🔥', earth: 'Terra 🌍', air: 'Ar 💨', water: 'Água 🌊' },
    modalities: { cardinal: 'Cardinal (iniciador)', fixed: 'Fixo (estabilizador)', mutable: 'Mutável (adaptável)' },
    errors: {
      invalidDate: 'Ops! A data informada não parece válida. Verifique e tente novamente.',
      invalidSign: 'Signo não encontrado. Confira se digitou corretamente (ex: aries, taurus, gemini...)',
      invalidApiKey: 'Chave de API inválida. Verifique sua chave e tente novamente.',
      rateLimit: 'Você atingiu o limite de consultas do seu plano. Aguarde um pouco ou faça upgrade.',
      serverError: 'Ocorreu um erro interno nos nossos servidores. Estamos trabalhando nisso!',
      notFound: 'Não encontramos o que você procura. Verifique o endereço e tente novamente.',
    },
  },
  en: {
    horoscope: {
      daily: "Today's Horoscope", weekly: "This Week's Forecast", monthly: 'Monthly Outlook',
      love: 'Love & Relationships', career: 'Work & Career',
      health: 'Health & Wellness', finances: 'Money & Finances',
      spirituality: 'Spirituality & Growth', compatibility: 'Romantic Compatibility',
      luckyColor: 'Your Lucky Color', luckyStone: 'Your Power Stone',
      luckyNumbers: 'Lucky Numbers', favorableHour: 'Best Time of Day',
      moonPhase: 'Moon Phase', moonInfluence: 'How the Moon Affects You',
      energyLevel: 'Energy Level', advice: "Astrologer's Advice",
      summary: 'Today at a Glance', guidance: 'Special Guidance',
      luckyColors: ["red", "blue", "green", "gold", "purple", "white", "orange", "pink", "turquoise", "silver", "brown", "yellow"],
      luckyStones: ["amethyst", "rose quartz", "tiger's eye", "citrine", "jade", "garnet", "topaz", "aquamarine", "obsidian", "black tourmaline", "crystal", "lapis lazuli"],
      intensity: { daily: 'now', weekly: 'this week', monthly: 'this month' },
      connectors: {
        key: 'the key is',
        favors: 'favors',
        asks: 'asks for',
      },
      vedicActions: [
        "recite the mantra of your nakshatra's ruler", "make donations to the planetary ruler",
        "meditate on the deity of your nakshatra", "use the favorable color of the nakshatra",
        "avoid starting important activities without consulting the panchanga", "practice gratitude to ancestors",
        "offer water to the rising Sun", "fast on the day of the planetary ruler",
        "use the gemstone of the ruling planet", "visit a temple or sacred place",
        "perform puja to the nakshatra deity", "recite the Gayatri Mantra 108 times",
        "offer flowers to the presiding deity", "give charity to the needy",
        "meditate in the favorable direction of the nakshatra", "avoid conflicts and arguments",
        "start new spiritual practices", "honor your teachers and mentors",
        "make offerings to the natural elements", "practice ahimsa (non-violence)",
      ],
      vedicWatchouts: [
        "avoid starting long trips without favorable muhurta", "do not make important decisions under pressure",
        "beware of emotional excesses", "avoid arguments with authorities",
        "do not ignore body and mind signals", "avoid impulsive spending",
        "beware of promises made under emotion", "do not start relationships under unfavorable nakshatra",
        "avoid heavy and tamic foods", "beware of envy and jealousy",
        "do not neglect daily spiritual practices", "avoid gossip and judgments",
        "beware of impulsive financial decisions", "do not ignore persistent intuitions",
        "avoid family conflicts", "beware of pride and arrogance",
      ],
      moonInfluences: {
        full: 'high emotional intensity',
        new: 'time to set intentions',
        crescent: 'energy of expansion and action',
        waning: 'energy of reflection and closure',
      },
    },
    signs: {
      aries: 'Aries', taurus: 'Taurus', gemini: 'Gemini', cancer: 'Cancer',
      leo: 'Leo', virgo: 'Virgo', libra: 'Libra', scorpio: 'Scorpio',
      sagittarius: 'Sagittarius', capricorn: 'Capricorn', aquarius: 'Aquarius', pisces: 'Pisces',
    },
    planets: {
      sun: 'Sun', moon: 'Moon', mercury: 'Mercury', venus: 'Venus', mars: 'Mars',
      jupiter: 'Jupiter', saturn: 'Saturn', uranus: 'Uranus', neptune: 'Neptune',
      pluto: 'Pluto', chiron: 'Chiron', lilith: 'Lilith',
      ceres: 'Ceres', pallas: 'Pallas', juno: 'Juno', vesta: 'Vesta',
      rahu: 'Rahu', ketu: 'Ketu',
      northNode: 'North Node', southNode: 'South Node', fortune: 'Part of Fortune',
    },
    houses: {
      1: 'House 1 — Who You Are', 2: 'House 2 — Your Values & Money',
      3: 'House 3 — Communication & Learning', 4: 'House 4 — Home & Family',
      5: 'House 5 — Creativity & Romance', 6: 'House 6 — Daily Routine & Health',
      7: 'House 7 — Partnerships & Marriage', 8: 'House 8 — Transformation & Rebirth',
      9: 'House 9 — Travel & Philosophy', 10: 'House 10 — Career & Public Image',
      11: 'House 11 — Friends & Community', 12: 'House 12 — Spirituality & Inner World',
    },
    aspects: {
      conjunction: 'Conjunction (merged energy)', sextile: 'Sextile (flowing opportunity)',
      square: 'Square (challenging tension)', trine: 'Trine (natural harmony)',
      opposition: 'Opposition (polarity to balance)', quincunx: 'Quincunx (adjustment needed)',
      semisextile: 'Semisextile (small opportunity)', semisquare: 'Semisquare (mild tension)',
      sesquiquadrate: 'Sesquiquadrate (persistent friction)',
      quintile: 'Quintile (creative talent)', biquintile: 'Biquintile (amplified creativity)',
      septile: 'Septile (subtle spiritual rhythm)',
    },
    aspectPatterns: {
      grandTrine: 'Grand Trine — harmonious flow between three chart points.',
      tSquare: 'T-Square — dynamic tension with a focal release point.',
      yod: "Finger of God (Yod) — fated adjustment; focus on the apex planet.",
      grandCross: 'Grand Cross — four-way tension; maturity and balance required.',
      stellium: 'Stellium — concentrated energy in one sign or house cluster.',
      mysticRectangle: 'Mystic Rectangle — opposing tensions softened by trines and sextiles.',
    },
    dashboard: {
      title: 'Your Astrology Dashboard',
      subtitle: 'The most complete astrology API on the web — charts, horoscopes & forecasts',
      natalChart: 'Complete Birth Chart', horoscope: 'Personalized Horoscope',
      astrocartography: 'Astrocartography — Best Places', annualPredictions: 'Yearly Forecast',
      vedicChart: 'Vedic Chart (Jyotish)', rectification: 'Birth Time Rectification',
      submit: 'Calculate My Chart', loading: 'Calculating planetary positions...',
      result: 'Your Results', form: 'Enter Your Details',
      date: 'Birth Date', time: 'Birth Time',
      latitude: 'Latitude', longitude: 'Longitude',
      houseSystem: 'House System', sign: 'Your Sign',
      period: 'Time Period', language: 'Language',
    },
    vedic: {
      nakshatra: 'Nakshatra (Lunar Mansion)', pada: 'Pada (Quarter of Nakshatra)',
      dasha: 'Dasha (Planetary Period)', ayanamsa: 'Ayanamsa (Sidereal Difference)',
      divisionalChart: 'Divisional Chart (Varga)', lord: 'Ruling Planet',
      deity: 'Presiding Deity', symbol: 'Sacred Symbol',
    },
    rectification: {
      title: 'Birth Time Rectification', event: 'Life Event',
      events: 'Known Life Events', bestTime: 'Most Likely Birth Time',
      confidence: 'Confidence Level', ascendantMatch: 'Ascendant Match',
      midheavenMatch: 'Midheaven Match',
    },
    astrocartography: {
      title: 'Astrocartography — Planetary Lines Map',
      lines: 'Planetary Lines Around the World', hotspots: 'Regions of Highest Intensity',
      interpretation: 'What This Means for You',
      bestLocations: 'Best Places to Live or Travel',
      challenges: 'Places to Be Mindful Of', opportunities: 'Opportunities in Each Region',
    },
    annual: {
      title: 'Your Year Ahead', overview: 'Year at a Glance',
      theme: "Main Theme of the Year", rulingPlanet: "Year's Ruling Planet",
      month: 'Month', retrograde: 'Retrograde Period', energy: 'Monthly Energy',
      keyTransitJupiter: 'Jupiter in {sign} brings expansion',
      keyTransitSaturn: 'Saturn structures your path',
      keyTransitEclipses: 'Eclipses on the {sign}-{opposite} axis activate your solar story',
      solarReturnHighlight: 'Your solar return in {year} highlights the house of {house}',
      eclipsesImpact: 'Eclipses on the {sign}-{opposite} axis bring significant shifts in your solar life area',
      yearlyAdvice: 'Lean into {theme}. Use retrogrades for review and direct periods for action. Stay aligned with your solar purpose in {sun}.',
      overviewSummary: '{theme}. Jupiter in {jupiterSign} favors {influence}. The year has {n} major retrograde windows.',
      monthOpp1: 'Focus on {topic}',
      monthOpp2: 'Make the most of {topic}',
      monthCh1: 'Watch {topic}',
      monthCh2: 'Care for {topic}',
      monthAdvice: '{month} asks for {spiritual}. Energy {energy}/10.',
      jupiterYearThemes: [
        'A year of action and fresh starts', 'A year of building and stability', 'A year of learning and dialogue',
        'A year of feelings and home', 'A year of creativity and visibility', 'A year of order and wellbeing',
        'A year of partnership and balance', 'A year of transformation and power', 'A year of growth and adventure',
        'A year of structure and achievement', 'A year of innovation and community', 'A year of spirituality and compassion',
      ],
      jupiterInfluences: [
        'drive and initiative', 'material abundance', 'learning and communication', 'emotional growth',
        'creative expression', 'health and systems', 'relationship harmony', 'depth and power',
        'expansion and adventure', 'discipline and goals', 'innovation and networks', 'faith and compassion',
      ],
      solarReturnHouses: [
        'self and identity', 'values and money', 'learning and siblings', 'home and roots',
        'creativity and romance', 'routine and health', 'partnerships', 'shared resources and change',
        'travel and meaning', 'career and reputation', 'friends and hopes', 'rest and spirit',
      ],
      retrogradeAdvice: {
        mercury: 'Review messages, contracts, and travel. Avoid launching major comms projects.',
        venus: 'Reassess love and money. Skip big purchases or style overhauls.',
        mars: 'Channel drive carefully. Rework plans instead of forcing outcomes.',
      },
      genericMonthly: {
        love: 'heart connections', career: 'work and purpose', finance: 'money and resources',
        health: 'body and vitality', spiritual: 'inner rhythm and meaning',
      },
      transitSymbolic: 'Symbolic monthly transits relative to the natal chart.',
    },
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    elements: { fire: 'Fire 🔥', earth: 'Earth 🌍', air: 'Air 💨', water: 'Water 🌊' },
    modalities: { cardinal: 'Cardinal (initiator)', fixed: 'Fixed (stabilizer)', mutable: 'Mutable (adapter)' },
    errors: {
      invalidDate: "Oops! That date doesn't look right. Please double-check and try again.",
      invalidSign: 'Sign not found. Make sure you typed it correctly (e.g., aries, taurus, gemini...)',
      invalidApiKey: 'Invalid API key. Please check your key and try again.',
      rateLimit: "You've reached your plan's query limit. Please wait a bit or consider upgrading.",
      serverError: "Something went wrong on our end. We're working on it!",
      notFound: "We couldn't find what you're looking for. Please check the URL and try again.",
    },
  },
  es: {
    horoscope: {
      daily: 'Horóscopo de Hoy', weekly: 'Pronóstico de la Semana', monthly: 'Panorama del Mes',
      love: 'Amor y Relaciones', career: 'Trabajo y Carrera',
      health: 'Salud y Bienestar', finances: 'Dinero y Finanzas',
      spirituality: 'Espiritualidad y Crecimiento', compatibility: 'Compatibilidad Amorosa',
      luckyColor: 'Tu Color de la Suerte', luckyStone: 'Tu Piedra Protectora',
      luckyNumbers: 'Números de la Suerte', favorableHour: 'Mejor Momento del Día',
      moonPhase: 'Fase de la Luna', moonInfluence: 'Cómo te Influye la Luna',
      energyLevel: 'Nivel de Energía', advice: 'Consejo del Astrólogo',
      summary: 'Resumen del Día', guidance: 'Orientación Especial',
      luckyColors: ["rojo", "azul", "verde", "dorado", "púrpura", "blanco", "naranja", "rosa", "turquesa", "plata", "marrón", "amarillo"],
      luckyStones: ["amatista", "cuarzo rosa", "ojo de tigre", "citrino", "jade", "granate", "topacio", "aguamarina", "obsidiana", "turmalina negra", "cristal", "lapislázuli"],
      intensity: { daily: 'ahora', weekly: 'esta semana', monthly: 'este mes' },
      connectors: {
        key: 'la clave es',
        favors: 'favorece',
        asks: 'pide',
      },
      vedicActions: [
        "recita el mantra del regente de tu nakshatra", "haz donaciones al regente planetario",
        "medita en la deidad de tu nakshatra", "usa el color favorable del nakshatra",
        "evita iniciar actividades importantes sin consultar el panchanga", "practica la gratitud a los ancestros",
        "ofrece agua al Sol naciente", "ayuna el día del regente planetario",
        "usa la gema del planeta regente", "visita un templo o lugar sagrado",
        "realiza puja a la deidad del nakshatra", "recita el Gayatri Mantra 108 veces",
        "ofrece flores a la deidad regente", "haz caridad a los necesitados",
        "medita en la dirección favorable del nakshatra", "evita conflictos y discusiones",
        "inicia nuevas prácticas espirituales", "honra a tus maestros y mentores",
        "haz ofrendas a los elementos naturales", "practica ahimsa (no-violencia)",
      ],
      vedicWatchouts: [
        "evita iniciar viajes largos sin un muhurta favorable", "no tomes decisiones importantes bajo presión",
        "cuidado con los excesos emocionales", "evita discusiones con autoridades",
        "no ignores las señales del cuerpo y la mente", "evita los gastos impulsivos",
        "cuidado con las promesas hechas bajo emoción", "no inicies relaciones bajo un nakshatra desfavorable",
        "evita los alimentos pesados y támicos", "cuidado con la envidia y los celos",
        "no descuides as prácticas espirituales diarias", "evita los chismes y juicios",
        "cuidado con las decisiones financieras impulsivas", "no ignores las intuiciones persistentes",
        "evita los conflictos familiares", "cuidado con el orgullo y la arrogancia",
      ],
      moonInfluences: {
        full: 'alta intensidad emocional',
        new: 'momento de sembrar intenciones',
        crescent: 'energía de expansión y acción',
        waning: 'energía de reflexión y cierre',
      },
    },
    signs: {
      aries: 'Aries', taurus: 'Tauro', gemini: 'Géminis', cancer: 'Cáncer',
      leo: 'Leo', virgo: 'Virgo', libra: 'Libra', scorpio: 'Escorpio',
      sagittarius: 'Sagitario', capricorn: 'Capricornio', aquarius: 'Acuario', pisces: 'Piscis',
    },
    planets: {
      sun: 'Sol', moon: 'Luna', mercury: 'Mercurio', venus: 'Venus', mars: 'Marte',
      jupiter: 'Júpiter', saturn: 'Saturno', uranus: 'Urano', neptune: 'Neptuno',
      pluto: 'Plutón', chiron: 'Quirón', lilith: 'Lilith',
      ceres: 'Ceres', pallas: 'Palas', juno: 'Juno', vesta: 'Vesta',
      rahu: 'Rahu', ketu: 'Ketu',
      northNode: 'Nodo Norte', southNode: 'Nodo Sur', fortune: 'Parte de la Fortuna',
    },
    houses: {
      1: 'Casa 1 — Quién Eres', 2: 'Casa 2 — Tus Valores y Dinero',
      3: 'Casa 3 — Comunicación y Aprendizaje', 4: 'Casa 4 — Hogar y Familia',
      5: 'Casa 5 — Creatividad y Romance', 6: 'Casa 6 — Rutina y Salud',
      7: 'Casa 7 — Parejas y Matrimonio', 8: 'Casa 8 — Transformación y Renacimiento',
      9: 'Casa 9 — Viajes y Filosofía', 10: 'Casa 10 — Carrera y Reconocimiento',
      11: 'Casa 11 — Amigos y Proyectos', 12: 'Casa 12 — Espiritualidad e Intuición',
    },
    aspects: {
      conjunction: 'Conjunción (energía fusionada)', sextile: 'Sextil (oportunidad fluida)',
      square: 'Cuadratura (tensión desafiante)', trine: 'Trígono (armonía natural)',
      opposition: 'Oposición (polaridad por equilibrar)', quincunx: 'Quincuncio (ajuste necesario)',
      semisextile: 'Semisextil (pequeña oportunidad)', semisquare: 'Semicuadrado (leve tensión)',
      sesquiquadrate: 'Sesquicuadrado (fricción persistente)',
      quintile: 'Quintil (talento creativo)', biquintile: 'Bi-quintil (creatividad reforzada)',
      septile: 'Séptil (ritmo espiritual sutil)',
    },
    aspectPatterns: {
      grandTrine: 'Gran Trígono — flujo armonioso entre tres puntos de la carta.',
      tSquare: 'T-Cuadrado — tensión dinámica con vértice de acción.',
      yod: 'Dedo de Dios (Yod) — destino que exige ajuste; foco en el vértice.',
      grandCross: 'Gran Cruz — cuatro tensiones en cruz; equilibrio y madurez.',
      stellium: 'Estelio — energía concentrada en un signo o grupo de casas.',
      mysticRectangle: 'Rectángulo místico — tensiones equilibradas por trígonos y sextiles.',
    },
    dashboard: {
      title: 'Tu Panel Astrológico',
      subtitle: 'La API de Astrología más completa de internet — cartas, horóscopos y predicciones',
      natalChart: 'Carta Natal Completa', horoscope: 'Horóscopo Personalizado',
      astrocartography: 'Astrocartografía — Mejores Lugares', annualPredictions: 'Predicciones del Año',
      vedicChart: 'Carta Védica (Jyotish)', rectification: 'Rectificación de Hora',
      submit: 'Calcular Mi Carta', loading: 'Calculando posiciones planetarias...',
      result: 'Tu Resultado', form: 'Completa Tus Datos',
      date: 'Fecha de Nacimiento', time: 'Hora de Nacimiento',
      latitude: 'Latitud', longitude: 'Longitud',
      houseSystem: 'Sistema de Casas', sign: 'Tu Signo',
      period: 'Período Deseado', language: 'Idioma',
    },
    vedic: {
      nakshatra: 'Nakshatra (Constelación Lunar)', pada: 'Pada (Cuarto del Nakshatra)',
      dasha: 'Dasha (Período Planetario)', ayanamsa: 'Ayanamsa (Diferencia Sideral)',
      divisionalChart: 'Carta Divisional (Varga)', lord: 'Regente',
      deity: 'Deidad Protectora', symbol: 'Símbolo Sagrado',
    },
    rectification: {
      title: 'Rectificación de la Hora de Nacimiento', event: 'Evento de Vida',
      events: 'Eventos Conocidos de Tu Vida', bestTime: 'Hora Más Probable',
      confidence: 'Nivel de Confianza', ascendantMatch: 'Concordancia del Ascendente',
      midheavenMatch: 'Concordancia del Medio Cielo',
    },
    astrocartography: {
      title: 'Astrocartografía — Mapa de Líneas Planetarias',
      lines: 'Líneas Planetarias por el Mundo', hotspots: 'Regiones de Mayor Intensidad',
      interpretation: 'Qué Significa Esto para Ti',
      bestLocations: 'Mejores Lugares para Vivir o Viajar',
      challenges: 'Lugares donde Tener Cuidado', opportunities: 'Oportunidades en Cada Región',
    },
    annual: {
      title: 'Predicciones para Todo el Año', overview: 'Vista General del Año',
      theme: 'Tema Principal del Año', rulingPlanet: 'Planeta Regente del Año',
      month: 'Mes', retrograde: 'Período Retrógrado', energy: 'Energía del Mes',
      keyTransitJupiter: 'Júpiter en {sign} trae expansión',
      keyTransitSaturn: 'Saturno estructura tu camino',
      keyTransitEclipses: 'Los eclipses en el eje {sign}-{opposite} activan tu eje solar',
      solarReturnHighlight: 'Tu retorno solar en {year} activa la casa de {house}',
      eclipsesImpact: 'Los eclipses en el eje {sign}-{opposite} traen cambios en tu área solar',
      yearlyAdvice: 'Apóyate en {theme}. Usa los retrógrados para revisar y los directos para actuar. Mantén tu propósito solar en {sun}.',
      overviewSummary: '{theme}. Júpiter en {jupiterSign} favorece {influence}. El año tiene {n} ventanas retrógradas importantes.',
      monthOpp1: 'Enfócate en {topic}',
      monthOpp2: 'Aprovecha {topic}',
      monthCh1: 'Atención a {topic}',
      monthCh2: 'Cuida {topic}',
      monthAdvice: '{month} pide {spiritual}. Energía {energy}/10.',
      jupiterYearThemes: [
        'Año de acción y nuevos comienzos', 'Año de construcción y estabilidad', 'Año de comunicación y aprendizaje',
        'Año de emociones y hogar', 'Año de creatividad y expresión', 'Año de organización y salud',
        'Año de parejas y equilibrio', 'Año de transformación y poder', 'Año de expansión y aventura',
        'Año de estructura y logros', 'Año de innovación y comunidad', 'Año de espiritualidad y compasión',
      ],
      jupiterInfluences: [
        'acción e iniciativa', 'abundancia material', 'aprendizaje y diálogo', 'crecimiento emocional',
        'creatividad y visibilidad', 'salud y orden', 'armonía en pareja', 'profundidad y poder',
        'expansión y aventura', 'disciplina y metas', 'innovación y redes', 'fe y compasión',
      ],
      solarReturnHouses: [
        'identidad', 'valores y dinero', 'aprendizaje', 'hogar y raíces',
        'creatividad y romance', 'rutina y salud', 'parejas', 'recursos compartidos',
        'viajes y sentido', 'carrera y reputación', 'amigos y proyectos', 'descanso y espíritu',
      ],
      retrogradeAdvice: {
        mercury: 'Revisa mensajes, contratos y viajes. Evita lanzar grandes proyectos de comunicación.',
        venus: 'Reevalúa amor y dinero. Evita compras grandes o cambios de imagen.',
        mars: 'Canaliza el impulso. Replantea planes en lugar de forzar.',
      },
      genericMonthly: {
        love: 'amor y vínculo emocional', career: 'trabajo y propósito', finance: 'dinero y recursos',
        health: 'cuerpo y vitalidad', spiritual: 'ritmo interior y sentido',
      },
      transitSymbolic: 'Tránsitos simbólicos del mes respecto a la carta natal.',
    },
    months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    weekdays: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
    elements: { fire: 'Fuego 🔥', earth: 'Tierra 🌍', air: 'Aire 💨', water: 'Agua 🌊' },
    modalities: { cardinal: 'Cardinal (iniciador)', fixed: 'Fijo (estabilizador)', mutable: 'Mutable (adaptable)' },
    errors: {
      invalidDate: '¡Ups! Esa fecha no parece correcta. Revísala e intenta de nuevo.',
      invalidSign: 'Signo no encontrado. Asegúrate de escribirlo bien (ej: aries, tauro, géminis...)',
      invalidApiKey: 'Clave de API no válida. Revisa tu clave e intenta de nuevo.',
      rateLimit: 'Has alcanzado el límite de consultas de tu plan. Espera un poco o considera actualizar.',
      serverError: '¡Algo salió mal de nuestro lado. Estamos trabajando en ello!',
      notFound: 'No encontramos lo que buscas. Revisa la dirección e intenta de nuevo.',
    },
  },
  hi: {
    horoscope: {
      daily: 'आज का राशिफल', weekly: 'इस सप्ताह का पूर्वानुमान', monthly: 'इस माह की समग्र स्थिति',
      love: 'प्रेम और संबंध', career: 'कार्य और करियर',
      health: 'स्वास्थ्य और कल्याण', finances: 'धन और वित्त',
      spirituality: 'आध्यात्मिकता और विकास', compatibility: 'प्रेम संगतता',
      luckyColor: 'आपका भाग्यशाली रंग', luckyStone: 'आपका रत्न',
      luckyNumbers: 'भाग्यशाली अंक', favorableHour: 'दिन का सर्वोत्तम समय',
      moonPhase: 'चंद्रमा की स्थिति', moonInfluence: 'चंद्रमा का आप पर प्रभाव',
      energyLevel: 'ऊर्जा स्तर', advice: 'ज्योतिषी की सलाह',
      summary: 'आज का सार', guidance: 'विशेष मार्गदर्शन',
      luckyColors: ["लाल", "नीला", "हरा", "सुनहरा", "बैंगनी", "सफेद", "नारंगी", "गुलाबी", "फिरोजा", "चांदी", "भूरा", "पीला"],
      luckyStones: ["नीलम", "गुलाबी क्वार्ट्ज", "टाइगर आई", "जित्नी", "जेड", "गोमेद", "पुखराज", "एक्वामरीन", "ओबसीडियन", "ब्लैक टूमलाइन", "स्फटिक", "लाजवर्त"],
      intensity: { daily: 'अब', weekly: 'इस सप्ताह', monthly: 'इस महीने' },
      connectors: {
        key: 'मुख्य बात यह है',
        favors: 'अनुकूल है',
        asks: 'मांग करता है',
      },
      vedicActions: [
        "अपने नक्षत्र के स्वामी के मंत्र का जाप करें", "ग्रह स्वामी को दान करें",
        "अपने नक्षत्र के देवता पर ध्यान लगाएं", "नक्षत्र के अनुकूल रंग का प्रयोग करें",
        "पंचांग परामर्श के बिना महत्वपूर्ण कार्य शुरू करने से बचें", "पूर्वजों के प्रति कृतज्ञता व्यक्त करें",
        "उगते सूर्य को अर्घ्य दें", "ग्रह स्वामी के दिन उपवास रखें",
        "स्वामी ग्रह का रत्न धारण करें", "मंदिर या पवित्र स्थान के दर्शन करें",
        "नक्षत्र देवता की पूजा करें", "गायत्री मंत्र का 108 बार जाप करें",
        "अधिष्ठात्री देवता को पुष्प अर्पित करें", "जरूरतमंदों को दान दें",
        "नक्षत्र की अनुकूल दिशा में ध्यान करें", "कलह और विवाद से बचें",
        "नई आध्यात्मिक साधनाएं शुरू करें", "अपने शिक्षकों और गुरुओं का सम्मान करें",
        "प्राकृतिक तत्वों को अर्घ्य दें", "अहिंसा का पालन करें",
      ],
      vedicWatchouts: [
        "शुभ मुहूर्त के बिना लंबी यात्रा शुरू करने से बचें", "दबाव में महत्वपूर्ण निर्णय न लें",
        "भावनात्मक अतिरेक से सावधान रहें", "अधिकारियों के साथ विवाद से बचें",
        "शरीर और मन के संकेतों को अनदेखा न करें", "आवेगपूर्ण खर्च से बचें",
        "भावना में आकर किए गए वादों से सावधान रहें", "प्रतिकूल नक्षत्र में संबंध शुरू न करें",
        "भारी और तामसिक भोजन से बचें", "ईर्ष्या और द्वेष से सावधान रहें",
        "दैनिक आध्यात्मिक साधनाओं की उपेक्षा न करें", "गपशप और आलोचना से बचें",
        "आवेगपूर्ण वित्तीय निर्णयों से सावधान रहें", "लगातार होने वाले अंतर्ज्ञान की अनदेखी न करें",
        "पारिवारिक विवादों से बचें", "गर्व और अहंकार से सावधान रहें",
      ],
      moonInfluences: {
        full: 'उच्च भावनात्मक तीव्रता',
        new: 'इरादे तय करने का समय',
        crescent: 'विस्तार और कार्रवाई की ऊर्जा',
        waning: 'प्रतिबिंब और समापन की ऊर्जा',
      },
    },
    signs: {
      aries: 'मेष', taurus: 'वृषभ', gemini: 'मिथुन', cancer: 'कर्क',
      leo: 'सिंह', virgo: 'कन्या', libra: 'तुला', scorpio: 'वृश्चिक',
      sagittarius: 'धनु', capricorn: 'मकर', aquarius: 'कुंभ', pisces: 'मीन',
    },
    planets: {
      sun: 'सूर्य', moon: 'चंद्रमा', mercury: 'बुध', venus: 'शुक्र', mars: 'मंगल',
      jupiter: 'गुरु (बृहस्पति)', saturn: 'शनि', uranus: 'अरुण', neptune: 'वरुण',
      pluto: 'यम', chiron: 'किरोन', lilith: 'लिलिथ',
      ceres: 'सीरीस', pallas: 'पैलास', juno: 'जूनो', vesta: 'वेस्टा',
      rahu: 'राहु', ketu: 'केतु',
      northNode: 'राहु', southNode: 'केतु', fortune: 'भाग्य भाग',
    },
    houses: {
      1: 'भाव 1 — आपकी पहचान', 2: 'भाव 2 — मूल्य और धन',
      3: 'भाव 3 — संचार और शिक्षा', 4: 'भाव 4 — घर और परिवार',
      5: 'भाव 5 — रचनात्मकता और प्रेम', 6: 'भाव 6 — दैनिक दिनचर्या और स्वास्थ्य',
      7: 'भाव 7 — साझेदारी और विवाह', 8: 'भाव 8 — परिवर्तन और पुनर्जन्म',
      9: 'भाव 9 — यात्रा और दर्शन', 10: 'भाव 10 — करियर और प्रतिष्ठा',
      11: 'भाव 11 — मित्र और समुदाय', 12: 'भाव 12 — आध्यात्मिकता और अंतर्मन',
    },
    aspects: {
      conjunction: 'युति (एकीकृत ऊर्जा)', sextile: 'षट्कोण (सहज अवसर)',
      square: 'वर्ग (चुनौतीपूर्ण तनाव)', trine: 'त्रिकोण (प्राकृतिक सामंजस्य)',
      opposition: 'विपरीत (संतुलन की आवश्यकता)', quincunx: 'असमकोण (समायोजन आवश्यक)',
      semisextile: 'अर्ध-षट्कोण (छोटा अवसर)', semisquare: 'अर्ध-वर्ग (हल्का तनाव)',
      sesquiquadrate: 'डेढ़-वर्ग (लगातार घर्षण)',
      quintile: 'पंचांश (रचनात्मक प्रतिभा)', biquintile: 'द्वि-पंचांश (रचनात्मकता बलवान)',
      septile: 'सप्तांश (सूक्ष्म आध्यात्मिक लय)',
    },
    aspectPatterns: {
      grandTrine: 'महा त्रिकोण — तीन बिंदुओं के बीच सामंजस्यपूर्ण प्रवाह।',
      tSquare: 'टी-वर्ग — गतिशील तनाव और शिखर पर फोकस।',
      yod: 'योड (ईश्वरीय उंगली) — शिखर ग्रह पर समायोजन और ध्यान।',
      grandCross: 'महा क्रॉस — चतुर्दिक तनाव; संतुलन आवश्यक।',
      stellium: 'स्थिर समूह — एक राशि में केंद्रित ऊर्जा।',
      mysticRectangle: 'रहस्यमय आयत — त्रिकोण और षट्कोण से संतुलित तनाव।',
    },
    dashboard: {
      title: 'आपका ज्योतिष डैशबोर्ड',
      subtitle: 'इंटरनेट पर सबसे पूर्ण ज्योतिष API — कुंडली, राशिफल और भविष्यवाणियाँ',
      natalChart: 'संपूर्ण जन्म कुंडली', horoscope: 'व्यक्तिगत राशिफल',
      astrocartography: 'एस्ट्रोकार्टोग्राफी — सर्वोत्तम स्थान', annualPredictions: 'वार्षिक भविष्यवाणी',
      vedicChart: 'वैदिक कुंडली (ज्योतिष)', rectification: 'जन्म समय सुधार',
      submit: 'मेरी कुंडली बनाएं', loading: 'ग्रहों की स्थिति की गणना हो रही है...',
      result: 'आपका परिणाम', form: 'अपना विवरण दर्ज करें',
      date: 'जन्म तिथि', time: 'जन्म समय',
      latitude: 'अक्षांश', longitude: 'देशांतर',
      houseSystem: 'भाव प्रणाली', sign: 'आपकी राशि',
      period: 'समय अवधि', language: 'भाषा',
    },
    vedic: {
      nakshatra: 'नक्षत्र (चंद्र नक्षत्र)', pada: 'पाद (नक्षत्र का चौथाई भाग)',
      dasha: 'दशा (ग्रह काल)', ayanamsa: 'अयनांश (साइडरियल अंतर)',
      divisionalChart: 'विभाजन कुंडली (वर्ग)', lord: 'स्वामी ग्रह',
      deity: 'अधिष्ठात्री देवता', symbol: 'पवित्र प्रतीक',
    },
    rectification: {
      title: 'जन्म समय सुधार', event: 'जीवन घटना',
      events: 'आपकी ज्ञात जीवन घटनाएं', bestTime: 'सबसे संभावित जन्म समय',
      confidence: 'विश्वास स्तर', ascendantMatch: 'लग्न मिलान',
      midheavenMatch: 'मध्य आकाश मिलान',
    },
    astrocartography: {
      title: 'एस्ट्रोकार्टोग्राफी — ग्रह रेखा मानचित्र',
      lines: 'विश्व भर में ग्रह रेखाएं', hotspots: 'सर्वाधिक तीव्रता वाले क्षेत्र',
      interpretation: 'आपके लिए इसका क्या अर्थ है',
      bestLocations: 'रहने या यात्रा के लिए सर्वोत्तम स्थान',
      challenges: 'सावधानी बरतने वाले स्थान', opportunities: 'प्रत्येक क्षेत्र में अवसर',
    },
    annual: {
      title: 'आपका आने वाला वर्ष', overview: 'वर्ष का सारांश',
      theme: 'वर्ष का मुख्य विषय', rulingPlanet: 'वर्ष का शासक ग्रह',
      month: 'महीना', retrograde: 'वक्री अवधि', energy: 'मासिक ऊर्जा',
      keyTransitJupiter: '{sign} में बृहस्पति विस्तार लाता है',
      keyTransitSaturn: 'शनि आपकी यात्रा को संरचित करता है',
      keyTransitEclipses: '{sign}-{opposite} अक्ष पर ग्रहण आपकी सौर कहानी को सक्रिय करते हैं',
      solarReturnHighlight: '{year} में सौर वापसी {house} भाव को उजागर करती है',
      eclipsesImpact: '{sign}-{opposite} अक्ष पर ग्रहण आपके सौर क्षेत्र में बदलाव लाते हैं',
      yearlyAdvice: '{theme} पर ध्यान दें। वक्री काल में समीक्षा करें, मार्गी समय में कार्रवाई करें। {sun} में सौर उद्देश्य के साथ रहें।',
      overviewSummary: '{theme}। {jupiterSign} में बृहस्पति {influence} का समर्थन करता है। वर्ष में {n} प्रमुख वक्री खिड़कियाँ हैं।',
      monthOpp1: '{topic} पर ध्यान केंद्रित करें',
      monthOpp2: '{topic} का लाभ उठाएं',
      monthCh1: '{topic} पर सावधानी',
      monthCh2: '{topic} की देखभाल करें',
      monthAdvice: '{month} {spiritual} मांगता है। ऊर्जा {energy}/10।',
      jupiterYearThemes: [
        'कार्रवाई और नई शुरुआत का वर्ष', 'निर्माण और स्थिरता का वर्ष', 'संवाद और सीखने का वर्ष',
        'भावनाओं और घर का वर्ष', 'रचनात्मकता और अभिव्यक्ति का वर्ष', 'व्यवस्था और स्वास्थ्य का वर्ष',
        'साझेदारी और संतुलन का वर्ष', 'रूपांतरण और शक्ति का वर्ष', 'विस्तार और साहसिकता का वर्ष',
        'संरचना और उपलब्धि का वर्ष', 'नवाचार और समुदाय का वर्ष', 'आध्यात्मिकता और करुणा का वर्ष',
      ],
      jupiterInfluences: [
        'गति और पहल', 'भौतिक समृद्धि', 'सीखना और संवाद', 'भावनात्मक विकास',
        'रचनात्मक अभिव्यक्ति', 'स्वास्थ्य और व्यवस्था', 'संबंध सामंजस्य', 'गहराई और शक्ति',
        'विस्तार और साहसिकता', 'अनुशासन और लक्ष्य', 'नवाचार और नेटवर्क', 'आस्था और करुणा',
      ],
      solarReturnHouses: [
        'स्व और पहचान', 'मूल्य और धन', 'सीखना', 'घर और जड़ें',
        'रचनात्मकता और प्रेम', 'दिनचर्या और स्वास्थ्य', 'साझेदारी', 'साझा संसाधन',
        'यात्रा और अर्थ', 'करियर और प्रतिष्ठा', 'मित्र और आशाएं', 'विश्राम और आत्मा',
      ],
      retrogradeAdvice: {
        mercury: 'संदेश, अनुबंध और यात्रा की समीक्षा करें। बड़े संचार प्रोजेक्ट शुरू करने से बचें।',
        venus: 'प्रेम और धन पर पुनर्विचार करें। बड़ी खरीद या रूप बदलाव टालें।',
        mars: 'ऊर्जा संयमित करें। जोर देने के बजाय योजनाओं को फिर से तय करें।',
      },
      genericMonthly: {
        love: 'हृदय संबंध', career: 'काम और उद्देश्य', finance: 'धन और संसाधन',
        health: 'शरीर और जीवन शक्ति', spiritual: 'आंतरिक लय और अर्थ',
      },
      transitSymbolic: 'जन्म कुंडली के सापेक्ष प्रतीकात्मक मासिक गोचर।',
    },
    months: ['जनवरी', 'फरवरी', 'मार्च', 'अप्रैल', 'मई', 'जून', 'जुलाई', 'अगस्त', 'सितंबर', 'अक्टूबर', 'नवंबर', 'दिसंबर'],
    weekdays: ['रविवार', 'सोमवार', 'मंगलवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार'],
    elements: { fire: 'अग्नि 🔥', earth: 'पृथ्वी 🌍', air: 'वायु 💨', water: 'जल 🌊' },
    modalities: { cardinal: 'चर (प्रारंभकर्ता)', fixed: 'स्थिर (स्थिरीकरण)', mutable: 'द्विस्वभाव (अनुकूलनशील)' },
    errors: {
      invalidDate: 'अरे! यह तिथि सही नहीं लग रही। कृपया जांचें और पुनः प्रयास करें।',
      invalidSign: 'राशि नहीं मिली। कृपया सही नाम लिखें (जैसे: मेष, वृषभ, मिथुन...)',
      invalidApiKey: 'अमान्य API कुंजी। कृपया अपनी कुंजी जांचें और पुनः प्रयास करें।',
      rateLimit: 'आपने अपने प्लान की सीमा पार कर ली है। कृपया प्रतीक्षा करें या प्लान अपग्रेड करें।',
      serverError: 'हमारी ओर से कुछ त्रुटि हुई। हम इस पर काम कर रहे हैं!',
      notFound: 'हमें वह नहीं मिला जो आप ढूंढ रहे हैं। कृपया URL जांचें और पुनः प्रयास करें।',
    },
  },
};

export function detectLanguage(acceptLanguage?: string): Language {
  if (!acceptLanguage) return 'en';
  const lang = acceptLanguage.toLowerCase();
  if (lang.startsWith('hi') || lang.startsWith('in')) return 'hi';
  if (lang.startsWith('es') || lang.startsWith('mx') || lang.startsWith('ar')) return 'es';
  if (lang.startsWith('en') || lang.startsWith('us') || lang.startsWith('gb')) return 'en';
  if (lang.startsWith('pt') || lang.startsWith('br')) return 'pt';
  return 'en';
}

export function getTranslations(lang: Language = 'en'): Translations {
  return translations[lang];
}

export function getTextWithFallback(
  ptText: string | undefined,
  enText: string | undefined,
  esText: string | undefined,
  hiText: string | undefined,
  lang: Language = 'en'
): string {
  if (lang === 'en' && enText) return enText;
  if (lang === 'es' && esText) return esText;
  if (lang === 'hi' && hiText) return hiText;
  return ptText || '';
}

export function t(lang: Language, key: string): string {
  const keys = key.split('.');
  let obj: any = translations[lang];
  for (const k of keys) {
    if (obj && typeof obj === 'object' && k in obj) {
      obj = obj[k];
    } else {
      return key;
    }
  }
  return typeof obj === 'string' ? obj : key;
}
