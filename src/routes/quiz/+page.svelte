<script lang="ts">
  import { onMount } from 'svelte';
  import { quizStore, quizActions } from '$lib/stores/quizStore';
  import languageStore from '$lib/stores/languageStore';
  import { goto } from '$app/navigation';
  import { base } from '$app/paths';
  import Quiz from '$lib/components/Quiz.svelte';
  import SEO from '$lib/components/SEO.svelte';

  const { language, toggleLanguage } = languageStore; 

  // Subscribe to the stores
  $: ({ hasStarted, isLoading, questions, currentIndex, answers } = $quizStore);
  $: currentLanguage = $language;

  // Saved results state
  let savedResults = null;
  let savedResultsDate = '';

  let clearConfirmation = false;

  onMount(() => {
    // Reset quiz state first to make sure we start fresh
    quizActions.resetQuiz();

    quizStore.update(state => ({
      ...state,
      hasStarted: false,
      currentIndex: 0
    }));

    // Check for saved results in localStorage
    try {
      console.log('Checking for saved results...');
      const storedResults = localStorage.getItem('spiralize_quiz_results');
      console.log('Stored results from localStorage:', storedResults);
      if (storedResults) {
        const parsedResults = JSON.parse(storedResults);
        console.log('Parsed stored results:', parsedResults);
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
      } else {
        console.log('No saved results found');
      }
    } catch (error) {
      console.error('Error reading from localStorage:', error);
    }
  });

  function viewSavedResults() {
    goto(`${base}/quiz/results`);
  }

  function clearSavedResults() {
    try {
      localStorage.removeItem('spiralize_quiz_results');
      savedResults = null; // Clear the saved results
      savedResultsDate = ''; // Clear the date
      clearConfirmation = true;
      setTimeout(() => {
        clearConfirmation = false;
      }, 3000);
    } catch (error) {
      console.error('Error clearing results from localStorage:', error);
    }
  }

  function startFreshQuiz() {
    // Fully reset the quiz before starting again
    quizActions.resetQuiz();
    quizStore.update(state => ({
      ...state,
      hasStarted: false,
      currentIndex: 0,
      answers: {}
    }));
    
    // Short timeout to ensure state is updated before starting
    setTimeout(() => {
      quizActions.startQuiz();
    }, 100);
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

  $: seoTitle = $language === 'en' 
    ? 'Spiral Dynamics Assessment'
    : 'Spiral Dynamics Bedömning';
    
  $: seoDescription = $language === 'en'
    ? 'Take our comprehensive Spiral Dynamics quiz to discover your center of gravity and understand your values evolution.'
    : 'Ta vårt omfattande Spiral Dynamics-test för att upptäcka ditt gravitationscentrum och förstå din värderingsutveckling.';
</script>

<SEO 
  title={seoTitle}
  description={seoDescription}
  keywords="spiral dynamics quiz, values assessment, consciousness test, worldview quiz"
  type="website"
/>

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
              
              <!-- Add Clear Results Button -->
              <button
                class="bg-red-100 text-red-700 px-6 py-3 rounded-lg text-lg font-medium hover:bg-red-200 transition-colors"
                on:click={clearSavedResults}
              >
                {currentLanguage === 'en' ? 'Clear Saved Results' : 'Rensa Sparade Resultat'}
              </button>
            </div>
            
            <!-- Add notification for cleared results -->
            {#if clearConfirmation}
              <div class="mt-4 bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded flex justify-between items-center transition-opacity duration-300">
                <span>
                  {currentLanguage === 'en' 
                    ? 'Your saved results have been cleared.' 
                    : 'Dina sparade resultat har rensats.'}
                </span>
                <button 
                  on:click={() => clearConfirmation = false}
                  class="text-blue-700 hover:text-blue-900"
                >
                  &times;
                </button>
              </div>
            {/if}
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
