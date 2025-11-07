<!-- src/routes/support/+page.svelte -->
<script>
  import languageStore from '$lib/stores/languageStore';
  import SEO from '$lib/components/SEO.svelte';

  const { language } = languageStore;
  $: currentLanguage = $language;

  const translations = {
    en: {
      title: "Support Spiralize's Evolution",
      subtitle: "Help nurture the growth of conscious awareness",
      
      currentPhase: {
        title: "🌱 Current Phase: Spiritual Seeds",
        content: "Spiralize is in its seedling phase—nurtured as a labor of love while I focus on health recovery and deeper development of these resources."
      },
      
      supportWays: {
        title: "Ways to Support Right Now",
        spiritual: {
          title: "💝 Spiritual & Community Support",
          items: [
            "Share Spiralize with others who might benefit",
            "Participate in discussions and share insights",
            "Offer feedback to help improve the platform",
            "Help test features and user experience"
          ]
        },
        knowledge: {
          title: "📚 Knowledge Contributions", 
          items: [
            "Suggest improvements to Spiral Dynamics content",
            "Share your personal integration experiences",
            "Help with research or fact-checking",
            "Write guest articles or create resources"
          ]
        },
        translation: {
          title: "🌐 Translation & Accessibility",
          items: [
            "Help translate content into other languages",
            "Improve accessibility for diverse learners",
            "Share cultural perspectives on development"
          ]
        }
      },

      futureVision: {
        title: "Future Support Pathways",
        content: "Once these projects have matured and my health situation has stabilized, we may open gentle pathways for financial support that align with regenerative principles.",
        principles: [
          "Translation efforts for global accessibility",
          "Improved features and interactive tools", 
          "Server costs and technical maintenance",
          "Creating new free spiritual resources"
        ]
      },

      gratitude: {
        title: "With Gratitude",
        content: "Your presence and engagement in this evolutionary journey are the greatest gifts. Together, we're mapping the terrain of human consciousness.",
        signature: "Björn"
      }
    },
    sv: {
      title: "Stöd Spiralizes utveckling",
      subtitle: "Hjälp till att vårda medvetandets tillväxt",
      
      currentPhase: {
        title: "🌱 Nuvarande fas: Andliga frön", 
        content: "Spiralize är i sin groddfas—vårdad som en kärleksfull insats medan jag fokuserar på hälsoläkning och djupare utveckling av dessa resurser."
      },
      
      supportWays: {
        title: "Sätt att stödja just nu",
        spiritual: {
          title: "💝 Andligt och gemenskapssstöd",
          items: [
            "Dela Spiralize med andra som kan dra nytta",
            "Delta i diskussioner och dela insikter", 
            "Ge feedback för att förbättra plattformen",
            "Hjälp till att testa funktioner och användarupplevelse"
          ]
        },
        knowledge: {
          title: "📚 Kunskapsbidrag",
          items: [
            "Föreslå förbättringar av Spiral Dynamics-innehåll",
            "Dela dina personliga integrationserfarenheter",
            "Hjälp till med forskning eller faktakontroll",
            "Skriv gästartiklar eller skapa resurser"
          ]
        },
        translation: {
          title: "🌐 Översättning och tillgänglighet",
          items: [
            "Hjälp till att översätta innehåll till andra språk",
            "Förbättra tillgänglighet för olika inlärningssätt",
            "Dela kulturella perspektiv på utveckling"
          ]
        }
      },

      futureVision: {
        title: "Framtida stödvägar",
        content: "När dessa projekt har mognat och min hälsosituation har stabiliserats kan vi öppna försiktiga vägar för ekonomiskt stöd som överensstämmer med regenerativa principer.",
        principles: [
          "Översättningsinsatser för global tillgänglighet",
          "Förbättrade funktioner och interaktiva verktyg",
          "Serverkostnader och teknisk underhåll",
          "Skapande av nya fria andliga resurser"
        ]
      },

      gratitude: {
        title: "Med tacksamhet",
        content: "Din närvaro och engagemang i denna evolutionära resa är de största gåvorna. Tillsammans kartlägger vi mänskligt medvetandes territorium.",
        signature: "Björn" 
      }
    }
  };

  $: t = translations[currentLanguage];
  
  $: seoTitle = t.title || 'Spiralize';
  $: seoDescription = t.subtitle || 'Exploring Spiral Dynamics and consciousness evolution';
  $: seoKeywords = currentLanguage === 'en'
    ? 'spiral dynamics, consciousness, development, psychology, values'
    : 'spiral dynamics, medvetande, utveckling, psykologi, värden';
