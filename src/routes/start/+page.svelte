<script>
  import SpiralStagesTeaser from '$lib/components/SpiralStagesTeaser.svelte';
  import QuickBenefits from '$lib/components/QuickBenefits.svelte';
  import languageStore from '$lib/stores/languageStore';

  const { language, toggleLanguage } = languageStore; 

  // Reactive language value
  $: currentLanguage = $language;
</script>

<section class="px-6 py-24 max-w-5xl mx-auto">
  <h1 class="text-4xl sm:text-5xl font-bold text-center mb-6">
    {currentLanguage === 'sv' ? "Välkommen till Spiral Dynamics" : "Welcome to Spiral Dynamics"}
  </h1>

  <p class="text-center text-lg text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
    {currentLanguage === 'sv'
      ? "En karta över hur vi människor utvecklas – från överlevnad till samarbete, från kontroll till frihet, från separation till samhörighet."
      : "A map of how we evolve – from survival to cooperation, from control to freedom, from separation to interbeing."}
  </p>

  <!-- Spiral Explanation -->
  <div class="prose dark:prose-invert mx-auto mb-16">
    <h2>{currentLanguage === 'sv' ? "Vad är Spiral Dynamics?" : "What is Spiral Dynamics?"}</h2>
    <p>
      {currentLanguage === 'sv'
        ? "Spiral Dynamics är ett utvecklingsperspektiv som visar hur våra värderingar och världsbilder förändras genom livet och historien. Varje nivå i spiralen representerar ett nytt sätt att förstå världen – från överlevnad till systemtänkande, från lydnad till medkänsla."
        : "Spiral Dynamics is a developmental framework that reveals how our values and worldviews change over time. Each stage of the spiral represents a new way of understanding the world – from survival to systems thinking, from obedience to compassion."}
    </p>
    <p>
      {currentLanguage === 'sv'
        ? "Du har säkert mött människor som ser verkligheten helt annorlunda än du. Spiral Dynamics hjälper oss förstå varför – och hur vi kan samarbeta ändå."
        : "You’ve probably met people who see reality very differently from you. Spiral Dynamics helps us understand why – and how we can collaborate across differences."}
    </p>
  </div>

  <!-- Spiral Stages Teaser -->
  <SpiralStagesTeaser lang={currentLanguage} />

  <!-- Benefits Block -->
  <QuickBenefits lang={currentLanguage} />

  <!-- Next Steps -->
  <div class="mt-24 text-center">
    <h2 class="text-2xl sm:text-3xl font-bold mb-6">
      {currentLanguage === 'sv' ? "Ditt nästa steg" : "Your Next Step"}
    </h2>

    <p class="mb-8 text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
      {currentLanguage === 'sv'
        ? "Upptäck mer om varje nivå, ta vår enkla självskattning, eller gå med i en spiralmedveten dialog."
        : "Explore each stage in depth, take our simple self-assessment, or join a spiral-aware dialogue."}
    </p>

    <div class="flex flex-col sm:flex-row justify-center gap-4">
      <a href="/spiral" class="px-6 py-3 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition">
        {currentLanguage === 'sv' ? "🔍 Utforska Spiralen" : "🔍 Explore the Spiral"}
      </a>

      <a href="/quiz" class="px-6 py-3 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition">
        {currentLanguage === 'sv' ? "🧩 Ta testet" : "🧩 Take the Quiz"}
      </a>

      <a href="/origins" class="px-6 py-3 rounded-xl bg-yellow-100 dark:bg-yellow-900 text-gray-800 dark:text-white hover:bg-yellow-200 dark:hover:bg-yellow-800 transition">
        {currentLanguage === 'sv' ? "📖 Läs Spiralens historia" : "📖 Read the Origins of the Spiral"}
      </a>

      <!-- Grayed out dialogue button -->
      <div class="px-6 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed border border-dashed border-gray-300 dark:border-gray-600 text-center">
        <div>
          🗣️ {currentLanguage === 'sv' ? "Delta i en dialog" : "Join a Dialogue"}
        </div>
        <div class="text-xs mt-1 italic">
          {currentLanguage === 'sv' ? "Kommer i framtiden" : "Coming in the future"}
        </div>
      </div>
    </div>
  </div>
</section>

