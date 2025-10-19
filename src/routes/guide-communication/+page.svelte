<!-- src/routes/guide-communication/+page.svelte -->
<script lang="ts">
  import { base } from '$app/paths';
  import languageStore from '$lib/stores/languageStore';
  import ShareButtons from '$lib/components/ShareButtons.svelte';
  import { fade } from 'svelte/transition';
  import { 
    communicationGuideStore, 
    getPreface,
    getPartIChapters,
    getPartIIChapters,
    getPartIIIChapters,
    getPartIVChapters,
    getAppendices 
  } from '$lib/stores/communicationGuideStore';
  import SEO from '$lib/components/SEO.svelte';

  const { language } = languageStore;
  $: currentLanguage = $language;

  // Get content sections from store
  const preface = getPreface();
  const partIChapters = getPartIChapters();
  const partIIChapters = getPartIIChapters();
  const partIIIChapters = getPartIIIChapters();
  const partIVChapters = getPartIVChapters();
  const appendices = getAppendices();

  // Get translations from store
  $: t = $communicationGuideStore.translations[currentLanguage];
</script>

<SEO 
  title="Communicating Spiral Dynamics"
  description="Learn how to effectively communicate Spiral Dynamics to people."
  keywords="spiral dynamics communication, developmental communication, cross-stage dialogue"
  type="article"
  section="Guides"
/>

