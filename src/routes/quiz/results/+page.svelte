<script lang="ts">
  import { onMount } from 'svelte';
  import { quizStore, quizActions } from '$lib/stores/quizStore';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { base } from '$app/paths';
  import ResultsImage from '$lib/components/ResultsImage.svelte';
  import { dominantStageExplanations, getCombinationExplanation } from '$lib/data/stageExplanations';
  import languageStore from '$lib/stores/languageStore';

  const { language } = languageStore;
  $: currentLanguage = $language;
  
  $: ({ answers } = $quizStore);
  function getCleanShareUrl() {
    const domain = 'https://www.spiralize.org'; // or whatever your production domain is
    const path = '/quiz/results';
    const url = new URL(path, domain);
    
    // Add results data
    const resultsData = {
      stageScores,
      dominantStage,
      secondaryStage
    };
    url.searchParams.set('data', encodeURIComponent(JSON.stringify(resultsData)));
    return url.toString();
  }

  let isSharedResult = false;
  let stageScores = {};
  let dominantStage = '';
  let secondaryStage = '';

  onMount(() => {
    const urlParams = new URLSearchParams(window.location.search);
    // Get data parameter regardless of other parameters
    const sharedData = urlParams.get('data');
    const hasQuizAnswers = Object.keys(answers).length > 0;

    if (sharedData) {
      try {
        const decodedData = JSON.parse(decodeURIComponent(sharedData));
        if (decodedData.stageScores && decodedData.dominantStage && decodedData.secondaryStage) {
          stageScores = decodedData.stageScores;
          dominantStage = decodedData.dominantStage;
          secondaryStage = decodedData.secondaryStage;
          isSharedResult = !hasQuizAnswers;
        } else {
          throw new Error('Invalid data structure');
        }
      } catch (error) {
        console.error('Error parsing shared results:', error);
        goto(`${base}/quiz`);
      }
    } else if (!hasQuizAnswers) {
      goto(`${base}/quiz`);
      return;
    } else {
      calculateResults();
      // Update URL with clean share URL
      const shareUrl = getCleanShareUrl();
      history.replaceState(null, '', shareUrl);
    }
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
      coral: 0,
      ultraviolet: 0
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

    const resultsData = {
      stageScores,
      dominantStage,
      secondaryStage
    };
    const encodedResults = encodeURIComponent(JSON.stringify(resultsData));
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set('data', encodedResults);
    history.replaceState(null, '', currentUrl);
  }

  function getShareMessage() {
    return currentLanguage === 'en' 
      ? `I just discovered my Spiral Dynamics profile! My center of gravity is in ${dominantStage} with strong ${secondaryStage} influences. Take the assessment to find your profile:`
      : `Jag har just upptäckt min Spiral Dynamics-profil! Mitt gravitationscentrum är i ${dominantStage} med starka ${secondaryStage}-influenser. Ta testet för att hitta din profil:`;
  }

  function shareOnFacebook() {
    const shareUrl = getCleanShareUrl();
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(getShareMessage())}`;
    window.open(url, 'facebook-share-dialog', 'width=800,height=600');
  }

  function shareOnTwitter() {
    const shareUrl = getCleanShareUrl();
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(getShareMessage())}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, 'twitter-share-dialog', 'width=800,height=600');
  }

  function shareOnLinkedIn() {
    const shareUrl = getCleanShareUrl();
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    window.open(url, 'linkedin-share-dialog', 'width=800,height=600');
  }

  $: if (dominantStage && secondaryStage) {
    const title = currentLanguage === 'en'
      ? `My Spiral Dynamics Profile: ${dominantStage} with ${secondaryStage}`
      : `Min Spiral Dynamics Profil: ${dominantStage} med ${secondaryStage}`;
    document.title = title;
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', getShareMessage());
    document.querySelector('meta[property="twitter:title"]')?.setAttribute('content', title);
    document.querySelector('meta[property="twitter:description"]')?.setAttribute('content', getShareMessage());
  }

  let resultImageComponent: ResultsImage;
  let isDownloading = false;

  async function downloadResults() {
    if (resultImageComponent && !isDownloading) {
      isDownloading = true;
      try {
        const blob = await resultImageComponent.generateImage();
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `spiral-dynamics-profile-${new Date().toISOString().split('T')[0]}.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        }
      } catch (error) {
        console.error('Error downloading image:', error);
        alert(currentLanguage === 'en' 
          ? 'Error downloading image. Please try again.' 
          : 'Fel vid nedladdning av bild. Försök igen.');
      } finally {
        isDownloading = false;
      }
    }
  }
