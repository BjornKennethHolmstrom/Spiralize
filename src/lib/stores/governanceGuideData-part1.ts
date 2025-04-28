// src/lib/stores/governanceGuideData-part1.ts

// Define the structure for the governance guide
export const guideDataPart1 = [
  // Introduction
  {
    id: 'section-00',
    title: {
      en: 'Introduction: The Developmental Challenge of Global Governance',
      sv: 'Introduktion: Den utvecklingsmässiga utmaningen för global styrning'
    },
    description: {
      en: 'An overview of Spiral Dynamics as a lens for understanding global governance challenges.',
      sv: 'En översikt av Spiral Dynamics som ett perspektiv för att förstå globala styrningsutmaningar.'
    },
    path: 'introduction',
    filePath: '/content/guides/governance/introduction.md',
    type: 'section',
    section: '00',
    isQuickReference: false
  },
  
  // Part I: Mapping the Global Developmental Landscape
  {
    id: 'section-01',
    title: {
      en: 'Part I: Mapping the Global Developmental Landscape',
      sv: 'Del I: Kartläggning av det globala utvecklingslandskapet'
    },
    description: {
      en: 'A comprehensive overview of value systems and their expression in global governance.',
      sv: 'En omfattande översikt över värdesystem och deras uttryck i global styrning.'
    },
    path: 'part-i',
    filePath: '/content/guides/governance/part-i.md',
    type: 'section',
    section: '01',
    isQuickReference: false
  },
  
  // Chapter 1: Value Systems and Their Expression in Governance
  {
    id: 'subsection-01-01',
    title: {
      en: 'Chapter 1: Value Systems and Their Expression in Governance',
      sv: 'Kapitel 1: Värdesystem och deras uttryck i styrning'
    },
    description: {
      en: 'How different value systems manifest in governance structures across the globe.',
      sv: 'Hur olika värdesystem manifesterar sig i styrningsstrukturer över hela världen.'
    },
    path: 'chapter-1-value-systems',
    filePath: '/content/guides/governance/chapter-1-value-systems.md',
    type: 'subsection',
    section: '01',
    subsection: '01',
    parentId: 'section-01',
    isQuickReference: false
  },
  
  // Chapter 2: Developmental Assessment of Current Global Institutions
  {
    id: 'subsection-01-02',
    title: {
      en: 'Chapter 2: Developmental Assessment of Current Global Institutions',
      sv: 'Kapitel 2: Utvecklingsbedömning av nuvarande globala institutioner'
    },
    description: {
      en: 'An analysis of current global institutions through the lens of developmental stages.',
      sv: 'En analys av nuvarande globala institutioner genom utvecklingsstadier.'
    },
    path: 'chapter-2-developmental-assessment',
    filePath: '/content/guides/governance/chapter-2-developmental-assessment.md',
    type: 'subsection',
    section: '01',
    subsection: '02',
    parentId: 'section-01',
    isQuickReference: false
  },
  
  // Part II: Bridging Developmental Divides
  {
    id: 'section-02',
    title: {
      en: 'Part II: Bridging Developmental Divides',
      sv: 'Del II: Överbryggning av utvecklingsklyftor'
    },
    description: {
      en: 'Strategies for navigating and resolving developmental divides in global governance.',
      sv: 'Strategier för att navigera och lösa utvecklingsklyftor i global styrning.'
    },
    path: 'part-ii',
    filePath: '/content/guides/governance/part-ii.md',
    type: 'section',
    section: '02',
    isQuickReference: false
  },
  
  // Chapter 3: Climate Governance Through a Spiral Lens
  {
    id: 'subsection-02-01',
    title: {
      en: 'Chapter 3: Climate Governance Through a Spiral Lens',
      sv: 'Kapitel 3: Klimatstyrning genom ett spiralt perspektiv'
    },
    description: {
      en: 'How value systems perceive and approach climate change governance.',
      sv: 'Hur värdesystem uppfattar och närmar sig klimatförändringsstyrning.'
    },
    path: 'chapter-3-climate-governance',
    filePath: '/content/guides/governance/chapter-3-climate-governance.md',
    type: 'subsection',
    section: '02',
    subsection: '01',
    parentId: 'section-02',
    isQuickReference: false
  },
  
  // Chapter 4: Security and Peace in a Developmental Context
  {
    id: 'subsection-02-02',
    title: {
      en: 'Chapter 4: Security and Peace in a Developmental Context',
      sv: 'Kapitel 4: Säkerhet och fred i ett utvecklingssammanhang'
    },
    description: {
      en: 'Addressing security challenges through developmental perspectives.',
      sv: 'Att hantera säkerhetsutmaningar genom utvecklingsperspektiv.'
    },
    path: 'chapter-4-security-peace',
    filePath: '/content/guides/governance/chapter-4-security-peace.md',
    type: 'subsection',
    section: '02',
    subsection: '02',
    parentId: 'section-02',
    isQuickReference: false
  },
  
  // Chapter 5: Economic Systems and Development
  {
    id: 'subsection-02-03',
    title: {
      en: 'Chapter 5: Economic Systems and Development',
      sv: 'Kapitel 5: Ekonomiska system och utveckling'
    },
    description: {
      en: 'Exploring economic frameworks that support healthy development across value systems.',
      sv: 'Utforska ekonomiska ramverk som stödjer hälsosam utveckling över värdesystem.'
    },
    path: 'chapter-5-economic-systems',
    filePath: '/content/guides/governance/chapter-5-economic-systems.md',
    type: 'subsection',
    section: '02',
    subsection: '03',
    parentId: 'section-02',
    isQuickReference: false
  }
];
