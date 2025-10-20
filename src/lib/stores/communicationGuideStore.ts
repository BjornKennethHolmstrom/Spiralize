// src/lib/stores/communicationGuideStore.ts
import { writable } from 'svelte/store';

// Define item types
interface GuideItem {
  id: string;
  path: string;
  type: 'preface' | 'goldenRules' | 'chapter' | 'appendix' | 'resource';
  title: Record<string, string>; // For multilingual support
  description?: Record<string, string>;
  number?: number; // For chapters and appendices
  chapterRef?: string; // For resources that reference a chapter
  isWorksheet?: boolean;
  isPracticeCard?: boolean;
  isReflectionTool?: boolean;
  isTemplate?: boolean;
  isVisualization?: boolean;
}

// Define translations
interface Translations {
  title: string;
  subtitle: string;
  introduction: string;
  downloadPrompt: string;
  downloadButton: string;
  tableOfContentsTitle: string;
  sectionsTitle: {
    preface: string;
    goldenRules: string;
    partI: string;
    partII: string;
    partIII: string;
    partIV: string;
    appendices: string;
  };
  goldenRulesTitle: string;
  goldenRulesDescription: string;
  goldenRulesText: string;
  chapterText: string;
  appendixText: string;
  worksheetText: string;
  cardText: string;
  toolText: string;
  templateText: string;
  visualizationText: string;
  resources: string;
  previous: string;
  next: string;
  tableOfContents: string;
  loading: string;
  comingSoon: string;
}

// Define the store state
interface CommunicationGuideStore {
  items: GuideItem[];
  currentItem: GuideItem | null;
  translations: Record<string, Translations>;
}

