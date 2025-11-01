<!-- src/routes/contact/+page.svelte -->
<script>
  import { base } from '$app/paths';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import languageStore from '$lib/stores/languageStore';
  import SEO from '$lib/components/SEO.svelte';

  const { language, toggleLanguage } = languageStore; 
  $: currentLanguage = $language;

  // Form state
  let submitting = false;
  let success = false;
  let error = '';

  const translations = {
    en: {
      contact: "Contact me",
      welcome: "I'm excited to hear from you!",
      description: "Whether you have feedback, ideas, questions about Spiral Dynamics, or want to contribute - I'd love to connect.",
      reasons: {
        title: "Why reach out?",
        feedback: "Share feedback on the quiz or website functionality",
        ideas: "Suggest new features or content ideas",
        questions: "Ask questions about Spiral Dynamics",
        contribute: "Offer to help with translations or development",
        collaborate: "Discuss collaboration opportunities",
        other: "Anything else on your mind!"
      },
      github: {
        title: "This project is open source!",
        description: "Spiralize welcomes contributions from the community.",
        button: "View on GitHub",
        contribute: "Help improve Spiralize for everyone"
      },
      formTitle: "Send me a message",
      name: "Your name",
      email: "Your email", 
      message: "Your message",
      messagePlaceholder: "Tell me what's on your mind...",
      send: "Send message",
      sending: "Sending...",
      success: "Message sent successfully! I'll get back to you soon.",
      error: "Failed to send message. Please try again.",
      networkError: "Network error. Please check your connection."
    },
    sv: {
      contact: "Kontakta mig", 
      welcome: "Jag är glad att höra från dig!",
      description: "Oavsett om du har feedback, idéer, frågor om Spiral Dynamics eller vill bidra - så vill jag gärna höra från dig.",
      reasons: {
        title: "Varför kontakta mig?",
        feedback: "Dela feedback om testet eller webbplatsens funktionalitet",
        ideas: "Föreslå nya funktioner eller innehållsidéer", 
        questions: "Ställ frågor om Spiral Dynamics",
        contribute: "Erbjud dig att hjälpa till med översättningar eller utveckling",
        collaborate: "Diskutera samarbetsmöjligheter",
        other: "Något annat du vill dela!"
      },
      github: {
        title: "Detta projekt är öppen källkod!",
        description: "Spiralize välkomnar bidrag från gemenskapen.",
        button: "Visa på GitHub",
        contribute: "Hjälp till att förbättra Spiralize för alla"
      },
      formTitle: "Skicka ett meddelande",
      name: "Ditt namn",
      email: "Din e-post",
      message: "Ditt meddelande", 
      messagePlaceholder: "Berätta vad du har på hjärtat...",
      send: "Skicka meddelande",
      sending: "Skickar...",
      success: "Meddelandet har skickats! Jag återkommer till dig snart.",
      error: "Meddelandet kunde inte skickas. Försök igen.",
      networkError: "Nätverksfel. Kontrollera din anslutning."
    }
  };

  $: t = translations[currentLanguage];

  async function handleSubmit(event) {
    event.preventDefault();
    submitting = true;
    error = '';
    success = false;
    
    try {
      const formData = new FormData(event.target);
      
      const response = await fetch('https://formspree.io/f/mannllqz', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        // Redirect to thanks page instead of inline success
        goto(`${base}/contact/thanks`);
      } else {
        error = t.error;
      }
    } catch (err) {
      error = t.networkError;
    } finally {
      submitting = false;
    }
  }

  $: title = currentLanguage === 'en'
    ? 'Contact - Spiralize'
    : 'Kontakta - Spiralize';
    
  $: description = currentLanguage === 'en'
    ? 'Get in touch with Björn Kenneth Holmström, creator of Spiralize. Share feedback, suggest features, ask about Spiral Dynamics, or contribute to this open source project.'
    : 'Kontakta Björn Kenneth Holmström, skapare av Spiralize. Dela feedback, föreslå funktioner, fråga om Spiral Dynamics eller bidra till detta projekt med öppen källkod.';
    
  $: keywords = currentLanguage === 'en'
    ? 'contact spiralize, spiral dynamics questions, feedback, contribute, open source, personal development'
    : 'kontakta spiralize, spiral dynamics frågor, feedback, bidra, öppen källkod, personlig utveckling';
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
        {t.contact}
      </h1>
      <p class="text-xl md:text-2xl mb-4 text-purple-100">
        {t.welcome}
      </p>
      <p class="text-lg text-purple-200 max-w-2xl mx-auto">
        {t.description}
      </p>
    </div>

<div class="grid lg:grid-cols-2 gap-8 mb-12">
      
      <div class="flex flex-col gap-8">

        <div class="bg-white rounded-xl shadow-sm p-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">
            {t.reasons.title}
          </h2>
          <div class="grid sm:grid-cols-2 gap-4">
            <div class="flex items-start gap-3 p-4 bg-purple-50 rounded-lg">
              <span class="text-purple-600 text-lg">💡</span>
              <span class="text-gray-700">{t.reasons.feedback}</span>
            </div>
            <div class="flex items-start gap-3 p-4 bg-purple-50 rounded-lg">
              <span class="text-purple-600 text-lg">🚀</span>
              <span class="text-gray-700">{t.reasons.ideas}</span>
            </div>
            <div class="flex items-start gap-3 p-4 bg-purple-50 rounded-lg">
              <span class="text-purple-600 text-lg">❓</span>
              <span class="text-gray-700">{t.reasons.questions}</span>
            </div>
            <div class="flex items-start gap-3 p-4 bg-purple-50 rounded-lg">
              <span class="text-purple-600 text-lg">🌍</span>
              <span class="text-gray-700">{t.reasons.contribute}</span>
            </div>
            <div class="flex items-start gap-3 p-4 bg-purple-50 rounded-lg">
              <span class="text-purple-600 text-lg">🤝</span>
              <span class="text-gray-700">{t.reasons.collaborate}</span>
            </div>
            <div class="flex items-start gap-3 p-4 bg-purple-50 rounded-lg">
              <span class="text-purple-600 text-lg">💬</span>
              <span class="text-gray-700">{t.reasons.other}</span>
            </div>
          </div>
        </div>

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

      <div class="bg-white rounded-xl shadow-sm p-8"> 
        <h2 class="text-2xl font-bold text-gray-900 mb-6">
          {t.formTitle}
        </h2>
        
        {#if error}
          <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
            <div class="flex items-center gap-2">
              <span class="text-lg">❌</span>
              <span>{error}</span>
            </div>
          </div>
        {/if}

        <form on:submit|preventDefault={handleSubmit} class="text-gray-700">
          <div class="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
                {t.name}
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                disabled={submitting}
                class="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder={t.name}
              />
            </div>

            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                {t.email}
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                disabled={submitting}
                class="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="your@email.com"
              />
            </div>
          </div>

          <div class="mb-6">
            <label for="message" class="block text-sm font-medium text-gray-700 mb-2">
              {t.message}
            </label>
            <textarea
              name="message"
              id="message"
              rows="6"
              required
              disabled={submitting}
              class="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder={t.messagePlaceholder}
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={submitting}
            class="bg-purple-600 text-white px-8 py-4 rounded-lg font-medium hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors w-full md:w-auto flex items-center justify-center gap-2"
          >
            {#if submitting}
              <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {t.sending}
            {:else}
              {t.send}
            {/if}
          </button>
        </form>
      </div>
    </div>
  </div>
</div>
