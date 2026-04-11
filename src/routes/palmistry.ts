import { FastifyInstance } from "fastify";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { nowUtcIso, errorBody } from "../lib/utils.js";
import { detectLanguage, Language, LocalizedText } from "../i18n.js";

const PalmistryParamsSchema = z.object({
  lifeLine: z.enum(["long_deep", "short_faint", "chained", "broken"]).optional(),
  heartLine: z.enum(["curved", "straight", "chained", "forked_end"]).optional(),
  headLine: z.enum(["long_straight", "short", "curved_down", "forked"]).optional(),
  fateLine: z.enum(["strong", "weak_broken", "absent"]).optional(),
});

const MEANINGS: Record<string, Record<string, LocalizedText>> = {
  lifeLine: {
    long_deep: {
      pt: "Vitalidade robusta, saúde física estável e forte conexão com a vida terrena.",
      en: "Robust vitality, stable physical health, and strong connection to earthly life.",
      es: "Vitalidad robusta, salud física estable y fuerte conexión con la vida terrena.",
      hi: "मजबूत जीवन शक्ति, स्थिर शारीरिक स्वास्थ्य और सांसारिक जीवन से गहरा संबंध।"
    },
    short_faint: {
      pt: "Indica uma abordagem mais cautelosa da vida, necessidade de cuidar da vitalidade.",
      en: "Indicates a more cautious approach to life, need to take care of vitality.",
      es: "Indica un enfoque más cauteloso de la vida, necesidad de cuidar la vitalidad.",
      hi: "जीवन के प्रति अधिक सतर्क दृष्टिकोण का संकेत देता है, जीवन शक्ति का ध्यान रखने की आवश्यकता है।"
    },
    chained: {
      pt: "Períodos de incerteza física ou emocional, saúde que oscila.",
      en: "Periods of physical or emotional uncertainty, fluctuating health.",
      es: "Períodos de incertidumbre física o emocional, salud que oscila.",
      hi: "शारीरिक या भावनात्मक अनिश्चितता की अवधि, उतार-चढ़ाव वाला स्वास्थ्य।"
    },
    broken: {
      pt: "Grande mudança no estilo de vida ou interrupção significativa na trajetória pessoal.",
      en: "Major lifestyle change or significant disruption in personal trajectory.",
      es: "Gran cambio en el estilo de vida o interrupción significativa en la trayectoria personal.",
      hi: "जीवनशैली में बड़ा बदलाव या व्यक्तिगत प्रक्षेपवक्र में महत्वपूर्ण व्यवधान।"
    }
  },
  heartLine: {
    curved: {
      pt: "Abordagem emocional calorosa e empática, sentimentos que fluem livremente.",
      en: "Warm and empathetic emotional approach, feelings that flow freely.",
      es: "Enfoque emocional cálido y empático, sentimientos que fluyen libremente.",
      hi: "गर्म और सहानुभूतिपूर्ण भावनात्मक दृष्टिकोण, स्वतंत्र रूप से बहने वाली भावनाएं।"
    },
    straight: {
      pt: "Emoções controladas por lógica, praticidade nos relacionamentos.",
      en: "Emotions controlled by logic, practicality in relationships.",
      es: "Emociones controladas por la lógica, practicidad en las relaciones.",
      hi: "तर्क द्वारा नियंत्रित भावनाएं, रिश्तों में व्यावहारिकता।"
    },
    chained: {
      pt: "Inconstância nos afetos, tendência a flutuações românticas.",
      en: "Inconsistency in affections, tendency to romantic fluctuations.",
      es: "Inconstancia en los afectos, tendencia a fluctuaciones románticas.",
      hi: "स्नेह में असंगति, रोमांटिक उतार-चढ़ाव की प्रवृत्ति।"
    },
    forked_end: {
      pt: "Grande equilíbrio entre o coração e a mente, habilidade diplomática em crises.",
      en: "Great balance between heart and mind, diplomatic ability in crises.",
      es: "Gran equilibrio entre el corazón y la mente, habilidad diplomática en crisis.",
      hi: "दिल और दिमाग के बीच शानदार संतुलन, संकटों में कूटनीतिक क्षमता।"
    }
  },
  headLine: {
    long_straight: {
      pt: "Pensamento lógico, boa concentração, memória forte e praticidade.",
      en: "Logical thinking, good concentration, strong memory, and practicality.",
      es: "Pensamiento lógico, buena concentración, memoria fuerte y practicidad.",
      hi: "तार्किक सोच, अच्छी एकाग्रता, मजबूत याददाश्त और व्यावहारिकता।"
    },
    short: {
      pt: "Prefere realizações físicas a intelectuais, pensamento direto e impulsivo.",
      en: "Prefers physical to intellectual accomplishments, direct and impulsive thinking.",
      es: "Prefiere los logros físicos a los intelectuales, pensamiento directo e impulsivo.",
      hi: "बौद्धिक उपलब्धियों के बजाय शारीरिक उपलब्धियों को प्राथमिकता देता है, सीधी और आवेगी सोच।"
    },
    curved_down: {
      pt: "Grande criatividade e imaginação, mas pode tender à melancolia.",
      en: "Great creativity and imagination, but may tend toward melancholy.",
      es: "Gran creatividad e imaginación, pero puede tender a la melancolía.",
      hi: "महान रचनात्मकता और कल्पना, लेकिन अवसाद की ओर प्रवृत्त हो सकता है।"
    },
    forked: {
      pt: "Capacidade de ver ambos os lados de um assunto, mente versátil.",
      en: "Ability to see both sides of an issue, versatile mind.",
      es: "Capacidad de ver ambos lados de un asunto, mente versátil.",
      hi: "किसी विषय के दोनों पक्षों को देखने की क्षमता, बहुमुखी दिमाग।"
    }
  },
  fateLine: {
    strong: {
      pt: "Carreira estável e senso de propósito definido desde cedo.",
      en: "Stable career and clear sense of purpose from an early age.",
      es: "Carrera estable y sentido de propósito definido desde temprano.",
      hi: "कम उम्र से ही स्थिर करियर और उद्देश्य की स्पष्ट भावना।"
    },
    strong_with_support: {
        pt: "Apoio de terceiros no sucesso profissional.",
        en: "Support from others in professional success.",
        es: "Apoyo de terceros en el éxito profesional.",
        hi: "पेशेवर सफलता में दूसरों का समर्थन।"
    },
    weak_broken: {
      pt: "Mudanças frequentes de carreira ou influência externa no destino.",
      en: "Frequent career changes or external influence on destiny.",
      es: "Cambios frecuentes de carrera o influencia externa en el destino.",
      hi: "बार-बार करियर परिवर्तन या भाग्य पर बाहरी प्रभाव।"
    },
    absent: {
      pt: "Vida autoguiada, destino flexível e não pré-determinado por convenções.",
      en: "Self-guided life, flexible destiny not predetermined by conventions.",
      es: "Vida autoguiada, destino flexible y no predeterminado por convenciones.",
      hi: "स्व-निर्देशित जीवन, लचीला भाग्य जो परंपराओं द्वारा पूर्व-निर्धारित नहीं है।"
    }
  }
};

