<script lang="ts">
  import { onMount } from 'svelte';
  import { quizStore } from '$lib/stores/quizStore';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { base } from '$app/paths';
  import ResultsImage from '$lib/components/ResultsImage.svelte';


  $: ({ answers, language } = $quizStore);
  $: shareUrl = $page.url.origin + $page.url.pathname;

  let stageScores = {};
  let dominantStage = '';
  let secondaryStage = '';

  onMount(() => {
    if (Object.keys(answers).length === 0) {
      goto('${base}/quiz');
      return;
    }

    calculateResults();
  });

  function calculateResults() {
    // Initialize scores
    const scores = {
      beige: 0,
      purple: 0,
      red: 0,
      blue: 0,
      orange: 0,
      green: 0,
      yellow: 0,
      turquoise: 0,
      coral: 0
    };

    // Calculate raw scores
    Object.values(answers).forEach((answer: any) => {
      answer.relatedStages.forEach(stage => {
        scores[stage] = (scores[stage] || 0) + answer.value;
      });
    });

    // Convert to percentages
    const totalAnswers = Object.keys(answers).length;
    const percentages = Object.entries(scores).reduce((acc, [stage, score]) => {
      acc[stage] = Math.round((score / totalAnswers) * 100);
      return acc;
    }, {});

    stageScores = percentages;

    // Find dominant and secondary stages
    const sortedStages = Object.entries(percentages)
      .sort(([,a], [,b]) => b - a);
    
    dominantStage = sortedStages[0][0];
    secondaryStage = sortedStages[1][0];
  }

  function getShareMessage() {
    return `I just discovered my Spiral Dynamics profile! My center of gravity is in ${dominantStage} with strong ${secondaryStage} influences. Take the assessment to find your profile:`;
  }

  function shareOnFacebook() {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(getShareMessage())}`;
    window.open(url, 'facebook-share-dialog', 'width=800,height=600');
  }

  function shareOnTwitter() {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(getShareMessage())}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, 'twitter-share-dialog', 'width=800,height=600');
  }

  function shareOnLinkedIn() {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    window.open(url, 'linkedin-share-dialog', 'width=800,height=600');
  }

  $: if (dominantStage && secondaryStage) {
    const title = `My Spiral Dynamics Profile: ${dominantStage} with ${secondaryStage}`;
    document.title = title;
    document.querySelector('meta[property="og:title"]').setAttribute('content', title);
    document.querySelector('meta[property="og:description"]').setAttribute('content', getShareMessage());
    document.querySelector('meta[property="twitter:title"]').setAttribute('content', title);
    document.querySelector('meta[property="twitter:description"]').setAttribute('content', getShareMessage());
  }
</script>

<svelte:head>
  <title>Your Spiral Dynamics Profile Results</title>
</svelte:head>

<div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-3xl mx-auto">
    <div class="bg-white rounded-2xl shadow-sm p-8">
      <h1 class="text-3xl font-bold text-center mb-8">Your Spiral Dynamics Profile</h1>

      <!-- Results visualization -->
      <div class="results-visualization mb-8">
        {#each Object.entries(stageScores) as [stage, score]}
          <div class="mb-4">
            <div class="flex justify-between mb-1">
              <span class="font-medium capitalize">{stage}</span>
              <span>{score}%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2.5">
              <div
                class="h-2.5 rounded-full transition-all duration-1000"
                style="width: {score}%; background-color: var(--color-{stage})"
              ></div>
            </div>
          </div>
        {/each}
      </div>

      <!-- Share buttons -->
      <div class="flex justify-center gap-4 mb-8">
        <button
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          on:click={shareOnFacebook}
        >
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/>
          </svg>
          Share
        </button>

        <button
          class="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors flex items-center gap-2"
          on:click={shareOnTwitter}
        >
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.44 4.83c-.8.37-1.5.38-2.22.02.93-.56.98-.96 1.32-2.02-.88.52-1.86.9-2.9 1.1-.82-.88-2-1.43-3.3-1.43-2.5 0-4.55 2.04-4.55 4.54 0 .36.03.7.1 1.04-3.77-.2-7.12-2-9.36-4.75-.4.67-.6 1.45-.6 2.3 0 1.56.8 2.95 2 3.77-.74-.03-1.44-.23-2.05-.57v.06c0 2.2 1.56 4.03 3.64 4.44-.67.2-1.37.2-2.06.08.58 1.8 2.26 3.12 4.25 3.16C5.78 18.1 3.37 18.74 1 18.46c2 1.3 4.4 2.04 6.97 2.04 8.35 0 12.92-6.92 12.92-12.93 0-.2 0-.4-.02-.6.9-.63 1.96-1.22 2.56-2.14z"/>
          </svg>
          Tweet
        </button>

        <button
          class="px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-900 transition-colors flex items-center gap-2"
          on:click={shareOnLinkedIn}
        >
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
          </svg>
          Share
        </button>
      </div>

      <div class="text-center mt-8">
        <a
          href="{base}/quiz"
          class="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
        >
          Take Quiz Again
        </a>
      </div>
    </div>
  </div>
</div>

<ResultsImage
  {stageScores}
  {dominantStage}
  {secondaryStage}
/>

<style>
  :root {
    --color-beige: #E5D0BA;
    --color-purple: #9B6B9E;
    --color-red: #E25A53;
    --color-blue: #4A72B2;
    --color-orange: #FF7F27;
    --color-green: #7AB55C;
    --color-yellow: #FFD700;
    --color-turquoise: #40E0D0;
    --color-coral: #FF6F61;
  }
</style>
