<script>
  import { base } from '$app/paths';
  import SpiralStagesTeaser from '$lib/components/SpiralStagesTeaser.svelte';
  import QuickBenefits from '$lib/components/QuickBenefits.svelte';
  import languageStore from '$lib/stores/languageStore';

  const { language, toggleLanguage } = languageStore; 

  // Reactive language value
  $: currentLanguage = $language;
  
  // Translation data
  const translations = {
    en: {
      title: "Welcome to Spiral Dynamics",
      subtitle: "A map of how we evolve – from survival to cooperation, from control to freedom, from separation to interbeing.",
      whatIs: {
        title: "What is Spiral Dynamics?",
        p1: "Spiral Dynamics is a developmental framework that reveals how our values and worldviews change over time. Each stage of the spiral represents a new way of understanding the world – from survival to systems thinking, from obedience to compassion.",
        p2: "You've probably met people who see reality very differently from you. Spiral Dynamics helps us understand why – and how we can collaborate across differences."
      },
      nextSteps: {
        title: "Your Next Step",
        description: "Explore each stage in depth, take our simple self-assessment, or learn about the origins of Spiral Dynamics.",
        explore: "🔍 Explore the Spiral",
        quiz: "🧩 Take the Quiz",
        origins: "📖 Learn the Origins",
        dialog: "🗣️ Join a Dialogue",
        coming: "Coming in the future"
      },
      // SEO metadata
      meta: {
        title: "Spiral Dynamics - Understanding Human Evolution and Values",
        description: "Explore Spiral Dynamics, a powerful framework for understanding how individuals and societies evolve through different stages of development and worldviews.",
        keywords: "Spiral Dynamics, human development, values evolution, consciousness stages, worldviews, personal growth"
      }
    },
    sv: {
      title: "Välkommen till Spiral Dynamics",
      subtitle: "En karta över hur vi människor utvecklas – från överlevnad till samarbete, från kontroll till frihet, från separation till samhörighet.",
      whatIs: {
        title: "Vad är Spiral Dynamics?",
        p1: "Spiral Dynamics är ett utvecklingsperspektiv som visar hur våra värderingar och världsbilder förändras genom livet och historien. Varje nivå i spiralen representerar ett nytt sätt att förstå världen – från överlevnad till systemtänkande, från lydnad till medkänsla.",
        p2: "Du har säkert mött människor som ser verkligheten helt annorlunda än du. Spiral Dynamics hjälper oss förstå varför – och hur vi kan samarbeta ändå."
      },
      nextSteps: {
        title: "Ditt nästa steg",
        description: "Upptäck mer om varje nivå, ta vår enkla självskattning, eller lär dig om Spiral Dynamics ursprung.",
        explore: "🔍 Utforska Spiralen",
        quiz: "🧩 Ta testet",
        origins: "📖 Läs Spiralens historia",
        dialog: "🗣️ Delta i en dialog",
        coming: "Kommer i framtiden"
      },
      // SEO metadata
      meta: {
        title: "Spiral Dynamics - Förstå Mänsklig Evolution och Värderingar",
        description: "Utforska Spiral Dynamics, ett kraftfullt ramverk för att förstå hur individer och samhällen utvecklas genom olika stadier av utveckling och världsbilder.",
        keywords: "Spiral Dynamics, mänsklig utveckling, värderingsevolution, medvetandestadier, världsbilder, personlig utveckling"
      }
    }
  };

  // Reactive translation data
  $: t = translations[currentLanguage] || translations.en;
</script>

<svelte:head>
  <title>{t.meta.title}</title>
  <meta name="description" content={t.meta.description} />
  <meta name="keywords" content={t.meta.keywords} />
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:title" content={t.meta.title} />
  <meta property="og:description" content={t.meta.description} />
  <meta property="og:image" content="{base}/social-preview.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  
  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:title" content={t.meta.title} />
  <meta property="twitter:description" content={t.meta.description} />
  <meta property="twitter:image" content="{base}/social-preview.png" />
  
  <!-- Canonical link -->
  <link rel="canonical" href="https://spiralize.org/start" />
</svelte:head>

<div class="min-h-screen bg-gray-50">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
    <!-- Hero Section -->
    <section class="text-center max-w-4xl mx-auto mb-16">
      <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
        {t.title}
      </h1>
      <p class="text-lg text-gray-600 max-w-3xl mx-auto">
        {t.subtitle}
      </p>
    </section>

    <!-- What is Spiral Dynamics -->
    <section class="bg-white rounded-xl shadow-sm p-6 md:p-8 mb-12 max-w-4xl mx-auto">
      <h2 class="text-2xl md:text-3xl font-bold mb-4">{t.whatIs.title}</h2>
      <div class="text-gray-600 space-y-4">
        <p>{t.whatIs.p1}</p>
        <p>{t.whatIs.p2}</p>
      </div>
    </section>

    <!-- Spiral Stages Teaser -->
    <SpiralStagesTeaser />

    <!-- Benefits Block -->
    <QuickBenefits />

    <!-- Next Steps -->
    <section class="mt-16 md:mt-20 text-center max-w-4xl mx-auto">
      <h2 class="text-2xl md:text-3xl font-bold mb-4">
        {t.nextSteps.title}
      </h2>

      <p class="mb-8 text-gray-600">
        {t.nextSteps.description}
      </p>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <a 
          href="{base}/spiral" 
          class="px-4 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-medium transition-colors"
          aria-label={currentLanguage === 'en' ? 'Explore the spiral to learn about each developmental stage' : 'Utforska spiralen för att lära dig om varje utvecklingsstadium'}
        >
          {t.nextSteps.explore}
        </a>

        <a 
          href="{base}/quiz" 
          class="px-4 py-3 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium transition-colors"
          aria-label={currentLanguage === 'en' ? 'Take the assessment quiz to discover your center of gravity' : 'Ta testet för att upptäcka ditt gravitationscentrum'}
        >
          {t.nextSteps.quiz}
        </a>

        <a 
          href="{base}/origins" 
          class="px-4 py-3 rounded-lg bg-yellow-100 hover:bg-yellow-200 text-yellow-800 font-medium transition-colors"
          aria-label={currentLanguage === 'en' ? 'Learn about the history and origins of Spiral Dynamics' : 'Lär dig om Spiral Dynamics historia och ursprung'}
        >
          {t.nextSteps.origins}
        </a>

        <!-- Grayed out dialogue button -->
        <div class="px-4 py-3 rounded-lg bg-gray-100 cursor-not-allowed border border-dashed border-gray-300 text-gray-500">
          <div>{t.nextSteps.dialog}</div>
          <div class="text-xs mt-1 italic">
            {t.nextSteps.coming}
          </div>
        </div>
      </div>
    </section>
  </div>
</div>
