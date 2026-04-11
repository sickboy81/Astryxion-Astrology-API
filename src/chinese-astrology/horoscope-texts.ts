import { Language } from "../i18n";

export type ChineseHoroscopeCategory = "love" | "health" | "career" | "finance" | "general";
export type ChineseHoroscopePeriod = "daily" | "weekly" | "monthly" | "yearly";

export interface ChineseHoroscopeText {
  animal: string;
  category: ChineseHoroscopeCategory;
  period: ChineseHoroscopePeriod;
  texts: {
    pt: string[];
    en: string[];
    es: string[];
    hi: string[];
  };
}

export const CHINESE_HOROSCOPE_TEXTS: Record<string, Record<ChineseHoroscopeCategory, Record<ChineseHoroscopePeriod, Partial<Record<Language, string[]>>>>> = {
  rat: {
    love: {
      daily: {
        pt: ["Sua agilidade mental cria um charme irresistível hoje; use o diálogo para seduzir.", "Conexões profundas surgem através de conversas inteligentes sob a influência do Rato."],
        en: ["Your mental agility creates an irresistible charm today; use dialogue to captivate.", "Deep connections emerge through intelligent conversations under the Rat's influence."],
        es: ["Tu agilidad mental crea un encanto irresistible hoy; usa el diálogo para seducir.", "Las conexiones profundas surgen a través de conversaciones inteligentes bajo la influencia de la Rata."],
        hi: ["आपकी मानसिक चपलता आज एक अनूठा आकर्षण पैदा करती है; आकर्षित करने के लिए संवाद का उपयोग करें।", "चूहे के प्रभाव में बुद्धिमान बातचीत के माध्यम से गहरे संबंध उभरते हैं।"],
      },
      weekly: {
        pt: ["Semana para explorar novos horizontes sociais; sua curiosidade abrirá portas no coração.", "O Rato favorece a redescoberta de interesses em comum com seu par."],
        en: ["A week to explore new social horizons; your curiosity will open doors in the heart.", "The Rat favors the rediscovery of common interests with your partner."],
        es: ["Semana para explorar nuevos horizontes sociales; tu curiosidad abrirá puertas en el corazón.", "La Rata favorece el redescubrimiento de intereses comunes con tu pareja."],
        hi: ["नए सामाजिक क्षितिज तलाशने का सप्ताह; आपकी जिज्ञासा हृदय के द्वार खोलेगी।", "चूहा अपने साथी के साथ साझा हितों की फिर से खोज करने का पक्ष लेता है।"],
      },
      monthly: {
        pt: ["Mês de clareza afetiva; o Rato traz discernimento para entender o que você realmente busca.", "Sua natureza protetora se destaca, fortalecendo os vínculos mais íntimos."],
        en: ["A month of affective clarity; the Rat brings discernment to understand what you truly seek.", "Your protective nature stands out, strengthening the most intimate bonds."],
        es: ["Mes de claridad afectiva; la Rata trae discernimiento para entender lo que realmente buscas.", "Tu naturaleza protectora se destaca, fortaleciendo los vínculos más íntimos."],
        hi: ["भावनात्मक स्पष्टता का महीना; चूहा यह समझने के लिए विवेक लाता है कि आप वास्तव में क्या चाहते हैं।", "आपकी सुरक्षात्मक प्रकृति बाहर खड़ी है, जो सबसे अंतरंग संबंधों को मजबूत करती है।"],
      },
      yearly: {
        pt: ["Ano de renovação emocional; a sabedoria do Rato guia você para relações mais autênticas.", "Ciclo de estabilidade onde sua lealdade será o alicerce de um grande amor."],
        en: ["A year of emotional renewal; the Rat's wisdom guides you toward more authentic relationships.", "A cycle of stability where your loyalty will be the foundation of a great love."],
        es: ["Año de renovación emocional; la sabiduría de la Rata te guía hacia relaciones más auténticas.", "Ciclo de estabilidad donde tu lealtad será el cimiento de un gran amor."],
        hi: ["भावनात्मक नवीकरण का वर्ष; चूहे की बुद्धिमत्ता आपको अधिक प्रामाणिक संबंधों की ओर ले जाती है।", "स्थिरता का चक्र जहां आपकी वफादारी एक महान प्रेम की नींव होगी।"],
      },
    },
    health: {
      daily: {
        pt: ["Foque na agilidade física hoje; pequenos exercícios revitalizam sua mente alerta.", "O Rato pede atenção ao seu sistema nervoso; busque pausas de silêncio."],
        en: ["Focus on physical agility today; small exercises revitalize your alert mind.", "The Rat asks for attention to your nervous system; seek moments of silence."],
        es: ["Enfócate en la agilidad física hoy; pequeños ejercicios revitalizan tu mente alerta.", "La Rata pide atención a tu sistema nervioso; busca momentos de silencio."],
        hi: ["आज शारीरिक चपलता पर ध्यान दें; छोटे व्यायाम आपके सतर्क दिमाग को पुनर्जीवित करते हैं।", "चूहा आपके तंत्रिका तंत्र पर ध्यान देने के लिए कहता है; मौन के क्षणों की तलाश करें।"],
      },
      weekly: {
        pt: ["Semana ideal para desintoxicar; sua vitalidade responde bem a mudanças na dieta.", "O dinamismo do Rato exige que você alterne trabalho duro com descanso profundo."],
        en: ["Ideal week to detoxify; your vitality responds well to changes in diet.", "The Rat's dynamism requires you to alternate hard work with deep rest."],
        es: ["Semana ideal para desintoxicar; tu voluntad responde bien a los cambios en la dieta.", "El dinamismo de la Rata requiere que alternes el trabajo duro con el descanso profundo."],
        hi: ["विषहरण (detoxify) के लिए आदर्श सप्ताह; आपकी जीवंतता आहार में बदलाव के प्रति अच्छी प्रतिक्रिया देती है।", "चूहे की गतिशीलता के लिए आवश्यक है कि आप कड़ी मेहनत के साथ गहरा विश्राम करें।"],
      },
      monthly: {
        pt: ["Mês de vigor renovado; o Rato impulsiona sua vontade de superar limites físicos.", "Atenção ao sono; sua mente fértil precisa de repouso para não sobrecarregar o corpo."],
        en: ["A month of renewed vigor; the Rat boosts your will to overcome physical limits.", "Attention to sleep; your fertile mind needs rest to avoid overtaxing the body."],
        es: ["Mes de vigor renovado; la Rata impulsa tu voluntad de superar límites físicos.", "Atención al sueño; tu mente fértil necesita descanso para no sobrecarregar el cuerpo."],
        hi: ["नवीकृत शक्ति का महीना; चूहा शारीरिक सीमाओं को पार करने की आपकी इच्छा को बढ़ावा देता है।", "नींद पर ध्यान दें; शरीर पर अधिक दबाव से बचने के लिए आपके उपजाऊ दिमाग को आराम की आवश्यकता है।"],
      },
      yearly: {
        pt: ["Ano de fortalecimento estrutural; invista em práticas que alinhem corpo e mente.", "Sua saúde será seu maior tesouro; o Rato protege sua energia vital este ano."],
        en: ["A year of structural strengthening; invest in practices that align body and mind.", "Your health will be your greatest treasure; the Rat protects your vital energy this year."],
        es: ["Año de fortalecimiento estructural; invierte en prácticas que alineen cuerpo y mente.", "Tu salud será tu mayor tesoro; la Rata protege tu energía vital este año."],
        hi: ["संरचनात्मक सुदृढ़ीकरण का वर्ष; उन अभ्यासों में निवेश करें जो शरीर और मन को संरेखित करते हैं।", "आपका स्वास्थ्य आपका सबसे बड़ा खजाना होगा; चूहा इस वर्ष आपकी महत्वपूर्ण ऊर्जा की रक्षा करता है।"],
      },
    },
    career: {
      daily: {
        pt: ["Sua astúcia estratégica resolve problemas complexos hoje; lidere com inteligência.", "O Rato favorece negociações rápidas e decisões baseadas em lógica pura."],
        en: ["Your strategic cunning solves complex problems today; lead with intelligence.", "The Rat favors quick negotiations and decisions based on pure logic."],
        es: ["Tu astucia estratégica resuelve problemas complejos hoy; lidera con inteligencia.", "La Rata favorece las negociaciones rápidas y las decisiones basadas en lógica pura."],
        hi: ["आपकी रणनीतिक चतुराई आज जटिल समस्याओं का समाधान करती है; बुद्धिमत्ता के साथ नेतृत्व करें।", "चूहा त्वरित बातचीत और शुद्ध तर्क पर आधारित निर्णयों का पक्ष लेता है।"],
      },
      weekly: {
        pt: ["Semana de progresso tático; observe os detalhes que outros ignoram no escritório.", "Sua ambição está alinhada com as oportunidades que o Rato traz agora."],
        en: ["A week of tactical progress; observe the details others ignore in the office.", "Your ambition is aligned with the opportunities the Rat brings now."],
        es: ["Semana de progreso táctico; observa los detalles que otros ignoran en la oficina.", "Tu ambición está alineada con las oportunidades que la Rata trae ahora."],
        hi: ["सामरिक प्रगति का सप्ताह; कार्यालय में उन विवरणों का निरीक्षण करें जिन्हें अन्य अनदेखा करते हैं।", "आपकी महत्वाकांक्षा उन अवसरों के साथ संरेखित है जो चूहा अब लाता है।"],
      },
      monthly: {
        pt: ["Mês de expansão profissional; o Rato favorece parcerias com quem partilha sua visão.", "Seu trabalho árduo será recompensado com uma nova posição de influência."],
        en: ["A month of professional expansion; the Rat favors partnerships with those who share your vision.", "Your hard work will be rewarded with a new position of influence."],
        es: ["Mes de expansión profesional; la Rata favorece alianzas con quienes comparten tu visión.", "Tu arduo trabajo será recompensado con una nueva posición de influencia."],
        hi: ["पेशेवर विस्तार का महीना; चूहा उन लोगों के साथ साझेदारी का पक्ष लेता है जो आपकी दृष्टि साझा करते हैं।", "आपकी कड़ी मेहनत को प्रभाव की एक नई स्थिति के साथ पुरस्कृत किया जाएगा।"],
      },
      yearly: {
        pt: ["Ano de conquistas sólidas; a eficiência do Rato garante sucesso em projetos de longo prazo.", "Sua carreira decola quando você aplica sua inteligência instintiva aos negócios."],
        en: ["A year of solid achievements; the Rat's efficiency ensures success in long-term projects.", "Your career takes off when you apply your instinctive intelligence to business."],
        es: ["Año de logros sólidos; la eficiencia de la Rata garantiza el éxito en proyectos a largo plazo.", "Tu carrera despega cuando aplicas tu inteligencia instintiva a los negocios."],
        hi: ["ठोस उपलब्धियों का वर्ष; चूहे की दक्षता दीर्घकालिक परियोजनाओं में सफलता सुनिश्चित करती है।", "जब आप व्यवसाय में अपनी सहज बुद्धिमत्ता लागू करते हैं तो आपका करियर उड़ान भरता है।"],
      },
    },
    finance: {
      daily: {
        pt: ["Dia favorável para encontrar pechinchas ou novas fontes de renda inesperadas.", "O Rato protege suas economias; seja meticuloso com seus registros contábeis."],
        en: ["Favorable day to find bargains or unexpected new sources of income.", "The Rat protects your savings; be meticulous with your accounting records."],
        es: ["Día favorable para encontrar gangas o nuevas fuentes de ingresos inesperadas.", "La Rata protege tus ahorros; sé meticuloso con tus registros contables."],
        hi: ["सौदा (bargains) या आय के अप्रत्याशित नए स्रोत खोजने के लिए अनुकूल दिन।", "चूहा आपकी बचत की रक्षा करता है; अपने लेखा अभिलेखों के साथ सावधानी बरतें।"],
      },
      weekly: {
        pt: ["Semana de planejamento financeiro aguçado; evite gastos por impulso emocional.", "Sua habilidade em multiplicar recursos é ampliada pela energia do Rato."],
        en: ["A week of sharp financial planning; avoid spending due to emotional impulses.", "Your ability to multiply resources is amplified by the Rat's energy."],
        es: ["Semana de planificación financiera aguda; evita gastos por impulsos emocionales.", "Tu habilidad para multiplicar recursos es ampliada por la energía de la Rata."],
        hi: ["तेज वित्तीय योजना का सप्ताह; भावनात्मक आवेगों के कारण खर्च करने से बचें।", "संसाधनों को गुणा करने की आपकी क्षमता चूहे की ऊर्जा से बढ़ जाती है।"],
      },
      monthly: {
        pt: ["Mês de colheita financeira; investimentos feitos com cautela trazem bons frutos.", "O Rato traz prosperidade através da organização impecável das suas contas."],
        en: ["A month of financial harvest; investments made with caution bring good fruits.", "The Rat brings prosperity through the impeccable organization of your accounts."],
        es: ["Mes de cosecha financiera; las inversiones realizadas con cautela traen buenos frutos.", "La Rata trae prosperidad a través de la organización impecable de tus cuentas."],
        hi: ["वित्तीय फसल का महीना; सावधानी से किए गए निवेश अच्छे फल लाते हैं।", "चूहा आपके खातों के त्रुटिहीन संगठन के माध्यम से समृद्धि लाता है।"],
      },
      yearly: {
        pt: ["Ano de acumulação inteligente; a prudência do Rato protege seu futuro material.", "Sua visão aguçada para negócios garante um ciclo de prosperidade estável."],
        en: ["A year of intelligent accumulation; the Rat's prudence protects your material future.", "Your sharp business vision ensures a cycle of stable prosperity."],
        es: ["Año de acumulación inteligente; la prudencia de la Rata protege tu futuro material.", "Tu aguda visión para los negocios garantiza un ciclo de prosperidad estable."],
        hi: ["बुद्धिमान संचय का वर्ष; चूहे का विवेक आपके भौतिक भविष्य की रक्षा करता है।", "आपकी तेज व्यावसायिक दृष्टि स्थिर समृद्धि का चक्र सुनिश्चित करती है।"],
      },
    },
    general: {
      daily: {
        pt: ["Dia de movimento e descobertas; sua curiosidade é sua melhor bússola hoje.", "O Rato favorece a adaptabilidade e o aprendizado rápido em novas situações."],
        en: ["A day of movement and discovery; your curiosity is your best compass today.", "The Rat favors adaptability and quick learning in new situations."],
        es: ["Día de movimiento y descubrimientos; tu curiosidad es tu mejor brújula hoy.", "La Rata favorece la adaptabilidad y el aprendizaje rápido en nuevas situaciones."],
        hi: ["आंदोलन और खोज का दिन; आपकी जिज्ञासा आज आपकी सबसे अच्छी दिशा-सूचक यंत्र है।", "चूहा नई स्थितियों में अनुकूलन क्षमता और त्वरित सीखने का पक्ष लेता है।"],
      },
      weekly: {
        pt: ["Semana de expansão mental; o Rato abre portas para conhecimentos transformadores.", "Sua inteligência brilha ao resolver impasses que pareciam sem solução."],
        en: ["A week of mental expansion; the Rat opens doors to transformative knowledge.", "Your intelligence shines in resolving deadlocks that seemed unsolvable."],
        es: ["Semana de expansión mental; la Rata abre puertas a conocimientos transformadores.", "Tu inteligencia brilha al resolver callejones sin salida que parecían no tener solución."],
        hi: ["मानसिक विस्तार का सप्ताह; चूहा परिवर्तनकारी ज्ञान के द्वार खोलता है।", "आपकी बुद्धिमत्ता उन गतिरोधों को सुलझाने में चमकती है जो अनसुलझे लग रहे थे।"],
      },
      monthly: {
        pt: ["Mês de clareza e propósito; o Rato guia seus passos para o que é essencial.", "Sua capacidade de observar e aprender torna você um mestre do seu próprio destino."],
        en: ["A month of clarity and purpose; the Rat guides your steps toward what is essential.", "Your ability to observe and learn makes you a master of your own destiny."],
        es: ["Mes de claridad y propósito; la Rata guía tus pasos hacia lo esencial.", "Tu capacidad de observar y aprender te convierte en un maestro de tu propio destino."],
        hi: ["स्पष्टता और उद्देश्य का महीना; चूहा आपके कदमों को उस ओर ले जाता है जो आवश्यक है।", "निरीक्षण करने और सीखने की आपकी क्षमता आपको अपने भाग्य का स्वामी बनाती है।"],
      },
      yearly: {
        pt: ["Ano de grandes saltos evolutivos; a sabedoria do Rato é seu guia constante.", "Ciclo onde sua agilidade e inteligência serão as chaves para todas as portas."],
        en: ["A year of great evolutionary leaps; the Rat's wisdom is your constant guide.", "A cycle where your agility and intelligence will be the keys to all doors."],
        es: ["Año de grandes saltos evolutivos; la sabiduría de la Rata es tu guía constante.", "Ciclo donde tu agilidad e inteligencia serán las llaves de todas las puertas."],
        hi: ["महान विकासवादी छलांगों का वर्ष; चूहे की बुद्धिमत्ता आपकी निरंतर मार्गदर्शक है।", "एक चक्र जहां आपकी चपलता और बुद्धिमत्ता सभी दरवाजों की कुंजी होगी।"],
      },
    },
  },
  ox: {
    love: {
      daily: {
        pt: ["Sua presença tranquila é seu maior atrativo hoje; cultive a paz no relacionamento.", "O Boi favorece demonstrações práticas de afeto sobre palavras vazias."],
        en: ["Your quiet presence is your greatest asset today; cultivate peace in your relationship.", "The Ox favors practical demonstrations of affection over empty words."],
        es: ["Tu presencia tranquila es tu mayor atractivo hoy; cultiva la paz en la relación.", "El Buey favorece las demostraciones prácticas de afecto sobre las palabras vacías."],
        hi: ["आपकी शांत उपस्थिति आज आपकी सबसे बड़ी संपत्ति है; रिश्ते में शांति बनाए रखें।", "बैल खाली शब्दों के बजाय स्नेह के व्यावहारिक प्रदर्शन का पक्ष लेता है।"],
      },
      weekly: {
        pt: ["Semana de solidez emocional; compromissos de longo prazo são favorecidos agora.", "A paciência do Boi ajudará a resolver mal-entendidos persistentes."],
        en: ["A week of emotional solidity; long-term commitments are favored now.", "The Ox's patience will help resolve persistent misunderstandings."],
        es: ["Semana de solidez emocional; los compromisos a largo plazo se ven favorecidos ahora.", "La paciencia del Buey ayudará a resolver malentendidos persistentes."],
        hi: ["भावनात्मक सुदृढ़ता का सप्ताह; दीर्घकालिक प्रतिबद्धताओं का अब पक्ष लिया जाता है।", "बैल का धैर्य लगातार गलतफहमियों को दूर करने में मदद करेगा।"],
      },
      monthly: {
        pt: ["Mês de aprofundamento; o Boi traz a estabilidade necessária para planos futuros a dois.", "Sua lealdade inabalável cria um porto seguro para quem você ama."],
        en: ["A month of deepening; the Ox brings the stability needed for future plans as a couple.", "Your unwavering loyalty creates a safe harbor for the ones you love."],
        es: ["Mes de profundización; el Buey trae la estabilidad necesaria para planes futuros en pareja.", "Tu lealtad inquebrantable crea un puerto seguro para tus seres queridos."],
        hi: ["गहराई का महीना; बैल एक जोड़े के रूप में भविष्य की योजनाओं के लिए आवश्यक स्थिरता लाता है।", "आपकी अटूट वफादारी उन लोगों के लिए एक सुरक्षित आश्रय बनाती है जिन्हें आप प्यार करते हैं।"],
      },
      yearly: {
        pt: ["Ano de construção de laços indestrutíveis; a força do Boi sustenta sua felicidade.", "Ciclo de maturação afetiva onde o respeito mútuo será a chave do sucesso."],
        en: ["A year of building indestructible bonds; the Ox's strength sustains your happiness.", "A cycle of affective maturation where mutual respect will be the key to success."],
        es: ["Año de construcción de vínculos indestructibles; la fuerza del Buey sostiene tu felicidad.", "Ciclo de maduración afectiva donde el respeto mutuo será la clave del éxito."],
        hi: ["अविनाशी बंधन बनाने का वर्ष; बैल की शक्ति आपकी खुशी को बनाए रखती है।", "भावनात्मक परिपक्वता का चक्र जहां पारस्परिक सम्मान सफलता की कुंजी होगी।"],
      },
    },
    health: {
      daily: {
        pt: ["Sua resistência física está em alta; ideal para atividades que exigem força.", "O Boi pede atenção à postura e ao descanso restaurador das articulações."],
        en: ["Your physical endurance is high; ideal for activities that require strength.", "The Ox asks for attention to posture and restorative rest for the joints."],
        es: ["Tu resistencia física es alta; ideal para actividades que requieren fuerza.", "El Buey pide atención a la postura y al descanso reparador de las articulaciones."],
        hi: ["आपकी शारीरिक सहनशक्ति अधिक है; उन गतिविधियों के लिए आदर्श जिनमें ताकत की आवश्यकता होती है।", "बैल जोड़ों के लिए मुद्रा (posture) और पुनर्स्थापनात्मक विश्राम पर ध्यान देने के लिए कहता है।"],
      },
      weekly: {
        pt: ["Semana de fortalecimento vital; rotinas consistentes trazem resultados visíveis.", "A conexão com a terra e a natureza recarrega o vigor do Boi agora."],
        en: ["A week of vital strengthening; consistent routines bring visible results.", "The connection with the earth and nature recharges the Ox's vigor now."],
        es: ["Semana de fortalecimiento vital; las rutinas constantes traen resultados visibles.", "La conexión con la tierra y la naturaleza recarga el vigor del Buey ahora."],
        hi: ["महत्वपूर्ण मजबूती का सप्ताह; निरंतर दिनचर्या दृश्यमान परिणाम लाती है।", "पृथ्वी और प्रकृति के साथ संबंध अब बैल की शक्ति को पुनर्जीवित करते हैं।"],
      },
      monthly: {
        pt: ["Mês de equilíbrio orgânico; o Boi favorece dietas ricas em alimentos naturais.", "Evite o acúmulo de estresse mental; sua força física depende da mente calma."],
        en: ["A month of organic balance; the Ox favors diets rich in natural foods.", "Avoid building up mental stress; your physical strength depends on a calm mind."],
        es: ["Mes de equilibrio orgánico; el Buey favorece las dietas ricas en alimentos naturales.", "Evita la acumulación de estrés mental; tu fuerza física depende de una mente tranquila."],
        hi: ["जैविक संतुलन का महीना; बैल प्राकृतिक खाद्य पदार्थों से भरपूर आहार का पक्ष लेता है।", "मानसिक तनाव के निर्माण से बचें; आपकी शारीरिक शक्ति शांत मन पर निर्भर करती है।"],
      },
      yearly: {
        pt: ["Ano de vigor inesgotável; a disciplina do Boi garante uma saúde de ferro.", "Invista em longevidade; este é o ciclo perfeito para consolidar bons hábitos."],
        en: ["A year of inexhaustible vigor; the Ox's discipline ensures iron health.", "Invest in longevity; this is the perfect cycle to consolidate good habits."],
        es: ["Año de vigor inagotable; la disciplina del Buey garantiza una salud de hierro.", "Invierte en longevidad; este es el ciclo perfecto para consolidar buenos hábitos."],
        hi: ["अक्षय शक्ति का वर्ष; बैल का अनुशासन लोहे जैसा स्वास्थ्य सुनिश्चित करता है।", "दीर्घायु में निवेश करें; अच्छे आदतों को मजबूत करने के लिए यह सही चक्र है।"],
      },
    },
    career: {
      daily: {
        pt: ["Sua confiabilidade abre portas importantes hoje; mostre sua competência prática.", "O Boi favorece o trabalho metódico e a conclusão de tarefas pendentes."],
        en: ["Your reliability opens important doors today; show your practical competence.", "The Ox favors methodical work and the completion of pending tasks."],
        es: ["Tu confiabilidad abre puertas importantes hoy; muestra tu competencia práctica.", "El Buey favorece el trabajo metódico y la conclusión de tareas pendientes."],
        hi: ["आपकी विश्वसनीयता आज महत्वपूर्ण द्वार खोलती है; अपनी व्यावहारिक क्षमता दिखाएं।", "बैल व्यवस्थित कार्य और लंबित कार्यों को पूरा करने का पक्ष लेता है।"],
      },
      weekly: {
        pt: ["Semana de progresso sólido; sua persistência será recompensada pelos superiores.", "Construa as bases do seu próximo grande projeto com a calma do Boi."],
        en: ["A week of solid progress; your persistence will be rewarded by superiors.", "Build the foundations of your next big project with the Ox's calmness."],
        es: ["Semana de progreso sólido; tu persistencia será recompensada por los superiores.", "Construye las bases de tu próximo gran proyecto con la calma del Buey."],
        hi: ["ठोस प्रगति का सप्ताह; आपकी दृढ़ता को वरिष्ठों द्वारा पुरस्कृत किया जाएगा।", "बैल की शांति के साथ अपने अगले बड़े प्रोजेक्ट की नींव रखें।"],
      },
      monthly: {
        pt: ["Mês de reconhecimento profissional; sua integridade é seu maior diferencial.", "O Boi traz oportunidades de liderar através do exemplo e da dedicação."],
        en: ["A month of professional recognition; your integrity is your greatest differentiator.", "The Ox brings opportunities to lead through example and dedication."],
        es: ["Mes de reconocimiento profesional; tu integridad es tu mayor diferenciador.", "El Buey trae oportunidades para liderar a través del ejemplo y la dedicación."],
        hi: ["पेशेवर मान्यता का महीना; आपकी अखंडता आपकी सबसे बड़ी विशिष्टता है।", "बैल उदाहरण और समर्पण के माध्यम से नेतृत्व करने के अवसर लाता है।"],
      },
      yearly: {
        pt: ["Ano de ascensão gradual e segura; a tenacidade do Boi garante o sucesso final.", "Seus esforços de anos começam a cristalizar em realizações materiais concretas."],
        en: ["A year of gradual and secure ascent; the Ox's tenacity ensures final success.", "Your efforts of years begin to crystallize into concrete material achievements."],
        es: ["Año de ascenso gradual y seguro; la tenacidad del Buey garantiza el éxito final.", "Tus esfuerzos de años comienzan a cristalizarse en logros materiales concretos."],
        hi: ["क्रमिक और सुरक्षित उत्थान का वर्ष; बैल की दृढ़ता अंतिम सफलता सुनिश्चित करती है।", "आपके वर्षों के प्रयास ठोस भौतिक उपलब्धियों में तब्दील होने लगते हैं।"],
      },
    },
    finance: {
      daily: {
        pt: ["Foque na segurança hoje; investimentos conservadores são os mais indicados.", "O Boi protege o patrimônio de quem busca a estabilidade antes do lucro rápido."],
        en: ["Focus on security today; conservative investments are most recommended.", "The Ox protects the assets of those who seek stability before quick profit."],
        es: ["Enfócate en la seguridad hoy; las inversiones conservadoras son las más recomendadas.", "El Buey protege el patrimonio de quienes buscan estabilidad antes que el lucro rápido."],
        hi: ["आज सुरक्षा पर ध्यान दें; रूढ़िवादी निवेश सबसे अधिक अनुशंसित हैं।", "बैल उन लोगों की संपत्ति की रक्षा करता है जो त्वरित लाभ से पहले स्थिरता चाहते हैं।"],
      },
      weekly: {
        pt: ["Semana de crescimento patrimonial lento mas constante; evite riscos desnecessários.", "A disciplina financeira do Boi ajuda a quitar dívidas ou poupar mais."],
        en: ["A week of slow but steady asset growth; avoid unnecessary risks.", "The Ox's financial discipline helps pay off debts or save more."],
        es: ["Semana de crecimiento patrimonial lento pero constante; evita riesgos innecesarios.", "La disciplina financiera del Buey ayuda a pagar deudas o ahorrar más."],
        hi: ["धीमी लेकिन स्थिर संपत्ति वृद्धि का सप्ताह; अनावश्यक जोखिमों से बचें।", "बैल का वित्तीय अनुशासन ऋण चुकाने या अधिक बचत करने में मदद करता है।"],
      },
      monthly: {
        pt: ["Mês de lucros tangíveis; o Boi favorece negócios imobiliários ou de longo prazo.", "Sua prudência financeira garante tranquilidade para o futuro da sua família."],
        en: ["A month of tangible profits; the Ox favors real estate or long-term business.", "Your financial prudence ensures peace of mind for your family's future."],
        es: ["Mes de beneficios tangibles; el Buey favorece los negocios inmobiliarios o de largo plazo.", "Tu prudencia financiera garantiza la tranquilidad para el futuro de tu familia."],
        hi: ["मूर्त लाभ का महीना; बैल रियल एस्टेट या दीर्घकालिक व्यवसाय का पक्ष लेता है।", "आपकी वित्तीय विवेक आपके परिवार के भविष्य के लिए मन की शांति सुनिश्चित करती है।"],
      },
      yearly: {
        pt: ["Ano de consolidação de fortuna; o Boi abençoa quem trabalha com honestidade.", "Ciclo de prosperidade sólida onde cada centavo economizado se tornará um muro de proteção."],
        en: ["A year of fortune consolidation; the Ox blesses those who work with honesty.", "A cycle of solid prosperity where every cent saved will become a protective wall."],
        es: ["Año de consolicación de fortuna; el Buey bendice a quienes trabajan con honestidad.", "Ciclo de prosperidad sólida donde cada centavo ahorrado se convertirá en un muro de protección."],
        hi: ["भाग्य समेकन का वर्ष; बैल ईमानदारी से काम करने वालों को आशीर्वाद देता है।", "ठोस समृद्धि का चक्र जहां बचाया गया हर पैसा एक सुरक्षात्मक दीवार बन जाएगा।"],
      },
    },
    general: {
      daily: {
        pt: ["Dia de firmeza moral; suas convicções serão testadas e sua força brilhará.", "O Boi traz clareza para resolver assuntos burocráticos ou familiares complexos."],
        en: ["A day of moral firmness; your convictions will be tested and your strength will shine.", "The Ox brings clarity to resolve complex bureaucratic or family matters."],
        es: ["Día de firmeza moral; tus convicciones serán puestas a prueba y tu fuerza brillará.", "El Buey trae claridad para resolver asuntos burocráticos o familiares complejos."],
        hi: ["नैतिक दृढ़ता का दिन; आपके विश्वासों की परीक्षा होगी और आपकी शक्ति चमकेगी।", "बैल जटिल नौकरशाही या पारिवारिक मामलों को सुलझाने के लिए स्पष्टता लाता है।"],
      },
      weekly: {
        pt: ["Semana de introspecção e força interior; o Boi guia você para a verdade.", "Reconecte-se com suas raízes para encontrar a estabilidade que procura."],
        en: ["A week of introspection and inner strength; the Ox guides you toward the truth.", "Reconnect with your roots to find the stability you seek."],
        es: ["Semana de introspección y fuerza interior; el Buey te guía hacia la verdad.", "Reconéctate con tus raíces para encontrar la estabilidad que buscas."],
        hi: ["आत्मनिरीक्षण और आंतरिक शक्ति का सप्ताह; बैल आपको सत्य की ओर ले जाता है।", "स्थिरता खोजने के लिए अपनी जड़ों से फिर से जुड़ें।"],
      },
      monthly: {
        pt: ["Mês de amadurecimento; o Boi favorece grandes decisões de vida fundamentadas.", "Sua palavra de honra será sua maior aliada em todas as esferas social."],
        en: ["A month of maturation; the Ox favors well-grounded life decisions.", "Your word of honor will be your greatest ally in all social spheres."],
        es: ["Mes de maduración; el Buey favorece las decisiones de vida bien fundamentadas.", "Tu palabra de honor será tu mayor aliada en todas las esferas sociales."],
        hi: ["परिपक्वता का महीना; बैल सुस्थापित जीवन निर्णयों का पक्ष लेता है।", "सभी सामाजिक क्षेत्रों में आपका सम्मान का वचन आपका सबसे बड़ा सहयोगी होगा।"],
      },
      yearly: {
        pt: ["Ano de evolução espiritual através da disciplina e do trabalho consciente.", "Ciclo onde sua força silenciosa transformará obstáculos em degraus para o sucesso."],
        en: ["A year of spiritual evolution through discipline and conscious work.", "A cycle where your silent strength will transform obstacles into stepping stones to success."],
        es: ["Año de evolución espiritual a través de la disciplina y el trabajo consciente.", "Ciclo donde tu fuerza silenciosa transformará los obstáculos en escalones hacia el éxito."],
        hi: ["अनुशासन और सचेत कार्य के माध्यम से आध्यात्मिक विकास का वर्ष।", "एक चक्र जहां आपकी मौन शक्ति बाधाओं को सफलता की सीढ़ियों में बदल देगी।"],
      },
    },
  },
  tiger: {
    love: {
      daily: {
        pt: ["Sua paixão vibrante contagia a todos hoje; seja ousado na conquista.", "O Tigre traz uma energia de sedução e autoconfiança inabalável."],
        en: ["Your vibrant passion infects everyone today; be bold in your pursuit.", "The Tiger brings an energy of seduction and unwavering self-confidence."],
        es: ["Tu pasión vibrante contagia a todos hoy; sé audaz en la conquista.", "El Tigre trae una energía de seducción y autoconfianza inquebrantable."],
        hi: ["आपका जीवंत जुनून आज सभी को संक्रमित करता है; अपनी खोज में साहसी बनें।", "बाघ प्रलोभन और अटूट आत्मविश्वास की ऊर्जा लाता है।"],
      },
      weekly: {
        pt: ["Semana de aventuras românticas; o Tigre favorece quem se atreve a amar.", "Sua coragem abrirá caminhos para um novo e intenso capítulo afetivo."],
        en: ["A week of romantic adventures; the Tiger favors those who dare to love.", "Your courage will open paths for a new and intense emotional chapter."],
        es: ["Semana de aventuras románticas; el Tigre favorece a quienes se atreven a amar.", "Tu valentía abrirá caminos para un nuevo e intenso capítulo afectivo."],
        hi: ["रोमांचक साहसिक कार्यों का सप्ताह; बाघ उन लोगों का पक्ष लेता है जो प्यार करने की हिम्मत करते हैं।", "आपका साहस एक नए और गहन भावनात्मक अध्याय के लिए रास्ते खोलेगा।"],
      },
      monthly: {
        pt: ["Mês de magnetismo irresistível; o Tigre coloca você no centro das atenções.", "Use sua força para proteger e valorizar quem caminha ao seu lado."],
        en: ["A month of irresistible magnetism; the Tiger puts you in the center of attention.", "Use your strength to protect and value those who walk by your side."],
        es: ["Mes de magnetismo irresistible; el Tigre te pone en el centro de atención.", "Usa tu fuerza para proteger y valorar a quienes caminan a tu lado."],
        hi: ["अनूठा आकर्षण का महीना; बाघ आपको ध्यान के केंद्र में रखता है।", "अपने साथ चलने वालों की रक्षा करने और उन्हें महत्व देने के लिए अपनी शक्ति का उपयोग करें।"],
      },
      yearly: {
        pt: ["Ano de transformação radical no amor; a força do Tigre renova seu coração.", "Ciclo de paixões profundas e decisões que mudarão seu destino afetivo."],
        en: ["A year of radical transformation in love; the Tiger's strength renews your heart.", "A cycle of deep passions and decisions that will change your emotional destiny."],
        es: ["Año de transformación radical en el amor; la fuerza del Tigre renueva tu corazón.", "Ciclo de pasiones profundas y decisiones que cambiarán tu destino afectivo."],
        hi: ["प्यार में मौलिक परिवर्तन का वर्ष; बाघ की शक्ति आपके हृदय को नवीकृत करती है।", "गहरे जुनून और निर्णयों का चक्र जो आपके भावनात्मक भाग्य को बदल देगा।"],
      },
    },
    health: {
      daily: {
        pt: ["Sua vitalidade está no auge; aproveite para gastar energia com esportes.", "O Tigre pede cautela com impulsos físicos; evite riscos desnecessários."],
        en: ["Your vitality is at its peak; take the opportunity to spend energy on sports.", "The Tiger asks for caution with physical impulses; avoid unnecessary risks."],
        es: ["Tu vitalidad está en su apogeo; aprovecha para gastar energía con deportes.", "El Tigre pide precaución con los impulsos físicos; evita riesgos innecesarios."],
        hi: ["आपकी जीवंतता चरम पर है; खेलों पर ऊर्जा खर्च करने के अवसर का लाभ उठाएं।", "बाघ शारीरिक आवेगों के साथ सावधानी बरतने के लिए कहता है; अनावश्यक जोखिमों से बचें।"],
      },
      weekly: {
        pt: ["Semana de dinamismo total; seu corpo responde rápido a novos estímulos.", "O Tigre favorece atividades ao ar livre que despertem seu lado selvagem e livre."],
        en: ["A week of total dynamism; your body responds quickly to new stimuli.", "The Tiger favors outdoor activities that awaken your wild and free side."],
        es: ["Semana de dinamismo total; tu cuerpo responde rápido a nuevos estímulos.", "El Tigre favorece las actividades al aire libre que despierten tu lado salvaje y libre."],
        hi: ["पूर्ण गतिशीलता का सप्ताह; आपका शरीर नए उत्तेजनाओं के प्रति त्वरित प्रतिक्रिया करता है।", "बाघ बाहरी गतिविधियों का पक्ष लेता है जो आपके जंगली और स्वतंत्र पक्ष को जगाती हैं।"],
      },
      monthly: {
        pt: ["Mês de regeneração poderosa; o Tigre ajuda você a superar qualquer fadiga.", "Mantenha o foco na respiração e no controle da agressividade nervosa."],
        en: ["A month of powerful regeneration; the Tiger helps you overcome any fatigue.", "Maintain focus on breathing and controlling nervous aggressiveness."],
        es: ["Mes de regeneración poderosa; el Tigre te ayuda a superar cualquier fatiga.", "Mantén el enfoque en la respiración y en el control de la agresividad nerviosa."],
        hi: ["शक्तिशाली पुनर्जनन का महीना; बाघ आपको किसी भी थकान को दूर करने में मदद करता है।", "साँस लेने और तंत्रिका आक्रामकता को नियंत्रित करने पर ध्यान केंद्रित रखें।"],
      },
      yearly: {
        pt: ["Ano de vigor inigualável; a energia do Tigre protege sua saúde e força vital.", "Consolide sua rotina de treinos; este é o ciclo da superação física total."],
        en: ["A year of unrivaled vigor; the Tiger's energy protects your health and vital force.", "Consolidate your training routine; this is the cycle of total physical overcoming."],
        es: ["Año de vigor inigualable; la energía del Tigre protege tu salud y fuerza vital.", "Consolida tu rutina de entrenamiento; este es el ciclo de la superação física total."],
        hi: ["बेजोड़ शक्ति का वर्ष; बाघ की ऊर्जा आपके स्वास्थ्य और महत्वपूर्ण शक्ति की रक्षा करती है।", "अपनी प्रशिक्षण दिनचर्या को मजबूत करें; यह पूर्ण शारीरिक विजय का चक्र है।"],
      },
    },
    career: {
      daily: {
        pt: ["Sua liderança natural se impõe hoje; não tenha medo de assumir riscos.", "O Tigre favorece a iniciativa e o arrojo em projetos competitivos."],
        en: ["Your natural leadership asserts itself today; don't be afraid to take risks.", "The Tiger favors initiative and boldness in competitive projects."],
        es: ["Tu liderazgo natural se impone hoy; no tengas miedo de asumir riesgos.", "El Tigre favorece la iniciativa y la audacia en proyectos competitivos."],
        hi: ["आपका प्राकृतिक नेतृत्व आज खुद को साबित करता है; जोखिम लेने से न डरें।", "बाघ प्रतिस्पर्धी परियोजनाओं में पहल और साहस का पक्ष लेता है।"],
      },
      weekly: {
        pt: ["Semana de conquistas rápidas; sua audácia abre portas antes trancadas.", "O Tigre guia você para o sucesso através da ação direta e decidida."],
        en: ["A week of quick achievements; your audacity opens previously locked doors.", "The Tiger guides you to success through direct and decisive action."],
        es: ["Semana de logros rápidos; tu audacia abre puertas antes cerradas.", "El Tigre te guía hacia el éxito a través de la acción directa y decidida."],
        hi: ["त्वरित उपलब्धियों का सप्ताह; आपका साहस पहले से बंद दरवाजों को खोलता है।", "बाघ प्रत्यक्ष और निर्णायक कार्रवाई के माध्यम से आपको सफलता की ओर ले जाता है।"],
      },
      monthly: {
        pt: ["Mês de ascensão meteórica; o Tigre acelera seus resultados profissionais.", "Esteja pronto para defender suas ideias com a garra de um vencedor."],
        en: ["A month of meteoric ascent; the Tiger accelerates your professional results.", "Be ready to defend your ideas with the claw of a winner."],
        es: ["Mes de ascenso meteórico; el Tigre acelera tus resultados profesionales.", "Estate listo para defender tus ideas con la garra de un ganador."],
        hi: ["उल्कापिंडीय उत्थान का महीना; बाघ आपके पेशेवर परिणामों को गति देता है।", "विजेता के कौशल के साथ अपने विचारों का बचाव करने के लिए तैयार रहें।"],
      },
      yearly: {
        pt: ["Ano de grandes saltos na carreira; a ambição do Tigre não conhece limites.", "Sua coragem para inovar será o grande diferencial que trará prestígio e poder."],
        en: ["A year of big career leaps; the Tiger's ambition knows no bounds.", "Your courage to innovate will be the great differentiator that brings prestige and power."],
        es: ["Año de grandes saltos en la carrera; la ambición del Tigre no conoce límites.", "Tu valentía para innovar será el gran diferenciador que traerá prestigio y poder."],
        hi: ["कैरियर में बड़ी छलांग का वर्ष; बाघ की महत्वाकांक्षा की कोई सीमा नहीं है।", "नवाचार करने का आपका साहस वह महान विशिष्टता होगी जो प्रतिष्ठा और शक्ति लाएगी।"],
      },
    },
    finance: {
      daily: {
        pt: ["Ousadia financeira traz lucros hoje, mas evite apostas sem estratégia.", "O Tigre favorece quem busca a fortuna com determinação e coragem."],
        en: ["Financial boldness brings profits today, but avoid bets without strategy.", "The Tiger favors those who seek fortune with determination and courage."],
        es: ["La audacia financiera trae beneficios hoy, pero evita las apuestas sin estrategia.", "El Tigre favorece a quienes buscan la fortuna con determinación y valentía."],
        hi: ["वित्तीय साहस आज लाभ लाता है, लेकिन रणनीति के बिना दांव लगाने से बचें।", "बाघ उन लोगों का पक्ष लेता है जो दृढ़ संकल्प और साहस के साथ भाग्य की तलाश करते हैं।"],
      },
      weekly: {
        pt: ["Semana de expansão de recursos; novas oportunidades surgem do seu arrojo.", "O Tigre protege seus investimentos mais ambiciosos se houver clareza mental."],
        en: ["A week of resource expansion; new opportunities emerge from your boldness.", "The Tiger protects your most ambitious investments if there is mental clarity."],
        es: ["Semana de expansión de recursos; surgen nuevas oportunidades de tu audacia.", "El Tigre protege tus inversiones más ambiciosas si hay claridad mental."],
        hi: ["संसाधनों के विस्तार का सप्ताह; आपके साहस से नए अवसर उभरते हैं।", "बाघ आपके सबसे महत्वाकांक्षी निवेशों की रक्षा करता है यदि मानसिक स्पष्टता हो।"],
      },
      monthly: {
        pt: ["Mês de prosperidade dinâmica; o dinheiro flui através de novos empreendimentos.", "Sua intuição para negócios está afiada pela energia combativa do Tigre."],
        en: ["A month of dynamic prosperity; money flows through new ventures.", "Your business intuition is sharpened by the Tiger's combative energy."],
        es: ["Mes de prosperidad dinámica; el dinero fluye a través de nuevos emprendimientos.", "Tu intuición para los negocios está afilada por la energía combativa del Tigre."],
        hi: ["गतिशील समृद्धि का महीना; नए उद्यमों के माध्यम से धन का प्रवाह होता है।", "बाघ की जुझारू ऊर्जा से आपकी व्यावसायिक अंतर्ज्ञान तेज हो गई है।"],
      },
      yearly: {
        pt: ["Ano de conquista de riqueza; a força do Tigre atrai abundância material.", "Ciclo onde sua capacidade de lutar pelo que é seu resultará em grande fortuna."],
        en: ["A year of wealth conquest; the Tiger's strength attracts material abundance.", "A cycle where your ability to fight for what is yours will result in great fortune."],
        es: ["Año de conquista de riqueza; the fuerza del Tigre atrae abundancia material.", "Ciclo donde tu capacidad de luchar por lo que es tuyo resultará en una gran fortuna."],
        hi: ["धन विजय का वर्ष; बाघ की शक्ति भौतिक प्रचुरता को आकर्षित करती है।", "एक चक्र जहां आपके लिए लड़ने की आपकी क्षमता बड़े भाग्य में परिणत होगी।"],
      },
    },
    general: {
      daily: {
        pt: ["Dia de poder pessoal e ação; nada pode deter sua vontade hoje.", "O Tigre traz a clareza necessária para enfrentar qualquer desafio com honra."],
        en: ["A day of personal power and action; nothing can stop your will today.", "The Tiger brings the clarity needed to face any challenge with honor."],
        es: ["Día de poder personal y acción; nada puede detener tu voluntad hoy.", "El Tigre trae la claridad necesaria para enfrentar cualquier desafío con honor."],
        hi: ["व्यक्तिगत शक्ति और कार्रवाई का दिन; आज आपकी इच्छा को कोई नहीं रोक सकता।", "बाघ सम्मान के साथ किसी भी चुनौती का सामना करने के लिए आवश्यक स्पष्टता लाता है।"],
      },
      weekly: {
        pt: ["Semana de revoluções internas; o Tigre quebra as correntes do que é antigo.", "Sua autenticidade será sua maior força nos círculos sociais e familiares."],
        en: ["A week of internal revolutions; the Tiger breaks the chains of what is old.", "Your authenticity will be your greatest strength in social and family circles."],
        es: ["Semana de revoluciones internas; el Tigre rompe las cadenas de lo antiguo.", "Tu autenticidad será tu mayor fuerza en los círculos sociales y familiares."],
        hi: ["आंतरिक क्रांतियों का सप्ताह; बाघ पुराने की जंजीरों को तोड़ता है।", "आपकी प्रामाणिकता सामाजिक और पारिवारिक हलकों में आपकी सबसे बड़ी ताकत होगी।"],
      },
      monthly: {
        pt: ["Mês de expansão e domínio; seu território pessoal cresce sob o olhar do Tigre.", "Aproveite a força extra para realizar mudanças que você vinha adiando."],
        en: ["A month of expansion and dominance; your personal territory grows under the Tiger's gaze.", "Take advantage of the extra strength to make changes you've been delaying."],
        es: ["Mes de expansión y dominio; tu territorio personal crece bajo la mirada del Tigre.", "Aprovecha la fuerza extra para realizar cambios que venías postergando."],
        hi: ["विस्तार और प्रभुत्व का महीना; बाघ की नज़र में आपका व्यक्तिगत क्षेत्र बढ़ता है।", "उन बदलावों को करने के लिए अतिरिक्त शक्ति का लाभ उठाएं जिन्हें आप टाल रहे थे।"],
      },
      yearly: {
        pt: ["Ano de despertar e glória; a sabedoria corajosa do Tigre ilumina seu caminho.", "Ciclo de vitórias memoráveis onde você mostrará ao mundo sua verdade."],
        en: ["A year of awakening and glory; the Tiger's courageous wisdom illuminates your path.", "A cycle of memorable victories where you will show the world your truth."],
        es: ["Año de despertar y gloria; la sabiduría valiente del Tigre ilumina tu camino.", "Ciclo de victorias memorables donde mostrarás al mundo tu verdad."],
        hi: ["जागृति और गौरव का वर्ष; बाघ की साहसी बुद्धिमत्ता आपके मार्ग को रोशन करती है।", "यादगार जीत का चक्र जहां आप दुनिया को अपनी सच्चाई दिखाएंगे।"],
      },
    },
  },
  rabbit: {
    love: {
      daily: {
        pt: ["Sua sensibilidade aflorada pede momentos de ternura e acolhimento.", "O Coelho favorece o romance suave e a diplomacia nos relacionamentos."],
        en: ["Your heightened sensitivity calls for moments of tenderness and welcome.", "The Rabbit favors soft romance and diplomacy in relationships."],
        es: ["Tu sensibilidad a flor de piel pide momentos de ternura y acogida.", "El Conejo favorece el romance suave y la diplomacia en las relaciones."],
        hi: ["आपकी बढ़ी हुई संवेदनशीलता कोमलता और स्वागत के क्षणों की मांग करती है।", "खरगोश रिश्तों में नरम रोमांस और कूटनीतिक व्यवहार का पक्ष लेता है।"],
      },
      weekly: {
        pt: ["Semana de harmonia afetiva; o Coelho traz paz e entendimento mútuo.", "Cultive o diálogo gentil; pequenas gentilezas fortalecerão seu laço amoroso."],
        en: ["A week of affective harmony; the Rabbit brings peace and mutual understanding.", "Cultivate gentle dialogue; small kindnesses will strengthen your romantic bond."],
        es: ["Semana de armonía afectiva; el Conejo trae paz y entendimiento mutuo.", "Cultiva el diálogo amable; pequeñas gentilezas fortalecerán tu vínculo amoroso."],
        hi: ["भावनात्मक सद्भाव का सप्ताह; खरगोश शांति और आपसी समझ लाता है।", "कोमल संवाद विकसित करें; छोटी दयालुता आपके प्रेम बंधन को मजबूत करेगी।"],
      },
      monthly: {
        pt: ["Mês de conexões profundas e sutis; o Coelho valoriza o amor tranquilo.", "Sua intuição guia você para entender os desejos silenciosos do seu parceiro."],
        en: ["A month of deep and subtle connections; the Rabbit values quiet love.", "Your intuition guides you to understand your partner's silent desires."],
        es: ["Mes de conexiones profundas y sutiles; el Conejo valora el amor tranquilo.", "Tu intuición te guía para entender los deseos silenciosos de tu pareja."],
        hi: ["गहरे और सूक्ष्म संबंधों का महीना; खरगोश शांत प्रेम को महत्व देता है।", "आपकी अंतर्ज्ञान आपको अपने साथी की मौन इच्छाओं को समझने के लिए मार्गदर्शन करती है।"],
      },
      yearly: {
        pt: ["Ano de florescimento emocional; a doçura do Coelho traz felicidade ao lar.", "Ciclo de estabilidade onde o amor cresce nas raízes do cuidado e da proteção."],
        en: ["A year of emotional flourishing; the Rabbit's sweetness brings happiness to the home.", "A cycle of stability where love grows in the roots of care and protection."],
        es: ["Año de florecimiento emocional; la dulzura del Conejo trae felicidad al hogar.", "Ciclo de estabilidad donde el amor crece en las raíces del cuidado y la protección."],
        hi: ["भावनात्मक प्रफुल्लता का वर्ष; खरगोश की मिठास घर में खुशी लाती है।", "स्थिरता का चक्र जहां देखभाल और सुरक्षा की जड़ों में प्यार बढ़ता है।"],
      },
    },
    health: {
      daily: {
        pt: ["Sua energia pede calma; busque atividades que acalmem o coração e a mente.", "O Coelho favorece o relaxamento e o cuidado com o ambiente doméstico."],
        en: ["Your energy calls for calm; seek activities that soothe the heart and mind.", "The Rabbit favors relaxation and care for the home environment."],
        es: ["Tu energía pide calma; busca actividades que calmen el corazón y la mente.", "El Conejo favorece la relajación y el cuidado del ambiente doméstico."],
        hi: ["आपकी ऊर्जा शांत रहने की मांग करती है; ऐसी गतिविधियों की तलाश करें जो हृदय और मन को शांत करें।", "खरगोश विश्राम और घरेलू परिवेश की देखभाल का पक्ष लेता है।"],
      },
      weekly: {
        pt: ["Semana de equilíbrio interior; o Coelho guia você para práticas regenerativas.", "Cuide da sua alimentação com foco na leveza; seu corpo agradecerá."],
        en: ["A week of inner balance; the Rabbit guides you toward regenerative practices.", "Take care of your diet with a focus on lightness; your body will thank you."],
        es: ["Semana de equilibrio interior; el Conejo te guía hacia prácticas regenerativas.", "Cuida tu alimentación centrándote en la ligereza; tu cuerpo te lo agradecerá."],
        hi: ["आंतरिक संतुलन का सप्ताह; खरगोश आपको पुनर्योजी प्रथाओं की ओर ले जाता है।", "हल्केपन पर ध्यान केंद्रित करते हुए अपने आहार का ध्यान रखें; आपका शरीर आपको धन्यवाद देगा।"],
      },
      monthly: {
        pt: ["Mês de renovação sutil; o Coelho traz bem-estar através da paz estética.", "Evite ambientes ruidosos; sua saúde floresce no silêncio e na organização."],
        en: ["A month of subtle renewal; the Rabbit brings well-being through aesthetic peace.", "Avoid noisy environments; your health flourishes in silence and organization."],
        es: ["Mes de renovación sutil; el Conejo trae bienestar a través de la paz estética.", "Evita los ambientes ruidosos; tu salud florece en el silencio y la organización."],
        hi: ["सूक्ष्म नवीकरण का महीना; खरगोश सौंदर्य शांति के माध्यम से कल्याण लाता है।", "शोर-शराबे वाले वातावरण से बचें; आपका स्वास्थ्य मौन और व्यवस्था में फलता-फूलता है।"],
      },
      yearly: {
        pt: ["Ano de preservação vital; a sabedoria do Coelho protege seu templo interior.", "Ciclo de longevidade onde hábitos suaves e constantes garantem sua energia."],
        en: ["A year of vital preservation; the Rabbit's wisdom protects your inner temple.", "A cycle of longevity where soft and constant habits guarantee your energy."],
        es: ["Año de preservación vital; la sabiduría del Conejo protege tu templo interior.", "Ciclo de longevidad donde hábitos suaves y constantes garantizan tu energía."],
        hi: ["महत्वपूर्ण संरक्षण का वर्ष; खरगोश की बुद्धिमत्ता आपके आंतरिक मंदिर की रक्षा करती है।", "दीर्घायु का चक्र जहां नरम और निरंतर आदतें आपकी ऊर्जा की गारंटी देती हैं।"],
      },
    },
    career: {
      daily: {
        pt: ["Sua diplomacia resolve conflitos no trabalho hoje; use o tato para subir.", "O Coelho favorece o planejamento minucioso e a discrição estratégica."],
        en: ["Your diplomacy resolves workplace conflicts today; use tact to climb.", "The Rabbit favors meticulous planning and strategic discretion."],
        es: ["Tu diplomacia resuelve conflictos en el trabajo hoy; usa el tacto para subir.", "El Conejo favorece la planificación minuciosa y la discreción estratégica."],
        hi: ["आपकी कूटनीति आज कार्यस्थल के संघर्षों को सुलझाती है; आगे बढ़ने के लिए चतुराई का उपयोग करें।", "खरगोश सावधानीपूर्वक योजना और रणनीतिक विवेक का पक्ष लेता है।"],
      },
      weekly: {
        pt: ["Semana de acordos vantajosos; sua natureza conciliadora atrai aliados novos.", "O Coelho guia seus passos profissionais com precisão e elegância."],
        en: ["A week of advantageous agreements; your conciliatory nature attracts new allies.", "The Rabbit guides your professional steps with precision and elegance."],
        es: ["Semana de acuerdos ventajosos; tu naturaleza conciliadora atrae nuevos aliados.", "El Conejo guía tus pasos profesionales con precisión y elegancia."],
        hi: ["लाभप्रद समझौतों का सप्ताह; आपकी मिलनसार प्रकृति नए सहयोगियों को आकर्षित करती है।", "खरगोश आपके व्यावसायिक कदमों को सटीकता और भव्यता के साथ मार्गदर्शन करता है।"],
      },
      monthly: {
        pt: ["Mês de reconhecimento pelo seu discernimento; seu trabalho é visto como essencial.", "O Coelho traz oportunidades em áreas que exigem bom gosto e harmonia."],
        en: ["A month of recognition for your discernment; your work is seen as essential.", "The Rabbit brings opportunities in areas that require good taste and harmony."],
        es: ["Mes de reconocimiento por tu discernimiento; tu trabajo es visto como esencial.", "El Conejo trae oportunidades en áreas que requieren buen gusto y armonía."],
        hi: ["आपके विवेक के लिए मान्यता का महीना; आपके काम को आवश्यक माना जाता है।", "खरगोश उन क्षेत्रों में अवसर लाता है जिनमें अच्छी पसंद और सद्भाव की आवश्यकता होती है।"],
      },
      yearly: {
        pt: ["Ano de progresso estável; a prudência do Coelho garante conquistas seguras.", "Sua carreira se beneficia da sua capacidade de mediar e criar ambientes produtivos."],
        en: ["A year of steady progress; the Rabbit's prudence ensures secure achievements.", "Your career benefits from your ability to mediate and create productive environments."],
        es: ["Año de progreso estable; la prudencia del Conejo garantiza logros seguros.", "Tu carrera se beneficia de su capacidad para mediar y crear ambientes productivos."],
        hi: ["स्थिर प्रगति का वर्ष; खरगोश की सावधानी सुरक्षित उपलब्धियों को सुनिश्चित करती है।", "आपका करियर मध्यस्थता करने और उत्पादक वातावरण बनाने की आपकी क्षमता से लाभान्वित होता है।"],
      },
    },
    finance: {
      daily: {
        pt: ["Prudência financeira é a chave hoje; prefira a segurança ao risco incerto.", "O Coelho protege o patrimônio de quem valoriza a tranquilidade futura."],
        en: ["Financial prudence is the key today; prefer security to uncertain risk.", "The Rabbit protects the wealth of those who value future tranquility."],
        es: ["La prudencia financiera es la clave hoy; prefiere la seguridad al riesgo incierto.", "El Conejo protege el patrimonio de quienes valoran la tranquilidad futura."],
        hi: ["वित्तीय सावधानी आज की कुंजी है; अनिश्चित जोखिम के बजाय सुरक्षा को प्राथमिकता दें।", "खरगोश उन लोगों की संपत्ति की रक्षा करता है जो भविष्य की शांति को महत्व देते हैं।"],
      },
      weekly: {
        pt: ["Semana de gestão equilibrada; seu senso de justiça ajuda em partilhas ou acordos.", "O Coelho favorece a economia consciente e o investimento em conforto."],
        en: ["A week of balanced management; your sense of justice helps in shares or agreements.", "The Rabbit favors conscious saving and investment in comfort."],
        es: ["Semana de gestión equilibrada; tu sentido de la justicia ayuda en repartos o acuerdos.", "El Conejo favorece el ahorro consciente y la inversión en confort."],
        hi: ["संतुलित प्रबंधन का सप्ताह; आपके न्याय की भावना शेयरों या समझौतों में मदद करती है।", "खरगोश सचेत बचत और आराम में निवेश का पक्ष लेता है।"],
      },
      monthly: {
        pt: ["Mês de ganhos constantes; a organização de suas contas traz alívio financeiro.", "O Coelho favorece negócios ligados à estética, casa ou bem-estar pessoal."],
        en: ["A month of steady gains; the organization of your accounts brings financial relief.", "The Rabbit favors businesses related to aesthetics, home, or personal well-being."],
        es: ["Mes de beneficios constantes; la organización de tus cuentas trae alivio financiero.", "El Conejo favorece los negocios ligados a la estética, el hogar o el bienestar personal."],
        hi: ["निरंतर लाभ का महीना; आपके खातों का संगठन वित्तीय राहत लाता है।", "खरगोश सौंदर्यशास्त्र, घर या व्यक्तिगत कल्याण से जुड़े व्यवसायों का पक्ष लेता है।"],
      },
      yearly: {
        pt: ["Ano de consolidação e segurança; o Coelho protege seu crescimento material.", "Ciclo de prosperidade onde a calma para investir resultará em colheitas fartas."],
        en: ["A year of consolidation and security; the Rabbit protects your material growth.", "A cycle of prosperity where calmness in investing will result in bountiful harvests."],
        es: ["Año de consolidación y seguridad; el Conejo protege tu crecimiento material.", "Ciclo de prosperidad donde la calma para invertir resultará en cosechas abundantes."],
        hi: ["समेकन और सुरक्षा का वर्ष; खरगोश आपके भौतिक विकास की रक्षा करता है।", "समृद्धि का चक्र जहां निवेश में शांति भरपूर फसल के रूप में परिणत होगी।"],
      },
    },
    general: {
      daily: {
        pt: ["Dia de paz e clareza mental; ouça seu instinto sábio antes de agir.", "O Coelho traz a suavidade necessária para lidar com pessoas difíceis hoje."],
        en: ["A day of peace and mental clarity; listen to your wise instinct before acting.", "The Rabbit brings the softness needed to deal with difficult people today."],
        es: ["Día de paz y claridad mental; escucha tu instinto sabio antes de actuar.", "El Conejo trae la suavidad necesaria para tratar con personas difíciles hoy."],
        hi: ["शांति और मानसिक स्पष्टता का दिन; कार्य करने से पहले अपनी बुद्धिमान प्रवृत्ति को सुनें।", "खरगोश आज कठिन लोगों से निपटने के लिए आवश्यक कोमलता लाता है।"],
      },
      weekly: {
        pt: ["Semana de harmonia social; sua presença é um bálsamo para o ambiente.", "O Coelho guia você para a resolução de pendências com leveza e precisão."],
        en: ["A week of social harmony; your presence is a balm for the environment.", "The Rabbit guides you to the resolution of pending issues with lightness and precision."],
        es: ["Semana de armonía social; tu presencia es un bálsamo para el ambiente.", "El Conejo te guía hacia la resolución de pendientes con ligereza y precisión."],
        hi: ["सामाजिक सद्भाव का सप्ताह; आपकी उपस्थिति पर्यावरण के लिए एक मरहम है।", "खरगोश आपको हल्केपन और सटीकता के साथ लंबित मुद्दों के समाधान के लिए मार्गदर्शन करता है।"],
      },
      monthly: {
        pt: ["Mês de despertar intuitivo; o Coelho abre portas para sua visão interior.", "Valorize os momentos de refúgio; sua alma se fortalece na paz do lar."],
        en: ["A month of intuitive awakening; the Rabbit opens doors to your inner vision.", "Value the moments of refuge; your soul is strengthened in the peace of home."],
        es: ["Mes de despertar intuitivo; el Conejo abre puertas a tu visión interior.", "Valora los momentos de refugio; tu alma se fortalece en la paz del hogar."],
        hi: ["सहज जागृति का महीना; खरगोश आपकी आंतरिक दृष्टि के द्वार खोलता है।", "शरण के क्षणों को महत्व दें; आपकी आत्मा घर की शांति में मजबूत होती है।"],
      },
      yearly: {
        pt: ["Ano de evolução gentil; a sabedoria do Coelho ilumina todas as áreas da vida.", "Ciclo onde sua diplomacia e elegância serão reconhecidas como virtudes raras."],
        en: ["A year of gentle evolution; the Rabbit's wisdom illuminates all areas of life.", "A cycle where your diplomacy and elegance will be recognized as rare virtues."],
        es: ["Año de evolución suave; la sabiduría del Conejo ilumina todas las áreas de la vida.", "Ciclo donde tu diplomacia y elegancia serán reconocidas como virtudes raras."],
        hi: ["कोमल विकास का वर्ष; खरगोश की बुद्धिमत्ता जीवन के सभी क्षेत्रों को रोशन करती है।", "एक चक्र जहां आपकी कूटनीति और भव्यता को दुर्लभ गुणों के रूप में मान्यता दी जाएगी।"],
      },
    },
  },
  dragon: {
    love: {
      daily: {
        pt: ["Sua aura majestosa brilha intensamente hoje; atraia o que deseja com confiança.", "O Dragão favorece encontros mágicos e paixões que parecem predestinadas."],
        en: ["Your majestic aura shines intensely today; attract what you desire with confidence.", "The Dragon favors magical encounters and passions that seem predestined."],
        es: ["Tu aura majestuosa brilla intensamente hoy; atrae lo que deseas con confianza.", "El Dragón favorece los encuentros mágicos y las pasiones que parecen predestinadas."],
        hi: ["आपका राजसी आभामंडल आज तीव्रता से चमकता है; जो आप चाहते हैं उसे आत्मविश्वास के साथ आकर्षित करें।", "ड्रैगन जादुई मुठभेड़ों और जुनून का पक्ष लेता है जो पूर्व निर्धारित लगते हैं।"],
      },
      weekly: {
        pt: ["Semana de magnetismo heroico; o Dragão coloca você no centro dos acontecimentos.", "Sua generosidade será o convite perfeito para um novo nível de intimidade."],
        en: ["A week of heroic magnetism; the Dragon puts you at the center of events.", "Your generosity will be the perfect invitation to a new level of intimacy."],
        es: ["Semana de magnetismo heroico; el Dragón te sitúa en el centro de los acontecimientos.", "Tu generosidad será la invitación perfecta para un nuevo nivel de intimidad."],
        hi: ["वीर चुंबकत्व का सप्ताह; ड्रैगन आपको घटनाओं के केंद्र में रखता है।", "आपकी उदारता अंतरंगता के एक नए स्तर के लिए एक आदर्श निमंत्रण होगी।"],
      },
      monthly: {
        pt: ["Mês de celebração afetiva; o Dragão traz alegria e expansão para sua vida a dois.", "Sua força protege o relacionamento, criando uma atmosfera de sucesso e prazer."],
        en: ["A month of affective celebration; the Dragon brings joy and expansion to your life as a couple.", "Your strength protects the relationship, creating an atmosphere of success and pleasure."],
        es: ["Mes de celebración afectiva; el Dragón trae alegría y expansión a tu vida en pareja.", "Tu fuerza protege la relación, creando una atmósfera de éxito y placer."],
        hi: ["भावनात्मक उत्सव का महीना; ड्रैगन एक जोड़े के रूप में आपके जीवन में खुशी और विस्तार लाता है।", "आपकी शक्ति रिश्ते की रक्षा करती है, जिससे सफलता और खुशी का माहौल बनता है।"],
      },
      yearly: {
        pt: ["Ano de glória romântica; a energia do Dragão atrai o amor dos seus sonhos.", "Ciclo de compromissos brilhantes onde sua felicidade será visível para todo o mundo."],
        en: ["A year of romantic glory; the Dragon's energy attracts the love of your dreams.", "A cycle of brilliant commitments where your happiness will be visible to everyone."],
        es: ["Año de gloria romántica; la energía del Dragón atrae el amor de tus sueños.", "Ciclo de compromisos brillantes donde tu felicidad será visible para todo el mundo."],
        hi: ["रोमांटिक गौरव का वर्ष; ड्रैगन की ऊर्जा आपके सपनों के प्यार को आकर्षित करती है।", "शानदार प्रतिबद्धताओं का चक्र जहां आपकी खुशी सभी को दिखाई देगी।"],
      },
    },
    health: {
      daily: {
        pt: ["Sua vitalidade é imbatível hoje; aproveite para realizar feitos que exigem energia.", "O Dragão protege seu vigor e traz uma sensação de força inesgotável."],
        en: ["Your vitality is unbeatable today; take the opportunity to perform feats that require energy.", "The Dragon protects your vigor and brings a sense of inexhaustible strength."],
        es: ["Tu vitalidad es imbatible hoy; aprovecha para realizar hazañas que requieran energía.", "El Dragón protege tu vigor y aporta una sensación de fuerza inagotable."],
        hi: ["आपकी जीवंतता आज अपराजेय है; उन कार्यों को करने के अवसर का लाभ उठाएं जिनमें ऊर्जा की आवश्यकता होती है।", "ड्रैगन आपकी शक्ति की रक्षा करता है और अटूट ताकत का एहसास दिलाता है।"],
      },
      weekly: {
        pt: ["Semana de renovação poderosa; o Dragão impulsiona sua saúde para novos patamares.", "Invista em atividades que expandam sua capacidade pulmonar e cardíaca."],
        en: ["A week of powerful renewal; the Dragon pushes your health to new heights.", "Invest in activities that expand your lung and heart capacity."],
        es: ["Semana de renovación poderosa; el Dragón impulsa tu salud hacia nuevos niveles.", "Invierte en actividades que expandan tu capacidad pulmonar y cardíaca."],
        hi: ["शक्तिशाली नवीकरण का सप्ताह; ड्रैगन आपके स्वास्थ्य को नई ऊंचाइयों पर ले जाता है।", "उन गतिविधियों में निवेश करें जो आपके फेफड़ों और हृदय की क्षमता का विस्तार करती हैं।"],
      },
      monthly: {
        pt: ["Mês de vigor extraordinário; o Dragão assiste na sua recuperação e força.", "Aproveite para consolidar uma dieta que potencialize sua energia divina."],
        en: ["A month of extraordinary vigor; the Dragon assists in your recovery and strength.", "Take the opportunity to consolidate a diet that enhances your divine energy."],
        es: ["Mes de vigor extraordinario; el Dragón ayuda en tu recuperación y fuerza.", "Aprovecha para consolidar una dieta que potencie tu energía divina."],
        hi: ["असाधारण शक्ति का महीना; ड्रैगन आपकी रिकवरी और ताकत में सहायता करता है।", "एक ऐसे आहार को मजबूत करने के अवसर का लाभ उठाएं जो आपकी दिव्य ऊर्जा को बढ़ाता है।"],
      },
      yearly: {
        pt: ["Ano de saúde radiante; a aura do Dragão protege você contra qualquer mal.", "Ciclo de fortalecimento total onde seu corpo se torna uma fortaleza de luz."],
        en: ["A year of radiant health; the Dragon's aura protects you against any evil.", "A cycle of total strengthening where your body becomes a fortress of light."],
        es: ["Año de salud radiante; el aura del Dragón te protege de cualquier mal.", "Ciclo de fortalecimiento total donde tu cuerpo se convierte en una fortaleza de luz."],
        hi: ["दीप्तिमान स्वास्थ्य का वर्ष; ड्रैगन का आभामंडल किसी भी बुराई से आपकी रक्षा करता है।", "पूर्ण सुदृढ़ीकरण का चक्र जहां आपका शरीर प्रकाश का किला बन जाता है।"],
      },
    },
    career: {
      daily: {
        pt: ["Seu brilho profissional é evidente hoje; assuma o comando com autoridade.", "O Dragão favorece grandes projetos e decisões que impactam o futuro."],
        en: ["Your professional shine is evident today; take command with authority.", "The Dragon favors large projects and decisions that impact the future."],
        es: ["Tu brillo profesional es evidente hoy; asume el mando con autoridad.", "El Dragón favorece los grandes proyectos y las decisiones que impactan el futuro."],
        hi: ["आपकी पेशेवर चमक आज स्पष्ट है; अधिकार के साथ कमान संभालें।", "ड्रैगन बड़ी परियोजनाओं और निर्णयों का पक्ष लेता है जो भविष्य को प्रभावित करते हैं।"],
      },
      weekly: {
        pt: ["Semana de triunfos; o Dragão abre caminhos para posições de destaque absoluto.", "Sua visão estratégica e coragem serão recompensadas com prestígio."],
        en: ["A week of triumphs; the Dragon opens paths for positions of absolute prominence.", "Your strategic vision and courage will be rewarded with prestige."],
        es: ["Semana de triunfos; el Dragón abre caminos para posiciones de absoluto destaque.", "Tu visión estratégica y valentía serán recompensadas con prestigio."],
        hi: ["जीत का सप्ताह; ड्रैगन पूर्ण प्रमुखता के पदों के लिए रास्ते खोलता है।", "आपकी रणनीतिक दृष्टि और साहस को प्रतिष्ठा के साथ पुरस्कृत किया जाएगा।"],
      },
      monthly: {
        pt: ["Mês de expansão de domínios; o Dragão traz o sucesso que você tanto buscou.", "Lidere com generosidade e veja sua influência crescer de forma meteórica."],
        en: ["A month of territory expansion; the Dragon brings the success you sought.", "Lead with generosity and watch your influence grow meteorically."],
        es: ["Mes de expansión de dominios; el Dragón trae el éxito que tanto buscaste.", "Lidera con generosidad y observa cómo tu influencia crece de forma meteórica."],
        hi: ["क्षेत्र विस्तार का महीना; ड्रैगन वह सफलता लाता है जिसे आपने चाहा था।", "उदारता के साथ नेतृत्व करें और अपने प्रभाव को उल्कापिंड की तरह बढ़ता हुआ देखें।"],
      },
      yearly: {
        pt: ["Ano de ápice profissional; a força do Dragão garante sua vitória em grandes desafios.", "Ciclo de realizações monumentais onde seu nome será sinônimo de excelência."],
        en: ["A year of professional peak; the Dragon's strength guarantees your victory in big challenges.", "A cycle of monumental achievements where your name will be synonymous with excellence."],
        es: ["Año de apogeo profesional; la fuerza del Dragón garantiza tu victoria en grandes desafíos.", "Ciclo de logros monumentales donde tu nombre será sinónimo de excelencia."],
        hi: ["पेशेवर शिखर का वर्ष; ड्रैगन की शक्ति बड़ी चुनौतियों में आपकी जीत की गारंटी देती है।", "स्मारकीय उपलब्धियों का चक्र जहां आपका नाम उत्कृष्टता का पर्याय होगा।"],
      },
    },
    finance: {
      daily: {
        pt: ["Dia de sorte financeira; o Dragão favorece investimentos ousados e prêmios.", "Sua intuição para identificar o tesouro está mais aguçada do que nunca."],
        en: ["A day of financial luck; the Dragon favors bold investments and prizes.", "Your intuition for identifying treasure is sharper than ever."],
        es: ["Día de suerte financiera; el Dragón favorece las inversiones audaces y los premios.", "Tu intuición para identificar el tesoro está más aguda que nunca."],
        hi: ["वित्तीय भाग्य का दिन; ड्रैगन साहसी निवेश और पुरस्कारों का पक्ष लेता है।", "खजाने की पहचान करने के लिए आपकी अंतर्ज्ञान पहले से कहीं अधिक तेज है।"],
      },
      weekly: {
        pt: ["Semana de prosperidade abundante; o Dragão atrai recursos de fontes inesperadas.", "Sua confiança financeira abrirá portas para negociações de alto valor."],
        en: ["A week of abundant prosperity; the Dragon attracts resources from unexpected sources.", "Your financial confidence will open doors to high-value negotiations."],
        es: ["Semana de prosperidad abundante; el Dragón atrae recursos de fuentes inesperadas.", "Tu confianza financiera abrirá puertas para negociaciones de alto valor."],
        hi: ["प्रचुर समृद्धि का सप्ताह; ड्रैगन अप्रत्याशित स्रोतों से संसाधनों को आकर्षित करता है।", "आपका वित्तीय आत्मविश्वास उच्च-मूल्य वाली बातचीत के लिए दरवाजे खोलेगा।"],
      },
      monthly: {
        pt: ["Mês de conquista de riqueza; o Dragão abençoa seus empreendimentos mais ambiciosos.", "Ciclo onde sua capacidade de criar abundância será amplificada."],
        en: ["A month of wealth conquest; the Dragon blesses your most ambitious ventures.", "A cycle where your ability to create abundance will be amplified."],
        es: ["Mes de conquista de riqueza; el Dragón bendice tus emprendimientos más ambiciosos.", "Ciclo donde tu capacidad para crear abundancia será amplificada."],
        hi: ["धन विजय का महीना; ड्रैगन आपके सबसे महत्वाकांक्षी उपक्रमों को आशीर्वाद देता है।", "एक चक्र जहां प्रचुरता पैदा करने की आपकी क्षमता बढ़ जाएगी।"],
      },
      yearly: {
        pt: ["Ano de fortuna e prestígio; a energia do Dragão atrai a glória material.", "Colheita de grandes investimentos; sua prosperidade será sólida e visível."],
        en: ["A year of fortune and prestige; the Dragon's energy attracts material glory.", "Harvest of big investments; your prosperity will be solid and visible."],
        es: ["Año de fortuna y prestigio; la energía del Dragón atrae la gloria material.", "Cosecha de grandes inversiones; tu prosperidad será sólida y visible."],
        hi: ["भाग्य और प्रतिष्ठा का वर्ष; ड्रैगन की ऊर्जा भौतिक गौरव को आकर्षित करती है।", "बड़े निवेशों की फसल; आपकी समृद्धि ठोस और दिखाई देने वाली होगी।"],
      },
    },
    general: {
      daily: {
        pt: ["Dia de poder absoluto; sinta a força do Dragão guiando sua vontade soberana.", "Sua presença é magnética e capaz de transformar qualquer situação adversa."],
        en: ["A day of absolute power; feel the Dragon's strength guiding your sovereign will.", "Your presence is magnetic and capable of transforming any adverse situation."],
        es: ["Día de poder absoluto; siente la fuerza del Dragón guiando tu voluntad soberana.", "Tu presencia es magnética y capaz de transformar cualquier situación adversa."],
        hi: ["पूर्ण शक्ति का दिन; ड्रैगन की ताकत को अपनी संप्रभु इच्छा का मार्गदर्शन करते हुए महसूस करें।", "आपकी उपस्थिति चुंबकीय है और किसी भी प्रतिकूल स्थिति को बदलने में सक्षम है।"],
      },
      weekly: {
        pt: ["Semana de revelações e brilho; o Dragão mostra a você o topo da montanha.", "Aja com honra e dignidade; sua verdadeira natureza divina está em evidência."],
        en: ["A week of revelations and brilliance; the Dragon shows you the mountain top.", "Act with honor and dignity; your true divine nature is in evidence."],
        es: ["Semana de revelaciones y brillo; el Dragón te muestra la cima de la montaña.", "Actúa con honor y dignidad; tu verdadera naturaleza divina está en evidencia."],
        hi: ["खुलासे और चमक का सप्ताह; ड्रैगन आपको पर्वत की चोटी दिखाता है।", "सम्मान और गरिमा के साथ कार्य करें; आपका सच्चा दिव्य स्वभाव प्रमाण में है।"],
      },
      monthly: {
        pt: ["Mês de expansão existencial; o Dragão amplia seus horizontes e sua influência.", "Tudo o que você tocar este mês tende a crescer e a prosperar maravilhosamente."],
        en: ["A month of existential expansion; the Dragon broadens your horizons and influence.", "Everything you touch this month tends to grow and prosper wonderfully."],
        es: ["Mes de expansión existencial; el Dragón amplía tus horizontes y tu influencia.", "Todo lo que toques este mes tiende a crecer y prosperar maravillosamente."],
        hi: ["अस्तित्वगत विस्तार का महीना; ड्रैगन आपके क्षितिज और प्रभाव को व्यापक बनाता है।", "इस महीने आप जिस भी चीज़ को छूएंगे, वह अद्भुत रूप से बढ़ने और समृद्ध होने वाली है।"],
      },
      yearly: {
        pt: ["Ano de glória suprema; a sabedoria do Dragão conduz você ao destino prometido.", "Ciclo de vitórias memoráveis que serão lembradas como o início de uma nova era."],
        en: ["A year of supreme glory; the Dragon's wisdom leads you to the promised destiny.", "A cycle of memorable victories that will be remembered as the beginning of a new era."],
        es: ["Año de gloria suprema; la sabiduría del Dragón te conduce al destino prometido.", "Ciclo de victorias memorables que serán recordadas como el inicio de una nueva era."],
        hi: ["परम गौरव का वर्ष; ड्रैगन की बुद्धिमत्ता आपको प्रतिज्ञाबद्ध भाग्य की ओर ले जाती है।", "यादगार जीत का चक्र जिसे एक नए युग की शुरुआत के रूप में याद किया जाएगा।"],
      },
    },
  },
  snake: {
    love: {
      daily: {
        pt: ["Sua intuição profunda guia você para o coração de quem ama hoje.", "A Serpente favorece o mistério encantador e a sedução silenciosa."],
        en: ["Your deep intuition guides you to the heart of those you love today.", "The Snake favors enchanting mystery and silent seduction."],
        es: ["Tu profunda intuición te guía hacia el corazón de quien amas hoy.", "La Serpiente favorece el misterio encantador y la seducción silenciosa."],
        hi: ["आपकी गहरी अंतर्ज्ञान आज आपको उन लोगों के दिल तक ले जाती है जिन्हें आप प्यार करते हैं।", "साँप करामाती रहस्य और मूक प्रलोभन का पक्ष लेता है।"],
      },
      weekly: {
        pt: ["Semana de conexões espirituais no amor; a Serpente revela segredos da alma.", "Cultive a discrição; seu laço afetivo se fortalece no silêncio compartilhado."],
        en: ["A week of spiritual connections in love; the Snake reveals soul secrets.", "Cultivate discretion; your emotional bond strengthens in shared silence."],
        es: ["Semana de conexiones espirituales en el amor; la Serpiente revela secretos del alma.", "Cultiva la discreción; tu vínculo afectivo se fortalece en el silencio compartido."],
        hi: ["प्यार में आध्यात्मिक संबंधों का सप्ताह; साँप आत्मा के रहस्यों को प्रकट करता है।", "विवेक विकसित करें; आपका भावनात्मक बंधन साझा मौन में मजबूत होता है।"],
      },
      monthly: {
        pt: ["Mês de renascimento afetivo; a Serpente ajuda você a trocar a pele do passado.", "Sua sabedoria sutil resolve qualquer impasse com elegância e profundidade."],
        en: ["A month of emotional rebirth; the Snake helps you shed the skin of the past.", "Your subtle wisdom resolves any impasse with elegance and depth."],
        es: ["Mes de renacimiento afectivo; la Serpiente te ayuda a mudar la piel del pasado.", "Tu sabiduría sutil resuelve cualquier impasse con elegancia y profundidad."],
        hi: ["भावनात्मक पुनर्जन्म का महीना; साँप आपको अतीत की त्वचा को त्यागने में मदद करता है।", "आपकी सूक्ष्म बुद्धिमत्ता किसी भी गतिरोध को भव्यता और गहराई के साथ हल करती है।"],
      },
      yearly: {
        pt: ["Ano de sabedoria romântica; a energia da Serpente atrai relações transformadoras.", "Ciclo de maturidade onde o amor se torna uma fonte de luz e harmonia interior."],
        en: ["A year of romantic wisdom; the Snake's energy attracts transformative relationships.", "A cycle of maturity where love becomes a source of light and inner harmony."],
        es: ["Año de sabiduría romántica; la energía de la Serpiente atrae relaciones transformadoras.", "Ciclo de madurez donde el amor se convierte en una fuente de luz y armonía interior."],
        hi: ["रोमांटिक ज्ञान का वर्ष; साँप की ऊर्जा परिवर्तनकारी संबंधों को आकर्षित करती है।", "परिपक्वता का चक्र जहां प्यार प्रकाश और आंतरिक सद्भाव का स्रोत बन जाता है।"],
      },
    },
    health: {
      daily: {
        pt: ["Sua vitalidade é sutil e constante hoje; foque no equilíbrio do seu fluxo interno.", "A Serpente favorece práticas que unam a mente e o corpo em harmonia profunda."],
        en: ["Your vitality is subtle and constant today; focus on the balance of your internal flow.", "The Snake favors practices that unite mind and body in deep harmony."],
        es: ["Tu vitalidad es sutil y constante hoy; enfócate en el equilibrio de tu flujo interno.", "La Serpiente favorece las prácticas que unen la mente y el cuerpo en profunda armonía."],
        hi: ["आपकी जीवंतता आज सूक्ष्म और निरंतर है; अपने आंतरिक प्रवाह के संतुलन पर ध्यान केंद्रित करें।", "साँप उन अभ्यासों का पक्ष लेता है जो मन और शरीर को गहरी सद्भाव में जोड़ते हैं।"],
      },
      weekly: {
        pt: ["Semana de regeneração oculta; seu corpo se cura de dentro para fora.", "A Serpente guia você para terapias que buscam a raiz de qualquer desequilíbrio."],
        en: ["A week of hidden regeneration; your body heals from the inside out.", "The Snake guides you toward therapies that seek the root of any imbalance."],
        es: ["Semana de regeneración oculta; tu cuerpo sana de adentro hacia afuera.", "La Serpiente te guía hacia terapias que buscan la raíz de cualquier desequilibrio."],
        hi: ["छिपे हुए पुनर्जनन का सप्ताह; आपका शरीर अंदर से बाहर तक ठीक हो जाता है।", "साँप आपको उन उपचारों की ओर ले जाता है जो किसी भी असंतुलन की जड़ की तलाश करते हैं।"],
      },
      monthly: {
        pt: ["Mês de purificação profunda; retire o que não serve mais à sua energia vital.", "Mantenha o silêncio interior; a paz mental é o seu melhor remédio este mês."],
        en: ["A month of deep purification; remove what no longer serves your vital energy.", "Maintain inner silence; mental peace is your best medicine this month."],
        es: ["Mes de purificación profunda; retira lo que ya no sirve a tu energía vital.", "Mantén el silencio interior; la paz mental es tu mejor remedio este mes."],
        hi: ["गहरी शुद्धि का महीना; उसे हटा दें जो अब आपकी महत्वपूर्ण ऊर्जा की सेवा नहीं करता है।", "आंतरिक मौन बनाए रखें; मानसिक शांति इस महीने आपकी सबसे अच्छी दवा है।"],
      },
      yearly: {
        pt: ["Ano de renovação integral; a sabedoria da Serpente protege sua longevidade.", "Ciclo onde sua conexão com as forças sutis da natureza restaura seu vigor absoluto."],
        en: ["A year of integral renewal; the Snake's wisdom protects your longevity.", "A cycle where your connection with the subtle forces of nature restores your absolute vigor."],
        es: ["Año de renovación integral; la sabiduría de la Serpiente protege tu longevidad.", "Ciclo donde tu conexión con las fuerzas sutiles de la naturaleza restaura tu vigor absoluto."],
        hi: ["पूर्ण नवीकरण का वर्ष; साँप की बुद्धिमत्ता आपकी दीर्घायु की रक्षा करती है।", "एक चक्र जहां प्रकृति की सूक्ष्म शक्तियों के साथ आपका संबंध आपकी पूर्ण शक्ति को बहाल करता है।"],
      },
    },
    career: {
      daily: {
        pt: ["Sua inteligência aguçada percebe o que ninguém vê hoje; aja com precisão.", "A Serpente favorece o planejamento secreto e a execução impecável."],
        en: ["Your sharp intelligence notices what no one sees today; act with precision.", "The Snake favors secret planning and flawless execution."],
        es: ["Tu aguda inteligencia percibe lo que nadie ve hoy; actúa con precisión.", "La Serpiente favorece la planificación secreta y la ejecución impecable."],
        hi: ["आपकी तेज बुद्धिमत्ता आज वह सब देखती है जो कोई नहीं देख पाता; सटीकता के साथ कार्य करें।", "साँप गुप्त योजना और त्रुटिहीन निष्पादन का पक्ष लेता है।"],
      },
      weekly: {
        pt: ["Semana de avanços estratégicos; sua astúcia sutil resolve problemas complexos.", "A Serpente guia você para negociações onde a verdade oculta é revelada."],
        en: ["A week of strategic advances; your subtle cunning resolves complex problems.", "The Snake guides you into negotiations where hidden truth is revealed."],
        es: ["Semana de avances estratégicos; tu astucia sutil resuelve problemas complejos.", "La Serpiente te guía hacia negociaciones donde la verdad oculta es revelada."],
        hi: ["रणनीतिक प्रगति का सप्ताह; आपकी सूक्ष्म चतुराई जटिल समस्याओं का समाधान करती है।", "साँप आपको उन वार्ताओं की ओर ले जाता है जहाँ छिपी हुई सच्चाई का पता चलता है।"],
      },
      monthly: {
        pt: ["Mês de reconhecimento pelo seu saber oculto; você se torna uma referência sutil.", "Use sua capacidade de análise para antecipar movimentos dos seus concorrentes."],
        en: ["A month of recognition for your hidden knowledge; you become a subtle reference.", "Use your analytical ability to anticipate your competitors' moves."],
        es: ["Mes de reconocimiento por tu conocimiento oculto; te conviertes en una referencia sutil.", "Usa tu capacidad de análisis para anticipar los movimientos de tus competidores."],
        hi: ["आपके छिपे हुए ज्ञान के लिए मान्यता का महीना; आप एक सूक्ष्म संदर्भ बन जाते हैं।", "अपने प्रतिस्पर्धियों की चालों का अनुमान लगाने के लिए अपनी विश्लेषणात्मक क्षमता का उपयोग करें।"],
      },
      yearly: {
        pt: ["Ano de evolução profissional silenciosa e poderosa; a Serpente garante seu lugar.", "Sua sabedoria e paciência serão as chaves para alcançar o topo da pirâmide."],
        en: ["A year of silent and powerful professional evolution; the Snake guarantees your place.", "Your wisdom and patience will be the keys to reaching the top of the pyramid."],
        es: ["Año de evolución profesional silenciosa y poderosa; la Serpiente garantiza tu lugar.", "Tu sabiduría y paciencia serán las llaves para alcanzar la cima de la pirámide."],
        hi: ["शांत और शक्तिशाली पेशेवर विकास का वर्ष; साँप आपके स्थान की गारंटी देता है।", "आपकी बुद्धिमत्ता और धैर्य पिरामिड के शीर्ष तक पहुँचने की कुंजी होंगे।"],
      },
    },
    finance: {
      daily: {
        pt: ["Dia de observação financeira; o tesouro está nos detalhes que todos ignoram.", "A Serpente protege quem investe com calma e visão de longo alcance."],
        en: ["A day of financial observation; the treasure is in the details everyone ignores.", "The Snake protects those who invest with calmness and far-reaching vision."],
        es: ["Día de observación financiera; el tesoro está en los detalles que todos ignoran.", "La Serpiente protege a quienes invierten con calma y visión de largo alcance."],
        hi: ["वित्तीय अवलोकन का दिन; खजाना उन विवरणों में है जिन्हें हर कोई अनदेखा करता है।", "साँप उन लोगों की रक्षा करता है जो शांति और दूरगामी दृष्टि के साथ निवेश करते हैं।"],
      },
      weekly: {
        pt: ["Semana de crescimento patrimonial sutil; seus recursos aumentam silenciosamente.", "A Serpente favorece investimentos ligados ao conhecimento e à investigação."],
        en: ["A week of subtle asset growth; your resources increase silently.", "The Snake favors investments linked to knowledge and investigation."],
        es: ["Semana de crecimiento patrimonial sutil; tus recursos aumentan silenciosamente.", "La Serpiente favorece las inversiones ligadas al conocimiento y a la investigación."],
        hi: ["सूक्ष्म संपत्ति वृद्धि का सप्ताह; आपके संसाधन चुपचाप बढ़ जाते हैं।", "साँप ज्ञान और जांच से जुड़े निवेशों का पक्ष लेता है।"],
      },
      monthly: {
        pt: ["Mês de sabedoria financeira; a Serpente revela as melhores rotas para o lucro.", "Ciclo onde sua prudência e segredos serão os guardiões da sua fortuna."],
        en: ["A month of financial wisdom; the Snake reveals the best routes for profit.", "A cycle where your prudence and secrets will be the guardians of your fortune."],
        es: ["Mes de sabiduría financiera; la Serpiente revela las mejores rutas hacia el beneficio.", "Ciclo donde tu prudencia y secretos serán los guardianes de tu fortuna."],
        hi: ["वित्तीय ज्ञान का महीना; साँप लाभ के लिए सर्वोत्तम मार्गों को प्रकट करता है।", "एक चक्र जहां आपका विवेक और रहस्य आपकी संपत्ति के संरक्षक होंगे।"],
      },
      yearly: {
        pt: ["Ano de estabilidade e riqueza profunda; a energia da Serpente atrai o sucesso.", "Sua prosperidade será construída sobre bases sólidas de conhecimento e estratégia."],
        en: ["A year of stability and deep wealth; the Snake's energy attracts success.", "Your prosperity will be built on solid foundations of knowledge and strategy."],
        es: ["Año de estabilidad y riqueza profunda; la energía de la Serpiente atrae el éxito.", "Tu prosperidad se construirá sobre bases sólidas de conocimiento y estrategia."],
        hi: ["स्थिरता और गहरे धन का वर्ष; साँप की ऊर्जा सफलता को आकर्षित करती है।", "आपकी समृद्धि ज्ञान और रणनीति की ठोस नींव पर बनेगी।"],
      },
    },
    general: {
      daily: {
        pt: ["Dia de introspecção e saber; ouça a voz mansa da sabedoria no seu interior.", "A Serpente traz uma clareza que ultrapassa as aparências e revela a verdade."],
        en: ["A day of introspection and knowledge; listen to the gentle voice of wisdom within.", "The Snake brings a clarity that goes beyond appearances and reveals the truth."],
        es: ["Día de introspección y conocimiento; escucha la suave voz de la sabiduría interior.", "La Serpiente trae una claridad que va más allá de las apariencias y revela la verdad."],
        hi: ["आत्मनिरीक्षण और ज्ञान का दिन; भीतर की ज्ञान की कोमल आवाज़ को सुनें।", "साँप एक स्पष्टता लाता है जो दिखावे से परे जाती है और सच्चाई को प्रकट करती है।"],
      },
      weekly: {
        pt: ["Semana de transformação espiritual; a Serpente ajuda você a trocar de perspectiva.", "Busque o conhecimento oculto; a verdade livrará você de antigas amarras."],
        en: ["A week of spiritual transformation; the Snake helps you change perspective.", "Seek hidden knowledge; the truth will set you free from old bonds."],
        es: ["Semana de transformación espiritual; la Serpiente te ayuda a cambiar de perspectiva.", "Busca el conocimiento oculto; la verdad te librará de antiguas ataduras."],
        hi: ["आध्यात्मिक परिवर्तन का सप्ताह; साँप आपको परिप्रेक्ष्य बदलने में मदद करता है।", "छिपे हुए ज्ञान की तलाश करें; सत्य आपको पुराने बंधनों से मुक्त कर देगा।"],
      },
      monthly: {
        pt: ["Mês de despertar e percepção; sua bússola interior está perfeitamente alinhada.", "Valorize o silêncio e o mistério; sua alma cresce no que não é dito."],
        en: ["A month of awakening and perception; your inner compass is perfectly aligned.", "Value silence and mystery; your soul grows in what is not said."],
        es: ["Mes de despertar y percepción; tu brújula interior está perfectamente alineada.", "Valora el silencio y el misterio; tu alma crece en lo que no se dice."],
        hi: ["जागृति और धारणा का महीना; आपका आंतरिक दिशा-सूचक यंत्र पूरी तरह से संरेखित है।", "मौन और रहस्य को महत्व दें; आपकी आत्मा उस चीज़ में बढ़ती है जो कहा नहीं गया है।"],
      },
      yearly: {
        pt: ["Ano de evolução profunda; a sabedoria da Serpente é seu farol constante.", "Ciclo onde sua capacidade de ver o invisível garantirá sua ascensão e paz."],
        en: ["A year of deep evolution; the Snake's wisdom is your constant beacon.", "A cycle where your ability to see the invisible will guarantee your ascent and peace."],
        es: ["Año de evolución profunda; la sabiduría de la Serpiente es su faro constante.", "Ciclo donde su capacidad de ver lo invisible garantizará su ascenso y paz."],
        hi: ["गहरे विकास का वर्ष; साँप की बुद्धिमत्ता आपका निरंतर प्रकाश स्तंभ है।", "एक चक्र जहां अदृश्य को देखने की आपकी क्षमता आपके उत्थान और शांति की गारंटी देगी।"],
      },
    },
  },
  horse: {
    love: {
      daily: {
        pt: ["Sua energia contagiante atrai olhares hoje; aproveite para viver intensamente.", "O Cavalo traz uma vibração de liberdade e entusiasmo romântico."],
        en: ["Your infectious energy attracts looks today; take the opportunity to live intensely.", "The Horse brings a vibration of freedom and romantic enthusiasm."],
        es: ["Tu energía contagiosa atrae miradas hoy; aprovecha para vivir intensamente.", "El Caballo trae una vibración de libertad y entusiasmo romántico."],
        hi: ["आपकी संक्रामक ऊर्जा आज लोगों का ध्यान आकर्षित करते हैं; तीव्रता से जीने के अवसर का लाभ उठाएं।", "घोड़ा स्वतंत्रता और रोमांटिक उत्साह का कंपन लाता है।"],
      },
      weekly: {
        pt: ["Semana de encontros dinâmicos; o Cavalo favorece quem segue o coração velozmente.", "Sua sinceridade abrirá portas para uma aventura amorosa inesquecível."],
        en: ["A week of dynamic encounters; the Horse favors those who follow their heart swiftly.", "Your sincerity will open doors for an unforgettable romantic adventure."],
        es: ["Semana de encuentros dinámicos; el Caballo favorece a quienes siguen su corazón velozmente.", "Tu sinceridad abrirá puertas a una aventura amorosa inolvidable."],
        hi: ["गतिशील मुठभेड़ों का सप्ताह; घोड़ा उन लोगों का पक्ष लेता है जो तेजी से अपने दिल का पालन करते हैं।", "आपकी ईमानदारी एक अविस्मरणीय रोमांटिक साहसिक कार्य के लिए दरवाजे खोलेगी।"],
      },
      monthly: {
        pt: ["Mês de expansão social e afetiva; o Cavalo coloca você em movimento e paixão.", "Aproveite o magnetismo extra para renovar os laços com quem você ama."],
        en: ["A month of social and affective expansion; the Horse puts you in motion and passion.", "Take advantage of the extra magnetism to renew bonds with those you love."],
        es: ["Mes de expansión social y afectiva; el Caballo te pone en movimiento y pasión.", "Aprovecha el magnetismo extra para renovar los vínculos con tus seres queridos."],
        hi: ["सामाजिक और भावनात्मक विस्तार का महीना; घोड़ा आपको गति और जुनून में रखता है।", "जिन्हें आप प्यार करते हैं उनके साथ संबंधों को नवीनीकृत करने के लिए अतिरिक्त आकर्षण का लाभ उठाएं।"],
      },
      yearly: {
        pt: ["Ano de galopes triunfantes no amor; a força do Cavalo traz felicidade vibrante.", "Ciclo de conquistas onde seu espírito livre encontrará o porto seguro que deseja."],
        en: ["A year of triumphant gallops in love; the Horse's strength brings vibrant happiness.", "A cycle of conquests where your free spirit will find the safe harbor it desires."],
        es: ["Año de galopes triunfantes en el amor; la fuerza del Caballo trae felicidad vibrante.", "Ciclo de conquistas donde tu espíritu libre encontrará el puerto seguro que desea."],
        hi: ["प्यार में विजयी सरपट दौड़ का वर्ष; घोड़े की शक्ति जीवंत खुशी लाती है।", "जीत का चक्र जहां आपकी स्वतंत्र आत्मा वह सुरक्षित आश्रय पाएगी जिसकी वह इच्छा करती है।"],
      },
    },
    health: {
      daily: {
        pt: ["Sua vitalidade está em alta; sinta o vigor do Cavalo percorrer seu corpo hoje.", "Ideal para atividades físicas intensas ou para iniciar uma nova rotina de treinos."],
        en: ["Your vitality is high; feel the Horse's vigor running through your body today.", "Ideal for intense physical activities or to start a new training routine."],
        es: ["Tu voluntad es alta; siente el vigor del Caballo recorriendo tu cuerpo hoy.", "Ideal para actividades físicas intensas o para iniciar una nueva rutina de entrenamiento."],
        hi: ["आपकी जीवंतता अधिक है; आज अपने शरीर में घोड़े की शक्ति को दौड़ते हुए महसूस करें।", "तीव्र शारीरिक गतिविधियों या नई प्रशिक्षण दिनचर्या शुरू करने के लिए आदर्श।"],
      },
      weekly: {
        pt: ["Semana de dinamismo total; o Cavalo impulsiona sua saúde e sua resistência.", "Busque o contato com a natureza; o ar livre é o melhor tônico para seu vigor."],
        en: ["A week of total dynamism; the Horse pushes your health and endurance.", "Seek contact with nature; the outdoors is the best tonic for your vigor."],
        es: ["Semana de dinamismo total; el Caballo impulsa tu salud y tu resistencia.", "Busca el contacto con la naturaleza; el aire libre es el mejor tónico para tu vigor."],
        hi: ["पूर्ण गतिशीलता का सप्ताह; घोड़ा आपके स्वास्थ्य और सहनशक्ति को बढ़ाता है।", "प्रकृति के साथ संपर्क खोजें; बाहरी हवा आपकी शक्ति के लिए सबसे अच्छा टॉनिक है।"],
      },
      monthly: {
        pt: ["Mês de regeneração rápida; a energia do Cavalo ajuda você a superar qualquer cansaço.", "Mantenha o foco no movimento; a estagnação é o que mais prejudica sua saúde."],
        en: ["A month of rapid regeneration; the Horse's energy helps you overcome any fatigue.", "Maintain focus on movement; stagnation is what harms your health the most."],
        es: ["Mes de regeneración rápida; la energía del Caballo te ayuda a superar cualquier cansancio.", "Mantén el enfoque en el movimiento; el estancamiento es lo que más perjudica tu salud."],
        hi: ["त्वरित पुनर्जनन का महीना; घोड़े की ऊर्जा आपको किसी भी थकान को दूर करने में मदद करती है।", "गति पर ध्यान केंद्रित रखें; ठहराव वह है जो आपके स्वास्थ्य को सबसे अधिक नुकसान पहुँचाता है।"],
      },
      yearly: {
        pt: ["Ano de vigor inesgotável; a força do Cavalo protege seu corpo contra o desgaste.", "Ciclo onde sua disciplina física e mental trará resultados extraordinários."],
        en: ["A year of inexhaustible vigor; the Horse's strength protects your body against wear.", "A cycle where your physical and mental discipline will bring extraordinary results."],
        es: ["Año de vigor inagotable; la fuerza del Caballo protege tu cuerpo contra el desgaste.", "Ciclo donde tu disciplina física y mental traerá resultados extraordinarios."],
        hi: ["अक्षय शक्ति का वर्ष; घोड़े की ताकत आपके शरीर को टूट-फूट से बचाती है।", "एक चक्र जहां आपका शारीरिक और मानसिक अनुशासन असाधारण परिणाम लाएगा।"],
      },
    },
    career: {
      daily: {
        pt: ["Sua iniciativa e coragem estão em destaque hoje; não tenha medo de avançar.", "O Cavalo favorece quem toma as rédeas da situação com decisão e clareza."],
        en: ["Your initiative and courage are in the spotlight today; don't be afraid to advance.", "The Horse favors those who take the reins of the situation with decision and clarity."],
        es: ["Tu iniciativa y valentía destacan hoy; no tengas miedo de avanzar.", "El Caballo favorece a quien toma las riendas de la situación con decisión y claridad."],
        hi: ["आपकी पहल और साहस आज सुर्खियों में हैं; आगे बढ़ने से न डरें।", "घोड़ा उन लोगों का पक्ष लेता है जो निर्णय और स्पष्टता के साथ स्थिति की कमान संभालते हैं।"],
      },
      weekly: {
        pt: ["Semana de progressos rápidos; sua energia abre caminhos para novas oportunidades.", "O Cavalo guia você para o sucesso através da ação direta e do entusiasmo profissional."],
        en: ["A week of rapid progress; your energy opens paths for new opportunities.", "The Horse guides you to success through direct action and professional enthusiasm."],
        es: ["Semana de progresos rápidos; tu energía abre caminos a nuevas oportunidades.", "El Caballo te guía hacia el éxito a través de la acción directa y el entusiasmo profesional."],
        hi: ["त्वरित प्रगति का सप्ताह; आपकी ऊर्जा नए अवसरों के लिए रास्ते खोलती है।", "घोड़ा प्रत्यक्ष कार्रवाई और पेशेवर उत्साह के माध्यम से आपको सफलता की ओर ले जाता है।"],
      },
      monthly: {
        pt: ["Mês de conquistas importantes; sua competitividade saudável é seu maior trunfo.", "O Cavalo traz reconhecimento por sua rapidez de raciocínio e execução."],
        en: ["A month of important achievements; your healthy competitiveness is your greatest asset.", "The Horse brings recognition for your quick thinking and execution."],
        es: ["Mes de logros importantes; tu competitividad saludable es tu mayor activo.", "El Caballo trae reconocimiento por su rapidez de pensamiento y ejecución."],
        hi: ["महत्वपूर्ण उपलब्धियों का महीना; आपकी स्वस्थ प्रतिस्पर्धा आपकी सबसे बड़ी संपत्ति है।", "घोड़ा आपकी त्वरित सोच और निष्पादन के लिए मान्यता लाता है।"],
      },
      yearly: {
        pt: ["Ano de ascensão brilhante; a ambição do Cavalo impulsiona sua carreira ao topo.", "Ciclo onde sua capacidade de inovar e liderar resultará em grande prestígio."],
        en: ["A year of brilliant ascent; the Horse's ambition pushes your career to the top.", "A cycle where your ability to innovate and lead will result in great prestige."],
        es: ["Año de ascenso brillante; la ambición del Caballo impulsa tu carrera a la cima.", "Ciclo donde tu capacidad de innovar y liderar resultará en un gran prestigio."],
        hi: ["शानदार उत्थान का वर्ष; घोड़े की महत्वाकांक्षा आपके करियर को शीर्ष पर ले जाती है।", "एक चक्र जहां आपके नवाचार करने और नेतृत्व करने की क्षमता बड़े सम्मान में परिणत होगी।"],
      },
    },
    finance: {
      daily: {
        pt: ["Dia de sorte para negócios rápidos; o Cavalo favorece a agilidade financeira.", "Sua intuição para identificar boas chances está mais afiada do que nunca hoje."],
        en: ["Lucky day for quick business; the Horse favors financial agility.", "Your intuition for identifying good chances is sharper than ever today."],
        es: ["Día de suerte para negocios rápidos; el Caballo favorece la agilidad financiera.", "Tu intuición para identificar buenas oportunidades está más aguda que nunca hoy."],
        hi: ["त्वरित व्यवसाय के लिए भाग्यशाली दिन; घोड़ा वित्तीय चपलता का पक्ष लेता है।", "अच्छे अवसरों की पहचान करने के लिए आपकी अंतर्ज्ञान आज पहले से कहीं अधिक तेज है।"],
      },
      weekly: {
        pt: ["Semana de expansão de recursos; novas fontes de renda surgem do seu dinamismo.", "O Cavalo protege seus investimentos mais ambiciosos se houver clareza de propósito."],
        en: ["A week of resource expansion; new sources of income emerge from your dynamism.", "The Horse protects your most ambitious investments if there is clarity of purpose."],
        es: ["Semana de expansión de recursos; surgen nuevas fuentes de ingresos de tu dinamismo.", "El Caballo protege tus inversiones más ambiciosas si hay claridad de propósito."],
        hi: ["संसाधनों के विस्तार का सप्ताह; आपकी गतिशीलता से आय के नए स्रोत उभरते हैं।", "घोड़ा आपके सबसे महत्वाकान्क्षी निवेशों की रक्षा करता है यदि उद्देश्य की स्पष्टता हो।"],
      },
      monthly: {
        pt: ["Mês de prosperidade vibrante; o lucro flui através de novos projetos e parcerias.", "Aproveite a energia combativa do Cavalo para conquistar sua independência financeira."],
        en: ["A month of vibrant prosperity; profit flows through new projects and partnerships.", "Take advantage of the Horse's combative energy to achieve financial independence."],
        es: ["Mes de prosperidad vibrante; el beneficio fluye a través de nuevos proyectos y alianzas.", "Aprovecha la energía combativa del Caballo para conquistar tu independencia financiera."],
        hi: ["जीवंत समृद्धि का महीना; नए प्रोजेक्ट्स और पार्टनरशिप के माध्यम से लाभ मिलता है।", "अपनी वित्तीय स्वतंत्रता प्राप्त करने के लिए घोड़े की जुझारू ऊर्जा का लाभ उठाएं।"],
      },
      yearly: {
        pt: ["Ano de conquista de fortuna; a força do Cavalo atrai abundância material sólida.", "Ciclo onde cada decisão corajosa resultará em colheitas fartas para o seu futuro."],
        en: ["A year of wealth conquest; the Horse's strength attracts solid material abundance.", "A cycle where every courageous decision will result in bountiful harvests for your future."],
        es: ["Año de conquista de riqueza; la fuerza del Caballo atrae abundancia material sólida.", "Ciclo donde cada decisión valiente resultará en cosechas abundantes para tu futuro."],
        hi: ["धन विजय का वर्ष; घोड़े की शक्ति ठोस भौतिक बहुतायत को आकर्षित करती है।", "एक चक्र जहां हर साहसी निर्णय आपके भविष्य के लिए भरपूर फसल के रूप में परिणत होगा।"],
      },
    },
    general: {
      daily: {
        pt: ["Dia de ação e entusiasmo; sinta a força do Cavalo guiando cada passo seu.", "Sua presença é marcante e capaz de inspirar todos ao seu redor hoje."],
        en: ["A day of action and enthusiasm; feel the Horse's strength guiding your every step.", "Your presence is striking and capable of inspiring everyone around you today."],
        es: ["Día de acción y entusiasmo; siente la fuerza del Caballo guiando cada paso.", "Tu presencia es notable y capaz de inspirar a todos a tu alrededor hoy."],
        hi: ["कार्रवाई और उत्साह का दिन; घोड़े की ताकत को अपने हर कदम का मार्गदर्शन करते हुए महसूस करें।", "आपकी उपस्थिति प्रभावशाली है और आज आपके आस-पास के सभी लोगों को प्रेरित करने में सक्षम है।"],
      },
      weekly: {
        pt: ["Semana de aventuras e novas visões; o Cavalo abre seus horizontes para o novo.", "Sua autenticidade e espírito livre serão celebrados em seus círculos sociais."],
        en: ["A week of adventures and new visions; the Horse opens your horizons to the new.", "Your authenticity and free spirit will be celebrated in your social circles."],
        es: ["Semana de aventuras y nuevas visiones; el Caballo abre tus horizontes a lo nuevo.", "Tu autenticidad y espíritu libre serán celebrados en tus círculos sociales."],
        hi: ["साहसिक कार्यों और नई दृष्टि का सप्ताह; घोड़ा नए के लिए आपके क्षितिज खोलता है।", "आपकी प्रामाणिकता और स्वतंत्र भावना आपके सामाजिक हलकों में मनाई जाएगी।"],
      },
      monthly: {
        pt: ["Mês de expansão existencial; o Cavalo amplia sua influência e seu alcance pessoal.", "Seja o líder do seu próprio destino; o sucesso está ao alcance dos seus saltos."],
        en: ["A month of existential expansion; the Horse broadens your influence and personal reach.", "Be the leader of your own destiny; success is within reach of your leaps."],
        es: ["Mes de expansión existencial; el Caballo amplía tu influencia y tu alcance personal.", "Sé el líder de tu propio destino; el éxito está al alcance de tus saltos."],
        hi: ["अस्तित्वगत विस्तार का महीना; घोड़ा आपके प्रभाव और व्यक्तिगत पहुंच को बढ़ाता है।", "अपने भाग्य के नेता बनें; सफलता आपकी छलांग की पहुंच के भीतर है।"],
      },
      yearly: {
        pt: ["Ano de glória e superação; a sabedoria veloz do Cavalo ilumina sua jornada.", "Ciclo onde você mostrará ao mundo sua verdadeira força e brilho inigualável."],
        en: ["A year of glory and overcoming; the Horse's swift wisdom illuminates your journey.", "A cycle where you will show the world your true strength and unrivaled shine."],
        es: ["Año de gloria y superación; la rápida sabiduría del Caballo ilumina tu jornada.", "Ciclo donde mostrarás al mundo tu verdadera fuerza y brillo inigualable."],
        hi: ["गौरव और विजय का वर्ष; घोड़े की तीव्र बुद्धिमत्ता आपकी यात्रा को रोशन करती है।", "एक चक्र जहां आप दुनिया को अपनी असली ताकत और बेजोड़ चमक दिखाएंगे।"],
      },
    },
  },
  goat: {
    love: {
      daily: {
        pt: ["Sua sensibilidade aflorada pede carinho hoje; cultive a doçura no amor.", "A Cabra favorece os gestos gentis e a harmonia nos relacionamentos."],
        en: ["Your heightened sensitivity calls for affection today; cultivate sweetness in love.", "The Goat favors gentle gestures and harmony in relationships."],
        es: ["Tu sensibilidad a flor de piel pide cariño hoy; cultiva la dulzura en el amor.", "La Cabra favorece los gestos gentiles y la armonía en las relaciones."],
        hi: ["आपकी बढ़ी हुई संवेदनशीलता आज स्नेह की मांग करती है; प्रेम में मधुरता विकसित करें।", "बकरी कोमल इशारों और रिश्तों में सद्भाव का पक्ष लेती है।"],
      },
      weekly: {
        pt: ["Semana de conexão íntima; o espírito da Cabra traz paz e acolhimento mútuo.", "Sua compreensão profunda fortalecerá os laços com quem você mais valoriza."],
        en: ["A week of intimate connection; the Goat's spirit brings peace and mutual welcome.", "Your deep understanding will strengthen the bonds with those you value most."],
        es: ["Semana de conexión íntima; el espíritu de la Cabra trae paz y acogida mutua.", "Tu profunda comprensión fortalecerá los vínculos con quienes más valoras."],
        hi: ["अंतरंग संबंध का सप्ताह; बकरी की आत्मा शांति और आपसी स्वागत लाती है।", "आपकी गहरी समझ उन लोगों के साथ बंधन मजबूत करेगी जिन्हें आप सबसे अधिक महत्व देते हैं।"],
      },
      monthly: {
        pt: ["Mês de florescimento afetivo; a Cabra valoriza o romance e a beleza da partilha.", "Deixe seu coração guiar seus passos para uma união mais sólida e feliz."],
        en: ["A month of affective flourishing; the Goat values romance and the beauty of sharing.", "Let your heart guide your steps toward a more solid and happy union."],
        es: ["Mes de florecimiento afectivo; la Cabra valora el romance y la belleza del compartir.", "Deja que tu corazón guíe tus pasos hacia una unión más sólida y feliz."],
        hi: ["भावनात्मक प्रफुल्लता का महीना; बकरी रोमांस और साझा करने की सुंदरता को महत्व देती है।", "एक अधिक ठोस और सुखी मिलन की ओर अपने कदमों का मार्गदर्शन करने के लिए अपने दिल को अनुमति दें।"],
      },
      yearly: {
        pt: ["Ano de estabilidade emocional; a doçura da Cabra traz felicidade genuína ao lar.", "Ciclo onde o amor crescerá através do cuidado mútuo e da proteção constante."],
        en: ["A year of emotional stability; the Goat's sweetness brings genuine happiness to the home.", "A cycle where love will grow through mutual care and constant protection."],
        es: ["Año de estabilidad emocional; la dulzura de la Cabra trae felicidad genuina al hogar.", "Ciclo donde el amor crecerá a través del cuidado mutuo y la protección constante."],
        hi: ["भावनात्मक स्थिरता का वर्ष; बकरी की मिठास घर में वास्तविक खुशी लाती है।", "एक चक्र जहां आपसी देखभाल और निरंतर सुरक्षा के माध्यम से प्यार बढ़ेगा।"],
      },
    },
    health: {
      daily: {
        pt: ["Sua energia pede equilíbrio e suavidade; foque no bem-estar emocional hoje.", "A Cabra favorece atividades que acalmem o espírito e nutram o corpo com leveza."],
        en: ["Your energy calls for balance and softness; focus on emotional well-being today.", "The Goat favors activities that soothe the spirit and nourish the body with lightness."],
        es: ["Tu energía pide equilibrio y suavidad; enfócate en el bienestar emocional hoy.", "La Cabra favorece las actividades que calman el espíritu y nutren el cuerpo con ligereza."],
        hi: ["आपकी ऊर्जा संतुलन और कोमलता की मांग करती है; आज भावनात्मक कल्याण पर ध्यान केंद्रित करें।", "बकरी उन गतिविधियों का पक्ष लेती है जो आत्मा को शांत करती हैं और शरीर को हल्केपन से पोषण देती हैं।"],
      },
      weekly: {
        pt: ["Semana de regeneração interior; a Cabra guia você para a paz e para o autocuidado.", "Busque ambientes tranquilos; o silêncio é o melhor remédio para sua vitalidade."],
        en: ["A week of inner regeneration; the Goat guides you toward peace and self-care.", "Seek quiet environments; silence is the best medicine for your vitality."],
        es: ["Semana de regeneración interior; la Cabra te guía hacia la paz y el autocuidado.", "Busca ambientes tranquilos; el silencio es la mejor medicina para tu vitalidad."],
        hi: ["आंतरिक पुनर्जनन का सप्ताह; बकरी आपको शांति और आत्म-देखभाल की ओर ले जाती है।", "शांत वातावरण खोजें; मौन आपकी जीवंतता के लिए सबसे अच्छी औषधि है।"],
      },
      monthly: {
        pt: ["Mês de bem-estar integral; a harmonia estética traz saúde para sua mente e corpo.", "Cuide da sua alimentação com foco na naturalidade e na paz do prazer de comer."],
        en: ["A month of integral well-being; aesthetic harmony brings health to your mind and body.", "Take care of your diet with a focus on naturalness and the peace of the pleasure of eating."],
        es: ["Mes de bienestar integral; la armonía estética aporta salud a tu mente y cuerpo.", "Cuida tu alimentación centrándote en la naturalidad y en la paz del placer de comer."],
        hi: ["संपूर्ण कल्याण का महीना; सौंदर्य सद्भाव आपके मन और शरीर में स्वास्थ्य लाता है।", "स्वाभाविकता और खाने की खुशी की शांति पर ध्यान केंद्रित करते हुए अपने आहार का ध्यान रखें।"],
      },
      yearly: {
        pt: ["Ano de vigor renovado; a sabedoria da Cabra protege seu equilíbrio vital.", "Ciclo onde hábitos suaves e constantes garantirão uma saúde de ferro e mente serena."],
        en: ["A year of renewed vigor; the Goat's wisdom protects your vital balance.", "A cycle where soft and constant habits will guarantee iron health and a serene mind."],
        es: ["Año de vigor renovado; la sabiduría de la Cabra protege tu equilibrio vital.", "Ciclo donde los hábitos suaves y constantes garantizarán una salud de hierro y una mente serena."],
        hi: ["नवीकृत शक्ति का वर्ष; बकरी की बुद्धिमत्ता आपके महत्वपूर्ण संतुलन की रक्षा करती है।", "एक चक्र जहां नरम और निरंतर आदतें लोहे जैसे स्वास्थ्य और शांत मन की गारंटी देंगी।"],
      },
    },
    career: {
      daily: {
        pt: ["Sua criatividade e diplomacia abrem portas hoje; use o tato para colaborar.", "A Cabra favorece o trabalho em equipe e a busca por soluções harmoniosas."],
        en: ["Your creativity and diplomacy open doors today; use tact to collaborate.", "The Goat favors teamwork and the search for harmonious solutions."],
        es: ["Tu creatividad y diplomacia abren puertas hoy; usa el tacto para colaborar.", "La Cabra favorece el trabajo en equipo y la búsqueda de soluciones armoniosas."],
        hi: ["आपकी रचनात्मकता और कूटनीति आज नए दरवाजे खोलती है; सहयोग करने के लिए चतुराई का उपयोग करें।", "बकरी टीम वर्क और सामंजस्यपूर्ण समाधानों की खोज का पक्ष लेती है।"],
      },
      weekly: {
        pt: ["Semana de progressos estáveis; sua natureza conciliadora atrai o apoio de colegas.", "A Cabra guia você para projetos que exigem bom gosto e visão humanitária."],
        en: ["A week of steady progress; your conciliatory nature attracts colleagues' support.", "The Goat guides you to projects that require good taste and humanitarian vision."],
        es: ["Semana de progresos estables; tu naturaleza conciliadora atrae el apoyo de los colegas.", "La Cabra te guía hacia proyectos que requieren buen gusto y visión humanitaria."],
        hi: ["स्थिर प्रगति का सप्ताह; आपकी मिलनसार प्रकृति सहकर्मियों के समर्थन को आकर्षित करती है।", "बकरी आपको उन परियोजनाओं की ओर मार्गदर्शन करती है जिनमें अच्छी पसंद और मानवीय दृष्टि की आवश्यकता होती है।"],
      },
      monthly: {
        pt: ["Mês de reconhecimento pelo seu talento; sua sensibilidade é vista como um diferencial.", "O sucesso fluirá através de parcerias sólidas baseadas na confiança mútua."],
        en: ["A month of recognition for your talent; your sensitivity is seen as a differentiator.", "Success will flow through solid partnerships based on mutual trust."],
        es: ["Mes de reconocimiento por tu talento; tu sensibilidad se ve como un diferenciador.", "El éxito fluirá a través de asociaciones sólidas basadas en la confianza mutua."],
        hi: ["आपकी प्रतिभा के लिए मान्यता का महीना; आपकी संवेदनशीलता को एक विशिष्टता के रूप में देखा जाता है।", "सफलता आपसी विश्वास पर आधारित ठोस साझेदारी के माध्यम से मिलेगी।"],
      },
      yearly: {
        pt: ["Ano de crescimento profissional sereno; a prudência da Cabra traz resultados seguros.", "Sua carreira se beneficia da sua capacidade de mediar e criar harmonia no trabalho."],
        en: ["A year of serene professional growth; the Goat's prudence brings secure results.", "Your career benefits from your ability to mediate and create harmony at work."],
        es: ["Año de crecimiento profesional sereno; la prudencia de la Cabra trae resultados seguros.", "Tu carrera se beneficia de tu capacidad para mediar y crear armonía en el trabajo."],
        hi: ["शांत पेशेवर विकास का वर्ष; बकरी की सावधानी सुरक्षित परिणाम लाती है।", "आपका करियर काम पर मध्यस्थता करने और सद्भाव बनाने की आपकी क्षमता से लाभान्वित होता है।"],
      },
    },
    finance: {
      daily: {
        pt: ["Dia de cautela com os gastos; foque na segurança e no conforto duradouro.", "A Cabra protege o patrimônio de quem busca a estabilidade financeira com prudência."],
        en: ["Day of caution with spending; focus on security and lasting comfort.", "The Goat protects the assets of those who seek financial stability with prudence."],
        es: ["Día de precaución con los gastos; enfócate en la seguridad y el confort duradero.", "La Cabra protege el patrimonio de quienes buscan estabilidad financiera con prudencia."],
        hi: ["खर्च करने में सावधानी का दिन; सुरक्षा और स्थायी आराम पर ध्यान दें।", "बकरी उन लोगों की संपत्ति की रक्षा करती है जो सावधानी के साथ वित्तीय स्थिरता चाहते हैं।"],
      },
      weekly: {
        pt: ["Semana de gestão equilibrada; seu senso de justiça ajuda em acordos financeiros.", "A Cabra favorece a economia consciente e o investimento no ambiente doméstico."],
        en: ["A week of balanced management; your sense of justice helps in financial agreements.", "The Goat favors conscious saving and investment in the home environment."],
        es: ["Semana de gestión equilibrada; tu sentido de la justicia ayuda en los acuerdos financieros.", "La Cabra favorece el ahorro consciente y la inversión en el ambiente doméstico."],
        hi: ["संतुलित प्रबंधन का सप्ताह; आपके न्याय की भावना वित्तीय समझौतों में मदद करती है।", "बकरी सचेत बचत और घरेलू वातावरण में निवेश का पक्ष लेती है।"],
      },
      monthly: {
        pt: ["Mês de ganhos constantes; a organização das suas contas traz paz financeira.", "Aproveite a energia intuitiva da Cabra para realizar negócios ligados à beleza e bem-estar."],
        en: ["A month of steady gains; the organization of your accounts brings financial peace.", "Take advantage of the Goat's intuitive energy to conduct business linked to beauty and well-being."],
        es: ["Mes de ganancias constantes; la organización de tus cuentas trae paz financiera.", "Aprovecha la energía intuitiva de la Cabra para realizar negocios ligados a la belleza y el bienestar."],
        hi: ["निरंतर लाभ का महीना; आपके खातों का संगठन वित्तीय शांति लाता है।", "सौंदर्य और कल्याण से जुड़े व्यवसाय करने के लिए बकरी की सहज ऊर्जा का लाभ उठाएं।"],
      },
      yearly: {
        pt: ["Ano de prosperidade sólida; a força da Cabra abençoa quem trabalha com amor.", "Ciclo onde sua capacidade de poupar e investir resultará em colheitas abundantes."],
        en: ["A year of solid prosperity; the Goat's strength blesses those who work with love.", "A cycle where your ability to save and invest will result in bountiful harvests."],
        es: ["Año de prosperidad sólida; la fuerza de la Cabra bendice a quienes trabajan con amor.", "Ciclo donde tu capacidad de ahorro e inversión resultará en cosechas abundantes."],
        hi: ["ठोस समृद्धि का वर्ष; बकरी की शक्ति प्यार से काम करने वालों को आशीर्वाद देती है।", "एक चक्र जहां आपकी बचत और निवेश करने की क्षमता भरपूर फसल के रूप में परिणत होगी।"],
      },
    },
    general: {
      daily: {
        pt: ["Dia de paz e clareza mental; ouça seu instinto sábio antes de agir hoje.", "Sua presença é um bálsamo para as tensões ao seu redor; seja o mediador da calma."],
        en: ["A day of peace and mental clarity; listen to your wise instinct before acting today.", "Your presence is a balm for tensions around you; be the mediator of calm."],
        es: ["Día de paz y claridad mental; escucha tu instinto sabio antes de actuar hoy.", "Tu presencia es un bálsamo para las tensiones a tu alrededor; sé el mediador de la calma."],
        hi: ["शांति और मानसिक स्पष्टता का दिन; आज कार्य करने से पहले अपनी बुद्धिमान प्रवृत्ति को सुनें।", "आपकी उपस्थिति आपके आस-पास के तनावों के लिए एक मरहम है; शांति के मध्यस्थ बनें।"],
      },
      weekly: {
        pt: ["Semana de harmonia social; sua aura de gentileza atrai novas e boas amizades.", "A Cabra guia você para a resolução de pendências com leveza e empatia extrema."],
        en: ["A week of social harmony; your aura of kindness attracts new and good friendships.", "The Goat guides you to the resolution of pending issues with lightness and extreme empathy."],
        es: ["Semana de armonía social; tu aura de amabilidad atrae nuevas y buenas amistades.", "La Cabra te guía hacia la resolución de pendientes con ligereza y extrema empatía."],
        hi: ["सामाजिक सद्भाव का सप्ताह; आपकी दयालुता का आभामंडल नई और अच्छी मित्रता को आकर्षित करता है।", "बकरी आपको हल्केपन और अत्यधिक सहानुभूति के साथ लंबित मुद्दों के समाधान के लिए मार्गदर्शन करती है।"],
      },
      monthly: {
        pt: ["Mês de expansão intuitiva; a Cabra abre portas para sua visão interior e espiritual.", "Valorize os momentos de refúgio no lar; sua alma se fortalece no silêncio do bem-estar."],
        en: ["A month of intuitive expansion; the Goat opens doors to your inner and spiritual vision.", "Value the moments of refuge at home; your soul is strengthened in the silence of well-being."],
        es: ["Mes de expansión intuitiva; la Cabra abre puertas a tu visión interior y espiritual.", "Valora los momentos de refugio en el hogar; tu alma se fortalece en el silencio del bienestar."],
        hi: ["सहज विस्तार का महीना; बकरी आपकी आंतरिक और आध्यात्मिक दृष्टि के द्वार खोलती है।", "घर पर शरण के क्षणों को महत्व दें; आपकी आत्मा कल्याण के मौन में मजबूत होती है।"],
      },
      yearly: {
        pt: ["Ano de evolução espiritual; a sabedoria da Cabra ilumina cada área da sua vida.", "Ciclo onde sua diplomacia e elegância serão reconhecidas como virtudes sagradas."],
        en: ["A year of spiritual evolution; the Goat's wisdom illuminates every area of your life.", "A cycle where your diplomacy and elegance will be recognized as sacred virtues."],
        es: ["Año de evolución espiritual; la sabiduría de la Cabra ilumina cada área de tu vida.", "Ciclo donde tu diplomacia y elegancia serán reconocidas como virtudes sagradas."],
        hi: ["आध्यात्मिक विकास का वर्ष; बकरी की बुद्धिमत्ता आपके जीवन के हर क्षेत्र को रोशन करती है।", "एक चक्र जहां आपकी कूटनीति और भव्यता को पवित्र गुणों के रूप में मान्यता दी जाएगी।"],
      },
    },
  },
  monkey: {
    love: {
      daily: {
        pt: ["Sua inteligência e humor atraem olhares hoje; seja criativo na conquista.", "O Macaco favorece o diálogo inteligente e a diversão nos relacionamentos."],
        en: ["Your intelligence and humor attract looks today; be creative in pursuit.", "The Monkey favors intelligent dialogue and fun in relationships."],
        es: ["Tu inteligencia y humor atraen miradas hoy; sé creativo en la conquista.", "El Mono favorece el diálogo inteligente y la diversión en las relaciones."],
        hi: ["आपकी बुद्धिमत्ता और हास्य आज लोगों का ध्यान आकर्षित करते हैं; खोज में रचनात्मक बनें।", "बंदर रिश्तों में बुद्धिमान संवाद और मस्ती का पक्ष लेता है।"],
      },
      weekly: {
        pt: ["Semana de encontros estimulantes; o Macaco favorece quem busca rir e aprender.", "Sua versatilidade abrirá caminhos para uma dinâmica amorosa leve e vibrante."],
        en: ["A week of stimulating encounters; the Monkey favors those who seek to laugh and learn.", "Your versatility will open paths for a light and vibrant romantic dynamic."],
        es: ["Semana de encuentros estimulantes; el Mono favorece a quienes buscan reír y aprender.", "Tu versatilidad abrirá caminos para una dinámica amorosa ligera y vibrante."],
        hi: ["उत्तेजक मुठभेड़ों का सप्ताह; बंदर उन लोगों का पक्ष लेता है जो हंसना और सीखना चाहते हैं।", "आपकी बहुमुखी प्रतिभा एक हल्की और जीवंत रोमांटिक गतिशीलता के लिए रास्ते खोलेगी।"],
      },
      monthly: {
        pt: ["Mês de agilidade afetiva; o Macaco coloca você em movimento e novas descobertas.", "Aproveite para renovar a rotina do casal com ideias fora da caixa."],
        en: ["A month of affective agility; the Monkey puts you in motion and new discoveries.", "Take the opportunity to renew the couple's routine with out-of-the-box ideas."],
        es: ["Mes de agilidad afectiva; el Mono te pone en movimiento y en nuevos descubrimientos.", "Aprovecha para renovar la rutina de la pareja con ideas fuera de lo común."],
        hi: ["भावनात्मक चपलता का महीना; बंदर आपको गति और नई खोजों में रखता है।", "लीक से हटकर विचारों के साथ जोड़े की दिनचर्या को नवीनीकृत करने के अवसर का लाभ उठाएं।"],
      },
      yearly: {
        pt: ["Ano de grandes saltos no amor; a inteligência do Macaco atrai parcerias vibrantes.", "Ciclo de surpresas onde sua capacidade de adaptação será a chave da felicidade."],
        en: ["A year of big leaps in love; the Monkey's intelligence attracts vibrant partnerships.", "A cycle of surprises where your adaptability will be the key to happiness."],
        es: ["Año de grandes saltos en el amor; la inteligencia del Mono atrae alianzas vibrantes.", "Ciclo de sorpresas donde tu capacidad de adaptación será la clave de la felicidad."],
        hi: ["प्यार में बड़ी छलांग का वर्ष; बंदर की बुद्धिमत्ता जीवंत साझेदारी को आकर्षित करती है।", "आश्चर्य का चक्र जहां आपकी अनुकूलन क्षमता खुशी की कुंजी होगी।"],
      },
    },
    health: {
      daily: {
        pt: ["Sua energia está em alta hoje; foque na agilidade e na coordenação motora.", "O Macaco favorece exercícios que desafiam a mente tanto quanto o corpo."],
        en: ["Your energy is high today; focus on agility and motor coordination.", "The Monkey favors exercises that challenge the mind as much as the body."],
        es: ["Tu energía es alta hoy; enfócate en la agilidad y la coordinación motora.", "El Mono favorece los ejercicios que desafían la mente tanto como el cuerpo."],
        hi: ["आपकी ऊर्जा आज अधिक है; चपलता और मोटर समन्वय पर ध्यान केंद्रित करें।", "बंदर उन अभ्यासों का पक्ष लेता है जो शरीर के समान ही दिमाग को चुनौती देते हैं।"],
      },
      weekly: {
        pt: ["Semana de dinamismo total; o Macaco impulsiona sua saúde e sua rapidez mental.", "Mantenha o foco na flexibilidade; seu corpo precisa de movimento e variedade."],
        en: ["A week of total dynamism; the Monkey pushes your health and mental speed.", "Maintain focus on flexibility; your body needs movement and variety."],
        es: ["Semana de dinamismo total; el Mono impulsa tu salud y tu rapidez mental.", "Mantén el enfoque en la flexibilidad; tu cuerpo necesita movimiento y variedad."],
        hi: ["पूर्ण गतिशीलता का सप्ताह; बंदर आपके स्वास्थ्य और मानसिक गति को बढ़ाता है।", "लचीलेपन पर ध्यान केंद्रित रखें; आपके शरीर को गति और विविधता की आवश्यकता है।"],
      },
      monthly: {
        pt: ["Mês de regeneração ativa; a energia do Macaco ajuda você a superar o estresse.", "Aproveite para descobrir novos esportes ou hobbies que tragam alegria infinita."],
        en: ["A month of active regeneration; the Monkey's energy helps you overcome stress.", "Take the opportunity to discover new sports or hobbies that bring infinite joy."],
        es: ["Mes de regeneración activa; la energía del Mono te ayuda a superar el estrés.", "Aprovecha para descubrir nuevos deportes o pasatiempos que traigan alegría infinita."],
        hi: ["सक्रिय पुनर्जनन का महीना; बंदर की ऊर्जा आपको तनाव दूर करने में मदद करती है।", "अनंत खुशी देने वाले नए खेलों या शौक की खोज करने के अवसर का लाभ उठाएं।"],
      },
      yearly: {
        pt: ["Ano de vigor intelectual e físico; o Macaco protege seu organismo contra a inércia.", "Ciclo onde sua rapidez de resposta garantirá uma saúde vibrante e duradoura."],
        en: ["A year of intellectual and physical vigor; the Monkey protects your body against inertia.", "A cycle where your quick response will guarantee vibrant and lasting health."],
        es: ["Año de vigor intelectual y físico; el Mono protege tu organismo contra la inercia.", "Ciclo donde tu rapidez de respuesta garantizará una salud vibrante y duradera."],
        hi: ["बौद्धिक और शारीरिक शक्ति का वर्ष; बंदर जड़ता के खिलाफ आपके शरीर की रक्षा करता है।", "एक चक्र जहां आपकी त्वरित प्रतिक्रिया जीवंत और स्थायी स्वास्थ्य सुनिश्चित करेगी।"],
      },
    },
    career: {
      daily: {
        pt: ["Sua astúcia resolve qualquer problema hoje; use a inteligência para se destacar.", "O Macaco favorece a rapidez de raciocínio e a inovação tecnológica no trabalho."],
        en: ["Your cunning resolves any problem today; use intelligence to stand out.", "The Monkey favors quick thinking and technological innovation at work."],
        es: ["Tu astucia resuelve cualquier problema hoy; usa la inteligencia para destacar.", "El Mono favorece la rapidez de pensamiento y la innovación tecnológica en el trabajo."],
        hi: ["आपकी चतुराई आज किसी भी समस्या का समाधान करती है; अलग दिखने के लिए बुद्धिमत्ता का उपयोग करें।", "बंदर काम पर त्वरित सोच और तकनीकी नवाचार का पक्ष लेता है।"],
      },
      weekly: {
        pt: ["Semana de progressos rápidos; sua versatilidade atrai oportunidades inéditas.", "O Macaco guia seus passos profissionais com engenhosidade e brilho absoluto."],
        en: ["A week of rapid progress; your versatility attracts unprecedented opportunities.", "The Monkey guides your professional steps with ingenuity and absolute brilliance."],
        es: ["Semana de progresos rápidos; tu versatilidad atrae oportunidades inéditas.", "El Mono guía tus pasos profesionales con ingenio y brillo absoluto."],
        hi: ["त्वरित प्रगति का सप्ताह; आपकी बहुमुखी प्रतिभा अभूतपूर्व अवसरों को आकर्षित करती है।", "बंदर सरलता और पूर्ण चमक के साथ आपके व्यावसायिक कदमों का मार्गदर्शन करता है।"],
      },
      monthly: {
        pt: ["Mês de conquistas por meio da lábia; sua comunicação é sua ferramenta de poder.", "O sucesso virá de saber adaptar-se às mudanças com humor e competência."],
        en: ["A month of achievements through persuasion; your communication is your power tool.", "Success will come from knowing how to adapt to changes with humor and competence."],
        es: ["Mes de logros a través de la persuasión; tu comunicación es tu herramienta de poder.", "El éxito vendrá de saber adaptarse a los cambios con humor y competencia."],
        hi: ["अनूनय के माध्यम से उपलब्धियों का महीना; आपका संचार आपका शक्ति उपकरण है।", "सफलता बदलावों के साथ हास्य और सक्षमता के साथ अनुकूलन करना सीखने से मिलेगी।"],
      },
      yearly: {
        pt: ["Ano de ascensão meteórica; o Macaco impulsiona sua carreira ao topo da pirâmide.", "Ciclo de inovações onde sua capacidade de improvisar resultará em grande sucesso material."],
        en: ["A year of meteoric ascent; the Monkey pushes your career to the top of the pyramid.", "A cycle of innovations where your ability to improvise will result in great material success."],
        es: ["Año de ascenso meteórico; el Mono impulsa tu carrera a la cima de la pirámide.", "Ciclo de innovaciones donde tu capacidad de improvisar resultará en un gran éxito material."],
        hi: ["उल्कापिंडीय उत्थान का वर्ष; बंदर आपके करियर को पिरामिड के शीर्ष पर ले जाता है।", "नवाचारों का चक्र जहां आपकी सुधार करने की क्षमता बड़े भौतिक लाभ में परिणत होगी।"],
      },
    },
    finance: {
      daily: {
        pt: ["Dia de rapidez financeira; o Macaco favorece negócios ágeis e lucros súbitos.", "Sua intuição para identificar furos no mercado está afiada hoje; aja rápido."],
        en: ["Day of financial speed; the Monkey favors agile business and sudden profits.", "Your intuition for identifying market gaps is sharp today; act fast."],
        es: ["Día de rapidez financiera; el Mono favorece los negocios ágiles y beneficios súbitos.", "Tu intuición para identificar huecos en el mercado está afilada hoy; actúa rápido."],
        hi: ["वित्तीय गति का दिन; बंदर फुर्तीले व्यवसाय और अचानक लाभ का पक्ष लेता है।", "बाजार के अंतराल को पहचानने के लिए आपकी अंतर्ज्ञान आज तेज है; तेजी से कार्य करें।"],
      },
      weekly: {
        pt: ["Semana de expansão de ganhos; sua criatividade gera novas fontes de riqueza.", "O Macaco protege seus investimentos se houver uma estratégia flexível por trás."],
        en: ["A week of earnings expansion; your creativity generates new sources of wealth.", "The Monkey protects your investments if there is a flexible strategy behind them."],
        es: ["Semana de expansión de ganancias; tu creatividad genera nuevas fuentes de riqueza.", "El Mono protege tus inversiones si hay una estrategia flexible detrás."],
        hi: ["आय विस्तार का सप्ताह; आपकी रचनात्मकता धन के नए स्रोत उत्पन्न करती है।", "यदि उनके पीछे कोई लचीली रणनीति है तो बंदर आपके निवेश की रक्षा करता है।"],
      },
      monthly: {
        pt: ["Mês de lucros dinâmicos; o dinheiro flui através da inovação e da troca rápida.", "Aproveite a energia mental do Macaco para organizar suas metas de fortuna."],
        en: ["A month of dynamic profits; money flows through innovation and rapid exchange.", "Take advantage of the Monkey's mental energy to organize your fortune goals."],
        es: ["Mes de beneficios dinámicos; el dinero fluye a través de la innovación y el intercambio rápido.", "Aprovecha la energía mental del Mono para organizar tus metas de fortuna."],
        hi: ["गतिशील लाभ का महीना; नवाचार और तेजी से विनिमय के माध्यम से धन का प्रवाह होता है।", "अपने भाग्य के लक्ष्यों को व्यवस्थित करने के लिए बंदर की मानसिक ऊर्जा का लाभ उठाएं।"],
      },
      yearly: {
        pt: ["Ano de conquista de abundância; a força do Macaco atrai recursos milagrosos.", "Ciclo onde cada negócio ousado resultará em colheitas generosas para seu futuro."],
        en: ["A year of abundance conquest; the Monkey's strength attracts miraculous resources.", "A cycle where every bold business will result in generous harvests for your future."],
        es: ["Año de conquista de la abundancia; la fuerza del Mono atrae recursos milagrosos.", "Ciclo donde cada negocio audaz resultará en cosechas generosas para tu futuro."],
        hi: ["बहुतायत विजय का वर्ष; बंदर की शक्ति चमत्कारी संसाधनों को आकर्षित करती है।", "एक चक्र जहां हर साहसी व्यवसाय आपके भविष्य के लिए उदार फसल के रूप में परिणत होगा।"],
      },
    },
    general: {
      daily: {
        pt: ["Dia de inteligência vibrante e ação; sinta a energia do Macaco em cada ideia.", "Sua capacidade de adaptação será sua maior força para vencer qualquer barreira hoje."],
        en: ["A day of vibrant intelligence and action; feel the Monkey's energy in every idea.", "Your adaptability will be your greatest strength to overcome any barrier today."],
        es: ["Día de inteligencia vibrante y acción; siente la energía del Mono en cada idea.", "Tu capacidad de adaptación será tu mayor fuerza para superar cualquier barrera hoy."],
        hi: ["जीवंत बुद्धिमत्ता और कार्रवाई का दिन; हर विचार में बंदर की ऊर्जा को महसूस करें।", "आज किसी भी बाधा को पार करने के लिए आपकी अनुकूलन क्षमता आपकी सबसे बड़ी ताकत होगी।"],
      },
      weekly: {
        pt: ["Semana de descobertas e riso; o Macaco abre seus caminhos para o novo sempre.", "Sua autenticidade e humor inteligente serão magnéticos em todos os círculos."],
        en: ["A week of discoveries and laughter; the Monkey opens your paths to the new always.", "Your authenticity and intelligent humor will be magnetic in all circles."],
        es: ["Semana de descubrimientos y risas; el Mono abre tus caminos a lo nuevo siempre.", "Tu autenticidad y humor inteligente serán magnéticos en todos los círculos."],
        hi: ["खोजों और हंसी का सप्ताह; बंदर हमेशा नए के लिए आपके रास्ते खोलता है।", "आपकी प्रामाणिकता और बुद्धिमान हास्य सभी हलकों में चुंबकीय होगा।"],
      },
      monthly: {
        pt: ["Mês de expansão total; o Macaco amplia seu território pessoal e sua visão.", "Use sua agilidade para transformar obstáculos em trampolins para a sua glória."],
        en: ["A month of total expansion; the Monkey broadens your personal territory and vision.", "Use your agility to transform obstacles into springboards for your glory."],
        es: ["Mes de expansión total; el Mono amplía tu territorio personal y tu visión.", "Usa tu agilidad para transformar los obstáculos en trampolines para tu gloria."],
        hi: ["पूर्ण विस्तार का महीना; बंदर आपके व्यक्तिगत क्षेत्र और दृष्टि को व्यापक बनाता है।", "बाधाओं को अपने गौरव के लिए स्प्रिंगबोर्ड में बदलने के लिए अपनी चपलता का उपयोग करें।"],
      },
      yearly: {
        pt: ["Ano de glória suprema e inovação; a sabedoria do Macaco ilumina seu destino.", "Ciclo de vitórias memoráveis onde seu brilho astuto será reconhecido por todos."],
        en: ["A year of supreme glory and innovation; the Monkey's wisdom illuminates your destiny.", "A cycle of memorable victories where your shrewd shine will be recognized by everyone."],
        es: ["Año de gloria suprema e innovación; la sabiduría del Mono ilumina tu destino.", "Ciclo de victorias memorables donde tu brillo astuto será reconocido por todos."],
        hi: ["परम गौरव और नवाचार का वर्ष; बंदर की बुद्धिमत्ता आपके भाग्य को रोशन करती है।", "यादगार जीत का चक्र जहां आपकी चतुर चमक को सभी पहचानेंगे।"],
      },
    },
  },
  rooster: {
    love: {
      daily: {
        pt: ["Sua elegância e confiança brilham hoje; atue com franqueza no amor.", "O Galo favorece a honestidade emocional e a dedicação aos detalhes afetivos."],
        en: ["Your elegance and confidence shine today; act with frankness in love.", "The Rooster favors emotional honesty and dedication to affective details."],
        es: ["Tu elegancia y confianza brillan hoy; actúa con franqueza en el amor.", "El Gallo favorece la honestidad emocional y la dedicación a los detalles afectivos."],
        hi: ["आपकी भव्यता और आत्मविश्वास आज चमकते हैं; प्रेम में स्पष्टवादी बनें।", "मुर्गा भावनात्मक ईमानदारी और भावनात्मक विवरणों के प्रति समर्पण का पक्ष लेता है।"],
      },
      weekly: {
        pt: ["Semana de compromissos claros; o Galo traz organização e seriedade ao romance.", "Sua retidão será o pilar de uma conexão amorosa profunda e duradoura."],
        en: ["A week of clear commitments; the Rooster brings organization and seriousness to romance.", "Your uprightness will be the pillar of a deep and lasting romantic connection."],
        es: ["Semana de compromisos claros; el Gallo aporta organización y seriedad al romance.", "Tu rectitud será el pilar de una conexión amorosa profunda y duradera."],
        hi: ["स्पष्ट प्रतिबद्धताओं का सप्ताह; मुर्गा रोमांस में संगठन और गंभीरता लाता है।", "आपकी सत्यनिष्ठा एक गहरे और स्थायी प्रेम संबंध का स्तंभ होगी।"],
      },
      monthly: {
        pt: ["Mês de brilho social e afetivo; o Galo coloca você no topo com sua lealdade.", "Aproveite para planejar o futuro do casal com a precisão típica do seu signo."],
        en: ["A month of social and affective brilliance; the Rooster puts you on top with your loyalty.", "Take the opportunity to plan the couple's future with the precision typical of your sign."],
        es: ["Mes de brillo social y afectivo; el Gallo te pone en la cima con tu lealtad.", "Aprovecha para planificar el futuro de la pareja con la precisión propia de tu signo."],
        hi: ["सामाजिक और भावनात्मक चमक का महीना; मुर्गा आपकी वफादारी के साथ आपको शीर्ष पर रखता है।", "अपने संकेत की विशिष्ट सटीकता के साथ जोड़े के भविष्य की योजना बनाने के अवसर का लाभ उठाएं।"],
      },
      yearly: {
        pt: ["Ano de glória romântica; a energia do Galo atrai o respeito e a admiração mútua.", "Ciclo de vitórias afetivas onde sua coragem para amar será amplamente recompensada."],
        en: ["A year of romantic glory; the Rooster's energy attracts mutual respect and admiration.", "A cycle of affective victories where your courage to love will be amply rewarded."],
        es: ["Año de gloria romántica; la energía del Gallo atrae el respeto y la admiración mutua.", "Ciclo de victorias afectivas donde tu valentía para amar será ampliamente recompensada."],
        hi: ["रोमांटिक गौरव का वर्ष; मुर्गे की ऊर्जा पारस्परिक सम्मान और प्रशंसा को आकर्षित करती है।", "भावनात्मक जीत का चक्र जहां प्यार करने के आपके साहस को भरपूर पुरस्कृत किया जाएगा।"],
      },
    },
    health: {
      daily: {
        pt: ["Sua vitalidade física pede disciplina hoje; foque na organização da rotina.", "O Galo favorece atividades que busquem a perfeição do movimento e da postura."],
        en: ["Your physical vitality calls for discipline today; focus on routine organization.", "The Rooster favors activities that seek perfection in movement and posture."],
        es: ["Tu vitalidad física pide disciplina hoy; enfócate en la organización de la rutina.", "El Gallo favorece las actividades que buscan la perfección del movimiento y la postura."],
        hi: ["आपकी शारीरिक जीवंतता आज अनुशासन की मांग करती है; दिनचर्या के संगठन पर ध्यान केंद्रित करें।", "मुर्गा उन गतिविधियों का पक्ष लेता है जो गति और मुद्रा (posture) में पूर्णता प्रदान करती हैं।"],
      },
      weekly: {
        pt: ["Semana de regeneração e ordem; seu corpo agradece o autoexcesso de cuidado.", "Aproveite para consolidar novos hábitos que tragam vigor e clareza absoluta."],
        en: ["A week of regeneration and order; your body thanks the excess of self-care.", "Take the opportunity to consolidate new habits that bring vigor and absolute clarity."],
        es: ["Semana de regeneración y orden; tu cuerpo agradece el exceso de autocuidado.", "Aprovecha para consolidar nuevos hábitos que aporten vigor y claridad absoluta."],
        hi: ["पुनर्जनन और व्यवस्था का सप्ताह; आपका शरीर स्वयं की देखभाल की अधिकता के लिए धन्यवाद देता है।", "उन नई आदतों को मजबूत करने के अवसर का लाभ उठाएं जो शक्ति और पूर्ण स्पष्टता लाती हैं।"],
      },
      monthly: {
        pt: ["Mês de bem-estar integral; a disciplina do Galo protege sua saúde contra o estresse.", "Foque em dietas equilibradas; seu organismo floresce na pontualidade e na ordem."],
        en: ["A month of integral well-being; the Rooster's discipline protects your health against stress.", "Focus on balanced diets; your body flourishes in punctuality and order."],
        es: ["Mes de bienestar integral; la disciplina del Gallo protege tu salud contra el estrés.", "Enfócate en dietas equilibradas; tu organismo florece en la puntualidad y el orden."],
        hi: ["पूर्ण कल्याण का महीना; मुर्गे का अनुशासन तनाव के खिलाफ आपके स्वास्थ्य की रक्षा करता है।", "संतुलित आहार पर ध्यान दें; आपका शरीर समय की पाबंदी और व्यवस्था में फलता-फूलता है।"],
      },
      yearly: {
        pt: ["Ano de vigor radiante; a força do Galo garante uma saúde inabalável e firme.", "Ciclo onde sua determinação em se cuidar resultará em longevidade e força divina."],
        en: ["A year of radiant vigor; the Rooster's strength guarantees unwavering and firm health.", "A cycle where your determination to take care of yourself will result in longevity and divine strength."],
        es: ["Año de vigor radiante; la fuerza del Gallo garantiza una salud inquebrantable y firme.", "Ciclo donde tu determinación por cuidarte resultará en longevidad y fuerza divina."],
        hi: ["दीप्तिमान शक्ति का वर्ष; मुर्गे की शक्ति अटूट और दृढ़ स्वास्थ्य की गारंटी देती है।", "एक चक्र जहां अपनी देखभाल करने का आपका दृढ़ संकल्प दीर्घायु और दिव्य शक्ति के रूप में परिणत होगा।"],
      },
    },
    career: {
      daily: {
        pt: ["Sua competência e detalhismo estão em destaque hoje; brilhe no seu trabalho.", "O Galo favorece a liderança direta e a cobrança por resultados impecáveis."],
        en: ["Your competence and eye for detail are in the spotlight today; shine in your work.", "The Rooster favors direct leadership and demanding flawless results."],
        es: ["Tu competencia y detallismo destacan hoy; brilla en tu trabajo.", "El Gallo favorece el liderazgo directo y la exigencia de resultados impecables."],
        hi: ["आपकी सक्षमता और विवरणों पर ध्यान आज सुर्खियों में है; अपने काम में चमकें।", "मुर्गा प्रत्यक्ष नेतृत्व और त्रुटिहीन परिणामों की मांग का पक्ष लेता है।"],
      },
      weekly: {
        pt: ["Semana de conquistas sólidas; sua organização abre caminhos para o sucesso total.", "O Galo guia seus passos profissionais com precisão e autoridade inquestionável."],
        en: ["A week of solid achievements; your organization opens paths for total success.", "The Rooster guides your professional steps with precision and unquestionable authority."],
        es: ["Semana de logros sólidos; tu organización abre caminos al éxito total.", "El Gallo guía tus pasos profesionales con precisión y autoridad incuestionable."],
        hi: ["ठोस उपलब्धियों का सप्ताह; आपका संगठन पूर्ण सफलता के लिए रास्ते खोलता है।", "मुर्गा सटीकता और निर्विवाद अधिकार के साथ आपके व्यावसायिक कदमों का मार्गदर्शन करता है।"],
      },
      monthly: {
        pt: ["Mês de reconhecimento pelo seu esforço; sua voz é ouvida com respeito absoluto.", "Use sua coragem para lutar pelo que é justo e veja sua influência crescer infinitamente."],
        en: ["A month of recognition for your effort; your voice is heard with absolute respect.", "Use your courage to fight for what is fair and watch your influence grow infinitely."],
        es: ["Mes de reconocimiento por su esfuerzo; su voz es escuchada con respeto absoluto.", "Use su valentía para luchar por lo que es justo y vea su influencia crecer infinitamente."],
        hi: ["आपके प्रयास के लिए मान्यता का महीना; आपकी आवाज़ पूर्ण सम्मान के साथ सुनी जाती है।", "न्यायसंगत के लिए लड़ने के लिए अपने साहस का उपयोग करें और अपने प्रभाव को असीम रूप से बढ़ते हुए देखें।"],
      },
      yearly: {
        pt: ["Ano de ascensão brilhante; a ambição do Galo leva sua carreira ao topo do mundo.", "Ciclo de vitórias onde seu trabalho duro e sua integridade serão celebrados."],
        en: ["A year of brilliant ascent; the Rooster's ambition takes your career to the top of the world.", "A cycle of victories where your hard work and integrity will be celebrated."],
        es: ["Año de ascenso brillante; la ambición del Gallo lleva tu carrera a la cima del mundo.", "Ciclo de victorias donde tu trabajo duro y tu integridad serán celebrados."],
        hi: ["शानदार उत्थान का वर्ष; मुर्गे की महत्वाकांक्षा आपके करियर को दुनिया के शीर्ष पर ले जाती है।", "जीत का चक्र जहां आपकी कड़ी मेहनत और अखंडता का जश्न मनाया जाएगा।"],
      },
    },
    finance: {
      daily: {
        pt: ["Dia de ordem financeira; revise suas contas com a precisão típica do Galo.", "O tesouro está na gestão correta dos seus recursos hoje; evite desperdícios."],
        en: ["Day of financial order; review your accounts with the typical precision of the Rooster.", "The treasure is in the correct management of your resources today; avoid waste."],
        es: ["Día de orden financiero; revisa tus cuentas con la precisión típica del Gallo.", "El tesoro está en la gestión correcta de tus recursos hoy; evita los desperdicios."],
        hi: ["वित्तीय व्यवस्था का दिन; मुर्गे की विशिष्ट सटीकता के साथ अपने खातों की समीक्षा करें।", "खजाना आज आपके संसाधनों के सही प्रबंधन में है; बर्बादी से बचें।"],
      },
      weekly: {
        pt: ["Semana de crescimento patrimonial seguro; sua análise fria garante bons lucros.", "O Galo protege seus investimentos mais tradicionais e rentáveis a longo prazo."],
        en: ["A week of secure asset growth; your cold analysis guarantees good profits.", "The Rooster protects your most traditional and profitable long-term investments."],
        es: ["Semana de crecimiento patrimonial seguro; tu frío análisis garantiza buenos beneficios.", "El Gallo protege tus inversiones a largo plazo más tradicionales y rentables."],
        hi: ["सुरक्षित संपत्ति वृद्धि का सप्ताह; आपका ठंडा विश्लेषण अच्छे मुनाफे की गारंटी देता है।", "मुर्गा आपके सबसे पारंपरिक और लाभदायक दीर्घकालिक निवेशों की रक्षा करता है।"],
      },
      monthly: {
        pt: ["Mês de prosperidade sólida; o dinheiro flui através da ordem e do trabalho duro.", "Aproveite para expandir seus horizontes financeiros com metas audaciosas e claras."],
        en: ["A month of solid prosperity; money flows through order and hard work.", "Take the opportunity to expand your financial horizons with bold and clear goals."],
        es: ["Mes de prosperidad sólida; el dinero fluye a través del orden y el trabajo duro.", "Aprovecha para ampliar tus horizontes financieros con metas audaces y claras."],
        hi: ["ठोस समृद्धि का महीना; व्यवस्था और कड़ी मेहनत के माध्यम से धन का प्रवाह होता है।", "साहसिक और स्पष्ट लक्ष्यों के साथ अपने वित्तीय क्षितिज का विस्तार करने के अवसर का लाभ उठाएं।"],
      },
      yearly: {
        pt: ["Ano de conquista de riqueza estável; a força do Galo atrai abundância divina.", "Ciclo onde sua disciplina financeira resultará em um futuro de paz e fartura pura."],
        en: ["A year of steady wealth conquest; the Rooster's strength attracts divine abundance.", "A cycle where your financial discipline will result in a future of peace and pure plenty."],
        es: ["Año de conquista de riqueza estable; la fuerza del Gallo atrae abundancia divina.", "Ciclo donde tu disciplina financiera resultará en un futuro de paz y abundancia pura."],
        hi: ["स्थिर धन विजय का वर्ष; मुर्गे की शक्ति दिव्य बहुतायत को आकर्षित करती है।", "एक चक्र जहां आपके वित्तीय अनुशासन के परिणामस्वरूप शांति और पूर्ण बहुतायत का भविष्य होगा।"],
      },
    },
    general: {
      daily: {
        pt: ["Dia de poder e clareza; sinta a coragem do Galo despertar sua mente hoje.", "Sua integridade será sua maior aliada para resolver qualquer desafio com êxito."],
        en: ["A day of power and clarity; feel the Rooster's courage awaken your mind today.", "Your integrity will be your greatest ally to resolve any challenge successfully."],
        es: ["Día de poder y claridad; siente la valentía del Gallo despertar tu mente hoy.", "Tu integridad será tu mayor aliada para resolver cualquier desafío con éxito."],
        hi: ["शक्ति और स्पष्टता का दिन; आज मुर्गे के साहस को अपने मन को जगाते हुए महसूस करें।", "किसी भी चुनौती को सफलतापूर्वक हल करने के लिए आपकी अखंडता आपकी सबसे बड़ी सहयोगी होगी।"],
      },
      weekly: {
        pt: ["Semana de brilho e reconhecimento; o Galo mostra ao mundo sua verdadeira voz.", "Seja o exemplo de retidão e coragem em todos os ambientes que frequentar."],
        en: ["A week of brilliance and recognition; the Rooster shows the world your true voice.", "Be the example of uprightness and courage in all environments you frequent."],
        es: ["Semana de brillo y reconocimiento; el Gallo muestra al mundo tu verdadera voz.", "Sé el ejemplo de rectitud y valentía en todos los ambientes que frecuentes."],
        hi: ["चमक और मान्यता का सप्ताह; मुर्गा दुनिया को आपकी असली आवाज़ दिखाता है।", "आप जिन भी वातावरणों में जाते हैं, वहां सत्यनिष्ठा और साहस का उदाहरण बनें।"],
      },
      monthly: {
        pt: ["Mês de expansão e triunfo pessoal; o Galo amplia sua influência soberana.", "Cada palavra sua carrega o peso da verdade; use-a para construir o sucesso eterno."],
        en: ["A month of expansion and personal triumph; the Rooster broadens your sovereign influence.", "Each word of yours carries the weight of truth; use it to build eternal success."],
        es: ["Mes de expansión y triunfo personal; el Gallo amplía tu influencia soberana.", "Cada palabra tuya lleva el peso de la verdad; úsala para construir el éxito eterno."],
        hi: ["विस्तार और व्यक्तिगत जीत का महीना; मुर्गा आपके संप्रभु प्रभाव को बढ़ाता है।", "आपका हर शब्द सत्य का भार वहन करता है; शाश्वत सफलता बनाने के लिए इसका उपयोग करें।"],
      },
      yearly: {
        pt: ["Ano de glória inigualável; a sabedoria do Galo conduz você ao topo da glória.", "Ciclo de vitórias memoráveis onde seu nome será celebrado por sua força única."],
        en: ["A year of unrivaled glory; the Rooster's wisdom leads you to the peak of glory.", "A cycle of memorable victories where your name will be celebrated for its unique strength."],
        es: ["Año de gloria inigualable; la sabiduría del Gallo te conduce a la cima de la gloria.", "Ciclo de victorias memorables donde tu nombre será celebrado por su fuerza única."],
        hi: ["बेजोड़ गौरव का वर्ष; मुर्गे की बुद्धिमत्ता आपको गौरव के शिखर तक ले जाती है।", "यादगार जीत का चक्र जहां आपके नाम को उसकी अद्वितीय शक्ति के लिए मनाया जाएगा।"],
      },
    },
  },
  dog: {
    love: {
      daily: {
        pt: ["Sua lealdade e afeto são seus maiores tesouros hoje; cultive a união.", "O Cão favorece a proteção de quem você ama e a fidelidade emocional."],
        en: ["Your loyalty and affection are your greatest treasures today; cultivate union.", "The Dog favors the protection of those you love and emotional fidelity."],
        es: ["Tu lealtad y afecto son tus mayores tesoros hoy; cultiva la unión.", "El Perro favorece la protección de quienes amas y la fidelidad emocional."],
        hi: ["आपकी वफादारी और स्नेह आज आपके सबसे बड़े खजाने हैं; मिलन विकसित करें।", "कुत्ता उन लोगों की रक्षा और भावनात्मक वफादारी का पक्ष लेता है जिन्हें आप प्यार करते हैं।"],
      },
      weekly: {
        pt: ["Semana de segurança afetiva; o Cão traz estabilidade e confiança mútua.", "Sua natureza protetora fortalecerá os laços com seu parceiro de forma profunda."],
        en: ["A week of affective security; the Dog brings stability and mutual trust.", "Your protective nature will strengthen the bonds with your partner deeply."],
        es: ["Semana de seguridad afectiva; el Perro aporta estabilidad y confianza mutua.", "Tu naturaleza protectora fortalecerá profundamente los vínculos con tu pareja."],
        hi: ["भावनात्मक सुरक्षा का सप्ताह; कुत्ता स्थिरता और आपसी विश्वास लाता है।", "आपका सुरक्षात्मक स्वभाव आपके साथी के साथ संबंधों को गहराई से मजबूत करेगा।"],
      },
      monthly: {
        pt: ["Mês de conexões verdadeiras; o Cão valoriza o amor honesto e o cuidado diário.", "Aproveite para criar momentos de ternura que se tornarão memórias eternas."],
        en: ["A month of true connections; the Dog values honest love and daily care.", "Take the opportunity to create moments of tenderness that will become eternal memories."],
        es: ["Mes de conexiones verdaderas; el Perro valora el amor honesto y el cuidado diario.", "Aprovecha para crear momentos de ternura que se convertirán en memorias eternas."],
        hi: ["सच्चे संबंधों का महीना; कुत्ता ईमानदार प्यार और दैनिक देखभाल को महत्व देता है।", "कोमलता के क्षण बनाने के अवसर का लाभ उठाएं जो शाश्वत यादें बन जाएंगे।"],
      },
      yearly: {
        pt: ["Ano de florescimento emocional; a lealdade do Cão traz paz e harmonia ao lar.", "Ciclo onde o compromisso será a base de uma felicidade sólida e duradoura."],
        en: ["A year of emotional flourishing; the Dog's loyalty brings peace and harmony to the home.", "A cycle where commitment will be the basis of a solid and lasting happiness."],
        es: ["Año de florecimiento emocional; la lealtad del Perro trae paz y armonía al hogar.", "Ciclo donde el compromiso será la base de una felicidad sólida y duradera."],
        hi: ["भावनात्मक प्रफुल्लता का वर्ष; कुत्ते की वफादारी घर में शांति और सद्भाव लाती है।", "एक चक्र जहां प्रतिबद्धता ठोस और स्थायी खुशी का आधार होगी।"],
      },
    },
    health: {
      daily: {
        pt: ["Sua energia pede vigilância e cuidado; foque no equilíbrio do seu fluxo vital.", "O Cão favorece atividades que tragam segurança física e bem-estar emocional."],
        en: ["Your energy calls for vigilance and care; focus on the balance of your vital flow.", "The Dog favors activities that bring physical security and emotional well-being."],
        es: ["Tu energía pide vigilancia y cuidado; enfócate en el equilibrio de tu flujo vital.", "El Perro favorece las actividades que aportan seguridad física y bienestar emocional."],
        hi: ["आपकी ऊर्जा सतर्कता और देखभाल की मांग करती है; अपने महत्वपूर्ण प्रवाह के संतुलन पर ध्यान केंद्रित करें।", "कुत्ता उन गतिविधियों का पक्ष लेता है जो शारीरिक सुरक्षा और भावनात्मक कल्याण लाती हैं।"],
      },
      weekly: {
        pt: ["Semana de regeneração e força interior; o Cão guia você para o autocuidado constante.", "Busque o contato com animais e o ar livre; eles renovam sua vitalidade sagrada."],
        en: ["A week of regeneration and inner strength; the Dog guides you toward constant self-care.", "Seek contact with animals and the outdoors; they renew your sacred vitality."],
        es: ["Semana de regeneración y fuerza interior; el Perro te guía hacia el autocuidado constante.", "Busca el contacto con los animales y el aire libre; renuevan tu vitalidad sagrada."],
        hi: ["पुनर्जनन और आंतरिक शक्ति का सप्ताह; कुत्ता आपको निरंतर आत्म-देखभाल की ओर ले जाता है।", "जानवरों और बाहरी हवा के साथ संपर्क खोजें; वे आपकी पवित्र जीवंतता को नवीनीकृत करते हैं।"],
      },
      monthly: {
        pt: ["Mês de bem-estar integral; a proteção do Cão envolve sua saúde contra o cansaço.", "Cuide da sua alimentação com foco na simplicidade e na nutrição verdadeira."],
        en: ["A month of integral well-being; the Dog's protection wraps your health against fatigue.", "Take care of your diet with a focus on simplicity and true nutrition."],
        es: ["Mes de bienestar integral; la protección del Perro envuelve tu salud contra el cansancio.", "Cuida tu alimentación centrándote en la sencillez y la nutrición verdadera."],
        hi: ["संपूर्ण कल्याण का महीना; कुत्ते की सुरक्षा आपके स्वास्थ्य को थकान से बचाती है।", "सादगी और वास्तविक पोषण पर ध्यान केंद्रित करते हुए अपने आहार का ध्यान रखें।"],
      },
      yearly: {
        pt: ["Ano de vigor renovado; a lealdade à sua própria saúde garantirá uma força divina.", "Ciclo onde sua disciplina em se cuidar resultará em longevidade e vigor absoluto."],
        en: ["A year of renewed vigor; loyalty to your own health will guarantee divine strength.", "A cycle where your discipline in taking care of yourself will result in longevity and absolute vigor."],
        es: ["Año de vigor renovado; la lealtad a su propia salud le garantizará una fuerza divina.", "Ciclo donde su disciplina en cuidarse resultará en longevidad y vigor absoluto."],
        hi: ["नवीकृत शक्ति का वर्ष; अपने स्वयं के स्वास्थ्य के प्रति वफादारी दिव्य शक्ति की गारंटी देगी।", "एक चक्र जहां अपनी देखभाल करने में आपका अनुशासन दीर्घायु और पूर्ण शक्ति के रूप में परिणत होगा।"],
      },
    },
    career: {
      daily: {
        pt: ["Sua honestidade e dedicação são apreciadas hoje; brilhe pela sua competência.", "O Cão favorece o trabalho árduo e a lealdade aos objetivos da sua equipe."],
        en: ["Your honesty and dedication are appreciated today; shine through your competence.", "The Dog favors hard work and loyalty to your team's goals."],
        es: ["Tu honestidad y dedicación son apreciadas hoy; brilla por tu competencia.", "El Perro favorece el trabajo duro y la lealtad a los objetivos de tu equipo."],
        hi: ["आपकी ईमानदारी और समर्पण की आज सराहना की जाती है; अपनी सक्षमता के माध्यम से चमकें।", "कुत्ता कड़ी मेहनत और आपकी टीम के लक्ष्यों के प्रति वफादारी का पक्ष लेता है।"],
      },
      weekly: {
        pt: ["Semana de progressos seguros; sua natureza confiável atrai novas responsabilidades.", "O Cão guia seus passos profissionais com retidão e eficácia inquestionável."],
        en: ["A week of secure progress; your reliable nature attracts new responsibilities.", "The Dog guides your professional steps with uprightness and unquestionable effectiveness."],
        es: ["Semana de progresos seguros; tu naturaleza confiable atrae nuevas responsabilidades.", "El Perro guía tus pasos profesionales con rectitud y eficacia incuestionable."],
        hi: ["सुरक्षित प्रगति का सप्ताह; आपका विश्वसनीय स्वभाव नई जिम्मेदारियों को आकर्षित करता है।", "कुत्ता सत्यनिष्ठा और निर्विवाद प्रभावशीलता के साथ आपके व्यावसायिक कदमों का मार्गदर्शन करता है।"],
      },
      monthly: {
        pt: ["Mês de reconhecimento pelo seu valor; sua voz é ouvida com respeito profundo.", "Use sua coragem para defender o que é justo e veja sua influência crescer infinitamente."],
        en: ["A month of recognition for your value; your voice is heard with deep respect.", "Use your courage to defend what is fair and watch your influence grow infinitely."],
        es: ["Mes de reconocimiento por su valor; su voz es escuchada con un respeto profundo.", "Utilice su valentía para defender lo que es justo y vea cómo su influencia crece infinitamente."],
        hi: ["आपके मूल्य के लिए मान्यता का महीना; आपकी आवाज़ गहरे सम्मान के साथ सुनी जाती है।", "न्यायसंगत के बचाव के लिए अपने साहस का उपयोग करें और अपने प्रभाव को असीम रूप से बढ़ते हुए देखें।"],
      },
      yearly: {
        pt: ["Ano de ascensão sólida; a integridade do Cão leva sua carreira a novos patamares.", "Ciclo onde seu trabalho ético e sua lealdade serão recompensados com sucesso total."],
        en: ["A year of solid ascent; the Dog's integrity takes your career to new heights.", "A cycle where your ethical work and loyalty will be rewarded with total success."],
        es: ["Año de ascenso sólido; la integridad del Perro lleva tu carrera a nuevos niveles.", "Ciclo donde tu trabajo ético y tu lealtad serán recompensados con el éxito total."],
        hi: ["ठोस उत्थान का वर्ष; कुत्ते की अखंडता आपके करियर को नई ऊंचाइयों पर ले जाती है।", "एक चक्र जहां आपके नैतिक कार्य और वफादारी को पूर्ण सफलता के साथ पुरस्कृत किया जाएगा।"],
      },
    },
    finance: {
      daily: {
        pt: ["Dia de segurança financeira; proteja seus recursos com a vigilância do Cão.", "O tesouro está na gestão honesta e prudente do seu patrimônio hoje."],
        en: ["Day of financial security; protect your resources with the Dog's vigilance.", "The treasure is in the honest and prudent management of your assets today."],
        es: ["Día de seguridad financiera; protege tus recursos con la vigilancia del Perro.", "El tesoro está en la gestión honesta y prudente de tu patrimonio hoy."],
        hi: ["वित्तीय सुरक्षा का दिन; कुत्ते की सतर्कता के साथ अपने संसाधनों की रक्षा करें।", "खजाना आज आपकी संपत्ति के ईमानदार और विवेकपूर्ण प्रबंधन में है।"],
      },
      weekly: {
        pt: ["Semana de crescimento patrimonial estável; seu senso de dever garante bons lucros.", "O Cão protege seus investimentos ligados à segurança e ao bem-estar familiar."],
        en: ["A week of steady asset growth; your sense of duty guarantees good profits.", "The Dog protects your investments linked to security and family well-being."],
        es: ["Semana de crecimiento patrimonial estable; tu sentido del deber garantiza buenos beneficios.", "El Perro protege tus inversiones ligadas a la seguridad y el bienestar familiar."],
        hi: ["स्थिर संपत्ति वृद्धि का सप्ताह; आपके कर्तव्य की भावना अच्छे मुनाफे की गारंटी देती है।", "कुत्ता सुरक्षा और पारिवारिक कल्याण से जुड़े आपके निवेश की रक्षा करता है।"],
      },
      monthly: {
        pt: ["Mês de prosperidade honrada; o dinheiro flui através da dedicação e da ordem.", "Aproveite para consolidar suas reservas financeiras com foco no futuro tranquilo."],
        en: ["A month of honored prosperity; money flows through dedication and order.", "Take the opportunity to consolidate your financial reserves with a focus on a quiet future."],
        es: ["Mes de prosperidad honrada; el dinero fluye a través de la dedicación y el orden.", "Aprovecha para consolidar tus reservas financieras centrándote en un futuro tranquilo."],
        hi: ["सम्मानित समृद्धि का महीना; समर्पण और व्यवस्था के माध्यम से धन का प्रवाह होता है।", "शांत भविष्य पर ध्यान केंद्रित करते हुए अपने वित्तीय भंडार को मजबूत करने के अवसर का लाभ उठाएं।"],
      },
      yearly: {
        pt: ["Ano de conquista de riqueza duradoura; a força do Cão atrai abundância sólida.", "Ciclo onde sua lealdade aos seus princípios financeiros resultará em fartura absoluta."],
        en: ["A year of lasting wealth conquest; the Dog's strength attracts solid abundance.", "A cycle where your loyalty to your financial principles will result in absolute plenty."],
        es: ["Año de conquista de riqueza duradera; la fuerza del Perro atrae abundancia sólida.", "Ciclo donde su lealtad a sus principios financieros resultará en una abundancia absoluta."],
        hi: ["स्थायी धन विजय का वर्ष; कुत्ते की शक्ति ठोस बहुतायत को आकर्षित करती है।", "एक चक्र जहां आपके वित्तीय सिद्धांतों के प्रति आपकी वफादारी पूर्ण प्रचुरता का परिणाम देगी।"],
      },
    },
    general: {
      daily: {
        pt: ["Dia de força e proteção; sinta o espírito do Cão guiando sua vontade hoje.", "Sua integridade será seu escudo contra qualquer adversidade; aja com honra."],
        en: ["A day of strength and protection; feel the Dog's spirit guiding your will today.", "Your integrity will be your shield against any adversity; act with honor."],
        es: ["Día de fuerza y protección; siente el espíritu del Perro guiando tu voluntad hoy.", "Tu integridad será tu escudo contra cualquier adversidad; actúa con honor."],
        hi: ["शक्ति और सुरक्षा का दिन; आज कुत्ते की आत्मा को अपनी इच्छा का मार्गदर्शन करते हुए महसूस करें।", "आपकी अखंडता किसी भी प्रतिकूलता के खिलाफ आपकी ढाल होगी; सम्मान के साथ कार्य करें।"],
      },
      weekly: {
        pt: ["Semana de harmonia social; sua aura de lealdade atrai novas e profundas amizades.", "O Cão guia você para a resolução de pendências com coragem e verdade absoluta."],
        en: ["A week of social harmony; your aura of loyalty attracts new and deep friendships.", "The Dog guides you to the resolution of pending issues with courage and absolute truth."],
        es: ["Semana de armonía social; tu aura de lealtad atrae nuevas y profundas amistades.", "El Perro te guía hacia la resolución de pendientes con valentía y verdad absoluta."],
        hi: ["सामाजिक सद्भाव का सप्ताह; आपकी वफादारी का आभामंडल नई और गहरी मित्रता को आकर्षित करता है।", "कुत्ता साहस और पूर्ण सत्य के साथ लंबित मुद्दों के समाधान के लिए आपका मार्गदर्शन करता है।"],
      },
      monthly: {
        pt: ["Mês de expansão e proteção pessoal; o Cão amplia sua influência e seu porto seguro.", "Valorize a verdade acima de tudo; sua alma se fortalece no brilho da honestidade."],
        en: ["A month of expansion and personal protection; the Dog broadens your influence and your safe harbor.", "Value truth above all; your soul is strengthened in the glow of honesty."],
        es: ["Mes de expansión y protección personal; el Perro amplía tu influencia y tu puerto seguro.", "Valora la verdad por encima de todo; tu alma se fortalece en el brillo de la honestidad."],
        hi: ["विस्तार और व्यक्तिगत सुरक्षा का महीना; कुत्ता आपके प्रभाव और आपके सुरक्षित आश्रय को बढ़ाता है।", "सत्य को सबसे ऊपर महत्व दें; आपकी आत्मा ईमानदारी की चमक में मजबूत होती है।"],
      },
      yearly: {
        pt: ["Ano de glória por meio da virtude; a sabedoria do Cão conduz seu destino sagrado.", "Ciclo de vitórias memoráveis onde seu caráter será exaltado por todos ao seu redor."],
        en: ["A year of glory through virtue; the Dog's wisdom conducts your sacred destiny.", "A cycle of memorable victories where your character will be exalted by everyone around you."],
        es: ["Año de gloria a través de la virtud; la sabiduría del Perro guía su destino sagrado.", "Ciclo de victorias memorables donde su carácter será exaltado por todos los que le rodean."],
        hi: ["पुण्य के माध्यम से गौरव का वर्ष; कुत्ते की बुद्धिमत्ता आपके पवित्र भाग्य का संचालन करती है।", "यादगार जीत का चक्र जहां आपके चरित्र की आपके आस-पास के सभी लोगों द्वारा प्रशंसा की जाएगी।"],
      },
    },
  },
  pig: {
    love: {
      daily: {
        pt: ["Sua natureza generosa e alegre atrai o amor hoje; celebre a vida a dois.", "O Porco favorece a abundância de afeto e a busca pelo prazer compartilhado."],
        en: ["Your generous and joyful nature attracts love today; celebrate life as a couple.", "The Pig favors abundance of affection and the pursuit of shared pleasure."],
        es: ["Tu naturaleza generosa y alegre atrae el amor hoy; celebra la vida en pareja.", "El Cerdo favorece la abundancia de afecto y la búsqueda del placer compartido."],
        hi: ["आपका उदार और आनंदमयी स्वभाव आज प्यार को आकर्षित करता है; एक जोड़े के रूप में जीवन का जश्न मनाएं।", "सुअर स्नेह की बहुतायत और साझा खुशी की खोज का पक्ष लेता है।"],
      },
      weekly: {
        pt: ["Semana de harmonia e prazer; o Porco traz celebração e doçura ao romance.", "Sua sinceridade e acolhimento fortalecerão os laços afetivos com seu parceiro."],
        en: ["A week of harmony and pleasure; the Pig brings celebration and sweetness to romance.", "Your sincerity and welcome will strengthen the emotional bonds with your partner."],
        es: ["Semana de armonía y placer; el Cerdo aporta celebración y dulzura al romance.", "Tu sinceridad y acogida fortalecerán los vínculos afectivos con tu pareja."],
        hi: ["सद्भाव और आनंद का सप्ताह; सुअर रोमांस में उत्सव और मधुरता लाता है।", "आपकी ईमानदारी और स्वागत आपके साथी के साथ भावनात्मक संबंधों को मजबूत करेगा।"],
      },
      monthly: {
        pt: ["Mês de florescimento emocional; o Porco valoriza a paz no lar e a alegria do amor.", "Aproveite para criar momentos de luxo e conforto que nutram sua alma e seu laço."],
        en: ["A month of emotional flourishing; the Pig values peace at home and the joy of love.", "Take the opportunity to create moments of luxury and comfort that nourish your soul and your bond."],
        es: ["Mes de florecimiento emocional; el Cerdo valora la paz en el hogar y la alegría del amor.", "Aprovecha para crear momentos de lujo y confort que nutran tu alma y tu vínculo."],
        hi: ["भावनात्मक प्रफुल्लता का महीना; सुअर घर की शांति और प्यार की खुशी को महत्व देता है।", "विलासिता और आराम के क्षण बनाने के अवसर का लाभ उठाएं जो आपकी आत्मा और आपके बंधन को पोषण दें।"],
      },
      yearly: {
        pt: ["Ano de prosperidade amorosa; a doçura do Porco traz felicidade plena ao seu coração.", "Ciclo onde a abundância de sentimentos será a base de uma vida a dois radiante."],
        en: ["A year of romantic prosperity; the Pig's sweetness brings full happiness to your heart.", "A cycle where the abundance of feelings will be the basis of a radiant life as a couple."],
        es: ["Año de prosperidad amorosa; la dulzura del Cerdo trae plena felicidad a tu corazón.", "Ciclo donde la abundancia de sentimientos será la base de una vida en pareja radiante."],
        hi: ["प्रेमपूर्ण समृद्धि का वर्ष; सुअर की मिठास आपके हृदय में पूर्ण खुशी लाती है।", "एक चक्र जहां भावनाओं की प्रचुरता एक जीवंत युगल जीवन का आधार होगी।"],
      },
    },
    health: {
      daily: {
        pt: ["Sua energia pede nutrição e prazer; foque no equilíbrio do seu fluxo vital hoje.", "O Porco favorece atividades que tragam relaxamento e satisfação corporal."],
        en: ["Your energy calls for nourishment and pleasure; focus on the balance of your vital flow today.", "The Pig favors activities that bring relaxation and corporal satisfaction."],
        es: ["Tu energía pide nutrición y placer; enfócate en el equilibrio de tu flujo vital hoy.", "El Cerdo favorece las actividades que aportan relajación y satisfacción corporal."],
        hi: ["आपकी ऊर्जा पोषण और आनंद की मांग करती है; आज अपने महत्वपूर्ण प्रवाह के संतुलन पर ध्यान केंद्रित करें।", "सुअर उन गतिविधियों का पक्ष लेता है जो विश्राम और शारीरिक संतुष्टि लाती हैं।"],
      },
      weekly: {
        pt: ["Semana de regeneração e alegria; o Porco guia você para o equilíbrio e o autocuidado.", "Busque momentos de lazer e descanso; eles são essenciais para manter seu vigor divino."],
        en: ["A week of regeneration and joy; the Pig guides you toward balance and self-care.", "Seek moments of leisure and rest; they are essential to maintain your divine vigor."],
        es: ["Semana de regeneración y alegría; el Cerdo te guía hacia el equilibrio y el autocuidado.", "Busca momentos de ocio y descanso; son esenciales para mantener tu vigor divino."],
        hi: ["पुनर्जनन और खुशी का सप्ताह; सुअर आपको संतुलन और आत्म-देखभाल की ओर ले जाता है।", "फ़ुरसत और आराम के क्षण खोजें; वे आपकी दिव्य शक्ति को बनाए रखने के लिए आवश्यक हैं।"],
      },
      monthly: {
        pt: ["Mês de bem-estar integral; a proteção do Porco envolve sua saúde contra o estresse.", "Cuide da sua alimentação com foco na qualidade e no prazer de nutrir seu corpo."],
        en: ["A month of integral well-being; the Pig's protection wraps your health against stress.", "Take care of your diet with a focus on quality and the pleasure of nourishing your body."],
        es: ["Mes de bienestar integral; la protección del Cerdo envuelve tu salud contra el estrés.", "Cuida tu alimentación centrándote en la calidad y en el placer de nutrir tu cuerpo."],
        hi: ["संपूर्ण कल्याण का महीना; सुअर की सुरक्षा आपके स्वास्थ्य को तनाव से बचाती है।", "गुणवत्ता और अपने शरीर को पोषण देने की खुशी पर ध्यान केंद्रित करते हुए अपने आहार का ध्यान रखें।"],
      },
      yearly: {
        pt: ["Ano de vigor restaurado; a sabedoria do Porco protege sua vitalidade e sua paz.", "Ciclo onde sua determinação em desfrutar a vida com saúde resultará em longevidade."],
        en: ["A year of restored vigor; the Pig's wisdom protects your vitality and peace.", "A cycle where your determination to enjoy life with health will result in longevity."],
        es: ["Año de vigor restaurado; la sabiduría del Cerdo protege su vitalidad y su paz.", "Ciclo donde su determinación por disfrutar la vida con salud resultará en longevidade."],
        hi: ["बहाल शक्ति का वर्ष; सुअर की बुद्धिमत्ता आपकी जीवन शक्ति और शांति की रक्षा करती है।", "एक चक्र जहां स्वास्थ्य के साथ जीवन का आनंद लेने का आपका दृढ़ संकल्प दीर्घायु के रूप में परिणत होगा।"],
      },
    },
    career: {
      daily: {
        pt: ["Sua honestidade e espírito colaborativo abrem portas hoje; brilhe pela sua verdade.", "O Porco favorece o trabalho harmonioso e o sucesso por meio da generosidade."],
        en: ["Your honesty and collaborative spirit open doors today; shine through your truth.", "The Pig favors harmonious work and success through generosity."],
        es: ["Tu honestidad y espíritu colaborativo abren puertas hoy; brilla por tu verdad.", "El Cerdo favorece el trabajo armonioso y el éxito a través de la generosidad."],
        hi: ["आपकी ईमानदारी और सहयोगात्मक भावना आज दरवाजे खोलती है; अपनी सच्चाई के माध्यम से चमकें।", "सुअर सामंजस्यपूर्ण कार्य और उदारता के माध्यम से सफलता का पक्ष लेता है।"],
      },
      weekly: {
        pt: ["Semana de progressos estáveis; sua natureza confiável atrai novas oportunidades de sucesso.", "O Porco guia seus passos profissionais com bonomia e eficácia inquestionável."],
        en: ["A week of steady progress; your reliable nature attracts new opportunities for success.", "The Pig guides your professional steps with kindness and unquestionable effectiveness."],
        es: ["Semana de progresos estables; su naturaleza confiable atrae nuevas oportunidades de éxito.", "El Cerdo guía sus pasos profesionales con bonomia y eficacia incuestionable."],
        hi: ["स्थिर प्रगति का सप्ताह; आपका विश्वसनीय स्वभाव सफलता के नए अवसरों को आकर्षित करता है।", "सुअर दयालुता और निर्विवाद प्रभावशीलता के साथ आपके व्यावसायिक कदमों का मार्गदर्शन करता है।"],
      },
      monthly: {
        pt: ["Mês de reconhecimento pelo seu talento; sua voz é ouvida com respeito e admiração.", "Use sua sabedoria para mediar conflitos e veja sua influência crescer infinitamente."],
        en: ["A month of recognition for your talent; your voice is heard with respect and admiration.", "Use your wisdom to mediate conflicts and watch your influence grow infinitely."],
        es: ["Mes de reconocimiento por tu talento; tu voz es escuchada con respeto y admiración.", "Usa tu sabiduría para mediar en los conflictos y observa cómo crece tu influencia infinitamente."],
        hi: ["आपकी प्रतिभा के लिए मान्यता का महीना; आपकी आवाज़ सम्मान और प्रशंसा के साथ सुनी जाती है।", "संघर्षों की मध्यस्थता करने के लिए अपनी बुद्धिमत्ता का उपयोग करें और अपने प्रभाव को असीम रूप से बढ़ते हुए देखें।"],
      },
      yearly: {
        pt: ["Ano de ascensão brilhante; a abundância do Porco leva sua carreira ao topo do sucesso.", "Ciclo de realizações onde sua integridade e seu esforço serão amplamente celebrados."],
        en: ["A year of brilliant ascent; the Pig's abundance takes your career to the peak of success.", "A cycle of achievements where your integrity and effort will be widely celebrated."],
        es: ["Año de ascenso brillante; la abundancia del Cerdo lleva tu carrera a la cima del éxito.", "Ciclo de logros donde tu integridad y tu esfuerzo serán ampliamente celebrados."],
        hi: ["शानदार उत्थान का वर्ष; सुअर की प्रचुरता आपके करियर को सफलता के शिखर पर ले जाती है।", "उपलब्धियों का चक्र जहां आपकी अखंडता और प्रयास का व्यापक रूप से जश्न मनाया जाएगा।"],
      },
    },
    finance: {
      daily: {
        pt: ["Dia de sorte financeira; a prosperidade flui através da sua atitude positiva hoje.", "O Porco favorece ganhos inesperados e o sucesso em empreendimentos generosos."],
        en: ["Day of financial luck; prosperity flows through your positive attitude today.", "The Pig favors unexpected gains and success in generous ventures."],
        es: ["Día de suerte financiera; la prosperidad fluye a través de tu actitud positiva hoy.", "El Cerdo favorece las ganancias inesperadas y el éxito en emprendimientos generosos."],
        hi: ["वित्तीय भाग्य का दिन; समृद्धि आज आपके सकारात्मक दृष्टिकोण के माध्यम से बहती है।", "सुअर अप्रत्याशित लाभ और उदार उपक्रमों में सफलता का पक्ष लेता है।"],
      },
      weekly: {
        pt: ["Semana de expansão de recursos; sua natureza atrai riqueza e novas fontes de renda.", "O Porco protege seus investimentos e abençoa seus planos de abundância material."],
        en: ["A week of resource expansion; your nature attracts wealth and new sources of income.", "The Pig protects your investments and blesses your plans for material abundance."],
        es: ["Semana de expansión de recursos; tu naturaleza atrae riqueza y nuevas fuentes de ingresos.", "El Cerdo protege tus inversiones y bendice tus planes de abundancia material."],
        hi: ["संसाधनों के विस्तार का सप्ताह; आपका स्वभाव धन और आय के नए स्रोतों को आकर्षित करता है।", "सुअर आपके निवेश की रक्षा करता है और भौतिक बहुतायत के लिए आपकी योजनाओं को आशीर्वाद देता है।"],
      },
      monthly: {
        pt: ["Mês de lucros tangíveis; o dinheiro flui através da alegria de receber e partilhar.", "Aproveite para consolidar sua fortuna com foco na harmonia e na paz futura."],
        en: ["A month of tangible profits; money flows through the joy of receiving and sharing.", "Take the opportunity to consolidate your fortune with a focus on harmony and future peace."],
        es: ["Mes de beneficios tangibles; el dinero fluye a través de la alegría de recibir y compartir.", "Aprovecha para consolidar tu fortuna centrándote en la armonía y la paz futura."],
        hi: ["मूर्त लाभ का महीना; धन प्राप्त करने और साझा करने की खुशी के माध्यम से बहता है।", "सद्भाव और भविष्य की शांति पर ध्यान केंद्रित करते हुए अपने भाग्य को मजबूत करने के अवसर का लाभ उठाएं।"],
      },
      yearly: {
        pt: ["Ano de conquista de abundância plena; a força do Porco atrai riqueza divina sólida.", "Ciclo onde sua generosidade e sabedoria financeira resultarão em glória material real."],
        en: ["A year of full abundance conquest; the Pig's strength attracts solid divine wealth.", "A cycle where your generosity and financial wisdom will result in real material glory."],
        es: ["Año de conquista de plena abundancia; la fuerza del Cerdo atrae riqueza divina sólida.", "Ciclo donde tu generosidad y sabiduría financiera resultarán en gloria material real."],
        hi: ["पूर्ण बहुतायत विजय का वर्ष; सुअर की शक्ति ठोस दिव्य धन को आकर्षित करती है।", "एक चक्र जहां आपकी उदारता और वित्तीय बुद्धिमत्ता वास्तविक भौतिक गौरव में परिणत होगी।"],
      },
    },
    general: {
      daily: {
        pt: ["Dia de alegria e poder; sinta a energia do Porco elevar seu espírito e sua vontade.", "Sua integridade e bonomia serão suas maiores aliadas para vencer hoje com brilho."],
        en: ["A day of joy and power; feel the Pig's energy lift your spirit and will.", "Your integrity and kindness will be your greatest allies to win today with brilliance."],
        es: ["Día de alegría y poder; siente la energía del Cerdo elevar tu espíritu y tu voluntad.", "Tu integridad y bonomia serán tus mayores aliadas para vencer hoy con brillo."],
        hi: ["खुशी और शक्ति का दिन; सुअर की ऊर्जा को अपनी आत्मा और इच्छा को ऊपर उठाते हुए महसूस करें।", "आज चमक के साथ जीतने के लिए आपकी अखंडता और दयालुता आपकी सबसे बड़ी सहयोगी होगी।"],
      },
      weekly: {
        pt: ["Semana de harmonia e celebração; o Porco abre seus caminhos para a luz e para a paz.", "Seja o exemplo de felicidade e generosidade em todos os ambientes que frequentar."],
        en: ["A week of harmony and celebration; the Pig opens your paths to light and peace.", "Be the example of happiness and generosity in all environments you frequent."],
        es: ["Semana de armonía y celebración; el Cerdo abre tus caminos a la luz y a la paz.", "Sé el ejemplo de felicidad y generosidad en todos los ambientes que frecuentes."],
        hi: ["सद्भाव और उत्सव का सप्ताह; सुअर प्रकाश और शांति के लिए आपके रास्ते खोलता है।", "आप जिन भी वातावरणों में जाते हैं, वहां खुशी और उदारता का उदाहरण बनें।"],
      },
      monthly: {
        pt: ["Mês de expansão existencial; o Porco amplia sua influência e seu bem-estar absoluto.", "Sinta a abundância divina percorrer sua jornada; o sucesso está garantido pela sua fé."],
        en: ["A month of existential expansion; the Pig broadens your influence and absolute well-being.", "Feel divine abundance run through your journey; success is guaranteed by your faith."],
        es: ["Mes de expansión existencial; el Cerdo amplía tu influencia y tu bienestar absoluto.", "Siente la abundancia divina recorrer tu jornada; el éxito está garantizado por tu fe."],
        hi: ["अस्तित्वगत विस्तार का महीना; सुअर आपके प्रभाव और पूर्ण कल्याण का विस्तार करता है।", "अपनी यात्रा के माध्यम से दिव्य बहुतायत को महसूस करें; सफलता आपकी आस्था से सुनिश्चित होती है।"],
      },
      yearly: {
        pt: ["Ano de glória suprema; a sabedoria do Porco conduz você ao destino prometido.", "Ciclo de vitórias memoráveis onde sua natureza bondosa será celebrada como ouro puro."],
        en: ["A year of supreme glory; the Pig's wisdom leads you to the promised destiny.", "A cycle of memorable victories where your kind nature will be celebrated as pure gold."],
        es: ["Año de gloria suprema; la sabiduría del Cerdo te conduce al destino prometido.", "Ciclo de victorias memorables donde tu naturaleza bondadosa será celebrada como oro puro."],
        hi: ["परम गौरव का वर्ष; सुअर की बुद्धिमत्ता आपको प्रतिज्ञाबद्ध भाग्य की ओर ले जाती है।", "यादगार जीत का चक्र जहां आपके दयालु स्वभाव को शुद्ध सोने के रूप में मनाया जाएगा।"],
      },
    },
  },
};

