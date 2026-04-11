/**
 * Textos gerados pela API védica (prose + erros de rota).
 * Quatro línguas: en (referência), pt, es, hi.
 */
import type { Language } from "../i18n.js";
import { fmt } from "./fmt.js";

export { fmt };

export interface VedicApiMessages {
  errors: Record<string, string>;
  shadbala: {
    planetExtreme: string;
    planetStrong: string;
    planetModerate: string;
    planetWeak: string;
    planetVeryWeak: string;
    chartVeryStrong: string;
    chartStrong: string;
    chartModerate: string;
    chartWeak: string;
  };
  ashtakavarga: string;
  panchanga: {
    dayVeryAuspicious: string;
    dayAuspicious: string;
    dayNeutral: string;
    dayInauspicious: string;
    dayVeryInauspicious: string;
    pakshaShukla: string;
    pakshaKrishna: string;
    overall: string;
    abhijitLine: string;
    brahmaLine: string;
    vijayaLine: string;
    rahukaalLine: string;
    yamagandaLine: string;
    gulikaLine: string;
    durMuhurtaLine: string;
    karanaChara: string;
    karanaSthira: string;
  };
  muhurta: {
    tithiFav: string;
    tithiWeak: string;
    nakFav: string;
    nakWeak: string;
    varaFav: string;
    varaWeak: string;
    yogaFav: string;
    yogaBad: string;
    badWindow: string;
    abhijitBonus: string;
    recExcellent: string;
    recGood: string;
    recFair: string;
    recPoor: string;
  };
  grahaYuddha: {
    interpretation: string;
    effect1: string;
    effect2: string;
    effect3: string;
  };
  prasna: {
    houseLordFav: string;
    houseLordCh: string;
    horaFav: string;
    answerHigh: string;
    answerMid: string;
    answerLow: string;
    timing: string;
    recHigh: string;
    recMid: string;
    recLow: string;
    categoryGeral: string;
    categoryAmor: string;
    categoryCasamento: string;
    categoryDinheiro: string;
    categoryCarreira: string;
    categorySaude: string;
    categoryViagem: string;
    categoryEducacao: string;
    categoryFilhos: string;
    categoryImovel: string;
    categoryJustica: string;
    unknownLord: string;
  };
  dashaSandhi: {
    mahaInterp: string;
    mahaRec: string;
    antInterp: string;
    antRec: string;
    noneInterp: string;
    noneRec: string;
    typeNone: string;
    typeMaha: string;
    typeAnt: string;
  };
  argala: {
    strong: string;
    medium: string;
    typeArgala: string;
    typeVirodh: string;
    interpDomArgala: string;
    interpDomVirodh: string;
  };
  drishti: {
    specialAsp: string;
    asp7: string;
    interp: string;
  };
  avastha: {
    bala: string[];
    jagrat: string;
    swapna: string;
    deepta: string[];
    interp: string;
  };
  tara: {
    names: string[];
    auspicious: string;
    inauspicious: string;
    neutral: string;
    interp: string;
  };
  gochara: {
    default: string;
    fav: string;
    unfav: string;
    effectGood1: string;
    effectGood2: string;
    effectBad1: string;
    effectBad2: string;
    duration: string;
    jupiter: Partial<Record<number, string>>;
    saturn: Partial<Record<number, string>>;
    rahu: Partial<Record<number, string>>;
  };
  vimsopaka: {
    interp: string;
    strong: string;
    moderate: string;
    weak: string;
  };
}

