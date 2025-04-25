// src/lib/stores/spiritualGuideData-part4.ts
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

// Crisis integration and shadow work section
export const guideDataPart4: GuideItem[] = [
  // Section 5: Crisis & Shadow Integration
  {
    id: 'section-05',
    title: {
      en: "Crisis & Shadow Integration",
      sv: "Kris & Skuggintegration"
    },
    description: {
      en: "Where breakdowns become breakthroughs - navigating spiritual emergencies across stages",
      sv: "Där sammanbrott blir genombrott - att navigera genom andliga nödsituationer över olika stadier"
    },
    path: "crisis-intro",
    filePath: "sections/05-crisis-integration/00-crisis-intro",
    type: 'section',
    section: "05"
  },
  {
    id: 'dark-night-guide',
    title: {
      en: "The Dark Night of the Soul",
      sv: "Själens mörka natt"
    },
    description: {
      en: "A guide to spiritual emergencies across the spiral",
      sv: "En guide till andliga nödsituationer genom spiralen"
    },
    path: "dark-night-guide",
    filePath: "sections/05-crisis-integration/dark-night-guide",
    type: 'subsection',
    section: "05",
    parentId: "section-05",
    isQuickReference: true
  },
  {
    id: 'integration-tools',
    title: {
      en: "Integration Tools",
      sv: "Integrationsverktyg"
    },
    description: {
      en: "Stitching soul and system back together after spiritual crisis",
      sv: "Att sy ihop själ och system efter andlig kris"
    },
    path: "integration-tools",
    filePath: "sections/05-crisis-integration/integration-tools",
    type: 'subsection',
    section: "05",
    parentId: "section-05",
    isQuickReference: true
  },
  {
    id: 'beige-embodiment',
    title: {
      en: "Beige's Crisis of Embodiment",
      sv: "Beiges förkroppsligandekris"
    },
    description: {
      en: "When the body forgets how to be",
      sv: "När kroppen glömmer hur man är"
    },
    path: "beige-embodiment",
    filePath: "sections/05-crisis-integration/stage-specific-crises/beige-embodiment",
    type: 'subsection',
    section: "05",
    parentId: "section-05",
    hasStageSpecificContent: true,
    stages: ["beige"]
  },
  {
    id: 'purple-connection',
    title: {
      en: "Purple's Crisis of Connection",
      sv: "Lilas anknytningskris"
    },
    description: {
      en: "When the spirits stop speaking",
      sv: "När andarna slutar tala"
    },
    path: "purple-connection",
    filePath: "sections/05-crisis-integration/stage-specific-crises/purple-connection",
    type: 'subsection',
    section: "05",
    parentId: "section-05",
    hasStageSpecificContent: true,
    stages: ["purple"]
  },
  {
    id: 'red-rage',
    title: {
      en: "Red's Rage Crisis",
      sv: "Röds vredeskris"
    },
    description: {
      en: "When power becomes a spiritual prison",
      sv: "När kraft blir ett andligt fängelse"
    },
    path: "red-rage",
    filePath: "sections/05-crisis-integration/stage-specific-crises/red-rage",
    type: 'subsection',
    section: "05",
    parentId: "section-05",
    hasStageSpecificContent: true,
    stages: ["red"]
  },
  {
    id: 'blue-doubt',
    title: {
      en: "Blue's Crisis of Faith",
      sv: "Blås troskris"
    },
    description: {
      en: "When the sacred text stares back blankly",
      sv: "När den heliga texten stirrar tillbaka tom"
    },
    path: "blue-doubt",
    filePath: "sections/05-crisis-integration/stage-specific-crises/blue-doubt",
    type: 'subsection',
    section: "05",
    parentId: "section-05",
    hasStageSpecificContent: true,
    stages: ["blue"]
  },
  {
    id: 'orange-emptiness',
    title: {
      en: "Orange's Emptiness Crisis",
      sv: "Oranges tomhetskris"
    },
    description: {
      en: "When achievement stops tasting like God",
      sv: "När framgång slutar smaka som Gud"
    },
    path: "orange-emptiness",
    filePath: "sections/05-crisis-integration/stage-specific-crises/orange-emptiness",
    type: 'subsection',
    section: "05",
    parentId: "section-05",
    hasStageSpecificContent: true,
    stages: ["orange"]
  },
  {
    id: 'green-disillusionment',
    title: {
      en: "Green's Disillusionment Crisis",
      sv: "Gröns besvikelsekris"
    },
    description: {
      en: "Where the kumbaya circle breaks",
      sv: "När kumbaya-cirkeln bryts"
    },
    path: "green-disillusionment",
    filePath: "sections/05-crisis-integration/stage-specific-crises/green-disillusionment",
    type: 'subsection',
    section: "05",
    parentId: "section-05",
    hasStageSpecificContent: true,
    stages: ["green"]
  },
  {
    id: 'yellow-analysis-paralysis',
    title: {
      en: "Yellow's Analysis Paralysis",
      sv: "Guls analysparalys"
    },
    description: {
      en: "When the spiral eats its own tail",
      sv: "När spiralen äter sin egen svans"
    },
    path: "yellow-analysis-paralysis",
    filePath: "sections/05-crisis-integration/stage-specific-crises/yellow-analysis-paralysis",
    type: 'subsection',
    section: "05",
    parentId: "section-05",
    hasStageSpecificContent: true,
    stages: ["yellow"]
  },
  {
    id: 'turquoise-loneliness',
    title: {
      en: "Turquoise's Loneliness Crisis",
      sv: "Turkos ensamhetskris"
    },
    description: {
      en: "Where oneness forgets to phone home",
      sv: "Där enhet glömmer att ringa hem"
    },
    path: "turquoise-loneliness",
    filePath: "sections/05-crisis-integration/stage-specific-crises/turquoise-loneliness",
    type: 'subsection',
    section: "05",
    parentId: "section-05",
    hasStageSpecificContent: true,
    stages: ["turquoise"]
  },
  {
    id: 'coral-exhaustion',
    title: {
      en: "Coral's Evolutionary Exhaustion",
      sv: "Koralls evolutionära utmattning"
    },
    description: {
      en: "When the cosmic jester gets tired",
      sv: "När den kosmiska narren blir trött"
    },
    path: "coral-exhaustion",
    filePath: "sections/05-crisis-integration/stage-specific-crises/coral-exhaustion",
    type: 'subsection',
    section: "05",
    parentId: "section-05",
    hasStageSpecificContent: true,
    stages: ["coral"]
  },
  {
    id: 'ultraviolet-crisis',
    title: {
      en: "Ultra-Violet's Transparency Crisis",
      sv: "Ultravioletts transparenskris"
    },
    description: {
      en: "Where the witness forgets to breathe",
      sv: "Där vittnet glömmer att andas"
    },
    path: "ultraviolet-crisis",
    filePath: "sections/05-crisis-integration/stage-specific-crises/ultraviolet-crisis",
    type: 'subsection',
    section: "05",
    parentId: "section-05",
    hasStageSpecificContent: true,
    stages: ["ultraviolet"]
  },
  {
    id: 'clear-crisis',
    title: {
      en: "Clear: The Non-Crisis",
      sv: "Klar: Icke-Krisen"
    },
    description: {
      en: "Where the spiral forgets it was ever lost",
      sv: "Där spiralen glömmer att den någonsin var förlorad"
    },
    path: "clear-crisis",
    filePath: "sections/05-crisis-integration/stage-specific-crises/clear-crisis",
    type: 'subsection',
    section: "05",
    parentId: "section-05",
    hasStageSpecificContent: true,
    stages: ["clear"]
  },
  {
    id: 'crisis-protocols',
    title: {
      en: "Crisis Protocols",
      sv: "Krisprotokoll"
    },
    description: {
      en: "Emergency procedures for spiritual crisis, including hotlines and resources",
      sv: "Akutprocedurer för andlig kris, inklusive hjälplinjer och resurser"
    },
    path: "crisis-protocols",
    filePath: "tools/crisis-protocols",
    type: 'tool',
    section: "05",
    parentId: "section-05",
    isTool: true,
    isQuickReference: true
  },
  {
    id: 'dark-night-journal',
    title: {
      en: "Dark Night Journal Template",
      sv: "Journalmall för mörka natten"
    },
    description: {
      en: "Guided writing prompts for navigating spiritual emergency",
      sv: "Guidade skrivuppmaningar för att navigera genom andlig nödsituation"
    },
    path: "dark-night-journal",
    filePath: "tools/dark-night-journal",
    type: 'tool',
    section: "05",
    parentId: "section-05",
    isTool: true
  },
  {
    id: 'discernment-guide',
    title: {
      en: "Spiritual Emergency vs. Mental Health Crisis",
      sv: "Andlig nödsituation vs. psykisk hälsokris"
    },
    description: {
      en: "How to distinguish between different types of crises and get appropriate help",
      sv: "Hur man skiljer mellan olika typer av kriser och får lämplig hjälp"
    },
    path: "discernment-guide",
    filePath: "tools/discernment-guide",
    type: 'tool',
    section: "05",
    parentId: "section-05",
    isTool: true,
    isQuickReference: true
  },
  {
    id: 'finding-support',
    title: {
      en: "Finding Integration Support",
      sv: "Hitta integrationsstöd"
    },
    description: {
      en: "How to find appropriate professional and community resources for spiritual crisis",
      sv: "Hur man hittar lämpliga professionella och gemenskapsresurser för andlig kris"
    },
    path: "finding-support",
    filePath: "tools/finding-support",
    type: 'tool',
    section: "05",
    parentId: "section-05",
    isTool: true
  },
  {
    id: 'somatic-integration',
    title: {
      en: "Somatic Integration Practices",
      sv: "Somatiska integrationsövningar"
    },
    description: {
      en: "Body-based tools for processing spiritual emergency",
      sv: "Kroppsbaserade verktyg för att bearbeta andlig nödsituation"
    },
    path: "somatic-integration",
    filePath: "tools/somatic-integration",
    type: 'tool',
    section: "05",
    parentId: "section-05",
    isTool: true
  },
  {
    id: 'crisis-composting',
    title: {
      en: "Composting Crisis Into Growth",
      sv: "Kompostera kris till tillväxt"
    },
    description: {
      en: "Transforming spiritual emergencies into evolutionary catalysts",
      sv: "Omvandla andliga nödsituationer till evolutionära katalysatorer"
    },
    path: "crisis-composting",
    filePath: "tools/crisis-composting",
    type: 'tool',
    section: "05",
    parentId: "section-05",
    isTool: true
  },
  {
    id: 'service-burnout',
    title: {
      en: "Service Burnout Prevention",
      sv: "Förebyggande av tjänsteutbrändhet"
    },
    description: {
      en: "Avoiding helper fatigue in spiritual service",
      sv: "Undvika hjälpartrötthet i andlig tjänst"
    },
    path: "service-burnout",
    filePath: "05-crisis-integration/service-burnout",
    type: 'tool',
    section: "05",
    parentId: "section-05",
    isTool: true
  }
];
