<script lang="ts">
  import { base } from '$app/paths';
  import languageStore from '$lib/stores/languageStore';
  import LazyInsightSection from '$lib/components/LazyInsightSection.svelte';
  import ShareButtons from '$lib/components/ShareButtons.svelte';

  const { language } = languageStore;
  $: currentLanguage = $language;

  // We could move this to translation files later if desired
  const translations = {
    en: {
      title: "Personal Insights",
      description: "Find actionable tips for integrating Spiral Dynamics into your life.",
      readMore: "Read More",
      introductionTitle: "The Journey Toward Wholeness",
      introductionPreview: "The journey through Spiral Dynamics is more than just a progression through stages—it's an exploration of the human experience in all its richness and complexity.",
      learnMore: "Learn More About Integration",
      stages: {
        beige: {
          title: "Beige",
          tips: [
            "Focus on survival basics: food, shelter, safety.",
            "Provide support for vulnerable individuals with compassion.",
            "Understand that survival needs dominate decision-making in this stage."
          ]
        },
        purple: {
          title: "Purple",
          tips: [
            "Honor traditions and rituals that strengthen group identity.",
            "Create a sense of belonging through community activities.",
            "Be mindful of superstitions that may limit progress."
          ]
        },
        red: {
          title: "Red",
          tips: [
            "Channel strong willpower into constructive leadership.",
            "Set boundaries to prevent dominance or exploitation.",
            "Recognize the importance of self-expression and personal power."
          ]
        },
        blue: {
          title: "Blue",
          tips: [
            "Follow rules and traditions to create stability.",
            "Focus on long-term goals over immediate gratification.",
            "Avoid rigid thinking that stifles innovation."
          ]
        },
        orange: {
          title: "Orange",
          tips: [
            "Set ambitious goals and strive for measurable success.",
            "Embrace competition to drive innovation and progress.",
            "Be mindful of the impact of overemphasizing material gain."
          ]
        },
        green: {
          title: "Green",
          tips: [
            "Foster empathy and inclusivity in personal and social contexts.",
            "Collaborate and build consensus to solve problems.",
            "Avoid becoming overly focused on group harmony at the expense of progress."
          ]
        },
        yellow: {
          title: "Yellow",
          tips: [
            "Develop systems thinking to understand complex interconnections.",
            "Seek knowledge and adapt to changing environments.",
            "Balance intellectual exploration with actionable solutions."
          ]
        },
        turquoise: {
          title: "Turquoise",
          tips: [
            "Promote global unity and holistic understanding.",
            "Encourage collaborative efforts for planetary well-being.",
            "Focus on integration and transcendence of earlier stages."
          ]
        },
        coral: {
          title: "Coral",
          tips: [
            "Balance individual expression with universal consciousness",
            "Foster innovation that serves both personal growth and collective evolution",
            "Embrace the role of conscious co-creator in shaping new paradigms"
          ]
        },
        ultraviolet: {
          title: "Ultraviolet",
          tips: [
           "Explore consciousness beyond individual and collective boundaries",
           "Participate in the co-creation of new realities and possibilities",
           "Embrace the unity of all existence while maintaining dynamic flow"
          ]
        },
        "beyond_spiral": {
          title: "Beyond",
          tips: [
           "Explore existence beyond the spiral",
          ]
        }
      }
    },
    "sv": {
      "title": "Personliga Insikter",
      "description": "Hitta konkreta tips för att integrera Spiral Dynamics i ditt liv.",
      "readMore": "Läs Mer",
      "introductionTitle": "Resan Mot Helhet",
      "introductionPreview": "Resan genom Spiral Dynamics är mer än bara en progression genom stadier—det är en utforskning av den mänskliga upplevelsen i all dess rikedom och komplexitet.",
      "learnMore": "Läs Mer Om Integration",
      "stages": {
        "beige": {
          "title": "Beige",
          "tips": [
            "Fokusera på grundläggande överlevnad: mat, skydd, säkerhet.",
            "Ge stöd till sårbara individer med medkänsla.",
            "Förstå att överlevnadsbehov dominerar beslutsfattandet i detta stadium."
          ]
        },
        "purple": {
          "title": "Purple",
          "tips": [
            "Hedra traditioner och ritualer som stärker gruppidentiteten.",
            "Skapa en känsla av tillhörighet genom gemensamma aktiviteter.",
            "Var medveten om vidskepelser som kan begränsa framsteg."
          ]
        },
        "red": {
          "title": "Red",
          "tips": [
            "Kanalisera stark viljestyrka till konstruktivt ledarskap.",
            "Sätt gränser för att förhindra dominans eller utnyttjande.",
            "Erkänn vikten av självuttryck och personlig kraft."
          ]
        },
        "blue": {
          "title": "Blue",
          "tips": [
            "Följ regler och traditioner för att skapa stabilitet.",
            "Fokusera på långsiktiga mål istället för omedelbar tillfredsställelse.",
            "Undvik stelbent tänkande som hämmar innovation."
          ]
        },
        "orange": {
          "title": "Orange",
          "tips": [
            "Sätt ambitiösa mål och sträva efter mätbara framgångar.",
            "Uppmuntra konkurrens för att driva innovation och framsteg.",
            "Var medveten om effekterna av att överbetona materiella vinster."
          ]
        },
        "green": {
          "title": "Green",
          "tips": [
            "Främja empati och inkludering i personliga och sociala sammanhang.",
            "Samarbeta och bygg konsensus för att lösa problem.",
            "Undvik att bli alltför fokuserad på gruppharmoni på bekostnad av framsteg."
          ]
        },
        "yellow": {
          "title": "Yellow",
          "tips": [
            "Utveckla systemtänkande för att förstå komplexa samband.",
            "Sök kunskap och anpassa dig till föränderliga miljöer.",
            "Balansera intellektuell utforskning med praktiska lösningar."
          ]
        },
        "turquoise": {
          "title": "Turquoise",
          "tips": [
            "Främja global enhet och holistisk förståelse.",
            "Uppmuntra samarbete för planetens välbefinnande.",
            "Fokusera på integration och transcendens av tidigare stadier."
          ]
        },
        "coral": {
          "title": "Coral",
          "tips": [
              "Balansera individuellt uttryck med universellt medvetande.",
              "Främja innovation som tjänar både personlig tillväxt och kollektiv evolution.",
              "Omfamna rollen som medveten medskapare i formandet av nya paradigm."
          ]
        },
        "ultraviolet": {
          "title": "Ultraviolet",
          "tips": [
              "Utforska medvetande bortom individuella och kollektiva gränser.",
              "Delta i medskapandet av nya verkligheter och möjligheter.",
              "Omfamna enhet i all existens medan dynamiskt flöde upprätthålls."
          ]
        },
        "beyond_spiral": {
          title: "Beyond",
          tips: [
           "Utforska existensen bortom spiralen",
          ]
        }
      }
    }
  };

  $: t = translations[currentLanguage];

  const stageColors = {
    beige: '#E5D0BA',
    purple: '#9B6B9E',
    red: '#E25A53',
    blue: '#4A72B2',
    orange: '#FF7F27',
    green: '#7AB55C',
    yellow: '#FFD700',
    turquoise: '#40E0D0',
    coral: '#FF6F61',
    ultraviolet: '#9932CC',
    beyond_spiral: '#FAFFB6'
  };

  $: title = currentLanguage === 'en'
    ? 'Personal Insights & Practical Applications | Spiralize'
    : 'Personliga Insikter & Praktiska Tillämpningar | Spiralize';
    
  $: description = currentLanguage === 'en'
    ? 'Get practical insights and applications for each Spiral Dynamics stage. Learn how to integrate different value systems and foster personal growth.'
    : 'Få praktiska insikter och tillämpningar för varje Spiral Dynamics-stadium. Lär dig hur du integrerar olika värdesystem och främjar personlig utveckling.';
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description}>
  <meta property="og:title" content={title}>
  <meta property="og:description" content={description}>
  <meta property="twitter:title" content={title}>
  <meta property="twitter:description" content={description}>
