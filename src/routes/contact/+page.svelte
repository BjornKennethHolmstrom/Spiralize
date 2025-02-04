<script>
  import { base } from '$app/paths';
  import { onMount } from 'svelte';
  import languageStore from '$lib/stores/languageStore';

  let redirectUrl = '';
  onMount(() => {
    // Make sure we have the complete URL including protocol
    redirectUrl = `${window.location.protocol}//${window.location.host}${base}/contact/thanks`;
  });

  const { language, toggleLanguage } = languageStore; 

  $: currentLanguage = $language;

  const translations = {
    en: {
      contact: "Contact Us",
      form: "We'd love to hear from you. Fill out the form below!",
      name: "Your Name",
      email: "Your Email",
      message: "Your Message",
      send: "Send Message"
    },
    sv: {
      contact: "Kontakta Oss",
      form: "Vi vill gärna höra från dig. Fyll i formuläret nedan!",
      name: "Ditt Namn",
      email: "Din E-post",
      message: "Ditt Meddelande",
      send: "Skicka Meddelande"
    }
  };

  $: t = translations[currentLanguage];

  $: title = currentLanguage === 'en'
    ? 'Contact Us | Spiralize'
    : 'Kontakta Oss | Spiralize';
    
  $: description = currentLanguage === 'en'
    ? 'Get in touch with the Spiralize team. Share your feedback, ask questions, or inquire about Spiral Dynamics and personal development.'
    : 'Kontakta Spiralize-teamet. Dela din feedback, ställ frågor eller fråga om Spiral Dynamics och personlig utveckling.';
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
      <h1 class="text-4xl md:text-5xl font-bold mb-4">
        {t.contact}
      </h1>
      <p class="text-xl md:text-2xl mb-8 text-purple-100">
        {t.form}
      </p>
    </div>

    <!-- Contact Form -->
    <form
      action="https://formspree.io/f/mannllqz"
      method="POST"
      class="bg-white rounded-xl shadow-sm p-8 text-gray-700"
    >
      <input type="hidden" name="_next" value={redirectUrl} />
      <input type="hidden" name="_subject" value="Spiralize" />
      <div class="mb-6">
        <label
          for="name"
          class="block text-sm font-medium text-gray-700 mb-2"
        >
          {t.name}
        </label>
        <input
          type="text"
          name="name"
          id="name"
          required
          class="block w-full px-4 py-2 border rounded-lg focus:ring-purple-500 focus:border-purple-500"
        />
      </div>

      <div class="mb-6">
        <label
          for="email"
          class="block text-sm font-medium text-gray-700 mb-2"
        >
          {t.email}
        </label>
        <input
          type="email"
          name="email"
          id="email"
          required
          class="block w-full px-4 py-2 border rounded-lg focus:ring-purple-500 focus:border-purple-500"
        />
      </div>

      <div class="mb-6">
        <label
          for="message"
          class="block text-sm font-medium text-gray-700 mb-2"
        >
          {t.message}
        </label>
        <textarea
          name="message"
          id="message"
          rows="4"
          required
          class="block w-full px-4 py-2 border rounded-lg focus:ring-purple-500 focus:border-purple-500"
        ></textarea>
      </div>

      <button
        type="submit"
        class="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
      >
        {t.send}
      </button>
    </form>
  </div>
</div>

