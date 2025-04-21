// src/lib/stores/parentingGuideData-part2.ts

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

// Sections 2-3 of guide items
export const guideDataPart2: GuideItem[] = [
  // Section 2: Stage-Appropriate Discipline, Communication & Storytelling
  {
    id: 'section-02',
    title: {
      en: "Stage-Appropriate Discipline, Communication & Storytelling",
      sv: "Stadielämplig Disciplin, Kommunikation & Berättande"
    },
    description: {
      en: "Equip adults with communication and discipline strategies that resonate with a child's developmental stage",
      sv: "Utrusta vuxna med kommunikations- och disciplinstrategier som överensstämmer med ett barns utvecklingsstadium"
    },
    path: "communication-introduction",
    filePath: "sections/02-communication-discipline/00-communication-introduction",
    type: 'section',
    section: "02"
  },
  {
    id: 'stage-aligned-language',
    title: {
      en: "Stage-Aligned Language",
      sv: "Stadieanpassat Språk"
    },
    description: {
      en: "Communication styles for each stage, tied to age ranges",
      sv: "Kommunikationsstilar för varje stadium, kopplade till åldersintervall"
    },
    path: "stage-aligned-language",
    filePath: "sections/02-communication-discipline/01-stage-aligned-language",
    type: 'subsection',
    section: "02",
    parentId: "section-02"
  },
  {
    id: 'discipline-dos-and-donts',
    title: {
      en: "Discipline Do's and Don'ts",
      sv: "Disciplin Gör och Gör Inte"
    },
    description: {
      en: "Feedback and behavior management tips for each developmental stage",
      sv: "Tips för återkoppling och beteendehantering för varje utvecklingsstadium"
    },
    path: "discipline-dos-and-donts",
    filePath: "sections/02-communication-discipline/02-discipline-dos-and-donts",
    type: 'subsection',
    section: "02",
    parentId: "section-02"
  },
  {
    id: 'storytelling-techniques',
    title: {
      en: "Storytelling Techniques",
      sv: "Berättartekniker"
    },
    description: {
      en: "Age-stage-aligned methods for effective storytelling and communication",
      sv: "Ålders-stadieanpassade metoder för effektivt berättande och kommunikation"
    },
    path: "storytelling-techniques",
    filePath: "sections/02-communication-discipline/03-storytelling-techniques",
    type: 'subsection',
    section: "02",
    parentId: "section-02"
  },
  {
    id: 'encouraging-responsibility',
    title: {
      en: "Encouraging Responsibility",
      sv: "Uppmuntra Ansvar"
    },
    description: {
      en: "Strategies to foster accountability without forcing stage transitions",
      sv: "Strategier för att främja ansvarsskyldighet utan att tvinga stadieövergångar"
    },
    path: "encouraging-responsibility",
    filePath: "sections/02-communication-discipline/04-encouraging-responsibility",
    type: 'subsection',
    section: "02",
    parentId: "section-02"
  },
  {
    id: 'client-communication-tools',
    title: {
      en: "Client Communication Tools",
      sv: "Klientkommunikationsverktyg"
    },
    description: {
      en: "Templates for explaining stages to parents/students in non-technical language",
      sv: "Mallar för att förklara stadier för föräldrar/studenter på icke-tekniskt språk"
    },
    path: "client-communication-tools",
    filePath: "sections/02-communication-discipline/05-client-communication-tools",
    type: 'subsection',
    section: "02",
    parentId: "section-02"
  },
  {
    id: 'transition-toolkit-communication',
    title: {
      en: "Transition Toolkit",
      sv: "Övergångsverktygslåda"
    },
    description: {
      en: "Scripts for handling resistance during stage shifts and major life transitions",
      sv: "Manus för att hantera motstånd under stadieskiften och större livsövergångar"
    },
    path: "transition-toolkit-communication",
    filePath: "sections/02-communication-discipline/06-transition-toolkit",
    type: 'subsection',
    section: "02",
    parentId: "section-02"
  },
  {
    id: 'special-needs-considerations-communication',
    title: {
      en: "Special Needs Considerations",
      sv: "Särskilda Behovsöverväganden"
    },
    description: {
      en: "Adapting communication for neurodivergent children with different needs",
      sv: "Anpassa kommunikation för neurodivergenta barn med olika behov"
    },
    path: "special-needs-considerations-communication",
    filePath: "sections/02-communication-discipline/07-special-needs-considerations",
    type: 'subsection',
    section: "02",
    parentId: "section-02"
  },
  {
    id: 'spiral-scripts',
    title: {
      en: "Spiral Scripts",
      sv: "Spiral-manus"
    },
    description: {
      en: "Stage-appropriate scripts for common scenarios and life transitions",
      sv: "Stadielämpliga manus för vanliga scenarier och livsövergångar"
    },
    path: "spiral-scripts",
    filePath: "sections/tools/spiral-scripts",
    type: 'tool',
    section: "02",
    parentId: "section-02",
    isTool: true,
    isTemplate: true
  },
  {
    id: 'conversation-starters',
    title: {
      en: "Conversation Starters",
      sv: "Konversationsstartare"
    },
    description: {
      en: "Ready-to-use conversation prompts for parent-teacher discussions across stages",
      sv: "Klara-att-använda konversationspåminnelser för föräldra-lärarsamtal över stadier"
    },
    path: "conversation-starters",
    filePath: "sections/tools/conversation-starters",
    type: 'tool',
    section: "02",
    parentId: "section-02",
    isTool: true
  },

  // Section 3: Integrating Montessori, Waldorf & Project-Based Learning
  {
    id: 'section-03',
    title: {
      en: "Integrating Montessori, Waldorf & Project-Based Learning",
      sv: "Integrering av Montessori, Waldorf & Projektbaserat Lärande"
    },
    description: {
      en: "Align alternative pedagogies with Spiral stages to enhance learning without ideological rigidity",
      sv: "Anpassa alternativa pedagogiker med Spiralstadier för att förbättra lärande utan ideologisk rigiditet"
    },
    path: "pedagogies-introduction",
    filePath: "sections/03-pedagogies/00-pedagogies-introduction",
    type: 'section',
    section: "03"
  },
  {
    id: 'montessori-mapping',
    title: {
      en: "Montessori Mapping",
      sv: "Montessori-kartläggning"
    },
    description: {
      en: "Independence-building aligned with early Orange/Yellow developmental stages",
      sv: "Självständighetsbyggande i linje med tidiga Orange/Gul utvecklingsstadier"
    },
    path: "montessori-mapping",
    filePath: "sections/03-pedagogies/01-montessori-mapping",
    type: 'subsection',
    section: "03",
    parentId: "section-03"
  },
  {
    id: 'waldorf-mapping',
    title: {
      en: "Waldorf Mapping",
      sv: "Waldorf-kartläggning"
    },
    description: {
      en: "Structured creativity aligned with Purple/Blue/Green developmental stages",
      sv: "Strukturerad kreativitet i linje med Lila/Blå/Grön utvecklingsstadier"
    },
    path: "waldorf-mapping",
    filePath: "sections/03-pedagogies/02-waldorf-mapping",
    type: 'subsection',
    section: "03",
    parentId: "section-03"
  },
  {
    id: 'project-based-learning',
    title: {
      en: "Project-Based Learning",
      sv: "Projektbaserat Lärande"
    },
    description: {
      en: "Cross-stage methods for exploration tailored to different developmental needs",
      sv: "Tvärstadiemetoder för utforskning anpassade till olika utvecklingsbehov"
    },
    path: "project-based-learning",
    filePath: "sections/03-pedagogies/03-project-based-learning",
    type: 'subsection',
    section: "03",
    parentId: "section-03"
  },
  {
    id: 'traditional-vs-spiral-aligned',
    title: {
      en: "Traditional vs. Spiral-Aligned",
      sv: "Traditionell vs. Spiral-anpassad"
    },
    description: {
      en: "Contrast with standard Orange-stage schooling and other traditional approaches",
      sv: "Kontrast med standard Orange-stadie skolning och andra traditionella metoder"
    },
    path: "traditional-vs-spiral-aligned",
    filePath: "sections/03-pedagogies/04-traditional-vs-spiral-aligned",
    type: 'subsection',
    section: "03",
    parentId: "section-03"
  },
  {
    id: 'blending-systems',
    title: {
      en: "Blending Systems",
      sv: "Blanda System"
    },
    description: {
      en: "Guidelines for combining pedagogies coherently to avoid developmental regressions",
      sv: "Riktlinjer för att kombinera pedagogiker koherent för att undvika utvecklingsregressioner"
    },
    path: "blending-systems",
    filePath: "sections/03-pedagogies/05-blending-systems",
    type: 'subsection',
    section: "03",
    parentId: "section-03"
  },
  {
    id: 'framework-integration',
    title: {
      en: "Framework Integration",
      sv: "Ramverksintegration"
    },
    description: {
      en: "Table linking pedagogies to Common Core or IB curricular frameworks",
      sv: "Tabell som kopplar pedagogiker till Common Core eller IB läroplanramverk"
    },
    path: "framework-integration",
    filePath: "sections/03-pedagogies/06-framework-integration",
    type: 'subsection',
    section: "03",
    parentId: "section-03"
  },
  {
    id: 'special-needs-considerations-pedagogies',
    title: {
      en: "Special Needs Considerations",
      sv: "Särskilda Behovsöverväganden"
    },
    description: {
      en: "Adapting pedagogies for neurodivergent learners with different needs",
      sv: "Anpassa pedagogiker för neurodivergenta elever med olika behov"
    },
    path: "special-needs-considerations-pedagogies",
    filePath: "sections/03-pedagogies/07-special-needs-considerations",
    type: 'subsection',
    section: "03",
    parentId: "section-03"
  },
  {
    id: 'pedagogy-alignment-guide',
    title: {
      en: "Pedagogy Alignment Guide",
      sv: "Guide för Pedagogikanpassning"
    },
    description: {
      en: "One-page guide summarizing each pedagogy's stage connections and applications",
      sv: "Ensidig guide som sammanfattar varje pedagogiks stadieanknytningar och tillämpningar"
    },
    path: "pedagogy-alignment-guide",
    filePath: "sections/tools/pedagogy-alignment-guide",
    type: 'tool',
    section: "03",
    parentId: "section-03",
    isTool: true
  }
];
