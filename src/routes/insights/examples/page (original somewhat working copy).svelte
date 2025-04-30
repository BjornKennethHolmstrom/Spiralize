<!-- src/routes/insights/examples/+page.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import languageStore from '$lib/stores/languageStore';
  import { examplesSchema } from '$lib/data/examplesSchema';
  import { loadExampleContent } from '$lib/utils/contentLoader';
  import { processMarkdown } from '$lib/utils/markdownProcessor';
  import { getStageColor } from '$lib/utils/stageColors';
  import { stages } from '$lib/data/stages';
  
  const { language } = languageStore;
  $: currentLanguage = $language;
  
  // Active tabs state
  let activeCategory = examplesSchema[0].id;
  let activeSubcategories: Record<string, string> = {};
  
  // Initialize first subcategory for each category
  examplesSchema.forEach(category => {
    activeSubcategories[category.id] = category.subcategories[0]?.id || '';
  });
  
  // Current content
  let currentContent = '';
  let contentHtml = '';
  let contentMetadata: any = {};
  let isLoading = true;

  // Selected stages for filtering
  let selectedStages: string[] = [];
  
  // Legacy stage filter (kept for compatibility)
  let activeStageFilter: string | null = null;
  
  // Get stage name for current language
  function getStageName(stageId: string): string {
    const stage = stages.find(s => s.id === stageId);
    return stage ? stage.name[currentLanguage] : stageId;
  }

  // Helper function to determine text color based on background color
  function getTextColorForStage(stageId: string): string {
    // List of stages that need dark text due to light background colors
    const darkTextStages = ['beige', 'yellow', 'turquoise'];
    return darkTextStages.includes(stageId) ? '#000000' : '#FFFFFF';
  }
  
  // Load content based on active tabs
  async function loadContent() {
    isLoading = true;
    selectedStages = []; // Reset stage filters when loading new content
    
    const subcategoryId = activeSubcategories[activeCategory];
    if (subcategoryId) {
      currentContent = await loadExampleContent(
        currentLanguage, 
        activeCategory, 
        subcategoryId
      );
      
      // Process markdown with stage awareness
      const processed = processMarkdown(currentContent);
      contentHtml = processed.html;
      contentMetadata = processed.metadata;
    }
    isLoading = false;
    
    // Debug stages after content is loaded
    setTimeout(debugStages, 100);
  }
  
  // Watch for tab changes
  $: if (activeCategory && activeSubcategories[activeCategory] && currentLanguage) {
    loadContent();
  }
  
  // Set active category
  function setCategory(categoryId: string) {
    activeCategory = categoryId;
    // Reset stage filter when changing category
    activeStageFilter = null;
  }
  
  // Set active subcategory
  function setSubcategory(subcategoryId: string) {
    activeSubcategories[activeCategory] = subcategoryId;
    // Reset stage filter when changing subcategory
    activeStageFilter = null;
  }
  
  // Toggle stage filter
  function toggleStageFilter(stageId: string) {
    if (selectedStages.includes(stageId)) {
      // If already selected, remove it
      selectedStages = selectedStages.filter(id => id !== stageId);
    } else {
      // If not selected, add it
      selectedStages = [...selectedStages, stageId];
    }
    
    // Debug after filter change
    setTimeout(debugStages, 100);
  }

  // Check if a stage is currently selected
  function isStageSelected(stageId: string): boolean {
    return selectedStages.includes(stageId);
  }
  
  onMount(() => {
    loadContent();
  });

  // Debug helper to identify stage sections
  function debugStages() {
    if (document.querySelector('[data-stage]')) {
      console.log('Stage sections found:');
      document.querySelectorAll('[data-stage]').forEach(el => {
        console.log(`- ${el.getAttribute('data-stage')}`);
      });
      
      if (selectedStages.length > 0) {
        console.log('Currently filtering for stages:', selectedStages);
      }
    } else {
      console.log('No stage sections found in the document');
    }
  }

  // Function to filter content by stages - FIXED version
  function filterContentByStages(html: string, stageIds: string[]): string {
    if (!html || stageIds.length === 0) return html; // If no stages selected, show all
    
    try {
      // Create a DOMParser for safer HTML parsing
      const parser = new DOMParser();
      const doc = parser.parseFromString(`<div id="root-wrapper">${html}</div>`, 'text/html');
      
      // Get the wrapper containing all content
      const rootWrapper = doc.getElementById('root-wrapper');
      if (!rootWrapper) return html;
      
      // Find all stage sections
      const stageSections = rootWrapper.querySelectorAll('[data-stage]');
      
      // If no sections found, return original
      if (stageSections.length === 0) return html;
      
      // Keep track of if we have any matching sections
      let hasMatchingSections = false;
      
      // Create a new wrapper for filtered content
      const filteredWrapper = document.createElement('div');
      
      // Process each section - if it matches the filter, add it to the filtered wrapper
      stageSections.forEach(section => {
        const sectionStage = section.getAttribute('data-stage');
        
        if (sectionStage && stageIds.includes(sectionStage)) {
          // This is a matching section, add a clone to our filtered content
          filteredWrapper.appendChild(section.cloneNode(true));
          hasMatchingSections = true;
        }
      });
      
      // Check if we have any matching sections
      if (!hasMatchingSections) {
        return `<div class="p-4 bg-gray-100 rounded-lg text-gray-600">
          <p>${currentLanguage === 'en' 
              ? 'No content available for the selected stages. Please select different stages or clear your filters.' 
              : 'Inget innehåll tillgängligt för de valda stadierna. Välj andra stadier eller rensa filtren.'}</p>
        </div>`;
      }
      
      // Return the filtered HTML
      return filteredWrapper.innerHTML;
    } catch (error) {
      console.error('Error filtering content by stages:', error);
      return html;
    }
  }
  
  // Computed property for filtered content
  $: displayContent = selectedStages.length > 0
    ? filterContentByStages(contentHtml, selectedStages)
    : contentHtml;
