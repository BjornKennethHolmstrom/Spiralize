<script lang="ts">
  import { onMount } from 'svelte';
  import { quizStore, quizActions, type QuizLength } from '$lib/stores/quizStore';
  import languageStore from '$lib/stores/languageStore';
  import { goto } from '$app/navigation';
  import { base } from '$app/paths';
  import Quiz from '$lib/components/Quiz.svelte';
  import QuizLengthSelector from '$lib/components/QuizLengthSelector.svelte';
  import SEO from '$lib/components/SEO.svelte';

  const { language } = languageStore; 

  // Subscribe to the stores
  $: ({ hasStarted, isLoading, questions, currentIndex, answers } = $quizStore);
  $: currentLanguage = $language;

  // Saved results state
  let savedResults = null;
  let savedResultsDate = '';

  // Confirmation dialog state
  let showConfirmDialog = false;

  // Quiz length selection
  let selectedQuizLength: QuizLength = 15; // Default to standard
  let showLengthSelector = false;

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

  function startFreshQuizConfirm() {
    showConfirmDialog = true;
  }

  function cancelFreshQuiz() {
    showConfirmDialog = false;
  }

  function startFreshQuiz() {
    // Clear saved results
    try {
      localStorage.removeItem('spiralize_quiz_results');
      savedResults = null;
      savedResultsDate = '';
    } catch (error) {
      console.error('Error clearing results from localStorage:', error);
    }

    showConfirmDialog = false;
    
    // Show length selector
    showLengthSelector = true;
  }

  function handleStartQuiz() {
    // Show length selector instead of starting immediately
    showLengthSelector = true;
  }

  function handleLengthSelected(length: QuizLength) {
    selectedQuizLength = length;
  }

  function beginQuiz() {
    // Start quiz with selected length
    quizActions.startQuiz(selectedQuizLength);
  }

  function backToStart() {
    showLengthSelector = false;
  }

  const translations = {
    en: {
      title: "Spiral Dynamics assessment",
      description: "Discover your center of gravity in the Spiral Dynamics model through this comprehensive assessment.",
      benefits: [
        "Carefully designed questions",
        "Detailed profile analysis",
        "Personalized insights and recommendations"
      ],
      startButton: "Start assessment",
      continueButton: "Continue to assessment",
      backButton: "Back",
      loading: "Loading assessment...",
      savedResults: {
        title: "You've already completed this assessment",
        completed: "Completed on",
        viewResults: "View your results",
        startFresh: "Start fresh assessment"
      },
      confirmDialog: {
        title: "Start fresh assessment?",
        message: "This will clear your saved results and start a new assessment. Your previous results will be permanently deleted.",
        warning: "This action cannot be undone.",
        confirm: "Yes, start fresh",
        cancel: "Cancel"
      }
    },
    sv: {
      title: "Spiral Dynamics bedömning",
      description: "Upptäck din tyngdpunkt i Spiral Dynamics-modellen genom denna omfattande bedömning.",
      benefits: [
        "Noggrant utformade frågor",
        "Detaljerad profilanalys",
        "Personliga insikter och rekommendationer"
      ],
      startButton: "Starta bedömning",
      continueButton: "Fortsätt till bedömning",
      backButton: "Tillbaka",
      loading: "Laddar bedömning...",
      savedResults: {
        title: "Du har redan slutfört denna bedömning",
        completed: "Slutförd den",
        viewResults: "Visa dina resultat",
        startFresh: "Starta ny bedömning"
      },
      confirmDialog: {
        title: "Starta ny bedömning?",
        message: "Detta kommer att rensa dina sparade resultat och starta en ny bedömning. Dina tidigare resultat kommer att raderas permanent.",
        warning: "Denna åtgärd kan inte ångras.",
        confirm: "Ja, starta ny",
        cancel: "Avbryt"
      }
    }
  };

  $: t = translations[currentLanguage];

  $: seoTitle = $language === 'en' 
    ? 'Spiral Dynamics assessment'
    : 'Spiral Dynamics bedömning';
    
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
  {#if !hasStarted && !showLengthSelector}
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
                class="bg-orange-500 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-orange-600 transition-colors"
                on:click={startFreshQuizConfirm}
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
  {:else if showLengthSelector && !hasStarted}
    <!-- Quiz Length Selection -->
    <div class="max-w-5xl mx-auto">
      <QuizLengthSelector 
        bind:selectedLength={selectedQuizLength}
        {currentLanguage}
        onSelect={handleLengthSelected}
      />
      
      <!-- Action buttons -->
      <div class="flex justify-center gap-4 mt-8">
        <button
          class="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
          on:click={backToStart}
        >
          ← {t.backButton}
        </button>
        <button
          class="bg-purple-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-purple-700 transition-colors"
          on:click={beginQuiz}
        >
          {t.continueButton} →
        </button>
      </div>
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

<!-- Confirmation Dialog Modal -->
{#if showConfirmDialog}
  <div 
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    on:click={cancelFreshQuiz}
  >
    <div 
      class="bg-white rounded-xl shadow-xl max-w-md w-full p-6"
      on:click|stopPropagation
    >
      <div class="mb-4">
        <h3 class="text-xl font-bold text-gray-900 mb-2">
          {t.confirmDialog.title}
        </h3>
        <p class="text-gray-600 mb-3">
          {t.confirmDialog.message}
        </p>
        <div class="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-start gap-2">
          <span class="text-amber-600 text-xl">⚠️</span>
          <p class="text-sm text-amber-800">
            {t.confirmDialog.warning}
          </p>
        </div>
      </div>

      <div class="flex gap-3">
        <button
          class="flex-1 bg-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors"
          on:click={startFreshQuiz}
        >
          {t.confirmDialog.confirm}
        </button>
        <button
          class="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
          on:click={cancelFreshQuiz}
        >
          {t.confirmDialog.cancel}
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  .z-50 {
    z-index: 50;
  }
</style>
