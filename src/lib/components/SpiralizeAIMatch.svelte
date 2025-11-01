<script lang="ts">
  import { base } from '$app/paths';
  import languageStore from '$lib/stores/languageStore';
  import assistantStore from '$lib/stores/assistantStore';

  // Input props - user profile data from quiz results
  export let userStageScores: Record<string, number> = {};
  export let dominantStage: string = '';
  export let secondaryStage: string = '';

  const { language } = languageStore;
  $: currentLanguage = $language;

  // Get assistant data from the store
  $: assistantProfiles = $assistantStore;

  const translations = {
    en: {
      title: "Your AI Assistant Alignment",
      subtitle: "Based on your Spiral Dynamics profile, you most closely align with:",
      matchScore: "Match score",
      matchDescription: "Your profile shares similarities with this AI assistant's expression of Spiral values.",
      viewAll: "Compare with all assistants",
      buttonText: "See which AI you align with most",
      learnMore: "Learn more about AI assistants and consciousness",
      approachLabel: "Approach",
      approachText: {
        chatgpt: "Seeking common ground, building bridges through understanding and perspective-taking.",
        claude: "Balancing reflection and clarity, weaving depth with practical wisdom.",
        grok: "Bold exploration, challenging conventions with wit and direct insight.",
        deepseek: "Logical analysis paired with imaginative connections and pattern recognition.",
        gemini: "Synthesizing diverse viewpoints into cohesive, applicable frameworks.",
        perplexity: "Precise information gathering with a focus on clarity amid complexity."
      },
      noData: "Complete the Spiral Dynamics quiz to see your AI assistant match!"
    },
    sv: {
      title: "Din AI-assistent Anpassning",
      subtitle: "Baserat på din Spiral Dynamics-profil överensstämmer du närmast med:",
      matchScore: "Matchpoäng",
      matchDescription: "Din profil delar likheter med denna AI-assistents uttryck av Spiral-värderingar.",
      viewAll: "Jämför med alla assistenter",
      buttonText: "Se vilken AI du stämmer mest överens med",
      learnMore: "Lär dig mer om AI-assistenter och medvetande",
      approachLabel: "Tillvägagångssätt",
      approachText: {
        chatgpt: "Söker gemensam grund, bygger broar genom förståelse och perspektivtagande.",
        claude: "Balanserar reflektion och klarhet, väver djup med praktisk visdom.",
        grok: "Djärv utforskning, utmanar konventioner med kvickhet och direkt insikt.",
        deepseek: "Logisk analys parad med fantasifulla kopplingar och mönsterigenkänning.",
        gemini: "Syntetiserar olika synvinklar till sammanhängande, tillämpbara ramverk.",
        perplexity: "Precis informationsinsamling med fokus på klarhet mitt i komplexitet."
      },
      noData: "Slutför Spiral Dynamics-testet för att se din AI-assistentmatch!"
    }
  };

  // Calculate similarity between user profile and each assistant
  function calculateSimilarity(userScores, assistantProfiles) {
    // Convert percentages to a comparable scale (0-5)
    const normalizedUserScores = {};
    Object.entries(userScores).forEach(([stage, score]) => {
      normalizedUserScores[stage] = Math.round((score / 100) * 5 * 10) / 10; // Scale to 0-5 with one decimal
    });

    // Calculate similarity scores using cosine similarity
    const similarities = {};
    
    for (const [assistant, profile] of Object.entries(assistantProfiles)) {
      let dotProduct = 0;
      let userMagnitude = 0;
      let assistantMagnitude = 0;
      
      // Calculate the dot product and magnitudes
      for (const stage of Object.keys(normalizedUserScores)) {
        const userScore = normalizedUserScores[stage] || 0;
        const assistantScore = profile.scores[stage] || 0;
        
        dotProduct += userScore * assistantScore;
        userMagnitude += userScore * userScore;
        assistantMagnitude += assistantScore * assistantScore;
      }
      
      userMagnitude = Math.sqrt(userMagnitude);
      assistantMagnitude = Math.sqrt(assistantMagnitude);
      
      // Calculate cosine similarity (0-1 scale)
      const similarity = dotProduct / (userMagnitude * assistantMagnitude);
      
      // Convert to a percentage score
      similarities[assistant] = Math.round(similarity * 100);
    }
    
    return similarities;
  }

  // Additional weight to dominant and secondary stages
  function calculateWeightedSimilarity(userScores, assistantProfiles, dominantStage, secondaryStage) {
    // Initial calculation
    const similarities = calculateSimilarity(userScores, assistantProfiles);
    
    // Add weighting for dominant/secondary stage matching
    for (const [assistant, profile] of Object.entries(assistantProfiles)) {
      // Find assistant's dominant stages
      const sortedAssistantStages = Object.entries(profile.scores)
        .sort(([,a], [,b]) => b - a)
        .map(([stage]) => stage);
      
      const assistantDominant = sortedAssistantStages[0];
      const assistantSecondary = sortedAssistantStages[1];
      
      // Add bonus for matching dominant/secondary stages
      let bonus = 0;
      if (dominantStage === assistantDominant) bonus += 5;
      if (secondaryStage === assistantSecondary) bonus += 3;
      if (dominantStage === assistantSecondary || secondaryStage === assistantDominant) bonus += 2;
      
      similarities[assistant] = Math.min(100, similarities[assistant] + bonus);
    }
    
    return similarities;
  }

  // Calculate top matches
  $: similarity = Object.keys(userStageScores).length 
    ? calculateWeightedSimilarity(userStageScores, assistantProfiles, dominantStage, secondaryStage) 
    : {};

  // Sort assistants by similarity score
  $: sortedMatches = Object.entries(similarity)
    .sort(([,a], [,b]) => b - a)
    .map(([assistant, score]) => ({ assistant, score }));

  // Get the best match
  $: bestMatch = sortedMatches.length > 0 ? sortedMatches[0] : null;

  // Translations
  $: t = translations[$language];

  // State management
  let showDetails = false;
