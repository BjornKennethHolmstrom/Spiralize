<!-- src/lib/components/SpiralPeaceWheel -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  import type { Language } from '../types/spiral';

  export let language: Language = 'en';
  
  const dispatch = createEventDispatcher();
  
  // Stage colors for the spiral wheel
  const stageColors = {
    beige: '#E5D0BA',
    purple: '#9B6B9E',
    red: '#E25A53',
    blue: '#4A72B2',
    orange: '#FF7F27', 
    green: '#7AB55C',
    yellow: '#FFD700',
    turquoise: '#40E0D0',
    coral: '#FF6F61'
  };

  // Stage types - alternating between individual and collective focus
  const stageFocus = {
    beige: { en: 'Individual', sv: 'Individuell' },
    purple: { en: 'Collective', sv: 'Kollektiv' },
    red: { en: 'Individual', sv: 'Individuell' },
    blue: { en: 'Collective', sv: 'Kollektiv' },
    orange: { en: 'Individual', sv: 'Individuell' },
    green: { en: 'Collective', sv: 'Kollektiv' },
    yellow: { en: 'Individual', sv: 'Individuell' },
    turquoise: { en: 'Collective', sv: 'Kollektiv' },
    coral: { en: 'Individual', sv: 'Individuell' }
  };

  // Stage names in both languages
  const stageNames = {
    beige: { en: 'Survival', sv: 'Överlevnad' },
    purple: { en: 'Tribal', sv: 'Stamtillhörighet' },
    red: { en: 'Power', sv: 'Makt' },
    blue: { en: 'Order', sv: 'Ordning' },
    orange: { en: 'Achievement', sv: 'Prestation' },
    green: { en: 'Community', sv: 'Gemenskap' },
    yellow: { en: 'Systemic', sv: 'Systemisk' },
    turquoise: { en: 'Holistic', sv: 'Holistisk' },
    coral: { en: 'Sovereign Unity', sv: 'Suverän Enhet' }
  };

  // Peace perspectives for each stage
  const peacePerspectives = {
    beige: {
      en: 'Basic safety and survival',
      sv: 'Grundläggande säkerhet och överlevnad'
    },
    purple: {
      en: 'Tribal harmony and ancestral peace',
      sv: 'Stamharmoni och förfäders fred'
    },
    red: {
      en: 'Peace through strength',
      sv: 'Fred genom styrka'
    },
    blue: {
      en: 'Peace through order and morality',
      sv: 'Fred genom ordning och moral'
    },
    orange: {
      en: 'Strategic peace for prosperity',
      sv: 'Strategisk fred för välstånd'
    },
    green: {
      en: 'Inclusive peace and reconciliation',
      sv: 'Inkluderande fred och försoning'
    },
    yellow: {
      en: 'Systemic peace integration',
      sv: 'Systemisk fredsintegration'
    },
    turquoise: {
      en: 'Global unity and interconnection',
      sv: 'Global enhet och sammankoppling'
    },
    coral: {
      en: 'Evolutionary co-creation',
      sv: 'Evolutionär samskapande'
    }
  };

  // Currently selected stage
  let selectedStage: string | null = null;
  
  // Animation for hover/selection effects
  const scale = tweened(1, {
    duration: 200,
    easing: cubicOut
  });

  // Handle stage selection
  function selectStage(stage: string) {
    selectedStage = selectedStage === stage ? null : stage;
    dispatch('select', { stage });
  }

  // Handle keyboard navigation
  function handleKeyDown(event: KeyboardEvent, stage: string) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      selectStage(stage);
    }
  }

  // Translations for the component
  const translations = {
    en: {
      title: "The Peace Spiral",
      instruction: "Click on a stage to learn more",
      focusLabel: "Focus:",
      perspectiveLabel: "Peace View:"
    },
    sv: {
      title: "Fredsspiralen",
      instruction: "Klicka på ett stadium för att lära dig mer",
      focusLabel: "Fokus:",
      perspectiveLabel: "Fredssyn:"
    }
  };

  $: t = translations[language];
