// src/lib/stores/personalGuideStore.ts
import { writable } from 'svelte/store';

// Types for guide items
interface ItemTitle {
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
  type: 'chapter' | 'appendix' | 'worksheet' | 'card' | 'practice' | 'preface';
  number?: string;
  isWorksheet?: boolean;
  isPracticeCard?: boolean;
  isReflectionTool?: boolean;
  isTemplate?: boolean;
  isVisualization?: boolean;
  chapterRef?: string; // Reference to the chapter this item belongs to
}

// All guide items data
const allGuideItems: GuideItem[] = [
  // Preface
  {
    id: 'preface',
    title: {
      en: "You Are Not Lost — You Are Becoming",
      sv: "Du Är Inte Vilse — Du Blir Till"
    },
    description: {
      en: "A gentle invocation: growth is not linear",
      sv: "En mild åkallan: tillväxt är inte linjär"
    },
    path: "preface",
    type: 'preface'
  },
  
  // Part I: Meeting the Spiral Within
  {
    id: 'chapter-01',
    number: "01",
    title: {
      en: "The Spiral as a Mirror of Becoming",
      sv: "Spiralen som en Spegel av Tillblivelse"
    },
    description: {
      en: "What Spiral Dynamics is — simply and humanly",
      sv: "Vad Spiral Dynamics är — enkelt och mänskligt"
    },
    path: "chapter-01",
    type: 'chapter'
  },
  {
    id: 'chapter-02',
    number: "02",
    title: {
      en: "When the Old Self No Longer Fits",
      sv: "När det Gamla Jaget Inte Längre Passar"
    },
    description: {
      en: "Signs of stage transition (discomfort, dissonance, loss of clarity)",
      sv: "Tecken på stadieövergång (obehag, dissonans, förlust av klarhet)"
    },
    path: "chapter-02",
    type: 'chapter'
  },
  {
    id: 'chapter-03',
    number: "03",
    title: {
      en: "Mapping Your Life Through Spiral Lenses",
      sv: "Kartlägga Ditt Liv Genom Spiral-Linser"
    },
    description: {
      en: "A journaling + timeline exercise to locate past stages",
      sv: "En journal- och tidslinjövning för att lokalisera tidigare stadier"
    },
    path: "chapter-03",
    type: 'chapter'
  },
  {
    id: 'chapter-03-spiral-life-mapping-worksheet',
    title: {
      en: "Spiral Life Mapping Worksheet",
      sv: "Arbetsbladet för Spiral-Livskartläggning"
    },
    description: {
      en: "A practical tool to identify your journey through the developmental stages",
      sv: "Ett praktiskt verktyg för att identifiera din resa genom utvecklingsstadierna"
    },
    path: "chapter-03-spiral-life-mapping-worksheet",
    type: 'worksheet',
    isWorksheet: true,
    chapterRef: "chapter-03"
  },
  
  // Part II: Walking the Spiral — A Stage-by-Stage Guide
  {
    id: 'chapter-04',
    number: "04",
    title: {
      en: "Beige – The Instinctual Spark",
      sv: "Beige – Den Instinktiva Gnistan"
    },
    description: {
      en: "Survival, body memory, sensory states",
      sv: "Överlevnad, kroppsminne, sensoriska tillstånd"
    },
    path: "chapter-04",
    type: 'chapter'
  },
  {
    id: 'chapter-04-beige-stabilization-card',
    title: {
      en: "Beige Stabilization Card",
      sv: "Beige Stabiliseringskort"
    },
    description: {
      en: "Grounding techniques for instinctual survival states",
      sv: "Jordande tekniker för instinktiva överlevnadstillstånd"
    },
    path: "chapter-04-beige-stabilization-card",
    type: 'card',
    isPracticeCard: true,
    chapterRef: "chapter-04"
  },
  {
    id: 'chapter-05',
    number: "05",
    title: {
      en: "Purple – The Sacred Circle",
      sv: "Lila – Den Heliga Cirkeln"
    },
    description: {
      en: "Myth, ritual, ancestry, family patterns",
      sv: "Myt, ritual, härstamning, familjemönster"
    },
    path: "chapter-05",
    type: 'chapter'
  },
  {
    id: 'chapter-05-purple-practice-card',
    title: {
      en: "Purple Practice Card",
      sv: "Lila Övningskort"
    },
    description: {
      en: "Rituals and practices for connecting with belonging and tradition",
      sv: "Ritualer och övningar för att ansluta till tillhörighet och tradition"
    },
    path: "chapter-05-purple-practice-card",
    type: 'card',
    isPracticeCard: true,
    chapterRef: "chapter-05"
  },
  {
    id: 'chapter-06',
    number: "06",
    title: {
      en: "Red – The Fire of Will",
      sv: "Röd – Viljans Eld"
    },
    description: {
      en: "Autonomy, power, freedom, defiance",
      sv: "Autonomi, makt, frihet, trots"
    },
    path: "chapter-06",
    type: 'chapter'
  },
  {
    id: 'chapter-06-red-embodiment-practice-card',
    title: {
      en: "Red Embodiment Practice Card",
      sv: "Röd Förkroppsligande Övningskort"
    },
    description: {
      en: "Exercises for healthy assertion and embodied power",
      sv: "Övningar för hälsosam självhävdelse och förkroppsligad kraft"
    },
    path: "chapter-06-red-embodiment-practice-card",
    type: 'card',
    isPracticeCard: true,
    chapterRef: "chapter-06"
  },
  {
    id: 'chapter-07',
    number: "07",
    title: {
      en: "Blue – The Path of Purpose",
      sv: "Blå – Syftets Väg"
    },
    description: {
      en: "Order, tradition, structure, faith",
      sv: "Ordning, tradition, struktur, tro"
    },
    path: "chapter-07",
    type: 'chapter'
  },
  {
    id: 'chapter-07-blue-personal-code-worksheet',
    title: {
      en: "Blue Personal Code Worksheet",
      sv: "Blå Personlig Kod Arbetsblad"
    },
    description: {
      en: "Create your own principles and values framework",
      sv: "Skapa ditt eget ramverk för principer och värderingar"
    },
    path: "chapter-07-blue-personal-code-worksheet",
    type: 'worksheet',
    isWorksheet: true,
    chapterRef: "chapter-07"
  },
  {
    id: 'chapter-08',
    number: "08",
    title: {
      en: "Orange – The Climb of Self-Mastery",
      sv: "Orange – Självbehärskningens Klättring"
    },
    description: {
      en: "Goals, growth, agency, strategy",
      sv: "Mål, tillväxt, agens, strategi"
    },
    path: "chapter-08",
    type: 'chapter'
  },
  {
    id: 'chapter-08-orange-to-green-reflection-worksheet',
    title: {
      en: "Orange to Green Reflection Worksheet",
      sv: "Orange till Grön Reflektionsarbetsblad"
    },
    description: {
      en: "Navigating the transition from achievement to authenticity",
      sv: "Navigera övergången från prestation till autenticitet"
    },
    path: "chapter-08-orange-to-green-reflection-worksheet",
    type: 'worksheet',
    isWorksheet: true,
    chapterRef: "chapter-08"
  },
  {
    id: 'chapter-09',
    number: "09",
    title: {
      en: "Green – The Heart of Connection",
      sv: "Grön – Kontaktens Hjärta"
    },
    description: {
      en: "Empathy, equality, community, meaning",
      sv: "Empati, jämlikhet, gemenskap, mening"
    },
    path: "chapter-09",
    type: 'chapter'
  },
  {
    id: 'chapter-09-green-emotional-boundaries-and-needs-card',
    title: {
      en: "Green Emotional Boundaries and Needs Card",
      sv: "Grönt Kort för Emotionella Gränser och Behov"
    },
    description: {
      en: "Tools for maintaining healthy boundaries while staying connected",
      sv: "Verktyg för att upprätthålla hälsosamma gränser medan du förblir ansluten"
    },
    path: "chapter-09-green-emotional-boundaries-and-needs-card",
    type: 'card',
    isPracticeCard: true,
    chapterRef: "chapter-09"
  },
  {
    id: 'chapter-10',
    number: "10",
    title: {
      en: "Yellow – The Integrative View",
      sv: "Gul – Den Integrativa Vyn"
    },
    description: {
      en: "Systems fluency, meta-awareness",
      sv: "Systemflyt, meta-medvetenhet"
    },
    path: "chapter-10",
    type: 'chapter'
  },
  {
    id: 'chapter-10-yellow-kaleidoscope-reflection-tool',
    title: {
      en: "Yellow Kaleidoscope Reflection Tool",
      sv: "Gult Kalejdoskop Reflektionsverktyg"
    },
    description: {
      en: "Mapping inner ecology and systems understanding",
      sv: "Kartläggning av inre ekologi och systemförståelse"
    },
    path: "chapter-10-yellow-kaleidoscope-reflection-tool",
    type: 'worksheet',
    isReflectionTool: true,
    chapterRef: "chapter-10"
  },
  {
    id: 'chapter-11',
    number: "11",
    title: {
      en: "Turquoise – The Living Web",
      sv: "Turkos – Det Levande Nätet"
    },
    description: {
      en: "Interbeing, inner stillness, symbolic attunement",
      sv: "Interfenomen, inre stillhet, symbolisk avstämning"
    },
    path: "chapter-11",
    type: 'chapter'
  },
  {
    id: 'chapter-11-turquoise-presence-attunement-card',
    title: {
      en: "Turquoise Presence Attunement Card",
      sv: "Turkost Närvaroavstämningskort"
    },
    description: {
      en: "Practices for embodying presence and planetary awareness",
      sv: "Övningar för att förkroppsliga närvaro och planetärt medvetande"
    },
    path: "chapter-11-turquoise-presence-attunement-card",
    type: 'card',
    isPracticeCard: true,
    chapterRef: "chapter-11"
  },
  {
    id: 'chapter-12',
    number: "12",
    title: {
      en: "Coral – The Edge of Emergence",
      sv: "Korall – Framväxtens Kant"
    },
    description: {
      en: "Non-linear, initiatory, liminal selfhood",
      sv: "Icke-linjär, initiatorisk, liminal självhet"
    },
    path: "chapter-12",
    type: 'chapter'
  },
  {
    id: 'chapter-12-coral-emergence-altar-template',
    title: {
      en: "Coral Emergence Altar Template",
      sv: "Korall Framväxt Altarmall"
    },
    description: {
      en: "Creating sacred space for transformation and emergence",
      sv: "Skapa heligt utrymme för transformation och framväxt"
    },
    path: "chapter-12-coral-emergence-altar-template",
    type: 'worksheet',
    isTemplate: true,
    chapterRef: "chapter-12"
  },
  
  // Part III: Integrating the Spiral in Daily Life
  {
    id: 'chapter-13',
    number: "13",
    title: {
      en: "Relationships Across Stages",
      sv: "Relationer Över Stadier"
    },
    description: {
      en: "Understanding value collisions in love, family, and friendship",
      sv: "Förstå värdekollisioner i kärlek, familj och vänskap"
    },
    path: "chapter-13",
    type: 'chapter'
  },
  {
    id: 'chapter-13-stage-mismatch-reflection-worksheet',
    title: {
      en: "Stage Mismatch Reflection Worksheet",
      sv: "Reflektion över Stadiemismatch Arbetsblad"
    },
    description: {
      en: "Navigating value gaps in relationships",
      sv: "Navigera värdeglapp i relationer"
    },
    path: "chapter-13-stage-mismatch-reflection-worksheet",
    type: 'worksheet',
    isWorksheet: true,
    chapterRef: "chapter-13"
  },
  {
    id: 'chapter-14',
    number: "14",
    title: {
      en: "Life Transitions as Spiral Invitations",
      sv: "Livets Övergångar som Spirala Inbjudningar"
    },
    description: {
      en: "Navigating job shifts, crises, awakenings, and losses",
      sv: "Navigera arbetsbyte, kriser, uppvaknanden och förluster"
    },
    path: "chapter-14",
    type: 'chapter'
  },
  {
    id: 'chapter-14-spiral-transition-journal-template',
    title: {
      en: "Spiral Transition Journal Template",
      sv: "Mall för Spiral-Övergångsjournal"
    },
    description: {
      en: "Guided journaling for navigating life transitions",
      sv: "Guidad journalföring för att navigera livets övergångar"
    },
    path: "chapter-14-spiral-transition-journal-template",
    type: 'worksheet',
    isTemplate: true,
    chapterRef: "chapter-14"
  },
  {
    id: 'chapter-15',
    number: "15",
    title: {
      en: "The Inner Spiral: Many Selves, One Being",
      sv: "Den Inre Spiralen: Många Själv, Ett Varande"
    },
    description: {
      en: "You contain all stages",
      sv: "Du innehåller alla stadier"
    },
    path: "chapter-15",
    type: 'chapter'
  },
  
  // Part IV: Spiral Horizons — Glimpses Beyond the Map
  {
    id: 'chapter-16',
    number: "16",
    title: {
      en: "Ultraviolet, Indigo, and Clear",
      sv: "Ultraviolett, Indigo och Klar"
    },
    description: {
      en: "The post-symbolic terrain",
      sv: "Den post-symboliska terrängen"
    },
    path: "chapter-16",
    type: 'chapter'
  },
  {
    id: 'chapter-16-spiral-dance-visualization',
    title: {
      en: "Spiral Dance Visualization",
      sv: "Spiral-Dansvisualisering"
    },
    description: {
      en: "Guided meditation for connecting with the infinite spiral of consciousness",
      sv: "Guidad meditation för att ansluta till medvetandets oändliga spiral"
    },
    path: "chapter-16-spiral-dance-visualization",
    type: 'worksheet',
    isVisualization: true,
    chapterRef: "chapter-16"
  },
  {
    id: 'chapter-17',
    number: "17",
    title: {
      en: "The Spiral and the Soul's Journey",
      sv: "Spiralen och Själens Resa"
    },
    description: {
      en: "No stage is final",
      sv: "Inget stadium är slutgiltigt"
    },
    path: "chapter-17",
    type: 'chapter'
  },
  
  // Appendices
  {
    id: 'appendix-a',
    number: "A",
    title: {
      en: "Quick Reference Guide",
      sv: "Snabbreferensguide"
    },
    description: {
      en: "Key terms, stage summaries",
      sv: "Nyckeltermer, stadiesammanfattningar"
    },
    path: "appendix-a",
    type: 'appendix'
  },
  {
    id: 'appendix-b',
    number: "B",
    title: {
      en: "Transition Symptom Map",
      sv: "Karta över Övergångssymptom"
    },
    description: {
      en: "Understanding psychological and physical symptoms during stage transitions",
      sv: "Förståelse för psykologiska och fysiska symptom under stadieövergångar"
    },
    path: "appendix-b",
    type: 'appendix'
  },
  {
    id: 'appendix-c',
    number: "C",
    title: {
      en: "Recommended Reading & Media",
      sv: "Rekommenderad Läsning & Media"
    },
    description: {
      en: "Books, articles, podcasts, and videos for further exploration",
      sv: "Böcker, artiklar, poddar och videor för vidare utforskning"
    },
    path: "appendix-c",
    type: 'appendix'
  },
  {
    id: 'appendix-d',
    number: "D",
    title: {
      en: "Spiral Life Timeline Template",
      sv: "Mall för Spiral-Livstidslinje"
    },
    description: {
      en: "Where did you feel most 'yourself'? Where did you feel trapped?",
      sv: "Var kände du dig mest 'dig själv'? Var kände du dig fängslad?"
    },
    path: "appendix-d",
    type: 'appendix'
  }
];

