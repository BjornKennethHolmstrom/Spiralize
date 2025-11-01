<!-- src/routes/challenges/+page.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { base } from '$app/paths';
  import languageStore from '$lib/stores/languageStore';
  import SEO from '$lib/components/SEO.svelte';
  import { challenges, getChallengesForTransition, getNextStageTransition, type Challenge, type DifficultyLevel } from '$lib/data/challenges';
  import { stages } from '$lib/data/stages';
  import { challengeTracking } from '$lib/stores/challengeTrackingStore';
  import ChallengeCard from '$lib/components/ChallengeCard.svelte';
  import ProgressDashboard from '$lib/components/ProgressDashboard.svelte';

  const { language } = languageStore;
  $: currentLanguage = $language;

  // User's quiz results
  let dominantStage = '';
  let secondaryStage = '';
  let nextStage = '';
  let userChallenges: Challenge[] = [];
  let hasQuizResults = false;

  // UI state
  let selectedDifficulty: DifficultyLevel | 'all' = 'all';
  let expandedChallenges = new Set<string>();

  // Translations
  const translations = {
    en: {
      title: "Challenge Yourself",
      subtitle: "Expand your worldview through practical experiments",
      noResults: {
        title: "Take the Assessment First",
        description: "To get personalized challenges, start by discovering your center of gravity on the Spiral.",
        button: "Take the Assessment"
      },
      yourProfile: "Your Profile",
      centerOfGravity: "Center of Gravity",
      nextEvolution: "Next Evolution",
      availableChallenges: "Available Challenges",
      filterBy: "Filter by difficulty",
      all: "All",
      gentle: "Gentle Exploration",
      active: "Active Practice",
      deep: "Deep Integration",
      difficultyLevels: {
        gentle: {
          name: "Gentle",
          description: "Low-risk awareness exercises to begin exploring new perspectives"
        },
        active: {
          name: "Active",
          description: "Real-world applications that practice the new mindset"
        },
        deep: {
          name: "Deep",
          description: "Challenging perspective shifts that integrate the transition"
        }
      },
      viewDetails: "View Details",
      hideDetails: "Hide Details",
      aboutChallenges: {
        title: "About These Challenges",
        description: "Each challenge is designed to help you gently explore the next stage of consciousness development. They're experiments, not requirements - try what resonates and skip what doesn't.",
        principles: [
          "Challenges are invitations, not obligations",
          "Go at your own pace - development is non-linear",
          "Discomfort means you're growing",
          "Honor your current stage while exploring the next"
        ]
      }
    },
    sv: {
      title: "Utmana dig själv",
      subtitle: "Expandera din världsbild genom praktiska experiment",
      noResults: {
        title: "Ta bedömningen först",
        description: "För att få personliga utmaningar, börja med att upptäcka ditt gravitationscentrum på spiralen.",
        button: "Ta bedömningen"
      },
      yourProfile: "Din profil",
      centerOfGravity: "Gravitationscentrum",
      nextEvolution: "Nästa evolution",
      availableChallenges: "Tillgängliga utmaningar",
      filterBy: "Filtrera efter svårighetsgrad",
      all: "Alla",
      gentle: "Försiktig utforskning",
      active: "Aktiv praktik",
      deep: "Djup integration",
      difficultyLevels: {
        gentle: {
          name: "Försiktig",
          description: "Lågrisk medvetenhetövningar för att börja utforska nya perspektiv"
        },
        active: {
          name: "Aktiv",
          description: "Verkliga tillämpningar som praktiserar det nya tankesättet"
        },
        deep: {
          name: "Djup",
          description: "Utmanande perspektivskiften som integrerar övergången"
        }
      },
      viewDetails: "Visa detaljer",
      hideDetails: "Dölj detaljer",
      aboutChallenges: {
        title: "Om dessa utmaningar",
        description: "Varje utmaning är utformad för att hjälpa dig att försiktigt utforska nästa stadium av medvetandeutveckling. De är experiment, inte krav - prova det som känns rätt och hoppa över resten.",
        principles: [
          "Utmaningar är inbjudningar, inte skyldigheter",
          "Gå i din egen takt - utveckling är icke-linjär",
          "Obehag betyder att du växer",
          "Hedra ditt nuvarande stadium samtidigt som du utforskar nästa"
        ]
      }
    }
  };

  $: t = translations[currentLanguage];

  // Get stage color
  function getStageColor(stageId: string): string {
    const stage = stages.find(s => s.id === stageId);
    return stage?.hex || '#6B7280';
  }

  // Get stage name
  function getStageName(stageId: string): string {
    const stage = stages.find(s => s.id === stageId);
    return stage?.name[currentLanguage] || stageId;
  }

  // Toggle challenge expansion
  function toggleChallenge(challengeId: string) {
    if (expandedChallenges.has(challengeId)) {
      expandedChallenges.delete(challengeId);
    } else {
      expandedChallenges.add(challengeId);
    }
    expandedChallenges = expandedChallenges; // Trigger reactivity
  }

  // Filter challenges by difficulty
  $: filteredChallenges = selectedDifficulty === 'all' 
    ? userChallenges 
    : userChallenges.filter(c => c.difficulty === selectedDifficulty);

  onMount(() => {
    // Try to load quiz results from localStorage
    try {
      const storedResults = localStorage.getItem('spiralize_quiz_results');
      if (storedResults) {
        const results = JSON.parse(storedResults);
        dominantStage = results.dominantStage;
        secondaryStage = results.secondaryStage;
        hasQuizResults = true;

        // Get next stage and challenges
        nextStage = getNextStageTransition(dominantStage) || '';
        if (nextStage) {
          userChallenges = getChallengesForTransition(dominantStage, nextStage);
        }
      }
    } catch (error) {
      console.error('Error loading quiz results:', error);
    }
  });

  $: seoTitle = currentLanguage === 'en'
    ? 'Challenge Yourself - Spiral Dynamics Growth Exercises'
    : 'Utmana dig själv - Spiral Dynamics utvecklingsövningar';

  $: seoDescription = currentLanguage === 'en'
    ? 'Practical challenges to help you evolve through the stages of Spiral Dynamics. Personalized exercises based on your assessment results.'
    : 'Praktiska utmaningar för att hjälpa dig utvecklas genom Spiral Dynamics stadier. Personliga övningar baserade på dina bedömningsresultat.';
