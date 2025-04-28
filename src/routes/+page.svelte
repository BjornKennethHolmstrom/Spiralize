<script lang="ts">
  import { base } from '$app/paths';
  import { writable } from 'svelte/store';
  import languageStore from '$lib/stores/languageStore';
  import ShareButtons from '$lib/components/ShareButtons.svelte';

  const { language, toggleLanguage } = languageStore; 

  // Reactive language value
  $: currentLanguage = $language;

  // Translation data
  const translations = {
    en: {
      heroTitle: "Welcome to Spiralize",
      heroSubtitle: "Understand yourself. Understand the world. Navigate the spiral.",
      takeAssessment: "Take the Assessment",
      start: "🔰 New to Spiral Dynamics?",
      intro: {
        title: "What is Spiral Dynamics?",
        description: {
          p1: "• Spiral Dynamics is a lens to understand how values evolve — shaping everything from personal choices to global politics.",
          p2: "• It maps the development of human consciousness through distinct stages, each representing a unique way of making sense of the world.",
          p3: "• This isn’t a belief system, but a pattern — of growth, meaning-making, and transformation.",
          p4: "• By learning the spiral, we gain tools to navigate relationships, lead with insight, and understand where humanity is heading.",
          quote: "“To honor all beings, we must first learn to see through all eyes.”"
        },
        keyPoints: [
          {
            title: "It's About Growth",
            text: "Like a spiral, human consciousness evolves through expanding levels of complexity, each building upon and including what came before.",
            icon: "🌱"
          },
          {
            title: "Everyone is Different",
            text: "We each have our own center of gravity - the stage where we feel most comfortable. There's no 'better' or 'worse', just different ways of making sense of the world.",
            icon: "🎯"
          },
          {
            title: "Practical Understanding",
            text: "Understanding Spiral Dynamics can help you better navigate relationships, work, and social challenges by recognizing different worldviews.",
            icon: "🔑"
          }
        ]
      },
      features: [
        {
          title: "Take the Assessment",
          description: "Discover your center of gravity on the Spiral Dynamics model with an interactive quiz.",
          link: `${base}/quiz`,
          icon: "📝"
        },
        {
          title: "Explore the Spiral",
          description: "Learn about each stage of the spiral and how they shape personal and societal growth.",
          link: `${base}/spiral`,
          icon: "🌀"
        },
        {
          title: "Origins & History",
          description: "Learn about the foundations of Spiral Dynamics, from Clare Graves' research to modern applications.",
          link: `${base}/origins`,
          icon: "📚"  // or "🎓" or "⏳" - feel free to choose which fits best
        },
        {
          title: "Practical Insights",
          description: "Find actionable tips for integrating Spiral Dynamics principles into your life.",
          link: `${base}/insights`,
          icon: "✨"
        },
        {
          title: "Global Perspectives",
          description: "Explore how different worldviews shape our understanding of major global challenges.",
          link: `${base}/insights/global`,
          icon: "🌍"
        },
        {
          title: "Conscious Governance",
          description: "Learn how to integrate developmental perspectives into organizational and societal systems.",
          link: `${base}/insights/governance`,
          icon: "🏛️"
        }
      ]
    },
    sv: {
      heroTitle: "Välkommen till Spiralize",
      heroSubtitle: "Förstå dig själv. Förstå världen. Navigera spiralen.",
      heroSubtitle2: "En karta över hur människor och kulturer utvecklas – från överlevnad till system, från rädsla till frihet, från isolering till samhörighet.",
      takeAssessment: "Testa dig själv",
      start: "🔰 Ny till Spiral Dynamics?",
      intro: {
        title: "Vad är Spiral Dynamics?",
        description: {
          p1: "• Spiral Dynamics är en lins för att förstå hur värderingar utvecklas – och hur de formar allt från personliga val till global politik.",
          p2: "• Den kartlägger utvecklingen av mänskligt medvetande genom olika stadier, där varje stadium representerar ett unikt sätt att förstå världen.",
          p3: "• Det är inget trossystem, utan ett mönster – av tillväxt, meningsskapande och transformation.",
          p4: "• Genom att lära oss spiralen får vi verktyg för att navigera relationer, leda med insikt och förstå vart mänskligheten är på väg.",
          quote: "“För att hedra alla varelser måste vi först lära oss att se genom alla ögon.”"
        },
        keyPoints: [
          {
            title: "Det Handlar om Utveckling",
            text: "Som en spiral utvecklas mänskligt medvetande genom expanderande nivåer av komplexitet, där varje nivå bygger på och inkluderar det som kom före.",
            icon: "🌱"
          },
          {
            title: "Alla är Olika",
            text: "Vi har alla vårt eget gravitationscentrum - det stadium där vi känner oss mest bekväma. Det finns inget 'bättre' eller 'sämre', bara olika sätt att förstå världen.",
            icon: "🎯"
          },
          {
            title: "Praktisk Förståelse",
            text: "Att förstå Spiral Dynamics kan hjälpa dig att bättre navigera relationer, arbete och sociala utmaningar genom att känna igen olika världsåskådningar.",
            icon: "🔑"
          }
        ]
      },
      features: [
        {
          title: "Ta testet",
          description: "Upptäck din tyngdpunkt i Spiral Dynamics-modellen med ett interaktivt quiz.",
          link: `${base}/quiz`,
          icon: "📝"
        },
        {
          title: "Utforska Spiralen",
          description: "Lär dig om varje steg i spiralen och hur de formar personlig och samhällelig utveckling.",
          link: `${base}/spiral`,
          icon: "🌀"
        },
        {
          title: "Historia & Ursprung",
          description: "Lär dig om grunderna i Spiral Dynamics, från Clare Graves forskning till moderna tillämpningar.",
          link: `${base}/origins`,
          icon: "📚"  // matching the English version
        },
        {
          title: "Praktiska Insikter",
          description: "Hitta konkreta tips för att integrera Spiral Dynamics-principer i ditt liv.",
          link: `${base}/insights`,
          icon: "✨"
        },
        {
          title: "Globala Perspektiv",
          description: "Utforska hur olika världsbilder formar vår förståelse av stora globala utmaningar.",
          link: `${base}/global`,
          icon: "🌍"
        },
        {
          title: "Medveten Styrning",
          description: "Lär dig hur man integrerar utvecklingsperspektiv i organisatoriska och samhälleliga system.",
          link: `${base}/governance`,
          icon: "🏛️"
        }
      ]
    }
  };

  // Reactive translation data
  $: t = translations[$language];

  $: title = currentLanguage === 'en'
    ? 'Spiralize - Discover Your Spiral Dynamics Profile'
    : 'Spiralize - Upptäck Din Spiral Dynamics Profil';
    
  $: description = currentLanguage === 'en'
    ? 'Take our comprehensive assessment to understand your values and worldview through Spiral Dynamics. Get personalized insights and practical guidance for growth.'
    : 'Ta vår omfattande bedömning för att förstå dina värderingar och världsbild genom Spiral Dynamics. Få personliga insikter och praktisk vägledning för utveckling.';

