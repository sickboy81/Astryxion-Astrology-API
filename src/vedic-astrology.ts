// ============================================================
// ASTROLOGIA VÉDICA (JYOTISH) - SISTEMA COMPLETO
// ============================================================

import { normalize360, angleDiff, getSignForLongitude, getSignDegree, ZODIAC_SIGNS, SIGN_RULERS, PLANETARY_DIGNITIES, type PlanetData, type AspectData, type ZodiacSign } from "./astro-calculations.js";

// ============================================================
// NAKSHATRAS - 27 CONSTELAÇÕES LUNARES
// ============================================================

export interface NakshatraData {
  name: string;
  sanskritName: string;
  longitudeStart: number;
  longitudeEnd: number;
  pada: number;
  lord: string;
  deity: string;
  symbol: string;
  animal: string;
  tree: string;
  nature: string;
  guna: string;
  element: string;
  direction: string;
  caste: string;
  gender: string;
  dosha: string;
  description: string;
  compatibility: string[];
  favorableActivities: string[];
  unfavorableActivities: string[];
}

export const NAKSHATRAS: Omit<NakshatraData, "longitudeStart" | "longitudeEnd" | "pada">[] = [
  {
    name: "Ashwini", sanskritName: "अश्विनी", lord: "Ketu", deity: "Ashwini Kumaras",
    symbol: "Cabeça de cavalo", animal: "Cavalo macho", tree: "Strychnine",
    nature: "Deva (divino)", guna: "Sattva", element: "Terra", direction: "Sul",
    caste: "Vaishya", gender: "Macho", dosha: "Kapha",
    description: "O primeiro nakshatra representa o início de todas as coisas. Os gêmeos Ashwini Kumaras são os médicos celestiais, trazendo cura e vitalidade. Este nakshatra é rápido, energético e pioneiro.",
    compatibility: ["Ashwini", "Magha", "Mula", "Swati", "Vishakha", "Anuradha"],
    favorableActivities: ["Viagens", "Iniciar novos projetos", "Tratamentos médicos", "Esportes"],
    unfavorableActivities: ["Negociações lentas", "Meditação profunda", "Atividades secretas"],
  },
  {
    name: "Bharani", sanskritName: "भरणी", lord: "Vênus", deity: "Yama",
    symbol: "Yoni (órgão feminino)", animal: "Elefante", tree: "Amla",
    nature: "Manushya (humano)", guna: "Tamas", element: "Terra", direction: "Sul",
    caste: "Brahmin", gender: "Fêmea", dosha: "Kapha",
    description: "Bharani é o nakshatra da transformação e renascimento. Governado por Yama, o deus da morte, representa o ciclo de vida, morte e renovação. É um nakshatra de grande intensidade e poder criativo.",
    compatibility: ["Krittika", "Rohini", "Mrigashira", "Purva Phalguni", "Uttara Phalguni"],
    favorableActivities: ["Transformação pessoal", "Trabalho com fogo", "Rituais ancestrais"],
    unfavorableActivities: ["Iniciar relacionamentos", "Viagens longas", "Investimentos arriscados"],
  },
  {
    name: "Krittika", sanskritName: "कृत्तिका", lord: "Sol", deity: "Agni",
    symbol: "Navalha ou lança", animal: "Cabra", tree: "Banyan",
    nature: "Rakshasa (demoníaco)", guna: "Tamas", element: "Fogo", direction: "Sudeste",
    caste: "Kshatriya", gender: "Fêmea", dosha: "Pitta",
    description: "Krittika é o nakshatra do fogo purificador. As Pleiades representam as seis mães celestiais que criaram Kartikeya. Este nakshatra traz coragem, determinação e poder de transformação através do fogo.",
    compatibility: ["Rohini", "Mrigashira", "Ardra", "Punarvasu", "Pushya"],
    favorableActivities: ["Cozinhar", "Trabalho com metais", "Cerimônias de fogo", "Limpeza espiritual"],
    unfavorableActivities: ["Atividades aquáticas", "Negociações diplomáticas", "Descanso"],
  },
  {
    name: "Rohini", sanskritName: "रोहिणी", lord: "Lua", deity: "Brahma/Prajapati",
    symbol: "Carro ou templo", animal: "Serpente", tree: "Jamun",
    nature: "Manushya (humano)", guna: "Tamas", element: "Terra", direction: "Leste",
    caste: "Shudra", gender: "Fêmea", dosha: "Kapha",
    description: "Rohini é a esposa favorita da Lua e o nakshatra mais fértil do zodíaco. Representa crescimento, abundância, beleza e criatividade. É o nakshatra da manifestação material e do prazer sensorial.",
    compatibility: ["Mrigashira", "Ardra", "Punarvasu", "Pushya", "Ashlesha"],
    favorableActivities: ["Agricultura", "Artes", "Casamento", "Construção", "Investimentos"],
    unfavorableActivities: ["Destruição", "Conflitos", "Viagens perigosas"],
  },
  {
    name: "Mrigashira", sanskritName: "मृगशिर", lord: "Marte", deity: "Soma",
    symbol: "Cabeça de veado", animal: "Serpente fêmea", tree: "Khadira",
    nature: "Deva (divino)", guna: "Tamas", element: "Terra", direction: "Sul",
    caste: "Shudra", gender: "Neutro", dosha: "Kapha",
    description: "Mrigashira é o nakshatra da busca e curiosidade. Representa a mente inquieta que busca conhecimento e experiências. É o nakshatra dos exploradores, investigadores e buscadores da verdade.",
    compatibility: ["Ardra", "Punarvasu", "Pushya", "Ashlesha", "Magha"],
    favorableActivities: ["Pesquisa", "Viagens de exploração", "Estudo", "Caça"],
    unfavorableActivities: ["Estabilidade", "Rotina", "Compromissos de longo prazo"],
  },
  {
    name: "Ardra", sanskritName: "आर्द्रा", lord: "Rahu", deity: "Rudra",
    symbol: "Lágrima ou diamante", animal: "Cadelo fêmea", tree: "Salmali",
    nature: "Manushya (humano)", guna: "Tamas", element: "Ar", direction: "Norte",
    caste: "Kshatriya", gender: "Fêmea", dosha: "Kapha",
    description: "Ardra é o nakshatra da tempestade e transformação através da destruição. Rudra, a forma feroz de Shiva, rege este nakshatra. Representa a purificação através da dor e o renascimento após a crise.",
    compatibility: ["Punarvasu", "Pushya", "Ashlesha", "Magha", "Purva Phalguni"],
    favorableActivities: ["Destruição de inimigos", "Trabalho com venenos", "Meditação intensa"],
    unfavorableActivities: ["Inícios auspiciosos", "Casamentos", "Celebrações"],
  },
  {
    name: "Punarvasu", sanskritName: "पुनर्वसु", lord: "Júpiter", deity: "Aditi",
    symbol: "Arco e flecha ou quiver", animal: "Tigre fêmea", tree: "Bamboo",
    nature: "Deva (divino)", guna: "Tamas", element: "Ar", direction: "Nordeste",
    caste: "Vaishya", gender: "Fêmea", dosha: "Kapha",
    description: "Punarvasu significa 'retorno da luz'. Aditi, a mãe dos deuses, rege este nakshatra de renovação e abundância. Representa a recuperação após dificuldades e o retorno à prosperidade.",
    compatibility: ["Pushya", "Ashlesha", "Magha", "Purva Phalguni", "Uttara Phalguni"],
    favorableActivities: ["Recuperação financeira", "Retornos", "Reconciliações", "Viagens de volta"],
    unfavorableActivities: ["Perdas", "Separações", "Destruição"],
  },
  {
    name: "Pushya", sanskritName: "पुष्य", lord: "Saturno", deity: "Brihaspati",
    symbol: "Flor de lótus ou flecha circular", animal: "Carneiro", tree: "Peepal",
    nature: "Deva (divino)", guna: "Tamas", element: "Água", direction: "Norte",
    caste: "Kshatriya", gender: "Macho", dosha: "Kapha",
    description: "Pushya é o nakshatra mais auspicioso do zodíaco. Brihaspati, o guru dos deuses, rege este nakshatra de nutrição e prosperidade. É considerado o melhor nakshatra para inícios auspiciosos.",
    compatibility: ["Ashlesha", "Magha", "Purva Phalguni", "Uttara Phalguni", "Hasta"],
    favorableActivities: ["Todos os inícios auspiciosos", "Casamentos", "Investimentos", "Educação"],
    unfavorableActivities: ["Nenhuma - é universalmente auspicioso"],
  },
  {
    name: "Ashlesha", sanskritName: "आश्लेषा", lord: "Mercúrio", deity: "Nagas",
    symbol: "Serpente enrolada", animal: "Gato", tree: "Jambu",
    nature: "Rakshasa (demoníaco)", guna: "Tamas", element: "Água", direction: "Sul",
    caste: "Kshatriya", gender: "Fêmea", dosha: "Kapha",
    description: "Ashlesha é o nakshatra da serpente cósmica. Os Nagas, seres serpentinos, regem este nakshatra de hipnose, magnetismo e poder oculto. Representa a sabedoria profunda e o poder da transformação.",
    compatibility: ["Magha", "Purva Phalguni", "Uttara Phalguni", "Hasta", "Chitra"],
    favorableActivities: ["Trabalho com venenos", "Hipnose", "Magia", "Investigações secretas"],
    unfavorableActivities: ["Confiança cega", "Negócios com estranhos", "Atividades públicas"],
  },
  {
    name: "Magha", sanskritName: "मघा", lord: "Ketu", deity: "Pitris (ancestrais)",
    symbol: "Trono real ou palanquim", animal: "Rato fêmea", tree: "Mango",
    nature: "Rakshasa (demoníaco)", guna: "Tamas", element: "Fogo", direction: "Sudoeste",
    caste: "Shudra", gender: "Fêmea", dosha: "Kapha",
    description: "Magha é o nakshatra do poder real e ancestralidade. Os Pitris, espíritos ancestrais, regem este nakshatra de tradição, linhagem e autoridade. Representa o legado familiar e o poder herdado.",
    compatibility: ["Purva Phalguni", "Uttara Phalguni", "Hasta", "Chitra", "Swati"],
    favorableActivities: ["Rituais ancestrais", "Assuntos de propriedade", "Liderança", "Cerimônias tradicionais"],
    unfavorableActivities: ["Inovação radical", "Rebelião", "Ruptura com tradições"],
  },
  {
    name: "Purva Phalguni", sanskritName: "पूर्व फाल्गुनी", lord: "Vênus", deity: "Bhaga",
    symbol: "Pernas de uma cama ou figueira", animal: "Rato macho", tree: "Palasha",
    nature: "Manushya (humano)", guna: "Tamas", element: "Água", direction: "Oeste",
    caste: "Brahmin", gender: "Fêmea", dosha: "Kapha",
    description: "Purva Phalguni é o nakshatra do prazer, criatividade e relacionamentos. Bhaga, o deus da felicidade matrimonial, rege este nakshatra de amor, arte e entretenimento.",
    compatibility: ["Uttara Phalguni", "Hasta", "Chitra", "Swati", "Vishakha"],
    favorableActivities: ["Casamentos", "Artes", "Entretenimento", "Romance", "Festas"],
    unfavorableActivities: ["Trabalho árduo", "Austeridade", "Isolamento"],
  },
  {
    name: "Uttara Phalguni", sanskritName: "उत्तर फाल्गुनी", lord: "Sol", deity: "Aryaman",
    symbol: "Quatro pernas de uma cama ou figueira", animal: "Vaca", tree: "Apamarga",
    nature: "Manushya (humano)", guna: "Tamas", element: "Água", direction: "Norte",
    caste: "Kshatriya", gender: "Macho", dosha: "Kapha",
    description: "Uttara Phalguni é o nakshatra da generosidade e serviço. Aryaman, o deus da hospitalidade, rege este nakshatra de contratos, parcerias e compromisso social.",
    compatibility: ["Hasta", "Chitra", "Swati", "Vishakha", "Anuradha"],
    favorableActivities: ["Contratos", "Parcerias", "Serviço social", "Caridade", "Casamentos"],
    unfavorableActivities: ["Egoísmo", "Isolamento", "Quebra de promessas"],
  },
  {
    name: "Hasta", sanskritName: "हस्त", lord: "Lua", deity: "Savitr",
    symbol: "Mão aberta", animal: "Búfalo fêmea", tree: "Black Catechu",
    nature: "Deva (divino)", guna: "Rajas", element: "Fogo", direction: "Norte",
    caste: "Vaishya", gender: "Fêmea", dosha: "Kapha",
    description: "Hasta é o nakshatra da habilidade manual e cura. Savitr, o deus do sol nascente, rege este nakshatra de artesanato, cura e manifestação prática. Representa o poder das mãos para criar e curar.",
    compatibility: ["Chitra", "Swati", "Vishakha", "Anuradha", "Jyeshtha"],
    favorableActivities: ["Artesanato", "Cura", "Agricultura", "Comércio", "Ensino"],
    unfavorableActivities: ["Destruição", "Violência", "Atividades ilegais"],
  },
  {
    name: "Chitra", sanskritName: "चित्रा", lord: "Marte", deity: "Vishvakarma",
    symbol: "Pérola brilhante ou lótus", animal: "Tigre fêmea", tree: "Saptaparna",
    nature: "Rakshasa (demoníaco)", guna: "Tamas", element: "Fogo", direction: "Sul",
    caste: "Vaishya", gender: "Fêmea", dosha: "Pitta",
    description: "Chitra é o nakshatra da beleza e arquitetura celestial. Vishvakarma, o arquiteto divino, rege este nakshatra de design, arte e ilusão. Representa a capacidade de criar beleza e magia visual.",
    compatibility: ["Swati", "Vishakha", "Anuradha", "Jyeshtha", "Mula"],
    favorableActivities: ["Design", "Arquitetura", "Artes visuais", "Moda", "Decoração"],
    unfavorableActivities: ["Simplicidade excessiva", "Negligência com aparência", "Rotina"],
  },
  {
    name: "Swati", sanskritName: "स्वाति", lord: "Rahu", deity: "Vayu",
    symbol: "Broto de coral balançando ao vento", animal: "Búfalo macho", tree: "Kadamba",
    nature: "Deva (divino)", guna: "Tamas", element: "Ar", direction: "Norte",
    caste: "Vaishya", gender: "Macho", dosha: "Vata",
    description: "Swati é o nakshatra da independência e auto-determinação. Vayu, o deus do vento, rege este nakshatra de liberdade, comércio e adaptação. Representa a capacidade de se mover com o vento e encontrar o próprio caminho.",
    compatibility: ["Vishakha", "Anuradha", "Jyeshtha", "Mula", "Purva Ashadha"],
    favorableActivities: ["Comércio", "Viagens", "Negociações", "Diplomacia", "Mudanças"],
    unfavorableActivities: ["Estagnação", "Dependência", "Conflitos diretos"],
  },
  {
    name: "Vishakha", sanskritName: "विशाखा", lord: "Júpiter", deity: "Indra-Agni",
    symbol: "Arco triunfal ou vaso de flores", animal: "Tigre macho", tree: "Wood Apple",
    nature: "Rakshasa (demoníaco)", guna: "Tamas", element: "Terra", direction: "Norte",
    caste: "Vaishya", gender: "Fêmea", dosha: "Kapha",
    description: "Vishakha é o nakshatra da determinação e conquista. Indra e Agni, o rei dos deuses e o deus do fogo, regem este nakshatra de ambição, perseverança e vitória através do esforço.",
    compatibility: ["Anuradha", "Jyeshtha", "Mula", "Purva Ashadha", "Uttara Ashadha"],
    favorableActivities: ["Competições", "Conquistas", "Negócios", "Política", "Liderança"],
    unfavorableActivities: ["Desistência", "Passividade", "Medo de competir"],
  },
  {
    name: "Anuradha", sanskritName: "अनुराधा", lord: "Saturno", deity: "Mitra",
    symbol: "Flor de lótus ou arco", animal: "Cervo fêmea", tree: "Lotus",
    nature: "Deva (divino)", guna: "Tamas", element: "Fogo", direction: "Norte",
    caste: "Shudra", gender: "Fêmea", dosha: "Kapha",
    description: "Anuradha é o nakshatra da devoção e amizade. Mitra, o deus da amizade e contratos, rege este nakshatra de lealdade, cooperação e sucesso através de relacionamentos.",
    compatibility: ["Jyeshtha", "Mula", "Purva Ashadha", "Uttara Ashadha", "Shravana"],
    favorableActivities: ["Parcerias", "Amizades", "Cooperação", "Viagens espirituais", "Meditação"],
    unfavorableActivities: ["Isolamento", "Conflitos", "Traição"],
  },
  {
    name: "Jyeshtha", sanskritName: "ज्येष्ठा", lord: "Mercúrio", deity: "Indra",
    symbol: "Amuleto circular ou guarda-chuva", animal: "Cervo macho", tree: "Vata",
    nature: "Rakshasa (demoníaco)", guna: "Tamas", element: "Água", direction: "Norte",
    caste: "Brahmin", gender: "Macho", dosha: "Kapha",
    description: "Jyeshtha é o nakshatra do poder e proteção. Indra, o rei dos deuses, rege este nakshatra de autoridade, proteção e senioridade. Representa o poder que vem da experiência e sabedoria.",
    compatibility: ["Mula", "Purva Ashadha", "Uttara Ashadha", "Shravana", "Dhanishta"],
    favorableActivities: ["Proteção", "Liderança", "Ocultismo", "Investigações", "Defesa"],
    unfavorableActivities: ["Submissão", "Fraqueza", "Exposição desnecessária"],
  },
  {
    name: "Mula", sanskritName: "मूल", lord: "Ketu", deity: "Nirriti",
    symbol: "Raízes entrelaçadas ou leão", animal: "Cão macho", tree: "Salmali",
    nature: "Rakshasa (demoníaco)", guna: "Tamas", element: "Terra", direction: "Sudoeste",
    caste: "Shudra", gender: "Fêmea", dosha: "Kapha",
    description: "Mula é o nakshatra da raiz e destruição. Nirriti, a deusa da dissolução, rege este nakshatra de transformação radical e descoberta da verdade através da destruição do falso.",
    compatibility: ["Purva Ashadha", "Uttara Ashadha", "Shravana", "Dhanishta", "Shatabhisha"],
    favorableActivities: ["Pesquisa profunda", "Destruição de inimigos", "Ocultismo", "Investigações"],
    unfavorableActivities: ["Construção", "Inícios auspiciosos", "Celebracões"],
  },
  {
    name: "Purva Ashadha", sanskritName: "पूर्वाषाढा", lord: "Vênus", deity: "Apas (águas)",
    symbol: "Peneira ou presa de elefante", animal: "Macaco macho", tree: "Banyan",
    nature: "Manushya (humano)", guna: "Tamas", element: "Água", direction: "Sul",
    caste: "Brahmin", gender: "Fêmea", dosha: "Kapha",
    description: "Purva Ashadha é o nakshatra da invencibilidade. As águas cósmicas regem este nakshatra de purificação, vitalidade e poder de penetração. Representa a capacidade de vencer através da persistência.",
    compatibility: ["Uttara Ashadha", "Shravana", "Dhanishta", "Shatabhisha", "Purva Bhadrapada"],
    favorableActivities: ["Competições", "Batalhas", "Purificação", "Viagens aquáticas", "Meditação"],
    unfavorableActivities: ["Derrota", "Desistência", "Impureza"],
  },
  {
    name: "Uttara Ashadha", sanskritName: "उत्तराषाढा", lord: "Sol", deity: "Vishvadevas",
    symbol: "Presa de elefante ou cama", animal: "Mangusto macho", tree: "Mallika",
    nature: "Manushya (humano)", guna: "Tamas", element: "Terra", direction: "Leste",
    caste: "Kshatriya", gender: "Macho", dosha: "Kapha",
    description: "Uttara Ashadha é o nakshatra da vitória universal. Os Vishvadevas, deuses universais, regem este nakshatra de liderança, justiça e sucesso duradouro através da integridade.",
    compatibility: ["Shravana", "Dhanishta", "Shatabhisha", "Purva Bhadrapada", "Uttara Bhadrapada"],
    favorableActivities: ["Liderança", "Justiça", "Governo", "Administração", "Ensino"],
    unfavorableActivities: ["Injustiça", "Corrupção", "Abuso de poder"],
  },
  {
    name: "Shravana", sanskritName: "श्रवण", lord: "Lua", deity: "Vishnu",
    symbol: "Orelha ou três pegadas", animal: "Macaco fêmea", tree: "Fig",
    nature: "Deva (divino)", guna: "Rajas", element: "Ar", direction: "Norte",
    caste: "Kshatriya", gender: "Macho", dosha: "Kapha",
    description: "Shravana é o nakshatra da audição e aprendizado. Vishnu, o preservador, rege este nakshatra de conhecimento, tradição e transmissão de sabedoria. Representa o poder da escuta e do aprendizado.",
    compatibility: ["Dhanishta", "Shatabhisha", "Purva Bhadrapada", "Uttara Bhadrapada", "Revati"],
    favorableActivities: ["Estudo", "Ensino", "Música", "Audições", "Transmissão de conhecimento"],
    unfavorableActivities: ["Ignorância", "Recusa em aprender", "Isolamento intelectual"],
  },
  {
    name: "Dhanishta", sanskritName: "धनिष्ठा", lord: "Marte", deity: "Vasus",
    symbol: "Tambor ou flauta", animal: "Leão fêmea", tree: "Sandalwood",
    nature: "Rakshasa (demoníaco)", guna: "Tamas", element: "Éter", direction: "Sul",
    caste: "Shudra", gender: "Fêmea", dosha: "Vata",
    description: "Dhanishta é o nakshatra da riqueza e música. Os Vasus, deuses da abundância, regem este nakshatra de prosperidade, ritmo e realização material através do talento.",
    compatibility: ["Shatabhisha", "Purva Bhadrapada", "Uttara Bhadrapada", "Revati", "Ashwini"],
    favorableActivities: ["Música", "Dança", "Investimentos", "Construção", "Celebracões"],
    unfavorableActivities: ["Pobreza", "Discórdia", "Falta de ritmo"],
  },
  {
    name: "Shatabhisha", sanskritName: "शतभिषा", lord: "Rahu", deity: "Varuna",
    symbol: "Círculo vazio ou flor", animal: "Cavalo fêmea", tree: "Khadira",
    nature: "Rakshasa (demoníaco)", guna: "Tamas", element: "Ar", direction: "Oeste",
    caste: "Vaishya", gender: "Neutro", dosha: "Kapha",
    description: "Shatabhisha é o nakshatra da cura e isolamento. Varuna, o deus das águas cósmicas, rege este nakshatra de cura, ocultismo e transcendência. Representa o poder da solidão e da cura espiritual.",
    compatibility: ["Purva Bhadrapada", "Uttara Bhadrapada", "Revati", "Ashwini", "Bharani"],
    favorableActivities: ["Cura", "Meditação", "Ocultismo", "Pesquisa", "Isolamento espiritual"],
    unfavorableActivities: ["Socialização excessiva", "Superficialidade", "Negligência com saúde"],
  },
  {
    name: "Purva Bhadrapada", sanskritName: "पूर्व भाद्रपद", lord: "Júpiter", deity: "Aja Ekapada",
    symbol: "Espada ou pessoa com dois rostos", animal: "Leão macho", tree: "Salmali",
    nature: "Manushya (humano)", guna: "Tamas", element: "Fogo", direction: "Nordeste",
    caste: "Brahmin", gender: "Macho", dosha: "Kapha",
    description: "Purva Bhadrapada é o nakshatra da transformação espiritual. Aja Ekapada, o deus de um pé, rege este nakshatra de ascetismo, fogo interior e renascimento espiritual.",
    compatibility: ["Uttara Bhadrapada", "Revati", "Ashwini", "Bharani", "Krittika"],
    favorableActivities: ["Meditação", "Austeridade", "Transformação espiritual", "Rituais de fogo"],
    unfavorableActivities: ["Materialismo", "Prazeres sensoriais", "Comodidade excessiva"],
  },
  {
    name: "Uttara Bhadrapada", sanskritName: "उत्तर भाद्रपद", lord: "Saturno", deity: "Ahir Budhnya",
    symbol: "Gêmeos ou serpente marinha", animal: "Vaca macho", tree: "Neem",
    nature: "Manushya (humano)", guna: "Tamas", element: "Água", direction: "Noroeste",
    caste: "Brahmin", gender: "Macho", dosha: "Kapha",
    description: "Uttara Bhadrapada é o nakshatra da sabedoria profunda e proteção. Ahir Budhnya, a serpente das profundezas, rege este nakshatra de conhecimento oculto, cura e proteção espiritual.",
    compatibility: ["Revati", "Ashwini", "Bharani", "Krittika", "Rohini"],
    favorableActivities: ["Estudo profundo", "Cura", "Proteção", "Meditação", "Ensino espiritual"],
    unfavorableActivities: ["Superficialidade", "Ignorância", "Negligência espiritual"],
  },
  {
    name: "Revati", sanskritName: "रेवती", lord: "Mercúrio", deity: "Pushan",
    symbol: "Peixe ou par de peixes", animal: "Elefante fêmea", tree: "Palasha",
    nature: "Deva (divino)", guna: "Sattva", element: "Água", direction: "Norte",
    caste: "Shudra", gender: "Fêmea", dosha: "Kapha",
    description: "Revati é o nakshatra da nutrição e proteção final. Pushan, o deus que nutre e protege, rege este nakshatra de compaixão, cuidado e conclusão. É o último nakshatra, representando a completude.",
    compatibility: ["Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira"],
    favorableActivities: ["Cuidado", "Nutrição", "Viagens seguras", "Conclusões", "Proteção"],
    unfavorableActivities: ["Abandono", "Negligência", "Inícios precipitados"],
  },
];

