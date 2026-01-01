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

// Types for updated stage interactions
export interface StageInteractionData {
  en: string;
  sv: string;
  clashes: {
    en: string;
    sv: string;
  };
  bridging: {
    en: string;
    sv: string;
  };
}

export type StageInteractions = Record<string, StageInteractionData>;

// Stage interactions data
export const stageInteractions: StageInteractions = {
  "beige-purple": {
    en: "The Purple stage provides community support and protection for Beige survival needs, while Beige provides practical skills essential for the tribe's survival. This combination forms the foundation of early human societies.",
    sv: "Lila stadiet erbjuder gemenskap och skydd för Beiges överlevnadsbehov, medan Beige bidrar med praktiska färdigheter som är avgörande för stammens överlevnad. Denna kombination utgör grunden för tidiga mänskliga samhällen.",
    clashes: {
      en: "Purple's focus on rituals and traditions may seem unnecessary to Beige's survival-focused mindset. Beige's individualistic survival instincts can conflict with Purple's expectations of resource sharing and group participation.",
      sv: "Lilas fokus på ritualer och traditioner kan verka onödigt för Beiges överlevnadsfokuserade mindset. Beiges individualistiska överlevnadsinstinkter kan hamna i konflikt med Lilas förväntningar på resursdelning och gruppdeltagande."
    },
    bridging: {
      en: "Emphasize how tribal customs enhance survival through shared knowledge and resource allocation. Demonstrate how group protection benefits individual survival, while acknowledging the practical value of survival skills to the community.",
      sv: "Betona hur stamkulturer förbättrar överlevnad genom delad kunskap och resursfördelning. Visa hur gruppskydd gynnar individuell överlevnad, samtidigt som man erkänner det praktiska värdet av överlevnadskunskaper för gemenskapen."
    }
  },
  "beige-red": {
    en: "Red provides leadership and protection for Beige survival needs, while Beige offers practical support and resources. This relationship often manifests as simple power structures where the strong protect the vulnerable in exchange for loyalty.",
    sv: "Rött erbjuder ledarskap och skydd för Beiges överlevnadsbehov, medan Beige bidrar med praktiskt stöd och resurser. Denna relation tar ofta formen av enkla maktstrukturer där de starka skyddar de sårbara i utbyte mot lojalitet.",
    clashes: {
      en: "Red may exploit Beige's vulnerability through domination rather than protection. Beige can resent Red's demands for resources and loyalty when survival is threatened.",
      sv: "Rött kan utnyttja Beiges sårbarhet genom dominans snarare än skydd. Beige kan känna motvilja mot Rötts krav på resurser och lojalitet när överlevnaden är hotad."
    },
    bridging: {
      en: "Establish fair exchanges where protection genuinely enhances survival outcomes. Red can learn that sustainable leadership provides more long-term power than exploitation, while Beige can see the survival benefits of strategic alignment with strength.",
      sv: "Etablera rättvisa utbyten där skydd verkligen förbättrar överlevnadsmöjligheter. Rött kan lära sig att hållbart ledarskap ger mer långsiktig makt än exploatering, medan Beige kan se överlevnadsfördelarna med strategisk anpassning till styrka."
    }
  },
  "beige-blue": {
    en: "Blue provides stable systems and rules that ensure Beige survival needs are consistently met. Beige contributes practical skills within those systems. This combination creates social safety nets and basic welfare systems.",
    sv: "Blått tillhandahåller stabila system och regler som säkerställer att Beiges överlevnadsbehov uppfylls konsekvent. Beige bidrar med praktiska färdigheter inom dessa system. Denna kombination skapar sociala skyddsnät och grundläggande välfärdssystem.",
    clashes: {
      en: "Blue's rules and procedures may seem unnecessarily complex and restrictive to Beige's immediate survival focus. Beige's prioritization of immediate needs can clash with Blue's emphasis on following proper protocols even in emergencies.",
      sv: "Blåtts regler och procedurer kan verka onödigt komplexa och begränsande för Beiges omedelbara överlevnadsfokus. Beiges prioritering av omedelbara behov kan kollidera med Blåtts betoning på att följa korrekta protokoll även i nödsituationer."
    },
    bridging: {
      en: "Design systems that reliably meet basic needs while minimizing bureaucratic barriers to essential services. Blue can develop emergency protocols that respect immediate survival needs, while Beige can learn how systematic approaches provide more consistent security.",
      sv: "Utforma system som tillförlitligt möter grundläggande behov samtidigt som byråkratiska hinder för viktiga tjänster minimeras. Blått kan utveckla nödprotokoll som respekterar omedelbara överlevnadsbehov, medan Beige kan lära sig hur systematiska metoder ger mer konsekvent säkerhet."
    }
  },
  "beige-orange": {
    en: "Orange creates innovative solutions and efficient systems for addressing Beige survival challenges. Beige grounds Orange in fundamental human needs. This relationship drives technological advances to solve basic human problems.",
    sv: "Orange skapar innovativa lösningar och effektiva system för att möta Beiges överlevnadsutmaningar. Beige förankrar Orange i grundläggande mänskliga behov. Denna relation driver teknologiska framsteg för att lösa mänskliga basproblem.",
    clashes: {
      en: "Orange's complex technologies may be inaccessible or impractical for those in survival mode. Beige's focus on immediate needs conflicts with Orange's investment in future returns and complex solutions.",
      sv: "Oranges komplexa teknologier kan vara otillgängliga eller opraktiska för dem i överlevnadsläge. Beiges fokus på omedelbara behov strider mot Oranges investeringar i framtida avkastning och komplexa lösningar."
    },
    bridging: {
      en: "Develop appropriate technologies that directly address survival needs without requiring complex infrastructure or expertise. Orange can focus on immediate practical impact while building toward scalable solutions, while Beige can embrace simple innovations that demonstrably improve survival outcomes.",
      sv: "Utveckla lämplig teknik som direkt möter överlevnadsbehov utan att kräva komplex infrastruktur eller expertis. Orange kan fokusera på omedelbar praktisk påverkan samtidigt som man bygger mot skalbara lösningar, medan Beige kan omfamna enkla innovationer som påvisbart förbättrar överlevnadsmöjligheter."
    }
  },
  "beige-green": {
    en: "Green ensures equitable distribution of resources to meet everyone's Beige survival needs. Beige reminds Green of physical realities. This combination creates compassionate humanitarian responses to crises.",
    sv: "Grönt säkerställer rättvis fördelning av resurser för att möta allas Beiges överlevnadsbehov. Beige påminner Grönt om de fysiska realiteterna. Denna kombination skapar medkännande humanitära insatser vid kriser.",
    clashes: {
      en: "Green's consensus-building processes may seem too slow and inefficient when Beige survival needs are urgent. Beige's focus on individual or family survival can conflict with Green's emphasis on collective well-being and equal distribution.",
      sv: "Grönts konsensusbyggande processer kan verka för långsamma och ineffektiva när Beiges överlevnadsbehov är akuta. Beiges fokus på individuell eller familjeöverlevnad kan komma i konflikt med Grönts betoning på kollektivt välbefinnande och jämlik fördelning."
    },
    bridging: {
      en: "Implement rapid humanitarian responses that address immediate needs while developing participatory approaches for long-term solutions. Green can prioritize action over process in emergencies, while Beige can recognize how equitable distribution benefits everyone's survival chances.",
      sv: "Implementera snabba humanitära insatser som möter omedelbara behov samtidigt som man utvecklar deltagarbaserade metoder för långsiktiga lösningar. Grönt kan prioritera handling framför process i nödsituationer, medan Beige kan inse hur rättvis fördelning gynnar allas överlevnadschanser."
    }
  },
  "beige-yellow": {
    en: "Yellow develops flexible, systems-aware approaches to address Beige survival needs across different contexts. Beige provides Yellow with first-principles understanding of human necessities. This relationship creates resilient, adaptive systems for human wellbeing.",
    sv: "Gult utvecklar flexibla, systemmedvetna tillvägagångssätt för att möta Beiges överlevnadsbehov i olika sammanhang. Beige ger Gult en grundläggande förståelse för mänskliga behov. Denna relation skapar resilienta, adaptiva system för mänskligt välbefinnande.",
    clashes: {
      en: "Yellow's systems thinking and complexity can seem abstract and irrelevant to Beige's immediate survival concerns. Beige's narrow focus on immediate threats can appear shortsighted to Yellow's broader perspective.",
      sv: "Gults systemtänkande och komplexitet kan verka abstrakt och irrelevant för Beiges omedelbara överlevnadsproblem. Beiges snäva fokus på omedelbara hot kan framstå som kortsiktigt för Gults bredare perspektiv."
    },
    bridging: {
      en: "Develop adaptable solutions that meet immediate needs while building resilience against future threats. Yellow can translate systems insights into practical immediate actions, while Beige can recognize how addressing root causes creates more sustainable security.",
      sv: "Utveckla anpassningsbara lösningar som möter omedelbara behov samtidigt som man bygger motståndskraft mot framtida hot. Gult kan översätta systeminsikter till praktiska omedelbara åtgärder, medan Beige kan inse hur hantering av grundorsaker skapar mer hållbar säkerhet."
    }
  },
  "beige-turquoise": {
    en: "Turquoise integrates Beige survival needs into meta-systemic understanding of nested life-support systems and planetary boundaries. Beige keeps Turquoise grounded in immediate physical reality. This combination fosters regenerative approaches to meeting human needs within ecological constraints.",
    sv: "Turkos integrerar Beiges överlevnadsbehov i meta-systemisk förståelse av kapslade livsstödssystem och planetära gränser. Beige håller Turkos förankrad i omedelbar fysisk verklighet. Denna kombination främjar regenerativa sätt att tillgodose mänskliga behov inom ekologiska begränsningar.",
    clashes: {
      en: "Turquoise's multi-generational, systems-level perspective can seem disconnected from Beige's immediate survival challenges. Beige's focus on personal survival can appear limited to Turquoise's understanding of nested interdependencies.",
      sv: "Turkos flerlagergenerationella, systemnivåperspektiv kan verka frånkopplat från Beiges omedelbara överlevnadsutmaningar. Beiges fokus på personlig överlevnad kan framstå som begränsat för Turkos förståelse av kapslade ömsesidiga beroenden."
    },
    bridging: {
      en: "Connect immediate survival solutions to regenerative approaches that strengthen both human and ecological systems. Turquoise can develop practical applications of systems principles for crisis response, while Beige can recognize how ecological health directly impacts human survival prospects.",
      sv: "Koppla omedelbara överlevnadslösningar till regenerativa metoder som stärker både mänskliga och ekologiska system. Turkos kan utveckla praktiska tillämpningar av systemprinciper för krisrespons, medan Beige kan inse hur ekologisk hälsa direkt påverkar mänskliga överlevnadsutsikter."
    }
  },
  "beige-coral": {
    en: "Coral bridges Beige survival realities with evolutionary creativity, bringing innovative solutions to fundamental human needs. Beige provides Coral with essential grounding in physical necessity, while Coral expands possibilities beyond apparent resource limitations.",
    sv: "Korall bygger en bro mellan Beiges överlevnadsrealiteter och evolutionär kreativitet, och tillför innovativa lösningar på grundläggande mänskliga behov. Beige ger Korall en nödvändig förankring i fysiska behov, medan Korall öppnar upp möjligheter bortom till synes begränsade resurser.",
    clashes: {
      en: "Coral's evolutionary creativity might seem impractical or inaccessible to those facing immediate survival threats. Beige's focus on known solutions can resist Coral's experimental approaches when basic needs are at stake.",
      sv: "Koralls evolutionära kreativitet kan verka opraktisk eller otillgänglig för dem som möter omedelbara överlevnadshot. Beiges fokus på kända lösningar kan motsätta sig Koralls experimentella metoder när grundläggande behov står på spel."
    },
    bridging: {
      en: "Develop breakthrough solutions that immediately improve survival while pioneering regenerative approaches. Coral can apply creative genius to simple, accessible innovations, while Beige can remain open to novel approaches that demonstrate clear survival benefits.",
      sv: "Utveckla banbrytande lösningar som omedelbart förbättrar överlevnad samtidigt som man banar väg för regenerativa metoder. Korall kan tillämpa kreativ genialitet på enkla, tillgängliga innovationer, medan Beige kan förbli öppen för nya metoder som visar tydliga överlevnadsfördelar."
    }
  },
  "beige-ultraviolet": {
    en: "Ultraviolet brings infinite awareness to Beige survival dynamics, transcending apparent limitations through non-dual consciousness. Beige anchors Ultraviolet in the physical dimension, allowing boundless possibility to manifest in tangible forms that address fundamental needs.",
    sv: "Ultraviolett tillför oändlig medvetenhet till Beiges överlevnadsdynamik och överskrider skenbara begränsningar genom icke-dualistiskt medvetande. Beige förankrar Ultraviolett i den fysiska dimensionen, vilket möjliggör att gränslös potential tar konkret form för att möta grundläggande behov.",
    clashes: {
      en: "Ultraviolet's transcendent perspective can seem completely irrelevant to immediate survival crises. Beige's material focus can appear limited to Ultraviolet's boundless consciousness.",
      sv: "Ultravioletts transcendenta perspektiv kan verka helt irrelevant för omedelbara överlevnadskriser. Beiges materiella fokus kan framstå som begränsat för Ultravioletts gränslösa medvetande."
    },
    bridging: {
      en: "Allow infinite awareness to inspire practical solutions that transcend apparent limitations. Ultraviolet can manifest compassionate presence in direct physical support, while Beige can experience how consciousness shifts can reveal unexpected resources and solutions.",
      sv: "Låt oändlig medvetenhet inspirera praktiska lösningar som överskrider uppenbara begränsningar. Ultraviolett kan manifestera medkännande närvaro i direkt fysiskt stöd, medan Beige kan uppleva hur medvetenhetsförändringar kan avslöja oväntade resurser och lösningar."
    }
  },
  "purple-red": {
    en: "Red leaders emerge from Purple tribal contexts, using strength to protect the tribe while Purple provides identity and belonging for Red. This relationship manifests as chiefdoms and traditional leadership structures that balance power with respect for tribal customs.",
    sv: "Röda ledare växer fram ur Lila stamkontexter och använder styrka för att skydda stammen, medan Lila ger identitet och tillhörighet åt Rött. Denna relation tar formen av hövdingadömen och traditionella ledarskapsstrukturer där makt balanseras med respekt för stamkulturer.",
    clashes: {
      en: "Red's individualistic power drives can threaten Purple's communal harmony and traditional authority structures. Purple's adherence to tradition and consensus can frustrate Red's desire for quick, decisive action and personal glory.",
      sv: "Rötts individualistiska maktdrivkrafter kan hota Lilas kommunala harmoni och traditionella auktoritetsstrukturer. Lilas följsamhet till tradition och konsensus kan frustrera Rötts önskan om snabb, beslutsam handling och personlig ära."
    },
    bridging: {
      en: "Develop leadership roles that honor traditional wisdom while allowing for decisive action when needed. Red can learn to use power to protect and enhance tribal identity, while Purple can recognize the value of strong leadership in threatening situations.",
      sv: "Utveckla ledarskapsroller som hedrar traditionell visdom samtidigt som de möjliggör beslutsam handling när det behövs. Rött kan lära sig att använda makt för att skydda och förstärka stamidentitet, medan Lila kan inse värdet av starkt ledarskap i hotfulla situationer."
    }
  },
  "purple-blue": {
    en: "Blue systematizes Purple traditions into formal codes and institutions, while Purple provides Blue with cultural depth and meaning. This combination appears in religious institutions and traditional societies with codified cultural practices.",
    sv: "Blått systematiserar Lilas traditioner till formella koder och institutioner, medan Lila ger Blått kulturellt djup och mening. Denna kombination återfinns i religiösa institutioner och traditionella samhällen med kodifierade kulturella praktiker.",
    clashes: {
      en: "Blue's emphasis on universal rules and formal structures can feel rigid and soulless to Purple's intuitive, contextual understanding. Purple's fluid traditions and magical thinking can seem irrational and inconsistent to Blue's orderly mindset.",
      sv: "Blåtts betoning på universella regler och formella strukturer kan kännas stela och själlösa för Lilas intuitiva, kontextuella förståelse. Lilas flytande traditioner och magiska tänkande kan verka irrationella och inkonsekventa för Blåtts ordningsamma tankesätt."
    },
    bridging: {
      en: "Codify traditions while preserving their symbolic meaning and emotional resonance. Blue can incorporate cultural context into its frameworks, while Purple can appreciate how formalization helps preserve traditional practices across generations.",
      sv: "Kodifiera traditioner samtidigt som deras symboliska mening och emotionella resonans bevaras. Blått kan införliva kulturellt sammanhang i sina ramverk, medan Lila kan uppskatta hur formalisering hjälper till att bevara traditionella praktiker över generationer."
    }
  },
  "purple-orange": {
    en: "Orange finds opportunities to innovate while respecting Purple cultural identities. Purple provides Orange with community roots and stability. This relationship can create tension but also powerful innovations that honor tradition while advancing progress.",
    sv: "Orange hittar möjligheter till innovation samtidigt som Lila kulturella identiteter respekteras. Lila ger Orange rötter och stabilitet i gemenskapen. Denna relation kan skapa spänningar men också kraftfulla innovationer som hedrar traditioner samtidigt som de driver framsteg.",
    clashes: {
      en: "Orange's drive for innovation and individual achievement can disrupt Purple's traditional community structures and practices. Purple's attachment to ancestral ways can appear as superstition and resistance to progress from Orange's rational perspective.",
      sv: "Oranges strävan efter innovation och individuell prestation kan störa Lilas traditionella samhällsstrukturer och praktiker. Lilas anknytning till förfäders sätt kan framstå som vidskepelse och motstånd mot framsteg från Oranges rationella perspektiv."
    },
    bridging: {
      en: "Modernize traditions while preserving their core cultural value and community function. Orange can learn to innovate within cultural contexts rather than against them, while Purple can discriminate between essential traditions and those that can evolve.",
      sv: "Modernisera traditioner samtidigt som deras centrala kulturella värde och samhällsfunktion bevaras. Orange kan lära sig att innovera inom kulturella sammanhang snarare än mot dem, medan Lila kan särskilja mellan väsentliga traditioner och de som kan utvecklas."
    }
  },
  "purple-green": {
    en: "Green honors the diversity of Purple traditions and communities, while Purple provides Green with rich cultural heritage. This combination fosters multicultural perspectives and appreciation for indigenous wisdom.",
    sv: "Grönt hedrar mångfalden i Lilas traditioner och gemenskaper, medan Lila ger Grönt ett rikt kulturellt arv. Denna kombination främjar multikulturella perspektiv och uppskattning för ursprungsbefolkningars visdom.",
    clashes: {
      en: "Green's emphasis on universal equality can challenge Purple's hierarchical traditions and exclusive tribal boundaries. Purple's loyalty to specific traditions can appear parochial and exclusionary to Green's pluralistic worldview.",
      sv: "Grönts betoning på universell jämlikhet kan utmana Lilas hierarkiska traditioner och exklusiva stamgränser. Lilas lojalitet mot specifika traditioner kan framstå som provinsiell och utestängande för Grönts pluralistiska världsbild."
    },
    bridging: {
      en: "Create inclusive spaces that honor the unique value of diverse traditions without forcing homogenization. Green can respect the depth and authenticity of specific cultural practices, while Purple can expand its circle of belonging to embrace wider connections.",
      sv: "Skapa inkluderande utrymmen som hedrar det unika värdet av olika traditioner utan att tvinga fram homogenisering. Grönt kan respektera djupet och autenticiteten i specifika kulturella praktiker, medan Lila kan utvidga sin tillhörighetscirkel för att omfamna bredare kopplingar."
    }
  },
  "purple-yellow": {
    en: "Yellow integrates the wisdom of Purple traditions into flexible, context-appropriate systems. Purple offers Yellow deep connection to ancestral knowledge. This relationship allows for honoring traditions while adapting them to contemporary needs.",
    sv: "Gult integrerar visdomen från Lilas traditioner i flexibla, situationsanpassade system. Lila erbjuder Gult en djup koppling till förfäders kunskap. Denna relation gör det möjligt att hedra traditioner samtidigt som de anpassas till nutidens behov.",
    clashes: {
      en: "Yellow's flexible, context-dependent approach can seem unprincipled and destabilizing to Purple's need for consistent traditions. Purple's attachment to specific forms can appear limiting to Yellow's adaptive systems perspective.",
      sv: "Gults flexibla, kontextberoende tillvägagångssätt kan verka principlöst och destabiliserande för Lilas behov av konsekventa traditioner. Lilas anknytning till specifika former kan framstå som begränsande för Gults adaptiva systemperspektiv."
    },
    bridging: {
      en: "Identify the functional essence behind traditions and find adaptive expressions that preserve core wisdom. Yellow can honor the depth and stability traditional knowledge provides, while Purple can see how adaptive evolution keeps traditions relevant and alive.",
      sv: "Identifiera den funktionella essensen bakom traditioner och hitta adaptiva uttryck som bevarar kärnvisdom. Gult kan hedra djupet och stabiliteten som traditionell kunskap ger, medan Lila kan se hur adaptiv evolution håller traditioner relevanta och levande."
    }
  },
  "purple-turquoise": {
    en: "Turquoise recognizes Purple's ritual and community wisdom as embedded participatory knowledge within living systems. Purple provides Turquoise with ancestral understanding and place-based practices. Together they honor both indigenous wisdom and planetary-scale coordination.",
    sv: "Turkos erkänner Lilas ritualer och gemenskapsvisdom som innesluten deltagande kunskap inom levande system. Lila ger Turkos förfädernas förståelse och platsbaserade praktiker. Tillsammans hedrar de både ursprungsbefolkningens visdom och planetär-skala samordning.",
    clashes: {
      en: "Turquoise's meta-systemic understanding can seem to abstract or depersonalize Purple's sacred local traditions. Purple's focus on specific tribal boundaries and rituals can appear limited to Turquoise's understanding of nested, interconnected communities.",
      sv: "Turkos meta-systemiska förståelse kan verka abstrahera eller avpersonalisera Lilas heliga lokala traditioner. Lilas fokus på specifika stamgränser och ritualer kan framstå som begränsat för Turkos förståelse av kapslade, sammankopplade gemenskaper."
    },
    bridging: {
      en: "Recognize how local, place-based wisdom connects to planetary understanding through bioregional scales. Turquoise can honor indigenous knowledge as essential participatory wisdom, while Purple can see how local traditions contribute to larger living systems.",
      sv: "Inse hur lokal, platsbaserad visdom ansluter till planetär förståelse genom bioregionala skalor. Turkos kan hedra ursprungsbefolkningens kunskap som nödvändig deltagande visdom, medan Lila kan se hur lokala traditioner bidrar till större levande system."
    }
  },
  "purple-coral": {
    en: "Coral recognizes the deep symbolic power in Purple's mythic consciousness, while bringing creative evolutionary potential to traditional forms. Purple provides Coral with rich archetypal patterns, while Coral helps ancestral wisdom evolve to address unprecedented challenges.",
    sv: "Korall ser den djupa symboliska kraften i Lila mytiska medvetande och tillför kreativ evolutionär potential till traditionella former. Lila ger Korall rika arketypiska mönster, medan Korall hjälper förfäders visdom att utvecklas för att möta aldrig tidigare skådade utmaningar.",
    clashes: {
      en: "Coral's radical creativity and evolutionary impulse can threaten Purple's established traditions and identity structures. Purple's attachment to specific forms can resist Coral's transformative expressions of archetypal patterns.",
      sv: "Koralls radikala kreativitet och evolutionära impuls kan hota Lilas etablerade traditioner och identitetsstrukturer. Lilas anknytning till specifika former kan motsätta sig Koralls transformativa uttryck av arketypiska mönster."
    },
    bridging: {
      en: "Explore how ancestral wisdom can find new evolutionary expressions while honoring their essential spirit. Coral can respect the power and depth of traditional forms, while Purple can embrace how creative evolution keeps mythic consciousness alive in changing times.",
      sv: "Utforska hur förfäders visdom kan hitta nya evolutionära uttryck samtidigt som deras väsentliga anda hedras. Korall kan respektera kraften och djupet i traditionella former, medan Lila kan omfamna hur kreativ evolution håller mytiskt medvetande levande i föränderliga tider."
    }
  },
  "purple-ultraviolet": {
    en: "Ultraviolet perceives the unity underlying Purple's symbolic and mythic expressions, bringing infinite awareness to ancestral wisdom. Purple provides Ultraviolet with rich cultural expressions of timeless truths, while Ultraviolet reveals the boundless consciousness within traditional forms.",
    sv: "Ultraviolett uppfattar enheten bakom Lilas symboliska och mytiska uttryck och tillför oändlig medvetenhet till förfäders visdom. Lila ger Ultraviolett rika kulturella uttryck för tidlösa sanningar, medan Ultraviolett avslöjar det gränslösa medvetandet inom traditionella former.",
    clashes: {
      en: "Ultraviolet's boundless awareness can dissolve the boundaries that give Purple's traditions their distinct identity and power. Purple's attachment to specific forms can miss Ultraviolet's recognition of the infinite consciousness they express.",
      sv: "Ultravioletts gränslösa medvetenhet kan upplösa de gränser som ger Lilas traditioner deras distinkta identitet och kraft. Lilas anknytning till specifika former kan missa Ultravioletts igenkännande av det oändliga medvetande de uttrycker."
    },
    bridging: {
      en: "Honor how specific cultural forms can be gateways to infinite awareness. Ultraviolet can value the particular expressions that make transcendent truths accessible, while Purple can recognize the boundless consciousness that animates its sacred traditions.",
      sv: "Hedra hur specifika kulturella former kan vara ingångar till oändlig medvetenhet. Ultraviolett kan värdera de särskilda uttryck som gör transcendenta sanningar tillgängliga, medan Lila kan erkänna det gränslösa medvetande som besjälar dess heliga traditioner."
    }
  },
  "red-blue": {
    en: "Blue channels Red's powerful energy through rules and moral codes, while Red provides Blue with the strength to enforce its principles. This relationship manifests in military structures, law enforcement, and traditional authority systems.",
    sv: "Blått kanaliserar Rötts kraftfulla energi genom regler och moralkoder, medan Rött ger Blått styrka att upprätthålla sina principer. Denna relation tar form i militära strukturer, rättsväsende och traditionella auktoritetssystem.",
    clashes: {
      en: "Red's impulsive, power-focused approach conflicts with Blue's emphasis on discipline and following proper procedures. Blue's rule-based constraints feel overly restrictive to Red's desire for freedom and dominance.",
      sv: "Rötts impulsiva, maktfokuserade tillvägagångssätt strider mot Blåtts betoning på disciplin och att följa korrekta procedurer. Blåtts regelbaserade begränsningar känns överdrivet restriktiva för Rötts önskan om frihet och dominans."
    },
    bridging: {
      en: "Develop honor codes that channel power into principled action and recognized achievement. Blue can create legitimate pathways for ambition and heroic action, while Red can discover how disciplined power achieves more lasting impact.",
      sv: "Utveckla hederskoder som kanaliserar makt till principiellt handlande och erkänd prestation. Blått kan skapa legitima vägar för ambition och heroiskt handlande, medan Rött kan upptäcka hur disciplinerad makt uppnår mer bestående effekt."
    }
  },
  "red-orange": {
    en: "Orange harnesses Red's competitive drive toward strategic achievement, while Red gives Orange boldness and decisiveness. This combination powers entrepreneurship, competitive sports, and ambitious innovation.",
    sv: "Orange utnyttjar Rötts konkurrensdriv till strategisk framgång, medan Rött ger Orange djärvhet och beslutsamhet. Denna kombination driver entreprenörskap, tävlingsinriktad sport och ambitiös innovation.",
    clashes: {
      en: "Red's direct, dominating approach conflicts with Orange's strategic, calculated thinking. Orange's emphasis on systems and long-term plans frustrates Red's desire for immediate action and recognition.",
      sv: "Rötts direkta, dominerande tillvägagångssätt strider mot Oranges strategiska, beräknande tänkande. Oranges betoning på system och långsiktiga planer frustrerar Rötts önskan om omedelbar handling och erkännande."
    },
    bridging: {
      en: "Create competitive frameworks that reward bold action within strategic contexts. Orange can provide channels for achievement that honor courage and decisive action, while Red can learn how calculated strategies amplify power and impact.",
      sv: "Skapa konkurrenskraftiga ramverk som belönar djärv handling inom strategiska sammanhang. Orange kan tillhandahålla kanaler för prestation som hedrar mod och beslutsamt handlande, medan Rött kan lära sig hur beräknande strategier förstärker makt och genomslag."
    }
  },
  "red-green": {
    en: "Green seeks to include and transform Red's power dynamics into shared empowerment, while Red gives Green the strength to stand up for its values. This relationship can be challenging but creates passionate activism and advocacy.",
    sv: "Grönt strävar efter att inkludera och omvandla Rötts maktdynamik till gemensam egenmakt, medan Rött ger Grönt styrkan att stå upp för sina värderingar. Denna relation kan vara utmanande men skapar passionerad aktivism och opinionsbildning.",
    clashes: {
      en: "Red's hierarchical, power-based approaches directly conflict with Green's egalitarian values and consensus processes. Green's emphasis on including all voices and perspectives frustrates Red's desire for decisive action and clear leadership.",
      sv: "Rötts hierarkiska, maktbaserade tillvägagångssätt strider direkt mot Grönts egalitära värderingar och konsensusprocesser. Grönts betoning på att inkludera alla röster och perspektiv frustrerar Rötts önskan om beslutsamt handlande och tydligt ledarskap."
    },
    bridging: {
      en: "Develop passionate advocacy that harnesses power for protection and justice. Green can recognize the need for strength and decisive action in fighting oppression, while Red can channel its power toward causes that benefit the collective.",
      sv: "Utveckla passionerat förespråkande som använder makt för skydd och rättvisa. Grönt kan erkänna behovet av styrka och beslutsamt handlande i kampen mot förtryck, medan Rött kan kanalisera sin makt mot ändamål som gynnar kollektivet."
    }
  },
  "red-yellow": {
    en: "Yellow understands and integrates Red's power drives into appropriate contexts, while Red provides Yellow with assertive energy. This combination allows for appropriate use of power and authority within complex systems.",
    sv: "Gult förstår och integrerar Rötts maktbehov i passande sammanhang, medan Rött ger Gult självsäker energi. Denna kombination möjliggör lämplig användning av makt och auktoritet inom komplexa system.",
    clashes: {
      en: "Red's straightforward power approach can appear crude and unrefined to Yellow's nuanced systems perspective. Yellow's complex, contextual thinking seems unnecessarily complicated and hesitant to Red's direct action orientation.",
      sv: "Rötts rättframma maktapproach kan framstå som rå och oraffinerad för Gults nyanserade systemperspektiv. Gults komplexa, kontextuella tänkande verkar onödigt komplicerat och tvekande för Rötts direkta handlingsorientering."
    },
    bridging: {
      en: "Identify appropriate contexts for decisive action within systems-aware frameworks. Yellow can create clear channels for power expression when needed, while Red can learn to flex its approach based on systemic understanding of different situations.",
      sv: "Identifiera lämpliga sammanhang för beslutsamt handlande inom systemmedvetna ramverk. Gult kan skapa tydliga kanaler för maktuttryck när det behövs, medan Rött kan lära sig att anpassa sitt tillvägagångssätt baserat på systemisk förståelse av olika situationer."
    }
  },
  "red-turquoise": {
    en: "Turquoise channels Red's vital agency into service of nested living systems, while Red provides Turquoise with the will and energy for decisive action. Together they create powerful responses to systemic challenges that require both courage and coordination.",
    sv: "Turkos kanaliserar Röds vitala agens i tjänst för kapslade levande system, medan Röd ger Turkos viljan och energin för beslutsamt handlande. Tillsammans skapar de kraftfulla svar på systemiska utmaningar som kräver både mod och samordning.",
    clashes: {
      en: "Turquoise's participatory approach and developmental responsibility can seem to constrain Red's immediate assertive action. Red's focus on personal power and direct impact can appear to ignore the systemic consequences that Turquoise recognizes.",
      sv: "Turkos deltagande tillvägagångssätt och utvecklingsansvar kan verka begränsa Röds omedelbara självsäkra handling. Röds fokus på personlig makt och direkt påverkan kan verka ignorera de systemiska konsekvenser som Turkos erkänner."
    },
    bridging: {
      en: "Develop bold interventions informed by understanding of living systems and multi-scale impacts. Turquoise can embrace Red's decisive energy when coordinated action is needed, while Red can direct its power toward challenges that serve nested systems rather than just personal gain.",
      sv: "Utveckla modiga interventioner informerade av förståelse för levande system och påverkan på flera skalor. Turkos kan omfamna Röds beslutsamma energi när samordnad handling behövs, medan Röd kan rikta sin kraft mot utmaningar som tjänar kapslade system snarare än bara personlig vinning."
    }
  },
  "red-coral": {
    en: "Coral transforms Red's raw power into creative evolutionary force, while Red provides Coral with the bold energy needed to manifest new possibilities. This combination creates revolutionary innovations that transform systems while maintaining individual sovereignty.",
    sv: "Korall omvandlar Rötts råa kraft till kreativ evolutionär energi, medan Rött ger Korall den djärva energi som behövs för att förverkliga nya möjligheter. Denna kombination skapar revolutionära innovationer som omformar system samtidigt som individuell suveränitet bevaras.",
    clashes: {
      en: "Red's focus on power through dominance can clash with Coral's emphasis on sovereignty that respects universal interconnection. Coral's complex integration of multiple dimensions can frustrate Red's preference for direct, simple power dynamics.",
      sv: "Rötts fokus på makt genom dominans kan kollidera med Koralls betoning på suveränitet som respekterar universell sammankoppling. Koralls komplexa integration av flera dimensioner kan frustrera Rötts preferens för direkta, enkla maktdynamiker."
    },
    bridging: {
      en: "Channel bold creative energy into transformative innovations that honor personal sovereignty. Coral can provide evolutionary contexts for heroic action, while Red can embrace how truly sovereign power transcends domination through creative force.",
      sv: "Kanalisera djärv kreativ energi till transformativa innovationer som hedrar personlig suveränitet. Korall kan tillhandahålla evolutionära sammanhang för heroiskt handlande, medan Rött kan omfamna hur verkligt suverän makt överskrider dominans genom kreativ kraft."
    }
  },
  "red-ultraviolet": {
    en: "Ultraviolet recognizes Red's power drives as expressions of primal life force, while Red provides Ultraviolet with manifestation energy. This relationship transforms domination into creative expression of infinite potential.",
    sv: "Ultraviolett ser Rötts maktdriv som uttryck för en ursprunglig livskraft, medan Rött ger Ultraviolett energi för manifestation. Denna relation omvandlar dominans till kreativt uttryck för oändlig potential.",
    clashes: {
      en: "Red's ego-based power orientation directly conflicts with Ultraviolet's dissolution of boundaries and separate self. Ultraviolet's boundless awareness can seem formless and ineffectual to Red's concrete power focus.",
      sv: "Rötts egobaserade maktorientering strider direkt mot Ultravioletts upplösning av gränser och separat själv. Ultravioletts gränslösa medvetenhet kan verka formlös och verkningslös för Rötts konkreta maktfokus."
    },
    bridging: {
      en: "Recognize the infinite power available when egoic dominance dissolves into creative expression of life force. Ultraviolet can honor the vital energy of assertive action, while Red can discover how surrendering to infinite flow unlocks greater power than personal dominance.",
      sv: "Inse den oändliga kraft som finns tillgänglig när egocentrisk dominans upplöses i kreativt uttryck av livskraft. Ultraviolett kan hedra den vitala energin i självsäkert handlande, medan Rött kan upptäcka hur överlämnande till oändligt flöde frigör större kraft än personlig dominans."
    }
  },
  "blue-orange": {
    en: "Orange innovates within Blue's stable frameworks, while Blue provides Orange with ethical boundaries and reliable infrastructure. This combination drives regulated markets, scientific research, and technological development within ethical frameworks.",
    sv: "Orange innoverar inom Blåtts stabila ramar, medan Blått ger Orange etiska gränser och pålitlig infrastruktur. Denna kombination driver reglerade marknader, vetenskaplig forskning och teknologisk utveckling inom etiska ramar.",
    clashes: {
      en: "Orange's innovation and competitive drives push against Blue's emphasis on following established rules and traditions. Blue's focus on standardization and proper procedure can stifle Orange's drive for efficiency and creative solutions.",
      sv: "Oranges innovation och konkurrensdrivkrafter trycker mot Blåtts betoning på att följa etablerade regler och traditioner. Blåtts fokus på standardisering och korrekt procedur kan kväva Oranges strävan efter effektivitet och kreativa lösningar."
    },
    bridging: {
      en: "Develop ethical innovation frameworks that allow progress while maintaining core principles. Blue can create adaptive regulations that preserve vital standards while allowing for innovation, while Orange can recognize how ethical boundaries create sustainable market conditions.",
      sv: "Utveckla etiska innovationsramverk som möjliggör framsteg samtidigt som kärnprinciper upprätthålls. Blått kan skapa adaptiva regleringar som bevarar viktiga standarder samtidigt som de tillåter innovation, medan Orange kan inse hur etiska gränser skapar hållbara marknadsförhållanden."
    }
  },
  "blue-green": {
    en: "Green expands Blue's principles to include diversity and equality, while Blue provides Green with structure and process. This relationship creates rights-based approaches to social justice and inclusive institutional reforms.",
    sv: "Grönt utvidgar Blåtts principer till att omfatta mångfald och jämlikhet, medan Blått ger Grönt struktur och processer. Denna relation skapar rättighetsbaserade tillvägagångssätt för social rättvisa och inkluderande institutionella reformer.",
    clashes: {
      en: "Green's emphasis on inclusion and situational ethics challenges Blue's reliance on universal standards and hierarchical structures. Blue's focus on rules and tradition can appear rigid and exclusionary to Green's emphasis on diverse perspectives.",
      sv: "Grönts betoning på inkludering och situationsetik utmanar Blåtts beroende av universella standarder och hierarkiska strukturer. Blåtts fokus på regler och tradition kan framstå som stelt och exkluderande för Grönts betoning på olika perspektiv."
    },
    bridging: {
      en: "Develop inclusive processes that respect order while ensuring equitable participation. Blue can expand its principles to embrace diversity and inclusion, while Green can appreciate how clear structures and processes help ensure consistent application of justice.",
      sv: "Utveckla inkluderande processer som respekterar ordning samtidigt som de säkerställer rättvist deltagande. Blått kan utvidga sina principer för att omfamna mångfald och inkludering, medan Grönt kan uppskatta hur tydliga strukturer och processer hjälper till att säkerställa konsekvent tillämpning av rättvisa."
    }
  },
  "blue-yellow": {
    en: "Yellow integrates Blue's principles into flexible, context-appropriate systems, while Blue gives Yellow stability and consistency. This combination creates adaptive governance that maintains core values while responding to changing conditions.",
    sv: "Gult integrerar Blåtts principer i flexibla, situationsanpassade system, medan Blått ger Gult stabilitet och konsekvens. Denna kombination skapar adaptivt styre som upprätthåller kärnvärden samtidigt som det svarar på förändrade förutsättningar.",
    clashes: {
      en: "Yellow's contextual, flexible approach conflicts with Blue's desire for consistent application of universal rules. Blue's standardized procedures can seem unnecessarily rigid to Yellow's adaptive, systems-focused mindset.",
      sv: "Gults kontextuella, flexibla tillvägagångssätt strider mot Blåtts önskan om konsekvent tillämpning av universella regler. Blåtts standardiserade procedurer kan verka onödigt stela för Gults adaptiva, systemfokuserade tankesätt."
    },
    bridging: {
      en: "Create principle-based frameworks that allow for contextual application within clear boundaries. Blue can distinguish between essential principles and flexible procedures, while Yellow can recognize the value of stable structures as platforms for adaptive responses.",
      sv: "Skapa principbaserade ramverk som möjliggör kontextuell tillämpning inom tydliga gränser. Blått kan särskilja mellan väsentliga principer och flexibla procedurer, medan Gult kan erkänna värdet av stabila strukturer som plattformar för adaptiva svar."
    }
  },
  "blue-turquoise": {
    en: "Turquoise brings meta-systemic understanding to Blue's structures of order, recognizing how coordinated systems can serve multi-generational wellbeing. Blue provides Turquoise with the discipline and institutional frameworks necessary for sustained coordination. Together they create regenerative governance systems.",
    sv: "Turkos tillför meta-systemisk förståelse till Blås ordningsstrukturer och erkänner hur samordnade system kan tjäna flerlagergenerationellt välbefinnande. Blå ger Turkos disciplinen och de institutionella ramverk som är nödvändiga för varaktig samordning. Tillsammans skapar de regenerativa styrningssystem.",
    clashes: {
      en: "Turquoise's adaptive, emergence-based approach can challenge Blue's preference for fixed rules and established hierarchies. Blue's insistence on proper authority and traditional order can seem rigid to Turquoise's understanding of evolving, living systems.",
      sv: "Turkos adaptiva, emergensbaserade tillvägagångssätt kan utmana Blås preferens för fasta regler och etablerade hierarkier. Blås insisterande på rättmätig auktoritet och traditionell ordning kan verka stel för Turkos förståelse av evolutionära, levande system."
    },
    bridging: {
      en: "Develop institutional frameworks that provide stability while allowing for adaptive emergence. Turquoise can appreciate how Blue's structures enable coordinated action at scale, while Blue can evolve its institutions to serve regenerative purposes and respond to changing conditions.",
      sv: "Utveckla institutionella ramverk som ger stabilitet samtidigt som de tillåter adaptiv framväxt. Turkos kan uppskatta hur Blås strukturer möjliggör samordnad handling i skala, medan Blå kan utveckla sina institutioner för att tjäna regenerativa syften och svara på föränderliga förhållanden."
    }
  },
  "blue-coral": {
    en: "Coral brings evolutionary creativity to Blue's principled structures, while Blue provides Coral with ethical foundations and practical organization. This combination creates value-aligned systems that can continuously evolve while maintaining coherence and integrity.",
    sv: "Korall tillför evolutionär kreativitet till Blåtts principbaserade strukturer, medan Blått ger Korall etisk grund och praktisk organisation. Denna kombination skapar värdegrundade system som kan utvecklas kontinuerligt samtidigt som sammanhang och integritet bevaras.",
    clashes: {
      en: "Coral's evolutionary creativity and sovereign expression can disrupt Blue's established structures and hierarchies. Blue's emphasis on standardized forms can constrain Coral's exploration of new paradigms and possibilities.",
      sv: "Koralls evolutionära kreativitet och suveräna uttryck kan störa Blåtts etablerade strukturer och hierarkier. Blåtts betoning på standardiserade former kan begränsa Koralls utforskning av nya paradigm och möjligheter."
    },
    bridging: {
      en: "Create evolution-capable systems grounded in enduring principles that maintain integrity while allowing for creative transformation. Blue can distinguish between timeless values and their contextual expressions, while Coral can channel creative force within ethical frameworks.",
      sv: "Skapa evolutionskapabla system grundade i bestående principer som upprätthåller integritet samtidigt som de tillåter kreativ transformation. Blått kan särskilja mellan tidlösa värden och deras kontextuella uttryck, medan Korall kan kanalisera kreativ kraft inom etiska ramverk."
    }
  },
  "blue-ultraviolet": {
    en: "Ultraviolet perceives the universal consciousness underlying Blue's moral principles, while Blue provides Ultraviolet with structured expression. This relationship reveals the infinite wisdom within orderly systems while transcending their limitations.",
    sv: "Ultraviolett uppfattar det universella medvetandet bakom Blåtts moraliska principer, medan Blått ger Ultraviolett strukturerat uttryck. Denna relation avslöjar den oändliga visdomen inom ordnade system samtidigt som deras begränsningar överskrids.",
    clashes: {
      en: "Ultraviolet's boundless awareness dissolves the distinct boundaries that Blue's structures require. Blue's focus on defined forms and clear rules can miss the infinite consciousness that Ultraviolet perceives beyond all forms.",
      sv: "Ultravioletts gränslösa medvetenhet upplöser de distinkta gränser som Blåtts strukturer kräver. Blåtts fokus på definierade former och tydliga regler kan missa det oändliga medvetande som Ultraviolett uppfattar bortom alla former."
    },
    bridging: {
      en: "Honor the universal awareness expressing through principled structures while recognizing their provisional nature. Blue can sense the boundless consciousness underlying its moral frameworks, while Ultraviolet can appreciate how structures provide accessible manifestations of infinite wisdom.",
      sv: "Hedra den universella medvetenhet som uttrycks genom principbaserade strukturer samtidigt som man erkänner deras provisoriska natur. Blått kan känna det gränslösa medvetande som ligger till grund för dess moraliska ramverk, medan Ultraviolett kan uppskatta hur strukturer tillhandahåller tillgängliga manifestationer av oändlig visdom."
    }
  },
  "orange-green": {
    en: "Green ensures Orange's innovations benefit everyone equally, while Orange gives Green practical effectiveness. This relationship, though often tense, creates sustainable business, stakeholder capitalism, and socially responsible innovation.",
    sv: "Grönt säkerställer att Oranges innovationer kommer alla till del, medan Orange ger Grönt praktisk effektivitet. Denna relation, som ofta är spänd, skapar hållbart företagande, intressentkapitalism och socialt ansvarstagande innovation.",
    clashes: {
      en: "Orange's competitive, meritocratic approach conflicts with Green's egalitarian values and consensus orientation. Green's emphasis on process and inclusion can frustrate Orange's drive for efficient action and measurable results.",
      sv: "Oranges konkurrenskraftiga, meritokratiska tillvägagångssätt strider mot Grönts egalitära värderingar och konsensusorientering. Grönts betoning på process och inkludering kan frustrera Oranges strävan efter effektiv handling och mätbara resultat."
    },
    bridging: {
      en: "Develop inclusive innovation processes that deliver measurable benefits across stakeholder groups. Orange can expand its metrics to include social and environmental impact, while Green can appreciate how efficiency and effectiveness enhance collective wellbeing.",
      sv: "Utveckla inkluderande innovationsprocesser som levererar mätbara fördelar över intressentgrupper. Orange kan utvidga sina mätvärden till att inkludera social och miljömässig påverkan, medan Grönt kan uppskatta hur effektivitet förbättrar kollektivt välbefinnande."
    }
  },
  "orange-yellow": {
    en: "Yellow integrates Orange's strategic thinking into flexible, systems-aware approaches, while Orange gives Yellow practical effectiveness. This combination creates adaptive organizations that balance innovation with systemic awareness.",
    sv: "Gult integrerar Oranges strategiska tänkande i flexibla, systemmedvetna tillvägagångssätt, medan Orange ger Gult praktisk effektivitet. Denna kombination skapar adaptiva organisationer som balanserar innovation med systeminsikt.",
    clashes: {
      en: "Orange's focus on standardized metrics and best practices can conflict with Yellow's contextual, adaptive approach. Yellow's systems perspective can seem overly theoretical and complex to Orange's results-oriented mindset.",
      sv: "Oranges fokus på standardiserade mätvärden och bästa praxis kan komma i konflikt med Gults kontextuella, adaptiva tillvägagångssätt. Gults systemperspektiv kan verka överdrivet teoretiskt och komplext för Oranges resultatinriktade tankesätt."
    },
    bridging: {
      en: "Create flexible performance frameworks that adapt to context while maintaining measurable outcomes. Orange can expand its strategic thinking to include systems awareness, while Yellow can appreciate the value of measurable results and practical implementation.",
      sv: "Skapa flexibla prestationsramverk som anpassar sig till sammanhanget samtidigt som mätbara resultat upprätthålls. Orange kan utvidga sitt strategiska tänkande till att inkludera systemmedvetenhet, medan Gult kan uppskatta värdet av mätbara resultat och praktiskt genomförande."
    }
  },
  "orange-turquoise": {
    en: "Turquoise aligns Orange's strategic effectiveness with multi-generational wellbeing and regenerative systems design, while Orange provides Turquoise with practical implementation capacity and measurable outcomes. Together they create innovations that work within planetary boundaries while delivering results.",
    sv: "Turkos anpassar Oranges strategiska effektivitet med flerlagergenerationellt välbefinnande och regenerativ systemdesign, medan Orange ger Turkos praktisk implementeringskapacitet och mätbara resultat. Tillsammans skapar de innovationer som fungerar inom planetära gränser samtidigt som de levererar resultat.",
    clashes: {
      en: "Orange's short-term optimization and competitive approaches can conflict with Turquoise's multi-scale, multi-generational thinking. Turquoise's participatory systems approach can seem impractical or inefficient to Orange's tactical, results-focused mindset.",
      sv: "Oranges kortsiktig optimering och konkurrenskraftiga tillvägagångssätt kan komma i konflikt med Turkos multiskalära, flerlagergenerationella tänkande. Turkos deltagande systemtillvägagångssätt kan verka opraktiskt eller ineffektivt för Oranges taktiska, resultatinriktade tankesätt."
    },
    bridging: {
      en: "Develop regenerative business models and innovations that deliver both immediate results and long-term systemic health. Orange can expand its success metrics to include ecological and social impacts across time scales, while Turquoise can appreciate how strategic effectiveness enables large-scale transformation.",
      sv: "Utveckla regenerativa affärsmodeller och innovationer som levererar både omedelbara resultat och långsiktig systemisk hälsa. Orange kan utvidga sina framgångsmått till att inkludera ekologiska och sociala påverkningar över tidsskalor, medan Turkos kan uppskatta hur strategisk effektivitet möjliggör storskalig transformation."
    }
  },
  "orange-coral": {
    en: "Coral brings evolutionary creativity to Orange's strategic effectiveness, while Orange gives Coral the practical means to manifest innovative visions. This relationship creates pioneering ventures that transform industries while delivering tangible results.",
    sv: "Korall tillför evolutionär kreativitet till Oranges strategiska effektivitet, medan Orange ger Korall de praktiska medel som behövs för att förverkliga innovativa visioner. Denna relation skapar banbrytande initiativ som omformar industrier och ger konkreta resultat.",
    clashes: {
      en: "Orange's focus on known metrics and proven methods can resist Coral's exploration of unprecedented possibilities. Coral's evolutionary perspective can seem impractical or too revolutionary to Orange's results-focused approach.",
      sv: "Oranges fokus på kända mätvärden och beprövade metoder kan motsätta sig Koralls utforskning av tidigare okända möjligheter. Koralls evolutionära perspektiv kan verka opraktiskt eller alltför revolutionerande för Oranges resultatinriktade tillvägagångssätt."
    },
    bridging: {
      en: "Create transformative innovation processes that balance creative exploration with practical implementation. Orange can expand its success metrics to include breakthrough potential, while Coral can ground its visionary creativity in practical steps and measurable outcomes.",
      sv: "Skapa transformativa innovationsprocesser som balanserar kreativ utforskning med praktiskt genomförande. Orange kan utvidga sina framgångsmått till att inkludera genombrottspotential, medan Korall kan grunda sin visionära kreativitet i praktiska steg och mätbara resultat."
    }
  },
  "orange-ultraviolet": {
    en: "Ultraviolet perceives the infinite potential within Orange's achievement orientation, while Orange provides Ultraviolet with practical manifestation capacity. This relationship transforms strategic excellence into expressions of boundless possibility.",
    sv: "Ultraviolett ser den oändliga potentialen i Oranges resultatorientering, medan Orange ger Ultraviolett förmågan till praktisk manifestation. Denna relation omvandlar strategisk briljans till uttryck för gränslösa möjligheter.",
    clashes: {
      en: "Orange's focus on defined outcomes and measurable results conflicts with Ultraviolet's openness to infinite possibility beyond specific forms. Ultraviolet's boundless awareness can seem impractical and unfocused to Orange's strategic mindset.",
      sv: "Oranges fokus på definierade resultat och mätbara utfall står i konflikt med Ultravioletts öppenhet för oändlig möjlighet bortom specifika former. Ultravioletts gränslösa medvetenhet kan verka opraktisk och ofokuserad för Oranges strategiska tankesätt."
    },
    bridging: {
      en: "Allow infinite awareness to inspire breakthrough innovation while maintaining practical implementation paths. Orange can open to possibilities beyond current metrics and models, while Ultraviolet can appreciate how concrete manifestation brings infinite potential into tangible expression.",
      sv: "Låt oändlig medvetenhet inspirera genombrottsinnovation samtidigt som praktiska implementeringsvägar upprätthålls. Orange kan öppna för möjligheter bortom nuvarande mätvärden och modeller, medan Ultraviolett kan uppskatta hur konkret manifestation för oändlig potential till påtagligt uttryck."
    }
  },
  "green-yellow": {
    en: "Yellow integrates Green's inclusive values while adding systemic effectiveness, while Green gives Yellow humanitarian depth. This powerful combination creates effective approaches to complex social and environmental challenges.",
    sv: "Gult integrerar Grönts inkluderande värderingar och tillför systemeffektivitet, medan Grönt ger Gult humanitärt djup. Denna kraftfulla kombination skapar effektiva lösningar på komplexa sociala och miljömässiga utmaningar.",
    clashes: {
      en: "Yellow's pragmatic, sometimes hierarchical solutions can conflict with Green's strict egalitarianism and consensus processes. Green's emphasis on subjective experience and emotional processing can frustrate Yellow's focus on functional effectiveness.",
      sv: "Gults pragmatiska, ibland hierarkiska lösningar kan hamna i konflikt med Grönts strikta egalitarism och konsensusprocesser. Grönts betoning på subjektiv upplevelse och emotionell bearbetning kan frustrera Gults fokus på funktionell effektivitet."
    },
    bridging: {
      en: "Create inclusive systems thinking that honors diverse perspectives while enabling effective action. Yellow can incorporate emotional intelligence and stakeholder wellbeing into its systems designs, while Green can appreciate how functional hierarchy and diverse roles can serve inclusive outcomes.",
      sv: "Skapa inkluderande systemtänkande som hedrar olika perspektiv samtidigt som det möjliggör effektiv handling. Gult kan införliva emotionell intelligens och intressenters välbefinnande i sina systemdesigner, medan Grönt kan uppskatta hur funktionell hierarki och olika roller kan tjäna inkluderande resultat."
    }
  },
  "green-turquoise": {
    en: "Turquoise expands Green's social consciousness to include multi-species and multi-generational perspectives through meta-systemic understanding, while Green grounds Turquoise in relational care and community practice. Together they foster transformation that honors both human connection and planetary thriving.",
    sv: "Turkos utvidgar Grönts sociala medvetenhet till att omfatta flerspecie- och flerlagergenerationella perspektiv genom meta-systemisk förståelse, medan Grönt förankrar Turkos i relationell omsorg och gemenskapspraktik. Tillsammans främjar de transformation som hedrar både mänsklig koppling och planetens blomstrande.",
    clashes: {
      en: "Green's focus on human equality and social justice can seem anthropocentric to Turquoise's understanding of nested systems that include all life. Turquoise's multi-scale systems perspective can appear to deprioritize immediate human suffering in ways that challenge Green's humanistic values.",
      sv: "Grönts fokus på mänsklig jämlikhet och social rättvisa kan verka antropocentrisk för Turkos förståelse av kapslade system som inkluderar allt liv. Turkos multiskalära systemperspektiv kan verka nedprioritera omedelbart mänskligt lidande på sätt som utmanar Grönts humanistiska värderingar."
    },
    bridging: {
      en: "Expand social justice to include ecological and intergenerational justice through multi-scale coordination. Green can extend its circle of care to all living systems while maintaining relational depth, while Turquoise can ensure its systems understanding includes addressing immediate human needs and social inequities.",
      sv: "Utvidga social rättvisa till att inkludera ekologisk och intergenerationell rättvisa genom multiskalär samordning. Grönt kan utöka sin omsorgsradie till alla levande system samtidigt som det behåller relationsdjup, medan Turkos kan säkerställa att dess systemförståelse inkluderar hantering av omedelbara mänskliga behov och sociala orättvisor."
    }
  },
  "green-coral": {
    en: "Coral brings evolutionary creativity to Green's inclusive community orientation, while Green provides Coral with relational depth and compassionate awareness. This combination creates innovative social systems that honor both individual uniqueness and collective harmony.",
    sv: "Korall tillför evolutionär kreativitet till Grönts inkluderande gemenskapsinriktning, medan Grönt ger Korall relationsdjup och medkännande medvetenhet. Denna kombination skapar innovativa sociala system som hedrar både individuell unikhet och kollektiv harmoni.",
    clashes: {
      en: "Coral's emphasis on individual sovereignty and creative expression can challenge Green's focus on group consensus and equal voice. Green's emphasis on collective identity can feel constraining to Coral's evolution-driven innovation.",
      sv: "Koralls betoning på individuell suveränitet och kreativt uttryck kan utmana Grönts fokus på gruppkonsensus och lika röst. Grönts betoning på kollektiv identitet kan kännas begränsande för Koralls evolutionsdrivna innovation."
    },
    bridging: {
      en: "Create communities that foster both authentic self-expression and deep interconnection. Green can recognize how sovereign creativity serves collective evolution, while Coral can value how relational inclusion enriches evolutionary possibilities.",
      sv: "Skapa gemenskaper som främjar både autentiskt självuttryck och djup sammankoppling. Grönt kan inse hur suverän kreativitet tjänar kollektiv evolution, medan Korall kan värdera hur relationell inkludering berikar evolutionära möjligheter."
    }
  },
  "green-ultraviolet": {
    en: "Ultraviolet reveals the universal unity underlying Green's inclusive consciousness, while Green provides Ultraviolet with relational warmth and compassion. This relationship transforms human connection into expressions of boundless love and awareness.",
    sv: "Ultraviolett avslöjar den universella enhet som ligger till grund för Grönts inkluderande medvetande, medan Grönt ger Ultraviolett relationell värme och medkänsla. Denna relation omvandlar mänsklig kontakt till uttryck för gränslös kärlek och medvetenhet.",
    clashes: {
      en: "Green's emphasis on distinct group identities and human-centered values can limit Ultraviolet's boundless awareness that transcends all separation. Ultraviolet's dissolution of boundaries can seem to undermine Green's focus on honoring specific cultural and social identities.",
      sv: "Grönts betoning på distinkta gruppidentiteter och människocentrerade värderingar kan begränsa Ultravioletts gränslösa medvetenhet som överskrider all separation. Ultravioletts upplösning av gränser kan verka undergräva Grönts fokus på att hedra specifika kulturella och sociala identiteter."
    },
    bridging: {
      en: "Honor both the unique expressions of diverse beings and the boundless unity that embraces all. Green can recognize the universal consciousness within diverse expressions, while Ultraviolet can appreciate how specific forms of care and inclusion manifest infinite love.",
      sv: "Hedra både de unika uttrycken av olika varelser och den gränslösa enhet som omfamnar alla. Grönt kan erkänna det universella medvetandet inom olika uttryck, medan Ultraviolett kan uppskatta hur specifika former av omsorg och inkludering manifesterar oändlig kärlek."
    }
  },
  "yellow-turquoise": {
    en: "Turquoise brings meta-systemic awareness to Yellow's systems thinking, shifting from analyzing complexity to participating within it. Yellow provides Turquoise with analytical rigor and functional coherence. Together they move from mapping systems to cultivating conditions where transformation can emerge.",
    sv: "Turkos tillför meta-systemisk medvetenhet till Gults systemtänkande, och skiftar från att analysera komplexitet till att delta inom den. Gult ger Turkos analytisk stringens och funktionell koherens. Tillsammans rör de sig från att kartlägga system till att odla förutsättningar där transformation kan uppstå.",
    clashes: {
      en: "Yellow's analytical stance can treat systems as objects to optimize rather than recognizing itself as embedded within them. Turquoise's participatory approach can seem to sacrifice the precision and functional clarity that Yellow values, leading to what Yellow perceives as vague holism.",
      sv: "Gults analytiska hållning kan behandla system som objekt att optimera snarare än att erkänna sig själv som innesluten i dem. Turkos deltagande tillvägagångssätt kan verka offra den precision och funktionella klarhet som Gult värdesätter, vilket leder till vad Gult uppfattar som vag holism."
    },
    bridging: {
      en: "Recognize how analytical systems thinking becomes participatory meta-systemic awareness—not by abandoning rigor but by including the observer within the system. Yellow can embrace its embeddedness without losing analytical clarity, while Turquoise can ground its participatory approach in functional understanding and measurable outcomes.",
      sv: "Inse hur analytiskt systemtänkande blir deltagande meta-systemisk medvetenhet—inte genom att överge stringens utan genom att inkludera observatören i systemet. Gult kan omfamna sin inneslutning utan att förlora analytisk klarhet, medan Turkos kan förankra sitt deltagande tillvägagångssätt i funktionell förståelse och mätbara resultat."
    }
  },
  "yellow-coral": {
    en: "Coral brings evolutionary creativity to Yellow's systemic understanding, while Yellow provides Coral with functional integration across complex systems. This powerful combination creates transformative innovations that work effectively across multiple domains and scales.",
    sv: "Korall tillför evolutionär kreativitet till Gults systemförståelse, medan Gult ger Korall funktionell integration över komplexa system. Denna kraftfulla kombination skapar transformativa innovationer som fungerar effektivt över flera domäner och skalor.",
    clashes: {
      en: "Yellow's systems focus can sometimes seem too analytical and technical to Coral's sovereign creative expression. Coral's evolutionary impulse can sometimes push beyond the functional constraints that Yellow recognizes as necessary within complex systems.",
      sv: "Gults systemfokus kan ibland verka för analytiskt och tekniskt för Koralls suveräna kreativa uttryck. Koralls evolutionära impuls kan ibland trycka bortom de funktionella begränsningar som Gult erkänner som nödvändiga inom komplexa system."
    },
    bridging: {
      en: "Develop evolutionary systems that provide functional scaffolding for creative transformation. Yellow can embrace evolutionary creativity within its systems understanding, while Coral can value how functional analysis helps manifest visionary possibilities within complex realities.",
      sv: "Utveckla evolutionära system som tillhandahåller funktionell stöttning för kreativ transformation. Gult kan omfamna evolutionär kreativitet inom sin systemförståelse, medan Korall kan värdera hur funktionell analys hjälper till att manifestera visionära möjligheter inom komplexa verkligheter."
    }
  },
  "yellow-ultraviolet": {
    en: "Ultraviolet reveals the infinite awareness underlying Yellow's integrative systems thinking, while Yellow gives Ultraviolet practical coherence. This relationship creates fluid yet functional expressions of boundless consciousness within complex adaptive systems.",
    sv: "Ultraviolett avslöjar den oändliga medvetenhet som ligger bakom Gults integrativa systemtänkande, medan Gult ger Ultraviolett praktisk samstämmighet. Denna relation skapar flytande men funktionella uttryck för gränslöst medvetande inom komplexa adaptiva system.",
    clashes: {
      en: "Yellow's focus on distinct systems and functional relationships can limit Ultraviolet's non-dual awareness that transcends all separation. Ultraviolet's boundless perspective can seem to dissolve the practical distinctions Yellow requires for functional effectiveness.",
      sv: "Gults fokus på distinkta system och funktionella relationer kan begränsa Ultravioletts icke-dualistiska medvetenhet som överskrider all separation. Ultravioletts gränslösa perspektiv kan verka upplösa de praktiska distinktioner som Gult kräver för funktionell effektivitet."
    },
    bridging: {
      en: "Recognize how boundless awareness can manifest through functional systems that maintain practical coherence. Yellow can open to the infinite consciousness underlying all systems, while Ultraviolet can appreciate how practical distinctions facilitate the expression of boundless potential.",
      sv: "Inse hur gränslös medvetenhet kan manifesteras genom funktionella system som upprätthåller praktisk sammanhang. Gult kan öppna för det oändliga medvetande som ligger bakom alla system, medan Ultraviolett kan uppskatta hur praktiska distinktioner underlättar uttrycket av gränslös potential."
    }
  },
  "turquoise-coral": {
    en: "Coral brings sovereign creative agency to Turquoise's participatory systems awareness, while Turquoise provides Coral with understanding of nested, living systems. This combination enables evolutionary innovations that serve planetary wellbeing while honoring unique creative expression.",
    sv: "Korall tillför suverän kreativ agens till Turkos deltagande systemmedvetenhet, medan Turkos ger Korall förståelse för kapslade, levande system. Denna kombination möjliggör evolutionära innovationer som tjänar planetens välbefinnande samtidigt som unikt kreativt uttryck hedras.",
    clashes: {
      en: "Turquoise's emphasis on participatory embeddedness within systems can seem to limit Coral's focus on sovereign creative agency and unique contribution. Coral's evolutionary creativity can push against Turquoise's recognition of systemic constraints and interdependencies.",
      sv: "Turkos betoning på deltagande inneslutning inom system kan verka begränsa Koralls fokus på suverän kreativ agens och unikt bidrag. Koralls evolutionära kreativitet kan trycka mot Turkos erkännande av systemiska begränsningar och ömsesidiga beroenden."
    },
    bridging: {
      en: "Honor how unique creative expression operates within—and transforms—living systems. Turquoise can recognize how sovereign creativity serves systemic evolution, while Coral can appreciate how understanding systemic interdependencies enriches rather than constrains creative potential.",
      sv: "Hedra hur unikt kreativt uttryck opererar inom—och transformerar—levande system. Turkos kan erkänna hur suverän kreativitet tjänar systemisk evolution, medan Korall kan uppskatta hur förståelse för systemiska ömsesidiga beroenden berikar snarare än begränsar kreativ potential."
    }
  },
  "turquoise-ultraviolet": {
    en: "Ultraviolet reveals the boundless awareness underlying Turquoise's participatory systems consciousness, while Turquoise gives Ultraviolet coherent expression through nested, living systems. This relationship creates fluid expressions of presence through planetary-scale coordination.",
    sv: "Ultraviolett avslöjar den gränslösa medvetenhet som ligger bakom Turkos deltagande systemmedvetande, medan Turkos ger Ultraviolett samstämmigt uttryck genom kapslade, levande system. Denna relation skapar flytande uttryck för närvaro genom planetär-skala koordinering.",
    clashes: {
      en: "Turquoise's focus on meta-systemic understanding and developmental responsibility can seem too structured to Ultraviolet's infinite openness beyond all frameworks. Ultraviolet's boundless awareness can dissolve the functional distinctions that Turquoise recognizes as necessary for coordinated action.",
      sv: "Turkos fokus på meta-systemisk förståelse och utvecklingsansvar kan verka för strukturerat för Ultravioletts oändliga öppenhet bortom alla ramverk. Ultravioletts gränslösa medvetenhet kan upplösa de funktionella distinktioner som Turkos erkänner som nödvändiga för koordinerad handling."
    },
    bridging: {
      en: "Recognize how boundless awareness can manifest through participatory coordination within living systems. Turquoise can open to the infinite potential beyond all systemic frameworks while maintaining functional coherence, while Ultraviolet can appreciate how meta-systemic coordination provides pathways for presence to manifest at scale.",
      sv: "Inse hur gränslös medvetenhet kan manifesteras genom deltagande koordinering inom levande system. Turkos kan öppna för den oändliga potentialen bortom alla systemiska ramverk samtidigt som funktionell koherens upprätthålls, medan Ultraviolett kan uppskatta hur meta-systemisk koordinering tillhandahåller vägar för närvaro att manifesteras i skala."
    }
  },
  "coral-ultraviolet": {
    en: "Ultraviolet brings infinite flow to Coral's creative sovereignty, while Coral gives Ultraviolet unique evolutionary expression. This relationship represents the dance between infinite potential and its manifestation through conscious evolution.",
    sv: "Ultraviolett tillför ett oändligt flöde till Koralls kreativa suveränitet, medan Korall ger Ultraviolett ett unikt evolutionärt uttryck. Denna relation representerar dansen mellan oändlig potential och dess manifestation genom medveten evolution.",
    clashes: {
      en: "Coral's emphasis on distinct creative identity and evolutionary purpose can limit Ultraviolet's non-dual awareness beyond all separation. Ultraviolet's dissolution of boundaries can undermine the sovereign agency that Coral requires for creative manifestation.",
      sv: "Koralls betoning på distinkt kreativ identitet och evolutionärt syfte kan begränsa Ultravioletts icke-dualistiska medvetenhet bortom all separation. Ultravioletts upplösning av gränser kan undergräva den suveräna agenturen som Korall kräver för kreativ manifestation."
    },
    bridging: {
      en: "Honor the dance between sovereign creativity and boundless awareness, recognizing their complementary nature. Coral can embrace the infinite source from which all creative impulses arise, while Ultraviolet can appreciate how sovereign expression gives form to boundless potential.",
      sv: "Hedra dansen mellan suverän kreativitet och gränslös medvetenhet, och erkänn deras komplementära natur. Korall kan omfamna den oändliga källan från vilken alla kreativa impulser uppstår, medan Ultraviolett kan uppskatta hur suveränt uttryck ger form åt gränslös potential."
    }
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
      title: "Stage Comparison Matrix",
      subtitle: "Explore how different Spiral Dynamics stages interact with each other. Select two stages through their meeting point in the matrix or by clicking their names in the two columns below to see their relationship dynamics, potential synergies, and challenges."
  },
  sv: {
      title: "Stadie-jämförelsematris",
      subtitle: "Utforska hur olika Spiral Dynamics-stadier interagerar med varandra. Välj två stadier via deras mötespunkt i matrisen eller genom att klicka deras namn i de två kolumnerna nedanför för att se deras relationsdynamik, potentiella synergier och utmaningar."
  }
};
