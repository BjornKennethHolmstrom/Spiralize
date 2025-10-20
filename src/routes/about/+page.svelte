<script>
  import languageStore from '$lib/stores/languageStore';
  import SEO from '$lib/components/SEO.svelte';

  const { language, toggleLanguage } = languageStore; 

  $: currentLanguage = $language;

  const translations = {
    en: {
      title: "About Spiralize",
      subtitle: "Discover the purpose and mission of Spiralize.",
      paragraphs: [
        "Spiralize is a platform designed to make the principles of Spiral Dynamics accessible and actionable. It aims to help individuals and societies understand themselves and the world better through this unique framework.",
        "The project is inspired by the work of Clare W. Graves, Don Beck, and Chris Cowan, and it offers practical tools for personal and collective growth.",
        "Spiralize is a labor of love by Björn Kenneth Holmström, reflecting a commitment to education and meaningful exploration."
      ],
      relatedSites: {
        title: "Related Projects",
        subtitle: "Spiralize is part of an interconnected ecosystem exploring human consciousness and collective flourishing:",
        sites: [
          {
            name: "Spiralize",
            tagline: "Becoming",
            description: "Mapping developmental stages of consciousness and values evolution through Spiral Dynamics.",
            url: "https://spiralize.org",
            logo: "/logo.svg",
            current: true
          },
          {
            name: "Nondualize",
            tagline: "Being",
            description: "Exploring non-dual awareness—the recognition of the unified nature of reality and awakening to wholeness.",
            url: "https://nondualize.org",
            logo: "/logo-nondualize.svg"
          },
          {
            name: "Communize",
            tagline: "Belonging",
            description: "Building community and creating commons at every scale—from inner integration to planetary stewardship.",
            url: "https://communize.org",
            logo: "/logo-communize.svg"
          },
          {
            name: "Global Governance Frameworks",
            tagline: "Systemizing",
            description: "Designing governance frameworks for planetary coordination and collective action on global challenges.",
            url: "https://globalgovernanceframeworks.org",
            logo: "/logo-ggf.svg"
          }
        ],
        integration: "Together, these projects explore the full spectrum of human development: from awakening to understanding to embodying in community to coordinating at scale."
      },
      support: {
        title: "Support",
        text: "While Spiralize is free to use, if you'd like to support the project's maintenance and development, you can make a small contribution:",
        button: "Support via PayPal",
        note: "Please add the message \"Spiralize\" with your donation. Thank you!"
      },
      author: {
        title: "About the Author",
        text: "Björn Kenneth Holmström writes about consciousness, philosophy, and spirituality and more. Explore more of his work:",
        blog: "Visit My Blog",
        books: "Explore My Books",
        projects: "Other Projects"
      }
    },
    sv: {
      title: "Om Spiralize",
      subtitle: "Upptäck syftet och visionen med Spiralize.",
      paragraphs: [
        "Spiralize är en plattform som gör principerna i Spiral Dynamics tillgängliga och användbara. Syftet är att hjälpa individer och samhällen att bättre förstå sig själva och världen genom detta unika ramverk.",
        "Projektet är inspirerat av arbetet av Clare W. Graves, Don Beck och Chris Cowan och erbjuder praktiska verktyg för personlig och kollektiv utveckling.",
        "Spiralize är ett kärleksarbete av Björn Kenneth Holmström och speglar ett engagemang för utbildning och meningsfull utforskning."
      ],
      relatedSites: {
        title: "Relaterade projekt",
        subtitle: "Spiralize är en del av ett sammanlänkat ekosystem som utforskar mänskligt medvetande och kollektivt välmående:",
        sites: [
          {
            name: "Spiralize",
            tagline: "Blivande",
            description: "Kartlägga utvecklingsstadier av medvetande och värdesutveckling genom Spiral Dynamics.",
            url: "https://spiralize.org",
            logo: "/logo.svg",
            current: true
          },
          {
            name: "Nondualize",
            tagline: "Varande",
            description: "Utforska icke-dual medvetenhet—erkännandet av verklighetens enhetliga natur och uppvaknande till helhet.",
            url: "https://nondualize.org",
            logo: "/logo-nondualize.svg"
          },
          {
            name: "Communize",
            tagline: "Tillhörighet",
            description: "Bygga gemenskap och skapa allmänningar på varje nivå—från inre integration till planetärt förvaltarskap.",
            url: "https://communize.org",
            logo: "/logo-communize.svg"
          },
          {
            name: "Global Governance Frameworks",
            tagline: "Systematisering",
            description: "Designa styrningsramverk för planetär samordning och kollektiv handling på globala utmaningar.",
            url: "https://globalgovernanceframeworks.org",
            logo: "/logo-ggf.svg"
          }
        ],
        integration: "Tillsammans utforskar dessa projekt hela spektrumet av mänsklig utveckling: från uppvaknande till förståelse till förkroppsligande i gemenskap till samordning i stor skala."
      },
      support: {
        title: "Stöd",
        text: "Medan Spiralize är gratis att använda kan du, om du vill stödja projektets underhåll och utveckling, göra ett litet bidrag:",
        button: "Stöd via PayPal",
        note: "Lägg till meddelandet \"Spiralize\" med din donation. Tack!"
      },
      author: {
        title: "Om författaren",
        text: "Björn Kenneth Holmström skriver om bland annat medvetande, filosofi och spiritualitet. Utforska mer av hans arbete:",
        blog: "Besök min blogg",
        books: "Utforska mina böcker",
        projects: "Andra projekt"
      }
    }
  };

  $: t = translations[currentLanguage];

  $: title = currentLanguage === 'en'
    ? 'About Spiralize'
    : 'Om Spiralize';
    
  $: description = currentLanguage === 'en'
    ? 'Learn about Spiralize, a free platform making Spiral Dynamics accessible. Discover the mission, inspiration from Clare W. Graves, and commitment to education.'
    : 'Lär dig om Spiralize, en gratis plattform som gör Spiral Dynamics tillgänglig. Upptäck uppdraget, inspirationen från Clare W. Graves och engagemanget för utbildning.';
    
  $: keywords = currentLanguage === 'en'
    ? 'about spiralize, spiral dynamics education, clare w graves, don beck, developmental psychology, free spiral dynamics resources'
    : 'om spiralize, spiral dynamics utbildning, clare w graves, don beck, utvecklingspsykologi, gratis spiral dynamics resurser';
