// src/lib/stores/parentingGuideData-part5.ts

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

// Sections 8-9 of guide items
export const guideDataPart5: GuideItem[] = [
  // Section 8: Community Engagement & Peer Learning
  {
    id: 'section-08',
    title: {
      en: "Community Engagement & Peer Learning",
      sv: "Gemenskapsengagemang & Kollegialt Lärande"
    },
    description: {
      en: "Connect users to Spiralize.org's ecosystem and foster a spiral-aware parenting/education community",
      sv: "Koppla användare till Spiralize.orgs ekosystem och främja en spiralmedveten föräldraskap/utbildningsgemenskap"
    },
    path: "community-introduction",
    filePath: "sections/08-community-engagement/00-community-introduction",
    type: 'section',
    section: "08"
  },
  {
    id: 'spiralize-resources',
    title: {
      en: "Spiralize.org Resources",
      sv: "Spiralize.org Resurser"
    },
    description: {
      en: "Links to guides, blogs, or workshops on the Spiralize.org website",
      sv: "Länkar till guider, bloggar eller workshops på Spiralize.org-webbplatsen"
    },
    path: "spiralize-resources",
    filePath: "sections/08-community-engagement/01-spiralize-resources",
    type: 'subsection',
    section: "08",
    parentId: "section-08"
  },
  {
    id: 'curated-reading-list',
    title: {
      en: "Curated Reading List",
      sv: "Utvald Läslista"
    },
    description: {
      en: "Key books, articles, and resources for deepening spiral-aware parenting and education",
      sv: "Viktiga böcker, artiklar och resurser för att fördjupa spiralmedvetet föräldraskap och utbildning"
    },
    path: "curated-reading-list",
    filePath: "sections/08-community-engagement/02-curated-reading-list",
    type: 'subsection',
    section: "08",
    parentId: "section-08"
  },
  {
    id: 'community-of-practice',
    title: {
      en: "Community of Practice",
      sv: "Praxisgemenskap"
    },
    description: {
      en: "Guidelines for peer learning groups or supervision sessions",
      sv: "Riktlinjer för kollegiala lärandegrupper eller handledningssessioner"
    },
    path: "community-of-practice",
    filePath: "sections/08-community-engagement/03-community-of-practice",
    type: 'subsection',
    section: "08",
    parentId: "section-08"
  },
  {
    id: 'engagement-feedback',
    title: {
      en: "Engagement & Feedback",
      sv: "Engagemang & Återkoppling"
    },
    description: {
      en: "Ways to share case studies and provide feedback on the guide",
      sv: "Sätt att dela fallstudier och ge återkoppling på guiden"
    },
    path: "engagement-feedback",
    filePath: "sections/08-community-engagement/04-engagement-feedback",
    type: 'subsection',
    section: "08",
    parentId: "section-08"
  },
  
  // Section 9: Implementation Roadmap
  {
    id: 'section-09',
    title: {
      en: "Implementation Roadmap",
      sv: "Implementeringsplan"
    },
    description: {
      en: "Guide users through a structured approach to applying the guide effectively",
      sv: "Vägleda användare genom ett strukturerat tillvägagångssätt för att tillämpa guiden effektivt"
    },
    path: "implementation-introduction",
    filePath: "sections/09-implementation/00-implementation-introduction",
    type: 'section',
    section: "09"
  },
  {
    id: 'suggested-workflow',
    title: {
      en: "Suggested Workflow",
      sv: "Föreslagen Arbetsflöde"
    },
    description: {
      en: "Step-by-step approach to applying the guide's tools and resources",
      sv: "Steg-för-steg-metod för att tillämpa guidens verktyg och resurser"
    },
    path: "suggested-workflow",
    filePath: "sections/09-implementation/01-suggested-workflow",
    type: 'subsection',
    section: "09",
    parentId: "section-09"
  },
  {
    id: 'thirty-day-quick-start',
    title: {
      en: "30-Day Quick Start",
      sv: "30-dagars Snabbstart"
    },
    description: {
      en: "A month-long plan to begin implementing spiral-aware practices",
      sv: "En månadsplan för att börja implementera spiralmedvetna praktiker"
    },
    path: "thirty-day-quick-start",
    filePath: "sections/09-implementation/02-thirty-day-quick-start",
    type: 'subsection',
    section: "09",
    parentId: "section-09"
  },
  {
    id: 'troubleshooting-guide',
    title: {
      en: "Troubleshooting Guide",
      sv: "Felsökningsguide"
    },
    description: {
      en: "FAQs and solutions to common challenges in implementation",
      sv: "Vanliga frågor och lösningar på vanliga utmaningar vid implementering"
    },
    path: "troubleshooting-guide",
    filePath: "sections/09-implementation/03-troubleshooting-guide",
    type: 'subsection',
    section: "09",
    parentId: "section-09"
  }
];
