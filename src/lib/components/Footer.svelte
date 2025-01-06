<script>
  import { base } from '$app/paths';
  import languageStore from '$lib/stores/languageStore';

  const { language, toggleLanguage } = languageStore; 

  $: currentLanguage = $language;
</script>

<footer class="footer bg-gray-800 text-white py-6">
  <div class="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
    <div class="text-sm text-gray-400">
      {currentLanguage === "en"
        ? "© 2025 Björn Kenneth Holmström. All rights reserved."
        : "© 2025 Björn Kenneth Holmström. Alla rättigheter förbehållna."}
    </div>
    <div class="space-x-4 text-sm mt-4 md:mt-0">
      <a href="{base}/about" class="hover:underline">
        {currentLanguage === "en" ? "About" : "Om"}
      </a>
      <a href="{base}/contact" class="hover:underline">
        {currentLanguage === "en" ? "Contact" : "Kontakt"}
      </a>
      <a href="https://en.wikipedia.org/wiki/Spiral_Dynamics" target="_blank" rel="noopener">
        {currentLanguage === "en" ? "Learn More" : "Läs mer"}
      </a>
    </div>
  </div>
</footer>

<style>
  .footer a {
    color: #9CA3AF;
  }

  .footer a:hover {
    color: #FFFFFF;
  }
</style>

