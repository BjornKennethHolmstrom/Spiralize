<script lang="ts">
  import { onMount } from 'svelte';
  import html2canvas from 'html2canvas';
  
  export let stageScores: Record<string, number>;
  export let dominantStage: string;
  export let secondaryStage: string;
  export let combinationDescription: string;
  export let language: 'en' | 'sv';
  
  let imageContainer: HTMLDivElement;

  export async function generateImage() {
    if (imageContainer) {
      const canvas = await html2canvas(imageContainer, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false
      });
      
      return new Promise(resolve => {
        canvas.toBlob(resolve, 'image/png', 1.0);
      });
    }
    return null;
  }
</script>

<div
  bind:this={imageContainer}
  class="results-image-container bg-white p-12 rounded-xl shadow-sm"
  style="position: absolute; left: -9999px; top: -9999px; width: 1200px; height: 1200px;"
>
  <div class="text-center mb-12">
    <h1 class="text-4xl font-bold mb-4">
      {language === 'en' ? 'My Spiral Dynamics Profile' : 'Min Spiral Dynamics Profil'}
    </h1>
    <p class="text-2xl text-gray-600 mb-6">
      {language === 'en' ? 'Primary:' : 'Primär:'} {dominantStage} | 
      {language === 'en' ? 'Secondary:' : 'Sekundär:'} {secondaryStage}
    </p>
    <p class="text-lg text-gray-700 max-w-4xl mx-auto px-8">
      {combinationDescription}
    </p>
  </div>

  <div class="results-bars max-w-4xl mx-auto px-8">
    {#each Object.entries(stageScores) as [stage, score]}
      <div class="mb-8">
        <div class="flex justify-between mb-2">
          <span class="font-medium capitalize text-xl">{stage}</span>
          <span class="text-xl">{score}%</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-5">
          <div
            class="h-5 rounded-full"
            style="width: {score}%; background-color: var(--color-{stage})"
          ></div>
        </div>
      </div>
    {/each}
  </div>

  <div class="absolute bottom-12 left-12 right-12 text-center text-gray-500">
    spiralize.example.com
  </div>
</div>

<style>
  :global(:root) {
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
