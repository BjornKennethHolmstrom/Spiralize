<script>
  import { base } from '$app/paths';
  import languageStore from '$lib/stores/languageStore';
  
  const { language } = languageStore;
  
  // Reactive language value
  $: currentLanguage = $language;

  const translations = {
    en: {
      title: "The Stages of Development",
      stages: [
        { name: "Red", emoji: "🔴", value: "Power & Survival" },
        { name: "Blue", emoji: "🔵", value: "Order & Faith" },
        { name: "Orange", emoji: "🟠", value: "Success & Progress" },
        { name: "Green", emoji: "🟢", value: "Care & Equality" }
      ],
      beyond: {
        label: "Beyond",
        teaser: "Click to journey deeper"
      }
    },
    sv: {
      title: "Utvecklingsstegen",
      stages: [
        { name: "Röd", emoji: "🔴", value: "Makt & Överlevnad" },
        { name: "Blå", emoji: "🔵", value: "Ordning & Tro" },
        { name: "Orange", emoji: "🟠", value: "Framgång & Framsteg" },
        { name: "Grön", emoji: "🟢", value: "Omsorg & Jämlikhet" }
      ],
      beyond: {
        label: "Bortom",
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
    {#each t.stages as stage}
      <div
        class="flex-1 min-w-[140px] max-w-[180px] bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
      >
        <div class="text-4xl mb-2">{stage.emoji}</div>
        <div class="font-semibold text-lg">{stage.name}</div>
        <div class="text-sm text-gray-500">{stage.value}</div>
      </div>
    {/each}

    <!-- Beyond Teaser -->
    <a
      href="{base}/spiral"
      class="flex-1 min-w-[140px] max-w-[180px] rounded-xl p-4 shadow-sm border border-dashed border-gray-300 text-center hover:bg-gray-50 transition-colors"
    >
      <div class="text-3xl mb-2">…</div>
      <div class="font-medium text-gray-700">{t.beyond.label}</div>
      <div class="text-sm text-gray-500">{t.beyond.teaser}</div>
    </a>
  </div>
</section>
