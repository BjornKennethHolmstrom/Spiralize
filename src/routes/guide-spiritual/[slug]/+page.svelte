<!-- src/routes/guide-spiritual/[slug]/+page.svelte -->
<script lang="ts">
  import { base } from '$app/paths';
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import languageStore from '$lib/stores/languageStore';
  import { marked } from 'marked';
  import ShareButtons from '$lib/components/ShareButtons.svelte';
  import { 
    spiritualGuideStore, 
    setCurrentItem,
    getAdjacentItems,
    getSectionResources,
    getMainSections,
    getSubsections,
    getItemByPath,
    getTools,
    getAppendices,
    getItemsByStage,
    getUniversalTools
  } from '$lib/stores/spiritualGuideStore';
  import { afterNavigate } from '$app/navigation';

  afterNavigate(({ to, from }) => {
    if (to.params.slug !== from?.params.slug) {
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
  const mainSections = getMainSections();
  
  // Get slug from page params
  $: slug = $page.params.slug;
  
  // Access translations
  $: t = $spiritualGuideStore.translations[currentLanguage];
  
  // Set current item when slug changes
  $: {
    if (slug) {
      setCurrentItem(slug);
    }
  }
  
  // Current item and navigation tracking
  $: currentItem = $spiritualGuideStore.currentItem;
  $: adjacentItems = currentItem ? getAdjacentItems(currentItem.path) : { previous: null, next: null };
  $: resources = currentItem && (currentItem.type === 'section' || currentItem.type === 'subsection') 
    ? getSectionResources(currentItem.id) 
    : [];
  $: subsections = currentItem && currentItem.type === 'section' 
    ? getSubsections(currentItem.id) 
    : [];
  
  // Determine if the current item is stage-specific
  $: hasStage = currentItem?.hasStageSpecificContent || false;
  $: stageName = hasStage && currentItem?.stages ? currentItem.stages[0] : null;
  
  // Form item title based on type
  $: itemTitle = currentItem ? formItemTitle(currentItem) : '';
  
  // Is this a special resource type?
  $: isResourceItem = currentItem?.isTool || currentItem?.isAppendix;
  
  // For breadcrumb navigation
  $: parentItem = currentItem?.parentId ? getItemByPath(getItemByPath(currentItem.parentId)?.path || '') : null;
  
  onMount(() => {
    if (slug) {
      loadContent(slug);
    }
  });

  function formItemTitle(item) {
    if (!item) return '';
    
    if (item.type === 'section') {
      return `${t.sectionText} ${item.section}: ${item.title[currentLanguage]}`;
    } else if (item.type === 'subsection') {
      return `${item.title[currentLanguage]}`;
    } else if (item.isTool) {
      return `${t.toolText}: ${item.title[currentLanguage]}`;
    } else if (item.isAppendix) {
      return `${t.appendixText}: ${item.title[currentLanguage]}`;
    }
    
    return item.title[currentLanguage];
  }

  async function loadContent(itemPath) {
    isLoading = true;
    
    try {
      // Find the item by path
      const item = getItemByPath(itemPath);
      if (!item) {
        console.error('Item not found in store for path:', itemPath);
        isAvailable = false;
        return;
      }

      // Get the filePath from the item
      const filePath = item.filePath;
      
      console.log('Loading content for item:', item.id, 'path:', itemPath, 'filePath:', filePath);
      
      // Try multiple possible file locations
      const pathsToTry = [
        `${base}/content/guides/spiritual/${filePath}.md`,
        `/content/guides/spiritual/${filePath}.md`
      ];

      console.log('Trying paths:', pathsToTry);
      
      let contentLoaded = false;
      
      for (const path of pathsToTry) {
        try {
          console.log('Attempting to fetch from:', path);
          
          const response = await fetch(path);
          
          if (response.ok) {
            console.log('Successfully loaded from:', path);
            content = marked(await response.text());
            contentLoaded = true;
            break;
          } else {
            console.warn(`Failed to load from ${path} - Status: ${response.status}`);
          }
        } catch (error) {
          console.warn('Failed to load from', path, error);
        }
      }

      isAvailable = contentLoaded;
      if (!contentLoaded) {
        console.error('Content could not be loaded from any path');
        content = `<div class="bg-gray-50 p-8 rounded-lg text-center">
          <p class="text-lg text-gray-600 mb-4">${t.comingSoon}</p>
        </div>`;
      }
    } catch (error) {
      console.error('Error loading content:', error);
      isAvailable = false;
      content = t.error;
    } finally {
      isLoading = false;
    }
  }
  
  // Get color class based on stage
  function getStageColorClass(stage) {
    const stageColors = {
      'beige': 'bg-amber-100 text-amber-800',
      'purple': 'bg-purple-100 text-purple-800',
      'red': 'bg-red-100 text-red-800',
      'blue': 'bg-blue-100 text-blue-800',
      'orange': 'bg-orange-100 text-orange-800',
      'green': 'bg-green-100 text-green-800',
      'yellow': 'bg-yellow-100 text-yellow-800',
      'turquoise': 'bg-teal-100 text-teal-800',
      'coral': 'bg-pink-100 text-pink-800',
      'ultraviolet': 'bg-violet-100 text-violet-800',
      'clear': 'bg-gray-100 text-gray-800'
    };
    
    return stageColors[stage] || 'bg-gray-100 text-gray-800';
  }
</script>

<svelte:head>
  <title>{itemTitle ? `${itemTitle} | Spiralize` : 'Spiritual & Mystical Guide | Spiralize'}</title>
</svelte:head>

<div class="max-w-7xl mx-auto px-4 py-12">
  {#if isLoading}
    <div class="flex justify-center items-center py-20">
      <p class="text-gray-500">{t.loading}</p>
    </div>
  {:else}
    <div in:fade>
      <!-- Breadcrumb navigation -->
      <nav class="flex mb-6 text-sm" aria-label="Breadcrumb">
        <ol class="inline-flex items-center space-x-1 md:space-x-3">
          <li class="inline-flex items-center">
            <a href="{base}/guide-spiritual" class="text-gray-500 hover:text-teal-600">
              {t.tableOfContents}
            </a>
          </li>
          
          {#if parentItem && parentItem.type === 'section'}
            <li>
              <div class="flex items-center">
                <svg class="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                </svg>
                <a href="{base}/guide-spiritual/{parentItem.path}" class="ml-1 text-gray-500 hover:text-teal-600">
                  {parentItem.title[currentLanguage]}
                </a>
              </div>
            </li>
          {/if}
          
          <li aria-current="page">
            <div class="flex items-center">
              <svg class="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
              </svg>
              <span class="ml-1 font-medium text-gray-600">
                {currentItem?.title[currentLanguage] || 'Content'}
              </span>
            </div>
          </li>
        </ol>
      </nav>

      <!-- Content header -->
      <div class="mb-10">
        {#if currentItem?.type === 'section'}
          <div class="text-sm text-teal-600 mb-2">
            {t.sectionText} {currentItem.section}
          </div>
        {:else if currentItem?.type === 'subsection' && parentItem}
          <div class="text-sm text-teal-600 mb-2">
            <a href="{base}/guide-spiritual/{parentItem.path}" class="hover:underline">
              {t.sectionText} {parentItem.section}
            </a>
          </div>
        {:else if isResourceItem && parentItem}
          <!-- If it's a resource linked to a section -->
          <div class="text-sm text-teal-600 mb-2">
            <a href="{base}/guide-spiritual/{parentItem.path}" class="hover:underline">
              {t.sectionText} {parentItem.section}
            </a> / {currentItem?.isTool ? t.toolText : currentItem?.isAppendix ? t.appendixText : ''}
          </div>
        {/if}
        
        <!-- Stage-specific badge if applicable -->
        {#if hasStage && stageName}
          <div class="mb-3">
            <span class={`inline-flex items-center text-sm px-3 py-1 rounded-full ${getStageColorClass(stageName)}`}>
              {stageName.charAt(0).toUpperCase() + stageName.slice(1)} {currentLanguage === 'en' ? 'Stage' : 'Stadium'}
            </span>
          </div>
        {/if}
        
        <h1 class="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
          {currentItem?.title[currentLanguage] || t.error}
        </h1>
        {#if currentItem?.description}
          <p class="text-lg text-gray-600 max-w-4xl">
            {currentItem.description[currentLanguage]}
          </p>
        {/if}
      </div>
      
      <!-- Page layout with sidebar for larger screens -->
      <div class="lg:flex gap-8">
        <aside class="hidden lg:block w-64 flex-shrink-0">
          <div class="sticky top-8 max-h-[calc(100vh-4rem)] overflow-y-auto">
            <a 
              href="{base}/guide-spiritual" 
              class="font-semibold text-lg mb-4 inline-flex items-center hover:text-teal-600 transition-colors"
            >
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
              {t.tableOfContents}
            </a>
            
            <!-- Main Sections Navigation -->
            <nav>
              <ul class="space-y-1 border-l border-gray-200 pl-4">
                {#each mainSections as section}
                  <li>
                    <a 
                      href="{base}/guide-spiritual/{section.path}"
                      class="block py-1 hover:text-teal-600 transition-colors {currentItem?.id === section.id || (currentItem?.parentId === section.id) ? 'font-semibold text-teal-600 border-l-2 border-teal-600 -ml-[17px] pl-[15px]' : 'text-gray-600'}"
                    >
                      {section.section}. {section.title[currentLanguage]}
                    </a>
                    
                    <!-- If current section is active and has subsections, show them -->
                    {#if currentItem && ((currentItem.id === section.id) || (currentItem.parentId === section.id)) && getSubsections(section.id).length > 0}
                      <ul class="mt-1 ml-4 space-y-1 border-l border-gray-200 pl-3">
                        {#each getSubsections(section.id) as subsection}
                          <li>
                            <a 
                              href="{base}/guide-spiritual/{subsection.path}"
                              class="block py-1 text-sm hover:text-teal-600 transition-colors {currentItem?.id === subsection.id ? 'font-semibold text-teal-600 border-l-2 border-teal-600 -ml-[17px] pl-[15px]' : 'text-gray-600'}"
                            >
                              {subsection.title[currentLanguage]}
                            </a>
                          </li>
                        {/each}
                      </ul>
                    {/if}
                  </li>
                {/each}
              </ul>
            </nav>
            
            <!-- Current Section Resources -->
            {#if currentItem && resources.length > 0}
              <div class="mt-8">
                <h3 class="text-sm uppercase text-gray-500 font-medium mb-2">
                  {t.resources}
                </h3>
                <ul class="space-y-1 border-l border-gray-200 pl-4">
                  {#each resources as resource}
                    <li>
                      <a 
                        href="{base}/guide-spiritual/{resource.path}"
                        class="block py-1 text-sm hover:text-teal-600 transition-colors {currentItem?.id === resource.id ? 'font-semibold text-teal-600 border-l-2 border-teal-600 -ml-[17px] pl-[15px]' : 'text-gray-600'}"
                      >
                        <span>
                          {#if resource.isTool}
                            <span class="bg-blue-100 text-blue-700 text-xs rounded-full px-2 py-0.5 mr-1">
                              {t.toolText}
                            </span>
                          {:else if resource.isAppendix}
                            <span class="bg-purple-100 text-purple-700 text-xs rounded-full px-2 py-0.5 mr-1">
                              {t.appendixText}
                            </span>
                          {/if}
                        </span>
                        {resource.title[currentLanguage]}
                      </a>
                    </li>
                  {/each}
                </ul>
              </div>
            {/if}
            
            <!-- Stage-specific content section if applicable -->
            {#if hasStage && stageName}
              <div class="mt-8">
                <h3 class="text-sm uppercase text-gray-500 font-medium mb-2">
                  {stageName.charAt(0).toUpperCase() + stageName.slice(1)} {currentLanguage === 'en' ? 'Resources' : 'Resurser'}
                </h3>
                
                <ul class="space-y-1 border-l border-gray-200 pl-4">
                  {#each getItemsByStage(stageName) as item}
                    <li>
                      <a 
                        href="{base}/guide-spiritual/{item.path}"
                        class="block py-1 text-sm hover:text-teal-600 transition-colors {currentItem?.id === item.id ? 'font-semibold text-teal-600 border-l-2 border-teal-600 -ml-[17px] pl-[15px]' : 'text-gray-600'}"
                      >
                        {item.title[currentLanguage]}
                      </a>
                    </li>
                  {/each}
                </ul>
              </div>
            {/if}
          </div>
        </aside>
        
        <!-- Main content area -->
        <div class="flex-1">
          <div class="prose max-w-none">
            {@html content}
          </div>
          
          <!-- Subsections (if this is a section page) -->
          {#if currentItem?.type === 'section' && subsections.length > 0}
            <div class="mt-12 border-t border-gray-200 pt-8">
              <h2 class="text-xl font-semibold mb-6">{currentLanguage === 'en' ? 'In This Section:' : 'I Detta Avsnitt:'}</h2>
              <div class="grid gap-4 md:grid-cols-2">
                {#each subsections as subsection}
                  <a 
                    href="{base}/guide-spiritual/{subsection.path}"
                    class="p-4 bg-white rounded-lg border border-gray-200 hover:border-teal-400 hover:shadow-md transition-all flex flex-col"
                  >
                    <!-- Stage badge if applicable -->
                    {#if subsection.hasStageSpecificContent && subsection.stages && subsection.stages.length > 0}
                      <span class={`self-start mb-2 text-xs px-2 py-0.5 rounded-full ${getStageColorClass(subsection.stages[0])}`}>
                        {subsection.stages[0].charAt(0).toUpperCase() + subsection.stages[0].slice(1)}
                      </span>
                    {/if}
                    
                    <h3 class="font-medium text-lg mb-1">{subsection.title[currentLanguage]}</h3>
                    {#if subsection.description}
                      <p class="text-gray-600 text-sm">{subsection.description[currentLanguage]}</p>
                    {/if}
                  </a>
                {/each}
              </div>
            </div>
          {/if}
          
          <!-- Resources section (if this is a section or subsection page) -->
          {#if (currentItem?.type === 'section' || currentItem?.type === 'subsection') && resources.length > 0}
            <div class="mt-12 p-6 bg-teal-50 rounded-lg">
              <h2 class="text-xl font-semibold mb-4 text-teal-700">{t.resources}</h2>
              <div class="grid gap-4 md:grid-cols-2">
                {#each resources as resource}
                  <a 
                    href="{base}/guide-spiritual/{resource.path}"
                    class="p-4 bg-white rounded-lg border border-teal-200 hover:border-teal-400 hover:shadow-md transition-all flex flex-col"
                  >
                    <h3 class="font-medium mb-1">
                      {#if resource.isTool}
                        <span class="text-sm bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full mr-2">
                          {t.toolText}
                        </span>
                      {:else if resource.isAppendix}
                        <span class="text-sm bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full mr-2">
                          {t.appendixText}
                        </span>
                      {/if}
                      {resource.title[currentLanguage]}
                    </h3>
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
            {#if adjacentItems.previous}
              <a 
                href="{base}/guide-spiritual/{adjacentItems.previous.path}" 
                class="flex items-center text-teal-600 hover:text-teal-800"
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
            
            {#if adjacentItems.next}
              <a 
                href="{base}/guide-spiritual/{adjacentItems.next.path}" 
                class="flex items-center text-teal-600 hover:text-teal-800"
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
          
          <!-- Share buttons -->
          <div class="mt-10">
            <ShareButtons />
          </div>
          
          <!-- Back to main guide page -->
          <div class="text-center mt-10">
            <a 
              href="{base}/guide-spiritual" 
              class="inline-flex items-center text-teal-600 hover:text-teal-800"
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