// ============================================================
// VIMSHOTTARI DASHA - SISTEMA DE PERÍODOS PLANETÁRIOS
// ============================================================

export interface DashaPeriod {
  planet: string;
  startDate: string;
  endDate: string;
  years: number;
  subPeriods: AntardashaPeriod[];
  interpretation: string;
  favorable: string[];
  challenges: string[];
}

export interface AntardashaPeriod {
  planet: string;
  startDate: string;
  endDate: string;
  months: number;
  interpretation: string;
}

export interface DashaSystem {
  currentMahadasha: DashaPeriod;
  currentAntardasha: AntardashaPeriod;
  currentPratyantardasha: AntardashaPeriod;
  allMahadashas: DashaPeriod[];
  remainingYears: number;
  balanceAtBirth: number;
}

const DASHA_YEARS: Record<string, number> = {
  "Ketu": 7, "Vênus": 20, "Sol": 6, "Lua": 10, "Marte": 7,
  "Rahu": 18, "Júpiter": 16, "Saturno": 19, "Mercúrio": 17,
};

const DASHA_ORDER = ["Ketu", "Vênus", "Sol", "Lua", "Marte", "Rahu", "Júpiter", "Saturno", "Mercúrio"];

const DASHA_INTERPRETATIONS: Record<string, { interpretation: string; favorable: string[]; challenges: string[] }> = {
  "Ketu": {
    interpretation: "Período de desapego, espiritualidade e libertação. Ketu traz experiências que levam à renúncia e ao despertar espiritual. Pode haver confusão inicial, mas o resultado é crescimento interior.",
    favorable: ["Meditação", "Estudo espiritual", "Viagens a lugares sagrados", "Caridade", "Desapego material"],
    challenges: ["Confusão mental", "Perdas inesperadas", "Isolamento", "Problemas de saúde não diagnosticados"],
  },
  "Vênus": {
    interpretation: "Período de amor, beleza, luxo e relacionamentos. Vênus traz prosperidade material, prazeres sensoriais e oportunidades românticas. É um dos melhores períodos para crescimento financeiro e social.",
    favorable: ["Casamento", "Negócios de luxo", "Artes", "Investimentos", "Viagens de prazer"],
    challenges: ["Excesso de indulgência", "Gastos excessivos", "Relacionamentos complicados", "Vaidade"],
  },
  "Sol": {
    interpretation: "Período de autoridade, reconhecimento e poder. O Sol traz oportunidades de liderança, reconhecimento governamental e crescimento de status. É um período de afirmação do ego e realização profissional.",
    favorable: ["Carreira política", "Liderança", "Reconhecimento público", "Assuntos governamentais", "Pai"],
    challenges: ["Ego inflado", "Conflitos com autoridade", "Problemas de saúde (coração, olhos)", "Arrogância"],
  },
  "Lua": {
    interpretation: "Período de emoções, mente e nutrição. A Lua traz foco na vida doméstica, mãe, emoções e bem-estar mental. É um período de sensibilidade aumentada e conexão com o público.",
    favorable: ["Imóveis", "Viagens aquáticas", "Relacionamento com mãe", "Negócios de alimentos", "Bem-estar"],
    challenges: ["Instabilidade emocional", "Problemas mentais", "Viagens excessivas", "Dependência emocional"],
  },
  "Marte": {
    interpretation: "Período de energia, coragem e ação. Marte traz impulso para conquistar, competir e superar obstáculos. É um período de alta energia física e determinação.",
    favorable: ["Esportes", "Militar/polícia", "Engenharia", "Cirurgia", "Competições", "Imóveis"],
    challenges: ["Acidentes", "Conflitos", "Cirurgias", "Irritabilidade", "Gastos impulsivos"],
  },
  "Rahu": {
    interpretation: "Período de ambição, ilusão e transformação. Rahu traz desejos intensos, oportunidades inesperadas e experiências que expandem os limites. Pode trazer sucesso súbito ou quedas dramáticas.",
    favorable: ["Tecnologia", "Negócios estrangeiros", "Política", "Investimentos arriscados", "Ocultismo"],
    challenges: ["Ilusão", "Vícios", "Perdas súbitas", "Problemas legais", "Ansiedade", "Confusão"],
  },
  "Júpiter": {
    interpretation: "Período de sabedoria, expansão e prosperidade. Júpiter é o mais benéfico dos dashas, trazendo crescimento espiritual, financeiro e familiar. É um período de boa fortuna e bênçãos.",
    favorable: ["Educação", "Casamento", "Filhos", "Ensino", "Religião", "Viagens espirituais", "Investimentos"],
    challenges: ["Excesso de otimismo", "Gastos com educação", "Peso excessivo", "Dogmatismo"],
  },
  "Saturno": {
    interpretation: "Período de disciplina, trabalho duro e maturidade. Saturno traz lições através de responsabilidades, atrasos e testes de caráter. O sucesso vem através do esforço persistente.",
    favorable: ["Trabalho árduo", "Disciplina", "Imóveis", "Mineração", "Serviço social", "Longevidade"],
    challenges: ["Atrasos", "Obstáculos", "Depressão", "Problemas de saúde crônicos", "Perdas", "Solidão"],
  },
  "Mercúrio": {
    interpretation: "Período de comunicação, inteligência e negócios. Mercúrio traz foco em aprendizado, comércio, comunicação e habilidades analíticas. É um período de atividade mental intensa.",
    favorable: ["Educação", "Comércio", "Escrita", "Contabilidade", "Tecnologia", "Viagens curtas"],
    challenges: ["Ansiedade mental", "Problemas de comunicação", "Nervosismo", "Gastos com educação"],
  },
};