const EN: VedicApiMessages = {
  errors: {
    longitudeRange: "Longitude must be between 0 and 360.",
    moonLongitudeBirthDateRequired: "moonLongitude and birthDate are required.",
    planetsAscendantLongitudeRequired: "planets and ascendantLongitude are required.",
    planetsHousesRequired: "planets and houses are required.",
    planetsAscendantSignBirthRequired: "planets, ascendantSign, and birthDate are required.",
    planetsRequired: "planets is required.",
    planetsBirthYearRequired: "planets, birthDate, and year are required.",
    planetsMoonLonRequired: "planets and moonLongitude are required.",
    invalidPayload: "Invalid payload.",
    vedicCompleteFailed: "Internal error while computing the Vedic chart.",
    vargottamaFailed: "Internal error while computing vargottama.",
    validationFailed: "Validation failed.",
    shadbalaFailed: "Error computing Shadbala.",
    ashtakavargaFailed: "Error computing Ashtakavarga.",
    sunMoonFailed: "Error computing Sun/Moon positions.",
    panchangaFailed: "Error computing Panchanga.",
    positionsFailed: "Error computing positions.",
    muhurtaFailed: "Error computing Muhurta.",
    grahaYuddhaFailed: "Error computing Graha Yuddha.",
    avasthasFailed: "Error computing Avasthas.",
    taraBalaFailed: "Error computing Tara Bala.",
    moonNotFound: "Moon not found.",
    gocharaFailed: "Error computing Gochara.",
    prasnaFailed: "Error computing Prasna.",
    dashaSandhiFailed: "Error computing Dasha Sandhi.",
    argalaFailed: "Error computing Argala/Drishti.",
  },
  shadbala: {
    planetExtreme: "{planet} extremely strong ({pct}%). Maximum ability to express its energy positively.",
    planetStrong: "{planet} strong ({pct}%). Good ability to express its energy.",
    planetModerate: "{planet} moderate ({pct}%). Reasonable capacity with some limitations.",
    planetWeak: "{planet} weak ({pct}%). Difficulty expressing its energy fully.",
    planetVeryWeak: "{planet} very weak ({pct}%). Energy significantly compromised. Remedies recommended.",
    chartVeryStrong: "Very strong chart (average {pct}%). {strongest} is the strongest planet, {weakest} the weakest. Excellent capacity for manifestation.",
    chartStrong: "Strong chart (average {pct}%). {strongest} is the strongest planet, {weakest} the weakest. Good capacity for manifestation.",
    chartModerate: "Moderate chart (average {pct}%). {strongest} is the strongest planet, {weakest} the weakest. Some areas need attention.",
    chartWeak: "Challenging chart (average {pct}%). {strongest} is the strongest planet, {weakest} the weakest. Remedies recommended to strengthen weak planets.",
  },
  ashtakavarga:
    "Sarvashtakavarga: Houses {strong} are strong ({nStrong} houses above average). Houses {weak} are weak. Average {avg} bindus per house.",
  panchanga: {
    dayVeryAuspicious: "Very auspicious",
    dayAuspicious: "Auspicious",
    dayNeutral: "Neutral",
    dayInauspicious: "Inauspicious",
    dayVeryInauspicious: "Very inauspicious",
    pakshaShukla: "Shukla",
    pakshaKrishna: "Krishna",
    overall:
      "Day {quality}. Tithi: {tithi} ({paksha}). Nakshatra: {nakshatra}. Yoga: {yoga}. Karana: {karana}. {yogaInterp}",
    abhijitLine: "Abhijit Muhurta: {start}-{end}",
    brahmaLine: "Brahma Muhurta: 04:30-06:00",
    vijayaLine: "Vijaya Muhurta: 14:00-14:48",
    rahukaalLine: "Rahukaal: {window}",
    yamagandaLine: "Yamaganda: {window}",
    gulikaLine: "Gulika: {window}",
    durMuhurtaLine: "Dur Muhurta: 08:00-08:48",
    karanaChara: "Chara (movable)",
    karanaSthira: "Sthira (fixed)",
  },
  muhurta: {
    tithiFav: "Tithi {name} is favorable for {purpose}.",
    tithiWeak: "Tithi {name} is not ideal for {purpose}.",
    nakFav: "Nakshatra {name} is excellent for {purpose}.",
    nakWeak: "Nakshatra {name} is not ideal for {purpose}.",
    varaFav: "Weekday {name} is favorable.",
    varaWeak: "Weekday {name} is not ideal.",
    yogaFav: "Yoga {name} is auspicious.",
    yogaBad: "Yoga {name} is very inauspicious.",
    badWindow: "Time falls during Rahukaal/Yamaganda.",
    abhijitBonus: "During Abhijit Muhurta — highly auspicious.",
    recExcellent: "Excellent timing for {purpose}. Cosmic factors are well aligned.",
    recGood: "Good timing for {purpose}. Most factors are favorable.",
    recFair: "Fair timing for {purpose}. Some unfavorable factors present.",
    recPoor: "Unfavorable timing for {purpose}. Choose another time if possible.",
  },
  grahaYuddha: {
    interpretation: "{winner} defeated {loser} in planetary war. {winner} is stronger; {loser} is weakened.",
    effect1: "{winner} expresses its energy more strongly.",
    effect2: "{loser}'s energy is compromised.",
    effect3: "Areas ruled by {loser} may face challenges.",
  },
  prasna: {
    houseLordFav: "Lord of house {house} ({lord}) in a favorable sector.",
    houseLordCh: "Lord of house {house} ({lord}) in a challenging sector.",
    horaFav: "Hour ruler ({lord}) in a favorable position.",
    answerHigh: "Yes — the answer is favorable for your question about {topic}. Cosmic factors support it.",
    answerMid: "Mixed answer — some factors are favorable, others challenging for {topic}.",
    answerLow: "Unfavorable at this moment — wait for a more auspicious time for {topic}.",
    timing: "Expected outcome in about {months} months.",
    recHigh: "Proceed with confidence.",
    recMid: "Proceed with caution.",
    recLow: "Wait for a more favorable moment.",
    categoryGeral: "general matters",
    categoryAmor: "love",
    categoryCasamento: "marriage",
    categoryDinheiro: "money",
    categoryCarreira: "career",
    categorySaude: "health",
    categoryViagem: "travel",
    categoryEducacao: "education",
    categoryFilhos: "children",
    categoryImovel: "property",
    categoryJustica: "legal matters",
    unknownLord: "Unknown",
  },
  dashaSandhi: {
    mahaInterp: "Mahadasha junction period. Important energetic transition. {days} days remaining.",
    mahaRec: "Avoid major decisions during this transition. Focus on meditation and reflection.",
    antInterp: "Antardasha junction period. Moderate energetic transition. {days} days remaining.",
    antRec: "Exercise caution with important decisions. Period of energetic adjustment.",
    noneInterp: "Outside a junction period. Energy is stable.",
    noneRec: "Stable moment for actions and decisions.",
    typeNone: "None",
    typeMaha: "Mahadasha",
    typeAnt: "Antardasha",
  },
  argala: {
    strong: "Strong",
    medium: "Medium",
    typeArgala: "Argala",
    typeVirodh: "Virodh Argala",
    interpDomArgala:
      "House {house}: {nArg} argalas, {nVir} virodh argalas. Argalas dominate — house strengthened.",
    interpDomVirodh:
      "House {house}: {nArg} argalas, {nVir} virodh argalas. Virodh argalas dominate — house challenged.",
  },
  drishti: {
    specialAsp: "Special {n}th-house aspect",
    asp7: "7th-house aspect",
    interp: "{planet} aspects house {house} with {pct}% strength.",
  },
  avastha: {
    bala: [
      "Bala (child) — immature but promising energy",
      "Kumara (youth) — developing energy",
      "Yuva (adult) — full mature energy",
      "Vriddha (elder) — experienced but declining energy",
      "Mrita (dead) — very weak energy",
    ],
    jagrat: "Jagrat (awake) — conscious and active",
    swapna: "Swapna (dreaming) — subconscious and passive",
    deepta: [
      "Deepta (bright) — radiant energy",
      "Mudita (joyful) — satisfied energy",
      "Kshudita (hungry) — unsatisfied energy",
      "Trishita (thirsty) — seeking energy",
    ],
    interp: "{planet} in {sign} at {deg}°: {bala}, {jagra}, {deepta}.",
  },
  tara: {
    names: [
      "Janma (birth)",
      "Sampat (wealth)",
      "Vipat (danger)",
      "Kshema (well-being)",
      "Pratyak (obstacle)",
      "Sadhana (achievement)",
      "Naidhana (death)",
      "Mitra (friend)",
      "Parama Mitra (best friend)",
    ],
    auspicious: "Auspicious",
    inauspicious: "Inauspicious",
    neutral: "Neutral",
    interp: "Tara {n}: {name}. {nature}. Compatibility: {pct}%.",
  },
  gochara: {
    default: "{planet} in the {hm}th house from the Moon ({ha}th from Ascendant). {end}",
    fav: "Favorable.",
    unfav: "Challenging.",
    effectGood1: "Favorable period",
    effectGood2: "Opportunities",
    effectBad1: "Challenges",
    effectBad2: "Caution advised",
    duration: "Until {sign} leaves its sign",
    jupiter: {
      1: "Jupiter in the 1st from Moon: personal expansion, optimism, spiritual growth.",
      2: "Jupiter in the 2nd from Moon: financial gains, blessed family.",
      5: "Jupiter in the 5th from Moon: children, creativity, expanded intelligence.",
      9: "Jupiter in the 9th from Moon: luck, spirituality, long journeys.",
      10: "Jupiter in the 10th from Moon: career success, recognition.",
      11: "Jupiter in the 11th from Moon: gains, friendships, wish fulfillment.",
    },
    saturn: {
      3: "Saturn in the 3rd from Moon: courage, effort, overcoming obstacles.",
      6: "Saturn in the 6th from Moon: victory over enemies, improved health.",
      11: "Saturn in the 11th from Moon: gains through hard work.",
    },
    rahu: {
      1: "Rahu in the 1st from Moon: mental confusion but also ambition.",
      3: "Rahu in the 3rd from Moon: courage, short trips, communication.",
      6: "Rahu in the 6th from Moon: victory over enemies, health challenges.",
      10: "Rahu in the 10th from Moon: professional ambition, unexpected success.",
      11: "Rahu in the 11th from Moon: unexpected gains, influential friends.",
    },
  },
  vimsopaka: {
    interp: "{planet}: {pct}% strength across vargas. {level}.",
    strong: "Strong",
    moderate: "Moderate",
    weak: "Weak",
  },
};