<div class="max-w-5xl mx-auto px-4 py-12">
  <div in:fade>
    <h1 class="text-3xl md:text-4xl font-bold mb-2 text-purple-800">{t.title}</h1>
    <h2 class="text-xl text-gray-600 mb-6">{t.subtitle}</h2>
    
    <div class="prose max-w-none mb-10">
      <p class="text-lg">{t.introduction}</p>
      
      <!-- 
      <div class="bg-purple-50 p-6 rounded-lg my-8 shadow-sm border border-purple-100">
        <p class="font-medium mb-3">{t.downloadPrompt}</p>
        <a 
          href="{base}/spiral-communication-guide-{currentLanguage}.pdf" 
          class="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          download
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
          </svg>
          {t.downloadButton}
        </a>
      </div> -->
    </div>
    
    <div class="mb-12">
      <h2 class="text-2xl font-bold mb-6 text-purple-700">{t.tableOfContentsTitle}</h2>
      
      <!-- Preface -->
      {#if preface}
        <h3 class="text-xl font-semibold mb-4 text-purple-600">{t.sectionsTitle.preface}</h3>
        <div class="mb-10">
          <a 
            href="{base}/guide-communication/{preface.path}"
            class="p-4 rounded-lg border border-gray-200 hover:border-purple-400 hover:shadow-md transition-all flex flex-col"
          >
            <h4 class="font-semibold text-lg">{preface.title[currentLanguage]}</h4>
            {#if preface.description}
              <p class="text-gray-600 text-sm">{preface.description[currentLanguage]}</p>
            {/if}
          </a>
        </div>
      {/if}
      
      <!-- Golden Rules -->
      <h3 class="text-xl font-semibold mb-4 text-purple-600">{t.sectionsTitle.goldenRules}</h3>
      <div class="mb-10">
        <a 
          href="{base}/guide-communication/golden-rules"
          class="p-4 rounded-lg border border-gray-200 hover:border-purple-400 hover:shadow-md transition-all flex flex-col"
        >
          <h4 class="font-semibold text-lg">{t.goldenRulesTitle}</h4>
          <p class="text-gray-600 text-sm">{t.goldenRulesDescription}</p>
        </a>
      </div>
      
      <!-- Part I: Understanding the Communication Challenge -->
      <h3 class="text-xl font-semibold mb-4 text-purple-600">{t.sectionsTitle.partI}</h3>
      <div class="grid gap-4 md:grid-cols-2 mb-10">
        {#each partIChapters as chapter}
          <a 
            href="{base}/guide-communication/{chapter.path}"
            class="p-4 rounded-lg border border-gray-200 hover:border-purple-400 hover:shadow-md transition-all flex flex-col"
          >
            <div class="flex items-start mb-2">
              <span class="bg-purple-100 text-purple-800 font-bold rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
                {chapter.number}
              </span>
              <h4 class="font-semibold text-lg">{chapter.title[currentLanguage]}</h4>
            </div>
            {#if chapter.description}
              <p class="text-gray-600 text-sm ml-11">{chapter.description[currentLanguage]}</p>
            {/if}
          </a>
        {/each}
      </div>
      
      <!-- Updated: Part II section heading -->
      <h3 class="text-xl font-semibold mb-4 text-purple-600">{t.sectionsTitle.partII}</h3>
      <div class="grid gap-4 md:grid-cols-2 mb-10">
        {#each partIIChapters as chapter}
          <a 
            href="{base}/guide-communication/{chapter.path}"
            class="p-4 rounded-lg border border-gray-200 hover:border-purple-400 hover:shadow-md transition-all flex flex-col"
          >
            <div class="flex items-start mb-2">
              <span class="bg-purple-100 text-purple-800 font-bold rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
                {chapter.number}
              </span>
              <h4 class="font-semibold text-lg">{chapter.title[currentLanguage]}</h4>
            </div>
            {#if chapter.description}
              <p class="text-gray-600 text-sm ml-11">{chapter.description[currentLanguage]}</p>
            {/if}
          </a>
        {/each}
      </div>
      
      <!-- Part III: The Communicator's Craft -->
      <h3 class="text-xl font-semibold mb-4 text-purple-600">{t.sectionsTitle.partIII}</h3>
      <div class="grid gap-4 md:grid-cols-2 mb-10">
        {#each partIIIChapters as chapter}
          <a 
            href="{base}/guide-communication/{chapter.path}"
            class="p-4 rounded-lg border border-gray-200 hover:border-purple-400 hover:shadow-md transition-all flex flex-col"
          >
            <div class="flex items-start mb-2">
              <span class="bg-purple-100 text-purple-800 font-bold rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
                {chapter.number}
              </span>
              <h4 class="font-semibold text-lg">{chapter.title[currentLanguage]}</h4>
            </div>
            {#if chapter.description}
              <p class="text-gray-600 text-sm ml-11">{chapter.description[currentLanguage]}</p>
            {/if}
          </a>
        {/each}
      </div>
      
      <!-- Part IV: Advanced Application & Ethics -->
      <h3 class="text-xl font-semibold mb-4 text-purple-600">{t.sectionsTitle.partIV}</h3>
      <div class="grid gap-4 md:grid-cols-2 mb-10">
        {#each partIVChapters as chapter}
          <a 
            href="{base}/guide-communication/{chapter.path}"
            class="p-4 rounded-lg border border-gray-200 hover:border-purple-400 hover:shadow-md transition-all flex flex-col"
          >
            <div class="flex items-start mb-2">
              <span class="bg-purple-100 text-purple-800 font-bold rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
                {chapter.number}
              </span>
              <h4 class="font-semibold text-lg">{chapter.title[currentLanguage]}</h4>
            </div>
            {#if chapter.description}
              <p class="text-gray-600 text-sm ml-11">{chapter.description[currentLanguage]}</p>
            {/if}
          </a>
        {/each}
      </div>
      
      <!-- Appendices - Modified spacing -->
      {#if appendices.length > 0}
        <h3 class="text-xl font-semibold mb-4 text-purple-600">{t.sectionsTitle.appendices}</h3>
        <div class="grid gap-4 md:grid-cols-2">
          {#each appendices as appendix}
            <a 
              href="{base}/guide-communication/{appendix.path}"
              class="p-4 rounded-lg border border-gray-200 hover:border-purple-400 hover:shadow-md transition-all flex flex-col"
            >
              <div class="flex items-start mb-2">
                <span class="bg-purple-100 text-purple-800 font-bold rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
                  {appendix.number}
                </span>
                <h4 class="font-semibold text-lg">{appendix.title[currentLanguage]}</h4>
              </div>
              {#if appendix.description}
                <p class="text-gray-600 text-sm ml-11">{appendix.description[currentLanguage]}</p>
              {/if}
            </a>
          {/each}
        </div>
      {/if}
    </div>
  </div>

  <br>
  <ShareButtons />
  <br>
</div>

