// src/lib/stores/spiritualGuideData-part5.ts
// Define GuideItem interface inline to avoid import issues
interface GuideItem {
  id: string;
  title: {
    en: string;
    sv: string;
  };
  description?: {
    en: string;
    sv: string;
  };
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

// Ethics, service, and wisdom traditions sections
export const guideDataPart5: GuideItem[] = [
  // Section 6: Ethics for the Awakening Spiral
  {
    id: 'section-06',
    title: {
      en: "Ethics for the Awakening Spiral",
      sv: "Etik för den uppvaknande spiralen"
    },
    description: {
      en: "Service without superiority, wisdom without dogma",
      sv: "Tjänande utan överlägsenhet, visdom utan dogm"
    },
    path: "ethics-intro",
    filePath: "sections/06-ethics-service/00-ethics-intro",
    type: 'section',
    section: "06"
  },
  {
    id: 'everyday-mysticism',
    title: {
      en: "Everyday Mysticism",
      sv: "Vardagsmystik"
    },
    description: {
      en: "Washing dishes at the end of the spiral",
      sv: "Diska vid spiralens slut"
    },
    path: "everyday-mysticism",
    filePath: "sections/06-ethics-service/everyday-mysticism",
    type: 'subsection',
    section: "06",
    parentId: "section-06",
    isQuickReference: true
  },
  {
    id: 'service-frameworks',
    title: {
      en: "Service Frameworks",
      sv: "Tjänsteramverk"
    },
    description: {
      en: "From egoic charity to evolutionary love",
      sv: "Från egoistisk välgörenhet till evolutionär kärlek"
    },
    path: "service-frameworks",
    filePath: "sections/06-ethics-service/service-frameworks",
    type: 'subsection',
    section: "06",
    parentId: "section-06"
  },
  // Stage-specific ethics
  {
    id: 'beige-ethics',
    title: {
      en: "Beige Ethics",
      sv: "Beige etik"
    },
    description: {
      en: "Ethical considerations at the survival stage",
      sv: "Etiska överväganden på överlevnadsstadiet"
    },
    path: "beige-ethics",
    filePath: "sections/06-ethics-service/stage-ethics/beige-ethics",
    type: 'subsection',
    section: "06",
    parentId: "section-06",
    hasStageSpecificContent: true,
    stages: ["beige"]
  },
  {
    id: 'purple-ethics',
    title: {
      en: "Purple Ethics",
      sv: "Lila etik"
    },
    description: {
      en: "Ethics of tribal belonging and ancestral wisdom",
      sv: "Etik kring stamtillhörighet och förfaderlig visdom"
    },
    path: "purple-ethics",
    filePath: "sections/06-ethics-service/stage-ethics/purple-ethics",
    type: 'subsection',
    section: "06",
    parentId: "section-06",
    hasStageSpecificContent: true,
    stages: ["purple"]
  },
  {
    id: 'red-ethics',
    title: {
      en: "Red Ethics",
      sv: "Röd etik"
    },
    description: {
      en: "Ethical power wielding and warrior codes",
      sv: "Etisk kraftutövning och krigarkoder"
    },
    path: "red-ethics",
    filePath: "sections/06-ethics-service/stage-ethics/red-ethics",
    type: 'subsection',
    section: "06",
    parentId: "section-06",
    hasStageSpecificContent: true,
    stages: ["red"]
  },
  {
    id: 'blue-ethics',
    title: {
      en: "Blue Ethics",
      sv: "Blå etik"
    },
    description: {
      en: "Ethics of sacred order and rule-based morality",
      sv: "Etik kring helig ordning och regelbaserad moral"
    },
    path: "blue-ethics",
    filePath: "sections/06-ethics-service/stage-ethics/blue-ethics",
    type: 'subsection',
    section: "06",
    parentId: "section-06",
    hasStageSpecificContent: true,
    stages: ["blue"]
  },
  {
    id: 'orange-ethics',
    title: {
      en: "Orange Ethics",
      sv: "Orange etik"
    },
    description: {
      en: "Ethics of innovation, achievement, and strategic spirituality",
      sv: "Etik kring innovation, prestation och strategisk andlighet"
    },
    path: "orange-ethics",
    filePath: "sections/06-ethics-service/stage-ethics/orange-ethics",
    type: 'subsection',
    section: "06",
    parentId: "section-06",
    hasStageSpecificContent: true,
    stages: ["orange"]
  },
  {
    id: 'green-ethics',
    title: {
      en: "Green Ethics",
      sv: "Grön etik"
    },
    description: {
      en: "Ethics of inclusivity, compassion, and communal spirituality",
      sv: "Etik kring inkludering, medkänsla och gemensam andlighet"
    },
    path: "green-ethics",
    filePath: "sections/06-ethics-service/stage-ethics/green-ethics",
    type: 'subsection',
    section: "06",
    parentId: "section-06",
    hasStageSpecificContent: true,
    stages: ["green"]
  },
  {
    id: 'yellow-ethics',
    title: {
      en: "Yellow Ethics",
      sv: "Gul etik"
    },
    description: {
      en: "Ethics of systemic awareness and developmental discernment",
      sv: "Etik kring systemisk medvetenhet och utvecklingsbaserat omdöme"
    },
    path: "yellow-ethics",
    filePath: "sections/06-ethics-service/stage-ethics/yellow-ethics",
    type: 'subsection',
    section: "06",
    parentId: "section-06",
    hasStageSpecificContent: true,
    stages: ["yellow"]
  },
  {
    id: 'turquoise-ethics',
    title: {
      en: "Turquoise Ethics",
      sv: "Turkos etik"
    },
    description: {
      en: "Ethics of holistic consciousness and planetary responsibility",
      sv: "Etik kring holistiskt medvetande och planetariskt ansvar"
    },
    path: "turquoise-ethics",
    filePath: "sections/06-ethics-service/stage-ethics/turquoise-ethics",
    type: 'subsection',
    section: "06",
    parentId: "section-06",
    hasStageSpecificContent: true,
    stages: ["turquoise"]
  },
  {
    id: 'coral-ethics',
    title: {
      en: "Coral Ethics",
      sv: "Korall etik"
    },
    description: {
      en: "Ethics of evolutionary play and creative disruption",
      sv: "Etik kring evolutionär lek och kreativ störning"
    },
    path: "coral-ethics",
    filePath: "sections/06-ethics-service/stage-ethics/coral-ethics",
    type: 'subsection',
    section: "06",
    parentId: "section-06",
    hasStageSpecificContent: true,
    stages: ["coral"]
  },
  {
    id: 'ultraviolet-ethics',
    title: {
      en: "Ultra-Violet Ethics",
      sv: "Ultraviolett etik"
    },
    description: {
      en: "Ethics of transparent being and effortless response",
      sv: "Etik kring transparent vara och mödolöst gensvar"
    },
    path: "ultraviolet-ethics",
    filePath: "sections/06-ethics-service/stage-ethics/ultraviolet-ethics",
    type: 'subsection',
    section: "06",
    parentId: "section-06",
    hasStageSpecificContent: true,
    stages: ["ultraviolet"]
  },
  {
    id: 'clear-ethics',
    title: {
      en: "Clear Ethics",
      sv: "Klar etik"
    },
    description: {
      en: "Ethics beyond ethics, responsibility without someone responsible",
      sv: "Etik bortom etik, ansvar utan någon som är ansvarig"
    },
    path: "clear-ethics",
    filePath: "sections/06-ethics-service/stage-ethics/clear-ethics",
    type: 'subsection',
    section: "06",
    parentId: "section-06",
    hasStageSpecificContent: true,
    stages: ["clear"]
  },
  // Ethics tools
  {
    id: 'service-planner',
    title: {
      en: "Service Planner",
      sv: "Tjänsteplanerare"
    },
    description: {
      en: "Stage-aligned action templates for ethical service",
      sv: "Stadieorienterade åtgärdsmallar för etisk tjänst"
    },
    path: "service-planner",
    filePath: "tools/service-planner",
    type: 'tool',
    section: "06",
    parentId: "section-06",
    isTool: true
  },
  {
    id: 'beyond-saviorism',
    title: {
      en: "Beyond Saviorism Workshop",
      sv: "Workshop bortom frälsarrollen"
    },
    description: {
      en: "Decolonizing service and avoiding helper syndrome",
      sv: "Avkolonisera tjänande och undvika hjälparsyndrom"
    },
    path: "beyond-saviorism",
    filePath: "workshops/beyond-saviorism",
    type: 'tool',
    section: "06",
    parentId: "section-06",
    isTool: true
  },
  {
    id: 'boundary-setting',
    title: {
      en: "Boundary Setting Guide",
      sv: "Guide för gränssättning"
    },
    description: {
      en: "Creating sacred containers in spiritual relationships",
      sv: "Skapa heliga behållare i andliga relationer"
    },
    path: "boundary-setting",
    filePath: "tools/boundary-setting",
    type: 'tool',
    section: "06",
    parentId: "section-06",
    isTool: true
  },
  {
    id: 'metrics-discernment',
    title: {
      en: "Metrics Discernment Guide",
      sv: "Guide för metrikdiskernering"
    },
    description: {
      en: "When to measure, when to surrender in spiritual practice",
      sv: "När man ska mäta, när man ska kapitulera i andlig övning"
    },
    path: "metrics-discernment",
    filePath: "tools/metrics-discernment",
    type: 'tool',
    section: "06",
    parentId: "section-06",
    isTool: true
  },
  {
    id: 'somatic-ethics',
    title: {
      en: "Somatic Ethics Assessment",
      sv: "Somatisk etikvärdering"
    },
    description: {
      en: "How to feel ethics in your body across developmental stages",
      sv: "Hur man känner etik i kroppen över utvecklingsstadier"
    },
    path: "somatic-ethics",
    filePath: "tools/somatic-ethics",
    type: 'tool',
    section: "06",
    parentId: "section-06",
    isTool: true
  },
  {
    id: 'conscious-consumerism',
    title: {
      en: "Conscious Consumerism Guide",
      sv: "Guide för medveten konsumtion"
    },
    description: {
      en: "Ethical purchasing practices across developmental stages",
      sv: "Etiska inköpsrutiner över utvecklingsstadier"
    },
    path: "conscious-consumerism",
    filePath: "appendices/conscious-consumerism",
    type: 'appendix',
    section: "06",
    parentId: "section-06",
    isAppendix: true
  },
  
  // Section 7: Wisdom Traditions
  {
    id: 'section-07',
    title: {
      en: "Wisdom Traditions Through the Spiral Lens",
      sv: "Visdomstraditioner genom spirallinsen"
    },
    description: {
      en: "Maps of the territory you already are",
      sv: "Kartor över territoriet du redan är"
    },
    path: "traditions-intro",
    filePath: "sections/07-wisdom-traditions/00-traditions-intro",
    type: 'section',
    section: "07"
  },
  {
    id: 'indigenous',
    title: {
      en: "Indigenous Wisdom",
      sv: "Ursprungsfolkens visdom"
    },
    description: {
      en: "Where the land remembers what we've forgotten",
      sv: "Där landet minns vad vi har glömt"
    },
    path: "indigenous",
    filePath: "sections/07-wisdom-traditions/indigenous",
    type: 'subsection',
    section: "07",
    parentId: "section-07"
  },
  {
    id: 'monastic',
    title: {
      en: "Monastic Wisdom",
      sv: "Klostervisdom"
    },
    description: {
      en: "Where divine order meets human architecture",
      sv: "Där gudomlig ordning möter mänsklig arkitektur"
    },
    path: "monastic",
    filePath: "sections/07-wisdom-traditions/monastic",
    type: 'subsection',
    section: "07",
    parentId: "section-07"
  },
  {
    id: 'nondual',
    title: {
      en: "Nondual Wisdom",
      sv: "Icke-dualistisk visdom"
    },
    description: {
      en: "When the seeker finally forgets to seek",
      sv: "När sökaren äntligen glömmer att söka"
    },
    path: "nondual",
    filePath: "sections/07-wisdom-traditions/nondual",
    type: 'subsection',
    section: "07",
    parentId: "section-07"
  },
  {
    id: 'integral',
    title: {
      en: "Integral Frameworks",
      sv: "Integrala ramverk"
    },
    description: {
      en: "The spiral gets a selfie stick",
      sv: "Spiralen får en selfiepinne"
    },
    path: "integral",
    filePath: "sections/07-wisdom-traditions/integral",
    type: 'subsection',
    section: "07",
    parentId: "section-07"
  },
  // Everyday practice tools
  {
    id: 'kitchen-retreats',
    title: {
      en: "Five-Minute Kitchen Retreats",
      sv: "Fem minuters köksretreater"
    },
    description: {
      en: "Finding the sacred in everyday moments",
      sv: "Hitta det heliga i vardagliga stunder"
    },
    path: "kitchen-retreats",
    filePath: "practices/kitchen-retreats",
    type: 'tool',
    section: "07",
    parentId: "section-07",
    isTool: true
  },
  {
    id: 'commuter-meditations',
    title: {
      en: "Commuter Meditation Series",
      sv: "Meditationsserie för pendlare"
    },
    description: {
      en: "Sacred journeys in everyday travel",
      sv: "Heliga resor i vardagligt resande"
    },
    path: "commuter-meditations",
    filePath: "practices/commuter-meditations",
    type: 'tool',
    section: "07",
    parentId: "section-07",
    isTool: true
  },
  {
    id: 'digital-detox',
    title: {
      en: "Digital Detox Protocol",
      sv: "Digital avgiftningsprotokoll"
    },
    description: {
      en: "Technology fasting as spiritual practice",
      sv: "Teknologisk fasta som andlig övning"
    },
    path: "digital-detox",
    filePath: "tools/digital-detox",
    type: 'tool',
    section: "07",
    parentId: "section-07",
    isTool: true
  },
  {
    id: 'service-case-studies',
    title: {
      en: "Living Case Studies",
      sv: "Levande fallstudier"
    },
    description: {
      en: "Real-world examples of spiral-based service",
      sv: "Verkliga exempel på spiralbaserad tjänst"
    },
    path: "service-case-studies",
    filePath: "appendices/service-case-studies",
    type: 'appendix',
    section: "07",
    parentId: "section-07",
    isAppendix: true
  }
];
