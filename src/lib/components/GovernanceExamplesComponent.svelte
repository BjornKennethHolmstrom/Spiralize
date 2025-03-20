<script lang="ts">
  import { onMount } from 'svelte';
  import languageStore from '$lib/stores/languageStore';

  // Use exported prop with default value
  export let language = 'en';
  
  // State variables
  let activeTab = 'historical';
  
  // Use the imported stage colors
  const stageColors = {
    beige: '#E5D0BA',
    purple: '#9B6B9E',
    red: '#E25A53',
    blue: '#4A72B2',
    orange: '#FF7F27',
    green: '#7AB55C',
    yellow: '#FFD700',
    turquoise: '#40E0D0',
    coral: '#FF6F61',
    ultraviolet: '#9932CC'
  };
  
  // Translations for the component
  const translations = {
    en: {
      title: "Real-World Examples of Governance Models",
      description: "Explore historical, contemporary, and fictional examples of how different governance structures manifest across the spiral.",
      tabHistorical: "Historical",
      tabContemporary: "Contemporary",
      tabFictional: "Fictional",
      viewAll: "View All",
      noExamples: "No examples available for this category."
    },
    sv: {
      title: "Verkliga Exempel på Styrningsmodeller",
      description: "Utforska historiska, samtida och fiktiva exempel på hur olika styrningsstrukturer manifesterar sig genom spiralen.",
      tabHistorical: "Historiska",
      tabContemporary: "Samtida",
      tabFictional: "Fiktiva",
      viewAll: "Visa Alla",
      noExamples: "Inga exempel tillgängliga för denna kategori."
    }
  };
  
  // Governance examples data structure
  const governanceExamples = {
    beige: {
      en: {
        title: "Survival Band Governance Examples",
        historical: [
          {
            name: "Early Paleolithic Hunter-Gatherers",
            description: "The earliest human groups (circa 200,000+ years ago) organized primarily around immediate survival needs with minimal formal leadership structures."
          },
          {
            name: "Refugee Crisis Camps",
            description: "In the initial phases of humanitarian crises, such as the 2015 European refugee crisis or 2010 Haiti earthquake aftermath, spontaneous survival-oriented governance emerged before formal systems could be established."
          }
        ],
        contemporary: [
          {
            name: "Disaster Response Self-Organization",
            description: "After Hurricane Katrina (2005), residents in isolated areas of New Orleans formed temporary survival bands with informal leadership based on practical skills and resource access."
          },
          {
            name: "Homeless Encampments",
            description: "Some autonomous homeless communities develop minimal governance structures focused on immediate resource distribution and protection."
          }
        ],
        fictional: [
          {
            name: "The Walking Dead (TV Series)",
            description: "The initial survival groups formed after the zombie apocalypse demonstrate classic Beige governance with leadership based solely on survival utility."
          },
          {
            name: "Lord of the Flies (Novel)",
            description: "The boys' initial attempts at organization on the island illustrate the emergence of basic survival-oriented governance."
          }
        ]
      },
      sv: {
        title: "Exempel på Överlevnadsbaserad Styrning",
        historical: [
          {
            name: "Tidiga Paleolitiska Jägare-Samlare",
            description: "De tidigaste mänskliga grupperna (cirka 200 000+ år sedan) organiserades främst kring omedelbara överlevnadsbehov med minimala formella ledarskapsstrukturer."
          },
          {
            name: "Flyktingkrisläger",
            description: "I de inledande faserna av humanitära kriser, såsom den europeiska flyktingkrisen 2015 eller efterdyningarna av jordbävningen i Haiti 2010, uppstod spontan överlevnadsorienterad styrning innan formella system kunde etableras."
          }
        ],
        contemporary: [
          {
            name: "Självorganisation vid Katastrofinsatser",
            description: "Efter orkanen Katrina (2005) bildade invånare i isolerade områden i New Orleans tillfälliga överlevnadsband med informellt ledarskap baserat på praktiska färdigheter och resurstillgång."
          },
          {
            name: "Hemlösa Bosättningar",
            description: "Vissa autonoma hemlösa gemenskaper utvecklar minimala styrningsstrukturer fokuserade på omedelbar resursfördelning och skydd."
          }
        ],
        fictional: [
          {
            name: "The Walking Dead (TV-serie)",
            description: "De initiala överlevnadsgrupperna som bildades efter zombieapokalypsen visar klassisk Beige-styrning med ledarskap baserat enbart på överlevnadsnytta."
          },
          {
            name: "Flugornas Herre (Roman)",
            description: "Pojkarnas första försök till organisation på ön illustrerar framväxten av grundläggande överlevnadsorienterad styrning."
          }
        ]
      }
    },
    purple: {
      en: {
        title: "Tribal Governance Examples",
        historical: [
          {
            name: "Pre-colonial Indigenous Governance",
            description: "Many Native American tribes, such as the Iroquois Confederacy, governed through elder councils, clan systems, and traditions that preserved cultural continuity and spiritual alignment."
          },
          {
            name: "Medieval Clan Structures",
            description: "Scottish clans (13th-18th centuries) operated with chieftains whose authority derived from ancestral lineage and community traditions."
          }
        ],
        contemporary: [
          {
            name: "Indigenous Autonomous Regions",
            description: "Contemporary examples include the Sami Parliament in Scandinavia and First Nations band governance in Canada, which blend traditional cultural governance with modern forms."
          },
          {
            name: "Traditional Religious Communities",
            description: "Amish communities in North America and some Hasidic Jewish communities maintain governance through religious elders and tradition-based decision-making."
          },
          {
            name: "Indigenous Knowledge Governance",
            description: "The governance of traditional ecological knowledge by Aboriginal Australian communities emphasizes ancestral wisdom and spiritual connection to land."
          }
        ],
        fictional: [
          {
            name: "Wakanda (Black Panther)",
            description: "While technologically advanced, Wakanda's governance includes tribal councils and ritual-based succession that draws heavily on tradition and cultural continuity."
          },
          {
            name: "The Fremen (Dune)",
            description: "Frank Herbert's Fremen society operates through tribal governance with spiritual and ancestral traditions directing social organization."
          }
        ]
      },
      sv: {
        title: "Exempel på Stambaserad Styrning",
        historical: [
          {
            name: "Förkolonial Ursprungsbefolkningsstyrning",
            description: "Många nordamerikanska ursprungsstammar, såsom Irokesförbundet, styrde genom äldsteråd, klansystem och traditioner som bevarade kulturell kontinuitet och andlig anpassning."
          },
          {
            name: "Medeltida Klanstrukturer",
            description: "Skotska klaner (13-18:e århundradet) opererade med hövdingar vars auktoritet härstammade från förfäders härstamning och gemenskapstraditioner."
          }
        ],
        contemporary: [
          {
            name: "Ursprungsbefolkningars Autonoma Regioner",
            description: "Samtida exempel inkluderar Samiska Parlamentet i Skandinavien och First Nations band-styrning i Kanada, som blandar traditionell kulturell styrning med moderna former."
          },
          {
            name: "Traditionella Religiösa Gemenskaper",
            description: "Amish-gemenskaper i Nordamerika och vissa hasidiska judiska gemenskaper upprätthåller styrning genom religiösa äldste och traditionsbaserat beslutsfattande."
          },
          {
            name: "Ursprungskunskap Styrning",
            description: "Styrningen av traditionell ekologisk kunskap av Aboriginska Australiensiska gemenskaper betonar förfäders visdom och andlig koppling till land."
          }
        ],
        fictional: [
          {
            name: "Wakanda (Black Panther)",
            description: "Trots teknologisk avancering inkluderar Wakandas styrning stamråd och ritualbaserad succession som bygger starkt på tradition och kulturell kontinuitet."
          },
          {
            name: "Fremen (Dune)",
            description: "Frank Herberts Fremen-samhälle fungerar genom stamstyrning med andliga och förfaderstraditioner som styr social organisation."
          }
        ]
      }
    },
    red: {
      en: {
        title: "Authoritarian Governance Examples",
        historical: [
          {
            name: "Genghis Khan's Mongol Empire",
            description: "The 13th-century Mongol Empire exemplified Red governance with power concentrated in a charismatic leader who demanded absolute loyalty and used fear to maintain control."
          },
          {
            name: "Medieval Warlord Territories",
            description: "During Europe's Dark Ages, regional warlords established territories based on military strength, with governance through direct command and personal loyalty."
          }
        ],
        contemporary: [
          {
            name: "Military Juntas",
            description: "Modern examples include Myanmar under military rule (1962-2011, 2021-present) where governance operates through command structures with minimal institutional constraints."
          },
          {
            name: "Authoritarian Dictatorships",
            description: "North Korea under the Kim dynasty represents Red governance with absolute power concentrated in a single leader, cult of personality, and rule through fear and loyalty."
          },
          {
            name: "Cartel-Controlled Territories",
            description: "In parts of Mexico and Colombia, drug cartels have established de facto governance based on strength, fear, and personal loyalty to leaders."
          }
        ],
        fictional: [
          {
            name: "Game of Thrones",
            description: "Many of the warring factions in Westeros, particularly under rulers like Joffrey Baratheon, demonstrate classic Red governance driven by power, fear, and personal loyalty."
          },
          {
            name: "Immortan Joe's Citadel (Mad Max: Fury Road)",
            description: "A post-apocalyptic example of Red governance based on resource control, strength, and cult of personality."
          }
        ]
      },
      sv: {
        title: "Exempel på Auktoritär Styrning",
        historical: [
          {
            name: "Djingis Khans Mongoliska Imperium",
            description: "Det mongoliska imperiet från 1200-talet exemplifierade Röd styrning med makt koncentrerad till en karismatisk ledare som krävde absolut lojalitet och använde rädsla för att upprätthålla kontroll."
          },
          {
            name: "Medeltida Krigsherreområden",
            description: "Under Europas mörka medeltid etablerade regionala krigsherrar territorier baserade på militär styrka, med styrning genom direkt kommando och personlig lojalitet."
          }
        ],
        contemporary: [
          {
            name: "Militärjuntor",
            description: "Moderna exempel inkluderar Myanmar under militärt styre (1962-2011, 2021-nutid) där styrning fungerar genom kommandostrukturer med minimala institutionella begränsningar."
          },
          {
            name: "Auktoritära Diktaturer",
            description: "Nordkorea under Kim-dynastin representerar Röd styrning med absolut makt koncentrerad till en enda ledare, personlighetskult och styre genom rädsla och lojalitet."
          },
          {
            name: "Kartellkontrollerade Territorier",
            description: "I delar av Mexiko och Colombia har drogkarteller etablerat de facto-styrning baserad på styrka, rädsla och personlig lojalitet till ledare."
          }
        ],
        fictional: [
          {
            name: "Game of Thrones",
            description: "Många av de stridande fraktionerna i Westeros, särskilt under härskare som Joffrey Baratheon, uppvisar klassisk Röd styrning driven av makt, rädsla och personlig lojalitet."
          },
          {
            name: "Immortan Joes Citadell (Mad Max: Fury Road)",
            description: "Ett post-apokalyptiskt exempel på Röd styrning baserad på resurskontroll, styrka och personlighetskult."
          }
        ]
      }
    },
    blue: {
      en: {
        title: "Rule of Law Governance Examples",
        historical: [
          {
            name: "Roman Republic's Legal System",
            description: "The Roman Republic (509-27 BCE) developed formalized legal codes and governmental structures with defined roles, exemplifying early Blue governance principles."
          },
          {
            name: "Medieval Catholic Church Governance",
            description: "The Catholic Church developed elaborate hierarchical structures with clear roles, procedures, and moral codes that exemplified Blue governance."
          },
          {
            name: "British Empire Colonial Administration",
            description: "The British colonial system established rigid bureaucratic structures with clearly defined procedures and rules across its territories."
          }
        ],
        contemporary: [
          {
            name: "Singapore's Governance Model",
            description: "Singapore has developed a highly structured system with clear rules, strong institutions, and an emphasis on order, efficiency, and moral rectitude."
          },
          {
            name: "Germany's Constitutional Democracy",
            description: "Germany's post-WWII governance emphasizes proper procedures, rule of law, and institutional stability as reactions to historical chaos."
          },
          {
            name: "Switzerland's Constitutional System",
            description: "Switzerland's governance combines direct democracy with strong constitutional principles and structured procedures for citizen participation."
          }
        ],
        fictional: [
          {
            name: "The Galactic Republic (Star Wars)",
            description: "Before its fall, the Galactic Republic operated as a bureaucratic system with elaborate procedures, formal positions, and constitutional principles."
          },
          {
            name: "The Ministry of Magic (Harry Potter)",
            description: "Magical Britain's governance shows classic Blue characteristics with its rigid hierarchies, formal departments, and rule-based approach to maintaining order."
          }
        ]
      },
      sv: {
        title: "Exempel på Rättsstatlig Styrning",
        historical: [
          {
            name: "Romerska Republikens Rättssystem",
            description: "Den Romerska Republiken (509-27 f.Kr.) utvecklade formaliserade juridiska koder och statliga strukturer med definierade roller, vilket exemplifierar tidiga Blå styrningsprinciper."
          },
          {
            name: "Medeltida Katolska Kyrkans Styrning",
            description: "Katolska kyrkan utvecklade utarbetade hierarkiska strukturer med tydliga roller, procedurer och moralkoder som exemplifierade Blå styrning."
          },
          {
            name: "Brittiska Imperiets Kolonialadministration",
            description: "Det brittiska kolonialsystemet etablerade strikta byråkratiska strukturer med tydligt definierade procedurer och regler över dess territorier."
          }
        ],
        contemporary: [
          {
            name: "Singapores Styrningsmodell",
            description: "Singapore har utvecklat ett mycket strukturerat system med tydliga regler, starka institutioner och betoning på ordning, effektivitet och moralisk rättskaffenhet."
          },
          {
            name: "Tysklands Konstitutionella Demokrati",
            description: "Tysklands styrning efter andra världskriget betonar korrekta procedurer, rättsstatsprincipen och institutionell stabilitet som reaktioner på historiskt kaos."
          },
          {
            name: "Schweiz Konstitutionella System",
            description: "Schweiz styrning kombinerar direkt demokrati med starka konstitutionella principer och strukturerade procedurer för medborgardeltagande."
          }
        ],
        fictional: [
          {
            name: "Galaktiska Republiken (Star Wars)",
            description: "Före dess fall fungerade Galaktiska Republiken som ett byråkratiskt system med utarbetade procedurer, formella positioner och konstitutionella principer."
          },
          {
            name: "Trolldomsministeriet (Harry Potter)",
            description: "Magiska Storbritanniens styrning visar klassiska Blå egenskaper med sina stela hierarkier, formella avdelningar och regelbaserade tillvägagångssätt för att upprätthålla ordning."
          }
        ]
      }
    },
    orange: {
      en: {
        title: "Achievement-Based Governance Examples",
        historical: [
          {
            name: "Early United States Republic",
            description: "The US constitutional system combined republican principles with meritocratic elements and emphasis on individual achievement and innovation."
          },
          {
            name: "Victorian British Parliamentary System",
            description: "19th century British governance increasingly emphasized efficiency, progress, and strategic competition between political parties."
          }
        ],
        contemporary: [
          {
            name: "South Korea's Development State",
            description: "South Korea's rapid modernization exemplifies Orange governance with its emphasis on economic achievement, strategic planning, and technology-driven growth."
          },
          {
            name: "European Union Governance",
            description: "The EU combines representative democracy with technocratic expertise and evidence-based policymaking driven by measurable outcomes."
          },
          {
            name: "Corporate Governance Models",
            description: "Modern corporations like Amazon and Google operate with strategic leadership, performance metrics, and innovation-driven decision frameworks."
          },
          {
            name: "Estonia's Digital Governance",
            description: "Estonia has pioneered achievement-oriented digital governance with efficiency metrics, innovation emphasis, and strategic management of national services."
          }
        ],
        fictional: [
          {
            name: "Panem's Capitol (The Hunger Games)",
            description: "Despite its dystopian nature, the Capitol showcases Orange governance with its technological sophistication, strategic manipulation, and achievement-based hierarchy."
          },
          {
            name: "The Federation (Star Trek)",
            description: "Early Federation governance combines representative democracy with meritocracy and scientific innovation as driving forces."
          }
        ]
      },
      sv: {
        title: "Exempel på Prestationsbaserad Styrning",
        historical: [
          {
            name: "Tidiga Amerikanska Republiken",
            description: "Det amerikanska konstitutionella systemet kombinerade republikanska principer med meritokratiska element och betoning på individuell prestation och innovation."
          },
          {
            name: "Viktorianska Brittiska Parlamentssystemet",
            description: "1800-talets brittiska styrning betonade alltmer effektivitet, framsteg och strategisk konkurrens mellan politiska partier."
          }
        ],
        contemporary: [
          {
            name: "Sydkoreas Utvecklingsstat",
            description: "Sydkoreas snabba modernisering exemplifierar Orange styrning med betoning på ekonomisk prestation, strategisk planering och teknikdriven tillväxt."
          },
          {
            name: "Europeiska Unionens Styrning",
            description: "EU kombinerar representativ demokrati med teknokratisk expertis och evidensbaserat beslutsfattande drivet av mätbara resultat."
          },
          {
            name: "Företagsstyrningsmodeller",
            description: "Moderna företag som Amazon och Google fungerar med strategiskt ledarskap, prestationsmått och innovationsdrivna beslutsramar."
          },
          {
            name: "Estlands Digitala Styrning",
            description: "Estland har varit pionjär inom prestationsorienterad digital styrning med effektivitetsmått, innovationsbetoning och strategisk hantering av nationella tjänster."
          }
        ],
        fictional: [
          {
            name: "Panems Huvudstad (Hunger Games)",
            description: "Trots sin dystopiska natur visar Huvudstaden Orange styrning med teknologisk sofistikering, strategisk manipulation och prestationsbaserad hierarki."
          },
          {
            name: "Federationen (Star Trek)",
            description: "Tidig Federationsstyrning kombinerar representativ demokrati med meritokrati och vetenskaplig innovation som drivkrafter."
          }
        ]
      }
    },
    green: {
      en: {
        title: "Participatory Governance Examples",
        historical: [
          {
            name: "New England Town Meetings",
            description: "Early American participatory democracy where citizens directly engaged in inclusive decision-making at the community level."
          },
          {
            name: "Kibbutz Movement (Early Phase)",
            description: "Israeli kibbutzim originally operated with consensus-based governance, emphasizing equality and community wellbeing over hierarchy."
          }
        ],
        contemporary: [
          {
            name: "Nordic Social Democracies",
            description: "Countries like Denmark, Finland, and Sweden emphasize stakeholder inclusion, consensus-building, and social responsibility in governance."
          },
          {
            name: "Porto Alegre Participatory Budgeting",
            description: "This Brazilian city pioneered participatory budgeting where citizens directly engage in financial decision-making through inclusive processes."
          },
          {
            name: "Transition Town Movement",
            description: "A global network of communities focusing on inclusive, participatory governance to address environmental and social challenges."
          },
          {
            name: "Iceland's Crowdsourced Constitution",
            description: "Following the financial crisis, Iceland attempted to draft a new constitution through inclusive citizen participation."
          },
          {
            name: "Co-operative Governance",
            description: "Organizations like Mondragon Corporation in Spain operate with democratic governance where workers participate equally in decision-making."
          }
        ],
        fictional: [
          {
            name: "Asgard (Marvel Cinematic Universe - Thor: Ragnarok onward)",
            description: "The reimagined Asgard under Thor and Valkyrie moves toward more inclusive leadership with emphasis on collective wellbeing over traditional hierarchy."
          },
          {
            name: "Ba Sing Se Reconstruction (Avatar: The Last Airbender)",
            description: "The post-war reimagining of the Earth Kingdom capital emphasizes citizen participation and inclusion of diverse perspectives."
          }
        ]
      },
      sv: {
        title: "Exempel på Deltagarbaserad Styrning",
        historical: [
          {
            name: "New England Stadsmöten",
            description: "Tidig amerikansk deltagardemokrati där medborgare direkt engagerade sig i inkluderande beslutsfattande på gemenskapsnivå."
          },
          {
            name: "Kibbutzrörelsen (Tidig Fas)",
            description: "Israeliska kibbutzer fungerade ursprungligen med konsensusbaserad styrning, med betoning på jämlikhet och samhällsvälfärd över hierarki."
          }
        ],
        contemporary: [
          {
            name: "Nordiska Socialdemokratier",
            description: "Länder som Danmark, Finland och Sverige betonar intressentinkludering, konsensusbyggande och socialt ansvar i styrning."
          },
          {
            name: "Porto Alegres Deltagarbudgetering",
            description: "Denna brasilianska stad var pionjär inom deltagarbudgetering där medborgare direkt engagerar sig i ekonomiskt beslutsfattande genom inkluderande processer."
          },
          {
            name: "Transition Town-rörelsen",
            description: "Ett globalt nätverk av samhällen som fokuserar på inkluderande, deltagarbaserad styrning för att adressera miljö- och sociala utmaningar."
          },
          {
            name: "Islands Crowdsourcade Konstitution",
            description: "Efter finanskrisen försökte Island utarbeta en ny konstitution genom inkluderande medborgardeltagande."
          },
          {
            name: "Kooperativ Styrning",
            description: "Organisationer som Mondragon Corporation i Spanien fungerar med demokratisk styrning där arbetare deltar jämlikt i beslutsfattande."
          }
        ],
        fictional: [
          {
            name: "Asgard (Marvel Cinematic Universe - från Thor: Ragnarok)",
            description: "Det omarbetade Asgard under Thor och Valkyrie rör sig mot mer inkluderande ledarskap med betoning på kollektivt välbefinnande över traditionell hierarki."
          },
          {
            name: "Ba Sing Se Rekonstruktion (Avatar: The Last Airbender)",
            description: "Den efterkrigstida omformningen av Jordrikets huvudstad betonar medborgardeltagande och inkludering av olika perspektiv."
          }
        ]
      }
    },
    yellow: {
      en: {
        title: "Adaptive Governance Examples",
        historical: [
          {
            name: "Iroquois Confederacy",
            description: "While primarily Purple/Blue, the Iroquois Great Law of Peace contained Yellow elements in its adaptive, multi-level approach to governance across diverse tribes."
          }
        ],
        contemporary: [
          {
            name: "Buurtzorg Healthcare Model",
            description: "This Dutch healthcare organization pioneered self-managing teams with distributed authority based on competence and context."
          },
          {
            name: "Denmark's Flexicurity System",
            description: "Denmark combines elements of different governance approaches in a flexible system that adapts to changing economic and social conditions."
          },
          {
            name: "Adaptive Governance in the Anthropocene Project",
            description: "Research initiatives pioneering complex adaptive governance for planetary-scale challenges like climate change and biodiversity loss."
          },
          {
            name: "Swiss Direct Democracy with Subsidiarity",
            description: "Switzerland's multi-level system allows for adaptive responses at appropriate scales from local to federal."
          },
          {
            name: "Holacracy in Organizations",
            description: "Companies like Zappos and Medium experimented with holacratic governance structures that distribute authority and adapt to emerging needs."
          }
        ],
        fictional: [
          {
            name: "Starfleet (Later Star Trek Series)",
            description: "Later iterations of Star Trek showcase Starfleet's evolution toward more adaptive command structures that integrate multiple perspectives and flexible protocols."
          },
          {
            name: "Babylon 5's Interstellar Alliance",
            description: "The governance system that emerges in later seasons demonstrates Yellow principles with its adaptive, systems-aware approach to interspecies governance."
          }
        ]
      },
      sv: {
        title: "Exempel på Adaptiv Styrning",
        historical: [
          {
            name: "Irokesförbundet",
            description: "Även om det primärt var Lila/Blått, innehöll irokesernas Stora Fredens Lag Gula element i dess adaptiva, flernivåade tillvägagångssätt för styrning över olika stammar."
          }
        ],
        contemporary: [
          {
            name: "Buurtzorg Sjukvårdsmodell",
            description: "Denna nederländska sjukvårdsorganisation var pionjär med självstyrande team med distribuerad auktoritet baserad på kompetens och kontext."
          },
          {
            name: "Danmarks Flexicurity-system",
            description: "Danmark kombinerar element från olika styrningsmodeller i ett flexibelt system som anpassar sig till föränderliga ekonomiska och sociala förhållanden."
          },
          {
            name: "Adaptiv Styrning i Antropocen-projektet",
            description: "Forskningsinitiativ som banar väg för komplex adaptiv styrning för utmaningar i planetär skala som klimatförändringar och förlust av biologisk mångfald."
          },
          {
            name: "Schweizisk Direktdemokrati med Subsidiaritet",
            description: "Schweiz flernivåsystem tillåter adaptiva svar på lämpliga skalor från lokalt till federalt."
          },
          {
            name: "Holokrati i Organisationer",
            description: "Företag som Zappos och Medium experimenterade med holokratiska styrningsstrukturer som fördelar auktoritet och anpassar sig till framväxande behov."
          }
        ],
        fictional: [
          {
            name: "Stjärnflottan (Senare Star Trek-serier)",
            description: "Senare iterationer av Star Trek visar Stjärnflottans utveckling mot mer adaptiva befälsstrukturer som integrerar flera perspektiv och flexibla protokoll."
          },
          {
            name: "Babylon 5:s Interstellära Allians",
            description: "Styrningssystemet som växer fram i senare säsonger demonstrerar Gula principer med dess adaptiva, systemmedvetna tillvägagångssätt för intergalaktisk styrning."
          }
        ]
      }
    },
    coral: {
      en: {
        title: "Sovereign Unity Governance Examples",
        historical: [
          {
            name: "Historical Prototypes",
            description: "As Coral represents emerging consciousness, full historical examples are limited, though elements can be seen in transformative movements."
          }
        ],
        contemporary: [
          {
            name: "Teal Organizations with Evolutionary Purpose",
            description: "Some cutting-edge organizations like Extinction Rebellion combine individual sovereignty with collective evolutionary purpose in their governance."
          },
          {
            name: "Deep Democracy Facilitation",
            description: "Advanced forms of Deep Democracy practice create field-aware governance that balances individual sovereignty with collective intelligence."
          },
          {
            name: "Wisdom Councils and Social Presencing",
            description: "Emerging practices using collective presencing techniques to access higher awareness for governance decisions."
          },
          {
            name: "Consciousness Hackers Networks",
            description: "Distributed communities exploring governance through consciousness technologies and sovereign co-creation."
          },
          {
            name: "Burning Man's Emergent Governance",
            description: "While primarily Green-Yellow, Burning Man's temporary autonomous zones showcase elements of Coral governance through radical self-expression within collective consciousness."
          }
        ],
        fictional: [
          {
            name: "Q Continuum (Star Trek)",
            description: "The evolved Q beings demonstrate aspects of Coral governance with sovereign individuality within universal consciousness."
          },
          {
            name: "The Culture (Iain M. Banks novels)",
            description: "This post-scarcity civilization balances radical individual freedom with conscious evolutionary purpose."
          }
        ]
      },
      sv: {
        title: "Exempel på Suverän Enhetsstyrning",
        historical: [
          {
            name: "Historiska Prototyper",
            description: "Eftersom Coral representerar framväxande medvetande är fullständiga historiska exempel begränsade, även om element kan ses i transformativa rörelser."
          }
        ],
        contemporary: [
          {
            name: "Teal-organisationer med Evolutionärt Syfte",
            description: "Vissa banbrytande organisationer som Extinction Rebellion kombinerar individuell suveränitet med kollektivt evolutionärt syfte i sin styrning."
          },
          {
            name: "Djupdemokratisk Facilitering",
            description: "Avancerade former av djupdemokratisk praktik skapar fältmedveten styrning som balanserar individuell suveränitet med kollektiv intelligens."
          },
          {
            name: "Visdomsråd och Social Närvaroskapande",
            description: "Framväxande praktiker som använder kollektiva närvaroskapande tekniker för att få tillgång till högre medvetenhet för styrningsbeslut."
          },
          {
            name: "Consciousness Hackers-nätverk",
            description: "Distribuerade gemenskaper som utforskar styrning genom medvetenhetsteknologier och suverän samskapelse."
          },
          {
            name: "Burning Mans Framväxande Styrning",
            description: "Även om det främst är Grönt-Gult, visar Burning Mans tillfälliga autonoma zoner element av Coral-styrning genom radikalt självuttryck inom kollektivt medvetande."
          }
        ],
        fictional: [
          {
            name: "Q Continuum (Star Trek)",
            description: "De utvecklade Q-varelserna visar aspekter av Coral-styrning med suverän individualitet inom universellt medvetande."
          },
          {
            name: "Kulturen (Iain M. Banks romaner)",
            description: "Denna post-bristsamhälle-civilisation balanserar radikal individuell frihet med medvetet evolutionärt syfte."
          }
        ]
      }
    },
    ultraviolet: {
      en: {
        title: "Non-Dual Governance Examples",
        historical: [
          {
            name: "Speculative Historical Examples",
            description: "As a stage of consciousness largely beyond current human evolution, historical examples are primarily speculative."
          }
        ],
        contemporary: [
          {
            name: "Contemplative Community Moments",
            description: "Brief emergent moments in advanced contemplative communities when governance transcends formal structures entirely."
          },
          {
            name: "Flow States in High-Performance Teams",
            description: "Temporary experiences where group flow transcends individual/collective distinctions in governance decisions."
          },
          {
            name: "Non-Dual Spiritual Communities",
            description: "Some advanced spiritual communities explore governance without formal structures, relying on field-awareness and spontaneous rightness."
          }
        ],
        fictional: [
          {
            name: "The Organians (Star Trek)",
            description: "Non-corporeal beings with unified consciousness who have transcended the need for formal governance structures."
          },
          {
            name: "The Ellimist (Animorphs series)",
            description: "A being who evolved beyond individual/collective distinctions, becoming a living governance system itself."
          },
          {
            name: "The Living Planet Mogo (DC Comics)",
            description: "A sentient planet whose governance is an expression of unified consciousness across multiple scales simultaneously."
          }
        ]
      },
      sv: {
        title: "Exempel på Icke-Dualistisk Styrning",
        historical: [
          {
            name: "Spekulativa Historiska Exempel",
            description: "Som ett medvetandestadium i stort sett bortom nuvarande mänsklig evolution är historiska exempel huvudsakligen spekulativa."
          }
        ],
        contemporary: [
          {
            name: "Kontemplativa Gemenskapsögonblick",
            description: "Korta framväxande ögonblick i avancerade kontemplativa gemenskaper när styrning helt transcenderar formella strukturer."
          },
          {
            name: "Flödestillstånd i Högpresterande Team",
            description: "Tillfälliga upplevelser där gruppflöde transcenderar individuella/kollektiva distinktioner i styrningsbeslut."
          },
          {
            name: "Icke-Dualistiska Andliga Gemenskaper",
            description: "Vissa avancerade andliga gemenskaper utforskar styrning utan formella strukturer, förlitande sig på fältmedvetenhet och spontan riktighet."
          }
        ],
        fictional: [
          {
            name: "Organianerna (Star Trek)",
            description: "Icke-kroppsliga varelser med enat medvetande som har transcenderat behovet av formella styrningsstrukturer."
          },
          {
            name: "The Ellimist (Animorphs-serien)",
            description: "En varelse som utvecklats bortom individuella/kollektiva distinktioner och blivit ett levande styrningssystem i sig själv."
          },
          {
            name: "Den Levande Planeten Mogo (DC Comics)",
            description: "En medveten planet vars styrning är ett uttryck för enat medvetande över flera skalor samtidigt."
          }
        ]
      }
    },
    turquoise: {
      en: {
        title: "Holistic Governance Examples",
        historical: [
          {
            name: "Indigenous Bioregional Governance",
            description: "Some indigenous societies, like pre-colonial Hawaiian ahupua'a system, governed watersheds as whole living systems with spiritual and ecological integration."
          }
        ],
        contemporary: [
          {
            name: "The Earth Charter Initiative",
            description: "A global network developing governance principles that integrate ecological consciousness, social justice, and planetary wellbeing."
          },
          {
            name: "Global Commons Governance Experiments",
            description: "Emerging approaches to govern atmospheric commons, oceans, and biodiversity through multi-stakeholder planetary stewardship."
          },
          {
            name: "Findhorn Ecovillage Governance",
            description: "This Scottish community integrates spiritual awareness with ecological governance through attunement to natural systems."
          },
          {
            name: "Regenerative Governance Networks",
            description: "Organizations like Regeneration International and Capital Institute developing governance frameworks based on living systems principles."
          },
          {
            name: "Bhutan's Gross National Happiness Governance",
            description: "Bhutan's approach integrates spiritual, ecological, and social wellbeing into governance metrics and decision frameworks."
          }
        ],
        fictional: [
          {
            name: "Pandora's Na'vi (Avatar)",
            description: "The Na'vi governance system integrates spiritual connection to nature, collective consciousness, and ecological harmony."
          },
          {
            name: "Arrakis Under Leto II (Dune Series)",
            description: "The God Emperor's multi-millennium governance shows elements of Turquoise in its planetary consciousness and evolutionary purpose."
          }
        ]
      },
      sv: {
        title: "Exempel på Holistisk Styrning",
        historical: [
          {
            name: "Ursprungsbefolkningars Bioregionala Styrning",
            description: "Vissa ursprungssamhällen, som det förkoloniala hawaiianska ahupua'a-systemet, styrde avrinningsområden som hela levande system med andlig och ekologisk integration."
          }
        ],
        contemporary: [
          {
            name: "Earth Charter-initiativet",
            description: "Ett globalt nätverk som utvecklar styrningsprinciper som integrerar ekologiskt medvetande, social rättvisa och planetärt välbefinnande."
          },
          {
            name: "Experiment med Global Allmänningens Styrning",
            description: "Framväxande tillvägagångssätt för att styra atmosfäriska allmänningar, oceaner och biologisk mångfald genom flerparts planetärt förvaltarskap."
          },
          {
            name: "Findhorn Ekobyns Styrning",
            description: "Detta skotska samhälle integrerar andlig medvetenhet med ekologisk styrning genom avstämning med naturliga system."
          },
          {
            name: "Regenerativa Styrningsnätverk",
            description: "Organisationer som Regeneration International och Capital Institute utvecklar styrningsramar baserade på levande systems principer."
          },
          {
            name: "Bhutans Bruttonationella Lycka-styrning",
            description: "Bhutans tillvägagångssätt integrerar andligt, ekologiskt och socialt välbefinnande i styrningsmetrik och beslutsramar."
          }
        ],
        fictional: [
          {
            name: "Pandoras Na'vi (Avatar)",
            description: "Na'vis styrningssystem integrerar andlig koppling till naturen, kollektivt medvetande och ekologisk harmoni."
          },
          {
            name: "Arrakis Under Leto II (Dune-serien)",
            description: "Gudkejsarens multi-millennium styrning visar element av Turkos i dess planetära medvetande och evolutionära syfte."
          }
        ]
      }
    }
  };
  
  // List of all stage keys
  const allStages = ['beige', 'purple', 'red', 'blue', 'orange', 'green', 'yellow', 'turquoise', 'coral', 'ultraviolet'];
  
  // Easy access to translations
  $: t = translations[language];
  
  // Handle tab changes
  function changeTab(tab) {
    activeTab = tab;
  }
