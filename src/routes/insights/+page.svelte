<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { base } from '$app/paths';
  import languageStore from '$lib/stores/languageStore';

  const { language } = languageStore;
  $: currentLanguage = $language;

  // We'll redirect to the personal insights page by default
  onMount(() => {
    goto(`${base}/insights/personal`);
  });

  // This is a simple loading screen that will display briefly
  // before redirection happens
  const translations = {
    en: {
      loading: "Loading insights...",
    },
    sv: {
      loading: "Laddar insikter...",
    }
  };

  $: t = translations[currentLanguage];
</script>

<div class="flex items-center justify-center min-h-screen bg-gray-50">
  <div class="text-center">
    <div class="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
    <p class="text-lg text-gray-600">{t.loading}</p>
  </div>
</div>