</script>

<SEO 
  title={seoTitle}
  description={seoDescription}
  keywords="spiral dynamics, personal growth, consciousness development, developmental exercises, worldview expansion"
  type="website"
/>

<div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-5xl mx-auto">
    
    <!-- Header -->
    <div class="text-center mb-12">
      <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
        {t.title}
      </h1>
      <p class="text-xl text-gray-600 max-w-2xl mx-auto">
        {t.subtitle}
      </p>
    </div>

    {#if !hasQuizResults}
      <!-- No quiz results - prompt to take assessment -->
      <div class="bg-white rounded-2xl shadow-sm p-12 text-center">
        <div class="text-6xl mb-6">🎯</div>
        <h2 class="text-2xl font-bold text-gray-900 mb-4">
          {t.noResults.title}
        </h2>
        <p class="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          {t.noResults.description}
        </p>
        <a
          href="{base}/quiz"
          class="inline-block bg-purple-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-purple-700 transition-colors"
        >
          {t.noResults.button}
        </a>
      </div>
    {:else}
      <!-- Profile summary -->
      <div class="bg-white rounded-2xl shadow-sm p-8 mb-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">
          {t.yourProfile}
        </h2>
        
        <div class="grid md:grid-cols-2 gap-6">
          <!-- Current stage -->
          <div class="flex items-start gap-4">
            <div 
              class="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold"
              style="background-color: {getStageColor(dominantStage)}"
            >
              {getStageName(dominantStage).charAt(0)}
            </div>
            <div>
              <div class="text-sm text-gray-500 mb-1">{t.centerOfGravity}</div>
              <div class="text-xl font-semibold">{getStageName(dominantStage)}</div>
            </div>
          </div>

          <!-- Next stage -->
          {#if nextStage}
            <div class="flex items-start gap-4">
              <div 
                class="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold"
                style="background-color: {getStageColor(nextStage)}"
              >
                {getStageName(nextStage).charAt(0)}
              </div>
              <div>
                <div class="text-sm text-gray-500 mb-1">{t.nextEvolution}</div>
                <div class="text-xl font-semibold">{getStageName(nextStage)}</div>
              </div>
            </div>
          {/if}
        </div>
      </div>

      <!-- Progress Dashboard -->
      <ProgressDashboard 
        {dominantStage}
        {nextStage}
        totalChallengesInTransition={userChallenges.length}
        {currentLanguage}
      />

      <!-- About challenges -->
      <div class="bg-blue-50 rounded-xl p-6 mb-8 border border-blue-200">
        <h3 class="text-lg font-semibold text-blue-900 mb-3">
          {t.aboutChallenges.title}
        </h3>
        <p class="text-blue-800 mb-4">
          {t.aboutChallenges.description}
        </p>
        <ul class="space-y-2">
          {#each t.aboutChallenges.principles as principle}
            <li class="flex items-start gap-2 text-blue-700">
              <span class="text-blue-500 mt-1">•</span>
              <span>{principle}</span>
            </li>
          {/each}
        </ul>
      </div>

      <!-- Difficulty filter -->
      <div class="bg-white rounded-xl shadow-sm p-6 mb-8">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">
          {t.filterBy}
        </h3>
        
        <div class="grid sm:grid-cols-4 gap-3">
          <button
            class="px-4 py-3 rounded-lg font-medium transition-colors border-2"
            class:bg-purple-100={selectedDifficulty === 'all'}
            class:border-purple-500={selectedDifficulty === 'all'}
            class:text-purple-700={selectedDifficulty === 'all'}
            class:bg-white={selectedDifficulty !== 'all'}
            class:border-gray-200={selectedDifficulty !== 'all'}
            class:text-gray-700={selectedDifficulty !== 'all'}
            on:click={() => selectedDifficulty = 'all'}
          >
            {t.all}
          </button>
          <button
            class="px-4 py-3 rounded-lg font-medium transition-colors border-2"
            class:bg-green-100={selectedDifficulty === 'gentle'}
            class:border-green-500={selectedDifficulty === 'gentle'}
            class:text-green-700={selectedDifficulty === 'gentle'}
            class:bg-white={selectedDifficulty !== 'gentle'}
            class:border-gray-200={selectedDifficulty !== 'gentle'}
            class:text-gray-700={selectedDifficulty !== 'gentle'}
            on:click={() => selectedDifficulty = 'gentle'}
          >
            {t.difficultyLevels.gentle.name}
          </button>
          <button
            class="px-4 py-3 rounded-lg font-medium transition-colors border-2"
            class:bg-yellow-100={selectedDifficulty === 'active'}
            class:border-yellow-500={selectedDifficulty === 'active'}
            class:text-yellow-700={selectedDifficulty === 'active'}
            class:bg-white={selectedDifficulty !== 'active'}
            class:border-gray-200={selectedDifficulty !== 'active'}
            class:text-gray-700={selectedDifficulty !== 'active'}
            on:click={() => selectedDifficulty = 'active'}
          >
            {t.difficultyLevels.active.name}
          </button>
          <button
            class="px-4 py-3 rounded-lg font-medium transition-colors border-2"
            class:bg-red-100={selectedDifficulty === 'deep'}
            class:border-red-500={selectedDifficulty === 'deep'}
            class:text-red-700={selectedDifficulty === 'deep'}
            class:bg-white={selectedDifficulty !== 'deep'}
            class:border-gray-200={selectedDifficulty !== 'deep'}
            class:text-gray-700={selectedDifficulty !== 'deep'}
            on:click={() => selectedDifficulty = 'deep'}
          >
            {t.difficultyLevels.deep.name}
          </button>
        </div>
      </div>

      <!-- Challenges list -->
      <div class="space-y-4">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">
          {t.availableChallenges}
        </h2>

        {#if filteredChallenges.length === 0}
          <div class="bg-white rounded-xl shadow-sm p-8 text-center text-gray-600">
            No challenges available for this filter.
          </div>
        {/if}

        {#each filteredChallenges as challenge}
          <ChallengeCard 
            {challenge}
            {currentLanguage}
            isExpanded={expandedChallenges.has(challenge.id)}
            onToggle={() => toggleChallenge(challenge.id)}
          />
        {/each}      
      </div>
    {/if}
  </div>
</div>

<style>
  /* Smooth rotation transition */
  svg {
    transition: transform 0.3s ease;
  }
</style>
