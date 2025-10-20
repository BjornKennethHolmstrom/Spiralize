<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import languageStore from '$lib/stores/languageStore';

  const { language } = languageStore;
  $: currentLanguage = $language;

  let isVisible = false;
  const NOTIFICATION_KEY = 'quiz_fix_notification_dismissed';

  onMount(() => {
    if (browser) {
      const dismissed = localStorage.getItem(NOTIFICATION_KEY);
      if (!dismissed) {
        isVisible = true;
      }
    }
  });

  function dismiss() {
    isVisible = false;
    if (browser) {
      localStorage.setItem(NOTIFICATION_KEY, 'true');
    }
  }

  const translations = {
    en: {
      message: "🎉 Good news! The Spiral Dynamics quiz has been fixed and is now working properly.",
      cta: "Take the quiz",
      dismiss: "Dismiss"
    },
    sv: {
      message: "🎉 Goda nyheter! Spiral Dynamics-testet har lagats och fungerar nu korrekt.",
      cta: "Gör testet",
      dismiss: "Stäng"
    }
  };

  $: t = translations[currentLanguage];
</script>

{#if isVisible}
  <div class="notification-banner bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 px-4 shadow-lg" role="alert">
    <div class="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-3">
      <div class="flex items-center gap-3 flex-1">
        <span class="text-sm md:text-base">{t.message}</span>
        <a 
          href="/quiz"
          class="bg-white text-purple-600 px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-purple-50 transition-colors whitespace-nowrap"
        >
          {t.cta}
        </a>
      </div>
      <button
        on:click={dismiss}
        class="text-white hover:text-purple-200 transition-colors p-1"
        aria-label={t.dismiss}
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>
  </div>
{/if}

<style>
  .notification-banner {
    position: sticky;
    top: 0;
    z-index: 50;
    animation: slideDown 0.3s ease-out;
  }

  @keyframes slideDown {
    from {
      transform: translateY(-100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
</style>
