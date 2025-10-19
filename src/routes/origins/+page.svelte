<script lang="ts">
  import languageStore from '$lib/stores/languageStore';
  import ShareButtons from '$lib/components/ShareButtons.svelte';
  import SEO from '$lib/components/SEO.svelte';

  const { language, toggleLanguage } = languageStore; 

  $: currentLanguage = $language;

  const translations = {
    en: {
      title: "Origins of Spiral Dynamics",
      subtitle: "The Evolution of a Transformative Theory",
      sections: [
        {
          title: "Dr. Clare W. Graves",
          period: "1950s-1970s",
          content: [
            "The story of Spiral Dynamics begins with Dr. Clare W. Graves, a professor of psychology at Union College in New York. In the 1950s, Graves embarked on extensive research into human nature and development after becoming dissatisfied with the psychological theories of his time.",
            "Through years of rigorous research and data collection, Graves developed what he called the \"Emergent Cyclical Levels of Existence Theory\" (ECLET). His work revealed that human nature isn't fixed, but rather evolves through distinct systems as life conditions change.",
            "Graves identified eight major levels of human existence, each representing a fundamental shift in how people think about and experience the world. His research showed that these weren't just arbitrary categories, but reflected real neurobiological changes in human coping systems."
          ],
          quote: {
            text: "The psychology of the mature human being is an unfolding, emergent, oscillating, spiraling process marked by progressive subordination of older, lower-order behavior systems to newer, higher-order systems as man's existential problems change.",
            author: "Dr. Clare W. Graves"
          }
        },
        {
          title: "Don Beck & Chris Cowan",
          period: "1970s-1990s",
          content: [
            "In the 1970s, Dr. Don Beck and Chris Cowan began working closely with Clare Graves, studying his research and its applications. They were instrumental in developing Graves' theory into what would become Spiral Dynamics.",
            "Beck and Cowan simplified some of the terminology, developed practical applications, and created the color-coding system now synonymous with the model. They maintained the theoretical rigor while making the concepts more accessible and applicable to real-world situations.",
            "Their 1996 book \"Spiral Dynamics: Mastering Values, Leadership, and Change\" brought the theory to a wider audience and showcased its applications in business, politics, and social development."
          ]
        },
        {
          title: "Global Impact & Applications",
          period: "1990s-Present",
          content: [
            "Spiral Dynamics gained significant attention for its role in South Africa's transition from apartheid. Dr. Beck worked extensively with both Nelson Mandela's government and various stakeholders to facilitate peaceful change.",
            "The model has since been applied in numerous contexts: corporate leadership, conflict resolution, educational reform, and sustainable development. Its ability to map different value systems and worldviews has made it particularly valuable in our increasingly complex global society.",
            "Organizations worldwide have used Spiral Dynamics to understand cultural dynamics, improve communication, and navigate change processes. The theory has influenced fields ranging from organizational development to integral philosophy."
          ]
        },
        {
          title: "Further Developments",
          period: "2000s-Present",
          content: [
            "Ken Wilber incorporated aspects of Spiral Dynamics into his Integral Theory, creating what became known as Spiral Dynamics Integral (SDi). This integration brought new perspectives and applications to the model.",
            "Contemporary practitioners continue to develop and apply the model in new ways, while maintaining its core insights about the evolution of human consciousness and values systems.",
            "The theory remains relevant today, offering valuable insights into personal development, organizational change, and social transformation in our rapidly evolving world."
          ]
        }
      ],
      keyPrinciples: {
        title: "Key Principles of the Original Theory",
        principles: [
          "Human nature is not fixed but evolves through distinct stages",
          "Each stage emerges in response to specific life conditions",
          "No stage is inherently 'better' - each is appropriate for its context",
          "Individuals and societies can operate from multiple stages",
          "Understanding different value systems is key to effective change"
        ]
      }
    },
    sv: {
      title: "Spiral Dynamics Historia",
      subtitle: "Utvecklingen av en Transformativ Teori",
      sections: [
        {
          title: "Dr. Clare W. Graves",
          period: "1950-1970-talet",
          content: [
            "Historien om Spiral Dynamics börjar med Dr. Clare W. Graves, professor i psykologi vid Union College i New York. På 1950-talet påbörjade Graves omfattande forskning om mänsklig natur och utveckling efter att ha blivit missnöjd med sin tids psykologiska teorier.",
            "Genom års rigorös forskning och datainsamling utvecklade Graves vad han kallade \"Emergent Cyclical Levels of Existence Theory\" (ECLET). Hans arbete visade att den mänskliga naturen inte är fixerad, utan utvecklas genom olika system när livsvillkoren förändras.",
            "Graves identifierade åtta huvudnivåer av mänsklig existens, där var och en representerar ett grundläggande skifte i hur människor tänker om och upplever världen. Hans forskning visade att dessa inte bara var godtyckliga kategorier, utan återspeglade verkliga neurobiologiska förändringar i mänskliga hanteringssystem."
          ],
          quote: {
            text: "Psykologin hos den mogna människan är en utvecklande, framväxande, oscillerande, spiralformad process kännetecknad av progressiv underordning av äldre, lägre ordningens beteendesystem till nyare, högre ordningens system när människans existentiella problem förändras.",
            author: "Dr. Clare W. Graves"
          }
        },
        {
          title: "Don Beck & Chris Cowan",
          period: "1970-1990-talet",
          content: [
            "På 1970-talet började Dr. Don Beck och Chris Cowan arbeta nära Clare Graves, studerade hans forskning och dess tillämpningar. De var instrumentella i att utveckla Graves teori till vad som skulle bli Spiral Dynamics.",
            "Beck och Cowan förenklade viss terminologi, utvecklade praktiska tillämpningar och skapade det färgkodningssystem som nu är synonymt med modellen. De bibehöll den teoretiska rigorösheten samtidigt som de gjorde koncepten mer tillgängliga och tillämpbara i verkliga situationer.",
            "Deras bok från 1996 \"Spiral Dynamics: Mastering Values, Leadership, and Change\" förde teorin till en bredare publik och visade dess tillämpningar inom näringsliv, politik och social utveckling."
          ]
        },
        {
          title: "Global Påverkan & Tillämpningar",
          period: "1990-talet-Nu",
          content: [
            "Spiral Dynamics fick betydande uppmärksamhet för sin roll i Sydafrikas övergång från apartheid. Dr. Beck arbetade omfattande med både Nelson Mandelas regering och olika intressenter för att underlätta fredlig förändring.",
            "Modellen har sedan dess tillämpats i många sammanhang: företagsledning, konfliktlösning, utbildningsreform och hållbar utveckling. Dess förmåga att kartlägga olika värdesystem och världsåskådningar har gjort den särskilt värdefull i vårt alltmer komplexa globala samhälle.",
            "Organisationer världen över har använt Spiral Dynamics för att förstå kulturell dynamik, förbättra kommunikation och navigera förändringsprocesser. Teorin har påverkat områden från organisationsutveckling till integral filosofi."
          ]
        },
        {
          title: "Vidare Utveckling",
          period: "2000-talet-Nu",
          content: [
            "Ken Wilber införlivade aspekter av Spiral Dynamics i sin Integral Theory, och skapade vad som blev känt som Spiral Dynamics Integral (SDi). Denna integration förde nya perspektiv och tillämpningar till modellen.",
            "Samtida praktiker fortsätter att utveckla och tillämpa modellen på nya sätt, samtidigt som de bibehåller dess grundläggande insikter om evolutionen av mänskligt medvetande och värdesystem.",
            "Teorin förblir relevant idag och erbjuder värdefulla insikter om personlig utveckling, organisationsförändring och social transformation i vår snabbt föränderliga värld."
          ]
        }
      ],
      keyPrinciples: {
        title: "Ursprungsteorins Huvudprinciper",
        principles: [
          "Mänsklig natur är inte fixerad utan utvecklas genom olika stadier",
          "Varje stadium uppstår som svar på specifika livsvillkor",
          "Inget stadium är i sig 'bättre' - varje är lämpligt för sin kontext",
          "Individer och samhällen kan operera från flera stadier",
          "Förståelse för olika värdesystem är nyckeln till effektiv förändring"
        ]
      }
    }
  };

  $: t = translations[currentLanguage];

  $: title = currentLanguage === 'en'
    ? 'Origins of Spiral Dynamics'
    : 'Spiral Dynamics Historia';
    
  $: description = currentLanguage === 'en'
    ? 'Discover the history of Spiral Dynamics from Clare W. Graves\' research in the 1950s through Don Beck and Chris Cowan\'s development. Learn how this theory transformed understanding of human consciousness evolution.'
    : 'Upptäck historien om Spiral Dynamics från Clare W. Graves forskning på 1950-talet genom Don Beck och Chris Cowans utveckling. Lär dig hur denna teori transformerade förståelsen av mänsklig medvetandeutveckling.';
    
  $: keywords = currentLanguage === 'en'
    ? 'spiral dynamics history, clare w graves, don beck, chris cowan, emergent cyclical levels, consciousness development theory, value systems evolution, south africa apartheid'
    : 'spiral dynamics historia, clare w graves, don beck, chris cowan, emergent cyclical levels, medvetandeutvecklingsteori, värdesystemsutveckling, sydafrika apartheid';
