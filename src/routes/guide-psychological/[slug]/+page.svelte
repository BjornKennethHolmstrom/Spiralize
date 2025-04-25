<!-- src/routes/guide-psychological/[slug]/+page.svelte -->
<script lang="ts">
  import { base } from '$app/paths';
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import languageStore from '$lib/stores/languageStore';
  import { marked } from 'marked';
  import { 
    guideStore, 
    getAllChapters,
    getMainChapters,
    setCurrentChapter,
    getAdjacentChapters,
    getAppendices
  } from '$lib/stores/psychGuideStore';

  const { language } = languageStore;
  $: currentLanguage = $language;

  // Chapter content loading
  let chapterContent = '';
  let isLoading = true;
  let isAvailable = true;
  
  // Get chapters for navigation
  const allChapters = getAllChapters();
  const mainChapters = getMainChapters();

  // Get slug from page params
  $: slug = $page.params.slug;
  
  // Access translations
  $: t = $guideStore.translations[currentLanguage];
  
  // Set current chapter when slug changes
  $: {
    if (slug) {
      setCurrentChapter(slug);
    }
  }
  
  // Current chapter and navigation tracking
  $: currentChapter = $guideStore.currentChapter;
  $: adjacentChapters = currentChapter ? getAdjacentChapters(currentChapter.path) : { previous: null, next: null };
  
  // Form chapter title based on whether it's an appendix or regular chapter
  $: chapterTitle = currentChapter ? 
    (currentChapter.isAppendix ? 
      `${t.appendixText} ${currentChapter.number}: ${currentChapter.title[currentLanguage]}` : 
      `${t.chapterText} ${currentChapter.number}: ${currentChapter.title[currentLanguage]}`) : '';

  // Load chapter content when slug changes
  $: {
    if (slug) {
      loadChapterContent(slug);
    }
  }

  async function loadChapterContent(chapterSlug) {
    isLoading = true;
    
    try {
      // Check if it's an appendix or a regular chapter
      const isAppendixContent = chapterSlug.startsWith('appendix-');
      
      if (isAppendixContent) {
        // It's an appendix, check if it exists in our store
        const appendix = allChapters.find(ch => ch.path === chapterSlug);
        if (!appendix) {
          isAvailable = false;
          return;
        }
      } else {
        // It's a regular chapter, validate number
        const chapterNumber = chapterSlug.replace('chapter-', '');
        if (parseInt(chapterNumber) > 17) {
          isAvailable = false;
          return;
        }
      }
      
      // Try to load content in the user's preferred language
      let response = await fetch(`${base}/content/guides/psychology/${currentLanguage}/${chapterSlug}.md`);
      
      // If Swedish content doesn't exist yet, fall back to English
      if (!response.ok && currentLanguage === 'sv') {
        response = await fetch(`${base}/content/guides/psychology/en/${chapterSlug}.md`);
        
        // Add a note that this content is only available in English
        if (response.ok) {
          const markdown = await response.text();
          const englishNotice = `
  > *Obs: Denna sida är för närvarande endast tillgänglig på engelska. Vi arbetar med att översätta allt innehåll till svenska.*

  ---

  `;
          chapterContent = marked(englishNotice + markdown);
          isAvailable = true;
          isLoading = false;
          return;
        }
      }
      
      if (!response.ok) throw new Error(`Failed to load content: ${response.status}`);
      
      const markdown = await response.text();
      chapterContent = marked(markdown);
      isAvailable = true;
    } catch (error) {
      console.error("Error loading content:", error);
      chapterContent = `<p class="text-red-500">${t.error}</p>`;
      isAvailable = false;
    } finally {
      isLoading = false;
    }
  }

  // Navigation functions
  function navigateToChapter(path) {
    goto(`${base}/guide-psychological/${path}`);
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
          {chapterTitle}
        </h1>
        <div class="bg-purple-50 p-8 rounded-lg text-center">
          <p class="text-lg text-gray-600 mb-4">{t.comingSoon}</p>
          <a href="{base}/guide-psychological" class="text-purple-600 hover:text-purple-800">← {t.tableOfContents}</a>
        </div>
      </div>
    </div>
  {:else}
    <div in:fade>
      <!-- Chapter header -->
      <div class="mb-10">
        <div class="text-sm text-purple-600 mb-2">
          {currentChapter?.isAppendix ? t.appendixText : t.chapterText} {currentChapter?.number}
        </div>
        <h1 class="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
          {currentChapter?.title[currentLanguage]}
        </h1>
      </div>
      
      <!-- Chapter navigation sidebar for larger screens -->
      <div class="lg:flex gap-8">
        <div class="hidden lg:block w-64 flex-shrink-0">
          <div class="sticky top-8">
            <a 
              href="{base}/guide-psychological" 
              class="font-semibold text-lg mb-4 inline-flex items-center hover:text-purple-600 transition-colors"
            >
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
              {t.tableOfContents}
            </a>
            
            <!-- Main Chapters Section -->
            <div class="mt-4">
              <h4 class="text-sm uppercase text-gray-500 font-medium mb-2">{t.mainChaptersTitle}</h4>
              <ul class="space-y-2 border-l border-gray-200 pl-4">
                {#each mainChapters as chapter}
                  <li>
                    <a 
                      href="{base}/guide-psychological/{chapter.path}"
                      class="block py-1 hover:text-purple-600 transition-colors {chapter.path === slug ? 'font-semibold text-purple-600 border-l-2 border-purple-600 -ml-[17px] pl-[15px]' : 'text-gray-600'}"
                    >
                      {chapter.number}. {chapter.title[currentLanguage]}
                    </a>
                  </li>
                {/each}
              </ul>
            </div>
            
            <!-- Appendices Section -->
            {#if getAppendices().length > 0}
              <div class="mt-6">
                <h4 class="text-sm uppercase text-gray-500 font-medium mb-2">{t.appendicesTitle}</h4>
                <ul class="space-y-2 border-l border-gray-200 pl-4">
                  {#each getAppendices() as appendix}
                    <li>
                      <a 
                        href="{base}/guide-psychological/{appendix.path}"
                        class="block py-1 hover:text-purple-600 transition-colors {appendix.path === slug ? 'font-semibold text-purple-600 border-l-2 border-purple-600 -ml-[17px] pl-[15px]' : 'text-gray-600'}"
                      >
                        {appendix.number}. {appendix.title[currentLanguage]}
                      </a>
                    </li>
                  {/each}
                </ul>
              </div>
            {/if}
          </div>
        </div>
        
        <!-- Chapter content -->
        <div class="flex-1">
          <div class="prose max-w-none">
            {@html chapterContent}
          </div>
          
          <!-- Chapter navigation -->
          <div class="flex justify-between mt-16 pt-8 border-t border-gray-200">
            {#if adjacentChapters.previous}
              <a 
                href="{base}/guide-psychological/{adjacentChapters.previous.path}" 
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
                href="{base}/guide-psychological/{adjacentChapters.next.path}" 
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
              href="{base}/guide-psychological" 
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
