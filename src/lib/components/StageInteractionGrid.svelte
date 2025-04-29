<!-- src/lib/components/StageInteractionGrid.svelte -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { gridTranslations } from '$lib/data/stageInteractions';
  import languageStore from '$lib/stores/languageStore';
  import { getStageColor } from '$lib/utils/stageColors';

  // Setup event dispatcher to communicate with parent component
  const dispatch = createEventDispatcher();
  
  // Language handling
  const { language } = languageStore;
  $: currentLanguage = $language;

  // The list of stages we want to include in the grid
  const stageIds = [
    'beige', 'purple', 'red', 'blue', 'orange', 
    'green', 'yellow', 'turquoise', 'coral', 'ultraviolet'
  ];

  // Function to select a cell and notify parent
  function selectCell(stage1, stage2) {
    dispatch('select', { stage1, stage2 });
  }

  // Function to get the cell background class
  function getCellBackgroundClass(rowIndex, colIndex) {
    if (rowIndex === colIndex) {
      return 'bg-white'; // Diagonal cells are white
    }
    return 'bg-gray-100'; // Non-diagonal cells are light gray
  }

  // Translations
  $: t = gridTranslations[currentLanguage];
</script>

<div>
  <h3 class="text-xl font-semibold mb-3">{t.stageInteractions || "Stage Interactions"}</h3>
  <p class="text-gray-600 mb-6">{t.description || "Click on any cell to explore the interaction between two stages."}</p>

  <!-- Stages Grid -->
  <div class="overflow-x-auto">
    <div class="grid" style="grid-template-columns: auto repeat({stageIds.length}, minmax(40px, 1fr));">
      <!-- Empty top-left cell -->
      <div></div>
      
      <!-- Column headers - stage initials -->
      {#each stageIds as stageId, colIndex}
        <div 
          class="flex justify-center items-center w-10 h-10 rounded-md bg-gray-300 m-1 font-medium"
        >
          <span class="uppercase text-center" style="color: {getStageColor(stageId)};">
            {stageId[0]}
          </span>
        </div>
      {/each}

      <!-- Row by row -->
      {#each stageIds as rowStageId, rowIndex}
        <!-- Row header - stage initial -->
        <div 
          class="flex justify-center items-center w-10 h-10 rounded-md bg-gray-300 m-1 font-medium"
        >
          <span class="uppercase text-center" style="color: {getStageColor(rowStageId)};">
            {rowStageId[0]}
          </span>
        </div>
        
        <!-- Interaction cells with dot -->
        {#each stageIds as colStageId, colIndex}
          <div 
            class="flex justify-center items-center w-10 h-10 rounded-md m-1 cursor-pointer hover:bg-gray-200 transition-colors {getCellBackgroundClass(rowIndex, colIndex)}"
            on:click={() => selectCell(rowStageId, colStageId)}
          >
            {#if rowIndex !== colIndex}
              <!-- Diagonal split circle - larger size with gradient diagonal split -->
              <div 
                class="w-4 h-4 rounded-full relative overflow-hidden"
                style="
                  background: linear-gradient(45deg, 
                    {getStageColor(rowStageId)} 0%, 
                    {getStageColor(rowStageId)} 49.9%, 
                    {getStageColor(colStageId)} 50.1%, 
                    {getStageColor(colStageId)} 100%
                  );
                "
              ></div>
            {/if}
          </div>
        {/each}
      {/each}
    </div>
  </div>
</div>
