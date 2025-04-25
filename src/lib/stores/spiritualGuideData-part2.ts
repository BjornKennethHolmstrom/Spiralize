// src/lib/stores/spiritualGuideData-part2.ts
// Define GuideItem interface inline to avoid import issues
interface GuideItem {
  id: string;
  title: {
    en: string;
    sv: string;
  };
  description?: {
    en: string;
    sv: string;
  };
  path: string;
  filePath?: string;
  type: 'section' | 'subsection' | 'tool' | 'appendix' | 'intro';
  section?: string;
  isQuickReference?: boolean;
  isAppendix?: boolean;
  isTool?: boolean;
  hasStageSpecificContent?: boolean;
  stages?: string[];
  parentId?: string;
}

// Second-tier and third-tier sections
export const guideDataPart2: GuideItem[] = [
  // Section 2: Second-Tier Awakening (Yellow, Turquoise)
  {
    id: 'section-02',
    title: {
      en: "Second-Tier Awakening (Yellow, Turquoise)",
      sv: "Andra nivåns uppvaknande (Gul, Turkos)"
    },
    description: {
      en: "Where the spiral becomes self-aware and unity consciousness emerges",
      sv: "Där spiralen blir självmedveten och enhetsmedvetandet framträder"
    },
    path: "second-tier-intro",
    filePath: "sections/02-second-tier/00-second-tier-intro",
    type: 'section',
    section: "02"
  },
  {
    id: 'yellow-systemic',
    title: {
      en: "Yellow: Systemic Mysticism",
      sv: "Gul: Systemisk Mystik"
    },
    description: {
      en: "Where enlightenment gets a flowchart",
      sv: "Där upplysning får ett flödesschema"
    },
    path: "yellow-systemic",
    filePath: "sections/02-second-tier/yellow-systemic",
    type: 'subsection',
    section: "02",
    parentId: "section-02",
    hasStageSpecificContent: true,
    stages: ["yellow"]
  },
  {
    id: 'turquoise-holistic',
    title: {
      en: "Turquoise: Holistic Consciousness",
      sv: "Turkos: Holistiskt Medvetande"
    },
    description: {
      en: "Where the universe winks back",
      sv: "Där universum blinkar tillbaka"
    },
    path: "turquoise-holistic",
    filePath: "sections/02-second-tier/turquoise-holistic",
    type: 'subsection',
    section: "02",
    parentId: "section-02",
    hasStageSpecificContent: true,
    stages: ["turquoise"]
  },
  {
    id: 'states-vs-stages',
    title: {
      en: "States vs. Stages",
      sv: "Tillstånd vs. Stadier"
    },
    description: {
      en: "Understanding the difference between temporary experiences and permanent structures",
      sv: "Förstå skillnaden mellan tillfälliga upplevelser och permanenta strukturer"
    },
    path: "states-vs-stages",
    filePath: "appendices/states-vs-stages",
    type: 'appendix',
    section: "02",
    parentId: "section-02",
    isAppendix: true,
    isQuickReference: true
  },
  
  // Section 3: Third-Tier Awakening (Coral–Clear)
  {
    id: 'section-03',
    title: {
      en: "Third-Tier Awakening (Coral–Clear)",
      sv: "Tredje nivåns uppvaknande (Korall–Klar)"
    },
    description: {
      en: "Where the spiral forgets itself and ordinary becomes extraordinary",
      sv: "Där spiralen glömmer sig själv och det vanliga blir extraordinärt"
    },
    path: "third-tier-intro",
    filePath: "sections/03-third-tier/00-third-tier-intro",
    type: 'section',
    section: "03"
  },
  {
    id: 'coral-play',
    title: {
      en: "Coral: Evolutionary Play",
      sv: "Korall: Evolutionär Lek"
    },
    description: {
      en: "Where the divine dresses in shadow and laughs",
      sv: "Där det gudomliga klär sig i skugga och skrattar"
    },
    path: "coral-play",
    filePath: "sections/03-third-tier/coral-play",
    type: 'subsection',
    section: "03",
    parentId: "section-03",
    hasStageSpecificContent: true,
    stages: ["coral"]
  },
  {
    id: 'ultraviolet-transparent',
    title: {
      en: "Ultra-Violet: Transparent Being",
      sv: "Ultraviolett: Transparent Vara"
    },
    description: {
      en: "Where enlightenment forgets itself",
      sv: "Där upplysningen glömmer sig själv"
    },
    path: "ultraviolet-transparent",
    filePath: "sections/03-third-tier/ultraviolet-transparent",
    type: 'subsection',
    section: "03",
    parentId: "section-03",
    hasStageSpecificContent: true,
    stages: ["ultraviolet"]
  },
  {
    id: 'clear-beyond',
    title: {
      en: "Clear: Beyond Spiral",
      sv: "Klar: Bortom Spiralen"
    },
    description: {
      en: "Where the dance ends and the dancer disappears",
      sv: "Där dansen slutar och dansaren försvinner"
    },
    path: "clear-beyond",
    filePath: "sections/03-third-tier/clear-beyond",
    type: 'subsection',
    section: "03",
    parentId: "section-03",
    hasStageSpecificContent: true,
    stages: ["clear"]
  },
  {
    id: 'no-tools-needed',
    title: {
      en: "No Tools Needed",
      sv: "Inga Verktyg Behövs"
    },
    description: {
      en: "Clear stage resources for the pathless path",
      sv: "Klara stadiets resurser för den stiglösa stigen"
    },
    path: "no-tools-needed",
    filePath: "tools/no-tools-needed",
    type: 'tool',
    section: "03",
    parentId: "section-03",
    isTool: true,
    hasStageSpecificContent: true,
    stages: ["clear"]
  },
  {
    id: 'no-special-time',
    title: {
      en: "No Special Time",
      sv: "Ingen Särskild Tid"
    },
    description: {
      en: "Clear stage time concepts beyond practice",
      sv: "Klara stadiets tidskoncept bortom övning"
    },
    path: "no-special-time",
    filePath: "tools/no-special-time",
    type: 'tool',
    section: "03",
    parentId: "section-03",
    isTool: true,
    hasStageSpecificContent: true,
    stages: ["clear"]
  }
];
