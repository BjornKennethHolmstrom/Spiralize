// src/lib/data/stageExplanations.ts
import type { Translation } from '../types/spiral';

interface StageExplanation {
  dominant: Translation;
  secondary: Translation;
}

type StageCombinations = Record<string, Record<string, Translation>>;

export const dominantStageExplanations: Record<string, StageExplanation> = {
  beige: {
    dominant: {
      en: "Your center of gravity in Beige indicates a strong focus on basic survival needs and immediate life conditions. You likely have a practical approach to life and are adept at handling fundamental challenges.",
      sv: "Ditt gravitationscentrum i Beige indikerar ett starkt fokus på grundläggande överlevnadsbehov och omedelbara livsvillkor. Du har troligen ett praktiskt förhållningssätt till livet och är skicklig på att hantera fundamentala utmaningar."
    },
    secondary: {
      en: "Having Beige as a secondary influence suggests you maintain a grounding in practical realities while operating from other value systems.",
      sv: "Att ha Beige som sekundärt inflytande antyder att du behåller en förankring i praktiska realiteter medan du opererar från andra värdesystem."
    }
  },
  purple: {
    dominant: {
      en: "Your center of gravity in Purple reflects a strong connection to tradition, community, and ancestral wisdom. You likely value belonging and find meaning in shared beliefs and rituals.",
      sv: "Ditt gravitationscentrum i Lila återspeglar en stark koppling till tradition, gemenskap och förfäders visdom. Du värdesätter troligen tillhörighet och finner mening i delade övertygelser och ritualer."
    },
    secondary: {
      en: "Having Purple as a secondary influence suggests you maintain strong ties to community and tradition while embracing other perspectives.",
      sv: "Att ha Lila som sekundärt inflytande antyder att du upprätthåller starka band till gemenskap och tradition samtidigt som du omfattar andra perspektiv."
    }
  },
  red: {
    dominant: {
      en: "Your center of gravity in Red indicates a strong drive for personal power and immediate action. You likely value independence and have the courage to assert yourself.",
      sv: "Ditt gravitationscentrum i Rött indikerar en stark drivkraft för personlig makt och omedelbar handling. Du värdesätter troligen självständighet och har modet att hävda dig själv."
    },
    secondary: {
      en: "Having Red as a secondary influence suggests you maintain healthy assertiveness and personal power while operating from other value systems.",
      sv: "Att ha Rött som sekundärt inflytande antyder att du upprätthåller hälsosam självhävdelse och personlig makt medan du opererar från andra värdesystem."
    }
  },
  blue: {
    dominant: {
      en: "Your center of gravity in Blue reflects a strong commitment to order, purpose, and principles. You likely value structure and have a clear sense of right and wrong.",
      sv: "Ditt gravitationscentrum i Blått återspeglar ett starkt engagemang för ordning, syfte och principer. Du värdesätter troligen struktur och har en tydlig känsla för rätt och fel."
    },
    secondary: {
      en: "Having Blue as a secondary influence suggests you maintain a strong moral compass while embracing flexibility in other areas.",
      sv: "Att ha Blått som sekundärt inflytande antyder att du upprätthåller en stark moralisk kompass samtidigt som du omfattar flexibilitet i andra områden."
    }
  },
  orange: {
    dominant: {
      en: "Your center of gravity in Orange indicates a strong drive for achievement and strategic thinking. You likely value progress and excel at finding effective solutions.",
      sv: "Ditt gravitationscentrum i Orange indikerar en stark drivkraft för prestation och strategiskt tänkande. Du värdesätter troligen framsteg och är skicklig på att hitta effektiva lösningar."
    },
    secondary: {
      en: "Having Orange as a secondary influence suggests you maintain strategic thinking while balancing it with other values and perspectives.",
      sv: "Att ha Orange som sekundärt inflytande antyder att du upprätthåller strategiskt tänkande samtidigt som du balanserar det med andra värderingar och perspektiv."
    }
  },
  green: {
    dominant: {
      en: "Your center of gravity in Green reflects a strong emphasis on community, equality, and human connection. You likely value inclusivity and seek harmony in relationships.",
      sv: "Ditt gravitationscentrum i Grönt återspeglar en stark betoning på gemenskap, jämlikhet och mänsklig kontakt. Du värdesätter troligen inkludering och söker harmoni i relationer."
    },
    secondary: {
      en: "Having Green as a secondary influence suggests you maintain strong empathy and social awareness while operating from other value systems.",
      sv: "Att ha Grönt som sekundärt inflytande antyder att du upprätthåller stark empati och social medvetenhet medan du opererar från andra värdesystem."
    }
  },
  yellow: {
    dominant: {
      en: "Your center of gravity in Yellow indicates a strong capacity for systems thinking and integrative solutions. You likely value flexibility and understand complex interconnections.",
      sv: "Ditt gravitationscentrum i Gult indikerar en stark förmåga till systemtänkande och integrativa lösningar. Du värdesätter troligen flexibilitet och förstår komplexa samband."
    },
    secondary: {
      en: "Having Yellow as a secondary influence suggests you maintain systemic awareness while grounding it in other value systems.",
      sv: "Att ha Gult som sekundärt inflytande antyder att du upprätthåller systemisk medvetenhet samtidigt som du förankrar det i andra värdesystem."
    }
  },
  turquoise: {
    dominant: {
      en: "Your center of gravity in Turquoise reflects meta-systemic awareness and participatory understanding of nested living systems. You likely recognize yourself as embedded within complexity and excel at cultivating conditions for emergence rather than imposing solutions.",
      sv: "Ditt gravitationscentrum i Turkos återspeglar meta-systemisk medvetenhet och deltagande förståelse för kapslade levande system. Du inser troligen dig själv som innesluten i komplexitet och är skicklig på att odla förutsättningar för framväxt snarare än att påtvinga lösningar."
    },
    secondary: {
      en: "Having Turquoise as a secondary influence suggests you maintain participatory systems awareness and multi-generational thinking while engaging with other value systems.",
      sv: "Att ha Turkos som sekundärt inflytande antyder att du upprätthåller deltagande systemmedvetenhet och flerlagergenerationellt tänkande samtidigt som du engagerar dig i andra värdesystem."
    }
  },
  coral: {
    dominant: {
      en: "Your center of gravity in Coral reflects sovereign creative consciousness and evolutionary purpose. You likely pioneer new paradigms while maintaining deep connection to universal patterns of emergence.",
      sv: "Ditt gravitationscentrum i Korall återspeglar suveränt kreativt medvetande och evolutionärt syfte. Du är troligen pionjär för nya paradigm medan en djup koppling till universella framväxtmönster bibehålls."
    },
    secondary: {
      en: "Having Coral as a secondary influence suggests you maintain creative sovereignty while grounding it in other value systems.",
      sv: "Att ha Korall som sekundärt inflytande antyder att du upprätthåller kreativ suveränitet samtidigt som du förankrar det i andra värdesystem."
    }
  },
  ultraviolet: {
    dominant: {
      en: "Your center of gravity in Ultraviolet reflects boundless awareness beyond all separation. You likely experience reality as infinite flow and maintain deep presence while engaging with manifest forms.",
      sv: "Ditt gravitationscentrum i Ultraviolett återspeglar gränslös medvetenhet bortom all separation. Du upplever troligen verkligheten som oändligt flöde och upprätthåller djup närvaro medan du engagerar dig i manifesta former."
    },
    secondary: {
      en: "Having Ultraviolet as a secondary influence suggests you maintain access to boundless awareness while operating from other value systems.",
      sv: "Att ha Ultraviolett som sekundärt inflytande antyder att du upprätthåller tillgång till gränslös medvetenhet medan du opererar från andra värdesystem."
    }
  },
  clear: {
    dominant: {
      en: "Your center of gravity in Clear reflects complete transparency beyond all identity and form. You likely experience existence without attachment to any particular expression or manifestation.",
      sv: "Ditt gravitationscentrum i Klar återspeglar fullständig transparens bortom all identitet och form. Du upplever troligen existens utan bundenhet till något särskilt uttryck eller manifestation."
    },
    secondary: {
      en: "Having Clear as a secondary influence suggests you maintain profound emptiness awareness while engaging with other value systems.",
      sv: "Att ha Klar som sekundärt inflytande antyder att du upprätthåller djupgående tomhetsmedvetenhet samtidigt som du engagerar dig i andra värdesystem."
    }
  }
};

