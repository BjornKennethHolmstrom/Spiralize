<!-- src/routes/guide-personal/[slug]/+page.svelte -->
<script lang="ts">
  import { base } from '$app/paths';
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import languageStore from '$lib/stores/languageStore';
  import { marked } from 'marked';
  import { 
    personalGuideStore, 
    setCurrentItem,
    getAdjacentItems,
    getChapterResources,
    getPartIChapters,
    getPartIIChapters,
    getPartIIIChapters,
    getPartIVChapters,
    getAppendices,
    getMainNavItems,
    getItemByPath
  } from '$lib/stores/personalGuideStore';
  import { afterNavigate } from '$app/navigation';

  afterNavigate(({ to, from }) => {
    if (to.params.slug !== from?.params.slug) {
      console.log('afterNavigate triggered with new slug:', to.params.slug);
      setCurrentItem(to.params.slug);
      loadContent(to.params.slug);
    }
  });

  const { language } = languageStore;
  $: currentLanguage = $language;

  // Content loading states
  let content = '';
  let isLoading = true;
  let isAvailable = true;
  
  // Get navigation items
  const prefaceItem = getMainNavItems().find(item => item.type === 'preface');
  const partIItems = getPartIChapters();
  const partIIItems = getPartIIChapters();
  const partIIIItems = getPartIIIChapters();
  const partIVItems = getPartIVChapters();
  const appendicesItems = getAppendices();

  // Get slug from page params
  $: slug = $page.params.slug;
  
  // Access translations
  $: t = $personalGuideStore.translations[currentLanguage];
  
  // Set current item when slug changes
  $: {
    if (slug) {
      setCurrentItem(slug);
    }
  }
  
  // Current item and navigation tracking
  $: currentItem = $personalGuideStore.currentItem;
  $: adjacentItems = currentItem ? getAdjacentItems(currentItem.path) : { previous: null, next: null };
  $: resources = currentItem && currentItem.type === 'chapter' ? getChapterResources(currentItem.id) : [];
  
  // Form item title based on type
  $: itemTitle = currentItem ? formItemTitle(currentItem) : '';
  
  onMount(() => {
    console.log("Component mounted", { 
      slug,
      pathExists: typeof window !== 'undefined' && window.location.pathname,
      baseUrl: base
    });
  });

  function formItemTitle(item) {
    if (!item) return '';
    
    if (item.type === 'chapter') {
      return `${t.chapterText} ${item.number}: ${item.title[currentLanguage]}`;
    } else if (item.type === 'appendix') {
      return `${t.appendixText} ${item.number}: ${item.title[currentLanguage]}`;
    } else if (item.type === 'preface') {
      return item.title[currentLanguage];
    } else if (item.isWorksheet) {
      return `${t.worksheetText}: ${item.title[currentLanguage]}`;
    } else if (item.isPracticeCard) {
      return `${t.cardText}: ${item.title[currentLanguage]}`;
    } else if (item.isReflectionTool) {
      return `${t.toolText}: ${item.title[currentLanguage]}`;
    } else if (item.isTemplate) {
      return `${t.templateText}: ${item.title[currentLanguage]}`;
    } else if (item.isVisualization) {
      return `${t.visualizationText}: ${item.title[currentLanguage]}`;
    }
    
    return item.title[currentLanguage];
  }

  $: {
    console.log('Page params updated:', $page.params);
    if ($page.params.slug) {
      handleSlugChange($page.params.slug);
    }
  }

  async function handleSlugChange(slug) {
    console.group('Handling slug change');
    console.log('New slug:', slug);
    
    // Force store update
    setCurrentItem(slug);
    console.log('Store updated to:', $personalGuideStore.currentItem);
    
    // Load content
    await loadContent(slug);
    
    console.groupEnd();
  }

  async function loadContent(itemSlug) {
    isLoading = true;
    console.group(`Loading content for: ${itemSlug}`);
    
    try {
      const item = getItemByPath(itemSlug);
      console.log("Checking getItemByPath result:", item);
      if (!item) {
        console.error('Item not found in store for slug:', itemSlug);
        isAvailable = false;
        return;
      }

      // Try language-specific paths first, then fallback to English
      let pathsToTry = [];
      
      // First try the user's preferred language
      pathsToTry = [
        `${base}/content/guides/personal-growth/${currentLanguage}/${itemSlug}.md`,
        `${base}/content/guides/personal-growth/${currentLanguage}/resources/${itemSlug}.md`,
        `/content/guides/personal-growth/${currentLanguage}/${itemSlug}.md`,
        `/content/guides/personal-growth/${currentLanguage}/resources/${itemSlug}.md`,
      ];
      
      // Then try English as fallback if we're not already looking for English
      if (currentLanguage !== 'en') {
        pathsToTry = pathsToTry.concat([
          `${base}/content/guides/personal-growth/en/${itemSlug}.md`,
          `${base}/content/guides/personal-growth/en/resources/${itemSlug}.md`,
          `/content/guides/personal-growth/en/${itemSlug}.md`,
          `/content/guides/personal-growth/en/resources/${itemSlug}.md`,
        ]);
      }

      let contentLoaded = false;
      let isEnglishFallback = false;
      
      for (const path of pathsToTry) {
        console.log('Attempting to load from:', path);
        try {
          const response = await fetch(path);
          if (response.ok) {
            let markdown = await response.text();
            
            // If we're using English content as a fallback for Swedish users, add a notice
            if (currentLanguage === 'sv' && path.includes('/en/')) {
              isEnglishFallback = true;
              const englishNotice = `
  > *Obs: Denna sida är för närvarande endast tillgänglig på engelska. Vi arbetar med att översätta allt innehåll till svenska.*

  ---

  `;
              markdown = englishNotice + markdown;
            }
            
            content = marked(markdown);
            contentLoaded = true;
            console.log('Successfully loaded from:', path);
            break;
          }
        } catch (error) {
          console.warn('Failed to load from', path, error);
        }
      }

      isAvailable = contentLoaded;
      if (!contentLoaded) {
        console.error('All paths failed for:', itemSlug);
        content = generateErrorContent(itemSlug, pathsToTry);
      }
    } catch (error) {
      console.error('Error loading content:', error);
      isAvailable = false;
      content = generateErrorContent(itemSlug);
    } finally {
      isLoading = false;
      console.groupEnd();
    }
  }

  function generateErrorContent(slug, attemptedPaths = []) {
    return `
      <div class="error-content">
        <h3>Content Loading Issue</h3>
        <p>Could not load: ${slug}</p>
        ${attemptedPaths.length ? `
          <p>Tried paths:</p>
          <ul>
            ${attemptedPaths.map(p => `<li>${p}</li>`).join('')}
          </ul>
        ` : ''}
      </div>
    `;
  }

  function navigateToItem(path) {
    console.log("Navigating to path:", path);
    // Use goto with replaceState: false to ensure proper navigation
    goto(`${base}/guide-personal/${path}`, {
      replaceState: false,
      keepFocus: true,
      noScroll: false,
      invalidateAll: true  // Force full reload if needed
    });
  }
