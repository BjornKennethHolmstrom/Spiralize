// src/lib/stores/psychGuideStore.ts
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
  // Main chapters
  { 
    number: "01", 
    title: { 
      en: "Introduction", 
      sv: "Introduktion" 
    },
    description: {
      en: "Purpose, vision, and transformative potential of the Spiral approach",
      sv: "Syfte, vision och transformativ potential i Spiral-metoden"
    },
    path: "chapter-01"
  },
  { 
    number: "02", 
    title: { 
      en: "Spiral Dynamics Fundamentals", 
      sv: "Grunderna i Spiral Dynamics" 
    },
    description: {
      en: "The model explained: Colors, tiers, and developmental progression",
      sv: "Modellen förklarad: Färger, nivåer och utvecklingsprogression"
    },
    path: "chapter-02"
  },
  { 
    number: "03", 
    title: { 
      en: "Spiral Stage Psychology", 
      sv: "Spiral-stadiers Psykologi" 
    },
    description: {
      en: "Deep exploration of psychological worldviews from Beige to Coral",
      sv: "Djupgående utforskning av psykologiska världsbilder från Beige till Korall"
    },
    path: "chapter-03"
  },
  { 
    number: "04", 
    title: { 
      en: "The Matrix of Misalignment", 
      sv: "Felpassningsmatrisen" 
    },
    description: {
      en: "Understanding stage-environment mismatch and its psychological effects",
      sv: "Förståelse för stadie-miljö-obalans och dess psykologiska effekter"
    },
    path: "chapter-04"
  },
  { 
    number: "05", 
    title: { 
      en: "Spiral Shock and Transition Support", 
      sv: "Spiralchock och Övergångsstöd" 
    },
    description: {
      en: "Supporting clients through developmental crises and transitions",
      sv: "Stödja klienter genom utvecklingskriser och övergångar"
    },
    path: "chapter-05"
  },
  { 
    number: "06", 
    title: { 
      en: "Stage-Sensitive Therapeutic Approaches", 
      sv: "Stadie-känsliga Terapeutiska Metoder" 
    },
    description: {
      en: "Matching methods to developmental stages and needs",
      sv: "Anpassa metoder till utvecklingsstadier och behov"
    },
    path: "chapter-06"
  },
  { 
    number: "07", 
    title: { 
      en: "Crisis Intervention Through a Spiral Lens", 
      sv: "Krisintervention genom Spiral-perspektiv" 
    },
    description: {
      en: "Grounded tools for acute distress across stages",
      sv: "Grundade verktyg för akut stress över olika stadier"
    },
    path: "chapter-07"
  },
  { 
    number: "08", 
    title: { 
      en: "Relational Dynamics", 
      sv: "Relationsdynamik" 
    },
    description: {
      en: "Working with developmental asymmetries in relationships",
      sv: "Arbeta med utvecklingsasymmetrier i relationer"
    },
    path: "chapter-08"
  },
  { 
    number: "09", 
    title: { 
      en: "Integrating Spiral with Other Modalities", 
      sv: "Integrera Spiral med Andra Modaliteter" 
    },
    description: {
      en: "Combining Spiral Dynamics with established therapeutic approaches",
      sv: "Kombinera Spiral Dynamics med etablerade terapeutiska metoder"
    },
    path: "chapter-09"
  },
  { 
    number: "10", 
    title: { 
      en: "Spiral-Sensitive Organizational Design", 
      sv: "Spiral-känslig Organisationsdesign" 
    },
    description: {
      en: "Applications for teams, communities, and systemic change",
      sv: "Tillämpningar för team, gemenskaper och systemisk förändring"
    },
    path: "chapter-10"
  },
  // Future chapters
  { 
    number: "11", 
    title: { 
      en: "Therapist's Own Developmental Awareness", 
      sv: "Terapeutens Egen Utvecklingsmedvetenhet" 
    },
    description: {
      en: "Self-assessment and growth across the spiral",
      sv: "Självbedömning och tillväxt genom spiralen"
    },
    path: "chapter-11"
  },
  { 
    number: "12", 
    title: { 
      en: "Cultural, Demographic, and Contextual Sensitivity", 
      sv: "Kulturell, Demografisk och Kontextuell Känslighet" 
    },
    description: {
      en: "Spiral expressions across diverse populations and contexts",
      sv: "Spiral-uttryck över olika populationer och kontexter"
    },
    path: "chapter-12"
  },
  { 
    number: "13", 
    title: { 
      en: "Explaining Spiral to Clients", 
      sv: "Förklara Spiral för Klienter" 
    },
    description: {
      en: "When and how to introduce the model in stage-appropriate language",
      sv: "När och hur man introducerar modellen på stadielämpligt språk"
    },
    path: "chapter-13"
  },
  { 
    number: "14", 
    title: { 
      en: "Second-Tier & Transpersonal Therapeutic Work", 
      sv: "Andra-skiktets & Transpersonellt Terapeutiskt Arbete" 
    },
    description: {
      en: "Working with integrative consciousness and complexity",
      sv: "Arbeta med integrativt medvetande och komplexitet"
    },
    path: "chapter-14"
  },
  { 
    number: "15", 
    title: { 
      en: "Longitudinal Case Studies", 
      sv: "Longitudinella Fallstudier" 
    },
    description: {
      en: "Stories of transformation across time and stage transitions",
      sv: "Berättelser om transformation över tid och stadieövergångar"
    },
    path: "chapter-15"
  },
  { 
    number: "16", 
    title: { 
      en: "Research, Ethics, and Evidence Base", 
      sv: "Forskning, Etik och Evidensbas" 
    },
    description: {
      en: "Connections to developmental psychology and empirical support",
      sv: "Kopplingar till utvecklingspsykologi och empiriskt stöd"
    },
    path: "chapter-16"
  },
  { 
    number: "17", 
    title: { 
      en: "Implementation Roadmap", 
      sv: "Implementeringsplan" 
    },
    description: {
      en: "Bringing Spiral awareness into clinical practice and organizations",
      sv: "Införa Spiral-medvetenhet i klinisk praktik och organisationer"
    },
    path: "chapter-17"
  },
  // Appendices
  { 
    number: "A", 
    title: { 
      en: "Stage Quick Reference Sheets", 
      sv: "Snabbreferensblad för Stadier" 
    },
    description: {
      en: "Condensed clinical summaries for each stage",
      sv: "Kondenserade kliniska sammanfattningar för varje stadium"
    },
    path: "appendix-a",
    isAppendix: true
  },
  { 
    number: "B", 
    title: { 
      en: "Extended Spiral: Coral, Indigo, and Beyond", 
      sv: "Utökad Spiral: Korall, Indigo och Bortom" 
    },
    description: {
      en: "Exploration of post-second-tier stages and mystical emergence",
      sv: "Utforskning av post-andra-skiktets stadier och mystisk framväxt"
    },
    path: "appendix-b",
    isAppendix: true
  },
  { 
    number: "C", 
    title: { 
      en: "Spiral-Aware Assessment Tools", 
      sv: "Spiralmedvetna Bedömningsverktyg" 
    },
    description: {
      en: "Intake questions and developmental assessment frameworks",
      sv: "Intagsfrågor och ramverk för utvecklingsbedömning"
    },
    path: "appendix-c",
    isAppendix: true
  },
  { 
    number: "D", 
    title: { 
      en: "Crisis Support Cards by Stage", 
      sv: "Krisstödskort per Stadium" 
    },
    description: {
      en: "Stabilization scripts tailored to each developmental stage",
      sv: "Stabiliseringsmanus anpassade för varje utvecklingsstadium"
    },
    path: "appendix-d",
    isAppendix: true
  },
  { 
    number: "E", 
    title: { 
      en: "Modern Contexts: Digital Age & Emergent Challenges", 
      sv: "Moderna Kontexter: Digital Ålder & Framväxande Utmaningar" 
    },
    description: {
      en: "Social media's impact on development and identity formation",
      sv: "Sociala mediers påverkan på utveckling och identitetsbildning"
    },
    path: "appendix-e",
    isAppendix: true
  },
  { 
    number: "F", 
    title: { 
      en: "Glossary and Further Resources", 
      sv: "Ordlista och Ytterligare Resurser" 
    },
    description: {
      en: "Spiral, psychological, and metaphysical terminology",
      sv: "Spiral, psykologisk och metafysisk terminologi"
    },
    path: "appendix-f",
    isAppendix: true
  },
  { 
    number: "G", 
    title: { 
      en: "Mystics, Visionaries, and Edges of Evolution", 
      sv: "Mystiker, Visionärer och Evolutionens Kanter" 
    },
    description: {
      en: "The spiritual dimensions of Spiral-aware therapy",
      sv: "De andliga dimensionerna av Spiral-medveten terapi"
    },
    path: "appendix-g",
    isAppendix: true
  }
];

