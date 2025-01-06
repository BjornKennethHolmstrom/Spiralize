<script lang="ts">
  import { base } from '$app/paths';
  import { writable } from 'svelte/store';
  import languageStore from '$lib/stores/languageStore';

  const { language, toggleLanguage } = languageStore; 

  // Reactive language value
  $: currentLanguage = $language;

  // Translation data
  const translations = {
    en: {
      heroTitle: "Welcome to Spiralize",
      heroSubtitle: "Understand yourself. Understand the world. Navigate the spiral.",
      features: [
        {
          title: "Take the Assessment",
          description: "Discover your center of gravity on the Spiral Dynamics model with an interactive quiz.",
          link: `${base}/quiz`,
          icon: "🌀"
        },
        {
          title: "Explore the Spiral",
          description: "Learn about each stage of the spiral and how they shape personal and societal growth.",
          link: `${base}/spiral`,
          icon: "📚"
        },
        {
          title: "Practical Insights",
          description: "Find actionable tips for integrating Spiral Dynamics principles into your life.",
          link: `${base}/insights`,
          icon: "✨"
        }
      ]
    },
    sv: {
      heroTitle: "Välkommen till Spiralize",
      heroSubtitle: "Förstå dig själv. Förstå världen. Navigera spiralen.",
      features: [
        {
          title: "Ta testet",
          description: "Upptäck din tyngdpunkt i Spiral Dynamics-modellen med ett interaktivt quiz.",
          link: `${base}/quiz`,
          icon: "🌀"
        },
        {
          title: "Utforska Spiralen",
          description: "Lär dig om varje steg i spiralen och hur de formar personlig och samhällelig utveckling.",
          link: `${base}/spiral`,
          icon: "📚"
        },
        {
          title: "Praktiska Insikter",
          description: "Hitta konkreta tips för att integrera Spiral Dynamics-principer i ditt liv.",
          link: `${base}/insights`,
          icon: "✨"
        }
      ]
    }
  };

  // Reactive translation data
  $: t = translations[$language];
</script>

<div class="min-h-screen bg-gray-50">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

    <!-- Hero Section -->
    <div class="bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl text-white text-center px-6 py-16 mb-12">
      <h1 class="text-4xl md:text-5xl font-bold mb-4">
        {t.heroTitle}
      </h1>
      <p class="text-xl md:text-2xl mb-8 text-purple-100">
        {t.heroSubtitle}
      </p>
      <a 
        href="{base}/quiz"
        class="inline-block bg-white text-purple-600 px-8 py-3 rounded-lg font-medium hover:bg-purple-50 transition-colors"
      >
        Take the Assessment
      </a>
    </div>

    <!-- Features Section -->
    <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
      {#each t.features as feature}
        <a 
          href={feature.link}
          class="block bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6"
        >
          <div class="flex items-start space-x-4">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-2xl">
                {feature.icon}
              </div>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p class="text-gray-600">
                {feature.description}
              </p>
            </div>
          </div>
        </a>
      {/each}
    </div>

    <!-- Donation Section -->
    <div class="bg-white rounded-xl p-8 text-center">
      <h2 class="text-2xl font-semibold mb-4">Support Spiralize</h2>
      <p class="text-gray-600 mb-6">
        If you enjoy Spiralize and want to support the project, consider donating:
      </p>
      <a
        href="https://www.paypal.com/donate/?hosted_button_id=FX7FQMDQBAR4N"
        target="_blank"
        rel="noopener"
        class="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
      >
        Donate via PayPal
      </a>
      <p class="text-sm text-gray-500 mt-4">
        Please add the message "Spiralize" with your donation. Thank you!
      </p>
    </div>
  </div>
</div>