// ============================================================
// DIVISIONAL CHARTS (VARGAS)
// ============================================================

export interface DivisionalChart {
  name: string;
  sanskritName: string;
  division: number;
  purpose: string;
  planets: PlanetData[];
  houses: { house: number; longitude: number; sign: ZodiacSign; degree: number }[];
  ascendant: { longitude: number; sign: ZodiacSign; degree: number };
}

export interface VargaAnalysis {
  charts: DivisionalChart[];
  overallStrength: Record<string, number>;
  keyInsights: string[];
}

// ============================================================
// YOGAS PLANETÁRIOS
// ============================================================

export interface YogaData {
  name: string;
  sanskritName: string;
  type: "Raja Yoga" | "Dhana Yoga" | "Parivraja Yoga" | "Sannyasa Yoga" | "Neechabhanga" | "Gaja Kesari" | "Pancha Mahapurusha" | "Kemadruma" | "Kaala Sarpa" | "Mangal Dosha" | "Outro";
  planets: string[];
  houses: number[];
  strength: "Forte" | "Médio" | "Fraco";
  description: string;
  effects: string[];
  remedies?: string[];
}

// ============================================================
// SISTEMA JAIMINI
// ============================================================

export interface JaiminiKarakas {
  Atmakaraka: { planet: string; longitude: number; sign: ZodiacSign; degree: number };
  Amatyakaraka: { planet: string; longitude: number; sign: ZodiacSign; degree: number };
  Bhratrukaraka: { planet: string; longitude: number; sign: ZodiacSign; degree: number };
  Matrikaraka: { planet: string; longitude: number; sign: ZodiacSign; degree: number };
  Putrakaraka: { planet: string; longitude: number; sign: ZodiacSign; degree: number };
  Gnatikaraka: { planet: string; longitude: number; sign: ZodiacSign; degree: number };
  Darakaraka: { planet: string; longitude: number; sign: ZodiacSign; degree: number };
}

