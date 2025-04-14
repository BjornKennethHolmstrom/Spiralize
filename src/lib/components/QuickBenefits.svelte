<script>
  export let lang = 'en';

  const fallback = 'en';
  const safeLang = ['en', 'sv'].includes(lang) ? lang : fallback;

  const translations = {
    en: {
      title: "How Spiral Dynamics Can Help You",
      benefits: [
        {
          emoji: "🧑‍💼",
          title: "Leaders & Changemakers",
          description: "Navigate complexity and build bridges across worldviews."
        },
        {
          emoji: "🧘",
          title: "Personal Growth Seekers",
          description: "Understand your inner evolution and unlock your next stage."
        },
        {
          emoji: "👩‍🏫",
          title: "Educators & Facilitators",
          description: "Adapt your teaching to meet people where they are."
        },
        {
          emoji: "🧠",
          title: "Thinkers & Theorists",
          description: "Gain a framework for seeing the hidden layers of society."
        },
        {
          emoji: "🕊️",
          title: "Spiritual Explorers",
          description: "Embrace the evolution of consciousness as a sacred journey."
        }
      ]
    },
    sv: {
      title: "Vad kan du få ut av detta?",
      benefits: [
        {
          emoji: "🧑‍💼",
          title: "Ledare & Förändringsarbetare",
          description: "Navigera komplexitet och bygg broar mellan olika perspektiv."
        },
        {
          emoji: "🧘",
          title: "Personlig Utveckling",
          description: "Förstå din inre utveckling och öppna nästa steg i din resa."
        },
        {
          emoji: "👩‍🏫",
          title: "Utbildare & Facilitatorer",
          description: "Anpassa din undervisning för att möta människor där de befinner sig."
        },
        {
          emoji: "🧠",
          title: "Tänkare & Teoretiker",
          description: "Få ett ramverk för att se samhällets dolda lager."
        },
        {
          emoji: "🕊️",
          title: "Andliga Utforskare",
          description: "Omfamna medvetandets utveckling som en helig resa."
        }
      ]
    }
  };

  const t = translations[safeLang];
</script>

<section class="mb-12">
  <h2 class="text-2xl md:text-3xl font-bold text-center mb-8">
    {t.title}
  </h2>

  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {#each t.benefits as benefit}
      <div class="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
        <div class="text-3xl mb-3">{benefit.emoji}</div>
        <h3 class="font-semibold text-lg mb-2">{benefit.title}</h3>
        <p class="text-gray-600 text-sm">{benefit.description}</p>
      </div>
    {/each}
  </div>
</section>
