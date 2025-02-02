<script lang="ts">
  import { stages } from '$lib/data/stages';
  import { createEventDispatcher } from 'svelte';
  import type { Language } from '../types/spiral';

  export let language: Language = 'en';
  export let activeStage: string | null = null;

  const dispatch = createEventDispatcher();

  const centerX = 400;
  const centerY = 400;
  const stageCount = Object.keys(stages).length;

  // Spiral configuration
  const rotations = 2.25; // Number of full rotations
  const spacing = 28; // Spacing between stages
  const spiralPathSegments = 500; // Number of segments for smoothness

  // Generate points for stages
  const stagePoints = Object.entries(stages).map(([stageName, info], index) => {
    const angle = (index / stageCount) * Math.PI * 2 * rotations; // Angle for each stage
    const radius = 50 + (index * spacing); // Radius increases for each stage
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);

    return {
      stageName,
      info,
      x,
      y,
      angle,
    };
  });

  // Generate continuous spiral path
  const spiralPath = Array.from({ length: spiralPathSegments }).map((_, i) => {
    const t = i / (spiralPathSegments - 1); // Normalize to 0-1 range
    const angle = t * Math.PI * 2 * rotations;
    const radius = 50 + t * (stageCount - 1) * spacing;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);

    return { x, y };
  });

  function handleStageClick(stageName: string) {
    dispatch('stageSelect', { stage: stageName });
  }

  function handleKeyDown(event: KeyboardEvent, stageName: string) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleStageClick(stageName);
    }
  }
</script>

<div 
  class="spiral-diagram w-full max-w-4xl mx-auto"
  role="region"
  aria-label={language === 'en' ? 'Spiral Dynamics stages visualization' : 'Visualisering av Spiral Dynamics stadier'}
>
  <svg 
    viewBox="0 0 750 750" 
    class="w-full h-auto"
    role="img"
    aria-label={language === 'en' ? 'Interactive spiral showing all developmental stages' : 'Interaktiv spiral som visar alla utvecklingsstadier'}
  >
    <!-- Background -->
    <rect width="100%" height="100%" fill="#F8FAFC" />

    <!-- Smooth Spiral Path -->
    <path
      d={`M ${spiralPath.map((p) => `${p.x},${p.y}`).join(' L ')}`}
      fill="none"
      stroke="url(#spiralGradient)"
      stroke-width="4"
      opacity="0.8"
      stroke-linecap="round"
    />

    <!-- Gradient Definition -->
    <defs>
      <linearGradient id="spiralGradient" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stop-color="#CBD5E1" />
        <stop offset="100%" stop-color="#94A3B8" />
      </linearGradient>
    </defs>

    <!-- Stage Dots and Labels -->
    {#each stagePoints as point}
      <g
        role="button"
        tabindex="0"
        class="stage-group cursor-pointer transform transition-transform duration-150 hover:scale-105"
        class:active={activeStage === point.stageName}
        on:click={() => handleStageClick(point.stageName)}
        on:keydown={(e) => handleKeyDown(e, point.stageName)}
        aria-label={language === 'en' 
          ? `${point.stageName} stage: ${point.info.name[language]}. Press Enter to learn more.`
          : `${point.stageName}-stadiet: ${point.info.name[language]}. Tryck Enter för att lära dig mer.`
        }
        aria-pressed={activeStage === point.stageName}
      >
        <!-- Dot -->
        <circle
          cx={point.x}
          cy={point.y}
          r="15"
          fill={point.info.color}
          class="transition-opacity duration-150"
          opacity={activeStage === point.stageName ? "1" : "0.8"}
          aria-hidden="true"
        />

        <!-- Stage Name Label -->
        <text
          x={point.x}
          y={point.y + 30} 
          text-anchor="middle"
          class="text-sm font-medium capitalize"
          fill="#4B5563"
          aria-hidden="true"
        >
          {point.info.name[language]}
        </text>

        <!-- Individual/Collective Indicator (Hidden by default, shown on hover) -->
        <text
          x={point.x}
          y={point.y + 50}
          text-anchor="middle"
          class="text-xs font-medium opacity-0 transition-opacity duration-150"
          fill={point.info.focus[language] === 'Individual' ? '#3B82F6' : '#10B981'}
          aria-hidden="true"
        >
          {point.info.focus[language]}
        </text>
      </g>
    {/each}

    <!-- Center Label -->
    <text
      x={centerX - 200}
      y={centerY - 275}
      text-anchor="middle"
      class="text-lg font-semibold"
      fill="#374151"
      role="heading"
      aria-level="2"
    >
      {language === 'en' ? 'Evolution of Consciousness' : 'Medvetandets Evolution'}
    </text>
  </svg>

  <!-- Screen reader only instructions -->
  <div class="sr-only">
    {language === 'en' 
      ? 'Use Tab key to navigate between stages, Enter or Space to select a stage and learn more about it.'
      : 'Använd Tab-tangenten för att navigera mellan stadier, Enter eller Mellanslag för att välja ett stadium och lära dig mer om det.'
    }
  </div>
</div>

<style>
  .stage-group:hover circle {
    filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.15));
  }

  .stage-group:hover text {
    opacity: 1;
  }

  .stage-group.active circle {
    stroke: #374151;
    stroke-width: 3px;
  }

  /* Focus styles */
  .stage-group:focus {
    outline: none;
  }

  .stage-group:focus circle {
    stroke: #6366F1;
    stroke-width: 4px;
  }

  /* Add focus styles for keyboard navigation */
  .stage-group:focus {
    outline: 2px solid #6366F1;
    outline-offset: 2px;
  }

  /* Hide content visually but keep it available for screen readers */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
</style>