</script>

<SEO 
  {title}
  {description}
  {keywords}
  type="website"
/>

<div class="min-h-screen bg-gray-50">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Hero Section -->
    <div class="bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl text-white text-center px-6 py-16 mb-12">
      <h1 class="text-4xl md:text-5xl font-bold mb-4">
        {t.title}
      </h1>
      <p class="text-xl md:text-2xl mb-8 text-purple-100">
        {t.subtitle}
      </p>
    </div>

    <!-- Content Section -->
    <div class="bg-white rounded-xl shadow-sm p-8 text-gray-700">
      {#each t.paragraphs as paragraph}
        <p class="mb-6">{paragraph}</p>
      {/each}

      <!-- Related Sites Section -->
      <div class="mt-12 pt-6 border-t border-gray-200">
        <h2 class="text-2xl font-semibold mb-3 text-gray-900">{t.relatedSites.title}</h2>
        <p class="text-gray-600 mb-6">{t.relatedSites.subtitle}</p>
        
        <div class="grid md:grid-cols-2 gap-6 mb-6">
          {#each t.relatedSites.sites as site}
            <div class="bg-gradient-to-br from-gray-50 to-white rounded-lg p-6 border-2 {site.current ? 'border-purple-300 bg-purple-50' : 'border-gray-200 hover:border-gray-300'} transition-all">
              <div class="flex items-start gap-4 mb-3">
                <img src={site.logo} alt="{site.name} logo" class="w-12 h-12 flex-shrink-0" />
                <div class="flex-1">
                  <h3 class="text-lg font-semibold text-gray-900">{site.name}</h3>
                  <p class="text-sm font-medium text-gray-600">{site.tagline}</p>
                </div>
              </div>
              <p class="text-sm text-gray-700 mb-3">
                {site.description}
              </p>
              {#if site.current}
                <span class="inline-block text-sm text-purple-700 font-medium">
                  You are here
                </span>
              {:else}
                <a
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center text-sm text-purple-600 hover:text-purple-700 font-medium"
                >
                  Visit site →
                </a>
              {/if}
            </div>
          {/each}
        </div>
        
        <p class="text-sm text-gray-600 italic">
          {t.relatedSites.integration}
        </p>
      </div>

      <!-- Author Section -->
      <div class="mt-12 pt-6 border-t border-gray-200">
        <h2 class="text-lg font-medium mb-3">{t.author.title}</h2>
        <p class="text-gray-600 mb-4">{t.author.text}</p>
        <div class="flex flex-wrap gap-4">
          <a
            href="https://bjornkennethholmstrom.wordpress.com/"
            target="_blank"
            rel="noopener"
            class="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            {t.author.blog}
          </a>
          <a          
            href="https://bjornkennethholmstrom.wordpress.com/books/"
            target="_blank"
            rel="noopener"
            class="inline-block bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors text-sm"
          >
            {t.author.books}
          </a>
          <a          
            href="https://bjornkennethholmstrom.wordpress.com/code/"
            target="_blank"
            rel="noopener"
            class="inline-block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
          >
            {t.author.projects}
          </a>
        </div>
      </div>

      <!-- Support Section 
      <div class="mt-12 pt-6 border-t border-gray-200">
        <h2 class="text-lg font-medium mb-3">{t.support.title}</h2>
        <p class="text-gray-600 mb-4">{t.support.text}</p>
        <div class="flex flex-col items-start">
          <a
            href="https://www.paypal.com/donate/?hosted_button_id=FX7FQMDQBAR4N"
            target="_blank"
            rel="noopener"
            class="inline-block bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm"
          >
            {t.support.button}
          </a>
          <p class="text-sm text-gray-500 mt-2">
            {t.support.note}
          </p>
        </div>
      </div>-->

    </div>
  </div>
</div>
