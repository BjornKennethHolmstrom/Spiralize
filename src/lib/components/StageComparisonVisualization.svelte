<!-- StageComparisonVisualization.svelte -->
<script lang="ts">
  import languageStore from '$lib/stores/languageStore';
  import { visualizationTranslations } from '$lib/data/stageInteractions';
  import StageInteractionGrid from './StageInteractionGrid.svelte';
  import StageComparisonMatrix from './StageComparisonMatrix.svelte';
  
  // Get language from store
  const { language } = languageStore;
  $: currentLanguage = $language;

  // Track selected stages for detailed comparison
  let selectedStage1: string | null = null;
  let selectedStage2: string | null = null;

  // Handle selection from the grid
  function handleGridSelection(event) {
    const { stage1, stage2 } = event.detail;
    selectedStage1 = stage1;
    selectedStage2 = stage2;
    
    // Scroll to the comparison matrix
    setTimeout(() => {
      const element = document.getElementById('comparison-matrix');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }

  // Use imported translations
  const translations = visualizationTranslations;

  $: t = translations[currentLanguage];
</script>

<div>
  <div class="text-left mb-8">
    <h2 class="text-2xl font-bold text-gray-900 mb-2">{t.title}</h2> 
    <p class="text-gray-600">{t.subtitle}</p>
  </div>

  <!-- Stage Interaction Grid -->
  <StageInteractionGrid on:select={handleGridSelection} />
  
  <!-- Stage Comparison Matrix -->
  <div id="comparison-matrix">
    <StageComparisonMatrix bind:selectedStage1 bind:selectedStage2 />
  </div>
</div>
