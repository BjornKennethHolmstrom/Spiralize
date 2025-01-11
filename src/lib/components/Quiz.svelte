<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { quizStore, quizActions } from '../stores/quizStore';
  import { goto } from '$app/navigation';
  import { base } from '$app/paths';


  // Subscribe to store
  $: ({ questions, currentIndex: currentQuestionIndex, answers, language, hasStarted } = $quizStore);
  
  let selectedOption = null;
  let isTransitioning = false;
  
  // Colors for different stages
  const stageColors = {
    beige: '#E5D0BA',
    purple: '#9B6B9E',
    red: '#E25A53',
    blue: '#4A72B2',
    orange: '#FF7F27',
    green: '#7AB55C',
    yellow: '#FFD700',
    turquoise: '#40E0D0',
    coral: '#FF6F61',
    ultraviolet: '#9932CC'
  };

  $: currentQuestion = questions[currentQuestionIndex];
  $: shuffledOptions = currentQuestion?.shuffledOptions || [];
  $: progress = (currentQuestionIndex / questions.length) * 100;
  
  async function selectAnswer(option) {
    if (isTransitioning) return;
    
    selectedOption = option;
    isTransitioning = true;
    
    // Store the answer
    quizActions.setAnswer(currentQuestion.id, option);
    
    // Wait for feedback animation
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (currentQuestionIndex < questions.length - 1) {
      quizActions.nextQuestion();
    } else {
      showResults();
    }
    
    selectedOption = null;
    isTransitioning = false;
  }
  
  function showResults() {
    goto(`${base}/quiz/results${window.location.search}`);
  }
  
  function getProgressColor(index) {
    const question = questions[index];
    if (!answers[question?.id]) return '#E5E7EB';
    const stage = answers[question.id].relatedStages[0];
    return stageColors[stage] || '#E5E7EB';
  }
</script>

<div class="quiz-container">
  {#if currentQuestion}
    <div class="progress-spiral">
      <svg viewBox="0 0 100 100" class="spiral-progress">
        {#each Array(questions.length) as _, i}
          {@const angle = (i / questions.length) * 2 * Math.PI}
          {@const radius = 35 + (i / questions.length) * 10}
          {@const x = 50 + radius * Math.cos(angle)}
          {@const y = 50 + radius * Math.sin(angle)}
          <circle
            cx={x}
            cy={y}
            r={2}
            fill={getProgressColor(i)}
            class="progress-dot"
            class:current={i === currentQuestionIndex}
            class:completed={i < currentQuestionIndex}
          />
        {/each}
      </svg>
    </div>
    
    <div class="question-container">
      {#key currentQuestionIndex}
        <div
          class="question"
          in:fly={{ x: 100, duration: 300, easing: quintOut }}
          out:fly={{ x: -100, duration: 300, easing: quintOut }}
        >
          <h2>{currentQuestion.text[language]}</h2>

          <div class="options">
            {#each shuffledOptions as option}
              <button
                class="option"
                class:selected={selectedOption === option}
                on:click={() => selectAnswer(option)}
                disabled={isTransitioning}
                in:fade={{ delay: 200, duration: 200 }}
              >
                {option.text[language]}
              </button>
            {/each}
          </div>
        </div>
      {/key}
    </div>

    <div class="flex justify-between items-center w-full mt-4">
      <button
        class="text-gray-600 hover:text-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        on:click={() => quizActions.previousQuestion()}
        disabled={currentQuestionIndex === 0 || isTransitioning}
      >
        ← {language === 'en' ? 'Previous' : 'Föregående'}
      </button>

      <div class="progress-text">
        Question {currentQuestionIndex + 1} of {questions.length}
      </div>

      <div class="w-16">
      </div>
    </div>
  {:else}
    <div class="loading">Loading questions...</div>
  {/if}
</div>

<style>
  .quiz-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }
  
  .progress-spiral {
    width: 200px;
    height: 200px;
    margin-bottom: 2rem;
  }
  
  .spiral-progress {
    width: 100%;
    height: 100%;
    transform: rotate(-90deg);
  }
  
  .progress-dot {
    transition: all 0.3s ease;
  }
  
  .progress-dot.current {
    r: 4;
    filter: drop-shadow(0 0 4px currentColor);
  }
  
  .progress-dot.completed {
    opacity: 1;
  }
  
  .question-container {
    width: 100%;
    position: relative;
    min-height: 300px;
  }
  
  .question {
    width: 100%;
  }
  
  h2 {
    font-size: 1.5rem;
    margin-bottom: 2rem;
    text-align: center;
    line-height: 1.4;
  }
  
  .options {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .option {
    padding: 1rem 1.5rem;
    border: 2px solid #E5E7EB;
    border-radius: 0.75rem;
    background: white;
    cursor: pointer;
    text-align: left;
    font-size: 1.1rem;
    transition: all 0.2s ease;
  }
  
  .option:hover:not(:disabled) {
    border-color: #9CA3AF;
    background: #F9FAFB;
    transform: translateY(-1px);
  }
  
  .option.selected {
    border-color: #4F46E5;
    background: #EEF2FF;
  }
  
  .option:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
  
  .progress-text {
    font-size: 0.9rem;
    color: #6B7280;
  }
  
  .loading {
    text-align: center;
    color: #6B7280;
  }
</style>
