<script lang="ts">
  import languageStore from '$lib/stores/languageStore';

  export let score: number = 4.2;
  export let label: { en: string, sv: string } = { en: "Resonating", sv: "Resonerar" };
  
  const { language } = languageStore;
  $: currentLanguage = $language;

  // Dynamically derive color and quote based on score
  $: color = score >= 4.6 ? '#40E0D0'
    : score >= 4.0 ? '#FFD700'
    : score >= 3.0 ? '#7AB55C'
    : score >= 2.0 ? '#E25A53'
    : '#9B6B9E';

  // Translation for quotes
  const quotes = {
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

  // Determine which quote to use based on score and language
  $: quote = score >= 4.6 ? quotes[currentLanguage].highest
    : score >= 4.0 ? quotes[currentLanguage].high
    : score >= 3.0 ? quotes[currentLanguage].medium
    : score >= 2.0 ? quotes[currentLanguage].low
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
      stroke-dasharray="{(score / 5) * 100}, 100"
    />
    <text x="18" y="20.35" class="fill-current text-gray-800 text-sm" text-anchor="middle">{score.toFixed(1)} / 5</text>
  </svg>
  <div class="text-lg font-semibold" style="color: {color}">{displayLabel}</div>
  <p class="text-sm text-gray-600 text-center max-w-xs">{quote}</p>
</div>

<style>
</style>
