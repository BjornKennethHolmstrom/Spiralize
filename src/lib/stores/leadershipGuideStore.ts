// src/lib/stores/leadershipGuideStore.ts
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

// All guide items data
const allGuideItems: GuideItem[] = [
  // Section 0: Introduction
  {
    id: 'section-00',
    title: {
      en: "Introduction to Spiral Dynamics",
      sv: "Introduktion till Spiral Dynamics"
    },
    description: {
      en: "Orientation to Spiral Dynamics concepts for beginners and a refresher for experts",
      sv: "Orientering i Spiral Dynamics-koncept för nybörjare och en uppfräschning för experter"
    },
    path: "introduction",
    filePath: "sections/00-intro/00-introduction",
    type: 'section',
    section: "00"
  },
  {
    id: 'spiral-dynamics-101',
    title: {
      en: "Spiral Dynamics 101",
      sv: "Spiral Dynamics 101"
    },
    description: {
      en: "A concise overview of the spiral model, stages, and vertical development principles",
      sv: "En koncis översikt över spiralmodellen, stadier och principer för vertikal utveckling"
    },
    path: "spiral-dynamics-101",
    filePath: "sections/00-intro/spiral-dynamics-101",
    type: 'subsection',
    section: "00",
    parentId: "section-00"
  },
  {
    id: 'core-concepts',
    title: {
      en: "Core Concepts",
      sv: "Grundläggande Koncept"
    },
    description: {
      en: "Explanation of worldviews, stage transitions, and shadow in growth",
      sv: "Förklaring av världsbilder, stadieövergångar och skugga i tillväxt"
    },
    path: "core-concepts",
    filePath: "sections/00-intro/core-concepts",
    type: 'subsection',
    section: "00",
    parentId: "section-00"
  },
  {
    id: 'quick-reference',
    title: {
      en: "Quick Reference Glossary",
      sv: "Snabb Referensordlista"
    },
    description: {
      en: "Definitions of key terms like 'vertical development,' 'center of gravity,' and 'spiral fluency'",
      sv: "Definitioner av nyckeltermer som 'vertikal utveckling', 'gravitationscentrum' och 'spiralflöde'"
    },
    path: "quick-reference",
    filePath: "sections/00-intro/quick-reference",
    type: 'subsection',
    section: "00",
    parentId: "section-00",
    isQuickReference: true
  },
  {
    id: 'spiral-cheat-sheet',
    title: {
      en: "Spiral Cheat Sheet",
      sv: "Spiral-fusklapp"
    },
    description: {
      en: "One-page summary of stages, needs, and typical language for quick reference",
      sv: "Ensidig sammanfattning av stadier, behov och typiskt språk för snabb referens"
    },
    path: "spiral-cheat-sheet",
    filePath: "tools/spiral-cheat-sheet",
    type: 'tool',
    section: "00",
    parentId: "section-00",
    isTool: true
  },
  
  // Section 1: Coaching Questions by Stage
  {
    id: 'section-01',
    title: {
      en: "Coaching Questions by Stage",
      sv: "Coachingfrågor per Stadium"
    },
    description: {
      en: "Stage-specific questions to unlock growth and avoid missteps that stall progress",
      sv: "Stadiespecifika frågor för att låsa upp tillväxt och undvika misstag som stoppar framsteg"
    },
    path: "coaching-questions-overview",
    filePath: "sections/01-coaching-questions/leadership-01-overview",
    type: 'section',
    section: "01"
  },
  {
    id: 'coaching-questions-table',
    title: {
      en: "Coaching Questions Table",
      sv: "Tabell med Coachingfrågor"
    },
    description: {
      en: "Downloadable table summarizing core, edge, and misstep questions by stage",
      sv: "Nedladdningsbar tabell som sammanfattar kärn-, kant- och felstegsfrågor per stadium"
    },
    path: "coaching-questions-table",
    filePath: "tools/coaching-questions-table",
    type: 'tool',
    section: "01",
    parentId: "section-01",
    isTool: true
  },
  {
    id: 'client-communication-templates',
    title: {
      en: "Client Communication Templates",
      sv: "Mallar för Klientkommunikation"
    },
    description: {
      en: "Templates for explaining stage concepts to clients in non-technical language",
      sv: "Mallar för att förklara stadiekoncept för klienter på icke-tekniskt språk"
    },
    path: "client-communication-templates",
    filePath: "tools/client-communication-templates",
    type: 'tool',
    section: "01",
    parentId: "section-01",
    isTemplate: true
  },
  // Stage-specific coaching questions sections
  {
    id: 'beige-questions',
    title: {
      en: "Beige Stage Coaching Questions",
      sv: "Coachingfrågor för Beige-stadiet"
    },
    description: {
      en: "Questions aligned with survival-oriented motivations",
      sv: "Frågor anpassade till överlevnadsorienterade motivationer"
    },
    path: "beige-questions",
    filePath: "sections/01-coaching-questions/beige-questions",
    type: 'subsection',
    section: "01",
    parentId: "section-01"
  },
  {
    id: 'purple-questions',
    title: {
      en: "Purple Stage Coaching Questions",
      sv: "Coachingfrågor för Lila-stadiet"
    },
    description: {
      en: "Questions aligned with tribal belonging and safety needs",
      sv: "Frågor anpassade till stamtillhörighet och säkerhetsbehov"
    },
    path: "purple-questions",
    filePath: "sections/01-coaching-questions/purple-questions",
    type: 'subsection',
    section: "01",
    parentId: "section-01"
  },
  {
    id: 'red-questions',
    title: {
      en: "Red Stage Coaching Questions",
      sv: "Coachingfrågor för Röda-stadiet"
    },
    description: {
      en: "Questions aligned with power and autonomy drives",
      sv: "Frågor anpassade till makt- och autonomidrivkrafter"
    },
    path: "red-questions",
    filePath: "sections/01-coaching-questions/red-questions",
    type: 'subsection',
    section: "01",
    parentId: "section-01"
  },
  {
    id: 'blue-questions',
    title: {
      en: "Blue Stage Coaching Questions",
      sv: "Coachingfrågor för Blå-stadiet"
    },
    description: {
      en: "Questions aligned with order and purpose motivations",
      sv: "Frågor anpassade till ordnings- och syftesmotivationer"
    },
    path: "blue-questions",
    filePath: "sections/01-coaching-questions/blue-questions",
    type: 'subsection',
    section: "01",
    parentId: "section-01"
  },
  {
    id: 'orange-questions',
    title: {
      en: "Orange Stage Coaching Questions",
      sv: "Coachingfrågor för Orange-stadiet"
    },
    description: {
      en: "Questions aligned with achievement and success motivations",
      sv: "Frågor anpassade till prestations- och framgångsmotivationer"
    },
    path: "orange-questions",
    filePath: "sections/01-coaching-questions/orange-questions",
    type: 'subsection',
    section: "01",
    parentId: "section-01"
  },
  {
    id: 'green-questions',
    title: {
      en: "Green Stage Coaching Questions",
      sv: "Coachingfrågor för Gröna-stadiet"
    },
    description: {
      en: "Questions aligned with community and harmony motivations",
      sv: "Frågor anpassade till gemenskap och harmoni-motivationer"
    },
    path: "green-questions",
    filePath: "sections/01-coaching-questions/green-questions",
    type: 'subsection',
    section: "01",
    parentId: "section-01"
  },
  {
    id: 'yellow-questions',
    title: {
      en: "Yellow Stage Coaching Questions",
      sv: "Coachingfrågor för Gula-stadiet"
    },
    description: {
      en: "Questions aligned with system integration and flexibility motivations",
      sv: "Frågor anpassade till systemintegration och flexibilitetsmotivationer"
    },
    path: "yellow-questions",
    filePath: "sections/01-coaching-questions/yellow-questions",
    type: 'subsection',
    section: "01",
    parentId: "section-01"
  },
  {
    id: 'turquoise-questions',
    title: {
      en: "Turquoise Stage Coaching Questions",
      sv: "Coachingfrågor för Turkosa-stadiet"
    },
    description: {
      en: "Questions aligned with holistic awareness and interconnection motivations",
      sv: "Frågor anpassade till holistisk medvetenhet och sammankopplingsmotivationer"
    },
    path: "turquoise-questions",
    filePath: "sections/01-coaching-questions/turquoise-questions",
    type: 'subsection',
    section: "01",
    parentId: "section-01"
  },
  {
    id: 'coral-questions',
    title: {
      en: "Coral Stage Coaching Questions",
      sv: "Coachingfrågor för Korall-stadiet"
    },
    description: {
      en: "Questions aligned with evolutionary creativity and sovereignty",
      sv: "Frågor anpassade till evolutionär kreativitet och suveränitet"
    },
    path: "coral-questions",
    filePath: "sections/01-coaching-questions/coral-questions",
    type: 'subsection',
    section: "01",
    parentId: "section-01"
  },
  
  // Section 2: Leadership Styles & Triggers
  {
    id: 'section-02',
    title: {
      en: "Leadership Styles & Triggers Across the Spiral",
      sv: "Ledarstilar & Triggers Genom Spiralen"
    },
    description: {
      en: "Help leaders adapt their style to inspire growth and harmony across stages",
      sv: "Hjälp ledare att anpassa sin stil för att inspirera tillväxt och harmoni över stadierna"
    },
    path: "leadership-styles-introduction",
    filePath: "sections/02-leadership-styles/00-leadership-styles-introduction",
    type: 'section',
    section: "02"
  },
  {
    id: 'leadership-archetypes',
    title: {
      en: "Leadership Archetypes",
      sv: "Ledarskapsarketyper"
    },
    description: {
      en: "Styles aligned with each stage (e.g., Red: Authoritative, Green: Collaborative)",
      sv: "Stilar anpassade till varje stadium (t.ex. Röd: Auktoritativ, Grön: Samarbetsinriktad)"
    },
    path: "leadership-archetypes",
    filePath: "sections/02-leadership-styles/01-leadership-archetypes",
    type: 'subsection',
    section: "02",
    parentId: "section-02"
  },
  {
    id: 'triggers',
    title: {
      en: "Trigger Points",
      sv: "Triggerpunkter"
    },
    description: {
      en: "Disruptors causing conflict or stagnation in different stages",
      sv: "Störfaktorer som orsakar konflikt eller stagnation i olika stadier"
    },
    path: "triggers",
    filePath: "sections/02-leadership-styles/02-triggers",
    type: 'subsection',
    section: "02",
    parentId: "section-02"
  },
  {
    id: 'feedback-strategies',
    title: {
      en: "Feedback Strategies",
      sv: "Återkopplingsstrategier"
    },
    description: {
      en: "Stage-appropriate approaches for giving feedback",
      sv: "Stadielämpliga metoder för att ge återkoppling"
    },
    path: "feedback-strategies",
    filePath: "sections/02-leadership-styles/03-feedback-strategies",
    type: 'subsection',
    section: "02",
    parentId: "section-02"
  },
  {
    id: 'team-dynamics',
    title: {
      en: "Team Dynamics",
      sv: "Teamdynamik"
    },
    description: {
      en: "Understanding and working with team dynamics at different stages",
      sv: "Förstå och arbeta med teamdynamik i olika stadier"
    },
    path: "team-dynamics",
    filePath: "sections/02-leadership-styles/04-team-dynamics",
    type: 'subsection',
    section: "02",
    parentId: "section-02"
  },
  {
    id: 'cultural-adaptation-leadership',
    title: {
      en: "Cultural Adaptation",
      sv: "Kulturell Anpassning"
    },
    description: {
      en: "Tips for adjusting leadership styles to cultural/industry contexts",
      sv: "Tips för att anpassa ledarstilar till kulturella/branschkontexter"
    },
    path: "cultural-adaptation-leadership",
    filePath: "sections/02-leadership-styles/05-cultural-adaptation",
    type: 'subsection',
    section: "02",
    parentId: "section-02"
  },
  {
    id: 'coaching-model-crosswalk-leadership',
    title: {
      en: "Coaching Model Crosswalk",
      sv: "Övergång mellan Coachingmodeller"
    },
    description: {
      en: "Linking Spiral Dynamics leadership styles to frameworks like GROW and ICF competencies",
      sv: "Koppla Spiral Dynamics ledarstilar till ramverk som GROW och ICF-kompetenser"
    },
    path: "coaching-model-crosswalk-leadership",
    filePath: "sections/02-leadership-styles/06-coaching-model-crosswalk",
    type: 'subsection',
    section: "02",
    parentId: "section-02"
  },
  {
    id: 'leadership-snapshot',
    title: {
      en: "Leadership Snapshot Guide",
      sv: "Guide för Ledarskapsöversikt"
    },
    description: {
      en: "One-page guide with archetypes, feedback tips, and crosswalk highlights",
      sv: "Ensidig guide med arketyper, återkopplingstips och övergångsbetoningar"
    },
    path: "leadership-quick-start-snapshot",
    filePath: "tools/leadership-quick-start-snapshot",
    type: 'tool',
    section: "02",
    parentId: "section-02",
    isTool: true
  },
  
  // Section 3: Shadow & Resistance Work
  {
    id: 'section-03',
    title: {
      en: "Shadow & Resistance Work in Developmental Growth",
      sv: "Skugg- & Motståndsarbete i Utvecklingstillväxt"
    },
    description: {
      en: "Equip coaches to address psychological barriers and integrate shadows for authentic growth",
      sv: "Utrusta coacher att hantera psykologiska barriärer och integrera skuggor för autentisk tillväxt"
    },
    path: "shadow-resistance-introduction",
    filePath: "sections/03-shadow-and-resistance-work/00-shadow-resistance-introduction",
    type: 'section',
    section: "03"
  },
  {
    id: 'stage-specific-shadows',
    title: {
      en: "Stage-Specific Shadows",
      sv: "Stadiespecifika Skuggor"
    },
    description: {
      en: "Distortions and defenses specific to each developmental stage",
      sv: "Förvrängningar och försvar specifika för varje utvecklingsstadium"
    },
    path: "stage-specific-shadows",
    filePath: "sections/03-shadow-and-resistance-work/00-stage-specific-shadows",
    type: 'subsection',
    section: "03",
    parentId: "section-03"
  },
  {
    id: 'identifying-resistance',
    title: {
      en: "Identifying Resistance",
      sv: "Identifiera Motstånd"
    },
    description: {
      en: "Somatic, emotional, and cognitive cues of resistance to growth",
      sv: "Somatiska, emotionella och kognitiva tecken på motstånd mot tillväxt"
    },
    path: "identifying-resistance",
    filePath: "sections/03-shadow-and-resistance-work/01-identifying-resistance",
    type: 'subsection',
    section: "03",
    parentId: "section-03"
  },
  {
    id: 'techniques-for-uncovering-shadows',
    title: {
      en: "Techniques for Uncovering Shadows",
      sv: "Tekniker för att Avslöja Skuggor"
    },
    description: {
      en: "Inner parts work, voice dialogue, journaling, role play",
      sv: "Inre delsarbete, röstdialog, journalföring, rollspel"
    },
    path: "techniques-for-uncovering-shadows",
    filePath: "sections/03-shadow-and-resistance-work/02-techniques-for-uncovering-shadows",
    type: 'subsection',
    section: "03",
    parentId: "section-03"
  },
  {
    id: 're-integration-practices',
    title: {
      en: "Re-integration Practices",
      sv: "Återintegrationspraktiker"
    },
    description: {
      en: "Exercises like guided visualization and somatic release",
      sv: "Övningar som guidad visualisering och somatisk frigörelse"
    },
    path: "re-integration-practices",
    filePath: "sections/03-shadow-and-resistance-work/03-re-integration-practices",
    type: 'subsection',
    section: "03",
    parentId: "section-03"
  },
  // Shadow work case studies - by stage
  {
    id: 'shadow-case-study-beige',
    title: {
      en: "Shadow Case Study: Beige",
      sv: "Skuggfallstudie: Beige"
    },
    description: {
      en: "Exercise and case study for working with Beige stage shadows",
      sv: "Övning och fallstudie för att arbeta med skuggor i Beige-stadiet"
    },
    path: "shadow-case-study-beige",
    filePath: "sections/03-shadow-and-resistance-work/04-exercise-case-study-01-beige-stage",
    type: 'exercise',
    section: "03",
    parentId: "section-03",
    isExercise: true
  },
  {
    id: 'shadow-case-study-purple',
    title: {
      en: "Shadow Case Study: Purple",
      sv: "Skuggfallstudie: Lila"
    },
    description: {
      en: "Exercise and case study for working with Purple stage shadows",
      sv: "Övning och fallstudie för att arbeta med skuggor i Lila-stadiet"
    },
    path: "shadow-case-study-purple",
    filePath: "sections/03-shadow-and-resistance-work/04-exercise-case-study-02-purple-stage",
    type: 'exercise',
    section: "03",
    parentId: "section-03",
    isExercise: true
  },
  {
    id: 'shadow-case-study-red',
    title: {
      en: "Shadow Case Study: Red",
      sv: "Skuggfallstudie: Röd"
    },
    description: {
      en: "Exercise and case study for working with Red stage shadows",
      sv: "Övning och fallstudie för att arbeta med skuggor i Röda-stadiet"
    },
    path: "shadow-case-study-red",
    filePath: "sections/03-shadow-and-resistance-work/04-exercise-case-study-03-red-stage",
    type: 'exercise',
    section: "03",
    parentId: "section-03",
    isExercise: true
  },
  {
    id: 'shadow-case-study-blue',
    title: {
      en: "Shadow Case Study: Blue",
      sv: "Skuggfallstudie: Blå"
    },
    description: {
      en: "Exercise and case study for working with Blue stage shadows",
      sv: "Övning och fallstudie för att arbeta med skuggor i Blå-stadiet"
    },
    path: "shadow-case-study-blue",
    filePath: "sections/03-shadow-and-resistance-work/04-exercise-case-study-04-blue-stage",
    type: 'exercise',
    section: "03",
    parentId: "section-03",
    isExercise: true
  },
  {
    id: 'shadow-case-study-orange',
    title: {
      en: "Shadow Case Study: Orange",
      sv: "Skuggfallstudie: Orange"
    },
    description: {
      en: "Exercise and case study for working with Orange stage shadows",
      sv: "Övning och fallstudie för att arbeta med skuggor i Orange-stadiet"
    },
    path: "shadow-case-study-orange",
    filePath: "sections/03-shadow-and-resistance-work/04-exercise-case-study-05-orange-stage",
    type: 'exercise',
    section: "03",
    parentId: "section-03",
    isExercise: true
  },
  {
    id: 'shadow-case-study-green',
    title: {
      en: "Shadow Case Study: Green",
      sv: "Skuggfallstudie: Grön"
    },
    description: {
      en: "Exercise and case study for working with Green stage shadows",
      sv: "Övning och fallstudie för att arbeta med skuggor i Gröna-stadiet"
    },
    path: "shadow-case-study-green",
    filePath: "sections/03-shadow-and-resistance-work/04-exercise-case-study-06-green-stage",
    type: 'exercise',
    section: "03",
    parentId: "section-03",
    isExercise: true
  },
  {
    id: 'shadow-case-study-yellow',
    title: {
      en: "Shadow Case Study: Yellow",
      sv: "Skuggfallstudie: Gul"
    },
    description: {
      en: "Exercise and case study for working with Yellow stage shadows",
      sv: "Övning och fallstudie för att arbeta med skuggor i Gula-stadiet"
    },
    path: "shadow-case-study-yellow",
    filePath: "sections/03-shadow-and-resistance-work/04-exercise-case-study-07-yellow-stage",
    type: 'exercise',
    section: "03",
    parentId: "section-03",
    isExercise: true
  },
  {
    id: 'shadow-case-study-turquoise',
    title: {
      en: "Shadow Case Study: Turquoise",
      sv: "Skuggfallstudie: Turkos"
    },
    description: {
      en: "Exercise and case study for working with Turquoise stage shadows",
      sv: "Övning och fallstudie för att arbeta med skuggor i Turkosa-stadiet"
    },
    path: "shadow-case-study-turquoise",
    filePath: "sections/03-shadow-and-resistance-work/04-exercise-case-study-08-turquoise-stage",
    type: 'exercise',
    section: "03",
    parentId: "section-03",
    isExercise: true
  },
  {
    id: 'shadow-case-study-coral',
    title: {
      en: "Shadow Case Study: Coral",
      sv: "Skuggfallstudie: Korall"
    },
    description: {
      en: "Exercise and case study for working with Coral stage shadows",
      sv: "Övning och fallstudie för att arbeta med skuggor i Korall-stadiet"
    },
    path: "shadow-case-study-coral",
    filePath: "sections/03-shadow-and-resistance-work/04-exercise-case-study-09-coral-stage",
    type: 'exercise',
    section: "03",
    parentId: "section-03",
    isExercise: true
  },
  {
    id: 'shadow-work-quick-start',
    title: {
      en: "Shadow Work Quick Start Guide",
      sv: "Snabbstartsguide för Skuggarbete"
    },
    description: {
      en: "Essential techniques and journaling prompts for shadow work",
      sv: "Väsentliga tekniker och journalföringsprompts för skuggarbete"
    },
    path: "shadow-and-resistance-work-quick-start-guide",
    filePath: "tools/shadow-and-resistance-work-quick-start-guide",
    type: 'tool',
    section: "03",
    parentId: "section-03",
    isTool: true
  },
  
  // Section 4: Transitions & Transformations
  {
    id: 'section-04',
    title: {
      en: "Tools for Guiding Transitions & Transformations",
      sv: "Verktyg för att Guida Övergångar & Transformationer"
    },
    description: {
      en: "Support coaches in navigating clients through stage transitions and liminal spaces",
      sv: "Stöd coacher i att navigera klienter genom stadieövergångar och liminala rum"
    },
    path: "transitions-introduction",
    filePath: "sections/04-transitions/00-transitions-introduction",
    type: 'section',
    section: "04"
  },
  {
    id: 'transition-quick-start',
    title: {
      en: "Quick Start Transition Guide",
      sv: "Snabbstartsguide för Övergång"
    },
    description: {
      en: "One-page checklist with steps for guiding a stage shift",
      sv: "Ensidig checklista med steg för att vägleda en stadieförflyttning"
    },
    path: "quick-start-transition",
    filePath: "sections/04-transitions/00-quick-start-transition",
    type: 'tool',
    section: "04",
    parentId: "section-04",
    isTool: true
  },
  {
    id: 'transition-maps',
    title: {
      en: "Transition Maps",
      sv: "Övergångskartor"
    },
    description: {
      en: "Flowcharts for transitions, highlighting emotional phases",
      sv: "Flödesscheman för övergångar, som belyser emotionella faser"
    },
    path: "transition-maps",
    filePath: "sections/04-transitions/01-transition-maps",
    type: 'subsection',
    section: "04",
    parentId: "section-04"
  },
  {
    id: 'markers-transition',
    title: {
      en: "Markers of Transition",
      sv: "Markörer för Övergång"
    },
    description: {
      en: "Micro-practices like journaling ceremonies and team vision quests",
      sv: "Mikropraktiker som journalceremonier och teamvisionsresor"
    },
    path: "markers-transition",
    filePath: "sections/04-transitions/02-markers-transition",
    type: 'subsection',
    section: "04",
    parentId: "section-04"
  },
  {
    id: 'motivational-styles',
    title: {
      en: "Motivational Styles and Cultural Considerations",
      sv: "Motivationsstilar och Kulturella Överväganden"
    },
    description: {
      en: "Stage-informed approaches to motivation and cultural adaptations",
      sv: "Stadieinformerade tillvägagångssätt för motivation och kulturella anpassningar"
    },
    path: "motivational-styles",
    filePath: "sections/04-transitions/03-motivational-styles-and-cultural-considerations",
    type: 'subsection',
    section: "04",
    parentId: "section-04"
  },
  {
    id: 'liminal-space-techniques',
    title: {
      en: "Liminal Space Techniques",
      sv: "Tekniker för Liminala Rum"
    },
    description: {
      en: "Tools for disillusionment or burnout phases in transitions",
      sv: "Verktyg för desillusionerings- eller utbrändhetsfaser i övergångar"
    },
    path: "liminal-space-techniques",
    filePath: "sections/04-transitions/04-liminal-space-techniques",
    type: 'subsection',
    section: "04",
    parentId: "section-04"
  },
  {
    id: 'evaluating-progress',
    title: {
      en: "Evaluating Progress",
      sv: "Utvärdera Framsteg"
    },
    description: {
      en: "Qualitative and quantitative indicators of developmental progress",
      sv: "Kvalitativa och kvantitativa indikatorer på utvecklingsframsteg"
    },
    path: "evaluating-progress",
    filePath: "sections/04-transitions/05-evaluating-progress",
    type: 'subsection',
    section: "04",
    parentId: "section-04"
  },
  {
    id: 'progress-tracker-template',
    title: {
      en: "Progress Tracker Template",
      sv: "Mall för Framstegsspårning"
    },
    description: {
      en: "Template to measure client growth over time",
      sv: "Mall för att mäta klienters tillväxt över tid"
    },
    path: "progress-tracker-template",
    filePath: "tools/progress-tracker-template",
    type: 'tool',
    section: "04",
    parentId: "section-04",
    isTemplate: true,
    isWorksheet: true
  },
  
  // Section 5: Blind Spots
  {
    id: 'section-05',
    title: {
      en: "Maps for Self-Diagnosing Coaching Blind Spots",
      sv: "Kartor för Självdiagnostisering av Coachingsblindpunkter"
    },
    description: {
      en: "Help coaches identify biases and expand their developmental awareness",
      sv: "Hjälp coacher att identifiera fördomar och utvidga deras utvecklingsmedvetenhet"
    },
    path: "section-05",
    filePath: "sections/05-blind-spots/00-blind-spots-introduction",
    type: 'section',
    section: "05"
  },
  {
    id: 'blind-spots-quick-start',
    title: {
      en: "Quick Start and Key Takeaways",
      sv: "Snabbstart och Nyckelerfarenheter"
    },
    description: {
      en: "Essential concepts for identifying and overcoming coaching blind spots",
      sv: "Väsentliga koncept för att identifiera och övervinna coachingblindpunkter"
    },
    path: "quick-start-and-key-takeaways",
    filePath: "sections/05-blind-spots/00-quick-start-and-key-takeaways",
    type: 'subsection',
    section: "05",
    parentId: "section-05"
  },
  {
    id: 'understanding-coaching-blind-spots',
    title: {
      en: "Understanding Coaching Blind Spots",
      sv: "Förstå Coachingblindpunkter"
    },
    description: {
      en: "Patterns of over-coaching, under-coaching, and developmental traps",
      sv: "Mönster av övercoaching, undercoaching och utvecklingsfällor"
    },
    path: "understanding-coaching-blind-spots",
    filePath: "sections/05-blind-spots/01-understanding-coaching-blind-spots",
    type: 'subsection',
    section: "05",
    parentId: "section-05"
  },
  {
    id: 'reflective-practice',
    title: {
      en: "Reflective Practice for Spiral-Aware Coaching",
      sv: "Reflekterande Praktik för Spiralmedveten Coaching"
    },
    description: {
      en: "Exercises like mapping one's spiral journey or journaling on biases",
      sv: "Övningar som att kartlägga ens spiralresa eller journalföra om fördomar"
    },
    path: "reflective-practice",
    filePath: "sections/05-blind-spots/02-reflective-practice-for-spiral-aware-coaching",
    type: 'subsection',
    section: "05",
    parentId: "section-05"
  },
  {
    id: 'self-assessment',
    title: {
      en: "Spiral-Aware Coach Self-Assessment",
      sv: "Spiralmedveten Coach Självbedömning"
    },
    description: {
      en: "Assessment for identifying strengths and growth areas in spiral-aware coaching",
      sv: "Bedömning för att identifiera styrkor och tillväxtområden inom spiralmedveten coaching"
    },
    path: "self-assessment",
    filePath: "sections/05-blind-spots/03-spiral-aware-coach-self-assessment",
    type: 'subsection',
    section: "05",
    parentId: "section-05",
    isWorksheet: true
  },
  {
    id: 'coaching-model-crosswalk-blind-spots',
    title: {
      en: "Coaching Model Crosswalk",
      sv: "Övergång mellan Coachingmodeller"
    },
    description: {
      en: "Linking blind spot patterns to ICF competencies",
      sv: "Koppla blindpunktsmönster till ICF-kompetenser"
    },
    path: "coaching-model-crosswalk-blind-spots",
    filePath: "sections/05-blind-spots/04-coaching-model-crosswalk",
    type: 'subsection',
    section: "05",
    parentId: "section-05"
  },
  
  // Section 6: Cultural and Organizational Contexts
  {
    id: 'section-06',
    title: {
      en: "Adapting to Cultural and Organizational Contexts",
      sv: "Anpassa till Kulturella och Organisatoriska Sammanhang"
    },
    description: {
      en: "Ensure tools are relevant across diverse cultural and industry settings",
      sv: "Säkerställ att verktyg är relevanta över olika kulturella och branschinställningar"
    },
    path: "section-06",
    filePath: "sections/06-cultural-and-organizational-contexts/00-contexts-introduction",
    type: 'section',
    section: "06"
  },
  {
    id: 'contexts-quick-start',
    title: {
      en: "Quick Start and Key Takeaways",
      sv: "Snabbstart och Nyckelerfarenheter"
    },
    description: {
      en: "One-page Cultural Adaptation Guide with tailoring tips",
      sv: "Ensidig kulturell anpassningsguide med skräddarsyningstips"
    },
    path: "contexts-quick-start",
    filePath: "sections/06-cultural-and-organizational-contexts/00-quick-start-and-key-takeaways",
    type: 'subsection',
    section: "06",
    parentId: "section-06",
    isTool: true
  },
  {
    id: 'cultural-adaptations',
    title: {
      en: "Cultural and Organizational Adaptations of Spiral Dynamics",
      sv: "Kulturella och Organisatoriska Anpassningar av Spiral Dynamics"
    },
    description: {
      en: "Stage manifestations in collectivist vs. individualist cultures and industry variations",
      sv: "Stadiemanifestationer i kollektivistiska kontra individualistiska kulturer och branschvariationer"
    },
    path: "cultural-adaptations",
    filePath: "sections/06-cultural-and-organizational-contexts/01-cultural-and-organizational-adaptations-of-spiral-dynamics",
    type: 'subsection',
    section: "06",
    parentId: "section-06"
  },
  {
    id: 'adaptation-framework',
    title: {
      en: "Adaptation Framework and Case Studies",
      sv: "Anpassningsramverk och Fallstudier"
    },
    description: {
      en: "Step-by-step guide to customize tools with real-world examples",
      sv: "Steg-för-steg-guide för att anpassa verktyg med verkliga exempel"
    },
    path: "adaptation-framework",
    filePath: "sections/06-cultural-and-organizational-contexts/02-adaptation-framework-and-case-studies",
    type: 'subsection',
    section: "06",
    parentId: "section-06"
  },
  
  // Section 7: Resources
  {
    id: 'section-07',
    title: {
      en: "Further Resources & Community Engagement",
      sv: "Ytterligare Resurser & Gemenskapsengagemang"
    },
    description: {
      en: "Connect to Spiralize.org's ecosystem and the global Spiral Dynamics community",
      sv: "Anknyt till Spiralize.orgs ekosystem och den globala Spiral Dynamics-gemenskapen"
    },
    path: "section-07",
    filePath: "sections/07-resources/00-resources-introduction",
    type: 'section',
    section: "07"
  },
  {
    id: 'curated-reading-list',
    title: {
      en: "Curated Reading List",
      sv: "Utvald Läslista"
    },
    description: {
      en: "Key books, articles, and resources for deepening spiral-aware coaching",
      sv: "Viktiga böcker, artiklar och resurser för att fördjupa spiralmedveten coaching"
    },
    path: "curated-reading-list",
    filePath: "sections/07-resources/01-curated-reading-list",
    type: 'subsection',
    section: "07",
    parentId: "section-07"
  },
  {
    id: 'community-engagement',
    title: {
      en: "Community Engagement and Contact Forms",
      sv: "Gemenskapsengagemang och Kontaktformulär"
    },
    description: {
      en: "Join the Spiralize community and provide feedback on the toolkit",
      sv: "Gå med i Spiralize-gemenskapen och ge återkoppling på verktygslådan"
    },
    path: "community-engagement",
    filePath: "sections/07-resources/02-contact-forms",
    type: 'subsection',
    section: "07",
    parentId: "section-07"
  },
  
  // Implementation Roadmap
  {
    id: 'implementation-roadmap',
    title: {
      en: "Implementation Roadmap",
      sv: "Implementeringsplan"
    },
    description: {
      en: "Guide for applying the toolkit effectively through a structured approach",
      sv: "Guide för att effektivt tillämpa verktygslådan genom ett strukturerat tillvägagångssätt"
    },
    path: "roadmap",
    filePath: "roadmap",
    type: 'section',
    section: "08"
  }
];

