// src/lib/stores/spiritualGuideData-part3.ts
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

// Practices section
export const guideDataPart3: GuideItem[] = [
  // Section 4: Practices
  {
    id: 'section-04',
    title: {
      en: "Spiral Practices",
      sv: "Spiralövningar"
    },
    description: {
      en: "Where the path forgets it's a path - stage-aligned spiritual technologies",
      sv: "Där vägen glömmer att den är en väg - stadieorienterade andliga tekniker"
    },
    path: "practices-intro",
    filePath: "sections/04-practices/00-practices-intro",
    type: 'section',
    section: "04"
  },
  {
    id: 'beige-practices',
    title: {
      en: "Beige Practices",
      sv: "Beige övningar"
    },
    description: {
      en: "Embodied awareness and primal connection practices",
      sv: "Övningar för förkroppsligad medvetenhet och ursprunglig anknytning"
    },
    path: "beige-practices",
    filePath: "sections/04-practices/beige-practices",
    type: 'subsection',
    section: "04",
    parentId: "section-04",
    hasStageSpecificContent: true,
    stages: ["beige"]
  },
  {
    id: 'purple-practices',
    title: {
      en: "Purple Practices",
      sv: "Lila övningar"
    },
    description: {
      en: "Ritual creation and ancestral connection work",
      sv: "Ritualskapande och arbete med förfäderlig anknytning"
    },
    path: "purple-practices",
    filePath: "sections/04-practices/purple-practices",
    type: 'subsection',
    section: "04",
    parentId: "section-04",
    hasStageSpecificContent: true,
    stages: ["purple"]
  },
  {
    id: 'red-practices',
    title: {
      en: "Red Practices",
      sv: "Röda övningar"
    },
    description: {
      en: "Power cultivation and warrior wisdom technologies",
      sv: "Kraftutveckling och krigarvisdomstekniker"
    },
    path: "red-practices",
    filePath: "sections/04-practices/red-practices",
    type: 'subsection',
    section: "04",
    parentId: "section-04",
    hasStageSpecificContent: true,
    stages: ["red"]
  },
  {
    id: 'blue-practices',
    title: {
      en: "Blue Practices",
      sv: "Blå övningar"
    },
    description: {
      en: "Structured devotion and contemplative discipline",
      sv: "Strukturerad hängivenhet och kontemplativ disciplin"
    },
    path: "blue-practices",
    filePath: "sections/04-practices/blue-practices",
    type: 'subsection',
    section: "04",
    parentId: "section-04",
    hasStageSpecificContent: true,
    stages: ["blue"]
  },
  {
    id: 'orange-practices',
    title: {
      en: "Orange Practices",
      sv: "Orange övningar"
    },
    description: {
      en: "Evidence-based spirituality and optimization techniques",
      sv: "Evidensbaserad andlighet och optimeringsmetoder"
    },
    path: "orange-practices",
    filePath: "sections/04-practices/orange-practices",
    type: 'subsection',
    section: "04",
    parentId: "section-04",
    hasStageSpecificContent: true,
    stages: ["orange"]
  },
  {
    id: 'green-practices',
    title: {
      en: "Green Practices",
      sv: "Gröna övningar"
    },
    description: {
      en: "Heart-centered and communal spiritual technologies",
      sv: "Hjärtcentrerade och gemensamma andliga tekniker"
    },
    path: "green-practices",
    filePath: "sections/04-practices/green-practices",
    type: 'subsection',
    section: "04",
    parentId: "section-04",
    hasStageSpecificContent: true,
    stages: ["green"]
  },
  {
    id: 'yellow-practices',
    title: {
      en: "Yellow Practices",
      sv: "Gula övningar"
    },
    description: {
      en: "Systemic awareness and meta-cognitive practice frameworks",
      sv: "Systemisk medvetenhet och metakognitiva övningsramverk"
    },
    path: "yellow-practices",
    filePath: "sections/04-practices/yellow-practices",
    type: 'subsection',
    section: "04",
    parentId: "section-04",
    hasStageSpecificContent: true,
    stages: ["yellow"]
  },
  {
    id: 'turquoise-practices',
    title: {
      en: "Turquoise Practices",
      sv: "Turkosa övningar"
    },
    description: {
      en: "Holistic consciousness and unity awareness techniques",
      sv: "Holistiska medvetenhets- och enhetsmedvetenhetstekniker"
    },
    path: "turquoise-practices",
    filePath: "sections/04-practices/turquoise-practices",
    type: 'subsection',
    section: "04",
    parentId: "section-04",
    hasStageSpecificContent: true,
    stages: ["turquoise"]
  },
  {
    id: 'coral-practices',
    title: {
      en: "Coral Practices",
      sv: "Korall övningar"
    },
    description: {
      en: "Evolutionary play and shadow alchemy practices",
      sv: "Evolutionär lek och skuggalkemiövningar"
    },
    path: "coral-practices",
    filePath: "sections/04-practices/coral-practices",
    type: 'subsection',
    section: "04",
    parentId: "section-04",
    hasStageSpecificContent: true,
    stages: ["coral"]
  },
  {
    id: 'ultraviolet-practices',
    title: {
      en: "Ultra-Violet Practices",
      sv: "Ultravioletta övningar"
    },
    description: {
      en: "Transparent awareness and effortless presence practices",
      sv: "Transparent medvetenhet och mödolös närvaroövningar"
    },
    path: "ultraviolet-practices",
    filePath: "sections/04-practices/ultraviolet-practices",
    type: 'subsection',
    section: "04",
    parentId: "section-04",
    hasStageSpecificContent: true,
    stages: ["ultraviolet"]
  },
  {
    id: 'clear-practices',
    title: {
      en: "Clear Practices",
      sv: "Klara övningar"
    },
    description: {
      en: "Non-practices for the pathless path",
      sv: "Icke-övningar för den stiglösa stigen"
    },
    path: "clear-practices",
    filePath: "sections/04-practices/clear-practices",
    type: 'subsection',
    section: "04",
    parentId: "section-04",
    hasStageSpecificContent: true,
    stages: ["clear"]
  },
  {
    id: 'universal-practices',
    title: {
      en: "Universal Practices",
      sv: "Universella övningar"
    },
    description: {
      en: "Stage-proof spiritual technologies that adapt to your developmental needs",
      sv: "Stadieanpassade andliga tekniker som anpassar sig till dina utvecklingsbehov"
    },
    path: "universal-practices",
    filePath: "sections/04-practices/universal-practices",
    type: 'subsection',
    section: "04",
    parentId: "section-04",
    isQuickReference: true
  },
  {
    id: 'practice-trackers',
    title: {
      en: "Practice Trackers",
      sv: "Övningsspårare"
    },
    description: {
      en: "Stage-specific tools for tracking your spiritual practice",
      sv: "Stadiespecifika verktyg för att spåra din andliga övning"
    },
    path: "practice-trackers",
    filePath: "tools/practice-trackers/template-tracker",
    type: 'tool',
    section: "04",
    parentId: "section-04",
    isTool: true
  },
  {
    id: 'universal-adapter',
    title: {
      en: "Universal Practice Adapter",
      sv: "Universell övningsadapter"
    },
    description: {
      en: "Transform any spiritual practice to work with your developmental stage",
      sv: "Omvandla vilken andlig övning som helst för att fungera med ditt utvecklingsstadium"
    },
    path: "universal-adapter",
    filePath: "tools/universal-adapter",
    type: 'tool',
    section: "04",
    parentId: "section-04",
    isTool: true
  },
  {
    id: 'practice-crossovers',
    title: {
      en: "Cross-Stage Practice Guide",
      sv: "Stadieöverskridande övningsguide"
    },
    description: {
      en: "Integrating practices across multiple developmental stages",
      sv: "Integrera övningar över flera utvecklingsstadier"
    },
    path: "practice-crossovers",
    filePath: "tools/practice-crossovers",
    type: 'tool',
    section: "04",
    parentId: "section-04",
    isTool: true
  },
  {
    id: 'meditation-scripts',
    title: {
      en: "Stage-Specific Meditation Scripts",
      sv: "Stadiespecifika meditationsmanus"
    },
    description: {
      en: "Guided meditations tailored to your developmental stage",
      sv: "Guidade meditationer anpassade för ditt utvecklingsstadium"
    },
    path: "meditation-scripts",
    filePath: "tools/meditation-scripts",
    type: 'tool',
    section: "04",
    parentId: "section-04",
    isTool: true
  }
];
