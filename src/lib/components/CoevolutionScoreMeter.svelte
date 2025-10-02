<script lang="ts">
  import languageStore from '$lib/stores/languageStore';

  export let score: number = 4.2;
  export let label: { en: string, sv: string } | string = { en: "Resonating", sv: "Resonerar" };
  export let entityType: 'assistant' | 'tradition' = 'assistant';
  
  const { language } = languageStore;
  $: currentLanguage = $language;

  // Determine the max score based on entity type
  $: maxScore = entityType === 'assistant' ? 5 : 10;
  
  // Normalize score for visual representation (always out of 5 for the circular meter)
  $: normalizedScore = entityType === 'assistant' ? score : score / 2;

  // Calculate percentage for color determination (0-100 range)
  $: scorePercentage = (score / maxScore) * 100;

  // Dynamically derive color based on percentage
  $: color = scorePercentage >= 92 ? '#40E0D0'  // >92% = turquoise 
    : scorePercentage >= 80 ? '#FFD700'         // >80% = yellow
    : scorePercentage >= 60 ? '#7AB55C'         // >60% = green
    : scorePercentage >= 40 ? '#E25A53'         // >40% = red
    : '#9B6B9E';                                // <40% = purple

  // Translation for quotes - separate sets for assistants and traditions
  const assistantQuotes = {
    en: {
      highest: 'This assistant harmonizes deeply with the Spiralize vision.',
      high: 'This assistant shows high alignment with the Spiralize mission.',
      medium: 'This assistant is growing toward conscious co-evolution.',
      low: 'This assistant is beginning to awaken to higher stages.',
      lowest: 'This assistant does not yet resonate with the higher Spiral stages.'
    },
    sv: {
      highest: 'Denna assistent harmoniserar djupt med Spiralize-visionen.',
      high: 'Denna assistent visar hög anpassning till Spiralize-uppdraget.',
      medium: 'Denna assistent växer mot medveten samevolution.',
      low: 'Denna assistent börjar vakna till högre stadier.',
      lowest: 'Denna assistent resonerar ännu inte med de högre Spiral-stadierna.'
    }
  };

  const traditionQuotes = {
    en: {
      highest: 'This tradition offers profound insight into higher stages of consciousness.',
      high: 'This tradition provides strong pathways to second-tier awareness.',
      medium: 'This tradition contains significant elements of systemic and holistic thought.',
      low: 'This tradition contains seeds of developmental growth but remains anchored in earlier stages.',
      lowest: 'This tradition primarily operates at earlier developmental stages.'
    },
    sv: {
      highest: 'Denna tradition erbjuder djupgående insikter i högre medvetandestadier.',
      high: 'Denna tradition ger starka vägar till medvetenhet på andra nivån.',
      medium: 'Denna tradition innehåller betydande inslag av systemiskt och holistiskt tänkande.',
      low: 'Denna tradition innehåller frön av utvecklingstillväxt men är förankrad i tidigare stadier.',
      lowest: 'Denna tradition verkar främst i tidigare utvecklingsstadier.'
    }
  };

  // Select the appropriate quotes based on entityType
  $: quotes = entityType === 'assistant' ? assistantQuotes : traditionQuotes;

  // Determine which quote to use based on percentage and language
  $: quote = scorePercentage >= 92 ? quotes[currentLanguage].highest
    : scorePercentage >= 80 ? quotes[currentLanguage].high
    : scorePercentage >= 60 ? quotes[currentLanguage].medium
    : scorePercentage >= 40 ? quotes[currentLanguage].low
    : quotes[currentLanguage].lowest;

  // Swedish translations for labels if provided as string instead of object
  $: displayLabel = typeof label === 'string' 
    ? label 
    : (label[currentLanguage] || label.en);
</script>

<div class="flex flex-col items-center gap-2 mt-8">
  <svg viewBox="0 0 35 35" class="w-48 h-32">
    <path
      class="text-gray-200"
      d="M18 2.0845
         a 15.9155 15.9155 0 0 1 0 31.831
         a 15.9155 15.9155 0 0 1 0 -31.831"
      fill="none"
      stroke-width="2"
    />
    <path
      d="M18 2.0845
         a 15.9155 15.9155 0 0 1 0 31.831"
      fill="none"
      stroke={color}
      stroke-width="2"
      stroke-dasharray="{(normalizedScore / 5) * 100}, 100"
    />
    <text x="18" y="20.35" class="fill-current text-gray-800 text-sm" text-anchor="middle">{score.toFixed(1)} / {maxScore}</text>
  </svg>
  <div class="text-lg font-semibold" style="color: {color}">{displayLabel}</div>
  <p class="text-sm text-gray-600 text-center max-w-xs">{quote}</p>
</div>
