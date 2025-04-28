<!-- src/routes/guide-governance/+page.svelte -->
<script lang="ts">
  import { base } from '$app/paths';
  import languageStore from '$lib/stores/languageStore';
  import ShareButtons from '$lib/components/ShareButtons.svelte';
  import { fade } from 'svelte/transition';
  import { 
    governanceGuideStore, 
    getIntroSection,
    getMainSections,
    getQuickReferenceItems,
    getTools,
    getSectionDiagrams
  } from '$lib/stores/governanceGuideStore';

  const { language } = languageStore;
  $: currentLanguage = $language;

  // Get main content sections
  const introSection = getIntroSection();
  const mainSections = getMainSections();
  const quickReferenceItems = getQuickReferenceItems();

  const allTools = getTools();
  console.log('All tools:', allTools);
  console.log('Intro section ID:', introSection?.id);
  console.log('Tools for intro section:', getTools(introSection?.id));
 
  // Get translations from store
  $: t = $governanceGuideStore.translations;
</script>

<svelte:head>
  <title>{t.ui.title[currentLanguage]} | Spiralize</title>
  <meta name="description" content={t.ui.introduction[currentLanguage]}>
</svelte:head>

<div class="max-w-6xl mx-auto px-4 py-12">
  <div in:fade>
    <h1 class="text-3xl md:text-4xl font-bold mb-2 text-teal-800">{t.ui.title[currentLanguage]}</h1>
    <h2 class="text-xl text-gray-600 mb-8">{t.ui.subtitle[currentLanguage]}</h2>

    <!-- Swedish-only notification about English content -->
    {#if currentLanguage === 'sv'}
      <div class="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-8">
        <div class="flex items-start">
          <svg class="w-5 h-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
          <p>Observera: Innehållet i själva guiden är för närvarande endast tillgängligt på engelska. Vi arbetar med att översätta allt innehåll till svenska.</p>
        </div>
      </div>
    {/if}
    
    <div class="prose max-w-none mb-10">
      <p class="text-lg">{t.ui.introduction[currentLanguage]}</p>
      
      <!-- Who is this guide for? -->
      <div class="bg-yellow-50 p-6 rounded-lg my-8 shadow-sm border border-yellow-100">
        <h3 class="text-xl font-semibold mb-4 text-yellow-800">{t.ui.forWhom[currentLanguage]}</h3>
        <ul class="space-y-2 mb-0">
          {#each t.ui.forWhomContent as item}
            <li class="flex items-start">
              <span class="mr-2 text-yellow-700">•</span>
              <span>{item[currentLanguage]}</span>
            </li>
          {/each}
        </ul>
      </div>
      
      <!-- Download section -->
      <div class="bg-teal-50 p-6 rounded-lg my-8 shadow-sm border border-teal-100">
        <p class="font-medium mb-3">{t.ui.downloadPrompt[currentLanguage]}</p>
        <a 
          href="{base}/spiral-governance-guide.pdf" 
          class="inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
          download
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
          </svg>
          {t.ui.downloadButton[currentLanguage]}
        </a>
      </div>
    </div>
    
    <!-- Quick Reference Guides -->
    <div class="mb-12">
      <h2 class="text-2xl font-bold mb-6 text-teal-700">{t.ui.quickReference[currentLanguage]}</h2>
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {#each quickReferenceItems as item}
          <a 
            href="{base}/guide-governance/{item.path.replace('guides/governance/', '')}"
            class="p-5 rounded-lg border border-gray-200 hover:border-teal-400 hover:shadow-md transition-all flex flex-col h-full"
          >
            <div class="flex items-start mb-2">
              <span class="bg-teal-100 text-teal-800 rounded-md py-1 px-2 text-sm mr-3 flex-shrink-0">
                {item.isTool ? t.ui.tools[currentLanguage] : t.ui.section[currentLanguage]}
              </span>
              <h4 class="font-semibold text-lg">{item.title[currentLanguage]}</h4>
            </div>
            {#if item.description}
              <p class="text-gray-600 text-sm mt-1">{item.description[currentLanguage]}</p>
            {/if}
          </a>
        {/each}
      </div>
    </div>
    
    <!-- Main Guide Sections -->
    <div class="mb-12">
      <h2 class="text-2xl font-bold mb-6 text-teal-700">{t.parts.introduction[currentLanguage]}</h2>
      
      <!-- Introduction -->
      {#if introSection}
        <a 
          href="{base}/guide-governance/{introSection.path.replace('guides/governance/', '')}"
          class="block mb-10 p-6 rounded-lg border border-teal-200 hover:border-teal-400 hover:shadow-md transition-all"
        >
          <div class="flex items-start mb-2">
            <span class="bg-teal-100 text-teal-800 font-bold rounded-md py-1 px-2 text-sm mr-3 flex-shrink-0">
              {t.ui.section[currentLanguage]} {introSection.section}
            </span>
            <h3 class="font-semibold text-xl">{introSection.title[currentLanguage]}</h3>
          </div>
          {#if introSection.description}
            <p class="text-gray-600 ml-11">{introSection.description[currentLanguage]}</p>
          {/if}
          
          <!-- Diagrams for this section -->
          {#if getTools(introSection.id).length > 0}
            <div class="ml-11 mt-4 flex flex-wrap gap-2">
              {#each getTools(introSection.id) as tool}
                <span class="inline-flex items-center bg-blue-50 text-blue-700 text-xs rounded-full px-3 py-1">
                  <svg class="w-3 h-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                  {tool.title[currentLanguage]}
                </span>
              {/each}
            </div>
          {/if}
        </a>
      {/if}
      
      <!-- Main content sections -->
      <div class="grid gap-6 md:grid-cols-2">
        {#each mainSections.filter(section => section.section !== "00" && section.section !== "05" && section.section !== "06") as section}
          <a 
            href="{base}/guide-governance/{section.path.replace('guides/governance/', '')}"
            class="p-5 rounded-lg border border-gray-200 hover:border-teal-400 hover:shadow-md transition-all flex flex-col h-full"
          >
            <div class="flex items-start mb-2">
              <span class="bg-teal-100 text-teal-800 font-bold rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
                {section.section}
              </span>
              <h3 class="font-semibold text-lg">{section.title[currentLanguage]}</h3>
            </div>
            {#if section.description}
              <p class="text-gray-600 text-sm ml-11">{section.description[currentLanguage]}</p>
            {/if}
            
            <!-- Visualizations for this section - show max 3 -->
            {#if getTools(section.id).length > 0}
              <div class="ml-11 mt-3 flex flex-wrap gap-2">
                {#each getTools(section.id).slice(0, 3) as tool}
                  <span class="inline-flex items-center bg-blue-50 text-blue-700 text-xs rounded-full px-2 py-1">
                    <svg class="w-3 h-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                    {tool.title[currentLanguage]}
                  </span>
                {/each}
                {#if getTools(section.id).length > 3}
                  <span class="inline-flex items-center bg-gray-50 text-gray-500 text-xs rounded-full px-2 py-1">
                    +{getTools(section.id).length - 3} {currentLanguage === 'en' ? 'more' : 'fler'}
                  </span>
                {/if}
              </div>
            {/if}
          </a>
        {/each}
      </div>
    </div>
    
    <!-- Conclusion and Resources -->
    <div class="mb-12">
      <h2 class="text-2xl font-bold mb-6 text-teal-700">{t.parts.conclusion[currentLanguage]}</h2>
      
      <div class="grid gap-6 md:grid-cols-2">
        {#each mainSections.filter(section => section.section === "05" || section.section === "06") as section}
          <a 
            href="{base}/guide-governance/{section.path.replace('guides/governance/', '')}"
            class="p-5 rounded-lg border border-gray-200 hover:border-teal-400 hover:shadow-md transition-all flex flex-col h-full"
          >
            <div class="flex items-start mb-2">
              <span class="bg-teal-100 text-teal-800 font-bold rounded-md py-1 px-2 text-sm mr-3 flex-shrink-0">
                {section.section === "05" ? t.parts.conclusion[currentLanguage] : t.parts.resources[currentLanguage]}
              </span>
              <h3 class="font-semibold text-lg">{section.title[currentLanguage]}</h3>
            </div>
            {#if section.description}
              <p class="text-gray-600 text-sm ml-11">{section.description[currentLanguage]}</p>
            {/if}
            
            <!-- Visualizations for this section -->
            {#if getTools(section.id).length > 0}
              <div class="ml-11 mt-3 flex flex-wrap gap-2">
                {#each getTools(section.id) as tool}
                  <span class="inline-flex items-center bg-blue-50 text-blue-700 text-xs rounded-full px-2 py-1">
                    <svg class="w-3 h-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                    {tool.title[currentLanguage]}
                  </span>
                {/each}
              </div>
            {/if}
          </a>
        {/each}
      </div>
    </div>
    
    <!-- Implementation Insights -->
    <div class="bg-gradient-to-r from-teal-100 to-blue-100 p-6 rounded-lg shadow-sm">
      <h2 class="text-xl font-bold mb-4">
        {currentLanguage === 'en' ? 'Implementation Insights' : 'Implementeringsinsikter'}
      </h2>
      <p class="text-gray-700 mb-3">
        {currentLanguage === 'en' 
          ? 'Need practical insights on implementing spiral-aware governance principles?' 
          : 'Behöver du praktiska insikter om hur man implementerar spiralmedvetna styrningsprinciper?'}
      </p>
      <a 
        href="{base}/guide-governance/resources" 
        class="inline-flex items-center text-teal-700 hover:text-teal-900 font-medium"
      >
        {currentLanguage === 'en' ? 'View Resources' : 'Visa resurser'}
        <svg class="w-5 h-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
        </svg>
      </a>
    </div>
  </div>

  <br>
  <ShareButtons />
  <br>
</div>

