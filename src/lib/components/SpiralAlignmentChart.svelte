<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { Chart, RadarController, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend, Title } from 'chart.js';
  import languageStore from '$lib/stores/languageStore';
  
  // Import both stores
  import assistantStore, { getScoresArray as getAssistantScores, getAssistantColor, getAssistantNames } from '$lib/stores/assistantStore';
  import { getTraditionScoresArray, getTraditionColor, getTraditionNames, traditionNames } from '$lib/stores/traditionStore';

  Chart.register(RadarController, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend, Title);

  export let selectedEntities: string[] = [];
  export let entityType: 'assistant' | 'tradition' = 'assistant';
  export let customTitle: string | null = null;

  const { language } = languageStore;
  $: currentLanguage = $language;

  const stageLabelsTranslatable = {
    en: [
      "Beige", "Purple", "Red", "Blue", "Orange",
      "Green", "Yellow", "Turquoise", "Coral", "Ultraviolet"
    ],
    sv: [
      "Beige", "Lila", "Röd", "Blå", "Orange",
      "Grön", "Gul", "Turkos", "Korall", "Ultraviolett"
    ]
  };

  const chartTitles = {
    assistant: {
      en: "Spiral Alignment of AI Assistants",
      sv: "AI-assistenters spiralinriktning"
    },
    tradition: {
      en: "Spiral Alignment of Spiritual Traditions",
      sv: "Andliga traditioners spiralinriktning"
    }
  };

  let chart: Chart | null = null;
  let canvasEl: HTMLCanvasElement;

  // Get the appropriate entity names based on type
  $: allEntities = entityType === 'assistant' ? getAssistantNames() : getTraditionNames();
  
  // Get scores based on entity type
  function getEntityScores(name: string): number[] {
    return entityType === 'assistant' 
      ? getAssistantScores(name) 
      : getTraditionScoresArray(name);
  }
  
  // Get color based on entity type
  function getEntityColor(name: string): string {
    return entityType === 'assistant' 
      ? getAssistantColor(name) 
      : getTraditionColor(name);
  }
  
  // Get localized entity name
  function getEntityLabel(name: string): string {
    if (entityType === 'assistant') {
      // Assuming assistantStore has multilingual support similar to traditionNames
      const assistantNameMap = {
        en: {
          chatgpt: "ChatGPT",
          claude: "Claude",
          grok: "Grok",
          deepseek: "DeepSeek",
          gemini: "Gemini",
          perplexity: "Perplexity"
          // Add other assistants
        },
        sv: {
          chatgpt: "ChatGPT",
          claude: "Claude",
          grok: "Grok",
          deepseek: "DeepSeek",
          gemini: "Gemini",
          perplexity: "Perplexity"
          // Add other assistants
        }
      };
      return assistantNameMap[$language]?.[name] || name.charAt(0).toUpperCase() + name.slice(1);
    } else {
      return traditionNames[$language]?.[name] || name.charAt(0).toUpperCase() + name.slice(1);
    }
  }

  function buildDatasets(focusFirst: string, visibility?: Record<string, boolean>) {
    const sorted = [focusFirst, ...allEntities.filter(n => n !== focusFirst)];
    return sorted.map((name, idx) => {
      const values = getEntityScores(name);
      const show = visibility?.[name] ?? (idx === 0); // keep previous or show only focus
      return {
        label: getEntityLabel(name),
        data: [...values],
        fill: true,
        backgroundColor: getEntityColor(name) + '44',
        borderColor: getEntityColor(name),
        pointBackgroundColor: getEntityColor(name),
        hidden: !show
      };
    });
  }

  function renderChart() {
    if (!canvasEl || selectedEntities.length === 0) return;

    const previousVisibility: Record<string, boolean> = {};
    if (chart?.data?.datasets) {
      chart.data.datasets.forEach(dataset => {
        if (typeof dataset.label === 'string') {
          const key = dataset.label.toLowerCase().replace(/\s+/g, '');
          previousVisibility[key] = chart?.isDatasetVisible?.(chart.data.datasets.indexOf(dataset));
        }
      });
    }

    if (chart) {
      chart.destroy();
    }

    const data = {
      labels: stageLabelsTranslatable[$language] || stageLabelsTranslatable.en,
      datasets: buildDatasets(selectedEntities[0], previousVisibility)
    };

    const title = customTitle || chartTitles[entityType][$language] || chartTitles[entityType].en;

    chart = new Chart(canvasEl, {
      type: 'radar',
      data,
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top' },
          title: {
            display: true,
            text: title
          }
        },
        scales: {
          r: {
            min: 0,
            max: 5,
            ticks: { stepSize: 1 },
            pointLabels: {
              font: { size: 10 }
            }
          }
        }
      }
    });
  }

  $: if (canvasEl && selectedEntities.length > 0 && currentLanguage) {
    renderChart();
  }

  onMount(() => {
    if (selectedEntities.length > 0) {
      renderChart();
    }
  });

  onDestroy(() => {
    if (chart) chart.destroy();
  });
</script>

<div class="max-w-3xl mx-auto">
  <canvas bind:this={canvasEl}></canvas>
</div>
