<script lang="ts">
  import '../app.css';
  import '$lib/i18n'; // Import i18n configuration
  import { waitLocale } from 'svelte-i18n';
  import { page } from '$app/stores';
  import { base } from '$app/paths';
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import Footer from '$lib/components/Footer.svelte';
  import Header from '$lib/components/Header.svelte';
  import Notification from '$lib/components/Notification.svelte';
  import languageStore from '$lib/stores/languageStore';

  const { language } = languageStore;
  $: currentLanguage = $language;

  let isLoaded = false;

  onMount(() => {
    // Wait for locale to be loaded before showing content
    waitLocale().then(() => {
      isLoaded = true;
    });
  });

  $: isResultsPage = $page.url.pathname.includes('/results');
  
  $: metaTitle = isResultsPage 
    ? 'My Spiral Dynamics Profile Results - Spiralize'
    : $page.url.pathname === '/' 
      ? 'Spiralize - Discover Your Spiral Dynamics Profile'
      : 'Spiralize';

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
    <!-- Skip Link -->
    <a 
      href="#main-content"
      class="skip-link"
      aria-label={currentLanguage === 'en' ? 'Skip to main content' : 'Hoppa till huvudinnehåll'}
    >
      {currentLanguage === 'en' ? 'Skip to main content' : 'Hoppa till huvudinnehåll'}
    </a>
    
    <Notification />
    <!-- Header no longer needs language prop -->
    <Header />
    
    <!-- Main content wrapper -->
    <main id="main-content" tabindex="-1">
      <slot />
    </main>

    <!-- Footer no longer needs language prop -->
    <Footer />
  </div>
{:else}
  <div class="min-h-screen flex items-center justify-center">
    <div class="text-gray-600" role="status">
      {currentLanguage === 'en' ? 'Loading...' : 'Laddar...'}
    </div>
  </div>
{/if}

<style>
  .skip-link {
    position: absolute;
    top: -9999px;
    left: 50%;
    transform: translateX(-50%);
    background: #7C3AED;
    color: white;
    padding: 1rem 2rem;
    z-index: 100;
    text-decoration: none;
    border-radius: 0 0 0.5rem 0.5rem;
    font-weight: 500;
    transition: top 0.2s ease;
  }

  .skip-link:focus {
    top: 0;
    outline: 2px solid white;
    outline-offset: 4px;
  }

  /* Remove the default focus outline from the main content when focused via skip link */
  main:focus {
    outline: none;
  }

  /* But keep a subtle indicator that we've moved focus */
  main:focus::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: #7C3AED;
    animation: fadeOut 2s forwards;
  }

  @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }
</style>
