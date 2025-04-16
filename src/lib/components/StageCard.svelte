<script lang="ts">
  import languageStore from '$lib/stores/languageStore';
  import type { Stage } from '$lib/data/stages.ts';

  export let stage: Stage;
  export let bindThis;
  export let expanded: boolean = false;

  let showAllQuotes = false;

  const { language } = languageStore;
  $: currentLanguage = $language;

  $: isExpanded = expanded;

  // Optional callback to inform parent
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  function toggleCard() {
    isExpanded = !isExpanded;
    dispatch('toggle', { id: stage.id, expanded: isExpanded });
  }
</script>

<div
  bind:this={bindThis}
  id={"stage-" + stage.id}
  class="stage-card p-6 border-l-[10px] rounded hover:shadow-md hover:bg-gray-50 mb-6 bg-white transition-all duration-300"
  style="border-color: {stage.hex}"
>
  <button
    on:click={toggleCard}
    class="w-full text-left flex justify-between items-center mb-2 focus:outline-none px-1 py-2 rounded transition"
    aria-expanded={isExpanded}
  >
    <h2 class="text-2xl font-bold text-gray-800">
      {stage.name[currentLanguage]}
    </h2>
    <span
      class="text-2xl text-gray-600 transition-transform duration-200"
      style="transform: rotate({isExpanded ? 180 : 0}deg);"
    >
      ⌄
    </span>
  </button>

  {#if isExpanded}
    <p class="italic text-sm text-gray-500 mb-4">✨ {stage.essence[currentLanguage]}</p>

    <div class="mb-4">
      <strong>🌱 {currentLanguage === 'en' ? 'Emergence' : 'Uppkomst'}</strong><br />
      {stage.emergence[currentLanguage]}
    </div>

    <div class="grid grid-cols-2 gap-4 mb-4">
      <div>
        <h3 class="font-semibold text-gray-700 mb-1">🧠 {currentLanguage === 'en' ? 'Key Traits' : 'Nyckeldrag'}</h3>
        <ul class="list-disc list-inside text-sm">
          {#each stage.keyTraits[currentLanguage] as trait}
            <li>{trait}</li>
          {/each}
        </ul>
      </div>
      <div>
        <h3 class="font-semibold text-gray-700 mb-1">💡 {currentLanguage === 'en' ? 'Insights' : 'Insikter'}</h3>
        <ul class="list-disc list-inside text-sm">
          {#each stage.insights[currentLanguage] as insight}
            <li>{insight}</li>
          {/each}
        </ul>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-4 mb-4">
      <div>
        <h3 class="font-semibold text-gray-700 mb-1">
          🌟 {currentLanguage === 'en' ? 'Contributions' : 'Bidrag'}
        </h3>
        <ul class="list-disc list-inside text-sm">
          {#each stage.contributions[currentLanguage] as contribution}
            <li>{contribution}</li>
          {/each}
        </ul>
      </div>

      <div>
        <h3 class="font-semibold text-gray-700 mb-1">
          🎯 {currentLanguage === 'en' ? 'Top Values' : 'Högsta värderingar'}
        </h3>
        <ul class="list-disc list-inside text-sm">
          {#each stage.topValues[currentLanguage] as value}
            <li>{value}</li>
          {/each}
        </ul>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-4 mb-4">
      <div>
        <h3 class="font-semibold text-gray-700 mb-1">⚠️ {currentLanguage === 'en' ? 'Pitfalls' : 'Fallgropar'}</h3>
        <ul class="list-disc list-inside text-sm">
          {#each stage.pitfalls[currentLanguage] as pitfall}
            <li>{pitfall}</li>
          {/each}
        </ul>
      </div>
      <div>
        <h3 class="font-semibold text-gray-700 mb-1">🚫 {currentLanguage === 'en' ? 'Triggers' : 'Triggerpunkter'}</h3>
        <ul class="list-disc list-inside text-sm">
          {#each stage.triggers[currentLanguage] as trigger}
            <li>{trigger}</li>
          {/each}
        </ul>
      </div>
    </div>

    <p class="mb-4">
      <strong>🌈 {currentLanguage === 'en' ? 'Growth Path' : 'Utvecklingsväg'}:</strong>
      {stage.growthPath[currentLanguage]}
    </p>

    <p class="mb-2">
      <strong>🧬 {currentLanguage === 'en' ? 'Archetypes' : 'Arketyper'}:</strong>
      {stage.archetypes[currentLanguage].join(', ')}
    </p>

    <h3 class="font-semibold text-gray-700 mb-1">
      🗣️ {currentLanguage === 'en' ? 'Representative Quotes' : 'Typiska citat'}
    </h3>

    <!-- First quote always shown -->
    <blockquote class="italic text-sm text-gray-600 border-l-4 border-gray-400 pl-3 mb-2">
      “{stage.quotes[currentLanguage][0]}”
    </blockquote>

    {#if showAllQuotes}
      {#each stage.quotes[currentLanguage].slice(1) as quote}
        <blockquote transition-all duration-300 aria-expanded class="italic text-sm text-gray-600 border-l-4 border-gray-300 pl-3 mb-2">
          “{quote}”
        </blockquote>
      {/each}
    {/if}

    <!-- Toggle -->
    {#if stage.quotes[currentLanguage].length > 1}
      <button
        on:click={() => showAllQuotes = !showAllQuotes}
        class="text-xs px-2 py-1 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-700"
      >
        {showAllQuotes
          ? (currentLanguage === 'en' ? 'Show fewer quotes' : 'Visa färre citat')
          : (currentLanguage === 'en' ? 'Show more quotes' : 'Visa fler citat')}
      </button>
    {/if}

  {/if}
</div>