</svelte:head>

<div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-7xl mx-auto">
    <!-- Header -->
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">
        {t.title}
      </h1>
      <p class="text-xl text-gray-600">
        {t.description}
      </p>
    </div>

    <!-- Introduction Preview Card -->
    <div class="max-w-4xl mx-auto mb-16">
      <div class="bg-white rounded-xl shadow-sm p-8 relative overflow-hidden">
        <div class="absolute top-0 right-0 w-64 h-64 opacity-5">
          <svg viewBox="0 0 100 100" class="w-full h-full">
            <path d="M50,0 A50,50 0 0,1 100,50 A50,50 0 0,1 50,100 A50,50 0 0,1 0,50 A50,50 0 0,1 50,0 Z" 
                  fill="currentColor" />
          </svg>
        </div>
        <h2 class="text-2xl font-semibold mb-4">{t.introductionTitle}</h2>
        <p class="text-gray-600 mb-6">{t.introductionPreview}</p>
        <a 
          href="{base}/insights/introduction"
          class="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium"
        >
          {t.learnMore}
          <svg class="w-5 h-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
          </svg>
        </a>
      </div>
    </div>

    <!-- Stage Cards Grid -->
    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {#each Object.entries(stageColors) as [stageName, color]}
        <LazyInsightSection
          {stageName}
          stageColor={color}
          {translations}
          language={currentLanguage}
        />
      {/each}
    </div>
  </div>
 
  <br>
  <ShareButtons />
  <br>

</div>
