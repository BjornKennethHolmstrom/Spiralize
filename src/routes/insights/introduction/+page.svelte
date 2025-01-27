<script lang="ts">
  import { base } from '$app/paths';
  import { _ } from 'svelte-i18n';
  import languageStore from '$lib/stores/languageStore';

  const { language } = languageStore;
  $: currentLanguage = $language;

  // Helper for translation path
  const t = (path: string) => $_(`insights.introduction.${path}`);

  const stageColors = {
    beige: '#E5D0BA',
    purple: '#9B6B9E',
    red: '#E25A53',
    blue: '#4A72B2',
    orange: '#FF7F27',
    green: '#7AB55C',
    yellow: '#FFD700',
    turquoise: '#40E0D0',
    coral: '#FF6F61'
  };

  // Temporary: Keep integration points here until we solve array translations, we can move this to translations later
  const integrationPoints = {
    en: [
      "From Beige, we retain our connection to life's essentials and the raw instinct to survive.",
      "From Purple, we honor the bonds of family, tradition, and collective belonging.",
      "From Red, we harness the power of self-expression and courageous action.",
      "From Blue, we build upon the stability of structure, discipline, and shared purpose.",
      "From Orange, we celebrate the drive for progress, achievement, and innovation.",
      "From Green, we cultivate empathy, inclusivity, and harmony with others and the planet.",
      "From Yellow, we develop systems thinking, flexibility, and a deep understanding of interconnectedness.",
      "From Turquoise, we embrace the oneness of existence and align ourselves with universal flow.",
      "From Coral, we embody expansive individuality within a universal framework.",
      "From Ultraviolet, we step into infinite integration, dissolving all distinctions."
    ],
    "sv": [
      "Från Beige behåller vi vår koppling till livets grundläggande behov och den råa instinkten att överleva.",
      "Från Purple hedrar vi banden till familj, tradition och kollektiv tillhörighet.",
      "Från Red använder vi kraften i självuttryck och modiga handlingar.",
      "Från Blue bygger vi vidare på stabiliteten i struktur, disciplin och gemensamt syfte.",
      "Från Orange firar vi drivet för framsteg, prestationer och innovation.",
      "Från Green odlar vi empati, inkludering och harmoni med andra och planeten.",
      "Från Yellow utvecklar vi systemtänkande, flexibilitet och en djup förståelse för sammanhang.",
      "Från Turquoise omfamnar vi existensens enhet och anpassar oss till det universella flödet.",
      "Från Coral förkroppsligar vi expansiv individualitet inom ett universellt ramverk.",
      "Från Ultraviolet kliver vi in i oändlig integration, där alla åtskillnader upplöses."
    ]
  };
</script>

<div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-4xl mx-auto">
    <!-- Header -->
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">
        {t('title')}
      </h1>
      <p class="text-xl text-gray-600 max-w-3xl mx-auto">
        {t('description')}
      </p>
    </div>

    <!-- Main Content -->
    <div class="space-y-12">
      <!-- Integration Section -->
      <section class="bg-white rounded-xl shadow-sm p-8">
        <h2 class="text-2xl font-semibold mb-6 text-purple-600">
          {t('goal.title')}
        </h2>
        <p class="text-gray-600 mb-8">
          {t('goal.description')}
        </p>

        <!-- Integration Points -->
        <div class="space-y-4">
          {#each Object.entries(stageColors) as [stageName, color], i}
            {#if i < integrationPoints[currentLanguage].length}
              <div 
                class="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow border-l-4"
                style="border-color: {color}"
              >
                <div class="p-4">
                  <p class="text-gray-700">{integrationPoints[currentLanguage][i]}</p>
                </div>
              </div>
            {/if}
          {/each}
        </div>
      </section>

      <!-- Balance Section -->
      <section class="bg-white rounded-xl shadow-sm p-8">
        <h2 class="text-2xl font-semibold mb-6 text-purple-600">
          {t('balance.title')}
        </h2>
        <div class="prose prose-purple max-w-none">
          <p class="text-gray-600">
            {t('balance.description')}
          </p>
        </div>
      </section>

      <!-- Purpose Section with Navigation -->
      <section class="bg-gradient-to-br from-purple-600 to-purple-800 text-white rounded-xl shadow-sm p-8">
        <h2 class="text-2xl font-semibold mb-6">
          {t('purpose.title')}
        </h2>
        <p class="text-purple-50 mb-8">
          {t('purpose.description')}
        </p>

        <div class="grid md:grid-cols-2 gap-6">
          <a
            href="{base}/insights/stages/beige"
            class="block bg-white bg-opacity-10 rounded-lg p-6 hover:bg-opacity-20 transition-colors"
          >
            <h3 class="text-xl font-semibold mb-2">Begin Your Journey</h3>
            <p class="text-purple-100">Start exploring each stage in detail, beginning with Beige.</p>
          </a>

          <a
            href="{base}/insights"
            class="block bg-white bg-opacity-10 rounded-lg p-6 hover:bg-opacity-20 transition-colors"
          >
            <h3 class="text-xl font-semibold mb-2">Quick Reference</h3>
            <p class="text-purple-100">Return to the overview for practical tips and quick insights.</p>
          </a>
        </div>
      </section>

    </div>
  </div>
</div>
