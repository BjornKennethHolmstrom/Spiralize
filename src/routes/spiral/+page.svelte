<script lang="ts">
  import { stages } from '$lib/data/stages';
  import StageCard from '$lib/components/StageCard.svelte';
  import SpiralDiagram from '$lib/components/SpiralDiagram.svelte';
  import languageStore from '$lib/stores/languageStore';
  import ShareButtons from '$lib/components/ShareButtons.svelte';

  const { language, toggleLanguage } = languageStore; 

  $: currentLanguage = $language;
  
  // Track expanded states and active stage
  let expandedStages: Record<string, boolean> = {};
  let activeStage: string | null = null;
  
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
      resources: 
      {
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
      resources:
      {
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
      }
    }
  };

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
    
    <br><br>

    <!-- Video Resources -->
    <div class="mb-8">
      <h3 class="text-xl font-semibold mb-4">{t.resources.videosTitle}</h3>
      
      <!-- Series 1: Actualized.org -->
      <div class="bg-gray-50 p-5 rounded-lg mb-6">
        <h4 class="font-medium text-lg mb-2">Leo Gura (Actualized.org) - Spiral Dynamics Series</h4>
        <p class="text-gray-600 mb-4">{t.resources.actualized}</p>
        
        <div class="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          <a 
            href="https://www.youtube.com/watch?v=23aDNBvn_2g" 
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
            href="https://www.youtube.com/watch?v=f2BOuAQMJCc" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="flex items-center bg-white p-3 rounded border border-gray-200 hover:border-purple-500 hover:shadow-sm transition-all"
          >
            <svg class="w-10 h-10 text-red-600 mr-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
            </svg>
            <span class="text-sm">{t.resources.piIntro}</span>
          </a>
          
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

  </div>

  <br>
  <ShareButtons />
  <br>

</div>
