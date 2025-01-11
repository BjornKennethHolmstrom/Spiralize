// data/stages.ts
import type { StageInfo, SpiralStage } from '../types/spiral';

export const stages: Record<SpiralStage, StageInfo> = {
  beige: {
    name: {
      en: "Survival",
      sv: "Överlevnad"
    },
    color: "#E5D0BA",
    description: {
      en: "Focus on immediate survival needs and basic physical sustenance",
      sv: "Fokus på omedelbara överlevnadsbehov och grundläggande fysiskt uppehälle"
    },
    characteristics: [
      {
        en: "Instinctive survival behaviors",
        sv: "Instinktiva överlevnadsbeteenden"
      },
      {
        en: "Focus on basic needs",
        sv: "Fokus på grundläggande behov"
      }
    ],
    challenges: [
      {
        en: "Moving beyond pure survival mode",
        sv: "Att komma bortom rent överlevnadsläge"
      }
    ],
    growthPaths: [
      {
        en: "Developing sense of safety and security",
        sv: "Utveckla känsla av trygghet och säkerhet"
      }
    ]
  },
  purple: {
    name: {
      en: "Tribal",
      sv: "Stamtillhörighet"
    },
    color: "#9B6B9E",
    description: {
      en: "Magical thinking and focus on tradition and kinship bonds",
      sv: "Magiskt tänkande och fokus på tradition och släktband"
    },
    characteristics: [
      {
        en: "Strong group bonds",
        sv: "Starka gruppband"
      },
      {
        en: "Ritual and tradition",
        sv: "Ritual och tradition"
      }
    ],
    challenges: [
      {
        en: "Overcoming fear of change",
        sv: "Övervinna rädsla för förändring"
      }
    ],
    growthPaths: [
      {
        en: "Learning to embrace individual identity",
        sv: "Lära sig att omfamna individuell identitet"
      }
    ]
  },
  red: {
    name: {
      en: "Power",
      sv: "Makt"
    },
    color: "#E25A53",
    description: {
      en: "Emphasis on personal power and immediate gratification",
      sv: "Betoning på personlig makt och omedelbar tillfredsställelse"
    },
    characteristics: [
      {
        en: "Assertive self-expression",
        sv: "Självsäker självuttryckning"
      },
      {
        en: "Immediate action and results",
        sv: "Omedelbara handlingar och resultat"
      }
    ],
    challenges: [
      {
        en: "Learning self-control",
        sv: "Lära sig självkontroll"
      }
    ],
    growthPaths: [
      {
        en: "Developing discipline and purpose",
        sv: "Utveckla disciplin och syfte"
      }
    ]
  },
  blue: {
    name: {
      en: "Order",
      sv: "Ordning"
    },
    color: "#4A72B2",
    description: {
      en: "Focus on order, meaning, and proper behavior",
      sv: "Fokus på ordning, mening och korrekt beteende"
    },
    characteristics: [
      {
        en: "Strong sense of right and wrong",
        sv: "Stark känsla för rätt och fel"
      },
      {
        en: "Respect for authority and rules",
        sv: "Respekt för auktoritet och regler"
      }
    ],
    challenges: [
      {
        en: "Rigidity in thinking",
        sv: "Rigiditet i tänkandet"
      }
    ],
    growthPaths: [
      {
        en: "Learning flexibility while maintaining principles",
        sv: "Lära sig flexibilitet medan principer upprätthålls"
      }
    ]
  },
  orange: {
    name: {
      en: "Achievement",
      sv: "Prestation"
    },
    color: "#FF7F27",
    description: {
      en: "Emphasis on individual success and scientific rationality",
      sv: "Betoning på individuell framgång och vetenskaplig rationalitet"
    },
    characteristics: [
      {
        en: "Goal-oriented behavior",
        sv: "Målinriktat beteende"
      },
      {
        en: "Strategic thinking",
        sv: "Strategiskt tänkande"
      }
    ],
    challenges: [
      {
        en: "Balancing achievement with other values",
        sv: "Balansera prestation med andra värden"
      }
    ],
    growthPaths: [
      {
        en: "Developing emotional intelligence",
        sv: "Utveckla emotionell intelligens"
      }
    ]
  },
  green: {
    name: {
      en: "Communal",
      sv: "Gemenskap"
    },
    color: "#7AB55C",
    description: {
      en: "Focus on community, equality, and human connection",
      sv: "Fokus på gemenskap, jämlikhet och mänsklig kontakt"
    },
    characteristics: [
      {
        en: "Strong emphasis on inclusion",
        sv: "Stark betoning på inkludering"
      },
      {
        en: "Sensitivity to others' feelings",
        sv: "Känslighet för andras känslor"
      }
    ],
    challenges: [
      {
        en: "Decision paralysis from multiple perspectives",
        sv: "Beslutsparalys från flera perspektiv"
      }
    ],
    growthPaths: [
      {
        en: "Integrating efficiency with empathy",
        sv: "Integrera effektivitet med empati"
      }
    ]
  },
  yellow: {
    name: {
      en: "Systemic",
      sv: "Systemisk"
    },
    color: "#FFD700",
    description: {
      en: "Integration of complex systems and adaptive solutions",
      sv: "Integration av komplexa system och adaptiva lösningar"
    },
    characteristics: [
      {
        en: "Systemic thinking",
        sv: "Systemiskt tänkande"
      },
      {
        en: "Comfort with complexity",
        sv: "Bekväm med komplexitet"
      }
    ],
    challenges: [
      {
        en: "Communicating complex insights simply",
        sv: "Kommunicera komplexa insikter enkelt"
      }
    ],
    growthPaths: [
      {
        en: "Developing practical applications of systems thinking",
        sv: "Utveckla praktiska tillämpningar av systemtänkande"
      }
    ]
  },
  turquoise: {
    name: {
      en: "Holistic",
      sv: "Holistisk"
    },
    color: "#40E0D0",
    description: {
      en: "Global, holistic thinking and being",
      sv: "Globalt, holistiskt tänkande och varande"
    },
    characteristics: [
      {
        en: "Universal perspective",
        sv: "Universellt perspektiv"
      },
      {
        en: "Integration of all levels",
        sv: "Integration av alla nivåer"
      }
    ],
    challenges: [
      {
        en: "Maintaining groundedness",
        sv: "Bibehålla jordfästhet"
      }
    ],
    growthPaths: [
      {
        en: "Balancing universal vision with practical action",
        sv: "Balansera universell vision med praktisk handling"
      }
    ]
  },
  coral: {
    name: {
      en: "Sovereign Unity",
      sv: "Suverän Enhet"
    },
    color: "#FF6F61",
    description: {
      en: "Integration of expansive individuality with universal consciousness",
      sv: "Integration av expansiv individualitet med universellt medvetande"
    },
    characteristics: [
      {
        en: "Balance of personal sovereignty and cosmic awareness",
        sv: "Balans mellan personlig suveränitet och kosmisk medvetenhet"
      },
      {
        en: "Revolutionary creation within universal harmony",
        sv: "Revolutionärt skapande inom universell harmoni"
      },
      {
        en: "Pioneering new paradigms of existence",
        sv: "Banbrytande nya paradigm för existens"
      }
    ],
    challenges: [
      {
        en: "Bridging visionary insights with practical implementation",
        sv: "Överbrygga visionära insikter med praktiskt genomförande"
      },
      {
        en: "Finding resonance while pushing boundaries",
        sv: "Hitta resonans medan gränser tänjs"
      }
    ],
    growthPaths: [
      {
        en: "Deepening the integration of individual and universal",
        sv: "Fördjupa integrationen av individuellt och universellt"
      },
      {
        en: "Co-creating new possibilities for human potential",
        sv: "Samskapa nya möjligheter för mänsklig potential"
      }
    ]
  },
  ultraviolet: {
    name: {
      en: "Infinite Flow",
      sv: "Oändligt Flöde"
    },
    color: "#9932CC",
    description: {
      en: "Dissolution of all boundaries into dynamic universal co-creation",
      sv: "Upplösning av alla gränser till dynamiskt universellt medskapande"
    },
    characteristics: [
      {
        en: "Seamless integration of all existence",
        sv: "Sömlös integration av all existens"
      },
      {
        en: "Fluid movement between all perspectives and dimensions",
        sv: "Flytande rörelse mellan alla perspektiv och dimensioner"
      },
      {
        en: "Instantaneous creation through universal consciousness",
        sv: "Omedelbart skapande genom universellt medvetande"
      }
    ],
    challenges: [
      {
        en: "Maintaining coherence across infinite possibilities",
        sv: "Upprätthålla sammanhang över oändliga möjligheter"
      },
      {
        en: "Bridging between manifest and unmanifest reality",
        sv: "Överbrygga mellan manifest och omanifest verklighet"
      }
    ],
    growthPaths: [
      {
        en: "Dancing with the infinite while remaining in form",
        sv: "Dansa med det oändliga medan form bibehålls"
      },
      {
        en: "Evolving consciousness beyond current human comprehension",
        sv: "Utveckla medvetandet bortom nuvarande mänsklig förståelse"
      }
    ]
  }
};
