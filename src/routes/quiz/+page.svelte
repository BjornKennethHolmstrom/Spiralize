<script lang="ts">
  import { onMount } from 'svelte';
  import { quizStore, quizActions } from '$lib/stores/quizStore';
  import languageStore from '$lib/stores/languageStore';
  import Quiz from '$lib/components/Quiz.svelte';

  const { language, toggleLanguage } = languageStore; 

  // Subscribe to the stores
  $: ({ hasStarted, isLoading, questions, currentIndex, answers } = $quizStore);
  $: currentLanguage = $language;

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
      loading: "Loading assessment..."
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
      loading: "Laddar bedömning..."
    }
  };

  $: t = translations[currentLanguage];

  function handleStartQuiz() {
    console.log('Starting quiz...'); // Debug log
    quizActions.startQuiz();
  }
</script>

<div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
  {#if !hasStarted}
    <div class="max-w-3xl mx-auto text-center">
      <section aria-labelledby="quiz-title">
        <h1 class="text-4xl font-bold text-gray-900 mb-8">
          {t.title}
        </h1>
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

