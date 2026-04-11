import { LocalizedText } from '../i18n.js';

export interface Rune {
  id: number;
  name: string;
  symbol: string;
  meaningUpright: LocalizedText;
  meaningMerkstave: LocalizedText; // Reversed
}

export const RUNES_DECK: Rune[] = [
  { 
    id: 1, 
    name: "Fehu", 
    symbol: "ᚠ", 
    meaningUpright: {
      pt: "Riqueza, abundância, sucesso, fertilidade.",
      en: "Wealth, abundance, success, fertility.",
      es: "Riqueza, abundancia, éxito, fertilidad.",
      hi: "धन, प्रचुरता, सफलता, उर्वरता।"
    }, 
    meaningMerkstave: {
      pt: "Perda, ganância, falha, discórdia.",
      en: "Loss, greed, failure, discord.",
      es: "Pérdida, codicia, fracaso, discordia.",
      hi: "हानि, लालच, विफलता, कलह।"
    }
  },
  { 
    id: 2, 
    name: "Uruz", 
    symbol: "ᚢ", 
    meaningUpright: {
      pt: "Força, saúde, masculinidade, coragem, superação.",
      en: "Strength, health, masculinity, courage, overcoming.",
      es: "Fuerza, salud, masculinidad, coraje, superación.",
      hi: "शक्ति, स्वास्थ्य, पुरुषत्व, साहस, विजय।"
    }, 
    meaningMerkstave: {
      pt: "Fraqueza, obsessão, má saúde, dominação inconsistente.",
      en: "Weakness, obsession, poor health, inconsistent dominance.",
      es: "Debilidad, obsesión, mala salud, dominación inconsistente.",
      hi: "कमजोरी, जुनून, खराब स्वास्थ्य, असंगत प्रभुत्व।"
    }
  },
  { 
    id: 3, 
    name: "Thurisaz", 
    symbol: "ᚦ", 
    meaningUpright: {
      pt: "Proteção, aviso, força reativa, porta de entrada.",
      en: "Protection, warning, reactive force, gateway.",
      es: "Protección, advertencia, fuerza reactiva, puerta de entrada.",
      hi: "सुरक्षा, चेतावनी, प्रतिक्रियाशील शक्ति, प्रवेश द्वार।"
    }, 
    meaningMerkstave: {
      pt: "Perigo, compulsão, traição, vulnerabilidade.",
      en: "Danger, compulsion, betrayal, vulnerability.",
      es: "Peligro, compulsión, traición, vulnerabilidad.",
      hi: "खतरा, मजबूरी, विश्वासघात, भेद्यता।"
    }
  },
  { 
    id: 4, 
    name: "Ansuz", 
    symbol: "ᚨ", 
    meaningUpright: {
      pt: "Comunicação, sabedoria divina, profecia, sinais.",
      en: "Communication, divine wisdom, prophecy, signs.",
      es: "Comunicación, sabiduría divina, profecía, señales.",
      hi: "संचार, दिव्य ज्ञान, भविष्यवाणी, संकेत।"
    }, 
    meaningMerkstave: {
      pt: "Mal-entendido, engano, manipulação, tédio.",
      en: "Misunderstanding, deceit, manipulation, boredom.",
      es: "Malentendido, engaño, manipulación, aburrimiento.",
      hi: "गलतफहमी, छल, हेरफेर, बोरियत।"
    }
  },
  { 
    id: 5, 
    name: "Raidho", 
    symbol: "ᚱ", 
    meaningUpright: {
      pt: "Viagem, ritmo, destino, mudança de perspectiva.",
      en: "Travel, rhythm, destiny, change of perspective.",
      es: "Viaje, ritmo, destino, cambio de perspectiva.",
      hi: "यात्रा, लय, भाग्य, दृष्टिकोण का परिवर्तन।"
    }, 
    meaningMerkstave: {
      pt: "Crise, estagnação, injustiça, interrupção.",
      en: "Crisis, stagnation, injustice, interruption.",
      es: "Crisis, estancamiento, injusticia, interrupción.",
      hi: "संकट, ठहराव, अन्याय, व्यवधान।"
    }
  },
  { 
    id: 6, 
    name: "Kenaz", 
    symbol: "ᚲ", 
    meaningUpright: {
      pt: "Conhecimento, luz, inspiração, fogo criativo, paixão.",
      en: "Knowledge, light, inspiration, creative fire, passion.",
      es: "Conocimiento, luz, inspiración, fuego creativo, pasión.",
      hi: "ज्ञान, प्रकाश, प्रेरणा, रचनात्मक अग्नि, जुनून।"
    }, 
    meaningMerkstave: {
      pt: "Escuridão, bloqueio criativo, falta de visão, fim de um relacionamento.",
      en: "Darkness, creative block, lack of vision, end of a relationship.",
      es: "Oscuridad, bloqueo creativo, falta de visión, fin de una relación.",
      hi: "अंधेरा, रचनात्मक ब्लॉक, दृष्टि की कमी, रिश्ते का अंत।"
    }
  },
  { 
    id: 7, 
    name: "Gebo", 
    symbol: "ᚷ", 
    meaningUpright: {
      pt: "Presentes, parceria, generosidade, equilíbrio das trocas.",
      en: "Gifts, partnership, generosity, balanced exchange.",
      es: "Regalos, asociación, generosidad, equilibrio de intercambios.",
      hi: "उपहार, साझेदारी, उदारता, संतुलित विनिमय।"
    }, 
    meaningMerkstave: {
      pt: "Avareza, má vontade, desequilíbrio.",
      en: "Greed, ill will, imbalance.",
      es: "Avaricia, mala voluntad, desequilibrio.",
      hi: "लालच, दुर्भावना, असंतुलन।"
    }
  },
  { 
    id: 8, 
    name: "Wunjo", 
    symbol: "ᚹ", 
    meaningUpright: {
      pt: "Alegria, vitória, bem-estar, harmonia, família.",
      en: "Joy, victory, well-being, harmony, family.",
      es: "Alegría, victoria, bienestar, armonía, familia.",
      hi: "खुशी, विजय, कल्याण, सद्भाव, परिवार।"
    }, 
    meaningMerkstave: {
      pt: "Tristeza, alienação, discórdia, atrasos no sucesso.",
      en: "Sadness, alienation, discord, success delays.",
      es: "Tristeza, alienación, discordia, retrasos en el éxito.",
      hi: "उदासी, अलगाव, कलह, सफलता में देरी।"
    }
  },
  { 
    id: 9, 
    name: "Hagalaz", 
    symbol: "ᚺ", 
    meaningUpright: {
      pt: "Crise natural, forças incontroláveis, interrupção necessária.",
      en: "Natural crisis, uncontrollable forces, necessary interruption.",
      es: "Crisis natural, fuerzas incontrolables, interrupción necesaria.",
      hi: "प्राकृतिक संकट, बेकाबू ताकतें, आवश्यक व्यवधान।"
    }, 
    meaningMerkstave: {
      pt: "Catástrofe incontrolável, estagnação total.",
      en: "Uncontrollable catastrophe, total stagnation.",
      es: "Catástrofe incontrolable, estancamiento total.",
      hi: "बेकाबू तबाही, कुल ठहराव।"
    }
  },
  { 
    id: 10, 
    name: "Nauthiz", 
    symbol: "ᚾ", 
    meaningUpright: {
      pt: "Necessidade, restrição, resistência, lições de vida.",
      en: "Need, restriction, resistance, life lessons.",
      es: "Necesidad, restricción, resistencia, lecciones de vida.",
      hi: "आवश्यकता, प्रतिबंध, प्रतिरोध, जीवन के सबक।"
    }, 
    meaningMerkstave: {
      pt: "Privação extrema, estresse, cansaço, fracasso inevitável.",
      en: "Extreme privation, stress, fatigue, inevitable failure.",
      es: "Privación extrema, estrés, cansancio, fracaso inevitable.",
      hi: "अत्यधिक अभाव, तनाव, थकान, अपरिहार्य विफलता।"
    }
  },
  { 
    id: 11, 
    name: "Isa", 
    symbol: "ᛁ", 
    meaningUpright: {
      pt: "Gelo, quietude, pausa, reflexão, estagnação intencional.",
      en: "Ice, stillness, pause, reflection, intentional stagnation.",
      es: "Hielo, quietud, pausa, reflexión, estancamiento intencional.",
      hi: "बर्फ, ठहराव, विराम, प्रतिबिंब, जानबूझकर ठहराव।"
    }, 
    meaningMerkstave: {
      pt: "Frieza emocional, bloqueio total.",
      en: "Emotional coldness, total block.",
      es: "Frialdad emocional, bloqueo total.",
      hi: "भावनात्मक शीतलता, कुल ब्लॉक।"
    }
  },
  { 
    id: 12, 
    name: "Jera", 
    symbol: "ᛊ", 
    meaningUpright: {
      pt: "Colheita, ciclo anual, recompensa pelo esforço passado.",
      en: "Harvest, annual cycle, reward for past effort.",
      es: "Cosecha, ciclo anual, recompensa por esfuerzos pasados.",
      hi: "फसल, वार्षिक चक्र, पिछले प्रयास का प्रतिफल।"
    }, 
    meaningMerkstave: {
      pt: "Atrasos, colheita pobre, falta de visão.",
      en: "Delays, poor harvest, lack of vision.",
      es: "Retrasos, mala cosecha, falta de visión.",
      hi: "देरी, खराब फसल, दृष्टि की कमी।"
    }
  },
  { 
    id: 13, 
    name: "Eihwaz", 
    symbol: "ᛇ", 
    meaningUpright: {
      pt: "Resistência, Yggdrasil, ciclo de vida e morte, proteção.",
      en: "Endurance, Yggdrasil, cycle of life and death, protection.",
      es: "Resistencia, Yggdrasil, ciclo de vida y muerte, protección.",
      hi: "सहनशक्ति, यग्द्रसिल, जीवन और मृत्यु का चक्र, सुरक्षा।"
    }, 
    meaningMerkstave: {
      pt: "Confusão, instabilidade, medo da morte.",
      en: "Confusion, instability, fear of death.",
      es: "Confusión, inestabilidad, miedo a la muerte.",
      hi: "भ्रम, अस्थिरता, मृत्यु का भय।"
    }
  },
  { 
    id: 14, 
    name: "Perthro", 
    symbol: "ᛈ", 
    meaningUpright: {
      pt: "Destino oculto, segredos, útero, o jogo da vida.",
      en: "Hidden destiny, secrets, womb, the game of life.",
      es: "Destino oculto, secretos, útero, el juego de la vida.",
      hi: "छिपा हुआ भाग्य, रहस्य, गर्भ, जीवन का खेल।"
    }, 
    meaningMerkstave: {
      pt: "Segredos revelados, má sorte, desonestidade.",
      en: "Revealed secrets, bad luck, dishonesty.",
      es: "Secretos revelados, mala suerte, deshonestidad.",
      hi: "प्रकट रहस्य, दुर्भाग्य, बेईमानी।"
    }
  },
  { 
    id: 15, 
    name: "Algiz", 
    symbol: "ᛉ", 
    meaningUpright: {
      pt: "Proteção divina, espiritualidade, conexão com o eu superior.",
      en: "Divine protection, spirituality, connection with higher self.",
      es: "Protección divina, espiritualidad, conexión con el yo superior.",
      hi: "दिव्य सुरक्षा, आध्यात्मिकता, उच्च स्व के साथ संबंध।"
    }, 
    meaningMerkstave: {
      pt: "Vulnerabilidade, falta de proteção, perigo oculto.",
      en: "Vulnerability, lack of protection, hidden danger.",
      es: "Vulnerabilidad, falta de protección, peligro oculto.",
      hi: "भेद्यता, सुरक्षा की कमी, छिपा हुआ खतरा।"
    }
  },
  { 
    id: 16, 
    name: "Sowilo", 
    symbol: "ᛊ", 
    meaningUpright: {
      pt: "Sol, energia vital, sucesso garantido, clareza mental.",
      en: "Sun, vital energy, guaranteed success, mental clarity.",
      es: "Sol, energía vital, éxito garantizado, claridad mental.",
      hi: "सूर्य, महत्वपूर्ण ऊर्जा, गारंटीकृत सफलता, मानसिक स्पष्टता।"
    }, 
    meaningMerkstave: {
      pt: "Exaustão, sucesso falso, arrogância perigosa.",
      en: "Exhaustion, false success, dangerous arrogance.",
      es: "Agotamiento, falso éxito, arrogancia peligrosa.",
      hi: "थकान, झूठी सफलता, खतरनाक अहंकार।"
    }
  },
  { 
    id: 17, 
    name: "Tiwaz", 
    symbol: "ᛏ", 
    meaningUpright: {
      pt: "Honra, justiça, espiritualidade guerreira, sacrifício.",
      en: "Honor, justice, warrior spirituality, sacrifice.",
      es: "Honor, justicia, espiritualidad guerrera, sacrificio.",
      hi: "सम्मान, न्याय, योद्धा आध्यात्मिकता, बलिदान।"
    }, 
    meaningMerkstave: {
      pt: "Derrota, injustiça, falta de motivação, conflito insensato.",
      en: "Defeat, injustice, lack of motivation, senseless conflict.",
      es: "Derrota, injusticia, falta de motivación, conflicto insensato.",
      hi: "हार, अन्याय, प्रेरणा की कमी, संवेदनहीन संघर्ष।"
    }
  },
  { 
    id: 18, 
    name: "Berkano", 
    symbol: "ᛒ", 
    meaningUpright: {
      pt: "Nascimento, crescimento, cura, regeneração, mãe.",
      en: "Birth, growth, healing, regeneration, mother.",
      es: "Nacimiento, crecimiento, curación, regeneración, madre.",
      hi: "जन्म, विकास, उपचार, उत्थान, माता।"
    }, 
    meaningMerkstave: {
      pt: "Estagnação familiar, problemas de fertilidade, falta de crescimento.",
      en: "Family stagnation, fertility problems, lack of growth.",
      es: "Estancamiento familiar, problemas de fertilidad, falta de crecimiento.",
      hi: "पारिवारिक ठहराव, प्रजनन समस्याएं, विकास की कमी।"
    }
  },
  { 
    id: 19, 
    name: "Ehwaz", 
    symbol: "ᛖ", 
    meaningUpright: {
      pt: "Movimento, progresso, parcerias leais, cavalo.",
      en: "Movement, progress, loyal partnerships, horse.",
      es: "Movimiento, progreso, asociaciones leales, caballo.",
      hi: "हलचल, प्रगति, वफादार साझेदारी, घोड़ा।"
    }, 
    meaningMerkstave: {
      pt: "Mudança hesitante, traição de parceiros, estagnação forçada.",
      en: "Hesitant change, betrayal of partners, forced stagnation.",
      es: "Cambio vacilante, traición de socios, estancamiento forzado.",
      hi: "हिचकिचाहट भरा बदलाव, भागीदारों का विश्वासघात, जबरन ठहराव।"
    }
  },
  { 
    id: 20, 
    name: "Mannaz", 
    symbol: "ᛗ", 
    meaningUpright: {
      pt: "Humanidade, sociedade, o eu, intelecto.",
      en: "Humanity, society, the self, intellect.",
      es: "Humanidad, sociedad, el yo, intelecto.",
      hi: "मानवता, समाज, स्वयं, बुद्धि।"
    }, 
    meaningMerkstave: {
      pt: "Isolamento, depressão, desajuste social, egoísmo.",
      en: "Isolation, depression, social maladjustment, selfishness.",
      es: "Aislamiento, depresión, desajuste social, egoísmo.",
      hi: "अलगाव, अवसाद, सामाजिक कुसमयोजन, स्वार्थ।"
    }
  },
  { 
    id: 21, 
    name: "Laguz", 
    symbol: "ᛚ", 
    meaningUpright: {
      pt: "Água, fluxo, intuição, imaginação, sonhos.",
      en: "Water, flow, intuition, imagination, dreams.",
      es: "Agua, flujo, intuición, imaginación, sueños.",
      hi: "पानी, प्रवाह, अंतर्ज्ञान, कल्पना, सपने।"
    }, 
    meaningMerkstave: {
      pt: "Inundação emocional, ilusão, falta de clareza mental.",
      en: "Emotional flood, illusion, lack of mental clarity.",
      es: "Inundación emocional, ilusión, falta de claridad mental.",
      hi: "भावनात्मक बाढ़, भ्रम, मानसिक स्पष्टता की कमी।"
    }
  },
  { 
    id: 22, 
    name: "Ingwaz", 
    symbol: "ᛜ", 
    meaningUpright: {
      pt: "Fertilidade masculina, descanso antes da ação, colheita.",
      en: "Male fertility, rest before action, harvest.",
      es: "Fertilidad masculina, descanso antes de la acción, cosecha.",
      hi: "पुरुष प्रजनन क्षमता, कार्रवाई से पहले आराम, फसल।"
    }, 
    meaningMerkstave: {
      pt: "Impotência, falta de conclusão.",
      en: "Impotence, lack of completion.",
      es: "Impotencia, falta de conclusión.",
      hi: "नपुंसकता, पूर्णता की कमी।"
    }
  },
  { 
    id: 23, 
    name: "Dagaz", 
    symbol: "ᛞ", 
    meaningUpright: {
      pt: "Despertar, plenitude, luz do dia, clareza.",
      en: "Awakening, fullness, daylight, clarity.",
      es: "Despertar, plenitud, luz del día, claridad.",
      hi: "जागृति, पूर्णता, दिन का प्रकाश, स्पष्टता।"
    }, 
    meaningMerkstave: {
      pt: "Falsa sensação de segurança, cegueira espiritual.",
      en: "False sense of security, spiritual blindness.",
      es: "Falsa sensación de seguridad, ceguera espiritual.",
      hi: "सुरक्षा की झूठी भावना, आध्यात्मिक अंधापन।"
    }
  },
  { 
    id: 24, 
    name: "Othala", 
    symbol: "ᛟ", 
    meaningUpright: {
      pt: "Herança, solo pátrio, estabilidade, ancestralidade.",
      en: "Inheritance, homeland, stability, ancestry.",
      es: "Herencia, patria, estabilidad, ancestralidad.",
      hi: "विरासत, मातृभूमि, स्थिरता, वंशावली।"
    }, 
    meaningMerkstave: {
      pt: "Perda de propriedade, solidão, raízes cortadas.",
      en: "Loss of property, loneliness, severed roots.",
      es: "Pérdida de propiedad, soledad, raíces cortadas.",
      hi: "संपत्ति की हानि, अकेलापन, कटी हुई जड़ें।"
    }
  }
];
