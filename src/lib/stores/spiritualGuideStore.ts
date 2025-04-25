// src/lib/stores/spiritualGuideStore.ts
import { writable } from 'svelte/store';
import { guideDataPart1 } from './spiritualGuideData-part1';
import { guideDataPart2 } from './spiritualGuideData-part2';
import { guideDataPart3 } from './spiritualGuideData-part3';
import { guideDataPart4 } from './spiritualGuideData-part4';
import { guideDataPart5 } from './spiritualGuideData-part5';

// Define translations
export const guideTranslations = {
  en: {
    title: "The Spiritual & Mystical Spiral",
    subtitle: "A Guide to Awakening Through Spiral Dynamics",
    introduction: "Explore how spiritual and mystical experiences transform across stages of consciousness development. This guide maps stage-specific practices, challenges, and insights to help you navigate your own awakening journey.",
    forWhom: "Who is this guide for?",
    forWhomContent: [
      "Spiritual seekers looking to understand their experiences within a developmental framework",
      "Practitioners curious about the relationship between consciousness evolution and mystical states",
      "Coaches and therapists working with clients on spiritual emergence",
      "Anyone experiencing a spiritual crisis or dark night of the soul",
      "Community builders integrating diverse spiritual perspectives"
    ],
    downloadPrompt: "Want to read offline or share with others?",
    downloadButton: "Download PDF Guide",
    quickStartGuidesTitle: "Quick Reference Guides",
    toolkitSectionsTitle: "Explore the Spiral",
    sectionText: "Section",
    toolText: "Tool",
    appendixText: "Appendix",
    resources: "Resources",
    tableOfContents: "Guide Contents",
    previous: "Previous",
    next: "Next",
    loading: "Loading content...",
    comingSoon: "This content is coming soon. Check back later for updates!",
    error: "Error loading content. Please try again later."
  },
  sv: {
    title: "Den Andliga & Mystiska Spiralen",
    subtitle: "En guide till uppvaknande genom Spiral Dynamics",
    introduction: "Utforska hur andliga och mystiska upplevelser transformeras genom medvetandets utvecklingsstadier. Denna guide kartlägger stadiespecifika övningar, utmaningar och insikter för att hjälpa dig navigera din egen uppvaknanderesa.",
    forWhom: "Vem är denna guide för?",
    forWhomContent: [
      "Andliga sökare som vill förstå sina upplevelser inom ett utvecklingsramverk",
      "Utövare som är nyfikna på relationen mellan medvetandets evolution och mystiska tillstånd",
      "Coacher och terapeuter som arbetar med klienter i andlig uppkomst",
      "Alla som upplever en andlig kris eller själens mörka natt",
      "Gemenskapsbyggare som integrerar olika andliga perspektiv"
    ],
    downloadPrompt: "Vill du läsa offline eller dela med andra?",
    downloadButton: "Ladda ner PDF-guiden",
    quickStartGuidesTitle: "Snabbreferensguider",
    toolkitSectionsTitle: "Utforska Spiralen",
    sectionText: "Avsnitt",
    toolText: "Verktyg",
    appendixText: "Appendix",
    resources: "Resurser",
    tableOfContents: "Guideinnehåll",
    previous: "Föregående",
    next: "Nästa",
    loading: "Laddar innehåll...",
    comingSoon: "Detta innehåll kommer snart. Kom tillbaka senare för uppdateringar!",
    error: "Fel vid laddning av innehåll. Försök igen senare."
  }
};

// Define all guide data parts inline
// Adjusting the GuideItem interface declaration to be defined inline
interface ItemTitle {
  en: string;
  sv: string;
}

interface ItemDescription {
  en: string;
  sv: string;
}

interface GuideItem {
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

interface SpiritualGuideState {
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

export const getAppendices = () => 
  allGuideItems.filter(item => item.isAppendix);

export const getAllItems = () => allGuideItems;

// Get items by developmental stage
export const getItemsByStage = (stage: string) => 
  allGuideItems.filter(
    item => item.hasStageSpecificContent && item.stages && item.stages.includes(stage)
  );

// Get a specific item by its path
export const getItemByPath = (path: string) => 
  allGuideItems.find(item => item.path === path);

// Get all resources for a specific section
export const getSectionResources = (sectionId: string) => 
  allGuideItems.filter(item => 
    item.parentId === sectionId && 
    (item.isTool || item.isAppendix)
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
  return allGuideItems.filter(item => item.isQuickReference);
};

// Create and export the store
export const spiritualGuideStore = writable<SpiritualGuideState>({
  translations: guideTranslations,
  currentItem: null,
  showTableOfContents: false
});

// Export functions to manage the store
export function setCurrentItem(path: string) {
  const item = getItemByPath(path);
  spiritualGuideStore.update(state => ({
    ...state,
    currentItem: item || null
  }));
}

export function toggleTableOfContents() {
  spiritualGuideStore.update(state => ({
    ...state,
    showTableOfContents: !state.showTableOfContents
  }));
}

// Get items specific to a Tier (First, Second, Third)
export const getItemsByTier = (tier: 'first' | 'second' | 'third') => {
  const tierMap = {
    'first': ['beige', 'purple', 'red', 'blue', 'orange', 'green'],
    'second': ['yellow', 'turquoise'],
    'third': ['coral', 'ultraviolet', 'clear']
  };
  
  const stages = tierMap[tier];
  
  return allGuideItems.filter(
    item => item.hasStageSpecificContent && 
           item.stages && 
           item.stages.some(stage => stages.includes(stage))
  );
};

// Get tools and practices that are universal (work across all stages)
export const getUniversalTools = () => 
  allGuideItems.filter(
    item => (item.isTool || item.type === 'subsection') && 
           item.path.includes('universal')
  );
