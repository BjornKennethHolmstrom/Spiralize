<!-- src/routes/insights/peace/+page.svelte -->
<script lang="ts">
  import languageStore from '$lib/stores/languageStore';
  import { base } from '$app/paths';
  import ShareButtons from '$lib/components/ShareButtons.svelte';
  import SpiralPeaceWheel from '$lib/components/SpiralPeaceWheel.svelte';
  import PeaceQuiz from '$lib/components/PeaceQuiz.svelte';
  import CaseStudyBox from '$lib/components/CaseStudyBox.svelte';
  import LearnMoreSection from '$lib/components/LearnMoreSection.svelte';

  const { language } = languageStore;
  $: currentLanguage = $language;

  // Additional state variables
  let activeStage: string | null = null;
  let selectedCaseStudy: string = 'south-africa';
  let quizResultStage: string | null = null;
  let activeTab: string = 'overview';

  // Handle spiral stage selection
  function handleStageSelect(event) {
    activeStage = event.detail.stage;
  }
  
  // Handle quiz results
  function handleQuizResults(event) {
    quizResultStage = event.detail.dominantStage;
    // When we get results, navigate to the Learn More tab
    activeTab = 'learn-more';
  }
  
  // Function to set active tab
  function setActiveTab(tab: string) {
    activeTab = tab;
  }
  
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

  // Translations
  const translations = {
    en: {
      title: "Peace Through Evolution: A Spiral Dynamics Perspective",
      subtitle: "Understanding how consciousness development shapes conflict and harmony",
      tabs: {
        overview: "Overview",
        explore: "Explore Stages",
        quiz: "Peace Quiz",
        cases: "Case Studies",
        learn: "Learn More"
      },
      introduction: {
        p1: "Peace isn't just the absence of conflict—it's the presence of understanding across human developmental stages. Spiral Dynamics reveals how evolving consciousness, from tribal survival to global unity, can transform conflict into cooperation.",
        p2: "As we evolve through different stages of consciousness, our understanding of peace transforms. What begins as basic security in early stages can develop into a profound recognition of our shared humanity and interconnectedness."
      },
      spiralOverview: {
        title: "Peace Through the Spiral",
        description: "Each stage of development offers unique perspectives on peace and conflict. Understanding these perspectives can help us create more effective approaches to peacebuilding that address the full spectrum of human consciousness."
      },
      stageInsights: {
        title: "How Different Stages View Peace",
        beige: {
          title: "Survival Peace",
          focus: "Basic safety and immediate needs",
          perspective: "Peace means having enough resources to survive and being free from immediate threats. Conflict arises over scarcity of essential resources.",
          approach: "Focus on meeting basic human needs as the foundation for any peace process."
        },
        purple: {
          title: "Tribal Peace",
          focus: "Group safety and traditional harmony",
          perspective: "Peace means safety within the tribe or clan, and harmony with ancestral traditions and spirits. Conflict is often seen as disruption of sacred order.",
          approach: "Honor traditions and community bonds while building bridges between different groups."
        },
        red: {
          title: "Power Peace",
          focus: "Strength and dominance",
          perspective: "Peace comes through strength and the ability to protect oneself and one's interests. Respect is earned through power.",
          approach: "Acknowledge power dynamics while channeling assertive energy toward productive outcomes."
        },
        blue: {
          title: "Order Peace",
          focus: "Structure, rules, and morality",
          perspective: "Peace results from everyone following proper rules and procedures. Stability and moral correctness are paramount.",
          approach: "Establish clear structures and principles that all parties can respect and follow."
        },
        orange: {
          title: "Strategic Peace",
          focus: "Mutual benefit and rational solutions",
          perspective: "Peace is achieved through negotiation, compromise, and arrangements that benefit all parties. Conflict is inefficient.",
          approach: "Create win-win solutions that appeal to strategic self-interest and measurable outcomes."
        },
        green: {
          title: "Inclusive Peace",
          focus: "Equality, healing, and reconciliation",
          perspective: "Peace requires addressing historical injustices and ensuring all voices are heard. Harmony comes through understanding others' experiences.",
          approach: "Facilitate inclusive dialogue that honors all perspectives and focuses on healing relationships."
        },
        yellow: {
          title: "Systemic Peace",
          focus: "Integration of multiple perspectives",
          perspective: "Peace emerges from understanding complex systems and integrating the healthy aspects of all prior stages. Conflict is a puzzle to be solved.",
          approach: "Design adaptive systems that address the root causes of conflict while respecting different worldviews."
        },
        turquoise: {
          title: "Holistic Peace",
          focus: "Global consciousness and interconnection",
          perspective: "Peace flows from recognizing our fundamental interconnectedness with all life. Separation is an illusion that breeds conflict.",
          approach: "Nurture awareness of our shared humanity and planetary consciousness while taking practical action."
        },
        coral: {
          title: "Evolutionary Peace",
          focus: "Conscious co-creation",
          perspective: "Peace emerges through the interplay of sovereign creativity and universal harmony. Each individual contributes uniquely to collective evolution.",
          approach: "Pioneer new paradigms of governance and relationship that transcend previous limitations."
        }
      },
      bridgingStages: {
        title: "Bridging to Higher Consciousness",
        description: "Moving toward more integrative stages of consciousness opens new possibilities for peace. This evolution isn't about rejecting earlier stages, but rather including their healthy aspects while transcending their limitations.",
        integration: "Yellow consciousness integrates perspectives from all stages into cohesive systems, recognizing that different approaches are needed in different contexts.",
        holism: "Turquoise consciousness perceives humanity as one interconnected whole, dissolving the root causes of conflict through recognition of our shared being.",
        evolution: "As consciousness evolves, so does our capacity for peace. Education in non-dual awareness and systems thinking can accelerate this evolution, moving cultures toward more comprehensive peace."
      },
      caseStudy: {
        title: "Case Study: South Africa's Peace Journey",
        subtitle: "A Multi-Stage Approach to Reconciliation",
        content: "South Africa's Truth and Reconciliation Commission blended Purple's Ubuntu philosophy, Blue's justice frameworks, Green's inclusion of all voices, and Yellow's systems thinking to heal post-apartheid divides. By acknowledging multiple worldviews and developmental stages, this process created space for genuine healing and transformation.",
        learnMore: "Learn more about this and other case studies at globalgovernanceframework.org"
      },
      peaceTool: {
        title: "Where Are You on the Peace Spiral?",
        description: "Take this brief self-assessment to discover your dominant perspective on peace and conflict. Understanding your own center of gravity can help you communicate more effectively with people at different stages and expand your peace-building toolkit.",
        startButton: "Start Assessment"
      },
      resources: {
        title: "Resources & Next Steps",
        intro: "Ready to deepen your understanding and application of peace through Spiral Dynamics?",
        exploreSpiralLink: "Explore more about Spiral Dynamics with our guides",
        governanceLink: "Learn how consciousness shapes governance",
        closingMessage: "Evolving consciousness is the key to lasting peace—start your journey today."
      }
    },
    sv: {
      title: "Fred Genom Evolution: Ett Spiral Dynamics Perspektiv",
      subtitle: "Förstå hur medvetandeutveckling formar konflikt och harmoni",
      tabs: {
        overview: "Översikt",
        explore: "Utforska Stadier",
        quiz: "Fredstestet",
        cases: "Fallstudier",
        learn: "Lär Mer"
      },
      introduction: {
        p1: "Fred är inte bara frånvaron av konflikt—det är närvaron av förståelse över mänskliga utvecklingsstadier. Spiral Dynamics visar hur utvecklande medvetande, från stamöverlevnad till global enhet, kan omvandla konflikt till samarbete.",
        p2: "När vi utvecklas genom olika stadier av medvetande, förändras vår förståelse för fred. Det som börjar som grundläggande säkerhet i tidiga stadier kan utvecklas till en djup insikt om vår gemensamma mänsklighet och sammankoppling."
      },
      spiralOverview: {
        title: "Fred Genom Spiralen",
        description: "Varje utvecklingsstadium erbjuder unika perspektiv på fred och konflikt. Att förstå dessa perspektiv kan hjälpa oss att skapa mer effektiva metoder för fredsbyggande som adresserar hela spektrumet av mänskligt medvetande."
      },
      stageInsights: {
        title: "Hur Olika Stadier Ser På Fred",
        beige: {
          title: "Överlevnadsfred",
          focus: "Grundläggande säkerhet och omedelbara behov",
          perspective: "Fred betyder att ha tillräckligt med resurser för att överleva och vara fri från omedelbara hot. Konflikt uppstår över brist på nödvändiga resurser.",
          approach: "Fokusera på att möta grundläggande mänskliga behov som grunden för varje fredsprocess."
        },
        purple: {
          title: "Stamfred",
          focus: "Gruppsäkerhet och traditionell harmoni",
          perspective: "Fred betyder säkerhet inom stammen eller klanen, och harmoni med förfäders traditioner och andar. Konflikt ses ofta som störning av helig ordning.",
          approach: "Hedra traditioner och gemenskapsband samtidigt som broar byggs mellan olika grupper."
        },
        red: {
          title: "Maktfred",
          focus: "Styrka och dominans",
          perspective: "Fred kommer genom styrka och förmågan att skydda sig själv och sina intressen. Respekt förtjänas genom makt.",
          approach: "Erkänn maktdynamik samtidigt som bestämd energi kanaliseras mot produktiva resultat."
        },
        blue: {
          title: "Ordningsfred",
          focus: "Struktur, regler och moral",
          perspective: "Fred uppstår när alla följer korrekta regler och procedurer. Stabilitet och moralisk korrekthet är av största vikt.",
          approach: "Upprätta tydliga strukturer och principer som alla parter kan respektera och följa."
        },
        orange: {
          title: "Strategisk Fred",
          focus: "Ömsesidig nytta och rationella lösningar",
          perspective: "Fred uppnås genom förhandling, kompromiss och arrangemang som gynnar alla parter. Konflikt är ineffektivt.",
          approach: "Skapa win-win-lösningar som tilltalar strategiskt egenintresse och mätbara resultat."
        },
        green: {
          title: "Inkluderande Fred",
          focus: "Jämlikhet, läkning och försoning",
          perspective: "Fred kräver att historiska orättvisor adresseras och att alla röster hörs. Harmoni kommer genom förståelse för andras erfarenheter.",
          approach: "Främja inkluderande dialog som hedrar alla perspektiv och fokuserar på att läka relationer."
        },
        yellow: {
          title: "Systemisk Fred",
          focus: "Integration av flera perspektiv",
          perspective: "Fred uppstår från förståelse av komplexa system och integration av de hälsosamma aspekterna från alla tidigare stadier. Konflikt är ett pussel att lösa.",
          approach: "Designa adaptiva system som adresserar grundorsakerna till konflikt samtidigt som olika världsbilder respekteras."
        },
        turquoise: {
          title: "Holistisk Fred",
          focus: "Globalt medvetande och sammankoppling",
          perspective: "Fred flödar från insikten om vår grundläggande sammankoppling med allt liv. Separation är en illusion som föder konflikt.",
          approach: "Främja medvetenhet om vår gemensamma mänsklighet och planetära medvetande samtidigt som praktisk handling tas."
        },
        coral: {
          title: "Evolutionär Fred",
          focus: "Medveten samskapande",
          perspective: "Fred uppstår genom samspelet mellan suverän kreativitet och universell harmoni. Varje individ bidrar unikt till kollektiv evolution.",
          approach: "Bana väg för nya paradigm av styrning och relationer som överskrider tidigare begränsningar."
        }
      },
      bridgingStages: {
        title: "Att Bygga Broar till Högre Medvetande",
        description: "Att röra sig mot mer integrativa stadier av medvetande öppnar nya möjligheter för fred. Denna evolution handlar inte om att förkasta tidigare stadier, utan snarare om att inkludera deras hälsosamma aspekter samtidigt som man överskrider deras begränsningar.",
        integration: "Gult medvetande integrerar perspektiv från alla stadier till sammanhängande system, och erkänner att olika tillvägagångssätt behövs i olika sammanhang.",
        holism: "Turkost medvetande uppfattar mänskligheten som en sammankopplad helhet, och upplöser grundorsakerna till konflikt genom insikt om vår gemensamma existens.",
        evolution: "När medvetandet utvecklas, utvecklas också vår kapacitet för fred. Utbildning i icke-dualistisk medvetenhet och systemtänkande kan accelerera denna evolution, och flytta kulturer mot mer omfattande fred."
      },
      caseStudy: {
        title: "Fallstudie: Sydafrikas Fredsresa",
        subtitle: "Ett Flerstadie-Tillvägagångssätt för Försoning",
        content: "Sydafrikas Sannings- och försoningskommission blandade Purple's Ubuntu-filosofi, Blue's rättviseramverk, Green's inkludering av alla röster, och Yellow's systemtänkande för att läka post-apartheid klyftor. Genom att erkänna flera världsbilder och utvecklingsstadier skapade denna process utrymme för äkta läkning och transformation.",
        learnMore: "Lär dig mer om detta och andra fallstudier på globalgovernanceframework.org"
      },
      peaceTool: {
        title: "Var Befinner Du Dig på Fredsspiralen?",
        description: "Ta denna korta självbedömning för att upptäcka ditt dominerande perspektiv på fred och konflikt. Att förstå ditt eget gravitationscentrum kan hjälpa dig att kommunicera mer effektivt med människor i olika stadier och utöka din fredsbyggande verktygslåda.",
        startButton: "Starta Bedömning"
      },
      resources: {
        title: "Resurser & Nästa Steg",
        intro: "Redo att fördjupa din förståelse och tillämpning av fred genom Spiral Dynamics?",
        exploreSpiralLink: "Utforska mer om Spiral Dynamics med våra guider",
        governanceLink: "Lär dig hur medvetande formar styrning",
        closingMessage: "Evolverande medvetande är nyckeln till varaktig fred—börja din resa idag."
      }
    }
  };

  // Reactive translations based on current language
  $: t = translations[currentLanguage];
