<script lang="ts">
  import '../app.css';
  import '$lib/i18n'; // Import i18n configuration
  import { waitLocale } from 'svelte-i18n';
  import { page } from '$app/stores';
  import { base } from '$app/paths';
  import Footer from '$lib/components/Footer.svelte';
  import Header from '$lib/components/Header.svelte';
  import languageStore from '$lib/stores/languageStore';

  const { language } = languageStore;

  let isLoaded = false;

  // Wait for locale to be loaded before showing content
  waitLocale().then(() => {
    isLoaded = true;
  });

  $: isResultsPage = $page.url.pathname.includes('/results');
  
  $: metaTitle = isResultsPage 
    ? 'My Spiral Dynamics Profile Results - Spiralize'
    : 'Discover Your Spiral Dynamics Profile - Spiralize';
    
  $: metaDescription = isResultsPage
    ? 'View my Spiral Dynamics profile results and take the assessment yourself to discover your own center of gravity.'
    : 'Take the assessment to understand your values and worldview through the lens of Spiral Dynamics.';
</script>

<svelte:head>
  <title>{metaTitle}</title>
  <meta name="description" content={metaDescription} />
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content={$page.url.href} />
  <meta property="og:title" content={metaTitle} />
  <meta property="og:description" content={metaDescription} />
  <meta property="og:image" content="{base}/default-share.svg" />

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content={$page.url.href} />
  <meta property="twitter:title" content={metaTitle} />
  <meta property="twitter:description" content={metaDescription} />
  <meta property="twitter:image" content="{base}/default-share.svg" />
</svelte:head>

{#if isLoaded}
  <div class="min-h-screen">
    <Header {language} />
    <slot />
    <Footer language="en" />
  </div>
{:else}
  <div class="min-h-screen flex items-center justify-center">
    <div class="text-gray-600">Loading...</div>
  </div>
{/if}