// Translations for guide elements
const guideTranslations = {
  en: {
    title: "Spiral-Aware Mental Health & Therapeutic Guide",
    subtitle: "Bridging Developmental Psychology, Therapy, and Conscious Evolution",
    introduction: "This comprehensive guide explores the application of Spiral Dynamics to mental health, therapeutic practice, and human development. It offers a framework for understanding psychological challenges through a developmental lens and provides practical approaches for supporting growth across different stages of consciousness.",
    downloadPrompt: "Download the complete guide as PDF:",
    downloadButton: "Download PDF (English)",
    tableOfContentsTitle: "Table of Contents",
    mainChaptersTitle: "Main Chapters",
    futureChaptersTitle: "Coming Soon",
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
    title: "Spiralmedveten Guide för Mental Hälsa & Terapi",
    subtitle: "En bro mellan utvecklingspsykologi, terapi och medveten evolution",
    introduction: "Denna omfattande guide utforskar tillämpningen av Spiral Dynamics inom mental hälsa, terapeutisk praktik och mänsklig utveckling. Den erbjuder ett ramverk för att förstå psykologiska utmaningar genom ett utvecklingsperspektiv och ger praktiska metoder för att stödja tillväxt genom olika medvetandestadier.",
    downloadPrompt: "Ladda ner hela guiden som PDF:",
    downloadButton: "Ladda ner PDF (Engelska)",
    tableOfContentsTitle: "Innehållsförteckning",
    mainChaptersTitle: "Huvudkapitel",
    futureChaptersTitle: "Kommer Snart",
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
export const getMainChapters = () => allChapters.filter(ch =>parseInt(ch.number) <= 17);
export const getFutureChapters = () => allChapters.filter(ch =>parseInt(ch.number) > 17);
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
export const guideStore = writable({
  translations: guideTranslations,
  currentChapter: null as Chapter | null
});

// Export a helper to set the current chapter
export function setCurrentChapter(path: string) {
  const chapter = getChapterByPath(path);
  guideStore.update(state => ({
    ...state,
    currentChapter: chapter || null
  }));
}
