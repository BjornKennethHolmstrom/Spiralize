// src/lib/stores/parentingGuideData-part3.ts

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

// Sections 4-5 of guide items
export const guideDataPart3: GuideItem[] = [
  // Section 4: Navigating "Stage Gaps" Between Parents, Teachers & Kids
  {
    id: 'section-04',
    title: {
      en: "Navigating \"Stage Gaps\" Between Parents, Teachers & Kids",
      sv: "Navigera \"Stadiegap\" Mellan Föräldrar, Lärare & Barn"
    },
    description: {
      en: "Bridge developmental misalignments to reduce tension and support child growth",
      sv: "Överbrygga utvecklingsmässiga missmatchningar för att minska spänning och stödja barns tillväxt"
    },
    path: "stage-gaps-introduction",
    filePath: "sections/04-stage-gaps/00-stage-gaps-introduction",
    type: 'section',
    section: "04"
  },
  {
    id: 'common-misattunements',
    title: {
      en: "Common Misattunements",
      sv: "Vanliga Felavstämningar"
    },
    description: {
      en: "Examples of developmental misalignments between adults and children",
      sv: "Exempel på utvecklingsmässiga felaktig avstämning mellan vuxna och barn"
    },
    path: "common-misattunements",
    filePath: "sections/04-stage-gaps/01-common-misattunements",
    type: 'subsection',
    section: "04",
    parentId: "section-04"
  },
  {
    id: 'bridging-strategies',
    title: {
      en: "Bridging Strategies",
      sv: "Överbryggande Strategier"
    },
    description: {
      en: "Empathy and dialogue techniques to align adults and kids across developmental stages",
      sv: "Empati- och dialogtekniker för att anpassa vuxna och barn över utvecklingsstadier"
    },
    path: "bridging-strategies",
    filePath: "sections/04-stage-gaps/02-bridging-strategies",
    type: 'subsection',
    section: "04",
    parentId: "section-04"
  },
  {
    id: 'supporting-faster-evolution',
    title: {
      en: "Supporting Faster Evolution",
      sv: "Stödja Snabbare Evolution"
    },
    description: {
      en: "Holding space for children outpacing caregivers in developmental growth",
      sv: "Hålla utrymme för barn som går om omsorgsgivare i utvecklingstillväxt"
    },
    path: "supporting-faster-evolution",
    filePath: "sections/04-stage-gaps/03-supporting-faster-evolution",
    type: 'subsection',
    section: "04",
    parentId: "section-04"
  },
  {
    id: 'parent-self-development',
    title: {
      en: "Parent Self-Development",
      sv: "Föräldrars Självutveckling"
    },
    description: {
      en: "Reflective prompts to explore how parents' own stages impact parenting",
      sv: "Reflekterande frågor för att utforska hur föräldrars egna stadier påverkar föräldraskap"
    },
    path: "parent-self-development",
    filePath: "sections/04-stage-gaps/04-parent-self-development",
    type: 'subsection',
    section: "04",
    parentId: "section-04"
  },
  {
    id: 'communication-practices',
    title: {
      en: "Communication Practices",
      sv: "Kommunikationspraxis"
    },
    description: {
      en: "Spiral-sensitive parent-teacher collaboration techniques and strategies",
      sv: "Spiralkänsliga föräldrar-lärare samarbetstekniker och strategier"
    },
    path: "communication-practices",
    filePath: "sections/04-stage-gaps/05-communication-practices",
    type: 'subsection',
    section: "04",
    parentId: "section-04"
  },
  {
    id: 'transition-toolkit-gaps',
    title: {
      en: "Transition Toolkit",
      sv: "Övergångsverktygslåda"
    },
    description: {
      en: "Scripts for navigating stage gap tensions and major life transitions",
      sv: "Manus för att navigera stadieklyfta-spänningar och större livsövergångar"
    },
    path: "transition-toolkit-gaps",
    filePath: "sections/04-stage-gaps/06-transition-toolkit",
    type: 'subsection',
    section: "04",
    parentId: "section-04"
  },
  {
    id: 'special-needs-considerations-gaps',
    title: {
      en: "Special Needs Considerations",
      sv: "Särskilda Behovsöverväganden"
    },
    description: {
      en: "Adapting collaboration for neurodivergent children with different needs",
      sv: "Anpassa samarbete för neurodivergenta barn med olika behov"
    },
    path: "special-needs-considerations-gaps",
    filePath: "sections/04-stage-gaps/07-special-needs-considerations",
    type: 'subsection',
    section: "04",
    parentId: "section-04"
  },
  {
    id: 'family-teacher-stage-awareness-map',
    title: {
      en: "Family/Teacher Stage Awareness Map",
      sv: "Familje/Lärar Stadiemedvetenhetskarta"
    },
    description: {
      en: "Worksheet for mapping developmental stages in a family or classroom system",
      sv: "Arbetsblad för kartläggning av utvecklingsstadier i ett familje- eller klassrumssystem"
    },
    path: "family-teacher-stage-awareness-map",
    filePath: "sections/tools/family-teacher-stage-awareness-map",
    type: 'tool',
    section: "04",
    parentId: "section-04",
    isTool: true,
    isWorksheet: true
  },

  // Section 5: Spiral-Aligned Curriculum & School Transformation
  {
    id: 'section-05',
    title: {
      en: "Spiral-Aligned Curriculum & School Transformation",
      sv: "Spiral-anpassad Läroplan & Skoltransformation"
    },
    description: {
      en: "Design curricula and school systems that nurture stage-appropriate growth and inspire systemic reform",
      sv: "Designa läroplaner och skolsystem som främjar stadielämplig tillväxt och inspirerar systemisk reform"
    },
    path: "curriculum-introduction",
    filePath: "sections/05-curriculum-transformation/00-curriculum-introduction",
    type: 'section',
    section: "05"
  },
  {
    id: 'spiral-informed-subjects',
    title: {
      en: "Spiral-Informed Subjects",
      sv: "Spiral-informerade Ämnen"
    },
    description: {
      en: "Competencies by age/stage across different subject areas",
      sv: "Kompetenser per ålder/stadium över olika ämnesområden"
    },
    path: "spiral-informed-subjects",
    filePath: "sections/05-curriculum-transformation/01-spiral-informed-subjects",
    type: 'subsection',
    section: "05",
    parentId: "section-05"
  },
  {
    id: 'curriculum-scaffolding',
    title: {
      en: "Curriculum Scaffolding",
      sv: "Läroplansstöd"
    },
    description: {
      en: "Progression from ethics to systems thinking to being across developmental stages",
      sv: "Progression från etik till systemtänkande till varande över utvecklingsstadier"
    },
    path: "curriculum-scaffolding",
    filePath: "sections/05-curriculum-transformation/02-curriculum-scaffolding",
    type: 'subsection',
    section: "05",
    parentId: "section-05"
  },
  {
    id: 'school-wide-practices',
    title: {
      en: "School-Wide Practices",
      sv: "Skolövergripande Praktiker"
    },
    description: {
      en: "Spiral-integrated assemblies, restorative justice, and choice-based assessments",
      sv: "Spiral-integrerade samlingar, återupprättande rättvisa och valbaserade bedömningar"
    },
    path: "school-wide-practices",
    filePath: "sections/05-curriculum-transformation/03-school-wide-practices",
    type: 'subsection',
    section: "05",
    parentId: "section-05"
  },
  {
    id: 'team-development',
    title: {
      en: "Team Development",
      sv: "Teamutveckling"
    },
    description: {
      en: "Workshops to foster spiral literacy in teaching staff and administrative teams",
      sv: "Workshops för att främja spiralläskunnighet hos lärarpersonal och administrativa team"
    },
    path: "team-development",
    filePath: "sections/05-curriculum-transformation/04-team-development",
    type: 'subsection',
    section: "05",
    parentId: "section-05"
  },
  {
    id: 'special-needs-considerations-curriculum',
    title: {
      en: "Special Needs Considerations",
      sv: "Särskilda Behovsöverväganden"
    },
    description: {
      en: "Inclusive practices and differentiated assessments for neurodivergent learners",
      sv: "Inkluderande praktiker och differentierade bedömningar för neurodivergenta elever"
    },
    path: "special-needs-considerations-curriculum",
    filePath: "sections/05-curriculum-transformation/05-special-needs-considerations",
    type: 'subsection',
    section: "05",
    parentId: "section-05"
  },
  {
    id: 'visionary-section',
    title: {
      en: "Visionary Section",
      sv: "Visionärt Avsnitt"
    },
    description: {
      en: "Model for Yellow/Turquoise schooling with holistic, adaptive learning ecosystems",
      sv: "Modell för Gul/Turkos skolning med holistiska, adaptiva lärandeekosystem"
    },
    path: "visionary-section",
    filePath: "sections/05-curriculum-transformation/06-visionary-section",
    type: 'subsection',
    section: "05",
    parentId: "section-05"
  },
  {
    id: 'curriculum-snapshot',
    title: {
      en: "Curriculum Snapshot",
      sv: "Läroplansbild"
    },
    description: {
      en: "One-page guide with stage-appropriate subjects for each age group",
      sv: "Ensidig guide med stadielämpliga ämnen för varje åldersgrupp"
    },
    path: "curriculum-snapshot",
    filePath: "sections/tools/curriculum-snapshot",
    type: 'tool',
    section: "05",
    parentId: "section-05",
    isTool: true
  },
  {
    id: 'school-transformation-metrics',
    title: {
      en: "School Transformation Metrics",
      sv: "Skoltransformationsmetriker"
    },
    description: {
      en: "Template for measuring and tracking spiral integration in educational settings",
      sv: "Mall för att mäta och spåra spiralintegration i utbildningsmiljöer"
    },
    path: "school-transformation-metrics",
    filePath: "sections/tools/school-transformation-metrics",
    type: 'tool',
    section: "05",
    parentId: "section-05",
    isTool: true,
    isTemplate: true
  }
];
