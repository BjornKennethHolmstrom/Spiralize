<script>
  import languageStore from '$lib/stores/languageStore';

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
      support: {
        title: "Support",
        text: "While Spiralize is free to use, if you'd like to support the project's maintenance and development, you can make a small contribution:",
        button: "Support via PayPal",
        note: "Please add the message \"Spiralize\" with your donation. Thank you!"
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
      support: {
        title: "Stöd",
        text: "Medan Spiralize är gratis att använda kan du, om du vill stödja projektets underhåll och utveckling, göra ett litet bidrag:",
        button: "Stöd via PayPal",
        note: "Lägg till meddelandet \"Spiralize\" med din donation. Tack!"
      }
    }
  };

  $: t = translations[currentLanguage];
</script>

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

      <!-- Support Section -->
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
      </div>
    </div>
  </div>
</div>