// Translations for guide elements
const guideTranslations = {
  en: {
    title: "Spiral for Personal Growth & Life Transitions",
    subtitle: "A Self-Discovery Guide Through the Stages of Human Development",
    introduction: "This guide will help you navigate life transitions, internal transformations, and developmental thresholds using the Spiral Dynamics framework — from Beige to Coral, with glimpses beyond.",
    downloadPrompt: "Download the complete guide as PDF:",
    downloadButton: "Download PDF (English)",
    tableOfContentsTitle: "Table of Contents",
    sectionsTitle: {
      preface: "Preface",
      partI: "Part I: Meeting the Spiral Within",
      partII: "Part II: Walking the Spiral — A Stage-by-Stage Guide",
      partIII: "Part III: Integrating the Spiral in Daily Life",
      partIV: "Part IV: Spiral Horizons — Glimpses Beyond the Map",
      appendices: "Appendices"
    },
    loading: "Loading content...",
    error: "Error loading content.",
    tableOfContents: "Table of Contents",
    next: "Next Chapter",
    previous: "Previous Chapter",
    chapterText: "Chapter",
    appendixText: "Appendix",
    worksheetText: "Worksheet",
    cardText: "Practice Card",
    templateText: "Template",
    toolText: "Reflection Tool",
    visualizationText: "Guided Visualization",
    comingSoon: "Content coming soon",
    resources: "Worksheets & Resources"
  },
  sv: {
    title: "Spiral för Personlig Tillväxt & Livsövergångar",
    subtitle: "En Självupptäcktsguide Genom Stadierna av Mänsklig Utveckling",
    introduction: "Denna guide hjälper dig att navigera livsövergångar, inre förändringar och utvecklingströsklar med hjälp av Spiral Dynamics-ramverket — från Beige till Korall, med glimtar bortom.",
    downloadPrompt: "Ladda ner hela guiden som PDF:",
    downloadButton: "Ladda ner PDF (Svenska)",
    tableOfContentsTitle: "Innehållsförteckning",
    sectionsTitle: {
      preface: "Förord",
      partI: "Del I: Möta Spiralen Inom Dig",
      partII: "Del II: Vandra Spiralen — En Steg-för-Steg Guide",
      partIII: "Del III: Integrera Spiralen i Vardagen",
      partIV: "Del IV: Spiral-Horisonter — Glimtar Bortom Kartan",
      appendices: "Bilagor"
    },
    loading: "Laddar innehåll...",
    error: "Fel vid laddning av innehåll.",
    tableOfContents: "Innehållsförteckning",
    next: "Nästa Kapitel",
    previous: "Föregående Kapitel",
    chapterText: "Kapitel",
    appendixText: "Bilaga",
    worksheetText: "Arbetsblad",
    cardText: "Övningskort",
    templateText: "Mall",
    toolText: "Reflektionsverktyg",
    visualizationText: "Guidad Visualisering",
    comingSoon: "Innehåll kommer snart",
    resources: "Arbetsblad & Resurser"
  }
};

