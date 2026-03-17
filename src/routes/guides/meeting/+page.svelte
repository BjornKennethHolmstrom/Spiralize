<!-- src/routes/guides/meeting/+page.svelte -->
<script lang="ts">
  import { base } from '$app/paths';
  import { onMount, tick } from 'svelte';
  import { fade } from 'svelte/transition';
  import languageStore from '$lib/stores/languageStore';
  import { marked } from 'marked';
  import ShareButtons from '$lib/components/ShareButtons.svelte';

  const { language } = languageStore;
  $: currentLanguage = $language;

  // Translations
  const t = {
    en: {
      title: 'Meeting and Deciding at Tier 2',
      subtitle: 'A Protocol for Integrative Coordination',
      description: 'A practical guide to Yellow/Turquoise decision-making — and how to include everyone on the spiral.',
      protocolTab: 'Protocol',
      appendixTab: 'Appendix: Difficult Questions',
      downloadPdf: 'Download PDF',
      downloadProtocol: 'Protocol (PDF)',
      downloadAppendix: 'Appendix (PDF)',
      loading: 'Loading content...',
      error: 'Error loading content.',
      onThisPage: 'On this page',
      backToGuides: 'Back to Guides',
      alsoOn: 'A governance-oriented version of this protocol (without Spiral Dynamics terminology) is available on',
      ggfLinkText: 'Global Governance Frameworks'
    },
    sv: {
      title: 'Möten och beslut på Tier 2',
      subtitle: 'Ett protokoll för integrativ koordinering',
      description: 'En praktisk guide till Yellow/Turquoise-beslutsfattande — och hur man inkluderar alla på spiralen.',
      protocolTab: 'Protokoll',
      appendixTab: 'Bilaga: Svåra frågor',
      downloadPdf: 'Ladda ner PDF',
      downloadProtocol: 'Protokoll (PDF)',
      downloadAppendix: 'Bilaga (PDF)',
      loading: 'Laddar innehåll...',
      error: 'Fel vid laddning av innehåll.',
      onThisPage: 'På denna sida',
      backToGuides: 'Tillbaka till guider',
      alsoOn: 'En styrningsorienterad version av detta protokoll (utan Spiral Dynamics-terminologi) finns på',
      ggfLinkText: 'Global Governance Frameworks'
    }
  };

  $: i18n = t[currentLanguage] || t.en;

  // Content state
  let protocolHtml = '';
  let appendixHtml = '';
  let isLoading = true;
  let activeTab: 'protocol' | 'appendix' = 'protocol';
  let tocEntries: { id: string; text: string; level: number }[] = [];

  // Configure marked to add IDs to headings
  const renderer = new marked.Renderer();
  renderer.heading = function({ text, depth }) {
    const slug = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
    return `<h${depth} id="${slug}">${text}</h${depth}>`;
  };

  marked.setOptions({ renderer });

  async function loadMarkdown(filename: string): Promise<string> {
    const langSuffix = currentLanguage === 'sv' ? '.sv' : '';
    const paths = [
      `${base}/content/guides/meeting/${filename}${langSuffix}.md`,
      `/content/guides/meeting/${filename}${langSuffix}.md`
    ];

    // Fallback to English if Swedish not found
    const fallbackPaths = currentLanguage === 'sv' ? [
      `${base}/content/guides/meeting/${filename}.md`,
      `/content/guides/meeting/${filename}.md`
    ] : [];

    for (const path of [...paths, ...fallbackPaths]) {
      try {
        const response = await fetch(path);
        if (response.ok) {
          return await response.text();
        }
      } catch (e) {
        console.warn('Failed to load from', path);
      }
    }
    return '';
  }

  function extractToc(html: string): { id: string; text: string; level: number }[] {
    const entries: { id: string; text: string; level: number }[] = [];
    const regex = /<h([2-3])\s+id="([^"]*)"[^>]*>(.*?)<\/h[2-3]>/g;
    let match;
    while ((match = regex.exec(html)) !== null) {
      entries.push({
        level: parseInt(match[1]),
        id: match[2],
        text: match[3].replace(/<[^>]*>/g, '') // strip any inline HTML
      });
    }
    return entries;
  }

  async function loadContent() {
    isLoading = true;
    
    const [protocolMd, appendixMd] = await Promise.all([
      loadMarkdown('tier-2-meeting-protocol'),
      loadMarkdown('appendix-difficult-questions')
    ]);

    // Parse markdown — skip the H1 title since we render our own hero
    const stripFirstH1 = (md: string) => md.replace(/^#\s+.*\n+/, '');
    
    protocolHtml = marked(stripFirstH1(protocolMd));
    appendixHtml = marked(stripFirstH1(appendixMd));
    
    // Build TOC from whichever tab is active
    updateToc();
    isLoading = false;
  }

  function updateToc() {
    const html = activeTab === 'protocol' ? protocolHtml : appendixHtml;
    tocEntries = extractToc(html);
  }

  $: if (activeTab) {
    updateToc();
  }

  // Reload content when language changes
  $: if (currentLanguage) {
    loadContent();
  }

  function scrollToSection(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function switchTab(tab: 'protocol' | 'appendix') {
    activeTab = tab;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onMount(() => {
    loadContent();
  });
</script>

<svelte:head>
  <title>{i18n.title} | Spiralize</title>
  <meta name="description" content={i18n.description} />
</svelte:head>

<div class="max-w-7xl mx-auto px-4 py-12">
  {#if isLoading}
    <div class="flex justify-center items-center py-20">
      <p class="text-gray-500">{i18n.loading}</p>
    </div>
  {:else}
    <div in:fade>
      <!-- Back link -->
      <a href="{base}/guides" class="inline-flex items-center text-purple-600 hover:text-purple-800 mb-8 text-sm">
        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        {i18n.backToGuides}
      </a>

      <!-- Hero -->
      <header class="mb-10">
        <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          {i18n.title}
        </h1>
        <p class="text-lg md:text-xl text-gray-500 mb-4">
          {i18n.subtitle}
        </p>
        <p class="text-gray-600 mb-6 max-w-3xl">
          {i18n.description}
        </p>

        <!-- PDF Downloads -->
        <div class="flex flex-wrap gap-3 mb-6">
          <a
            href="{base}/content/guides/meeting/tier-2-meeting-protocol.{currentLanguage}.pdf"
            download
            class="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            {i18n.downloadProtocol}
          </a>
          <a
            href="{base}/content/guides/meeting/appendix-difficult-questions.{currentLanguage}.pdf"
            download
            class="inline-flex items-center px-4 py-2 bg-white text-purple-600 border border-purple-300 rounded-lg hover:bg-purple-50 transition-colors text-sm"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            {i18n.downloadAppendix}
          </a>
        </div>

        <!-- GGF cross-reference -->
        <p class="text-sm text-gray-500">
          {i18n.alsoOn}
          <a href="https://globalgovernanceframeworks.org/resources/protocols/adaptive-coordination" class="text-purple-600 hover:text-purple-800 underline">
            {i18n.ggfLinkText}
          </a>.
        </p>
      </header>

      <!-- Tab switcher -->
      <div class="border-b border-gray-200 mb-8">
        <nav class="flex space-x-8">
          <button
            class="py-3 px-1 border-b-2 text-sm font-medium transition-colors {activeTab === 'protocol' ? 'border-purple-600 text-purple-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}"
            on:click={() => switchTab('protocol')}
          >
            {i18n.protocolTab}
          </button>
          <button
            class="py-3 px-1 border-b-2 text-sm font-medium transition-colors {activeTab === 'appendix' ? 'border-purple-600 text-purple-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}"
            on:click={() => switchTab('appendix')}
          >
            {i18n.appendixTab}
          </button>
        </nav>
      </div>

      <!-- Two-column layout: sidebar TOC + content -->
      <div class="flex gap-10">
        <!-- Sidebar TOC (desktop only) -->
        <aside class="hidden lg:block w-64 flex-shrink-0">
          <div class="sticky top-24">
            <h3 class="text-xs uppercase text-gray-400 font-semibold tracking-wider mb-3">
              {i18n.onThisPage}
            </h3>
            <nav class="space-y-1 max-h-[calc(100vh-8rem)] overflow-y-auto">
              {#each tocEntries as entry}
                <button
                  on:click={() => scrollToSection(entry.id)}
                  class="block text-left w-full py-1 text-sm text-gray-500 hover:text-purple-600 transition-colors truncate {entry.level === 3 ? 'pl-4' : ''}"
                >
                  {entry.text}
                </button>
              {/each}
            </nav>
          </div>
        </aside>

        <!-- Main content -->
        <div class="flex-1 min-w-0">
          <article class="prose prose-gray max-w-none 
            prose-headings:scroll-mt-24
            prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-12 prose-h2:mb-4 prose-h2:text-gray-900
            prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-gray-700 prose-p:leading-relaxed
            prose-li:text-gray-700
            prose-strong:text-gray-900
            prose-blockquote:border-purple-400 prose-blockquote:text-gray-600 prose-blockquote:italic
            prose-table:text-sm
            prose-th:bg-gray-50 prose-th:text-left prose-th:font-semibold
            prose-td:border-gray-200
            prose-a:text-purple-600 prose-a:no-underline hover:prose-a:underline
            prose-hr:my-10
          ">
            {#if activeTab === 'protocol'}
              {@html protocolHtml}
            {:else}
              {@html appendixHtml}
            {/if}
          </article>

          <!-- Share -->
          <div class="mt-16 pt-8 border-t border-gray-200">
            <ShareButtons />
          </div>

          <!-- Back to guides -->
          <div class="text-center mt-10">
            <a 
              href="{base}/guides" 
              class="inline-flex items-center text-purple-600 hover:text-purple-800"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              {i18n.backToGuides}
            </a>
          </div>
        </div>
      </div>
    </div>
  {/if}
</div>
