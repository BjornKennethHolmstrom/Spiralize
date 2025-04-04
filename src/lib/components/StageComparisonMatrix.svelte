<!-- StageComparisonMatrix.svelte -->
<script lang="ts">
  import languageStore from '$lib/stores/languageStore';
  import { stages } from '$lib/data/stages';
  import { createEventDispatcher } from 'svelte';
  import { stageInteractions, stageCharacteristics } from '$lib/data/stageInteractions';

  // Get language from store
  const { language } = languageStore;
  $: currentLanguage = $language;

  // State for selected stages
  export let selectedStage1: string | null = null;
  export let selectedStage2: string | null = null;

  const dispatch = createEventDispatcher();

  // Helper function to get stage color
  function getStageColor(stage: string): string {
    return stages[stage]?.color || "#808080";
  }

  // Get interaction data based on stages selected
  function getInteractionData(stage1: string, stage2: string): any {
    if (!stage1 || !stage2) return null;
    
    // Try different key combinations to find the data
    const standardKey = `${stage1}-${stage2}`;
    const reversedKey = `${stage2}-${stage1}`;
    
    // First try the direct keys
    if (stageInteractions[standardKey]) {
      return stageInteractions[standardKey];
    }
    
    if (stageInteractions[reversedKey]) {
      return stageInteractions[reversedKey];
    }
    
    // If that doesn't work, try sorting alphabetically
    const sortedStages = [stage1, stage2].sort();
    const sortedKey = `${sortedStages[0]}-${sortedStages[1]}`;
    
    return stageInteractions[sortedKey] || null;
  }

  // Translations for UI elements
  const translations = {
    en: {
      title: "Stage Comparison Matrix",
      description: "Explore how different Spiral Dynamics stages interact with each other. Select two stages to see their relationship dynamics, potential synergies, and challenges.",
      select1: "Select First Stage",
      select2: "Select Second Stage",
      interaction: "Stage Interaction",
      clashes: "Potential Clashes",
      bridging: "Bridging Strategies",
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
      clashes: "Potentiella Konflikter",
      bridging: "Överbryggande Strategier",
      characteristics: "Stadieegenskaper",
      worldview: "Världsbild",
      values: "Kärnvärden",
      communication: "Kommunikationsstil",
      leadership: "Ledarskapsmetod",
      challenges: "Nyckelutmaningar",
      noSelection: "Välj två stadier för att se deras interaktion."
    }
  };

  $: t = translations[currentLanguage];
  $: interactionData = getInteractionData(selectedStage1, selectedStage2);
</script>

