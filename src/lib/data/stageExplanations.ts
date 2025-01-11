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
      en: "Your center of gravity in Coral indicates a unique balance of sovereign individuality and universal connection. You likely excel at pioneering new paradigms while maintaining deep resonance with universal consciousness, bringing together personal creative expression with collective evolution.",
      sv: "Ditt gravitationscentrum i Korall indikerar en unik balans mellan suverän individualitet och universell koppling. Du är troligen skicklig på att pionjära nya paradigm medan du bibehåller djup resonans med universellt medvetande, och förenar personligt kreativt uttryck med kollektiv evolution."
    },
    secondary: {
      en: "Having Coral as a secondary influence suggests you maintain the ability to pioneer new possibilities and integrate personal sovereignty with universal awareness while operating from other value systems.",
      sv: "Att ha Korall som sekundärt inflytande antyder att du upprätthåller förmågan att pionjära nya möjligheter och integrera personlig suveränitet med universell medvetenhet medan du opererar från andra värdesystem."
    }
  },
  ultraviolet: {
    dominant: {
      en: "Your center of gravity in Ultraviolet reflects a complete dissolution into infinite flow and co-creation. You likely experience reality as a seamless dance of infinite possibilities, where boundaries between self and other, form and formlessness, naturally dissolve into dynamic creative expression.",
      sv: "Ditt gravitationscentrum i Ultraviolett återspeglar en fullständig upplösning i oändligt flöde och medskapande. Du upplever troligen verkligheten som en sömlös dans av oändliga möjligheter, där gränser mellan själv och andra, form och formlöshet, naturligt upplöses i dynamiskt kreativt uttryck."
    },
    secondary: {
      en: "Having Ultraviolet as a secondary influence suggests you maintain access to infinite awareness and boundless flow while engaging with more structured value systems.",
      sv: "Att ha Ultraviolett som sekundärt inflytande antyder att du upprätthåller tillgång till oändlig medvetenhet och gränslöst flöde medan du engagerar dig i mer strukturerade värdesystem."
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
      en: "This combination merges survival awareness with sovereign unity consciousness, suggesting an ability to ground cosmic understanding in the most basic aspects of existence. You likely bridge primal life forces with pioneering visions of new evolutionary possibilities.",
      sv: "Denna kombination förenar överlevnadsmedvetenhet med suveränt enhetsmedvetande, vilket antyder en förmåga att jorda kosmisk förståelse i existensens mest grundläggande aspekter. Du överbryggar troligen ursprungliga livskrafter med banbrytande visioner av nya evolutionära möjligheter."
    },
    ultraviolet: {
      en: "This combination unites survival awareness with infinite flow consciousness, suggesting an ability to experience the most basic life forces as expressions of boundless potential. You likely maintain deep presence in physical reality while accessing infinite awareness.",
      sv: "Denna kombination förenar överlevnadsmedvetenhet med oändligt flödesmedvetande, vilket antyder en förmåga att uppleva de mest grundläggande livskrafterna som uttryck för gränslös potential. Du bibehåller troligen djup närvaro i fysisk verklighet medan oändlig medvetenhet nås."
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
      en: "This combination integrates tribal wisdom with sovereign unity, suggesting an ability to honor ancestral knowledge while pioneering new paradigms of collective consciousness. You likely weave traditional practices into innovative expressions of universal potential.",
      sv: "Denna kombination integrerar stamvisdom med suverän enhet, vilket antyder en förmåga att hedra förfäders kunskap medan nya paradigmer av kollektivt medvetande växer fram. Du väver troligen traditionella praktiker in i innovativa uttryck av universell potential."
    },
    ultraviolet: {
      en: "This combination integrates tribal wisdom with infinite flow, suggesting an ability to experience collective traditions as expressions of boundless creativity. You likely perceive ancestral knowledge through the lens of infinite possibility.",
      sv: "Denna kombination integrerar stamvisdom med oändligt flöde, vilket antyder en förmåga att uppleva kollektiva traditioner som uttryck för gränslös kreativitet. Du uppfattar troligen förfäders kunskap genom linsen av oändlig möjlighet."
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
      en: "This combination unites personal power with sovereign unity awareness, suggesting an ability to channel strong individual energy into pioneering evolutionary breakthroughs. You likely express bold creativity while maintaining deep resonance with universal wisdom.",
      sv: "Denna kombination förenar personlig kraft med suveränt enhetsmedvetande, vilket antyder en förmåga att kanalisera stark individuell energi in i banbrytande evolutionära genombrott. Du uttrycker troligen djärv kreativitet medan djup resonans med universell visdom bibehålls."
    },
    ultraviolet: {
      en: "This combination merges personal power with infinite flow consciousness, suggesting an ability to channel individual energy as an expression of boundless potential. You likely experience personal action as a dance of infinite creative force.",
      sv: "Denna kombination förenar personlig kraft med oändligt flödesmedvetande, vilket antyder en förmåga att kanalisera individuell energi som ett uttryck för gränslös potential. Du upplever troligen personlig handling som en dans av oändlig kreativ kraft."
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
      en: "This combination merges principled structure with sovereign unity, suggesting an ability to create ethical frameworks that support evolutionary emergence. You likely pioneer new paradigms while maintaining respect for foundational order.",
      sv: "Denna kombination förenar principfast struktur med suverän enhet, vilket antyder en förmåga att skapa etiska ramverk som stödjer evolutionär framväxt. Du är troligen pionjär för nya paradigmer medan respekt för grundläggande ordning bibehålls."
    },
    ultraviolet: {
      en: "This combination unites structured principles with infinite flow, suggesting an ability to perceive order as a dynamic expression of boundless possibility. You likely experience ethical frameworks as fluid manifestations of infinite wisdom.",
      sv: "Denna kombination förenar strukturerade principer med oändligt flöde, vilket antyder en förmåga att uppfatta ordning som ett dynamiskt uttryck av gränslös möjlighet. Du upplever troligen etiska ramverk som flytande manifestationer av oändlig visdom."
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
      en: "This combination integrates social consciousness with global awareness, indicating a deep understanding of both human relationships and planetary systems. You likely see the interconnections between social justice and ecological wellbeing.",
      sv: "Denna kombination integrerar socialt medvetande med global medvetenhet, vilket indikerar en djup förståelse för både mänskliga relationer och planetära system. Du ser troligen sammankopplingarna mellan social rättvisa och ekologiskt välbefinnande."
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
      en: "This combination merges systems thinking with holistic awareness, suggesting an ability to navigate complex challenges while maintaining connection to the larger whole. You likely excel at finding innovative solutions that serve both immediate needs and long-term evolution.",
      sv: "Denna kombination förenar systemtänkande med holistisk medvetenhet, vilket antyder en förmåga att navigera komplexa utmaningar medan kopplingen till den större helheten bibehålls. Du är troligen skicklig på att hitta innovativa lösningar som tjänar både omedelbara behov och långsiktig evolution."
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
      en: "This combination integrates holistic awareness with sovereign unity, suggesting a profound ability to unite global consciousness with individual creative expression. You likely pioneer new paradigms that serve both planetary evolution and universal emergence.",
      sv: "Denna kombination integrerar holistisk medvetenhet med suverän enhet, vilket antyder en djupgående förmåga att förena globalt medvetande med individuellt kreativt uttryck. Du är troligen pionjär för nya paradigmer som tjänar både planetär evolution och universell framväxt."
    },
    ultraviolet: {
      en: "This combination merges holistic planetary awareness with infinite flow, suggesting a profound ability to unite universal patterns with boundless creative potential. You likely experience reality as a dynamic interplay between manifest wholeness and infinite possibility.",
      sv: "Denna kombination förenar holistisk planetär medvetenhet med oändligt flöde, vilket antyder en djupgående förmåga att förena universella mönster med gränslös kreativ potential. Du upplever troligen verkligheten som ett dynamiskt samspel mellan manifest helhet och oändlig möjlighet."
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