const PT: VedicApiMessages = {
  errors: {
    longitudeRange: "Longitude deve estar entre 0 e 360.",
    moonLongitudeBirthDateRequired: "moonLongitude e birthDate são obrigatórios.",
    planetsAscendantLongitudeRequired: "planets e ascendantLongitude são obrigatórios.",
    planetsHousesRequired: "planets e houses são obrigatórios.",
    planetsAscendantSignBirthRequired: "planets, ascendantSign e birthDate são obrigatórios.",
    planetsRequired: "planets é obrigatório.",
    planetsBirthYearRequired: "planets, birthDate e year são obrigatórios.",
    planetsMoonLonRequired: "planets e moonLongitude são obrigatórios.",
    invalidPayload: "Payload inválido.",
    vedicCompleteFailed: "Erro interno ao calcular mapa védico.",
    vargottamaFailed: "Erro interno ao calcular vargottama.",
    validationFailed: "Entrada inválida.",
    shadbalaFailed: "Erro ao calcular Shadbala.",
    ashtakavargaFailed: "Erro ao calcular Ashtakavarga.",
    sunMoonFailed: "Erro ao calcular posições solares/lunares.",
    panchangaFailed: "Erro ao calcular Panchanga.",
    positionsFailed: "Erro ao calcular posições.",
    muhurtaFailed: "Erro ao calcular Muhurta.",
    grahaYuddhaFailed: "Erro ao calcular Graha Yuddha.",
    avasthasFailed: "Erro ao calcular Avasthas.",
    taraBalaFailed: "Erro ao calcular Tara Bala.",
    moonNotFound: "Lua não encontrada.",
    gocharaFailed: "Erro ao calcular Gochara.",
    prasnaFailed: "Erro ao calcular Prasna.",
    dashaSandhiFailed: "Erro ao calcular Dasha Sandhi.",
    argalaFailed: "Erro ao calcular Argala/Drishti.",
  },
  shadbala: {
    planetExtreme: "{planet} extremamente forte ({pct}%). Capacidade máxima de expressar sua energia de forma positiva.",
    planetStrong: "{planet} forte ({pct}%). Boa capacidade de expressar sua energia.",
    planetModerate: "{planet} moderado ({pct}%). Capacidade razoável, mas com limitações.",
    planetWeak: "{planet} fraco ({pct}%). Dificuldade em expressar sua energia plenamente.",
    planetVeryWeak: "{planet} muito fraco ({pct}%). Energia significativamente comprometida. Requer remédios.",
    chartVeryStrong:
      "Mapa muito forte (média {pct}%). {strongest} é o planeta mais forte, {weakest} o mais fraco. Excelente capacidade de manifestação.",
    chartStrong:
      "Mapa forte (média {pct}%). {strongest} é o planeta mais forte, {weakest} o mais fraco. Boa capacidade de manifestação.",
    chartModerate:
      "Mapa moderado (média {pct}%). {strongest} é o planeta mais forte, {weakest} o mais fraco. Algumas áreas requerem atenção.",
    chartWeak:
      "Mapa desafiador (média {pct}%). {strongest} é o planeta mais forte, {weakest} o mais fraco. Remédios recomendados para fortalecer planetas fracos.",
  },
  ashtakavarga:
    "Sarvashtakavarga: Casas {strong} são fortes ({nStrong} casas acima da média). Casas {weak} são fracas. Média de {avg} bindus por casa.",
  panchanga: {
    dayVeryAuspicious: "Muito Auspicioso",
    dayAuspicious: "Auspicioso",
    dayNeutral: "Neutro",
    dayInauspicious: "Inauspicioso",
    dayVeryInauspicious: "Muito Inauspicioso",
    pakshaShukla: "Shukla",
    pakshaKrishna: "Krishna",
    overall:
      "Dia {quality}. Tithi: {tithi} ({paksha}). Nakshatra: {nakshatra}. Yoga: {yoga}. Karana: {karana}. {yogaInterp}",
    abhijitLine: "Abhijit Muhurta: {start}-{end}",
    brahmaLine: "Brahma Muhurta: 04:30-06:00",
    vijayaLine: "Vijaya Muhurta: 14:00-14:48",
    rahukaalLine: "Rahukaal: {window}",
    yamagandaLine: "Yamaganda: {window}",
    gulikaLine: "Gulika: {window}",
    durMuhurtaLine: "Dur Muhurta: 08:00-08:48",
    karanaChara: "Chara (móvel)",
    karanaSthira: "Sthira (fixo)",
  },
  muhurta: {
    tithiFav: "Tithi {name} é favorável para {purpose}.",
    tithiWeak: "Tithi {name} não é ideal para {purpose}.",
    nakFav: "Nakshatra {name} é excelente para {purpose}.",
    nakWeak: "Nakshatra {name} não é ideal para {purpose}.",
    varaFav: "Dia {name} é favorável.",
    varaWeak: "Dia {name} não é ideal.",
    yogaFav: "Yoga {name} é auspicioso.",
    yogaBad: "Yoga {name} é muito inauspicioso.",
    badWindow: "Horário durante Rahukaal/Yamaganda.",
    abhijitBonus: "Durante Abhijit Muhurta — muito auspicioso.",
    recExcellent: "Excelente momento para {purpose}. Todos os fatores cósmicos estão alinhados.",
    recGood: "Bom momento para {purpose}. A maioria dos fatores é favorável.",
    recFair: "Momento razoável para {purpose}. Alguns fatores desfavoráveis presentes.",
    recPoor: "Momento desfavorável para {purpose}. Recomenda-se escolher outro horário.",
  },
  grahaYuddha: {
    interpretation: "{winner} venceu {loser} na guerra planetária. {winner} está mais forte, {loser} está enfraquecido.",
    effect1: "{winner} expressa sua energia com mais força.",
    effect2: "{loser} tem sua energia comprometida.",
    effect3: "Áreas regidas por {loser} podem ter desafios.",
  },
  prasna: {
    houseLordFav: "Lorde da casa {house} ({lord}) em casa favorável.",
    houseLordCh: "Lorde da casa {house} ({lord}) em casa desafiadora.",
    horaFav: "Regente da hora ({lord}) em posição favorável.",
    answerHigh: "Sim, a resposta é favorável para sua pergunta sobre {topic}. Os fatores cósmicos apoiam.",
    answerMid: "A resposta é mista. Alguns fatores são favoráveis, outros desafiadores para {topic}.",
    answerLow: "A resposta é desfavorável no momento. Recomenda-se esperar um momento mais auspicioso para {topic}.",
    timing: "Resultado esperado em {months} meses.",
    recHigh: "Prossiga com confiança.",
    recMid: "Prossiga com cautela.",
    recLow: "Aguarde momento mais favorável.",
    categoryGeral: "assuntos gerais",
    categoryAmor: "amor",
    categoryCasamento: "casamento",
    categoryDinheiro: "dinheiro",
    categoryCarreira: "carreira",
    categorySaude: "saúde",
    categoryViagem: "viagem",
    categoryEducacao: "educação",
    categoryFilhos: "filhos",
    categoryImovel: "imóvel",
    categoryJustica: "justiça",
    unknownLord: "Desconhecido",
  },
  dashaSandhi: {
    mahaInterp: "Período de junção de Mahadasha. Transição energética importante. {days} dias restantes.",
    mahaRec: "Evitar decisões importantes durante este período de transição. Focar em meditação e introspecção.",
    antInterp: "Período de junção de Antardasha. Transição energética moderada. {days} dias restantes.",
    antRec: "Cautela em decisões importantes. Período de ajuste energético.",
    noneInterp: "Fora de período de junção. Energia estável.",
    noneRec: "Momento estável para ações e decisões.",
    typeNone: "Nenhum",
    typeMaha: "Mahadasha",
    typeAnt: "Antardasha",
  },
  argala: {
    strong: "Forte",
    medium: "Médio",
    typeArgala: "Argala",
    typeVirodh: "Virodh Argala",
    interpDomArgala:
      "Casa {house}: {nArg} argalas, {nVir} virodh argalas. Argalas dominam - casa fortalecida.",
    interpDomVirodh:
      "Casa {house}: {nArg} argalas, {nVir} virodh argalas. Virodh argalas dominam - casa desafiada.",
  },
  drishti: {
    specialAsp: "Aspecto especial {n}ª",
    asp7: "Aspecto 7ª",
    interp: "{planet} aspecta casa {house} com força {pct}%.",
  },
  avastha: {
    bala: [
      "Bala (Criança) - Energia imatura mas promissora",
      "Kumara (Jovem) - Energia em desenvolvimento",
      "Yuva (Adulto) - Energia plena e madura",
      "Vriddha (Idoso) - Energia experiente mas diminuindo",
      "Mrita (Morto) - Energia muito fraca",
    ],
    jagrat: "Jagrat (Desperto) - Consciente e ativo",
    swapna: "Swapna (Sonhando) - Subconsciente e passivo",
    deepta: [
      "Deepta (Brilhante) - Energia radiante",
      "Mudita (Feliz) - Energia satisfeita",
      "Kshudita (Faminto) - Energia insatisfeita",
      "Trishita (Sedento) - Energia buscando",
    ],
    interp: "{planet} em {sign} a {deg}°: {bala}, {jagra}, {deepta}.",
  },
  tara: {
    names: [
      "Janma (Nascimento)",
      "Sampat (Riqueza)",
      "Vipat (Perigo)",
      "Kshema (Bem-estar)",
      "Pratyak (Obstáculo)",
      "Sadhana (Realização)",
      "Naidhana (Morte)",
      "Mitra (Amigo)",
      "Parama Mitra (Melhor Amigo)",
    ],
    auspicious: "Auspicioso",
    inauspicious: "Inauspicioso",
    neutral: "Neutro",
    interp: "Tara {n}: {name}. {nature}. Compatibilidade: {pct}%.",
  },
  gochara: {
    default: "{planet} na casa {hm} da Lua ({ha} do Ascendente). {end}",
    fav: "Favorável.",
    unfav: "Desafiador.",
    effectGood1: "Período favorável",
    effectGood2: "Oportunidades",
    effectBad1: "Desafios",
    effectBad2: "Cautela necessária",
    duration: "Até {sign} mudar de signo",
    jupiter: {
      1: "Júpiter na 1ª da Lua: Expansão pessoal, otimismo, crescimento espiritual.",
      2: "Júpiter na 2ª da Lua: Ganhos financeiros, família abençoada.",
      5: "Júpiter na 5ª da Lua: Filhos, criatividade, inteligência expandida.",
      9: "Júpiter na 9ª da Lua: Sorte, espiritualidade, viagens longas.",
      10: "Júpiter na 10ª da Lua: Sucesso na carreira, reconhecimento.",
      11: "Júpiter na 11ª da Lua: Ganhos, amizades, realização de desejos.",
    },
    saturn: {
      3: "Saturno na 3ª da Lua: Coragem, esforço, superação de obstáculos.",
      6: "Saturno na 6ª da Lua: Vitória sobre inimigos, saúde melhorada.",
      11: "Saturno na 11ª da Lua: Ganhos através de trabalho duro.",
    },
    rahu: {
      1: "Rahu na 1ª da Lua: Confusão mental, mas também ambição.",
      3: "Rahu na 3ª da Lua: Coragem, viagens curtas, comunicação.",
      6: "Rahu na 6ª da Lua: Vitória sobre inimigos, saúde desafiada.",
      10: "Rahu na 10ª da Lua: Ambição profissional, sucesso inesperado.",
      11: "Rahu na 11ª da Lua: Ganhos inesperados, amizades influentes.",
    },
  },
  vimsopaka: {
    interp: "{planet}: {pct}% de força nos vargas. {level}.",
    strong: "Forte",
    moderate: "Moderado",
    weak: "Fraco",
  },
};

