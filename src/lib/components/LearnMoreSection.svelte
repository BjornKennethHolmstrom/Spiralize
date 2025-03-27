<!-- src/lib/components/LearnMoreSection.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import type { Language } from '../types/spiral';
  import { base } from '$app/paths';

  export let language: Language = 'en';
  export let dominantStage: string | null = null;
  
  // Stage colors for styling
  const stageColors = {
    beige: '#E5D0BA',
    purple: '#9B6B9E',
    red: '#E25A53',
    blue: '#4A72B2',
    orange: '#FF7F27', 
    green: '#7AB55C',
    yellow: '#FFD700',
    turquoise: '#40E0D0',
    coral: '#FF6F61'
  };
  
  // Stage names in both languages
  const stageNames = {
    beige: { en: 'Survival', sv: 'Överlevnad' },
    purple: { en: 'Tribal', sv: 'Stamtillhörighet' },
    red: { en: 'Power', sv: 'Makt' },
    blue: { en: 'Order', sv: 'Ordning' },
    orange: { en: 'Achievement', sv: 'Prestation' },
    green: { en: 'Community', sv: 'Gemenskap' },
    yellow: { en: 'Systemic', sv: 'Systemisk' },
    turquoise: { en: 'Holistic', sv: 'Holistisk' },
    coral: { en: 'Sovereign Unity', sv: 'Suverän Enhet' }
  };
  
  // Detailed information about each stage's peace perspective
  const stageDetails = {
    beige: {
      en: {
        title: "The Survival Peace Perspective",
        description: "The Beige perspective sees peace primarily through the lens of basic survival and security. While this may seem simplistic, it forms the foundation that makes all other approaches to peace possible.",
        strengths: [
          "Pragmatic focus on immediate needs",
          "Acute awareness of security concerns",
          "Resilience in crisis situations",
          "Clarity about fundamental human requirements"
        ],
        limitations: [
          "May struggle to see beyond immediate threats",
          "Can miss systemic or long-term factors",
          "Difficulty engaging with abstract peace concepts",
          "Often reactive rather than proactive"
        ],
        development: [
          "Expanding your view beyond immediate survival to community wellbeing",
          "Developing awareness of how security connects to broader structures",
          "Learning to anticipate, not just react to threats",
          "Recognizing that lasting peace requires more than just absence of immediate danger"
        ],
        integration: "Every effective peace process must address basic survival and security needs. When working in conflict zones or with vulnerable populations, honoring the Beige perspective means ensuring that fundamental human needs are met as a foundation for more complex peace initiatives."
      },
      sv: {
        title: "Överlevnadsperspektivet på Fred",
        description: "Beige-perspektivet ser fred främst genom linsen av grundläggande överlevnad och säkerhet. Även om detta kan verka förenklat, utgör det grunden som gör alla andra fredsmetoder möjliga.",
        strengths: [
          "Pragmatiskt fokus på omedelbara behov",
          "Akut medvetenhet om säkerhetsfrågor",
          "Motståndskraft i krissituationer",
          "Klarhet om grundläggande mänskliga behov"
        ],
        limitations: [
          "Kan ha svårt att se bortom omedelbara hot",
          "Kan missa systemiska eller långsiktiga faktorer",
          "Svårighet att engagera sig i abstrakta fredskoncept",
          "Ofta reaktivt snarare än proaktivt"
        ],
        development: [
          "Utvidga din syn bortom omedelbar överlevnad till gemenskapens välbefinnande",
          "Utveckla medvetenhet om hur säkerhet kopplas till bredare strukturer",
          "Lära sig att förutse, inte bara reagera på hot",
          "Erkänna att varaktig fred kräver mer än bara frånvaro av omedelbar fara"
        ],
        integration: "Varje effektiv fredsprocess måste adressera grundläggande överlevnads- och säkerhetsbehov. När man arbetar i konfliktzoner eller med utsatta befolkningar innebär att hedra Beige-perspektivet att säkerställa att grundläggande mänskliga behov tillgodoses som en grund för mer komplexa fredsinitiativ."
      }
    },
    purple: {
      en: {
        title: "The Tribal Peace Perspective",
        description: "The Purple perspective understands peace through tradition, ancestral wisdom, and community cohesion. It recognizes the importance of shared cultural identity and ritualistic practices in creating harmony.",
        strengths: [
          "Deep appreciation for cultural continuity",
          "Recognition of the spiritual dimensions of peace",
          "Strong emphasis on community bonds and belonging",
          "Preservation of time-tested wisdom and practices"
        ],
        limitations: [
          "May struggle with cross-cultural peacebuilding",
          "Sometimes resistant to new approaches",
          "Can create in-group/out-group dynamics",
          "May not address structural inequalities"
        ],
        development: [
          "Learning to bridge between different cultural traditions",
          "Distinguishing between essential community wisdom and limiting superstitions",
          "Developing greater individual agency while maintaining cultural roots",
          "Finding universal elements in diverse traditions"
        ],
        integration: "Effective peace processes honor the traditions, rituals, and cultural identities of all parties involved. Incorporating elements like Ubuntu (South Africa) or Ho'oponopono (Hawaiian) into peace processes acknowledges the Purple perspective's valuable contribution to reconciliation and communal healing."
      },
      sv: {
        title: "Stam-perspektivet på Fred",
        description: "Purple-perspektivet förstår fred genom tradition, förfäders visdom och gemenskapskohesion. Det erkänner vikten av delad kulturell identitet och ritualistiska praktiker för att skapa harmoni.",
        strengths: [
          "Djup uppskattning för kulturell kontinuitet",
          "Erkännande av fredens andliga dimensioner",
          "Stark betoning på gemenskapsband och tillhörighet",
          "Bevarande av beprövad visdom och praktiker"
        ],
        limitations: [
          "Kan ha svårt med tvärkulturell fredsbyggande",
          "Ibland motståndskraftig mot nya tillvägagångssätt",
          "Kan skapa dynamik mellan in-grupp/ut-grupp",
          "Kanske inte adresserar strukturella ojämlikheter"
        ],
        development: [
          "Lära sig att bygga broar mellan olika kulturella traditioner",
          "Skilja mellan väsentlig gemenskapsvisdom och begränsande vidskepelser",
          "Utveckla större individuell agens samtidigt som kulturella rötter bibehålls",
          "Hitta universella element i olika traditioner"
        ],
        integration: "Effektiva fredsprocesser hedrar traditioner, ritualer och kulturella identiteter hos alla inblandade parter. Att införliva element som Ubuntu (Sydafrika) eller Ho'oponopono (Hawaiianskt) i fredsprocesser erkänner Purple-perspektivets värdefulla bidrag till försoning och gemensam läkning."
      }
    },
    red: {
      en: {
        title: "The Power Peace Perspective",
        description: "The Red perspective views peace through the lens of strength, respect, and clear boundaries. It recognizes that sometimes peace requires assertive action and the courage to stand firm.",
        strengths: [
          "Decisiveness in confronting aggression",
          "Clear boundaries and expectations",
          "Willingness to take necessary action",
          "Recognition of power dynamics in conflicts"
        ],
        limitations: [
          "May escalate tensions through confrontational approaches",
          "Can focus too heavily on domination rather than collaboration",
          "Often short-term in perspective",
          "May lack subtlety in complex situations"
        ],
        development: [
          "Channeling assertive energy into protective rather than dominating actions",
          "Developing self-discipline and restraint alongside strength",
          "Learning to use power in service of moral principles",
          "Recognizing when flexibility is stronger than rigidity"
        ],
        integration: "Effective peace processes acknowledge power dynamics and create space for assertive expression that doesn't harm others. Peacebuilding sometimes requires the courage to stand firm against injustice and set clear boundaries, integrating the healthy aspects of the Red perspective."
      },
      sv: {
        title: "Maktperspektivet på Fred",
        description: "Red-perspektivet ser fred genom linsen av styrka, respekt och tydliga gränser. Det erkänner att fred ibland kräver bestämt handlande och modet att stå fast.",
        strengths: [
          "Beslutsamhet i att konfrontera aggression",
          "Tydliga gränser och förväntningar",
          "Villighet att vidta nödvändiga åtgärder",
          "Erkännande av maktdynamik i konflikter"
        ],
        limitations: [
          "Kan eskalera spänningar genom konfrontativa tillvägagångssätt",
          "Kan fokusera för mycket på dominans snarare än samarbete",
          "Ofta kortsiktigt i perspektiv",
          "Kan sakna nyans i komplexa situationer"
        ],
        development: [
          "Kanalisera bestämd energi till skyddande snarare än dominerande handlingar",
          "Utveckla självdisciplin och återhållsamhet tillsammans med styrka",
          "Lära sig att använda makt i tjänst för moraliska principer",
          "Erkänna när flexibilitet är starkare än rigiditet"
        ],
        integration: "Effektiva fredsprocesser erkänner maktdynamik och skapar utrymme för bestämt uttryck som inte skadar andra. Fredsbyggande kräver ibland modet att stå fast mot orättvisa och sätta tydliga gränser, vilket integrerar de hälsosamma aspekterna av Red-perspektivet."
      }
    },
    blue: {
      en: {
        title: "The Order Peace Perspective",
        description: "The Blue perspective approaches peace through structure, law, and proper procedure. It values clear rules, moral frameworks, and institutions that create stability and fairness.",
        strengths: [
          "Emphasis on fair and consistent application of rules",
          "Creation of stable institutional frameworks",
          "Clear moral principles to guide decisions",
          "Respect for legitimate authority and procedures"
        ],
        limitations: [
          "May become rigid or bureaucratic",
          "Can prioritize rules over human needs",
          "Sometimes struggles with exceptions or unique situations",
          "May not address underlying causes of conflict"
        ],
        development: [
          "Distinguishing between essential principles and arbitrary rules",
          "Developing flexibility in application while maintaining consistency",
          "Understanding the purpose behind procedures",
          "Recognizing when systems need reform to better serve their purpose"
        ],
        integration: "Effective peace processes require clear structures, principles, and procedures that all parties can trust. Peace agreements, legal frameworks, and established protocols contribute the Blue perspective's valuable emphasis on order and predictability."
      },
      sv: {
        title: "Ordningsperspektivet på Fred",
        description: "Blue-perspektivet närmar sig fred genom struktur, lag och korrekt procedur. Det värdesätter tydliga regler, moraliska ramverk och institutioner som skapar stabilitet och rättvisa.",
        strengths: [
          "Betoning på rättvis och konsekvent tillämpning av regler",
          "Skapande av stabila institutionella ramverk",
          "Tydliga moraliska principer för att vägleda beslut",
          "Respekt för legitim auktoritet och procedurer"
        ],
        limitations: [
          "Kan bli rigid eller byråkratisk",
          "Kan prioritera regler över mänskliga behov",
          "Kämpar ibland med undantag eller unika situationer",
          "Kanske inte adresserar underliggande orsaker till konflikt"
        ],
        development: [
          "Skilja mellan väsentliga principer och godtyckliga regler",
          "Utveckla flexibilitet i tillämpning samtidigt som konsekvens upprätthålls",
          "Förstå syftet bakom procedurer",
          "Erkänna när system behöver reform för att bättre tjäna sitt syfte"
        ],
        integration: "Effektiva fredsprocesser kräver tydliga strukturer, principer och procedurer som alla parter kan lita på. Fredsavtal, juridiska ramverk och etablerade protokoll bidrar till Blue-perspektivets värdefulla betoning på ordning och förutsägbarhet."
      }
    },
    orange: {
      en: {
        title: "The Strategic Peace Perspective",
        description: "The Orange perspective approaches peace pragmatically, seeking effective solutions based on evidence and strategic thinking. It values innovation, negotiation, and practical outcomes.",
        strengths: [
          "Strategic approach to complex challenges",
          "Focus on measurable outcomes and effectiveness",
          "Innovative problem-solving techniques",
          "Ability to negotiate pragmatic compromises"
        ],
        limitations: [
          "May overemphasize material or measurable factors",
          "Can neglect emotional or cultural dimensions",
          "Sometimes prioritizes expediency over principle",
          "Risk of 'technical fixes' for deeper problems"
        ],
        development: [
          "Balancing strategic thinking with ethical considerations",
          "Developing awareness of non-material factors in peace",
          "Learning to value process as well as outcomes",
          "Integrating emotional intelligence with analytical thinking"
        ],
        integration: "Effective peace processes benefit from data-driven strategies, innovative approaches, and practical implementation plans. The Orange perspective contributes valuable pragmatism, ensuring that peace initiatives deliver concrete results rather than remaining theoretical ideals."
      },
      sv: {
        title: "Det Strategiska Fredsperspektivet",
        description: "Orange-perspektivet närmar sig fred pragmatiskt, söker effektiva lösningar baserade på bevis och strategiskt tänkande. Det värdesätter innovation, förhandling och praktiska resultat.",
        strengths: [
          "Strategiskt förhållningssätt till komplexa utmaningar",
          "Fokus på mätbara resultat och effektivitet",
          "Innovativa problemlösningsteknik",
          "Förmåga att förhandla pragmatiska kompromisser"
        ],
        limitations: [
          "Kan överbetonar materiella eller mätbara faktorer",
          "Kan försumma emotionella eller kulturella dimensioner",
          "Prioriterar ibland smidighet framför princip",
          "Risk för 'tekniska fixar' för djupare problem"
        ],
        development: [
          "Balansera strategiskt tänkande med etiska överväganden",
          "Utveckla medvetenhet om icke-materiella faktorer i fred",
          "Lära sig att värdera process såväl som resultat",
          "Integrera emotionell intelligens med analytiskt tänkande"
        ],
        integration: "Effektiva fredsprocesser drar nytta av datadriven strategi, innovativa metoder och praktiska implementeringsplaner. Orange-perspektivet bidrar med värdefull pragmatism, säkerställer att fredsinitiativ levererar konkreta resultat snarare än att förbli teoretiska ideal."
      }
    },
    green: {
      en: {
        title: "The Inclusive Peace Perspective",
        description: "The Green perspective centers peace around inclusion, equality, and human connection. It emphasizes dialogue, healing, and addressing historical injustices to create harmonious relationships.",
        strengths: [
          "Deep commitment to including all voices",
          "Awareness of structural inequalities",
          "Focus on healing relational wounds",
          "Recognition of the emotional dimensions of peace"
        ],
        limitations: [
          "May struggle with decision-making efficiency",
          "Can prioritize process over outcomes",
          "Sometimes naive about power dynamics",
          "Risk of getting stuck in talking without action"
        ],
        development: [
          "Balancing inclusivity with effectiveness",
          "Learning when to shift from process to decision",
          "Integrating awareness of power while maintaining focus on equality",
          "Developing discernment about which differences matter and which don't"
        ],
        integration: "Effective peace processes create space for all voices, address historical wounds, and build genuine human connections. The Green perspective ensures that peace isn't just about structures or agreements, but about healing relationships and creating communities where everyone belongs."
      },
      sv: {
        title: "Det Inkluderande Fredsperspektivet",
        description: "Green-perspektivet centrerar fred kring inkludering, jämlikhet och mänsklig kontakt. Det betonar dialog, läkning och hantering av historiska orättvisor för att skapa harmoniska relationer.",
        strengths: [
          "Djupt engagemang för att inkludera alla röster",
          "Medvetenhet om strukturella ojämlikheter",
          "Fokus på att läka relationella sår",
          "Erkännande av fredens emotionella dimensioner"
        ],
        limitations: [
          "Kan kämpa med beslutsfattande effektivitet",
          "Kan prioritera process över resultat",
          "Ibland naiv om maktdynamik",
          "Risk att fastna i prat utan handling"
        ],
        development: [
          "Balansera inkludering med effektivitet",
          "Lära sig när man ska skifta från process till beslut",
          "Integrera medvetenhet om makt samtidigt som fokus på jämlikhet bibehålls",
          "Utveckla urskillningsförmåga om vilka skillnader som spelar roll och vilka som inte gör det"
        ],
        integration: "Effektiva fredsprocesser skapar utrymme för alla röster, adresserar historiska sår och bygger genuina mänskliga kopplingar. Green-perspektivet säkerställer att fred inte bara handlar om strukturer eller avtal, utan om att läka relationer och skapa gemenskaper där alla hör hemma."
      }
    },
    yellow: {
      en: {
        title: "The Systemic Peace Perspective",
        description: "The Yellow perspective approaches peace through systems thinking, recognizing complex patterns and adaptive solutions. It integrates multiple worldviews and adapts approaches to specific contexts.",
        strengths: [
          "Ability to see root causes and systemic patterns",
          "Integration of multiple perspectives and approaches",
          "Adaptability to changing conditions",
          "Understanding of complex feedback loops"
        ],
        limitations: [
          "Can seem abstract or theoretical",
          "May struggle to communicate complex insights simply",
          "Sometimes overwhelmed by systemic complexity",
          "Can paralyze action through analysis"
        ],
        development: [
          "Balancing systemic awareness with pragmatic action",
          "Communicating complex insights in accessible ways",
          "Finding leverage points for meaningful intervention",
          "Developing comfort with uncertainty and emergence"
        ],
        integration: "Effective peace processes address root causes, understand complex interactions, and adapt to changing conditions. The Yellow perspective helps identify leverage points for intervention and create flexible frameworks that can evolve as the situation changes."
      },
      sv: {
        title: "Det Systemiska Fredsperspektivet",
        description: "Yellow-perspektivet närmar sig fred genom systemtänkande, erkänner komplexa mönster och adaptiva lösningar. Det integrerar flera världsbilder och anpassar metoder till specifika sammanhang.",
        strengths: [
          "Förmåga att se grundorsaker och systemiska mönster",
          "Integration av flera perspektiv och tillvägagångssätt",
          "Anpassningsbarhet till förändrade förhållanden",
          "Förståelse för komplexa återkopplingsloopar"
        ],
        limitations: [
          "Kan verka abstrakt eller teoretiskt",
          "Kan kämpa med att kommunicera komplexa insikter enkelt",
          "Ibland överväldigad av systemisk komplexitet",
          "Kan förlama handling genom analys"
        ],
        development: [
          "Balansera systemisk medvetenhet med pragmatisk handling",
          "Kommunicera komplexa insikter på tillgängliga sätt",
          "Hitta hävstångspunkter för meningsfull intervention",
          "Utveckla bekvämlighet med osäkerhet och framväxt"
        ],
        integration: "Effektiva fredsprocesser adresserar grundorsaker, förstår komplexa interaktioner och anpassar sig till förändrade förhållanden. Yellow-perspektivet hjälper till att identifiera hävstångspunkter för intervention och skapa flexibla ramverk som kan utvecklas när situationen förändras."
      }
    },
    turquoise: {
      en: {
        title: "The Holistic Peace Perspective",
        description: "The Turquoise perspective sees peace as a manifestation of global consciousness and interconnection. It approaches peace as a holistic phenomenon that emerges from recognizing our fundamental unity with all life.",
        strengths: [
          "Recognition of our fundamental interconnectedness",
          "Ability to work across vast scales from local to global",
          "Integration of rational, intuitive, and embodied knowing",
          "Vision of collective evolution toward greater harmony"
        ],
        limitations: [
          "Can seem abstract or impractical",
          "May struggle to translate vision into concrete action",
          "Sometimes sacrifices immediate needs for long-term vision",
          "Can be difficult to communicate to earlier stages"
        ],
        development: [
          "Grounding holistic awareness in practical action",
          "Communicating across worldviews and stages",
          "Balancing universal perspective with cultural specificity",
          "Developing patience with developmental processes"
        ],
        integration: "Effective peace processes recognize the interconnected nature of all conflicts and their resolution. The Turquoise perspective contributes awareness of how local actions affect the global system and how peace emerges through the conscious evolution of humanity."
      },
      sv: {
        title: "Det Holistiska Fredsperspektivet",
        description: "Turquoise-perspektivet ser fred som en manifestation av globalt medvetande och sammankoppling. Det närmar sig fred som ett holistiskt fenomen som uppstår från erkännande av vår grundläggande enhet med allt liv.",
        strengths: [
          "Erkännande av vår grundläggande sammankoppling",
          "Förmåga att arbeta över stora skalor från lokalt till globalt",
          "Integration av rationellt, intuitivt och förkroppsligat vetande",
          "Vision av kollektiv evolution mot större harmoni"
        ],
        limitations: [
          "Kan verka abstrakt eller opraktiskt",
          "Kan kämpa med att översätta vision till konkret handling",
          "Offrar ibland omedelbara behov för långsiktig vision",
          "Kan vara svårt att kommunicera till tidigare stadier"
        ],
        development: [
          "Jorda holistisk medvetenhet i praktisk handling",
          "Kommunicera över världsbilder och stadier",
          "Balansera universellt perspektiv med kulturell specificitet",
          "Utveckla tålamod med utvecklingsprocesser"
        ],
        integration: "Effektiva fredsprocesser erkänner den sammankopplade naturen av alla konflikter och deras lösning. Turquoise-perspektivet bidrar med medvetenhet om hur lokala handlingar påverkar det globala systemet och hur fred uppstår genom mänsklighetens medvetna evolution."
      }
    },
    coral: {
      en: {
        title: "The Sovereign Unity Peace Perspective",
        description: "The Coral perspective approaches peace through the dynamic interplay of individual sovereignty and universal unity. It sees peace emerging through conscious evolution, where each unique individual contributes to the creative unfolding of new possibilities.",
        strengths: [
          "Balance of individual sovereignty with universal connectedness",
          "Creative innovation beyond existing paradigms",
          "Capacity to pioneer entirely new approaches to conflict",
          "Recognition of peace as an evolutionary force"
        ],
        limitations: [
          "May be difficult to understand from earlier perspectives",
          "Can seem unrealistic or too visionary",
          "Challenges implementing in conventional contexts",
          "Requires high developmental capacity"
        ],
        development: [
          "Bridging between visionary insights and practical implementation",
          "Communicating across developmental divides",
          "Creating containers for evolutionary emergence",
          "Balancing sovereign expression with universal harmony"
        ],
        integration: "The most effective peace processes recognize opportunities for evolutionary breakthrough. The Coral perspective contributes by pioneering entirely new paradigms of relationship and governance that transcend the limitations of previous approaches to conflict transformation."
      },
      sv: {
        title: "Suverän Enhets Fredsperspektiv",
        description: "Coral-perspektivet närmar sig fred genom det dynamiska samspelet mellan individuell suveränitet och universell enhet. Det ser fred som framväxande genom medveten evolution, där varje unik individ bidrar till det kreativa utfoldet av nya möjligheter.",
        strengths: [
          "Balans av individuell suveränitet med universell koppling",
          "Kreativ innovation bortom existerande paradigm",
          "Kapacitet att pionjära helt nya tillvägagångssätt för konflikt",
          "Erkännande av fred som en evolutionär kraft"
        ],
        limitations: [
          "Kan vara svårt att förstå från tidigare perspektiv",
          "Kan verka orealistiskt eller för visionärt",
          "Utmaningar att implementera i konventionella sammanhang",
          "Kräver hög utvecklingskapacitet"
        ],
        development: [
          "Bygga broar mellan visionära insikter och praktiskt genomförande",
          "Kommunicera över utvecklingsklyftor",
          "Skapa behållare för evolutionär framväxt",
          "Balansera suveränt uttryck med universell harmoni"
        ],
        integration: "De mest effektiva fredsprocesserna erkänner möjligheter för evolutionärt genombrott. Coral-perspektivet bidrar genom att bana väg för helt nya paradigm av relation och styrning som överskrider begränsningarna i tidigare tillvägagångssätt för konflikttransformation."
      }
    }
  };
  
  // Translations for UI
  const translations = {
    en: {
      title: "Deepening Your Peace Perspective",
      subtitle: "Understanding and growing beyond your dominant approach to peace",
      yourPerspective: "Your Peace Perspective",
      strengthsTitle: "Strengths of This Perspective",
      limitationsTitle: "Potential Limitations",
      developmentTitle: "Growth Opportunities",
      integrationTitle: "Integrating This Perspective",
      otherPerspectives: "Explore Other Perspectives",
      backToQuiz: "Back to Quiz"
    },
    sv: {
      title: "Fördjupa Ditt Fredsperspektiv",
      subtitle: "Förstå och växa bortom din dominerande inställning till fred",
      yourPerspective: "Ditt Fredsperspektiv",
      strengthsTitle: "Styrkorna i Detta Perspektiv",
      limitationsTitle: "Potentiella Begränsningar",
      developmentTitle: "Tillväxtmöjligheter",
      integrationTitle: "Integrera Detta Perspektiv",
      otherPerspectives: "Utforska Andra Perspektiv",
      backToQuiz: "Tillbaka till Quizen"
    }
  };
  
  $: t = translations[language];
  $: selectedStage = dominantStage || 'yellow';
  $: stageDetail = stageDetails[selectedStage]?.[language];
  
  // Scroll to anchor if provided in URL
  onMount(() => {
    if (window.location.hash) {
      const anchor = window.location.hash.substring(1);
      const element = document.getElementById(anchor);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
</script>

<div id="learn-more" class="max-w-4xl mx-auto px-4 py-12">
  <div class="mb-10 text-center">
    <h2 class="text-3xl font-bold mb-2">{t.title}</h2>
    <p class="text-xl text-gray-600">{t.subtitle}</p>
  </div>
  
  <!-- Selected Stage Details -->
  {#if stageDetail}
    <div class="mb-12">
      <div 
        class="bg-white rounded-xl shadow-sm overflow-hidden mb-8" 
        style="border-left: 4px solid {stageColors[selectedStage]}"
      >
        <div class="p-6">
          <h3 class="text-2xl font-semibold mb-4">{t.yourPerspective}: {stageDetail.title}</h3>
          <p class="text-gray-700 mb-6">{stageDetail.description}</p>
          
          <div class="grid gap-6 md:grid-cols-2">
            <div>
              <h4 class="font-medium text-lg mb-3 text-green-700">{t.strengthsTitle}</h4>
              <ul class="space-y-2">
                {#each stageDetail.strengths as strength}
                  <li class="flex items-start">
                    <span class="text-green-500 mr-2">✓</span>
                    <span class="text-gray-700">{strength}</span>
                  </li>
                {/each}
              </ul>
            </div>
            
            <div>
              <h4 class="font-medium text-lg mb-3 text-red-700">{t.limitationsTitle}</h4>
              <ul class="space-y-2">
                {#each stageDetail.limitations as limitation}
                  <li class="flex items-start">
                    <span class="text-red-500 mr-2">•</span>
                    <span class="text-gray-700">{limitation}</span>
                  </li>
                {/each}
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div class="grid gap-6 md:grid-cols-2 mb-12">
        <div class="bg-white rounded-xl shadow-sm p-6">
          <h4 class="font-medium text-lg mb-3 text-purple-700">{t.developmentTitle}</h4>
          <ul class="space-y-3">
            {#each stageDetail.development as item}
              <li class="flex items-start">
                <span class="text-purple-500 mr-2">→</span>
                <span class="text-gray-700">{item}</span>
              </li>
            {/each}
          </ul>
        </div>
        
        <div class="bg-white rounded-xl shadow-sm p-6">
          <h4 class="font-medium text-lg mb-3 text-blue-700">{t.integrationTitle}</h4>
          <p class="text-gray-700">{stageDetail.integration}</p>
        </div>
      </div>
    </div>
  {/if}
  
  <!-- Other Perspectives -->
  <div>
    <h3 class="text-xl font-semibold mb-4">{t.otherPerspectives}</h3>
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
      {#each Object.keys(stageDetails) as stage}
        <button 
          class="p-3 rounded-lg text-center transition-colors"
          class:bg-white={selectedStage !== stage}
          class:text-gray-700={selectedStage !== stage}
          class:bg-opacity-20={selectedStage === stage}
          style="background-color: {selectedStage === stage ? `${stageColors[stage]}30` : ''};
                 border: 2px solid {selectedStage === stage ? stageColors[stage] : 'transparent'}"
          on:click={() => selectedStage = stage}
        >
          <div class="font-medium capitalize">{stage}</div>
          <div class="text-sm opacity-75">{stageNames[stage][language]}</div>
        </button>
      {/each}
    </div>
  </div>
  
  <!-- Back to Quiz Button -->
  <div class="mt-12 text-center">
    <a 
      href="{base}/insights/peace#quiz-section" 
      class="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
    >
      {t.backToQuiz}
    </a>
  </div>
</div>

<style>
  /* Add styles for better printing if needed */
  @media print {
    .max-w-4xl {
      max-width: none;
    }
  }
</style>
