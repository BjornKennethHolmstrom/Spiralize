<script lang="ts">
  import type { StageInfo } from '../types/spiral';
  import type { Language } from '../types/spiral';

  export let stageInfo: StageInfo;
  export let stageName: string;
  export let language: Language = 'en';
  export let expanded = false;

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      expanded = !expanded;
    }
  }

  // Translation mapping
  const translations = {
    en: {
      characteristics: "Characteristics",
      challenges: "Challenges",
      growthPaths: "Growth Paths"
    },
    sv: {
      characteristics: "Karaktärsdrag",
      challenges: "Utmaningar",
      growthPaths: "Tillväxtvägar"
    }
  };

  // Get translated titles
  $: t = translations[language];
</script>

<div 
  class="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300"
  class:hover:shadow-md={!expanded}
  class:shadow-md={expanded}
>
  <button
    class="w-full p-6 text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500"
    style="border-left: 4px solid {stageInfo.color}"
    on:click={() => expanded = !expanded}
    on:keydown={handleKeyDown}
    aria-expanded={expanded}
    aria-controls="content-{stageName}"
  >
    <div class="flex justify-between items-center">
      <h3 class="text-xl font-semibold capitalize">
        {stageName} - {stageInfo.name[language]}
      </h3>
      <span
        class="text-gray-500 hover:text-gray-700 transition-colors"
        aria-hidden="true"
      >
        <svg
          class="w-6 h-6 transform transition-transform duration-200"
          class:rotate-180={expanded}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </span>
    </div>
    
    <p class="mt-2 text-gray-600">
      {stageInfo.description[language]}
    </p>
  </button>

  {#if expanded}
    <div 
      id="content-{stageName}"
      class="px-6 pb-6 pt-2 bg-gray-50"
    >
      <div class="space-y-4">
        <div>
          <h4 class="font-medium text-gray-900 mb-2">{t.characteristics}:</h4>
          <ul class="list-disc pl-5 space-y-1 text-gray-600">
            {#each stageInfo.characteristics as char}
              <li>{char[language]}</li>
            {/each}
          </ul>
        </div>

        <div>
          <h4 class="font-medium text-gray-900 mb-2">{t.challenges}:</h4>
          <ul class="list-disc pl-5 space-y-1 text-gray-600">
            {#each stageInfo.challenges as challenge}
              <li>{challenge[language]}</li>
            {/each}
          </ul>
        </div>

        <div>
          <h4 class="font-medium text-gray-900 mb-2">{t.growthPaths}:</h4>
          <ul class="list-disc pl-5 space-y-1 text-gray-600">
            {#each stageInfo.growthPaths as path}
              <li>{path[language]}</li>
            {/each}
          </ul>
        </div>
      </div>
    </div>
  {/if}
</div>

