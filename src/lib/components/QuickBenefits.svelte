<script>
  export let lang = 'en';

  const fallback = 'en';
  const safeLang = ['en', 'sv'].includes(lang) ? lang : fallback;

  const headings = {
    en: "How Spiral Dynamics Can Help You",
    sv: "Vad kan du få ut av detta?"
  };

  const benefits = [
    {
      emoji: "🧑‍💼",
      title: "Leaders & Changemakers",
      en: "Navigate complexity and build bridges across worldviews.",
      sv: "Navigera komplexitet och bygg broar mellan olika perspektiv."
    },
    {
      emoji: "🧘",
      title: "Personal Growth Seekers",
      en: "Understand your inner evolution and unlock your next stage.",
      sv: "Förstå din inre utveckling och öppna nästa steg i din resa."
    },
    {
      emoji: "👩‍🏫",
      title: "Educators & Facilitators",
      en: "Adapt your teaching to meet people where they are.",
      sv: "Anpassa din undervisning för att möta människor där de befinner sig."
    },
    {
      emoji: "🧠",
      title: "Thinkers & Theorists",
      en: "Gain a framework for seeing the hidden layers of society.",
      sv: "Få ett ramverk för att se samhällets dolda lager."
    },
    {
      emoji: "🕊️",
      title: "Spiritual Explorers",
      en: "Embrace the evolution of consciousness as a sacred journey.",
      sv: "Omfamna medvetandets utveckling som en helig resa."
    }
  ];
</script>

<section class="mt-20 px-4 max-w-6xl mx-auto text-center">
  <h2 class="text-2xl sm:text-3xl font-bold mb-10">
    {headings[safeLang]}
  </h2>

  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {#each benefits as b}
      <div class="rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 p-6 text-center shadow-sm hover:shadow-md transition">
        <div class="text-3xl mb-2">{b.emoji}</div>
        <div class="font-semibold text-lg mb-1">{b.title}</div>
        <div class="text-sm">{b[safeLang]}</div>
      </div>
    {/each}
  </div>
</section>