</script>

<div class="spiral-peace-wheel">
  <h3 class="text-xl font-semibold text-center mb-4">{t.title}</h3>
  <p class="text-sm text-gray-500 text-center mb-6">{t.instruction}</p>
  
  <div class="relative w-full max-w-3xl mx-auto mb-8">
    <!-- SVG Spiral Wheel -->
    <svg viewBox="0 0 500 500" class="w-full h-auto">
      <!-- Background Circle -->
      <circle cx="250" cy="250" r="245" fill="#f8f9fa" stroke="#e9ecef" stroke-width="2" />
      
      <!-- Connecting Lines (optional) -->
      <path d="M 250,250 L 330,140 L 400,250 L 330,360 L 250,250" 
            fill="none" stroke="#e9ecef" stroke-width="2" stroke-dasharray="5,5" />
      
      <!-- Stage Circles - Positioned in a spiral pattern -->
      {#each Object.entries(stageColors) as [stage, color], i}
        {@const angle = (i / Object.keys(stageColors).length) * Math.PI * 2.5}
        {@const radius = 80 + (i * 15)}
        {@const x = 250 + radius * Math.cos(angle)}
        {@const y = 250 + radius * Math.sin(angle)}
        <g 
          role="button"
          tabindex="0"
          class="stage-group cursor-pointer"
          class:active={selectedStage === stage}
          on:click={() => selectStage(stage)}
          on:keydown={(e) => handleKeyDown(e, stage)}
          aria-label={`${stageNames[stage][language]} stage: ${peacePerspectives[stage][language]}`}
          aria-pressed={selectedStage === stage}
        >
          <!-- Stage Circle -->
          <circle
            cx={x}
            cy={y}
            r={selectedStage === stage ? "24" : "20"}
            fill={color}
            stroke={selectedStage === stage ? "#374151" : "white"}
            stroke-width={selectedStage === stage ? "3" : "2"}
          />
          
          <!-- Stage Label -->
          <text
            x={x}
            y={y + 2}
            text-anchor="middle"
            dominant-baseline="middle"
            class="text-sm font-medium fill-current text-white"
          >
            {stage.charAt(0).toUpperCase()}
          </text>
          
          <!-- Stage Name (always show for selected stage) -->
          <text
            x={x}
            y={y + 35}
            text-anchor="middle"
            class="text-xs font-medium fill-current stage-label"
            fill={selectedStage === stage ? color : "#6B7280"}
            opacity={selectedStage === stage ? "1" : "0.6"}
          >
            {stageNames[stage][language]}
          </text>
        </g>
      {/each}
    </svg>
  </div>
  
  <!-- Selected Stage Details -->
  {#if selectedStage}
    <div 
      class="bg-white rounded-lg p-6 shadow-sm border-l-4 mx-auto max-w-2xl" 
      style="border-color: {stageColors[selectedStage]}"
    >
      <h4 class="text-lg font-medium mb-2 flex justify-between">
        <span>{stageNames[selectedStage][language]}</span>
        <span class="text-sm font-normal text-gray-500">
          {t.focusLabel} {stageFocus[selectedStage][language]}
        </span>
      </h4>
      <div class="mb-4">
        <span class="text-sm font-medium text-gray-700">{t.perspectiveLabel}</span>
        <p class="text-gray-600">{peacePerspectives[selectedStage][language]}</p>
      </div>
    </div>
  {/if}
</div>

<style>
  .stage-group:hover circle {
    filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.15));
    stroke: #6366F1;
    stroke-width: 3px;
  }
  
  .stage-group circle {
    transition: filter 0.2s, stroke 0.2s, stroke-width 0.2s;
  }
  
  .stage-group.active circle {
    filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.25));
  }
  
  /* Add focus styles for keyboard navigation */
  .stage-group:focus {
    outline: none;
  }
  
  .stage-group:focus circle {
    stroke: #6366F1;
    stroke-width: 4px;
  }
  
  .stage-group:hover .stage-label {
    opacity: 1;
    fill: currentColor;
  }
</style>
