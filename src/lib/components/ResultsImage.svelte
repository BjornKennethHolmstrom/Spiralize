<script lang="ts">
  import { onMount } from 'svelte';
  import html2canvas from 'html2canvas';
  
  export let stageScores: Record<string, number>;
  export let dominantStage: string;
  export let secondaryStage: string;
  
  let imageContainer: HTMLDivElement;
  
  onMount(async () => {
    if (imageContainer) {
      const canvas = await html2canvas(imageContainer);
      const imageUrl = canvas.toDataURL('image/png');
      localStorage.setItem('lastResultImage', imageUrl);
    }
  });
</script>

<div
  bind:this={imageContainer}
  class="results-image-container bg-white p-8 rounded-xl shadow-sm"
  style="width: 1200px; height: 630px;"
>
  <div class="text-center mb-8">
    <h1 class="text-4xl font-bold mb-2">My Spiral Dynamics Profile</h1>
    <p class="text-xl text-gray-600">
      Primary: {dominantStage} | Secondary: {secondaryStage}
    </p>
  </div>

  <div class="results-bars">
    {#each Object.entries(stageScores) as [stage, score]}
      <div class="mb-6">
        <div class="flex justify-between mb-2">
          <span class="font-medium capitalize text-xl">{stage}</span>
          <span class="text-xl">{score}%</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-4">
          <div
            class="h-4 rounded-full"
            style="width: {score}%; background-color: var(--color-{stage})"
          ></div>
        </div>
      </div>
    {/each}
  </div>

  <div class="absolute bottom-8 left-8 right-8 text-center text-gray-500">
    Take the assessment at spiralize.example.com
  </div>
</div>

<style>
  .results-image-container {
    position: fixed;
    left: -9999px;
    top: -9999px;
  }
  
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