</script>

<svelte:head>
  <title>Your Spiral Dynamics Profile Results</title>
</svelte:head>

<div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-3xl mx-auto">
    <div class="bg-white rounded-2xl shadow-sm p-8">
      <h1 class="text-3xl font-bold text-center mb-8">
        {currentLanguage === 'en' ? 'Your Spiral Dynamics Profile' : 'Din Spiral Dynamics Profil'}
      </h1>

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

      <!-- Detailed Explanations -->
      <div class="mt-8 text-gray-700">
        <h2 class="text-2xl font-semibold mb-4">
          {currentLanguage === 'en' ? 'Understanding Your Profile' : 'Förstå Din Profil'}
        </h2>
        
        {#if dominantStage && dominantStageExplanations[dominantStage]}
          <!-- Dominant Stage Explanation -->
          <div class="mb-6">
            <h3 class="text-xl font-medium mb-2">
              {currentLanguage === 'en' ? 'Your Center of Gravity' : 'Ditt Gravitationscentrum'}
            </h3>
            <p class="mb-4">{dominantStageExplanations[dominantStage].dominant[currentLanguage]}</p>
          </div>

          <!-- Secondary Stage Explanation -->
          {#if secondaryStage && dominantStageExplanations[secondaryStage]}
            <div class="mb-6">
              <h3 class="text-xl font-medium mb-2">
                {currentLanguage === 'en' ? 'Secondary Influence' : 'Sekundärt Inflytande'}
              </h3>
              <p class="mb-4">{dominantStageExplanations[secondaryStage].secondary[currentLanguage]}</p>
            </div>
          {/if}

          <!-- Combination Explanation -->
          <div class="mb-6">
            <h3 class="text-xl font-medium mb-2">
              {currentLanguage === 'en' ? 'Your Unique Combination' : 'Din Unika Kombination'}
            </h3>
            <p>{getCombinationExplanation(dominantStage, secondaryStage, currentLanguage)}</p>
          </div>
        {/if}
      </div>

      {#if isSharedResult}
        <div class="mt-8 bg-purple-50 p-4 rounded-lg">
          <p class="text-purple-700 text-center">
            {currentLanguage === 'en' 
              ? 'This is a shared Spiral Dynamics profile. Take the assessment yourself to discover your own profile!'
              : 'Detta är en delad Spiral Dynamics-profil. Gör bedömningen själv för att upptäcka din egen profil!'}
          </p>
          <div class="text-center mt-4">
            <a 
              href="{base}/quiz"
              class="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
            >
              {currentLanguage === 'en' ? 'Take the Assessment' : 'Gör Bedömningen'}
            </a>
          </div>
        </div>
      {/if}

      <!-- Share buttons -->
      <div class="flex justify-center gap-4 mb-8">
        <button
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          on:click={shareOnFacebook}
        >
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/>
          </svg>
          {currentLanguage === 'en' ? 'Share' : 'Dela'}
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
          {currentLanguage === 'en' ? 'Share' : 'Dela'}
        </button>
      </div>

      <div class="flex justify-center gap-4 mt-8">
        <button
          on:click={() => {
            quizActions.resetQuiz();
            goto(`${base}/quiz`);
          }}
          class="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
        >
          {currentLanguage === 'en' ? 'Take Quiz Again' : 'Gör Testet Igen'}
        </button>

        <button
          on:click={downloadResults}
          disabled={isDownloading}
          class="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {#if isDownloading}
            <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          {:else}
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd"/>
            </svg>
          {/if}
          {#if isDownloading}
            {currentLanguage === 'en' ? 'Generating...' : 'Genererar...'}
          {:else}
            {currentLanguage === 'en' ? 'Download Results' : 'Ladda Ner Resultat'}
          {/if}
        </button>
      </div>

      <ResultsImage
        bind:this={resultImageComponent}
        {stageScores}
        {dominantStage}
        {secondaryStage}
        combinationDescription={getCombinationExplanation(dominantStage, secondaryStage, currentLanguage)}
        language={currentLanguage}
      />
    </div>
  </div>
</div>

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
    --color-ultraviolet: #9932CC; 
  }
</style>
