// src/lib/data/stageInteractions.ts
import type { Translation } from '../types/spiral';

// Define interfaces for the data structures
interface StageCharacteristic {
  worldview: string;
  values: string;
  communication: string;
  leadership: string;
  challenges: string;
}

interface StageCharacteristics {
  [stage: string]: {
    en: StageCharacteristic;
    sv: StageCharacteristic;
  };
}

interface StageInteractions {
  [key: string]: Translation;
}

// Stage characteristics data
export const stageCharacteristics: StageCharacteristics = {
  "beige": {
    en: {
      worldview: "Survival-oriented, focused on immediate needs",
      values: "Physical survival, safety, sustenance",
      communication: "Basic, primarily focused on survival needs",
      leadership: "Minimal, based on who can provide immediate support",
      challenges: "Scarcity, physical threats, lack of resources"
    },
    sv: {
      worldview: "Överlevnadsorienterad, fokuserad på omedelbara behov",
      values: "Fysisk överlevnad, säkerhet, försörjning",
      communication: "Grundläggande, främst fokuserad på överlevnadsbehov",
      leadership: "Minimal, baserad på vem som kan ge omedelbart stöd",
      challenges: "Brist, fysiska hot, resursbrist"
    }
  },
  "purple": {
    en: {
      worldview: "Magical, animistic, tribal",
      values: "Tradition, ritual, kinship bonds, ancestors",
      communication: "Stories, symbols, rituals, oral traditions",
      leadership: "Elders, shamans, those who maintain tribal traditions",
      challenges: "Threats to tribe, breaking taboos, disrespecting traditions"
    },
    sv: {
      worldview: "Magisk, animistisk, stamorienterad",
      values: "Tradition, ritualer, släktband, förfäder",
      communication: "Berättelser, symboler, ritualer, muntliga traditioner",
      leadership: "Äldste, shamaner, de som bevarar stamtraditioner",
      challenges: "Hot mot stammen, att bryta tabun, att vanhelga traditioner"
    }
  },
  "red": {
    en: {
      worldview: "Egocentric, power-oriented",
      values: "Strength, dominance, respect, courage",
      communication: "Direct, forceful, focused on status and power",
      leadership: "Strong figures who command respect through power",
      challenges: "Disrespect, loss of face, threats to power/status"
    },
    sv: {
      worldview: "Egocentrisk, maktorienterad",
      values: "Styrka, dominans, respekt, mod",
      communication: "Direkt, kraftfull, fokuserad på status och makt",
      leadership: "Starka personer som får respekt genom makt",
      challenges: "Brist på respekt, att tappa ansiktet, hot mot makt/status"
    }
  },
  "blue": {
    en: {
      worldview: "Purposeful, orderly, principled",
      values: "Discipline, duty, loyalty, honor, tradition",
      communication: "Formal, proper, focused on rules and expectations",
      leadership: "Rightful authority, those who uphold tradition and order",
      challenges: "Chaos, immorality, breaking established rules"
    },
    sv: {
      worldview: "Målinriktad, ordningsam, principfast",
      values: "Disciplin, plikt, lojalitet, heder, tradition",
      communication: "Formell, korrekt, fokuserad på regler och förväntningar",
      leadership: "Rättmätig auktoritet, de som upprätthåller tradition och ordning",
      challenges: "Kaos, omoral, att bryta etablerade regler"
    }
  },
  "orange": {
    en: {
      worldview: "Strategic, achievement-oriented, pragmatic",
      values: "Success, innovation, results, progress, optimization",
      communication: "Factual, goal-oriented, persuasive",
      leadership: "Accomplished experts who drive results",
      challenges: "Failure, inefficiency, missed opportunities"
    },
    sv: {
      worldview: "Strategisk, prestationsinriktad, pragmatisk",
      values: "Framgång, innovation, resultat, framsteg, optimering",
      communication: "Faktabaserad, målinriktad, övertygande",
      leadership: "Framgångsrika experter som levererar resultat",
      challenges: "Misslyckande, ineffektivitet, missade möjligheter"
    }
  },
  "green": {
    en: {
      worldview: "Communitarian, egalitarian, pluralistic",
      values: "Harmony, equality, consensus, community",
      communication: "Inclusive, focused on feelings and relationships",
      leadership: "Facilitators who build consensus and inclusion",
      challenges: "Exclusion, discrimination, disregarding feelings"
    },
    sv: {
      worldview: "Gemenskapsinriktad, egalitär, pluralistisk",
      values: "Harmoni, jämlikhet, konsensus, gemenskap",
      communication: "Inkluderande, fokuserad på känslor och relationer",
      leadership: "Facilitatorer som skapar konsensus och inkludering",
      challenges: "Uteslutning, diskriminering, att ignorera känslor"
    }
  },
  "yellow": {
    en: {
      worldview: "Systemic, integrative, flexible",
      values: "Functionality, knowledge, integration, adaptability",
      communication: "Contextual, nuanced, systems-oriented",
      leadership: "Competent individuals who understand systems",
      challenges: "Rigidity, fragmentation, inadequate complexity"
    },
    sv: {
      worldview: "Systemisk, integrerande, flexibel",
      values: "Funktionalitet, kunskap, integration, anpassningsförmåga",
      communication: "Kontextuell, nyanserad, systeminriktad",
      leadership: "Kompetenta individer med systemförståelse",
      challenges: "Stelhet, fragmentering, otillräcklig komplexitet"
    }
  },
  "turquoise": {
    en: {
      worldview: "Holistic, global, interconnected",
      values: "Global consciousness, evolutionary purpose, unity",
      communication: "Intuitive, holistic, emphasizing connectedness",
      leadership: "Visionaries who serve holistic evolutionary emergence",
      challenges: "Disconnection from wholeness, short-term thinking"
    },
    sv: {
      worldview: "Holistisk, global, sammanlänkad",
      values: "Global medvetenhet, evolutionärt syfte, enhet",
      communication: "Intuitiv, holistisk, betonande samhörighet",
      leadership: "Visionärer som tjänar den holistiska evolutionära framväxten",
      challenges: "Frånkoppling från helhet, kortsiktigt tänkande"
    }
  },
  "coral": {
    en: {
      worldview: "Sovereign and universal, creative emergence",
      values: "Creative expression, conscious evolution, transpersonal purpose",
      communication: "Multi-dimensional, integrating multiple modes of knowing",
      leadership: "Temporary crystallization of collective intelligence",
      challenges: "Grounding vision in practical reality, bridging to earlier stages"
    },
    sv: {
      worldview: "Suverän och universell, kreativ framväxt",
      values: "Kreativt uttryck, medveten evolution, transpersonligt syfte",
      communication: "Multidimensionell, integrerande flera sätt att veta",
      leadership: "Tillfällig kristallisering av kollektiv intelligens",
      challenges: "Att förankra visionen i praktisk verklighet, bygga broar till tidigare stadier"
    }
  },
  "ultraviolet": {
    en: {
      worldview: "Non-dual, infinite flow of consciousness",
      values: "Boundless awareness, infinite becoming, transcendent unity",
      communication: "Direct transmission, beyond conceptual frameworks",
      leadership: "Emergent, formless orchestration of collective consciousness",
      challenges: "Incomprehensible to earlier stages, maintaining coherence"
    },
    sv: {
      worldview: "Icke-dualistisk, oändligt medvetandeflöde",
      values: "Gränslös medvetenhet, oändligt blivande, transcendent enhet",
      communication: "Direkt överföring, bortom begreppsliga ramar",
      leadership: "Framväxande, formlös orkestrering av kollektivt medvetande",
      challenges: "Oförståeligt för tidigare stadier, att bibehålla samstämmighet"
    }
  }
};


