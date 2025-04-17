<!-- src/lib/components/ShareButtons.svelte -->
<script lang="ts">
  import { Twitter, Facebook, Linkedin, Link2 } from 'lucide-svelte';
  import languageStore from '$lib/stores/languageStore';
  import { page } from '$app/stores';

  const { language } = languageStore;
  
  // Props with defaults
  export let title = 'Spiralize';
 /* export let description = $language === 'en' 
    ? 'Discover your Spiral Dynamics profile and understand your values and worldview.'
    : 'Upptäck din Spiral Dynamics-profil och förstå dina värderingar och världsbild.';*/
  
  // Get the current URL
  $: url = $page ? `https://www.spiralize.org${$page.url.pathname}` : '';
  
  // Social share URLs
  $: twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
  $: facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
  $: linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
  
  // Copy URL functionality
  let copied = false;
  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(url);
      copied = true;
      setTimeout(() => copied = false, 2000);
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  const labels = {
    share: {
      en: 'Share',
      sv: 'Dela'
    },
    copied: {
      en: 'Copied!',
      sv: 'Kopierad!'
    },
    copyLink: {
      en: 'Copy link',
      sv: 'Kopiera länk'
    }
  };
</script>

<div class="flex flex-col items-center space-y-4">
  <p class="text-sm font-medium text-gray-400">
    {labels.share[$language]}
  </p>
  
  <div class="flex space-x-4">
    <!-- Twitter -->
    <a
      href={twitterUrl}
      target="_blank"
      rel="noopener noreferrer"
      class="p-2 rounded-full bg-background/30 hover:bg-background/50 transition-colors"
      title="Share on Twitter"
    >
      <Twitter class="w-5 h-5" />
    </a>
    
    <!-- Facebook -->
    <a
      href={facebookUrl}
      target="_blank"
      rel="noopener noreferrer"
      class="p-2 rounded-full bg-background/30 hover:bg-background/50 transition-colors"
      title="Share on Facebook"
    >
      <Facebook class="w-5 h-5" />
    </a>
    
    <!-- LinkedIn -->
    <a
      href={linkedinUrl}
      target="_blank"
      rel="noopener noreferrer"
      class="p-2 rounded-full bg-background/30 hover:bg-background/50 transition-colors"
      title="Share on LinkedIn"
    >
      <Linkedin class="w-5 h-5" />
    </a>
    
    <!-- Copy Link -->
    <button
      on:click={copyUrl}
      class="p-2 rounded-full bg-background/30 hover:bg-background/50 transition-colors relative group"
      title={labels.copyLink[$language]}
    >
      <Link2 class="w-5 h-5" />
      
      {#if copied}
        <span class="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-secondary text-background text-sm py-1 px-2 rounded">
          {labels.copied[$language]}
        </span>
      {/if}
    </button>
  </div>
</div>
