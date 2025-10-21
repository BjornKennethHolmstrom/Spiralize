<!-- src/routes/guide-organizations/[slug]/+page.svelte -->
<script lang="ts">
  import { base } from '$app/paths';
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import languageStore from '$lib/stores/languageStore';
  import { marked } from 'marked';
  import { 
    organizationsGuideStore, 
    setCurrentChapter,
    getAdjacentChapters,
    getMainChapters,
    getAppendices,
    getChapterByPath
  } from '$lib/stores/organizationsGuideStore';
  import { afterNavigate } from '$app/navigation';

  afterNavigate(({ to, from }) => {
    if (to.params.slug !== from?.params.slug) {
      console.log('afterNavigate triggered with new slug:', to.params.slug);
      setCurrentChapter(to.params.slug);
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
  const allChapters = getMainChapters();
  const introduction = allChapters.find(chapter => chapter.number === "0");
  const mainChapters = allChapters.filter(chapter => chapter.number !== "0");
  const appendicesItems = getAppendices();

  // Get slug from page params
  $: slug = $page.params.slug;
  
  // Access translations
  $: t = $organizationsGuideStore.translations[currentLanguage];
  
  // Set current chapter when slug changes
  $: {
    if (slug) {
      setCurrentChapter(slug);
    }
  }
  
  // Current chapter and navigation tracking
  $: currentChapter = $organizationsGuideStore.currentChapter;
  $: adjacentChapters = currentChapter ? getAdjacentChapters(currentChapter.path) : { previous: null, next: null };
  
  // Form chapter title based on type
  $: chapterTitle = currentChapter ? formChapterTitle(currentChapter) : '';
  
  onMount(() => {
    console.log("Component mounted", { 
      slug,
      pathExists: typeof window !== 'undefined' && window.location.pathname,
      baseUrl: base
    });
  });

  function formChapterTitle(chapter) {
    if (!chapter) return '';
    
    if (chapter.isAppendix) {
      return `${t.appendixText} ${chapter.number}: ${chapter.title[currentLanguage]}`;
    } else if (chapter.number === "0") {
      return chapter.title[currentLanguage];
    } else {
      return `${t.chapterText} ${chapter.number}: ${chapter.title[currentLanguage]}`;
    }
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
    setCurrentChapter(slug);
    console.log('Store updated to:', $organizationsGuideStore.currentChapter);
    
    // Load content
    await loadContent(slug);
    
    console.groupEnd();
  }

  async function loadContent(chapterSlug) {
    isLoading = true;
    console.group(`Loading content for: ${chapterSlug}`);
    
    try {
      const chapter = getChapterByPath(chapterSlug);
      console.log("Checking getChapterByPath result:", chapter);
      if (!chapter) {
        console.error('Chapter not found in store for slug:', chapterSlug);
        isAvailable = false;
        return;
      }

      // Try multiple possible file locations
      const pathsToTry = [
        `${base}/content/guides/organizations/${chapterSlug}.md`,
        `/content/guides/organizations/${chapterSlug}.md`
      ];

      let contentLoaded = false;
      
      for (const path of pathsToTry) {
        console.log('Attempting to load from:', path);
        try {
          const response = await fetch(path);
          if (response.ok) {
            content = marked(await response.text());
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
        console.error('All paths failed for:', chapterSlug);
        content = generateErrorContent(chapterSlug, pathsToTry);
      }
    } catch (error) {
      console.error('Error loading content:', error);
      isAvailable = false;
      content = generateErrorContent(chapterSlug);
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

  function navigateToChapter(path) {
    console.log("Navigating to path:", path);
    // Use goto with replaceState: false to ensure proper navigation
    goto(`${base}/guide-organizations/${path}`, {
      replaceState: false,
      keepFocus: true,
      noScroll: false,
      invalidateAll: true  // Force full reload if needed
    });
  }
</script>

<svelte:head>
  <title>{chapterTitle} | Spiralize</title>
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
          {chapterTitle || 'Content Not Found'}
        </h1>
        <div class="bg-purple-50 p-8 rounded-lg text-center">
          <p class="text-lg text-gray-600 mb-4">{t.comingSoon}</p>
          <a href="{base}/guide-organizations" class="text-purple-600 hover:text-purple-800">← {t.tableOfContents}</a>
        </div>
      </div>
    </div>
  {:else}
    <div in:fade>
      <!-- Content header -->
      <div class="mb-10">
        {#if currentChapter?.isAppendix}
          <div class="text-sm text-purple-600 mb-2">
            {t.appendixText} {currentChapter.number}
          </div>
        {:else if currentChapter?.number !== "0"}
          <div class="text-sm text-purple-600 mb-2">
            {t.chapterText} {currentChapter.number}
          </div>
        {/if}
        <h1 class="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
          {currentChapter?.title[currentLanguage]}
        </h1>
      </div>
      
      <!-- Page layout with sidebar for larger screens -->
      <div class="lg:flex gap-8">
        <div class="hidden lg:block w-64 flex-shrink-0">
          <div class="sticky top-8 max-h-[calc(100vh-4rem)] overflow-y-auto">
            <a 
              href="{base}/guide-organizations" 
              class="font-semibold text-lg mb-4 inline-flex items-center hover:text-purple-600 transition-colors"
            >
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
              {t.tableOfContents}
            </a>
            
            <!-- Introduction -->
            {#if introduction}
              <div class="mt-4">
                <ul class="space-y-2 border-l border-gray-200 pl-4">
                  <li>
                    <a 
                      href="{base}/guide-organizations/{introduction.path}"
                      class="block py-1 hover:text-purple-600 transition-colors {introduction.path === slug ? 'font-semibold text-purple-600 border-l-2 border-purple-600 -ml-[17px] pl-[15px]' : 'text-gray-600'}"
                    >
                      {introduction.title[currentLanguage]}
                    </a>
                  </li>
                </ul>
              </div>
            {/if}
            
            <!-- Main Chapters Section -->
            <div class="mt-4">
              <h4 class="text-sm uppercase text-gray-500 font-medium mb-2">{t.mainChaptersTitle}</h4>
              <ul class="space-y-2 border-l border-gray-200 pl-4">
                {#each mainChapters as chapter}
                  <li>
                    <a 
                      href="{base}/guide-organizations/{chapter.path}"
                      class="block py-1 hover:text-purple-600 transition-colors {chapter.path === slug ? 'font-semibold text-purple-600 border-l-2 border-purple-600 -ml-[17px] pl-[15px]' : 'text-gray-600'}"
                    >
                      {chapter.number}. {chapter.title[currentLanguage]}
                    </a>
                  </li>
                {/each}
              </ul>
            </div>
            
            <!-- Appendices Section -->
            {#if appendicesItems.length > 0}
              <div class="mt-4">
                <h4 class="text-sm uppercase text-gray-500 font-medium mb-2">{t.appendicesTitle}</h4>
                <ul class="space-y-2 border-l border-gray-200 pl-4">
                  {#each appendicesItems as chapter}
                    <li>
                      <a 
                        href="{base}/guide-organizations/{chapter.path}"
                        class="block py-1 hover:text-purple-600 transition-colors {chapter.path === slug ? 'font-semibold text-purple-600 border-l-2 border-purple-600 -ml-[17px] pl-[15px]' : 'text-gray-600'}"
                      >
                        {chapter.number}. {chapter.title[currentLanguage]}
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
          
          <!-- Previous/Next navigation -->
          <div class="flex justify-between mt-16 pt-8 border-t border-gray-200">
            {#if adjacentChapters.previous}
              <a 
                href="{base}/guide-organizations/{adjacentChapters.previous.path}" 
                class="flex items-center text-purple-600 hover:text-purple-800"
              >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
                <span>
                  <span class="block text-xs text-gray-500">{t.previous}</span>
                  <span>{adjacentChapters.previous.title[currentLanguage]}</span>
                </span>
              </a>
            {:else}
              <div></div>
            {/if}
            
            {#if adjacentChapters.next}
              <a 
                href="{base}/guide-organizations/{adjacentChapters.next.path}" 
                class="flex items-center text-purple-600 hover:text-purple-800"
              >
                <span class="text-right">
                  <span class="block text-xs text-gray-500">{t.next}</span>
                  <span>{adjacentChapters.next.title[currentLanguage]}</span>
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
              href="{base}/guide-organizations" 
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
