<script lang="ts">
  import { base } from '$app/paths';
  import languageStore from '$lib/stores/languageStore';
  import ShareButtons from '$lib/components/ShareButtons.svelte';
  import TabNav from '$lib/components/TabNav.svelte';
  import WorldviewMatrix from '$lib/components/WorldviewMatrix.svelte';
  import { stages } from '$lib/data/stages';
  import GovernanceModelExplorer from '$lib/components/GovernanceModelExplorer.svelte';
  import PersonalCollectiveBridge from '$lib/components/PersonalCollectiveBridge.svelte';
  import ImplementationGuides from '$lib/components/ImplementationGuides.svelte';
  import GovernanceExamplesComponent from '$lib/components/GovernanceExamplesComponent.svelte';
  import GovernanceMatrix from '$lib/components/GovernanceMatrix.svelte'

  const { language } = languageStore;
  $: currentLanguage = $language;

  // State for active tab
  let activeTab: 'overview' | 'explorer' | 'examples' | 'bridge' | 'guides' = 'overview';

  // Governance models mapped to Spiral Dynamics stages
  const governanceModels = {
    beige: {
      en: {
        name: "Survival Bands",
        description: "Small groups focused entirely on immediate survival needs with minimal formal governance.",
        characteristics: [
          "Leadership based on immediate survival utility",
          "Decision-making focused on immediate threats and opportunities",
          "Minimal long-term planning or formal structure"
        ],
        examples: [
          "Early hunter-gatherer groups",
          "Extreme survival situations",
          "Disaster aftermath temporary communities"
        ]
      },
      sv: {
        name: "Överlevnadsgrupper",
        description: "Små grupper helt fokuserade på omedelbara överlevnadsbehov med minimal formell styrning.",
        characteristics: [
          "Ledarskap baserat på omedelbar överlevnadsnytta",
          "Beslutsfattande fokuserat på omedelbara hot och möjligheter",
          "Minimal långsiktig planering eller formell struktur"
        ],
        examples: [
          "Tidiga jägar-samlargrupper",
          "Extrema överlevnadssituationer",
          "Tillfälliga samhällen efter katastrofer"
        ]
      }
    },
    purple: {
      en: {
        name: "Tribal Rule",
        description: "Governance based on ancestral traditions, kinship, and spiritual beliefs.",
        characteristics: [
          "Elder councils and chiefs as authority figures",
          "Decision-making guided by tradition and spiritual signs",
          "Strong emphasis on group cohesion and shared identity"
        ],
        examples: [
          "Indigenous tribal governance",
          "Extended family clan structures",
          "Religious communities with strong traditional elements"
        ]
      },
      sv: {
        name: "Stamstyre",
        description: "Styrning baserad på förfäders traditioner, släktskap och andliga övertygelser.",
        characteristics: [
          "Äldsteråd och hövdingar som auktoritetsfigurer",
          "Beslutsfattande väglett av tradition och andliga tecken",
          "Stark betoning på gruppsammanhållning och delad identitet"
        ],
        examples: [
          "Ursprungsbefolkningars stamstyrning",
          "Utvidgade familjeklansstrukturer",
          "Religiösa gemenskaper med starka traditionella element"
        ]
      }
    },
    red: {
      en: {
        name: "Authoritarian Rule",
        description: "Power-based governance where strength, dominance, and control determine leadership.",
        characteristics: [
          "Strong individual leaders or warlords",
          "Decisions made through command and control",
          "Loyalty and fear as primary social organizing principles"
        ],
        examples: [
          "Military dictatorships",
          "Feudal kingdoms",
          "Warlord territories"
        ]
      },
      sv: {
        name: "Auktoritärt Styre",
        description: "Maktbaserad styrning där styrka, dominans och kontroll avgör ledarskap.",
        characteristics: [
          "Starka individuella ledare eller krigsherrar",
          "Beslut fattas genom kommando och kontroll",
          "Lojalitet och rädsla som primära sociala organiseringsprinciper"
        ],
        examples: [
          "Militärdiktaturer",
          "Feodala kungariken",
          "Krigsherrsområden"
        ]
      }
    },
    blue: {
      en: {
        name: "Rule of Law",
        description: "Order-based governance with clear hierarchies, rules, and established processes.",
        characteristics: [
          "Bureaucratic structures with defined roles",
          "Decision-making through established procedures",
          "Constitutional frameworks and legal codes"
        ],
        examples: [
          "Early democratic systems",
          "Theocracies",
          "Traditional monarchies with constitutional elements"
        ]
      },
      sv: {
        name: "Lagstyre",
        description: "Ordningsbaserad styrning med tydliga hierarkier, regler och etablerade processer.",
        characteristics: [
          "Byråkratiska strukturer med definierade roller",
          "Beslutsfattande genom etablerade procedurer",
          "Konstitutionella ramverk och lagkoder"
        ],
        examples: [
          "Tidiga demokratiska system",
          "Teokratier",
          "Traditionella monarkier med konstitutionella element"
        ]
      }
    },
    orange: {
      en: {
        name: "Representative Democracy/Meritocracy",
        description: "Performance-based governance focused on achievement, innovation, and strategic competition.",
        characteristics: [
          "Elected representatives and expert advisors",
          "Decision-making based on strategic advantage and measurable outcomes",
          "Market mechanisms and competitive voting systems"
        ],
        examples: [
          "Modern liberal democracies",
          "Corporate governance models",
          "Technocratic systems"
        ]
      },
      sv: {
        name: "Representativ Demokrati/Meritokrati",
        description: "Prestationsbaserad styrning fokuserad på prestation, innovation och strategisk konkurrens.",
        characteristics: [
          "Valda representanter och expertrådsgivare",
          "Beslutsfattande baserat på strategiska fördelar och mätbara resultat",
          "Marknadsmekanismer och konkurrensutsatta röstningssystem"
        ],
        examples: [
          "Moderna liberala demokratier",
          "Företagsstyrningsmodeller",
          "Teknokratiska system"
        ]
      }
    },
    green: {
      en: {
        name: "Participatory Democracy",
        description: "Egalitarian governance focused on inclusion, consensus, and shared wellbeing.",
        characteristics: [
          "Facilitated group processes for decision-making",
          "Focus on stakeholder inclusion and hearing all voices",
          "Emphasis on social justice and environmental responsibility"
        ],
        examples: [
          "Social democracies",
          "Cooperative governance models",
          "Consensus-based community systems"
        ]
      },
      sv: {
        name: "Deltagardemokrati",
        description: "Egalitär styrning fokuserad på inkludering, konsensus och delat välbefinnande.",
        characteristics: [
          "Faciliterade gruppprocesser för beslutsfattande",
          "Fokus på intressentinkludering och att höra alla röster",
          "Betoning på social rättvisa och miljöansvar"
        ],
        examples: [
          "Socialdemokratier",
          "Kooperativa styrningsmodeller",
          "Konsensusbaserade samhällssystem"
        ]
      }
    },
    yellow: {
      en: {
        name: "Adaptive Governance",
        description: "Systems-based governance that flexibly integrates previous approaches based on context.",
        characteristics: [
          "Distributed leadership based on competence for specific challenges",
          "Decision-making through adaptive processes fitted to context",
          "Integration of efficiency and inclusivity principles"
        ],
        examples: [
          "Holacracy and other self-organization models",
          "Liquid democracy approaches",
          "Networked governance with flexible structures"
        ]
      },
      sv: {
        name: "Adaptiv Styrning",
        description: "Systembaserad styrning som flexibelt integrerar tidigare tillvägagångssätt baserat på kontext.",
        characteristics: [
          "Distribuerat ledarskap baserat på kompetens för specifika utmaningar",
          "Beslutsfattande genom adaptiva processer anpassade till kontext",
          "Integration av effektivitets- och inkluderingsprinciper"
        ],
        examples: [
          "Holokrati och andra självorganiseringsmodeller",
          "Flytande demokratiansatser",
          "Nätverksstyrning med flexibla strukturer"
        ]
      }
    },
    turquoise: {
      en: {
        name: "Holistic Governance",
        description: "Global systems governance that balances unity and diversity on multiple scales.",
        characteristics: [
          "Leadership through embodiment of evolutionary purpose",
          "Decision-making that considers multi-generational and planetary impacts",
          "Balance of global consciousness with local autonomy"
        ],
        examples: [
          "Emerging global commons stewardship models",
          "Bioregional governance experiments",
          "Consciousness-oriented organizational ecosystems"
        ]
      },
      sv: {
        name: "Holistisk Styrning",
        description: "Global systemstyrning som balanserar enhet och mångfald på flera skalor.",
        characteristics: [
          "Ledarskap genom förkroppsligande av evolutionärt syfte",
          "Beslutsfattande som beaktar flergenerationella och planetära effekter",
          "Balans av globalt medvetande med lokal autonomi"
        ],
        examples: [
          "Framväxande modeller för global allmänningsförvaltning",
          "Bioregionala styrningsexperiment",
          "Medvetandeorienterade organisatoriska ekosystem"
        ]
      }
    },
    coral: {
      en: {
        name: "Sovereign Unity Governance",
        description: "Emergent coordination through individual sovereignty aligned with universal principles.",
        characteristics: [
          "Leadership as temporal facilitation of evolutionary potential",
          "Decision-making through resonance with evolutionary impulse",
          "Dynamic balance of radical autonomy with universal consciousness"
        ],
        examples: [
          "Prototype communities exploring consciousness-based coordination",
          "Global wisdom networks with distributed intelligence",
          "Emergent response systems for complex challenges"
        ]
      },
      sv: {
        name: "Suverän Enhetsstyrning",
        description: "Framväxande koordination genom individuell suveränitet anpassad till universella principer.",
        characteristics: [
          "Ledarskap som temporär facilitering av evolutionär potential",
          "Beslutsfattande genom resonans med evolutionär impuls",
          "Dynamisk balans av radikal autonomi med universellt medvetande"
        ],
        examples: [
          "Prototypgemenskaper som utforskar medvetandebaserad koordination",
          "Globala visdomsnätverk med distribuerad intelligens",
          "Framväxande responssystem för komplexa utmaningar"
        ]
      }
    },
    ultraviolet: {
      en: {
        name: "Non-dual Governance",
        description: "Transcendence of governance through unified field of consciousness.",
        characteristics: [
          "Dissolution of formal leadership into dynamic collective intelligence",
          "Decision-making as spontaneous rightness in unified awareness",
          "Seamless flow between individual expression and collective wisdom"
        ],
        examples: [
          "Speculative models beyond current experience",
          "Moments of collective flow consciousness in high-functioning groups",
          "Non-dual spiritual communities with minimal formal structure"
        ]
      },
      sv: {
        name: "Icke-dualistisk Styrning",
        description: "Transcendens av styrning genom ett enhetligt medvetandefält.",
        characteristics: [
          "Upplösning av formellt ledarskap till dynamisk kollektiv intelligens",
          "Beslutsfattande som spontan riktighet i förenad medvetenhet",
          "Sömlöst flöde mellan individuellt uttryck och kollektiv visdom"
        ],
        examples: [
          "Spekulativa modeller bortom nuvarande erfarenhet",
          "Ögonblick av kollektivt flödesmedvetande i högfungerande grupper",
          "Icke-dualistiska andliga gemenskaper med minimal formell struktur"
        ]
      }
    }
  };

  // Translation data
  const translations = {
    en: {
      title: "Conscious Governance",
      subtitle: "Bridging personal development with systemic evolution",
      introduction: "This section explores how our collective governance systems evolve alongside human consciousness, offering tools to bridge personal development with systemic change.",
      
      tabs: {
        overview: "Overview",
        explorer: "Governance Explorer",
        examples: "Real-World Examples",
        bridge: "Personal-Collective Bridge",
        guides: "Implementation Guides"
      },
      
      overview: {
        evolutionTitle: "The Evolution of Governance",
        evolutionText: "Governance models naturally evolve as collective consciousness develops. Each stage builds upon previous stages, transcending limitations while integrating strengths.",
        
        spiralGovernanceTitle: "The Spiral of Governance Evolution",
        spiralGovernanceText: "Just as individual consciousness evolves through the spiral of development, our collective governance systems follow a similar trajectory, becoming more complex, inclusive, and adaptive over time.",
        
        governanceEmergenceTitle: "How Governance Models Emerge",
        governanceEmergenceText: "Governance systems emerge as responses to the life conditions and challenges faced by communities. When existing systems can no longer effectively address new complexities, evolution toward more adaptive models occurs.",
        
        integrationTitle: "Integrating Multiple Perspectives",
        integrationText: "Advanced governance recognizes the value of each developmental stage. Rather than rejecting earlier models entirely, conscious governance integrates their healthy aspects while transcending their limitations.",
        
        personalCollectiveTitle: "The Personal-Collective Connection",
        personalCollectiveText: "Our governance systems reflect our collective consciousness, and our personal development influences the systems we can create and sustain. This reciprocal relationship means that both personal and systemic evolution are necessary for meaningful change.",
        governanceEvolutionTitle: "Governance Evolution Stages",
      },
      
      explorer: {
        title: "Governance Model Explorer",
        description: "Explore how governance evolves through different stages of consciousness development. Each stage represents a particular worldview with corresponding governance structures and decision-making processes.",
        instructionsTitle: "How to Use This Explorer",
        instructions: "Click on any stage to learn about its governance characteristics, strengths, limitations, and real-world examples. Compare different models to understand their evolutionary relationships.",
        stagePropertiesTitle: "Understanding Stage Properties",
        viewTitle: "View by Stage",
        compareTitle: "Compare Stages",
        filterTitle: "Filter by Properties",
        detailsTitle: "Governance Details",
        selectStage: "Select a stage to view details",
        governanceMatrixTitle: "Governance Interaction Matrix",
        governanceMatrixDescription: "This interactive component shows how different governance models interact and complement each other. Select two models to explore their dynamics and integration patterns."
      },
      
      bridge: {
        title: "Personal-to-Collective Bridge",
        description: "Discover how your personal development journey connects to collective governance evolution and how you can contribute effectively from your current center of gravity.",
        assessmentTitle: "Your Governance Perspective",
        assessmentIntro: "Understanding your own center of gravity helps you identify how you can most effectively engage with governance systems.",
        engagementTitle: "Effective Engagement Strategies",
        engagementIntro: "Each developmental stage offers unique capacities for contributing to governance evolution.",
        communicationTitle: "Cross-Stage Communication",
        communicationIntro: "Learn how to communicate effectively with people centered at different stages about governance issues.",
        developmentTitle: "Development Pathways",
        developmentIntro: "Explore practices that support both personal and collective evolution toward more conscious governance."
      },
      
      examples: {
        title: "Governance Examples",
        description: "Explore historical, contemporary, and fictional examples of different governance models across the developmental spectrum."
      },
      
      guides: {
        title: "Practical Implementation Guides",
        description: "Concrete tools and practices for implementing more conscious governance at various scales.",
        individualTitle: "Individual Practices",
        individualDesc: "Personal practices that develop capacities for participating in more conscious governance systems.",
        organizationTitle: "Organizational Implementation",
        organizationDesc: "Frameworks and tools for evolving governance in organizations and communities.",
        municipalTitle: "Municipal and Regional Applications",
        municipalDesc: "Approaches for bringing conscious governance principles to local and regional governance.",
        globalTitle: "National and Global Considerations",
        globalDesc: "Strategies for contributing to governance evolution at national and international scales.",
        resourcesTitle: "Additional Resources",
        resourcesDesc: "Books, courses, communities, and other resources to support your conscious governance journey."
      }
    },
    sv: {
      title: "Medveten Styrning",
      subtitle: "Att överbrygga personlig utveckling med systemisk evolution",
      introduction: "Denna sektion utforskar hur våra kollektiva styrningssystem utvecklas tillsammans med mänskligt medvetande, och erbjuder verktyg för att överbrygga personlig utveckling med systemisk förändring.",
      
      tabs: {
        overview: "Översikt",
        explorer: "Styrningsutforskare",
        examples: "Verkliga Exempel",
        bridge: "Personlig-Kollektiv Brygga",
        guides: "Implementeringsguider"
      },
      
      overview: {
        evolutionTitle: "Styrningens Evolution",
        evolutionText: "Styrningsmodeller utvecklas naturligt när kollektivt medvetande utvecklas. Varje stadium bygger på tidigare stadier, transcenderar begränsningar samtidigt som det integrerar styrkor.",
        
        spiralGovernanceTitle: "Spiralen av Styrningsevolution",
        spiralGovernanceText: "Precis som individuellt medvetande utvecklas genom utvecklingsspiralen, följer våra kollektiva styrningssystem en liknande bana och blir mer komplexa, inkluderande och adaptiva över tid.",
        
        governanceEmergenceTitle: "Hur Styrningsmodeller Uppstår",
        governanceEmergenceText: "Styrningssystem uppstår som svar på livsvillkor och utmaningar som samhällen står inför. När befintliga system inte längre effektivt kan hantera nya komplexiteter sker evolution mot mer adaptiva modeller.",
        
        integrationTitle: "Att Integrera Flera Perspektiv",
        integrationText: "Avancerad styrning erkänner värdet av varje utvecklingsstadium. Istället för att helt avvisa tidigare modeller integrerar medveten styrning deras hälsosamma aspekter samtidigt som den transcenderar deras begränsningar.",
        
        personalCollectiveTitle: "Kopplingen Mellan Personlig och Kollektiv",
        personalCollectiveText: "Våra styrningssystem återspeglar vårt kollektiva medvetande, och vår personliga utveckling påverkar systemen vi kan skapa och upprätthålla. Detta ömsesidiga förhållande innebär att både personlig och systemisk evolution är nödvändig för meningsfull förändring.",
        governanceEvolutionTitle: "Styrningsevolutionens Stadier",
      },
      
      explorer: {
        title: "Utforskare för Styrningsmodeller",
        description: "Utforska hur styrning utvecklas genom olika stadier av medvetandeutveckling. Varje stadium representerar en särskild världsbild med motsvarande styrningsstrukturer och beslutsprocesser.",
        instructionsTitle: "Hur du använder denna utforskare",
        instructions: "Klicka på vilket stadium som helst för att lära dig om dess styrningsegenskaper, styrkor, begränsningar och verkliga exempel. Jämför olika modeller för att förstå deras evolutionära relationer.",
        stagePropertiesTitle: "Förstå Stadieegenskaper",
        viewTitle: "Visa efter Stadium",
        compareTitle: "Jämför Stadier",
        filterTitle: "Filtrera efter Egenskaper",
        detailsTitle: "Styrningsdetaljer",
        selectStage: "Välj ett stadium för att visa detaljer",
        governanceMatrixTitle: "Styrningsinteraktionsmatris",
        governanceMatrixDescription: "Denna interaktiva komponent visar hur olika styrningsmodeller interagerar och kompletterar varandra. Välj två modeller för att utforska deras dynamik och integrationsmönster."
      },
      
      examples: {
        title: "Styrningsexempel",
        description: "Utforska historiska, samtida och fiktiva exempel på olika styrningsmodeller över hela utvecklingsspektrumet."
      },
      
      bridge: {
        title: "Bro från Personlig till Kollektiv",
        description: "Upptäck hur din personliga utvecklingsresa kopplar till kollektiv styrningsevolution och hur du kan bidra effektivt från ditt nuvarande gravitationscentrum.",
        assessmentTitle: "Ditt Styrningsperspektiv",
        assessmentIntro: "Att förstå ditt eget gravitationscentrum hjälper dig att identifiera hur du mest effektivt kan engagera dig i styrningssystem.",
        engagementTitle: "Effektiva Engagemangsstrategier",
        engagementIntro: "Varje utvecklingsstadium erbjuder unika förmågor för att bidra till styrningsevolution.",
        communicationTitle: "Kommunikation Mellan Stadier",
        communicationIntro: "Lär dig hur du effektivt kommunicerar med personer centrerade i olika stadier om styrningsfrågor.",
        developmentTitle: "Utvecklingsvägar",
        developmentIntro: "Utforska praktiker som stödjer både personlig och kollektiv evolution mot mer medveten styrning."
      },
      
      guides: {
        title: "Praktiska Implementeringsguider",
        description: "Konkreta verktyg och praktiker för att implementera mer medveten styrning i olika skalor.",
        individualTitle: "Individuella Praktiker",
        individualDesc: "Personliga praktiker som utvecklar förmågor för att delta i mer medvetna styrningssystem.",
        organizationTitle: "Organisationsimplementering",
        organizationDesc: "Ramverk och verktyg för att utveckla styrning i organisationer och samhällen.",
        municipalTitle: "Kommunala och Regionala Tillämpningar",
        municipalDesc: "Metoder för att föra principer för medveten styrning till lokal och regional styrning.",
        globalTitle: "Nationella och Globala Överväganden",
        globalDesc: "Strategier för att bidra till styrningsevolution på nationell och internationell nivå.",
        resourcesTitle: "Ytterligare Resurser",
        resourcesDesc: "Böcker, kurser, gemenskaper och andra resurser för att stödja din resa mot medveten styrning."
      }
    }
  };

  $: t = translations[currentLanguage];
  
  // Helper function to get stage color
  function getStageColor(stage: string): string {
    return stages[stage]?.color || "#808080";
  }
