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
      en: "Your center of gravity in Turquoise reflects a holistic worldview and deep connection to global systems. You likely value unity and see the interconnectedness of all life.",
      sv: "Ditt gravitationscentrum i Turkos återspeglar en holistisk världsbild och djup koppling till globala system. Du värdesätter troligen enhet och ser sammankopplingen av allt liv."
    },
    secondary: {
      en: "Having Turquoise as a secondary influence suggests you maintain holistic awareness while engaging with other value systems.",
      sv: "Att ha Turkos som sekundärt inflytande antyder att du upprätthåller holistisk medvetenhet samtidigt som du engagerar dig i andra värdesystem."
    }
  },
  coral: {
    dominant: {
      en: "Your center of gravity in Coral indicates a transcendent perspective and unity consciousness. You likely value being over doing and experience deep interconnectedness.",
      sv: "Ditt gravitationscentrum i Korall indikerar ett transcendent perspektiv och enhetsmedvetande. Du värdesätter troligen varande över görande och upplever djup sammankoppling."
    },
    secondary: {
      en: "Having Coral as a secondary influence suggests you maintain transcendent awareness while engaging with other value systems.",
      sv: "Att ha Korall som sekundärt inflytande antyder att du upprätthåller transcendent medvetenhet samtidigt som du engagerar dig i andra värdesystem."
    }
  }
};

