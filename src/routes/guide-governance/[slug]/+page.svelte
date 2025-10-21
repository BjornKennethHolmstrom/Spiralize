<!-- src/routes/guide-governance/[slug]/+page.svelte -->
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
    governanceGuideStore, 
    setCurrentItem,
    getAdjacentItems,
    getSectionResources,
    getMainSections,
    getSubsections,
    getItemByPath,
    getTools,
    getSectionDiagrams
  } from '$lib/stores/governanceGuideStore';
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
  $: t = $governanceGuideStore.translations;
  
  // Set current item when slug changes
  $: {
    if (slug) {
      setCurrentItem(slug);
    }
  }
  
  // Current item and navigation tracking
  $: currentItem = $governanceGuideStore.currentItem;
  $: adjacentItems = currentItem ? getAdjacentItems(currentItem.path) : { previous: null, next: null };
  $: resources = currentItem && (currentItem.type === 'section' || currentItem.type === 'subsection') 
    ? getSectionResources(currentItem.id) 
    : [];
  $: subsections = currentItem && currentItem.type === 'section' 
    ? getSubsections(currentItem.id) 
    : [];
  
  // Function to clean paths
  function cleanPath(path) {
    if (!path) return '';
    return path.replace('guides/governance/', '');
  }
  
  // Form item title based on type
  $: itemTitle = currentItem ? formItemTitle(currentItem) : '';
  
  // Is this a special resource type (tool, diagram, etc)?
  $: isResourceItem = currentItem?.isTool || currentItem?.isExercise || 
                      currentItem?.isTemplate || currentItem?.isWorksheet || 
                      currentItem?.isQuickReference;
  
  // For breadcrumb navigation
  $: parentItem = currentItem?.parentId ? getItemByPath(currentItem.parentId) : null;
  
  onMount(() => {
    if (slug) {
      loadContent(slug);
    }
  });

  function formItemTitle(item) {
    if (!item) return '';
    
    if (item.type === 'section') {
      return `${t.ui.section[currentLanguage]} ${item.section}: ${item.title[currentLanguage]}`;
    } else if (item.type === 'subsection') {
      return `${t.ui.chapter[currentLanguage]}: ${item.title[currentLanguage]}`;
    } else if (item.isTool) {
      return `${t.ui.visualGuides[currentLanguage]}: ${item.title[currentLanguage]}`;
    }
    
    return item.title[currentLanguage];
  }

  async function loadContent(itemPath) {
    isLoading = true;
    
    try {
      // Find the item by path - might need to try both with and without the prefix
      let item = getItemByPath(itemPath);
      if (!item) {
        // Try with the prefix if it's not already there
        item = getItemByPath(`guides/governance/${itemPath}`);
      }
      
      if (!item) {
        console.error('Item not found in store for path:', itemPath);
        isAvailable = false;
        content = `<div class="bg-yellow-50 p-8 rounded-lg">
          <h3 class="text-lg font-medium text-yellow-800 mb-2">Content Not Found</h3>
          <p>The requested content could not be found. Please navigate to a different section.</p>
        </div>`;
        isLoading = false;
        return;
      }

      // Get the filePath from the item
      const filePath = item.filePath;
      
      console.log('Loading content for item:', item.id, 'path:', itemPath, 'filePath:', filePath);
      
      // For visual/diagram content, handle SVG file
      if (item.isTool && filePath && filePath.endsWith('.svg')) {
        try {
          const svgPaths = [
            `${base}${filePath}`,
            `${base}/static${filePath}`,
            `${base}/static/content/guides/governance/${cleanPath(item.path)}.svg`,
            `/static/content/guides/governance/${cleanPath(item.path)}.svg`,
            `/content/guides/governance/${cleanPath(item.path)}.svg`,
          ];
          
          for (const svgPath of svgPaths) {
            try {
              console.log('Attempting to load SVG from:', svgPath);
              const svgResponse = await fetch(svgPath, { method: 'GET' });
              if (svgResponse.ok) {
                const svgContent = await svgResponse.text();
                if (svgContent.includes('<svg')) {
                  console.log('Successfully loaded SVG from:', svgPath);
                  content = `<div class="svg-container">${svgContent}</div>`;
                  isAvailable = true;
                  isLoading = false;
                  return;
                } else {
                  console.warn('Response from', svgPath, 'does not contain SVG content');
                }
              }
            } catch (err) {
              console.warn('Error fetching from', svgPath, err);
            }
          }
          
          // If we get here, none of the paths worked
          console.error('Could not load SVG from any path');
          content = `<div class="bg-yellow-50 p-8 rounded-lg">
            <h3 class="text-lg font-medium text-yellow-800 mb-2">SVG Not Found</h3>
            <p>The diagram could not be loaded. Please try again later.</p>
          </div>`;
        } catch (error) {
          console.error('Error loading SVG content:', error);
          content = `<div class="bg-red-50 p-8 rounded-lg">
            <h3 class="text-lg font-medium text-red-800 mb-2">Error Loading Diagram</h3>
            <p>There was an error loading the diagram. Please try again later.</p>
          </div>`;
        }
        isLoading = false;
        return;
      }
      
      // For regular markdown content
      let pathsToTry = [];
      
      if (filePath) {
        const cleanedFilePath = filePath.replace('/content/guides/governance/', '');
        pathsToTry = [
          // Direct file path
          filePath,
          
          // With base path
          `${base}${filePath}`,
          
          // Cleaned path with base
          `${base}/content/guides/governance/${cleanedFilePath}`,
          
          // Direct path without base
          `/content/guides/governance/${cleanedFilePath}`,
          
          // Item path with different prefixes
          `${base}/content/guides/governance/${cleanPath(itemPath)}.md`,
          `/content/guides/governance/${cleanPath(itemPath)}.md`,
          `/static/content/guides/governance/${cleanPath(itemPath)}.md`,
          
          // Try with explicit filenames from content directory
          `${base}/content/guides/governance/introduction.md`,
          `${base}/content/guides/governance/chapter-1-value-systems.md`,
          `${base}/content/guides/governance/chapter-2-developmental-assessment.md`,
          `${base}/content/guides/governance/chapter-3-climate-governance.md`,
          `${base}/content/guides/governance/chapter-4-security-peace.md`,
          `${base}/content/guides/governance/chapter-5-economic-systems.md`,
          `${base}/content/guides/governance/chapter-6-digital-governance.md`,
          `${base}/content/guides/governance/chapter-7-cultural-exchange.md`,
          `${base}/content/guides/governance/chapter-8-crisis-resilience.md`,
          `${base}/content/guides/governance/chapter-9-developmental-transitions.md`,
          `${base}/content/guides/governance/chapter-10-emergent-models.md`,
          `${base}/content/guides/governance/chapter-11-practices.md`,
          `${base}/content/guides/governance/conclusion.md`,
          `${base}/content/guides/governance/resources.md`
        ];
      } else {
        // If no filePath, try these defaults
        pathsToTry = [
          `${base}/content/guides/governance/${cleanPath(itemPath)}.md`,
          `/content/guides/governance/${cleanPath(itemPath)}.md`,
          `/static/content/guides/governance/${cleanPath(itemPath)}.md`
        ];
      }

      // Filter to only include unique paths
      pathsToTry = [...new Set(pathsToTry)];
      
      console.log('Trying paths:', pathsToTry);
      
      let contentLoaded = false;
      
      for (const path of pathsToTry) {
        try {
          console.log('Attempting to fetch from:', path);
          
          const response = await fetch(path);
          
          if (response.ok) {
            const text = await response.text();
            
            // Verify this is actually markdown content, not HTML
            if (!text.includes('<!DOCTYPE html>') && !text.includes('<html>')) {
              console.log('Successfully loaded from:', path);
              content = marked(text);
              contentLoaded = true;
              break;
            } else {
              console.warn(`Response from ${path} appears to be HTML, not markdown`);
            }
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
        content = `<div class="bg-yellow-50 p-8 rounded-lg text-center">
          <p class="text-lg text-gray-600 mb-4">${t.ui.comingSoon && t.ui.comingSoon[currentLanguage] || 'Coming soon'}</p>
          <p class="text-sm text-gray-500">This section is currently being developed.</p>
        </div>`;
      }
    } catch (error) {
      console.error('Error loading content:', error);
      isAvailable = false;
      content = `<div class="bg-red-50 p-8 rounded-lg">
        <h3 class="text-lg font-medium text-red-800 mb-2">Error Loading Content</h3>
        <p>There was an error loading the content. Details: ${error.message}</p>
      </div>`;
    } finally {
      isLoading = false;
    }
  }

  function navigateToItem(path) {
    goto(`${base}/guide-governance/${cleanPath(path)}`, {
      replaceState: false
    });
  }
</script>

<svelte:head>
  <title>{itemTitle ? `${itemTitle} | Spiralize` : 'Spiral Governance Guide | Spiralize'}</title>
</svelte:head>

<div class="max-w-7xl mx-auto px-4 py-12">
  {#if isLoading}
    <div class="flex justify-center items-center py-20">
      <p class="text-gray-500">{t.ui.loading ? t.ui.loading[currentLanguage] : 'Loading...'}</p>
    </div>
  {:else}
    <div in:fade>
      <!-- Breadcrumb navigation -->
      <nav class="flex mb-6 text-sm" aria-label="Breadcrumb">
        <ol class="inline-flex items-center space-x-1 md:space-x-3">
          <li class="inline-flex items-center">
            <a href="{base}/guide-governance" class="text-gray-500 hover:text-teal-600">
              {t.ui.tableOfContents[currentLanguage]}
            </a>
          </li>
          
          {#if parentItem && parentItem.type === 'section'}
            <li>
              <div class="flex items-center">
                <svg class="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                </svg>
                <a href="{base}/guide-governance/{cleanPath(parentItem.path)}" class="ml-1 text-gray-500 hover:text-teal-600">
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
            {t.ui.section[currentLanguage]} {currentItem.section}
          </div>
        {:else if currentItem?.type === 'subsection' && parentItem}
          <div class="text-sm text-teal-600 mb-2">
            <a href="{base}/guide-governance/{cleanPath(parentItem.path)}" class="hover:underline">
              {t.ui.section[currentLanguage]} {parentItem.section}
            </a>
          </div>
        {:else if isResourceItem && parentItem}
          <!-- If it's a resource linked to a section -->
          <div class="text-sm text-teal-600 mb-2">
            <a href="{base}/guide-governance/{cleanPath(parentItem.path)}" class="hover:underline">
              {t.ui.section[currentLanguage]} {parentItem.section}
            </a> / {currentItem?.isTool ? t.ui.visualGuides[currentLanguage] : t.ui.diagrams[currentLanguage]}
          </div>
        {/if}
        <h1 class="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
          {currentItem?.title[currentLanguage] || (t.ui.error ? t.ui.error[currentLanguage] : 'Content Not Found')}
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
              href="{base}/guide-governance" 
              class="font-semibold text-lg mb-4 inline-flex items-center hover:text-teal-600 transition-colors"
            >
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
              {t.ui.tableOfContents[currentLanguage]}
            </a>
            
            <!-- Main Sections Navigation -->
            <nav>
              <ul class="space-y-1 border-l border-gray-200 pl-4">
                {#each mainSections as section}
                  <li>
                    <a 
                      href="{base}/guide-governance/{cleanPath(section.path)}"
                      class="block py-1 hover:text-teal-600 transition-colors {currentItem?.id === section.id || (currentItem?.parentId === section.id) ? 'font-semibold text-teal-600 border-l-2 border-teal-600 -ml-[17px] pl-[15px]' : 'text-gray-600'}"
                    >
                      {section.section}. {section.title[currentLanguage]}
                    </a>
                    
                    <!-- If current section is active (or viewing a tool from this section) and has subsections, show them -->
                    {#if currentItem && ((currentItem.id === section.id) || (currentItem.parentId === section.id) || getSubsections(section.id).some(sub => getTools(sub.id).some(tool => tool.id === currentItem.id))) && getSubsections(section.id).length > 0}
                      <ul class="mt-1 ml-4 space-y-1 border-l border-gray-200 pl-3">
                        {#each getSubsections(section.id) as subsection}
                          <li>
                            <a 
                              href="{base}/guide-governance/{cleanPath(subsection.path)}"
                              class="block py-1 text-sm hover:text-teal-600 transition-colors {currentItem?.id === subsection.id ? 'font-semibold text-teal-600 border-l-2 border-teal-600 -ml-[17px] pl-[15px]' : 'text-gray-600'}"
                            >
                              {subsection.title[currentLanguage]}
                            </a>
                            
                            <!-- Show tools under each subsection -->
                            {#if getTools(subsection.id).length > 0}
                              <ul class="mt-1 ml-4 space-y-1">
                                {#each getTools(subsection.id) as tool}
                                  <li>
                                    <a 
                                      href="{base}/guide-governance/{cleanPath(tool.path)}"
                                      class="block py-1 text-xs hover:text-teal-600 transition-colors {currentItem?.id === tool.id ? 'font-semibold text-teal-600' : 'text-gray-500'}"
                                    >
                                      <span class="inline-block bg-blue-100 text-blue-700 text-xs rounded-full px-2 py-0.5 mr-1">
                                        📊
                                      </span>
                                      {tool.title[currentLanguage]}
                                    </a>
                                  </li>
                                {/each}
                              </ul>
                            {/if}
                          </li>
                        {/each}
                      </ul>
                    {/if}
                    
                    <!-- Also show tools directly under sections (for sections without subsections) when active or viewing a tool from this section -->
                    {#if currentItem && ((currentItem.id === section.id) || (currentItem.parentId === section.id) || getTools(section.id).some(tool => tool.id === currentItem.id)) && getTools(section.id).length > 0}
                      <div class="mt-2 ml-4">
                        <ul class="space-y-1 border-l border-gray-200 pl-3">
                          {#each getTools(section.id) as tool}
                            <li>
                              <a 
                                href="{base}/guide-governance/{cleanPath(tool.path)}"
                                class="block py-1 text-sm hover:text-teal-600 transition-colors {currentItem?.id === tool.id ? 'font-semibold text-teal-600 border-l-2 border-teal-600 -ml-[17px] pl-[15px]' : 'text-gray-600'}"
                              >
                                <span class="inline-block bg-blue-100 text-blue-700 text-xs rounded-full px-2 py-0.5 mr-1">
                                  📊
                                </span>
                                <span class="text-xs">{tool.title[currentLanguage]}</span>
                              </a>
                            </li>
                          {/each}
                        </ul>
                      </div>
                    {/if}
                  </li>
                {/each}
              </ul>
            </nav>
          </div>
        </aside>
        
        <!-- Main content area -->
        <div class="flex-1">
          <!-- Special handling for SVG files -->
          {#if currentItem?.isTool && currentItem?.filePath?.endsWith('.svg')}
            <div class="prose max-w-none svg-container" style="max-width: 100%; overflow-x: auto;">
              {@html content}
            </div>
            <!-- Additional description for diagrams -->
            {#if currentItem?.description}
              <div class="mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 class="text-lg font-medium mb-2">{t.ui.description[currentLanguage]}</h3>
                <p>{currentItem.description[currentLanguage]}</p>
              </div>
            {/if}
          {:else}
            <!-- Regular markdown content -->
            <div class="prose max-w-none">
              {@html content}
            </div>
          {/if}
          
          <!-- Subsections (if this is a section page) -->
          {#if currentItem?.type === 'section' && subsections.length > 0}
            <div class="mt-12 border-t border-gray-200 pt-8">
              <h2 class="text-xl font-semibold mb-6">{currentLanguage === 'en' ? 'In This Section:' : 'I Detta Avsnitt:'}</h2>
              <div class="grid gap-4 md:grid-cols-2">
                {#each subsections as subsection}
                  <a 
                    href="{base}/guide-governance/{cleanPath(subsection.path)}"
                    class="p-4 bg-white rounded-lg border border-gray-200 hover:border-teal-400 hover:shadow-md transition-all flex flex-col"
                  >
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
              <h2 class="text-xl font-semibold mb-4 text-teal-700">{t.ui.visualGuides[currentLanguage]}</h2>
              <div class="grid gap-4 md:grid-cols-2">
                {#each resources as resource}
                  <a 
                    href="{base}/guide-governance/{cleanPath(resource.path)}"
                    class="p-4 bg-white rounded-lg border border-teal-200 hover:border-teal-400 hover:shadow-md transition-all flex flex-col"
                  >
                    <h3 class="font-medium mb-1">
                      {#if resource.isTool}
                        <span class="text-sm bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full mr-2">
                          {t.ui.diagrams[currentLanguage]}
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
                href="{base}/guide-governance/{cleanPath(adjacentItems.previous.path)}" 
                class="flex items-center text-teal-600 hover:text-teal-800"
              >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
                <span>
                  <span class="block text-xs text-gray-500">{t.ui.previous[currentLanguage]}</span>
                  <span>{adjacentItems.previous.title[currentLanguage]}</span>
                </span>
              </a>
            {:else}
              <div></div>
            {/if}
            
            {#if adjacentItems.next}
              <a 
                href="{base}/guide-governance/{cleanPath(adjacentItems.next.path)}" 
                class="flex items-center text-teal-600 hover:text-teal-800"
              >
                <span class="text-right">
                  <span class="block text-xs text-gray-500">{t.ui.next[currentLanguage]}</span>
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
              href="{base}/guide-governance" 
              class="inline-flex items-center text-teal-600 hover:text-teal-800"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              {t.ui.tableOfContents[currentLanguage]}
            </a>
          </div>
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  /* Ensure SVGs display properly */
  :global(.svg-container svg) {
    max-width: 100%;
    height: auto;
  }
</style>