</script>

<div class="max-w-7xl mx-auto px-4 py-8">
  <h1 class="text-3xl font-bold mb-6">
    {currentLanguage === 'en' ? 'Real-world Examples' : 'Verkliga exempel'}
  </h1>
  
  <!-- Primary category tabs -->
  <div class="border-b border-gray-200 mb-6">
    <div class="flex space-x-4 overflow-x-auto pb-2">
      {#each examplesSchema as category}
        <button
          class="px-4 py-2 font-medium rounded-t-lg transition-colors {activeCategory === category.id ? 'bg-purple-100 text-purple-700 border-b-2 border-purple-500' : 'text-gray-600 hover:text-purple-600'}"
          on:click={() => setCategory(category.id)}
        >
          <span class="mr-2">{category.icon}</span>
          {currentLanguage === 'en' ? category.nameEn : category.nameSv}
        </button>
      {/each}
    </div>
  </div>
  
  <!-- Subcategory tabs -->
  {#if activeCategory}
    {@const category = examplesSchema.find(c => c.id === activeCategory)}
    {#if category}
      <div class="mb-8">
        <div class="flex flex-wrap gap-2">
          {#each category.subcategories as subcategory}
            <button
              class="px-3 py-1 text-sm rounded-full transition-colors {activeSubcategories[activeCategory] === subcategory.id ? 'bg-purple-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
              on:click={() => setSubcategory(subcategory.id)}
            >
              {currentLanguage === 'en' ? subcategory.nameEn : subcategory.nameSv}
            </button>
          {/each}
        </div>
      </div>
    {/if}
  {/if}
  
  <!-- Stage filter chips -->
  <div class="flex flex-wrap gap-2 mb-6">
    {#each stages as stage}
      <button
        class="flex items-center px-3 py-1 text-sm rounded-full transition-colors border"
        style="
          background-color: {isStageSelected(stage.id) ? stage.hex : stage.hex + '20'};
          color: {isStageSelected(stage.id) ? getTextColorForStage(stage.id) : stage.hex};
          border-color: {stage.hex};
        "
        on:click={() => toggleStageFilter(stage.id)}
        aria-pressed={isStageSelected(stage.id)}
      >
        {stage.name[currentLanguage]}
        {#if isStageSelected(stage.id)}
          <svg class="w-4 h-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
        {/if}
      </button>
    {/each}
    
    <!-- Add a "Clear Filters" button when stages are selected -->
    {#if selectedStages.length > 0}
      <button
        class="flex items-center px-3 py-1 text-sm rounded-full transition-colors border border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
        on:click={() => selectedStages = []}
      >
        {currentLanguage === 'en' ? 'Clear Filters' : 'Rensa Filter'}
        <svg class="w-4 h-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </button>
    {/if}
  </div>
  
  <!-- Content area -->
  <div class="bg-white rounded-lg shadow-sm p-6 content-area">
    {#if isLoading}
      <div class="animate-pulse">
        <div class="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div class="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div class="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
        <div class="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
        <!-- More loading placeholders -->
      </div>
    {:else if contentHtml}
      <div class="prose max-w-none">
        {@html displayContent}
      </div>
    {:else}
      <div class="p-4 bg-gray-100 rounded-lg text-gray-600">
        <p>{currentLanguage === 'en' 
            ? 'No content available for this category and subcategory.' 
            : 'Inget innehåll tillgängligt för denna kategori och underkategori.'}</p>
      </div>
    {/if}
  </div>
  
  <!-- Stage legend -->
  <div class="mt-8 pt-4 border-t border-gray-200">
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-lg font-semibold">
        {currentLanguage === 'en' ? 'Spiral Stages' : 'Spiral-stadier'}
      </h3>
      
      <!-- Show selected stages count -->
      {#if selectedStages.length > 0}
        <span class="text-sm text-gray-600">
          {selectedStages.length} {selectedStages.length === 1 
            ? (currentLanguage === 'en' ? 'stage' : 'stadium') 
            : (currentLanguage === 'en' ? 'stages' : 'stadier')} 
          {currentLanguage === 'en' ? 'selected' : 'valda'}
        </span>
      {/if}
    </div>
    
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
      {#each stages as stage}
        <div 
          class="p-3 rounded-md flex items-center space-x-2 cursor-pointer transition-all"
          class:ring-2={isStageSelected(stage.id)}
          class:ring-offset-2={isStageSelected(stage.id)}
          class:ring-offset-white={isStageSelected(stage.id)}
          class:ring={isStageSelected(stage.id)}
          style="
            background-color: {stage.hex}20; 
            border-left: 4px solid {stage.hex};
            {isStageSelected(stage.id) ? `ring-color: ${stage.hex};` : ''}
          "
          on:click={() => toggleStageFilter(stage.id)}
        >
          <div 
            class="w-4 h-4 rounded-full" 
            style="background-color: {stage.hex};"
          ></div>
          <span style="color: {stage.hex};" class="font-medium">
            {stage.name[currentLanguage]}
          </span>
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  /* Add styles for better stage section visibility */
  :global(.stage-section) {
    margin-top: 2rem;
    margin-bottom: 2rem;
    padding-top: 1rem;
    border-radius: 0.5rem;
    overflow: hidden;
  }
  
  :global(.stage-section[data-stage]) {
    scroll-margin-top: 2rem;
  }
  
  /* Add smooth transitions */
  :global(.stage-heading), :global(.stage-subheading) {
    transition: all 0.3s ease;
  }
  
  /* Add better styling for content elements within stage sections */
  :global(.stage-section p) {
    margin-left: 1rem;
    border-left: 2px solid #ddd;
    padding-left: 1rem;
  }
  
  :global(.stage-section ul), :global(.stage-section ol) {
    margin-left: 3rem;
  }
  
  :global(.stage-section) {
    transition: all 0.3s ease-in-out;
  }
  
  /* Fade-in animation for filtered content */
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .content-area :global(.stage-section) {
    animation: fadeIn 0.3s ease-out forwards;
  }
</style>
