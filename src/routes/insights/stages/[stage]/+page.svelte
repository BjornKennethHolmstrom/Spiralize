<script lang="ts">
  import { page } from '$app/stores';
  import { base } from '$app/paths';
  import { _ } from 'svelte-i18n';
  import languageStore from '$lib/stores/languageStore';
  
  const { language } = languageStore;
  $: currentLanguage = $language;

  // Get stage from URL parameter
  $: stage = $page.params.stage;
  
  // Helper for translation path
  const t = (path: string) => $_(`insights.stages.${stage}.${path}`);

  const translations = {
    en: {
      breadcrumb_insights: "Insights",
    },
    sv: {
      breadcrumb_insights: "Insikter",
    }
  };

  $: t_nav = translations[currentLanguage];

  const stageColors = {
    beige: '#E5D0BA',
    purple: '#9B6B9E',
    red: '#E25A53',
    blue: '#4A72B2',
    orange: '#FF7F27',
    green: '#7AB55C',
    yellow: '#FFD700',
    turquoise: '#40E0D0',
    coral: '#FF6F61',
    ultraviolet: '#9932CC'
  };

  // Stage navigation
  const stageOrder = ['beige', 'purple', 'red', 'blue', 'orange', 'green', 'yellow', 'turquoise', 'coral', 'ultraviolet'];
  $: currentIndex = stageOrder.indexOf(stage);
  $: previousStage = currentIndex > 0 ? stageOrder[currentIndex - 1] : null;
  $: nextStage = currentIndex < stageOrder.length - 1 ? stageOrder[currentIndex + 1] : null;
</script>

