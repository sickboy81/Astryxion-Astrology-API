import { LocalizedText } from '../i18n.js';

export interface TarotCard {
  id: number;
  name: LocalizedText;
  arcana: "Major" | "Minor";
  suit?: "Wands" | "Cups" | "Swords" | "Pentacles";
  number?: string;
  meaningUpright: LocalizedText;
  meaningReversed: LocalizedText;
}

export const TAROT_DECK: TarotCard[] = [
  { 
    id: 0, 
    name: { pt: "O Louco", en: "The Fool", es: "El Loco", hi: "मूर्ख" }, 
    arcana: "Major", 
    meaningUpright: {
      pt: "Novos começos, inocência, espontaneidade, espírito livre.",
      en: "New beginnings, innocence, spontaneity, free spirit.",
      es: "Nuevos comienzos, inocencia, espontaneidad, espíritu libre.",
      hi: "नई शुरुआत, मासूमियत, सहजता, स्वतंत्र आत्मा।"
    }, 
    meaningReversed: {
      pt: "Imprudência, correr riscos desnecessários, ingenuidade.",
      en: "Recklessness, taking unnecessary risks, naivety.",
      es: "Imprudencia, correr riesgos innecesarios, ingenuidad.",
      hi: "लापरवाही, अनावश्यक जोखिम उठाना, भोलापन।"
    }
  },
  { 
    id: 1, 
    name: { pt: "O Mago", en: "The Magician", es: "El Mago", hi: "जादूगर" }, 
    arcana: "Major", 
    meaningUpright: {
      pt: "Manifestação, desenvoltura, poder, ação motivada.",
      en: "Manifestation, resourcefulness, power, motivated action.",
      es: "Manifestación, ingenio, poder, acción motivada.",
      hi: "अभिव्यक्ति, संसाधनशीलता, शक्ति, प्रेरित क्रिया।"
    }, 
    meaningReversed: {
      pt: "Manipulação, planejamento ruim, talentos latentes.",
      en: "Manipulation, poor planning, latent talents.",
      es: "Manipulación, mala planificación, talentos latentes.",
      hi: "हेरफेर, खराब योजना, गुप्त प्रतिभा।"
    }
  },
  { 
    id: 2, 
    name: { pt: "A Sacerdotisa", en: "The High Priestess", es: "La Sacerdotisa", hi: "उच्च पुजारिन" }, 
    arcana: "Major", 
    meaningUpright: {
      pt: "Intuição, subconsciente, mistério, voz interior.",
      en: "Intuition, subconscious, mystery, inner voice.",
      es: "Intuición, subconsciente, misterio, voz interior.",
      hi: "अंतर्ज्ञान, अवचेतन, रहस्य, आंतरिक आवाज।"
    }, 
    meaningReversed: {
      pt: "Segredos ocultos, intuição bloqueada, afastamento espiritual.",
      en: "Hidden secrets, blocked intuition, spiritual withdrawal.",
      es: "Secretos ocultos, intuición bloqueada, retiro espiritual.",
      hi: "छिपे हुए रहस्य, अवरुद्ध अंतर्ज्ञान, आध्यात्मिक वापसी।"
    }
  },
  { 
    id: 3, 
    name: { pt: "A Imperatriz", en: "The Empress", es: "La Emperatriz", hi: "महारानी" }, 
    arcana: "Major", 
    meaningUpright: {
      pt: "Feminilidade, beleza, natureza, abundância, fertilidade.",
      en: "Femininity, beauty, nature, abundance, fertility.",
      es: "Feminilidad, belleza, naturaleza, abundancia, fertilidad.",
      hi: "स्त्रीत्व, सुंदरता, प्रकृति, प्रचुरता, प्रजनन क्षमता।"
    }, 
    meaningReversed: {
      pt: "Bloqueio criativo, dependência excessiva.",
      en: "Creative block, excessive dependence.",
      es: "Bloqueo creativo, dependencia excesiva.",
      hi: "रचनात्मक ब्लॉक, अत्यधिक निर्भरता।"
    }
  },
  { 
    id: 4, 
    name: { pt: "O Imperador", en: "The Emperor", es: "El Emperador", hi: "सम्राट" }, 
    arcana: "Major", 
    meaningUpright: {
      pt: "Autoridade, estrutura, estabilidade, figura paterna.",
      en: "Authority, structure, stability, father figure.",
      es: "Autoridad, estructura, estabilidad, figura paterna.",
      hi: "अधिकार, संरचना, स्थिरता, पिता तुल्य।"
    }, 
    meaningReversed: {
      pt: "Dominação, controle excessivo, inflexibilidade.",
      en: "Domination, excessive control, inflexibility.",
      es: "Dominación, control excesivo, inflexibilidad.",
      hi: "वर्चस्व, अत्यधिक नियंत्रण, अनम्यता।"
    }
  },
  { 
    id: 5, 
    name: { pt: "O Hierofante", en: "The Hierophant", es: "El Hierofante", hi: "धर्माधिकारी" }, 
    arcana: "Major", 
    meaningUpright: {
      pt: "Tradição, conformidade, moralidade, ética.",
      en: "Tradition, conformity, morality, ethics.",
      es: "Tradición, conformidad, moralidad, ética.",
      hi: "परंपरा, अनुरूपता, नैतिकता, नैतिकता।"
    }, 
    meaningReversed: {
      pt: "Rebelião, quebra de tradições, crenças restritivas.",
      en: "Rebellion, breaking traditions, restrictive beliefs.",
      es: "Rebelión, ruptura de tradiciones, creencias restrictivas.",
      hi: "विद्रोह, परंपराओं को तोड़ना, प्रतिबंधात्मक विश्वास।"
    }
  },
  { 
    id: 6, 
    name: { pt: "Os Amantes", en: "The Lovers", es: "Los Enamorados", hi: "प्रेमी" }, 
    arcana: "Major", 
    meaningUpright: {
      pt: "Amor, harmonia, relacionamentos, alinhamento de valores.",
      en: "Love, harmony, relationships, value alignment.",
      es: "Amor, armonía, relaciones, alineación de valores.",
      hi: "प्यार, सद्भाव, रिश्ते, मूल्यों का संरेखण।"
    }, 
    meaningReversed: {
      pt: "Desarmonia, desequilíbrio, desalinhamento de valores.",
      en: "Disharmony, imbalance, misalignment of values.",
      es: "Desarmonía, desequilibrio, desalineación de valores.",
      hi: "असद्भाव, असंतुलन, मूल्यों का गलत संरेखण।"
    }
  },
  { 
    id: 7, 
    name: { pt: "O Carro", en: "The Chariot", es: "El Carro", hi: "रथ" }, 
    arcana: "Major", 
    meaningUpright: {
      pt: "Controle, força de vontade, sucesso, determinação.",
      en: "Control, willpower, success, determination.",
      es: "Control, fuerza de voluntad, éxito, determinación.",
      hi: "नियंत्रण, इच्छाशक्ति, सफलता, दृढ़ संकल्प।"
    }, 
    meaningReversed: {
      pt: "Falta de direção, agressão, oposição.",
      en: "Lack of direction, aggression, opposition.",
      es: "Falta de dirección, agresión, oposición.",
      hi: "दिशा की कमी, आक्रामकता, विरोध।"
    }
  },
  { 
    id: 8, 
    name: { pt: "A Força", en: "Strength", es: "La Fuerza", hi: "ताकत" }, 
    arcana: "Major", 
    meaningUpright: {
      pt: "Força interior, coragem, compaixão, foco calmo.",
      en: "Inner strength, courage, compassion, calm focus.",
      es: "Fuerza interior, coraje, compasión, enfoque tranquilo.",
      hi: "आंतरिक शक्ति, साहस, करुणा, शांत ध्यान।"
    }, 
    meaningReversed: {
      pt: "Dúvida, fraqueza, baixa energia.",
      en: "Doubt, weakness, low energy.",
      es: "Duda, debilidad, baja energía.",
      hi: "संदेह, कमजोरी, कम ऊर्जा।"
    }
  },
  { 
    id: 9, 
    name: { pt: "O Eremita", en: "The Hermit", es: "El Ermitaño", hi: "तपस्वी" }, 
    arcana: "Major", 
    meaningUpright: {
      pt: "Busca da alma, introspecção, orientação interior.",
      en: "Soul searching, introspection, inner guidance.",
      es: "Búsqueda del alma, introspección, guía interior.",
      hi: "आत्म-खोज, आत्मनिरीक्षण, आंतरिक मार्गदर्शन।"
    }, 
    meaningReversed: {
      pt: "Isolamento, solidão, afastamento da sociedade.",
      en: "Isolation, loneliness, withdrawal from society.",
      es: "Aislamiento, soledad, retiro de la sociedad.",
      hi: "अलगाव, अकेलापन, समाज से वापसी।"
    }
  },
  { 
    id: 10, 
    name: { pt: "Roda da Fortuna", en: "Wheel of Fortune", es: "Rueda de la Fortuna", hi: "भाग्य का पहिया" }, 
    arcana: "Major", 
    meaningUpright: {
      pt: "Boa sorte, karma, ciclos de vida, destino, ponto de virada.",
      en: "Good luck, karma, life cycles, destiny, turning point.",
      es: "Buena suerte, karma, ciclos de vida, destino, punto de inflexión.",
      hi: "सौभाग्य, कर्म, जीवन चक्र, भाग्य, मोड़।"
    }, 
    meaningReversed: {
      pt: "Má sorte, resistência à mudança, perda de controle.",
      en: "Bad luck, resistance to change, loss of control.",
      es: "Mala suerte, resistencia al cambio, pérdida de control.",
      hi: "दुर्भाग्य, परिवर्तन का प्रतिरोध, नियंत्रण खोना।"
    }
  },
  { 
    id: 11, 
    name: { pt: "Justiça", en: "Justice", es: "Justicia", hi: "न्याय" }, 
    arcana: "Major", 
    meaningUpright: {
      pt: "Justiça, imparcialidade, verdade, causa e efeito, lei.",
      en: "Justice, fairness, truth, cause and effect, law.",
      es: "Justicia, imparcialidad, verdad, causa y efecto, ley.",
      hi: "न्याय, निष्पक्षता, सत्य, कार्य-कारण, कानून।"
    }, 
    meaningReversed: {
      pt: "Injustiça, desonestidade, falta de responsabilidade.",
      en: "Injustice, dishonesty, lack of responsibility.",
      es: "Injusticia, deshonestidad, falta de responsabilidad.",
      hi: "अन्याय, बेईमानी, जिम्मेदारी की कमी।"
    }
  },
  { 
    id: 12, 
    name: { pt: "O Pendurado", en: "The Hanged Man", es: "El Colgado", hi: "फांसी पर लटका हुआ आदमी" }, 
    arcana: "Major", 
    meaningUpright: {
      pt: "Pausa, rendição, deixar ir, novas perspectivas.",
      en: "Pause, surrender, letting go, new perspectives.",
      es: "Pausa, rendición, dejar ir, nuevas perspectivas.",
      hi: "विराम, समर्पण, जाने देना, नए दृष्टिकोण।"
    }, 
    meaningReversed: {
      pt: "Atrasos, resistência, sacrifício inútil.",
      en: "Delays, resistance, useless sacrifice.",
      es: "Retrasos, resistencia, sacrificio inútil.",
      hi: "देरी, प्रतिरोध, बेकार बलिदान।"
    }
  },
  { 
    id: 13, 
    name: { pt: "A Morte", en: "Death", es: "La Muerte", hi: "मृत्यु" }, 
    arcana: "Major", 
    meaningUpright: {
      pt: "Fins, mudança, transformação, transição.",
      en: "Endings, change, transformation, transition.",
      es: "Finales, cambio, transformación, transición.",
      hi: "अंत, परिवर्तन, रूपांतरण, संक्रमण।"
    }, 
    meaningReversed: {
      pt: "Resistência à mudança, estagnação pessoal, repetição de padrões.",
      en: "Resistance to change, personal stagnation, repetition of patterns.",
      es: "Resistencia al cambio, estancamiento personal, repetición de patrones.",
      hi: "परिवर्तन का प्रतिरोध, व्यक्तिगत स्थिरता, पैटर्न की पुनरावृत्ति।"
    }
  },
  { 
    id: 14, 
    name: { pt: "A Temperança", en: "Temperance", es: "La Templanza", hi: "संयम" }, 
    arcana: "Major", 
    meaningUpright: {
      pt: "Equilíbrio, moderação, paciência, propósito.",
      en: "Balance, moderation, patience, purpose.",
      es: "Equilibrio, moderación, paciencia, propósito.",
      hi: "संतुलन, संयम, धैर्य, उद्देश्य।"
    }, 
    meaningReversed: {
      pt: "Desequilíbrio, excesso, pressa.",
      en: "Imbalance, excess, haste.",
      es: "Desequilibrio, exceso, prisa.",
      hi: "असंतुलन, अधिकता, जल्दबाजी।"
    }
  },
  { 
    id: 15, 
    name: { pt: "O Diabo", en: "The Devil", es: "El Diablo", hi: "शैतान" }, 
    arcana: "Major", 
    meaningUpright: {
      pt: "Sombra material, dependência, vícios, restrição.",
      en: "Material shadow, addiction, vices, restriction.",
      es: "Sombra material, adicción, vicios, restricción.",
      hi: "भौतिक छाया, व्यसन, दोष, प्रतिबंध।"
    }, 
    meaningReversed: {
      pt: "Libertação, restauração do controle.",
      en: "Release, restoration of control.",
      es: "Liberación, restauración del control.",
      hi: "मुक्ति, नियंत्रण की बहाली।"
    }
  },
  { 
    id: 16, 
    name: { pt: "A Torre", en: "The Tower", es: "La Torre", hi: "मीनार" }, 
    arcana: "Major", 
    meaningUpright: {
      pt: "Mudança repentina, revolta, revelação, caos.",
      en: "Sudden change, upheaval, revelation, chaos.",
      es: "Cambio repentino, agitación, revelación, caos.",
      hi: "अचानक परिवर्तन, उथल-पुथल, रहस्योद्घाटन, अराजकता।"
    }, 
    meaningReversed: {
      pt: "Evitar desastres, medo da mudança.",
      en: "Avoiding disaster, fear of change.",
      es: "Evitar desastres, miedo al cambio.",
      hi: "आपदा से बचना, परिवर्तन का डर।"
    }
  },
  { 
    id: 17, 
    name: { pt: "A Estrela", en: "The Star", es: "La Estrella", hi: "तारा" }, 
    arcana: "Major", 
    meaningUpright: {
      pt: "Esperança, inspiração, renovação, espiritualidade.",
      en: "Hope, inspiration, renewal, spirituality.",
      es: "Esperanza, inspiración, renovación, espiritualidad.",
      hi: "आशा, प्रेरणा, नवीनीकरण, आध्यात्मिकता।"
    }, 
    meaningReversed: {
      pt: "Falta de fé, desespero, desconexão.",
      en: "Lack of faith, despair, disconnection.",
      es: "Falta de fe, desesperación, desconexión.",
      hi: "विश्वास की कमी, निराशा, अलगाव।"
    }
  },
  { 
    id: 18, 
    name: { pt: "A Lua", en: "The Moon", es: "La Luna", hi: "चंद्रमा" }, 
    arcana: "Major", 
    meaningUpright: {
      pt: "Ilusão, medo, ansiedade, subconsciente, intuição.",
      en: "Illusion, fear, anxiety, subconscious, intuition.",
      es: "Ilusión, miedo, ansiedad, subconsciente, intuición.",
      hi: "भ्रम, भय, चिंता, अवचेतन, अंतर्ज्ञान।"
    }, 
    meaningReversed: {
      pt: "Liberação do medo, mentiras reveladas, confusão interna.",
      en: "Release of fear, revealed lies, internal confusion.",
      es: "Liberación del miedo, mentiras reveladas, confusión interna.",
      hi: "भय से मुक्ति, प्रकट झूठ, आंतरिक भ्रम।"
    }
  },
  { 
    id: 19, 
    name: { pt: "O Sol", en: "The Sun", es: "El Sol", hi: "सूर्य" }, 
    arcana: "Major", 
    meaningUpright: {
      pt: "Positividade, sucesso, vitalidade, alegria.",
      en: "Positivity, success, vitality, joy.",
      es: "Positividad, éxito, vitalidad, alegría.",
      hi: "सकारात्मकता, सफलता, जीवन शक्ति, खुशी।"
    }, 
    meaningReversed: {
      pt: "Tristeza interna, positividade irrealista.",
      en: "Internal sadness, unrealistic positivity.",
      es: "Tristeza interna, positividad irrealista.",
      hi: "आंतरिक उदासी, अवास्तविक सकारात्मकता।"
    }
  },
  { 
    id: 20, 
    name: { pt: "O Julgamento", en: "Judgement", es: "El Juicio", hi: "निर्णय" }, 
    arcana: "Major", 
    meaningUpright: {
      pt: "Renascimento, chamado interior, absolvição.",
      en: "Rebirth, inner calling, absolution.",
      es: "Renacimiento, llamado interior, absolución.",
      hi: "पुनर्जन्म, आंतरिक पुकार, दोषमुक्ति।"
    }, 
    meaningReversed: {
      pt: "Dúvida, falta de autocrítica, ignorar o chamado.",
      en: "Doubt, lack of self-criticism, ignoring the call.",
      es: "Duda, falta de autocrítica, ignorar el llamado.",
      hi: "संदेह, आत्म-आलोचना की कमी, पुकार को अनदेखा करना।"
    }
  },
  { 
    id: 21, 
    name: { pt: "O Mundo", en: "The World", es: "El Mundo", hi: "दुनिया" }, 
    arcana: "Major", 
    meaningUpright: {
      pt: "Conclusão, integração, realização, viagens.",
      en: "Completion, integration, accomplishment, travel.",
      es: "Conclusión, integración, realización, viajes.",
      hi: "पूरा होना, एकीकरण, उपलब्धि, यात्रा।"
    }, 
    meaningReversed: {
      pt: "Falta de conclusão, atrasos, atalhos.",
      en: "Lack of completion, delays, shortcuts.",
      es: "Falta de conclusión, retrasos, atajos.",
      hi: "पूरा होने की कमी, देरी, शॉर्टकट्स।"
    }
  },
  { 
    id: 22, 
    name: { pt: "Ás de Paus", en: "Ace of Wands", es: "As de Bastos", hi: "छड़ियों का इक्का" }, 
    arcana: "Minor", 
    suit: "Wands", 
    meaningUpright: {
      pt: "Inspiração, novo começo apaixonado.",
      en: "Inspiration, passionate new beginning.",
      es: "Inspiración, nuevo comienzo apasionado.",
      hi: "प्रेरणा, भावुक नई शुरुआत।"
    }, 
    meaningReversed: {
      pt: "Atrasos, bloqueios criativos.",
      en: "Delays, creative blocks.",
      es: "Retrasos, bloqueos creativos.",
      hi: "देरी, रचनात्मक ब्लॉक।"
    }
  }
];
