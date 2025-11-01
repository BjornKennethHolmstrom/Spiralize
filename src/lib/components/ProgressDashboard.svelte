<!-- src/lib/components/ProgressDashboard.svelte -->
<script lang="ts">
  import { challengeTracking, challengeStats } from '$lib/stores/challengeTrackingStore';
  import { stages } from '$lib/data/stages';
  
  export let dominantStage: string;
  export let nextStage: string;
  export let totalChallengesInTransition: number;
  export let currentLanguage: 'en' | 'sv';

  // Get completed challenges for current transition
  $: transitionKey = `${dominantStage}-${nextStage}`;
  $: completedInTransition = $challengeTracking.completionsByTransition[transitionKey] || 0;
  $: progressPercentage = totalChallengesInTransition > 0 
    ? Math.round((completedInTransition / totalChallengesInTransition) * 100) 
    : 0;

  // Overall stats
  $: stats = $challengeStats;

  // Get stage info
  function getStageName(stageId: string): string {
    const stage = stages.find(s => s.id === stageId);
    return stage?.name[currentLanguage] || stageId;
  }

  function getStageColor(stageId: string): string {
    const stage = stages.find(s => s.id === stageId);
    return stage?.hex || '#6B7280';
  }

  const translations = {
    en: {
      yourProgress: 'Your Progress',
      currentTransition: 'Current Transition',
      completedChallenges: 'Completed Challenges',
      inProgress: 'In Progress',
      notStarted: 'Not Started',
      transitionProgress: 'Transition Progress',
      overallProgress: 'Overall Progress',
      keepGoing: 'Keep going!',
      wellStarted: 'Well started!',
      doingGreat: 'Doing great!',
      almostThere: 'Almost there!',
      transitionComplete: 'Transition complete!',
      congratulations: 'Congratulations!'
    },
    sv: {
      yourProgress: 'Dina framsteg',
      currentTransition: 'Nuvarande övergång',
      completedChallenges: 'Slutförda utmaningar',
      inProgress: 'Pågående',
      notStarted: 'Ej påbörjad',
      transitionProgress: 'Övergångsframsteg',
      overallProgress: 'Övergripande framsteg',
      keepGoing: 'Fortsätt så!',
      wellStarted: 'Bra start!',
      doingGreat: 'Du gör det bra!',
      almostThere: 'Nästan klar!',
      transitionComplete: 'Övergång slutförd!',
      congratulations: 'Grattis!'
    }
  };

  $: t = translations[currentLanguage];

  // Get encouraging message based on progress
  $: encouragement = progressPercentage === 0 ? t.keepGoing
    : progressPercentage < 30 ? t.wellStarted
    : progressPercentage < 70 ? t.doingGreat
    : progressPercentage < 100 ? t.almostThere
    : t.transitionComplete;

  $: celebrationEmoji = progressPercentage === 0 ? '💪'
    : progressPercentage < 30 ? '🌱'
    : progressPercentage < 70 ? '🔥'
    : progressPercentage < 100 ? '⭐'
    : '🎉';
</script>

<div class="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-200">
  <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
    <span>📊</span>
    <span>{t.yourProgress}</span>
  </h2>

  <!-- Current transition info -->
  <div class="bg-white rounded-lg p-4 mb-6 shadow-sm">
    <div class="text-sm text-gray-600 mb-2">{t.currentTransition}</div>
    <div class="flex items-center gap-3">
      <div 
        class="w-10 h-10 rounded-full flex items-center justify-center text-white text-lg font-bold"
        style="background-color: {getStageColor(dominantStage)}"
      >
        {getStageName(dominantStage).charAt(0)}
      </div>
      <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
      </svg>
      <div 
        class="w-10 h-10 rounded-full flex items-center justify-center text-white text-lg font-bold"
        style="background-color: {getStageColor(nextStage)}"
      >
        {getStageName(nextStage).charAt(0)}
      </div>
      <div class="ml-2">
        <div class="font-semibold text-gray-900">
          {getStageName(dominantStage)} → {getStageName(nextStage)}
        </div>
      </div>
    </div>
  </div>

  <!-- Transition progress bar -->
  <div class="mb-6">
    <div class="flex items-center justify-between mb-2">
      <span class="text-sm font-medium text-gray-700">{t.transitionProgress}</span>
      <span class="text-sm font-bold text-purple-600">{progressPercentage}%</span>
    </div>
    <div class="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
      <div 
        class="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-500 ease-out"
        style="width: {progressPercentage}%"
      ></div>
    </div>
    <div class="flex items-center gap-2 mt-2 text-sm text-gray-600">
      <span>{celebrationEmoji}</span>
      <span class="font-medium">{encouragement}</span>
      <span class="ml-auto">{completedInTransition} / {totalChallengesInTransition}</span>
    </div>
  </div>

  <!-- Overall stats -->
  <div class="grid grid-cols-3 gap-3">
    <div class="bg-white rounded-lg p-3 text-center shadow-sm">
      <div class="text-2xl font-bold text-green-600">
        {stats.completed}
      </div>
      <div class="text-xs text-gray-600 mt-1">
        {t.completedChallenges}
      </div>
    </div>
    <div class="bg-white rounded-lg p-3 text-center shadow-sm">
      <div class="text-2xl font-bold text-yellow-600">
        {stats.inProgress}
      </div>
      <div class="text-xs text-gray-600 mt-1">
        {t.inProgress}
      </div>
    </div>
    <div class="bg-white rounded-lg p-3 text-center shadow-sm">
      <div class="text-2xl font-bold text-gray-400">
        {stats.notStarted}
      </div>
      <div class="text-xs text-gray-600 mt-1">
        {t.notStarted}
      </div>
    </div>
  </div>

  <!-- Celebration message for 100% -->
  {#if progressPercentage === 100}
    <div class="mt-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-lg p-4 text-center">
      <div class="text-2xl mb-2">🎉 🌟 🎊</div>
      <div class="font-bold text-gray-900">{t.congratulations}</div>
      <div class="text-sm text-gray-800 mt-1">
        {currentLanguage === 'en' 
          ? "You've completed all challenges for this transition!" 
          : "Du har slutfört alla utmaningar för denna övergång!"}
      </div>
    </div>
  {/if}
</div>

<style>
  /* Smooth animation for progress bar */
  .transition-all {
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 500ms;
  }
</style>