export interface CharaDashaPeriod {
  sign: ZodiacSign;
  startDate: string;
  endDate: string;
  years: number;
  lord: string;
  interpretation: string;
}

// ============================================================
// KP SYSTEM (KRISHNAMURTI PADDHATI)
// ============================================================

export interface KPSubLord {
  planet: string;
  starLord: string;
  subLord: string;
  subSubLord: string;
  house: number;
  interpretation: string;
}

export interface KPCuspalData {
  house: number;
  longitude: number;
  sign: ZodiacSign;
  starLord: string;
  subLord: string;
  interpretation: string;
}

// ============================================================
// TAJIKA SYSTEM (REVOLUÇÃO SOLAR VÉDICA)
// ============================================================

export interface TajikaChart {
  year: number;
  date: string;
  muntha: number;
  saleshma: string;
  varsheshwar: string;
  munthesh: string;
  tripatilord: string;
  aspects: TajikaAspect[];
  yogas: TajikaYoga[];
  predictions: TajikaPrediction[];
}

export interface TajikaAspect {
  planet1: string;
  planet2: string;
  type: string;
  strength: string;
  result: string;
}

export interface TajikaYoga {
  name: string;
  planets: string[];
  result: string;
}

export interface TajikaPrediction {
  area: string;
  prediction: string;
  strength: "Favorável" | "Desfavorável" | "Neutro";
}

// ============================================================
// REMÉDIOS VÉDICOS
// ============================================================

export interface VedicRemedies {
  gemstones: GemstoneRemedy[];
  mantras: MantraRemedy[];
  yantras: YantraRemedy[];
  donations: DonationRemedy[];
  fasting: FastingRemedy[];
  rituals: RitualRemedy[];
}

export interface GemstoneRemedy {
  planet: string;
  gemstone: string;
  sanskritName: string;
  weight: string;
  metal: string;
  finger: string;
  day: string;
  time: string;
  mantra: string;
  precautions: string[];
}

export interface MantraRemedy {
  planet: string;
  mantra: string;
  transliteration: string;
  meaning: string;
  repetitions: number;
  days: number;
  bestTime: string;
  direction: string;
}

export interface YantraRemedy {
  planet: string;
  yantra: string;
  material: string;
  installation: string;
  worship: string;
}

export interface DonationRemedy {
  planet: string;
  items: string[];
  day: string;
  recipients: string[];
}

export interface FastingRemedy {
  planet: string;
  day: string;
  rules: string[];
  foods: string[];
}

export interface RitualRemedy {
  name: string;
  purpose: string;
  procedure: string[];
  materials: string[];
  bestTime: string;
}

// ============================================================
// LAL KITAB
// ============================================================

export interface LalKitabRemedy {
  planet: string;
  house: number;
  remedy: string;
  prohibition: string;
  effect: string;
}

export interface LalKitabAnalysis {
  remedies: LalKitabRemedy[];
  generalAdvice: string[];
  planetaryPositions: { planet: string; house: number; interpretation: string }[];
}

// ============================================================
// NADI ASTROLOGY
// ============================================================

export interface NadiPrediction {
  category: string;
  prediction: string;
  timing: string;
  certainty: "Alta" | "Média" | "Baixa";
}

export interface NadiAnalysis {
  predictions: NadiPrediction[];
  pastLife: string;
  karmicLessons: string[];
  spiritualPath: string;
}

// ============================================================
// CORE FUNCTIONS
// ============================================================

export function getNakshatraForLongitude(longitude: number): NakshatraData {
  const normalized = normalize360(longitude);
  const nakshatraIndex = Math.floor(normalized / (360 / 27));
  const nakshatraStart = nakshatraIndex * (360 / 27);
  const nakshatraEnd = (nakshatraIndex + 1) * (360 / 27);
  const padaIndex = Math.floor((normalized - nakshatraStart) / ((360 / 27) / 4));
  
  const base = NAKSHATRAS[nakshatraIndex % 27];
  
  return {
    ...base,
    longitudeStart: nakshatraStart,
    longitudeEnd: nakshatraEnd,
    pada: padaIndex + 1,
  };
}