// Translations for guide elements
const guideTranslations = {
  en: {
    title: "Spiral Coaching & Leadership Toolkit",
    subtitle: "Practice tools for coaches, mentors, facilitators, and leaders using Spiral Dynamics principles",
    introduction: "This toolkit equips coaches and leaders with practical, stage-specific tools to guide vertical development—across individuals, teams, and organizations—using Spiral Dynamics principles.",
    downloadPrompt: "Download the complete toolkit as PDF:",
    downloadButton: "Download PDF (English)",
    tableOfContentsTitle: "Table of Contents",
    sectionsTitle: {
      section00: "Introduction to Spiral Dynamics",
      section01: "Coaching Questions by Stage",
      section02: "Leadership Styles & Triggers",
      section03: "Shadow & Resistance Work",
      section04: "Transitions & Transformations",
      section05: "Coaching Blind Spots",
      section06: "Cultural & Organizational Contexts",
      section07: "Resources & Community",
      section08: "Implementation Roadmap"
    },
    loading: "Loading content...",
    error: "Error loading content.",
    tableOfContents: "Table of Contents",
    next: "Next Section",
    previous: "Previous Section",
    sectionText: "Section",
    subsectionText: "Subsection",
    toolText: "Tool",
    exerciseText: "Exercise",
    templateText: "Template",
    worksheetText: "Worksheet",
    comingSoon: "Content coming soon",
    resources: "Related Tools & Resources",
    forWhom: "Who is this toolkit for?",
    forWhomContent: [
      "Primary: Coaches and facilitators familiar with Spiral Dynamics seeking actionable tools.",
      "Secondary: Leaders and mentors new to Spiral Dynamics, supported by introductory guidance.",
      "Use Case: Individual coaching, team development, organizational transformation, and personal growth."
    ],
    quickStartGuidesTitle: "Quick Start Guides",
    toolkitSectionsTitle: "Toolkit Sections"
  },
  sv: {
    title: "Spiral Coaching & Ledarskapsverktygslåda",
    subtitle: "Praktiska verktyg för coacher, mentorer, facilitatorer och ledare som använder Spiral Dynamics-principer",
    introduction: "Denna verktygslåda utrustar coacher och ledare med praktiska, stadiespecifika verktyg för att guida vertikal utveckling – över individer, team och organisationer – med hjälp av Spiral Dynamics-principer.",
    downloadPrompt: "Ladda ner hela verktygslådan som PDF:",
    downloadButton: "Ladda ner PDF (Engelska)",
    tableOfContentsTitle: "Innehållsförteckning",
    sectionsTitle: {
      section00: "Introduktion till Spiral Dynamics",
      section01: "Coachingfrågor per Stadium",
      section02: "Ledarstilar & Triggers",
      section03: "Skugg- & Motståndsarbete",
      section04: "Övergångar & Transformationer",
      section05: "Coachingblindpunkter",
      section06: "Kulturella & Organisatoriska Sammanhang",
      section07: "Resurser & Gemenskap",
      section08: "Implementeringsplan"
    },
    loading: "Laddar innehåll...",
    error: "Fel vid laddning av innehåll.",
    tableOfContents: "Innehållsförteckning",
    next: "Nästa Avsnitt",
    previous: "Föregående Avsnitt",
    sectionText: "Avsnitt",
    subsectionText: "Delavsnitt",
    toolText: "Verktyg",
    exerciseText: "Övning",
    templateText: "Mall",
    worksheetText: "Arbetsblad",
    comingSoon: "Innehåll kommer snart",
    resources: "Relaterade Verktyg & Resurser",
    forWhom: "Vem är denna verktygslåda för?",
    forWhomContent: [
      "Primärt: Coacher och facilitatorer bekanta med Spiral Dynamics som söker praktiska verktyg.",
      "Sekundärt: Ledare och mentorer nya till Spiral Dynamics, stöttade av introduktionsvägledning.",
      "Användningsfall: Individuell coaching, teamutveckling, organisationstransformation och personlig tillväxt."
    ],
    quickStartGuidesTitle: "Snabbstartsguider",
    toolkitSectionsTitle: "Verktygslådans Avsnitt"
  }
};

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
export const getQuickReferenceItems = () => 
  allGuideItems.filter(item => item.isQuickReference || item.path.includes('quick-start') || item.id.includes('cheat-sheet'));

// Create and export the store
export const leadershipGuideStore = writable({
  translations: guideTranslations,
  currentItem: null as GuideItem | null,
  showTableOfContents: false
});

// Export functions to manage the store
export function setCurrentItem(path: string) {
  const item = getItemByPath(path);
  leadershipGuideStore.update(state => ({
    ...state,
    currentItem: item || null
  }));
}

export function toggleTableOfContents() {
  leadershipGuideStore.update(state => ({
    ...state,
    showTableOfContents: !state.showTableOfContents
  }));
}
