<script lang="ts">
  import { stages } from '$lib/data/stages';
  import StageCard from '$lib/components/StageCard.svelte';
  import SpiralDiagram from '$lib/components/SpiralDiagram.svelte';
  import languageStore from '$lib/stores/languageStore';

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
        "The stages alternate between individualistic and collective focus"
      ]
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
        "Stadierna växlar mellan ett individuellt och kollektivt fokus"
      ]
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
</script>

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
  </div>
</div>