export function calculateVimshottariDasha(
  moonLongitude: number,
  birthDate: Date,
  yearsToCalculate: number = 120
): DashaSystem {
  const moonNakshatra = getNakshatraForLongitude(moonLongitude);
  const nakshatraIndex = NAKSHATRAS.findIndex(n => n.name === moonNakshatra.name);
  
  // Calcular balance no nascimento
  const nakshatraStart = nakshatraIndex * (360 / 27);
  const progressInNakshatra = moonLongitude - nakshatraStart;
  const nakshatraSpan = 360 / 27;
  const progressRatio = Math.max(0, Math.min(0.9999, progressInNakshatra / nakshatraSpan));

  const firstPlanet = moonNakshatra.lord;
  const firstPlanetYears = DASHA_YEARS[firstPlanet] || 7;
  const balanceAtBirth = firstPlanetYears * (1 - progressRatio);

  // Gerar todos os mahadashas
  const allMahadashas: DashaPeriod[] = [];
  let currentDate = new Date(birthDate);

  // Adicionar o remanescente em milissegundos para precisão e evitar Invalid Date
  currentDate.setTime(currentDate.getTime() + balanceAtBirth * 365.25 * 24 * 60 * 60 * 1000);

  let planetIndex = DASHA_ORDER.indexOf(firstPlanet);
  if (planetIndex === -1) planetIndex = 0;
  let totalYears = 0;
  
  for (let cycle = 0; cycle < Math.ceil(yearsToCalculate / 120) + 1; cycle++) {
    for (let i = 0; i < DASHA_ORDER.length; i++) {
      const planet = DASHA_ORDER[(planetIndex + i) % 9];
      const years = DASHA_YEARS[planet];
      const startDate = new Date(currentDate);
      const endDate = new Date(currentDate);
      endDate.setFullYear(endDate.getFullYear() + years);
      
      const interpretation = DASHA_INTERPRETATIONS[planet];
      
      // Calcular antardashas
      const subPeriods: AntardashaPeriod[] = [];
      let subDate = new Date(startDate);
      for (let j = 0; j < DASHA_ORDER.length; j++) {
        const subPlanet = DASHA_ORDER[(planetIndex + i + j) % 9];
        const subMonths = (years * DASHA_YEARS[subPlanet]) / 120 * 12;
        const subEnd = new Date(subDate);
        subEnd.setMonth(subEnd.getMonth() + Math.round(subMonths));
        
        subPeriods.push({
          planet: subPlanet,
          startDate: subDate.toISOString().split("T")[0],
          endDate: subEnd.toISOString().split("T")[0],
          months: Math.round(subMonths),
          interpretation: `Sub-período de ${subPlanet} durante ${planet}: ${DASHA_INTERPRETATIONS[subPlanet]?.interpretation.substring(0, 100)}...`,
        });
        subDate = subEnd;
      }
      
      allMahadashas.push({
        planet,
        startDate: startDate.toISOString().split("T")[0],
        endDate: endDate.toISOString().split("T")[0],
        years,
        subPeriods,
        interpretation: interpretation?.interpretation || "",
        favorable: interpretation?.favorable || [],
        challenges: interpretation?.challenges || [],
      });
      
      currentDate = endDate;
      totalYears += years;
      
      if (totalYears >= yearsToCalculate) break;
    }
    if (totalYears >= yearsToCalculate) break;
  }
  
  // Encontrar dasha atual
  const now = new Date();
  const currentMahadasha = allMahadashas.find(d => 
    new Date(d.startDate) <= now && new Date(d.endDate) > now
  ) || allMahadashas[0];
  
  const currentAntardasha = currentMahadasha?.subPeriods.find(s =>
    new Date(s.startDate) <= now && new Date(s.endDate) > now
  ) || currentMahadasha?.subPeriods[0];
  
  return {
    currentMahadasha: currentMahadasha || allMahadashas[0],
    currentAntardasha: currentAntardasha || { planet: "", startDate: "", endDate: "", months: 0, interpretation: "" },
    currentPratyantardasha: { planet: "", startDate: "", endDate: "", months: 0, interpretation: "" },
    allMahadashas: allMahadashas.slice(0, 15),
    remainingYears: currentMahadasha ? (new Date(currentMahadasha.endDate).getTime() - now.getTime()) / (365.25 * 24 * 60 * 60 * 1000) : 0,
    balanceAtBirth,
  };
}

export function calculateDivisionalChart(
  planets: PlanetData[],
  ascendantLongitude: number,
  division: number
): DivisionalChart {
  const chartNames: Record<number, { name: string; sanskritName: string; purpose: string }> = {
    1: { name: "Rasi", sanskritName: "राशि", purpose: "Mapa principal - vida geral" },
    2: { name: "Hora", sanskritName: "होरा", purpose: "Riqueza e recursos" },
    3: { name: "Drekkana", sanskritName: "द्रेष्काण", purpose: "Irmãos e coragem" },
    4: { name: "Chaturthamsa", sanskritName: "चतुर्थांश", purpose: "Imóveis e felicidade" },
    5: { name: "Panchamsa", sanskritName: "पंचमांश", purpose: "Filhos e criatividade" },
    6: { name: "Shashthamsa", sanskritName: "षष्ठांश", purpose: "Saúde e inimigos" },
    7: { name: "Saptamsa", sanskritName: "सप्तांश", purpose: "Casamento e relacionamentos" },
    8: { name: "Ashtamsa", sanskritName: "अष्टमांश", purpose: "Obstáculos e longevidade" },
    9: { name: "Navamsa", sanskritName: "नवांश", purpose: "Casamento e dharma" },
    10: { name: "Dasamsa", sanskritName: "दशमांश", purpose: "Carreira e profissão" },
    11: { name: "Ekadasha", sanskritName: "एकादशांश", purpose: "Ganhos e amizades" },
    12: { name: "Dwadashamsa", sanskritName: "द्वादशांश", purpose: "Pais e vidas passadas" },
    16: { name: "Shodashamsa", sanskritName: "षोडशांश", purpose: "Veículos e conforto" },
    20: { name: "Vimsamsa", sanskritName: "विंशांश", purpose: "Espiritualidade e sadhana" },
    24: { name: "Chaturvimsamsa", sanskritName: "चतुर्विंशांश", purpose: "Educação e conhecimento" },
    27: { name: "Saptavimsamsa", sanskritName: "सप्तविंशांश", purpose: "Força e fraqueza" },
    30: { name: "Trimsamsa", sanskritName: "त्रिंशांश", purpose: "Males e misérias" },
    40: { name: "Khavedamsa", sanskritName: "खवेदांश", purpose: "Auspiciosidade e inauspiciosidade" },
    45: { name: "Akshavedamsa", sanskritName: "अक्षवेदांश", purpose: "Caráter e natureza" },
    60: { name: "Shashtiamsa", sanskritName: "षष्ट्यंश", purpose: "Todas as áreas da vida" },
  };
  
  const chartInfo = chartNames[division] || { name: `D${division}`, sanskritName: "", purpose: "Análise específica" };
  
  // Calcular posições divisionais
  const divPlanets = planets.map(p => {
    const divLongitude = normalize360(p.longitude * division);
    return {
      ...p,
      longitude: divLongitude,
      sign: getSignForLongitude(divLongitude),
      degree: Math.floor(getSignDegree(divLongitude)),
    };
  });
  
  // Calcular ASC divisional
  const divAsc = normalize360(ascendantLongitude * division);
  
  // Calcular casas
  const cusps = [];
  for (let i = 0; i < 12; i++) {
    cusps.push(normalize360(divAsc + i * 30));
  }
  
  const houses = cusps.map((c, i) => ({
    house: i + 1,
    longitude: c,
    sign: getSignForLongitude(c),
    degree: Math.floor(getSignDegree(c)),
  }));
  
  return {
    name: chartInfo.name,
    sanskritName: chartInfo.sanskritName,
    division,
    purpose: chartInfo.purpose,
    planets: divPlanets,
    houses,
    ascendant: {
      longitude: divAsc,
      sign: getSignForLongitude(divAsc),
      degree: Math.floor(getSignDegree(divAsc)),
    },
  };
}

export function calculateVargaAnalysis(
  planets: PlanetData[],
  ascendantLongitude: number
): VargaAnalysis {
  const importantDivisions = [1, 9, 10, 7, 4, 12, 3, 2, 16, 20, 24, 30, 60];
  
  const charts = importantDivisions.map(div => 
    calculateDivisionalChart(planets, ascendantLongitude, div)
  );
  
  // Calcular força planetária através dos vargas
  const planetStrength: Record<string, number> = {};
  
  for (const planet of planets) {
    let strength = 0;
    for (const chart of charts) {
      const divPlanet = chart.planets.find(p => p.name === planet.name);
      if (divPlanet) {
        // Planeta em signo próprio ou exaltação no varga ganha pontos
        const sign = divPlanet.sign;
        const ruler = SIGN_RULERS?.[sign];
        if (ruler === planet.name) strength += 2;
        if (PLANETARY_DIGNITIES?.[planet.name]?.exaltation === sign) strength += 3;
        if (PLANETARY_DIGNITIES?.[planet.name]?.domicile === sign) strength += 2;
        if (PLANETARY_DIGNITIES?.[planet.name]?.fall === sign) strength -= 2;
        if (PLANETARY_DIGNITIES?.[planet.name]?.detriment === sign) strength -= 2;
      }
    }
    planetStrength[planet.name] = strength;
  }
  
  // Insights chave
  const keyInsights: string[] = [];
  
  // Verificar Navamsa (D9) para força do casamento
  const navamsa = charts.find(c => c.division === 9);
  if (navamsa) {
    const venusInNavamsa = navamsa.planets.find(p => p.name === "Vênus");
    if (venusInNavamsa) {
      const dignity = PLANETARY_DIGNITIES?.["Vênus"];
      if (dignity?.domicile === venusInNavamsa.sign || dignity?.exaltation === venusInNavamsa.sign) {
        keyInsights.push("Vênus forte no Navamsa indica casamento harmonioso e duradouro.");
      } else if (dignity?.fall === venusInNavamsa.sign || dignity?.detriment === venusInNavamsa.sign) {
        keyInsights.push("Vênus debilitado no Navamsa sugere desafios no casamento.");
      }
    }
  }
  
  // Verificar Dasamsa (D10) para carreira
  const dasamsa = charts.find(c => c.division === 10);
  if (dasamsa) {
    const sunInDasamsa = dasamsa.planets.find(p => p.name === "Sol");
    if (sunInDasamsa && (sunInDasamsa.house === 10 || sunInDasamsa.house === 1)) {
      keyInsights.push("Sol forte no Dasamsa indica sucesso na carreira e reconhecimento profissional.");
    }
  }
  
  return {
    charts,
    overallStrength: planetStrength,
    keyInsights,
  };
}