// Create initial state
const initialState: CommunicationGuideStore = {
  items: [
    // Preface
    {
      id: 'preface',
      path: 'introduction',
      type: 'preface',
      title: {
        en: 'Introduction: The Map, the Territory, and the Guide',
        sv: 'Introduktion: Kartan, territoriet och guiden'
      },
      description: {
        en: 'An introduction to the guide, its purpose, and how to use it effectively.',
        sv: 'En introduktion till guiden, dess syfte och hur man använder den effektivt.'
      }
    },
    // Golden Rules
    {
      id: 'goldenRules',
      path: 'golden-rules',
      type: 'goldenRules',
      title: {
        en: 'The Five Golden Rules of Communicating the Spiral',
        sv: 'De fem gyllene reglerna för att kommunicera Spiralen'
      },
      description: {
        en: 'Essential principles for effective and ethical communication of Spiral Dynamics.',
        sv: 'Väsentliga principer för effektiv och etisk kommunikation av Spiral Dynamics.'
      }
    },
    
    // Part I: Understanding the Communication Challenge
    {
      id: 'chapter1',
      path: 'living-spiral-core-concepts',
      type: 'chapter',
      number: 1,
      title: {
        en: 'The Living Spiral - Core Concepts',
        sv: 'Den levande spiralen - Grundläggande koncept'
      },
      description: {
        en: 'Understanding the fundamental principles and dynamics of the spiral model.',
        sv: 'Att förstå de grundläggande principerna och dynamiken i spiralmodellen.'
      }
    },
    {
      id: 'chapter2',
      path: 'why-talking-about-development-is-difficult',
      type: 'chapter',
      number: 2,
      title: {
        en: 'Why Talking About Development Is Inherently Difficult',
        sv: 'Varför det är svårt att prata om utveckling'
      },
      description: {
        en: 'Exploring the challenges and resistance that arise when discussing developmental frameworks.',
        sv: 'Utforska de utmaningar och det motstånd som uppstår när man diskuterar utvecklingsramverk.'
      }
    },
    {
      id: 'chapter3',
      path: 'we-are-all-mosaics',
      type: 'chapter',
      number: 3,
      title: {
        en: 'We Are All Mosaics - Developmental Fluidity and Mixed Expressions',
        sv: 'Vi är alla mosaiker - Utvecklingsfluiditet och blandade uttryck'
      },
      description: {
        en: 'Understanding the fluid, contextual nature of developmental expression.',
        sv: 'Att förstå den flytande, kontextuella naturen av utvecklingsuttryck.'
      }
    },
    {
      id: 'chapter4',
      path: 'spiral-in-the-world',
      type: 'chapter',
      number: 4,
      title: {
        en: 'The Spiral in the World - Cultural Sensitivity',
        sv: 'Spiralen i världen - Kulturell känslighet'
      },
      description: {
        en: 'How the spiral manifests differently across cultures and contexts.',
        sv: 'Hur spiralen manifesteras olika över kulturer och sammanhang.'
      }
    },
    {
      id: 'chapter5',
      path: 'key-communication-principles',
      type: 'chapter',
      number: 5,
      title: {
        en: 'Key Principles of Effective Communication',
        sv: 'Viktiga principer för effektiv kommunikation'
      },
      description: {
        en: 'Essential principles for communicating developmental concepts clearly and respectfully.',
        sv: 'Viktiga principer för att kommunicera utvecklingsbegrepp tydligt och respektfullt.'
      }
    },

    // Part II: Speaking the Language of Different Value Systems
    {
      id: 'chapter6',
      path: 'engaging-with-survival-safety',
      type: 'chapter',
      number: 6,
      title: {
        en: 'Engaging with Survival & Safety',
        sv: 'Att engagera sig med Överlevnad & Säkerhet'
      },
      description: {
        en: 'Communicating effectively with survival-oriented value systems.',
        sv: 'Kommunicera effektivt med överlevnadsorienterade värdesystem.'
      }
    },
    {
      id: 'chapter7',
      path: 'engaging-with-tradition-belonging',
      type: 'chapter',
      number: 7,
      title: {
        en: 'Engaging with Tradition & Belonging',
        sv: 'Att engagera sig med Tradition & Tillhörighet'
      },
      description: {
        en: 'Communicating effectively with tradition-oriented value systems.',
        sv: 'Kommunicera effektivt med traditionsorienterade värdesystem.'
      }
    },
    {
      id: 'chapter8',
      path: 'engaging-with-power-autonomy',
      type: 'chapter',
      number: 8,
      title: {
        en: 'Engaging with Power & Autonomy',
        sv: 'Att engagera sig med Makt & Autonomi'
      },
      description: {
        en: 'Communicating effectively with power-oriented value systems.',
        sv: 'Kommunicera effektivt med maktorienterade värdesystem.'
      }
    },
    {
      id: 'chapter9',
      path: 'engaging-with-order-meaning',
      type: 'chapter',
      number: 9,
      title: {
        en: 'Engaging with Order & Meaning',
        sv: 'Att engagera sig med Ordning & Mening'
      },
      description: {
        en: 'Communicating effectively with order-oriented value systems.',
        sv: 'Kommunicera effektivt med ordningsorienterade värdesystem.'
      }
    },
    {
      id: 'chapter10',
      path: 'engaging-with-achievement-progress',
      type: 'chapter',
      number: 10,
      title: {
        en: 'Engaging with Achievement & Progress',
        sv: 'Att engagera sig med Prestation & Framsteg'
      },
      description: {
        en: 'Communicating effectively with achievement-oriented value systems.',
        sv: 'Kommunicera effektivt med prestationsorienterade värdesystem.'
      }
    },
    {
      id: 'chapter11',
      path: 'engaging-with-community-harmony',
      type: 'chapter',
      number: 11,
      title: {
        en: 'Engaging with Community & Harmony',
        sv: 'Att engagera sig med Gemenskap & Harmoni'
      },
      description: {
        en: 'Communicating effectively with community-oriented value systems.',
        sv: 'Kommunicera effektivt med gemenskapsorienterade värdesystem.'
      }
    },
    {
      id: 'chapter12',
      path: 'engaging-with-systems-functionality',
      type: 'chapter',
      number: 12,
      title: {
        en: 'Engaging with Systems & Functionality',
        sv: 'Att engagera sig med System & Funktionalitet'
      },
      description: {
        en: 'Communicating effectively with systemic-oriented value systems.',
        sv: 'Kommunicera effektivt med systemorienterade värdesystem.'
      }
    },

    // Part III: The Communicator's Craft
    {
      id: 'chapter13',
      path: 'cleaning-your-lens',
      type: 'chapter',
      number: 13,
      title: {
        en: "Cleaning Your Lens - The Communicator's Inner Work",
        sv: "Att rengöra din lins - Kommunikatörens inre arbete"
      },
      description: {
        en: 'How to recognize and work with your own developmental biases and shadows.',
        sv: 'Hur du känner igen och arbetar med dina egna utvecklingsmässiga fördomar och skuggor.'
      }
    },
    {
      id: 'chapter14',
      path: 'crafting-developmental-narratives',
      type: 'chapter',
      number: 14,
      title: {
        en: 'Crafting Developmental Narratives - The Power of Story',
        sv: 'Att skapa utvecklingsberättelser - Berättelsens kraft'
      },
      description: {
        en: 'Using storytelling to illustrate developmental concepts and transitions.',
        sv: 'Använda berättande för att illustrera utvecklingsbegrepp och övergångar.'
      }
    },
    {
      id: 'chapter15',
      path: 'beyond-jargon',
      type: 'chapter',
      number: 15,
      title: {
        en: 'Beyond Jargon - Everyday Language for Complex Concepts',
        sv: 'Bortom jargong - Vardagsspråk för komplexa koncept'
      },
      description: {
        en: 'Translating developmental frameworks into accessible, everyday language.',
        sv: 'Översätta utvecklingsramverk till tillgängligt, vardagligt språk.'
      }
    },
    {
      id: 'chapter16',
      path: 'making-it-tangible',
      type: 'chapter',
      number: 16,
      title: {
        en: 'Making It Tangible - Experiential & Visual Methods',
        sv: 'Göra det påtagligt - Upplevelse- och visuella metoder'
      },
      description: {
        en: 'Interactive approaches to help others experience and grasp developmental concepts.',
        sv: 'Interaktiva metoder för att hjälpa andra att uppleva och förstå utvecklingsbegrepp.'
      }
    },
    {
      id: 'chapter17',
      path: 'value-translation-method',
      type: 'chapter',
      number: 17,
      title: {
        en: 'The Value Translation Method for Bridge-Building',
        sv: 'Värdeöversättningsmetoden för brobyggande'
      },
      description: {
        en: 'How to translate ideas across worldviews and facilitate dialogue across value systems.',
        sv: 'Hur man översätter idéer mellan världsbilder och underlättar dialog mellan värdesystem.'
      }
    },
    {
      id: 'chapter18',
      path: 'when-to-put-the-map-away',
      type: 'chapter',
      number: 18,
      title: {
        en: 'When to Put the Map Away',
        sv: 'När man ska lägga undan kartan'
      },
      description: {
        en: 'Recognizing when not to use Spiral Dynamics and what alternatives to consider.',
        sv: 'Att känna igen när man inte bör använda Spiral Dynamics och vilka alternativ man bör överväga.'
      }
    },

    // Part IV: Advanced Application & Ethics
    {
      id: 'chapter19',
      path: 'discussing-integrative-thinking',
      type: 'chapter',
      number: 19,
      title: {
        en: 'Discussing Integrative Thinking Without Elitism',
        sv: 'Att diskutera integrativt tänkande utan elitism'
      },
      description: {
        en: 'How to describe later stages of development without creating hierarchical thinking.',
        sv: 'Hur man beskriver senare utvecklingsstadier utan att skapa hierarkiskt tänkande.'
      }
    },
    {
      id: 'chapter20',
      path: 'communicating-in-professional-contexts',
      type: 'chapter',
      number: 20,
      title: {
        en: 'Communicating in Professional Contexts',
        sv: 'Att kommunicera i professionella sammanhang'
      },
      description: {
        en: 'Applying Spiral Dynamics in healthcare, education, organizations, and social contexts.',
        sv: 'Att tillämpa Spiral Dynamics inom vård, utbildning, organisationer och sociala sammanhang.'
      }
    },
    {
      id: 'chapter21',
      path: 'addressing-objections-misconceptions',
      type: 'chapter',
      number: 21,
      title: {
        en: 'Addressing Common Objections and Misconceptions',
        sv: 'Att hantera vanliga invändningar och missuppfattningar'
      },
      description: {
        en: 'Responding to critiques and clarifying misunderstandings about developmental models.',
        sv: 'Svara på kritik och klargöra missförstånd om utvecklingsmodeller.'
      }
    },
    {
      id: 'chapter22',
      path: 'ethics-of-influence',
      type: 'chapter',
      number: 22,
      title: {
        en: 'The Ethics of Influence and Communication',
        sv: 'Etiken kring påverkan och kommunikation'
      },
      description: {
        en: 'Ethical considerations for using developmental frameworks responsibly.',
        sv: 'Etiska överväganden för att använda utvecklingsramverk på ett ansvarsfullt sätt.'
      }
    },

    // Appendices
    {
      id: 'appendixA',
      path: 'communication-reference-guide',
      type: 'appendix',
      number: 1,
      title: {
        en: 'Communication Quick Reference Guide',
        sv: 'Snabbreferensguide för kommunikation'
      },
      description: {
        en: 'Key phrases, do\'s and don\'ts, and troubleshooting tips for each value system.',
        sv: 'Viktiga fraser, do\'s and don\'ts, och felsökningstips för varje värdesystem.'
      }
    },
    {
      id: 'appendixB',
      path: 'facilitators-toolkit',
      type: 'appendix',
      number: 2,
      title: {
        en: 'The Facilitator\'s Toolkit',
        sv: 'Facilitatorns verktygslåda'
      },
      description: {
        en: 'Workshop materials, exercises, and facilitation guidelines.',
        sv: 'Workshopmaterial, övningar och riktlinjer för facilitering.'
      }
    },
    {
      id: 'appendixC',
      path: 'real-world-examples',
      type: 'appendix',
      number: 3,
      title: {
        en: 'Real-World Communication Examples',
        sv: 'Verkliga kommunikationsexempel'
      },
      description: {
        en: 'Case studies and dialogue examples showing effective communication across value systems.',
        sv: 'Fallstudier och dialogexempel som visar effektiv kommunikation över värdesystem.'
      }
    },

    // Add resources here
  ],
  currentItem: null,
  translations: {
    en: {
      title: 'Guide to Communicating Spiral Dynamics',
      subtitle: 'A Bridge-Builder\'s Handbook',
      introduction: 'This comprehensive guide provides practical strategies for effectively communicating Spiral Dynamics concepts to diverse audiences. Whether you\'re a coach, educator, healthcare professional, or change agent, you\'ll learn how to translate developmental frameworks into accessible language that meets people where they are.',
      downloadPrompt: 'Download the complete guide as a PDF for offline reference:',
      downloadButton: 'Download Guide (PDF)',
      tableOfContentsTitle: 'Table of Contents',
      sectionsTitle: {
        preface: 'Introduction',
        goldenRules: 'Golden Rules',
        partI: 'Part I: Understanding the Communication Challenge',
        partII: 'Part II: Speaking the Language of Different Value Systems',
        partIII: 'Part III: The Communicator\'s Craft',
        partIV: 'Part IV: Advanced Application & Ethics',
        appendices: 'Appendices & Resources'
      },
      goldenRulesTitle: 'The Five Golden Rules of Communicating the Spiral',
      goldenRulesDescription: 'Essential principles for effective and ethical communication of Spiral Dynamics.',
      goldenRulesText: 'Golden Rules',
      chapterText: 'Chapter',
      appendixText: 'Appendix',
      worksheetText: 'Worksheet',
      cardText: 'Practice Card',
      toolText: 'Reflection Tool',
      templateText: 'Template',
      visualizationText: 'Visualization',
      resources: 'Chapter Resources',
      previous: 'Previous',
      next: 'Next',
      tableOfContents: 'Table of Contents',
      loading: 'Loading content...',
      comingSoon: 'This content is coming soon! We\'re actively working on developing comprehensive materials for each section of the guide.'
    },
    sv: {
      title: 'Guide för att kommunicera Spiral Dynamics',
      subtitle: 'En handbok för brobyggare',
      introduction: 'Denna omfattande guide ger praktiska strategier för att effektivt kommunicera Spiral Dynamics-koncept till olika målgrupper. Oavsett om du är coach, utbildare, vårdpersonal eller förändringsagent, kommer du att lära dig hur du översätter utvecklingsramverk till tillgängligt språk som möter människor där de är.',
      downloadPrompt: 'Ladda ner den kompletta guiden som PDF för offline-referens:',
      downloadButton: 'Ladda ner guide (PDF)',
      tableOfContentsTitle: 'Innehållsförteckning',
      sectionsTitle: {
        preface: 'Introduktion',
        goldenRules: 'Gyllene regler',
        partI: 'Del I: Förstå kommunikationsutmaningen',
        partII: 'Del II: Tala olika värdesystems språk',
        partIII: 'Del III: Kommunikatörens hantverk',
        partIV: 'Del IV: Avancerad tillämpning och etik',
        appendices: 'Bilagor och resurser'
      },
      goldenRulesTitle: 'De fem gyllene reglerna för att kommunicera Spiralen',
      goldenRulesDescription: 'Väsentliga principer för effektiv och etisk kommunikation av Spiral Dynamics.',
      goldenRulesText: 'Gyllene regler',
      chapterText: 'Kapitel',
      appendixText: 'Bilaga',
      worksheetText: 'Arbetsblad',
      cardText: 'Övningskort',
      toolText: 'Reflektionsverktyg',
      templateText: 'Mall',
      visualizationText: 'Visualisering',
      resources: 'Kapitelresurser',
      previous: 'Föregående',
      next: 'Nästa',
      tableOfContents: 'Innehållsförteckning',
      loading: 'Laddar innehåll...',
      comingSoon: 'Detta innehåll kommer snart! Vi arbetar aktivt med att utveckla omfattande material för varje avsnitt i guiden.'
    }
  }
};

