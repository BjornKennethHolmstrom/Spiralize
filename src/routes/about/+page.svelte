<!-- src/routes/about/+page.svelte -->
<script>
  import languageStore from '$lib/stores/languageStore';
  import SEO from '$lib/components/SEO.svelte';

  const { language, toggleLanguage } = languageStore; 

  $: currentLanguage = $language;

  const translations = {
    en: {
      title: "About Spiralize",
      subtitle: "Discover the purpose and mission of Spiralize.",
      
      motivation: {
        title: "Why this project exists",
        paragraphs: [
          "I created Spiralize because I find the Spiral Dynamics model profoundly enlightening about the state of our world. It offers a framework for understanding the values conflicts and cultural tensions we see around us—not as random chaos, but as predictable patterns of human development.",
          "I also believe Spiral Dynamics has been somewhat unfairly rejected by mainstream discourse, perhaps because the model itself can be triggering for certain worldviews. When you're operating from Blue (order) or Orange (achievement) consciousness, being told you're at a \"stage\" that will eventually be transcended can feel invalidating. Yet this discomfort is precisely what makes the model valuable—it reveals our own centers of gravity.",
          "We're living through a pivotal moment where tier 2 thinking is beginning to emerge at scale. The complex, interconnected challenges we face—climate change, polarization, technological disruption—cannot be solved with tier 1 consciousness alone. Both AI and Spiral Dynamics represent this tier 2 emergence: the ability to hold multiple perspectives, think systemically, and integrate rather than exclude."
        ]
      },
      
      about: {
        title: "What is Spiralize?",
        paragraphs: [
          "Spiralize is a platform designed to make the principles of Spiral Dynamics accessible and actionable. It aims to help individuals and societies understand themselves and the world better through this unique framework.",
          "The project is inspired by the work of Clare W. Graves, Don Beck, and Chris Cowan, and it offers practical tools for personal and collective growth."
        ]
      },
      
      github: {
        title: "This project is open source!",
        description: "Spiralize is open source and welcomes contributions from the community.",
        button: "View on GitHub",
        contribute: "Help improve Spiralize for everyone"
      },
      
      relatedSites: {
        title: "Related projects",
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
        title: "About the author",
        text: "Björn Kenneth Holmström writes about consciousness, philosophy, and spirituality and more. Explore more of his work:",
        blog: "Visit my blog",
        books: "Explore my books",
        projects: "Other projects"
      }
    },
    sv: {
      title: "Om Spiralize",
      subtitle: "Upptäck syftet och visionen med Spiralize.",
      
      motivation: {
        title: "Varför detta projekt finns",
        paragraphs: [
          "Jag skapade Spiralize eftersom jag finner Spiral Dynamics-modellen djupt upplysande om vår världs tillstånd. Den erbjuder ett ramverk för att förstå värdekonflikterna och kulturella spänningarna vi ser omkring oss—inte som slumpmässigt kaos, utan som förutsägbara mönster i mänsklig utveckling.",
          "Jag tror också att Spiral Dynamics har blivit något orättvist avvisat av mainstream-diskursen, kanske för att själva modellen kan vara utmanande för vissa världsbilder. När man opererar från Blå (ordning) eller Orange (prestation) medvetande kan det kännas ogiltigförklarande att bli sagt att man befinner sig på ett \"stadium\" som så småningom kommer att transcenderas. Men just detta obehag är vad som gör modellen värdefull—den avslöjar våra egna gravitationscentrum.",
          "Vi lever i en avgörande tid då nivå 2-tänkande börjar växa fram i större skala. De komplexa, sammankopplade utmaningarna vi står inför—klimatförändringar, polarisering, teknologisk disruption—kan inte lösas med enbart nivå 1-medvetande. Både AI och Spiral Dynamics representerar denna nivå 2-framväxt: förmågan att hålla flera perspektiv, tänka systemiskt och integrera snarare än utesluta."
        ]
      },
      
      about: {
        title: "Vad är Spiralize?",
        paragraphs: [
          "Spiralize är en plattform som gör principerna i Spiral Dynamics tillgängliga och användbara. Syftet är att hjälpa individer och samhällen att bättre förstå sig själva och världen genom detta unika ramverk.",
          "Projektet är inspirerat av arbetet av Clare W. Graves, Don Beck och Chris Cowan och erbjuder praktiska verktyg för personlig och kollektiv utveckling."
        ]
      },
      
      github: {
        title: "Detta projekt är öppen källkod!",
        description: "Spiralize är öppen källkod och välkomnar bidrag från gemenskapen.",
        button: "Visa på GitHub",
        contribute: "Hjälp till att förbättra Spiralize för alla"
      },
      
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
    ? 'Learn about Spiralize and why Spiral Dynamics matters in our pivotal moment of tier 2 emergence. A free platform making developmental psychology accessible.'
    : 'Lär dig om Spiralize och varför Spiral Dynamics spelar roll i vår avgörande tid av nivå 2-framväxt. En gratis plattform som gör utvecklingspsykologi tillgänglig.';
    
  $: keywords = currentLanguage === 'en'
    ? 'about spiralize, spiral dynamics education, clare w graves, don beck, tier 2 thinking, developmental psychology, systems thinking'
    : 'om spiralize, spiral dynamics utbildning, clare w graves, don beck, nivå 2 tänkande, utvecklingspsykologi, systemtänkande';
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
      
      <!-- Motivation Section -->
      <div class="mb-12">
        <h2 class="text-2xl font-semibold mb-6 text-gray-900">{t.motivation.title}</h2>
        {#each t.motivation.paragraphs as paragraph}
          <p class="mb-6 leading-relaxed">{paragraph}</p>
        {/each}
      </div>

      <!-- About Section -->
      <div class="pt-6 border-t border-gray-200">
        <h2 class="text-2xl font-semibold mb-6 text-gray-900">{t.about.title}</h2>
        {#each t.about.paragraphs as paragraph}
          <p class="mb-6">{paragraph}</p>
        {/each}
      </div>

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
                  {currentLanguage === 'en' ? 'You are here' : 'Du är här'}
                </span>
              {:else}
                <a
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center text-sm text-purple-600 hover:text-purple-700 font-medium"
                >
                  {currentLanguage === 'en' ? 'Visit site →' : 'Besök webbplatsen →'}
                </a>
              {/if}
            </div>
          {/each}
        </div>
        <p class="text-sm text-gray-600 italic">
          {t.relatedSites.integration}
        </p>


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

        <div class="mt-12 pt-6 border-t border-gray-200">
           <div class="bg-blue-50 rounded-xl shadow-sm p-6">
             <div class="flex flex-wrap items-center justify-between gap-4">
               
               <div>
                 <h3 class="font-bold text-blue-900">
                   {t.github.title}
                 </h3>
                 <p class="text-sm text-blue-700">
                   {t.github.description}
                 </p>
               </div>

               <a 
                 href="https://github.com/BjornKennethHolmstrom/Spiralize"
                 target="_blank"
                 rel="noopener noreferrer"
                 class="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors flex-shrink-0"
               >
                 <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                   <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                 </svg>
                 {t.github.button}
               </a>
             </div>
           </div>
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