export function calculateYogas(
  planets: PlanetData[],
  houses: { house: number; longitude: number; sign: ZodiacSign; degree: number }[]
): YogaData[] {
  const yogas: YogaData[] = [];
  
  // Gaja Kesari Yoga - Júpiter e Lua em kendra (1,4,7,10)
  const jupiter = planets.find(p => p.name === "Júpiter");
  const moon = planets.find(p => p.name === "Lua");
  if (jupiter && moon) {
    const jupiterKendra = [1, 4, 7, 10].includes(jupiter.house);
    const moonKendra = [1, 4, 7, 10].includes(moon.house);
    if (jupiterKendra || moonKendra) {
      const angle = angleDiff(jupiter.longitude, moon.longitude);
      if (angle < 90) {
        yogas.push({
          name: "Gaja Kesari Yoga",
          sanskritName: "गज केसरी योग",
          type: "Gaja Kesari",
          planets: ["Júpiter", "Lua"],
          houses: [jupiter.house, moon.house],
          strength: "Forte",
          description: "Júpiter e Lua em kendra um do outro. Este yoga traz sabedoria, fama, riqueza e sucesso.",
          effects: ["Sabedoria", "Fama", "Riqueza", "Sucesso", "Boa reputação"],
        });
      }
    }
  }
  
  // Raja Yoga - Lordes de kendra e trikona juntos
  const kendraHouses = [1, 4, 7, 10];
  const trikonaHouses = [1, 5, 9];
  
  for (const kendra of kendraHouses) {
    for (const trikona of trikonaHouses) {
      if (kendra === trikona) continue;
      const kendraLord = houses[kendra - 1]?.sign;
      const trikonaLord = houses[trikona - 1]?.sign;
        if (kendraLord && trikonaLord) {
          const kendraLordPlanet = SIGN_RULERS[kendraLord];
          const trikonaLordPlanet = SIGN_RULERS[trikonaLord];

          if (kendraLordPlanet && trikonaLordPlanet) {
            const p1 = planets.find(p => p.name === kendraLordPlanet);
            const p2 = planets.find(p => p.name === trikonaLordPlanet);
          if (p1 && p2 && p1.house === p2.house) {
            yogas.push({
              name: "Raja Yoga",
              sanskritName: "राज योग",
              type: "Raja Yoga",
              planets: [kendraLordPlanet, trikonaLordPlanet],
              houses: [p1.house],
              strength: "Forte",
              description: `Lorde de kendra (${kendra}) e trikona (${trikona}) juntos na casa ${p1.house}. Este yoga traz poder, autoridade e sucesso.`,
              effects: ["Poder", "Autoridade", "Sucesso", "Riqueza", "Posição elevada"],
            });
          }
        }
      }
    }
  }
  
  // Dhana Yoga - Lordes de 2, 5, 9, 11 juntos
  const dhanaHouses = [2, 5, 9, 11];
  for (const h1 of dhanaHouses) {
    for (const h2 of dhanaHouses) {
      if (h1 >= h2) continue;
      const lord1 = houses[h1 - 1]?.sign;
      const lord2 = houses[h2 - 1]?.sign;
      if (lord1 && lord2) {
        const p1 = Object.entries(SIGN_RULERS || {}).find(([_, s]) => s === lord1)?.[0];
        const p2 = Object.entries(SIGN_RULERS || {}).find(([_, s]) => s === lord2)?.[0];
        if (p1 && p2) {
          const planet1 = planets.find(p => p.name === p1);
          const planet2 = planets.find(p => p.name === p2);
          if (planet1 && planet2 && planet1.house === planet2.house) {
            yogas.push({
              name: "Dhana Yoga",
              sanskritName: "धन योग",
              type: "Dhana Yoga",
              planets: [p1, p2],
              houses: [planet1.house],
              strength: "Médio",
              description: `Lorde da casa ${h1} e ${h2} juntos. Este yoga traz riqueza e prosperidade financeira.`,
              effects: ["Riqueza", "Prosperidade", "Ganhos financeiros", "Abundância"],
            });
          }
        }
      }
    }
  }
  
  // Pancha Mahapurusha Yogas
  const mahapurushaPlanets = ["Marte", "Mercúrio", "Júpiter", "Vênus", "Saturno"];
  const kendraPositions = [1, 4, 7, 10];
  
  for (const planetName of mahapurushaPlanets) {
    const planet = planets.find(p => p.name === planetName);
    if (!planet) continue;
    
    if (kendraPositions.includes(planet.house)) {
      const dignity = PLANETARY_DIGNITIES?.[planetName];
      if (dignity && (dignity.domicile === planet.sign || dignity.exaltation === planet.sign)) {
        const yogaNames: Record<string, string> = {
          "Marte": "Ruchaka Yoga",
          "Mercúrio": "Bhadra Yoga",
          "Júpiter": "Hamsa Yoga",
          "Vênus": "Malavya Yoga",
          "Saturno": "Sasa Yoga",
        };
        
        yogas.push({
          name: yogaNames[planetName],
          sanskritName: "",
          type: "Pancha Mahapurusha",
          planets: [planetName],
          houses: [planet.house],
          strength: "Forte",
          description: `${planetName} em kendra em signo próprio ou exaltação. Um dos cinco grandes yogas de personalidade.`,
          effects: ["Personalidade forte", "Sucesso", "Reconhecimento", "Carisma"],
        });
      }
    }
  }
  
  // Kemadruma Yoga - Lua sem planetas adjacentes
  if (moon) {
    const moonHouse = moon.house;
    const hasAdjacent = planets.some(p => 
      p.name !== "Lua" && (p.house === moonHouse - 1 || p.house === moonHouse + 1)
    );
    if (!hasAdjacent) {
      yogas.push({
        name: "Kemadruma Yoga",
        sanskritName: "केमद्रुम योग",
        type: "Kemadruma",
        planets: ["Lua"],
        houses: [moonHouse],
        strength: "Fraco",
        description: "Lua sem planetas nas casas 2 e 12. Este yoga pode trazer dificuldades financeiras e emocionais.",
        effects: ["Dificuldades financeiras", "Instabilidade emocional", "Solidão"],
        remedies: ["Adorar a Lua", "Usar pérola", "Jejuar nas segundas-feiras"],
      });
    }
  }
  
  // Mangal Dosha - Marte em casas específicas
  if (jupiter) {
    const mars = planets.find(p => p.name === "Marte");
    if (mars && [1, 2, 4, 7, 8, 12].includes(mars.house)) {
      yogas.push({
        name: "Mangal Dosha",
        sanskritName: "मंगल दोष",
        type: "Mangal Dosha",
        planets: ["Marte"],
        houses: [mars.house],
        strength: "Médio",
        description: `Marte na casa ${mars.house}. Este dosha pode afetar o casamento e relacionamentos.`,
        effects: ["Conflitos no casamento", "Temperamento forte", "Impulsividade"],
        remedies: ["Adorar Hanuman", "Jejuar nas terças-feiras", "Recitar Hanuman Chalisa"],
      });
    }
  }
  
  return yogas;
}

export function calculateJaiminiKarakas(planets: PlanetData[]): JaiminiKarakas {
  // Ordenar planetas por longitude (excluindo Rahu/Ketu para alguns sistemas)
  const sorted = [...planets].sort((a, b) => b.longitude - a.longitude);

  const kp = (i: number) => sorted[i] ?? { name: "N/A", longitude: 0, sign: "Desconhecido", degree: 0 };

  return {
    Atmakaraka: { planet: kp(0).name, longitude: kp(0).longitude, sign: kp(0).sign, degree: kp(0).degree },
    Amatyakaraka: { planet: kp(1).name, longitude: kp(1).longitude, sign: kp(1).sign, degree: kp(1).degree },
    Bhratrukaraka: { planet: kp(2).name, longitude: kp(2).longitude, sign: kp(2).sign, degree: kp(2).degree },
    Matrikaraka: { planet: kp(3).name, longitude: kp(3).longitude, sign: kp(3).sign, degree: kp(3).degree },
    Putrakaraka: { planet: kp(4).name, longitude: kp(4).longitude, sign: kp(4).sign, degree: kp(4).degree },
    Gnatikaraka: { planet: kp(5).name, longitude: kp(5).longitude, sign: kp(5).sign, degree: kp(5).degree },
    Darakaraka: { planet: kp(6).name, longitude: kp(6).longitude, sign: kp(6).sign, degree: kp(6).degree },
  };
}

export function calculateCharaDasha(
  ascendantSign: ZodiacSign,
  birthDate: Date,
  yearsToCalculate: number = 100
): CharaDashaPeriod[] {
  const signIndex = ZODIAC_SIGNS.indexOf(ascendantSign);
  const periods: CharaDashaPeriod[] = [];
  
  // Calcular duração de cada signo baseado em regras Jaimini
  const signDurations: Record<number, number> = {};
  for (let i = 0; i < 12; i++) {
    const sign = ZODIAC_SIGNS[(signIndex + i) % 12];
    const signLon = i * 30;
    // Regra simplificada: signos em signos ímpares contam para frente, pares para trás
    const isOddSign = i % 2 === 0;
    const duration = isOddSign ? 12 - i : i + 1;
    signDurations[i] = Math.max(1, duration);
  }
  
  let currentDate = new Date(birthDate);
  for (let cycle = 0; cycle < Math.ceil(yearsToCalculate / 120) + 1; cycle++) {
    for (let i = 0; i < 12; i++) {
      const sign = ZODIAC_SIGNS[(signIndex + i) % 12];
      const years = signDurations[i] || 9;
      const startDate = new Date(currentDate);
      const endDate = new Date(currentDate);
      endDate.setFullYear(endDate.getFullYear() + years);
      
      const lord = SIGN_RULERS?.[sign] || "Desconhecido";
      
      periods.push({
        sign,
        startDate: startDate.toISOString().split("T")[0],
        endDate: endDate.toISOString().split("T")[0],
        years,
        lord,
        interpretation: `Período de ${sign} regido por ${lord}. Foco nas áreas da vida relacionadas a este signo e seu regente.`,
      });
      
      currentDate = endDate;
    }
  }
  
  return periods.slice(0, 20);
}

