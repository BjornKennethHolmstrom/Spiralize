<script>
  import { base } from '$app/paths';
  import languageStore from '$lib/stores/languageStore';

  const { language } = languageStore; 

  $: currentLanguage = $language;
  
  const translations = {
    en: {
      copyright: "© 2025 Björn Kenneth Holmström. All rights reserved.",
      about: "About",
      contact: "Contact",
      learnMore: "Learn More",
      support: "Support",
      sisterSites: "Sister Sites"
    },
    sv: {
      copyright: "© 2025 Björn Kenneth Holmström. Alla rättigheter förbehållna.",
      about: "Om",
      contact: "Kontakt",
      learnMore: "Läs mer",
      support: "Stöd",
      sisterSites: "Systersidor"
    }
  };
  
  $: t = translations[currentLanguage];
</script>

<footer class="footer bg-gray-800 text-white py-8">
  <div class="max-w-7xl mx-auto px-4">
    <!-- Main Footer Content -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-6">
      <!-- Copyright -->
      <div class="text-sm text-gray-400">
        {t.copyright}
      </div>
      
      <!-- Navigation Links -->
      <div class="flex flex-wrap gap-x-6 gap-y-2 text-sm">
        <a href="{base}/about" class="hover:underline text-gray-400 hover:text-white transition-colors">
          {t.about}
        </a>
        <a href="{base}/contact" class="hover:underline text-gray-400 hover:text-white transition-colors">
          {t.contact}
        </a>
        <a href="{base}/support" class="hover:underline text-gray-400 hover:text-white transition-colors">
          {t.support}
        </a>
        <a href="{base}/origins" class="hover:underline text-gray-400 hover:text-white transition-colors">
          {t.learnMore}
        </a>
      </div>
    </div>
    
    <!-- Sister Sites -->
    <div class="border-t border-gray-700 pt-6">
      <p class="text-xs text-gray-500 mb-3">{t.sisterSites}</p>
      <div class="flex flex-wrap gap-x-6 gap-y-2 text-sm">
        <a 
          href="https://nondualize.org" 
          class="text-gray-400 hover:text-white transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          Nondualize.org
        </a>
        <span class="text-gray-600">•</span>
        <a 
          href="https://spiralize.org" 
          class="text-purple-400 hover:text-purple-300 transition-colors"
        >
          Spiralize.org
        </a>
        <span class="text-gray-600">•</span>
        <a 
          href="https://communize.org" 
          class="text-gray-400 hover:text-white transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          Communize.org
        </a>
        <span class="text-gray-600">•</span>
        <a 
          href="https://globalgovernanceframeworks.org" 
          class="text-gray-400 hover:text-white transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          GGF.org
        </a>
      </div>
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
