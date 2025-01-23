<!-- src/lib/components/LazyInsightSection.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import { base } from '$app/paths';

  export let stageName: string;
  export let stageColor: string;
  export let translations: any;
  export let language: string;  // Now just a string, not a store

  let sectionElement: HTMLElement;
  let isVisible = false;
  let isLoaded = false;
  let observer: IntersectionObserver;

  // Access translations directly since we're now passing the value, not the store
  $: stageContent = translations[language].stages[stageName];

  onMount(() => {
    observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoaded) {
          isVisible = true;
          isLoaded = true;
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.1
      }
    );

    observer.observe(sectionElement);

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  });
</script>

<div bind:this={sectionElement} class="bg-white rounded-xl shadow-sm overflow-hidden">
  {#if isVisible}
    <div 
      in:fade={{ duration: 300 }}
      class="p-6 border-l-4"
      style="border-color: {stageColor}"
    >
      <h3 
        class="text-xl font-semibold mb-4 flex items-center justify-between"
        style="color: {stageColor}"
      >
        {stageContent.title}
      </h3>
      <ul class="space-y-2 mb-6">
        {#each stageContent.tips as tip}
          <li class="flex items-start">
            <span class="mr-2">•</span>
            <span class="text-gray-600">{tip}</span>
          </li>
        {/each}
      </ul>
      <a 
        href="{base}/insights/stages/{stageName}"
        class="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium"
      >
        {translations[language].readMore}
        <svg class="w-5 h-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
        </svg>
      </a>
    </div>
  {:else}
    <!-- Placeholder skeleton loading state -->
    <div class="p-6 animate-pulse">
      <div class="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
      <div class="space-y-3">
        <div class="h-4 bg-gray-200 rounded w-3/4"></div>
        <div class="h-4 bg-gray-200 rounded w-5/6"></div>
        <div class="h-4 bg-gray-200 rounded w-2/3"></div>
      </div>
    </div>
  {/if}
</div>
