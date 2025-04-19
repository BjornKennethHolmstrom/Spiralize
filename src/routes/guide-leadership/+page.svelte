<!-- src/routes/guide-leadership/+page.svelte -->
<script lang="ts">
  import { base } from '$app/paths';
  import languageStore from '$lib/stores/languageStore';
  import ShareButtons from '$lib/components/ShareButtons.svelte';
  import { fade } from 'svelte/transition';
  import { 
    leadershipGuideStore, 
    getIntroSection,
    getMainSections,
    getQuickReferenceItems,
    getTools
  } from '$lib/stores/leadershipGuideStore';

  const { language } = languageStore;
  $: currentLanguage = $language;

  // Get main content sections
  const introSection = getIntroSection();
  const mainSections = getMainSections();
  const quickReferenceItems = getQuickReferenceItems();
  
  // Get translations from store
  $: t = $leadershipGuideStore.translations[currentLanguage];
</script>

<svelte:head>
  <title>{t.title} | Spiralize</title>
  <meta name="description" content={t.introduction}>
</svelte:head>

<div class="max-w-6xl mx-auto px-4 py-12">
  <div in:fade>
    <h1 class="text-3xl md:text-4xl font-bold mb-2 text-purple-800">{t.title}</h1>
    <h2 class="text-xl text-gray-600 mb-8">{t.subtitle}</h2>
    
    <div class="prose max-w-none mb-10">
      <p class="text-lg">{t.introduction}</p>
      
      <!-- Who is this toolkit for? -->
      <div class="bg-yellow-50 p-6 rounded-lg my-8 shadow-sm border border-yellow-100">
        <h3 class="text-xl font-semibold mb-4 text-yellow-800">{t.forWhom}</h3>
        <ul class="space-y-2 mb-0">
          {#each t.forWhomContent as item}
            <li class="flex items-start">
              <span class="mr-2 text-yellow-700">•</span>
              <span>{item}</span>
            </li>
          {/each}
        </ul>
      </div>
      
      <!-- Download section -->
      <div class="bg-purple-50 p-6 rounded-lg my-8 shadow-sm border border-purple-100">
        <p class="font-medium mb-3">{t.downloadPrompt}</p>
        <a 
          href="{base}/spiral-leadership-toolkit.pdf" 
          class="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          download
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
          </svg>
          {t.downloadButton}
        </a>
      </div>
    </div>
    
    <!-- Quick Start Guides -->
    <div class="mb-12">
      <h2 class="text-2xl font-bold mb-6 text-purple-700">{t.quickStartGuidesTitle}</h2>
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {#each quickReferenceItems as item}
          <a 
            href="{base}/guide-leadership/{item.path}"
            class="p-5 rounded-lg border border-gray-200 hover:border-purple-400 hover:shadow-md transition-all flex flex-col h-full"
          >
            <div class="flex items-start mb-2">
              <span class="bg-indigo-100 text-indigo-800 rounded-md py-1 px-2 text-sm mr-3 flex-shrink-0">
                {item.isQuickReference ? t.toolText : t.sectionText}
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
    
    <!-- Main Toolkit Sections -->
    <div class="mb-12">
      <h2 class="text-2xl font-bold mb-6 text-purple-700">{t.toolkitSectionsTitle}</h2>
      
      <!-- Introduction -->
      {#if introSection}
        <a 
          href="{base}/guide-leadership/{introSection.path}"
          class="block mb-10 p-6 rounded-lg border border-purple-200 hover:border-purple-400 hover:shadow-md transition-all"
        >
          <div class="flex items-start mb-2">
            <span class="bg-purple-100 text-purple-800 font-bold rounded-md py-1 px-2 text-sm mr-3 flex-shrink-0">
              {t.sectionText} {introSection.section}
            </span>
            <h3 class="font-semibold text-xl">{introSection.title[currentLanguage]}</h3>
          </div>
          {#if introSection.description}
            <p class="text-gray-600 ml-11">{introSection.description[currentLanguage]}</p>
          {/if}
          
          <!-- Tools for this section -->
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
        {#each mainSections.filter(section => section.section !== "00") as section}
          <a 
            href="{base}/guide-leadership/{section.path}"
            class="p-5 rounded-lg border border-gray-200 hover:border-purple-400 hover:shadow-md transition-all flex flex-col h-full"
          >
            <div class="flex items-start mb-2">
              <span class="bg-purple-100 text-purple-800 font-bold rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
                {section.section}
              </span>
              <h3 class="font-semibold text-lg">{section.title[currentLanguage]}</h3>
            </div>
            {#if section.description}
              <p class="text-gray-600 text-sm ml-11">{section.description[currentLanguage]}</p>
            {/if}
            
            <!-- Tools for this section - show max 3 -->
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
    
    <!-- Implementation Roadmap -->
    <div class="bg-gradient-to-r from-purple-100 to-indigo-100 p-6 rounded-lg shadow-sm">
      <h2 class="text-xl font-bold mb-4">
        {currentLanguage === 'en' ? 'Implementation Roadmap' : 'Implementeringsplan'}
      </h2>
      <p class="text-gray-700 mb-3">
        {currentLanguage === 'en' 
          ? 'Need guidance on how to use this toolkit effectively?' 
          : 'Behöver du vägledning om hur du använder denna verktygsuppsättning effektivt?'}
      </p>
      <a 
        href="{base}/guide-leadership/roadmap" 
        class="inline-flex items-center text-purple-700 hover:text-purple-900 font-medium"
      >
        {currentLanguage === 'en' ? 'View Implementation Guide' : 'Visa Implementeringsguide'}
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
