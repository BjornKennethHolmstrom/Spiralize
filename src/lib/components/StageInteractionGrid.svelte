<!-- StageInteractionGrid.svelte -->
<script lang="ts">
  import languageStore from '$lib/stores/languageStore';
  import { stages } from '$lib/data/stages';
  import { gridTranslations } from '$lib/data/stageInteractions';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
  
  // Get language from store
  const { language } = languageStore;
  $: currentLanguage = $language;

  // List of all stage keys in order
  const stageKeys = ['beige', 'purple', 'red', 'blue', 'orange', 'green', 'yellow', 'turquoise'];

  // Helper function to get stage color
  function getStageColor(stage: string): string {
    return stages[stage]?.color || "#808080";
  }

  // Pass selected stages to parent component
  function selectInteraction(stage1: string, stage2: string) {
    dispatch('select', { stage1, stage2 });
  }

  // Use imported translations
  const translations = gridTranslations;

  $: t = translations[currentLanguage];
</script>

<div class="bg-white rounded-xl shadow-sm p-6 mb-8">
  <h3 class="text-lg font-medium mb-2">{t.stageInteractions}</h3>
  <p class="text-gray-600 mb-4">{t.description}</p>
  
  <div class="overflow-x-auto">
    <div class="min-w-max">
      <div class="grid grid-cols-9 gap-1">
        <!-- Empty top-left cell -->
        <div class="h-10 w-10"></div>
        
        <!-- Column headers -->
        {#each stageKeys as stageKey}
          <div 
            class="h-10 w-10 flex items-center justify-center rounded-md font-medium text-xs"
            style={`background-color: ${getStageColor(stageKey)}80; color: white;`}
          >
            <span class="capitalize">{stageKey.charAt(0)}</span>
          </div>
        {/each}
        
        <!-- Grid rows -->
        {#each stageKeys as rowStage}
          <!-- Row header -->
          <div 
            class="h-10 w-10 flex items-center justify-center rounded-md font-medium text-xs"
            style={`background-color: ${getStageColor(rowStage)}80; color: white;`}
          >
            <span class="capitalize">{rowStage.charAt(0)}</span>
          </div>
          
          <!-- Row cells -->
          {#each stageKeys as colStage}
            <button 
              class="h-10 w-10 rounded-md transition-all transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              class:opacity-50={rowStage === colStage}
              style={`background-color: ${getStageColor(rowStage)}30; border: 1px solid ${getStageColor(colStage)}30;`}
              on:click={() => selectInteraction(rowStage, colStage)}
              disabled={rowStage === colStage}
              aria-label={`Interaction between ${rowStage} and ${colStage}`}
            >
              {#if rowStage !== colStage}
                <div class="w-full h-full flex items-center justify-center">
                  <div 
                    class="w-2 h-2 rounded-full"
                    style={`background-color: ${getStageColor(colStage)};`}
                  ></div>
                </div>
              {/if}
            </button>
          {/each}
        {/each}
      </div>
    </div>
  </div>
  
  <div class="mt-4 text-center text-xs text-gray-500">
    <p>{t.allCombinations}</p>
  </div>
</div>