</script>

<svelte:head>
  <title>{t.title} | Spiralize</title>
  <meta name="description" content={t.subtitle}>
</svelte:head>

<div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-7xl mx-auto">
    <!-- Header -->
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">
        {t.title}
      </h1>
      <p class="text-xl text-gray-600 max-w-3xl mx-auto">
        {t.subtitle}
      </p>
      <p class="mt-4 text-gray-600 max-w-3xl mx-auto">
        {t.introduction}
      </p>
    </div>

    <!-- Tab Navigation -->
    <div class="mb-8">
      <div class="border-b border-gray-200">
        <nav class="flex space-x-4 overflow-x-auto" aria-label="Tabs">
          <button
            class={`py-2 px-3 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'overview' ? 'border-purple-600 text-purple-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            on:click={() => activeTab = 'overview'}
          >
            {t.tabs.overview}
          </button>
          <button
            class={`py-2 px-3 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'explorer' ? 'border-purple-600 text-purple-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            on:click={() => activeTab = 'explorer'}
          >
            {t.tabs.explorer}
          </button>
          <button
            class={`py-2 px-3 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'examples' ? 'border-purple-600 text-purple-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            on:click={() => activeTab = 'examples'}
          >
            {t.tabs.examples}
          </button>
          <button
            class={`py-2 px-3 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'bridge' ? 'border-purple-600 text-purple-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            on:click={() => activeTab = 'bridge'}
          >
            {t.tabs.bridge}
          </button>
          <button
            class={`py-2 px-3 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'guides' ? 'border-purple-600 text-purple-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            on:click={() => activeTab = 'guides'}
          >
            {t.tabs.guides}
          </button>
        </nav>
      </div>
    </div>

    <!-- Overview Tab Content -->
    {#if activeTab === 'overview'}
      <div class="grid gap-8 md:grid-cols-2">
        <div class="bg-white rounded-xl shadow-sm p-6">
          <h2 class="text-xl font-semibold mb-4">{t.overview.evolutionTitle}</h2>
          <p class="text-gray-600">{t.overview.evolutionText}</p>
        </div>
        <div class="bg-white rounded-xl shadow-sm p-6">
          <h2 class="text-xl font-semibold mb-4">{t.overview.spiralGovernanceTitle}</h2>
          <p class="text-gray-600">{t.overview.spiralGovernanceText}</p>
        </div>
        <div class="bg-white rounded-xl shadow-sm p-6">
          <h2 class="text-xl font-semibold mb-4">{t.overview.governanceEmergenceTitle}</h2>
          <p class="text-gray-600">{t.overview.governanceEmergenceText}</p>
        </div>
        <div class="bg-white rounded-xl shadow-sm p-6">
          <h2 class="text-xl font-semibold mb-4">{t.overview.integrationTitle}</h2>
          <p class="text-gray-600">{t.overview.integrationText}</p>
        </div>
        <div class="bg-white rounded-xl shadow-sm p-6 md:col-span-2">
          <h2 class="text-xl font-semibold mb-4">{t.overview.personalCollectiveTitle}</h2>
          <p class="text-gray-600">{t.overview.personalCollectiveText}</p>
        </div>
        
        <!-- Governance Evolution Visualization -->
        <div class="bg-white rounded-xl shadow-sm p-6 md:col-span-2">
          <h2 class="text-xl font-semibold mb-4">{t.overview.governanceEvolutionTitle}</h2>
          <div class="space-y-4">
            {#each Object.entries(governanceModels) as [stage, model]}
              <div 
                class="p-4 rounded-lg"
                style="background-color: {getStageColor(stage)}25; border-left: 4px solid {getStageColor(stage)}"
              >
                <h3 class="font-semibold">{stage.charAt(0).toUpperCase() + stage.slice(1)}: {model[currentLanguage].name}</h3>
                <p class="text-sm text-gray-700">{model[currentLanguage].description}</p>
              </div>
            {/each}
          </div>
        </div>
      </div>
    {/if}

    <!-- Explorer Tab Content -->
    {#if activeTab === 'explorer'}
      <div class="bg-white rounded-xl shadow-sm p-6">
        <h2 class="text-2xl font-semibold mb-4">{t.explorer.title}</h2>
        <p class="text-gray-600 mb-6">{t.explorer.description}</p>
        
        <div class="mb-6">
          <h3 class="font-medium text-lg mb-2">{t.explorer.instructionsTitle}</h3>
          <p class="text-gray-600">{t.explorer.instructions}</p>
        </div>
        
        <!-- Interactive Governance Explorer -->
        <GovernanceModelExplorer />
        
        <!-- Governance Matrix -->
        <div class="mt-8">
          <h3 class="font-medium text-lg mb-4">{t.explorer.governanceMatrixTitle}</h3>
          <GovernanceMatrix />
          <p class="text-sm text-gray-500 mt-2">{t.explorer.governanceMatrixDescription}</p>
        </div>
      </div>
    {/if}

    <!-- Examples Tab Content -->
    {#if activeTab === 'examples'}
      <div class="bg-white rounded-xl shadow-sm p-6">
        <h2 class="text-2xl font-semibold mb-4">{t.examples.title}</h2>
        <p class="text-gray-600 mb-6">{t.examples.description}</p>
        
        <!-- Examples Component -->
        <GovernanceExamplesComponent language={currentLanguage} />
      </div>
    {/if}

    <!-- Personal-Collective Bridge Tab Content -->
    {#if activeTab === 'bridge'}
      <div class="bg-white rounded-xl shadow-sm p-6">
        <h2 class="text-2xl font-semibold mb-4">{t.bridge.title}</h2>
        <p class="text-gray-600 mb-6">{t.bridge.description}</p>
        
        <!-- Bridge Tool -->
        <PersonalCollectiveBridge />
      </div>
    {/if}

    <!-- Implementation Guides Tab Content -->
    {#if activeTab === 'guides'}
      <div class="bg-white rounded-xl shadow-sm p-6">
        <h2 class="text-2xl font-semibold mb-4">{t.guides.title}</h2>
        <p class="text-gray-600 mb-6">{t.guides.description}</p>
        
        <!-- Implementation Guides -->
        <ImplementationGuides />
      </div>
    {/if}

    <!-- Share section -->
    <div class="mt-12">
      <ShareButtons />
    </div>
    
  </div>
</div>
