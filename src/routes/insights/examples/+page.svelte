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
  
  // Stage filter
  let activeStageFilter: string | null = null;
  
  // Get stage name for current language
  function getStageName(stageId: string): string {
    const stage = stages.find(s => s.id === stageId);
    return stage ? stage.name[currentLanguage] : stageId;
  }
  
  // Load content based on active tabs
  async function loadContent() {
    isLoading = true;
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
    activeStageFilter = activeStageFilter === stageId ? null : stageId;
  }
  
  // After content is loaded, we may want to scroll to a specific stage if filtered
  $: if (!isLoading && activeStageFilter) {
    onMount(() => {
      setTimeout(() => {
        const stageElement = document.querySelector(`[data-stage="${activeStageFilter}"]`);
        if (stageElement) {
          stageElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    });
  }
  
  onMount(() => {
    loadContent();
  });

  function debugStages() {
    if (document.querySelector('[data-stage]')) {
      console.log('Stage sections found:');
      document.querySelectorAll('[data-stage]').forEach(el => {
        console.log(`- ${el.getAttribute('data-stage')}`);
      });
    } else {
      console.log('No stage sections found in the document');
    }
  }

  // Function to filter content by stage
  function filterContentByStage(html: string, stageId: string): string {
    if (!html || !stageId) return html;
    
    try {
      // Create a DOMParser for safer HTML parsing
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      
      // Find all stage sections
      const stageSections = doc.querySelectorAll('[data-stage]');
      
      // If no sections found, return original
      if (stageSections.length === 0) return html;
      
      // Create a temporary div to hold our filtered content
      const tempDiv = document.createElement('div');
      
      // Find and clone the matching section
      for (let section of stageSections) {
        if (section.getAttribute('data-stage') === stageId) {
          tempDiv.appendChild(section.cloneNode(true));
        }
      }
      
      // If we found a matching section, return its HTML
      if (tempDiv.children.length > 0) {
        return tempDiv.innerHTML;
      }
      
      // Fallback: return the original HTML
      return html;
    } catch (error) {
      console.error('Error filtering content by stage:', error);
      return html;
    }
  }
  
  // Computed property for filtered content
  $: displayContent = activeStageFilter 
    ? filterContentByStage(contentHtml, activeStageFilter) 
    : contentHtml;

  $: if (!isLoading && contentHtml) {
    // Small delay to ensure DOM is updated
    setTimeout(debugStages, 100);
  }
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
          background-color: {activeStageFilter === stage.id ? stage.hex : stage.hex + '20'};
          color: {activeStageFilter === stage.id ? '#fff' : stage.hex};
          border-color: {stage.hex};
        "
        on:click={() => toggleStageFilter(stage.id)}
      >
        {stage.name[currentLanguage]}
        {#if activeStageFilter === stage.id}
          <svg class="w-4 h-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        {/if}
      </button>
    {/each}
  </div>
  
  <!-- Content area -->
  <div class="bg-white rounded-lg shadow-sm p-6">
    {#if isLoading}
      <div class="animate-pulse">
        <div class="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div class="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div class="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
        <div class="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
        <!-- More loading placeholders -->
      </div>
    {:else}
      <div class="prose max-w-none">
        {@html displayContent}
      </div>
    {/if}
  </div>
  
  <!-- Stage legend -->
  <div class="mt-8 pt-4 border-t border-gray-200">
    <h3 class="text-lg font-semibold mb-4">
      {currentLanguage === 'en' ? 'Spiral Stages' : 'Spiral-stadier'}
    </h3>
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
      {#each stages as stage}
        <div 
          class="p-3 rounded-md flex items-center space-x-2 cursor-pointer"
          style="background-color: {stage.hex}20; border-left: 4px solid {stage.hex};"
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
</style>
