// src/lib/stores/spiritualGuideTypes.ts

// Define the shape of a guide item title
export interface ItemTitle {
  en: string;
  sv: string;
}

// Define the shape of a guide item description
export interface ItemDescription {
  en: string;
  sv: string;
}

// Define the main GuideItem interface used throughout the store
export interface GuideItem {
  id: string;
  title: ItemTitle;
  description?: ItemDescription;
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

// Define the translation object structure
export interface SpiritualGuideTranslations {
  [language: string]: {
    title: string;
    subtitle: string;
    introduction: string;
    forWhom: string;
    forWhomContent: string[];
    downloadPrompt: string;
    downloadButton: string;
    quickStartGuidesTitle: string;
    toolkitSectionsTitle: string;
    sectionText: string;
    toolText: string;
    appendixText: string;
    resources: string;
    tableOfContents: string;
    previous: string;
    next: string;
    loading: string;
    comingSoon: string;
    error: string;
  };
}
