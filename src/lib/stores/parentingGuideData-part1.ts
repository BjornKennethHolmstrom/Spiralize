// src/lib/stores/parentingGuideData-part1.ts

// Define GuideItem interface inline
interface ItemTitle {
  en: string;
  sv: string;
}

interface GuideItem {
  id: string;
  title: ItemTitle;
  description?: {
    en: string;
    sv: string;
  };
  path: string;
  filePath?: string;
  type: 'section' | 'subsection' | 'tool' | 'exercise' | 'intro';
  section?: string;
  subsection?: string;
  isQuickReference?: boolean;
  isTemplate?: boolean;
  isTool?: boolean;
  isExercise?: boolean;
  isWorksheet?: boolean;
  parentId?: string;
}

// Introduction and first section of guide items
export const guideDataPart1: GuideItem[] = [
  // Section 0: Introduction to Spiral Dynamics for Parenting & Education
  {
    id: 'section-00',
    title: {
      en: "Introduction to Spiral Dynamics for Parenting & Education",
      sv: "Introduktion till Spiral Dynamics för Föräldraskap & Utbildning"
    },
    description: {
      en: "Introduction to Spiral Dynamics concepts for parents and educators, ensuring accessibility for beginners",
      sv: "Introduktion till Spiral Dynamics-koncept för föräldrar och pedagoger, säkerställer tillgänglighet för nybörjare"
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
      en: "Brief overview of the spiral model, stages, and their relevance to child development",
      sv: "Kort översikt över spiralmodellen, stadier och deras relevans för barns utveckling"
    },
    path: "spiral-dynamics-101",
    filePath: "sections/00-intro/spiral-dynamics-101",
    type: 'subsection',
    section: "00",
    parentId: "section-00"
  },
  {
    id: 'core-concepts',
    title: {
      en: "Core Concepts",
      sv: "Grundläggande Koncept"
    },
    description: {
      en: "Explanation of stage-specific needs, transitions, and adult attunement",
      sv: "Förklaring av stadiespecifika behov, övergångar och vuxenanpassning"
    },
    path: "core-concepts",
    filePath: "sections/00-intro/core-concepts",
    type: 'subsection',
    section: "00",
    parentId: "section-00"
  },
  {
    id: 'quick-reference-glossary',
    title: {
      en: "Quick Reference Glossary",
      sv: "Snabbreferensordlista"
    },
    description: {
      en: "Definitions of terms like 'stage-mixing,' 'developmental signals,' and 'spiral literacy'",
      sv: "Definitioner av termer som 'stadieblandning', 'utvecklingssignaler' och 'spiralläskunnighet'"
    },
    path: "quick-reference-glossary",
    filePath: "sections/00-intro/quick-reference-glossary",
    type: 'subsection',
    section: "00",
    parentId: "section-00",
    isQuickReference: true
  },
  {
    id: 'visual-roadmap',
    title: {
      en: "Visual Roadmap",
      sv: "Visuell Färdplan"
    },
    description: {
      en: "Downloadable infographic showing how sections interconnect for navigation",
      sv: "Nedladdningsbar infografik som visar hur sektioner sammankopplas för navigering"
    },
    path: "visual-roadmap",
    filePath: "sections/00-intro/visual-roadmap",
    type: 'subsection',
    section: "00",
    parentId: "section-00"
  },
  {
    id: 'spiral-parenting-cheat-sheet',
    title: {
      en: "Spiral Parenting Cheat Sheet",
      sv: "Spiral-föräldraskap Fusklapp"
    },
    description: {
      en: "One-page summary of stages, age ranges, child behaviors, and key parenting tips",
      sv: "Ensidig sammanfattning av stadier, åldersintervall, barns beteenden och viktiga föräldratips"
    },
    path: "spiral-parenting-cheat-sheet",
    filePath: "sections/tools/spiral-parenting-cheat-sheet",
    type: 'tool',
    section: "00",
    parentId: "section-00",
    isTool: true
  },

  // Section 1: Developmental Signals & Needs in Children Through Spiral Stages
  {
    id: 'section-01',
    title: {
      en: "Developmental Signals & Needs in Children Through Spiral Stages",
      sv: "Utvecklingssignaler & Behov hos Barn Genom Spiralstadier"
    },
    description: {
      en: "Help parents and educators recognize stage-specific behaviors and needs to provide attuned support",
      sv: "Hjälp föräldrar och pedagoger att känna igen stadiespecifika beteenden och behov för att ge anpassat stöd"
    },
    path: "signals-introduction",
    filePath: "sections/01-developmental-signals/00-signals-introduction",
    type: 'section',
    section: "01"
  },
  {
    id: 'stage-signals-with-age-ranges',
    title: {
      en: "Stage Signals with Age Ranges",
      sv: "Stadiesignaler med Åldersintervall"
    },
    description: {
      en: "How needs, behaviors, and values manifest across stages, with approximate age ranges",
      sv: "Hur behov, beteenden och värderingar manifesteras över stadier, med ungefärliga åldersintervall"
    },
    path: "stage-signals-with-age-ranges",
    filePath: "sections/01-developmental-signals/01-stage-signals-with-age-ranges",
    type: 'subsection',
    section: "01",
    parentId: "section-01"
  },
  {
    id: 'transition-signs',
    title: {
      en: "Transition Signs",
      sv: "Övergångstecken"
    },
    description: {
      en: "Indicators of stage-mixing or shifts, including major life transitions",
      sv: "Indikatorer på stadieblandning eller skiften, inklusive stora livsövergångar"
    },
    path: "transition-signs",
    filePath: "sections/01-developmental-signals/02-transition-signs",
    type: 'subsection',
    section: "01",
    parentId: "section-01"
  },
  {
    id: 'parenting-practices',
    title: {
      en: "Parenting Practices",
      sv: "Föräldrapraxis"
    },
    description: {
      en: "Strategies to nurture healthy emergence at each developmental stage",
      sv: "Strategier för att främja hälsosam framväxt i varje utvecklingsstadium"
    },
    path: "parenting-practices",
    filePath: "sections/01-developmental-signals/03-parenting-practices",
    type: 'subsection',
    section: "01",
    parentId: "section-01"
  },
  {
    id: 'teaching-practices',
    title: {
      en: "Teaching Practices",
      sv: "Undervisningspraxis"
    },
    description: {
      en: "Classroom approaches to support stage-specific developmental needs",
      sv: "Klassrumsmetoder för att stödja stadiespecifika utvecklingsbehov"
    },
    path: "teaching-practices",
    filePath: "sections/01-developmental-signals/04-teaching-practices",
    type: 'subsection',
    section: "01",
    parentId: "section-01"
  },
  {
    id: 'special-needs-considerations-signals',
    title: {
      en: "Special Needs Considerations",
      sv: "Särskilda Behovsöverväganden"
    },
    description: {
      en: "Adapting practices for neurodivergent children or those with special needs",
      sv: "Anpassa metoder för neurodivergenta barn eller barn med särskilda behov"
    },
    path: "special-needs-considerations-signals",
    filePath: "sections/01-developmental-signals/05-special-needs-considerations",
    type: 'subsection',
    section: "01",
    parentId: "section-01"
  },
  {
    id: 'case-study-progression',
    title: {
      en: "Case Study: Developmental Progression",
      sv: "Fallstudie: Utvecklingsprogression"
    },
    description: {
      en: "Example of a child progressing from Purple to Blue to Orange over 5 years",
      sv: "Exempel på ett barn som utvecklas från Lila till Blå till Orange under 5 år"
    },
    path: "case-study-progression",
    filePath: "sections/01-developmental-signals/06-case-study-progression",
    type: 'subsection',
    section: "01",
    parentId: "section-01"
  },
  {
    id: 'individual-progress-tracker',
    title: {
      en: "Individual Progress Tracker",
      sv: "Individuell Framstegsspårare"
    },
    description: {
      en: "Downloadable template to monitor stage-specific behaviors over time",
      sv: "Nedladdningsbar mall för att övervaka stadiespecifika beteenden över tid"
    },
    path: "individual-progress-tracker",
    filePath: "sections/tools/individual-progress-tracker",
    type: 'tool',
    section: "01",
    parentId: "section-01",
    isTool: true,
    isTemplate: true
  },
  {
    id: 'spiral-stage-timeline',
    title: {
      en: "Spiral Stage Timeline",
      sv: "Spiral Stadietidslinje"
    },
    description: {
      en: "Visual timeline sketch with age ranges from Beige to Green/early Yellow",
      sv: "Visuell tidslinjeskiss med åldersintervall från Beige till Grön/tidig Gul"
    },
    path: "spiral-stage-timeline",
    filePath: "sections/tools/spiral-stage-timeline",
    type: 'tool',
    section: "01",
    parentId: "section-01",
    isTool: true
  },
  {
    id: 'stage-signals-guide',
    title: {
      en: "Stage Signals Guide",
      sv: "Guide för Stadiesignaler"
    },
    description: {
      en: "One-page guide with behaviors, age ranges, and parenting tips for each stage",
      sv: "Ensidig guide med beteenden, åldersintervall och föräldratips för varje stadium"
    },
    path: "stage-signals-guide",
    filePath: "sections/tools/stage-signals-guide",
    type: 'tool',
    section: "01",
    parentId: "section-01",
    isTool: true
  }
];
