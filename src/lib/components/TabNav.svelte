<!-- TabNav.svelte -->
<script lang="ts">
  import { page } from '$app/stores';
  import languageStore from '$lib/stores/languageStore';
  
  const { language } = languageStore;
  $: currentLanguage = $language;

  export let activeTab: 'overview' | 'visualizations' = 'overview';

  const tabs = {
    overview: {
      en: 'Overview',
      sv: 'Översikt'
    },
    visualizations: {
      en: 'Interactive Visualizations',
      sv: 'Interaktiva Visualiseringar'
    }
  };
</script>

<div class="border-b border-gray-200">
  <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex space-x-8" aria-label="Tabs">
      {#each Object.entries(tabs) as [key, labels]}
        <button
          class="
            py-4 px-1 relative
            {activeTab === key 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-500 hover:text-gray-700 border-b-2 border-transparent'
            }
            font-medium text-sm sm:text-base
            focus:outline-none focus:text-blue-800 focus:border-blue-800
            transition-colors duration-200
          "
          aria-current={activeTab === key ? 'page' : undefined}
          on:click={() => activeTab = key}
        >
          {labels[currentLanguage]}
        </button>
      {/each}
    </div>
  </nav>
</div>
