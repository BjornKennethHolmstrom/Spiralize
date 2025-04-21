// src/lib/stores/parentingGuideStore.ts
import { writable } from 'svelte/store';
import { guideDataPart1 } from './parentingGuideData-part1';
import { guideDataPart2 } from './parentingGuideData-part2';
import { guideDataPart3 } from './parentingGuideData-part3';
import { guideDataPart4 } from './parentingGuideData-part4';
import { guideDataPart5 } from './parentingGuideData-part5';
import { guideTranslations } from './parentingGuideTranslations';

// Define types inline to avoid import issues
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

interface ParentingGuideState {
  translations: typeof guideTranslations;
  currentItem: GuideItem | null;
  showTableOfContents: boolean;
}

// Combine all guide data parts into a single array
const allGuideItems: GuideItem[] = [
  ...guideDataPart1,
  ...guideDataPart2,
  ...guideDataPart3,
  ...guideDataPart4,
  ...guideDataPart5
];

// Filter helpers
export const getSection = (sectionId: string) => 
  allGuideItems.find(item => item.id === sectionId);

export const getIntroSection = () => 
  allGuideItems.find(item => item.id === 'section-00');

export const getMainSections = () => 
  allGuideItems.filter(item => 
    item.type === 'section' && 
    item.section !== undefined
  );

export const getSubsections = (sectionId: string) => 
  allGuideItems.filter(
    item => item.parentId === sectionId && item.type === 'subsection'
  );

export const getTools = (sectionId?: string) => {
  if (sectionId) {
    return allGuideItems.filter(
      item => item.parentId === sectionId && item.isTool
    );
  }
  return allGuideItems.filter(item => item.isTool);
};

export const getExercises = (sectionId?: string) => {
  if (sectionId) {
    return allGuideItems.filter(
      item => item.parentId === sectionId && item.isExercise
    );
  }
  return allGuideItems.filter(item => item.isExercise);
};

export const getTemplatesAndWorksheets = (sectionId?: string) => {
  if (sectionId) {
    return allGuideItems.filter(
      item => item.parentId === sectionId && (item.isTemplate || item.isWorksheet)
    );
  }
  return allGuideItems.filter(item => item.isTemplate || item.isWorksheet);
};

export const getAllItems = () => allGuideItems;

// Get a specific item by its path
export const getItemByPath = (path: string) => 
  allGuideItems.find(item => item.path === path);

// Get all resources for a specific section
export const getSectionResources = (sectionId: string) => 
  allGuideItems.filter(item => 
    item.parentId === sectionId && 
    (item.isTool || item.isExercise || item.isTemplate || item.isWorksheet)
  );

// Get next and previous items (main navigation)
export const getAdjacentItems = (currentPath: string) => {
  // Get only sections and subsections for navigation
  const navItems = allGuideItems.filter(
    item => item.type === 'section' || item.type === 'subsection'
  );
  
  const index = navItems.findIndex(item => item.path === currentPath);
  
  return {
    previous: index > 0 ? navItems[index - 1] : null,
    next: index < navItems.length - 1 ? navItems[index + 1] : null
  };
};

// Get quick reference items
export const getQuickReferenceItems = () => {
  return allGuideItems.filter(item => 
    item.isQuickReference || 
    item.path.includes('quick-start') || 
    item.id.includes('cheat-sheet')
  );
};

// Create and export the store
export const parentingGuideStore = writable<ParentingGuideState>({
  translations: guideTranslations,
  currentItem: null,
  showTableOfContents: false
});

// Export functions to manage the store
export function setCurrentItem(path: string) {
  const item = getItemByPath(path);
  parentingGuideStore.update(state => ({
    ...state,
    currentItem: item || null
  }));
}

export function toggleTableOfContents() {
  parentingGuideStore.update(state => ({
    ...state,
    showTableOfContents: !state.showTableOfContents
  }));
}
