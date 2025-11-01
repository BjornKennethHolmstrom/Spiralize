<!-- src/lib/components/ChallengeCard.svelte -->
<script lang="ts">
  import { challengeTracking, getChallengeStatus, getChallengeProgress, type ChallengeProgress } from '$lib/stores/challengeTrackingStore';
  import type { Challenge } from '$lib/data/challenges';
  
  export let challenge: Challenge;
  export let currentLanguage: 'en' | 'sv';
  export let isExpanded = false;
  export let onToggle: () => void;

  // Reactive tracking data
  $: status = getChallengeStatus($challengeTracking, challenge.id);
  $: progress = getChallengeProgress($challengeTracking, challenge.id);
  $: difficultyColor = challenge.difficulty === 'gentle' ? 'green' : challenge.difficulty === 'active' ? 'yellow' : 'red';

  // Context icons
  const contextIcons = {
    'work': '💼',
    'relationships': '💝',
    'community': '👥',
    'beliefs': '🧠',
    'decisions': '⚖️',
    'daily-life': '🌅'
  };

  // Status colors and labels
  const statusConfig = {
    'not-started': {
      color: 'gray',
      label: { en: 'Not Started', sv: 'Ej påbörjad' },
      icon: '⭕'
    },
    'started': {
      color: 'blue',
      label: { en: 'Started', sv: 'Påbörjad' },
      icon: '🔵'
    },
    'in-progress': {
      color: 'yellow',
      label: { en: 'In Progress', sv: 'Pågående' },
      icon: '🟡'
    },
    'completed': {
      color: 'green',
      label: { en: 'Completed', sv: 'Slutförd' },
      icon: '✅'
    }
  };

  // Local state for reflection modal
  let showReflectionModal = false;
  let reflectionText = progress?.reflectionNotes || '';
  let showSuccessMessage = false;

  // Translations
  const t = {
    en: {
      startChallenge: 'Start Challenge',
      markInProgress: 'Mark In Progress',
      completeChallenge: 'Complete Challenge',
      addReflection: 'Add Reflection',
      editReflection: 'Edit Reflection',
      viewReflection: 'View Reflection',
      resetChallenge: 'Reset Challenge',
      context: 'Context',
      timeframe: 'Timeframe',
      theChallenge: 'The Challenge',
      reflection: 'Reflection Prompts',
      warning: 'Important Note',
      myReflection: 'My Reflection',
      reflectionPlaceholder: 'Write your thoughts, insights, or observations here...\n\nWhat did you discover?\nWhat was challenging?\nWhat surprised you?',
      saveReflection: 'Save Reflection',
      cancel: 'Cancel',
      saved: 'Reflection saved!',
      completed: 'Challenge completed!',
      startedOn: 'Started on',
      completedOn: 'Completed on',
      confirmReset: 'Are you sure you want to reset this challenge? This will delete your progress and reflection notes.',
      difficultyLevels: {
        gentle: 'Gentle',
        active: 'Active',
        deep: 'Deep'
      }
    },
    sv: {
      startChallenge: 'Starta utmaning',
      markInProgress: 'Markera som pågående',
      completeChallenge: 'Slutför utmaning',
      addReflection: 'Lägg till reflektion',
      editReflection: 'Redigera reflektion',
      viewReflection: 'Visa reflektion',
      resetChallenge: 'Återställ utmaning',
      context: 'Kontext',
      timeframe: 'Tidsram',
      theChallenge: 'Utmaningen',
      reflection: 'Reflektionsfrågor',
      warning: 'Viktigt att notera',
      myReflection: 'Min reflektion',
      reflectionPlaceholder: 'Skriv dina tankar, insikter eller observationer här...\n\nVad upptäckte du?\nVad var utmanande?\nVad överraskade dig?',
      saveReflection: 'Spara reflektion',
      cancel: 'Avbryt',
      saved: 'Reflektion sparad!',
      completed: 'Utmaning slutförd!',
      startedOn: 'Påbörjad',
      completedOn: 'Slutförd',
      confirmReset: 'Är du säker på att du vill återställa denna utmaning? Detta kommer att radera dina framsteg och reflektionsanteckningar.',
      difficultyLevels: {
        gentle: 'Försiktig',
        active: 'Aktiv',
        deep: 'Djup'
      }
    }
  };

  $: labels = t[currentLanguage];

  function handleStartChallenge() {
    challengeTracking.startChallenge(challenge.id, challenge.transition);
    showSuccessMessage = true;
    setTimeout(() => showSuccessMessage = false, 3000);
  }

  function handleMarkInProgress() {
    challengeTracking.markInProgress(challenge.id);
  }

  function handleCompleteChallenge() {
    if (progress?.reflectionNotes) {
      // Already has reflection, just mark complete
      challengeTracking.completeChallenge(challenge.id, challenge.transition, progress.reflectionNotes);
      showSuccessMessage = true;
      setTimeout(() => showSuccessMessage = false, 3000);
    } else {
      // Open reflection modal
      showReflectionModal = true;
    }
  }

  function handleSaveReflection() {
    challengeTracking.completeChallenge(challenge.id, challenge.transition, reflectionText);
    showReflectionModal = false;
    showSuccessMessage = true;
    setTimeout(() => showSuccessMessage = false, 3000);
  }

  function handleUpdateReflection() {
    challengeTracking.updateReflection(challenge.id, reflectionText);
    showReflectionModal = false;
    showSuccessMessage = true;
    setTimeout(() => showSuccessMessage = false, 3000);
  }

  function handleResetChallenge() {
    if (confirm(labels.confirmReset)) {
      challengeTracking.resetChallenge(challenge.id, challenge.transition);
      reflectionText = '';
    }
  }

  function openReflectionModal() {
    reflectionText = progress?.reflectionNotes || '';
    showReflectionModal = true;
  }

  function formatDate(dateString: string | undefined): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString(currentLanguage === 'en' ? 'en-US' : 'sv-SE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
</script>

<div class="bg-white rounded-xl shadow-sm overflow-hidden border-2 transition-all"
     class:border-purple-200={isExpanded}
     class:border-transparent={!isExpanded}
     class:border-green-300={status === 'completed' && !isExpanded}>
  
  <!-- Success message -->
  {#if showSuccessMessage}
    <div class="bg-green-500 text-white px-4 py-2 text-sm font-medium text-center">
      {status === 'completed' ? labels.completed : labels.saved}
    </div>
  {/if}

  <!-- Challenge header -->
  <button
    class="w-full p-6 text-left hover:bg-gray-50 transition-colors"
    on:click={onToggle}
  >
    <div class="flex items-start justify-between gap-4">
      <div class="flex-1">
        <div class="flex items-center gap-3 mb-2 flex-wrap">
          <span class="text-2xl">{contextIcons[challenge.context]}</span>
          <span class="px-3 py-1 rounded-full text-xs font-medium bg-{difficultyColor}-100 text-{difficultyColor}-700">
            {labels.difficultyLevels[challenge.difficulty]}
          </span>
          <span class="px-3 py-1 rounded-full text-xs font-medium bg-{statusConfig[status].color}-100 text-{statusConfig[status].color}-700 flex items-center gap-1">
            <span>{statusConfig[status].icon}</span>
            <span>{statusConfig[status].label[currentLanguage]}</span>
          </span>
        </div>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">
          {challenge.title[currentLanguage]}
        </h3>
        <p class="text-gray-600">
          {challenge.description[currentLanguage]}
        </p>
        
        <!-- Show dates if started/completed -->
        {#if progress}
          <div class="mt-2 text-sm text-gray-500 flex flex-wrap gap-4">
            {#if progress.startedAt}
              <span>📅 {labels.startedOn}: {formatDate(progress.startedAt)}</span>
            {/if}
            {#if progress.completedAt}
              <span>✅ {labels.completedOn}: {formatDate(progress.completedAt)}</span>
            {/if}
          </div>
        {/if}
      </div>
      <div class="flex-shrink-0">
        <svg 
          class="w-6 h-6 text-gray-400 transition-transform"
          class:rotate-180={isExpanded}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  </button>

  <!-- Challenge details (expanded) -->
  {#if isExpanded}
    <div class="px-6 pb-6 border-t border-gray-100">
      <div class="pt-6 space-y-6">
        
        <!-- Timeframe -->
        {#if challenge.timeframe}
          <div>
            <div class="flex items-center gap-2 mb-2">
              <span class="text-lg">⏱️</span>
              <h4 class="font-semibold text-gray-900">{labels.timeframe}</h4>
            </div>
            <p class="text-gray-700 ml-7">
              {challenge.timeframe[currentLanguage]}
            </p>
          </div>
        {/if}

        <!-- The action -->
        <div>
          <div class="flex items-center gap-2 mb-2">
            <span class="text-lg">🎯</span>
            <h4 class="font-semibold text-gray-900">{labels.theChallenge}</h4>
          </div>
          <p class="text-gray-700 ml-7 leading-relaxed">
            {challenge.action[currentLanguage]}
          </p>
        </div>

        <!-- Reflection prompts -->
        <div>
          <div class="flex items-center gap-2 mb-3">
            <span class="text-lg">💭</span>
            <h4 class="font-semibold text-gray-900">{labels.reflection}</h4>
          </div>
          <ul class="ml-7 space-y-2">
            {#each challenge.reflectionPrompts[currentLanguage] as prompt}
              <li class="flex items-start gap-2 text-gray-700">
                <span class="text-purple-500 mt-1">•</span>
                <span>{prompt}</span>
              </li>
            {/each}
          </ul>
        </div>

        <!-- User's reflection (if exists) -->
        {#if progress?.reflectionNotes}
          <div class="bg-purple-50 rounded-lg p-4 border border-purple-200">
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center gap-2">
                <span class="text-lg">📝</span>
                <h4 class="font-semibold text-purple-900">{labels.myReflection}</h4>
              </div>
              <button
                class="text-sm text-purple-600 hover:text-purple-700 font-medium"
                on:click={openReflectionModal}
              >
                {labels.editReflection}
              </button>
            </div>
            <p class="text-purple-800 whitespace-pre-wrap">
              {progress.reflectionNotes}
            </p>
          </div>
        {/if}

        <!-- Warning if present -->
        {#if challenge.warning}
          <div class="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div class="flex items-start gap-2">
              <span class="text-lg">⚠️</span>
              <div>
                <h4 class="font-semibold text-amber-900 mb-1">{labels.warning}</h4>
                <p class="text-amber-800 text-sm">
                  {challenge.warning[currentLanguage]}
                </p>
              </div>
            </div>
          </div>
        {/if}

        <!-- Action buttons -->
        <div class="pt-4 space-y-3">
          {#if status === 'not-started'}
            <button
              class="w-full bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
              on:click={handleStartChallenge}
            >
              {labels.startChallenge}
            </button>
          {:else if status === 'started'}
            <div class="grid grid-cols-2 gap-3">
              <button
                class="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                on:click={handleMarkInProgress}
              >
                {labels.markInProgress}
              </button>
              <button
                class="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
                on:click={handleCompleteChallenge}
              >
                {labels.completeChallenge}
              </button>
            </div>
          {:else if status === 'in-progress'}
            <button
              class="w-full bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
              on:click={handleCompleteChallenge}
            >
              {labels.completeChallenge}
            </button>
          {:else if status === 'completed'}
            <div class="grid grid-cols-2 gap-3">
              <button
                class="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
                on:click={openReflectionModal}
              >
                {progress?.reflectionNotes ? labels.editReflection : labels.addReflection}
              </button>
              <button
                class="bg-gray-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors"
                on:click={handleResetChallenge}
              >
                {labels.resetChallenge}
              </button>
            </div>
          {/if}
        </div>
      </div>
    </div>
  {/if}
</div>

<!-- Reflection Modal -->
{#if showReflectionModal}
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
       on:click={() => showReflectionModal = false}>
    <div class="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
         on:click|stopPropagation>
      <div class="p-6">
        <h3 class="text-2xl font-bold text-gray-900 mb-4">
          {labels.myReflection}
        </h3>
        
        <!-- Show reflection prompts for reference -->
        <div class="bg-gray-50 rounded-lg p-4 mb-4">
          <p class="text-sm font-medium text-gray-700 mb-2">{labels.reflection}:</p>
          <ul class="space-y-1">
            {#each challenge.reflectionPrompts[currentLanguage] as prompt}
              <li class="text-sm text-gray-600 flex items-start gap-2">
                <span class="text-purple-500">•</span>
                <span>{prompt}</span>
              </li>
            {/each}
          </ul>
        </div>

        <textarea
          bind:value={reflectionText}
          placeholder={labels.reflectionPlaceholder}
          class="w-full h-64 p-4 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-colors resize-none"
        ></textarea>

        <div class="flex gap-3 mt-4">
          <button
            class="flex-1 bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
            on:click={status === 'completed' ? handleUpdateReflection : handleSaveReflection}
          >
            {labels.saveReflection}
          </button>
          <button
            class="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
            on:click={() => showReflectionModal = false}
          >
            {labels.cancel}
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  svg {
    transition: transform 0.3s ease;
  }

  textarea:focus {
    outline: none;
  }
</style>