export async function registerPalmistryRoutes(app: FastifyInstance) {
  app.post("/api/v1/palmistry/interpret", {
    schema: {
      tags: ["Esotericism"],
      summary: "Palmistry Interpretation",
      description: "Analyzes the provided palm line profile and returns a diagnostic synthesis.",
      body: zodToJsonSchema(PalmistryParamsSchema, { target: "openApi3" }),
      querystring: {
          type: 'object',
          properties: {
              lang: { type: 'string', enum: ['pt', 'en', 'es', 'hi'], default: 'en' }
          }
      }
    }
  }, async (req, reply) => {
    try {
      const parsed = PalmistryParamsSchema.safeParse(req.body);
      if (!parsed.success) {
        return reply.code(400).send(errorBody("VALIDATION_ERROR", "Parâmetros inválidos", parsed.error.flatten()));
      }

      const queryLang = (req.query as any).lang;
      const lang: Language = queryLang && ['pt', 'en', 'es', 'hi'].includes(queryLang) 
        ? queryLang as Language
        : detectLanguage(req.headers["accept-language"]);

      const data = parsed.data;
      const interpretation: Record<string, string> = {};

      Object.entries(data).forEach(([key, value]) => {
        if (value && MEANINGS[key] && (MEANINGS[key] as any)[value]) {
          interpretation[key] = (MEANINGS[key] as any)[value][lang];
        }
      });

      const summaries = {
          pt: "Análise baseada nas características fornecidas das linhas palmares.",
          en: "Analysis based on provided palm line characteristics.",
          es: "Análisis basado en las características de las líneas palmares proporcionadas.",
          hi: "प्रदान की गई हथेली की रेखा विशेषताओं के आधार पर विश्लेषण।"
      };

      const disclaimers = {
          pt: "Esta análise é baseada em tradições clássicas e deve ser usada apenas para fins de entretenimento ou estudo.",
          en: "This analysis is based on classical traditions and should be used only for entertainment or study purposes.",
          es: "Este análisis se basa en tradiciones clásicas y debe utilizarse solo para fines de entretenimiento o estudio.",
          hi: "यह विश्लेषण शास्त्रीय परंपराओं पर आधारित है और इसका उपयोग केवल मनोरंजन या अध्ययन के उद्देश्यों के लिए किया जाना चाहिए।"
      };

      return {
        generatedAtUtc: nowUtcIso(),
        summary: summaries[lang],
        interpretation: interpretation,
        disclaimer: disclaimers[lang]
      };
    } catch (e: any) {
      req.log.error({ err: e }, "palmistry interpretation error");
      return reply.code(500).send(errorBody("INTERNAL_ERROR", "Erro ao processar quiromancia: " + e.message));
    }
  });
}