</script>

<div class="governance-examples bg-white rounded-xl shadow-sm p-6">
  <h2 class="text-2xl font-semibold mb-2">{t.title}</h2>
  <p class="text-gray-600 mb-6">{t.description}</p>
  
  <!-- Tab Navigation -->
  <div class="border-b border-gray-200 mb-6">
    <nav class="flex space-x-4 overflow-x-auto" aria-label="Tabs">
      <button
        class={`py-2 px-3 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'historical' ? 'border-purple-600 text-purple-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
        on:click={() => changeTab('historical')}
      >
        {t.tabHistorical}
      </button>
      <button
        class={`py-2 px-3 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'contemporary' ? 'border-purple-600 text-purple-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
        on:click={() => changeTab('contemporary')}
      >
        {t.tabContemporary}
      </button>
      <button
        class={`py-2 px-3 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'fictional' ? 'border-purple-600 text-purple-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
        on:click={() => changeTab('fictional')}
      >
        {t.tabFictional}
      </button>
      <button
        class={`py-2 px-3 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'all' ? 'border-purple-600 text-purple-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
        on:click={() => changeTab('all')}
      >
        {t.viewAll}
      </button>
    </nav>
  </div>
  
  <!-- Tab Content -->
  <div class="space-y-8">
    {#each allStages as stage}
      {#if activeTab === 'all' || (governanceExamples[stage]?.[language]?.[activeTab]?.length > 0)}
        <div 
          class="p-4 rounded-lg"
          style="background-color: {stageColors[stage]}15; border-left: 4px solid {stageColors[stage]}"
        >
          <h3 class="font-semibold mb-3 capitalize">{stage}: {governanceExamples[stage]?.[language]?.title || ''}</h3>
          
          {#if activeTab === 'all'}
            <!-- Show all categories -->
            {#each ['historical', 'contemporary', 'fictional'] as category}
              {#if governanceExamples[stage]?.[language]?.[category]?.length > 0}
                <div class="mb-4 last:mb-0">
                  <h4 class="font-medium mb-2 capitalize">
                    {language === 'en' 
                      ? category 
                      : (category === 'historical' 
                          ? 'Historiska' 
                          : category === 'contemporary' 
                            ? 'Samtida' 
                            : 'Fiktiva')}
                  </h4>
                  <div class="space-y-3">
                    {#each governanceExamples[stage][language][category] as example}
                      <div class="bg-white rounded-lg p-3 shadow-sm">
                        <h5 class="font-medium">{example.name}</h5>
                        <p class="text-sm text-gray-600">{example.description}</p>
                      </div>
                    {/each}
                  </div>
                </div>
              {/if}
            {/each}
          {:else}
            <!-- Show specific category -->
            {#if governanceExamples[stage]?.[language]?.[activeTab]?.length > 0}
              <div class="space-y-3">
                {#each governanceExamples[stage][language][activeTab] as example}
                  <div class="bg-white rounded-lg p-3 shadow-sm">
                    <h5 class="font-medium">{example.name}</h5>
                    <p class="text-sm text-gray-600">{example.description}</p>
                  </div>
                {/each}
              </div>
            {:else}
              <p class="text-gray-500 italic">{t.noExamples}</p>
            {/if}
          {/if}
        </div>
      {/if}
    {/each}
  </div>
</div>
