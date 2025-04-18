// src/lib/stores/organizationsGuideStore.ts
import { writable } from 'svelte/store';

// Types for chapters
interface ChapterTitle {
  en: string;
  sv: string;
}

export interface Chapter {
  number: string;
  title: ChapterTitle;
  description?: {
    en: string;
    sv: string;
  };
  path: string;
  isAppendix?: boolean;
}

// All chapters data
const allChapters: Chapter[] = [
  // Introduction
  { 
    number: "0", 
    title: { 
      en: "Introduction: From Inner Spirals to Collective Systems", 
      sv: "Introduktion: Från Inre Spiraler till Kollektiva System" 
    },
    description: {
      en: "Overview of Spiral Dynamics and how individual growth shapes collective dynamics",
      sv: "Översikt av Spiral Dynamics och hur individuell tillväxt formar kollektiv dynamik"
    },
    path: "introduction"
  },
  // Main chapters
  { 
    number: "I", 
    title: { 
      en: "Diagnosing Stage Patterns in Organizations & Communities", 
      sv: "Diagnostisera Stadiemönster i Organisationer & Samhällen" 
    },
    description: {
      en: "Understanding the dominant Spiral stage(s) in your organization or community",
      sv: "Förstå det dominerande Spiral-stadiet i din organisation eller gemenskap"
    },
    path: "I.-diagnosing-stage-patterns-in-organizations-and-communities"
  },
  { 
    number: "II", 
    title: { 
      en: "Facilitating Meetings Across Stages", 
      sv: "Facilitera Möten Över Olika Stadier" 
    },
    description: {
      en: "Strategies for effective facilitation that fosters inclusion and shared understanding",
      sv: "Strategier för effektiv facilitering som främjar inkludering och gemensam förståelse"
    },
    path: "II.-facilitating-meetings-across-stages"
  },
  { 
    number: "III", 
    title: { 
      en: "Conflict Resolution & Psychological Safety", 
      sv: "Konfliktlösning & Psykologisk Trygghet" 
    },
    description: {
      en: "De-pathologizing disagreement and using tier-aware mediation",
      sv: "Avpatologisera oenighet och använda nivå-medveten medling"
    },
    path: "III.-conflict-resolution-and-psychological-safety"
  },
  { 
    number: "IV", 
    title: { 
      en: "Spiral-Aware Hiring & Team Design", 
      sv: "Spiral-Medveten Rekrytering & Teamdesign" 
    },
    description: {
      en: "Hiring for values-fit and designing roles that match developmental needs",
      sv: "Rekrytera för värderingspassform och designa roller som matchar utvecklingsbehov"
    },
    path: "IV.-spiral-aware-hiring-and-team-design"
  },
  { 
    number: "V", 
    title: { 
      en: "Stage-Based Change Leadership & Communication", 
      sv: "Stadiebaserat Förändringsledarskap & Kommunikation" 
    },
    description: {
      en: "Communication practices and leadership moves for effective transformation",
      sv: "Kommunikationsmetoder och ledarskapsåtgärder för effektiv transformation"
    },
    path: "V.-stage-based-change-leadership-and-communication"
  },
  // Appendices
  { 
    number: "A", 
    title: { 
      en: "Spiral Stage Assessment Template", 
      sv: "Mall för Spiral-Stadiebedömning" 
    },
    description: {
      en: "Assessment template for organizations and communities",
      sv: "Bedömningsmall för organisationer och samhällen"
    },
    path: "VI.-appendix-a",
    isAppendix: true
  },
  { 
    number: "B", 
    title: { 
      en: "Spiral Maturity Matrix", 
      sv: "Spiral-Mognadsmatris" 
    },
    description: {
      en: "Aligning policies, culture, and processes by stage",
      sv: "Anpassa policyer, kultur och processer efter stadium"
    },
    path: "VI.-appendix-b",
    isAppendix: true
  },
  { 
    number: "C", 
    title: { 
      en: "Meeting Facilitation Checklist", 
      sv: "Checklista för Mötesfacilitering" 
    },
    description: {
      en: "Stage-aware prompts for effective meetings",
      sv: "Stadiemedvetna uppmaningar för effektiva möten"
    },
    path: "VI.-appendix-c",
    isAppendix: true
  },
  { 
    number: "D", 
    title: { 
      en: "Spiral Mediation Framework Template", 
      sv: "Mall för Spiral-Medlingsramverk" 
    },
    description: {
      en: "Detailed steps and examples for stage-based conflict resolution",
      sv: "Detaljerade steg och exempel för stadiebaserad konfliktlösning"
    },
    path: "VI.-appendix-d",
    isAppendix: true
  }
];