</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description}>
  <meta property="og:title" content={title}>
  <meta property="og:description" content={description}>
  <meta property="twitter:title" content={title}>
  <meta property="twitter:description" content={description}>
</svelte:head>

<div class="min-h-screen bg-gray-50">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

    <!-- Hero Section -->
    <div class="bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl text-white text-center px-6 py-16 mb-12">
      <!-- Add logo here -->
      <div class="mb-8">
        <img 
          src="{base}/logo.svg" 
          alt="Spiralize Logo" 
          class="w-32 h-32 mx-auto mb-6"
        />
      </div>
      <h1 class="text-4xl md:text-5xl font-bold mb-4">
        {t.heroTitle}
      </h1>
      <p class="text-xl md:text-2xl mb-8 text-purple-100">
        {t.heroSubtitle}
      </p>
      <div class="flex flex-col sm:flex-row justify-center gap-4">
        <a 
          href="{base}/start"
          class="inline-block bg-white text-purple-600 px-8 py-3 rounded-lg font-medium hover:bg-purple-50 transition-colors"
        >
          {t.start}
        </a>
        <a 
          href="{base}/quiz"
          class="inline-block bg-white text-purple-600 px-8 py-3 rounded-lg font-medium hover:bg-purple-50 transition-colors"
        >
          {t.takeAssessment}
        </a>
      </div>
    </div>

    <!-- New Introduction Section -->
    <div class="max-w-4xl mx-auto mb-16">
      <h2 class="text-3xl font-bold text-center mb-6">
        {t.intro.title}
      </h2>

      <div class="max-w-4xl text-base leading-relaxed">
        <p class="mb-4">{t.intro.description.p1}</p>
        <p class="mb-4">{t.intro.description.p2}</p>
        <p class="mb-4">{t.intro.description.p3}</p>
        <p class="mb-4">{t.intro.description.p4}</p>
      </div>

      <div class="mt-8 max-w-xl text-sm text-gray-500 dark:text-gray-500 italic">
        {t.intro.description.quote}
      </div><br><br>
      
      <div class="grid md:grid-cols-3 gap-8">
        {#each t.intro.keyPoints as point}
          <div class="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div class="text-4xl mb-4">
              {point.icon}
            </div>
            <h3 class="text-xl font-semibold mb-2">
              {point.title}
            </h3>
            <p class="text-gray-600">
              {point.text}
            </p>
          </div>
        {/each}
      </div>
    </div>

    <!-- Features Section -->
    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
      {#each t.features as feature}
        <a 
          href={feature.link}
          class="group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 border-2 border-transparent hover:border-purple-500 transform hover:-translate-y-1"
        >
          <div class="flex items-start space-x-4">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-2xl group-hover:bg-purple-200 transition-colors">
                {feature.icon}
              </div>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                {feature.title}
              </h3>
              <p class="text-gray-600">
                {feature.description}
              </p>
            </div>
          </div>
          <div class="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <svg class="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </a>
      {/each}
    </div>
  </div>

  <br>
  <ShareButtons />
  <br>

</div>
