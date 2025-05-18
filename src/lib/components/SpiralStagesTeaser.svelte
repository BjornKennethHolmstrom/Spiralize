<script>
  import { base } from '$app/paths';
  import languageStore from '$lib/stores/languageStore';
  import { stages } from '$lib/data/stages';
  
  const { language } = languageStore;
  
  // Reactive language value
  $: currentLanguage = $language;
  
  // Helper function to get text color based on background color
  function getTextColor(hex) {
    // Simple approach: beige, yellow, and turquoise get dark text, others get white
    const lightBackgrounds = ['#e6e3c5', '#FFD700', '#40E0D0'];
    return lightBackgrounds.includes(hex) ? '#000000' : '#FFFFFF';
  }

  // Filter for the stages we want to show in the teaser (same as existing)
  const teaseStages = ['red', 'blue', 'orange', 'green'];
  
  // Get stage data for the teaser from our master data
  $: stageData = teaseStages.map(id => {
    const stage = stages.find(s => s.id === id);
    return {
      id: stage.id,
      name: stage.name[currentLanguage],
      value: stage.association[currentLanguage],
      hex: stage.hex
    };
  });

  const translations = {
    en: {
      title: "Some of the Stages of Development",
      beyond: {
        label: "More",
        teaser: "Click to journey deeper"
      }
    },
    sv: {
      title: "Några av utvecklingsstegen",
      beyond: {
        label: "Mer",
        teaser: "Klicka för att utforska djupare"
      }
    }
  };

  // Use the language from the store
  $: t = translations[currentLanguage] || translations.en;
</script>

<section class="mb-12 text-center">
  <h2 class="text-2xl md:text-3xl font-bold mb-6">{t.title}</h2>
  
  <div class="flex flex-wrap justify-center gap-4">
    {#each stageData as stage}
      <div
        class="flex-1 min-w-[140px] max-w-[180px] bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
      >
        <!-- SVG Circle instead of emoji -->
        <div class="flex justify-center mb-2">
          <svg width="48" height="48" viewBox="0 0 48 48">
            <circle 
              cx="24" 
              cy="24" 
              r="20" 
              fill={stage.hex} 
              stroke="#00000033"
              stroke-width="1"
            />
            <!-- Optional: Add stage initial letter in the circle -->
            <text 
              x="24" 
              y="28" 
              text-anchor="middle" 
              font-size="18" 
              font-weight="bold" 
              fill={getTextColor(stage.hex)}
            >
              {stage.name.charAt(0)}
            </text>
          </svg>
        </div>
        <div class="font-semibold text-lg">{stage.name}</div>
        <div class="text-sm text-gray-500">{stage.value}</div>
      </div>
    {/each}

    <!-- Beyond Teaser -->
    
    <a href="{base}/spiral"
      class="flex-1 min-w-[140px] max-w-[180px] rounded-xl p-4 shadow-sm border border-dashed border-gray-300 text-center hover:bg-gray-50 transition-colors"
    >
      <!-- Dotted circle SVG for "More" -->
      <div class="flex justify-center mb-2">
        <svg width="48" height="48" viewBox="0 0 48 48">
          <circle 
            cx="24" 
            cy="24" 
            r="20" 
            fill="transparent" 
            stroke="#6B7280"
            stroke-width="2"
            stroke-dasharray="4 4"
          />
          <text 
            x="24" 
            y="28" 
            text-anchor="middle" 
            font-size="18" 
            fill="#6B7280"
          >
            …
          </text>
        </svg>
      </div>
      <div class="font-medium text-gray-700">{t.beyond.label}</div>
      <div class="text-sm text-gray-500">{t.beyond.teaser}</div>
    </a>
  </div>
</section>