const ES: VedicApiMessages = {
  ...EN,
  errors: {
    longitudeRange: "La longitud debe estar entre 0 y 360.",
    moonLongitudeBirthDateRequired: "moonLongitude y birthDate son obligatorios.",
    planetsAscendantLongitudeRequired: "planets y ascendantLongitude son obligatorios.",
    planetsHousesRequired: "planets y houses son obligatorios.",
    planetsAscendantSignBirthRequired: "planets, ascendantSign y birthDate son obligatorios.",
    planetsRequired: "planets es obligatorio.",
    planetsBirthYearRequired: "planets, birthDate y year son obligatorios.",
    planetsMoonLonRequired: "planets y moonLongitude son obligatorios.",
    invalidPayload: "Payload inválido.",
    vedicCompleteFailed: "Error interno al calcular la carta védica.",
    vargottamaFailed: "Error interno al calcular vargottama.",
    validationFailed: "Validación fallida.",
    shadbalaFailed: "Error al calcular Shadbala.",
    ashtakavargaFailed: "Error al calcular Ashtakavarga.",
    sunMoonFailed: "Error al calcular posiciones Sol/Luna.",
    panchangaFailed: "Error al calcular Panchanga.",
    positionsFailed: "Error al calcular posiciones.",
    muhurtaFailed: "Error al calcular Muhurta.",
    grahaYuddhaFailed: "Error al calcular Graha Yuddha.",
    avasthasFailed: "Error al calcular Avasthas.",
    taraBalaFailed: "Error al calcular Tara Bala.",
    moonNotFound: "Luna no encontrada.",
    gocharaFailed: "Error al calcular Gochara.",
    prasnaFailed: "Error al calcular Prasna.",
    dashaSandhiFailed: "Error al calcular Dasha Sandhi.",
    argalaFailed: "Error al calcular Argala/Drishti.",
  },
  shadbala: {
    planetExtreme: "{planet} extremadamente fuerte ({pct}%). Máxima capacidad de expresar su energía de forma positiva.",
    planetStrong: "{planet} fuerte ({pct}%). Buena capacidad de expresar su energía.",
    planetModerate: "{planet} moderado ({pct}%). Capacidad razonable con limitaciones.",
    planetWeak: "{planet} débil ({pct}%). Dificultad para expresar plenamente su energía.",
    planetVeryWeak: "{planet} muy débil ({pct}%). Energía muy comprometida. Se recomiendan remedios.",
    chartVeryStrong:
      "Carta muy fuerte (media {pct}%). {strongest} es el planeta más fuerte, {weakest} el más débil. Excelente capacidad de manifestación.",
    chartStrong:
      "Carta fuerte (media {pct}%). {strongest} es el planeta más fuerte, {weakest} el más débil. Buena capacidad de manifestación.",
    chartModerate:
      "Carta moderada (media {pct}%). {strongest} es el planeta más fuerte, {weakest} el más débil. Algunas áreas requieren atención.",
    chartWeak:
      "Carta desafiante (media {pct}%). {strongest} es el planeta más fuerte, {weakest} el más débil. Remedios recomendados.",
  },
  ashtakavarga:
    "Sarvashtakavarga: Las casas {strong} son fuertes ({nStrong} por encima del promedio). Las casas {weak} son débiles. Media de {avg} bindus por casa.",
  panchanga: {
    dayVeryAuspicious: "Muy auspicioso",
    dayAuspicious: "Auspicioso",
    dayNeutral: "Neutral",
    dayInauspicious: "Inauspicioso",
    dayVeryInauspicious: "Muy inauspicioso",
    pakshaShukla: "Shukla",
    pakshaKrishna: "Krishna",
    overall:
      "Día {quality}. Tithi: {tithi} ({paksha}). Nakshatra: {nakshatra}. Yoga: {yoga}. Karana: {karana}. {yogaInterp}",
    abhijitLine: "Abhijit Muhurta: {start}-{end}",
    brahmaLine: "Brahma Muhurta: 04:30-06:00",
    vijayaLine: "Vijaya Muhurta: 14:00-14:48",
    rahukaalLine: "Rahukaal: {window}",
    yamagandaLine: "Yamaganda: {window}",
    gulikaLine: "Gulika: {window}",
    durMuhurtaLine: "Dur Muhurta: 08:00-08:48",
    karanaChara: "Chara (móvil)",
    karanaSthira: "Sthira (fijo)",
  },
  muhurta: {
    tithiFav: "Tithi {name} es favorable para {purpose}.",
    tithiWeak: "Tithi {name} no es ideal para {purpose}.",
    nakFav: "Nakshatra {name} es excelente para {purpose}.",
    nakWeak: "Nakshatra {name} no es ideal para {purpose}.",
    varaFav: "El día {name} es favorable.",
    varaWeak: "El día {name} no es ideal.",
    yogaFav: "Yoga {name} es auspicioso.",
    yogaBad: "Yoga {name} es muy inauspicioso.",
    badWindow: "Horario en Rahukaal/Yamaganda.",
    abhijitBonus: "Durante Abhijit Muhurta — muy auspicioso.",
    recExcellent: "Momento excelente para {purpose}. Factores cósmicos alineados.",
    recGood: "Buen momento para {purpose}. La mayoría de factores son favorables.",
    recFair: "Momento aceptable para {purpose}. Algunos factores desfavorables.",
    recPoor: "Momento desfavorable para {purpose}. Elija otro horario si es posible.",
  },
  grahaYuddha: {
    interpretation: "{winner} venció a {loser} en guerra planetaria. {winner} está más fuerte; {loser} debilitado.",
    effect1: "{winner} expresa su energía con más fuerza.",
    effect2: "La energía de {loser} está comprometida.",
    effect3: "Las áreas regidas por {loser} pueden tener desafíos.",
  },
  prasna: {
    houseLordFav: "Señor de la casa {house} ({lord}) en sector favorable.",
    houseLordCh: "Señor de la casa {house} ({lord}) en sector desafiante.",
    horaFav: "Regente de la hora ({lord}) en posición favorable.",
    answerHigh: "Sí — la respuesta es favorable para tu pregunta sobre {topic}.",
    answerMid: "Respuesta mixta — algunos factores favorables, otros desafiantes para {topic}.",
    answerLow: "Desfavorable ahora — espera un momento más auspicioso para {topic}.",
    timing: "Resultado esperado en unos {months} meses.",
    recHigh: "Avanza con confianza.",
    recMid: "Avanza con cautela.",
    recLow: "Espera un momento más favorable.",
    categoryGeral: "asuntos generales",
    categoryAmor: "amor",
    categoryCasamento: "matrimonio",
    categoryDinheiro: "dinero",
    categoryCarreira: "carrera",
    categorySaude: "salud",
    categoryViagem: "viajes",
    categoryEducacao: "educación",
    categoryFilhos: "hijos",
    categoryImovel: "vivienda",
    categoryJustica: "asuntos legales",
    unknownLord: "Desconocido",
  },
  dashaSandhi: {
    mahaInterp: "Periodo de unión de Mahadasha. Transición importante. {days} días restantes.",
    mahaRec: "Evite decisiones mayores en esta transición. Meditación e introspección.",
    antInterp: "Periodo de unión de Antardasha. Transición moderada. {days} días restantes.",
    antRec: "Cautela con decisiones importantes. Ajuste energético.",
    noneInterp: "Fuera de periodo de unión. Energía estable.",
    noneRec: "Momento estable para acciones y decisiones.",
    typeNone: "Ninguno",
    typeMaha: "Mahadasha",
    typeAnt: "Antardasha",
  },
  argala: {
    strong: "Fuerte",
    medium: "Medio",
    typeArgala: "Argala",
    typeVirodh: "Virodh Argala",
    interpDomArgala:
      "Casa {house}: {nArg} argalas, {nVir} virodh argalas. Dominan las argalas — casa reforzada.",
    interpDomVirodh:
      "Casa {house}: {nArg} argalas, {nVir} virodh argalas. Dominan las virodh — casa desafiada.",
  },
  drishti: {
    specialAsp: "Aspecto especial casa {n}",
    asp7: "Aspecto 7ª casa",
    interp: "{planet} aspecta la casa {house} con {pct}% de fuerza.",
  },
  avastha: EN.avastha,
  tara: {
    names: EN.tara.names,
    auspicious: "Auspicioso",
    inauspicious: "Inauspicioso",
    neutral: "Neutral",
    interp: "Tara {n}: {name}. {nature}. Compatibilidad: {pct}%.",
  },
  gochara: {
    default: "{planet} en la casa {hm} desde la Luna ({ha} desde el Ascendente). {end}",
    fav: "Favorable.",
    unfav: "Desafiante.",
    effectGood1: "Periodo favorable",
    effectGood2: "Oportunidades",
    effectBad1: "Desafíos",
    effectBad2: "Se aconseja cautela",
    duration: "Hasta que {sign} cambie de signo",
    jupiter: {
      1: "Júpiter en la 1ª desde la Luna: expansión personal, optimismo, crecimiento espiritual.",
      2: "Júpiter en la 2ª desde la Luna: ganancias financieras, familia bendecida.",
      5: "Júpiter en la 5ª desde la Luna: hijos, creatividad, inteligencia ampliada.",
      9: "Júpiter en la 9ª desde la Luna: suerte, espiritualidad, viajes largos.",
      10: "Júpiter en la 10ª desde la Luna: éxito profesional, reconocimiento.",
      11: "Júpiter en la 11ª desde la Luna: ganancias, amistades, deseos cumplidos.",
    },
    saturn: {
      3: "Saturno en la 3ª desde la Luna: coraje, esfuerzo, superación de obstáculos.",
      6: "Saturno en la 6ª desde la Luna: victoria sobre enemigos, salud mejorada.",
      11: "Saturno en la 11ª desde la Luna: ganancias por trabajo duro.",
    },
    rahu: {
      1: "Rahu en la 1ª desde la Luna: confusión mental pero también ambición.",
      3: "Rahu en la 3ª desde la Luna: coraje, viajes cortos, comunicación.",
      6: "Rahu en la 6ª desde la Luna: victoria sobre enemigos, salud desafiante.",
      10: "Rahu en la 10ª desde la Luna: ambición profesional, éxito inesperado.",
      11: "Rahu en la 11ª desde la Luna: ganancias inesperadas, amistades influyentes.",
    },
  },
  vimsopaka: {
    interp: "{planet}: {pct}% de fuerza en los vargas. {level}.",
    strong: "Fuerte",
    moderate: "Moderado",
    weak: "Débil",
  },
};