<div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-4xl mx-auto">
    <!-- Navigation breadcrumbs -->
    <div class="mb-8 flex items-center text-sm">
      <a 
        href="{base}/insights" 
        class="text-purple-600 hover:text-purple-700"
      >
        {t_nav.breadcrumb_insights}
      </a>
      <svg class="w-5 h-5 mx-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
      </svg>
      <span class="text-gray-600 capitalize">{stage} Stage</span>
    </div>

    <!-- Main Content -->
    <div class="space-y-8">
      <!-- Header Section -->
      <header 
        class="bg-white rounded-xl shadow-sm p-8 border-l-4"
        style="border-color: {stageColors[stage]}"
      >
        <h1 
          class="text-4xl font-bold mb-4"
          style="color: {stageColors[stage]}"
        >
          {t('title')}
        </h1>
        <p class="text-xl text-gray-600">
          {t('subtitle')}
        </p>
      </header>

      <!-- Key Characteristics -->
      <section class="bg-white rounded-xl shadow-sm p-8">
        <h2 class="text-2xl font-semibold mb-6">{t('characteristics.title')}</h2>
        <div class="space-y-6">
          <div class="prose max-w-none">
            <h3 class="text-lg font-medium text-gray-900">{t('characteristics.focusTitle')}</h3>
            <p class="text-gray-600">{t('characteristics.focus')}</p>
            
            <h3 class="text-lg font-medium text-gray-900 mt-6">{t('characteristics.behaviourTitle')}</h3>
            <p class="text-gray-600">{t('characteristics.behavior')}</p>
            
            <h3 class="text-lg font-medium text-gray-900 mt-6">{t('characteristics.contextsTitle')}</h3>
            <p class="text-gray-600">{t('characteristics.contexts')}</p>
          </div>
        </div>
      </section>

      <!-- Understanding & Examples -->
      <section class="bg-white rounded-xl shadow-sm p-8">
        <div class="space-y-8">
          <!-- Understanding -->
          <div>
            <h3 class="text-xl font-semibold mb-4">{t('insights.understanding.title')}</h3>
            <p class="text-gray-600">{t('insights.understanding.description')}</p>
          </div>

          <!-- Examples -->
          <div>
            <h3 class="text-xl font-semibold mb-4">{t('insights.examples.title')}</h3>
            <ul class="space-y-2">
              {#each t('insights.examples.items') as example}
                <li class="flex items-start">
                  <span class="mr-2">•</span>
                  <span class="text-gray-600">{example}</span>
                </li>
              {/each}
            </ul>
          </div>

          <!-- Modern Applications -->
          <div>
            <h3 class="text-xl font-semibold mb-4">{t('insights.applications.title')}</h3>
            <p class="text-gray-600 mb-4">{t('insights.applications.description')}</p>
            <ul class="space-y-2">
              {#each t('insights.applications.items') as application}
                <li class="flex items-start">
                  <span class="mr-2">•</span>
                  <span class="text-gray-600">{application}</span>
                </li>
              {/each}
            </ul>
          </div>
        </div>
      </section>

      <!-- Growth Pathways -->
      <section class="bg-white rounded-xl shadow-sm p-8">
        <h2 class="text-2xl font-semibold mb-6">{t('growth.title')}</h2>
        <div class="space-y-8">
          <!-- Awareness -->
          <div>
            <h3 class="text-xl font-semibold mb-4">{t('growth.awareness.title')}</h3>
            <p class="text-gray-600">{t('growth.awareness.description')}</p>
          </div>

          <!-- Interventions -->
          <div>
            <h3 class="text-xl font-semibold mb-4">{t('growth.interventions.title')}</h3>
            <ul class="space-y-2">
              {#each t('growth.interventions.items') as intervention}
                <li class="flex items-start">
                  <span class="mr-2">•</span>
                  <span class="text-gray-600">{intervention}</span>
                </li>
              {/each}
            </ul>
          </div>

          <!-- Transition -->
          <div class="bg-gray-50 rounded-lg p-6 border-l-4" 
               style="border-color: {stageColors[nextStage || stage]}">
            <h3 class="text-xl font-semibold mb-4">{t('growth.transition.title')}</h3>
            <p class="text-gray-600">{t('growth.transition.description')}</p>
          </div>
        </div>
      </section>

      <!-- Practical Exercises -->
      <section class="bg-white rounded-xl shadow-sm p-8">
        <h2 class="text-2xl font-semibold mb-6">{t('exercises.title')}</h2>
        <div class="space-y-8">
          <!-- Self-Reflection -->
          <div>
            <h3 class="text-xl font-semibold mb-4">{t('exercises.reflection.title')}</h3>
            <ul class="space-y-2">
              {#each t('exercises.reflection.questions') as question}
                <li class="flex items-start">
                  <span class="mr-2">•</span>
                  <span class="text-gray-600">{question}</span>
                </li>
              {/each}
            </ul>
          </div>

          <!-- Community Action -->
          <div>
            <h3 class="text-xl font-semibold mb-4">{t('exercises.action.title')}</h3>
            <ul class="space-y-2">
              {#each t('exercises.action.actions') as action}
                <li class="flex items-start">
                  <span class="mr-2">•</span>
                  <span class="text-gray-600">{action}</span>
                </li>
              {/each}
            </ul>
          </div>


        </div>
      </section>

      <!-- Challenges & Opportunities -->
      <section class="bg-white rounded-xl shadow-sm p-8">
        <h2 class="text-2xl font-semibold mb-6">{t('challenges.title')}</h2>
        <div class="space-y-6">
          <div class="prose max-w-none">
            <h3 class="text-lg font-medium text-gray-900">{t('challenges.challenges.title')}</h3>
            <p class="text-gray-600">{t('challenges.challenges.description')}</p>
            
            <h3 class="text-lg font-medium text-gray-900 mt-6">{t('challenges.opportunities.title')}</h3>
            <p class="text-gray-600">{t('challenges.opportunities.description')}</p>
           
          </div>
        </div>
      </section>

      <!-- Practical Application Example -->
      <section class="bg-white rounded-xl shadow-sm p-8">
        <h2 class="text-2xl font-semibold mb-6">{t('practical.title')}</h2>
        <div class="space-y-8">
          <div>
            <p class="text-gray-600 mb-4">{t('practical.description')}</p>
            <ul class="space-y-2">
              {#each t('practical.items') as item}
                <li class="flex items-start">
                  <span class="mr-2">•</span>
                  <span class="text-gray-600">{item}</span>
                </li>
              {/each}
            </ul>
          </div>
        </div>
      </section>


      <!-- Navigation Footer -->
      <nav class="flex justify-between items-center pt-8">
        {#if previousStage}
          <a
            href="{base}/insights/stages/{previousStage}"
            class="inline-flex items-center px-6 py-3 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
            style="color: {stageColors[previousStage]}"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            <span class="capitalize">{previousStage}</span>
          </a>
        {:else}
          <div></div>
        {/if}

        {#if nextStage}
          <a
            href="{base}/insights/stages/{nextStage}"
            class="inline-flex items-center px-6 py-3 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
            style="color: {stageColors[nextStage]}"
          >
            <span class="capitalize">{nextStage}</span>
            <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        {/if}
      </nav>
    </div>
  </div>
</div>
