<script lang="ts">
  import { onMount } from 'svelte';
  import { quizStore, quizActions } from '$lib/stores/quizStore';
  import languageStore from '$lib/stores/languageStore';
  import { goto } from '$app/navigation';
  import { base } from '$app/paths';
  import Quiz from '$lib/components/Quiz.svelte';

  const { language, toggleLanguage } = languageStore; 

  // Subscribe to the stores
  $: ({ hasStarted, isLoading, questions, currentIndex, answers } = $quizStore);
  $: currentLanguage = $language;

  // Saved results state
  let savedResults = null;
  let savedResultsDate = '';

  onMount(() => {
    // Reset quiz state first to make sure we start fresh
    quizActions.resetQuiz();

    // Check for saved results in localStorage
    try {
      const storedResults = localStorage.getItem('spiralize_quiz_results');
      if (storedResults) {
        const parsedResults = JSON.parse(storedResults);
        savedResults = parsedResults;
        // Format the timestamp for display
        if (parsedResults.timestamp) {
          const date = new Date(parsedResults.timestamp);
          savedResultsDate = date.toLocaleDateString(currentLanguage === 'en' ? 'en-US' : 'sv-SE', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          });
        }
      }
    } catch (error) {
      console.error('Error reading from localStorage:', error);
    }
  });

  function viewSavedResults() {
    goto(`${base}/quiz/results`);
  }

  function startFreshQuiz() {
    // Fully reset the quiz before starting again
    quizActions.resetQuiz();
    // Short timeout to ensure state is updated
    setTimeout(() => {
      quizActions.startQuiz();
    }, 50);
  }

  const translations = {
    en: {
      title: "Spiral Dynamics Assessment",
      description: "Discover your center of gravity in the Spiral Dynamics model through this comprehensive assessment. The test takes about 15-20 minutes to complete.",
      benefits: [
        "25 carefully designed questions",
        "Detailed profile analysis",
        "Personalized insights and recommendations"
      ],
      startButton: "Start Assessment",
      loading: "Loading assessment...",
      savedResults: {
        title: "You've already completed this assessment",
        completed: "Completed on",
        viewResults: "View Your Results",
        startFresh: "Start Fresh Assessment"
      }
    },
    sv: {
      title: "Spiral Dynamics Bedömning",
      description: "Upptäck din tyngdpunkt i Spiral Dynamics-modellen genom denna omfattande bedömning. Testet tar cirka 15-20 minuter att slutföra.",
      benefits: [
        "25 noggrant utformade frågor",
        "Detaljerad profilanalys",
        "Personliga insikter och rekommendationer"
      ],
      startButton: "Starta Bedömning",
      loading: "Laddar bedömning...",
      savedResults: {
        title: "Du har redan slutfört denna bedömning",
        completed: "Slutförd den",
        viewResults: "Visa Dina Resultat",
        startFresh: "Starta Ny Bedömning"
      }
    }
  };

  $: t = translations[currentLanguage];

  function handleStartQuiz() {
    console.log('Starting quiz...'); // Debug log
    quizActions.startQuiz();
  }

  $: title = currentLanguage === 'en'
    ? 'Spiral Dynamics Assessment | Spiralize'
    : 'Spiral Dynamics Bedömning | Spiralize';
    
  $: description = currentLanguage === 'en'
    ? 'Take our comprehensive Spiral Dynamics assessment. 25 carefully designed questions to discover your center of gravity and understand your values system.'
    : 'Ta vår omfattande Spiral Dynamics-bedömning. 25 noggrant utformade frågor för att upptäcka ditt gravitationscentrum och förstå ditt värdesystem.';
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
  {#if !hasStarted}
    <div class="max-w-3xl mx-auto text-center">
      <section aria-labelledby="quiz-title">
        <h1 class="text-4xl font-bold text-gray-900 mb-8">
          {t.title}
        </h1>
        
        {#if savedResults}
          <!-- Saved Results Card -->
          <div class="bg-white rounded-2xl shadow-sm p-8 mb-8 border-l-4 border-purple-500">
            <h2 class="text-2xl font-bold text-gray-800 mb-4">
              {t.savedResults.title}
            </h2>
            
            <div class="flex items-center justify-center mb-6">
              <div class="bg-purple-100 text-purple-800 px-4 py-2 rounded-full">
                <span class="font-medium">{t.savedResults.completed}:</span> {savedResultsDate}
              </div>
            </div>
            
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                class="bg-purple-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-purple-700 transition-colors"
                on:click={viewSavedResults}
              >
                {t.savedResults.viewResults}
              </button>
              
              <button
                class="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg text-lg font-medium hover:bg-gray-300 transition-colors"
                on:click={startFreshQuiz}
              >
                {t.savedResults.startFresh}
              </button>
            </div>
          </div>
        {/if}
        
        <!-- Assessment Info Card -->
        <div class="bg-white rounded-2xl shadow-sm p-8 mb-8">
          <p class="text-lg text-gray-600 mb-6">
            {t.description}
          </p>
          <ul class="text-left text-gray-600 mb-8 space-y-3">
            {#each t.benefits as benefit}
              <li class="flex items-center">
                <span class="text-green-500 mr-2">✓</span>
                {benefit}
              </li>
            {/each}
          </ul>
          <button
            class="bg-purple-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-purple-700 transition-colors"
            on:click={handleStartQuiz}
          >
            {t.startButton}
          </button>
        </div>
      </section>
    </div>
  {:else if isLoading}
    <div 
      class="flex items-center justify-center min-h-[50vh]"
      role="status"
      aria-live="polite"
    >
      <div class="text-lg text-gray-600">
        {t.loading}
      </div>
    </div>
  {:else if questions.length > 0}
    <Quiz />
  {/if}
</div>