export function calculateVedicRemedies(
  planets: PlanetData[],
  yogas: YogaData[],
  dasha: DashaSystem
): VedicRemedies {
  const gemstones: GemstoneRemedy[] = [];
  const mantras: MantraRemedy[] = [];
  const yantras: YantraRemedy[] = [];
  const donations: DonationRemedy[] = [];
  const fasting: FastingRemedy[] = [];
  const rituals: RitualRemedy[] = [];
  
  // Planetas fracos ou maléficos precisam de remédios
  const weakPlanets = planets.filter(p => {
    const dignity = PLANETARY_DIGNITIES?.[p.name];
    if (!dignity) return false;
    return dignity.fall === p.sign || dignity.detriment === p.sign;
  });
  
  // Gemas para cada planeta
  const gemstoneMap: Record<string, GemstoneRemedy> = {
    "Sol": { planet: "Sol", gemstone: "Rubi", sanskritName: "माणिक्य", weight: "3-6 quilates", metal: "Ouro", finger: "Anelar", day: "Domingo", time: "Amanhecer", mantra: "Om Suryaya Namaha", precautions: ["Usar após consulta com astrólogo", "Purificar antes de usar"] },
    "Lua": { planet: "Lua", gemstone: "Pérola", sanskritName: "मोती", weight: "2-5 quilates", metal: "Prata", finger: "Mindinho", day: "Segunda-feira", time: "Amanhecer", mantra: "Om Chandraya Namaha", precautions: ["Usar em lua crescente", "Evitar se Lua for maléfica"] },
    "Marte": { planet: "Marte", gemstone: "Coral Vermelho", sanskritName: "मूंगा", weight: "3-6 quilates", metal: "Ouro ou Cobre", finger: "Anelar", day: "Terça-feira", time: "Amanhecer", mantra: "Om Angarakaya Namaha", precautions: ["Usar após consulta", "Evitar se Marte for maléfico"] },
    "Mercúrio": { planet: "Mercúrio", gemstone: "Esmeralda", sanskritName: "पन्ना", weight: "3-6 quilates", metal: "Ouro ou Prata", finger: "Mindinho", day: "Quarta-feira", time: "Amanhecer", mantra: "Om Budhaya Namaha", precautions: ["Verificar posição no mapa", "Usar apenas se benéfico"] },
    "Júpiter": { planet: "Júpiter", gemstone: "Topázio Amarelo", sanskritName: "पुखराज", weight: "3-5 quilates", metal: "Ouro", finger: "Indicador", day: "Quinta-feira", time: "Amanhecer", mantra: "Om Brihaspataye Namaha", precautions: ["Usar em lua crescente", "Purificar em Ganga Jal"] },
    "Vênus": { planet: "Vênus", gemstone: "Diamante", sanskritName: "हीरा", weight: "1-2 quilates", metal: "Platina ou Prata", finger: "Médio ou Anelar", day: "Sexta-feira", time: "Amanhecer", mantra: "Om Shukraya Namaha", precautions: ["Usar apenas se Vênus for benéfico", "Alta qualidade necessária"] },
    "Saturno": { planet: "Saturno", gemstone: "Safira Azul", sanskritName: "नीलम", weight: "3-5 quilates", metal: "Prata ou Ferro", finger: "Médio", day: "Sábado", time: "Pôr do sol", mantra: "Om Shanicharaya Namaha", precautions: ["Testar por 3 dias antes", "Usar apenas sob orientação"] },
    "Rahu": { planet: "Rahu", gemstone: "Hessonita", sanskritName: "गोमेद", weight: "3-6 quilates", metal: "Prata ou Chumbo", finger: "Médio", day: "Sábado", time: "Pôr do sol", mantra: "Om Rahave Namaha", precautions: ["Usar com cautela", "Consultar astrólogo"] },
    "Ketu": { planet: "Ketu", gemstone: "Olho de Gato", sanskritName: "लहसुनिया", weight: "3-6 quilates", metal: "Prata ou Ferro", finger: "Médio", day: "Terça-feira", time: "Pôr do sol", mantra: "Om Ketave Namaha", precautions: ["Usar apenas se Ketu for benéfico", "Testar antes"] },
  };
  
  // Adicionar gemas para planetas fracos
  for (const planet of weakPlanets) {
    const gem = gemstoneMap[planet.name];
    if (gem) gemstones.push(gem);
  }
  
  // Mantras para cada planeta
  const mantraMap: Record<string, MantraRemedy> = {
    "Sol": { planet: "Sol", mantra: "ॐ सूर्याय नमः", transliteration: "Om Suryaya Namaha", meaning: "Saudações ao Sol, a alma do universo", repetitions: 7000, days: 40, bestTime: "Amanhecer", direction: "Leste" },
    "Lua": { planet: "Lua", mantra: "ॐ चन्द्राय नमः", transliteration: "Om Chandraya Namaha", meaning: "Saudações à Lua, a mente do universo", repetitions: 11000, days: 40, bestTime: "Noite", direction: "Noroeste" },
    "Marte": { planet: "Marte", mantra: "ॐ अङ्गारकाय नमः", transliteration: "Om Angarakaya Namaha", meaning: "Saudações a Marte, o guerreiro", repetitions: 10000, days: 40, bestTime: "Amanhecer", direction: "Sul" },
    "Mercúrio": { planet: "Mercúrio", mantra: "ॐ बुधाय नमः", transliteration: "Om Budhaya Namaha", meaning: "Saudações a Mercúrio, o inteligente", repetitions: 9000, days: 40, bestTime: "Amanhecer", direction: "Norte" },
    "Júpiter": { planet: "Júpiter", mantra: "ॐ बृहस्पतये नमः", transliteration: "Om Brihaspataye Namaha", meaning: "Saudações a Júpiter, o guru", repetitions: 19000, days: 40, bestTime: "Amanhecer", direction: "Nordeste" },
    "Vênus": { planet: "Vênus", mantra: "ॐ शुक्राय नमः", transliteration: "Om Shukraya Namaha", meaning: "Saudações a Vênus, o brilhante", repetitions: 16000, days: 40, bestTime: "Amanhecer", direction: "Sudeste" },
    "Saturno": { planet: "Saturno", mantra: "ॐ शनैश्चराय नमः", transliteration: "Om Shanicharaya Namaha", meaning: "Saudações a Saturno, o lento", repetitions: 23000, days: 40, bestTime: "Pôr do sol", direction: "Oeste" },
    "Rahu": { planet: "Rahu", mantra: "ॐ राहवे नमः", transliteration: "Om Rahave Namaha", meaning: "Saudações a Rahu, a cabeça do dragão", repetitions: 18000, days: 40, bestTime: "Pôr do sol", direction: "Sudoeste" },
    "Ketu": { planet: "Ketu", mantra: "ॐ केतवे नमः", transliteration: "Om Ketave Namaha", meaning: "Saudações a Ketu, a cauda do dragão", repetitions: 17000, days: 40, bestTime: "Pôr do sol", direction: "Sul" },
  };
  
  for (const planet of weakPlanets) {
    const mantra = mantraMap[planet.name];
    if (mantra) mantras.push(mantra);
  }
  
  // Yantras
  for (const planet of weakPlanets) {
    yantras.push({
      planet: planet.name,
      yantra: `${planet.name} Yantra`,
      material: "Cobre ou prata",
      installation: `Instalar no dia de ${planet.name}, após purificação`,
      worship: `Recitar mantra de ${planet.name} 108 vezes diariamente`,
    });
  }
  
  // Doações
  const donationMap: Record<string, DonationRemedy> = {
    "Sol": { planet: "Sol", items: ["Trigo", "Açúcar mascavo", "Cobre"], day: "Domingo", recipients: ["Templos", "Pais necessitados"] },
    "Lua": { planet: "Lua", items: ["Arroz", "Leite", "Prata"], day: "Segunda-feira", recipients: ["Mãe", "Instituições de caridade"] },
    "Marte": { planet: "Marte", items: ["Lentilhas vermelhas", "Cobre", "Açúcar mascavo"], day: "Terça-feira", recipients: ["Soldados", "Irmãos"] },
    "Mercúrio": { planet: "Mercúrio", items: ["Feijão verde", "Esmeraldas", "Livros"], day: "Quarta-feira", recipients: ["Estudantes", "Professores"] },
    "Júpiter": { planet: "Júpiter", items: ["Cúrcuma", "Ouro", "Roupas amarelas"], day: "Quinta-feira", recipients: ["Professores", "Sacerdotes"] },
    "Vênus": { planet: "Vênus", items: ["Roupas brancas", "Leite", "Açúcar"], day: "Sexta-feira", recipients: ["Mulheres", "Artistas"] },
    "Saturno": { planet: "Saturno", items: ["Óleo de gergelim", "Feijão preto", "Ferro"], day: "Sábado", recipients: ["Trabalhadores", "Idosos"] },
    "Rahu": { planet: "Rahu", items: ["Chumbo", "Óleo de mostarda", "Coco"], day: "Sábado", recipients: ["Necessitados", "Templos"] },
    "Ketu": { planet: "Ketu", items: ["Roupas multicoloridas", "Mel", "Ghee"], day: "Terça-feira", recipients: ["Monges", "Animais"] },
  };
  
  for (const planet of weakPlanets) {
    const donation = donationMap[planet.name];
    if (donation) donations.push(donation);
  }
  
  // Jejum
  const fastingMap: Record<string, FastingRemedy> = {
    "Sol": { planet: "Sol", day: "Domingo", rules: ["Jejuar do amanhecer ao pôr do sol", "Consumir apenas frutas e leite"], foods: ["Frutas", "Leite", "Mel"] },
    "Lua": { planet: "Lua", day: "Segunda-feira", rules: ["Jejuar o dia todo", "Consumir apenas leite e arroz"], foods: ["Leite", "Arroz", "Açúcar"] },
    "Marte": { planet: "Marte", day: "Terça-feira", rules: ["Jejuar do amanhecer ao pôr do sol", "Evitar alimentos quentes"], foods: ["Frutas", "Leite", "Mel"] },
    "Mercúrio": { planet: "Mercúrio", day: "Quarta-feira", rules: ["Jejuar o dia todo", "Consumir apenas alimentos verdes"], foods: ["Vegetais verdes", "Frutas", "Leite"] },
    "Júpiter": { planet: "Júpiter", day: "Quinta-feira", rules: ["Jejuar do amanhecer ao pôr do sol", "Consumir alimentos amarelos"], foods: ["Cúrcuma", "Banana", "Arroz"] },
    "Vênus": { planet: "Vênus", day: "Sexta-feira", rules: ["Jejuar o dia todo", "Consumir alimentos doces"], foods: ["Leite", "Açúcar", "Frutas doces"] },
    "Saturno": { planet: "Saturno", day: "Sábado", rules: ["Jejuar do amanhecer ao pôr do sol", "Consumir apenas uma refeição"], foods: ["Feijão preto", "Óleo de gergelim", "Pão"] },
  };
  
  for (const planet of weakPlanets) {
    const fast = fastingMap[planet.name];
    if (fast) fasting.push(fast);
  }
  
  // Rituais
  rituals.push({
    name: "Navagraha Puja",
    purpose: "Acalmar todos os nove planetas",
    procedure: ["Preparar altar com 9 representações planetárias", "Oferecer flores, frutas e incenso", "Recitar Navagraha Stotram", "Fazer aarti final"],
    materials: ["9 tipos de flores", "9 tipos de frutas", "Incenso", "Ghee", "Navagraha Yantra"],
    bestTime: "Amanhecer de qualquer dia auspicioso",
  });
  
  rituals.push({
    name: "Rudra Abhishekam",
    purpose: "Remover obstáculos e negatividades",
    procedure: ["Banhar Shiva Linga com leite, mel, ghee", "Recitar Rudram", "Oferecer bilva leaves", "Fazer aarti"],
    materials: ["Shiva Linga", "Leite", "Mel", "Ghee", "Folhas de Bilva"],
    bestTime: "Segunda-feira de manhã ou Pradosham",
  });
  
  return { gemstones, mantras, yantras, donations, fasting, rituals };
}

