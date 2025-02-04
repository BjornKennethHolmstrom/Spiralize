<script lang="ts">
  import languageStore from '$lib/stores/languageStore';
  import { base } from '$app/paths';

  const { language } = languageStore; 

  $: currentLanguage = $language;

  const translations = {
    en: {
      title: "Thank You!",
      message: "Your message has been sent successfully. We'll get back to you as soon as possible.",
      backHome: "Return to Home",
      backToContact: "Send Another Message"
    },
    sv: {
      title: "Tack!",
      message: "Ditt meddelande har skickats. Vi återkommer till dig så snart som möjligt.",
      backHome: "Tillbaka till Startsidan",
      backToContact: "Skicka ett Nytt Meddelande"
    }
  };

  $: t = translations[currentLanguage];

  $: title = currentLanguage === 'en'
    ? 'Message Sent | Spiralize'
    : 'Meddelande Skickat | Spiralize';
    
  $: description = currentLanguage === 'en'
    ? 'Thank you for contacting Spiralize. We will get back to you soon.'
    : 'Tack för att du kontaktar Spiralize. Vi återkommer till dig snart.';
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
      <div class="mb-8 text-6xl">✨</div>
      <h1 class="text-4xl md:text-5xl font-bold mb-4">
        {t.title}
      </h1>
      <p class="text-xl md:text-2xl mb-8 text-purple-100">
        {t.message}
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a 
          href="{base}/"
          class="inline-block bg-white text-purple-600 px-8 py-3 rounded-lg font-medium hover:bg-purple-50 transition-colors"
        >
          {t.backHome}
        </a>
        <a 
          href="{base}/contact"
          class="inline-block bg-purple-700 text-white px-8 py-3 rounded-lg font-medium hover:bg-purple-600 transition-colors"
        >
          {t.backToContact}
        </a>
      </div>
    </div>
  </div>
</div>
