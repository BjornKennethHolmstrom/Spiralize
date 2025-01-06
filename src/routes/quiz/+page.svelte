<script lang="ts">
  import { onMount } from 'svelte';
  import { quizStore, quizActions } from '$lib/stores/quizStore';
  import Quiz from '$lib/components/Quiz.svelte';

  // Subscribe to the store
  $: ({ hasStarted, isLoading, questions, currentIndex, answers } = $quizStore);

  function handleStartQuiz() {
    console.log('Starting quiz...'); // Debug log
    quizActions.startQuiz();
  }
</script>

<div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
  {#if !hasStarted}
    <div class="max-w-3xl mx-auto text-center">
      <h1 class="text-4xl font-bold text-gray-900 mb-8">
        Spiral Dynamics Assessment
      </h1>
      <div class="bg-white rounded-2xl shadow-sm p-8 mb-8">
        <p class="text-lg text-gray-600 mb-6">
          Discover your center of gravity in the Spiral Dynamics model through this comprehensive assessment. 
          The test takes about 15-20 minutes to complete.
        </p>
        <ul class="text-left text-gray-600 mb-8 space-y-3">
          <li class="flex items-center">
            <span class="text-green-500 mr-2">✓</span>
            25 carefully designed questions
          </li>
          <li class="flex items-center">
            <span class="text-green-500 mr-2">✓</span>
            Detailed profile analysis
          </li>
          <li class="flex items-center">
            <span class="text-green-500 mr-2">✓</span>
            Personalized insights and recommendations
          </li>
        </ul>
        <button
          class="bg-purple-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-purple-700 transition-colors"
          on:click={handleStartQuiz}
        >
          Start Assessment
        </button>
      </div>
    </div>
  {:else if isLoading}
    <div class="flex items-center justify-center min-h-[50vh]">
      <div class="text-lg text-gray-600">
        Loading assessment...
      </div>
    </div>
  {:else if questions.length > 0}
    <Quiz />
  {/if}
</div>