// Filter helpers
export const getPreface = () => allGuideItems.find(item => item.type === 'preface');

export const getPartIChapters = () => allGuideItems.filter(
  item => item.type === 'chapter' && 
  parseInt(item.number) >= 1 && 
  parseInt(item.number) <= 3
);

export const getPartIIChapters = () => allGuideItems.filter(
  item => item.type === 'chapter' && 
  parseInt(item.number) >= 4 && 
  parseInt(item.number) <= 12
);

export const getPartIIIChapters = () => allGuideItems.filter(
  item => item.type === 'chapter' && 
  parseInt(item.number) >= 13 && 
  parseInt(item.number) <= 15
);

export const getPartIVChapters = () => allGuideItems.filter(
  item => item.type === 'chapter' && 
  parseInt(item.number) >= 16 && 
  parseInt(item.number) <= 17
);

export const getAppendices = () => allGuideItems.filter(item => item.type === 'appendix');

export const getAllChapters = () => allGuideItems.filter(item => item.type === 'chapter');

export const getWorksheets = () => allGuideItems.filter(item => 
  item.isWorksheet || 
  item.isPracticeCard || 
  item.isReflectionTool || 
  item.isTemplate || 
  item.isVisualization
);

// Get a specific item by its path
export const getItemByPath = (path: string) => allGuideItems.find(item => item.path === path);

// Get all resources for a specific chapter
export const getChapterResources = (chapterId: string) => 
  allGuideItems.filter(item => item.chapterRef === chapterId);

// Get next and previous items
export const getAdjacentItems = (currentPath: string) => {
  const index = allGuideItems.findIndex(item => item.path === currentPath);
  return {
    previous: index > 0 ? allGuideItems[index - 1] : null,
    next: index < allGuideItems.length - 1 ? allGuideItems[index + 1] : null
  };
};

// Get main navigation items (just chapters and appendices)
export const getMainNavItems = () => allGuideItems.filter(
  item => item.type === 'chapter' || item.type === 'appendix' || item.type === 'preface'
);

// Create and export the store
export const personalGuideStore = writable({
  translations: guideTranslations,
  currentItem: null as GuideItem | null,
  showTableOfContents: false
});

// Export functions to manage the store
export function setCurrentItem(path: string) {
  const item = getItemByPath(path);
  personalGuideStore.update(state => ({
    ...state,
    currentItem: item || null
  }));
}

export function toggleTableOfContents() {
  personalGuideStore.update(state => ({
    ...state,
    showTableOfContents: !state.showTableOfContents
  }));
}