// Translations for guide elements
const guideTranslations = {
  en: {
    title: "Spiralizing Organizations & Communities",
    subtitle: "Practical strategies for aligning leadership, culture, and collaboration across diverse value systems",
    introduction: "This comprehensive guide offers practical approaches for integrating Spiral Dynamics in organizational and community settings. Learn how to diagnose stage patterns, facilitate across worldviews, resolve conflicts, design effective teams, and lead stage-aware change processes.",
    downloadPrompt: "Download the complete guide as PDF:",
    downloadButton: "Download PDF (English)",
    tableOfContentsTitle: "Table of Contents",
    mainChaptersTitle: "Main Chapters",
    appendicesTitle: "Appendices",
    loading: "Loading content...",
    error: "Error loading content.",
    tableOfContents: "Table of Contents",
    next: "Next Chapter",
    previous: "Previous Chapter",
    chapterText: "Chapter",
    appendixText: "Appendix",
    comingSoon: "Content coming soon"
  },
  sv: {
    title: "Spiralisera Organisationer & Gemenskaper",
    subtitle: "Praktiska strategier för att anpassa ledarskap, kultur och samarbete över olika värdesystem",
    introduction: "Denna omfattande guide erbjuder praktiska metoder för att integrera Spiral Dynamics i organisatoriska och samhälleliga miljöer. Lär dig att diagnostisera stadiemönster, facilitera över olika världsbilder, lösa konflikter, designa effektiva team och leda stadiemedvetna förändringsprocesser.",
    downloadPrompt: "Ladda ner hela guiden som PDF:",
    downloadButton: "Ladda ner PDF (Engelska)",
    tableOfContentsTitle: "Innehållsförteckning",
    mainChaptersTitle: "Huvudkapitel",
    appendicesTitle: "Bilagor",
    loading: "Laddar innehåll...",
    error: "Fel vid laddning av innehåll.",
    tableOfContents: "Innehållsförteckning",
    next: "Nästa Kapitel",
    previous: "Föregående Kapitel",
    chapterText: "Kapitel",
    appendixText: "Bilaga",
    comingSoon: "Innehåll kommer snart"
  }
};

// Filter helpers
export const getMainChapters = () => allChapters.filter(ch => !ch.isAppendix);
export const getAppendices = () => allChapters.filter(ch => ch.isAppendix);
export const getAllChapters = () => allChapters;

// Get a specific chapter by its path
export const getChapterByPath = (path: string) => allChapters.find(ch => ch.path === path);

// Get next and previous chapters
export const getAdjacentChapters = (currentPath: string) => {
  const index = allChapters.findIndex(ch => ch.path === currentPath);
  return {
    previous: index > 0 ? allChapters[index - 1] : null,
    next: index < allChapters.length - 1 ? allChapters[index + 1] : null
  };
};

// Create and export the store
export const organizationsGuideStore = writable({
  translations: guideTranslations,
  currentChapter: null as Chapter | null
});

// Export a helper to set the current chapter
export function setCurrentChapter(path: string) {
  const chapter = getChapterByPath(path);
  organizationsGuideStore.update(state => ({
    ...state,
    currentChapter: chapter || null
  }));
}