export const stageCombinations: StageCombinations = {
  beige: {
    purple: {
      en: "This combination merges survival awareness with communal wisdom, suggesting an ability to address basic needs through collective support and ancestral knowledge. You likely excel at building secure environments while maintaining strong group bonds and traditional practices.",
      sv: "Denna kombination förenar överlevnadsmedvetenhet med kommunal visdom, vilket antyder en förmåga att hantera grundläggande behov genom kollektivt stöd och förfäders kunskap. Du är troligen skicklig på att bygga trygga miljöer medan starka gruppband och traditionella praktiker upprätthålls."
    },
    red: {
      en: "This combination unites survival instincts with assertive action, suggesting a powerful ability to secure resources and protect vital interests. You likely excel at taking decisive action to ensure basic needs are met while maintaining personal autonomy and strength.",
      sv: "Denna kombination förenar överlevnadsinstinkter med självsäkert handlande, vilket antyder en kraftfull förmåga att säkra resurser och skydda vitala intressen. Du är troligen skicklig på att ta avgörande beslut för att säkerställa att grundläggande behov möts medan personlig autonomi och styrka bibehålls."
    },
    blue: {
      en: "This combination connects survival awareness with structured principles, suggesting an ability to create stable and secure environments through systematic approaches. You likely excel at establishing practical systems that ensure basic needs are consistently met.",
      sv: "Denna kombination förenar överlevnadsmedvetenhet med strukturerade principer, vilket antyder en förmåga att skapa stabila och säkra miljöer genom systematiska tillvägagångssätt. Du är troligen skicklig på att etablera praktiska system som säkerställer att grundläggande behov konsekvent uppfylls."
    },
    orange: {
      en: "This combination merges survival instincts with strategic thinking, indicating a practical approach to achievement and resource management. You likely excel at finding efficient solutions to fundamental challenges while maximizing available resources.",
      sv: "Denna kombination förenar överlevnadsinstinkter med strategiskt tänkande, vilket indikerar ett praktiskt förhållningssätt till prestation och resurshantering. Du är troligen skicklig på att hitta effektiva lösningar på grundläggande utmaningar medan tillgängliga resurser maximeras."
    },
    green: {
      en: "This combination unites basic survival awareness with social consciousness, suggesting an ability to address fundamental needs through community-oriented solutions. You likely understand how collective support enhances individual survival and wellbeing.",
      sv: "Denna kombination förenar grundläggande överlevnadsmedvetenhet med socialt medvetande, vilket antyder en förmåga att hantera grundläggande behov genom gemenskapsorienterade lösningar. Du förstår troligen hur kollektivt stöd förbättrar individuell överlevnad och välbefinnande."
    },
    yellow: {
      en: "This combination integrates survival intelligence with systems thinking, indicating an ability to understand and address fundamental needs within larger systemic contexts. You likely excel at creating adaptive solutions that ensure basic security while considering complex interconnections.",
      sv: "Denna kombination integrerar överlevnadsintelligens med systemtänkande, vilket indikerar en förmåga att förstå och hantera grundläggande behov inom större systemiska sammanhang. Du är troligen skicklig på att skapa adaptiva lösningar som säkerställer grundläggande säkerhet medan komplexa samband beaktas."
    },
    turquoise: {
      en: "This combination connects basic survival awareness with holistic consciousness, suggesting an understanding of how fundamental needs relate to global systems and universal patterns. You likely see the deep connection between individual survival and planetary wellbeing.",
      sv: "Denna kombination förenar grundläggande överlevnadsmedvetenhet med holistiskt medvetande, vilket antyder en förståelse för hur grundläggande behov relaterar till globala system och universella mönster. Du ser troligen den djupa kopplingen mellan individuell överlevnad och planetärt välbefinnande."
    },
    coral: {
      en: "This combination merges survival consciousness with transcendent awareness, indicating an ability to maintain practical groundedness while accessing deeper universal insights. You likely understand how basic existence connects to the larger fabric of consciousness.",
      sv: "Denna kombination förenar överlevnadsmedvetande med transcendent medvetenhet, vilket indikerar en förmåga att bibehålla praktisk jordning medan djupare universella insikter nås. Du förstår troligen hur grundläggande existens kopplar till det större medvetandets väv."
    }
  },
  purple: {
    red: {
      en: "This combination merges tribal bonding with individual power expression, suggesting an ability to maintain strong group connections while asserting personal strength. You likely understand the dynamics of both group loyalty and individual leadership, often serving as a bridge between collective traditions and bold individual action.",
      sv: "Denna kombination förenar stamgemenskap med individuellt kraftuttryck, vilket antyder en förmåga att upprätthålla starka gruppkopplingar medan personlig styrka hävdas. Du förstår troligen dynamiken i både grupplojalitet och individuellt ledarskap, och fungerar ofta som en bro mellan kollektiva traditioner och djärv individuell handling."
    },
    blue: {
      en: "This combination integrates ancestral wisdom with moral structure, suggesting a deep respect for both traditional knowledge and principled order. You likely excel at maintaining cultural continuity while establishing clear ethical frameworks and organizational systems.",
      sv: "Denna kombination integrerar förfäders visdom med moralisk struktur, vilket antyder en djup respekt för både traditionell kunskap och principiell ordning. Du är troligen skicklig på att upprätthålla kulturell kontinuitet medan tydliga etiska ramverk och organisatoriska system etableras."
    },
    orange: {
      en: "This combination blends traditional wisdom with strategic achievement, suggesting an ability to leverage cultural knowledge for practical success. You likely excel at bridging ancestral practices with modern innovation.",
      sv: "Denna kombination blandar traditionell visdom med strategisk prestation, vilket antyder en förmåga att utnyttja kulturell kunskap för praktisk framgång. Du är troligen skicklig på att överbrygga förfäders praktiker med modern innovation."
    },
    green: {
      en: "This combination brings together traditional community values with modern inclusive thinking, suggesting an ability to honor ancestral wisdom while embracing diversity and equality. You likely excel at maintaining cultural heritage while fostering open, accepting communal spaces that welcome all voices.",
      sv: "Denna kombination för samman traditionella gemenskapsvärderingar med modernt inkluderande tänkande, vilket antyder en förmåga att hedra förfäders visdom medan mångfald och jämlikhet omfamnas. Du är troligen skicklig på att bevara kulturarv medan öppna, accepterande gemenskapsutrymmen som välkomnar alla röster främjas."
    },
    yellow: {
      en: "This combination unites tribal wisdom with systems thinking, indicating an ability to see traditional knowledge within larger systemic frameworks. You likely understand how ancestral practices fit into complex adaptive systems.",
      sv: "Denna kombination förenar stamvisdom med systemtänkande, vilket indikerar en förmåga att se traditionell kunskap inom större systemiska ramverk. Du förstår troligen hur förfäders praktiker passar in i komplexa adaptiva system."
    },
    turquoise: {
      en: "This unique combination bridges ancient wisdom with holistic awareness, suggesting an ability to honor traditional knowledge while seeing its place in larger planetary systems. You likely bring together ancestral understanding with contemporary global awareness.",
      sv: "Denna unika kombination överbryggar uråldrig visdom med holistisk medvetenhet, vilket antyder en förmåga att hedra traditionell kunskap medan dess plats i större planetära system erkänns. Du för troligen samman förfäders förståelse med samtida global medvetenhet."
    },
    coral: {
      en: "This combination integrates communal traditions with transcendent awareness, suggesting a deep understanding of how collective wisdom connects to universal consciousness. You likely bridge ancient spiritual practices with direct existential experience.",
      sv: "Denna kombination integrerar kommunala traditioner med transcendent medvetenhet, vilket antyder en djup förståelse för hur kollektiv visdom kopplar till universellt medvetande. Du överbryggar troligen gamla andliga praktiker med direkt existentiell upplevelse."
    }
  },
  red: {
    blue: {
      en: "This combination unites assertive power with moral structure, indicating an ability to channel strong willpower through established principles and order. You likely excel at decisive action within ethical frameworks, bringing together leadership strength with a sense of purpose and duty.",
      sv: "Denna kombination förenar kraftfullt självuttryck med moralisk struktur, vilket indikerar en förmåga att kanalisera stark viljekraft genom etablerade principer och ordning. Du är troligen skicklig på beslutsamt handlande inom etiska ramar, och förenar ledarskapsstryka med en känsla av syfte och plikt."
    },
    orange: {
      en: "This combination merges assertive action with strategic thinking, indicating a powerful drive for achievement combined with tactical awareness. You likely excel at decisive leadership while maintaining focus on practical outcomes.",
      sv: "Denna kombination förenar kraftfull handling med strategiskt tänkande, vilket indikerar en stark drivkraft för prestation kombinerad med taktisk medvetenhet. Du är troligen skicklig på beslutsamt ledarskap medan fokus på praktiska resultat bibehålls."
    },
    green: {
      en: "This combination merges assertive power with social consciousness, suggesting an ability to channel strong leadership toward community benefit. You likely excel at initiating positive change while considering collective wellbeing.",
      sv: "Denna kombination förenar självhävdande kraft med socialt medvetande, vilket antyder en förmåga att kanalisera starkt ledarskap mot samhällsnytta. Du är troligen skicklig på att initiera positiv förändring medan kollektivt välbefinnande beaktas."
    },
    yellow: {
      en: "This dynamic combination merges assertive power with systems thinking, indicating an ability to take bold action while understanding complex interconnections. You likely bring together decisive leadership with nuanced strategic awareness.",
      sv: "Denna dynamiska kombination förenar kraftfull makt med systemtänkande, vilket indikerar en förmåga att ta djärva beslut medan komplexa sammankopplingar förstås. Du för troligen samman beslutsamt ledarskap med nyanserad strategisk medvetenhet."
    },
    turquoise: {
      en: "This combination unites personal power with holistic awareness, indicating an ability to express individual strength while maintaining connection to global systems. You likely understand how personal action affects the larger whole.",
      sv: "Denna kombination förenar personlig kraft med holistisk medvetenhet, vilket indikerar en förmåga att uttrycka individuell styrka medan koppling till globala system bibehålls. Du förstår troligen hur personlig handling påverkar den större helheten."
    },
    coral: {
      en: "This combination integrates assertive power with transcendent awareness, suggesting an ability to express strong will while maintaining higher consciousness. You likely channel personal power through universal wisdom.",
      sv: "Denna kombination integrerar självhävdande kraft med transcendent medvetenhet, vilket antyder en förmåga att uttrycka stark vilja medan högre medvetande bibehålls. Du kanaliserar troligen personlig kraft genom universell visdom."
    }
  },
  blue: {
    orange: {
      en: "This combination brings together principle-based thinking with strategic action, suggesting an ability to achieve goals while maintaining strong ethical standards. You likely excel at creating structured approaches to innovation and progress.",
      sv: "Denna kombination förenar principbaserat tänkande med strategisk handling, vilket antyder en förmåga att uppnå mål medan starka etiska standarder upprätthålls. Du är troligen skicklig på att skapa strukturerade tillvägagångssätt för innovation och framsteg."
    },
    green: {
      en: "This combination merges moral principles with social awareness, indicating a strong commitment to both ethical standards and inclusive community values. You likely excel at creating structured approaches to social justice and community building.",
      sv: "Denna kombination förenar moraliska principer med social medvetenhet, vilket indikerar ett starkt engagemang för både etiska standarder och inkluderande gemenskapsvärderingar. Du är troligen skicklig på att skapa strukturerade tillvägagångssätt för social rättvisa och gemenskapsbyggande."
    },
    yellow: {
      en: "This combination connects moral structure with systems thinking, suggesting an ability to apply ethical principles within complex adaptive frameworks. You likely excel at creating principled approaches to systemic challenges.",
      sv: "Denna kombination förenar moralisk struktur med systemtänkande, vilket antyder en förmåga att tillämpa etiska principer inom komplexa adaptiva ramverk. Du är troligen skicklig på att skapa principfasta tillvägagångssätt för systemiska utmaningar."
    },
    turquoise: {
      en: "This combination unites moral principles with holistic awareness, indicating an ability to see ethical frameworks within planetary systems. You likely understand how individual values connect to universal patterns.",
      sv: "Denna kombination förenar moraliska principer med holistisk medvetenhet, vilket indikerar en förmåga att se etiska ramverk inom planetära system. Du förstår troligen hur individuella värderingar kopplar till universella mönster."
    },
    coral: {
      en: "This combination merges structured principles with transcendent awareness, suggesting an ability to ground spiritual insights in practical ethics. You likely bridge moral frameworks with universal consciousness.",
      sv: "Denna kombination förenar strukturerade principer med transcendent medvetenhet, vilket antyder en förmåga att jorda andliga insikter i praktisk etik. Du överbryggar troligen moraliska ramverk med universellt medvetande."
    }
  },
  orange: {
    green: {
      en: "This combination brings together achievement-orientation with social awareness, suggesting an approach to success that considers both effectiveness and human impact. You likely excel at creating sustainable solutions that benefit both individuals and communities.",
      sv: "Denna kombination förenar prestationsorientering med social medvetenhet, vilket antyder ett förhållningssätt till framgång som beaktar både effektivitet och mänsklig påverkan. Du är troligen skicklig på att skapa hållbara lösningar som gynnar både individer och samhällen."
    },
    yellow: {
      en: "This combination merges strategic thinking with systems awareness, indicating a capacity for innovative solutions that address complex challenges while maintaining practical effectiveness.",
      sv: "Denna kombination förenar strategiskt tänkande med systemmedvetenhet, vilket indikerar en förmåga till innovativa lösningar som hanterar komplexa utmaningar medan praktisk effektivitet bibehålls."
    },
    turquoise: {
      en: "This combination integrates strategic achievement with holistic awareness, suggesting an ability to pursue success while maintaining a deep connection to global systems. You likely excel at creating innovative solutions that serve both practical objectives and planetary wellbeing.",
      sv: "Denna kombination integrerar strategisk prestation med holistisk medvetenhet, vilket antyder en förmåga att sträva efter framgång medan en djup koppling till globala system bibehålls. Du är troligen skicklig på att skapa innovativa lösningar som tjänar både praktiska mål och planetärt välbefinnande."
    },
    coral: {
      en: "This combination integrates strategic achievement with transcendent awareness, suggesting an ability to pursue success while maintaining higher consciousness. You likely excel at bringing practical effectiveness to spiritual insights.",
      sv: "Denna kombination integrerar strategisk prestation med transcendent medvetenhet, vilket antyder en förmåga att sträva efter framgång medan högre medvetande bibehålls. Du är troligen skicklig på att föra praktisk effektivitet till andliga insikter."
    }
  },
  green: {
    yellow: {
      en: "This combination suggests a holistic approach to human development, combining deep empathy with systems understanding. You likely excel at facilitating growth and change while maintaining awareness of both individual and collective needs.",
      sv: "Denna kombination antyder ett holistiskt förhållningssätt till mänsklig utveckling, som kombinerar djup empati med systemförståelse. Du är troligen skicklig på att facilitera tillväxt och förändring medan du bibehåller medvetenhet om både individuella och kollektiva behov."
    },
    turquoise: {
      en: "This combination integrates social consciousness with global awareness, indicating a deep understanding of both human relationships and planetary systems. You likely see the interconnections between social justice and ecological wellbeing.",
      sv: "Denna kombination integrerar socialt medvetande med global medvetenhet, vilket indikerar en djup förståelse för både mänskliga relationer och planetära system. Du ser troligen sammankopplingarna mellan social rättvisa och ekologiskt välbefinnande."
    },
    coral: {
      en: "This combination unites social consciousness with transcendent awareness, suggesting a deep capacity for both human connection and universal understanding. You likely bring together communal harmony with profound spiritual insights, fostering both individual and collective awakening.",
      sv: "Denna kombination förenar socialt medvetande med transcendent medvetenhet, vilket antyder en djup kapacitet för både mänsklig kontakt och universell förståelse. Du för troligen samman kommunal harmoni med djupa andliga insikter, och främjar både individuellt och kollektivt uppvaknande."
    }
  },
  yellow: {
    turquoise: {
      en: "This combination merges systems thinking with holistic awareness, suggesting an ability to navigate complex challenges while maintaining connection to the larger whole. You likely excel at finding innovative solutions that serve both immediate needs and long-term evolution.",
      sv: "Denna kombination förenar systemtänkande med holistisk medvetenhet, vilket antyder en förmåga att navigera komplexa utmaningar medan kopplingen till den större helheten bibehålls. Du är troligen skicklig på att hitta innovativa lösningar som tjänar både omedelbara behov och långsiktig evolution."
    },
    coral: {
      en: "This combination unites systems thinking with transcendent awareness, suggesting a unique ability to understand complex patterns while maintaining a state of deep presence. You likely can navigate intricate challenges with both analytical precision and intuitive wisdom, seeing both the detailed mechanics and the unified whole simultaneously.",
      sv: "Denna kombination förenar systemtänkande med transcendent medvetenhet, vilket antyder en unik förmåga att förstå komplexa mönster medan ett tillstånd av djup närvaro bibehålls. Du kan troligen navigera invecklade utmaningar med både analytisk precision och intuitiv visdom, och se både de detaljerade mekanismerna och den enade helheten samtidigt."
    }
  },
  turquoise: {
    coral: {
      en: "This combination integrates global consciousness with transcendent awareness, suggesting a deep understanding of both planetary systems and universal consciousness. You likely perceive the subtle interconnections between all aspects of existence while maintaining practical engagement with global challenges.",
      sv: "Denna kombination integrerar globalt medvetande med transcendent medvetenhet, vilket antyder en djup förståelse för både planetära system och universellt medvetande. Du uppfattar troligen de subtila sammankopplingarna mellan alla aspekter av existensen medan praktiskt engagemang i globala utmaningar bibehålls."
    }
  },
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
