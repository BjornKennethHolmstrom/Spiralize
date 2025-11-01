<!-- src/lib/components/QuizLengthSelector.svelte -->
<script lang="ts">
  import { getQuizLengthInfo, type QuizLength } from '$lib/stores/quizStore';
  
  export let selectedLength: QuizLength = 15;
  export let currentLanguage: 'en' | 'sv' = 'en';
  export let onSelect: (length: QuizLength) => void;

  const lengths: QuizLength[] = [10, 15, 25];

  function handleSelect(length: QuizLength) {
    selectedLength = length;
    onSelect(length);
  }

  const translations = {
    en: {
      title: 'Choose your assessment length',
      subtitle: 'Select the version that works best for you',
      questions: 'questions'
    },
    sv: {
      title: 'Välj längd på din bedömning',
      subtitle: 'Välj den version som passar dig bäst',
      questions: 'frågor'
    }
  };

  $: t = translations[currentLanguage];
</script>

<div class="quiz-length-selector">
  <h2 class="text-2xl font-bold text-center text-gray-900 mb-2">
    {t.title}
  </h2>
  <p class="text-center text-gray-600 mb-8">
    {t.subtitle}
  </p>

  <div class="grid md:grid-cols-3 gap-6">
    {#each lengths as length}
      {@const info = getQuizLengthInfo(length, currentLanguage)}
      {@const isSelected = selectedLength === length}
      {@const isRecommended = info.recommended}
      
      <button
        class="relative flex flex-col p-6 rounded-xl border-2 transition-all text-left"
        class:border-purple-500={isSelected}
        class:bg-purple-50={isSelected}
        class:border-gray-200={!isSelected}
        class:bg-white={!isSelected}
        class:shadow-lg={isSelected}
        class:hover:border-purple-300={!isSelected}
        class:hover:shadow-md={!isSelected}
        on:click={() => handleSelect(length)}
      >
        <!-- Recommended badge -->
        {#if isRecommended}
          <div class="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
            {currentLanguage === 'en' ? 'Recommended' : 'Rekommenderad'}
          </div>
        {/if}

        <!-- Icon and title -->
        <div class="flex items-center gap-3 mb-3">
          <span class="text-3xl">{info.icon}</span>
          <div>
            <h3 class="text-lg font-bold text-gray-900">
              {info.name[currentLanguage]}
            </h3>
            <p class="text-sm text-gray-600">
              {length} {t.questions}
            </p>
          </div>
        </div>

        <!-- Duration -->
        <div class="flex items-center gap-2 mb-3">
          <span class="text-gray-500">⏱️</span>
          <span class="text-sm text-gray-700 font-medium">
            {info.duration[currentLanguage]}
          </span>
        </div>

        <!-- Description -->
        <p class="text-gray-600 mb-3 flex-grow">
          {info.description[currentLanguage]}
        </p>

        <!-- Accuracy indicator -->
        <div class="pt-3 border-t border-gray-200">
          <div class="flex items-center justify-between">
            <span class="text-xs text-gray-500 uppercase tracking-wide">
              {currentLanguage === 'en' ? 'Accuracy' : 'Noggrannhet'}
            </span>
            <span class="text-xs font-medium"
                  class:text-green-600={length === 25}
                  class:text-blue-600={length === 15}
                  class:text-gray-600={length === 10}>
              {info.accuracy[currentLanguage]}
            </span>
          </div>
        </div>

        <!-- Selection indicator -->
        {#if isSelected}
          <div class="absolute top-4 right-4 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        {/if}
      </button>
    {/each}
  </div>

  <!-- Additional info -->
  <div class="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
    <div class="flex items-start gap-3">
      <span class="text-blue-600 text-xl">ℹ️</span>
      <div class="text-sm text-blue-800">
        {#if currentLanguage === 'en'}
          <p class="font-medium mb-1">About accuracy:</p>
          <p>All versions provide useful insights. Longer assessments offer more detailed and accurate results by covering more aspects of your worldview.</p>
        {:else}
          <p class="font-medium mb-1">Om noggrannhet:</p>
          <p>Alla versioner ger användbara insikter. Längre bedömningar ger mer detaljerade och noggranna resultat genom att täcka fler aspekter av din världsbild.</p>
        {/if}
      </div>
    </div>
  </div>
</div>

<style>
  .quiz-length-selector {
    max-width: 1000px;
    margin: 0 auto;
  }

  button {
    cursor: pointer;
  }

  button:focus {
    outline: 2px solid #9333ea;
    outline-offset: 2px;
  }

  /* Smooth transitions */
  button {
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 200ms;
  }
</style>
