import { LocalizedText, LocalizedList } from '../i18n.js';

export interface YearPredictionData {
  generalForecast: LocalizedText;
  loveForecast: LocalizedText;
  careerForecast: LocalizedText;
  financeForecast: LocalizedText;
  healthForecast: LocalizedText;
  luckyMonths: LocalizedList;
  challengingMonths: LocalizedList;
}

export const ANIMAL_PREDICTIONS: Record<string, YearPredictionData> = {
  rat: {
    generalForecast: {
      pt: "Ano de oportunidades e crescimento. Sua inteligência será sua maior aliada.",
      en: "Year of opportunities and growth. Your intelligence will be your greatest ally.",
      es: "Año de oportunidades y crecimiento. Tu inteligencia será tu mayor aliada.",
      hi: "अवसर और विकास का वर्ष। आपकी बुद्धि आपकी सबसे बड़ी सहयोगी होगी।"
    },
    loveForecast: {
      pt: "Relacionamentos se fortalecem com comunicação honesta.",
      en: "Relationships strengthen with honest communication.",
      es: "Las relaciones se fortalecen con una comunicación honesta.",
      hi: "ईमानदार संवाद से रिश्ते मजबूत होते हैं।"
    },
    careerForecast: {
      pt: "Novas portas se abrem para projetos ambiciosos.",
      en: "New doors open for ambitious projects.",
      es: "Nuevas puertas se abren para proyectos ambiciosos.",
      hi: "महत्वाकांक्षी परियोजनाओं के लिए नए दरवाजे खुलते हैं।"
    },
    financeForecast: {
      pt: "Boas oportunidades de investimento, mas evite riscos desnecessários.",
      en: "Good investment opportunities, but avoid unnecessary risks.",
      es: "Buenas oportunidades de inversión, pero evita riesgos innecesarios.",
      hi: "अच्छे निवेश के अवसर, लेकिन अनावश्यक जोखिमों से बचें।"
    },
    healthForecast: {
      pt: "Mantenha rotina de exercícios e cuide da alimentação.",
      en: "Maintain exercise routine and take care of your diet.",
      es: "Mantén una rutina de ejercicios y cuida tu alimentación.",
      hi: "व्यायाम की दिनचर्या बनाए रखें और अपने आहार का ध्यान रखें।"
    },
    luckyMonths: {
      pt: ["Fevereiro", "Maio", "Agosto", "Novembro"],
      en: ["February", "May", "August", "November"],
      es: ["Febrero", "Mayo", "Agosto", "Noviembre"],
      hi: ["फरवरी", "मई", "अगस्त", "नवंबर"]
    },
    challengingMonths: {
      pt: ["Março", "Julho", "Outubro"],
      en: ["March", "July", "October"],
      es: ["Marzo", "Julio", "Octubre"],
      hi: ["मार्च", "जुलाई", "अक्टूबर"]
    }
  },
  ox: {
    generalForecast: {
      pt: "Ano de estabilidade e progresso constante. Sua dedicação será recompensada.",
      en: "Year of stability and steady progress. Your dedication will be rewarded.",
      es: "Año de estabilidad y progreso constante. Tu dedicación será recompensada.",
      hi: "स्थिरता और निरंतर प्रगति का वर्ष। आपके समर्पण का प्रतिफल मिलेगा।"
    },
    loveForecast: {
      pt: "Relacionamentos estáveis e profundos.",
      en: "Stable and deep relationships.",
      es: "Relaciones estables y profundas.",
      hi: "स्थिर और गहरे रिश्ते।"
    },
    careerForecast: {
      pt: "Reconhecimento pelo trabalho duro e dedicação.",
      en: "Recognition for hard work and dedication.",
      es: "Reconocimiento por el trabajo duro y la dedicación.",
      hi: "कड़ी मेहनत और समर्पण के लिए पहचान।"
    },
    financeForecast: {
      pt: "Crescimento financeiro gradual e seguro.",
      en: "Gradual and safe financial growth.",
      es: "Crecimiento financiero gradual y seguro.",
      hi: "क्रमशः और सुरक्षित वित्तीय विकास।"
    },
    healthForecast: {
      pt: "Boa energia vital, mas evite excesso de trabalho.",
      en: "Good vital energy, but avoid overwork.",
      es: "Buena energía vital, pero evita el exceso de trabajo.",
      hi: "अच्छी प्राण ऊर्जा, लेकिन अत्यधिक काम से बचें।"
    },
    luckyMonths: {
      pt: ["Janeiro", "Abril", "Setembro", "Dezembro"],
      en: ["January", "April", "September", "December"],
      es: ["Enero", "Abril", "Septiembre", "Diciembre"],
      hi: ["जनवरी", "अप्रैल", "सितंबर", "दिसंबर"]
    },
    challengingMonths: {
      pt: ["Maio", "Agosto"],
      en: ["May", "August"],
      es: ["Mayo", "Agosto"],
      hi: ["मई", "अगस्त"]
    }
  },
  tiger: {
    generalForecast: {
      pt: "Ano de ação e aventura. Sua coragem será testada e recompensada.",
      en: "Year of action and adventure. Your courage will be tested and rewarded.",
      es: "Año de acción y aventura. Tu coraje será puesto a prueba y recompensado.",
      hi: "क्रिया और साहस का वर्ष। आपके साहस की परीक्षा होगी और प्रतिफल मिलेगा।"
    },
    loveForecast: {
      pt: "Paixão intensa, mas cuidado com impulsividade.",
      en: "Intense passion, but watch out for impulsiveness.",
      es: "Pasión intensa, pero cuidado con la impulsividad.",
      hi: "तीव्र जुनून, लेकिन आवेग से सावधान रहें।"
    },
    careerForecast: {
      pt: "Oportunidades de liderança e expansão.",
      en: "Opportunities for leadership and expansion.",
      es: "Oportunidades de liderazgo y expansión.",
      hi: "नेतृत्व और विस्तार के अवसर।"
    },
    financeForecast: {
      pt: "Ganhos significativos, mas evite gastos impulsivos.",
      en: "Significant gains, but avoid impulsive spending.",
      es: "Ganancias significativas, pero evita gastos impulsivos.",
      hi: "महत्वपूर्ण लाभ, लेकिन आवेगपूर्ण खर्च से बचें।"
    },
    healthForecast: {
      pt: "Energia alta, canalize com exercícios físicos.",
      en: "High energy, channel it with physical exercise.",
      es: "Energía alta, canalízala con ejercicio físico.",
      hi: "उच्च ऊर्जा, इसे शारीरिक व्यायाम के साथ संचालित करें।"
    },
    luckyMonths: {
      pt: ["Março", "Junho", "Setembro", "Dezembro"],
      en: ["March", "June", "September", "December"],
      es: ["Marzo", "Junio", "Septiembre", "Diciembre"],
      hi: ["मार्च", "जून", "सितंबर", "दिसंबर"]
    },
    challengingMonths: {
      pt: ["Fevereiro", "Julho", "Novembro"],
      en: ["February", "July", "November"],
      es: ["Febrero", "Julio", "Noviembre"],
      hi: ["फरवरी", "जुलाई", "नवंबर"]
    }
  },
  rabbit: {
    generalForecast: {
      pt: "Ano de harmonia e criatividade. Sua sensibilidade será sua força.",
      en: "Year of harmony and creativity. Your sensitivity will be your strength.",
      es: "Año de armonía y creatividad. Tu sensibilidad será tu fuerza.",
      hi: "सद्भाव और रचनात्मकता का वर्ष। आपकी संवेदनशीलता आपकी शक्ति होगी।"
    },
    loveForecast: {
      pt: "Romance floresce com delicadeza e compreensão.",
      en: "Romance blooms with delicacy and understanding.",
      es: "El romance florece con delicadeza y comprensión.",
      hi: "कोमलता और समझ के साथ रोमांस पनपता है।"
    },
    careerForecast: {
      pt: "Projetos criativos trazem reconhecimento.",
      en: "Creative projects bring recognition.",
      es: "Proyectos creativos traen reconocimiento.",
      hi: "रचनात्मक परियोजनाएं पहचान दिलाती हैं।"
    },
    financeForecast: {
      pt: "Estabilidade financeira com planejamento cuidadoso.",
      en: "Financial stability with careful planning.",
      es: "Estabilidad financiera con una planeación cuidadosa.",
      hi: "सावधानीपूर्वक योजना के साथ वित्तीय स्थिरता।"
    },
    healthForecast: {
      pt: "Cuide do equilíbrio emocional e pratique relaxamento.",
      en: "Take care of emotional balance and practice relaxation.",
      es: "Cuida el equilibrio emocional y practica la relajación.",
      hi: "भावनात्मक संतुलन का ध्यान रखें और विश्राम का अभ्यास करें।"
    },
    luckyMonths: {
      pt: ["Abril", "Julho", "Outubro", "Janeiro"],
      en: ["April", "July", "October", "January"],
      es: ["Abril", "Julio", "Octubre", "Enero"],
      hi: ["अप्रैल", "जुलाई", "अक्टूबर", "जनवरी"]
    },
    challengingMonths: {
      pt: ["Março", "Junho", "Setembro"],
      en: ["March", "June", "September"],
      es: ["Marzo", "Junio", "Septiembre"],
      hi: ["मार्च", "जून", "सितंबर"]
    }
  },
  dragon: {
    generalForecast: {
      pt: "Ano de poder e realização. Sua ambição será recompensada.",
      en: "Year of power and realization. Your ambition will be rewarded.",
      es: "Año de poder y realización. Tu ambición será recompensada.",
      hi: "शक्ति और प्रतीति का वर्ष। आपकी महत्वाकांक्षा का फल मिलेगा।"
    },
    loveForecast: {
      pt: "Relacionamentos intensos e transformadores.",
      en: "Intense and transformative relationships.",
      es: "Relaciones intensas y transformadoras.",
      hi: "तीव्र और परिवर्तनकारी रिश्ते।"
    },
    careerForecast: {
      pt: "Grandes oportunidades de crescimento e liderança.",
      en: "Great opportunities for growth and leadership.",
      es: "Grandes oportunidades de crecimiento y liderazgo.",
      hi: "विकास और नेतृत्व के बड़े अवसर।"
    },
    financeForecast: {
      pt: "Ganhos significativos através de investimentos ousados.",
      en: "Significant gains through bold investments.",
      es: "Ganancias significativas a través de inversiones audaces.",
      hi: "साहसिक निवेशों के माध्यम से महत्वपूर्ण लाभ।"
    },
    healthForecast: {
      pt: "Energia poderosa, mas evite excessos.",
      en: "Powerful energy, but avoid excesses.",
      es: "Energía poderosa, pero evita excesos.",
      hi: "शक्तिशाली ऊर्जा, लेकिन अति से बचें।"
    },
    luckyMonths: {
      pt: ["Fevereiro", "Maio", "Agosto", "Novembro"],
      en: ["February", "May", "August", "November"],
      es: ["Febrero", "Mayo", "Agosto", "Noviembre"],
      hi: ["फरवरी", "मई", "अगस्त", "नवंबर"]
    },
    challengingMonths: {
      pt: ["Abril", "Julho", "Outubro"],
      en: ["April", "July", "October"],
      es: ["Abril", "Julio", "Octubre"],
      hi: ["अप्रैल", "जुलाई", "अक्टूबर"]
    }
  },
  snake: {
    generalForecast: {
      pt: "Ano de sabedoria e transformação. Sua intuição será guia.",
      en: "Year of wisdom and transformation. Your intuition will be your guide.",
      es: "Año de sabiduría y transformación. Tu intuición será tu guía.",
      hi: "ज्ञान और परिवर्तन का वर्ष। आपका अंतर्ज्ञान आपका मार्गदर्शक होगा।"
    },
    loveForecast: {
      pt: "Conexões profundas e significativas.",
      en: "Deep and meaningful connections.",
      es: "Conexiones profundas y significativas.",
      hi: "गहरी और सार्थक कड़ियाँ।"
    },
    careerForecast: {
      pt: "Oportunidades através de conhecimento e estratégia.",
      en: "Opportunities through knowledge and strategy.",
      es: "Oportunidades a través del conocimiento y la estrategia.",
      hi: "ज्ञान और रणनीति के माध्यम से अवसर।"
    },
    financeForecast: {
      pt: "Investimentos inteligentes trazem retornos.",
      en: "Smart investments bring returns.",
      es: "Inversiones inteligentes traen retornos.",
      hi: "स्मार्ट निवेश प्रतिफल लाते हैं।"
    },
    healthForecast: {
      pt: "Cuide do equilíbrio emocional e pratique meditação.",
      en: "Take care of emotional balance and practice meditation.",
      es: "Cuida el equilibrio emocional y practica la meditación.",
      hi: "भावनात्मक संतुलन का ध्यान रखें और ध्यान का अभ्यास करें।"
    },
    luckyMonths: {
      pt: ["Março", "Junho", "Setembro", "Dezembro"],
      en: ["March", "June", "September", "December"],
      es: ["Marzo", "Junio", "Septiembre", "Diciembre"],
      hi: ["मार्च", "जून", "सितंबर", "दिसंबर"]
    },
    challengingMonths: {
      pt: ["Maio", "Agosto", "Novembro"],
      en: ["May", "August", "November"],
      es: ["Mayo", "Agosto", "Noviembre"],
      hi: ["मई", "अगस्त", "नवंबर"]
    }
  },
  horse: {
    generalForecast: {
      pt: "Ano de liberdade e aventura. Sua energia será contagiante.",
      en: "Year of freedom and adventure. Your energy will be contagious.",
      es: "Año de libertad y aventura. Tu energía será contagiosa.",
      hi: "स्वतंत्रता और रोमांच का वर्ष। आपकी ऊर्जा संक्रामक होगी।"
    },
    loveForecast: {
      pt: "Romance aventureiro e apaixonante.",
      en: "Adventurous and passionate romance.",
      es: "Romance aventurero y apasionado.",
      hi: "साहसी और भावुक रोमांस।"
    },
    careerForecast: {
      pt: "Oportunidades de viagem e expansão.",
      en: "Opportunities for travel and expansion.",
      es: "Oportunidades de viaje y expansión.",
      hi: "यात्रा और विस्तार के अवसर।"
    },
    financeForecast: {
      pt: "Ganhos através de iniciativas ousadas.",
      en: "Gains through bold initiatives.",
      es: "Ganancias a través de iniciativas audaces.",
      hi: "साहसिक पहलों के माध्यम से लाभ।"
    },
    healthForecast: {
      pt: "Energia alta, mantenha rotina de exercícios.",
      en: "High energy, maintain exercise routine.",
      es: "Energía alta, mantén una rutina de ejercicios.",
      hi: "उच्च ऊर्जा, व्यायाम की दिनचर्या बनाए रखें।"
    },
    luckyMonths: {
      pt: ["Janeiro", "Abril", "Julho", "Outubro"],
      en: ["January", "April", "July", "October"],
      es: ["Enero", "Abril", "Julio", "Octubre"],
      hi: ["जनवरी", "अप्रैल", "जुलाई", "अक्टूबर"]
    },
    challengingMonths: {
      pt: ["Fevereiro", "Maio", "Setembro"],
      en: ["February", "May", "September"],
      es: ["Febrero", "Mayo", "Septiembre"],
      hi: ["फरवरी", "मई", "सितंबर"]
    }
  },
  goat: {
    generalForecast: {
      pt: "Ano de criatividade e harmonia. Sua arte será reconhecida.",
      en: "Year of creativity and harmony. Your art will be recognized.",
      es: "Año de creatividad y armonía. Tu arte será reconocido.",
      hi: "रचनात्मकता और सद्भाव का वर्ष। आपकी कला को पहचान मिलेगी।"
    },
    loveForecast: {
      pt: "Romance delicado e profundo.",
      en: "Delicate and deep romance.",
      es: "Romance delicado y profundo.",
      hi: "नाजुक और गहरा रोमांस।"
    },
    careerForecast: {
      pt: "Projetos criativos trazem sucesso.",
      en: "Creative projects bring success.",
      es: "Proyectos creativos traen éxito.",
      hi: "रचनात्मक परियोजनाएं सफलता लाती हैं।"
    },
    financeForecast: {
      pt: "Estabilidade com planejamento cuidadoso.",
      en: "Stability with careful planning.",
      es: "Estabilidad con una planeación cuidadosa.",
      hi: "सावधानीपूर्वक योजना के साथ स्थिरता।"
    },
    healthForecast: {
      pt: "Cuide do equilíbrio emocional e pratique yoga.",
      en: "Take care of emotional balance and practice yoga.",
      es: "Cuida el equilibrio emocional y practica yoga.",
      hi: "भावनात्मक संतुलन का ध्यान रखें और योग का अभ्यास करें।"
    },
    luckyMonths: {
      pt: ["Março", "Junho", "Setembro", "Dezembro"],
      en: ["March", "June", "September", "December"],
      es: ["Marzo", "Junio", "Septiembre", "Diciembre"],
      hi: ["मार्च", "जून", "सितंबर", "दिसंबर"]
    },
    challengingMonths: {
      pt: ["Abril", "Julho", "Novembro"],
      en: ["April", "July", "November"],
      es: ["Abril", "Julio", "Noviembre"],
      hi: ["अप्रैल", "जुलाई", "नवंबर"]
    }
  },
  monkey: {
    generalForecast: {
      pt: "Ano de inteligência e inovação. Sua mente será sua maior arma.",
      en: "Year of intelligence and innovation. Your mind will be your greatest weapon.",
      es: "Año de inteligencia e innovación. Tu mente será tu mayor arma.",
      hi: "बुद्धि और नवाचार का वर्ष। आपका मस्तिष्क आपका सबसे बड़ा हथियार होगा।"
    },
    loveForecast: {
      pt: "Relacionamentos dinâmicos e divertidos.",
      en: "Dynamic and fun relationships.",
      es: "Relaciones dinámicas y divertidas.",
      hi: "गतिशील और मजेदार रिश्ते।"
    },
    careerForecast: {
      pt: "Oportunidades através de criatividade e engenhosidade.",
      en: "Opportunities through creativity and ingenuity.",
      es: "Oportunidades a través de la creatividad y el ingenio.",
      hi: "रचनात्मकता और बुद्धिमत्ता के माध्यम से अवसर।"
    },
    financeForecast: {
      pt: "Ganhos através de investimentos inteligentes.",
      en: "Gains through smart investments.",
      es: "Ganancias a través de inversiones inteligentes.",
      hi: "स्मार्ट निवेश के माध्यम से लाभ।"
    },
    healthForecast: {
      pt: "Mente ativa, cuide do sistema nervoso.",
      en: "Active mind, take care of nervous system.",
      es: "Mente activa, cuida el sistema nervioso.",
      hi: "सक्रिय मस्तिष्क, तंत्रिका तंत्र का ध्यान रखें।"
    },
    luckyMonths: {
      pt: ["Fevereiro", "Maio", "Agosto", "Novembro"],
      en: ["February", "May", "August", "November"],
      es: ["Febrero", "Mayo", "Agosto", "Noviembre"],
      hi: ["फरवरी", "मई", "अगस्त", "नवंबर"]
    },
    challengingMonths: {
      pt: ["Março", "Junho", "Setembro"],
      en: ["March", "June", "September"],
      es: ["Marzo", "Junio", "Septiembre"],
      hi: ["मार्च", "जून", "सितंबर"]
    }
  },
  rooster: {
    generalForecast: {
      pt: "Ano de precisão e realização. Sua atenção aos detalhes será recompensada.",
      en: "Year of precision and achievement. Your attention to detail will be rewarded.",
      es: "Año de precisión y realización. Tu atención a los detalles será recompensada.",
      hi: "सटीकता और उपलब्धि का वर्ष। विवरणों पर आपका ध्यान पुरस्कृत किया जाएगा।"
    },
    loveForecast: {
      pt: "Relacionamentos estáveis e comprometidos.",
      en: "Stable and committed relationships.",
      es: "Relaciones estables y comprometidas.",
      hi: "स्थिर और प्रतिबद्ध रिश्ते।"
    },
    careerForecast: {
      pt: "Reconhecimento pela dedicação e precisão.",
      en: "Recognition for dedication and precision.",
      es: "Reconocimiento por la dedicación y precisión.",
      hi: "समर्पण और सटीकता के लिए पहचान।"
    },
    financeForecast: {
      pt: "Crescimento financeiro através de planejamento.",
      en: "Financial growth through planning.",
      es: "Crecimiento financiero a través de la planeación.",
      hi: "योजना के माध्यम से वित्तीय विकास।"
    },
    healthForecast: {
      pt: "Boa energia, mantenha rotina de exercícios.",
      en: "Good energy, maintain exercise routine.",
      es: "Buena energía, mantén una rutina de ejercicios.",
      hi: "अच्छी ऊर्जा, व्यायाम की दिनचर्या बनाए रखें।"
    },
    luckyMonths: {
      pt: ["Janeiro", "Abril", "Julho", "Outubro"],
      en: ["January", "April", "July", "October"],
      es: ["Enero", "Abril", "Julio", "Octubre"],
      hi: ["जनवरी", "अप्रैल", "जुलाई", "अक्टूबर"]
    },
    challengingMonths: {
      pt: ["Fevereiro", "Maio", "Agosto"],
      en: ["February", "May", "August"],
      es: ["Febrero", "Mayo", "Agosto"],
      hi: ["फरवरी", "मई", "अगस्त"]
    }
  },
  dog: {
    generalForecast: {
      pt: "Ano de lealdade e justiça. Sua integridade será recompensada.",
      en: "Year of loyalty and justice. Your integrity will be rewarded.",
      es: "Año de lealtad y justicia. Tu integridad será recompensada.",
      hi: "वफादारी और न्याय का वर्ष। आपकी अखंडता का फल मिलेगा।"
    },
    loveForecast: {
      pt: "Relacionamentos leais e profundos.",
      en: "Loyal and deep relationships.",
      es: "Relaciones leales y profundas.",
      hi: "वफादार और गहरे रिश्ते।"
    },
    careerForecast: {
      pt: "Oportunidades através de confiança e dedicação.",
      en: "Opportunities through trust and dedication.",
      es: "Oportunidades a través de la confianza y la dedicación.",
      hi: "विश्वास और समर्पण के माध्यम से अवसर।"
    },
    financeForecast: {
      pt: "Estabilidade financeira com planejamento.",
      en: "Financial stability with planning.",
      es: "Estabilidad financiera con planeación.",
      hi: "योजना के साथ वित्तीय स्थिरता।"
    },
    healthForecast: {
      pt: "Boa energia, pratique atividades ao ar livre.",
      en: "Good energy, practice outdoor activities.",
      es: "Buena energía, practica actividades al aire libre.",
      hi: "अच्छी ऊर्जा, बाहरी गतिविधियां करें।"
    },
    luckyMonths: {
      pt: ["Março", "Junho", "Setembro", "Dezembro"],
      en: ["March", "June", "September", "December"],
      es: ["Marzo", "Junio", "Septiembre", "Diciembre"],
      hi: ["मार्च", "जून", "सितंबर", "दिसंबर"]
    },
    challengingMonths: {
      pt: ["Abril", "Julho", "Novembro"],
      en: ["April", "July", "November"],
      es: ["Abril", "Julio", "Noviembre"],
      hi: ["अप्रैल", "जुलाई", "नवंबर"]
    }
  },
  pig: {
    generalForecast: {
      pt: "Ano de abundância e generosidade. Sua natureza será recompensada.",
      en: "Year of abundance and generosity. Your nature will be rewarded.",
      es: "Año de abundancia y generosidad. Tu naturaleza será recompensada.",
      hi: "प्रचुरता और उदारता का वर्ष। आपके स्वभाव का फल मिलेगा।"
    },
    loveForecast: {
      pt: "Romance generoso e compassivo.",
      en: "Generous and compassionate romance.",
      es: "Romance generoso y compasivo.",
      hi: "उदार और दयालु रोमांस।"
    },
    careerForecast: {
      pt: "Oportunidades através de cooperação e generosidade.",
      en: "Opportunities through cooperation and generosity.",
      es: "Oportunidades a través de la cooperación y la generosidad.",
      hi: "सहयोग और उदारता के माध्यम से अवसर।"
    },
    financeForecast: {
      pt: "Abundância financeira com gestão cuidadosa.",
      en: "Financial abundance with careful management.",
      es: "Abundancia financiera con un manejo cuidadoso.",
      hi: "सावधानीपूर्वक प्रबंधन के साथ वित्तीय प्रचुरता।"
    },
    healthForecast: {
      pt: "Boa energia, evite excessos alimentares.",
      en: "Good energy, avoid dietary excesses.",
      es: "Buena energía, evita excesos alimenticios.",
      hi: "अच्छी ऊर्जा, आहार संबंधी अति से बचें।"
    },
    luckyMonths: {
      pt: ["Fevereiro", "Maio", "Agosto", "Novembro"],
      en: ["February", "May", "August", "November"],
      es: ["Febrero", "Mayo", "Agosto", "Noviembre"],
      hi: ["फरवरी", "मई", "अगस्त", "नवंबर"]
    },
    challengingMonths: {
      pt: ["Março", "Junho", "Setembro"],
      en: ["March", "June", "September"],
      es: ["Marzo", "Junio", "Septiembre"],
      hi: ["मार्च", "जून", "सितंबर"]
    }
  }
};
