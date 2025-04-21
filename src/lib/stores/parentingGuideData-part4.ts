// src/lib/stores/parentingGuideData-part4.ts

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

// Sections 6-7 of guide items
export const guideDataPart4: GuideItem[] = [
  // Section 6: Digital & Technology Integration in Spiral-Aware Education
  {
    id: 'section-06',
    title: {
      en: "Digital & Technology Integration in Spiral-Aware Education",
      sv: "Digital & Teknikintegration i Spiral-medveten Utbildning"
    },
    description: {
      en: "Guide parents and educators on aligning technology use with Spiral stages to support healthy development",
      sv: "Vägleda föräldrar och pedagoger om att anpassa teknikanvändning med Spiralstadier för att stödja hälsosam utveckling"
    },
    path: "technology-introduction",
    filePath: "sections/06-technology-integration/00-technology-introduction",
    type: 'section',
    section: "06"
  },
  {
    id: 'stage-specific-tech-use',
    title: {
      en: "Stage-Specific Tech Use",
      sv: "Stadiespecifik Teknikanvändning"
    },
    description: {
      en: "How technology impacts different developmental stages and age groups",
      sv: "Hur teknik påverkar olika utvecklingsstadier och åldersgrupper"
    },
    path: "stage-specific-tech-use",
    filePath: "sections/06-technology-integration/01-stage-specific-tech-use",
    type: 'subsection',
    section: "06",
    parentId: "section-06"
  },
  {
    id: 'benefits-and-risks',
    title: {
      en: "Benefits and Risks",
      sv: "Fördelar och Risker"
    },
    description: {
      en: "Stage-aligned benefits and risks of technology use for children",
      sv: "Stadieanpassade fördelar och risker med teknikanvändning för barn"
    },
    path: "benefits-and-risks",
    filePath: "sections/06-technology-integration/02-benefits-and-risks",
    type: 'subsection',
    section: "06",
    parentId: "section-06"
  },
  {
    id: 'parenting-strategies',
    title: {
      en: "Parenting Strategies",
      sv: "Föräldrastrategier"
    },
    description: {
      en: "Guidelines for managing screen time and fostering digital literacy at home",
      sv: "Riktlinjer för att hantera skärmtid och främja digital läskunnighet hemma"
    },
    path: "parenting-strategies",
    filePath: "sections/06-technology-integration/03-parenting-strategies",
    type: 'subsection',
    section: "06",
    parentId: "section-06"
  },
  {
    id: 'teaching-strategies',
    title: {
      en: "Teaching Strategies",
      sv: "Undervisningsstrategier"
    },
    description: {
      en: "Incorporating technology in classrooms in developmentally appropriate ways",
      sv: "Införliva teknik i klassrum på utvecklingsmässigt lämpliga sätt"
    },
    path: "teaching-strategies",
    filePath: "sections/06-technology-integration/04-teaching-strategies",
    type: 'subsection',
    section: "06",
    parentId: "section-06"
  },
  {
    id: 'special-needs-considerations-technology',
    title: {
      en: "Special Needs Considerations",
      sv: "Särskilda Behovsöverväganden"
    },
    description: {
      en: "Adapting technology for neurodivergent children with different needs",
      sv: "Anpassa teknik för neurodivergenta barn med olika behov"
    },
    path: "special-needs-considerations-technology",
    filePath: "sections/06-technology-integration/05-special-needs-considerations",
    type: 'subsection',
    section: "06",
    parentId: "section-06"
  },
  {
    id: 'tech-alignment-guide',
    title: {
      en: "Tech Alignment Guide",
      sv: "Teknikanpassningsguide"
    },
    description: {
      en: "One-page guide with stage-specific technology tips for each developmental stage",
      sv: "Ensidig guide med stadiespecifika tekniktips för varje utvecklingsstadium"
    },
    path: "tech-alignment-guide",
    filePath: "sections/tools/tech-alignment-guide",
    type: 'tool',
    section: "06",
    parentId: "section-06",
    isTool: true
  },
  
  // Section 7: Adapting to Cultural and Socioeconomic Contexts
  {
    id: 'section-07',
    title: {
      en: "Adapting to Cultural and Socioeconomic Contexts",
      sv: "Anpassning till Kulturella och Socioekonomiska Sammanhang"
    },
    description: {
      en: "Ensure tools are relevant across diverse cultural and socioeconomic settings",
      sv: "Säkerställa att verktyg är relevanta över olika kulturella och socioekonomiska miljöer"
    },
    path: "cultural-contexts-introduction",
    filePath: "sections/07-cultural-contexts/00-cultural-contexts-introduction",
    type: 'section',
    section: "07"
  },
  {
    id: 'cultural-influences',
    title: {
      en: "Cultural Influences",
      sv: "Kulturella Influenser"
    },
    description: {
      en: "How stages manifest in collectivist vs. individualist cultures",
      sv: "Hur stadier manifesteras i kollektivistiska kontra individualistiska kulturer"
    },
    path: "cultural-influences",
    filePath: "sections/07-cultural-contexts/01-cultural-influences",
    type: 'subsection',
    section: "07",
    parentId: "section-07"
  },
  {
    id: 'socioeconomic-adaptations',
    title: {
      en: "Socioeconomic Adaptations",
      sv: "Socioekonomiska Anpassningar"
    },
    description: {
      en: "Tailoring tools for resource-constrained environments and contexts",
      sv: "Anpassa verktyg för resursfattiga miljöer och sammanhang"
    },
    path: "socioeconomic-adaptations",
    filePath: "sections/07-cultural-contexts/02-socioeconomic-adaptations",
    type: 'subsection',
    section: "07",
    parentId: "section-07"
  },
  {
    id: 'special-needs-considerations-cultural',
    title: {
      en: "Special Needs Considerations",
      sv: "Särskilda Behovsöverväganden"
    },
    description: {
      en: "Adapting for neurodivergent children in diverse cultural contexts",
      sv: "Anpassa för neurodivergenta barn i olika kulturella sammanhang"
    },
    path: "special-needs-considerations-cultural",
    filePath: "sections/07-cultural-contexts/03-special-needs-considerations",
    type: 'subsection',
    section: "07",
    parentId: "section-07"
  },
  {
    id: 'case-studies',
    title: {
      en: "Case Studies",
      sv: "Fallstudier"
    },
    description: {
      en: "Examples of spiral-aware parenting/education in different cultural contexts",
      sv: "Exempel på spiralmedvetet föräldraskap/utbildning i olika kulturella sammanhang"
    },
    path: "case-studies",
    filePath: "sections/07-cultural-contexts/04-case-studies",
    type: 'subsection',
    section: "07",
    parentId: "section-07"
  },
  {
    id: 'master-adaptation-framework',
    title: {
      en: "Master Adaptation Framework",
      sv: "Huvudanpassningsramverk"
    },
    description: {
      en: "Step-by-step guide to customize tools for different cultural contexts",
      sv: "Steg-för-steg-guide för att anpassa verktyg för olika kulturella sammanhang"
    },
    path: "master-adaptation-framework",
    filePath: "sections/07-cultural-contexts/05-master-adaptation-framework",
    type: 'subsection',
    section: "07",
    parentId: "section-07"
  },
  {
    id: 'context-adaptation-guide',
    title: {
      en: "Context Adaptation Guide",
      sv: "Guide för Sammanhangasanpassning"
    },
    description: {
      en: "One-page guide with tailoring tips for different cultural contexts",
      sv: "Ensidig guide med anpassningstips för olika kulturella sammanhang"
    },
    path: "context-adaptation-guide",
    filePath: "sections/tools/context-adaptation-guide",
    type: 'tool',
    section: "07",
    parentId: "section-07",
    isTool: true
  }
];