</script>

<SEO 
  {title}
  {description}
  {keywords}
  type="article"
  section="Origins"
  publishedTime="2024-01-15"
/>

<div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-4xl mx-auto">
    <!-- Header -->
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">
        {t.title}
      </h1>
      <p class="text-xl text-gray-600">
        {t.subtitle}
      </p>
    </div>

    <!-- Timeline Sections -->
    <div class="space-y-12">
      {#each t.sections as section}
        <div class="bg-white rounded-xl shadow-sm p-8">
          <div class="flex items-start justify-between mb-4">
            <h2 class="text-2xl font-semibold text-gray-900">
              {section.title}
            </h2>
            <span class="text-purple-600 font-medium">
              {section.period}
            </span>
          </div>
          
          <div class="space-y-4">
            {#each section.content as paragraph}
              <p class="text-gray-600 leading-relaxed">
                {paragraph}
              </p>
            {/each}
          </div>

          {#if section.quote}
            <blockquote class="mt-6 border-l-4 border-purple-500 pl-4 italic text-gray-700">
              <p class="mb-2">{section.quote.text}</p>
              <footer class="text-sm text-gray-500">— {section.quote.author}</footer>
            </blockquote>
          {/if}
        </div>
      {/each}

      <!-- Key Principles Section -->
      <div class="bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl shadow-sm p-8 text-white">
        <h2 class="text-2xl font-semibold mb-6">
          {t.keyPrinciples.title}
        </h2>
        <ul class="space-y-3">
          {#each t.keyPrinciples.principles as principle}
            <li class="flex items-start">
              <span class="mr-2">•</span>
              <span>{principle}</span>
            </li>
          {/each}
        </ul>
      </div>
    </div>
  </div>

  <br>
  <ShareButtons />
  <br>
</div>
