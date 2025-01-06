<script lang="ts">
  import '../app.css';
  import { page } from '$app/stores';
  
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
  <meta property="og:image" content="{$page.url.origin}/social-preview.png" />

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content={$page.url.href} />
  <meta property="twitter:title" content={metaTitle} />
  <meta property="twitter:description" content={metaDescription} />
  <meta property="twitter:image" content="{$page.url.origin}/social-preview.png" />
</svelte:head>

<div class="min-h-screen">
  <slot />
</div>