export const stageCombinations: StageCombinations = {
  beige: {
    purple: {
      en: "This combination suggests a balance between immediate survival needs and community belonging, indicating adaptability in challenging environments while maintaining social connections.",
      sv: "Denna kombination antyder en balans mellan omedelbara överlevnadsbehov och gemenskapstillhörighet, vilket indikerar anpassningsförmåga i utmanande miljöer samtidigt som sociala kopplingar bibehålls."
    },
    red: {
      en: "This combination merges survival instincts with assertive action, suggesting a strong capacity to navigate challenges through both practical resourcefulness and personal power.",
      sv: "Denna kombination förenar överlevnadsinstinkter med självsäker handling, vilket antyder en stark förmåga att navigera utmaningar genom både praktisk resursfullhet och personlig makt."
    },
    blue: {
      en: "This combination integrates basic survival awareness with structured order, indicating an ability to meet fundamental needs through disciplined approaches and systematic planning.",
      sv: "Denna kombination integrerar grundläggande överlevnadsmedvetenhet med strukturerad ordning, vilket indikerar en förmåga att möta fundamentala behov genom disciplinerade tillvägagångssätt och systematisk planering."
    },
    orange: {
      en: "This combination combines survival pragmatism with strategic achievement, suggesting an ability to pursue goals while remaining grounded in practical realities.",
      sv: "Denna kombination förenar överlevnadspragmatism med strategisk prestation, vilket antyder en förmåga att eftersträva mål medan förankring i praktiska realiteter bibehålls."
    },
    green: {
      en: "This combination merges basic survival needs with community care, indicating a capacity to address fundamental challenges while maintaining empathy and connection.",
      sv: "Denna kombination förenar grundläggande överlevnadsbehov med gemenskapsomsorg, vilket indikerar en förmåga att hantera fundamentala utmaningar samtidigt som empati och koppling bibehålls."
    },
    yellow: {
      en: "This combination integrates survival awareness with systems thinking, suggesting an ability to address fundamental needs through understanding complex patterns and relationships.",
      sv: "Denna kombination integrerar överlevnadsmedvetenhet med systemtänkande, vilket antyder en förmåga att hantera fundamentala behov genom att förstå komplexa mönster och relationer."
    },
    turquoise: {
      en: "This combination merges survival pragmatism with participatory systems awareness, suggesting an ability to meet fundamental needs while understanding nested interdependencies and multi-generational impacts.",
      sv: "Denna kombination förenar överlevnadspragmatism med deltagande systemmedvetenhet, vilket antyder en förmåga att möta fundamentala behov samtidigt som kapslade ömsesidiga beroenden och flerlagergenerationella påverkningar förstås."
    },
    coral: {
      en: "This combination integrates survival awareness with sovereign creativity, suggesting a capacity to address fundamental challenges through innovative breakthroughs and evolutionary thinking.",
      sv: "Denna kombination integrerar överlevnadsmedvetenhet med suverän kreativitet, vilket antyder en förmåga att hantera fundamentala utmaningar genom innovativa genombrott och evolutionärt tänkande."
    },
    ultraviolet: {
      en: "This combination merges survival awareness with infinite flow, suggesting an ability to address fundamental needs while remaining open to boundless possibility.",
      sv: "Denna kombination förenar överlevnadsmedvetenhet med oändligt flöde, vilket antyder en förmåga att hantera fundamentala behov samtidigt som öppenhet för gränslös möjlighet bibehålls."
    }
  },
  purple: {
    red: {
      en: "This combination integrates tribal belonging with personal power, suggesting a balance between community loyalty and individual assertiveness.",
      sv: "Denna kombination integrerar stamtillhörighet med personlig makt, vilket antyder en balans mellan gemenskapslojalitet och individuell självhävdelse."
    },
    blue: {
      en: "This combination merges traditional wisdom with structured order, indicating a strong foundation in both ancestral knowledge and principled discipline.",
      sv: "Denna kombination förenar traditionell visdom med strukturerad ordning, vilket indikerar en stark grund i både förfäders kunskap och principfast disciplin."
    },
    orange: {
      en: "This combination blends tribal values with strategic achievement, suggesting an ability to pursue progress while honoring tradition and community roots.",
      sv: "Denna kombination blandar stamvärden med strategisk prestation, vilket antyder en förmåga att eftersträva framsteg samtidigt som tradition och gemenskapsrötter hedras."
    },
    green: {
      en: "This combination unites tribal belonging with inclusive community, indicating a capacity for both deep cultural roots and broad social connection.",
      sv: "Denna kombination förenar stamtillhörighet med inkluderande gemenskap, vilket indikerar en förmåga för både djupa kulturella rötter och bred social koppling."
    },
    yellow: {
      en: "This combination integrates ancestral wisdom with systems thinking, suggesting an ability to honor traditional knowledge while understanding complex modern patterns.",
      sv: "Denna kombination integrerar förfäders visdom med systemtänkande, vilket antyder en förmåga att hedra traditionell kunskap samtidigt som komplexa moderna mönster förstås."
    },
    turquoise: {
      en: "This combination merges tribal wisdom with meta-systemic awareness, suggesting an ability to honor place-based ancestral knowledge while understanding nested, bioregional systems across scales.",
      sv: "Denna kombination förenar stamvisdom med meta-systemisk medvetenhet, vilket antyder en förmåga att hedra platsbaserad förfäderskunskap samtidigt som kapslade, bioregionala system över skalor förstås."
    },
    coral: {
      en: "This combination blends ancestral connection with evolutionary creativity, suggesting a capacity to draw upon traditional wisdom while pioneering new paradigms.",
      sv: "Denna kombination blandar förfäderskoppling med evolutionär kreativitet, vilket antyder en förmåga att dra nytta av traditionell visdom samtidigt som nya paradigm pionjäras."
    },
    ultraviolet: {
      en: "This combination integrates tribal belonging with infinite flow, suggesting an ability to honor sacred connection while remaining open to boundless awareness.",
      sv: "Denna kombination integrerar stamtillhörighet med oändligt flöde, vilket antyder en förmåga att hedra helig koppling samtidigt som öppenhet för gränslös medvetenhet bibehålls."
    }
  },
  red: {
    blue: {
      en: "This combination balances personal power with structured order, indicating a capacity for both assertive action and disciplined responsibility.",
      sv: "Denna kombination balanserar personlig makt med strukturerad ordning, vilket indikerar en förmåga för både självsäker handling och disciplinerat ansvar."
    },
    orange: {
      en: "This combination merges assertive drive with strategic thinking, suggesting a powerful capacity for achievement through both courage and calculated effectiveness.",
      sv: "Denna kombination förenar självsäker drivkraft med strategiskt tänkande, vilket antyder en kraftfull förmåga till prestation genom både mod och beräknad effektivitet."
    },
    green: {
      en: "This combination integrates personal strength with social awareness, indicating an ability to assert oneself while remaining connected to community needs.",
      sv: "Denna kombination integrerar personlig styrka med social medvetenhet, vilket indikerar en förmåga att hävda sig själv samtidigt som koppling till gemenskapsbehov bibehålls."
    },
    yellow: {
      en: "This combination blends assertive action with systems thinking, suggesting a capacity to take decisive steps while understanding complex systemic impacts.",
      sv: "Denna kombination blandar självsäker handling med systemtänkande, vilket antyder en förmåga att ta beslutsamma steg samtidigt som komplexa systemiska påverkningar förstås."
    },
    turquoise: {
      en: "This combination merges personal power with participatory awareness, suggesting an ability to take bold action while recognizing embeddedness within nested systems and multi-scale impacts.",
      sv: "Denna kombination förenar personlig makt med deltagande medvetenhet, vilket antyder en förmåga att ta modig handling samtidigt som inneslutning inom kapslade system och påverkan på flera skalor erkänns."
    },
    coral: {
      en: "This combination integrates assertive power with sovereign creativity, suggesting a capacity for bold expression while pioneering evolutionary possibilities.",
      sv: "Denna kombination integrerar självsäker makt med suverän kreativitet, vilket antyder en förmåga för djärvt uttryck samtidigt som evolutionära möjligheter pionjäras."
    },
    ultraviolet: {
      en: "This combination blends personal power with infinite flow, suggesting an ability to act decisively while remaining open to boundless possibility.",
      sv: "Denna kombination blandar personlig makt med oändligt flöde, vilket antyder en förmåga att agera beslutsamt samtidigt som öppenhet för gränslös möjlighet bibehålls."
    }
  },
  blue: {
    orange: {
      en: "This combination balances principled structure with strategic achievement, indicating a capacity for pursuing goals through both disciplined order and innovative effectiveness.",
      sv: "Denna kombination balanserar principfast struktur med strategisk prestation, vilket indikerar en förmåga att eftersträva mål genom både disciplinerad ordning och innovativ effektivitet."
    },
    green: {
      en: "This combination merges structured order with social harmony, suggesting an ability to maintain principles while fostering inclusive community.",
      sv: "Denna kombination förenar strukturerad ordning med social harmoni, vilket antyder en förmåga att upprätthålla principer samtidigt som inkluderande gemenskap främjas."
    },
    yellow: {
      en: "This combination integrates principled discipline with systems awareness, indicating a capacity for structured thinking that adapts to complex contexts.",
      sv: "Denna kombination integrerar principfast disciplin med systemmedvetenhet, vilket indikerar en förmåga för strukturerat tänkande som anpassar sig till komplexa sammanhang."
    },
    turquoise: {
      en: "This combination merges structured order with meta-systemic understanding, suggesting an ability to create disciplined frameworks that serve multi-generational wellbeing and enable adaptive emergence.",
      sv: "Denna kombination förenar strukturerad ordning med meta-systemisk förståelse, vilket antyder en förmåga att skapa disciplinerade ramverk som tjänar flerlagergenerationellt välbefinnande och möjliggör adaptiv framväxt."
    },
    coral: {
      en: "This combination integrates principled structure with sovereign creativity, suggesting a capacity to honor order while pioneering evolutionary innovation.",
      sv: "Denna kombination integrerar principfast struktur med suverän kreativitet, vilket antyder en förmåga att hedra ordning samtidigt som evolutionär innovation pionjäras."
    },
    ultraviolet: {
      en: "This combination blends structured discipline with infinite flow, suggesting an ability to maintain principled action while remaining open to boundless possibility.",
      sv: "Denna kombination blandar strukturerad disciplin med oändligt flöde, vilket antyder en förmåga att upprätthålla principfast handling samtidigt som öppenhet för gränslös möjlighet bibehålls."
    }
  },
  orange: {
    green: {
      en: "This combination balances achievement orientation with social consciousness, suggesting an approach to success that considers both effectiveness and human impact. You likely excel at creating sustainable solutions that benefit both individuals and communities.",
      sv: "Denna kombination förenar prestationsorientering med social medvetenhet, vilket antyder ett förhållningssätt till framgång som beaktar både effektivitet och mänsklig påverkan. Du är troligen skicklig på att skapa hållbara lösningar som gynnar både individer och samhällen."
    },
    yellow: {
      en: "This combination merges strategic thinking with systems awareness, indicating a capacity for innovative solutions that address complex challenges while maintaining practical effectiveness.",
      sv: "Denna kombination förenar strategiskt tänkande med systemmedvetenhet, vilket indikerar en förmåga till innovativa lösningar som hanterar komplexa utmaningar medan praktisk effektivitet bibehålls."
    },
    turquoise: {
      en: "This combination integrates strategic effectiveness with meta-systemic awareness, suggesting an ability to create innovations that deliver measurable results while serving multi-generational wellbeing and operating within planetary boundaries.",
      sv: "Denna kombination integrerar strategisk effektivitet med meta-systemisk medvetenhet, vilket antyder en förmåga att skapa innovationer som levererar mätbara resultat samtidigt som de tjänar flerlagergenerationellt välbefinnande och opererar inom planetära gränser."
    },
    coral: {
      en: "This combination integrates strategic achievement with sovereign unity consciousness, suggesting an ability to manifest innovative breakthroughs while maintaining cosmic awareness. You likely excel at bringing visionary possibilities into practical reality.",
      sv: "Denna kombination integrerar strategisk prestation med suveränt enhetsmedvetande, vilket antyder en förmåga att manifestera innovativa genombrott medan kosmisk medvetenhet bibehålls. Du är troligen skicklig på att föra visionära möjligheter in i praktisk verklighet."
    },
    ultraviolet: {
      en: "This combination integrates strategic achievement with infinite flow consciousness, suggesting an ability to pursue goals while remaining open to boundless possibility. You likely experience success as a natural expression of infinite potential.",
      sv: "Denna kombination integrerar strategisk prestation med oändligt flödesmedvetande, vilket antyder en förmåga att eftersträva mål medan öppenhet för gränslös möjlighet bibehålls. Du upplever troligen framgång som ett naturligt uttryck av oändlig potential."
    }
  },
  green: {
    yellow: {
      en: "This combination suggests a holistic approach to human development, combining deep empathy with systems understanding. You likely excel at facilitating growth and change while maintaining awareness of both individual and collective needs.",
      sv: "Denna kombination antyder ett holistiskt förhållningssätt till mänsklig utveckling, som kombinerar djup empati med systemförståelse. Du är troligen skicklig på att facilitera tillväxt och förändring medan du bibehåller medvetenhet om både individuella och kollektiva behov."
    },
    turquoise: {
      en: "This combination integrates social consciousness with participatory systems awareness, indicating a deep understanding of both human relationships and nested living systems. You likely see connections between social justice and ecological wellbeing across multiple scales.",
      sv: "Denna kombination integrerar socialt medvetande med deltagande systemmedvetenhet, vilket indikerar en djup förståelse för både mänskliga relationer och kapslade levande system. Du ser troligen kopplingar mellan social rättvisa och ekologiskt välbefinnande över flera skalor."
    },
    coral: {
      en: "This combination unites social consciousness with sovereign unity, suggesting a deep capacity for fostering collective evolution while honoring individual creativity. You likely pioneer new forms of community that support both personal sovereignty and universal connection.",
      sv: "Denna kombination förenar socialt medvetande med suverän enhet, vilket antyder en djup förmåga att främja kollektiv evolution medan individuell kreativitet hedras. Du är troligen pionjär för nya former av gemenskap som stödjer både personlig suveränitet och universell koppling."
    },
    ultraviolet: {
      en: "This combination merges social consciousness with infinite flow, suggesting an ability to experience community as an expression of boundless unity. You likely perceive human connection through the lens of infinite possibility and potential.",
      sv: "Denna kombination förenar socialt medvetande med oändligt flöde, vilket antyder en förmåga att uppleva gemenskap som ett uttryck för gränslös enhet. Du uppfattar troligen mänsklig koppling genom linsen av oändlig möjlighet och potential."
    }
  },
  yellow: {
    turquoise: {
      en: "This combination merges systems thinking with meta-systemic awareness, suggesting an ability to shift from analyzing complexity to participating within it. You likely excel at cultivating conditions for emergence while maintaining analytical rigor and functional coherence.",
      sv: "Denna kombination förenar systemtänkande med meta-systemisk medvetenhet, vilket antyder en förmåga att skifta från att analysera komplexitet till att delta inom den. Du är troligen skicklig på att odla förutsättningar för framväxt samtidigt som analytisk stringens och funktionell koherens bibehålls."
    },
    coral: {
      en: "This combination merges systems thinking with sovereign unity consciousness, suggesting an ability to understand complex patterns while pioneering new evolutionary possibilities. You likely integrate systemic awareness with creative breakthroughs in consciousness.",
      sv: "Denna kombination förenar systemtänkande med suveränt enhetsmedvetande, vilket antyder en förmåga att förstå komplexa mönster medan du är pionjär för nya evolutionära möjligheter. Du integrerar troligen systemisk medvetenhet med kreativa genombrott i medvetandet."
    },
    ultraviolet: {
      en: "This combination unites systems thinking with infinite flow consciousness, suggesting an ability to perceive complex patterns as expressions of boundless creativity. You likely experience systemic understanding through the lens of infinite possibility.",
      sv: "Denna kombination förenar systemtänkande med oändligt flödesmedvetande, vilket antyder en förmåga att uppfatta komplexa mönster som uttryck för gränslös kreativitet. Du upplever troligen systemisk förståelse genom linsen av oändlig möjlighet."
    }
  },
  turquoise: {
    coral: {
      en: "This combination integrates participatory systems awareness with sovereign creativity, suggesting a profound ability to facilitate emergence within nested living systems while honoring unique creative expression. You likely pioneer regenerative paradigms that serve multi-generational evolution.",
      sv: "Denna kombination integrerar deltagande systemmedvetenhet med suverän kreativitet, vilket antyder en djupgående förmåga att facilitera framväxt inom kapslade levande system samtidigt som unikt kreativt uttryck hedras. Du är troligen pionjär för regenerativa paradigmer som tjänar flerlagergenerationell evolution."
    },
    ultraviolet: {
      en: "This combination merges meta-systemic coordination with infinite flow, suggesting a profound ability to cultivate conditions for planetary-scale transformation while remaining open to boundless possibility. You likely experience nested systems as expressions of infinite creative potential.",
      sv: "Denna kombination förenar meta-systemisk koordinering med oändligt flöde, vilket antyder en djupgående förmåga att odla förutsättningar för planetär-skala transformation samtidigt som öppenhet för gränslös möjlighet bibehålls. Du upplever troligen kapslade system som uttryck för oändlig kreativ potential."
    }
  },
  coral: {
    ultraviolet: {
      en: "This combination integrates sovereign co-creation with infinite flow, suggesting a unique capacity to pioneer new paradigms while remaining completely open to infinite possibility. You likely navigate between structured innovation and boundless potential with remarkable fluidity.",
      sv: "Denna kombination integrerar suverän samskapelse med oändligt flöde, vilket antyder en unik förmåga att vara pionjär för nya paradigm medan en fullständig öppenhet för oändlig möjlighet bibehålls. Du navigerar troligen mellan strukturerad innovation och gränslös potential med anmärkningsvärd fluiditet."
    }
  }
};

export function getCombinationExplanation(dominant: string, secondary: string, language: 'en' | 'sv'): string {
  // Log for debugging
  console.log('Looking for combination:', dominant, secondary);
  
  // First check if the direct combination exists
  const directCombination = stageCombinations[dominant]?.[secondary];
  if (directCombination) {
    console.log('Found direct combination');
    return directCombination[language];
  }
  
  // If not found, check the reverse combination
  const reverseCombination = stageCombinations[secondary]?.[dominant];
  if (reverseCombination) {
    console.log('Found reverse combination');
    return reverseCombination[language];
  }
  
  // If no specific combination exists, log and return generic explanation
  console.log('No combination found, using generic');
  return language === 'en'
    ? `Your combination of ${dominant} and ${secondary} suggests a unique perspective that combines multiple value systems.`
    : `Din kombination av ${dominant} och ${secondary} antyder ett unikt perspektiv som kombinerar flera värdesystem.`;
}
