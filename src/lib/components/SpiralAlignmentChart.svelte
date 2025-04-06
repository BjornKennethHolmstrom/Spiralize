<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { Chart, RadarController, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend, Title } from 'chart.js';
  import languageStore from '$lib/stores/languageStore';
  import assistantStore, { getScoresArray, getAssistantColor, getAssistantNames } from '$lib/stores/assistantStore';

  Chart.register(RadarController, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend, Title);

  export let selectedAssistants: string[] = ['chatgpt'];

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

  const chartTitle = {
    en: "Spiral Alignment of AI Assistants",
    sv: "AI-assistenters spiralinriktning"
  };

  let chart: Chart | null = null;
  let canvasEl: HTMLCanvasElement;

  const allAssistants = getAssistantNames();

  function buildDatasets(focusFirst: string, visibility?: Record<string, boolean>) {
    const sorted = [focusFirst, ...allAssistants.filter(n => n !== focusFirst)];
    return sorted.map((name, idx) => {
      const values = getScoresArray(name);
      const show = visibility?.[name] ?? (idx === 0); // keep previous or show only focus
      return {
        label: name.charAt(0).toUpperCase() + name.slice(1),
        data: [...values],
        fill: true,
        backgroundColor: getAssistantColor(name) + '44',
        borderColor: getAssistantColor(name),
        pointBackgroundColor: getAssistantColor(name),
        hidden: !show
      };
    });
  }

  function renderChart() {
    if (!canvasEl) return;

    const previousVisibility: Record<string, boolean> = {};
    if (chart?.data?.datasets) {
      chart.data.datasets.forEach(dataset => {
        if (typeof dataset.label === 'string') {
          previousVisibility[dataset.label.toLowerCase()] = chart?.isDatasetVisible?.(chart.data.datasets.indexOf(dataset));
        }
      });
    }

    if (chart) {
      chart.destroy();
    }

    const data = {
      labels: stageLabelsTranslatable[currentLanguage] || stageLabelsTranslatable.en,
      datasets: buildDatasets(selectedAssistants[0], previousVisibility)
    };

    chart = new Chart(canvasEl, {
      type: 'radar',
      data,
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top' },
          title: {
            display: true,
            text: chartTitle[currentLanguage] || chartTitle.en
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

  $: if (canvasEl && selectedAssistants.length > 0 && currentLanguage) {
    renderChart();
  }

  onMount(() => {
    renderChart();
  });

  onDestroy(() => {
    if (chart) chart.destroy();
  });
</script>

<div class="max-w-3xl mx-auto">
  <canvas bind:this={canvasEl}></canvas>
</div>