// Create the store
const communicationGuideStore = writable<CommunicationGuideStore>(initialState);

// Helper to get the current store state
function get(): CommunicationGuideStore {
  let storeValue: CommunicationGuideStore = initialState;
  communicationGuideStore.subscribe(value => {
    storeValue = value;
  })();
  return storeValue;
}

// Helper functions
function getPreface() {
  const store = get();
  return store.items.find(item => item.type === 'preface');
}

function getAllChapters() {
  const store = get();
  return store.items.filter(item => item.type === 'chapter');
}

function getPartIChapters() {
  const store = get();
  return store.items
    .filter(item => item.type === 'chapter' && item.number && item.number >= 1 && item.number <= 5)
    .sort((a, b) => (a.number || 0) - (b.number || 0));
}

function getPartIIChapters() {
  const store = get();
  return store.items
    .filter(item => item.type === 'chapter' && item.number && item.number >= 6 && item.number <= 10)
    .sort((a, b) => (a.number || 0) - (b.number || 0));
}

function getPartIIIChapters() {
  const store = get();
  return store.items
    .filter(item => item.type === 'chapter' && item.number && item.number >= 11 && item.number <= 16)
    .sort((a, b) => (a.number || 0) - (b.number || 0));
}

function getPartIVChapters() {
  const store = get();
  return store.items
    .filter(item => item.type === 'chapter' && item.number && item.number >= 17 && item.number <= 20)
    .sort((a, b) => (a.number || 0) - (b.number || 0));
}