</script>

<SEO 
  title={seoTitle}
  description={seoDescription}
  keywords={seoKeywords}
  type="website"
/>

<div class="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    
    <!-- Header -->
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold text-purple-900 mb-4">
        {t.title}
      </h1>
      <p class="text-xl text-purple-700 max-w-2xl mx-auto">
        {t.subtitle}
      </p>
    </div>

    <!-- Current Phase -->
    <div class="bg-white rounded-2xl shadow-sm p-8 mb-8 border-l-4 border-green-500">
      <h2 class="text-2xl font-semibold text-gray-900 mb-4">
        {t.currentPhase.title}
      </h2>
      <p class="text-gray-700 leading-relaxed">
        {t.currentPhase.content}
      </p>
    </div>

    <!-- Support Ways -->
    <div class="bg-white rounded-2xl shadow-sm p-8 mb-8">
      <h2 class="text-2xl font-semibold text-gray-900 mb-8 text-center">
        {t.supportWays.title}
      </h2>
      
      <div class="grid md:grid-cols-2 gap-8">
        <!-- Spiritual Support -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-purple-800">
            {t.supportWays.spiritual.title}
          </h3>
          <ul class="space-y-3">
            {#each t.supportWays.spiritual.items as item}
              <li class="flex items-start gap-3 text-gray-700">
                <span class="text-green-500 mt-1 flex-shrink-0">•</span>
                <span>{item}</span>
              </li>
            {/each}
          </ul>
        </div>

        <!-- Knowledge Support -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-purple-800">
            {t.supportWays.knowledge.title}
          </h3>
          <ul class="space-y-3">
            {#each t.supportWays.knowledge.items as item}
              <li class="flex items-start gap-3 text-gray-700">
                <span class="text-blue-500 mt-1 flex-shrink-0">•</span>
                <span>{item}</span>
              </li>
            {/each}
          </ul>
        </div>
      </div>

      <!-- Translation Support -->
      <div class="mt-8 pt-6 border-t border-gray-200">
        <h3 class="text-lg font-semibold text-purple-800 mb-4">
          {t.supportWays.translation.title}
        </h3>
        <ul class="grid md:grid-cols-2 gap-4">
          {#each t.supportWays.translation.items as item}
            <li class="flex items-start gap-3 text-gray-700">
              <span class="text-orange-500 mt-1 flex-shrink-0">•</span>
              <span>{item}</span>
            </li>
          {/each}
        </ul>
      </div>
    </div>

    <!-- Future Vision -->
    <div class="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl text-white p-8 mb-8">
      <h2 class="text-2xl font-semibold mb-6">
        {t.futureVision.title}
      </h2>
      <p class="text-purple-100 mb-6 leading-relaxed">
        {t.futureVision.content}
      </p>
      <ul class="space-y-3">
        {#each t.futureVision.principles as principle}
          <li class="flex items-start gap-3 text-purple-50">
            <span class="text-yellow-300 mt-1 flex-shrink-0">•</span>
            <span>{principle}</span>
          </li>
        {/each}
      </ul>
    </div>

    <!-- Gratitude -->
    <div class="text-center bg-white rounded-2xl shadow-sm p-8">
      <h2 class="text-2xl font-semibold text-gray-900 mb-4">
        {t.gratitude.title}
      </h2>
      <p class="text-gray-700 text-lg mb-6 max-w-2xl mx-auto leading-relaxed">
        {t.gratitude.content}
      </p>
      <p class="text-purple-600 font-medium">
        {t.gratitude.signature}
      </p>
    </div>

  </div>
</div>