export function calculateLalKitabAnalysis(
  planets: PlanetData[],
  houses: { house: number; longitude: number; sign: ZodiacSign; degree: number }[]
): LalKitabAnalysis {
  const remedies: LalKitabRemedy[] = [];
  const planetaryPositions: { planet: string; house: number; interpretation: string }[] = [];
  
  for (const planet of planets) {
    planetaryPositions.push({
      planet: planet.name,
      house: planet.house,
      interpretation: `${planet.name} na casa ${planet.house}: ${getLalKitabInterpretation(planet.name, planet.house)}`,
    });
    
    // Remédios específicos de Lal Kitab
    if (planet.name === "Sol" && planet.house === 7) {
      remedies.push({
        planet: "Sol",
        house: 7,
        remedy: "Oferecer água ao Sol todas as manhãs",
        prohibition: "Não usar óculos escuros sem necessidade",
        effect: "Melhora relacionamentos e saúde do pai",
      });
    }
    
    if (planet.name === "Lua" && planet.house === 6) {
      remedies.push({
        planet: "Lua",
        house: 6,
        remedy: "Usar prata e oferecer leite à Lua",
        prohibition: "Não beber água em copos de metal",
        effect: "Melhora saúde mental e relacionamentos com a mãe",
      });
    }
    
    if (planet.name === "Marte" && planet.house === 4) {
      remedies.push({
        planet: "Marte",
        house: 4,
        remedy: "Doar lentilhas vermelhas nas terças-feiras",
        prohibition: "Não usar roupas vermelhas em casa",
        effect: "Melhora paz doméstica e relacionamentos com a mãe",
      });
    }
  }
  
  return {
    remedies,
    planetaryPositions,
    generalAdvice: [
      "Mantenha a casa limpa e organizada",
      "Respeite os mais velhos e professores",
      "Evite mentir e enganar",
      "Faça caridade regularmente",
      "Mantenha um altar de oração em casa",
    ],
  };
}

function getLalKitabInterpretation(planet: string, house: number): string {
  const interpretations: Record<string, Record<number, string>> = {
    "Sol": {
      1: "Sol na casa 1: Personalidade forte, liderança, boa saúde",
      2: "Sol na casa 2: Riqueza através de esforço próprio, família forte",
      3: "Sol na casa 3: Coragem, irmãos fortes, comunicação eficaz",
      4: "Sol na casa 4: Conflitos domésticos, problemas com a mãe",
      5: "Sol na casa 5: Inteligência, filhos talentosos, criatividade",
      6: "Sol na casa 6: Vitória sobre inimigos, boa saúde",
      7: "Sol na casa 7: Conflitos no casamento, par dominante",
      8: "Sol na casa 8: Vida longa, interesses ocultos",
      9: "Sol na casa 9: Sorte, pai influente, espiritualidade",
      10: "Sol na casa 10: Sucesso na carreira, reconhecimento",
      11: "Sol na casa 11: Ganhos, amigos influentes",
      12: "Sol na casa 12: Gastos excessivos, viagens ao exterior",
    },
  };
  
  return interpretations[planet]?.[house] || `${planet} na casa ${house}: Influência na área da vida relacionada a esta casa`;
}

export function calculateTajikaChart(
  planets: PlanetData[],
  birthDate: Date,
  year: number
): TajikaChart {
  const diffYears = year - birthDate.getFullYear();
  const muntha = ((diffYears % 12) + 12) % 12;
  const munthaSign = ZODIAC_SIGNS[muntha];
  
  // Varsheshwar (regente do ano)
  const varsheshwar = SIGN_RULERS?.[munthaSign] || "Desconhecido";
  
  // Munthesh (regente do muntha)
  const munthesh = varsheshwar;
  
  // Tripatilord (regente do trikona)
  const trikonaSigns = [munthaSign, ZODIAC_SIGNS[(muntha + 4) % 12], ZODIAC_SIGNS[(muntha + 8) % 12]];
  const tripatilord = SIGN_RULERS?.[trikonaSigns[0]] || "Desconhecido";
  
  // Aspectos Tajika
  const aspects: TajikaAspect[] = [];
  for (let i = 0; i < planets.length; i++) {
    for (let j = i + 1; j < planets.length; j++) {
      const angle = angleDiff(planets[i].longitude, planets[j].longitude);
      let type = "Nenhum";
      let strength = "Fraco";
      let result = "Neutro";
      
      if (angle < 5) { type = "Conjunção"; strength = "Forte"; result = "Intenso"; }
      else if (angle < 65) { type = "Sextil"; strength = "Médio"; result = "Favorável"; }
      else if (angle < 95) { type = "Quadratura"; strength = "Forte"; result = "Desafiador"; }
      else if (angle < 125) { type = "Trígono"; strength = "Forte"; result = "Favorável"; }
      else if (angle < 185) { type = "Oposição"; strength = "Forte"; result = "Conflito"; }
      
      aspects.push({
        planet1: planets[i].name,
        planet2: planets[j].name,
        type,
        strength,
        result,
      });
    }
  }
  
  // Yogas Tajika
  const yogas: TajikaYoga[] = [];
  const favorableAspects = aspects.filter(a => a.result === "Favorável");
  if (favorableAspects.length > 5) {
    yogas.push({
      name: "Ithasala Yoga",
      planets: favorableAspects.slice(0, 3).map(a => a.planet1),
      result: "Ano favorável com sucesso nos empreendimentos",
    });
  }
  
  // Previsões
  const predictions: TajikaPrediction[] = [
    { area: "Saúde", prediction: "Atenção à saúde durante períodos desafiadores", strength: "Neutro" },
    { area: "Carreira", prediction: "Oportunidades de crescimento no meio do ano", strength: "Favorável" },
    { area: "Finanças", prediction: "Ganhos estáveis com investimentos cuidadosos", strength: "Favorável" },
    { area: "Relacionamentos", prediction: "Harmonia com esforço consciente", strength: "Neutro" },
    { area: "Espiritualidade", prediction: "Ano propício para prática espiritual", strength: "Favorável" },
  ];
  
  return {
    year,
    date: new Date(year, birthDate.getMonth(), birthDate.getDate()).toISOString().split("T")[0],
    muntha: munthaSign ? ZODIAC_SIGNS.indexOf(munthaSign) : 0,
    saleshma: munthaSign || "",
    varsheshwar,
    munthesh,
    tripatilord,
    aspects,
    yogas,
    predictions,
  };
}

export function calculateNadiAnalysis(
  planets: PlanetData[],
  nakshatra: NakshatraData
): NadiAnalysis {
  const predictions: NadiPrediction[] = [];
  
  // Previsões baseadas no nakshatra
  predictions.push({
    category: "Carreira",
    prediction: `Nakshatra ${nakshatra.name} indica sucesso através de ${nakshatra.favorableActivities[0] || "esforço próprio"}`,
    timing: "Após os 30 anos",
    certainty: "Alta",
  });
  
  predictions.push({
    category: "Casamento",
    prediction: `Compatibilidade com parceiros de nakshatras: ${nakshatra.compatibility.slice(0, 3).join(", ")}`,
    timing: "Entre 25-35 anos",
    certainty: "Média",
  });
  
  predictions.push({
    category: "Saúde",
    prediction: `Atenção ao dosha ${nakshatra.dosha}. Práticas de equilíbrio recomendadas.`,
    timing: "Contínuo",
    certainty: "Alta",
  });
  
  predictions.push({
    category: "Espiritualidade",
    prediction: `Natureza ${nakshatra.nature} indica caminho espiritual através de ${nakshatra.deity}`,
    timing: "Após os 40 anos",
    certainty: "Média",
  });
  
  return {
    predictions,
    pastLife: `A alma carrega lições de ${nakshatra.deity}, indicando uma vida passada dedicada a ${nakshatra.description || "serviço espiritual"}.`,
    karmicLessons: nakshatra.unfavorableActivities.map(a => `Evitar ${a.toLowerCase()} nesta vida`),
    spiritualPath: `O caminho espiritual é através de ${nakshatra.deity}, com práticas de ${nakshatra.guna} e elemento ${nakshatra.element}.`,
  };
}

// ============================================================
// EXPORTS
// ============================================================

export { ZODIAC_SIGNS, SIGN_RULERS, PLANETARY_DIGNITIES } from "./astro-calculations.js";