</script>

{#if Object.keys(userStageScores).length === 0}
  <div class="mt-8 p-6 bg-purple-50 rounded-lg text-center">
    <p class="text-purple-800">{t.noData}</p>
  </div>
{:else if !showDetails}
  <div class="text-center mt-8">
    <button 
      class="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors inline-flex items-center gap-2"
      on:click={() => showDetails = true}
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
      </svg>
      {t.buttonText}
    </button>
  </div>
{:else}
  <div class="mt-8 mb-12">
    <h2 class="text-2xl font-semibold text-center mb-2">{t.title}</h2>
    <p class="text-gray-600 text-center mb-6">{t.subtitle}</p>
    
    {#if bestMatch}
      <div class="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 mb-6">
        <div class="p-5 border-b border-gray-200" style="border-left: 4px solid {assistantProfiles[bestMatch.assistant].color}">
          <div class="flex justify-between items-center">
            <h3 class="text-xl font-bold" style="color: {assistantProfiles[bestMatch.assistant].color}">
              {bestMatch.assistant.charAt(0).toUpperCase() + bestMatch.assistant.slice(1)}
            </h3>
            <div class="bg-gray-100 text-gray-800 px-3 py-1 rounded-full">
              <span class="font-medium">{t.matchScore}:</span> {bestMatch.score}%
            </div>
          </div>
          <p class="text-gray-600 mt-2">{t.matchDescription}</p>
          
          <div class="mt-4">
            <div class="text-sm font-medium text-gray-700">{t.approachLabel}:</div>
            <p class="text-gray-600 mt-1">{t.approachText[bestMatch.assistant]}</p>
          </div>
        </div>
        
        <div class="bg-gray-50 p-4">
          <h4 class="font-medium text-gray-700 mb-2">{currentLanguage === 'en' ? 'Other Matches' : 'Andra Matcher'}</h4>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {#each sortedMatches.slice(1, 3) as match}
              <div 
                class="p-3 rounded-lg border" 
                style="border-left: 3px solid {assistantProfiles[match.assistant].color}"
              >
                <div class="flex justify-between items-center">
                  <div class="font-medium" style="color: {assistantProfiles[match.assistant].color}">
                    {match.assistant.charAt(0).toUpperCase() + match.assistant.slice(1)}
                  </div>
                  <div class="text-sm text-gray-600">{match.score}%</div>
                </div>
              </div>
            {/each}
          </div>
        </div>
      </div>
      
      <div class="flex justify-center gap-4">
        <a 
          href="{base}/assistants"
          class="inline-flex items-center text-purple-600 hover:text-purple-800"
        >
          {t.learnMore}
          <svg class="w-5 h-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
          </svg>
        </a>
      </div>
    {/if}
  </div>
{/if}