const HI: VedicApiMessages = {
  ...EN,
  errors: {
    longitudeRange: "देशांतर 0 और 360 के बीच होना चाहिए।",
    moonLongitudeBirthDateRequired: "moonLongitude और birthDate आवश्यक हैं।",
    planetsAscendantLongitudeRequired: "planets और ascendantLongitude आवश्यक हैं।",
    planetsHousesRequired: "planets और houses आवश्यक हैं।",
    planetsAscendantSignBirthRequired: "planets, ascendantSign और birthDate आवश्यक हैं।",
    planetsRequired: "planets आवश्यक है।",
    planetsBirthYearRequired: "planets, birthDate और year आवश्यक हैं।",
    planetsMoonLonRequired: "planets और moonLongitude आवश्यक हैं।",
    invalidPayload: "अमान्य पेलोड।",
    vedicCompleteFailed: "वैदिक चार्ट की गणना में आंतरिक त्रुटि।",
    vargottamaFailed: "वर्गोत्तमा की गणना में आंतरिक त्रुटि।",
    validationFailed: "सत्यापन विफल।",
    shadbalaFailed: "षड्बल गणना त्रुटि।",
    ashtakavargaFailed: "अष्टकवर्ग गणना त्रुटि।",
    sunMoonFailed: "सूर्य/चंद्रमा स्थिति त्रुटि।",
    panchangaFailed: "पंचांग गणना त्रुटि।",
    positionsFailed: "स्थिति गणना त्रुटि।",
    muhurtaFailed: "मुहूर्त गणना त्रुटि।",
    grahaYuddhaFailed: "ग्रह युद्ध गणना त्रुटि।",
    avasthasFailed: "अवस्था गणना त्रुटि।",
    taraBalaFailed: "तारा बल गणना त्रुटि।",
    moonNotFound: "चंद्रमा नहीं मिला।",
    gocharaFailed: "गोचर गणना त्रुटि।",
    prasnaFailed: "प्रश्न गणना त्रुटि।",
    dashaSandhiFailed: "दशा संधि गणना त्रुटि।",
    argalaFailed: "अर्गला/दृष्टि गणना त्रुटि।",
  },
  shadbala: {
    planetExtreme: "{planet} अत्यंत मजबूत ({pct}%)। ऊर्जा सकारात्मक रूप से अभिव्यक्त करने की अधिकतम क्षमता।",
    planetStrong: "{planet} मजबूत ({pct}%)। अच्छी अभिव्यक्ति क्षमता।",
    planetModerate: "{planet} मध्यम ({pct}%)। सीमित लेकिन उचित क्षमता।",
    planetWeak: "{planet} कमजोर ({pct}%)। पूर्ण अभिव्यक्ति में कठिनाई।",
    planetVeryWeak: "{planet} बहुत कमजोर ({pct}%)। ऊर्जा गंभीर रूप से कमजोर। उपाय सुझाए जाते हैं।",
    chartVeryStrong:
      "अत्यंत मजबूत कुंडली (औसत {pct}%)। {strongest} सबसे मजबूत, {weakest} सबसे कमजोर। उत्कृष्ट प्रकटन क्षमता।",
    chartStrong: "मजबूत कुंडली (औसत {pct}%)। {strongest} सबसे मजबूत, {weakest} सबसे कमजोर। अच्छी प्रकटन क्षमता।",
    chartModerate: "मध्यम कुंडली (औसत {pct}%)। {strongest} सबसे मजबूत, {weakest} सबसे कमजोर। कुछ क्षेत्रों पर ध्यान दें।",
    chartWeak:
      "चुनौतीपूर्ण कुंडली (औसत {pct}%)। {strongest} सबसे मजबूत, {weakest} सबसे कमजोर। कमजोर ग्रहों के लिए उपाय।",
  },
  ashtakavarga:
    "सर्वाष्टकवर्ग: भाव {strong} मजबूत ({nStrong} औसत से ऊपर)। भाव {weak} कमजोर। प्रति भाव औसत {avg} बिंदु।",
  panchanga: {
    dayVeryAuspicious: "अत्यंत शुभ",
    dayAuspicious: "शुभ",
    dayNeutral: "तटस्थ",
    dayInauspicious: "अशुभ",
    dayVeryInauspicious: "अत्यंत अशुभ",
    pakshaShukla: "शुक्ल",
    pakshaKrishna: "कृष्ण",
    overall:
      "दिन {quality}। तिथि: {tithi} ({paksha})। नक्षत्र: {nakshatra}। योग: {yoga}। करण: {karana}। {yogaInterp}",
    abhijitLine: "अभिजित मुहूर्त: {start}-{end}",
    brahmaLine: "ब्रह्म मुहूर्त: 04:30-06:00",
    vijayaLine: "विजय मुहूर्त: 14:00-14:48",
    rahukaalLine: "राहुकाल: {window}",
    yamagandaLine: "यमगंड: {window}",
    gulikaLine: "गुलिका: {window}",
    durMuhurtaLine: "दुर मुहूर्त: 08:00-08:48",
    karanaChara: "चर (गतिशील)",
    karanaSthira: "स्थिर",
  },
  muhurta: {
    tithiFav: "तिथि {name} {purpose} के लिए अनुकूल है।",
    tithiWeak: "तिथि {name} {purpose} के लिए आदर्श नहीं।",
    nakFav: "नक्षत्र {name} {purpose} के लिए उत्कृष्ट है।",
    nakWeak: "नक्षत्र {name} {purpose} के लिए आदर्श नहीं।",
    varaFav: "वार {name} अनुकूल है।",
    varaWeak: "वार {name} आदर्श नहीं।",
    yogaFav: "योग {name} शुभ है।",
    yogaBad: "योग {name} अत्यंत अशुभ है।",
    badWindow: "समय राहुकाल/यमगंड में है।",
    abhijitBonus: "अभिजित मुहूर्त में — अत्यंत शुभ।",
    recExcellent: "{purpose} के लिए उत्कृष्ट समय। ग्रह अनुकूल।",
    recGood: "{purpose} के लिए अच्छा समय। अधिकांश अनुकूल।",
    recFair: "{purpose} के लिए सामान्य समय। कुछ प्रतिकूल कारक।",
    recPoor: "{purpose} के लिए अनुकूल नहीं। दूसरा समय चुनें।",
  },
  grahaYuddha: {
    interpretation: "{winner} ने {loser} को ग्रह युद्ध में हराया। {winner} मजबूत; {loser} कमजोर।",
    effect1: "{winner} अपनी ऊर्जा बल से अभिव्यक्त करता है।",
    effect2: "{loser} की ऊर्जा प्रभावित है।",
    effect3: "{loser} से जुड़े क्षेत्रों में चुनौती संभव।",
  },
  prasna: {
    houseLordFav: "भाव {house} के स्वामी ({lord}) अनुकूल खंड में।",
    houseLordCh: "भाव {house} के स्वामी ({lord}) चुनौतीपूर्ण खंड में।",
    horaFav: "घंटे के स्वामी ({lord}) अनुकूल स्थिति में।",
    answerHigh: "हाँ — {topic} पर आपके प्रश्न के लिए उत्तर अनुकूल है।",
    answerMid: "मिश्रित — {topic} के लिए कुछ अनुकूल, कुछ चुनौतीपूर्ण।",
    answerLow: "अभी अनुकूल नहीं — {topic} के लिए अधिक शुभ समय की प्रतीक्षा करें।",
    timing: "लगभग {months} माह में परिणाम की संभावना।",
    recHigh: "विश्वास के साथ आगे बढ़ें।",
    recMid: "सावधानी से आगे बढ़ें।",
    recLow: "अधिक अनुकूल समय की प्रतीक्षा करें।",
    categoryGeral: "सामान्य विषय",
    categoryAmor: "प्रेम",
    categoryCasamento: "विवाह",
    categoryDinheiro: "धन",
    categoryCarreira: "करियर",
    categorySaude: "स्वास्थ्य",
    categoryViagem: "यात्रा",
    categoryEducacao: "शिक्षा",
    categoryFilhos: "संतान",
    categoryImovel: "संपत्ति",
    categoryJustica: "कानूनी मामले",
    unknownLord: "अज्ञात",
  },
  dashaSandhi: {
    mahaInterp: "महादशा संधि काल। महत्वपूर्ण ऊर्जा परिवर्तन। {days} दिन शेष।",
    mahaRec: "इस संक्रमण में बड़े निर्णय टालें। ध्यान और चिंतन।",
    antInterp: "अंतर्दशा संधि काल। मध्यम संक्रमण। {days} दिन शेष।",
    antRec: "महत्वपूर्ण निर्णयों में सावधानी। ऊर्जा समायोजन।",
    noneInterp: "संधि के बाहर। ऊर्जा स्थिर।",
    noneRec: "कार्यों और निर्णयों के लिए स्थिर समय।",
    typeNone: "कोई नहीं",
    typeMaha: "महादशा",
    typeAnt: "अंतर्दशा",
  },
  argala: {
    strong: "मजबूत",
    medium: "मध्यम",
    typeArgala: "अर्गल",
    typeVirodh: "विरोध अर्गल",
    interpDomArgala: "भाव {house}: {nArg} अर्गल, {nVir} विरोध अर्गल। अर्गल प्रबल — भाव मजबूत।",
    interpDomVirodh: "भाव {house}: {nArg} अर्गल, {nVir} विरोध अर्गल। विरोध प्रबल — भाव चुनौतीपूर्ण।",
  },
  drishti: {
    specialAsp: "विशेष {n}वें भाव का दृष्टि",
    asp7: "सप्तम भाव दृष्टि",
    interp: "{planet} भाव {house} पर {pct}% बल से दृष्टि करता है।",
  },
  avastha: {
    bala: [
      "बाल — अपरिपक्व लेकिन संभावनाशील ऊर्जा",
      "कुमार — विकासशील ऊर्जा",
      "युवा — परिपक्व ऊर्जा",
      "वृद्ध — अनुभवी लेकिन घटती ऊर्जा",
      "मृत — अत्यंत कमजोर ऊर्जा",
    ],
    jagrat: "जाग्रत — सचेत और सक्रिय",
    swapna: "स्वप्न — अवचेतन और निष्क्रिय",
    deepta: [
      "दीप्त — तेजस्वी ऊर्जा",
      "मुदित — संतुष्ट ऊर्जा",
      "क्षुधित — असंतुष्ट ऊर्जा",
      "तृषित — खोजती ऊर्जा",
    ],
    interp: "{planet} {sign} में {deg}°: {bala}, {jagra}, {deepta}।",
  },
  tara: {
    names: [
      "जन्म",
      "संपत्",
      "विपत्",
      "क्षेम",
      "प्रत्यक",
      "साधना",
      "नैधन",
      "मित्र",
      "परम मित्र",
    ],
    auspicious: "शुभ",
    inauspicious: "अशुभ",
    neutral: "तटस्थ",
    interp: "तारा {n}: {name}। {nature}। अनुकूलता: {pct}%.",
  },
  gochara: {
    default: "{planet} चंद्रमा से {hm}वें भाव में (लग्न से {ha})। {end}",
    fav: "अनुकूल।",
    unfav: "चुनौतीपूर्ण।",
    effectGood1: "अनुकूल काल",
    effectGood2: "अवसर",
    effectBad1: "चुनौतियाँ",
    effectBad2: "सावधानी आवश्यक",
    duration: "जब तक {sign} राशि न बदले",
    jupiter: {
      1: "चंद्रमा से 1ले भाव में गुरु: व्यक्तिगत विस्तार, आशावाद, आध्यात्मिक वृद्धि।",
      2: "चंद्रमा से 2रे भाव में गुरु: धन लाभ, परिवार पर अनुग्रह।",
      5: "चंद्रमा से 5वें भाव में गुरु: संतान, रचनात्मकता, बुद्धि विस्तार।",
      9: "चंद्रमा से 9वें भाव में गुरु: भाग्य, आध्यात्मिकता, दूर यात्रा।",
      10: "चंद्रमा से 10वें भाव में गुरु: करियर सफलता, मान्यता।",
      11: "चंद्रमा से 11वें भाव में गुरु: लाभ, मित्रता, इच्छा पूर्ति।",
    },
    saturn: {
      3: "चंद्रमा से 3रे भाव में शनि: साहस, परिश्रम, बाधाओं पर विजय।",
      6: "चंद्रमा से 6ठे भाव में शनि: शत्रु पर विजय, स्वास्थ्य सुधार।",
      11: "चंद्रमा से 11वें भाव में शनि: कड़ी मेहनत से लाभ।",
    },
    rahu: {
      1: "चंद्रमा से 1ले भाव में राहु: मानसिक भ्रम लेकिन महत्वाकांक्षा भी।",
      3: "चंद्रमा से 3रे भाव में राहु: साहस, लघु यात्रा, संचार।",
      6: "चंद्रमा से 6ठे भाव में राहु: शत्रु पर विजय, स्वास्थ्य चुनौती।",
      10: "चंद्रमा से 10वें भाव में राहु: व्यावसायिक महत्वाकांक्षा, अप्रत्याशित सफलता।",
      11: "चंद्रमा से 11वें भाव में राहु: अप्रत्याशित लाभ, प्रभावशाली मित्र।",
    },
  },
  vimsopaka: {
    interp: "{planet}: वर्गों में {pct}% बल। {level}।",
    strong: "मजबूत",
    moderate: "मध्यम",
    weak: "कमजोर",
  },
};

const BUNDLE: Record<Language, VedicApiMessages> = {
  en: EN,
  pt: PT,
  es: ES,
  hi: HI,
};

export function vedMsgs(lang: Language): VedicApiMessages {
  return BUNDLE[lang] ?? BUNDLE.en;
}

export function vedErr(lang: Language, key: keyof VedicApiMessages["errors"]): string {
  return vedMsgs(lang).errors[key as string] ?? vedMsgs("en").errors[key as string] ?? key;
}
