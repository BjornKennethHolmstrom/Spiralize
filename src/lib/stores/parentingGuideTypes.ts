// src/lib/stores/parentingGuideTypes.ts
// This file contains the type definitions for the parenting guide

// Types for guide items
export interface ItemTitle {
  en: string;
  sv: string;
}

export interface GuideItem {
  id: string;
  title: ItemTitle;
  description?: {
    en: string;
    sv: string;
  };
  path: string;
  filePath?: string;
  type: 'section' | 'subsection' | 'tool' | 'exercise' | 'intro';
  section?: string; // Section number (00, 01, 02, etc.)
  subsection?: string; // Subsection identifier like 01, 02 within a section
  isQuickReference?: boolean;
  isTemplate?: boolean;
  isTool?: boolean;
  isExercise?: boolean;
  isWorksheet?: boolean;
  parentId?: string; // Reference to parent section/subsection
}

// Guide translations interface
export interface GuideTranslations {
  [language: string]: {
    title: string;
    subtitle: string;
    introduction: string;
    downloadPrompt: string;
    downloadButton: string;
    tableOfContentsTitle: string;
    sectionsTitle: {
      [section: string]: string;
    };
    loading: string;
    error: string;
    tableOfContents: string;
    next: string;
    previous: string;
    sectionText: string;
    subsectionText: string;
    toolText: string;
    exerciseText: string;
    templateText: string;
    worksheetText: string;
    comingSoon: string;
    resources: string;
    forWhom: string;
    forWhomContent: string[];
    quickStartGuidesTitle: string;
    toolkitSectionsTitle: string;
  }
}

// Store state interface
export interface ParentingGuideState {
  translations: GuideTranslations;
  currentItem: GuideItem | null;
  showTableOfContents: boolean;
}