// Stage interactions data
export const stageInteractions: StageInteractions = {
  "beige-purple": {
    en: "The Purple stage provides community support and protection for Beige survival needs, while Beige provides practical skills essential for the tribe's survival. This combination forms the foundation of early human societies.",
    sv: "Lila stadiet erbjuder gemenskap och skydd för Beiges överlevnadsbehov, medan Beige bidrar med praktiska färdigheter som är avgörande för stammens överlevnad. Denna kombination utgör grunden för tidiga mänskliga samhällen."
  },
  "beige-red": {
    en: "Red provides leadership and protection for Beige survival needs, while Beige offers practical support and resources. This relationship often manifests as simple power structures where the strong protect the vulnerable in exchange for loyalty.",
    sv: "Rött erbjuder ledarskap och skydd för Beiges överlevnadsbehov, medan Beige bidrar med praktiskt stöd och resurser. Denna relation tar ofta formen av enkla maktstrukturer där de starka skyddar de sårbara i utbyte mot lojalitet."
  },
  "beige-blue": {
    en: "Blue provides stable systems and rules that ensure Beige survival needs are consistently met. Beige contributes practical skills within those systems. This combination creates social safety nets and basic welfare systems.",
    sv: "Blått tillhandahåller stabila system och regler som säkerställer att Beiges överlevnadsbehov uppfylls konsekvent. Beige bidrar med praktiska färdigheter inom dessa system. Denna kombination skapar sociala skyddsnät och grundläggande välfärdssystem."
  },
  "beige-orange": {
    en: "Orange creates innovative solutions and efficient systems for addressing Beige survival challenges. Beige grounds Orange in fundamental human needs. This relationship drives technological advances to solve basic human problems.",
    sv: "Orange skapar innovativa lösningar och effektiva system för att möta Beiges överlevnadsutmaningar. Beige förankrar Orange i grundläggande mänskliga behov. Denna relation driver teknologiska framsteg för att lösa mänskliga basproblem."
  },
  "beige-green": {
    en: "Green ensures equitable distribution of resources to meet everyone's Beige survival needs. Beige reminds Green of physical realities. This combination creates compassionate humanitarian responses to crises.",
    sv: "Grönt säkerställer rättvis fördelning av resurser för att möta allas Beiges överlevnadsbehov. Beige påminner Grönt om de fysiska realiteterna. Denna kombination skapar medkännande humanitära insatser vid kriser."
  },
  "beige-yellow": {
    en: "Yellow develops flexible, systems-aware approaches to address Beige survival needs across different contexts. Beige provides Yellow with first-principles understanding of human necessities. This relationship creates resilient, adaptive systems for human wellbeing.",
    sv: "Gult utvecklar flexibla, systemmedvetna tillvägagångssätt för att möta Beiges överlevnadsbehov i olika sammanhang. Beige ger Gult en grundläggande förståelse för mänskliga behov. Denna relation skapar resilienta, adaptiva system för mänskligt välbefinnande."
  },
  "beige-turquoise": {
    en: "Turquoise integrates Beige survival needs into a holistic understanding of life systems and global wellbeing. Beige keeps Turquoise grounded in physical reality. This combination fosters sustainable approaches to meeting human needs within planetary boundaries.",
    sv: "Turkos integrerar Beiges överlevnadsbehov i en holistisk förståelse av livssystem och globalt välbefinnande. Beige håller Turkos förankrad i den fysiska verkligheten. Denna kombination främjar hållbara sätt att tillgodose mänskliga behov inom planetens gränser."
  },
  "beige-coral": {
    en: "Coral bridges Beige survival realities with evolutionary creativity, bringing innovative solutions to fundamental human needs. Beige provides Coral with essential grounding in physical necessity, while Coral expands possibilities beyond apparent resource limitations.",
    sv: "Korall bygger en bro mellan Beiges överlevnadsrealiteter och evolutionär kreativitet, och tillför innovativa lösningar på grundläggande mänskliga behov. Beige ger Korall en nödvändig förankring i fysiska behov, medan Korall öppnar upp möjligheter bortom till synes begränsade resurser."
  },
  "beige-ultraviolet": {
    en: "Ultraviolet brings infinite awareness to Beige survival dynamics, transcending apparent limitations through non-dual consciousness. Beige anchors Ultraviolet in the physical dimension, allowing boundless possibility to manifest in tangible forms that address fundamental needs.",
    sv: "Ultraviolett tillför oändlig medvetenhet till Beiges överlevnadsdynamik och överskrider skenbara begränsningar genom icke-dualistiskt medvetande. Beige förankrar Ultraviolett i den fysiska dimensionen, vilket möjliggör att gränslös potential tar konkret form för att möta grundläggande behov."
  },
  "purple-red": {
    en: "Red leaders emerge from Purple tribal contexts, using strength to protect the tribe while Purple provides identity and belonging for Red. This relationship manifests as chiefdoms and traditional leadership structures that balance power with respect for tribal customs.",
    sv: "Röda ledare växer fram ur Lila stamkontexter och använder styrka för att skydda stammen, medan Lila ger identitet och tillhörighet åt Rött. Denna relation tar formen av hövdingadömen och traditionella ledarskapsstrukturer där makt balanseras med respekt för stamkulturer."
  },
  "purple-blue": {
    en: "Blue systematizes Purple traditions into formal codes and institutions, while Purple provides Blue with cultural depth and meaning. This combination appears in religious institutions and traditional societies with codified cultural practices.",
    sv: "Blått systematiserar Lilas traditioner till formella koder och institutioner, medan Lila ger Blått kulturellt djup och mening. Denna kombination återfinns i religiösa institutioner och traditionella samhällen med kodifierade kulturella praktiker."
  },
  "purple-orange": {
    en: "Orange finds opportunities to innovate while respecting Purple cultural identities. Purple provides Orange with community roots and stability. This relationship can create tension but also powerful innovations that honor tradition while advancing progress.",
    sv: "Orange hittar möjligheter till innovation samtidigt som Lila kulturella identiteter respekteras. Lila ger Orange rötter och stabilitet i gemenskapen. Denna relation kan skapa spänningar men också kraftfulla innovationer som hedrar traditioner samtidigt som de driver framsteg."
  },
  "purple-green": {
    en: "Green honors the diversity of Purple traditions and communities, while Purple provides Green with rich cultural heritage. This combination fosters multicultural perspectives and appreciation for indigenous wisdom.",
    sv: "Grönt hedrar mångfalden i Lilas traditioner och gemenskaper, medan Lila ger Grönt ett rikt kulturellt arv. Denna kombination främjar multikulturella perspektiv och uppskattning för ursprungsbefolkningars visdom."
  },
  "purple-yellow": {
    en: "Yellow integrates the wisdom of Purple traditions into flexible, context-appropriate systems. Purple offers Yellow deep connection to ancestral knowledge. This relationship allows for honoring traditions while adapting them to contemporary needs.",
    sv: "Gult integrerar visdomen från Lilas traditioner i flexibla, situationsanpassade system. Lila erbjuder Gult en djup koppling till förfäders kunskap. Denna relation gör det möjligt att hedra traditioner samtidigt som de anpassas till nutidens behov."
  },
  "purple-turquoise": {
    en: "Turquoise recognizes Purple tribal wisdom as an expression of universal consciousness, while Purple grounds Turquoise in lived cultural experience. This combination integrates indigenous knowledge into global ecological awareness.",
    sv: "Turkos ser Lilas stamvisdom som ett uttryck för universellt medvetande, medan Lila förankrar Turkos i levd kulturell erfarenhet. Denna kombination integrerar ursprunglig kunskap i global ekologisk medvetenhet."
  },
  "purple-coral": {
    en: "Coral recognizes the deep symbolic power in Purple's mythic consciousness, while bringing creative evolutionary potential to traditional forms. Purple provides Coral with rich archetypal patterns, while Coral helps ancestral wisdom evolve to address unprecedented challenges.",
    sv: "Korall ser den djupa symboliska kraften i Lila mytiska medvetande och tillför kreativ evolutionär potential till traditionella former. Lila ger Korall rika arketypiska mönster, medan Korall hjälper förfäders visdom att utvecklas för att möta aldrig tidigare skådade utmaningar."
  },
  "purple-ultraviolet": {
    en: "Ultraviolet perceives the unity underlying Purple's symbolic and mythic expressions, bringing infinite awareness to ancestral wisdom. Purple provides Ultraviolet with rich cultural expressions of timeless truths, while Ultraviolet reveals the boundless consciousness within traditional forms.",
    sv: "Ultraviolett uppfattar enheten bakom Lilas symboliska och mytiska uttryck och tillför oändlig medvetenhet till förfäders visdom. Lila ger Ultraviolett rika kulturella uttryck för tidlösa sanningar, medan Ultraviolett avslöjar det gränslösa medvetandet inom traditionella former."
  },
  "red-blue": {
    en: "Blue channels Red's powerful energy through rules and moral codes, while Red provides Blue with the strength to enforce its principles. This relationship manifests in military structures, law enforcement, and traditional authority systems.",
    sv: "Blått kanaliserar Rötts kraftfulla energi genom regler och moralkoder, medan Rött ger Blått styrka att upprätthålla sina principer. Denna relation tar form i militära strukturer, rättsväsende och traditionella auktoritetssystem."
  },
  "red-orange": {
    en: "Orange harnesses Red's competitive drive toward strategic achievement, while Red gives Orange boldness and decisiveness. This combination powers entrepreneurship, competitive sports, and ambitious innovation.",
    sv: "Orange utnyttjar Rötts konkurrensdriv till strategisk framgång, medan Rött ger Orange djärvhet och beslutsamhet. Denna kombination driver entreprenörskap, tävlingsinriktad sport och ambitiös innovation."
  },
  "red-green": {
    en: "Green seeks to include and transform Red's power dynamics into shared empowerment, while Red gives Green the strength to stand up for its values. This relationship can be challenging but creates passionate activism and advocacy.",
    sv: "Grönt strävar efter att inkludera och omvandla Rötts maktdynamik till gemensam egenmakt, medan Rött ger Grönt styrkan att stå upp för sina värderingar. Denna relation kan vara utmanande men skapar passionerad aktivism och opinionsbildning."
  },
  "red-yellow": {
    en: "Yellow understands and integrates Red's power drives into appropriate contexts, while Red provides Yellow with assertive energy. This combination allows for appropriate use of power and authority within complex systems.",
    sv: "Gult förstår och integrerar Rötts maktbehov i passande sammanhang, medan Rött ger Gult självsäker energi. Denna kombination möjliggör lämplig användning av makt och auktoritet inom komplexa system."
  },
  "red-turquoise": {
    en: "Turquoise channels Red's vital force toward evolutionary purposes, while Red gives Turquoise the energy to manifest its vision. This relationship transforms raw power into service of global consciousness.",
    sv: "Turkos kanaliserar Rötts livskraft mot evolutionära syften, medan Rött ger Turkos energin att förverkliga sin vision. Denna relation omvandlar rå makt till tjänst för globalt medvetande."
  },
  "red-coral": {
    en: "Coral transforms Red's raw power into creative evolutionary force, while Red provides Coral with the bold energy needed to manifest new possibilities. This combination creates revolutionary innovations that transform systems while maintaining individual sovereignty.",
    sv: "Korall omvandlar Rötts råa kraft till kreativ evolutionär energi, medan Rött ger Korall den djärva energi som behövs för att förverkliga nya möjligheter. Denna kombination skapar revolutionära innovationer som omformar system samtidigt som individuell suveränitet bevaras."
  },
  "red-ultraviolet": {
    en: "Ultraviolet recognizes Red's power drives as expressions of primal life force, while Red provides Ultraviolet with manifestation energy. This relationship transforms domination into creative expression of infinite potential.",
    sv: "Ultraviolett ser Rötts maktdriv som uttryck för en ursprunglig livskraft, medan Rött ger Ultraviolett energi för manifestation. Denna relation omvandlar dominans till kreativt uttryck för oändlig potential."
  },
  "blue-orange": {
    en: "Orange innovates within Blue's stable frameworks, while Blue provides Orange with ethical boundaries and reliable infrastructure. This combination drives regulated markets, scientific research, and technological development within ethical frameworks.",
    sv: "Orange innoverar inom Blåtts stabila ramar, medan Blått ger Orange etiska gränser och pålitlig infrastruktur. Denna kombination driver reglerade marknader, vetenskaplig forskning och teknologisk utveckling inom etiska ramar."
  },
  "blue-green": {
    en: "Green expands Blue's principles to include diversity and equality, while Blue provides Green with structure and process. This relationship creates rights-based approaches to social justice and inclusive institutional reforms.",
    sv: "Grönt utvidgar Blåtts principer till att omfatta mångfald och jämlikhet, medan Blått ger Grönt struktur och processer. Denna relation skapar rättighetsbaserade tillvägagångssätt för social rättvisa och inkluderande institutionella reformer."
  },
  "blue-yellow": {
    en: "Yellow integrates Blue's principles into flexible, context-appropriate systems, while Blue gives Yellow stability and consistency. This combination creates adaptive governance that maintains core values while responding to changing conditions.",
    sv: "Gult integrerar Blåtts principer i flexibla, situationsanpassade system, medan Blått ger Gult stabilitet och konsekvens. Denna kombination skapar adaptivt styre som upprätthåller kärnvärden samtidigt som det svarar på förändrade förutsättningar."
  },
  "blue-turquoise": {
    en: "Turquoise expands Blue's moral frameworks to encompass global systems and future generations, while Blue gives Turquoise practical structure. This relationship creates ethical systems that honor universal principles across scales of existence.",
    sv: "Turkos utvidgar Blåtts moraliska ramar till att omfatta globala system och framtida generationer, medan Blått ger Turkos praktisk struktur. Denna relation skapar etiska system som hedrar universella principer på alla existensnivåer."
  },
  "blue-coral": {
    en: "Coral brings evolutionary creativity to Blue's principled structures, while Blue provides Coral with ethical foundations and practical organization. This combination creates value-aligned systems that can continuously evolve while maintaining coherence and integrity.",
    sv: "Korall tillför evolutionär kreativitet till Blåtts principbaserade strukturer, medan Blått ger Korall etisk grund och praktisk organisation. Denna kombination skapar värdegrundade system som kan utvecklas kontinuerligt samtidigt som sammanhang och integritet bevaras."
  },
  "blue-ultraviolet": {
    en: "Ultraviolet perceives the universal consciousness underlying Blue's moral principles, while Blue provides Ultraviolet with structured expression. This relationship reveals the infinite wisdom within orderly systems while transcending their limitations.",
    sv: "Ultraviolett uppfattar det universella medvetandet bakom Blåtts moraliska principer, medan Blått ger Ultraviolett strukturerat uttryck. Denna relation avslöjar den oändliga visdomen inom ordnade system samtidigt som deras begränsningar överskrids."
  },
  "orange-green": {
    en: "Green ensures Orange's innovations benefit everyone equally, while Orange gives Green practical effectiveness. This relationship, though often tense, creates sustainable business, stakeholder capitalism, and socially responsible innovation.",
    sv: "Grönt säkerställer att Oranges innovationer kommer alla till del, medan Orange ger Grönt praktisk effektivitet. Denna relation, som ofta är spänd, skapar hållbart företagande, intressentkapitalism och socialt ansvarstagande innovation."
  },
  "orange-yellow": {
    en: "Yellow integrates Orange's strategic thinking into flexible, systems-aware approaches, while Orange gives Yellow practical effectiveness. This combination creates adaptive organizations that balance innovation with systemic awareness.",
    sv: "Gult integrerar Oranges strategiska tänkande i flexibla, systemmedvetna tillvägagångssätt, medan Orange ger Gult praktisk effektivitet. Denna kombination skapar adaptiva organisationer som balanserar innovation med systeminsikt."
  },
  "orange-turquoise": {
    en: "Turquoise aligns Orange's achievements with evolutionary purpose and global wellbeing, while Orange gives Turquoise practical means to manifest its vision. This relationship creates regenerative businesses and conscious innovation.",
    sv: "Turkos anpassar Oranges framgångar till evolutionärt syfte och globalt välbefinnande, medan Orange ger Turkos praktiska medel att förverkliga sin vision. Denna relation skapar regenerativa företag och medveten innovation."
  },
  "orange-coral": {
    en: "Coral brings evolutionary creativity to Orange's strategic effectiveness, while Orange gives Coral the practical means to manifest innovative visions. This relationship creates pioneering ventures that transform industries while delivering tangible results.",
    sv: "Korall tillför evolutionär kreativitet till Oranges strategiska effektivitet, medan Orange ger Korall de praktiska medel som behövs för att förverkliga innovativa visioner. Denna relation skapar banbrytande initiativ som omformar industrier och ger konkreta resultat."
  },
  "orange-ultraviolet": {
    en: "Ultraviolet perceives the infinite potential within Orange's achievement orientation, while Orange provides Ultraviolet with practical manifestation capacity. This relationship transforms strategic excellence into expressions of boundless possibility.",
    sv: "Ultraviolett ser den oändliga potentialen i Oranges resultatorientering, medan Orange ger Ultraviolett förmågan till praktisk manifestation. Denna relation omvandlar strategisk briljans till uttryck för gränslösa möjligheter."
  },
  "green-yellow": {
    en: "Yellow integrates Green's inclusive values while adding systemic effectiveness, while Green gives Yellow humanitarian depth. This powerful combination creates effective approaches to complex social and environmental challenges.",
    sv: "Gult integrerar Grönts inkluderande värderingar och tillför systemeffektivitet, medan Grönt ger Gult humanitärt djup. Denna kraftfulla kombination skapar effektiva lösningar på komplexa sociala och miljömässiga utmaningar."
  },
  "green-turquoise": {
    en: "Turquoise expands Green's social consciousness to include global systems and evolutionary awareness, while Green grounds Turquoise in human connection. This relationship fosters planetary healing that honors all beings.",
    sv: "Turkos utvidgar Grönts sociala medvetenhet till att omfatta globala system och evolutionärt medvetande, medan Grönt förankrar Turkos i mänsklig närhet. Denna relation främjar planetärt helande som hedrar alla varelser."
  },
  "green-coral": {
    en: "Coral brings evolutionary creativity to Green's inclusive community orientation, while Green provides Coral with relational depth and compassionate awareness. This combination creates innovative social systems that honor both individual uniqueness and collective harmony.",
    sv: "Korall tillför evolutionär kreativitet till Grönts inkluderande gemenskapsinriktning, medan Grönt ger Korall relationsdjup och medkännande medvetenhet. Denna kombination skapar innovativa sociala system som hedrar både individuell unikhet och kollektiv harmoni."
  },
  "green-ultraviolet": {
    en: "Ultraviolet reveals the universal unity underlying Green's inclusive consciousness, while Green provides Ultraviolet with relational warmth and compassion. This relationship transforms human connection into expressions of boundless love and awareness.",
    sv: "Ultraviolett avslöjar den universella enhet som ligger till grund för Grönts inkluderande medvetande, medan Grönt ger Ultraviolett relationell värme och medkänsla. Denna relation omvandlar mänsklig kontakt till uttryck för gränslös kärlek och medvetenhet."
  },
  "yellow-turquoise": {
    en: "Turquoise infuses Yellow's systems thinking with unified consciousness and spiritual depth, while Yellow gives Turquoise practical effectiveness. This synergistic combination creates integral approaches to global challenges.",
    sv: "Turkos genomsyrar Gults systemtänkande med enhetligt medvetande och andligt djup, medan Gult ger Turkos praktisk effektivitet. Denna synergiska kombination skapar integrerade tillvägagångssätt för globala utmaningar."
  },
  "yellow-coral": {
    en: "Coral brings evolutionary creativity to Yellow's systemic understanding, while Yellow provides Coral with functional integration across complex systems. This powerful combination creates transformative innovations that work effectively across multiple domains and scales.",
    sv: "Korall tillför evolutionär kreativitet till Gults systemförståelse, medan Gult ger Korall funktionell integration över komplexa system. Denna kraftfulla kombination skapar transformativa innovationer som fungerar effektivt över flera domäner och skalor."
  },
  "yellow-ultraviolet": {
    en: "Ultraviolet reveals the infinite awareness underlying Yellow's integrative systems thinking, while Yellow gives Ultraviolet practical coherence. This relationship creates fluid yet functional expressions of boundless consciousness within complex adaptive systems.",
    sv: "Ultraviolett avslöjar den oändliga medvetenhet som ligger bakom Gults integrativa systemtänkande, medan Gult ger Ultraviolett praktisk samstämmighet. Denna relation skapar flytande men funktionella uttryck för gränslöst medvetande inom komplexa adaptiva system."
  },
  "turquoise-coral": {
    en: "Coral brings sovereign creativity to Turquoise's holistic awareness, while Turquoise provides Coral with unified field consciousness. This powerful combination creates evolutionary innovations that serve planetary wellbeing while honoring individual sovereignty.",
    sv: "Korall tillför suverän kreativitet till Turkos holistiska medvetenhet, medan Turkos ger Korall medvetenhet om det enade fältet. Denna kraftfulla kombination skapar evolutionära innovationer som tjänar planetens välbefinnande och samtidigt hedrar individuell suveränitet."
  },
  "turquoise-ultraviolet": {
    en: "Ultraviolet reveals the boundless nature of Turquoise's holistic consciousness, while Turquoise gives Ultraviolet coherent expression across planetary systems. This relationship creates fluid, evolutionary expressions of infinite awareness through living systems.",
    sv: "Ultraviolett avslöjar den gränslösa naturen i Turkos holistiska medvetande, medan Turkos ger Ultraviolett ett samlat uttryck över planetära system. Denna relation skapar flytande, evolutionära uttryck för oändlig medvetenhet genom levande system."
  },
  "coral-ultraviolet": {
    en: "Ultraviolet brings infinite flow to Coral's creative sovereignty, while Coral gives Ultraviolet unique evolutionary expression. This relationship represents the dance between infinite potential and its manifestation through conscious evolution.",
    sv: "Ultraviolett tillför ett oändligt flöde till Koralls kreativa suveränitet, medan Korall ger Ultraviolett ett unikt evolutionärt uttryck. Denna relation representerar dansen mellan oändlig potential och dess manifestation genom medveten evolution."
  }
};