<div class="bg-white rounded-xl shadow-sm p-6">
 <!--  <h2 class="text-2xl font-semibold mb-2">{t.title}</h2>
  <p class="text-gray-600 mb-6">{t.description}</p> -->
  
  <!-- Stage Selection -->
  <div class="grid gap-6 md:grid-cols-2 mb-8">
    <!-- First Stage Selection -->
    <div>
      <h3 class="font-medium mb-3">{t.select1}</h3>
      <div class="space-y-2">
        {#each Object.keys(stages) as stage}
          <button
            class="w-full px-4 py-3 rounded-lg text-left transition-colors"
            class:bg-opacity-100={selectedStage1 === stage}
            class:text-white={selectedStage1 === stage}
            class:bg-opacity-20={selectedStage1 !== stage}
            class:hover:bg-opacity-30={selectedStage1 !== stage}
            style="background-color: {selectedStage1 === stage ? getStageColor(stage) : `${getStageColor(stage)}33`}"
            on:click={() => selectedStage1 = stage}
          >
            <div class="capitalize">{stage}</div>
            <div class="text-sm opacity-80">{stages[stage].name[currentLanguage]}</div>
          </button>
        {/each}
      </div>
    </div>
    
    <!-- Second Stage Selection -->
    <div>
      <h3 class="font-medium mb-3">{t.select2}</h3>
      <div class="space-y-2">
        {#each Object.keys(stages) as stage}
          <button
            class="w-full px-4 py-3 rounded-lg text-left transition-colors"
            class:bg-opacity-100={selectedStage2 === stage}
            class:text-white={selectedStage2 === stage}
            class:bg-opacity-20={selectedStage2 !== stage}
            class:hover:bg-opacity-30={selectedStage2 !== stage}
            style="background-color: {selectedStage2 === stage ? getStageColor(stage) : `${getStageColor(stage)}33`}"
            on:click={() => selectedStage2 = stage}
          >
            <div class="capitalize">{stage}</div>
            <div class="text-sm opacity-80">{stages[stage].name[currentLanguage]}</div>
          </button>
        {/each}
      </div>
    </div>
  </div>
  
  <!-- Interaction Display -->
  {#if selectedStage1 && selectedStage2 && interactionData}
    <div class="space-y-6">
      <!-- Main Interaction -->
      <div class="bg-gray-50 p-6 rounded-lg">
        <h3 class="text-lg font-medium mb-4">{t.interaction}</h3>
        <p class="text-gray-700">{interactionData[currentLanguage]}</p>
      </div>
      
      <!-- Potential Clashes -->
      <div class="bg-red-50 p-6 rounded-lg">
        <h3 class="text-lg font-medium mb-4 text-red-700">{t.clashes}</h3>
        <p class="text-gray-700">{interactionData.clashes[currentLanguage]}</p>
      </div>
      
      <!-- Bridging Strategies -->
      <div class="bg-green-50 p-6 rounded-lg">
        <h3 class="text-lg font-medium mb-4 text-green-700">{t.bridging}</h3>
        <p class="text-gray-700">{interactionData.bridging[currentLanguage]}</p>
      </div>
    </div>
    
    <!-- Characteristics Comparison -->
    <h3 class="text-lg font-medium my-6">{t.characteristics}</h3>
    <div class="overflow-x-auto">
      <table class="min-w-full border-collapse">
        <thead>
          <tr>
            <th class="py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"></th>
            {#if selectedStage1}
              <th 
                class="py-3 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold uppercase tracking-wider"
                style={`color: ${getStageColor(selectedStage1)}`}
              >
                <span class="capitalize">{selectedStage1}</span>
              </th>
            {/if}
            {#if selectedStage2}
              <th 
                class="py-3 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold uppercase tracking-wider"
                style={`color: ${getStageColor(selectedStage2)}`}
              >
                <span class="capitalize">{selectedStage2}</span>
              </th>
            {/if}
          </tr>
        </thead>
        <tbody>
          <!-- Worldview -->
          <tr>
            <td class="py-3 px-4 border-b border-gray-200 bg-white text-sm font-medium">{t.worldview}</td>
            {#if selectedStage1}
              <td class="py-3 px-4 border-b border-gray-200 bg-white text-sm">
                {stageCharacteristics[selectedStage1][currentLanguage].worldview}
              </td>
            {/if}
            {#if selectedStage2}
              <td class="py-3 px-4 border-b border-gray-200 bg-white text-sm">
                {stageCharacteristics[selectedStage2][currentLanguage].worldview}
              </td>
            {/if}
          </tr>
          
          <!-- Values -->
          <tr>
            <td class="py-3 px-4 border-b border-gray-200 bg-gray-50 text-sm font-medium">{t.values}</td>
            {#if selectedStage1}
              <td class="py-3 px-4 border-b border-gray-200 bg-gray-50 text-sm">
                {stageCharacteristics[selectedStage1][currentLanguage].values}
              </td>
            {/if}
            {#if selectedStage2}
              <td class="py-3 px-4 border-b border-gray-200 bg-gray-50 text-sm">
                {stageCharacteristics[selectedStage2][currentLanguage].values}
              </td>
            {/if}
          </tr>
          
          <!-- Communication -->
          <tr>
            <td class="py-3 px-4 border-b border-gray-200 bg-white text-sm font-medium">{t.communication}</td>
            {#if selectedStage1}
              <td class="py-3 px-4 border-b border-gray-200 bg-white text-sm">
                {stageCharacteristics[selectedStage1][currentLanguage].communication}
              </td>
            {/if}
            {#if selectedStage2}
              <td class="py-3 px-4 border-b border-gray-200 bg-white text-sm">
                {stageCharacteristics[selectedStage2][currentLanguage].communication}
              </td>
            {/if}
          </tr>
          
          <!-- Leadership -->
          <tr>
            <td class="py-3 px-4 border-b border-gray-200 bg-gray-50 text-sm font-medium">{t.leadership}</td>
            {#if selectedStage1}
              <td class="py-3 px-4 border-b border-gray-200 bg-gray-50 text-sm">
                {stageCharacteristics[selectedStage1][currentLanguage].leadership}
              </td>
            {/if}
            {#if selectedStage2}
              <td class="py-3 px-4 border-b border-gray-200 bg-gray-50 text-sm">
                {stageCharacteristics[selectedStage2][currentLanguage].leadership}
              </td>
            {/if}
          </tr>
          
          <!-- Challenges -->
          <tr>
            <td class="py-3 px-4 border-b border-gray-200 bg-white text-sm font-medium">{t.challenges}</td>
            {#if selectedStage1}
              <td class="py-3 px-4 border-b border-gray-200 bg-white text-sm">
                {stageCharacteristics[selectedStage1][currentLanguage].challenges}
              </td>
            {/if}
            {#if selectedStage2}
              <td class="py-3 px-4 border-b border-gray-200 bg-white text-sm">
                {stageCharacteristics[selectedStage2][currentLanguage].challenges}
              </td>
            {/if}
          </tr>
        </tbody>
      </table>
    </div>
  {:else}
    <div class="bg-gray-50 p-8 rounded-lg text-center">
      <p class="text-gray-500">{t.noSelection}</p>
    </div>
  {/if}
</div>