/**
 * Retorna um texto de horóscopo chinês aleatório para a categoria e período especificados
 */
export function getChineseHoroscopeText(
  animal: string,
  category: ChineseHoroscopeCategory,
  period: ChineseHoroscopePeriod,
  lang: Language = 'en'
): string {
  const animalKey = animal.toLowerCase();
  const animalTexts = CHINESE_HOROSCOPE_TEXTS[animalKey];
  
  if (!animalTexts) return "";
  
  const categoryTexts = animalTexts[category];
  if (!categoryTexts) return "";
  
  const periodTexts = categoryTexts[period];
  if (!periodTexts) return "";
  
  const langTexts = periodTexts[lang] as string[] || periodTexts['en'] as string[] || [];
  if (langTexts.length === 0) return "";
  
  // Retorna um texto aleatório da lista
  const randomIndex = Math.floor(Math.random() * langTexts.length);
  return langTexts[randomIndex];
}

/**
 * Retorna todos os textos de horóscopo chinês para um animal e período
 */
export function getAllChineseHoroscopeTexts(
  animal: string,
  period: ChineseHoroscopePeriod,
  lang: Language = 'en'
): Record<ChineseHoroscopeCategory, string> {
  return {
    love: getChineseHoroscopeText(animal, "love", period, lang),
    health: getChineseHoroscopeText(animal, "health", period, lang),
    career: getChineseHoroscopeText(animal, "career", period, lang),
    finance: getChineseHoroscopeText(animal, "finance", period, lang),
    general: getChineseHoroscopeText(animal, "general", period, lang),
  };
}