// UI translations
export const matrixTranslations = {
  en: {
    title: "Stage Comparison Matrix",
    description: "Explore how different Spiral Dynamics stages interact with each other. Select two stages to see their relationship dynamics, potential synergies, and challenges.",
    select1: "Select First Stage",
    select2: "Select Second Stage",
    interaction: "Stage Interaction",
    characteristics: "Stage Characteristics",
    worldview: "Worldview",
    values: "Core Values",
    communication: "Communication Style",
    leadership: "Leadership Approach",
    challenges: "Key Challenges",
    noSelection: "Please select two stages to see their interaction."
  },
  sv: {
    title: "Stadie-jämförelsematris",
    description: "Utforska hur olika Spiral Dynamics-stadier interagerar med varandra. Välj två stadier för att se deras relationsdynamik, potentiella synergier och utmaningar.",
    select1: "Välj Första Stadiet",
    select2: "Välj Andra Stadiet",
    interaction: "Stadieinteraktion",
    characteristics: "Stadieegenskaper",
    worldview: "Världsbild",
    values: "Kärnvärden",
    communication: "Kommunikationsstil",
    leadership: "Ledarskapsmetod",
    challenges: "Nyckelutmaningar",
    noSelection: "Välj två stadier för att se deras interaktion."
  }
};

export const gridTranslations = {
  en: {
    title: "Stage Interaction Grid",
    description: "Click on any cell to explore the interaction between two stages.",
    stageInteractions: "Stage Interactions",
    allCombinations: "All Combinations"
  },
  sv: {
    title: "Stadieinteraktionsnät",
    description: "Klicka på valfri cell för att utforska interaktionen mellan två stadier.",
    stageInteractions: "Stadieinteraktioner",
    allCombinations: "Alla Kombinationer"
  }
};

export const visualizationTranslations = {
  en: {
    title: "Stage Comparison Visualization",
    subtitle: "Explore how different Spiral Dynamics stages interact and compare"
  },
  sv: {
    title: "Stadiejämförelse-visualisering",
    subtitle: "Utforska hur olika Spiral Dynamics-stadier interagerar och jämför sig"
  }
};
