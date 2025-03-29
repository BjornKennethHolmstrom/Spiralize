<!-- src/routes/spiral/+page.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { stages } from '$lib/data/stages';
  import StageCard from '$lib/components/StageCard.svelte';
  import SpiralDiagram from '$lib/components/SpiralDiagram.svelte';
  import languageStore from '$lib/stores/languageStore';
  import ShareButtons from '$lib/components/ShareButtons.svelte';
  import TabNav from '$lib/components/TabNav.svelte'; // Reuse existing TabNav component
  import WorldSpiralMap from '$lib/components/WorldSpiralMap.svelte';
  const { language, toggleLanguage } = languageStore; 

  $: currentLanguage = $language;
  
  // Track expanded states and active stage
  let expandedStages: Record<string, boolean> = {};
  let activeStage: string | null = null;
  
  // Add activeTab state for tab navigation
  let activeTab: 'overview' | 'resources' | 'visualizations' = 'overview';
  
  const translations = {
    en: {
      title: "Explore the Spiral",
      subtitle: "Understanding the Evolution of Human Consciousness",
      introduction: `Spiral Dynamics describes how human consciousness and value systems evolve 
        through distinct stages, each representing a unique way of making sense of the world. 
        Rather than a rigid hierarchy, it's a dynamic spiral where each stage transcends and 
        includes the healthy aspects of previous stages.`,
      stageInstruction: "Click on any stage in the spiral to learn more about it.",
      emergenceTitle: "Stage Emergence",
      emergenceText: `Each stage emerges in response to specific life conditions and challenges. 
        As humans face new problems that can't be solved with current thinking, consciousness 
        evolves to meet these challenges. This evolution can happen at both individual and 
        societal levels.`,
      noteTitle: "Important Notes",
      notes: [
        "Every stage has both healthy and unhealthy expressions",
        "No stage is inherently 'better' - each is appropriate for its life conditions",
        "People and societies can operate from multiple stages in different areas of life",
        "Evolution through stages is not guaranteed or always linear",
        "The stages alternate between individualistic and collective focus",
        "Some qualities of advanced stages may appear similar to natural child-like states, but the key difference lies in conscious integration versus unconscious expression"
      ],
      tabs: {
        overview: "Overview",
        resources: "Resources",
        visualizations: "Interactive Visualizations"
      },
      resources: {
        videosTitle: "Video Resources",
        actualized: "Comprehensive series exploring the different stages of Spiral Dynamics with practical examples and philosophical insights.",
        practicalIntegral: "Clear and concise explanations of each stage with visual aids and real-world applications.",
        sdIntro: "Introduction to Spiral Dynamics",
        sdBeige: "Stage Beige: Survival",
        sdPurple: "Stage Purple: Tribal",
        sdRed: "Stage Red: Power",
        sdBlue: "Stage Blue: Order",
        sdOrange: "Stage Orange: Achievement",
        sdGreen: "Stage Green: Community",
        sdYellow: "Stage Yellow: Systemic",
        piIntro: "Origins and Development of Spiral Dynamics",
        piBeige: "Stage Beige: Survival Instincts",
        piPurple: "Stage Purple: Magical-Animistic",
        piRed: "Stage Red: Impulsive-Egocentric",
        piBlue: "Stage Blue: Purposeful-Authoritarian",
        piOrange: "Stage Orange: Strategic-Materialistic",
        piGreen: "Stage Green: Relativistic-Personalistic",
        piYellow: "Stage Yellow: Systemic-Integrative",
        piTurquoise: "Stage Turquoise: Holistic-Global",
        piCoral: "Stage Coral: Evolving Next Stage",
        booksTitle: "Essential Books",
        articlesTitle: "Articles & Papers",
        articlesNone: "None at the moment. Tips on articles are very welcome!",
        readMore: "Read More",
        visitWebsite: "Visit Website"
      }
    },
    sv: {
      title: "Utforska Spiralen",
      subtitle: "Förstå evolutionen av mänskligt medvetande",
      introduction: `Spiral Dynamics beskriver hur mänskligt medvetande och värdesystem utvecklas 
        genom distinkta stadier, där varje stadium representerar ett unikt sätt att förstå världen. 
        Snarare än en rigid hierarki är det en dynamisk spiral där varje stadium transcenderar och 
        inkluderar de friska aspekterna av tidigare stadier.`,
      stageInstruction: "Klicka på något stadium i spiralen för att lära dig mer om det.",
      emergenceTitle: "Stadiernas Framväxt",
      emergenceText: `Varje stadium växer fram som svar på specifika livsvillkor och utmaningar. 
        När människor möter nya problem som inte kan lösas med nuvarande tänkande, utvecklas 
        medvetandet för att möta dessa utmaningar. Denna evolution kan ske både på individuell 
        och samhällelig nivå.`,
      noteTitle: "Viktiga Noter",
      notes: [
        "Varje stadium har både friska och ofriska uttryck",
        "Inget stadium är i sig 'bättre' - varje är lämpligt för sina livsvillkor",
        "Människor och samhällen kan operera från flera stadier i olika livsområden",
        "Evolution genom stadier är inte garanterad eller alltid linjär",
        "Stadierna växlar mellan ett individuellt och kollektivt fokus",
        "Vissa kvaliteter i avancerade stadier kan likna naturliga barnsliga tillstånd, men nyckeln ligger i skillnaden mellan medveten integration och omedvetet uttryck"
      ],
      tabs: {
        overview: "Översikt",
        resources: "Resurser",
        visualizations: "Interaktiva Visualiseringar"
      },
      resources: {
        videosTitle: "Videoresurser",
        actualized: "Omfattande serie som utforskar de olika stadierna av Spiral Dynamics med praktiska exempel och filosofiska insikter.",
        practicalIntegral: "Tydliga och koncisa förklaringar av varje stadium med visuella hjälpmedel och verkliga tillämpningar.",
        sdIntro: "Introduktion till Spiral Dynamics",
        sdBeige: "Stadium Beige: Överlevnad",
        sdPurple: "Stadium Purple: Stamtillhörighet",
        sdRed: "Stadium Red: Makt",
        sdBlue: "Stadium Blue: Ordning",
        sdOrange: "Stadium Orange: Prestation",
        sdGreen: "Stadium Green: Gemenskap",
        sdYellow: "Stadium Yellow: Systemisk",
        piIntro: "Ursprung och utveckling av Spiral Dynamics",
        piBeige: "Stadium Beige: Överlevnadsinstinkter",
        piPurple: "Stadium Purple: Magisk-Animistisk",
        piRed: "Stadium Red: Impulsiv-Egocentrisk",
        piBlue: "Stadium Blue: Målmedveten-Auktoritär",
        piOrange: "Stadium Orange: Strategisk-Materialistisk",
        piGreen: "Stadium Green: Relativistisk-Personlig",
        piYellow: "Stadium Yellow: Systemisk-Integrativ",
        piTurquoise: "Stadium Turquoise: Holistisk-Global",
        piCoral: "Stadium Coral: Utvecklande Nästa Stadium",
        booksTitle: "Viktiga Böcker",
        articlesTitle: "Artiklar & Uppsatser",
        articlesNone: "Inga artiklar för tillfället. Tips mottages tacksamt!",
        readMore: "Läs Mer",
        visitWebsite: "Besök Webbplats"
      }
    }
  };

  // Books data
  const books = {
    en: [
      {
        title: "Spiral Dynamics: Mastering Values, Leadership, and Change",
        author: "Don Beck & Christopher Cowan",
        description: "The foundational text that details the complete Spiral Dynamics model, its theoretical background, and practical applications across various domains.",
        link: "https://www.amazon.com/Spiral-Dynamics-Mastering-Values-Leadership/dp/1405133562"
      },
      {
        title: "Levels of Human Existence",
        author: "Clare W. Graves",
        description: "Transcriptions of Clare W. Graves' original talks on his research and the emergence of value systems, edited by William R. Lee.",
        link: "https://spiraldynamics.org/shop/clare-w-graves-levels-human-existence/"
      },
      {
        title: "The Never Ending Quest",
        author: "Clare W. Graves, edited by Christopher Cowan & Natasha Todorovic",
        description: "A comprehensive collection of Clare W. Graves' original research papers and writings on his emergent cyclical theory of adult development.",
        link: "https://www.spiraldynamics.org/books/"
      },
      {
        title: "Integral Psychology",
        author: "Ken Wilber",
        description: "An integration of Spiral Dynamics with other developmental models within the broader framework of Integral Theory.",
        link: "https://www.amazon.com/Integral-Psychology-Consciousness-Therapy-Beyond/dp/1570625549"
      }
    ],
    sv: [
      {
        title: "Spiral Dynamics: Mastering Values, Leadership, and Change",
        author: "Don Beck & Christopher Cowan",
        description: "Grundläggande text som detaljerar den kompletta Spiral Dynamics-modellen, dess teoretiska bakgrund och praktiska tillämpningar inom olika domäner.",
        link: "https://www.amazon.com/Spiral-Dynamics-Mastering-Values-Leadership/dp/1405133562"
      },
      {
        title: "Levels of Human Existence",
        author: "Clare W. Graves",
        description: "Transkriptioner av Clare W. Graves ursprungliga föreläsningar om sin forskning och framväxten av värdesystem, redigerade av William R. Lee.",
        link: "https://spiraldynamics.org/shop/clare-w-graves-levels-human-existence/"
      },
      {
        title: "The Never Ending Quest",
        author: "Clare W. Graves, redigerad av Christopher Cowan & Natasha Todorovic",
        description: "En omfattande samling av Clare W. Graves ursprungliga forskningsartiklar och skrifter om hans framväxande cykliska teori om vuxenutveckling.",
        link: "https://www.spiraldynamics.org/books/"
      },
      {
        title: "Integral Psychology",
        author: "Ken Wilber",
        description: "En integration av Spiral Dynamics med andra utvecklingsmodeller inom det bredare ramverket för Integral Theory.",
        link: "https://www.amazon.com/Integral-Psychology-Consciousness-Therapy-Beyond/dp/1570625549"
      }
    ]
  };

  // Articles data
  const articles = {
    en: [
 /*     {
        title: "The Emergent, Cyclical, Double-Helix Model of the Adult Human Biopsychosocial Systems",
        author: "Clare W. Graves",
        description: "Dr. Graves' original paper introducing his model of human development, published in the Journal of the Boston Society for the Study of Systems (1970).",
        link: "https://www.clarewgraves.com/articles_content/1970_paper/1970_paper.html"
      },
      {
        title: "Spiral Dynamics and the Evolution of Consciousness",
        author: "Ken Wilber",
        description: "An exploration of how Spiral Dynamics maps onto the broader integral theory framework, integrating stages of consciousness development.",
        link: "https://integrallife.com/spiral-dynamics-integral/"
      },
      {
        title: "Second Tier Leadership: The Integral Leader",
        author: "Don Beck",
        description: "This paper explores the characteristics and capabilities of leaders operating from second-tier consciousness levels (Yellow and beyond).",
        link: "https://www.spiraldynamics.org/second-tier-leadership/"
      },
      {
        title: "The Spiral Dynamics of Societal Conflicts",
        author: "Said E. Dawlabani",
        description: "An application of Spiral Dynamics to understanding and resolving complex social conflicts and global challenges.",
        link: "https://www.memenomics.com/spiral-dynamics-of-conflict/"
      }*/
    ],
    sv: [
/*      {
        title: "The Emergent, Cyclical, Double-Helix Model of the Adult Human Biopsychosocial Systems",
        author: "Clare W. Graves",
        description: "Dr. Graves ursprungliga artikel som introducerar hans modell för mänsklig utveckling, publicerad i Journal of the Boston Society for the Study of Systems (1970).",
        link: "https://www.clarewgraves.com/articles_content/1970_paper/1970_paper.html"
      },
      {
        title: "Spiral Dynamics och Medvetandets Evolution",
        author: "Ken Wilber",
        description: "En utforskning av hur Spiral Dynamics passar in i det bredare integrala teoriramen, som integrerar stadier av medvetandeutveckling.",
        link: "https://integrallife.com/spiral-dynamics-integral/"
      },
      {
        title: "Second Tier Leadership: Den integrala ledaren",
        author: "Don Beck",
        description: "Denna artikel utforskar egenskaper och förmågor hos ledare som verkar från second-tier medvetandenivåer (Gult och bortom).",
        link: "https://www.spiraldynamics.org/second-tier-leadership/"
      },
      {
        title: "Spiral Dynamics av samhälleliga konflikter",
        author: "Said E. Dawlabani",
        description: "En tillämpning av Spiral Dynamics för att förstå och lösa komplexa sociala konflikter och globala utmaningar.",
        link: "https://www.memenomics.com/spiral-dynamics-of-conflict/"
      }*/
    ]
  };

  onMount(() => {
    // Check for tab parameter in URL
    const urlParams = new URLSearchParams(window.location.search);
    const tabParam = urlParams.get('tab');
    
    // Set active tab based on URL parameter if it exists
    if (tabParam) {
      if (tabParam === 'visualizations' || tabParam === 'resources' || tabParam === 'overview') {
        activeTab = tabParam;
      }
    }
  });

  // Update the URL when tab changes
  function setActiveTab(tab) {
    activeTab = tab;
    updateUrl(tab);
  }

  // Update URL without refreshing page
  function updateUrl(tab) {
    const url = new URL(window.location);
    url.searchParams.set('tab', tab);
    window.history.pushState({}, '', url);
  }

  $: t = translations[$language];

  function handleStageSelect(event: CustomEvent) {
    const { stage } = event.detail;
    activeStage = stage;
    expandedStages[stage] = true;
    
    // Scroll to the selected stage card
    const element = document.getElementById(`stage-${stage}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  $: title = currentLanguage === 'en'
    ? 'Understanding Spiral Dynamics Stages | Spiralize'
    : 'Förstå Spiral Dynamics Stadier | Spiralize';
    
  $: description = currentLanguage === 'en'
    ? 'Explore all stages of Spiral Dynamics from Beige to Ultraviolet. Learn how human consciousness evolves through different value systems and worldviews.'
    : 'Utforska alla stadier av Spiral Dynamics från Beige till Ultraviolett. Lär dig hur mänskligt medvetande utvecklas genom olika värdesystem och världsbilder.';

</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description}>
  <meta property="og:title" content={title}>
  <meta property="og:description" content={description}>
  <meta property="twitter:title" content={title}>
  <meta property="twitter:description" content={description}>
</svelte:head>

<div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-4xl mx-auto">
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">
        {t.title}
      </h1>
      <h2 class="text-xl text-gray-600 mb-6">
        {t.subtitle}
      </h2>
      <p class="text-gray-600 mb-8 max-w-3xl mx-auto">
        {t.introduction}
      </p>
    </div>

    <!-- Tab Navigation -->
    <div class="mb-8">
      <div class="border-b border-gray-200">
        <nav class="flex space-x-4 overflow-x-auto" aria-label="Tabs">
          <button
            class={`py-2 px-3 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'overview' ? 'border-purple-600 text-purple-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            on:click={() => setActiveTab('overview')}
          >
            {t.tabs.overview}
          </button>
          <button
            class={`py-2 px-3 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'resources' ? 'border-purple-600 text-purple-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            on:click={() => setActiveTab('resources')}
          >
            {t.tabs.resources}
          </button>
          <button
            class={`py-2 px-3 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'visualizations' ? 'border-purple-600 text-purple-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            on:click={() => setActiveTab('visualizations')}
          >
            {t.tabs.visualizations}
          </button>
        </nav>
      </div>
    </div>

    <!-- Overview Tab -->
    {#if activeTab === 'overview'}
      <!-- Spiral Diagram -->
      <div class="mb-12">
        <SpiralDiagram 
          language={$language} 
          {activeStage}
          on:stageSelect={handleStageSelect}
        />
        <p class="text-center text-sm text-gray-500 mt-4 italic">
          {t.stageInstruction}
        </p>
      </div>

      <!-- Theory Section -->
      <div class="bg-white rounded-xl shadow-sm p-8 mb-12">
        <h3 class="text-xl font-semibold mb-4">{t.emergenceTitle}</h3>
        <p class="text-gray-600 mb-6">{t.emergenceText}</p>
        
        <h4 class="font-semibold text-gray-900 mb-3">{t.noteTitle}</h4>
        <ul class="list-disc pl-5 space-y-2 text-gray-600">
          {#each t.notes as note}
            <li>{note}</li>
          {/each}
        </ul>
      </div>

      <!-- Stage Cards -->
      <div class="space-y-6">
        {#each Object.entries(stages) as [stageName, stageInfo]}
          <div id="stage-{stageName}">
            <StageCard
              {stageInfo}
              {stageName}
              language={$language}
              bind:expanded={expandedStages[stageName]}
            />
          </div>
        {/each}
      </div>
    {/if}

    <!-- Resources Tab -->
    {#if activeTab === 'resources'}
      <div class="bg-white rounded-xl shadow-sm p-8 mb-8">
        <!-- Books -->
        <h3 class="text-xl font-semibold mb-4">{t.resources.booksTitle}</h3>
        <div class="grid gap-4 md:grid-cols-2">
          {#each books[currentLanguage] as book}
            <div class="p-4 border border-gray-200 rounded-lg hover:border-purple-500 hover:shadow-sm transition-all">
              <h4 class="font-medium mb-1">{book.title}</h4>
              <p class="text-sm text-gray-500 mb-2">{book.author}</p>
              <p class="text-gray-600 mb-3 text-sm">{book.description}</p>
              {#if book.link}
                <a 
                  href={book.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  class="text-purple-600 flex items-center text-sm"
                >
                  <span>{t.resources.readMore}</span>
                  <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              {/if}
            </div>
          {/each}
        </div>

        <!-- Articles & Papers -->
        <h3 class="text-xl font-semibold mt-10 mb-4">{t.resources.articlesTitle}</h3>
        {t.resources.articlesNone}

        <div class="grid gap-4 md:grid-cols-2">
          {#each articles[currentLanguage] as article}
            <div class="p-4 border border-gray-200 rounded-lg hover:border-purple-500 hover:shadow-sm transition-all">
              <h4 class="font-medium mb-1">{article.title}</h4>
              <p class="text-sm text-gray-500 mb-2">{article.author}</p>
              <p class="text-gray-600 mb-3 text-sm">{article.description}</p>
              {#if article.link}
                <a 
                  href={article.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  class="text-purple-600 flex items-center text-sm"
                >
                  <span>{t.resources.readMore}</span>
                  <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              {/if}
            </div>
          {/each}
        </div>

        <!-- Video Resources -->
        <h3 class="text-xl font-semibold mt-10 mb-4">{t.resources.videosTitle}</h3>
        
        <!-- Series 1: Actualized.org -->
        <div class="bg-gray-50 p-5 rounded-lg mb-6">
          <h4 class="font-medium text-lg mb-2">Leo Gura (Actualized.org) - Spiral Dynamics Series</h4>
          <p class="text-gray-600 mb-4">{t.resources.actualized}</p>
          
          <div class="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            <a 
              href="https://www.youtube.com/watch?v=f2BOuAQMJCc" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="flex items-center bg-white p-3 rounded border border-gray-200 hover:border-purple-500 hover:shadow-sm transition-all"
            >
              <svg class="w-10 h-10 text-red-600 mr-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
              </svg>
              <span class="text-sm">{t.resources.sdIntro}</span>
            </a>
            
            <a 
              href="https://www.youtube.com/watch?v=BZFlE0eKTvw" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="flex items-center bg-white p-3 rounded border border-gray-200 hover:border-purple-500 hover:shadow-sm transition-all"
            >
              <svg class="w-10 h-10 text-red-600 mr-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
              </svg>
              <span class="text-sm">{t.resources.sdPurple}</span>
            </a>
            
            <a 
              href="https://www.youtube.com/watch?v=XEHYK3TM2jc" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="flex items-center bg-white p-3 rounded border border-gray-200 hover:border-purple-500 hover:shadow-sm transition-all"
            >
              <svg class="w-10 h-10 text-red-600 mr-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
              </svg>
              <span class="text-sm">{t.resources.sdRed}</span>
            </a>
            
            <a 
              href="https://www.youtube.com/watch?v=_5iLt1p-W1U" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="flex items-center bg-white p-3 rounded border border-gray-200 hover:border-purple-500 hover:shadow-sm transition-all"
            >
              <svg class="w-10 h-10 text-red-600 mr-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
              </svg>
              <span class="text-sm">{t.resources.sdBlue}</span>
            </a>
            
            <a 
              href="https://www.youtube.com/watch?v=0zfw76P_Cq4" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="flex items-center bg-white p-3 rounded border border-gray-200 hover:border-purple-500 hover:shadow-sm transition-all"
            >
              <svg class="w-10 h-10 text-red-600 mr-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
              </svg>
              <span class="text-sm">{t.resources.sdOrange}</span>
            </a>
            
            <a 
              href="https://www.youtube.com/watch?v=z_Gy3mTztgg" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="flex items-center bg-white p-3 rounded border border-gray-200 hover:border-purple-500 hover:shadow-sm transition-all"
            >
              <svg class="w-10 h-10 text-red-600 mr-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
              </svg>
              <span class="text-sm">{t.resources.sdGreen}</span>
            </a>
            
            <a 
              href="https://www.youtube.com/watch?v=w0d1TsOcbQs" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="flex items-center bg-white p-3 rounded border border-gray-200 hover:border-purple-500 hover:shadow-sm transition-all"
            >
              <svg class="w-10 h-10 text-red-600 mr-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
              </svg>
              <span class="text-sm">{t.resources.sdYellow}</span>
            </a>
          </div>
        </div>
        
        <!-- Series 2: Practical Integral -->
        <div class="bg-gray-50 p-5 rounded-lg">
          <h4 class="font-medium text-lg mb-2">Practical Integral - Spiral Dynamics Series</h4>
          <p class="text-gray-600 mb-4">{t.resources.practicalIntegral}</p>
          
          <div class="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            <a 
              href="https://www.youtube.com/watch?v=8gZeey7WlKY" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="flex items-center bg-white p-3 rounded border border-gray-200 hover:border-purple-500 hover:shadow-sm transition-all"
            >
              <svg class="w-10 h-10 text-red-600 mr-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
              </svg>
              <span class="text-sm">{t.resources.piBeige}</span>
            </a>
            
            <a 
              href="https://www.youtube.com/watch?v=LZy_HyOYyjc" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="flex items-center bg-white p-3 rounded border border-gray-200 hover:border-purple-500 hover:shadow-sm transition-all"
            >
              <svg class="w-10 h-10 text-red-600 mr-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
              </svg>
              <span class="text-sm">{t.resources.piPurple}</span>
            </a>
            
            <a 
              href="https://www.youtube.com/watch?v=v14PeDpxCPU" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="flex items-center bg-white p-3 rounded border border-gray-200 hover:border-purple-500 hover:shadow-sm transition-all"
            >
              <svg class="w-10 h-10 text-red-600 mr-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
              </svg>
              <span class="text-sm">{t.resources.piRed}</span>
            </a>
            
            <a 
              href="https://www.youtube.com/watch?v=TdKW90ORxKM" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="flex items-center bg-white p-3 rounded border border-gray-200 hover:border-purple-500 hover:shadow-sm transition-all"
            >
              <svg class="w-10 h-10 text-red-600 mr-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
              </svg>
              <span class="text-sm">{t.resources.piBlue}</span>
            </a>
            
            <a 
              href="https://www.youtube.com/watch?v=sMIYt-9_4WI" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="flex items-center bg-white p-3 rounded border border-gray-200 hover:border-purple-500 hover:shadow-sm transition-all"
            >
              <svg class="w-10 h-10 text-red-600 mr-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
              </svg>
              <span class="text-sm">{t.resources.piOrange}</span>
            </a>
            
            <a 
              href="https://www.youtube.com/watch?v=apmExom33l8" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="flex items-center bg-white p-3 rounded border border-gray-200 hover:border-purple-500 hover:shadow-sm transition-all"
            >
              <svg class="w-10 h-10 text-red-600 mr-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
              </svg>
              <span class="text-sm">{t.resources.piGreen}</span>
            </a>
            
            <a 
              href="https://www.youtube.com/watch?v=DNvkbl9KKgg" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="flex items-center bg-white p-3 rounded border border-gray-200 hover:border-purple-500 hover:shadow-sm transition-all"
            >
              <svg class="w-10 h-10 text-red-600 mr-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
              </svg>
              <span class="text-sm">{t.resources.piYellow}</span>
            </a>
            
            <a 
              href="https://www.youtube.com/watch?v=-e1K_OhYILc" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="flex items-center bg-white p-3 rounded border border-gray-200 hover:border-purple-500 hover:shadow-sm transition-all"
            >
              <svg class="w-10 h-10 text-red-600 mr-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
              </svg>
              <span class="text-sm">{t.resources.piTurquoise}</span>
            </a>
            
            <a 
              href="https://www.youtube.com/watch?v=E9ngcvJ9dX0" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="flex items-center bg-white p-3 rounded border border-gray-200 hover:border-purple-500 hover:shadow-sm transition-all"
            >
              <svg class="w-10 h-10 text-red-600 mr-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
              </svg>
              <span class="text-sm">{t.resources.piCoral}</span>
            </a>
          </div>
        </div>
      </div>
    {/if}

    <!-- Visualizations Tab (Placeholder for future interactive content) -->
    {#if activeTab === 'visualizations'}
      <div class="bg-white rounded-xl shadow-sm p-8 mb-12">
        <h3 class="text-xl font-semibold mb-4">
          {currentLanguage === 'en' ? 'Interactive Visualizations' : 'Interaktiva Visualiseringar'}
        </h3>
        <!-- Global Spiral Map -->
        <div class="mb-8">
          <div class="bg-white rounded-lg shadow-sm p-6">
            <WorldSpiralMap />
          </div>
        </div>

        <!-- More visualizations coming soon -->
        <div class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <h4 class="text-lg font-medium text-gray-500 mb-2">
            {currentLanguage === 'en' ? 'More Visualizations Coming Soon' : 'Fler Visualiseringar Kommer Snart'}
          </h4>
          <p class="text-gray-500">
            {currentLanguage === 'en' 
              ? 'Additional interactive visualizations are under development.' 
              : 'Ytterligare interaktiva visualiseringar är under utveckling.'}
          </p>
        </div>
      </div>
    {/if}
  </div>

  <br>
  <ShareButtons />
  <br>
</div>