function getAppendices() {
  const store = get();
  return store.items
    .filter(item => item.type === 'appendix')
    .sort((a, b) => (a.number || 0) - (b.number || 0));
}

function getMainNavItems() {
  const store = get();
  return store.items.filter(item => 
    item.type === 'preface' || 
    item.type === 'goldenRules' || 
    (item.type === 'chapter' && item.number !== undefined) || 
    item.type === 'appendix'
  );
}

function getChapterResources(chapterId: string) {
  const store = get();
  return store.items.filter(item => 
    item.chapterRef === chapterId && 
    (item.isWorksheet || item.isPracticeCard || item.isReflectionTool || item.isTemplate || item.isVisualization)
  );
}

function getItemByPath(path: string) {
  const store = get();
  return store.items.find(item => item.path === path) || null;
}

function setCurrentItem(path: string) {
  communicationGuideStore.update(store => {
    store.currentItem = store.items.find(item => item.path === path) || null;
    return store;
  });
}

function getAdjacentItems(path: string) {
  const store = get();
  const mainItems = getMainNavItems();
  const currentIndex = mainItems.findIndex(item => item.path === path);
  
  const previous = currentIndex > 0 ? mainItems[currentIndex - 1] : null;
  const next = currentIndex < mainItems.length - 1 ? mainItems[currentIndex + 1] : null;
  
  return { previous, next };
}

export {
  communicationGuideStore,
  getPreface,
  getAllChapters,
  getPartIChapters,
  getPartIIChapters,
  getPartIIIChapters,
  getPartIVChapters,
  getAppendices,
  getMainNavItems,
  getChapterResources,
  getItemByPath,
  setCurrentItem,
  getAdjacentItems
};