</script>

<svelte:head>
  <title>{itemTitle} | Spiralize</title>
</svelte:head>

<div class="max-w-4xl mx-auto px-4 py-12">
  {#if isLoading}
    <div class="flex justify-center items-center py-20">
      <p class="text-gray-500">{t.loading}</p>
    </div>
  {:else if !isAvailable}
    <div in:fade>
      <div class="mb-10">
        <h1 class="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
          {itemTitle || 'Content Not Found'}
        </h1>
        <div class="bg-purple-50 p-8 rounded-lg text-center">
          <p class="text-lg text-gray-600 mb-4">{t.comingSoon}</p>
          <a href="{base}/guide-personal" class="text-purple-600 hover:text-purple-800">← {t.tableOfContents}</a>
        </div>
      </div>
    </div>
  {:else}
    <div in:fade>
      <!-- Content header -->
      <div class="mb-10">
        {#if currentItem?.type === 'chapter'}
          <div class="text-sm text-purple-600 mb-2">
            {t.chapterText} {currentItem.number}
          </div>
        {:else if currentItem?.type === 'appendix'}
          <div class="text-sm text-purple-600 mb-2">
            {t.appendixText} {currentItem.number}
          </div>
        {:else if currentItem?.type !== 'preface' && currentItem?.chapterRef}
          <!-- If it's a resource linked to a chapter -->
          <div class="text-sm text-purple-600 mb-2">
            <a href="{base}/guide-personal/{currentItem.chapterRef}" class="hover:underline">
              {t.chapterText} {getItemByPath(currentItem.chapterRef)?.number}
            </a> / {currentItem.isWorksheet ? t.worksheetText : currentItem.isPracticeCard ? t.cardText : currentItem.isReflectionTool ? t.toolText : currentItem.isTemplate ? t.templateText : currentItem.isVisualization ? t.visualizationText : ''}
          </div>
        {/if}
        <h1 class="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
          {currentItem?.title[currentLanguage]}
        </h1>
      </div>
      
      <!-- Page layout with sidebar for larger screens -->
      <div class="lg:flex gap-8">
        <div class="hidden lg:block w-64 flex-shrink-0">
          <div class="sticky top-8 max-h-[calc(100vh-4rem)] overflow-y-auto">
            <a 
              href="{base}/guide-personal" 
              class="font-semibold text-lg mb-4 inline-flex items-center hover:text-purple-600 transition-colors"
            >
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
              {t.tableOfContents}
            </a>
            
            <!-- Preface -->
            {#if prefaceItem}
              <div class="mt-4">
                <ul class="space-y-2 border-l border-gray-200 pl-4">
                  <li>
                    <a 
                      href="{base}/guide-personal/{prefaceItem.path}"
                      class="block py-1 hover:text-purple-600 transition-colors {prefaceItem.path === slug ? 'font-semibold text-purple-600 border-l-2 border-purple-600 -ml-[17px] pl-[15px]' : 'text-gray-600'}"
                    >
                      {prefaceItem.title[currentLanguage]}
                    </a>
                  </li>
                </ul>
              </div>
            {/if}
            
            <!-- Part I Section -->
            <div class="mt-4">
              <h4 class="text-sm uppercase text-gray-500 font-medium mb-2">{t.sectionsTitle.partI}</h4>
              <ul class="space-y-2 border-l border-gray-200 pl-4">
                {#each partIItems as item}
                  <li>
                    <a 
                      href="{base}/guide-personal/{item.path}"
                      class="block py-1 hover:text-purple-600 transition-colors {item.path === slug ? 'font-semibold text-purple-600 border-l-2 border-purple-600 -ml-[17px] pl-[15px]' : 'text-gray-600'}"
                    >
                      {item.number}. {item.title[currentLanguage]}
                    </a>
                  </li>
                {/each}
              </ul>
            </div>
            
            <!-- Part II Section -->
            <div class="mt-4">
              <h4 class="text-sm uppercase text-gray-500 font-medium mb-2">{t.sectionsTitle.partII}</h4>
              <ul class="space-y-2 border-l border-gray-200 pl-4">
                {#each partIIItems as item}
                  <li>
                    <a 
                      href="{base}/guide-personal/{item.path}"
                      class="block py-1 hover:text-purple-600 transition-colors {item.path === slug ? 'font-semibold text-purple-600 border-l-2 border-purple-600 -ml-[17px] pl-[15px]' : 'text-gray-600'}"
                    >
                      {item.number}. {item.title[currentLanguage]}
                    </a>
                  </li>
                {/each}
              </ul>
            </div>
            
            <!-- Part III Section -->
            <div class="mt-4">
              <h4 class="text-sm uppercase text-gray-500 font-medium mb-2">{t.sectionsTitle.partIII}</h4>
              <ul class="space-y-2 border-l border-gray-200 pl-4">
                {#each partIIIItems as item}
                  <li>
                    <a 
                      href="{base}/guide-personal/{item.path}"
                      class="block py-1 hover:text-purple-600 transition-colors {item.path === slug ? 'font-semibold text-purple-600 border-l-2 border-purple-600 -ml-[17px] pl-[15px]' : 'text-gray-600'}"
                    >
                      {item.number}. {item.title[currentLanguage]}
                    </a>
                  </li>
                {/each}
              </ul>
            </div>
            
            <!-- Part IV Section -->
            <div class="mt-4">
              <h4 class="text-sm uppercase text-gray-500 font-medium mb-2">{t.sectionsTitle.partIV}</h4>
              <ul class="space-y-2 border-l border-gray-200 pl-4">
                {#each partIVItems as item}
                  <li>
                    <a 
                      href="{base}/guide-personal/{item.path}"
                      class="block py-1 hover:text-purple-600 transition-colors {item.path === slug ? 'font-semibold text-purple-600 border-l-2 border-purple-600 -ml-[17px] pl-[15px]' : 'text-gray-600'}"
                    >
                      {item.number}. {item.title[currentLanguage]}
                    </a>
                  </li>
                {/each}
              </ul>
            </div>
            
            <!-- Appendices Section -->
            {#if appendicesItems.length > 0}
              <div class="mt-4">
                <h4 class="text-sm uppercase text-gray-500 font-medium mb-2">{t.sectionsTitle.appendices}</h4>
                <ul class="space-y-2 border-l border-gray-200 pl-4">
                  {#each appendicesItems as item}
                    <li>
                      <a 
                        href="{base}/guide-personal/{item.path}"
                        class="block py-1 hover:text-purple-600 transition-colors {item.path === slug ? 'font-semibold text-purple-600 border-l-2 border-purple-600 -ml-[17px] pl-[15px]' : 'text-gray-600'}"
                      >
                        {item.number}. {item.title[currentLanguage]}
                      </a>
                    </li>
                  {/each}
                </ul>
              </div>
            {/if}
          </div>
        </div>
        
        <!-- Main content area -->
        <div class="flex-1">
          <div class="prose max-w-none">
            {@html content}
          </div>
          
          <!-- Resources section -->
          {#if resources.length > 0 && currentItem?.type === 'chapter'}
            <div class="mt-12 p-6 bg-purple-50 rounded-lg">
              <h3 class="text-xl font-semibold mb-4 text-purple-700">{t.resources}</h3>
              <div class="grid gap-4 md:grid-cols-2">
                {#each resources as resource}
                  <a 
                    href="{base}/guide-personal/{resource.path}"
                    sveltekit:prefetch
                    class="p-4 bg-white rounded-lg border border-purple-200 hover:border-purple-400 hover:shadow-md transition-all flex flex-col"
                  >
                    <h4 class="font-medium">
                      {#if resource.isWorksheet}
                        <span class="text-sm bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full mr-2">
                          {t.worksheetText}
                        </span>
                      {:else if resource.isPracticeCard}
                        <span class="text-sm bg-green-100 text-green-700 px-2 py-0.5 rounded-full mr-2">
                          {t.cardText}
                        </span>
                      {:else if resource.isReflectionTool}
                        <span class="text-sm bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full mr-2">
                          {t.toolText}
                        </span>
                      {:else if resource.isTemplate}
                        <span class="text-sm bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full mr-2">
                          {t.templateText}
                        </span>
                      {:else if resource.isVisualization}
                        <span class="text-sm bg-pink-100 text-pink-700 px-2 py-0.5 rounded-full mr-2">
                          {t.visualizationText}
                        </span>
                      {/if}
                      {resource.title[currentLanguage]}
                    </h4>
                    {#if resource.description}
                      <p class="text-gray-600 text-sm mt-1">{resource.description[currentLanguage]}</p>
                    {/if}
                  </a>
                {/each}
              </div>
            </div>
          {/if}
          
          <!-- Previous/Next navigation -->
          <div class="flex justify-between mt-16 pt-8 border-t border-gray-200">
            {#if adjacentItems.previous && (adjacentItems.previous.type === 'chapter' || adjacentItems.previous.type === 'appendix' || adjacentItems.previous.type === 'preface')}
              <a 
                href="{base}/guide-personal/{adjacentItems.previous.path}" 
                class="flex items-center text-purple-600 hover:text-purple-800"
              >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
                <span>
                  <span class="block text-xs text-gray-500">{t.previous}</span>
                  <span>{adjacentItems.previous.title[currentLanguage]}</span>
                </span>
              </a>
            {:else}
              <div></div>
            {/if}
            
            {#if adjacentItems.next && (adjacentItems.next.type === 'chapter' || adjacentItems.next.type === 'appendix')}
              <a 
                href="{base}/guide-personal/{adjacentItems.next.path}" 
                class="flex items-center text-purple-600 hover:text-purple-800"
              >
                <span class="text-right">
                  <span class="block text-xs text-gray-500">{t.next}</span>
                  <span>{adjacentItems.next.title[currentLanguage]}</span>
                </span>
                <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            {:else}
              <div></div>
            {/if}
          </div>
          
          <!-- Back to main guide page -->
          <div class="text-center mt-10">
            <a 
              href="{base}/guide-personal" 
              class="inline-flex items-center text-purple-600 hover:text-purple-800"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              {t.tableOfContents}
            </a>
          </div>
        </div>
      </div>
    </div>
  {/if}
</div>
