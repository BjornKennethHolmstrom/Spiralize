// src/lib/stores/spiritualGuideData-part1.ts
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

// Introduction and first section of guide items
export const guideDataPart1: GuideItem[] = [
  // Section 0: Introduction to The Spiritual & Mystical Spiral
  {
    id: 'section-00',
    title: {
      en: "Introduction to The Spiritual & Mystical Spiral",
      sv: "Introduktion till Den Andliga & Mystiska Spiralen"
    },
    description: {
      en: "An overview of how spirituality and mysticism transform across stages of consciousness",
      sv: "En översikt av hur andlighet och mystik förändras genom medvetandets olika stadier"
    },
    path: "introduction",
    filePath: "sections/00-intro/00-introduction",
    type: 'section',
    section: "00"
  },
  {
    id: 'spiral-dynamics-101',
    title: {
      en: "Spiral Dynamics 101",
      sv: "Spiral Dynamics 101"
    },
    description: {
      en: "A brief overview of the spiral model, stages, and developmental consciousness",
      sv: "En kort översikt över spiralmodellen, stadier och utvecklande medvetande"
    },
    path: "spiral-dynamics-101",
    filePath: "sections/00-intro/spiral-dynamics-101",
    type: 'subsection',
    section: "00",
    parentId: "section-00"
  },
  {
    id: 'mystical-experiences-101',
    title: {
      en: "Mystical Experiences 101",
      sv: "Mystiska Upplevelser 101"
    },
    description: {
      en: "How the divine dances through each developmental stage",
      sv: "Hur det gudomliga dansar genom varje utvecklingsstadium"
    },
    path: "mystical-experiences-101",
    filePath: "sections/00-intro/mystical-experiences-101",
    type: 'subsection',
    section: "00",
    parentId: "section-00"
  },
  {
    id: 'glossary',
    title: {
      en: "Glossary of Terms",
      sv: "Ordlista över Termer"
    },
    description: {
      en: "Essential concepts for navigating the spiral",
      sv: "Grundläggande begrepp för att navigera spiralen"
    },
    path: "glossary",
    filePath: "sections/00-intro/glossary",
    type: 'subsection',
    section: "00",
    parentId: "section-00",
    isQuickReference: true
  },
  {
    id: 'visual-spiral-map',
    title: {
      en: "Visual Spiral Map",
      sv: "Visuell Spiralkarta"
    },
    description: {
      en: "An illustrated guide to awakening across stages",
      sv: "En illustrerad guide till uppvaknande över stadier"
    },
    path: "visual-spiral-map",
    filePath: "sections/00-intro/visual-spiral-map",
    type: 'subsection',
    section: "00",
    parentId: "section-00"
  },
  {
    id: 'mystical-diagnostics',
    title: {
      en: "Mystical Diagnostics Tool",
      sv: "Mystiskt Diagnostikverktyg"
    },
    description: {
      en: "Determine your mystical type and developmental center of gravity",
      sv: "Fastställ din mystiska typ och utvecklingsmässiga tyngdpunkt"
    },
    path: "mystical-diagnostics",
    filePath: "tools/mystical-diagnostics",
    type: 'tool',
    section: "00",
    parentId: "section-00",
    isTool: true
  },
  
  // Section 1: First-Tier Foundations (Beige–Green)
  {
    id: 'section-01',
    title: {
      en: "First-Tier Foundations (Beige–Green)",
      sv: "Första nivåns grunder (Beige–Grön)"
    },
    description: {
      en: "Spiritual expressions from survival consciousness to pluralistic heart-centered seeking",
      sv: "Andliga uttryck från överlevnadsmedvetande till pluralistiskt hjärtcentrerat sökande"
    },
    path: "first-tier-intro",
    filePath: "sections/01-first-tier/00-first-tier-intro",
    type: 'section',
    section: "01"
  },
  {
    id: 'beige-primal',
    title: {
      en: "Beige: Primal Awe",
      sv: "Beige: Uråldrig Vördnad"
    },
    description: {
      en: "The spirituality of instinct and immediate presence",
      sv: "Instinktens andlighet och omedelbar närvaro"
    },
    path: "beige-primal",
    filePath: "sections/01-first-tier/beige-primal",
    type: 'subsection',
    section: "01",
    parentId: "section-01",
    hasStageSpecificContent: true,
    stages: ["beige"]
  },
  {
    id: 'purple-tribal',
    title: {
      en: "Purple: Tribal Mysticism",
      sv: "Lila: Stambaserad Mystik"
    },
    description: {
      en: "Where the ancestors whisper and the world is alive",
      sv: "Där förfäderna viskar och världen är levande"
    },
    path: "purple-tribal",
    filePath: "sections/01-first-tier/purple-tribal",
    type: 'subsection',
    section: "01",
    parentId: "section-01",
    hasStageSpecificContent: true,
    stages: ["purple"]
  },
  {
    id: 'red-power',
    title: {
      en: "Red: Power and Divinity",
      sv: "Röd: Kraft och Gudomlighet"
    },
    description: {
      en: "Where the divine wears your face",
      sv: "Där det gudomliga bär ditt ansikte"
    },
    path: "red-power",
    filePath: "sections/01-first-tier/red-power",
    type: 'subsection',
    section: "01",
    parentId: "section-01",
    hasStageSpecificContent: true,
    stages: ["red"]
  },
  {
    id: 'blue-order',
    title: {
      en: "Blue: Sacred Order",
      sv: "Blå: Helig Ordning"
    },
    description: {
      en: "Where the divine wears a rulebook",
      sv: "Där det gudomliga bär en regelbok"
    },
    path: "blue-order",
    filePath: "sections/01-first-tier/blue-order",
    type: 'subsection',
    section: "01",
    parentId: "section-01",
    hasStageSpecificContent: true,
    stages: ["blue"]
  },
  {
    id: 'orange-rational',
    title: {
      en: "Orange: Rational Spirituality",
      sv: "Orange: Rationell Andlighet"
    },
    description: {
      en: "Where lab coats meet enlightenment",
      sv: "Där labrockar möter upplysning"
    },
    path: "orange-rational",
    filePath: "sections/01-first-tier/orange-rational",
    type: 'subsection',
    section: "01",
    parentId: "section-01",
    hasStageSpecificContent: true,
    stages: ["orange"]
  },
  {
    id: 'green-heart',
    title: {
      en: "Green: Heart-Centered Seeking",
      sv: "Grön: Hjärtcentrerat Sökande"
    },
    description: {
      en: "Where the universe gives you a hug",
      sv: "Där universum ger dig en kram"
    },
    path: "green-heart",
    filePath: "sections/01-first-tier/green-heart",
    type: 'subsection',
    section: "01",
    parentId: "section-01",
    hasStageSpecificContent: true,
    stages: ["green"]
  },
  {
    id: 'shadow-journal',
    title: {
      en: "Shadow Journal",
      sv: "Skuggjournal"
    },
    description: {
      en: "Track shadow patterns across different developmental stages",
      sv: "Spåra skuggmönster över olika utvecklingsstadier"
    },
    path: "shadow-journal",
    filePath: "tools/shadow-journal",
    type: 'tool',
    section: "01",
    parentId: "section-01",
    isTool: true
  },
  {
    id: 'spiral-diagnostics',
    title: {
      en: "Spiral Diagnostics Tool",
      sv: "Spiral Diagnostikverktyg"
    },
    description: {
      en: "Determine your developmental center of gravity",
      sv: "Fastställ din utvecklingsmässiga tyngdpunkt"
    },
    path: "spiral-diagnostics",
    filePath: "tools/spiral-diagnostics",
    type: 'tool',
    section: "01",
    parentId: "section-01",
    isTool: true,
    isQuickReference: true
  }
];
