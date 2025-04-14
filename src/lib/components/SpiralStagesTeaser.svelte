<script>
  export let lang = 'en';

  const fallback = 'en';
  const safeLang = ['en', 'sv'].includes(lang) ? lang : fallback;

  const translations = {
    en: {
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

  const { stages, beyond } = translations[lang];
</script>

<div class="flex flex-wrap justify-center gap-4 mt-12">
  {#each stages as stage}
    <div
      class="rounded-xl p-4 shadow-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 max-w-[160px] text-center hover:scale-105 transition cursor-default"
    >
      <div class="text-4xl mb-2">{stage.emoji}</div>
      <div class="font-semibold text-lg">{stage.name}</div>
      <div class="text-sm text-zinc-500 dark:text-zinc-400">{stage.value}</div>
    </div>
  {/each}

  <!-- Beyond Teaser -->
  <a
    href="/start"
    class="rounded-xl p-4 shadow-sm border border-dashed border-zinc-300 dark:border-zinc-600 text-center max-w-[160px] italic text-zinc-400 dark:text-zinc-500 hover:scale-105 transition cursor-pointer"
  >
    <div class="text-3xl mb-2">…</div>
    <div class="font-medium">{beyond.label}</div>
    <div class="text-sm">{beyond.teaser}</div>
  </a>
</div>