</script>

<svelte:head>
  <title>{currentLanguage === 'en' ? 'Peace Through Evolution | Spiralize' : 'Fred Genom Evolution | Spiralize'}</title>
  <meta name="description" content={currentLanguage === 'en' 
    ? 'Explore how Spiral Dynamics offers unique insights into peace processes by addressing different worldviews and values across developmental stages.' 
    : 'Utforska hur Spiral Dynamics erbjuder unika insikter i fredsprocesser genom att adressera olika världsbilder och värderingar över utvecklingsstadier.'}>
</svelte:head>

<div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-4xl mx-auto">
    <!-- Hero Section -->
    <div class="bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl text-white text-center px-6 py-16 mb-8">
      <h1 class="text-4xl md:text-5xl font-bold mb-4">
        {t.title}
      </h1>
      <p class="text-xl md:text-2xl mb-8 text-purple-100">
        {t.subtitle}
      </p>
    </div>

    <!-- Tab Navigation -->
    <div class="mb-8 border-b border-gray-200">
      <nav class="flex flex-wrap -mb-px" aria-label="Tabs">
        <button
          class={`mr-2 py-2 px-4 font-medium text-sm border-b-2 ${
            activeTab === 'overview' 
              ? 'border-purple-600 text-purple-600' 
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
          on:click={() => setActiveTab('overview')}
        >
          {t.tabs.overview}
        </button>
        <button
          class={`mr-2 py-2 px-4 font-medium text-sm border-b-2 ${
            activeTab === 'explore' 
              ? 'border-purple-600 text-purple-600' 
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
          on:click={() => setActiveTab('explore')}
        >
          {t.tabs.explore}
        </button>
        <button
          class={`mr-2 py-2 px-4 font-medium text-sm border-b-2 ${
            activeTab === 'quiz' 
              ? 'border-purple-600 text-purple-600' 
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
          on:click={() => setActiveTab('quiz')}
        >
          {t.tabs.quiz}
        </button>
        <button
          class={`mr-2 py-2 px-4 font-medium text-sm border-b-2 ${
            activeTab === 'cases' 
              ? 'border-purple-600 text-purple-600' 
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
          on:click={() => setActiveTab('cases')}
        >
          {t.tabs.cases}
        </button>
        <button
          class={`mr-2 py-2 px-4 font-medium text-sm border-b-2 ${
            activeTab === 'learn-more' 
              ? 'border-purple-600 text-purple-600' 
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
          on:click={() => setActiveTab('learn-more')}
        >
          {t.tabs.learn}
        </button>
      </nav>
    </div>

    {#if activeTab === 'overview'}
      <!-- Introduction Section -->
      <div class="bg-white rounded-xl shadow-sm p-8 mb-12">
        <p class="text-lg text-gray-700 mb-4">
          {t.introduction.p1}
        </p>
        <p class="text-lg text-gray-700">
          {t.introduction.p2}
        </p>
      </div>

      <!-- Spiral Overview Section -->
      <div class="mb-12">
        <h2 class="text-3xl font-semibold text-center mb-6">
          {t.spiralOverview.title}
        </h2>
        <p class="text-lg text-gray-600 text-center mb-8">
          {t.spiralOverview.description}
        </p>

        <!-- This is where you would place your SpiralPeaceWheel component -->
        <div class="bg-gray-100 rounded-xl p-8">
          <SpiralPeaceWheel 
            language={currentLanguage}
            on:select={handleStageSelect}
          />
        </div>
      </div>
    {/if}

    {#if activeTab === 'explore'}
      <!-- Stage Insights Section -->
      <div class="mb-12">
        <h2 class="text-2xl font-semibold mb-6">
          {t.stageInsights.title}
        </h2>

        <div class="grid gap-6 md:grid-cols-2">
          {#each Object.entries(t.stageInsights).filter(([key]) => key !== 'title') as [stage, content]}
            <div class="bg-white rounded-xl shadow-sm overflow-hidden">
              <div class="p-6 border-l-4" style="border-color: {stageColors[stage]}">
                <h3 class="text-xl font-medium mb-2">
                  {content.title}
                </h3>
                <div class="text-sm font-medium text-purple-600 mb-4">
                  {content.focus}
                </div>
                <p class="text-gray-600 mb-4">
                  {content.perspective}
                </p>
                <div class="text-sm font-medium text-gray-700">
                  {currentLanguage === 'en' ? 'Approach:' : 'Tillvägagångssätt:'}
                </div>
                <p class="text-gray-600">
                  {content.approach}
                </p>
              </div>
            </div>
          {/each}
        </div>
      </div>

      <!-- Bridging to Higher Stages Section -->
      <div class="bg-white rounded-xl shadow-sm p-8 mb-12">
        <h2 class="text-2xl font-semibold mb-4">
          {t.bridgingStages.title}
        </h2>
        <p class="text-gray-600 mb-6">
          {t.bridgingStages.description}
        </p>
        <div class="space-y-4">
          <div class="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
            <p class="text-gray-700">
              {t.bridgingStages.integration}
            </p>
          </div>
          <div class="bg-teal-50 p-4 rounded-lg border-l-4 border-teal-400">
            <p class="text-gray-700">
              {t.bridgingStages.holism}
            </p>
          </div>
          <div class="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-400">
            <p class="text-gray-700">
              {t.bridgingStages.evolution}
            </p>
          </div>
        </div>
      </div>
    {/if}

    {#if activeTab === 'cases'}
      <!-- Case Study Section -->
      <div class="mb-12">
        <h2 class="text-2xl font-semibold mb-6">
          {t.caseStudy.title}
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <button
            class={`p-3 rounded-lg text-left border ${selectedCaseStudy === 'south-africa' ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:bg-gray-50'}`}
            on:click={() => selectedCaseStudy = 'south-africa'}
          >
            <div class="font-medium">South Africa's TRC</div>
            <div class="text-sm text-gray-500">Post-Apartheid Reconciliation</div>
          </button>
          
          <button
            class={`p-3 rounded-lg text-left border ${selectedCaseStudy === 'colombia' ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:bg-gray-50'}`}
            on:click={() => selectedCaseStudy = 'colombia'}
          >
            <div class="font-medium">Colombia's Peace Process</div>
            <div class="text-sm text-gray-500">FARC Conflict Resolution</div>
          </button>
        </div>
        
        <CaseStudyBox 
          language={currentLanguage}
          caseId={selectedCaseStudy}
        />
      
        <div class="mt-4 text-center">
          <a 
            href="https://globalgovernanceframework.org" 
            target="_blank" 
            rel="noopener noreferrer"
            class="text-purple-600 hover:text-purple-800 font-medium inline-flex items-center"
          >
            {t.caseStudy.learnMore}
            <svg class="w-4 h-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    {/if}

    {#if activeTab === 'quiz'}
      <!-- Peace Self-Assessment Tool Section -->
      <div id="quiz-section" class="bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl shadow-sm p-8 mb-12 text-white">
        <h2 class="text-2xl font-semibold mb-4">
          {t.peaceTool.title}
        </h2>
        <p class="mb-6 text-purple-100">
          {t.peaceTool.description}
        </p>
        
        <PeaceQuiz 
          language={currentLanguage} 
          on:results={handleQuizResults}
        />
      </div>
    {/if}

    {#if activeTab === 'learn-more'}
      <!-- Resources Section -->
      <div class="bg-white rounded-xl shadow-sm p-8 mb-12">
        <h2 class="text-2xl font-semibold mb-4">
          {t.resources.title}
        </h2>
        <p class="text-gray-600 mb-6">
          {t.resources.intro}
        </p>
        <div class="space-y-4">
          <a 
            href="{base}/spiral" 
            class="block p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors flex items-center"
          >
            <span class="text-2xl mr-4">🌀</span>
            <span class="text-gray-800 font-medium">{t.resources.exploreSpiralLink}</span>
          </a>
          <a 
            href="{base}/insights/governance" 
            target="_blank" 
            rel="noopener noreferrer"
            class="block p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors flex items-center"
          >
            <span class="text-2xl mr-4">🌍</span>
            <span class="text-gray-800 font-medium">{t.resources.governanceLink}</span>
          </a>
        </div>
        <p class="mt-6 text-center text-gray-600 italic">
          {t.resources.closingMessage}
        </p>
      </div>

      <!-- Learn More Section -->
      <div id="learn-more-section" class="mt-12">
        <LearnMoreSection 
          language={currentLanguage}
          dominantStage={quizResultStage}
        />
      </div>
    {/if}

    <!-- Share Buttons Component -->
    <ShareButtons />

  </div>
</div>
